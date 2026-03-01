import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAudio } from '../context/AudioContext';
import Icon, { Icons } from './Icon';
import { generateFormulasPDF } from '../utils/pdfGenerator';

const HomeScreen = ({ onSelectModule, onSetMode }) => {
    const [modulos, setModulos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [downloadingPdf, setDownloadingPdf] = useState(false);
    const { playTrack, currentTrack, isPlaying } = useAudio();

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

    const handlePlayAudio = (modulo) => {
        if (modulo.audio_url) {
            playTrack({
                url: modulo.audio_url,
                title: `Audio Clase`,
                module: modulo.titulo,
                icon: modulo.icon,
                color: modulo.color
            });
        }
    };

    const handleDownloadPDF = async (moduloId) => {
        setDownloadingPdf(true);
        await generateFormulasPDF(moduloId);
        setDownloadingPdf(false);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px', color: 'var(--accent-color)' }}>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                    </div>
                    <p style={{ color: 'var(--text-secondary)' }}>Cargando módulos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container fade-in" style={{ maxWidth: '1200px' }}>
            {/* Hero Section */}
            <div style={{
                marginBottom: '50px',
                textAlign: 'center'
            }}>
                <div style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    background: 'rgba(168, 85, 247, 0.15)',
                    borderRadius: '20px',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    marginBottom: '20px',
                    border: '1px solid rgba(168, 85, 247, 0.3)'
                }}>
                    GUÍA DE ESTUDIO EGEL
                </div>
                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    color: 'var(--text-primary)',
                    marginBottom: '15px',
                    lineHeight: '1.2'
                }}>
                    Economía y Contaduría
                </h1>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.1rem',
                    maxWidth: '600px',
                    margin: '0 auto',
                    marginBottom: '25px'
                }}>
                    Prepárate para tu examen EGEL con contenido interactivo, audios y ejercicios prácticos
                </p>

                {/* PDF Formulario Direct Download */}
                {modulos.some(m => m.slug === 'formulas-y-tips') && (
                    <button
                        onClick={() => handleDownloadPDF(modulos.find(m => m.slug === 'formulas-y-tips').id)}
                        disabled={downloadingPdf}
                        style={{
                            padding: '12px 24px',
                            background: '#ec4899',
                            border: 'none',
                            borderRadius: '25px',
                            color: '#fff',
                            fontWeight: 'bold',
                            cursor: downloadingPdf ? 'wait' : 'pointer',
                            fontSize: '1.05rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)',
                            transition: 'all 0.2s',
                            opacity: downloadingPdf ? 0.7 : 1
                        }}
                    >
                        <i className={`fa-solid ${downloadingPdf ? 'fa-spinner fa-spin' : 'fa-file-pdf'}`}></i>
                        {downloadingPdf ? 'Generando PDF...' : 'Descargar Formulario de Estudio (PDF)'}
                    </button>
                )}
            </div>

            {/* Quick Actions */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '50px'
            }}>
                <div
                    onClick={() => onSetMode('lesson')}
                    style={{
                        padding: '25px',
                        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(56, 189, 248, 0.05))',
                        borderRadius: '16px',
                        border: '1px solid rgba(56, 189, 248, 0.5)',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }}
                    className="hover-card"
                >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            background: 'rgba(56, 189, 248, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem'
                        }}>
                            <i className="fa-solid fa-chalkboard-user"></i>
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: '5px', fontSize: '1.1rem' }}>Clases</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                                Contenido secuencial con infografías y audio
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => onSetMode('quiz')}
                    style={{
                        padding: '25px',
                        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))',
                        borderRadius: '16px',
                        border: '1px solid rgba(34, 197, 94, 0.5)',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }}
                    className="hover-card"
                >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            background: 'rgba(34, 197, 94, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem'
                        }}>
                            <i className="fa-solid fa-clipboard-question"></i>
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: '5px', fontSize: '1.1rem' }}>Quiz EGEL</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                                Practica con preguntas tipo examen
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => onSetMode('test')}
                    style={{
                        padding: '25px',
                        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(168, 85, 247, 0.05))',
                        borderRadius: '16px',
                        border: '1px solid rgba(168, 85, 247, 0.5)',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }}
                    className="hover-card"
                >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '12px',
                            background: 'rgba(168, 85, 247, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem'
                        }}>
                            <i className="fa-solid fa-brain"></i>
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: '5px', fontSize: '1.1rem' }}>Ponte a Prueba</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                                Ejercicios y retos matemáticos
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modules Section - Git Style */}
            <div style={{ marginBottom: '30px' }}>
                <div style={{
                    display: 'inline-block',
                    padding: '6px 14px',
                    background: 'rgba(245, 158, 11, 0.15)',
                    borderRadius: '4px',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    marginBottom: '15px',
                    borderLeft: '3px solid #f59e0b'
                }}>
                    MÓDULOS DE ESTUDIO
                </div>
                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', marginBottom: '10px' }}>
                    ¿Qué vamos a aprender?
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                    {modulos.length} módulos completos con contenido especializado para el EGEL
                </p>
            </div>

            {/* Module Cards - Git Style Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
            }}>
                {modulos.map((modulo, index) => (
                    <div
                        key={modulo.id || index}
                        style={{
                            background: 'var(--card-bg)',
                            borderRadius: '12px',
                            border: `1px solid ${modulo.color}66`,
                            overflow: 'hidden',
                            transition: 'all 0.3s'
                        }}
                        className="hover-card"
                    >
                        {/* Card Header */}
                        <div style={{
                            padding: '20px',
                            borderBottom: `1px solid ${modulo.color}33`,
                            background: `linear-gradient(135deg, ${modulo.color}15, transparent)`
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '45px',
                                    height: '45px',
                                    borderRadius: '10px',
                                    background: `${modulo.color}25`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    border: `2px solid ${modulo.color}50`,
                                    color: modulo.color
                                }}>
                                    <Icon name={modulo.icon} />
                                </div>
                                <div>
                                    <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.1rem' }}>
                                        {modulo.titulo}
                                    </h3>
                                    <span style={{
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.8rem',
                                        fontWeight: '500'
                                    }}>
                                        Módulo {modulo.numero}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Card Body */}
                        <div style={{ padding: '20px' }}>
                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '0.9rem',
                                marginBottom: '20px',
                                lineHeight: '1.6'
                            }}>
                                {modulo.descripcion}
                            </p>

                            {/* Features */}
                            <div style={{
                                display: 'flex',
                                gap: '10px',
                                marginBottom: '20px',
                                flexWrap: 'wrap'
                            }}>
                                {modulo.infografia_url && (
                                    <span style={{
                                        padding: '4px 10px',
                                        background: 'rgba(56, 189, 248, 0.1)',
                                        borderRadius: '4px',
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.75rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}>
                                        <i className="fa-solid fa-image"></i> Infografía
                                    </span>
                                )}
                                {modulo.audio_url && (
                                    <span style={{
                                        padding: '4px 10px',
                                        background: 'rgba(168, 85, 247, 0.1)',
                                        borderRadius: '4px',
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.75rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}>
                                        <i className="fa-solid fa-headphones"></i> Audio clase
                                    </span>
                                )}
                                <span style={{
                                    padding: '4px 10px',
                                    background: 'rgba(34, 197, 94, 0.1)',
                                    borderRadius: '4px',
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.75rem'
                                }}>
                                    <i className="fa-solid fa-pen-to-square"></i> Ejercicios
                                </span>
                            </div>

                            {/* Actions */}
                            <div style={{
                                display: 'flex',
                                gap: '10px'
                            }}>
                                <button
                                    onClick={() => {
                                        onSelectModule(modulo);
                                        onSetMode('lesson');
                                    }}
                                    style={{
                                        flex: 1,
                                        padding: '10px 16px',
                                        background: modulo.color,
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Estudiar →
                                </button>

                                {modulo.audio_url && (
                                    <button
                                        onClick={() => handlePlayAudio(modulo)}
                                        style={{
                                            padding: '10px 16px',
                                            background: currentTrack?.module === modulo.titulo && isPlaying
                                                ? 'rgba(168, 85, 247, 0.3)'
                                                : 'rgba(255,255,255,0.1)',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            borderRadius: '8px',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            fontSize: '1rem'
                                        }}
                                    >
                                        <i className={currentTrack?.module === modulo.titulo && isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'}></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Weekly Test Promo */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))',
                borderRadius: '16px',
                border: '1px solid rgba(239, 68, 68, 0.5)',
                padding: '30px',
                textAlign: 'center',
                marginBottom: '40px'
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px', color: '#ef4444' }}>
                    <i className="fa-solid fa-calendar-check"></i>
                </div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>Prueba Semanal</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                    Cada semana tendrás una evaluación para medir tu progreso
                </p>
                <button
                    onClick={() => onSetMode('weekly')}
                    style={{
                        padding: '12px 30px',
                        background: '#ef4444',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    Ver Prueba Semanal
                </button>
            </div>
        </div>
    );
};
export default HomeScreen;
