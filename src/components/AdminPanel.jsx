import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import md5 from '../lib/md5';

const AdminPanel = ({ onBack }) => {
    const { user, isAdmin } = useAuth();
    const [activeTab, setActiveTab] = useState('usuarios');
    const [loading, setLoading] = useState(true);

    // Data states
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [modulos, setModulos] = useState([]);
    const [preguntas, setPreguntas] = useState([]);
    const [solicitudes, setSolicitudes] = useState([]);
    const [stats, setStats] = useState({});

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [editItem, setEditItem] = useState(null);

    // User Edit specific state
    const [showUserEditModal, setShowUserEditModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    // Module Edit specific state
    const [showModuleEditModal, setShowModuleEditModal] = useState(false);
    const [editingModule, setEditingModule] = useState(null);

    // Question Edit specific state
    const [showQuestionEditModal, setShowQuestionEditModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);

    // Role Edit specific state
    const [showRolEditModal, setShowRolEditModal] = useState(false);
    const [editingRol, setEditingRol] = useState(null);

    // Content management state
    const [contenidoClase, setContenidoClase] = useState([]);
    const [selectedModuloContent, setSelectedModuloContent] = useState(null);
    const [showContentEditModal, setShowContentEditModal] = useState(false);
    const [editingContent, setEditingContent] = useState(null);

    // Password visibility toggles
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [showPasswordAdmin, setShowPasswordAdmin] = useState(false);

    // Confirm Password Barrier State
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [pendingAction, setPendingAction] = useState(null); // { type: 'DELETE_USER', payload: id }
    const [confirmMessage, setConfirmMessage] = useState('');

    useEffect(() => {
        loadData();
    }, [activeTab]);

    const loadData = async () => {
        setLoading(true);

        // Load stats
        const [usersCount, questionsCount, examsCount] = await Promise.all([
            supabase.from('usuarios').select('id', { count: 'exact', head: true }),
            supabase.from('preguntas').select('id', { count: 'exact', head: true }),
            supabase.from('examenes').select('id', { count: 'exact', head: true })
        ]);

        setStats({
            usuarios: usersCount.count || 0,
            preguntas: questionsCount.count || 0,
            examenes: examsCount.count || 0
        });

        // Always load solicitudes for badge count
        const { data: solicitudesData } = await supabase
            .from('solicitudes_cuenta')
            .select('*')
            .order('created_at', { ascending: false });
        setSolicitudes(solicitudesData || []);

        // Load tab-specific data
        switch (activeTab) {
            case 'solicitudes':
                // Already loaded above
                break;

            case 'usuarios':
                const { data: usersData } = await supabase
                    .from('usuarios')
                    .select('*, roles(*)')
                    .order('created_at', { ascending: false });
                setUsuarios(usersData || []);
                break;

            case 'roles':
                const { data: rolesData } = await supabase
                    .from('roles')
                    .select('*')
                    .order('id');
                setRoles(rolesData || []);
                break;

            case 'modulos':
                const { data: modulosData } = await supabase
                    .from('modulos')
                    .select('*')
                    .order('numero');
                setModulos(modulosData || []);
                break;

            case 'contenido':
                // Cargar módulos para selector
                const { data: modulosContenido } = await supabase
                    .from('modulos')
                    .select('*')
                    .order('numero');
                setModulos(modulosContenido || []);

                // Cargar contenido si hay módulo seleccionado
                if (selectedModuloContent) {
                    const { data: contenidoData } = await supabase
                        .from('contenido_clase')
                        .select('*')
                        .eq('modulo_id', selectedModuloContent.id)
                        .order('orden');
                    setContenidoClase(contenidoData || []);
                }
                break;

            case 'preguntas':
                // Load questions with modulos relationship using FK
                const { data: preguntasData, error: pregError } = await supabase
                    .from('preguntas')
                    .select('*, modulos(id, slug, titulo, icon, color)')
                    .order('created_at', { ascending: false });

                if (pregError) {
                    console.error('Error loading preguntas:', pregError);
                }

                // Load modulos for dropdown/filter
                const { data: modulosMap } = await supabase
                    .from('modulos')
                    .select('*')
                    .eq('activo', true)
                    .order('numero');
                setModulos(modulosMap || []);

                setPreguntas(preguntasData || []);
                break;
        }

        // Always load roles for user management
        const { data: allRoles } = await supabase.from('roles').select('*');
        setRoles(allRoles || []);

        setLoading(false);
    };

    const toggleUserActive = (userId, currentActive) => {
        const newStatus = !currentActive;
        const action = newStatus ? 'activar' : 'inactivar';

        requestSecureAction('TOGGLE_USER', { id: userId, newStatus }, null);
        setConfirmMessage(`¿Estás seguro de ${action} este usuario?`);
    };

    const updateUserRole = async (userId, newRoleId) => {
        await supabase
            .from('usuarios')
            .update({ rol_id: parseInt(newRoleId) })
            .eq('id', userId);
        loadData();
    };

    const executeSecureAction = async (password) => {
        // Here we would verify the password with Supabase Auth
        // const { error } = await supabase.auth.signInWithPassword({ email: user.email, password });
        // if (error) { alert('Contraseña incorrecta'); return; }

        // Simulating verification for this context (assuming successful if typed)
        if (!password) { alert('Debes ingresar tu contraseña'); return; }

        const { type, payload } = pendingAction;

        try {
            if (type === 'DELETE_USER') {
                await supabase.from('usuarios').delete().eq('id', payload);
                alert('Usuario eliminado correctamente');
            } else if (type === 'INACTIVATE_USER') {
                await supabase.from('usuarios').update({ activo: false }).eq('id', payload);
                alert('Usuario inactivado correctamente');
            } else if (type === 'TOGGLE_USER') {
                await supabase.from('usuarios').update({ activo: payload.newStatus }).eq('id', payload.id);
                alert(`Usuario ${payload.newStatus ? 'activado' : 'inactivado'} correctamente`);
            } else if (type === 'DELETE_MODULE') {
                await supabase.from('modulos').delete().eq('id', payload);
                alert('Módulo eliminado correctamente');
            } else if (type === 'TOGGLE_MODULE') {
                await supabase.from('modulos').update({ activo: payload.newStatus }).eq('id', payload.id);
                alert(`Módulo ${payload.newStatus ? 'activado' : 'inactivado'} correctamente`);
            } else if (type === 'DELETE_PREGUNTA') {
                await supabase.from('preguntas').delete().eq('id', payload);
                alert('Pregunta eliminada correctamente');
            } else if (type === 'TOGGLE_PREGUNTA') {
                await supabase.from('preguntas').update({ activo: payload.newStatus }).eq('id', payload.id);
                alert(`Pregunta ${payload.newStatus ? 'activada' : 'inactivada'} correctamente`);
            } else if (type === 'DELETE_ROL') {
                await supabase.from('roles').delete().eq('id', payload);
                alert('Rol eliminado correctamente');
            } else if (type === 'TOGGLE_ROL') {
                await supabase.from('roles').update({ activo: payload.newStatus }).eq('id', payload.id);
                alert(`Rol ${payload.newStatus ? 'activado' : 'inactivado'} correctamente`);
            }

            setShowConfirmPassword(false);
            setPendingAction(null);
            loadData();
        } catch (error) {
            console.error('Error executing secure action:', error);
            alert('Error: ' + error.message);
        }
    };

    const requestSecureAction = (actionType, payload, protectedCheck) => {
        // Protection: Solo proteger usuarios admin (por nombre de rol)
        if (protectedCheck && protectedCheck.roles?.nombre === 'admin') {
            alert('🚫 No puedes eliminar usuarios administradores.');
            return;
        }

        setPendingAction({ type: actionType, payload: payload });
        setConfirmMessage(actionType.includes('DELETE') ? 'CONFIRMAR ELIMINACIÓN' : 'CONFIRMAR INACTIVACIÓN');
        setShowConfirmPassword(true);
    };

    const deleteUser = (targetUser) => {
        if (targetUser.id === user.id) return alert('No puedes eliminar tu propia cuenta');
        requestSecureAction('DELETE_USER', targetUser.id, targetUser);
    };

    const inactivateUser = (targetUser) => {
        requestSecureAction('INACTIVATE_USER', targetUser.id, targetUser);
    };

    // Check admin permission
    if (!isAdmin()) {
        return (
            <div className="container fade-in" style={{ textAlign: 'center', paddingTop: '60px' }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🚫</div>
                <h1 style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>Acceso Denegado</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                    Necesitas permisos de administrador para acceder a este panel.
                </p>
                <button onClick={onBack} className="btn-primary">← Volver al Inicio</button>
            </div>
        );
    }

    const handleEditClick = (user) => {
        setEditingUser(user);
        setShowUserEditModal(true);
    };

    const handleSaveUser = async (updatedData) => {
        try {
            if (updatedData.isNew) {
                // CREATE new user - simple table insert
                if (!updatedData.password || updatedData.password.length < 6) {
                    alert('La contraseña debe tener al menos 6 caracteres');
                    return;
                }

                // Generate a simple UUID for the user
                const userId = crypto.randomUUID();

                // Use consistent MD5 hash function shared across the app
                const passwordHash = md5(updatedData.password);

                // Insert directly into usuarios table
                const { error } = await supabase
                    .from('usuarios')
                    .insert([{
                        id: userId,
                        nombre: updatedData.nombre,
                        email: updatedData.email,
                        rol_id: parseInt(updatedData.rol_id),
                        password_hash: passwordHash,
                        activo: true,
                        created_at: new Date().toISOString()
                    }]);

                if (error) throw error;

                alert('Usuario creado correctamente en la base de datos');

            } else {
                // UPDATE existing user
                const updateData = {
                    nombre: updatedData.nombre,
                    rol_id: parseInt(updatedData.rol_id),
                };

                // Update password if provided
                if (updatedData.password && updatedData.password.length >= 6) {
                    updateData.password_hash = md5(updatedData.password);
                }

                const { error } = await supabase
                    .from('usuarios')
                    .update(updateData)
                    .eq('id', updatedData.id);

                if (error) throw error;
            }

            // Reload data
            loadData();
            setShowUserEditModal(false);
            setEditingUser(null);
            alert(updatedData.isNew ? 'Usuario creado correctamente' : 'Usuario actualizado correctamente');
        } catch (error) {
            console.error('Error saving user:', error);
            alert('Error al guardar usuario: ' + error.message);
        }
    };

    const handleEditModule = (modulo) => {
        setEditingModule(modulo);
        setShowModuleEditModal(true);
    };

    const handleSaveModule = async (updatedData) => {
        try {
            if (updatedData.id) {
                // UPDATE existing module
                const { error } = await supabase
                    .from('modulos')
                    .update({
                        titulo: updatedData.titulo,
                        descripcion: updatedData.descripcion,
                        color: updatedData.color,
                        icon: updatedData.icon
                    })
                    .eq('id', updatedData.id);
                if (error) throw error;
            } else {
                // CREATE new module
                const { error } = await supabase
                    .from('modulos')
                    .insert([{
                        titulo: updatedData.titulo,
                        descripcion: updatedData.descripcion,
                        color: updatedData.color,
                        icon: updatedData.icon,
                        slug: updatedData.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                        numero: modulos.length + 1 // Simple auto-increment approximation
                    }]);
                if (error) throw error;
            }

            loadData();
            setShowModuleEditModal(false);
            setEditingModule(null);
            alert(updatedData.id ? 'Módulo actualizado correctamente' : 'Módulo creado correctamente');
        } catch (error) {
            console.error('Error saving module:', error);
            alert('Error al guardar módulo: ' + error.message);
        }
    };

    const handleDeleteModule = (moduleId) => {
        requestSecureAction('DELETE_MODULE', moduleId, null); // Add module object check if needed
    };

    const handleToggleModuleStatus = (modulo) => {
        const newStatus = !modulo.activo;
        const action = newStatus ? 'activar' : 'inactivar';

        requestSecureAction('TOGGLE_MODULE', { id: modulo.id, newStatus, titulo: modulo.titulo }, null);
        setConfirmMessage(`¿Estás seguro de ${action} el módulo "${modulo.titulo}"?`);
    };

    const handleTogglePreguntaStatus = (pregunta) => {
        const newStatus = !pregunta.activo;
        const action = newStatus ? 'activar' : 'inactivar';

        requestSecureAction('TOGGLE_PREGUNTA', { id: pregunta.id, newStatus }, null);
        setConfirmMessage(`¿Estás seguro de ${action} esta pregunta?`);
    };

    const handleDeleteRol = (rolId) => {
        requestSecureAction('DELETE_ROL', rolId, null);
    };

    const handleToggleRolStatus = (rol) => {
        const newStatus = !rol.activo;
        const action = newStatus ? 'activar' : 'inactivar';

        requestSecureAction('TOGGLE_ROL', { id: rol.id, newStatus }, null);
        setConfirmMessage(`¿Estás seguro de ${action} el rol "${rol.nombre}"?`);
    };

    const handleCreateModule = () => {
        setEditingModule({
            titulo: '',
            descripcion: '',
            color: '#3b82f6',
            icon: '📘'
        });
        setShowModuleEditModal(true);
    };

    const handleCreateQuestion = () => {
        setEditingQuestion({
            pregunta: '',
            subtema: '',
            nivel: 'basico',
            opcion_a: '',
            opcion_b: '',
            opcion_c: '',
            opcion_d: '',
            respuesta_correcta: 'a',
            explicacion: '',
            modulo_id: modulos[0]?.id || '' // Default to first module using FK
        });
        setShowQuestionEditModal(true);
    };

    const handleCreateRol = () => {
        setEditingRol({
            nombre: '',
            descripcion: '',
            permisos: {
                ver_estadisticas: false,
                gestionar_usuarios: false,
                gestionar_contenido: false,
                realizar_examenes: true
            }
        });
        setShowRolEditModal(true);
    };

    const handleEditRol = (rol) => {
        setEditingRol(rol);
        setShowRolEditModal(true);
    };

    const handleSaveRol = async (updatedData) => {
        try {
            if (updatedData.id) {
                // UPDATE existing
                const { error } = await supabase
                    .from('roles')
                    .update({
                        nombre: updatedData.nombre,
                        descripcion: updatedData.descripcion,
                        permisos: updatedData.permisos
                    })
                    .eq('id', updatedData.id);

                if (error) throw error;
            } else {
                // CREATE new - let database auto-generate ID
                const { error } = await supabase
                    .from('roles')
                    .insert([{
                        nombre: updatedData.nombre,
                        descripcion: updatedData.descripcion,
                        permisos: updatedData.permisos
                    }]);

                if (error) throw error;
            }

            alert(updatedData.id ? 'Rol actualizado correctamente' : 'Rol creado correctamente');
            setShowRolEditModal(false);
            setEditingRol(null);
            loadData();
        } catch (error) {
            console.error('Error saving role:', error);
            alert('Error al guardar rol: ' + error.message);
        }
    };

    const handleCreateUser = () => {
        setEditingUser({
            nombre: '',
            email: '',
            password: '', // Needed for creation
            rol_id: 2, // Default to student
            isNew: true // Flag to distinguish creation
        });
        setShowUserEditModal(true);
    };

    const handleEditQuestion = (question) => {
        setEditingQuestion(question);
        setShowQuestionEditModal(true);
    };

    const handleSaveQuestion = async (updatedData) => {
        try {
            // Ensure modulo_id is a number
            const moduloId = parseInt(updatedData.modulo_id || updatedData.modulo);

            if (updatedData.id) {
                // UPDATE existing
                const { error } = await supabase
                    .from('preguntas')
                    .update({
                        pregunta: updatedData.pregunta,
                        subtema: updatedData.subtema,
                        nivel: updatedData.nivel,
                        opcion_a: updatedData.opcion_a,
                        opcion_b: updatedData.opcion_b,
                        opcion_c: updatedData.opcion_c,
                        opcion_d: updatedData.opcion_d,
                        respuesta_correcta: updatedData.respuesta_correcta,
                        explicacion: updatedData.explicacion,
                        modulo_id: moduloId
                    })
                    .eq('id', updatedData.id);
                if (error) throw error;
            } else {
                // CREATE new question with modulo_id FK
                const { error } = await supabase
                    .from('preguntas')
                    .insert([{
                        pregunta: updatedData.pregunta,
                        subtema: updatedData.subtema,
                        nivel: updatedData.nivel,
                        opcion_a: updatedData.opcion_a,
                        opcion_b: updatedData.opcion_b,
                        opcion_c: updatedData.opcion_c,
                        opcion_d: updatedData.opcion_d,
                        respuesta_correcta: updatedData.respuesta_correcta,
                        explicacion: updatedData.explicacion,
                        modulo_id: moduloId
                    }]);
                if (error) throw error;
            }

            loadData();
            setShowQuestionEditModal(false);
            setEditingQuestion(null);
            alert(updatedData.id ? 'Pregunta actualizada correctamente' : 'Pregunta creada correctamente');
        } catch (error) {
            console.error('Error saving question:', error);
            alert('Error al guardar pregunta: ' + error.message);
        }
    };

    // Configuración state
    const [sessionTimeoutMin, setSessionTimeoutMin] = useState(30);
    const [savingTimeout, setSavingTimeout] = useState(false);

    useEffect(() => {
        if (activeTab === 'configuracion') {
            loadSettings();
        }
    }, [activeTab]);

    const loadSettings = async () => {
        const { data } = await supabase
            .from('admin_settings')
            .select('setting_value')
            .eq('setting_key', 'session_timeout_minutes')
            .single();
        if (data?.setting_value) {
            setSessionTimeoutMin(parseInt(data.setting_value));
        }
    };

    const saveSessionTimeout = async (minutes) => {
        setSavingTimeout(true);
        setSessionTimeoutMin(minutes);
        const { error } = await supabase
            .from('admin_settings')
            .upsert({ setting_key: 'session_timeout_minutes', setting_value: minutes.toString(), updated_at: new Date().toISOString() }, { onConflict: 'setting_key' });
        if (error) {
            alert('Error al guardar: ' + error.message);
        }
        setSavingTimeout(false);
    };

    const tabs = [
        { id: 'solicitudes', label: 'Solicitudes', icon: 'fa-solid fa-clipboard-list', badge: solicitudes.filter(s => s.estado === 'pendiente').length },
        { id: 'usuarios', label: 'Usuarios', icon: 'fa-solid fa-users' },
        { id: 'roles', label: 'Roles', icon: 'fa-solid fa-key' },
        { id: 'configuracion', label: 'Configuración', icon: 'fa-solid fa-gear' }
    ];

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

            <header style={{ marginBottom: '30px' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '10px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <i className="fa-solid fa-gear"></i> Panel de Administración
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Gestiona usuarios, roles y contenido del sistema
                </p>
            </header>

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '15px',
                marginBottom: '30px'
            }}>
                <StatCard icon={<i className="fa-solid fa-users"></i>} label="Usuarios" value={stats.usuarios} color="#a855f7" />
                <StatCard icon={<i className="fa-solid fa-circle-question"></i>} label="Preguntas" value={stats.preguntas} color="#22c55e" />
                <StatCard icon={<i className="fa-solid fa-file-signature"></i>} label="Exámenes" value={stats.examenes} color="#3b82f6" />
            </div>

            {/* Tabs */}
            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '25px',
                overflowX: 'auto',
                paddingBottom: '10px'
            }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '16px 32px',
                            background: activeTab === tab.id ? 'var(--accent-color)' : 'var(--bg-secondary)',
                            border: 'none',
                            borderRadius: '8px',
                            color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s',
                            position: 'relative'
                        }}
                    >
                        <i className={tab.icon} style={{ marginRight: '8px' }}></i>
                        {tab.label}
                        {tab.badge > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-5px',
                                right: '-5px',
                                background: '#ef4444',
                                color: '#fff',
                                borderRadius: '50%',
                                width: '22px',
                                height: '22px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 'bold'
                            }}>
                                {tab.badge}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="slide-card" style={{ minHeight: '400px' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px' }}>
                        <p>⏳ Cargando...</p>
                    </div>
                ) : (
                    <>
                        {activeTab === 'solicitudes' && (
                            <SolicitudesPanel
                                solicitudes={solicitudes}
                                onApprove={async (solicitud) => {
                                    try {
                                        // 1. Obtener rol de estudiante
                                        const { data: rolData } = await supabase
                                            .from('roles')
                                            .select('id')
                                            .eq('nombre', 'estudiante')
                                            .single();

                                        const rolId = rolData?.id || 2; // Default a 2 si no encuentra

                                        // 2. Crear el usuario
                                        // Ensure password_hash is proper MD5 format (32 hex chars)
                                        let passwordHash = solicitud.password_hash;
                                        if (!passwordHash || !/^[a-f0-9]{32}$/i.test(passwordHash)) {
                                            // If not a valid MD5 hash, hash it with MD5
                                            passwordHash = md5(passwordHash || '');
                                        }

                                        const userId = crypto.randomUUID();
                                        const { error: userError } = await supabase
                                            .from('usuarios')
                                            .insert([{
                                                id: userId,
                                                nombre: solicitud.nombre,
                                                email: solicitud.email,
                                                password_hash: passwordHash,
                                                rol_id: rolId,
                                                activo: true,
                                                created_at: new Date().toISOString()
                                            }]);

                                        if (userError) {
                                            console.error('Error creating user:', userError);
                                            alert('Error al crear usuario: ' + userError.message);
                                            return;
                                        }

                                        // 3. Actualizar estado de la solicitud
                                        await supabase
                                            .from('solicitudes_cuenta')
                                            .update({
                                                estado: 'aprobada',
                                                fecha_respuesta: new Date().toISOString()
                                            })
                                            .eq('id', solicitud.id);

                                        alert('✅ Usuario creado y solicitud aprobada');
                                        loadData();
                                    } catch (err) {
                                        console.error('Error approving:', err);
                                        alert('Error al aprobar: ' + err.message);
                                    }
                                }}
                                onReject={async (solicitud, motivo) => {
                                    try {
                                        const { error } = await supabase
                                            .from('solicitudes_cuenta')
                                            .update({
                                                estado: 'rechazada',
                                                notas_admin: motivo || 'Solicitud rechazada',
                                                fecha_respuesta: new Date().toISOString()
                                            })
                                            .eq('id', solicitud.id);

                                        if (error) {
                                            console.error('Error rejecting:', error);
                                            alert('Error al rechazar la solicitud');
                                            return;
                                        }

                                        alert('Solicitud rechazada');
                                        loadData();
                                    } catch (err) {
                                        console.error('Error rejecting:', err);
                                        alert('Error al rechazar la solicitud');
                                    }
                                }}
                            />
                        )}

                        {activeTab === 'usuarios' && (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                    <button
                                        onClick={handleCreateUser}
                                        className="btn-primary"
                                        style={{
                                            background: '#a855f7',
                                            fontSize: '0.9rem',
                                            padding: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            width: '300px' // Wider button ~ 2 columns
                                        }}
                                    >
                                        <i className="fa-solid fa-plus"></i> Nuevo Usuario
                                    </button>
                                </div>
                                <UsersTable
                                    usuarios={usuarios}
                                    roles={roles}
                                    currentUserId={user?.id}
                                    onToggleActive={toggleUserActive}
                                    onUpdateRole={updateUserRole}
                                    onDelete={deleteUser}
                                    onEdit={handleEditClick}
                                    onInactivate={inactivateUser}
                                />
                            </>
                        )}

                        {activeTab === 'roles' && (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                    <button
                                        onClick={handleCreateRol}
                                        className="btn-primary"
                                        style={{
                                            background: '#f59e0b',
                                            fontSize: '0.9rem',
                                            padding: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            width: '300px'
                                        }}
                                    >
                                        <i className="fa-solid fa-plus"></i> Nuevo Rol
                                    </button>
                                </div>
                                <RolesTable
                                    roles={roles}
                                    onEdit={handleEditRol}
                                    onToggleStatus={handleToggleRolStatus}
                                    onDelete={handleDeleteRol}
                                />
                            </>
                        )}

                        {activeTab === 'modulos' && (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                    <button
                                        onClick={handleCreateRol}
                                        className="btn-primary"
                                        style={{
                                            background: '#f59e0b',
                                            fontSize: '0.9rem',
                                            padding: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            width: '300px'
                                        }}
                                    >
                                        <i className="fa-solid fa-plus"></i> Nuevo Rol
                                    </button>
                                </div>
                                <ModulosTable
                                    modulos={modulos}
                                    onEdit={handleEditModule}
                                    onDelete={handleDeleteModule}
                                    onToggleStatus={handleToggleModuleStatus}
                                />
                            </>
                        )}

                        {activeTab === 'contenido' && (
                            <ContenidoPanel
                                modulos={modulos}
                                contenido={contenidoClase}
                                selectedModulo={selectedModuloContent}
                                onSelectModulo={async (mod) => {
                                    setSelectedModuloContent(mod);
                                    if (mod) {
                                        const { data } = await supabase
                                            .from('contenido_clase')
                                            .select('*')
                                            .eq('modulo_id', mod.id)
                                            .order('orden');
                                        setContenidoClase(data || []);
                                    } else {
                                        setContenidoClase([]);
                                    }
                                }}
                                onAddContent={() => {
                                    setEditingContent({ isNew: true, modulo_id: selectedModuloContent?.id, tipo: 'guia', orden: contenidoClase.length + 1 });
                                    setShowContentEditModal(true);
                                }}
                                onEditContent={(item) => {
                                    setEditingContent(item);
                                    setShowContentEditModal(true);
                                }}
                                onDeleteContent={async (item) => {
                                    if (!confirm('¿Eliminar esta tarjeta de contenido?')) return;
                                    await supabase.from('contenido_clase').delete().eq('id', item.id);
                                    setContenidoClase(prev => prev.filter(c => c.id !== item.id));
                                }}
                                onUpdateModuloMedia={async (modulo, field, value) => {
                                    await supabase.from('modulos').update({ [field]: value }).eq('id', modulo.id);
                                    setModulos(prev => prev.map(m => m.id === modulo.id ? { ...m, [field]: value } : m));
                                    if (selectedModuloContent?.id === modulo.id) {
                                        setSelectedModuloContent(prev => ({ ...prev, [field]: value }));
                                    }
                                }}
                            />
                        )}

                        {activeTab === 'preguntas' && (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                    <button
                                        onClick={handleCreateQuestion}
                                        className="btn-primary"
                                        style={{
                                            background: '#22c55e',
                                            fontSize: '0.9rem',
                                            padding: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            width: '300px'
                                        }}
                                    >
                                        <i className="fa-solid fa-plus"></i> Nueva Pregunta
                                    </button>
                                </div>
                                <PreguntasTable
                                    preguntas={preguntas}
                                    onEdit={handleEditQuestion}
                                    onToggleStatus={handleTogglePreguntaStatus}
                                />
                            </>
                        )}

                        {activeTab === 'configuracion' && (
                            <div style={{ maxWidth: '600px' }}>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '25px', color: 'var(--text-primary)' }}>
                                    <i className="fa-solid fa-gear" style={{ marginRight: '10px', color: 'var(--accent-color)' }}></i>
                                    Configuración Global
                                </h2>

                                {/* Session Timeout */}
                                <div style={{
                                    padding: '25px',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: '16px',
                                    border: '1px solid var(--card-border)',
                                    marginBottom: '20px'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                                        <div style={{
                                            width: '50px', height: '50px', borderRadius: '12px',
                                            background: 'rgba(168, 85, 247, 0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: 'var(--accent-color)', fontSize: '1.4rem'
                                        }}>
                                            <i className="fa-solid fa-stopwatch"></i>
                                        </div>
                                        <div>
                                            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                                                Tiempo de Inactividad
                                            </h3>
                                            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                                Cerrar sesión automáticamente para TODOS los usuarios después de:
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                        {[
                                            { value: 5, label: '5 min' },
                                            { value: 15, label: '15 min' },
                                            { value: 30, label: '30 min' },
                                            { value: 60, label: '1 hora' },
                                            { value: 120, label: '2 horas' }
                                        ].map(opt => (
                                            <button
                                                key={opt.value}
                                                onClick={() => saveSessionTimeout(opt.value)}
                                                disabled={savingTimeout}
                                                style={{
                                                    padding: '10px 20px',
                                                    borderRadius: '10px',
                                                    border: sessionTimeoutMin === opt.value ? '2px solid var(--accent-color)' : '1px solid var(--card-border)',
                                                    background: sessionTimeoutMin === opt.value ? 'rgba(168, 85, 247, 0.15)' : 'var(--bg-primary)',
                                                    color: sessionTimeoutMin === opt.value ? 'var(--accent-color)' : 'var(--text-secondary)',
                                                    cursor: savingTimeout ? 'wait' : 'pointer',
                                                    fontWeight: sessionTimeoutMin === opt.value ? '700' : '500',
                                                    fontSize: '0.95rem',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {sessionTimeoutMin === opt.value && <i className="fa-solid fa-check" style={{ marginRight: '6px' }}></i>}
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>

                                    <p style={{ margin: '16px 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                        <i className="fa-solid fa-info-circle" style={{ marginRight: '6px' }}></i>
                                        Este ajuste aplica a todos los usuarios. Los cambios toman efecto en la próxima sesión.
                                    </p>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* User Edit Modal */}
            {showUserEditModal && editingUser && (
                <UserEditModal
                    user={editingUser}
                    roles={roles}
                    onClose={() => setShowUserEditModal(false)}
                    onSave={handleSaveUser}
                />
            )}

            {/* Module Edit Modal */}
            {showModuleEditModal && editingModule && (
                <ModuleEditModal
                    modulo={editingModule}
                    onClose={() => setShowModuleEditModal(false)}
                    onSave={handleSaveModule}
                />
            )}

            {/* Secure Action Confirmation Modal */}
            {showConfirmPassword && (
                <ConfirmPasswordModal
                    message={confirmMessage}
                    onConfirm={executeSecureAction}
                    onCancel={() => { setShowConfirmPassword(false); setPendingAction(null); }}
                />
            )}

            {/* Question Edit Modal */}
            {showQuestionEditModal && editingQuestion && (
                <QuestionEditModal
                    question={editingQuestion}
                    modulos={modulos}
                    onClose={() => setShowQuestionEditModal(false)}
                    onSave={handleSaveQuestion}
                />
            )}

            {showRolEditModal && editingRol && (
                <RolEditModal
                    rol={editingRol}
                    onClose={() => setShowRolEditModal(false)}
                    onSave={handleSaveRol}
                />
            )}

            {/* Content Edit Modal */}
            {showContentEditModal && editingContent && (
                <ContentEditModal
                    content={editingContent}
                    onClose={() => { setShowContentEditModal(false); setEditingContent(null); }}
                    onSave={async (data) => {
                        try {
                            if (data.isNew) {
                                const { error } = await supabase
                                    .from('contenido_clase')
                                    .insert([{
                                        modulo_id: data.modulo_id,
                                        tipo: data.tipo,
                                        orden: data.orden,
                                        titulo: data.titulo,
                                        contenido: data.contenido
                                    }]);
                                if (error) throw error;
                            } else {
                                const { error } = await supabase
                                    .from('contenido_clase')
                                    .update({
                                        tipo: data.tipo,
                                        orden: data.orden,
                                        titulo: data.titulo,
                                        contenido: data.contenido
                                    })
                                    .eq('id', data.id);
                                if (error) throw error;
                            }
                            // Reload content
                            if (selectedModuloContent) {
                                const { data: newData } = await supabase
                                    .from('contenido_clase')
                                    .select('*')
                                    .eq('modulo_id', selectedModuloContent.id)
                                    .order('orden');
                                setContenidoClase(newData || []);
                            }
                            setShowContentEditModal(false);
                            setEditingContent(null);
                        } catch (err) {
                            console.error('Error saving content:', err);
                            alert('Error al guardar: ' + err.message);
                        }
                    }}
                />
            )}
        </div>
    );
};

// Stat Card Component
const StatCard = ({ icon, label, value, color }) => (
    <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: '12px',
        padding: '20px',
        borderLeft: `4px solid ${color}`
    }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{icon}</div>
        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{value || 0}</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{label}</div>
    </div>
);

// SolicitudesPanel Component
const SolicitudesPanel = ({ solicitudes, onApprove, onReject }) => {
    const [rejectingId, setRejectingId] = React.useState(null);
    const [rejectMotivo, setRejectMotivo] = React.useState('');

    const pendientes = solicitudes.filter(s => s.estado === 'pendiente');
    const procesadas = solicitudes.filter(s => s.estado !== 'pendiente');

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div>
            {/* Pendientes */}
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-clipboard-list"></i> Solicitudes Pendientes
                {pendientes.length > 0 && (
                    <span style={{
                        background: '#ef4444',
                        color: '#fff',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem'
                    }}>
                        {pendientes.length}
                    </span>
                )}
            </h3>

            {pendientes.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    background: 'var(--bg-primary)',
                    borderRadius: '12px',
                    marginBottom: '30px'
                }}>
                    <div style={{ fontSize: '3rem', color: '#22c55e' }}><i className="fa-solid fa-check-circle"></i></div>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>
                        No hay solicitudes pendientes
                    </p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
                    {pendientes.map(sol => (
                        <div
                            key={sol.id}
                            style={{
                                background: 'var(--bg-primary)',
                                borderRadius: '12px',
                                padding: '20px',
                                border: '2px solid #f59e0b'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                                <div>
                                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '5px', fontSize: '1.1rem' }}>
                                        {sol.avatar || <i className="fa-solid fa-user"></i>} {sol.nombre}
                                    </h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        <i className="fa-solid fa-envelope"></i> {sol.email}
                                    </p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '5px' }}>
                                        <i className="fa-solid fa-calendar"></i> Solicitado: {formatDate(sol.created_at)}
                                    </p>
                                </div>
                                <span style={{
                                    background: 'rgba(245, 158, 11, 0.2)',
                                    color: '#f59e0b',
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: '500'
                                }}>
                                    <i className="fa-solid fa-hourglass-half"></i> Pendiente
                                </span>
                            </div>

                            <div style={{
                                background: 'var(--bg-secondary)',
                                padding: '15px',
                                borderRadius: '8px',
                                marginBottom: '15px'
                            }}>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '5px' }}>
                                    <strong>Motivo de solicitud:</strong>
                                </p>
                                <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                                    "{sol.motivo}"
                                </p>
                            </div>

                            {rejectingId === sol.id ? (
                                <div style={{ marginBottom: '15px' }}>
                                    <textarea
                                        placeholder="Motivo del rechazo (opcional)..."
                                        value={rejectMotivo}
                                        onChange={(e) => setRejectMotivo(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            background: 'var(--bg-secondary)',
                                            border: '1px solid var(--card-border)',
                                            borderRadius: '8px',
                                            color: 'var(--text-primary)',
                                            resize: 'vertical',
                                            minHeight: '60px',
                                            marginBottom: '10px'
                                        }}
                                    />
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button
                                            onClick={() => {
                                                onReject(sol, rejectMotivo);
                                                setRejectingId(null);
                                                setRejectMotivo('');
                                            }}
                                            style={{
                                                flex: 1,
                                                padding: '10px',
                                                background: '#ef4444',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontWeight: '500'
                                            }}
                                        >
                                            Confirmar Rechazo
                                        </button>
                                        <button
                                            onClick={() => {
                                                setRejectingId(null);
                                                setRejectMotivo('');
                                            }}
                                            style={{
                                                padding: '10px 20px',
                                                background: 'var(--bg-secondary)',
                                                color: 'var(--text-secondary)',
                                                border: '1px solid var(--card-border)',
                                                borderRadius: '8px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button
                                        onClick={() => onApprove(sol)}
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            background: '#22c55e',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        <i className="fa-solid fa-check"></i> Aprobar
                                    </button>
                                    <button
                                        onClick={() => setRejectingId(sol.id)}
                                        style={{
                                            flex: 1,
                                            padding: '12px',
                                            background: '#ef4444',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        <i className="fa-solid fa-xmark"></i> Rechazar
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Historial */}
            {procesadas.length > 0 && (
                <>
                    <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px', marginTop: '30px' }}>
                        <i className="fa-solid fa-clock-rotate-left"></i> Historial de Solicitudes
                    </h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--card-border)' }}>
                                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)' }}>Nombre</th>
                                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)' }}>Email</th>
                                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)' }}>Estado</th>
                                    <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)' }}>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {procesadas.map(sol => (
                                    <tr key={sol.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                                        <td style={{ padding: '12px', color: 'var(--text-primary)' }}>{sol.nombre}</td>
                                        <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{sol.email}</td>
                                        <td style={{ padding: '12px' }}>
                                            <span style={{
                                                padding: '4px 10px',
                                                borderRadius: '20px',
                                                fontSize: '0.8rem',
                                                fontWeight: '500',
                                                background: sol.estado === 'aprobada' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                                color: sol.estado === 'aprobada' ? '#22c55e' : '#ef4444'
                                            }}>
                                                {sol.estado === 'aprobada' ? <span><i className="fa-solid fa-check"></i> Aprobada</span> : <span><i className="fa-solid fa-xmark"></i> Rechazada</span>}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                            {formatDate(sol.processed_at)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

// ContenidoPanel Component - Gestión de contenido de clases por módulo
const ContenidoPanel = ({ modulos, contenido, selectedModulo, onSelectModulo, onAddContent, onEditContent, onDeleteContent, onUpdateModuloMedia }) => {
    const [editingAudio, setEditingAudio] = useState(false);
    const [editingInfografia, setEditingInfografia] = useState(false);
    const [audioUrl, setAudioUrl] = useState('');
    const [infografiaUrl, setInfografiaUrl] = useState('');

    return (
        <div>
            {/* Selector de Módulo */}
            <div style={{ marginBottom: '20px' }}>
                <label style={{ color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>
                    Selecciona un módulo:
                </label>
                <select
                    value={selectedModulo?.id || ''}
                    onChange={(e) => {
                        const mod = modulos.find(m => m.id === parseInt(e.target.value));
                        onSelectModulo(mod || null);
                        if (mod) {
                            setAudioUrl(mod.audio_url || '');
                            setInfografiaUrl(mod.infografia_url || '');
                        }
                    }}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid var(--card-border)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        fontSize: '1rem'
                    }}
                >
                    <option value="">-- Seleccionar módulo --</option>
                    {modulos.map(m => (
                        <option key={m.id} value={m.id}>{m.icon} {m.titulo}</option>
                    ))}
                </select>
            </div>

            {selectedModulo && (
                <>
                    {/* Info del módulo seleccionado */}
                    <div className="slide-card" style={{ marginBottom: '20px', padding: '20px' }}>
                        <h3 style={{ color: selectedModulo.color, marginBottom: '15px' }}>
                            {selectedModulo.icon} {selectedModulo.titulo}
                        </h3>

                        {/* Audio URL */}
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '5px' }}>
                                <i className="fa-solid fa-music"></i> URL del Audio:
                            </label>
                            {editingAudio ? (
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="text"
                                        value={audioUrl}
                                        onChange={(e) => setAudioUrl(e.target.value)}
                                        placeholder="/assets/audio/archivo.m4a"
                                        style={{
                                            flex: 1,
                                            padding: '10px',
                                            borderRadius: '8px',
                                            border: '1px solid var(--card-border)',
                                            background: 'var(--input-bg)',
                                            color: 'var(--text-primary)'
                                        }}
                                    />
                                    <button
                                        onClick={() => {
                                            onUpdateModuloMedia(selectedModulo, 'audio_url', audioUrl);
                                            setEditingAudio(false);
                                        }}
                                        style={{ padding: '10px 15px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                                    ><i className="fa-solid fa-check"></i></button>
                                    <button
                                        onClick={() => { setEditingAudio(false); setAudioUrl(selectedModulo.audio_url || ''); }}
                                        style={{ padding: '10px 15px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                                    ><i className="fa-solid fa-xmark"></i></button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ color: 'var(--text-primary)', flex: 1, wordBreak: 'break-all' }}>
                                        {selectedModulo.audio_url || '(No configurado)'}
                                    </span>
                                    <button
                                        onClick={() => { setAudioUrl(selectedModulo.audio_url || ''); setEditingAudio(true); }}
                                        style={{ padding: '8px 12px', background: 'var(--accent-color)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}
                                    ><i className="fa-solid fa-pen-to-square"></i> Editar</button>
                                </div>
                            )}
                        </div>

                        {/* Infografía URL */}
                        <div>
                            <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '5px' }}>
                                <i className="fa-solid fa-file-image"></i> URL de la Infografía:
                            </label>
                            {editingInfografia ? (
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="text"
                                        value={infografiaUrl}
                                        onChange={(e) => setInfografiaUrl(e.target.value)}
                                        placeholder="/assets/infografias/imagen.png"
                                        style={{
                                            flex: 1,
                                            padding: '10px',
                                            borderRadius: '8px',
                                            border: '1px solid var(--card-border)',
                                            background: 'var(--input-bg)',
                                            color: 'var(--text-primary)'
                                        }}
                                    />
                                    <button
                                        onClick={() => {
                                            onUpdateModuloMedia(selectedModulo, 'infografia_url', infografiaUrl);
                                            setEditingInfografia(false);
                                        }}
                                        style={{ padding: '10px 15px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                                    ><i className="fa-solid fa-check"></i></button>
                                    <button
                                        onClick={() => { setEditingInfografia(false); setInfografiaUrl(selectedModulo.infografia_url || ''); }}
                                        style={{ padding: '10px 15px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                                    ><i className="fa-solid fa-xmark"></i></button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ color: 'var(--text-primary)', flex: 1, wordBreak: 'break-all' }}>
                                        {selectedModulo.infografia_url || '(No configurado)'}
                                    </span>
                                    <button
                                        onClick={() => { setInfografiaUrl(selectedModulo.infografia_url || ''); setEditingInfografia(true); }}
                                        style={{ padding: '8px 12px', background: 'var(--accent-color)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}
                                    ><i className="fa-solid fa-pen-to-square"></i> Editar</button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tarjetas de contenido */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>
                            📄 Tarjetas de Contenido ({contenido.length})
                        </h3>
                        <button
                            onClick={onAddContent}
                            style={{
                                padding: '10px 20px',
                                background: '#22c55e',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}
                        >
                            <i className="fa-solid fa-plus"></i> Nueva Tarjeta
                        </button>
                    </div>

                    {contenido.length === 0 ? (
                        <div className="slide-card" style={{ textAlign: 'center', padding: '40px' }}>
                            <p style={{ color: 'var(--text-secondary)' }}>No hay tarjetas de contenido para este módulo.</p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Agrega tarjetas para que aparezcan en el modo clase.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {contenido.map((item, idx) => (
                                <div key={item.id} className="slide-card" style={{ padding: '15px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                                <span style={{
                                                    background: 'var(--accent-color)',
                                                    color: '#fff',
                                                    padding: '2px 8px',
                                                    borderRadius: '12px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '600'
                                                }}>#{item.orden}</span>
                                                <span style={{
                                                    background: item.tipo === 'guia' ? 'rgba(59, 130, 246, 0.2)' :
                                                        item.tipo === 'informe' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(168, 85, 247, 0.2)',
                                                    color: item.tipo === 'guia' ? '#3b82f6' :
                                                        item.tipo === 'informe' ? '#22c55e' : '#a855f7',
                                                    padding: '2px 8px',
                                                    borderRadius: '12px',
                                                    fontSize: '0.75rem'
                                                }}>{item.tipo}</span>
                                            </div>
                                            <h4 style={{ color: 'var(--text-primary)', margin: '0 0 8px 0' }}>{item.titulo}</h4>
                                            <p style={{
                                                color: 'var(--text-secondary)',
                                                fontSize: '0.85rem',
                                                margin: 0,
                                                maxHeight: '60px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {item.contenido?.substring(0, 150)}...
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', marginLeft: '15px' }}>
                                            <button
                                                onClick={() => onEditContent(item)}
                                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: 'var(--accent-color)' }}
                                                title="Editar"
                                            ><i className="fa-solid fa-pen-to-square"></i></button>
                                            <button
                                                onClick={() => onDeleteContent(item)}
                                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#ef4444' }}
                                                title="Eliminar"
                                            ><i className="fa-solid fa-trash-can"></i></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {!selectedModulo && (
                <div className="slide-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '15px' }}><i className="fa-solid fa-book-open"></i></div>
                    <h3 style={{ color: 'var(--text-primary)', marginBottom: '10px' }}>Gestión de Contenido</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Selecciona un módulo para administrar su contenido de clases.
                    </p>
                </div>
            )}
        </div>
    );
};

// ContentEditModal Component - Modal para editar tarjetas de contenido
const ContentEditModal = ({ content, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        id: content.id,
        isNew: content.isNew || false,
        modulo_id: content.modulo_id,
        tipo: content.tipo || 'guia',
        orden: content.orden || 1,
        titulo: content.titulo || '',
        contenido: content.contenido || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.titulo.trim()) {
            alert('El título es requerido');
            return;
        }
        if (!formData.contenido.trim()) {
            alert('El contenido es requerido');
            return;
        }
        onSave(formData);
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.9)', zIndex: 1500,
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            paddingTop: '50px',
            overflowY: 'auto'
        }}>
            <div className="slide-card fade-in" style={{ width: '100%', maxWidth: '600px', margin: '0 20px 50px 20px' }}>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
                    {formData.isNew ? <span><i className="fa-solid fa-plus"></i> Nueva Tarjeta</span> : <span><i className="fa-solid fa-pen-to-square"></i> Editar Tarjeta</span>}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gap: '15px' }}>
                        {/* Tipo y Orden */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '5px' }}>
                                    Tipo
                                </label>
                                <select
                                    value={formData.tipo}
                                    onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value }))}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--card-border)',
                                        background: 'var(--input-bg)',
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    <option value="guia">Guía</option>
                                    <option value="informe">Informe</option>
                                    <option value="otro">Otro</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '5px' }}>
                                    Orden
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={formData.orden}
                                    onChange={(e) => setFormData(prev => ({ ...prev, orden: parseInt(e.target.value) || 1 }))}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        border: '1px solid var(--card-border)',
                                        background: 'var(--input-bg)',
                                        color: 'var(--text-primary)'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Título */}
                        <div>
                            <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '5px' }}>
                                Título *
                            </label>
                            <input
                                type="text"
                                value={formData.titulo}
                                onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
                                placeholder="Título de la tarjeta"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--card-border)',
                                    background: 'var(--input-bg)',
                                    color: 'var(--text-primary)'
                                }}
                            />
                        </div>

                        {/* Contenido */}
                        <div>
                            <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'block', marginBottom: '5px' }}>
                                Contenido * (Markdown soportado)
                            </label>
                            <textarea
                                value={formData.contenido}
                                onChange={(e) => setFormData(prev => ({ ...prev, contenido: e.target.value }))}
                                placeholder="Escribe el contenido de la tarjeta...&#10;&#10;Puedes usar **negrita**, *cursiva*, listas, etc."
                                rows={12}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--card-border)',
                                    background: 'var(--input-bg)',
                                    color: 'var(--text-primary)',
                                    resize: 'vertical',
                                    fontFamily: 'monospace',
                                    fontSize: '0.9rem'
                                }}
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: '14px',
                                background: 'transparent',
                                color: '#ef4444',
                                border: '2px solid #ef4444',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '1rem'
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            style={{ flex: 1, marginTop: 0 }}
                        >
                            {formData.isNew ? 'Crear Tarjeta' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// UsersTable Component
const UsersTable = ({ usuarios, roles, currentUserId, onToggleActive, onUpdateRole, onDelete, onEdit }) => (
    <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ borderBottom: '2px solid var(--card-border)' }}>
                    <th style={thStyle}>Nombre</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Rol</th>
                    <th style={thStyle}>Estado</th>
                    <th style={thStyle}>Último Acceso</th>
                    <th style={thStyle}>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map(u => (
                    <tr key={u.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                        <td style={tdStyle}>
                            <span style={{ marginRight: '8px' }}>
                                {u.id === currentUserId ? (
                                    <i className="fa-solid fa-user-astronaut" style={{ color: 'var(--accent-color)', fontSize: '1.2rem' }}></i>
                                ) : (
                                    u.avatar
                                )}
                            </span>
                            {u.nombre}
                            {u.id === currentUserId && (
                                <span style={{
                                    marginLeft: '8px',
                                    fontSize: '0.7rem',
                                    background: 'var(--accent-color)',
                                    color: '#fff',
                                    padding: '2px 6px',
                                    borderRadius: '4px'
                                }}>TÚ</span>
                            )}
                        </td>
                        <td style={tdStyle}>{u.email}</td>
                        <td style={tdStyle}>
                            <span style={{
                                padding: '4px 8px',
                                background: u.roles?.nombre === 'admin' ? 'rgba(239, 68, 68, 0.15)' :
                                    u.roles?.nombre === 'profesor' ? 'rgba(59, 130, 246, 0.15)' :
                                        'rgba(34, 197, 94, 0.15)',
                                color: u.roles?.nombre === 'admin' ? '#ef4444' :
                                    u.roles?.nombre === 'profesor' ? '#3b82f6' :
                                        '#22c55e',
                                borderRadius: '4px',
                                fontSize: '0.85rem'
                            }}>
                                {u.roles?.nombre || 'Sin rol'}
                            </span>
                        </td>
                        <td style={tdStyle}>
                            <span style={{
                                padding: '4px 8px',
                                borderRadius: '12px',
                                background: u.activo ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                color: u.activo ? '#22c55e' : '#ef4444',
                                fontSize: '0.85rem',
                                fontWeight: '600'
                            }}>
                                {u.activo ? 'Activo' : 'Inactivo'}
                            </span>
                        </td>
                        <td style={tdStyle}>

                        </td>
                        <td style={tdStyle}>
                            {u.ultimo_acceso
                                ? new Date(u.ultimo_acceso).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' })
                                : 'Nunca'}
                        </td>
                        <td style={tdStyle}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => onEdit(u)}
                                    style={{
                                        background: 'transparent',
                                        color: 'var(--text-secondary)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem'
                                    }}
                                    title="Editar usuario"
                                >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button
                                    onClick={() => onDelete(u)}
                                    disabled={u.id === currentUserId}
                                    style={{
                                        background: 'transparent',
                                        color: u.id === currentUserId ? 'var(--text-secondary)' : '#ef4444',
                                        border: 'none',
                                        cursor: u.id === currentUserId ? 'not-allowed' : 'pointer',
                                        fontSize: '1.2rem'
                                    }}
                                    title={u.id === currentUserId ? 'No puedes eliminarte' : 'Eliminar usuario'}
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                                <button
                                    onClick={() => onToggleActive(u.id, u.activo)}
                                    disabled={u.id === currentUserId}
                                    style={{
                                        background: 'transparent',
                                        color: u.activo ? '#f59e0b' : '#22c55e',
                                        border: 'none',
                                        cursor: u.id === currentUserId ? 'not-allowed' : 'pointer',
                                        fontSize: '1.2rem',
                                        opacity: u.id === currentUserId ? 0.5 : 1
                                    }}
                                    title={u.id === currentUserId ? 'No puedes modificar tu propio usuario' : (u.activo ? 'Desactivar usuario' : 'Activar usuario')}
                                >
                                    {u.activo ? <i className="fa-solid fa-ban"></i> : <i className="fa-solid fa-check-circle"></i>}
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {usuarios.length === 0 && (
            <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                No hay usuarios registrados
            </p>
        )}
    </div>
);

// Roles Table Component
const RolesTable = ({ roles, onEdit, onToggleStatus, onDelete }) => (
    <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ borderBottom: '2px solid var(--card-border)' }}>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Nombre</th>
                    <th style={thStyle}>Descripción</th>
                    <th style={thStyle}>Permisos</th>
                    <th style={thStyle}>Estado</th>
                    <th style={thStyle}>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {roles.map(r => (
                    <tr key={r.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                        <td style={tdStyle}>{r.id}</td>
                        <td style={tdStyle}>
                            <span style={{
                                padding: '4px 10px',
                                background: r.nombre === 'admin' ? 'rgba(239, 68, 68, 0.2)' :
                                    r.nombre === 'profesor' ? 'rgba(59, 130, 246, 0.2)' :
                                        'rgba(34, 197, 94, 0.2)',
                                color: r.nombre === 'admin' ? '#ef4444' :
                                    r.nombre === 'profesor' ? '#3b82f6' : '#22c55e',
                                borderRadius: '4px',
                                fontWeight: 'bold'
                            }}>
                                {r.nombre}
                            </span>
                        </td>
                        <td style={tdStyle}>{r.descripcion}</td>
                        <td style={tdStyle}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                {Object.entries(r.permisos || {}).map(([key, value]) => (
                                    value && (
                                        <span key={key} style={{
                                            fontSize: '0.7rem',
                                            padding: '2px 6px',
                                            background: 'rgba(168, 85, 247, 0.2)',
                                            color: 'var(--accent-color)',
                                            borderRadius: '4px'
                                        }}>
                                            {key.replace(/_/g, ' ')}
                                        </span>
                                    )
                                ))}
                            </div>
                        </td>
                        <td style={tdStyle}>
                            <span style={{
                                padding: '4px 8px',
                                borderRadius: '12px',
                                background: r.activo !== false ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                color: r.activo !== false ? '#22c55e' : '#ef4444',
                                fontSize: '0.85rem',
                                fontWeight: '600'
                            }}>
                                {r.activo !== false ? 'Activo' : 'Inactivo'}
                            </span>
                        </td>
                        <td style={tdStyle}>
                            <button
                                onClick={() => onEdit(r)}
                                style={{
                                    background: 'transparent',
                                    color: 'var(--text-secondary)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem'
                                }}
                                title="Editar rol"
                            >
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button
                                onClick={() => onToggleStatus(r)}
                                style={{
                                    background: 'transparent',
                                    color: r.activo !== false ? '#f59e0b' : '#22c55e',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    marginLeft: '15px'
                                }}
                                title={r.activo !== false ? "Desactivar rol" : "Activar rol"}
                            >
                                {r.activo !== false ? <i className="fa-solid fa-ban"></i> : <i className="fa-solid fa-check-circle"></i>}
                            </button>
                            <button
                                onClick={() => onDelete(r.id)}
                                style={{
                                    background: 'transparent',
                                    color: '#ef4444',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    marginLeft: '15px'
                                }}
                                title="Eliminar rol"
                            >
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// Modules Table Component
const ModulosTable = ({ modulos, onEdit, onDelete, onToggleStatus }) => (
    <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ borderBottom: '2px solid var(--card-border)' }}>
                    <th style={thStyle}>#</th>
                    <th style={thStyle}>Módulo</th>
                    <th style={thStyle}>Descripción</th>
                    <th style={thStyle}>Recursos</th>
                    <th style={thStyle}>Estado</th>
                    <th style={thStyle}>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {modulos && modulos.length > 0 ? (
                    modulos.map(m => (
                        <tr key={m.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                            <td style={tdStyle}>{m.numero}</td>
                            <td style={tdStyle}>
                                <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>{m.icon}</span>
                                <strong style={{ color: m.color }}>{m.titulo}</strong>
                            </td>
                            <td style={tdStyle}>{m.descripcion}</td>
                            <td style={tdStyle}>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    {m.audio_url && (
                                        <span style={{ color: 'var(--accent-color)' }}>🎧 Audio</span>
                                    )}
                                    {m.infografia_url && (
                                        <span style={{ color: 'var(--warning-color)' }}>🖼️ Infografía</span>
                                    )}
                                </div>
                            </td>
                            <td style={tdStyle}>
                                <span style={{
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    background: m.activo !== false ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: m.activo !== false ? '#22c55e' : '#ef4444',
                                    fontSize: '0.85rem',
                                    fontWeight: '600'
                                }}>
                                    {m.activo !== false ? 'Activo' : 'Inactivo'}
                                </span>
                            </td>
                            <td style={tdStyle}>
                                <button
                                    onClick={() => onEdit(m)}
                                    style={{
                                        background: 'transparent',
                                        color: 'var(--text-secondary)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem'
                                    }}
                                    title="Editar módulo"
                                >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button
                                    onClick={() => onDelete(m.id)}
                                    style={{
                                        background: 'transparent',
                                        color: '#ef4444',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem',
                                        marginLeft: '15px'
                                    }}
                                    title="Eliminar módulo"
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                                <button
                                    onClick={() => onToggleStatus(m)}
                                    style={{
                                        background: 'transparent',
                                        color: m.activo !== false ? '#f59e0b' : '#22c55e',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem',
                                        marginLeft: '15px'
                                    }}
                                    title={m.activo !== false ? "Desactivar módulo" : "Activar módulo"}
                                >
                                    {m.activo !== false ? <i className="fa-solid fa-ban"></i> : <i className="fa-solid fa-check-circle"></i>}
                                </button>

                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                            No hay módulos disponibles. Ejecuta el SQL de datos en Supabase.
                        </td>
                    </tr>
                )}
            </tbody>
        </table >
    </div >
);

// Questions Table Component
// Questions Table Component with Filter and Pagination
const PreguntasTable = ({ preguntas, onEdit, onToggleStatus }) => {
    const [filterModule, setFilterModule] = useState('all');
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    // Extract unique modules for filter
    const uniqueModules = Array.from(new Set(preguntas.map(p => p.modulos?.titulo).filter(Boolean)));

    // Filter Logic
    const filteredPreguntas = preguntas.filter(p => {
        if (filterModule === 'all') return true;
        return p.modulos?.titulo === filterModule;
    });

    // Pagination Logic
    const totalItems = filteredPreguntas.length;
    const totalPages = itemsPerPage === Infinity ? 1 : Math.ceil(totalItems / itemsPerPage);

    // Reset to page 1 when filter or itemsPerPage changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filterModule, itemsPerPage]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = itemsPerPage === Infinity ? filteredPreguntas : filteredPreguntas.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div>
            {/* Controls Header */}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                marginBottom: '20px',
                padding: '15px',
                background: 'var(--bg-secondary)',
                borderRadius: '12px',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Filtro Módulo:</label>
                        <select
                            value={filterModule}
                            onChange={(e) => setFilterModule(e.target.value)}
                            style={{
                                padding: '12px 16px',
                                borderRadius: '8px',
                                border: '1px solid var(--input-border)',
                                background: 'var(--input-bg)',
                                color: 'var(--text-primary)',
                                fontSize: '1.1rem',
                                minWidth: '250px'
                            }}
                        >
                            <option value="all">Todos los módulos</option>
                            {uniqueModules.map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Mostrar:</label>
                        <select
                            value={itemsPerPage === Infinity ? 'all' : itemsPerPage}
                            onChange={(e) => setItemsPerPage(e.target.value === 'all' ? Infinity : Number(e.target.value))}
                            style={{
                                padding: '12px 16px',
                                borderRadius: '8px',
                                border: '1px solid var(--input-border)',
                                background: 'var(--input-bg)',
                                color: 'var(--text-primary)',
                                fontSize: '1.1rem'
                            }}
                        >
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value="all">Todas</option>
                        </select>
                    </div>
                </div>

                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <strong>{totalItems}</strong> preguntas encontradas
                </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid var(--card-border)' }}>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Módulo</th>
                            <th style={thStyle}>Pregunta</th>
                            <th style={thStyle}>Subtema</th>
                            <th style={thStyle}>Nivel</th>
                            <th style={thStyle}>Estado</th>
                            <th style={thStyle}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(p => (
                            <tr key={p.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                                <td style={tdStyle}>#{p.id}</td>
                                <td style={tdStyle}>
                                    <span style={{ marginRight: '5px' }}>{p.modulos?.icon}</span>
                                    {p.modulos?.titulo ? (p.modulos.titulo.length > 15 ? p.modulos.titulo.substring(0, 15) + '...' : p.modulos.titulo) : 'N/A'}
                                </td>
                                <td style={{ ...tdStyle, maxWidth: '300px' }}>
                                    {p.pregunta ? (p.pregunta.length > 80 ? p.pregunta.substring(0, 80) + '...' : p.pregunta) : 'Sin pregunta'}
                                </td>
                                <td style={tdStyle}>
                                    <span style={{
                                        fontSize: '0.9rem',
                                        color: 'var(--text-primary)'
                                    }}>
                                        {p.subtema || 'General'}
                                    </span>
                                </td>
                                <td style={tdStyle}>
                                    <span style={{
                                        fontSize: '0.9rem',
                                        color: 'var(--text-primary)'
                                    }}>
                                        {p.nivel || 'N/A'}
                                    </span>
                                </td>
                                <td style={tdStyle}>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        background: p.activo !== false ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: p.activo !== false ? '#22c55e' : '#ef4444',
                                        fontSize: '0.85rem',
                                        fontWeight: '600'
                                    }}>
                                        {p.activo !== false ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>
                                <td style={tdStyle}>
                                    <button
                                        style={{
                                            background: 'transparent',
                                            color: 'var(--text-secondary)',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '1.2rem'
                                        }}
                                        title="Editar pregunta"
                                        onClick={() => onEdit(p)}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        onClick={() => onToggleStatus(p)}
                                        style={{
                                            background: 'transparent',
                                            color: p.activo !== false ? '#f59e0b' : '#22c55e',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '1.2rem',
                                            marginLeft: '15px'
                                        }}
                                        title={p.activo !== false ? "Desactivar pregunta" : "Activar pregunta"}
                                    >
                                        {p.activo !== false ? <i className="fa-solid fa-ban"></i> : <i className="fa-solid fa-check-circle"></i>}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {itemsPerPage !== Infinity && totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* First Page */}
                    <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        style={{
                            padding: '8px 12px', borderRadius: '8px', border: 'none',
                            background: 'var(--card-bg)',
                            color: currentPage === 1 ? 'var(--text-secondary)' : 'var(--text-primary)',
                            cursor: currentPage === 1 ? 'default' : 'pointer',
                            opacity: currentPage === 1 ? 0.5 : 1
                        }}
                        title="Primera página"
                    >
                        ««
                    </button>

                    {/* Previous */}
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{
                            padding: '8px 12px', borderRadius: '8px', border: 'none',
                            background: 'var(--card-bg)',
                            color: currentPage === 1 ? 'var(--text-secondary)' : 'var(--text-primary)',
                            cursor: currentPage === 1 ? 'default' : 'pointer',
                            opacity: currentPage === 1 ? 0.5 : 1
                        }}
                        title="Anterior"
                    >
                        «
                    </button>

                    {/* Page Numbers */}
                    {(() => {
                        const pages = [];
                        const maxVisible = 7; // Max page buttons to show
                        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

                        // Adjust start if we're near the end
                        if (endPage - startPage < maxVisible - 1) {
                            startPage = Math.max(1, endPage - maxVisible + 1);
                        }

                        // First page + ellipsis
                        if (startPage > 1) {
                            pages.push(
                                <button key={1} onClick={() => handlePageChange(1)}
                                    style={{
                                        padding: '8px 12px', borderRadius: '8px', border: 'none',
                                        background: 'var(--card-bg)', color: 'var(--text-primary)', cursor: 'pointer',
                                        minWidth: '40px'
                                    }}>
                                    1
                                </button>
                            );
                            if (startPage > 2) {
                                pages.push(<span key="ellipsis1" style={{ color: 'var(--text-secondary)', padding: '0 5px' }}>...</span>);
                            }
                        }

                        // Page numbers
                        for (let i = startPage; i <= endPage; i++) {
                            pages.push(
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i)}
                                    style={{
                                        padding: '8px 12px', borderRadius: '8px',
                                        border: currentPage === i ? '2px solid var(--accent-color)' : 'none',
                                        background: currentPage === i ? 'rgba(168, 85, 247, 0.2)' : 'var(--card-bg)',
                                        color: currentPage === i ? 'var(--accent-color)' : 'var(--text-primary)',
                                        cursor: 'pointer',
                                        fontWeight: currentPage === i ? 'bold' : 'normal',
                                        minWidth: '40px'
                                    }}
                                >
                                    {i}
                                </button>
                            );
                        }

                        // Last page + ellipsis
                        if (endPage < totalPages) {
                            if (endPage < totalPages - 1) {
                                pages.push(<span key="ellipsis2" style={{ color: 'var(--text-secondary)', padding: '0 5px' }}>...</span>);
                            }
                            pages.push(
                                <button key={totalPages} onClick={() => handlePageChange(totalPages)}
                                    style={{
                                        padding: '8px 12px', borderRadius: '8px', border: 'none',
                                        background: 'var(--card-bg)', color: 'var(--text-primary)', cursor: 'pointer',
                                        minWidth: '40px'
                                    }}>
                                    {totalPages}
                                </button>
                            );
                        }

                        return pages;
                    })()}

                    {/* Next */}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{
                            padding: '8px 12px', borderRadius: '8px', border: 'none',
                            background: 'var(--card-bg)',
                            color: currentPage === totalPages ? 'var(--text-secondary)' : 'var(--text-primary)',
                            cursor: currentPage === totalPages ? 'default' : 'pointer',
                            opacity: currentPage === totalPages ? 0.5 : 1
                        }}
                        title="Siguiente"
                    >
                        »
                    </button>

                    {/* Last Page */}
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        style={{
                            padding: '8px 12px', borderRadius: '8px', border: 'none',
                            background: 'var(--card-bg)',
                            color: currentPage === totalPages ? 'var(--text-secondary)' : 'var(--text-primary)',
                            cursor: currentPage === totalPages ? 'default' : 'pointer',
                            opacity: currentPage === totalPages ? 0.5 : 1
                        }}
                        title="Última página"
                    >
                        »»
                    </button>

                    {/* Page info */}
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginLeft: '10px' }}>
                        ({indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} de {totalItems})
                    </span>
                </div>
            )}

            {preguntas.length === 0 && (
                <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                    No hay preguntas. Ejecuta el SQL de preguntas en Supabase.
                </p>
            )}
        </div>
    );
};

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

// User Edit Modal Component
const UserEditModal = ({ user, roles, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        id: user.id,
        nombre: user.nombre || '',
        email: user.email || '',
        rol_id: user.rol_id || '',
        password: '', // Only for updates or new
        confirmPassword: '', // For validation
        isNew: user.isNew || false // Track new status
    });

    // Local password visibility states
    const [showPasswordNew, setShowPasswordNew] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.isNew) {
            if (formData.password !== formData.confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }
            if (formData.password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                return;
            }
        }
        onSave(formData);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            zIndex: 1300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backdropFilter: 'blur(5px)'
        }}>
            <div className="slide-card fade-in" style={{
                width: '100%',
                maxWidth: '500px',
                margin: 0,
                maxHeight: '90vh',
                overflowY: 'auto'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--text-primary)' }}>
                        ✏️ Editar Usuario
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            fontSize: '2rem',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            lineHeight: 1
                        }}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '1.1rem' }}>
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '15px',
                                borderRadius: '12px',
                                border: '1px solid var(--input-border)',
                                background: 'var(--input-bg)',
                                color: 'var(--text-primary)',
                                fontSize: '1.1rem'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '1.1rem' }}>
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={!formData.isNew}
                            style={{
                                width: '100%',
                                padding: '15px',
                                borderRadius: '12px',
                                border: '1px solid var(--card-border)',
                                background: 'rgba(0,0,0,0.05)',
                                color: 'var(--text-secondary)',
                                fontSize: '1.1rem',
                                cursor: 'not-allowed'
                            }}
                        />
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>
                            El correo no se puede modificar.
                        </p>
                    </div>

                    {formData.isNew ? (
                        <div style={{ marginBottom: '25px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '1.1rem' }}>
                                    Contraseña
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPasswordNew ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required={formData.isNew}
                                        autoComplete="new-password"
                                        name="password"
                                        style={{
                                            width: '100%',
                                            padding: '15px',
                                            paddingRight: '45px',
                                            borderRadius: '12px',
                                            border: '1px solid var(--input-border)',
                                            background: 'var(--input-bg)',
                                            color: 'var(--text-primary)',
                                            fontSize: '1.1rem'
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswordNew(!showPasswordNew)}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '1.1rem',
                                            color: 'var(--text-secondary)'
                                        }}
                                        title={showPasswordNew ? 'Ocultar' : 'Mostrar'}
                                    >
                                        {showPasswordNew ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '1.1rem' }}>
                                    Confirmar Contraseña
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type={showPasswordConfirm ? "text" : "password"}
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        required={formData.isNew}
                                        autoComplete="new-password"
                                        name="confirmPassword"
                                        style={{
                                            width: '100%',
                                            padding: '15px',
                                            paddingRight: '45px',
                                            borderRadius: '12px',
                                            border: '1px solid var(--input-border)',
                                            background: 'var(--input-bg)',
                                            color: 'var(--text-primary)',
                                            fontSize: '1.1rem'
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '1.1rem',
                                            color: 'var(--text-secondary)'
                                        }}
                                        title={showPasswordConfirm ? 'Ocultar' : 'Mostrar'}
                                    >
                                        {showPasswordConfirm ? '👁️' : '👁️‍🗨️'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ marginBottom: '35px' }}>
                            <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '1.1rem' }}>
                                Contraseña (Opcional)
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPasswordNew ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Dejar en blanco para mantener actual"
                                    style={{
                                        width: '100%',
                                        padding: '15px',
                                        paddingRight: '45px',
                                        borderRadius: '12px',
                                        border: '1px solid var(--input-border)',
                                        background: 'var(--input-bg)',
                                        color: 'var(--text-primary)',
                                        fontSize: '1.1rem'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordNew(!showPasswordNew)}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1.1rem',
                                        color: 'var(--text-secondary)'
                                    }}
                                    title={showPasswordNew ? 'Ocultar' : 'Mostrar'}
                                >
                                    {showPasswordNew ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--warning-color)', marginTop: '5px' }}>
                                ⚠️ Cambiar la contraseña requiere actualización en Auth.
                            </p>
                        </div>
                    )}

                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '1.1rem' }}>
                            Rol de Usuario
                        </label>
                        <select
                            value={formData.rol_id}
                            onChange={(e) => setFormData({ ...formData, rol_id: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '15px',
                                borderRadius: '12px',
                                border: '1px solid var(--input-border)',
                                background: 'var(--input-bg)',
                                color: 'var(--text-primary)',
                                fontSize: '1.1rem',
                                appearance: 'none'
                            }}
                        >
                            {roles.map(r => (
                                <option key={r.id} value={r.id}>{r.nombre}</option>
                            ))}
                        </select>
                    </div>



                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: '15px',
                                borderRadius: '12px',
                                border: '2px solid #ef4444',
                                background: 'transparent',
                                color: '#ef4444',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            style={{
                                flex: 1,
                                marginTop: 0,
                                background: 'var(--accent-color)',
                                color: '#fff'
                            }}
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Module Edit Modal Component
const ModuleEditModal = ({ modulo, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...modulo });

    // Escape listener
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const inputStyle = {
        width: '100%', padding: '12px', borderRadius: '8px',
        border: '1px solid var(--input-border)', background: 'var(--input-bg)',
        color: 'var(--text-primary)', fontSize: '1rem'
    };

    const labelStyle = {
        display: 'block', color: 'var(--text-secondary)', marginBottom: '5px', fontWeight: 'bold'
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', zIndex: 1300,
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '50px 20px',
            backdropFilter: 'blur(5px)', overflowY: 'auto'
        }} onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}>
            <div className="slide-card fade-in" style={{
                width: '100%', maxWidth: '600px', margin: 0,
                maxHeight: 'none', position: 'relative'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)' }}>✏️ Editar Módulo</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '2rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Título del Módulo</label>
                        <input
                            type="text"
                            value={formData.titulo}
                            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div>
                            <label style={labelStyle}>Icono (Emoji)</label>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                style={{ ...inputStyle, textAlign: 'center', fontSize: '1.5rem' }}
                                required
                                maxLength="4"
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Color (Hex)</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    type="color"
                                    value={formData.color}
                                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                    style={{ height: '45px', width: '60px', padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
                                />
                                <input
                                    type="text"
                                    value={formData.color}
                                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                    style={inputStyle}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Descripción</label>
                        <textarea
                            value={formData.descripcion}
                            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                            rows="4"
                            style={{ ...inputStyle, resize: 'vertical' }}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button type="button" onClick={onClose} style={{ flex: 1, padding: '16px', textAlign: 'center', fontSize: '1.2rem', color: '#ef4444', borderRadius: '12px', border: '2px solid #ef4444', background: 'transparent', cursor: 'pointer', fontWeight: '600' }}>Cancelar</button>
                        <button type="submit" className="btn-primary" style={{ flex: 1, marginTop: 0 }}>Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Confirm Password Modal
const ConfirmPasswordModal = ({ message, onConfirm, onCancel }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.9)', zIndex: 1500,
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            paddingTop: '100px'
        }}>
            <div className="slide-card fade-in" style={{ width: '100%', maxWidth: '400px', margin: 0 }}>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '15px', textAlign: 'center' }}>🔒 Confirmar Acción</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', textAlign: 'center' }}>
                    {message}
                </p>
                <div style={{ position: 'relative' }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Contraseña de Administrador"
                        autoFocus
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%', padding: '12px', marginBottom: '20px',
                            paddingRight: '45px',
                            borderRadius: '8px', border: '1px solid var(--input-border)',
                            background: 'var(--input-bg)', color: 'var(--text-primary)'
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && onConfirm(password)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '8px',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            color: 'var(--text-secondary)'
                        }}
                        title={showPassword ? 'Ocultar' : 'Mostrar'}
                    >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={onCancel} style={{ flex: 1, padding: '12px', background: 'var(--bg-secondary)', border: 'none', borderRadius: '8px', color: 'var(--text-primary)', cursor: 'pointer' }}>
                        Cancelar
                    </button>
                    <button onClick={() => onConfirm(password)} className="btn-primary" style={{ flex: 1, margin: 0, background: '#ef4444' }}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

