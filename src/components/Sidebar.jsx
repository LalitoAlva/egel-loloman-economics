import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Sidebar = ({ isOpen, onClose, currentMode, onSetMode, user, onLogout, onChangePassword }) => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const menuItems = [
        { id: 'home', icon: '🏡', label: 'Inicio', mode: 'home' },
        { id: 'lesson', icon: '📖', label: 'Clases', mode: 'lesson' },
        { id: 'quiz', icon: '✏️', label: 'Quiz EGEL', mode: 'quiz' },
        { id: 'test', icon: '💭', label: 'Ponte a Prueba', mode: 'test' },
        { id: 'weekly', icon: '🗓️', label: 'Prueba Semanal', mode: 'weekly' },
        { id: 'progress', icon: '📈', label: 'Mi Progreso', mode: 'progress' },
    ];

    const isAdmin = user?.roles?.nombre === 'admin';

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 1100,
                        transition: 'opacity 0.3s'
                    }}
                />
            )}

            {/* Sidebar */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: isOpen ? 0 : '-300px',
                width: '280px',
                height: '100vh',
                background: theme === 'dark'
                    ? 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1a 100%)'
                    : 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
                zIndex: 1200,
                transition: 'left 0.3s ease, background 0.3s',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: isOpen ? '4px 0 30px rgba(0,0,0,0.3)' : 'none'
            }}>
                {/* Header */}
                <div style={{
                    padding: '20px',
                    borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '1.8rem' }}>📖</span>
                        <div>
                            <div style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                EGEL Study
                            </div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                                Guía de Estudio
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            fontSize: '1.5rem',
                            cursor: 'pointer'
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* User Section */}
                <div
                    style={{
                        padding: '15px 20px',
                        borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                        cursor: 'pointer'
                    }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '50%',
                            background: user
                                ? 'linear-gradient(135deg, #6366f1, #a855f7)'
                                : 'var(--bg-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.3rem'
                        }}>
                            {user?.avatar || '👤'}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                                {user?.nombre || 'Invitado'}
                            </div>
                            <div style={{
                                color: user?.roles?.nombre === 'admin' ? '#ef4444' :
                                    user?.roles?.nombre === 'profesor' ? '#3b82f6' :
                                        'var(--text-secondary)',
                                fontSize: '0.8rem',
                                fontWeight: user ? '500' : 'normal'
                            }}>
                                {user?.roles?.nombre
                                    ? user.roles.nombre.charAt(0).toUpperCase() + user.roles.nombre.slice(1)
                                    : 'Sin cuenta'}
                            </div>
                        </div>
                        <span style={{
                            color: 'var(--text-secondary)',
                            transform: showUserMenu ? 'rotate(180deg)' : 'rotate(0)',
                            transition: 'transform 0.2s'
                        }}>
                            ▼
                        </span>
                    </div>

                    {showUserMenu && (
                        <div style={{ marginTop: '10px', paddingLeft: '57px' }}>
                            {user ? (
                                <>
                                    <button
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: '8px 0',
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'var(--text-secondary)',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem'
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSetMode('progress');
                                            onClose();
                                        }}
                                    >
                                        📈 Mi Progreso
                                    </button>
                                    <button
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: '8px 0',
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'var(--accent-color)',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem'
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onChangePassword?.();
                                            onClose();
                                        }}
                                    >
                                        🔐 Cambiar Contraseña
                                    </button>
                                    <button
                                        style={{
                                            display: 'block',
                                            width: '100%',
                                            textAlign: 'left',
                                            padding: '8px 0',
                                            background: 'transparent',
                                            border: 'none',
                                            color: '#ef4444',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem'
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onLogout?.();
                                            onClose();
                                        }}
                                    >
                                        ↪️ Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <button
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        textAlign: 'left',
                                        padding: '8px 0',
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--accent-color)',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem'
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSetMode('login');
                                        onClose();
                                    }}
                                >
                                    🔐 Iniciar Sesión
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '10px 0' }}>
                    <div style={{
                        padding: '10px 20px',
                        color: 'var(--text-secondary)',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Navegación
                    </div>
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => {
                                onSetMode(item.mode);
                                onClose();
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                width: '100%',
                                padding: '12px 20px',
                                background: currentMode === item.mode ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                                border: 'none',
                                borderLeft: currentMode === item.mode ? '3px solid #a855f7' : '3px solid transparent',
                                color: currentMode === item.mode ? 'var(--accent-color)' : 'var(--text-secondary)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textAlign: 'left',
                                fontSize: '0.95rem'
                            }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                            {item.label}
                        </button>
                    ))}

                    {/* Admin Section */}
                    {isAdmin && (
                        <>
                            <div style={{
                                padding: '20px 20px 10px',
                                color: 'var(--text-secondary)',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                ⚡ Administración
                            </div>
                            <button
                                onClick={() => {
                                    onSetMode('admin');
                                    onClose();
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    width: '100%',
                                    padding: '12px 20px',
                                    background: currentMode === 'admin' || currentMode.startsWith('admin-')
                                        ? 'var(--bg-secondary)'
                                        : 'transparent',
                                    border: 'none',
                                    borderLeft: currentMode === 'admin' || currentMode.startsWith('admin-')
                                        ? '3px solid var(--accent-color)'
                                        : '3px solid transparent',
                                    color: currentMode === 'admin' || currentMode.startsWith('admin-')
                                        ? 'var(--accent-color)'
                                        : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    textAlign: 'left',
                                    fontSize: '0.95rem'
                                }}
                            >
                                <span style={{ fontSize: '1.2rem' }}>⚙️</span>
                                Panel de Admin
                            </button>
                        </>
                    )}
                </div>

                {/* Theme Toggle Section */}
                <div style={{
                    padding: '15px 20px',
                    borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        {theme === 'dark' ? '🌙' : '☀️'}
                        <span>Tema {theme === 'dark' ? 'Oscuro' : 'Claro'}</span>
                    </div>
                    <button
                        onClick={toggleTheme}
                        style={{
                            background: 'var(--accent-color)',
                            border: 'none',
                            color: '#fff',
                            padding: '6px 12px',
                            borderRadius: '15px',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        Cambiar
                    </button>
                </div>

                {/* Footer */}
                <div style={{
                    padding: '15px 20px',
                    borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                        EGEL Study v2.0
                    </div>
                    <button
                        onClick={() => {
                            onSetMode('notifications');
                            onClose();
                        }}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            position: 'relative'
                        }}
                    >
                        🔔
                        <span style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            width: '8px',
                            height: '8px',
                            background: '#ef4444',
                            borderRadius: '50%'
                        }} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
