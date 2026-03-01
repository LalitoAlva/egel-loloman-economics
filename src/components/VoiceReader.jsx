import React, { useState, useEffect } from 'react';

const VoiceReader = ({ text }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
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
            .trim();
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
            window.speechSynthesis.cancel();
            setIsPaused(false);

            const textToRead = cleanText(text);

            // Divide el texto por saltos de línea para forzar una pausa natural en el motor TTS
            const chunks = textToRead.split(/\n+/).map(c => c.trim()).filter(c => c.length > 0);

            if (chunks.length === 0) return;

            // Try to find a good Spanish voice
            const voices = window.speechSynthesis.getVoices();
            const spanishVoice = voices.find(v => v.lang.includes('es-MX')) ||
                voices.find(v => v.lang.includes('es'));

            setIsSpeaking(true);

            chunks.forEach((chunk, index) => {
                const newUtterance = new SpeechSynthesisUtterance(chunk);

                if (spanishVoice) {
                    newUtterance.voice = spanishVoice;
                }

                newUtterance.lang = 'es-MX';
                newUtterance.rate = 1;

                // Solo el último bloque resetea el estado completo
                if (index === chunks.length - 1) {
                    newUtterance.onend = () => {
                        setIsSpeaking(false);
                        setIsPaused(false);
                    };
                }

                newUtterance.onerror = (e) => {
                    // Evitar registrar error intencional al cancelar flujo manualmente
                    if (e.error !== 'canceled' && e.error !== 'interrupted') {
                        console.error("Speech error", e);
                    }
                    setIsSpeaking(false);
                    setIsPaused(false);
                };

                window.speechSynthesis.speak(newUtterance);
            });
        }
    };

    return (
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
                marginBottom: '10px',
                fontSize: '1.2rem'
            }}
            title={!isSpeaking ? "Escuchar texto" : (isPaused ? "Reanudar lectura" : "Pausar lectura")}
        >
            <i className={!isSpeaking ? "fa-solid fa-volume-high" : (isPaused ? "fa-solid fa-play" : "fa-solid fa-pause")}></i>
        </button>
    );
};

export default VoiceReader;
