import React, { useEffect } from 'react';

const AudioPromptModal = ({ isOpen, onClose, onConfirm, moduleName, moduleIcon, moduleColor }) => {

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isOpen && e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fade-in"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000,
                padding: '20px'
            }}
            onClick={onClose}
        >
            <div
                className="slide-card"
                style={{
                    maxWidth: '400px',
                    width: '100%',
                    padding: '35px',
                    textAlign: 'center',
                    borderTop: `6px solid ${moduleColor || 'var(--accent-color)'}`,
                    animation: 'slideUp 0.3s ease-out'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Animated icon */}
                <div style={{
                    fontSize: '4rem',
                    marginBottom: '20px',
                    animation: 'pulse 2s infinite'
                }}>
                    <i className="fa-solid fa-headphones"></i>
                </div>

                <h2 style={{
                    fontSize: '1.5rem',
                    marginBottom: '10px',
                    color: '#fff'
                }}>
                    ¿Reproducir Audio?
                </h2>

                <p style={{
                    color: 'var(--text-secondary)',
                    marginBottom: '25px',
                    lineHeight: '1.6'
                }}>
                    Este módulo tiene una clase en audio disponible.
                    <br />
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '10px',
                        padding: '8px 15px',
                        background: `${moduleColor}20`,
                        borderRadius: '20px',
                        color: moduleColor
                    }}>
                        <i className={moduleIcon}></i> {moduleName}
                    </span>
                </p>

                <div style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'center'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '12px 24px',
                            background: 'transparent',
                            border: '2px solid var(--text-secondary)',
                            borderRadius: '8px',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.borderColor = '#fff';
                            e.target.style.color = '#fff';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.borderColor = 'var(--text-secondary)';
                            e.target.style.color = 'var(--text-secondary)';
                        }}
                    >
                        No, gracias
                    </button>

                    <button
                        onClick={onConfirm}
                        className="btn-primary"
                        style={{
                            padding: '12px 24px',
                            background: moduleColor || 'var(--accent-color)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '1rem'
                        }}
                    >
                        <span><i className="fa-solid fa-play"></i></span> Sí, reproducir
                    </button>
                </div>

                <p style={{
                    marginTop: '20px',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    opacity: 0.7
                }}>
                    El audio continuará aunque cambies de página
                </p>
            </div>

            <style>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                }
            `}</style>
        </div>
    );
};

export default AudioPromptModal;