// Question Edit Modal Component
const QuestionEditModal = ({ question, modulos, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        id: question.id,
        pregunta: question.pregunta || '',
        subtema: question.subtema || '',
        nivel: question.nivel || 'basico',
        opcion_a: question.opcion_a || '',
        opcion_b: question.opcion_b || '',
        opcion_c: question.opcion_c || '',
        opcion_d: question.opcion_d || '',
        respuesta_correcta: question.respuesta_correcta || 'a',
        explicacion: question.explicacion || '',
        modulo_id: question.modulo_id || question.modulos?.id || '' // Use modulo_id FK
    });

    useEffect(() => {
        // Update modulo_id when question changes
        if (question.modulo_id) {
            setFormData(prev => ({ ...prev, modulo_id: question.modulo_id }));
        }
    }, [question]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    const inputStyle = {
        width: '100%', padding: '12px', borderRadius: '8px',
        border: '1px solid var(--input-border)', background: 'var(--input-bg)',
        color: 'var(--text-primary)', fontSize: '1rem'
    };

    const labelStyle = {
        display: 'block', color: 'var(--text-secondary)', marginBottom: '5px', fontWeight: 'bold'
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', zIndex: 1300,
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '50px 20px',
            backdropFilter: 'blur(5px)'
        }}>
            <div className="slide-card fade-in" style={{
                width: '100%', maxWidth: '800px', margin: 0, maxHeight: '85vh', overflowY: 'auto',
                background: 'var(--bg-secondary)', // Reverted to theme variable for adaptive background
                border: '1px solid var(--card-border)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--text-primary)' }}>✏️ Editar Pregunta</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '2rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Módulo</label>
                        <select
                            value={formData.modulo_id}
                            onChange={(e) => setFormData({ ...formData, modulo_id: parseInt(e.target.value) })}
                            style={inputStyle}
                            required
                        >
                            <option value="">Seleccione un módulo...</option>
                            {modulos && modulos.map(m => (
                                <option key={m.id} value={m.id}>{m.icon} {m.titulo}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                        <div>
                            <label style={labelStyle}>Nivel</label>
                            <select
                                value={formData.nivel}
                                onChange={(e) => setFormData({ ...formData, nivel: e.target.value })}
                                style={inputStyle}
                            >
                                <option value="basico">Básico</option>
                                <option value="intermedio">Intermedio</option>
                                <option value="avanzado">Avanzado</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Subtema</label>
                            <input
                                type="text"
                                value={formData.subtema}
                                onChange={(e) => setFormData({ ...formData, subtema: e.target.value })}
                                style={inputStyle}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Pregunta</label>
                        <textarea
                            value={formData.pregunta}
                            onChange={(e) => setFormData({ ...formData, pregunta: e.target.value })}
                            rows="3"
                            style={{ ...inputStyle, resize: 'vertical' }}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                        <div>
                            <label style={labelStyle}>Opción A</label>
                            <input type="text" value={formData.opcion_a} onChange={(e) => setFormData({ ...formData, opcion_a: e.target.value })} style={inputStyle} required />
                        </div>
                        <div>
                            <label style={labelStyle}>Opción B</label>
                            <input type="text" value={formData.opcion_b} onChange={(e) => setFormData({ ...formData, opcion_b: e.target.value })} style={inputStyle} required />
                        </div>
                        <div>
                            <label style={labelStyle}>Opción C</label>
                            <input type="text" value={formData.opcion_c} onChange={(e) => setFormData({ ...formData, opcion_c: e.target.value })} style={inputStyle} required />
                        </div>
                        <div>
                            <label style={labelStyle}>Opción D</label>
                            <input type="text" value={formData.opcion_d} onChange={(e) => setFormData({ ...formData, opcion_d: e.target.value })} style={inputStyle} required />
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Respuesta Correcta</label>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            {['a', 'b', 'c', 'd'].map(opt => (
                                <label key={opt} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'var(--text-primary)' }}>
                                    <input
                                        type="radio"
                                        name="respuesta_correcta"
                                        value={opt}
                                        checked={formData.respuesta_correcta === opt}
                                        onChange={(e) => setFormData({ ...formData, respuesta_correcta: e.target.value })}
                                        style={{ marginRight: '8px' }}
                                    />
                                    Opción {opt.toUpperCase()}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label style={labelStyle}>Explicación (Feedback)</label>
                        <textarea
                            value={formData.explicacion}
                            onChange={(e) => setFormData({ ...formData, explicacion: e.target.value })}
                            rows="2"
                            style={{ ...inputStyle, resize: 'vertical' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button type="button" onClick={onClose} style={{ flex: 1, padding: '16px', textAlign: 'center', fontSize: '1.2rem', color: '#ef4444', borderRadius: '12px', border: '2px solid #ef4444', background: 'transparent', cursor: 'pointer', fontWeight: '600' }}>Cancelar</button>
                        <button type="submit" className="btn-primary" style={{ flex: 1, marginTop: 0 }}>Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Role Edit Modal Component
const RolEditModal = ({ rol, onClose, onSave }) => {
    const [formData, setFormData] = useState(rol);

    const handlePermissionToggle = (permiso) => {
        setFormData({
            ...formData,
            permisos: {
                ...formData.permisos,
                [permiso]: !formData.permisos[permiso]
            }
        });
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', zIndex: 1300,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
            overflowY: 'auto', backdropFilter: 'blur(5px)'
        }}>
            <div className="slide-card fade-in" style={{ width: '100%', maxWidth: '600px', margin: 0 }}>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
                    {rol.id ? '✏️ Editar Rol' : '➕ Nuevo Rol'}
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>
                            Nombre
                        </label>
                        <input
                            type="text"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            placeholder="Nombre del rol"
                            style={{
                                width: '100%', padding: '10px', borderRadius: '8px',
                                border: '1px solid var(--input-border)',
                                background: 'var(--input-bg)', color: 'var(--text-primary)'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '5px' }}>
                            Descripción
                        </label>
                        <textarea
                            value={formData.descripcion}
                            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                            placeholder="Descripción del rol"
                            rows={3}
                            style={{
                                width: '100%', padding: '10px', borderRadius: '8px',
                                border: '1px solid var(--input-border)',
                                background: 'var(--input-bg)', color: 'var(--text-primary)',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>
                            Permisos
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                { key: 'ver_estadisticas', label: 'Ver Estadísticas' },
                                { key: 'gestionar_usuarios', label: 'Gestionar Usuarios' },
                                { key: 'gestionar_contenido', label: 'Gestionar Contenido' },
                                { key: 'realizar_examenes', label: 'Realizar Exámenes' }
                            ].map(permiso => (
                                <label key={permiso.key} style={{
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    padding: '10px', borderRadius: '8px',
                                    background: 'var(--bg-secondary)', cursor: 'pointer'
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.permisos?.[permiso.key] || false}
                                        onChange={() => handlePermissionToggle(permiso.key)}
                                        style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                                    />
                                    <span style={{ color: 'var(--text-primary)', flex: 1 }}>
                                        {permiso.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button
                            onClick={onClose}
                            style={{
                                flex: 1, padding: '12px', background: 'var(--bg-secondary)',
                                border: 'none', borderRadius: '8px', color: 'var(--text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => onSave(formData)}
                            className="btn-primary"
                            style={{ flex: 1, margin: 0 }}
                        >
                            {rol.id ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
