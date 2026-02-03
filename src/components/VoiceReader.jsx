import React, { useState, useEffect } from 'react';

const VoiceReader = ({ text }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [utterance, setUtterance] = useState(null);

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
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            window.speechSynthesis.cancel();

            const textToRead = cleanText(text);
            const newUtterance = new SpeechSynthesisUtterance(textToRead);

            // Try to find a good Spanish voice
            const voices = window.speechSynthesis.getVoices();
            const spanishVoice = voices.find(v => v.lang.includes('es-MX')) ||
                voices.find(v => v.lang.includes('es'));

            if (spanishVoice) {
                newUtterance.voice = spanishVoice;
            }
            // Fallback is default system voice

            newUtterance.lang = 'es-MX';
            newUtterance.rate = 1;

            newUtterance.onend = () => setIsSpeaking(false);
            newUtterance.onerror = (e) => {
                console.error("Speech error", e);
                setIsSpeaking(false);
            };

            setUtterance(newUtterance);
            window.speechSynthesis.speak(newUtterance);
            setIsSpeaking(true);
        }
    };

    return (
        <button
            onClick={toggleSpeech}
            style={{
                background: isSpeaking ? '#ef4444' : 'var(--accent-color)',
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
            title={isSpeaking ? "Detener lectura" : "Escuchar texto"}
        >
            <i className={isSpeaking ? "fa-solid fa-stop" : "fa-solid fa-volume-high"}></i>
        </button>
    );
};

export default VoiceReader;
