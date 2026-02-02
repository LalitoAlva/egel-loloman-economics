import React from 'react';

const Navbar = ({ currentMode, onSetMode }) => {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            padding: '20px',
            background: 'rgba(30, 41, 59, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--card-border)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <button
                onClick={() => onSetMode('lesson')}
                className={currentMode === 'lesson' ? 'btn-primary' : ''}
                style={{
                    background: currentMode === 'lesson' ? '#10b981' : 'transparent',
                    color: currentMode === 'lesson' ? '#0f172a' : 'var(--text-secondary)',
                    border: currentMode === 'lesson' ? 'none' : '1px solid var(--text-secondary)',
                    padding: '10px 20px',
                    margin: 0,
                    borderRadius: '50px',
                    fontSize: '1rem',
                    width: 'auto',
                    transition: 'all 0.3s'
                }}
            >
                📚 Clases
            </button>

            <button
                onClick={() => onSetMode('class')}
                className={currentMode === 'class' ? 'btn-primary' : ''}
                style={{
                    background: currentMode === 'class' ? 'var(--accent-color)' : 'transparent',
                    color: currentMode === 'class' ? '#0f172a' : 'var(--text-secondary)',
                    border: currentMode === 'class' ? 'none' : '1px solid var(--text-secondary)',
                    padding: '10px 20px',
                    margin: 0,
                    borderRadius: '50px',
                    fontSize: '1rem',
                    width: 'auto',
                    transition: 'all 0.3s'
                }}
            >
                📖 Informes
            </button>

            <button
                onClick={() => onSetMode('test')}
                className={currentMode === 'test' ? 'btn-primary' : ''}
                style={{
                    background: currentMode === 'test' ? 'var(--warning-color)' : 'transparent',
                    color: currentMode === 'test' ? '#0f172a' : 'var(--text-secondary)',
                    border: currentMode === 'test' ? 'none' : '1px solid var(--text-secondary)',
                    padding: '10px 20px',
                    margin: 0,
                    borderRadius: '50px',
                    fontSize: '1rem',
                    width: 'auto',
                    transition: 'all 0.3s'
                }}
            >
                🧠 Ponte a Prueba
            </button>

            <button
                onClick={() => onSetMode('quiz')}
                className={currentMode === 'quiz' ? 'btn-primary' : ''}
                style={{
                    background: currentMode === 'quiz' ? '#a855f7' : 'transparent',
                    color: currentMode === 'quiz' ? '#0f172a' : 'var(--text-secondary)',
                    border: currentMode === 'quiz' ? 'none' : '1px solid var(--text-secondary)',
                    padding: '10px 20px',
                    margin: 0,
                    borderRadius: '50px',
                    fontSize: '1rem',
                    width: 'auto',
                    transition: 'all 0.3s'
                }}
            >
                📝 Quiz EGEL
            </button>
        </nav>
    );
};

export default Navbar;
