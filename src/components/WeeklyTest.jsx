import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const TOTAL_QUESTIONS = 80;
const TIME_LIMIT_MINUTES = 60;

const WeeklyTest = ({ onBack }) => {
    const { user } = useAuth();
    const [preguntas, setPreguntas] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [loading, setLoading] = useState(true);
    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [examenId, setExamenId] = useState(null);
    const [showReview, setShowReview] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [showResumeModal, setShowResumeModal] = useState(false);
    const [savedProgress, setSavedProgress] = useState(null);
    const timerRef = useRef(null);

    // Check for saved progress on mount
    useEffect(() => {
        const saved = localStorage.getItem('egel_weekly_progress');
        if (saved) {
            const data = JSON.parse(saved);
            // Check if less than 24 hours old
            const savedAt = new Date(data.savedAt);
            const hoursDiff = (Date.now() - savedAt.getTime()) / (1000 * 60 * 60);
            if (hoursDiff < 24) {
                setSavedProgress(data);
                setShowResumeModal(true);
            } else {
                localStorage.removeItem('egel_weekly_progress');
            }
        }
    }, []);

    // Timer effect
    useEffect(() => {
        if (testStarted && timeRemaining !== null && !testCompleted) {
            timerRef.current = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        handleFinishTest(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timerRef.current);
        }
    }, [testStarted, testCompleted]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getTimeColor = () => {
        if (timeRemaining <= 60) return '#ef4444';
        if (timeRemaining <= 300) return '#eab308';
        return '#22c55e';
    };

    const handleFinishTest = async (timeUp = false) => {
        clearInterval(timerRef.current);
        await finishTest();
    };

    // Load balanced questions
    const loadPreguntas = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from('preguntas')
            .select('*, modulos(titulo, icon, color)');

        if (error) {
            console.error('Error cargando preguntas:', error);
            setLoading(false);
            return;
        }

        // Balance questions: 40% básico, 40% intermedio, 20% avanzado
        const balanced = balanceQuestions(data, TOTAL_QUESTIONS);

        setPreguntas(balanced);
        setCurrentIndex(0);
        setAnswers({});
        setScore({ correct: 0, total: 0 });
        setSelectedAnswer(null);
        setStartTime(Date.now());
        setTimeRemaining(TIME_LIMIT_MINUTES * 60);
        setLoading(false);

        // Create exam record if user is logged in
        if (user) {
            const { data: examData } = await supabase
                .from('examenes')
                .insert([{
                    usuario_id: user.id,
                    tipo: 'semanal',
                    total_preguntas: balanced.length,
                    fecha_inicio: new Date().toISOString()
                }])
                .select()
                .single();
            if (examData) setExamenId(examData.id);
        }
    };

    const balanceQuestions = (allQuestions, count) => {
        if (!allQuestions || allQuestions.length === 0) return [];

        const basico = allQuestions.filter(q => q.nivel === 'basico');
        const intermedio = allQuestions.filter(q => q.nivel === 'intermedio');
        const avanzado = allQuestions.filter(q => q.nivel === 'avanzado');

        const basicoCount = Math.floor(count * 0.4);
        const intermedioCount = Math.floor(count * 0.4);
        const avanzadoCount = count - basicoCount - intermedioCount;

        const selected = [
            ...shuffleArray(basico).slice(0, basicoCount),
            ...shuffleArray(intermedio).slice(0, intermedioCount),
            ...shuffleArray(avanzado).slice(0, avanzadoCount)
        ];

        if (selected.length < count) {
            const remaining = shuffleArray(allQuestions.filter(q => !selected.includes(q)));
            selected.push(...remaining.slice(0, count - selected.length));
        }

        return shuffleArray(selected);
    };

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const handleBack = () => {
        if (testStarted && !testCompleted) {
            if (window.confirm('¿Deseas guardar tu progreso? Podrás continuar después.')) {
                saveProgress();
                // Also save partial to DB
                if (user && examenId) {
                    const correctCount = Object.values(answers).filter(a => a.isCorrect).length;
                    supabase.from('examenes').update({
                        correctas: correctCount,
                        incorrectas: Object.keys(answers).length - correctCount,
                        porcentaje: Object.keys(answers).length > 0 ? (correctCount / Object.keys(answers).length) * 100 : 0,
                        updated_at: new Date().toISOString()
                    }).eq('id', examenId);
                }
            } else {
                // Clear progress if they don't want to save
                localStorage.removeItem('egel_weekly_progress');
            }
        }
        onBack();
    };

    const startTest = () => {
        setTestStarted(true);
        loadPreguntas();
    };

    const handleAnswer = async (letter) => {
        if (answers[currentIndex]) return;

        setSelectedAnswer(letter);
        const isCorrect = letter === preguntas[currentIndex].respuesta_correcta;

        setAnswers(prev => ({
            ...prev,
            [currentIndex]: { letter, isCorrect }
        }));

        // Save answer if logged in
        if (user && examenId) {
            await supabase.from('respuestas_examen').insert([{
                examen_id: examenId,
                pregunta_id: preguntas[currentIndex].id,
                respuesta_usuario: letter,
                es_correcta: isCorrect
            }]);
        }
    };

    const nextQuestion = () => {
        if (currentIndex < preguntas.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(answers[currentIndex + 1]?.letter || null);
        }
    };

    const prevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setSelectedAnswer(answers[currentIndex - 1]?.letter || null);
        }
    };

    const goToQuestion = (index) => {
        setCurrentIndex(index);
        setSelectedAnswer(answers[index]?.letter || null);
    };

    const saveProgress = () => {
        if (!examenId || testCompleted) return;
        const progressData = {
            examenId,
            currentQuestionIndex: currentIndex,
            answers,
            timeRemaining,
            questionIds: preguntas.map(p => p.id),
            savedAt: new Date().toISOString()
        };
        localStorage.setItem(`egel_weekly_progress`, JSON.stringify(progressData));
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
            setCurrentIndex(savedProgress.currentQuestionIndex);
            setAnswers(savedProgress.answers);
            setTimeRemaining(savedProgress.timeRemaining);
            setExamenId(savedProgress.examenId);
            setTestStarted(true);
            setStartTime(Date.now());
        }

        setShowResumeModal(false);
        setSavedProgress(null);
        setLoading(false);
    };

    const finishTest = async () => {
        localStorage.removeItem('egel_weekly_progress');
        const correctCount = Object.values(answers).filter(a => a.isCorrect).length;
        const totalAnswered = Object.keys(answers).length;

        setScore({ correct: correctCount, total: totalAnswered });
        setTestCompleted(true);

        if (user && examenId) {
            const tiempoTotal = Math.floor((Date.now() - startTime) / 1000);
            const porcentaje = (correctCount / preguntas.length) * 100;

            await supabase
                .from('examenes')
                .update({
                    correctas: correctCount,
                    incorrectas: preguntas.length - correctCount,
                    porcentaje: porcentaje,
                    tiempo_segundos: tiempoTotal,
                    fecha_fin: new Date().toISOString(),
                    completado: true
                })
                .eq('id', examenId);
        }
    };

    const answeredCount = Object.keys(answers).length;
    const canFinish = answeredCount >= preguntas.length * 0.5; // At least 50% answered

    // Welcome Screen
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

                <div className="slide-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}><i className="fa-solid fa-calendar-check"></i></div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '15px' }}>Prueba Semanal</h1>

                    <div style={{
                        background: 'rgba(59, 130, 246, 0.15)',
                        borderRadius: '12px',
                        padding: '20px',
                        marginBottom: '25px',
                        borderLeft: '4px solid #3b82f6'
                    }}>
                        <h3 style={{ color: '#3b82f6', marginBottom: '10px' }}><i className="fa-solid fa-clipboard-list"></i> Información del examen</h3>
                        <ul style={{ textAlign: 'left', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                            <li><strong style={{ color: 'var(--text-primary)' }}>{TOTAL_QUESTIONS} preguntas</strong> tipo EGEL</li>
                            <li>Balance: 40% básico, 40% intermedio, 20% avanzado</li>
                            <li>Puedes navegar entre preguntas</li>
                            <li>Debes responder al menos el 50% para finalizar</li>
                            <li>Tu resultado se guardará automáticamente</li>
                        </ul>
                    </div>

                    <button className="btn-primary" onClick={startTest} style={{ fontSize: '1.2rem', padding: '16px 50px' }}>
                        <i className="fa-solid fa-rocket"></i> Comenzar Prueba
                    </button>

                    {!user && (
                        <p style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--warning-color)' }}>
                            <i className="fa-solid fa-triangle-exclamation"></i> Inicia sesión para guardar tu resultado
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // Loading Screen
    if (loading) {
        return (
            <div className="container fade-in" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}><i className="fa-solid fa-spinner fa-spin"></i></div>
                    <p>Preparando tu prueba semanal...</p>
                </div>
            </div>
        );
    }

    // Results Screen
    if (testCompleted) {
        const percentage = Math.round((score.correct / preguntas.length) * 100);
        const tiempoTotal = Math.floor((Date.now() - startTime) / 1000);
        const minutos = Math.floor(tiempoTotal / 60);
        const segundos = tiempoTotal % 60;

        if (showReview) {
            return (
                <div className="container fade-in">
                    <div style={{ maxWidth: '800px', margin: '0 auto 20px auto' }}>
                        <button
                            onClick={() => setShowReview(false)}
                            style={{
                                width: '100%',
                                padding: '15px',
                                background: 'var(--bg-secondary)',
                                color: 'var(--text-secondary)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontSize: '1rem'
                            }}
                        >
                            ← Volver a resultados
                        </button>
                    </div>

                    <h2 style={{ marginBottom: '20px' }}>📋 Revisión de respuestas</h2>

                    {preguntas.map((pregunta, idx) => {
                        const userAnswer = answers[idx];
                        const isCorrect = userAnswer?.isCorrect;

                        return (
                            <div
                                key={idx}
                                className="slide-card"
                                style={{
                                    marginBottom: '15px',
                                    borderLeft: `4px solid ${isCorrect ? 'var(--success-color)' : userAnswer ? 'var(--error-color)' : 'var(--text-secondary)'}`
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ fontWeight: 'bold' }}>Pregunta {idx + 1}</span>
                                    <span style={{
                                        color: isCorrect ? 'var(--success-color)' : userAnswer ? 'var(--error-color)' : 'var(--text-secondary)'
                                    }}>
                                        {isCorrect ? '✓ Correcta' : userAnswer ? '✗ Incorrecta' : '○ Sin responder'}
                                    </span>
                                </div>
                                <p style={{ marginBottom: '10px', lineHeight: '1.6' }}>{pregunta.pregunta}</p>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    Tu respuesta: <strong style={{ color: userAnswer?.letter ? (isCorrect ? 'var(--success-color)' : 'var(--error-color)') : 'var(--text-secondary)' }}>
                                        {userAnswer?.letter?.toUpperCase() || 'No respondida'}
                                    </strong>
                                    {' | '}
                                    Correcta: <strong style={{ color: 'var(--success-color)' }}>
                                        {pregunta.respuesta_correcta.toUpperCase()}
                                    </strong>
                                </p>
                            </div>
                        );
                    })}
                </div>
            );
        }

        return (
            <div className="container fade-in" style={{ justifyContent: 'center' }}>
                <div className="slide-card" style={{ textAlign: 'center', maxWidth: '550px' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
                        {percentage >= 70 ? <i className="fa-solid fa-trophy"></i> : percentage >= 50 ? <i className="fa-solid fa-dumbbell"></i> : <i className="fa-solid fa-book-open"></i>}
                    </div>
                    <h1 style={{ marginBottom: '10px' }}>Prueba Completada</h1>

                    <div style={{
                        fontSize: '5rem',
                        fontWeight: 'bold',
                        color: percentage >= 70 ? 'var(--success-color)' : percentage >= 50 ? 'var(--warning-color)' : 'var(--error-color)',
                        margin: '20px 0'
                    }}>
                        {percentage}%
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '15px',
                        marginBottom: '30px'
                    }}>
                        <div style={{ background: 'var(--bg-secondary)', padding: '15px', borderRadius: '10px' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success-color)' }}>{score.correct}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Correctas</div>
                        </div>
                        <div style={{ background: 'var(--bg-secondary)', padding: '15px', borderRadius: '10px' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--error-color)' }}>{preguntas.length - score.correct}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Incorrectas</div>
                        </div>
                        <div style={{ background: 'var(--bg-secondary)', padding: '15px', borderRadius: '10px' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>{minutos}:{segundos.toString().padStart(2, '0')}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Tiempo</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => setShowReview(true)}
                            style={{
                                padding: '12px 24px',
                                background: 'transparent',
                                border: '2px solid var(--accent-color)',
                                color: 'var(--accent-color)',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            📋 Ver respuestas
                        </button>
                        <button className="btn-primary" onClick={handleBack}>
                            ← Volver al inicio
                        </button>
                    </div>

                    {user && (
                        <p style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--success-color)' }}>
                            <i className="fa-solid fa-check"></i> Resultado guardado en tu historial
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // Test in progress
    const pregunta = preguntas[currentIndex];
    const opciones = [
        { letter: 'a', text: pregunta.opcion_a },
        { letter: 'b', text: pregunta.opcion_b },
        { letter: 'c', text: pregunta.opcion_c },
        { letter: 'd', text: pregunta.opcion_d },
    ];

    const nivelColors = {
        basico: '#22c55e',
        intermedio: '#eab308',
        avanzado: '#ef4444'
    };

    return (
        <div className="container fade-in">
            {showResumeModal && (
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
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>Examen en progreso</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                            Tienes un examen sin terminar con {Object.keys(savedProgress?.answers || {}).length} preguntas contestadas.
                            ¿Deseas continuar?
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button onClick={() => {
                                localStorage.removeItem('egel_weekly_progress');
                                setShowResumeModal(false);
                                setSavedProgress(null);
                            }} style={{
                                flex: 1, padding: '12px', borderRadius: '8px',
                                background: 'var(--error-color)', color: '#fff',
                                border: 'none', cursor: 'pointer', fontWeight: '600'
                            }}>
                                Nuevo examen
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
            )}

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
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
                        marginBottom: '10px'
                    }}
                >
                    ← Salir
                </button>

                {/* Timer */}
                <div style={{
                    padding: '8px 16px',
                    background: `${getTimeColor()}20`,
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <span style={{ color: getTimeColor(), fontWeight: 'bold', fontSize: '1.1rem' }}>
                        <i className="fa-solid fa-clock"></i> {formatTime(timeRemaining)}
                    </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ color: 'var(--success-color)', fontSize: '0.9rem' }}>
                        <i className="fa-solid fa-check-double"></i> {answeredCount}/{preguntas.length}
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: '6px', background: 'var(--bg-secondary)', borderRadius: '4px', marginBottom: '15px', overflow: 'hidden' }}>
                <div style={{
                    width: `${(answeredCount / preguntas.length) * 100}%`,
                    height: '100%',
                    background: '#3b82f6',
                    transition: 'width 0.3s'
                }} />
            </div>

            {/* Question Navigator */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginBottom: '20px',
                maxHeight: '80px',
                overflowY: 'auto',
                padding: '5px'
            }}>
                {preguntas.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToQuestion(idx)}
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: currentIndex === idx ? '2px solid #3b82f6' : 'none',
                            background: answers[idx]
                                ? (answers[idx].isCorrect ? 'var(--success-color)' : 'var(--error-color)')
                                : currentIndex === idx ? 'rgba(59, 130, 246, 0.3)' : 'var(--bg-secondary)',
                            color: answers[idx] ? '#000' : '#fff',
                            fontSize: '0.75rem',
                            fontWeight: currentIndex === idx ? 'bold' : 'normal',
                            cursor: 'pointer'
                        }}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>

            {/* Question Card */}
            <div className="slide-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                {/* Tags */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
                    <span style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: `${nivelColors[pregunta.nivel]}22`,
                        color: nivelColors[pregunta.nivel],
                        fontSize: '0.8rem'
                    }}>
                        {pregunta.nivel?.toUpperCase()}
                    </span>
                    {pregunta.modulos && (
                        <span style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            background: `${pregunta.modulos.color}22`,
                            color: pregunta.modulos.color,
                            fontSize: '0.8rem'
                        }}>
                            {pregunta.modulos.icon} {pregunta.modulos.titulo}
                        </span>
                    )}
                    <span style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(59, 130, 246, 0.15)',
                        color: '#3b82f6',
                        fontSize: '0.8rem',
                        marginLeft: 'auto'
                    }}>
                        {currentIndex + 1} / {preguntas.length}
                    </span>
                </div>

                {/* Question */}
                <h2 style={{ fontSize: '1.2rem', lineHeight: '1.7', marginBottom: '25px', whiteSpace: 'pre-wrap' }}>
                    {pregunta.pregunta}
                </h2>

                {/* Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {opciones.map(opt => {
                        const isSelected = selectedAnswer === opt.letter || answers[currentIndex]?.letter === opt.letter;

                        return (
                            <button
                                key={opt.letter}
                                onClick={() => handleAnswer(opt.letter)}
                                disabled={answers[currentIndex] !== undefined}
                                style={{
                                    padding: '14px 18px',
                                    borderRadius: '10px',
                                    border: `2px solid ${isSelected ? '#3b82f6' : 'var(--card-border)'}`,
                                    background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                                    color: 'var(--text-primary)',
                                    textAlign: 'left',
                                    cursor: answers[currentIndex] ? 'default' : 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    opacity: answers[currentIndex] && !isSelected ? 0.6 : 1
                                }}
                            >
                                <span style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    background: isSelected ? '#3b82f6' : 'var(--bg-secondary)',
                                    color: isSelected ? '#fff' : 'var(--text-secondary)',
                                    flexShrink: 0,
                                    fontSize: '0.9rem'
                                }}>
                                    {opt.letter.toUpperCase()}
                                </span>
                                <span style={{ fontSize: '1rem' }}>{opt.text}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Navigation */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '25px',
                    paddingTop: '20px',
                    borderTop: '1px solid var(--card-border)'
                }}>
                    <button
                        onClick={prevQuestion}
                        disabled={currentIndex === 0}
                        style={{
                            padding: '12px 20px',
                            background: currentIndex === 0 ? 'var(--bg-secondary)' : 'transparent',
                            border: '2px solid var(--text-secondary)',
                            color: currentIndex === 0 ? 'var(--text-secondary)' : 'var(--text-primary)',
                            borderRadius: '8px',
                            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                            opacity: currentIndex === 0 ? 0.5 : 1
                        }}
                    >
                        ← Anterior
                    </button>

                    {currentIndex < preguntas.length - 1 ? (
                        <button
                            onClick={nextQuestion}
                            className="btn-primary"
                            style={{ background: '#3b82f6' }}
                        >
                            Siguiente →
                        </button>
                    ) : (
                        <button
                            onClick={finishTest}
                            disabled={!canFinish}
                            className="btn-primary"
                            style={{
                                background: canFinish ? 'var(--success-color)' : 'var(--bg-secondary)',
                                color: canFinish ? '#000' : 'var(--text-secondary)',
                                cursor: canFinish ? 'pointer' : 'not-allowed'
                            }}
                        >
                            {canFinish ? '✓ Finalizar prueba' : `Responde ${Math.ceil(preguntas.length * 0.5) - answeredCount} más`}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeeklyTest;
