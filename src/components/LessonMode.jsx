import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAudio } from '../context/AudioContext';
import AudioPromptModal from './AudioPromptModal';

const LessonMode = ({ onBack }) => {
    const [modulos, setModulos] = useState([]);
    const [selectedModulo, setSelectedModulo] = useState(null);
    const [contenido, setContenido] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showInfografiaModal, setShowInfografiaModal] = useState(false);

    // Escape Key listener for Infografia Modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (showInfografiaModal && e.key === 'Escape') {
                setShowInfografiaModal(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showInfografiaModal]);
    const [showAudioPrompt, setShowAudioPrompt] = useState(false);

    // Use global audio context
    const { playTrack, currentTrack, isPlaying } = useAudio();

    // Altura fija para todas las tarjetas (consistencia en botones)
    const CARD_HEIGHT = '60vh';

    // Cargar módulos
    useEffect(() => {
        loadModulos();
    }, []);

    const loadModulos = async () => {
        const { data, error } = await supabase
            .from('modulos')
            .select('*')
            .order('numero');

        if (!error && data) {
            setModulos(data);
        }
        setLoading(false);
    };

    // Toggle body class for mobile scroll locking
    useEffect(() => {
        if (selectedModulo) {
            document.body.classList.add('lesson-mode-active');
        } else {
            document.body.classList.remove('lesson-mode-active');
        }
        return () => {
            document.body.classList.remove('lesson-mode-active');
        };
    }, [selectedModulo]);

    // Cargar contenido del módulo seleccionado (con infografía como primera tarjeta)
    const loadContenido = async (moduloId, modulo) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('contenido_clase')
            .select('*')
            .eq('modulo_id', moduloId)
            .order('orden');

        if (!error && data) {
            // Crear tarjeta de infografía como primera
            const infografiaCard = {
                id: 'infografia-intro',
                tipo: 'infografia',
                titulo: `📖 Introducción: ${modulo.titulo}`,
                contenido: null,
                isInfografia: true
            };

            // Prepend infografía al inicio del contenido
            setContenido([infografiaCard, ...data]);
            setCurrentIndex(0);
        }
        setLoading(false);
    };

    const selectModulo = (modulo) => {
        setSelectedModulo(modulo);
        loadContenido(modulo.id, modulo);

        // Show audio prompt if module has audio and it's not already playing
        if (modulo.audio_url && currentTrack?.module !== modulo.titulo) {
            setShowAudioPrompt(true);
        }
    };

    const handleAudioPromptConfirm = () => {
        if (selectedModulo?.audio_url) {
            playTrack({
                url: selectedModulo.audio_url,
                title: `Audio Clase`,
                module: selectedModulo.titulo,
                icon: selectedModulo.icon,
                color: selectedModulo.color
            });
        }
        setShowAudioPrompt(false);
    };

    const nextCard = () => {
        if (currentIndex < contenido.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevCard = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const toggleAudio = () => {
        if (selectedModulo?.audio_url) {
            playTrack({
                url: selectedModulo.audio_url,
                title: `Audio Clase`,
                module: selectedModulo.titulo,
                icon: selectedModulo.icon,
                color: selectedModulo.color
            });
        }
    };

    // Check if current module's audio is playing
    const isCurrentModulePlaying = currentTrack?.module === selectedModulo?.titulo && isPlaying;

    // Renderizado simple de Markdown
    const renderMarkdown = (text) => {
        if (!text) return null;

        return text.split('\n').map((line, i) => {
            // Headers
            if (line.startsWith('### ')) return <h4 key={i} style={{ color: 'var(--accent-color)', marginTop: '20px' }}>{line.replace('### ', '')}</h4>;
            if (line.startsWith('## ')) return <h3 key={i} style={{ color: 'var(--text-primary)', marginTop: '25px' }}>{line.replace('## ', '')}</h3>;
            if (line.startsWith('# ')) return <h2 key={i} style={{ color: 'var(--warning-color)', marginTop: '30px' }}>{line.replace('# ', '')}</h2>;

            // Lists
            if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
                return <li key={i} style={{ marginLeft: '20px', marginBottom: '8px' }}>{line.replace(/^[\s]*[\*\-]\s/, '')}</li>;
            }
            if (line.match(/^\d+\.\s/)) {
                return <li key={i} style={{ marginLeft: '20px', marginBottom: '8px', listStyleType: 'decimal' }}>{line.replace(/^\d+\.\s/, '')}</li>;
            }

            // Bold
            if (line.includes('**')) {
                const parts = line.split('**');
                return (
                    <p key={i} style={{ marginBottom: '12px', lineHeight: '1.7' }}>
                        {parts.map((part, j) => j % 2 === 1 ? <strong key={j} style={{ color: 'var(--warning-color)' }}>{part}</strong> : part)}
                    </p>
                );
            }

            // Empty
            if (line.trim() === '') return <br key={i} />;

            // Normal text
            return <p key={i} style={{ marginBottom: '12px', lineHeight: '1.7' }}>{line}</p>;
        });
    };

    // Pantalla de carga
    if (loading && modulos.length === 0) {
        return (
            <div className="container fade-in" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏳</div>
                    <p>Cargando módulos...</p>
                </div>
            </div>
        );
    }

    // Selección de módulo
    if (!selectedModulo) {
        return (
            <div className="container fade-in">
                <div style={{ maxWidth: '600px', margin: '0 auto 10px auto' }}>
                    <button
                        onClick={onBack}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        ← Volver al Inicio
                    </button>
                </div>

                <header style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h1 style={{ fontSize: '1.8rem', marginBottom: '5px' }}>📚 Clases por Módulo</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Selecciona un módulo para estudiar</p>
                </header>

                <div className="module-grid">
                    {modulos.map((mod, index) => (
                        <div
                            key={mod.id}
                            className="slide-card clickable-card fade-in"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                borderLeft: `8px solid ${mod.color}`,
                                padding: '25px',
                                cursor: 'pointer'
                            }}
                            onClick={() => selectModulo(mod)}
                        >
                            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{mod.icon}</div>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '10px' }}>{mod.titulo}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{mod.descripcion || 'Contenido completo del módulo'}</p>

                            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                                {mod.audio_url && (
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>🎧 Audio</span>
                                )}
                                {mod.infografia_url && (
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>🖼️ Infografía</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Audio Prompt Modal
    const audioPromptModal = (
        <AudioPromptModal
            isOpen={showAudioPrompt}
            onClose={() => setShowAudioPrompt(false)}
            onConfirm={handleAudioPromptConfirm}
            moduleName={selectedModulo?.titulo}
            moduleIcon={selectedModulo?.icon}
            moduleColor={selectedModulo?.color}
        />
    );

    // Modal de infografía (pantalla completa)
    if (showInfografiaModal && selectedModulo.infografia_url) {
        return (
            <div className="fade-in" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.95)',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                padding: '20px'
            }}>
                <button
                    onClick={() => setShowInfografiaModal(false)}
                    style={{
                        alignSelf: 'flex-end',
                        background: 'transparent',
                        color: '#fff',
                        fontSize: '1.5rem',
                        marginBottom: '20px'
                    }}
                >
                    ✕ Cerrar
                </button>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto' }}>
                    <img
                        src={selectedModulo.infografia_url}
                        alt={`Infografía ${selectedModulo.titulo}`}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                </div>
            </div>
        );
    }

    // Vista de contenido en tarjetas
    const currentCard = contenido[currentIndex];
    const totalCards = contenido.length;
    const progress = totalCards > 0 ? ((currentIndex + 1) / totalCards) * 100 : 0;

    return (
        <div className="container fade-in">
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <button onClick={() => setSelectedModulo(null)} style={{ background: 'transparent', color: 'var(--text-secondary)' }}>
                    ← Módulos
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {selectedModulo.infografia_url && (
                        <button
                            onClick={() => setShowInfografiaModal(true)}
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--text-secondary)',
                                color: 'var(--text-secondary)',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            🔍 <span className="hidden-on-mobile">Ver completa</span>
                        </button>
                    )}
                    {selectedModulo.audio_url && (
                        <button
                            onClick={toggleAudio}
                            style={{
                                background: isCurrentModulePlaying ? selectedModulo.color : 'transparent',
                                border: `1px solid ${selectedModulo.color}`,
                                color: isCurrentModulePlaying ? '#000' : selectedModulo.color,
                                padding: '8px 12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            {isCurrentModulePlaying ? (
                                <>⏸️ <span className="hidden-on-mobile">Reproduciendo</span></>
                            ) : (
                                <>🎧 <span className="hidden-on-mobile">Audio</span></>
                            )}
                        </button>
                    )}
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                        {currentIndex + 1} / {totalCards}
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: '6px', background: 'var(--bg-secondary)', borderRadius: '4px', marginBottom: '30px', overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: selectedModulo.color, transition: 'width 0.3s' }} />
            </div>

            {/* Content Card - Tamaño consistente */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '60px', height: CARD_HEIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p>Cargando contenido...</p>
                </div>
            ) : currentCard ? (
                <div className="slide-card fade-in" key={currentIndex} style={{
                    width: '100%',
                    maxWidth: '900px',
                    margin: '0 auto', // Will be overridden by CSS on mobile if needed, but keeping for desktop
                    borderTop: `6px solid ${selectedModulo.color}`,
                    // height removed here, handled by CSS min-height
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <button className="close-btn" onClick={() => setSelectedModulo(null)} title="Cerrar lección">×</button>
                    {/* Card header */}
                    <div style={{ marginBottom: '15px', flexShrink: 0 }}>
                        <span className="tag" style={{ background: `${selectedModulo.color}22`, color: 'var(--text-secondary)', marginBottom: '10px' }}>
                            {selectedModulo.icon} {selectedModulo.titulo}
                        </span>
                        <h2 style={{ fontSize: '1.5rem', marginTop: '12px', color: 'var(--text-primary)' }}>
                            {currentCard.titulo}
                        </h2>
                    </div>

                    {/* Card content - Adaptado para infografía o texto */}
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        paddingRight: '10px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {currentCard.isInfografia ? (
                            // Tarjeta de infografía
                            <div style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                gap: '20px'
                            }}>
                                {selectedModulo.infografia_url ? (
                                    <>
                                        <img
                                            src={selectedModulo.infografia_url}
                                            alt={`Infografía ${selectedModulo.titulo}`}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '35vh',
                                                objectFit: 'contain',
                                                borderRadius: '12px',
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => setShowInfografiaModal(true)}
                                        />
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                            👆 Toca la imagen para verla en pantalla completa
                                        </p>
                                    </>
                                ) : (
                                    <div style={{ padding: '40px', color: 'var(--text-secondary)' }}>
                                        <p style={{ fontSize: '3rem', marginBottom: '15px' }}>🖼️</p>
                                        <p>Infografía no disponible para este módulo</p>
                                    </div>
                                )}
                                <div style={{
                                    marginTop: '15px',
                                    padding: '15px 25px',
                                    background: `${selectedModulo.color}15`,
                                    borderRadius: '12px',
                                    borderLeft: `4px solid ${selectedModulo.color}`
                                }}>
                                    <p style={{ color: 'var(--text-primary)', margin: 0 }}>
                                        Esta infografía resume los conceptos clave del módulo.<br />
                                        <strong style={{ color: 'var(--text-primary)' }}>¡Avanza para comenzar la clase!</strong>
                                    </p>
                                </div>
                            </div>
                        ) : (
                            // Tarjeta de contenido normal
                            <div style={{
                                fontSize: '1.02rem',
                                color: 'var(--text-secondary)',
                                lineHeight: '1.7'
                            }}>
                                {renderMarkdown(currentCard.contenido)}
                            </div>
                        )}
                    </div>

                    {/* Navigation - Siempre en la misma posición */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 'auto',
                        paddingTop: '20px',
                        borderTop: '1px solid var(--card-border)',
                        flexShrink: 0
                    }}>
                        <button
                            onClick={prevCard}
                            disabled={currentIndex === 0}
                            style={{
                                padding: '12px 24px',
                                background: currentIndex === 0 ? 'rgba(0,0,0,0.05)' : 'transparent',
                                border: currentIndex === 0 ? '2px solid var(--card-border)' : '2px solid var(--text-secondary)',
                                color: currentIndex === 0 ? 'var(--text-secondary)' : 'var(--text-primary)',
                                borderRadius: '8px',
                                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                                opacity: currentIndex === 0 ? 1 : 1
                            }}
                        >
                            ← Anterior
                        </button>

                        {currentIndex < totalCards - 1 ? (
                            <button
                                onClick={nextCard}
                                className="btn-primary"
                                style={{ background: selectedModulo.color, width: 'auto', marginTop: 0 }}
                            >
                                {currentCard.isInfografia ? 'Comenzar clase →' : 'Siguiente →'}
                            </button>
                        ) : (
                            <button
                                onClick={() => setSelectedModulo(null)}
                                className="btn-primary"
                                style={{ background: 'var(--success-color)', width: 'auto', marginTop: 0 }}
                            >
                                ✓ Completado
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="slide-card" style={{ textAlign: 'center', height: CARD_HEIGHT, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h2>No hay contenido disponible</h2>
                    <p>Este módulo aún no tiene tarjetas de contenido.</p>
                    <button className="btn-primary" onClick={() => setSelectedModulo(null)} style={{ marginTop: '20px' }}>
                        Volver a módulos
                    </button>
                </div>
            )
            }

            {/* Audio Prompt Modal */}
            {audioPromptModal}
        </div >
    );
};

export default LessonMode;
