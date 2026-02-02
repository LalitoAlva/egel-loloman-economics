import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const NotificationsBubble = ({ isOpen, onToggle, onClose }) => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadNotifications();
        }
    }, [user]);

    const loadNotifications = async () => {
        setLoading(true);

        // Load user notifications
        const { data: userNotifs } = await supabase
            .from('notificaciones')
            .select('*')
            .eq('usuario_id', user.id)
            .eq('activa', true)
            .order('created_at', { ascending: false })
            .limit(10);

        // Load global notifications (like weekly test reminders)
        const { data: globalNotifs } = await supabase
            .from('notificaciones')
            .select('*')
            .is('usuario_id', null)
            .eq('activa', true)
            .order('created_at', { ascending: false })
            .limit(5);

        // Check for weekly test notification
        await checkWeeklyTestNotification();

        const allNotifs = [...(userNotifs || []), ...(globalNotifs || [])];

        // Sort by date
        allNotifs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setNotifications(allNotifs);
        setUnreadCount(allNotifs.filter(n => !n.leida).length);
        setLoading(false);
    };

    const checkWeeklyTestNotification = async () => {
        // Check if there's an active weekly test
        const today = new Date();
        const dayOfWeek = today.getDay();

        // If it's Sunday (0) or Monday (1), remind about weekly test
        if (dayOfWeek === 0 || dayOfWeek === 1) {
            // Check if we already have this week's reminder
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - dayOfWeek);

            const { data: existingReminder } = await supabase
                .from('notificaciones')
                .select('id')
                .eq('usuario_id', user.id)
                .eq('tipo', 'prueba_semanal')
                .gte('created_at', weekStart.toISOString())
                .single();

            if (!existingReminder) {
                // Create weekly test reminder
                await supabase.from('notificaciones').insert([{
                    usuario_id: user.id,
                    tipo: 'prueba_semanal',
                    titulo: '📅 Prueba Semanal Disponible',
                    mensaje: '¡Es hora de tu prueba semanal! 80 preguntas te esperan.',
                    icono: '📅',
                    color: '#3b82f6',
                    accion_url: 'weekly'
                }]);
            }
        }
    };

    const markAsRead = async (notifId) => {
        await supabase
            .from('notificaciones')
            .update({ leida: true })
            .eq('id', notifId);

        setNotifications(prev => prev.map(n =>
            n.id === notifId ? { ...n, leida: true } : n
        ));
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    const dismissNotification = async (notifId) => {
        await supabase
            .from('notificaciones')
            .update({ activa: false })
            .eq('id', notifId);

        setNotifications(prev => prev.filter(n => n.id !== notifId));
        setUnreadCount(prev => {
            const notif = notifications.find(n => n.id === notifId);
            return notif && !notif.leida ? Math.max(0, prev - 1) : prev;
        });
    };

    const getTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);

        if (seconds < 60) return 'Ahora';
        if (seconds < 3600) return `Hace ${Math.floor(seconds / 60)} min`;
        if (seconds < 86400) return `Hace ${Math.floor(seconds / 3600)} hrs`;
        return `Hace ${Math.floor(seconds / 86400)} días`;
    };

    return (
        <>
            {/* Notification Bell Button */}
            <button
                onClick={onToggle}
                style={{
                    position: 'fixed',
                    top: '70px',
                    right: '20px',
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    background: isOpen ? 'var(--accent-color)' : 'var(--bg-secondary)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    zIndex: 1000,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    transition: 'all 0.2s'
                }}
            >
                🔔
                {unreadCount > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: '#ef4444',
                        color: '#fff',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Notifications Panel */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.3)',
                            zIndex: 999
                        }}
                    />

                    {/* Panel */}
                    <div
                        className="fade-in"
                        style={{
                            position: 'fixed',
                            top: '125px',
                            right: '20px',
                            width: '340px',
                            maxHeight: '450px',
                            background: 'var(--bg-secondary)',
                            borderRadius: '16px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                            zIndex: 1001,
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '15px 20px',
                            borderBottom: '1px solid rgba(255,255,255,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <h3 style={{ color: '#fff', fontSize: '1rem', margin: 0 }}>
                                🔔 Notificaciones
                            </h3>
                            {unreadCount > 0 && (
                                <span style={{
                                    padding: '4px 10px',
                                    background: 'rgba(239, 68, 68, 0.2)',
                                    color: '#ef4444',
                                    borderRadius: '12px',
                                    fontSize: '0.8rem'
                                }}>
                                    {unreadCount} nueva{unreadCount > 1 ? 's' : ''}
                                </span>
                            )}
                        </div>

                        {/* Notifications List */}
                        <div style={{
                            maxHeight: '350px',
                            overflowY: 'auto',
                            padding: '10px'
                        }}>
                            {loading ? (
                                <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    Cargando...
                                </div>
                            ) : notifications.length === 0 ? (
                                <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📭</div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        No tienes notificaciones
                                    </p>
                                </div>
                            ) : (
                                notifications.map(notif => (
                                    <div
                                        key={notif.id}
                                        onClick={() => markAsRead(notif.id)}
                                        style={{
                                            padding: '12px 15px',
                                            marginBottom: '8px',
                                            background: notif.leida ? 'transparent' : 'rgba(168, 85, 247, 0.1)',
                                            borderRadius: '10px',
                                            borderLeft: `3px solid ${notif.color || 'var(--accent-color)'}`,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            position: 'relative'
                                        }}
                                    >
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <span style={{ fontSize: '1.5rem' }}>{notif.icono || '📢'}</span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{
                                                    color: '#fff',
                                                    fontWeight: notif.leida ? 'normal' : 'bold',
                                                    fontSize: '0.9rem',
                                                    marginBottom: '4px'
                                                }}>
                                                    {notif.titulo}
                                                </div>
                                                <div style={{
                                                    color: 'var(--text-secondary)',
                                                    fontSize: '0.8rem',
                                                    lineHeight: '1.4'
                                                }}>
                                                    {notif.mensaje}
                                                </div>
                                                <div style={{
                                                    color: 'var(--text-secondary)',
                                                    fontSize: '0.7rem',
                                                    marginTop: '6px',
                                                    opacity: 0.7
                                                }}>
                                                    {getTimeAgo(notif.created_at)}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Dismiss button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                dismissNotification(notif.id);
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: '8px',
                                                right: '8px',
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                background: 'rgba(255,255,255,0.1)',
                                                border: 'none',
                                                color: 'var(--text-secondary)',
                                                cursor: 'pointer',
                                                fontSize: '0.7rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            ✕
                                        </button>

                                        {/* Unread indicator */}
                                        {!notif.leida && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '35px',
                                                transform: 'translateY(-50%)',
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                background: 'var(--accent-color)'
                                            }} />
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default NotificationsBubble;
