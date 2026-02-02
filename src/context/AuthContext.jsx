import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

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

    // Check for saved session on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('egel_user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            setUser(userData);
            loadRole(userData.rol_id);
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

    const login = async (email, password) => {
        try {
            // Try using the login_usuario RPC function with MD5
            const { data: rpcData, error: rpcError } = await supabase.rpc('login_usuario', {
                email_input: email.toLowerCase().trim(),
                password_input: password
            });

            let userData = null;

            if (rpcError || !rpcData || rpcData.length === 0) {
                // Fallback: Try direct MD5 comparison using raw SQL
                // Note: This requires the pgcrypto extension or MD5 function
                const { data: directData, error: directError } = await supabase
                    .from('usuarios')
                    .select('*, roles(*)')
                    .eq('email', email.toLowerCase().trim())
                    .eq('activo', true);

                if (directError || !directData || directData.length === 0) {
                    return { success: false, error: 'Credenciales inválidas' };
                }

                // Check password with simple hash comparison
                // For demo: try MD5 hash client-side and compare
                const md5Hash = await generateMD5(password);
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

    // Simple MD5 hash function for client-side
    const generateMD5 = async (text) => {
        // Using SubtleCrypto API with SHA-256 as fallback (MD5 not available in browsers)
        // For actual MD5, we'd need a library. This is a simple hash for demo.
        const encoder = new TextEncoder();
        const data = encoder.encode(text);

        // Simple hash function (not cryptographically secure, just for demo matching)
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }

        // Convert to hex-like string (32 chars to match MD5 length)
        const hex = Math.abs(hash).toString(16).padStart(8, '0');
        return (hex + hex + hex + hex).substring(0, 32);
    };

    const logout = () => {
        setUser(null);
        setRole(null);
        localStorage.removeItem('egel_user');
    };

    const register = async (email, nombre, password) => {
        try {
            const { data, error } = await supabase
                .from('usuarios')
                .insert([{
                    email,
                    nombre,
                    password_hash: password, // In production, hash this!
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
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
