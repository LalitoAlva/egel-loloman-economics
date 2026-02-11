import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = ({ onBack }) => {
    const { user, updateInactivityTimeout, inactivityTimeoutMs } = useAuth();
    const [loading, setLoading] = useState(true);
    const [examenes, setExamenes] = useState([]);
    const [progreso, setProgreso] = useState([]);
    const [stats, setStats] = useState({
        totalExamenes: 0,
        promedioGeneral: 0,
        mejorPuntaje: 0,
        tiempoTotal: 0,
        modulosCompletados: 0
    });

    useEffect(() => {
        if (user) {
            loadStudentData();
        }
    }, [user]);

    const loadStudentData = async () => {
        setLoading(true);

        // Load exams
        const { data: examenesData } = await supabase
            .from('examenes')
            .select('*')
            .eq('usuario_id', user.id)
            .order('fecha_inicio', { ascending: false })
            .limit(20);

        setExamenes(examenesData || []);

        // Load module progress
        const { data: progresoData } = await supabase
            .from('progreso_modulo')
            .select('*, modulos:modulo(titulo, icon, color)')
            .eq('usuario_id', user.id);

        setProgreso(progresoData || []);

        // Calculate stats
        if (examenesData && examenesData.length > 0) {
            const completedExams = examenesData.filter(e => e.completado);
            const avgScore = completedExams.length > 0
                ? completedExams.reduce((sum, e) => sum + parseFloat(e.porcentaje || 0), 0) / completedExams.length
                : 0;
            const bestScore = completedExams.length > 0
                ? Math.max(...completedExams.map(e => parseFloat(e.porcentaje || 0)))
                : 0;
            const totalTime = examenesData.reduce((sum, e) => sum + (e.tiempo_segundos || 0), 0);

            setStats({
                totalExamenes: completedExams.length,
                promedioGeneral: avgScore.toFixed(1),
                mejorPuntaje: bestScore.toFixed(1),
                tiempoTotal: Math.round(totalTime / 60),
                modulosCompletados: (progresoData || []).filter(p => p.completado).length
            });
        }

        setLoading(false);
    };

    if (!user) {
        return (
            <div className="container fade-in" style={{ textAlign: 'center', paddingTop: '60px' }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}><i className="fa-solid fa-lock"></i></div>
                <h1 style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>Inicia Sesión</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                    Necesitas iniciar sesión para ver tu progreso.
                </p>
                <button onClick={onBack} className="btn-primary">← Volver al Inicio</button>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="container fade-in" style={{ textAlign: 'center', paddingTop: '60px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}><i className="fa-solid fa-spinner fa-spin"></i></div>
                <p>Cargando tu progreso...</p>
            </div>
        );
    }

    return (
        <div className="container fade-in">
            <div style={{ maxWidth: '600px', margin: '0 auto 20px auto' }}>
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
                    <i className="fa-solid fa-door-open"></i> Volver al Inicio
                </button>
            </div>

            {/* Header with user info */}
            <header style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginBottom: '30px',
                padding: '25px',
                background: 'var(--bg-secondary)',
                borderRadius: '16px',
                borderLeft: '6px solid var(--accent-color)'
            }}>
                <div style={{ fontSize: '4rem' }}>{user.id ? <i className="fa-solid fa-user-astronaut" style={{ color: 'var(--accent-color)' }}></i> : <i className="fa-solid fa-circle-user"></i>}</div>
                <div>
                    <h1 style={{ fontSize: '1.8rem', marginBottom: '5px', color: 'var(--text-primary)' }}>
                        ¡Hola, {user.nombre}!
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        {user.roles?.nombre === 'estudiante' ? <span><i className="fa-solid fa-graduation-cap"></i> Estudiante</span> :
                            user.roles?.nombre === 'profesor' ? <span><i className="fa-solid fa-chalkboard-user"></i> Profesor</span> :
                                <span><i className="fa-solid fa-user-shield"></i> Administrador</span>}
                    </p>
                </div>
            </header>

            {/* Session Settings */}
            <div style={{
                marginBottom: '30px',
                padding: '20px',
                background: 'var(--bg-secondary)',
                borderRadius: '16px',
                border: '1px solid var(--card-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '15px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'rgba(168, 85, 247, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-color)',
                        fontSize: '1.2rem'
                    }}>
                        <i className="fa-solid fa-stopwatch"></i>
                    </div>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>Tiempo de Inactividad</h3>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            Cerrar sesión automáticamente después de:
                        </p>
                    </div>
                </div>

                <select
                    value={inactivityTimeoutMs ? inactivityTimeoutMs / 60000 : 30}
                    onChange={(e) => updateInactivityTimeout(parseInt(e.target.value))}
                    style={{
                        padding: '10px 15px',
                        borderRadius: '8px',
                        border: '1px solid var(--card-border)',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        outline: 'none',
                        minWidth: '150px'
                    }}
                >
                    <option value="2">2 min (Prueba)</option>
                    <option value="15">15 minutos</option>
                    <option value="30">30 minutos (Recomendado)</option>
                    <option value="60">1 hora</option>
                </select>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '15px',
                marginBottom: '30px'
            }}>
                <StatCard
                    icon={<i className="fa-solid fa-clipboard-list"></i>}
                    value={stats.totalExamenes}
                    label="Exámenes"
                    color="#a855f7"
                />
                <StatCard
                    icon={<i className="fa-solid fa-chart-pie"></i>}
                    value={`${stats.promedioGeneral}%`}
                    label="Promedio"
                    color={parseFloat(stats.promedioGeneral) >= 70 ? '#22c55e' : '#eab308'}
                />
                <StatCard
                    icon={<i className="fa-solid fa-trophy"></i>}
                    value={`${stats.mejorPuntaje}%`}
                    label="Mejor Puntaje"
                    color="#22c55e"
                />
                <StatCard
                    icon={<i className="fa-solid fa-clock"></i>}
                    value={`${stats.tiempoTotal}m`}
                    label="Tiempo Total"
                    color="#3b82f6"
                />
            </div>

            {/* Recent Exams */}
            <section className="slide-card" style={{ marginBottom: '25px' }}>
                <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', color: 'var(--text-primary)' }}>
                    📋 Historial de Exámenes
                </h2>

                {examenes.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                        <p style={{ fontSize: '3rem', marginBottom: '15px' }}><i className="fa-regular fa-folder-open"></i></p>
                        <p>Aún no has realizado ningún examen.</p>
                        <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
                            ¡Empieza con un Quiz para ver tu progreso aquí!
                        </p>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--card-border)' }}>
                                    <th style={thStyle}>Fecha</th>
                                    <th style={thStyle}>Tipo</th>
                                    <th style={thStyle}>Preguntas</th>
                                    <th style={thStyle}>Resultado</th>
                                    <th style={thStyle}>Tiempo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {examenes.map(exam => (
                                    <tr key={exam.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                                        <td style={tdStyle}>
                                            {new Date(exam.fecha_inicio).toLocaleDateString('es-MX', {
                                                day: '2-digit',
                                                month: 'short',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </td>
                                        <td style={tdStyle}>
                                            <span style={{
                                                padding: '4px 10px',
                                                background: exam.tipo === 'quiz' ? 'rgba(168, 85, 247, 0.2)' :
                                                    exam.tipo === 'semanal' ? 'rgba(59, 130, 246, 0.2)' :
                                                        'rgba(34, 197, 94, 0.2)',
                                                color: exam.tipo === 'quiz' ? '#a855f7' :
                                                    exam.tipo === 'semanal' ? '#3b82f6' : '#22c55e',
                                                borderRadius: '4px',
                                                fontSize: '0.85rem'
                                            }}>
                                                {exam.tipo.charAt(0).toUpperCase() + exam.tipo.slice(1)}
                                            </span>
                                        </td>
                                        <td style={tdStyle}>
                                            {exam.correctas}/{exam.total_preguntas}
                                        </td>
                                        <td style={tdStyle}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{
                                                    width: '60px',
                                                    height: '8px',
                                                    background: 'var(--bg-primary)',
                                                    borderRadius: '4px',
                                                    overflow: 'hidden'
                                                }}>
                                                    <div style={{
                                                        width: `${exam.porcentaje}%`,
                                                        height: '100%',
                                                        background: parseFloat(exam.porcentaje) >= 70 ? '#22c55e' :
                                                            parseFloat(exam.porcentaje) >= 50 ? '#eab308' : '#ef4444',
                                                        transition: 'width 0.3s'
                                                    }} />
                                                </div>
                                                <span style={{
                                                    color: parseFloat(exam.porcentaje) >= 70 ? '#22c55e' :
                                                        parseFloat(exam.porcentaje) >= 50 ? '#eab308' : '#ef4444',
                                                    fontWeight: 'bold'
                                                }}>
                                                    {parseFloat(exam.porcentaje).toFixed(0)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td style={tdStyle}>
                                            {exam.tiempo_segundos
                                                ? `${Math.floor(exam.tiempo_segundos / 60)}:${String(exam.tiempo_segundos % 60).padStart(2, '0')}`
                                                : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            {/* Module Progress */}
            {progreso.length > 0 && (
                <section className="slide-card">
                    <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', color: 'var(--text-primary)' }}>
                        📚 Progreso por Módulo
                    </h2>

                    <div style={{ display: 'grid', gap: '15px' }}>
                        {progreso.map(p => (
                            <div key={p.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                padding: '15px',
                                background: 'var(--bg-primary)',
                                borderRadius: '10px',
                                borderLeft: `4px solid ${p.modulos?.color || 'var(--accent-color)'}`
                            }}>
                                <span style={{ fontSize: '1.5rem' }}>{p.modulos?.icon || <i className="fa-solid fa-book"></i>}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>
                                        {p.modulos?.titulo || p.modulo}
                                    </div>
                                    <div style={{
                                        height: '8px',
                                        background: 'var(--bg-secondary)',
                                        borderRadius: '4px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${p.tarjetas_totales > 0 ? (p.tarjetas_vistas / p.tarjetas_totales) * 100 : 0}%`,
                                            height: '100%',
                                            background: p.modulos?.color || 'var(--accent-color)',
                                            transition: 'width 0.3s'
                                        }} />
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right', minWidth: '80px' }}>
                                    <div style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>
                                        {p.tarjetas_vistas}/{p.tarjetas_totales}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                        tarjetas
                                    </div>
                                </div>
                                {p.completado && (
                                    <span style={{ fontSize: '1.5rem', color: 'var(--success-color)' }}><i className="fa-solid fa-circle-check"></i></span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

// Stat Card Component
const StatCard = ({ icon, value, label, color }) => (
    <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: '12px',
        padding: '20px',
        textAlign: 'center',
        borderTop: `4px solid ${color}`
    }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{icon}</div>
        <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color }}>{value}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{label}</div>
    </div>
);

// Table styles
const thStyle = {
    textAlign: 'left',
    padding: '12px',
    color: 'var(--text-secondary)',
    fontSize: '0.85rem',
    fontWeight: '600'
};

const tdStyle = {
    padding: '12px',
    color: 'var(--text-primary)',
    fontSize: '0.9rem'
};

export default StudentDashboard;
