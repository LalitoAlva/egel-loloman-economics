import React from 'react';
import { useAudio } from '../context/AudioContext';

const GlobalAudioPlayer = () => {
    const {
        isPlaying,
        currentTrack,
        currentTime,
        duration,
        volume,
        play,
        pause,
        stop,
        seek,
        setVolume,
        formatTime
    } = useAudio();

    if (!currentTrack) return null;

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            gap: '15px',
            zIndex: 1000,
            boxShadow: '0 2px 20px rgba(0,0,0,0.3)'
        }}>
            {/* Track info */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                minWidth: '200px'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: currentTrack.color || '#a855f7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    color: '#fff'
                }}>
                    {currentTrack.icon && currentTrack.icon.includes('fa-') ? (
                        <i className={currentTrack.icon}></i>
                    ) : (<i className="fa-solid fa-headphones"></i>)}
                </div>
                <div>
                    <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: '600' }}>
                        {currentTrack.title || 'Audio'}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>
                        {currentTrack.module || 'Módulo'}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
            }}>
                <button
                    onClick={isPlaying ? pause : play}
                    style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                        border: 'none',
                        color: '#fff',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                    {isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}
                </button>

                <button
                    onClick={stop}
                    style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        color: '#fff',
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                    }}
                >
                    <i className="fa-solid fa-stop"></i>
                </button>
            </div>

            {/* Progress bar */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', minWidth: '45px' }}>
                    {formatTime(currentTime)}
                </span>

                <div
                    style={{
                        flex: 1,
                        height: '6px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        position: 'relative'
                    }}
                    onClick={(e) => {
                        const rect = e.target.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        seek(percent * duration);
                    }}
                >
                    <div
                        style={{
                            width: `${progress}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #a855f7, #6366f1)',
                            borderRadius: '3px',
                            transition: 'width 0.1s'
                        }}
                    />
                </div>

                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', minWidth: '45px' }}>
                    {formatTime(duration)}
                </span>
            </div>

            {/* Volume */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '120px' }}>
                <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)' }}><i className="fa-solid fa-volume-up"></i></span>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    style={{
                        width: '80px',
                        accentColor: '#a855f7'
                    }}
                />
            </div>

            {/* Close Button */}
            <button
                onClick={stop}
                title="Cerrar reproductor"
                style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '1.2rem',
                    marginLeft: '10px'
                }}
            >
                ×
            </button>
        </div>
    );
};

export default GlobalAudioPlayer;
