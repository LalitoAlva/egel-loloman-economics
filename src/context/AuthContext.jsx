import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import md5 from '../lib/md5';

const AuthContext = createContext();

// ⏱️ CONFIGURACIÓN DE TIMEOUT DE INACTIVIDAD
const WARNING_DURATION_MS = 30 * 1000;          // 30 segundos de gracia

// Default to 30 minutes if not set
const DEFAULT_TIMEOUT = 30 * 60 * 1000;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showInactivityWarning, setShowInactivityWarning] = useState(false);
    const [warningCountdown, setWarningCountdown] = useState(0);

    // State for Configurable Timeout
    const [inactivityTimeoutMs, setInactivityTimeoutMs] = useState(DEFAULT_TIMEOUT);

    const inactivityTimerRef = useRef(null);
    const warningTimerRef = useRef(null);
    const countdownIntervalRef = useRef(null);
    // Ref para evitar que el useEffect limpie los timers del warning
    const showWarningRef = useRef(false);

    // Check for saved session and timeout preference on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('egel_user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            setUser(userData);
            loadRole(userData.rol_id);
        }

        const savedTimeout = localStorage.getItem('egel_inactivity_timeout');
        if (savedTimeout) {
            setInactivityTimeoutMs(parseInt(savedTimeout, 10));
        }

        setLoading(false);
    }, []);

    const loadRole = async (rolId) => {
        const { data } = await supabase
            .from('roles')
            .select('*')
            .eq('id', rolId)
            .single();

        if (data) {
            setRole(data);
        }
    };

    // Function to update timeout setting
    const updateInactivityTimeout = (minutes) => {
        const ms = minutes * 60 * 1000;
        setInactivityTimeoutMs(ms);
        localStorage.setItem('egel_inactivity_timeout', ms.toString());
        // Timer will automatically restart due to useEffect dependency on inactivityTimeoutMs
    };

    // ============================================
    // INACTIVITY TIMER LOGIC
    // ============================================

    // Mantener ref sincronizado con el estado
    useEffect(() => {
        showWarningRef.current = showInactivityWarning;
    }, [showInactivityWarning]);

    const clearAllTimers = useCallback(() => {
        if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
        if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        inactivityTimerRef.current = null;
        warningTimerRef.current = null;
        countdownIntervalRef.current = null;
    }, []);

    const startInactivityTimer = useCallback(() => {
        // Solo limpiar el timer de inactividad, NO los del warning
        if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = null;

        inactivityTimerRef.current = setTimeout(() => {
            // Mostrar advertencia
            showWarningRef.current = true;
            setShowInactivityWarning(true);
            setWarningCountdown(Math.ceil(WARNING_DURATION_MS / 1000));

            // Countdown cada segundo
            countdownIntervalRef.current = setInterval(() => {
                setWarningCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(countdownIntervalRef.current);
                        countdownIntervalRef.current = null;
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            // Auto-logout después del grace period
            warningTimerRef.current = setTimeout(() => {
                clearAllTimers();
                showWarningRef.current = false;
                setShowInactivityWarning(false);
                setUser(null);
                setRole(null);
                localStorage.removeItem('egel_user');
            }, WARNING_DURATION_MS);
        }, inactivityTimeoutMs);
    }, [clearAllTimers, inactivityTimeoutMs]);

    const dismissWarning = useCallback(() => {
        // Limpiar timers del warning
        if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
        if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
        warningTimerRef.current = null;
        countdownIntervalRef.current = null;
        showWarningRef.current = false;
        setShowInactivityWarning(false);
        // Reiniciar timer de inactividad
        startInactivityTimer();
    }, [startInactivityTimer]);

    // Escuchar actividad del usuario — depende de `user` y `inactivityTimeoutMs`
    useEffect(() => {
        if (!user) {
            clearAllTimers();
            return;
        }

        const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove'];

        const handleActivity = () => {
            // Usar ref para evitar re-renders y dependencias circulares
            if (!showWarningRef.current) {
                startInactivityTimer();
            }
        };

        events.forEach(ev => window.addEventListener(ev, handleActivity, { passive: true }));
        startInactivityTimer();

        return () => {
            events.forEach(ev => window.removeEventListener(ev, handleActivity));
            clearAllTimers();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, inactivityTimeoutMs]);

    const login = async (email, password) => {
        try {
            // Try using the login_usuario RPC function with MD5
            const { data: rpcData, error: rpcError } = await supabase.rpc('login_usuario', {
                email_input: email.toLowerCase().trim(),
                password_input: password
            });

            let userData = null;

            if (rpcError || !rpcData || rpcData.length === 0) {
                // Fallback: Try direct MD5 comparison client-side
                const { data: directData, error: directError } = await supabase
                    .from('usuarios')
                    .select('*, roles(*)')
                    .eq('email', email.toLowerCase().trim())
                    .eq('activo', true);

                if (directError || !directData || directData.length === 0) {
                    return { success: false, error: 'Credenciales inválidas' };
                }

                // Use consistent MD5 hash for comparison
                const md5Hash = md5(password);
                const matchedUser = directData.find(u => u.password_hash === md5Hash);

                if (!matchedUser) {
                    // Also try plain text for backwards compatibility
                    const plainMatch = directData.find(u => u.password_hash === password);
                    if (!plainMatch) {
                        return { success: false, error: 'Credenciales inválidas' };
                    }
                    userData = plainMatch;
                } else {
                    userData = matchedUser;
                }
            } else {
                // RPC worked, fetch full user data
                const { data: fullUser } = await supabase
                    .from('usuarios')
                    .select('*, roles(*)')
                    .eq('id', rpcData[0].id)
                    .single();
                userData = fullUser;
            }

            if (!userData) {
                return { success: false, error: 'Credenciales inválidas' };
            }

            // Update last access
            await supabase
                .from('usuarios')
                .update({ ultimo_acceso: new Date().toISOString() })
                .eq('id', userData.id);

            setUser(userData);
            setRole(userData.roles);
            localStorage.setItem('egel_user', JSON.stringify(userData));

            return { success: true, user: userData };
        } catch (err) {
            console.error('Login error:', err);
            return { success: false, error: err.message };
        }
    };

    const logout = () => {
        setUser(null);
        setRole(null);
        localStorage.removeItem('egel_user');
    };

    const register = async (email, nombre, password) => {
        try {
            const passwordHash = md5(password);
            const { data, error } = await supabase
                .from('usuarios')
                .insert([{
                    email,
                    nombre,
                    password_hash: passwordHash,
                    rol_id: 2 // Default: estudiante
                }])
                .select('*, roles(*)')
                .single();

            if (error) {
                if (error.code === '23505') {
                    return { success: false, error: 'El email ya está registrado' };
                }
                return { success: false, error: error.message };
            }

            setUser(data);
            setRole(data.roles);
            localStorage.setItem('egel_user', JSON.stringify(data));

            return { success: true, user: data };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const hasPermission = (permission) => {
        if (!role?.permisos) return false;
        return role.permisos[permission] === true;
    };

    const isAdmin = () => role?.nombre === 'admin';
    const isProfesor = () => role?.nombre === 'profesor';
    const isEstudiante = () => role?.nombre === 'estudiante';

    return (
        <AuthContext.Provider value={{
            user,
            role,
            loading,
            login,
            logout,
            register,
            hasPermission,
            isAdmin,
            isProfesor,
            isEstudiante,
            isAuthenticated: !!user,
            showInactivityWarning,
            warningCountdown,
            dismissWarning,
            updateInactivityTimeout,
            inactivityTimeoutMs
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
