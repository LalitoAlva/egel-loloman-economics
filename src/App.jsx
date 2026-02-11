import React, { useState, useEffect } from 'react';
import './index.css';

// Context
import { AudioProvider, useAudio } from './context/AudioContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { SessionProvider } from './context/SessionContext';

// Components
import HomeScreen from './components/HomeScreen';
import SocraticMode from './components/SocraticMode';
import ClassMode from './components/ClassMode';
import QuizMode from './components/QuizMode';
import LessonMode from './components/LessonMode';
import Sidebar from './components/Sidebar';
import GlobalAudioPlayer from './components/GlobalAudioPlayer';
import LoginScreen from './components/LoginScreen';
import AdminPanel from './components/AdminPanel';
import ContentManager from './components/ContentManager';
import StudentDashboard from './components/StudentDashboard';
import WeeklyTest from './components/WeeklyTest';
import NotificationsBubble from './components/NotificationsBubble';
import PasswordChangeModal from './components/PasswordChangeModal';
import SessionTimeoutModal from './components/SessionTimeoutModal';

const FontSizeToggle = () => {
    const { fontSize, cycleFontSize, theme } = useTheme();

    const getLabel = () => {
        if (fontSize === 'small') return 'A-';
        if (fontSize === 'medium') return 'A';
        if (fontSize === 'large') return 'A+';
        return 'A';
    };

    return (
        <button
            onClick={cycleFontSize}
            title={`Tamaño de letra: ${fontSize}`}
            style={{
                width: '40px',
                height: '40px',
                justifyContent: 'center',
                fontSize: '1rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                border: 'none',
                color: 'var(--text-secondary)',
                padding: '10px 20px', // Increased padding
                cursor: 'pointer',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'

            }}
        >
            {getLabel()}
        </button>
    );
};

