import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAudio } from '../context/AudioContext';
import AudioPromptModal from './AudioPromptModal';
import VoiceReader from './VoiceReader';
import { useAuth } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const LessonMode = ({ onBack }) => {
    const { user } = useAuth();
    const [modulos, setModulos] = useState([]);
    const [selectedModulo, setSelectedModulo] = useState(null);
    const [contenido, setContenido] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showInfografiaModal, setShowInfografiaModal] = useState(false);
    const [progresoDB, setProgresoDB] = useState(0); // Tracks maximum card seen in DB
    const [progresoId, setProgresoId] = useState(null); // Tracks DB record ID if it exists

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
            const fullContent = [infografiaCard, ...data];
            setContenido(fullContent);

            // Load user progress
            if (user) {
                const { data: progData } = await supabase
                    .from('progreso_modulo')
                    .select('id, tarjetas_vistas')
                    .eq('usuario_id', user.id)
                    .eq('modulo', moduloId)
                    .single();

                if (progData) {
                    setProgresoId(progData.id);
                    setProgresoDB(progData.tarjetas_vistas || 0);

                    // Resume if not completed, else start at 0
                    if (progData.tarjetas_vistas > 0 && progData.tarjetas_vistas < fullContent.length - 1) {
                        setCurrentIndex(progData.tarjetas_vistas);
                    } else {
                        setCurrentIndex(0);
                    }
                } else {
                    setProgresoId(null);
                    setProgresoDB(0);
                    setCurrentIndex(0);
                }
            } else {
                setCurrentIndex(0);
            }
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

    const nextCard = async () => {
        if (currentIndex < contenido.length - 1) {
            const nextIdx = currentIndex + 1;
            setCurrentIndex(nextIdx);

            // Save progress to DB if we've reached a new max
            if (user && selectedModulo && nextIdx > progresoDB) {
                setProgresoDB(nextIdx);

                const progressPayload = {
                    usuario_id: user.id,
                    modulo: selectedModulo.id,
                    tarjetas_vistas: nextIdx,
                    tarjetas_totales: contenido.length,
                    completado: nextIdx === contenido.length - 1
                };

                if (progresoId) {
                    await supabase
                        .from('progreso_modulo')
                        .update(progressPayload)
                        .eq('id', progresoId);
                } else {
                    const { data } = await supabase
                        .from('progreso_modulo')
                        .insert([progressPayload])
                        .select()
                        .single();

                    if (data) setProgresoId(data.id);
                }
            }
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

    // Separar contenido de media embebida (formato: texto\n\n---MEDIA---\n{JSON})
    const parseContentMedia = (contenido) => {
        if (!contenido) return { text: '', media: {} };
        const sep = '\n\n---MEDIA---\n';
        const parts = contenido.split(sep);
        let media = {};
        if (parts[1]) { try { media = JSON.parse(parts[1]); } catch (e) { } }
        return { text: parts[0], media };
    };

    // Detectar si el texto contiene tags HTML
    const isHTML = (text) => /<[a-z][\s\S]*>/i.test(text);

    // Sanitizar contenido HTML: limpiar imágenes rotas y agregar onError inline
    const sanitizeHTMLContent = (html) => {
        if (!html) return '';
        // Eliminar img tags con src vacío, null o undefined
        let cleaned = html.replace(/<img\b[^>]*>/gi, (match) => {
            const srcMatch = match.match(/src\s*=\s*["']([^"']*)["']/i);
            const src = srcMatch ? srcMatch[1].trim() : '';
            if (!src || src === 'null' || src === 'undefined' || src === 'about:blank') {
                return ''; // Eliminar tag completamente
            }
            // Agregar onerror a imágenes válidas para ocultar si no cargan
            if (!match.includes('onerror')) {
                return match.replace(/^<img/, '<img onerror="this.style.display=\'none\'"');
            }
            return match;
        });
        return cleaned;
    };

    // Limpiar HTML para VoiceReader (texto plano sin tags)
    const stripHTML = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
    };

    // Procesar negritas, cursivas e imágenes inline en cualquier texto
    const processInline = (text, keyPrefix) => {
        if (!text) return text;
        // Procesar imágenes markdown: ![alt](url)
        // Procesar negritas: **text**
        // Procesar cursivas: *text*
        const parts = [];
        let remaining = text;
        let partIndex = 0;

        while (remaining.length > 0) {
            // Buscar imagen markdown ![alt](url)
            const imgMatch = remaining.match(/!\[([^\]]*)\]\(([^)]+)\)/);
            // Buscar negritas **text**
            const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
            // Buscar cursivas *text* (que no sean **)
            const italicMatch = remaining.match(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/);

            // Encontrar cuál viene primero
            let firstMatch = null;
            let firstType = null;
            let firstIndex = remaining.length;

            if (imgMatch && remaining.indexOf(imgMatch[0]) < firstIndex) {
                firstIndex = remaining.indexOf(imgMatch[0]);
                firstMatch = imgMatch;
                firstType = 'img';
            }
            if (boldMatch && remaining.indexOf(boldMatch[0]) < firstIndex) {
                firstIndex = remaining.indexOf(boldMatch[0]);
                firstMatch = boldMatch;
                firstType = 'bold';
            }
            if (italicMatch && remaining.indexOf(italicMatch[0]) < firstIndex) {
                firstIndex = remaining.indexOf(italicMatch[0]);
                firstMatch = italicMatch;
                firstType = 'italic';
            }

            if (!firstMatch) {
                parts.push(remaining);
                break;
            }

            // Texto antes del match
            if (firstIndex > 0) {
                parts.push(remaining.substring(0, firstIndex));
            }

            if (firstType === 'img') {
                parts.push(
                    <img key={`${keyPrefix}-img-${partIndex}`} src={firstMatch[2]} alt={firstMatch[1]}
                        style={{ maxWidth: '100%', borderRadius: '12px', margin: '12px 0', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                );
            } else if (firstType === 'bold') {
                parts.push(<strong key={`${keyPrefix}-b-${partIndex}`} style={{ color: 'var(--warning-color)' }}>{firstMatch[1]}</strong>);
            } else if (firstType === 'italic') {
                parts.push(<em key={`${keyPrefix}-i-${partIndex}`} style={{ color: 'var(--text-primary)' }}>{firstMatch[1]}</em>);
            }

            remaining = remaining.substring(firstIndex + firstMatch[0].length);
            partIndex++;
        }

        return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts;
    };

    // Renderizado de Markdown con react-markdown y plugin de github
    const renderMarkdownNative = (text) => {
        if (!text) return null;
        return (
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    table: ({ node, ...props }) => <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', marginBottom: '20px' }} {...props} />,
                    th: ({ node, ...props }) => <th style={{ border: '1px solid var(--card-border)', padding: '10px', background: 'var(--bg-secondary)', textAlign: 'left' }} {...props} />,
                    td: ({ node, ...props }) => <td style={{ border: '1px solid var(--card-border)', padding: '10px' }} {...props} />,
                    code: ({ node, inline, ...props }) => inline
                        ? <code style={{ background: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: '4px', color: '#ec4899' }} {...props} />
                        : <pre style={{ background: '#1e1e1e', padding: '15px', borderRadius: '8px', overflowX: 'auto', color: '#d4d4d4' }}><code {...props} /></pre>,
                    img: ({ node, ...props }) => <img style={{ maxWidth: '100%', borderRadius: '12px', margin: '15px 0', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }} {...props} />,
                    h2: ({ node, ...props }) => <h2 style={{ color: 'var(--warning-color)', marginTop: '30px' }} {...props} />,
                    h3: ({ node, ...props }) => <h3 style={{ color: 'var(--text-primary)', marginTop: '25px' }} {...props} />,
                    h4: ({ node, ...props }) => <h4 style={{ color: 'var(--accent-color)', marginTop: '20px' }} {...props} />,
                    p: ({ node, ...props }) => <p style={{ marginBottom: '12px', lineHeight: '1.7' }} {...props} />,
                    a: ({ node, ...props }) => <a style={{ color: 'var(--accent-color)', textDecoration: 'underline' }} {...props} />
                }}
            >
                {text}
            </ReactMarkdown>
        );
    };

    // Renderizar contenido completo (HTML o Markdown + multimedia)
    // cardRecord: el objeto completo de contenido_clase (para acceder a imagen_url de la BD)
    const renderContent = (contenido, cardRecord) => {
        if (!contenido) return null;
        const { text, media } = parseContentMedia(contenido);

        // Combinar imagen: priorizar media embebida, fallback a columna imagen_url de la BD
        const imagenUrl = media.imagen_url || cardRecord?.imagen_url;
        const videoUrl = media.video_url || cardRecord?.video_url;
        const audioUrl = media.audio_url || cardRecord?.audio_url;

        return (
            <>
                {/* Texto: HTML o Markdown */}
                {isHTML(text) ? (
                    <div
                        className="lesson-html-content"
                        dangerouslySetInnerHTML={{ __html: sanitizeHTMLContent(text) }}
                        style={{ lineHeight: '1.8', wordBreak: 'break-word' }}
                    />
                ) : (
                    renderMarkdownNative(text)
                )}

                {/* Multimedia (de ---MEDIA--- o de columnas de la BD) */}
                {imagenUrl && (
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <img
                            src={imagenUrl}
                            alt="Contenido visual"
                            style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    </div>
                )}
                {videoUrl && (
                    <div style={{ marginTop: '20px' }}>
                        {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                            <iframe
                                src={videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                                style={{ width: '100%', aspectRatio: '16/9', border: 'none', borderRadius: '12px' }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                allowFullScreen
                                title="Video de clase"
                            />
                        ) : (
                            <video controls style={{ width: '100%', borderRadius: '12px' }} src={videoUrl} />
                        )}
                    </div>
                )}
                {audioUrl && (
                    <div style={{ marginTop: '20px', padding: '15px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}><i className="fa-solid fa-headphones"></i> Audio del contenido</p>
                        <audio controls style={{ width: '100%' }} src={audioUrl} />
                    </div>
                )}
            </>
        );
    };

    // Obtener texto limpio para VoiceReader
    const getCleanText = (contenido) => {
        if (!contenido) return '';
        const { text } = parseContentMedia(contenido);
        return isHTML(text) ? stripHTML(text) : text;
    };

    // Pantalla de carga
    if (loading && modulos.length === 0) {
        return (
            <div className="container fade-in" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}><i className="fa-solid fa-spinner fa-spin"></i></div>
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
                    <h1 style={{ fontSize: '1.8rem', marginBottom: '5px' }}><i className="fa-solid fa-book-open"></i> Clases por Módulo</h1>
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
                            <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}><i className={mod.icon}></i></div>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '10px' }}>{mod.titulo}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{mod.descripcion || 'Contenido completo del módulo'}</p>

                            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                                {mod.audio_url && (
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}><i className="fa-solid fa-headphones"></i> Audio</span>
                                )}
                                {mod.infografia_url && (
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}><i className="fa-solid fa-image"></i> Infografía</span>
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
                            <i className="fa-solid fa-expand"></i> <span className="hidden-on-mobile">Ver completa</span>
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
                                <><i className="fa-solid fa-pause"></i> <span className="hidden-on-mobile">Reproduciendo</span></>
                            ) : (
                                <><i className="fa-solid fa-headphones"></i> <span className="hidden-on-mobile">Audio</span></>
                            )}
                        </button>
                    )}
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                        {currentIndex + 1} / {totalCards}
                    </span>
                </div>
            </div>

            {/* Numbered Index Navigation Bar */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '15px',
                overflowX: 'auto',
                paddingBottom: '8px',
                scrollbarWidth: 'thin',
                WebkitOverflowScrolling: 'touch'
            }}>
                {contenido.map((card, idx) => {
                    const hasVideo = card.contenido && card.contenido.includes('{"video_url":');

                    return (
                        <button
                            key={card.id || idx}
                            onClick={() => setCurrentIndex(idx)}
                            title={card.titulo}
                            style={{
                                position: 'relative',
                                minWidth: '36px',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                border: `2px solid ${currentIndex === idx ? selectedModulo.color : 'var(--card-border)'}`,
                                background: currentIndex === idx ? selectedModulo.color : 'transparent',
                                color: currentIndex === idx ? '#fff' : 'var(--text-secondary)',
                                cursor: 'pointer',
                                flexShrink: 0,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {idx + 1}
                            {hasVideo && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-4px',
                                    right: '-4px',
                                    background: '#ef4444',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '14px',
                                    height: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.45rem',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                }}>
                                    <i className="fa-solid fa-play"></i>
                                </div>
                            )}
                        </button>
                    );
                })}
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
                            <i className={selectedModulo.icon}></i> {selectedModulo.titulo}
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
                                            <i className="fa-solid fa-hand-pointer"></i> Toca la imagen para verla en pantalla completa
                                        </p>
                                    </>
                                ) : (
                                    <div style={{ padding: '40px', color: 'var(--text-secondary)' }}>
                                        <div style={{ fontSize: '3rem', marginBottom: '15px' }}><i className="fa-solid fa-image"></i></div>
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
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                                    <VoiceReader text={getCleanText(currentCard.contenido)} />
                                </div>
                                {renderContent(currentCard.contenido, currentCard)}
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
