import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { RichText, QuestionImage, getCleanQuestionText } from '../lib/renderQuestionHTML';

const QuizMode = ({ onBack }) => {
    const { user } = useAuth();
    const [preguntas, setPreguntas] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ modulo: [], nivel: null });
    const [questionCount, setQuestionCount] = useState(50);
    const [timeLimit, setTimeLimit] = useState(45); // minutes
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [modulos, setModulos] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [examenId, setExamenId] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [showResumeModal, setShowResumeModal] = useState(false);
    const [resumeData, setResumeData] = useState(null);
    const [isResumingExam, setIsResumingExam] = useState(false);
    const timerRef = useRef(null);

    // Load modules from preguntas table (unique modulo values)
    useEffect(() => {
        loadModulos();
        checkForResumeableExam();
    }, []);

    // Check for a saved exam in localStorage when component mounts
    const checkForResumeableExam = () => {
        if (!user) return;

        // Check localStorage for any saved exams
        const savedExams = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('egel_exam_progress_')) {
                const examenId = key.replace('egel_exam_progress_', '');
                const data = JSON.parse(localStorage.getItem(key));
                savedExams.push({ examenId, ...data });
            }
        }

        if (savedExams.length > 0) {
            // Show resume modal with the first saved exam
            setResumeData(savedExams[0]);
            setShowResumeModal(true);
        }
    };

    // Timer effect
    useEffect(() => {
        if (quizStarted && timeRemaining !== null && !quizCompleted) {
            timerRef.current = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        finishQuiz(true); // Time's up!
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timerRef.current);
        }
    }, [quizStarted, quizCompleted]);

    // beforeunload handler to warn user when leaving during active quiz
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (quizStarted && !quizCompleted) {
                e.preventDefault();
                e.returnValue = 'Si abandona el examen, su progreso se guardará automáticamente. ¿Desea salir?';
                return e.returnValue;
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [quizStarted, quizCompleted]);

    // Save partial progress periodically
    useEffect(() => {
        if (quizStarted && examenId && Object.keys(answers).length > 0) {
            const saveInterval = setInterval(() => {
                savePartialProgress();
            }, 30000); // Save every 30 seconds

            return () => clearInterval(saveInterval);
        }
    }, [quizStarted, examenId, answers]);

    const loadModulos = async () => {
        // Get modules from modulos table (using FK design)
        const { data } = await supabase
            .from('modulos')
            .select('id, slug, titulo, icon, color, numero')
            .eq('activo', true)
            .order('numero');

        if (data) {
            setModulos(data);
        }
        setLoading(false);
    };

    const loadPreguntas = async () => {
        setLoading(true);
        let query = supabase
            .from('preguntas')
            .select('*, modulos(id, titulo, icon, color)')
            .eq('activo', true);

        // Filter by modulo_id (FK)
        if (filters.modulo && filters.modulo.length > 0) {
            query = query.in('modulo_id', filters.modulo);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error cargando preguntas:', error);
            setLoading(false);
            return;
        }

        const balanced = balanceQuestions(data, questionCount, filters.nivel);

        setPreguntas(balanced);
        setCurrentIndex(0);
        setAnswers({});
        setScore({ correct: 0, total: 0 });
        setSelectedAnswer(null);
        setShowExplanation(false);
        setStartTime(Date.now());
        setTimeRemaining(timeLimit * 60); // Convert to seconds
        setLoading(false);

        // Create exam record
        if (user) {
            const { data: examData } = await supabase
                .from('examenes')
                .insert([{
                    usuario_id: user.id,
                    tipo: 'quiz',
                    total_preguntas: balanced.length,
                    tiempo_limite_min: timeLimit,
                    fecha_inicio: new Date().toISOString(),
                    completado: false
                }])
                .select()
                .single();
            if (examData) setExamenId(examData.id);
        }
    };

    const balanceQuestions = (allQuestions, count, specificLevel) => {
        if (!allQuestions || allQuestions.length === 0) return [];

        if (specificLevel) {
            // Use 'nivel' field instead of 'dificultad'
            const filtered = allQuestions.filter(q => q.nivel === specificLevel);
            return shuffleArray(filtered).slice(0, count);
        }

        // Use 'nivel' field instead of 'dificultad'
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

    const startQuiz = () => {
        setQuizStarted(true);
        loadPreguntas();
    };

    const resumeExam = async () => {
        if (!resumeData) return;

        setIsResumingExam(true);
        setLoading(true);

        try {
            // Fetch the questions by their IDs
            const { data: fetchedQuestions, error } = await supabase
                .from('preguntas')
                .select('*, modulos(id, titulo, icon, color)')
                .in('id', resumeData.questionIds);

            if (error) {
                console.error('Error loading questions:', error);
                setIsResumingExam(false);
                setLoading(false);
                return;
            }

            // Restore the questions in the original order
            const orderedQuestions = resumeData.questionIds
                .map(id => fetchedQuestions.find(q => q.id === id))
                .filter(Boolean);

            setPreguntas(orderedQuestions);
            setExamenId(resumeData.examenId);
            setAnswers(resumeData.answers);
            setTimeRemaining(resumeData.timeRemaining);
            setCurrentIndex(resumeData.currentQuestionIndex);
            setSelectedAnswer(resumeData.answers[resumeData.currentQuestionIndex]?.letter || null);
            setStartTime(Date.now() - (resumeData.timeLimit * 60 * 1000 - resumeData.timeRemaining * 1000));
            setQuizStarted(true);
            setShowResumeModal(false);
            setIsResumingExam(false);
            setLoading(false);
        } catch (err) {
            console.error('Error resuming exam:', err);
            setIsResumingExam(false);
            setLoading(false);
        }
    };

    const startNewExam = () => {
        if (resumeData) {
            // Clear the saved progress
            localStorage.removeItem(`egel_exam_progress_${resumeData.examenId}`);
        }
        setShowResumeModal(false);
        setResumeData(null);
    };

    const handleAnswer = async (letter) => {
        if (answers[currentIndex]) return;

        setSelectedAnswer(letter);
        const isCorrect = letter === preguntas[currentIndex].respuesta_correcta;

        const newAnswers = {
            ...answers,
            [currentIndex]: { letter, isCorrect }
        };
        setAnswers(newAnswers);

        // Save answer to database
        if (user && examenId) {
            await supabase.from('respuestas_examen').insert([{
                examen_id: examenId,
                pregunta_id: preguntas[currentIndex].id,
                respuesta_usuario: letter,
                es_correcta: isCorrect
            }]);
        }
    };

    const savePartialProgress = async () => {
        if (!user || !examenId) return;

        const correctCount = Object.values(answers).filter(a => a.isCorrect).length;
        const tiempoTranscurrido = Math.floor((Date.now() - startTime) / 1000);

        await supabase
            .from('examenes')
            .update({
                correctas: correctCount,
                incorrectas: Object.keys(answers).length - correctCount,
                porcentaje: Object.keys(answers).length > 0
                    ? (correctCount / Object.keys(answers).length) * 100
                    : 0,
                tiempo_segundos: tiempoTranscurrido,
                updated_at: new Date().toISOString()
            })
            .eq('id', examenId);

        // Also save to localStorage for resume functionality
        saveExamProgressToLocalStorage();
    };

    const saveExamProgressToLocalStorage = () => {
        if (!examenId || !quizStarted || quizCompleted) return;

        const progressData = {
            examenId,
            currentQuestionIndex: currentIndex,
            answers: answers,
            timeRemaining: timeRemaining,
            questionIds: preguntas.map(p => p.id),
            filters: filters,
            questionCount: preguntas.length,
            timeLimit: timeLimit,
            savedAt: new Date().toISOString()
        };

        localStorage.setItem(`egel_exam_progress_${examenId}`, JSON.stringify(progressData));
    };

    const finishQuiz = async (timeUp = false) => {
        clearInterval(timerRef.current);

        const correctCount = Object.values(answers).filter(a => a.isCorrect).length;
        const tiempoTotal = Math.floor((Date.now() - startTime) / 1000);

        setScore({ correct: correctCount, total: Object.keys(answers).length });
        setQuizCompleted(true);

        if (user && examenId) {
            await supabase
                .from('examenes')
                .update({
                    correctas: correctCount,
                    incorrectas: preguntas.length - correctCount,
                    porcentaje: (correctCount / preguntas.length) * 100,
                    tiempo_segundos: tiempoTotal,
                    fecha_fin: new Date().toISOString(),
                    completado: true,
                    tiempo_agotado: timeUp
                })
                .eq('id', examenId);

            // Clear saved progress from localStorage
            localStorage.removeItem(`egel_exam_progress_${examenId}`);
        }
    };

    const nextQuestion = () => {
        if (currentIndex < preguntas.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(answers[currentIndex + 1]?.letter || null);
            setShowExplanation(false);
        }
    };

    const prevQuestion = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setSelectedAnswer(answers[currentIndex - 1]?.letter || null);
            setShowExplanation(false);
        }
    };

    const goToQuestion = (index) => {
        setCurrentIndex(index);
        setSelectedAnswer(answers[index]?.letter || null);
        setShowExplanation(false);
    };

    const restartQuiz = () => {
        clearInterval(timerRef.current);
        // Clear saved progress when restarting
        if (examenId) {
            localStorage.removeItem(`egel_exam_progress_${examenId}`);
        }
        setQuizStarted(false);
        setQuizCompleted(false);
        setPreguntas([]);
        setExamenId(null);
        setAnswers({});
        setTimeRemaining(null);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getTimeColor = () => {
        if (timeRemaining <= 60) return '#ef4444'; // Red for last minute
        if (timeRemaining <= 300) return '#eab308'; // Yellow for last 5 minutes
        return '#22c55e'; // Green
    };

    // Config options
    const countOptions = [30, 50, 80, 100];
    const timeOptions = [30, 45, 60];
    const answeredCount = Object.keys(answers).length;

    // Resume modal
    if (showResumeModal && resumeData) {
        return (
            <div className="container fade-in" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <div className="slide-card" style={{ maxWidth: '500px', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
                        <i className="fa-solid fa-exclamation-circle" style={{ color: 'var(--accent-color)' }}></i>
                    </div>
                    <h2 style={{ marginBottom: '15px' }}>Examen sin Terminar</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '1.1rem' }}>
                        Tienes un examen sin terminar. ¿Deseas continuarlo?
                    </p>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '0.9rem' }}>
                        Progreso: {Object.keys(resumeData.answers).length} de {resumeData.questionCount} preguntas respondidas
                    </p>

                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                        <button
                            onClick={resumeExam}
                            disabled={isResumingExam}
                            className="btn-primary"
                            style={{
                                flex: 1,
                                opacity: isResumingExam ? 0.7 : 1,
                                cursor: isResumingExam ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isResumingExam ? (
                                <>
                                    <i className="fa-solid fa-spinner fa-spin"></i> Cargando...
                                </>
                            ) : (
                                <>
                                    <i className="fa-solid fa-play"></i> Continuar
                                </>
                            )}
                        </button>
                        <button
                            onClick={startNewExam}
                            style={{
                                flex: 1,
                                padding: '16px 24px',
                                background: 'transparent',
                                border: '2px solid var(--text-secondary)',
                                color: 'var(--text-secondary)',
                                borderRadius: '16px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            <i className="fa-solid fa-rotate-right"></i> Nuevo
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Setup screen
    if (!quizStarted) {
        return (
            <div className="container fade-in">
                <div style={{ maxWidth: '650px', margin: '0 auto 20px auto' }}>
                    <button
                        onClick={onBack}
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

                <div className="slide-card" style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}><i className="fa-solid fa-clipboard-question"></i> Quiz EGEL</h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                        Configura tu quiz personalizado
                    </p>

                    {/* Question Count */}
                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 'bold' }}>
                            <i className="fa-solid fa-layer-group"></i> Cantidad de preguntas:
                        </label>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {countOptions.map(count => (
                                <button
                                    key={count}
                                    onClick={() => setQuestionCount(count)}
                                    style={{
                                        padding: '12px 22px',
                                        borderRadius: '10px',
                                        border: questionCount === count ? '3px solid var(--accent-color)' : '2px solid var(--card-border)',
                                        background: questionCount === count ? 'rgba(168, 85, 247, 0.2)' : 'var(--bg-secondary)',
                                        color: questionCount === count ? 'var(--accent-color)' : 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {count}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Time Limit */}
                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text-primary)', fontSize: '1rem', fontWeight: 'bold' }}>
                            <i className="fa-solid fa-stopwatch"></i> Tiempo límite:
                        </label>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {timeOptions.map(time => (
                                <button
                                    key={time}
                                    onClick={() => setTimeLimit(time)}
                                    style={{
                                        padding: '12px 22px',
                                        borderRadius: '10px',
                                        border: timeLimit === time ? '3px solid #22c55e' : '2px solid var(--card-border)',
                                        background: timeLimit === time ? 'rgba(34, 197, 94, 0.2)' : 'var(--bg-secondary)',
                                        color: timeLimit === time ? '#22c55e' : 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {time} min
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Module Filter */}
                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text-primary)', fontSize: '1rem' }}>
                            <i className="fa-solid fa-book"></i> Módulo:
                        </label>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', // Responsive grid
                            gap: '12px',
                            justifyContent: 'center'
                        }}>
                            <button
                                onClick={() => setFilters(f => ({ ...f, modulo: [] }))}
                                style={{
                                    padding: '10px',
                                    borderRadius: '12px',
                                    border: filters.modulo.length === 0 ? '2px solid var(--accent-color)' : '1px solid var(--card-border)',
                                    background: filters.modulo.length === 0 ? 'rgba(168, 85, 247, 0.15)' : 'var(--bg-secondary)',
                                    color: filters.modulo.length === 0 ? 'var(--accent-color)' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'transform 0.2s',
                                    height: '60px'
                                }}
                            >
                                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Todos</span>
                            </button>
                            {modulos.map(mod => {
                                const isSelected = filters.modulo.includes(mod.id);
                                return (
                                    <button
                                        key={mod.id}
                                        onClick={() => setFilters(f => {
                                            const current = f.modulo || [];
                                            const newModules = current.includes(mod.id)
                                                ? current.filter(id => id !== mod.id)
                                                : [...current, mod.id];
                                            return { ...f, modulo: newModules };
                                        })}
                                        style={{
                                            padding: '10px',
                                            borderRadius: '12px',
                                            border: isSelected ? `2px solid ${mod.color}` : '1px solid var(--card-border)',
                                            background: isSelected ? `${mod.color}20` : 'var(--bg-secondary)',
                                            color: isSelected ? mod.color : 'var(--text-secondary)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'transform 0.2s',
                                            height: '60px'
                                        }}
                                    >
                                        <span style={{
                                            display: 'block',
                                            fontSize: '0.8rem',
                                            textAlign: 'center',
                                            lineHeight: '1.2',
                                            maxWidth: '100%',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            //display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical'
                                        }}>
                                            {mod.titulo}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Difficulty Filter */}
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', marginBottom: '12px', color: 'var(--text-primary)', fontSize: '1rem' }}>
                            <i className="fa-solid fa-bullseye"></i> Dificultad:
                        </label>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            {[
                                { value: null, label: <span><i className="fa-solid fa-scale-balanced"></i> Balanceado</span>, color: 'var(--accent-color)' },
                                { value: 'basico', label: <span><i className="fa-solid fa-circle" style={{ fontSize: '0.8em' }}></i> Básico</span>, color: '#22c55e' },
                                { value: 'intermedio', label: <span><i className="fa-solid fa-circle" style={{ fontSize: '0.8em' }}></i> Medio</span>, color: '#eab308' },
                                { value: 'avanzado', label: <span><i className="fa-solid fa-circle" style={{ fontSize: '0.8em' }}></i> Difícil</span>, color: '#ef4444' }
                            ].map(opt => (
                                <button
                                    key={opt.value || 'balanced'}
                                    onClick={() => setFilters(f => ({ ...f, nivel: opt.value }))}
                                    style={{
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        border: filters.nivel === opt.value ? `2px solid ${opt.color}` : '2px solid var(--card-border)',
                                        background: filters.nivel === opt.value ? `${opt.color}20` : 'transparent',
                                        color: filters.nivel === opt.value ? opt.color : 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        fontSize: '0.85rem'
                                    }}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Start Button */}
                    <button className="btn-primary" onClick={startQuiz} style={{ fontSize: '1.2rem', padding: '16px 50px' }}>
                        <i className="fa-solid fa-rocket"></i> Comenzar ({questionCount} preguntas, {timeLimit} min)
                    </button>

                    <p style={{ marginTop: '15px', fontSize: '0.85rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
                        Tu progreso se guardará automáticamente
                    </p>
                </div>
            </div>
        );
    }

    // Loading
    if (loading) {
        return (
            <div className="container fade-in" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px' }}><i className="fa-solid fa-spinner fa-spin"></i></div>
                    <p>Cargando preguntas...</p>
                </div>
            </div>
        );
    }

    // No questions
    if (preguntas.length === 0) {
        return (
            <div className="container fade-in" style={{ justifyContent: 'center', alignItems: 'center' }}>
                <div className="slide-card" style={{ textAlign: 'center' }}>
                    <h2>No hay preguntas disponibles</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
                        Intenta con otros filtros.
                    </p>
                    <button className="btn-primary" onClick={restartQuiz}>Volver a configurar</button>
                </div>
            </div>
        );
    }

    // Quiz completed
    if (quizCompleted) {
        const percentage = preguntas.length > 0 ? Math.round((score.correct / preguntas.length) * 100) : 0;
        const tiempoTotal = Math.floor((Date.now() - startTime) / 1000);
        const minutos = Math.floor(tiempoTotal / 60);
        const segundos = tiempoTotal % 60;

        return (
            <div className="container fade-in" style={{ justifyContent: 'center' }}>
                <div className="slide-card" style={{ textAlign: 'center', maxWidth: '500px' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
                        {percentage >= 70 ? <i className="fa-solid fa-trophy"></i> : percentage >= 50 ? <i className="fa-solid fa-medal"></i> : <i className="fa-solid fa-book-open"></i>}
                    </div>
                    <h1 style={{ marginBottom: '10px' }}>Quiz Completado</h1>

                    <div style={{
                        fontSize: '4rem',
                        fontWeight: 'bold',
                        color: percentage >= 70 ? 'var(--success-color)' : percentage >= 50 ? 'var(--warning-color)' : 'var(--error-color)',
                        margin: '20px 0'
                    }}>
                        {percentage}%
                    </div>

                    <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                        {score.correct} de {preguntas.length} correctas
                    </p>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '30px' }}>
                        <i className="fa-solid fa-clock"></i> Tiempo: {minutos}:{segundos.toString().padStart(2, '0')}
                    </p>

                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                        <button className="btn-primary" onClick={restartQuiz}>
                            <i className="fa-solid fa-rotate-right"></i> Nuevo Quiz
                        </button>
                        <button onClick={onBack} style={{
                            padding: '16px 24px',
                            background: 'transparent',
                            border: '2px solid var(--text-secondary)',
                            color: 'var(--text-secondary)',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            flex: 1
                        }}>
                            ← Volver
                        </button>
                    </div>

                    <p style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--success-color)' }}>
                        <i className="fa-solid fa-check"></i> Resultado guardado en tu historial
                    </p>
                </div>
            </div>
        );
    }

    // Quiz in progress
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
            {/* Header with Timer */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '15px',
                flexWrap: 'wrap',
                gap: '10px'
            }}>
                <button
                    onClick={() => {
                        saveExamProgressToLocalStorage();
                        savePartialProgress();
                        onBack();
                    }}
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
                    ← Guardar y salir
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
                    background: 'var(--accent-color)',
                    transition: 'width 0.3s'
                }} />
            </div>

            {/* Question Navigator */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '5px',
                marginBottom: '20px',
                maxHeight: '70px',
                overflowY: 'auto',
                padding: '5px'
            }}>
                {preguntas.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToQuestion(idx)}
                        style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '6px',
                            border: currentIndex === idx ? '2px solid var(--accent-color)' : 'none',
                            background: answers[idx]
                                ? (answers[idx].isCorrect ? 'var(--success-color)' : 'var(--error-color)')
                                : currentIndex === idx ? 'rgba(168, 85, 247, 0.3)' : 'var(--bg-secondary)',
                            color: answers[idx] ? '#000' : 'var(--text-primary)',
                            fontSize: '0.7rem',
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
                <div style={{ display: 'flex', gap: '8px', marginBottom: '15px', flexWrap: 'wrap' }}>
                    <span style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: `${nivelColors[pregunta.nivel] || '#a855f7'}22`,
                        color: nivelColors[pregunta.nivel] || '#a855f7',
                        fontSize: '0.8rem'
                    }}>
                        {pregunta.nivel?.toUpperCase() || 'SIN NIVEL'}
                    </span>
                    {pregunta.modulos && (
                        <span style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            background: `${pregunta.modulos.color}22`,
                            color: pregunta.modulos.color,
                            fontSize: '0.8rem'
                        }}>
                            <i className={pregunta.modulos.icon}></i> {pregunta.modulos.titulo}
                        </span>
                    )}
                    <span style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(168, 85, 247, 0.15)',
                        color: 'var(--accent-color)',
                        fontSize: '0.8rem',
                        marginLeft: 'auto'
                    }}>
                        {currentIndex + 1} / {preguntas.length}
                    </span>
                </div>

                {/* Question */}
                <div style={{ fontSize: '1.2rem', lineHeight: '1.7', marginBottom: '10px', fontWeight: '700' }}>
                    <RichText content={pregunta.pregunta} />
                </div>
                <QuestionImage url={pregunta.imagen_url} />

                {/* Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {opciones.map(opt => {
                        const isSelected = selectedAnswer === opt.letter || answers[currentIndex]?.letter === opt.letter;
                        const showResult = answers[currentIndex] !== undefined;
                        const isCorrect = opt.letter === pregunta.respuesta_correcta;

                        let borderColor = 'var(--card-border)';
                        let bgColor = 'transparent';

                        if (showResult) {
                            if (isCorrect) {
                                borderColor = 'var(--success-color)';
                                bgColor = 'rgba(74, 222, 128, 0.15)';
                            } else if (isSelected && !isCorrect) {
                                borderColor = 'var(--error-color)';
                                bgColor = 'rgba(248, 113, 113, 0.15)';
                            }
                        } else if (isSelected) {
                            borderColor = 'var(--accent-color)';
                            bgColor = 'rgba(168, 85, 247, 0.15)';
                        }

                        return (
                            <button
                                key={opt.letter}
                                onClick={() => handleAnswer(opt.letter)}
                                disabled={answers[currentIndex] !== undefined}
                                style={{
                                    padding: '14px 18px',
                                    borderRadius: '10px',
                                    border: `2px solid ${borderColor}`,
                                    background: bgColor,
                                    color: 'var(--text-primary)',
                                    textAlign: 'left',
                                    cursor: answers[currentIndex] ? 'default' : 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px'
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
                                    background: showResult && isCorrect ? 'var(--success-color)' :
                                        showResult && isSelected ? 'var(--error-color)' :
                                            isSelected ? 'var(--accent-color)' : 'var(--bg-secondary)',
                                    color: (showResult && (isCorrect || isSelected)) || isSelected ? '#000' : 'var(--text-secondary)',
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

                {/* Explanation */}
                {answers[currentIndex] && (
                    <div style={{ marginTop: '25px' }}>
                        {!showExplanation ? (
                            <button
                                onClick={() => setShowExplanation(true)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    background: 'transparent',
                                    border: '2px solid var(--text-secondary)',
                                    color: 'var(--text-secondary)',
                                    borderRadius: '8px',
                                    cursor: 'pointer'
                                }}
                            >
                                💡 Ver explicación
                            </button>
                        ) : (
                            <div className="fade-in" style={{
                                background: 'rgba(168, 85, 247, 0.1)',
                                padding: '18px',
                                borderRadius: '10px',
                                borderLeft: '4px solid var(--accent-color)'
                            }}>
                                <strong style={{ display: 'block', marginBottom: '8px', color: 'var(--accent-color)' }}>
                                    💡 Explicación:
                                </strong>
                                <div style={{ lineHeight: '1.6', marginBottom: pregunta.formula ? '12px' : 0 }}>
                                    <RichText content={pregunta.explicacion} />
                                </div>
                                {pregunta.formula && (
                                    <div style={{
                                        background: 'rgba(0,0,0,0.3)',
                                        padding: '10px 14px',
                                        borderRadius: '8px',
                                        fontFamily: 'monospace',
                                        fontSize: '0.9rem',
                                        color: 'var(--warning-color)'
                                    }}>
                                        📐 {pregunta.formula}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

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
                            padding: '10px 18px',
                            background: currentIndex === 0 ? 'var(--bg-secondary)' : 'transparent',
                            border: '2px solid var(--text-secondary)',
                            color: currentIndex === 0 ? 'var(--text-secondary)' : '#fff',
                            borderRadius: '8px',
                            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                            opacity: currentIndex === 0 ? 0.5 : 1
                        }}
                    >
                        ← Anterior
                    </button>

                    {answeredCount === preguntas.length ? (
                        <button
                            onClick={() => finishQuiz(false)}
                            className="btn-primary"
                            style={{ background: 'var(--success-color)', color: '#000' }}
                        >
                            ✓ Finalizar Quiz
                        </button>
                    ) : currentIndex < preguntas.length - 1 ? (
                        <button onClick={nextQuestion} className="btn-primary">
                            Siguiente →
                        </button>
                    ) : (
                        <button
                            onClick={() => finishQuiz(false)}
                            className="btn-primary"
                            style={{ background: 'var(--warning-color)', color: '#000' }}
                        >
                            Finalizar ({answeredCount}/{preguntas.length})
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizMode;
