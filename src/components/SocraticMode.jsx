import React, { useState } from 'react';

const SocraticMode = ({ module, onBack }) => {
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [phase, setPhase] = useState('lesson'); // 'lesson' | 'quiz'
    const [step, setStep] = useState('question'); // 'question' | 'hint' | 'answer'

    const topic = module.topics[currentTopicIndex];
    const question = topic?.socratic_questions[currentQuestionIndex];
    const lesson = topic?.lesson;

    if (!topic) {
        return (
            <div className="container fade-in" style={{ textAlign: 'center', justifyContent: 'center' }}>
                <div className="slide-card">
                    <h1>🎉 ¡Módulo Completado!</h1>
                    <p>Has dominado los temas de {module.title}.</p>
                    <button className="btn-primary" onClick={onBack}>Volver al Inicio</button>
                </div>
            </div>
        );
    }

    const handleNextInLesson = () => {
        setPhase('quiz');
        setStep('question');
    };

    const handleNextInQuiz = () => {
        setStep('question');
        if (currentQuestionIndex < topic.socratic_questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else if (currentTopicIndex < module.topics.length - 1) {
            setCurrentTopicIndex(prev => prev + 1);
            setCurrentQuestionIndex(0);
            setPhase('lesson');
        } else {
            setCurrentTopicIndex(prev => prev + 1); // Trigger complete
        }
    };

    const progress = ((currentTopicIndex) / module.topics.length) * 100;

    return (
        <div className="container fade-in">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <button onClick={onBack} style={{ background: 'transparent', color: 'var(--text-secondary)', fontSize: '1rem' }}>
                    ← Salir
                </button>
                <div style={{ flexGrow: 1, height: '6px', background: 'var(--bg-secondary)', margin: '0 20px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: module.color, transition: 'width 0.5s ease' }}></div>
                </div>
                <span style={{ color: module.color, fontWeight: 'bold' }}>{currentTopicIndex + 1} / {module.topics.length}</span>
            </div>

            {/* --- PHASE 1: LESSON (Didactic Slide) --- */}
            {phase === 'lesson' && lesson && (
                <div className="slide-card" style={{ borderTop: `8px solid ${module.color}` }}>
                    <div className="tag" style={{ background: 'rgba(255,255,255,0.1)', color: module.color }}>
                        LECCIÓN
                    </div>

                    <h2 style={{ color: '#fff', marginTop: '10px' }}>{topic.title}</h2>

                    <p>{lesson.explanation}</p>

                    <div className="example-box" style={{ borderColor: module.color }}>
                        <h3 style={{ fontSize: '1.4rem', color: module.color, marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            💡 Ejemplo: {lesson.example_title}
                        </h3>
                        <p style={{ fontStyle: 'italic', marginBottom: 0, fontSize: '1.2rem' }}>
                            "{lesson.example}"
                        </p>
                    </div>

                    <div style={{ marginTop: '40px' }}>
                        <button className="btn-primary" onClick={handleNextInLesson} style={{ background: module.color, color: '#000' }}>
                            Entendido, ¡Vamos al Quiz! →
                        </button>
                    </div>
                </div>
            )}

            {/* --- PHASE 2: SOCRATIC QUIZ (Challenge Slide) --- */}
            {phase === 'quiz' && question && (
                <div className="slide-card" style={{ borderTop: `8px solid var(--warning-color)` }}>
                    <div className="tag" style={{ background: 'rgba(250, 204, 21, 0.2)', color: 'var(--warning-color)' }}>
                        DESAFÍO SOCRÁTICO
                    </div>

                    <h2 style={{ marginTop: '10px', fontSize: '1.8rem' }}>{question.q}</h2>

                    <div style={{ minHeight: '150px' }}>
                        {step === 'hint' && (
                            <div className="fade-in" style={{ background: 'rgba(250, 204, 21, 0.1)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid var(--warning-color)', marginBottom: '20px' }}>
                                <strong style={{ display: 'block', marginBottom: '5px', color: 'var(--warning-color)' }}>🤔 Pista:</strong>
                                <span style={{ fontSize: '1.1rem' }}>{question.hint}</span>
                            </div>
                        )}

                        {step === 'answer' && (
                            <div className="fade-in" style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid var(--success-color)', marginBottom: '20px' }}>
                                <strong style={{ display: 'block', marginBottom: '5px', color: 'var(--success-color)' }}>✨ Respuesta:</strong>
                                <span style={{ fontSize: '1.1rem' }}>{question.answer}</span>
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: 'auto' }}>
                        {step === 'question' && (
                            <button className="btn-primary" style={{ background: 'transparent', border: '2px solid var(--text-secondary)', color: 'var(--text-secondary)' }} onClick={() => setStep('hint')}>
                                Necesito una pista
                            </button>
                        )}

                        {step !== 'answer' && (
                            <button className="btn-primary" onClick={() => setStep('answer')} style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}>
                                👁️ Ver Respuesta
                            </button>
                        )}

                        {step === 'answer' && (
                            <button className="btn-primary" onClick={handleNextInQuiz} style={{ background: module.color }}>
                                Siguiente Pregunta →
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocraticMode;
