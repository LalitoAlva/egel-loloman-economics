import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { supabase } from '../lib/supabase';
import md5 from '../lib/md5';

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

    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const savedEmail = localStorage.getItem('saved_email');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const { login } = useAuth();
    const { theme } = useTheme();

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
                    <div style={{ fontSize: '3.5rem', marginBottom: '15px', color: 'var(--accent-color)' }}>
                        <i className={isLogin ? 'fa-solid fa-right-to-bracket' : 'fa-solid fa-user-plus'}></i>
                    </div>
                    <h1 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>
                        {isLogin ? 'Iniciar Sesión' : 'Solicitar Cuenta'}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
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
                        disabled={loading}
                        className="btn-primary"
                        style={{
                            width: '100%',
                            padding: '14px',
                            fontSize: '1.1rem',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading
                            ? '⏳ Procesando...'
                            : isLogin ? '🚀 Entrar' : '📤 Enviar Solicitud'}
                    </button>
                </form>

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
