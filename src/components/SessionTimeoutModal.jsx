import React, { useEffect } from 'react';
import { useSession } from '../context/SessionContext';

export default function SessionTimeoutModal() {
  const { isInactivityWarning, warningCountdown, extendSession, endSession } =
    useSession();

  // Cerrar con ESC
  useEffect(() => {
    if (!isInactivityWarning) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        endSession();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isInactivityWarning, endSession]);

  if (!isInactivityWarning) return null;

  // Determinar color según countdown
  let colorClass = 'timeout-yellow';
  if (warningCountdown <= 10) {
    colorClass = 'timeout-red';
  } else if (warningCountdown <= 20) {
    colorClass = 'timeout-orange';
  }

  // Progreso visual (30 segundos = 100%)
  const progressPercent = (warningCountdown / 30) * 100;

  return (
    <div className="session-timeout-overlay">
      <div className="session-timeout-modal">
        {/* Icono */}
        <div className="timeout-icon">
          <i className="fas fa-hourglass-end"></i>
        </div>

        {/* Título */}
        <h2 className="timeout-title">Tu sesión está por expirar</h2>

        {/* Mensaje */}
        <p className="timeout-message">
          Por inactividad, serás desconectado en{' '}
          <strong className={colorClass}>{warningCountdown}s</strong>
        </p>

        {/* Barra de progreso */}
        <div className="timeout-progress-bar">
          <div
            className={`timeout-progress-fill ${colorClass}`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Botones */}
        <div className="timeout-buttons">
          <button className="timeout-btn logout-btn" onClick={endSession}>
            <i className="fas fa-sign-out-alt"></i> Cerrar sesión
          </button>
          <button className="timeout-btn extend-btn" onClick={extendSession}>
            <i className="fas fa-redo"></i> Extender sesión
          </button>
        </div>

        {/* Nota adicional */}
        <p className="timeout-note">
          Presiona ESC para cerrar sesión inmediatamente
        </p>
      </div>
    </div>
  );
}
