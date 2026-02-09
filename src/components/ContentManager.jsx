import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

/**
 * ContentManager Component
 * Standalone content administration section with tabs for:
 * - Contenido de Clase (lesson content with advanced ordering)
 * - Módulos (module CRUD)
 * - Preguntas (question management)
 */

const ContentManager = ({ onBack }) => {
  const { user } = useAuth();
  const { theme } = useTheme();

  // ============================================
  // STATE MANAGEMENT
  // ============================================

  const [activeTab, setActiveTab] = useState('contenido');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Contenido Tab
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [contentItems, setContentItems] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [orderFilter, setOrderFilter] = useState('by-order');
  const [typeFilter, setTypeFilter] = useState('all');
  const [orderChanged, setOrderChanged] = useState(false);

  // Módulos Tab
  const [modulesList, setModulesList] = useState([]);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);

  // Preguntas Tab
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaFilter, setPreguntaFilter] = useState({ modulo: null, nivel: null, subtema: null });
  const [isPreguntaModalOpen, setIsPreguntaModalOpen] = useState(false);
  const [editingPregunta, setEditingPregunta] = useState(null);

  const dragStartPos = useRef(null);

  // ============================================
  // AUTHORIZATION CHECK
  // ============================================

  if (user?.roles?.nombre !== 'admin') {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--error-color)' }}>
        <i className="fa-solid fa-lock" style={{ fontSize: '2rem', marginBottom: '20px', display: 'block' }}></i>
        <h2>Acceso Denegado</h2>
        <p>Solo los administradores pueden acceder a esta sección.</p>
        <button
          onClick={onBack}
          style={{
            marginTop: '20px',
            background: 'var(--accent-color)',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: 'pointer',
            border: 'none',
            fontSize: '1rem'
          }}
        >
          Volver
        </button>
      </div>
    );
  }

  // ============================================
  // LOAD DATA EFFECTS
  // ============================================

  useEffect(() => {
    loadModules();
  }, []);

  useEffect(() => {
    if (activeTab === 'contenido') {
      if (selectedModule) loadContent();
    } else if (activeTab === 'modulos') {
      loadModulesList();
    } else if (activeTab === 'preguntas') {
      loadPreguntas();
    }
  }, [activeTab, selectedModule]);

  // ============================================
  // DATA LOADING FUNCTIONS
  // ============================================

  const loadModules = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('modulos')
        .select('*')
        .order('numero', { ascending: true });

      if (error) throw error;
      setModules(data || []);
      if (data && data.length > 0 && !selectedModule) {
        setSelectedModule(data[0]);
      }
    } catch (err) {
      setError('Error cargando módulos: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadModulesList = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('modulos')
        .select('*')
        .order('numero', { ascending: true });

      if (error) throw error;
      setModulesList(data || []);
    } catch (err) {
      setError('Error cargando módulos: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadContent = async () => {
    if (!selectedModule) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contenido_clase')
        .select('*')
        .eq('modulo_id', selectedModule.id)
        .order('orden', { ascending: true });

      if (error) throw error;
      setContentItems(data || []);
      setOrderChanged(false);
    } catch (err) {
      setError('Error cargando contenido: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadPreguntas = async () => {
    try {
      setLoading(true);
      let query = supabase.from('preguntas').select('*');

      if (preguntaFilter.modulo) {
        query = query.eq('modulo_id', preguntaFilter.modulo);
      }
      if (preguntaFilter.nivel) {
        query = query.eq('nivel', preguntaFilter.nivel);
      }
      if (preguntaFilter.subtema) {
        query = query.eq('subtema', preguntaFilter.subtema);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setPreguntas(data || []);
    } catch (err) {
      setError('Error cargando preguntas: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // CONTENIDO TAB - HELPER FUNCTIONS
  // ============================================

  const parseMediaFromContent = (contenido) => {
    if (!contenido) return { text: '', media: {} };

    const mediaSeparator = '\n\n---MEDIA---\n';
    const parts = contenido.split(mediaSeparator);

    const text = parts[0];
    let media = {};

    if (parts[1]) {
      try {
        media = JSON.parse(parts[1]);
      } catch (e) {
        console.error('Failed to parse media JSON:', e);
      }
    }

    return { text, media };
  };

  const buildContentWithMedia = (text, media) => {
    if (!media || (Object.keys(media).length === 0 || (!media.audio_url && !media.video_url && !media.imagen_url))) {
      return text;
    }

    return `${text}\n\n---MEDIA---\n${JSON.stringify(media)}`;
  };

  const getTipoOptions = () => [
    { value: 'guia', label: 'Guía' },
    { value: 'informe', label: 'Informe' },
    { value: 'audio', label: 'Audio' },
    { value: 'video', label: 'Video' },
    { value: 'imagen', label: 'Imagen' },
    { value: 'otro', label: 'Otro' }
  ];

  const getTipoIcon = (tipo) => {
    const icons = {
      guia: 'fa-solid fa-book-open',
      informe: 'fa-solid fa-file-lines',
      audio: 'fa-solid fa-headphones',
      video: 'fa-solid fa-video',
      imagen: 'fa-solid fa-image',
      otro: 'fa-solid fa-cube'
    };
    return icons[tipo] || icons.otro;
  };

  const getTipoBadgeColor = (tipo) => {
    const colors = {
      guia: '#8b5cf6',
      informe: '#3b82f6',
      audio: '#ec4899',
      video: '#f59e0b',
      imagen: '#10b981',
      otro: '#6b7280'
    };
    return colors[tipo] || colors.otro;
  };

  const getFilteredAndSortedContent = () => {
    let filtered = contentItems;

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => item.tipo === typeFilter);
    }

    // Order filter
    if (orderFilter === 'by-order') {
      filtered.sort((a, b) => a.orden - b.orden);
    } else if (orderFilter === 'by-type') {
      filtered.sort((a, b) => a.tipo.localeCompare(b.tipo));
    } else if (orderFilter === 'by-title') {
      filtered.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }

    return filtered;
  };

  const handleMoveUp = async (index) => {
    const filtered = getFilteredAndSortedContent();
    if (index === 0) return;

    const item1 = filtered[index];
    const item2 = filtered[index - 1];

    const newOrder1 = item2.orden;
    const newOrder2 = item1.orden;

    const newItems = contentItems.map(item => {
      if (item.id === item1.id) return { ...item, orden: newOrder1 };
      if (item.id === item2.id) return { ...item, orden: newOrder2 };
      return item;
    });

    setContentItems(newItems);
    setOrderChanged(true);

    try {
      await Promise.all([
        supabase.from('contenido_clase').update({ orden: newOrder1 }).eq('id', item1.id),
        supabase.from('contenido_clase').update({ orden: newOrder2 }).eq('id', item2.id)
      ]);
    } catch (err) {
      setError('Error al reordenar: ' + err.message);
      console.error(err);
    }
  };

  const handleMoveDown = async (index) => {
    const filtered = getFilteredAndSortedContent();
    if (index === filtered.length - 1) return;

    const item1 = filtered[index];
    const item2 = filtered[index + 1];

    const newOrder1 = item2.orden;
    const newOrder2 = item1.orden;

    const newItems = contentItems.map(item => {
      if (item.id === item1.id) return { ...item, orden: newOrder1 };
      if (item.id === item2.id) return { ...item, orden: newOrder2 };
      return item;
    });

    setContentItems(newItems);
    setOrderChanged(true);

    try {
      await Promise.all([
        supabase.from('contenido_clase').update({ orden: newOrder1 }).eq('id', item1.id),
        supabase.from('contenido_clase').update({ orden: newOrder2 }).eq('id', item2.id)
      ]);
    } catch (err) {
      setError('Error al reordenar: ' + err.message);
      console.error(err);
    }
  };

  const handleSetOrder = async (itemId, newOrder) => {
    const newItems = contentItems.map(item => {
      if (item.id === itemId) return { ...item, orden: parseInt(newOrder) };
      return item;
    });

    setContentItems(newItems);
    setOrderChanged(true);

    try {
      await supabase.from('contenido_clase').update({ orden: parseInt(newOrder) }).eq('id', itemId);
    } catch (err) {
      setError('Error al actualizar orden: ' + err.message);
      console.error(err);
    }
  };

  const handleAutoReorder = async () => {
    if (!window.confirm('¿Reordenar items de 1 a N?')) return;

    const filtered = getFilteredAndSortedContent();
    const updates = filtered.map((item, idx) => ({
      ...item,
      orden: idx + 1
    }));

    const newItems = contentItems.map(item => {
      const updated = updates.find(u => u.id === item.id);
      return updated || item;
    });

    setContentItems(newItems);
    setOrderChanged(true);

    try {
      for (const update of updates) {
        await supabase.from('contenido_clase').update({ orden: update.orden }).eq('id', update.id);
      }
      setError(null);
    } catch (err) {
      setError('Error al reordenar: ' + err.message);
      console.error(err);
    }
  };

  const handleAddContent = () => {
    setEditingItem({
      id: null,
      modulo_id: selectedModule.id,
      orden: contentItems.length + 1,
      tipo: 'guia',
      titulo: '',
      contenido: ''
    });
    setIsEditModalOpen(true);
  };

  const handleEditContent = (item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleDeleteContent = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este contenido?')) return;

    try {
      const { error } = await supabase
        .from('contenido_clase')
        .delete()
        .eq('id', id);

      if (error) throw error;

      const remaining = contentItems.filter(item => item.id !== id);
      const reordered = remaining.map((item, idx) => ({
        ...item,
        orden: idx + 1
      }));

      setContentItems(reordered);

      for (let i = 0; i < reordered.length; i++) {
        await supabase
          .from('contenido_clase')
          .update({ orden: reordered[i].orden })
          .eq('id', reordered[i].id);
      }
    } catch (err) {
      setError('Error eliminando contenido: ' + err.message);
      console.error(err);
    }
  };

  const handleSaveContent = async (itemData) => {
    try {
      const { text, audio_url, video_url, imagen_url } = itemData;
      const media = { audio_url, video_url, imagen_url };
      const contenido = buildContentWithMedia(text, media);

      if (itemData.id) {
        const { error } = await supabase
          .from('contenido_clase')
          .update({
            tipo: itemData.tipo,
            titulo: itemData.titulo,
            contenido: contenido,
            orden: itemData.orden
          })
          .eq('id', itemData.id);

        if (error) throw error;

        const updatedItems = contentItems.map(item =>
          item.id === itemData.id
            ? { ...item, ...itemData, contenido }
            : item
        );
        setContentItems(updatedItems);
      } else {
        const { data, error } = await supabase
          .from('contenido_clase')
          .insert([{
            modulo_id: selectedModule.id,
            tipo: itemData.tipo,
            titulo: itemData.titulo,
            contenido: contenido,
            orden: itemData.orden
          }])
          .select();

        if (error) throw error;
        setContentItems([...contentItems, data[0]]);
      }

      setIsEditModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      setError('Error guardando contenido: ' + err.message);
      console.error(err);
    }
  };

  // ============================================
  // MÓDULOS TAB - FUNCTIONS
  // ============================================

  const handleAddModule = () => {
    setEditingModule({
      titulo: '',
      descripcion: '',
      numero: modulesList.length + 1,
      color: '#a855f7',
      icon: 'fa-solid fa-book'
    });
    setIsModuleModalOpen(true);
  };

  const handleEditModuleItem = (module) => {
    setEditingModule(module);
    setIsModuleModalOpen(true);
  };

  const handleSaveModule = async (moduleData) => {
    try {
      if (moduleData.id) {
        const { error } = await supabase
          .from('modulos')
          .update({
            titulo: moduleData.titulo,
            descripcion: moduleData.descripcion,
            color: moduleData.color,
            icon: moduleData.icon,
            audio_url: moduleData.audio_url || null,
            infografia_url: moduleData.infografia_url || null,
            activo: moduleData.activo !== undefined ? moduleData.activo : true
          })
          .eq('id', moduleData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('modulos')
          .insert([{
            titulo: moduleData.titulo,
            descripcion: moduleData.descripcion,
            numero: moduleData.numero,
            color: moduleData.color,
            icon: moduleData.icon,
            slug: moduleData.titulo.toLowerCase().replace(/ /g, '-'),
            activo: true
          }]);

        if (error) throw error;
      }

      loadModulesList();
      loadModules();
      setIsModuleModalOpen(false);
      setEditingModule(null);
    } catch (err) {
      setError('Error guardando módulo: ' + err.message);
      console.error(err);
    }
  };

  const handleToggleModuleActive = async (moduleId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('modulos')
        .update({ activo: !currentStatus })
        .eq('id', moduleId);

      if (error) throw error;
      loadModulesList();
    } catch (err) {
      setError('Error actualizando módulo: ' + err.message);
      console.error(err);
    }
  };

  const handleDeleteModule = async (moduleId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este módulo?')) return;

    try {
      const { error } = await supabase
        .from('modulos')
        .delete()
        .eq('id', moduleId);

      if (error) throw error;
      loadModulesList();
      loadModules();
    } catch (err) {
      setError('Error eliminando módulo: ' + err.message);
      console.error(err);
    }
  };

  // ============================================
  // PREGUNTAS TAB - FUNCTIONS
  // ============================================

  const handleAddPregunta = () => {
    setEditingPregunta({
      pregunta: '',
      subtema: '',
      nivel: 'basico',
      tema: '',
      opcion_a: '',
      opcion_b: '',
      opcion_c: '',
      opcion_d: '',
      respuesta_correcta: 'a',
      explicacion: '',
      formula: '',
      modulo_id: preguntaFilter.modulo || (modules[0]?.id)
    });
    setIsPreguntaModalOpen(true);
  };

  const handleEditPreguntaItem = (pregunta) => {
    setEditingPregunta(pregunta);
    setIsPreguntaModalOpen(true);
  };

  const handleSavePregunta = async (preguntaData) => {
    try {
      if (preguntaData.id) {
        const { error } = await supabase
          .from('preguntas')
          .update({
            pregunta: preguntaData.pregunta,
            subtema: preguntaData.subtema,
            nivel: preguntaData.nivel,
            tema: preguntaData.tema,
            opcion_a: preguntaData.opcion_a,
            opcion_b: preguntaData.opcion_b,
            opcion_c: preguntaData.opcion_c,
            opcion_d: preguntaData.opcion_d,
            respuesta_correcta: preguntaData.respuesta_correcta,
            explicacion: preguntaData.explicacion,
            formula: preguntaData.formula || null,
            modulo_id: preguntaData.modulo_id,
            activo: preguntaData.activo !== undefined ? preguntaData.activo : true
          })
          .eq('id', preguntaData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('preguntas')
          .insert([{
            pregunta: preguntaData.pregunta,
            subtema: preguntaData.subtema,
            nivel: preguntaData.nivel,
            tema: preguntaData.tema,
            opcion_a: preguntaData.opcion_a,
            opcion_b: preguntaData.opcion_b,
            opcion_c: preguntaData.opcion_c,
            opcion_d: preguntaData.opcion_d,
            respuesta_correcta: preguntaData.respuesta_correcta,
            explicacion: preguntaData.explicacion,
            formula: preguntaData.formula || null,
            modulo_id: preguntaData.modulo_id,
            modulo: preguntaData.modulo || null,
            activo: true
          }]);

        if (error) throw error;
      }

      loadPreguntas();
      setIsPreguntaModalOpen(false);
      setEditingPregunta(null);
    } catch (err) {
      setError('Error guardando pregunta: ' + err.message);
      console.error(err);
    }
  };

  const handleTogglePreguntaActive = async (preguntaId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('preguntas')
        .update({ activo: !currentStatus })
        .eq('id', preguntaId);

      if (error) throw error;
      loadPreguntas();
    } catch (err) {
      setError('Error actualizando pregunta: ' + err.message);
      console.error(err);
    }
  };

  const handleDeletePregunta = async (preguntaId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta pregunta?')) return;

    try {
      const { error } = await supabase
        .from('preguntas')
        .delete()
        .eq('id', preguntaId);

      if (error) throw error;
      loadPreguntas();
    } catch (err) {
      setError('Error eliminando pregunta: ' + err.message);
      console.error(err);
    }
  };

  // ============================================
  // MAIN RENDER
  // ============================================

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '40px 20px' }}>
      {/* HEADER */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '40px',
        maxWidth: '1400px',
        margin: '0 auto 40px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={onBack}
            style={{
              background: 'transparent',
              border: '2px solid var(--accent-color)',
              color: 'var(--accent-color)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              fontSize: '1.3rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--accent-color)';
              e.target.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'var(--accent-color)';
            }}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h1 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '2rem' }}>
              <i className="fa-solid fa-sliders" style={{ marginRight: '12px', color: 'var(--accent-color)' }}></i>
              Administración de Contenido
            </h1>
            <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              Gestiona módulos, contenido y preguntas de EGEL
            </p>
          </div>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto 20px',
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid var(--error-color)',
          color: 'var(--error-color)',
          padding: '15px 20px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <i className="fa-solid fa-circle-exclamation"></i>
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            style={{
              marginLeft: 'auto',
              background: 'transparent',
              border: 'none',
              color: 'var(--error-color)',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* TABS */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '30px',
          borderBottom: '1px solid var(--card-border)',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'contenido', label: 'Contenido de Clase', icon: 'fa-solid fa-book-open', count: selectedModule ? contentItems.length : 0 },
            { id: 'modulos', label: 'Módulos', icon: 'fa-solid fa-cubes', count: modulesList.length },
            { id: 'preguntas', label: 'Preguntas', icon: 'fa-solid fa-question', count: preguntas.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                background: activeTab === tab.id ? 'var(--accent-color)' : 'transparent',
                color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)',
                border: activeTab === tab.id ? 'none' : '1px solid var(--card-border)',
                borderBottom: activeTab === tab.id ? 'none' : '1px solid var(--card-border)',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.background = 'rgba(168, 85, 247, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.background = 'transparent';
                }
              }}
            >
              <i className={tab.icon}></i>
              {tab.label}
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: '700'
              }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ============================================ */}
        {/* TAB 1: CONTENIDO DE CLASE */}
        {/* ============================================ */}
        {activeTab === 'contenido' && (
          <div>
            {/* Module Selection */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--card-border)',
              borderRadius: '16px',
              padding: '25px',
              marginBottom: '30px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', alignItems: 'end' }}>
                <div>
                  <label style={{
                    display: 'block',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: '600'
                  }}>
                    <i className="fa-solid fa-folder-open" style={{ marginRight: '8px' }}></i>
                    Selecciona un Módulo
                  </label>
                  <select
                    value={selectedModule?.id || ''}
                    onChange={(e) => {
                      const module = modules.find(m => m.id === parseInt(e.target.value));
                      setSelectedModule(module);
                    }}
                    style={{
                      width: '100%',
                      background: 'var(--input-bg)',
                      border: '1px solid var(--input-border)',
                      color: 'var(--text-primary)',
                      padding: '12px 15px',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      fontFamily: 'inherit'
                    }}
                  >
                    {modules.map(mod => (
                      <option key={mod.id} value={mod.id}>
                        {mod.numero}. {mod.titulo}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAddContent}
                  style={{
                    background: 'var(--success-color)',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s',
                    height: '44px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = '0.85';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <i className="fa-solid fa-plus"></i>
                  Agregar Contenido
                </button>
              </div>
            </div>

            {selectedModule && (
              <div>
                {/* Filters and Controls */}
                <div style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '16px',
                  padding: '20px',
                  marginBottom: '25px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  alignItems: 'end'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      color: 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      marginBottom: '6px',
                      fontWeight: '600'
                    }}>
                      <i className="fa-solid fa-arrow-up-arrow-down" style={{ marginRight: '6px' }}></i>
                      Ordenar por
                    </label>
                    <select
                      value={orderFilter}
                      onChange={(e) => setOrderFilter(e.target.value)}
                      style={{
                        width: '100%',
                        background: 'var(--input-bg)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--text-primary)',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        fontFamily: 'inherit'
                      }}
                    >
                      <option value="by-order">Por Orden</option>
                      <option value="by-type">Por Tipo</option>
                      <option value="by-title">Por Título</option>
                    </select>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      color: 'var(--text-secondary)',
                      fontSize: '0.85rem',
                      marginBottom: '6px',
                      fontWeight: '600'
                    }}>
                      <i className="fa-solid fa-filter" style={{ marginRight: '6px' }}></i>
                      Filtrar Tipo
                    </label>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      style={{
                        width: '100%',
                        background: 'var(--input-bg)',
                        border: '1px solid var(--input-border)',
                        color: 'var(--text-primary)',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        fontFamily: 'inherit'
                      }}
                    >
                      <option value="all">Todos</option>
                      {getTipoOptions().map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleAutoReorder}
                    style={{
                      background: 'var(--warning-color)',
                      color: '#000',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.opacity = '0.85';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.opacity = '1';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <i className="fa-solid fa-shuffle"></i>
                    Auto-reordenar
                  </button>
                </div>

                {/* Content Title */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '20px'
                }}>
                  <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.5rem' }}>
                    <i className="fa-solid fa-list" style={{ marginRight: '12px', color: 'var(--accent-color)' }}></i>
                    Contenido
                  </h2>
                  <span style={{
                    background: 'var(--accent-color)',
                    color: '#fff',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {contentItems.length}
                  </span>
                </div>

                {/* Content Items */}
                {loading ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '60px 20px',
                    color: 'var(--text-secondary)'
                  }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{
                      fontSize: '2.5rem',
                      marginBottom: '20px',
                      display: 'block',
                      color: 'var(--accent-color)'
                    }}></i>
                    <p>Cargando contenido...</p>
                  </div>
                ) : contentItems.length === 0 ? (
                  <div style={{
                    background: 'var(--bg-secondary)',
                    border: '2px dashed var(--card-border)',
                    borderRadius: '16px',
                    padding: '60px 20px',
                    textAlign: 'center',
                    color: 'var(--text-secondary)'
                  }}>
                    <i className="fa-solid fa-inbox" style={{
                      fontSize: '3rem',
                      marginBottom: '15px',
                      display: 'block',
                      opacity: '0.5'
                    }}></i>
                    <p style={{ fontSize: '1.1rem', margin: 0 }}>
                      No hay contenido en este módulo
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {getFilteredAndSortedContent().map((item, index) => {
                      const { text, media } = parseMediaFromContent(item.contenido);
                      const hasAudio = media?.audio_url;
                      const hasVideo = media?.video_url;
                      const hasImage = media?.imagen_url;

                      return (
                        <div
                          key={item.id}
                          style={{
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '12px',
                            padding: '16px',
                            display: 'grid',
                            gridTemplateColumns: '80px 1fr auto',
                            gap: '20px',
                            alignItems: 'start',
                            transition: 'all 0.2s'
                          }}
                        >
                          {/* Order Section */}
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '12px'
                          }}>
                            <div style={{
                              background: 'var(--accent-color)',
                              color: '#fff',
                              width: '60px',
                              height: '60px',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.5rem',
                              fontWeight: 'bold'
                            }}>
                              {item.orden}
                            </div>
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px',
                              width: '100%'
                            }}>
                              <button
                                onClick={() => handleMoveUp(index)}
                                disabled={index === 0}
                                style={{
                                  background: index === 0 ? 'rgba(168, 85, 247, 0.2)' : 'var(--accent-color)',
                                  color: '#fff',
                                  border: 'none',
                                  padding: '4px',
                                  borderRadius: '4px',
                                  cursor: index === 0 ? 'not-allowed' : 'pointer',
                                  fontSize: '0.8rem',
                                  opacity: index === 0 ? 0.5 : 1
                                }}
                              >
                                <i className="fa-solid fa-chevron-up"></i>
                              </button>
                              <button
                                onClick={() => handleMoveDown(index)}
                                disabled={index === getFilteredAndSortedContent().length - 1}
                                style={{
                                  background: index === getFilteredAndSortedContent().length - 1 ? 'rgba(168, 85, 247, 0.2)' : 'var(--accent-color)',
                                  color: '#fff',
                                  border: 'none',
                                  padding: '4px',
                                  borderRadius: '4px',
                                  cursor: index === getFilteredAndSortedContent().length - 1 ? 'not-allowed' : 'pointer',
                                  fontSize: '0.8rem',
                                  opacity: index === getFilteredAndSortedContent().length - 1 ? 0.5 : 1
                                }}
                              >
                                <i className="fa-solid fa-chevron-down"></i>
                              </button>
                            </div>
                            <input
                              type="number"
                              value={item.orden}
                              onChange={(e) => handleSetOrder(item.id, e.target.value)}
                              min="1"
                              style={{
                                width: '100%',
                                background: 'var(--input-bg)',
                                border: '1px solid var(--input-border)',
                                color: 'var(--text-primary)',
                                padding: '4px 6px',
                                borderRadius: '4px',
                                fontSize: '0.8rem',
                                textAlign: 'center'
                              }}
                            />
                          </div>

                          {/* Content Info */}
                          <div>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              marginBottom: '8px',
                              flexWrap: 'wrap'
                            }}>
                              <span style={{
                                background: getTipoBadgeColor(item.tipo),
                                color: '#fff',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                              }}>
                                <i className={getTipoIcon(item.tipo)}></i>
                                {item.tipo}
                              </span>
                              {hasAudio && (
                                <span style={{
                                  background: 'rgba(236, 72, 153, 0.2)',
                                  color: '#ec4899',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem'
                                }}>
                                  <i className="fa-solid fa-headphones"></i>
                                </span>
                              )}
                              {hasVideo && (
                                <span style={{
                                  background: 'rgba(245, 158, 11, 0.2)',
                                  color: '#f59e0b',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem'
                                }}>
                                  <i className="fa-solid fa-video"></i>
                                </span>
                              )}
                              {hasImage && (
                                <span style={{
                                  background: 'rgba(16, 185, 129, 0.2)',
                                  color: '#10b981',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '0.75rem'
                                }}>
                                  <i className="fa-solid fa-image"></i>
                                </span>
                              )}
                            </div>
                            <h3 style={{
                              margin: 0,
                              color: 'var(--text-primary)',
                              fontSize: '1.1rem',
                              fontWeight: '600'
                            }}>
                              {item.titulo}
                            </h3>
                            <p style={{
                              margin: '6px 0 0',
                              color: 'var(--text-secondary)',
                              fontSize: '0.9rem',
                              lineHeight: '1.4',
                              maxHeight: '3em',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {text.substring(0, 150)}...
                            </p>
                          </div>

                          {/* Actions */}
                          <div style={{
                            display: 'flex',
                            gap: '8px',
                            flexDirection: 'column'
                          }}>
                            <button
                              onClick={() => handleEditContent(item)}
                              style={{
                                background: 'var(--accent-color)',
                                color: '#fff',
                                border: 'none',
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s',
                                fontSize: '1rem'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.background = 'var(--accent-hover)';
                                e.target.style.transform = 'scale(1.05)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.background = 'var(--accent-color)';
                                e.target.style.transform = 'scale(1)';
                              }}
                              title="Editar"
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button
                              onClick={() => handleDeleteContent(item.id)}
                              style={{
                                background: 'var(--error-color)',
                                color: '#fff',
                                border: 'none',
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s',
                                fontSize: '1rem'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.opacity = '0.85';
                                e.target.style.transform = 'scale(1.05)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.opacity = '1';
                                e.target.style.transform = 'scale(1)';
                              }}
                              title="Eliminar"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ============================================ */}
        {/* TAB 2: MÓDULOS */}
        {/* ============================================ */}
        {activeTab === 'modulos' && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px'
            }}>
              <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.5rem' }}>
                <i className="fa-solid fa-cubes" style={{ marginRight: '12px', color: 'var(--accent-color)' }}></i>
                Módulos
              </h2>
              <button
                onClick={handleAddModule}
                style={{
                  background: 'var(--success-color)',
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = '0.85';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = '1';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <i className="fa-solid fa-plus"></i>
                Agregar Módulo
              </button>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
                <i className="fa-solid fa-spinner fa-spin" style={{
                  fontSize: '2.5rem',
                  marginBottom: '20px',
                  display: 'block',
                  color: 'var(--accent-color)'
                }}></i>
                Cargando módulos...
              </div>
            ) : modulesList.length === 0 ? (
              <div style={{
                background: 'var(--bg-secondary)',
                border: '2px dashed var(--card-border)',
                borderRadius: '16px',
                padding: '60px 20px',
                textAlign: 'center',
                color: 'var(--text-secondary)'
              }}>
                <i className="fa-solid fa-cubes" style={{
                  fontSize: '3rem',
                  marginBottom: '15px',
                  display: 'block',
                  opacity: '0.5'
                }}></i>
                <p style={{ fontSize: '1.1rem', margin: 0 }}>
                  No hay módulos creados
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px'
              }}>
                {modulesList.map(module => {
                  const contentCount = contentItems.filter(c => c.modulo_id === module.id).length;
                  return (
                    <div
                      key={module.id}
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--card-border)',
                        borderRadius: '12px',
                        padding: '20px',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        marginBottom: '16px'
                      }}>
                        <div style={{
                          width: '50px',
                          height: '50px',
                          background: module.color || 'var(--accent-color)',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: '1.5rem'
                        }}>
                          <i className={module.icon || 'fa-solid fa-book'}></i>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h3 style={{
                            margin: '0 0 4px',
                            color: 'var(--text-primary)',
                            fontSize: '1.1rem',
                            fontWeight: '700'
                          }}>
                            {module.numero}. {module.titulo}
                          </h3>
                          <p style={{
                            margin: 0,
                            color: 'var(--text-secondary)',
                            fontSize: '0.85rem'
                          }}>
                            {module.descripcion}
                          </p>
                        </div>
                      </div>

                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        marginBottom: '12px',
                        flexWrap: 'wrap'
                      }}>
                        <span style={{
                          background: 'var(--accent-color)',
                          color: '#fff',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          <i className="fa-solid fa-book-open" style={{ marginRight: '4px' }}></i>
                          {contentCount} contenidos
                        </span>
                        <span style={{
                          background: module.activo ? 'rgba(74, 222, 128, 0.2)' : 'rgba(244, 63, 94, 0.2)',
                          color: module.activo ? '#4ade80' : '#f87171',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {module.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>

                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        paddingTop: '12px',
                        borderTop: '1px solid var(--card-border)'
                      }}>
                        <button
                          onClick={() => handleEditModuleItem(module)}
                          style={{
                            flex: 1,
                            background: 'var(--accent-color)',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.opacity = '0.85';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.opacity = '1';
                          }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i> Editar
                        </button>
                        <button
                          onClick={() => handleToggleModuleActive(module.id, module.activo)}
                          style={{
                            flex: 1,
                            background: module.activo ? 'rgba(244, 63, 94, 0.2)' : 'rgba(74, 222, 128, 0.2)',
                            color: module.activo ? '#f87171' : '#4ade80',
                            border: '1px solid currentColor',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.opacity = '0.85';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.opacity = '1';
                          }}
                        >
                          <i className={`fa-solid ${module.activo ? 'fa-ban' : 'fa-check'}`}></i>
                          {module.activo ? 'Desactivar' : 'Activar'}
                        </button>
                        <button
                          onClick={() => handleDeleteModule(module.id)}
                          style={{
                            background: 'var(--error-color)',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            transition: 'all 0.2s',
                            width: '44px'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.opacity = '0.85';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.opacity = '1';
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ============================================ */}
        {/* TAB 3: PREGUNTAS */}
        {/* ============================================ */}
        {activeTab === 'preguntas' && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px'
            }}>
              <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.5rem' }}>
                <i className="fa-solid fa-question" style={{ marginRight: '12px', color: 'var(--accent-color)' }}></i>
                Preguntas
              </h2>
              <button
                onClick={handleAddPregunta}
                style={{
                  background: 'var(--success-color)',
                  color: '#fff',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = '0.85';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = '1';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <i className="fa-solid fa-plus"></i>
                Agregar Pregunta
              </button>
            </div>

            {/* Filters */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--card-border)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '25px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              alignItems: 'end'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  marginBottom: '6px',
                  fontWeight: '600'
                }}>
                  Módulo
                </label>
                <select
                  value={preguntaFilter.modulo || ''}
                  onChange={(e) => setPreguntaFilter({ ...preguntaFilter, modulo: e.target.value ? parseInt(e.target.value) : null })}
                  style={{
                    width: '100%',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    color: 'var(--text-primary)',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value="">Todos</option>
                  {modules.map(mod => (
                    <option key={mod.id} value={mod.id}>
                      {mod.titulo}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  marginBottom: '6px',
                  fontWeight: '600'
                }}>
                  Nivel
                </label>
                <select
                  value={preguntaFilter.nivel || ''}
                  onChange={(e) => setPreguntaFilter({ ...preguntaFilter, nivel: e.target.value || null })}
                  style={{
                    width: '100%',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    color: 'var(--text-primary)',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value="">Todos</option>
                  <option value="basico">Básico</option>
                  <option value="intermedio">Intermedio</option>
                  <option value="avanzado">Avanzado</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
                <i className="fa-solid fa-spinner fa-spin" style={{
                  fontSize: '2.5rem',
                  marginBottom: '20px',
                  display: 'block',
                  color: 'var(--accent-color)'
                }}></i>
                Cargando preguntas...
              </div>
            ) : preguntas.length === 0 ? (
              <div style={{
                background: 'var(--bg-secondary)',
                border: '2px dashed var(--card-border)',
                borderRadius: '16px',
                padding: '60px 20px',
                textAlign: 'center',
                color: 'var(--text-secondary)'
              }}>
                <i className="fa-solid fa-question" style={{
                  fontSize: '3rem',
                  marginBottom: '15px',
                  display: 'block',
                  opacity: '0.5'
                }}></i>
                <p style={{ fontSize: '1.1rem', margin: 0 }}>
                  No hay preguntas
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {preguntas.map(pregunta => {
                  const modulo = modules.find(m => m.id === pregunta.modulo_id);
                  return (
                    <div
                      key={pregunta.id}
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--card-border)',
                        borderRadius: '12px',
                        padding: '16px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto',
                        gap: '20px',
                        alignItems: 'start'
                      }}>
                        <div>
                          <div style={{
                            display: 'flex',
                            gap: '8px',
                            marginBottom: '8px',
                            flexWrap: 'wrap'
                          }}>
                            {modulo && (
                              <span style={{
                                background: modulo.color || 'var(--accent-color)',
                                color: '#fff',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                              }}>
                                {modulo.titulo}
                              </span>
                            )}
                            <span style={{
                              background: pregunta.nivel === 'basico' ? 'rgba(74, 222, 128, 0.2)' : pregunta.nivel === 'intermedio' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(244, 63, 94, 0.2)',
                              color: pregunta.nivel === 'basico' ? '#4ade80' : pregunta.nivel === 'intermedio' ? '#f59e0b' : '#f87171',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              textTransform: 'capitalize'
                            }}>
                              {pregunta.nivel}
                            </span>
                            <span style={{
                              background: pregunta.activo ? 'rgba(74, 222, 128, 0.2)' : 'rgba(244, 63, 94, 0.2)',
                              color: pregunta.activo ? '#4ade80' : '#f87171',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: '600'
                            }}>
                              {pregunta.activo ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                          <h4 style={{
                            margin: '0 0 8px',
                            color: 'var(--text-primary)',
                            fontSize: '1rem',
                            fontWeight: '600'
                          }}>
                            {pregunta.pregunta}
                          </h4>
                          {pregunta.subtema && (
                            <p style={{
                              margin: 0,
                              color: 'var(--text-secondary)',
                              fontSize: '0.85rem'
                            }}>
                              Subtema: {pregunta.subtema}
                            </p>
                          )}
                        </div>

                        <div style={{
                          display: 'flex',
                          gap: '8px'
                        }}>
                          <button
                            onClick={() => handleEditPreguntaItem(pregunta)}
                            style={{
                              background: 'var(--accent-color)',
                              color: '#fff',
                              border: 'none',
                              width: '40px',
                              height: '40px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1rem',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = 'var(--accent-hover)';
                              e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'var(--accent-color)';
                              e.target.style.transform = 'scale(1)';
                            }}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button
                            onClick={() => handleTogglePreguntaActive(pregunta.id, pregunta.activo)}
                            style={{
                              background: pregunta.activo ? 'rgba(244, 63, 94, 0.2)' : 'rgba(74, 222, 128, 0.2)',
                              color: pregunta.activo ? '#f87171' : '#4ade80',
                              border: '1px solid currentColor',
                              width: '40px',
                              height: '40px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1rem',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.opacity = '0.85';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.opacity = '1';
                            }}
                          >
                            <i className={`fa-solid ${pregunta.activo ? 'fa-ban' : 'fa-check'}`}></i>
                          </button>
                          <button
                            onClick={() => handleDeletePregunta(pregunta.id)}
                            style={{
                              background: 'var(--error-color)',
                              color: '#fff',
                              border: 'none',
                              width: '40px',
                              height: '40px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1rem',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.opacity = '0.85';
                              e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.opacity = '1';
                              e.target.style.transform = 'scale(1)';
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ============================================ */}
      {/* MODALS */}
      {/* ============================================ */}

      {isEditModalOpen && editingItem && (
        <ContentEditModal
          item={editingItem}
          tipoOptions={getTipoOptions()}
          onSave={handleSaveContent}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingItem(null);
          }}
        />
      )}

      {isModuleModalOpen && editingModule && (
        <ModuleEditModal
          module={editingModule}
          onSave={handleSaveModule}
          onClose={() => {
            setIsModuleModalOpen(false);
            setEditingModule(null);
          }}
        />
      )}

      {isPreguntaModalOpen && editingPregunta && (
        <PreguntaEditModal
          pregunta={editingPregunta}
          modules={modules}
          onSave={handleSavePregunta}
          onClose={() => {
            setIsPreguntaModalOpen(false);
            setEditingPregunta(null);
          }}
        />
      )}
    </div>
  );
};

// ============================================
// CONTENT EDIT MODAL
// ============================================

const ContentEditModal = ({ item, tipoOptions, onSave, onClose }) => {
  const [formData, setFormData] = useState(() => {
    const mediaSeparator = '\n\n---MEDIA---\n';
    const parts = (item.contenido || '').split(mediaSeparator);
    const text = parts[0];
    let media = {};
    if (parts[1]) {
      try {
        media = JSON.parse(parts[1]);
      } catch (e) {
        console.error('Failed to parse media JSON:', e);
      }
    }
    return {
      ...item,
      text: text,
      audio_url: media?.audio_url || '',
      video_url: media?.video_url || '',
      imagen_url: media?.imagen_url || ''
    };
  });

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--card-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%)',
          color: '#fff',
          position: 'sticky',
          top: 0
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700' }}>
              {item.id ? 'Editar Contenido' : 'Nuevo Contenido'}
            </h2>
            <p style={{ margin: '4px 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
              Completa los campos para {item.id ? 'actualizar' : 'crear'} un elemento
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: '#fff',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: 'var(--text-primary)',
              marginBottom: '8px',
              fontWeight: '600',
              fontSize: '0.95rem'
            }}>
              <i className="fa-solid fa-tag" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>
              Tipo
            </label>
            <select
              value={formData.tipo}
              onChange={(e) => handleFieldChange('tipo', e.target.value)}
              style={{
                width: '100%',
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
                padding: '12px 15px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                cursor: 'pointer'
              }}
            >
              {tipoOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: 'var(--text-primary)',
              marginBottom: '8px',
              fontWeight: '600',
              fontSize: '0.95rem'
            }}>
              <i className="fa-solid fa-sort-numeric-up" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>
              Orden
            </label>
            <input
              type="number"
              value={formData.orden}
              onChange={(e) => handleFieldChange('orden', parseInt(e.target.value))}
              min="1"
              style={{
                width: '100%',
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
                padding: '12px 15px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: 'var(--text-primary)',
              marginBottom: '8px',
              fontWeight: '600',
              fontSize: '0.95rem'
            }}>
              <i className="fa-solid fa-heading" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>
              Título
            </label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => handleFieldChange('titulo', e.target.value)}
              placeholder="Ingresa el título"
              style={{
                width: '100%',
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
                padding: '12px 15px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: 'var(--text-primary)',
              marginBottom: '8px',
              fontWeight: '600',
              fontSize: '0.95rem'
            }}>
              <i className="fa-solid fa-file-lines" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>
              Contenido
            </label>
            <textarea
              value={formData.text}
              onChange={(e) => handleFieldChange('text', e.target.value)}
              placeholder="Escribe el contenido aquí (Markdown soportado)"
              style={{
                width: '100%',
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
                padding: '12px 15px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontFamily: 'monospace',
                minHeight: '150px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{
            background: 'var(--bg-primary)',
            border: '1px dashed var(--card-border)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h4 style={{
              color: 'var(--text-primary)',
              margin: '0 0 16px',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="fa-solid fa-circle-info" style={{ color: 'var(--accent-color)' }}></i>
              Multimedia
            </h4>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                color: 'var(--text-primary)',
                marginBottom: '8px',
                fontWeight: '500',
                fontSize: '0.9rem'
              }}>
                <i className="fa-solid fa-headphones" style={{ marginRight: '6px', color: '#ec4899' }}></i>
                URL de Audio
              </label>
              <input
                type="url"
                value={formData.audio_url}
                onChange={(e) => handleFieldChange('audio_url', e.target.value)}
                placeholder="https://..."
                style={{
                  width: '100%',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  color: 'var(--text-primary)',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                color: 'var(--text-primary)',
                marginBottom: '8px',
                fontWeight: '500',
                fontSize: '0.9rem'
              }}>
                <i className="fa-solid fa-video" style={{ marginRight: '6px', color: '#f59e0b' }}></i>
                URL de Video
              </label>
              <input
                type="url"
                value={formData.video_url}
                onChange={(e) => handleFieldChange('video_url', e.target.value)}
                placeholder="https://..."
                style={{
                  width: '100%',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  color: 'var(--text-primary)',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                color: 'var(--text-primary)',
                marginBottom: '8px',
                fontWeight: '500',
                fontSize: '0.9rem'
              }}>
                <i className="fa-solid fa-image" style={{ marginRight: '6px', color: '#10b981' }}></i>
                URL de Imagen
              </label>
              <input
                type="url"
                value={formData.imagen_url}
                onChange={(e) => handleFieldChange('imagen_url', e.target.value)}
                placeholder="https://..."
                style={{
                  width: '100%',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  color: 'var(--text-primary)',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '12px',
            paddingTop: '20px',
            borderTop: '1px solid var(--card-border)'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                background: 'var(--bg-primary)',
                border: '1px solid var(--card-border)',
                color: 'var(--text-primary)',
                padding: '12px 20px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--bg-tertiary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'var(--bg-primary)';
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                background: 'var(--accent-color)',
                border: 'none',
                color: '#fff',
                padding: '12px 20px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--accent-hover)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'var(--accent-color)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i className="fa-solid fa-save" style={{ marginRight: '8px' }}></i>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ============================================
// MODULE EDIT MODAL
// ============================================

const ModuleEditModal = ({ module, onSave, onClose }) => {
  const [formData, setFormData] = useState(module);

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--card-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%)',
          color: '#fff'
        }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700' }}>
            {module.id ? 'Editar Módulo' : 'Nuevo Módulo'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: '#fff',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600' }}>
              Título
            </label>
            <input
              type="text"
              value={formData.titulo || ''}
              onChange={(e) => handleFieldChange('titulo', e.target.value)}
              style={{
                width: '100%',
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
                padding: '12px 15px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600' }}>
              Descripción
            </label>
            <textarea
              value={formData.descripcion || ''}
              onChange={(e) => handleFieldChange('descripcion', e.target.value)}
              style={{
                width: '100%',
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
                padding: '12px 15px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                minHeight: '80px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600' }}>
              Color
            </label>
            <input
              type="color"
              value={formData.color || '#a855f7'}
              onChange={(e) => handleFieldChange('color', e.target.value)}
              style={{
                width: '100%',
                height: '44px',
                border: '1px solid var(--input-border)',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600' }}>
              Ícono (Font Awesome class)
            </label>
            <input
              type="text"
              value={formData.icon || 'fa-solid fa-book'}
              onChange={(e) => handleFieldChange('icon', e.target.value)}
              placeholder="fa-solid fa-book"
              style={{
                width: '100%',
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
                padding: '12px 15px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600' }}>
              Audio URL
            </label>
            <input
              type="url"
              value={formData.audio_url || ''}
              onChange={(e) => handleFieldChange('audio_url', e.target.value)}
              placeholder="https://..."
              style={{
                width: '100%',
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
                padding: '12px 15px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600' }}>
              Infografía URL
            </label>
            <input
              type="url"
              value={formData.infografia_url || ''}
              onChange={(e) => handleFieldChange('infografia_url', e.target.value)}
              placeholder="https://..."
              style={{
                width: '100%',
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
                padding: '12px 15px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            gap: '12px',
            paddingTop: '20px',
            borderTop: '1px solid var(--card-border)'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                background: 'var(--bg-primary)',
                border: '1px solid var(--card-border)',
                color: 'var(--text-primary)',
                padding: '12px 20px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                background: 'var(--accent-color)',
                border: 'none',
                color: '#fff',
                padding: '12px 20px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              <i className="fa-solid fa-save" style={{ marginRight: '8px' }}></i>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ============================================
// PREGUNTA EDIT MODAL
// ============================================

const PreguntaEditModal = ({ pregunta, modules, onSave, onClose }) => {
  const [formData, setFormData] = useState(pregunta);

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px',
      backdropFilter: 'blur(4px)',
      overflow: 'auto'
    }}>
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--card-border)',
        borderRadius: '16px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        margin: 'auto'
      }}>
        <div style={{
          padding: '24px',
          borderBottom: '1px solid var(--card-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%)',
          color: '#fff',
          position: 'sticky',
          top: 0
        }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700' }}>
            {pregunta.id ? 'Editar Pregunta' : 'Nueva Pregunta'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: '#fff',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600' }}>
              Módulo
            </label>
            <select
              value={formData.modulo_id || ''}
              onChange={(e) => handleFieldChange('modulo_id', parseInt(e.target.value))}
              style={{
                width: '100%',
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
                padding: '12px 15px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                cursor: 'pointer'
              }}
            >
              <option value="">Selecciona módulo</option>
              {modules.map(mod => (
                <option key={mod.id} value={mod.id}>{mod.titulo}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600' }}>
              Pregunta
            </label>
            <textarea
              value={formData.pregunta || ''}
              onChange={(e) => handleFieldChange('pregunta', e.target.value)}
              style={{
                width: '100%',
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
                padding: '12px 15px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                minHeight: '80px'
              }}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600' }}>
                Nivel
              </label>
              <select
                value={formData.nivel || 'basico'}
                onChange={(e) => handleFieldChange('nivel', e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  color: 'var(--text-primary)',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  cursor: 'pointer'
                }}
              >
                <option value="basico">Básico</option>
                <option value="intermedio">Intermedio</option>
                <option value="avanzado">Avanzado</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600' }}>
                Subtema
              </label>
              <input
                type="text"
                value={formData.subtema || ''}
                onChange={(e) => handleFieldChange('subtema', e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  color: 'var(--text-primary)',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600' }}>
              Tema
            </label>
            <input
              type="text"
              value={formData.tema || ''}
              onChange={(e) => handleFieldChange('tema', e.target.value)}
              style={{
                width: '100%',
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
                padding: '12px 15px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{
            background: 'var(--bg-primary)',
            border: '1px dashed var(--card-border)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px'
          }}>
            <h4 style={{ color: 'var(--text-primary)', margin: '0 0 12px', fontSize: '0.95rem' }}>
              <i className="fa-solid fa-circle-info" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>
              Opciones
            </h4>

            {['a', 'b', 'c', 'd'].map(letter => (
              <div key={letter} style={{ marginBottom: '12px' }}>
                <label style={{
                  display: 'block',
                  color: 'var(--text-secondary)',
                  marginBottom: '4px',
                  fontSize: '0.85rem',
                  fontWeight: '600'
                }}>
                  Opción {letter.toUpperCase()}
                </label>
                <input
                  type="text"
                  value={formData[`opcion_${letter}`] || ''}
                  onChange={(e) => handleFieldChange(`opcion_${letter}`, e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--input-border)',
                    color: 'var(--text-primary)',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontFamily: 'inherit'
                  }}
                  required
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600' }}>
              Respuesta Correcta
            </label>
            <select
              value={formData.respuesta_correcta || 'a'}
              onChange={(e) => handleFieldChange('respuesta_correcta', e.target.value)}
              style={{
                width: '100%',
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
                padding: '12px 15px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                cursor: 'pointer'
              }}
            >
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600' }}>
              Explicación
            </label>
            <textarea
              value={formData.explicacion || ''}
              onChange={(e) => handleFieldChange('explicacion', e.target.value)}
              style={{
                width: '100%',
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
                padding: '12px 15px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                minHeight: '60px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600' }}>
              Fórmula (opcional)
            </label>
            <input
              type="text"
              value={formData.formula || ''}
              onChange={(e) => handleFieldChange('formula', e.target.value)}
              style={{
                width: '100%',
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
                padding: '12px 15px',
                borderRadius: '10px',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{
            display: 'flex',
            gap: '12px',
            paddingTop: '20px',
            borderTop: '1px solid var(--card-border)'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                background: 'var(--bg-primary)',
                border: '1px solid var(--card-border)',
                color: 'var(--text-primary)',
                padding: '12px 20px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                background: 'var(--accent-color)',
                border: 'none',
                color: '#fff',
                padding: '12px 20px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              <i className="fa-solid fa-save" style={{ marginRight: '8px' }}></i>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentManager;
