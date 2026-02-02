import React, { useState, useEffect } from 'react';
import './index.css';

// Context
import { AudioProvider, useAudio } from './context/AudioContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

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
import StudentDashboard from './components/StudentDashboard';
import WeeklyTest from './components/WeeklyTest';
import NotificationsBubble from './components/NotificationsBubble';
import PasswordChangeModal from './components/PasswordChangeModal';

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
            {theme === 'dark' ? '🌙' : '☀️'}
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
    const { user, isAdmin, logout, loading: authLoading } = useAuth();
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
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📖</div>
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
                        <span style={{ fontSize: '1.5rem' }}>📖</span>
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

            {/* Notifications Bubble */}
            <NotificationsBubble
                isOpen={showNotifications}
                onToggle={() => setShowNotifications(!showNotifications)}
                onClose={() => setShowNotifications(false)}
            />

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
                            fontSize: '2rem', // Increased
                            cursor: 'pointer',
                            padding: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ☰
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '2rem' }}>📖</span> {/* Increased */}
                        <span style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.5rem' }}> {/* Increased */}
                            EGEL Study
                        </span>
                    </div>
                </div>

                {/* Right side: Theme toggle, User info and mode */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>

                    {currentMode !== 'home' && (
                        <button
                            onClick={() => handleModeChange('home')}
                            style={{
                                background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                border: 'none',
                                color: 'var(--text-secondary)',
                                padding: '10px 20px', // Increased padding
                                cursor: 'pointer',
                                fontSize: '1.1rem', // Increased
                                fontWeight: '600',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            🏠 Inicio
                        </button>
                    )}



                    <FontSizeToggle />
                    <ThemeToggle />

                    <div style={{
                        background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        padding: '10px 20px', // Increased padding
                        cursor: 'pointer',
                        fontSize: '1.1rem', // Increased
                        fontWeight: '600',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                        onClick={() => handleModeChange('progress')}
                    >
                        <span style={{ fontSize: '1.2rem' }}>{user.avatar || '👤'}</span> {/* Increased */}
                        <span style={{ color: 'var(--accent-color)', fontSize: '1.1rem' }}> {/* Increased */}
                            {user.nombre.split(' ')[0]}
                        </span>
                    </div>

                    <span style={{
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
                        onClick={handleLogout}
                        style={{
                            background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                            border: 'none',
                            color: 'var(--text-secondary)',
                            padding: '10px 20px', // Increased padding
                            cursor: 'pointer',
                            fontSize: '1.1rem', // Increased
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

                {/* Admin Panel */}
                {currentMode === 'admin' && (
                    <AdminPanel onBack={() => handleModeChange('home')} />
                )}

                {/* Admin sub-modes */}
                {currentMode.startsWith('admin-') && (
                    <AdminPanel onBack={() => handleModeChange('home')} />
                )}
            </div>
        </div>
    );
}

// Helper function for mode labels
const getModeLabel = (mode) => {
    const labels = {
        home: '🏠 Inicio',
        lesson: '📚 Clases',
        quiz: '📝 Quiz',
        test: '🧠 Prueba',
        weekly: '📅 Semanal',
        progress: '📊 Progreso',
        class: '📖 Clase',
        login: '🔐 Login',
        admin: '⚙️ Admin',
        profile: '👤 Perfil'
    };
    return labels[mode] || mode;
};

// Main App with Providers
function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <AudioProvider>
                    <AppContent />
                </AudioProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
