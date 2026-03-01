import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../lib/supabase';
import md5 from '../lib/md5';
import HCaptcha from '@hcaptcha/react-hcaptcha';


const LoginScreen = ({ onBack, onSuccess, hideBackButton = false }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [motivo, setMotivo] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [requestSent, setRequestSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);

    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const savedEmail = localStorage.getItem('saved_email');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const { login, loginWithGoogle, googlePending, clearGooglePending } = useAuth();
    const { theme } = useTheme();
    const [googleLoading, setGoogleLoading] = useState(false);


    // Use consistent MD5 hash function shared across the app
    const hashPassword = (password) => {
        return md5(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                // Login flow remains the same
                const result = await login(email, password);
                if (result.success) {
                    if (rememberMe) {
                        localStorage.setItem('saved_email', email);
                    } else {
                        localStorage.removeItem('saved_email');
                    }
                    onSuccess?.();
                } else {
                    setError(result.error);
                }
            } else {
                // Registration flow - create request instead of account
                if (!nombre.trim()) {
                    setError('El nombre es requerido');
                    setLoading(false);
                    return;
                }

                if (!motivo.trim() || motivo.length < 20) {
                    setError('Por favor describe el motivo de tu solicitud (mínimo 20 caracteres)');
                    setLoading(false);
                    return;
                }

                if (password.length < 6) {
                    setError('La contraseña debe tener al menos 6 caracteres');
                    setLoading(false);
                    return;
                }

                if (!captchaToken) {
                    setError('Por favor, completa el Captcha de seguridad');
                    setLoading(false);
                    return;
                }

                // Check if email already exists in users
                const { data: existingUser } = await supabase
                    .from('usuarios')
                    .select('id')
                    .eq('email', email)
                    .single();

                if (existingUser) {
                    setError('Ya existe una cuenta con este email');
                    setLoading(false);
                    return;
                }

                // Check if there's already a pending request
                const { data: existingRequest } = await supabase
                    .from('solicitudes_cuenta')
                    .select('id, estado')
                    .eq('email', email)
                    .single();

                if (existingRequest) {
                    if (existingRequest.estado === 'pendiente') {
                        setError('Ya existe una solicitud pendiente con este email. Espera la respuesta del administrador.');
                    } else if (existingRequest.estado === 'rechazada') {
                        setError('Tu solicitud anterior fue rechazada. Contacta al administrador.');
                    }
                    setLoading(false);
                    return;
                }

                // Create account request
                const hashedPassword = hashPassword(password);
                const { error: insertError } = await supabase
                    .from('solicitudes_cuenta')
                    .insert([{
                        nombre: nombre.trim(),
                        email: email.toLowerCase().trim(),
                        password_hash: hashedPassword,
                        motivo: motivo.trim(),
                        estado: 'pendiente'
                    }]);

                if (insertError) {
                    console.error('Error creating request:', insertError);
                    setError('Error al enviar la solicitud. Intenta de nuevo.');
                    setLoading(false);
                    return;
                }

                // Success - show confirmation
                setRequestSent(true);
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Error de conexión. Intenta de nuevo.');
        }

        setLoading(false);
    };

    // Decodificar JWT de Google (sin librería externa)
    const decodeJWT = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
                '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            ).join(''));
            return JSON.parse(jsonPayload);
        } catch { return null; }
    };

    // Callback cuando Google devuelve las credenciales
    const handleGoogleCredential = async (response) => {
        setGoogleLoading(true);
        setError('');

        const payload = decodeJWT(response.credential);
        if (!payload || !payload.email) {
            setError('No se pudo obtener información de Google');
            setGoogleLoading(false);
            return;
        }

        const gEmail = payload.email.toLowerCase().trim();
        const gNombre = payload.name || payload.email.split('@')[0] || 'Usuario';

        try {
            // 1. Verificar si ya existe en nuestra tabla usuarios
            const { data: existingUser } = await supabase
                .from('usuarios')
                .select('*, roles(*)')
                .eq('email', gEmail)
                .eq('activo', true)
                .single();

            if (existingUser) {
                // Usuario existe — login directo
                await supabase.from('usuarios')
                    .update({ ultimo_acceso: new Date().toISOString() })
                    .eq('id', existingUser.id);
                localStorage.setItem('egel_user', JSON.stringify(existingUser));
                window.location.reload();
                return;
            }

            // 2. Verificar si ya tiene solicitud
            const { data: existingReq } = await supabase
                .from('solicitudes_cuenta')
                .select('id, estado')
                .eq('email', gEmail)
                .single();

            if (existingReq) {
                if (existingReq.estado === 'pendiente') {
                    setError('Ya existe una solicitud pendiente con este email. Espera la aprobación del administrador.');
                } else if (existingReq.estado === 'rechazada') {
                    setError('Tu solicitud fue rechazada. Contacta al administrador.');
                }
                setGoogleLoading(false);
                return;
            }

            // 3. Crear solicitud nueva
            await supabase.from('solicitudes_cuenta').insert([{
                nombre: gNombre,
                email: gEmail,
                password_hash: 'google_oauth',
                motivo: 'Registro via Google OAuth',
                estado: 'pendiente'
            }]);

            setError('');
            setRequestSent(true);
        } catch (err) {
            console.error('Google login error:', err);
            setError('Error al procesar tu cuenta de Google');
        }
        setGoogleLoading(false);
    };

    const handleGoogleLogin = () => {
        setError('');
        if (!window.google?.accounts?.id) {
            setError('Google Identity Services no está disponible. Recarga la página.');
            return;
        }

        setGoogleLoading(true);

        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
            callback: handleGoogleCredential,
            auto_select: false,
            cancel_on_tap_outside: true
        });

        // Renderizar el popup de Google
        window.google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                // Si One Tap no se muestra, usar el botón renderizado como fallback
                // Crear un contenedor temporal para el botón de Google
                const tempDiv = document.createElement('div');
                tempDiv.id = 'google-btn-temp';
                tempDiv.style.position = 'fixed';
                tempDiv.style.top = '50%';
                tempDiv.style.left = '50%';
                tempDiv.style.transform = 'translate(-50%, -50%)';
                tempDiv.style.zIndex = '9999';
                tempDiv.style.background = 'var(--bg-secondary)';
                tempDiv.style.padding = '30px';
                tempDiv.style.borderRadius = '16px';
                tempDiv.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5)';
                document.body.appendChild(tempDiv);

                window.google.accounts.id.renderButton(tempDiv, {
                    type: 'standard',
                    theme: 'outline',
                    size: 'large',
                    text: 'signin_with',
                    shape: 'rectangular',
                    width: 300
                });

                // Cerrar al hacer clic fuera
                const overlay = document.createElement('div');
                overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.4);z-index:9998';
                overlay.onclick = () => {
                    overlay.remove();
                    tempDiv.remove();
                    setGoogleLoading(false);
                };
                document.body.appendChild(overlay);
            }
        });
    };

    // Success message after request is sent
    if (requestSent) {
        return (
            <div className="container fade-in" style={{ maxWidth: '450px', margin: '0 auto', paddingTop: '40px' }}>
                <div className="slide-card" style={{ padding: '40px', textAlign: 'center' }}>
                    {onBack && !hideBackButton && <button className="close-btn" onClick={onBack} title="Cerrar">×</button>}
                    <div style={{ fontSize: '4rem', marginBottom: '20px', color: '#22c55e' }}>
                        <i className="fa-solid fa-envelope-circle-check"></i>
                    </div>
                    <h1 style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>
                        ¡Solicitud Enviada!
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '25px', lineHeight: '1.6' }}>
                        Tu solicitud de cuenta ha sido enviada a los administradores.
                        Recibirás una notificación cuando sea aprobada.
                    </p>
                    <div style={{
                        background: theme === 'dark' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)',
                        padding: '20px',
                        borderRadius: '12px',
                        marginBottom: '25px'
                    }}>
                        <p style={{ color: '#3b82f6', fontSize: '0.9rem', margin: 0 }}>
                            <i className="fa-solid fa-lightbulb" style={{ marginRight: '8px' }}></i>
                            El proceso de aprobación puede tomar hasta 24-48 horas.
                            Revisa tu email para actualizaciones.
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setRequestSent(false);
                            setIsLogin(true);
                            setNombre('');
                            setEmail('');
                            setPassword('');
                            setMotivo('');
                            setCaptchaToken(null);
                        }}
                        className="btn-primary"
                        style={{ width: '100%' }}
                    >
                        Volver a Iniciar Sesión
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container fade-in" style={{ maxWidth: '450px', margin: '0 auto', paddingTop: '40px' }}>
            {!hideBackButton && (
                <button
                    onClick={onBack}
                    style={{
                        background: 'transparent',
                        color: 'var(--text-secondary)',
                        marginBottom: '30px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    ← Volver
                </button>
            )}

            <div className="slide-card" style={{ padding: '40px' }}>
                {onBack && !hideBackButton && <button className="close-btn" onClick={onBack} title="Cerrar">×</button>}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 18px',
                        background: isLogin
                            ? 'linear-gradient(135deg, var(--accent-color), var(--accent-hover))'
                            : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: isLogin
                            ? '0 8px 25px rgba(168, 85, 247, 0.3)'
                            : '0 8px 25px rgba(59, 130, 246, 0.3)'
                    }}>
                        <i className={isLogin ? 'fa-solid fa-lock-open' : 'fa-solid fa-user-plus'}
                            style={{ fontSize: '2rem', color: '#fff' }}></i>
                    </div>
                    <h1 style={{ color: 'var(--text-primary)', marginBottom: '10px', fontSize: '1.6rem' }}>
                        {isLogin ? 'Bienvenido' : 'Solicitar Cuenta'}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        {isLogin
                            ? 'Ingresa para guardar tu progreso'
                            : 'Envía tu solicitud para unirte'}
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '8px',
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.9rem'
                                }}>
                                    Nombre Completo *
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    placeholder="Tu nombre completo"
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        background: 'var(--input-bg)',
                                        border: '2px solid var(--card-border)',
                                        borderRadius: '10px',
                                        color: 'var(--text-primary)',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
                                />
                            </div>
                        </>
                    )}

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem'
                        }}>
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            autoComplete="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                background: 'var(--input-bg)',
                                border: '2px solid var(--card-border)',
                                borderRadius: '10px',
                                color: 'var(--text-primary)',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
                        />
                    </div>

                    <div style={{ marginBottom: isLogin ? '25px' : '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem'
                        }}>
                            Contraseña *
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    paddingRight: '50px',
                                    background: 'var(--input-bg)',
                                    border: '2px solid var(--card-border)',
                                    borderRadius: '10px',
                                    color: 'var(--text-primary)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    color: 'var(--text-secondary)',
                                    padding: '4px'
                                }}
                                title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        {!isLogin && (
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '6px' }}>
                                Mínimo 6 caracteres
                            </p>
                        )}
                        {isLogin && (
                            <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    style={{
                                        accentColor: 'var(--accent-color)',
                                        width: '16px',
                                        height: '16px',
                                        cursor: 'pointer'
                                    }}
                                />
                                <label
                                    htmlFor="rememberMe"
                                    style={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.95rem',
                                        cursor: 'pointer',
                                        userSelect: 'none'
                                    }}
                                >
                                    Recordar usuario
                                </label>
                            </div>
                        )}
                    </div>

                    {!isLogin && (
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: 'var(--text-secondary)',
                                fontSize: '0.9rem'
                            }}>
                                ¿Por qué deseas unirte? *
                            </label>
                            <textarea
                                value={motivo}
                                onChange={(e) => setMotivo(e.target.value)}
                                placeholder="Explica brevemente por qué deseas crear una cuenta en EGEL Study (ej: soy estudiante de economía y necesito prepararme para el examen EGEL...)"
                                rows={4}
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    background: 'var(--input-bg)',
                                    border: '2px solid var(--card-border)',
                                    borderRadius: '10px',
                                    color: 'var(--text-primary)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    resize: 'vertical',
                                    minHeight: '100px',
                                    fontFamily: 'inherit'
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'var(--accent-color)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
                            />
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '6px' }}>
                                {motivo.length}/20 caracteres mínimo
                            </p>
                        </div>
                    )}

                    {!isLogin && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
                            <HCaptcha
                                sitekey={import.meta.env.VITE_HCAPTCHA_SITEKEY || ''}
                                onVerify={(token) => {
                                    setCaptchaToken(token);
                                    setError('');
                                }}
                                onExpire={() => setCaptchaToken(null)}
                                theme={theme}
                            />
                        </div>
                    )}

                    {error && (
                        <div style={{
                            padding: '12px 16px',
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: '8px',
                            color: '#ef4444',
                            marginBottom: '20px',
                            fontSize: '0.9rem'
                        }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || (!isLogin && !captchaToken)}
                        style={{
                            width: '100%',
                            padding: '15px',
                            fontSize: '1.05rem',
                            fontWeight: '700',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: loading ? 'wait' : 'pointer',
                            background: 'linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%)',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            opacity: (loading || (!isLogin && !captchaToken)) ? 0.7 : 1,
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)'
                        }}
                    >
                        {loading ? (
                            <><i className="fa-solid fa-spinner fa-spin"></i> Procesando...</>
                        ) : isLogin ? (
                            <><i className="fa-solid fa-right-to-bracket"></i> Iniciar Sesión</>
                        ) : (
                            <><i className="fa-solid fa-paper-plane"></i> Enviar Solicitud</>
                        )}
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
                        <div style={{ flex: 1, height: '1px', background: 'var(--card-border)' }}></div>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{isLogin ? 'o continúa con' : 'o regístrate con'}</span>
                        <div style={{ flex: 1, height: '1px', background: 'var(--card-border)' }}></div>
                    </div>

                </form>

                {/* Google OAuth separator and button */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '20px 0',
                    gap: '12px'
                }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--card-border)' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>o</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--card-border)' }} />
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={googleLoading}
                    style={{
                        width: '100%',
                        padding: '14px',
                        fontSize: '1rem',
                        background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : '#fff',
                        border: `2px solid ${theme === 'dark' ? 'rgba(255,255,255,0.15)' : '#dadce0'}`,
                        borderRadius: '10px',
                        color: 'var(--text-primary)',
                        cursor: googleLoading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        opacity: googleLoading ? 0.7 : 1,
                        transition: 'all 0.2s'
                    }}
                >
                    {googleLoading ? (
                        <span>⏳ Conectando con Google...</span>
                    ) : (
                        <>
                            <svg width="20" height="20" viewBox="0 0 48 48">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                            </svg>
                            <span style={{ fontWeight: '500' }}>
                                {isLogin ? 'Acceder con Google' : 'Solicitar con Google'}
                            </span>
                        </>
                    )}
                </button>

                {!isLogin && (
                    <div style={{
                        background: theme === 'dark' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.05)',
                        padding: '15px',
                        borderRadius: '10px',
                        marginTop: '20px'
                    }}>
                        <p style={{ color: 'var(--accent-color)', fontSize: '0.85rem', margin: 0, lineHeight: '1.5' }}>
                            ℹ️ Tu solicitud será revisada por un administrador.
                            Te notificaremos cuando sea aprobada.
                        </p>
                    </div>
                )}

                <div style={{
                    textAlign: 'center',
                    marginTop: '25px',
                    paddingTop: '25px',
                    borderTop: '1px solid var(--card-border)'
                }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
                        {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                    </p>
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                            setCaptchaToken(null);
                        }}
                        style={{
                            background: 'transparent',
                            border: '2px solid var(--accent-color)',
                            color: 'var(--accent-color)',
                            padding: '10px 24px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.95rem'
                        }}
                    >
                        {isLogin ? 'Solicitar cuenta' : 'Iniciar sesión'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
