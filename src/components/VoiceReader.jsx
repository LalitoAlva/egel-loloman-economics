import React, { useState, useEffect } from 'react';

const VoiceReader = ({ text }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [utterance, setUtterance] = useState(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    // Helper to strip markdown for cleaner reading
    const cleanText = (md) => {
        if (!md) return '';
        return md
            .replace(/#{1,6}\s/g, '') // Remove headers
            .replace(/(\*\*|__)(.*?)\1/g, '$2') // Remove bold
            .replace(/(\*|_)(.*?)\1/g, '$2') // Remove italic
            .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links
            .replace(/`{1,3}[^`]*`{1,3}/g, 'Código') // Remove code blocks
            .replace(/[-*]\s/g, '') // Remove list bullets
            .replace(/\n+/g, '... ') // Force pauses for TTS at line breaks
            .trim();
    };

    const startSpeech = () => {
        window.speechSynthesis.cancel();
        setIsPaused(false);

        const textToRead = cleanText(text);
        const newUtterance = new SpeechSynthesisUtterance(textToRead);

        // Try to find a good Spanish voice
        const voices = window.speechSynthesis.getVoices();
        const spanishVoice = voices.find(v => v.lang.includes('es-MX')) ||
            voices.find(v => v.lang.includes('es'));

        if (spanishVoice) {
            newUtterance.voice = spanishVoice;
        }

        newUtterance.lang = 'es-MX';
        newUtterance.rate = 1;

        newUtterance.onend = () => {
            setIsSpeaking(false);
            setIsPaused(false);
        };

        newUtterance.onerror = (e) => {
            // Evitar registrar error intencional al cancelar flujo manualmente
            if (e.error !== 'canceled' && e.error !== 'interrupted') {
                console.error("Speech error", e);
            }
            setIsSpeaking(false);
            setIsPaused(false);
        };

        setUtterance(newUtterance);

        // Timeout para asegurar que cualquier lectura anterior fue cancelada por completo
        setTimeout(() => {
            window.speechSynthesis.speak(newUtterance);
            setIsSpeaking(true);
        }, 50);
    };

    const toggleSpeech = () => {
        if (isSpeaking) {
            if (isPaused) {
                window.speechSynthesis.resume();
                setIsPaused(false);
            } else {
                window.speechSynthesis.pause();
                setIsPaused(true);
            }
        } else {
            startSpeech();
        }
    };

    const stopSpeech = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
    };

    const restartSpeech = () => {
        startSpeech();
    };

    return (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
            <button
                onClick={toggleSpeech}
                style={{
                    background: isSpeaking ? (isPaused ? '#eab308' : '#ef4444') : 'var(--accent-color)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    fontSize: '1.2rem'
                }}
                title={!isSpeaking ? "Escuchar texto" : (isPaused ? "Reanudar lectura" : "Pausar lectura")}
            >
                <i className={!isSpeaking ? "fa-solid fa-volume-high" : (isPaused ? "fa-solid fa-play" : "fa-solid fa-pause")}></i>
            </button>

            {isSpeaking && (
                <>
                    <button
                        onClick={restartSpeech}
                        style={{
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'all 0.2s'
                        }}
                        title="Reiniciar lectura desde el principio"
                    >
                        <i className="fa-solid fa-rotate-left"></i>
                    </button>
                    <button
                        onClick={stopSpeech}
                        style={{
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            transition: 'all 0.2s'
                        }}
                        title="Detener lectura"
                    >
                        <i className="fa-solid fa-stop"></i>
                    </button>
                </>
            )}
        </div>
    );
};

export default VoiceReader;