// Theme Toggle Button Component
const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            style={{
                width: '40px',
                height: '40px',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                border: 'none',
                color: 'var(--text-secondary)',
                padding: '10px 20px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: '600',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}
        >
            <i className={theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'}></i>
        </button>
    );
};

function AppContent() {
    const [activeModule, setActiveModule] = useState(null);
    const [currentMode, setCurrentMode] = useState('home');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const { currentTrack } = useAudio();
    const { user, isAdmin, logout, loading: authLoading, showInactivityWarning, warningCountdown, dismissWarning } = useAuth();
    const { theme } = useTheme();

    const handleModeChange = (mode) => {
        setCurrentMode(mode);
        if (mode === 'home') {
            setActiveModule(null);
        }
    };

    const handleSelectModule = (module) => {
        setActiveModule(module);
    };

    const handleLoginSuccess = () => {
        setCurrentMode('home');
    };

    const handleLogout = () => {
        logout();
        setCurrentMode('home');
    };

    // Show loading while checking auth
    if (authLoading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-primary)',
                transition: 'background 0.3s'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px', color: 'var(--accent-color)' }}>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                    </div>
                    <p style={{ color: 'var(--text-secondary)' }}>Cargando EGEL Study...</p>
                </div>
            </div>
        );
    }

    // If not logged in, show only login screen
    if (!user) {
        return (
            <div className="app-shell">
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '60px',
                    background: theme === 'dark' ? 'rgba(15, 15, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.1)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 20px',
                    zIndex: 900
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <i className="fa-solid fa-graduation-cap" style={{ fontSize: '1.5rem', color: 'var(--accent-color)' }}></i>
                        <span style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.1rem' }}>
                            EGEL Study
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <FontSizeToggle />
                        <ThemeToggle />
                    </div>
                </div>

                <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
                    <LoginScreen
                        onBack={() => { }}
                        onSuccess={handleLoginSuccess}
                        hideBackButton={true}
                    />
                </div>
            </div>
        );
    }

    // Logged in - show full app
    return (
        <div className="app-shell">
            {/* Global Audio Player - Fixed at top */}
            <GlobalAudioPlayer />

            {/* Sidebar */}

            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                currentMode={currentMode}
                onSetMode={handleModeChange}
                user={user}
                onLogout={handleLogout}
                onChangePassword={() => setShowPasswordModal(true)}
            />

            {/* Password Change Modal */}
            <PasswordChangeModal
                isOpen={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            />

            {/* Top Bar with Hamburger */}
            <div style={{
                position: 'fixed',
                top: currentTrack ? '60px' : '0',
                left: 0,
                right: 0,
                height: '60px',
                background: theme === 'dark' ? 'rgba(15, 15, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.1)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px',
                zIndex: 900,
                transition: 'top 0.3s, background 0.3s'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-primary)',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            padding: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <i className="fa-solid fa-graduation-cap" style={{ fontSize: '1.8rem', color: 'var(--accent-color)' }}></i>
                        <span style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.5rem' }}>
                            EGEL Study
                        </span>
                    </div>
                </div>

                {/* Right side: Theme toggle, User info and mode */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    }}>

                    {currentMode !== 'home' && (
                        <button
                            className="hidden-on-mobile"
                            onClick={() => handleModeChange('home')}
                            style={{
                                background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                border: 'none',
                                color: 'var(--text-secondary)',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <i className="fa-solid fa-house"></i> Inicio
                        </button>
                    )}

                    <div className="hidden-on-mobile">
                        <FontSizeToggle />
                    </div>
                    <div className="hidden-on-mobile">
                        <ThemeToggle />
                    </div>

                    {/* Notifications (Mobile & Desktop) */}
                    <NotificationsBubble
                        isOpen={showNotifications}
                        onToggle={() => setShowNotifications(!showNotifications)}
                        onClose={() => setShowNotifications(false)}
                        inline={true}
                        style={{ marginRight: '5px' }}
                    />

                    <div style={{
                        background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                        onClick={() => handleModeChange('profile')}
                    >
                        <i className="fa-solid fa-user-circle" style={{ fontSize: '1.3rem' }}></i>
                        <span className="hidden-on-mobile" style={{ color: 'var(--accent-color)', fontSize: '1.1rem' }}>
                            {user.nombre.split(' ')[0]}
                        </span>
                    </div>

                    <span className="hidden-on-mobile" style={{
                        padding: '10px 20px',
                        background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        {getModeLabel(currentMode)}
                    </span>

                    <button
                        className="hidden-on-mobile"
                        onClick={handleLogout}
                        style={{
                            background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        Salir
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{
                paddingTop: currentTrack ? '140px' : '80px',
                minHeight: '100vh',
                transition: 'padding-top 0.3s'
            }}>
                {currentMode === 'home' && (
                    <HomeScreen
                        onSelectModule={handleSelectModule}
                        onSetMode={handleModeChange}
                    />
                )}

                {currentMode === 'lesson' && (
                    <LessonMode onBack={() => handleModeChange('home')} />
                )}

                {currentMode === 'quiz' && (
                    <QuizMode onBack={() => handleModeChange('home')} />
                )}

                {currentMode === 'test' && (
                    <SocraticMode
                        module={activeModule}
                        onBack={() => handleModeChange('home')}
                    />
                )}

                {currentMode === 'class' && activeModule && (
                    <ClassMode
                        module={activeModule}
                        onBack={() => handleModeChange('home')}
                    />
                )}

                {currentMode === 'weekly' && (
                    <WeeklyTest onBack={() => handleModeChange('home')} />
                )}

                {currentMode === 'progress' && (
                    <StudentDashboard onBack={() => handleModeChange('home')} />
                )}

                {currentMode === 'profile' && (
                    <StudentDashboard onBack={() => handleModeChange('home')} />
                )}

                {/* Content Manager - Independent section */}
                {currentMode === 'content-manager' && (
                    <ContentManager onBack={() => handleModeChange('home')} />
                )}

                {/* Admin Panel */}
                {currentMode === 'admin' && (
                    <AdminPanel onBack={() => handleModeChange('home')} />
                )}

                {/* Admin sub-modes */}
                {currentMode.startsWith('admin-') && (
                    <AdminPanel onBack={() => handleModeChange('home')} />
                )}
            </div>

            {/* ⏱️ Modal de advertencia por inactividad */}
            {showInactivityWarning && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 9999, animation: 'fadeIn 0.3s ease'
                }}>
                    <div style={{
                        background: 'var(--bg-secondary)', border: '2px solid var(--warning-color)',
                        borderRadius: '20px', padding: '40px', maxWidth: '420px', width: '90%',
                        textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                    }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '16px', color: 'var(--warning-color)' }}>
                            <i className="fa-solid fa-clock"></i>
                        </div>
                        <h2 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', marginBottom: '12px' }}>
                            Sesión a punto de expirar
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '8px' }}>
                            Has estado inactivo por un rato.
                        </p>
                        <div style={{
                            fontSize: '2.5rem', fontWeight: '800', color: 'var(--error-color)',
                            margin: '16px 0', fontVariantNumeric: 'tabular-nums'
                        }}>
                            {warningCountdown}s
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                            Tu sesión se cerrará automáticamente
                        </p>
                        <button
                            onClick={dismissWarning}
                            style={{
                                background: 'var(--accent-color)', color: '#fff', border: 'none',
                                padding: '14px 40px', borderRadius: '12px', fontSize: '1.1rem',
                                fontWeight: '700', cursor: 'pointer', width: '100%',
                                transition: 'transform 0.2s'
                            }}
                            onMouseDown={(e) => e.target.style.transform = 'scale(0.97)'}
                            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            <i className="fa-solid fa-hand"></i> Seguir aquí
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper function for mode labels with FA icons
const getModeLabel = (mode) => {
    const labels = {
        home: { icon: 'fa-solid fa-house', text: 'Inicio' },
        lesson: { icon: 'fa-solid fa-book-open', text: 'Clases' },
        quiz: { icon: 'fa-solid fa-clipboard-question', text: 'Quiz' },
        test: { icon: 'fa-solid fa-brain', text: 'Prueba' },
        weekly: { icon: 'fa-solid fa-calendar-check', text: 'Semanal' },
        progress: { icon: 'fa-solid fa-chart-line', text: 'Progreso' },
        class: { icon: 'fa-solid fa-chalkboard-user', text: 'Clase' },
        login: { icon: 'fa-solid fa-lock', text: 'Login' },
        admin: { icon: 'fa-solid fa-gear', text: 'Admin' },
        'content-manager': { icon: 'fa-solid fa-sliders', text: 'Administrar Contenido' },
        profile: { icon: 'fa-solid fa-user', text: 'Perfil' }
    };
    const label = labels[mode];
    if (label) {
        return (
            <>
                <i className={label.icon} style={{ marginRight: '6px' }}></i>
                {label.text}
            </>
        );
    }
    return mode;
};

// Main App with Providers
function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <SessionProvider>
                    <AudioProvider>
                        <AppContent />
                        <SessionTimeoutModal />
                    </AudioProvider>
                </SessionProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
