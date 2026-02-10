import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import VoiceReader from './VoiceReader';

const SocraticMode = ({ onBack }) => {
    const { user } = useAuth();
    const [modulos, setModulos] = useState([]);
    const [selectedModulo, setSelectedModulo] = useState(null);
    const [preguntas, setPreguntas] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [step, setStep] = useState('question'); // 'question' | 'thinking' | 'answer'
    const [loading, setLoading] = useState(true);
    const [testStarted, setTestStarted] = useState(false);
    const [score, setScore] = useState({ mastered: 0, total: 0 });
    const [examenId, setExamenId] = useState(null);
    const [showResumeModal, setShowResumeModal] = useState(false);
    const [savedProgress, setSavedProgress] = useState(null);

    useEffect(() => {
        loadModulos();

        // Check for saved progress
        const saved = localStorage.getItem('egel_socratic_progress');
        if (saved) {
            const data = JSON.parse(saved);
            // Check if less than 24 hours old
            const savedAt = new Date(data.savedAt);
            const hoursDiff = (Date.now() - savedAt.getTime()) / (1000 * 60 * 60);
            if (hoursDiff < 24) {
                setSavedProgress(data);
                setShowResumeModal(true);
            } else {
                localStorage.removeItem('egel_socratic_progress');
            }
        }
    }, []);

    const loadModulos = async () => {
        // Get modules from modulos table (using FK design)
        const { data } = await supabase
            .from('modulos')
            .select('id, slug, titulo, descripcion, icon, color, numero')
            .eq('activo', true)
            .order('numero');

        if (data) {
            setModulos(data);
        }
        setLoading(false);
    };

    const loadPreguntas = async (moduloId) => {
        setLoading(true);

        // Load questions for the module using modulo_id FK
        const { data, error } = await supabase
            .from('preguntas')
            .select('*, modulos(titulo, icon, color)')
            .eq('modulo_id', moduloId)
            .eq('activo', true)
            .order('created_at');

        if (error) {
            console.error('Error loading questions:', error);
            setLoading(false);
            return;
        }

        // Prioritize analysis type questions, then shuffle
        const analysisQuestions = data.filter(q => q.tipo === 'analisis');
        const otherQuestions = data.filter(q => q.tipo !== 'analisis');

        const combined = [
            ...shuffleArray(analysisQuestions),
            ...shuffleArray(otherQuestions)
        ].slice(0, 20); // Limit to 20 questions for Socratic mode

        setPreguntas(combined);
        setCurrentIndex(0);
        setStep('question');
        setScore({ mastered: 0, total: 0 });
        setLoading(false);

        // Create exam record
        if (user) {
            const { data: examData } = await supabase
                .from('examenes')
                .insert([{
                    usuario_id: user.id,
                    tipo: 'practica',
                    modulo_id: selectedModulo?.id,
                    total_preguntas: combined.length,
                    fecha_inicio: new Date().toISOString()
                }])
                .select()
                .single();
            if (examData) setExamenId(examData.id);
        }
    };

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const startTest = (modulo) => {
        setSelectedModulo(modulo);
        setTestStarted(true);
        loadPreguntas(modulo.id); // Use modulo_id FK
    };

    const handleMastered = async (mastered) => {
        setScore(prev => ({
            mastered: prev.mastered + (mastered ? 1 : 0),
            total: prev.total + 1
        }));

        // Save response
        if (user && examenId) {
            await supabase.from('respuestas_examen').insert([{
                examen_id: examenId,
                pregunta_id: preguntas[currentIndex].id,
                es_correcta: mastered
            }]);
        }

        // Next question
        if (currentIndex < preguntas.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setStep('question');
        } else {
            // Finish
            finishTest(score.mastered + (mastered ? 1 : 0), score.total + 1);
        }
    };

    const saveProgress = () => {
        if (!examenId || !testStarted) return;
        const progressData = {
            examenId,
            moduloId: selectedModulo?.id,
            currentIndex,
            score,
            questionIds: preguntas.map(p => p.id),
            savedAt: new Date().toISOString()
        };
        localStorage.setItem(`egel_socratic_progress`, JSON.stringify(progressData));
    };

    const handleBack = () => {
        if (testStarted && currentIndex < preguntas.length) {
            if (window.confirm('¿Deseas guardar tu progreso? Podrás continuar después.')) {
                saveProgress();
                if (user && examenId) {
                    supabase.from('examenes').update({
                        correctas: score.mastered,
                        incorrectas: score.total - score.mastered,
                        porcentaje: score.total > 0 ? (score.mastered / score.total) * 100 : 0,
                        updated_at: new Date().toISOString()
                    }).eq('id', examenId);
                }
            } else {
                localStorage.removeItem('egel_socratic_progress');
            }
        }
        onBack();
    };

    const resumeTest = async () => {
        if (!savedProgress) return;
        setLoading(true);

        // Load the same questions by IDs
        const { data } = await supabase
            .from('preguntas')
            .select('*, modulos(titulo, icon, color)')
            .in('id', savedProgress.questionIds);

        if (data) {
            // Maintain original order
            const ordered = savedProgress.questionIds.map(id => data.find(q => q.id === id)).filter(Boolean);
            setPreguntas(ordered);
            setCurrentIndex(savedProgress.currentIndex);
            setScore(savedProgress.score);
            setExamenId(savedProgress.examenId);
            setSelectedModulo(data[0]?.modulos || savedProgress.moduloId);
            setTestStarted(true);
            setStep('question');
        }

        setShowResumeModal(false);
        setSavedProgress(null);
        setLoading(false);
    };

    const finishTest = async (mastered, total) => {
        localStorage.removeItem('egel_socratic_progress');
        if (user && examenId) {
            await supabase
                .from('examenes')
                .update({
                    correctas: mastered,
                    incorrectas: total - mastered,
                    porcentaje: (mastered / total) * 100,
                    fecha_fin: new Date().toISOString(),
                    completado: true
                })
                .eq('id', examenId);
        }

        setTestStarted(false);
        setSelectedModulo(null);
    };

    const restartTest = () => {
        setTestStarted(false);
        setSelectedModulo(null);
        setPreguntas([]);
        setExamenId(null);
    };

    // Module selection
    if (!testStarted) {
        return (
            <div className="container fade-in">
                <div style={{ maxWidth: '600px', margin: '0 auto 20px auto' }}>
                    <button
                        onClick={handleBack}
                        style={{
                            width: '100%',
                            padding: '15px',
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px'
                        }}
                    >
                        ← Volver al Inicio
                    </button>
                </div>

                <header style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}><i className="fa-solid fa-brain"></i> Ponte a Prueba</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Método socrático: reflexiona y aprende
                    </p>
                </header>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <p>⏳ Cargando módulos...</p>
                    </div>
                ) : modulos.length === 0 ? (
                    <div className="slide-card" style={{ textAlign: 'center' }}>
                        <button className="close-btn" onClick={handleBack} title="Salir">×</button>
                        <p style={{ fontSize: '3rem', marginBottom: '15px' }}>📭</p>
                        <h2>No hay módulos disponibles</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Ejecuta el SQL de datos en Supabase.
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '15px', maxWidth: '600px', margin: '0 auto' }}>
                        {modulos.map(modulo => (
                            <button
                                key={modulo.id}
                                onClick={() => startTest(modulo)}
                                className="hover-card"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '20px',
                                    padding: '25px',
                                    background: 'var(--bg-secondary)',
                                    border: 'none',
                                    borderRadius: '16px',
                                    borderLeft: `6px solid ${modulo.color}`,
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <span style={{ fontSize: '2.5rem', color: 'var(--text-primary)' }}><i className={modulo.icon}></i></span>
                                <div>
                                    <h3 style={{ color: 'var(--text-primary)', marginBottom: '5px', fontSize: '1.2rem' }}>
                                        {modulo.titulo}
                                    </h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                                        {modulo.descripcion}
                                    </p>
                                </div>
                                <span style={{ marginLeft: 'auto', color: modulo.color, fontSize: '1.5rem' }}>→</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Show resume modal if needed and test hasn't started yet
    if (showResumeModal && !testStarted) {
        return (
            <div className="container fade-in">
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.7)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        background: 'var(--bg-secondary)', borderRadius: '16px',
                        padding: '30px', maxWidth: '400px', width: '90%',
                        textAlign: 'center', border: '1px solid var(--card-border)'
                    }}>
                        <i className="fa-solid fa-clock-rotate-left" style={{
                            fontSize: '3rem', color: 'var(--accent-color)', marginBottom: '15px', display: 'block'
                        }}></i>
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>Práctica en progreso</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                            Tienes una práctica sin terminar con {savedProgress?.score?.total || 0} preguntas contestadas.
                            ¿Deseas continuar?
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button onClick={() => {
                                localStorage.removeItem('egel_socratic_progress');
                                setShowResumeModal(false);
                                setSavedProgress(null);
                            }} style={{
                                flex: 1, padding: '12px', borderRadius: '8px',
                                background: 'var(--error-color)', color: '#fff',
                                border: 'none', cursor: 'pointer', fontWeight: '600'
                            }}>
                                Nueva práctica
                            </button>
                            <button onClick={resumeTest} style={{
                                flex: 1, padding: '12px', borderRadius: '8px',
                                background: 'var(--accent-color)', color: '#fff',
                                border: 'none', cursor: 'pointer', fontWeight: '600'
                            }}>
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Loading
    if (loading) {
        return (
            <div className="container fade-in" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}><i className="fa-solid fa-brain fa-pulse"></i></div>
                    <p>Preparando preguntas reflexivas...</p>
                </div>
            </div>
        );
    }

    // No questions
    if (preguntas.length === 0) {
        return (
            <div className="container fade-in" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div className="slide-card" style={{ textAlign: 'center' }}>
                    <button className="close-btn" onClick={restartTest} title="Volver">×</button>
                    <h2>No hay preguntas para este módulo</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                        Prueba con otro módulo.
                    </p>
                    <button className="btn-primary" onClick={restartTest}>Elegir otro módulo</button>
                </div>
            </div>
        );
    }

    // Current question
    const pregunta = preguntas[currentIndex];
    const progress = ((currentIndex) / preguntas.length) * 100;

    return (
        <div className="container fade-in">
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <button
                    onClick={handleBack}
                    style={{
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--card-border)',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        marginRight: '20px'
                    }}
                >
                    ← Salir
                </button>
                <div style={{ flexGrow: 1, height: '6px', background: 'var(--bg-secondary)', margin: '0 20px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: selectedModulo.color, transition: 'width 0.5s ease' }} />
                </div>
                <span style={{ color: selectedModulo.color, fontWeight: 'bold' }}>
                    {currentIndex + 1} / {preguntas.length}
                </span>
            </div>

            {/* Score */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginBottom: '20px'
            }}>
                <span style={{
                    padding: '6px 14px',
                    background: 'rgba(34, 197, 94, 0.15)',
                    borderRadius: '20px',
                    color: '#22c55e',
                    fontSize: '0.9rem'
                }}>
                    ✓ Dominadas: {score.mastered}
                </span>
                <span style={{
                    padding: '6px 14px',
                    background: 'rgba(168, 85, 247, 0.15)',
                    borderRadius: '20px',
                    color: '#a855f7',
                    fontSize: '0.9rem'
                }}>
                    <i className="fa-solid fa-brain"></i> {selectedModulo.titulo}
                </span>
            </div>

            {/* Question Card */}
            <div className="slide-card" style={{ maxWidth: '700px', margin: '0 auto', borderTop: `6px solid ${selectedModulo.color}` }}>
                <button className="close-btn" onClick={handleBack} title="Salir de la prueba">×</button>
                {/* Question Phase */}
                {step === 'question' && (
                    <>
                        <div style={{
                            padding: '4px 12px',
                            background: `${selectedModulo.color}20`,
                            color: selectedModulo.color,
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            display: 'inline-block',
                            marginBottom: '20px'
                        }}>
                            <i className="fa-solid fa-brain"></i> REFLEXIONA
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <VoiceReader text={pregunta.pregunta} />
                        </div>

                        <h2 style={{ fontSize: '1.4rem', lineHeight: '1.7', marginBottom: '30px' }}>
                            {pregunta.pregunta}
                        </h2>

                        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '0.95rem' }}>
                            Tómate un momento para pensar en la respuesta antes de continuar...
                        </p>

                        <button
                            className="btn-primary"
                            onClick={() => setStep('thinking')}
                            style={{ width: '100%', background: selectedModulo.color }}
                        >
                            Ya pensé mi respuesta 💭
                        </button>
                    </>
                )}

                {/* Thinking Phase - Show hint */}
                {step === 'thinking' && (
                    <>
                        <div style={{
                            padding: '4px 12px',
                            background: 'rgba(234, 179, 8, 0.2)',
                            color: '#eab308',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            display: 'inline-block',
                            marginBottom: '20px'
                        }}>
                            💡 PISTA
                        </div>

                        <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--text-primary)' }}>
                            {pregunta.pregunta}
                        </h3>

                        <div className="fade-in" style={{
                            background: 'rgba(234, 179, 8, 0.1)',
                            padding: '20px',
                            borderRadius: '12px',
                            borderLeft: '4px solid #eab308',
                            marginBottom: '25px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <strong style={{ display: 'block', marginBottom: '8px', color: '#eab308' }}>
                                    🤔 Piensa en esto:
                                </strong>
                                <VoiceReader text={`Pista: ${pregunta.explicacion?.substring(0, 150) || 'Considera los conceptos fundamentales del tema.'}`} />
                            </div>
                            <p style={{ lineHeight: '1.6', margin: 0 }}>
                                {pregunta.explicacion?.substring(0, 150) || 'Considera los conceptos fundamentales del tema.'}...
                            </p>
                        </div>

                        <button
                            className="btn-primary"
                            onClick={() => setStep('answer')}
                            style={{ width: '100%', background: '#fff', color: '#000' }}
                        >
                            👁️ Ver Respuesta Completa
                        </button>
                    </>
                )}

                {/* Answer Phase */}
                {step === 'answer' && (
                    <>
                        <div style={{
                            padding: '4px 12px',
                            background: 'rgba(34, 197, 94, 0.2)',
                            color: '#22c55e',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            display: 'inline-block',
                            marginBottom: '20px'
                        }}>
                            ✨ RESPUESTA
                        </div>

                        <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: 'var(--text-secondary)' }}>
                            {pregunta.pregunta}
                        </h3>

                        <div className="fade-in" style={{
                            background: 'rgba(34, 197, 94, 0.1)',
                            padding: '20px',
                            borderRadius: '12px',
                            borderLeft: '4px solid #22c55e',
                            marginBottom: '20px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px' }}>
                                <VoiceReader text={`La respuesta correcta es: ${pregunta[`opcion_${pregunta.respuesta_correcta}`]}. ${pregunta.explicacion}`} />
                            </div>
                            <strong style={{ display: 'block', marginBottom: '10px', color: '#22c55e', fontSize: '1.1rem' }}>
                                ✓ Respuesta correcta: {pregunta.respuesta_correcta?.toUpperCase()}
                            </strong>
                            <p style={{ marginBottom: '10px' }}>
                                <strong>{pregunta[`opcion_${pregunta.respuesta_correcta}`]}</strong>
                            </p>
                            <p style={{ lineHeight: '1.6', margin: 0, color: 'var(--text-secondary)' }}>
                                {pregunta.explicacion}
                            </p>
                        </div>

                        {pregunta.formula && (
                            <div style={{
                                background: 'rgba(0,0,0,0.3)',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                fontFamily: 'monospace',
                                fontSize: '0.95rem',
                                color: 'var(--warning-color)',
                                marginBottom: '25px'
                            }}>
                                📐 {pregunta.formula}
                            </div>
                        )}

                        <p style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--text-secondary)' }}>
                            ¿Habías pensado en la respuesta correcta?
                        </p>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button
                                onClick={() => handleMastered(false)}
                                style={{
                                    flex: 1,
                                    padding: '14px',
                                    background: 'transparent',
                                    border: '2px solid #ef4444',
                                    color: '#ef4444',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontSize: '1rem'
                                }}
                            >
                                ❌ Aún no lo domino
                            </button>
                            <button
                                onClick={() => handleMastered(true)}
                                style={{
                                    flex: 1,
                                    padding: '14px',
                                    background: '#22c55e',
                                    border: 'none',
                                    color: '#000',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                ✓ ¡Lo dominé!
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SocraticMode;
