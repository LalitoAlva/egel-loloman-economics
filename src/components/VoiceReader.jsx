import React, { useState, useEffect } from 'react';

const VoiceReader = ({ text }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [utterance, setUtterance] = useState(null);

    useEffect(() => {
        // Cancel speech when component unmounts
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    const toggleSpeech = () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            // Cancel any previous speech
            window.speechSynthesis.cancel();

            const newUtterance = new SpeechSynthesisUtterance(text);
            newUtterance.lang = 'es-MX'; // Mexican Spanish
            newUtterance.rate = 1;

            newUtterance.onend = () => {
                setIsSpeaking(false);
            };

            newUtterance.onerror = () => {
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
                background: isSpeaking ? '#ef4444' : 'var(--accent-color)', // Red to stop, accent to start
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
                marginBottom: '10px'
            }}
            title={isSpeaking ? "Detener lectura" : "Escuchar texto"}
        >
            <i className={isSpeaking ? "fa-solid fa-stop" : "fa-solid fa-volume-high"}></i>
        </button>
    );
};

export default VoiceReader;
