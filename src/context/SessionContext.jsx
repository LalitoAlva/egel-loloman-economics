import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from './AuthContext';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const { logout, user } = useAuth();
  const [isInactivityWarning, setIsInactivityWarning] = useState(false);
  const [warningCountdown, setWarningCountdown] = useState(30);
  const [sessionTimeoutMinutes, setSessionTimeoutMinutes] = useState(30);

  const lastActivityRef = useRef(Date.now());
  const warningTimeoutRef = useRef(null);
  const logoutTimeoutRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const activityDebounceRef = useRef(null);
  const isInitializedRef = useRef(false);

  // Cargar timeout configurable desde BD
  const fetchSessionTimeout = useCallback(async () => {
    try {
      const { supabase } = await import('../lib/supabase');
      const { data } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'session_timeout_minutes')
        .single();

      if (data && data.setting_value) {
        setSessionTimeoutMinutes(parseInt(data.setting_value));
      }
    } catch (error) {
      console.log('Usando timeout default: 30 minutos');
      setSessionTimeoutMinutes(30);
    }
  }, []);

  // Resetear actividad (con debounce)
  const resetActivity = useCallback(() => {
    // Debounce: solo resetea cada 5 segundos
    if (activityDebounceRef.current) {
      clearTimeout(activityDebounceRef.current);
    }

    activityDebounceRef.current = setTimeout(() => {
      if (user && isInactivityWarning === false) {
        lastActivityRef.current = Date.now();
      }
    }, 5000);
  }, [user, isInactivityWarning]);

  // Mostrar aviso de inactividad
  const showWarning = useCallback(() => {
    if (!isInactivityWarning) {
      setIsInactivityWarning(true);
      setWarningCountdown(30);

      // Iniciar countdown
      countdownIntervalRef.current = setInterval(() => {
        setWarningCountdown((prev) => prev - 1);
      }, 1000);

      // Auto logout después de 30 segundos
      logoutTimeoutRef.current = setTimeout(() => {
        endSession();
      }, 30000);
    }
  }, [isInactivityWarning]);

  // Extender sesión
  const extendSession = useCallback(() => {
    // Limpiar timeouts/intervals
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    // Resetear estado
    setIsInactivityWarning(false);
    setWarningCountdown(30);
    lastActivityRef.current = Date.now();
  }, []);

  // Logout por inactividad
  const endSession = useCallback(() => {
    // Limpiar timeouts/intervals
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    setIsInactivityWarning(false);
    logout();
  }, [logout]);

  // Monitorear inactividad
  useEffect(() => {
    if (!user) return;

    if (!isInitializedRef.current) {
      fetchSessionTimeout();
      isInitializedRef.current = true;
    }

    const timeoutMs = sessionTimeoutMinutes * 60 * 1000;
    const warningThresholdMs = timeoutMs - 30000; // 30 segundos antes del timeout

    const checkInactivity = () => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivityRef.current;

      if (timeSinceLastActivity >= warningThresholdMs && !isInactivityWarning) {
        showWarning();
      }
    };

    const inactivityCheckInterval = setInterval(checkInactivity, 1000);

    return () => {
      clearInterval(inactivityCheckInterval);
    };
  }, [user, sessionTimeoutMinutes, isInactivityWarning, showWarning, fetchSessionTimeout]);

  // Setup activity listeners
  useEffect(() => {
    if (!user) return;

    const events = ['mousemove', 'keypress', 'click', 'scroll', 'touchstart'];

    const handleActivity = () => {
      if (isInactivityWarning === false) {
        resetActivity();
      }
    };

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });

      if (activityDebounceRef.current) {
        clearTimeout(activityDebounceRef.current);
      }
    };
  }, [user, isInactivityWarning, resetActivity]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
      if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (activityDebounceRef.current) clearTimeout(activityDebounceRef.current);
    };
  }, []);

  const value = {
    isInactivityWarning,
    warningCountdown,
    sessionTimeoutMinutes,
    setSessionTimeoutMinutes,
    extendSession,
    endSession,
    fetchSessionTimeout,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession debe usarse dentro de SessionProvider');
  }
  return context;
};
