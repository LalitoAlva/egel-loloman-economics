import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase, uploadImage, listImages } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { RichText, QuestionImage } from '../lib/renderQuestionHTML';

/**
 * ContentManager Component
 * Standalone content administration with:
 * - Drag-and-drop reordering by title
 * - Rich HTML editor with toolbar
 * - Multimedia support (audio, video, images)
 * - Tabs: Contenido de Clase, Módulos, Preguntas
 */

// Funciones utilitarias a nivel módulo (accesibles por ContentManager y todos los modals)
const stripHTMLTags = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
};

const getTipoIcon = (tipo) => {
  const icons = { guia: 'fa-solid fa-book-open', informe: 'fa-solid fa-file-lines', audio: 'fa-solid fa-headphones', video: 'fa-solid fa-video', imagen: 'fa-solid fa-image', otro: 'fa-solid fa-cube' };
  return icons[tipo] || icons.otro;
};

const getTipoBadgeColor = (tipo) => {
  const colors = { guia: '#8b5cf6', informe: '#3b82f6', audio: '#ec4899', video: '#f59e0b', imagen: '#10b981', otro: '#6b7280' };
  return colors[tipo] || colors.otro;
};

const ContentManager = ({ onBack }) => {
  const { user } = useAuth();
  const { theme } = useTheme();

  // STATE
  const [activeTab, setActiveTab] = useState('contenido');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Contenido Tab
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [contentItems, setContentItems] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');

  // Drag state
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // Módulos Tab
  const [modulesList, setModulesList] = useState([]);
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);

  // Preguntas Tab
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaFilter, setPreguntaFilter] = useState({ modulo: null, nivel: null });
  const [isPreguntaModalOpen, setIsPreguntaModalOpen] = useState(false);
  const [editingPregunta, setEditingPregunta] = useState(null);

  // AUTH CHECK
  if (user?.roles?.nombre !== 'admin') {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--error-color)' }}>
        <i className="fa-solid fa-lock" style={{ fontSize: '2rem', marginBottom: '20px', display: 'block' }}></i>
        <h2>Acceso Denegado</h2>
        <p>Solo los administradores pueden acceder a esta sección.</p>
        <button onClick={onBack} style={{ marginTop: '20px', background: 'var(--accent-color)', color: '#fff', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', border: 'none', fontSize: '1rem' }}>
          Volver
        </button>
      </div>
    );
  }

  // EFFECTS
  useEffect(() => { loadModules(); }, []);

  useEffect(() => {
    if (activeTab === 'contenido') {
      if (selectedModule) loadContent();
    } else if (activeTab === 'modulos') {
      loadModulesList();
    } else if (activeTab === 'preguntas') {
      loadPreguntas();
    }
  }, [activeTab, selectedModule]);

  useEffect(() => {
    if (successMsg) {
      const t = setTimeout(() => setSuccessMsg(null), 3000);
      return () => clearTimeout(t);
    }
  }, [successMsg]);

  // DATA LOADING
  const loadModules = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('modulos').select('*').order('numero', { ascending: true });
      if (error) throw error;
      setModules(data || []);
      if (data?.length > 0 && !selectedModule) setSelectedModule(data[0]);
    } catch (err) {
      setError('Error cargando módulos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadModulesList = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('modulos').select('*').order('numero', { ascending: true });
      if (error) throw error;
      setModulesList(data || []);
    } catch (err) {
      setError('Error cargando módulos: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadContent = async () => {
    if (!selectedModule) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contenido_clase').select('*').eq('modulo_id', selectedModule.id)
        .order('orden', { ascending: true });
      if (error) throw error;
      setContentItems(data || []);
    } catch (err) {
      setError('Error cargando contenido: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadPreguntas = async () => {
    try {
      setLoading(true);
      let query = supabase.from('preguntas').select('*');
      if (preguntaFilter.modulo) query = query.eq('modulo_id', preguntaFilter.modulo);
      if (preguntaFilter.nivel) query = query.eq('nivel', preguntaFilter.nivel);
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      setPreguntas(data || []);
    } catch (err) {
      setError('Error cargando preguntas: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // CONTENT HELPERS
  const parseMediaFromContent = (contenido) => {
    if (!contenido) return { text: '', media: {} };
    const sep = '\n\n---MEDIA---\n';
    const parts = contenido.split(sep);
    let media = {};
    if (parts[1]) { try { media = JSON.parse(parts[1]); } catch (e) {} }
    return { text: parts[0], media };
  };

  const buildContentWithMedia = (text, media) => {
    if (!media || (!media.audio_url && !media.video_url && !media.imagen_url)) return text;
    return `${text}\n\n---MEDIA---\n${JSON.stringify(media)}`;
  };

  const getTipoOptions = () => [
    { value: 'guia', label: 'Guía' }, { value: 'informe', label: 'Informe' },
    { value: 'audio', label: 'Audio' }, { value: 'video', label: 'Video' },
    { value: 'imagen', label: 'Imagen' }, { value: 'otro', label: 'Otro' }
  ];

  const getFilteredContent = () => {
    let filtered = [...contentItems];
    if (typeFilter !== 'all') filtered = filtered.filter(item => item.tipo === typeFilter);
    filtered.sort((a, b) => a.orden - b.orden);
    return filtered;
  };

  // DRAG AND DROP
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
    setTimeout(() => { if (e.target) e.target.style.opacity = '0.4'; }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (index !== dragOverIndex) setDragOverIndex(index);
  };

  const handleDragLeave = () => { setDragOverIndex(null); };

  const handleDrop = async (e, dropIndex) => {
    e.preventDefault();
    const fromIndex = draggedIndex;
    if (fromIndex === null || fromIndex === dropIndex) {
      setDraggedIndex(null); setDragOverIndex(null); return;
    }
    const filtered = getFilteredContent();
    const newItems = [...filtered];
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(dropIndex, 0, movedItem);
    const updates = newItems.map((item, idx) => ({ ...item, orden: idx + 1 }));
    setContentItems(prev => {
      const map = new Map(updates.map(u => [u.id, u.orden]));
      return prev.map(item => map.has(item.id) ? { ...item, orden: map.get(item.id) } : item);
    });
    setDraggedIndex(null); setDragOverIndex(null);
    try {
      for (const item of updates) {
        await supabase.from('contenido_clase').update({ orden: item.orden }).eq('id', item.id);
      }
      setSuccessMsg('Orden actualizado correctamente');
    } catch (err) { setError('Error al reordenar: ' + err.message); }
  };

  const handleAutoReorder = async () => {
    if (!window.confirm('¿Reordenar items de 1 a N?')) return;
    const filtered = getFilteredContent();
    const updates = filtered.map((item, idx) => ({ ...item, orden: idx + 1 }));
    setContentItems(prev => {
      const map = new Map(updates.map(u => [u.id, u.orden]));
      return prev.map(item => map.has(item.id) ? { ...item, orden: map.get(item.id) } : item);
    });
    try {
      for (const u of updates) await supabase.from('contenido_clase').update({ orden: u.orden }).eq('id', u.id);
      setSuccessMsg('Reordenamiento completado');
    } catch (err) { setError('Error al reordenar: ' + err.message); }
  };

  // CONTENT CRUD
  const handleAddContent = () => {
    setEditingItem({ id: null, modulo_id: selectedModule.id, orden: contentItems.length + 1, tipo: 'guia', titulo: '', contenido: '' });
    setIsEditModalOpen(true);
  };

  const handleEditContent = (item) => { setEditingItem(item); setIsEditModalOpen(true); };

  const handleDeleteContent = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este contenido?')) return;
    try {
      const { error } = await supabase.from('contenido_clase').delete().eq('id', id);
      if (error) throw error;
      const remaining = contentItems.filter(item => item.id !== id);
      const reordered = remaining.map((item, idx) => ({ ...item, orden: idx + 1 }));
      setContentItems(reordered);
      for (const r of reordered) await supabase.from('contenido_clase').update({ orden: r.orden }).eq('id', r.id);
      setSuccessMsg('Contenido eliminado');
    } catch (err) { setError('Error eliminando contenido: ' + err.message); }
  };

  const handleSaveContent = async (itemData) => {
    try {
      const { text, audio_url, video_url, imagen_url } = itemData;
      const media = { audio_url, video_url, imagen_url };
      const contenido = buildContentWithMedia(text, media);
      if (itemData.id) {
        const { error } = await supabase.from('contenido_clase')
          .update({ tipo: itemData.tipo, titulo: itemData.titulo, contenido, orden: itemData.orden }).eq('id', itemData.id);
        if (error) throw error;
        setContentItems(prev => prev.map(item => item.id === itemData.id ? { ...item, ...itemData, contenido } : item));
      } else {
        const { data, error } = await supabase.from('contenido_clase')
          .insert([{ modulo_id: selectedModule.id, tipo: itemData.tipo, titulo: itemData.titulo, contenido, orden: itemData.orden }]).select();
        if (error) throw error;
        setContentItems(prev => [...prev, data[0]]);
      }
      setIsEditModalOpen(false); setEditingItem(null);
      setSuccessMsg('Contenido guardado correctamente');
    } catch (err) { setError('Error guardando contenido: ' + err.message); }
  };

  // MODULE CRUD
  const handleAddModule = () => {
    setEditingModule({ titulo: '', descripcion: '', numero: modulesList.length + 1, color: '#a855f7', icon: 'fa-solid fa-book', audio_url: '', infografia_url: '' });
    setIsModuleModalOpen(true);
  };

  const handleEditModuleItem = (module) => { setEditingModule(module); setIsModuleModalOpen(true); };

  const handleSaveModule = async (moduleData) => {
    try {
      if (moduleData.id) {
        const { error } = await supabase.from('modulos')
          .update({ titulo: moduleData.titulo, descripcion: moduleData.descripcion, color: moduleData.color, icon: moduleData.icon, audio_url: moduleData.audio_url || null, infografia_url: moduleData.infografia_url || null, activo: moduleData.activo !== undefined ? moduleData.activo : true })
          .eq('id', moduleData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('modulos')
          .insert([{ titulo: moduleData.titulo, descripcion: moduleData.descripcion, numero: moduleData.numero, color: moduleData.color, icon: moduleData.icon, slug: moduleData.titulo.toLowerCase().replace(/ /g, '-'), activo: true, audio_url: moduleData.audio_url || null, infografia_url: moduleData.infografia_url || null }]);
        if (error) throw error;
      }
      loadModulesList(); loadModules();
      setIsModuleModalOpen(false); setEditingModule(null);
      setSuccessMsg('Módulo guardado');
    } catch (err) { setError('Error guardando módulo: ' + err.message); }
  };

  const handleToggleModuleActive = async (moduleId, currentStatus) => {
    try {
      const { error } = await supabase.from('modulos').update({ activo: !currentStatus }).eq('id', moduleId);
      if (error) throw error;
      loadModulesList();
    } catch (err) { setError('Error actualizando módulo: ' + err.message); }
  };

  const handleDeleteModule = async (moduleId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este módulo?')) return;
    try {
      const { error } = await supabase.from('modulos').delete().eq('id', moduleId);
      if (error) throw error;
      loadModulesList(); loadModules();
      setSuccessMsg('Módulo eliminado');
    } catch (err) { setError('Error eliminando módulo: ' + err.message); }
  };

  // PREGUNTA CRUD
  const handleAddPregunta = () => {
    setEditingPregunta({ pregunta: '', subtema: '', nivel: 'basico', tema: '', opcion_a: '', opcion_b: '', opcion_c: '', opcion_d: '', respuesta_correcta: 'a', explicacion: '', formula: '', imagen_url: '', modulo_id: preguntaFilter.modulo || (modules[0]?.id) });
    setIsPreguntaModalOpen(true);
  };

  const handleEditPreguntaItem = (pregunta) => { setEditingPregunta(pregunta); setIsPreguntaModalOpen(true); };

  const handleSavePregunta = async (preguntaData) => {
    try {
      if (preguntaData.id) {
        const { error } = await supabase.from('preguntas')
          .update({ pregunta: preguntaData.pregunta, subtema: preguntaData.subtema, nivel: preguntaData.nivel, tema: preguntaData.tema, opcion_a: preguntaData.opcion_a, opcion_b: preguntaData.opcion_b, opcion_c: preguntaData.opcion_c, opcion_d: preguntaData.opcion_d, respuesta_correcta: preguntaData.respuesta_correcta, explicacion: preguntaData.explicacion, formula: preguntaData.formula || null, imagen_url: preguntaData.imagen_url || null, modulo_id: preguntaData.modulo_id, activo: preguntaData.activo !== undefined ? preguntaData.activo : true })
          .eq('id', preguntaData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('preguntas')
          .insert([{ pregunta: preguntaData.pregunta, subtema: preguntaData.subtema, nivel: preguntaData.nivel, tema: preguntaData.tema, opcion_a: preguntaData.opcion_a, opcion_b: preguntaData.opcion_b, opcion_c: preguntaData.opcion_c, opcion_d: preguntaData.opcion_d, respuesta_correcta: preguntaData.respuesta_correcta, explicacion: preguntaData.explicacion, formula: preguntaData.formula || null, imagen_url: preguntaData.imagen_url || null, modulo_id: preguntaData.modulo_id, activo: true }]);
        if (error) throw error;
      }
      loadPreguntas(); setIsPreguntaModalOpen(false); setEditingPregunta(null);
      setSuccessMsg('Pregunta guardada');
    } catch (err) { setError('Error guardando pregunta: ' + err.message); }
  };

  const handleDeletePregunta = async (preguntaId) => {
    if (!window.confirm('¿Eliminar esta pregunta?')) return;
    try {
      const { error } = await supabase.from('preguntas').delete().eq('id', preguntaId);
      if (error) throw error;
      loadPreguntas(); setSuccessMsg('Pregunta eliminada');
    } catch (err) { setError('Error eliminando pregunta: ' + err.message); }
  };

  // Shared styles
  const inputStyle = { width: '100%', background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)', padding: '12px 15px', borderRadius: '10px', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600', fontSize: '0.95rem' };
  const btnPrimary = { background: 'var(--accent-color)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.3s' };
  const btnSuccess = { ...btnPrimary, background: 'var(--success-color)' };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '40px 20px' }}>
      {/* HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', maxWidth: '1400px', margin: '0 auto 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button onClick={onBack} style={{ background: 'transparent', border: '2px solid var(--accent-color)', color: 'var(--accent-color)', width: '50px', height: '50px', borderRadius: '50%', fontSize: '1.3rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
            onMouseEnter={(e) => { e.target.style.background = 'var(--accent-color)'; e.target.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--accent-color)'; }}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h1 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '2rem' }}>
              <i className="fa-solid fa-sliders" style={{ marginRight: '12px', color: 'var(--accent-color)' }}></i>
              Administración de Contenido
            </h1>
            <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Gestiona módulos, contenido y preguntas de EGEL</p>
          </div>
        </div>
      </div>

      {/* MESSAGES */}
      {error && (
        <div style={{ maxWidth: '1400px', margin: '0 auto 20px', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid var(--error-color)', color: 'var(--error-color)', padding: '15px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-circle-exclamation"></i><span>{error}</span>
          <button onClick={() => setError(null)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: 'var(--error-color)', cursor: 'pointer', fontSize: '1rem' }}><i className="fa-solid fa-xmark"></i></button>
        </div>
      )}
      {successMsg && (
        <div style={{ maxWidth: '1400px', margin: '0 auto 20px', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid var(--success-color)', color: 'var(--success-color)', padding: '15px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <i className="fa-solid fa-circle-check"></i><span>{successMsg}</span>
        </div>
      )}

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* TABS */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '30px', borderBottom: '1px solid var(--card-border)', flexWrap: 'wrap' }}>
          {[
            { id: 'contenido', label: 'Contenido de Clase', icon: 'fa-solid fa-book-open', count: selectedModule ? contentItems.length : 0 },
            { id: 'modulos', label: 'Módulos', icon: 'fa-solid fa-cubes', count: modulesList.length },
            { id: 'preguntas', label: 'Preguntas', icon: 'fa-solid fa-question', count: preguntas.length }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ padding: '12px 24px', background: activeTab === tab.id ? 'var(--accent-color)' : 'transparent', color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)', border: activeTab === tab.id ? 'none' : '1px solid var(--card-border)', borderBottom: 'none', borderRadius: '8px 8px 0 0', cursor: 'pointer', fontSize: '1rem', fontWeight: '600', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className={tab.icon}></i>{tab.label}
              <span style={{ background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700' }}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: CONTENIDO */}
        {activeTab === 'contenido' && (
          <div>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '25px', marginBottom: '30px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', alignItems: 'end' }}>
                <div>
                  <label style={{ ...labelStyle, textTransform: 'uppercase', letterSpacing: '0.5px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <i className="fa-solid fa-folder-open" style={{ marginRight: '8px' }}></i>Selecciona un Módulo
                  </label>
                  <select value={selectedModule?.id || ''} onChange={(e) => { const m = modules.find(mod => mod.id === parseInt(e.target.value)); setSelectedModule(m); }} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {modules.map(mod => (<option key={mod.id} value={mod.id}>{mod.numero}. {mod.titulo}</option>))}
                  </select>
                </div>
                <button onClick={handleAddContent} style={{ ...btnSuccess, height: '44px' }}>
                  <i className="fa-solid fa-plus"></i> Agregar Contenido
                </button>
              </div>
            </div>

            {selectedModule && (
              <div>
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '20px', marginBottom: '25px', display: 'flex', gap: '16px', alignItems: 'end', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 200px' }}>
                    <label style={{ ...labelStyle, fontSize: '0.85rem', color: 'var(--text-secondary)' }}><i className="fa-solid fa-filter" style={{ marginRight: '6px' }}></i> Filtrar Tipo</label>
                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={{ ...inputStyle, cursor: 'pointer', padding: '10px 12px' }}>
                      <option value="all">Todos</option>
                      {getTipoOptions().map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                    </select>
                  </div>
                  <button onClick={handleAutoReorder} style={{ background: 'var(--warning-color)', color: '#000', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="fa-solid fa-shuffle"></i> Auto-reordenar
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.5rem' }}>
                    <i className="fa-solid fa-list" style={{ marginRight: '12px', color: 'var(--accent-color)' }}></i>Contenido
                  </h2>
                  <span style={{ background: 'var(--accent-color)', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600' }}>{contentItems.length}</span>
                  <span style={{ marginLeft: 'auto', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    <i className="fa-solid fa-grip-vertical" style={{ marginRight: '4px' }}></i> Arrastra para reordenar
                  </span>
                </div>

                {loading ? (
                  <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2.5rem', marginBottom: '20px', display: 'block', color: 'var(--accent-color)' }}></i><p>Cargando contenido...</p>
                  </div>
                ) : contentItems.length === 0 ? (
                  <div style={{ background: 'var(--bg-secondary)', border: '2px dashed var(--card-border)', borderRadius: '16px', padding: '60px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <i className="fa-solid fa-inbox" style={{ fontSize: '3rem', marginBottom: '15px', display: 'block', opacity: '0.5' }}></i>
                    <p style={{ fontSize: '1.1rem', margin: 0 }}>No hay contenido en este módulo</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {getFilteredContent().map((item, index) => {
                      const { text, media } = parseMediaFromContent(item.contenido);
                      const isDragging = draggedIndex === index;
                      const isDragOver = dragOverIndex === index;
                      return (
                        <div key={item.id} draggable
                          onDragStart={(e) => handleDragStart(e, index)} onDragEnd={handleDragEnd}
                          onDragOver={(e) => handleDragOver(e, index)} onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, index)}
                          style={{ background: isDragOver ? 'rgba(168, 85, 247, 0.1)' : 'var(--bg-secondary)', border: isDragOver ? '2px dashed var(--accent-color)' : '1px solid var(--card-border)', borderRadius: '12px', padding: '14px 16px', display: 'grid', gridTemplateColumns: '40px 50px 1fr auto', gap: '16px', alignItems: 'center', opacity: isDragging ? 0.4 : 1, transition: 'all 0.15s', cursor: 'grab' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '1.2rem', cursor: 'grab' }}>
                            <i className="fa-solid fa-grip-vertical"></i>
                          </div>
                          <div style={{ background: 'var(--accent-color)', color: '#fff', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 'bold', flexShrink: 0 }}>{item.orden}</div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                              <span style={{ background: getTipoBadgeColor(item.tipo), color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <i className={getTipoIcon(item.tipo)}></i> {item.tipo}
                              </span>
                              {media?.audio_url && <span style={{ color: '#ec4899', fontSize: '0.8rem' }}><i className="fa-solid fa-headphones"></i></span>}
                              {media?.video_url && <span style={{ color: '#f59e0b', fontSize: '0.8rem' }}><i className="fa-solid fa-video"></i></span>}
                              {(media?.imagen_url || item.imagen_url) && <span style={{ color: '#10b981', fontSize: '0.8rem' }}><i className="fa-solid fa-image"></i></span>}
                            </div>
                            <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1rem', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.titulo}</h3>
                            <p style={{ margin: '2px 0 0', color: 'var(--text-secondary)', fontSize: '0.8rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{stripHTMLTags(text).substring(0, 120)}</p>
                          </div>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button onClick={(e) => { e.stopPropagation(); handleEditContent(item); }} style={{ background: 'var(--accent-color)', color: '#fff', border: 'none', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }} title="Editar">
                              <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); handleDeleteContent(item.id); }} style={{ background: 'var(--error-color)', color: '#fff', border: 'none', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }} title="Eliminar">
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

        {/* TAB 2: MÓDULOS */}
        {activeTab === 'modulos' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.5rem' }}>
                <i className="fa-solid fa-cubes" style={{ marginRight: '12px', color: 'var(--accent-color)' }}></i>Módulos
              </h2>
              <button onClick={handleAddModule} style={btnSuccess}><i className="fa-solid fa-plus"></i> Agregar Módulo</button>
            </div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
                <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2.5rem', marginBottom: '20px', display: 'block', color: 'var(--accent-color)' }}></i>Cargando módulos...
              </div>
            ) : modulesList.length === 0 ? (
              <div style={{ background: 'var(--bg-secondary)', border: '2px dashed var(--card-border)', borderRadius: '16px', padding: '60px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <p style={{ fontSize: '1.1rem', margin: 0 }}>No hay módulos creados</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {modulesList.map(module => (
                  <div key={module.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '20px', transition: 'all 0.3s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.3)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                      <div style={{ width: '50px', height: '50px', background: module.color || 'var(--accent-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.5rem', flexShrink: 0 }}>
                        <i className={module.icon || 'fa-solid fa-book'}></i>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ margin: '0 0 4px', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '700' }}>{module.numero}. {module.titulo}</h3>
                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{module.descripcion}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                      <span style={{ background: module.activo ? 'rgba(74, 222, 128, 0.2)' : 'rgba(244, 63, 94, 0.2)', color: module.activo ? '#4ade80' : '#f87171', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600' }}>{module.activo ? 'Activo' : 'Inactivo'}</span>
                      {module.infografia_url && <span style={{ background: 'rgba(59,130,246,0.2)', color: '#3b82f6', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem' }}><i className="fa-solid fa-image" style={{ marginRight: '4px' }}></i>Infografía</span>}
                      {module.audio_url && <span style={{ background: 'rgba(236,72,153,0.2)', color: '#ec4899', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem' }}><i className="fa-solid fa-headphones" style={{ marginRight: '4px' }}></i>Audio</span>}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--card-border)' }}>
                      <button onClick={() => handleEditModuleItem(module)} style={{ flex: 1, background: 'var(--accent-color)', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}><i className="fa-solid fa-pen-to-square"></i> Editar</button>
                      <button onClick={() => handleToggleModuleActive(module.id, module.activo)} style={{ flex: 1, background: module.activo ? 'rgba(244, 63, 94, 0.2)' : 'rgba(74, 222, 128, 0.2)', color: module.activo ? '#f87171' : '#4ade80', border: '1px solid currentColor', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}>
                        <i className={`fa-solid ${module.activo ? 'fa-ban' : 'fa-check'}`}></i>{module.activo ? ' Desactivar' : ' Activar'}
                      </button>
                      <button onClick={() => handleDeleteModule(module.id)} style={{ background: 'var(--error-color)', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', width: '44px' }}><i className="fa-solid fa-trash"></i></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PREGUNTAS */}
        {activeTab === 'preguntas' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.5rem' }}><i className="fa-solid fa-question" style={{ marginRight: '12px', color: 'var(--accent-color)' }}></i>Preguntas</h2>
              <button onClick={handleAddPregunta} style={btnSuccess}><i className="fa-solid fa-plus"></i> Agregar Pregunta</button>
            </div>
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', borderRadius: '16px', padding: '20px', marginBottom: '25px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
              <div>
                <label style={{ ...labelStyle, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Módulo</label>
                <select value={preguntaFilter.modulo || ''} onChange={(e) => setPreguntaFilter(prev => ({ ...prev, modulo: e.target.value ? parseInt(e.target.value) : null }))} style={{ ...inputStyle, cursor: 'pointer', padding: '10px 12px' }}>
                  <option value="">Todos</option>
                  {modules.map(mod => (<option key={mod.id} value={mod.id}>{mod.titulo}</option>))}
                </select>
              </div>
              <div>
                <label style={{ ...labelStyle, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Nivel</label>
                <select value={preguntaFilter.nivel || ''} onChange={(e) => setPreguntaFilter(prev => ({ ...prev, nivel: e.target.value || null }))} style={{ ...inputStyle, cursor: 'pointer', padding: '10px 12px' }}>
                  <option value="">Todos</option>
                  <option value="basico">Básico</option><option value="intermedio">Intermedio</option><option value="avanzado">Avanzado</option>
                </select>
              </div>
              <button onClick={loadPreguntas} style={{ ...btnPrimary, padding: '10px 20px' }}><i className="fa-solid fa-magnifying-glass"></i> Buscar</button>
            </div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}><i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2.5rem', display: 'block', color: 'var(--accent-color)' }}></i></div>
            ) : preguntas.length === 0 ? (
              <div style={{ background: 'var(--bg-secondary)', border: '2px dashed var(--card-border)', borderRadius: '16px', padding: '60px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}><p style={{ fontSize: '1.1rem', margin: 0 }}>No hay preguntas</p></div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {preguntas.map(pregunta => (
                  <div key={pregunta.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '16px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'start' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <span style={{ background: pregunta.nivel === 'basico' ? '#22c55e' : pregunta.nivel === 'intermedio' ? '#eab308' : '#ef4444', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '600', textTransform: 'uppercase' }}>{pregunta.nivel}</span>
                        {pregunta.tipo && <span style={{ background: 'rgba(168,85,247,0.2)', color: '#a855f7', padding: '3px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '600' }}>{pregunta.tipo}</span>}
                        {pregunta.subtema && <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{pregunta.subtema}</span>}
                      </div>
                      <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.4', maxHeight: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pregunta.pregunta}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => handleEditPreguntaItem(pregunta)} style={{ background: 'var(--accent-color)', color: '#fff', border: 'none', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Editar"><i className="fa-solid fa-pen-to-square"></i></button>
                      <button onClick={() => handleDeletePregunta(pregunta.id)} style={{ background: 'var(--error-color)', color: '#fff', border: 'none', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Eliminar"><i className="fa-solid fa-trash"></i></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODALS */}
      {isEditModalOpen && editingItem && <ContentEditModal item={editingItem} tipoOptions={getTipoOptions()} onSave={handleSaveContent} onClose={() => { setIsEditModalOpen(false); setEditingItem(null); }} />}
      {isModuleModalOpen && editingModule && <ModuleEditModal module={editingModule} onSave={handleSaveModule} onClose={() => { setIsModuleModalOpen(false); setEditingModule(null); }} />}
      {isPreguntaModalOpen && editingPregunta && <PreguntaEditModal pregunta={editingPregunta} modules={modules} onSave={handleSavePregunta} onClose={() => { setIsPreguntaModalOpen(false); setEditingPregunta(null); }} />}
    </div>
  );
};

// ============================================
// RICH HTML EDITOR
// ============================================
const RichHTMLEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const [showSource, setShowSource] = useState(false);
  const [sourceCode, setSourceCode] = useState(value || '');

  useEffect(() => {
    if (editorRef.current && !showSource && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
      // Agregar onerror a todas las imágenes dentro del editor
      fixBrokenImages(editorRef.current);
    }
  }, [value, showSource]);

  // Arreglar imágenes rotas en el editor: ocultar las que no cargan
  const fixBrokenImages = (container) => {
    if (!container) return;
    const imgs = container.querySelectorAll('img');
    imgs.forEach(img => {
      const src = img.getAttribute('src');
      if (!src || src === 'null' || src === 'undefined' || src.trim() === '') {
        img.style.display = 'none';
        return;
      }
      img.onerror = () => { img.style.display = 'none'; };
    });
  };

  const execCmd = (command, val = null) => {
    document.execCommand(command, false, val);
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const handleInput = () => { if (editorRef.current) { fixBrokenImages(editorRef.current); onChange(editorRef.current.innerHTML); } };

  // Interceptar pegado: limpiar imágenes base64 para no inflar la BD
  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    // Detectar si se está pegando una imagen
    let hasImage = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) { hasImage = true; break; }
    }

    if (hasImage) {
      e.preventDefault();
      // Insertar placeholder con instrucción
      const notice = document.createElement('p');
      notice.style.color = '#f59e0b';
      notice.style.fontStyle = 'italic';
      notice.style.fontSize = '0.85rem';
      notice.textContent = '⚠️ No se pueden pegar imágenes directamente. Usa el botón 🖼️ de la barra o la pestaña Multimedia para agregar imágenes por URL.';
      const sel = window.getSelection();
      if (sel.rangeCount) {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(notice);
        range.setStartAfter(notice);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
      if (editorRef.current) onChange(editorRef.current.innerHTML);
      // Remover el aviso después de 4 segundos
      setTimeout(() => { if (notice.parentNode) notice.parentNode.removeChild(notice); if (editorRef.current) onChange(editorRef.current.innerHTML); }, 4000);
      return;
    }

    // Para texto pegado: limpiar posibles imágenes base64 embebidas
    const html = e.clipboardData.getData('text/html');
    if (html && html.includes('data:image')) {
      e.preventDefault();
      // Insertar solo texto plano sin imágenes base64
      const plainText = e.clipboardData.getData('text/plain');
      document.execCommand('insertText', false, plainText);
      if (editorRef.current) onChange(editorRef.current.innerHTML);
    }
  };

  const toggleSource = () => {
    if (showSource) { if (editorRef.current) editorRef.current.innerHTML = sourceCode; }
    else { setSourceCode(editorRef.current?.innerHTML || value || ''); }
    setShowSource(!showSource);
  };

  const insertLink = () => { const url = prompt('URL del enlace:'); if (url) execCmd('createLink', url); };
  const insertImage = () => { const url = prompt('URL de la imagen:'); if (url) execCmd('insertImage', url); };
  const insertVideo = () => {
    const url = prompt('URL del video (YouTube, Vimeo, etc.):');
    if (url) {
      let embedUrl = url;
      const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
      if (ytMatch) embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
      execCmd('insertHTML', `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:10px 0"><iframe src="${embedUrl}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allowfullscreen></iframe></div>`);
    }
  };
  const insertAudio = () => { const url = prompt('URL del audio:'); if (url) execCmd('insertHTML', `<audio controls src="${url}" style="width:100%;margin:10px 0"></audio>`); };

  const tbtn = { background: 'var(--bg-primary)', border: '1px solid var(--card-border)', color: 'var(--text-primary)', width: '34px', height: '34px', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', transition: 'all 0.15s', flexShrink: 0 };
  const sep = { width: '1px', height: '24px', background: 'var(--card-border)', margin: '0 4px' };

  return (
    <div style={{ border: '1px solid var(--input-border)', borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--input-border)', padding: '8px', display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'center' }}>
        <button type="button" onClick={() => execCmd('bold')} style={tbtn} title="Negrita"><i className="fa-solid fa-bold"></i></button>
        <button type="button" onClick={() => execCmd('italic')} style={tbtn} title="Cursiva"><i className="fa-solid fa-italic"></i></button>
        <button type="button" onClick={() => execCmd('underline')} style={tbtn} title="Subrayado"><i className="fa-solid fa-underline"></i></button>
        <div style={sep}></div>
        <button type="button" onClick={() => execCmd('formatBlock', 'h1')} style={tbtn} title="H1"><strong style={{ fontSize: '0.7rem' }}>H1</strong></button>
        <button type="button" onClick={() => execCmd('formatBlock', 'h2')} style={tbtn} title="H2"><strong style={{ fontSize: '0.7rem' }}>H2</strong></button>
        <button type="button" onClick={() => execCmd('formatBlock', 'h3')} style={tbtn} title="H3"><strong style={{ fontSize: '0.7rem' }}>H3</strong></button>
        <button type="button" onClick={() => execCmd('formatBlock', 'p')} style={tbtn} title="Párrafo"><i className="fa-solid fa-paragraph"></i></button>
        <div style={sep}></div>
        <button type="button" onClick={() => execCmd('insertUnorderedList')} style={tbtn} title="Lista"><i className="fa-solid fa-list-ul"></i></button>
        <button type="button" onClick={() => execCmd('insertOrderedList')} style={tbtn} title="Lista numerada"><i className="fa-solid fa-list-ol"></i></button>
        <div style={sep}></div>
        <button type="button" onClick={insertLink} style={tbtn} title="Enlace"><i className="fa-solid fa-link"></i></button>
        <button type="button" onClick={insertImage} style={tbtn} title="Imagen"><i className="fa-solid fa-image"></i></button>
        <button type="button" onClick={insertVideo} style={tbtn} title="Video"><i className="fa-solid fa-video"></i></button>
        <button type="button" onClick={insertAudio} style={tbtn} title="Audio"><i className="fa-solid fa-headphones"></i></button>
        <div style={sep}></div>
        <button type="button" onClick={() => execCmd('formatBlock', 'pre')} style={tbtn} title="Código"><i className="fa-solid fa-code"></i></button>
        <button type="button" onClick={() => execCmd('removeFormat')} style={tbtn} title="Limpiar formato"><i className="fa-solid fa-eraser"></i></button>
        <div style={{ marginLeft: 'auto' }}>
          <button type="button" onClick={toggleSource} style={{ ...tbtn, width: 'auto', padding: '0 10px', background: showSource ? 'var(--accent-color)' : 'var(--bg-primary)', color: showSource ? '#fff' : 'var(--text-primary)' }} title="Ver HTML">
            <i className="fa-solid fa-file-code" style={{ marginRight: '4px' }}></i>HTML
          </button>
        </div>
      </div>
      {showSource ? (
        <textarea value={sourceCode} onChange={(e) => { setSourceCode(e.target.value); onChange(e.target.value); }}
          style={{ width: '100%', minHeight: '300px', background: 'var(--input-bg)', color: '#4ade80', border: 'none', padding: '16px', fontSize: '0.9rem', fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box', outline: 'none' }} />
      ) : (
        <div ref={editorRef} contentEditable onInput={handleInput} onPaste={handlePaste} suppressContentEditableWarning
          style={{ minHeight: '300px', background: 'var(--input-bg)', color: 'var(--text-primary)', padding: '16px', fontSize: '1rem', lineHeight: '1.6', outline: 'none', overflow: 'auto', maxHeight: '500px' }} />
      )}
    </div>
  );
};

// ============================================
// IMAGE PICKER — Upload + Browse from Supabase Storage
// ============================================
const ImagePickerButton = ({ onUploaded, folder = 'contenido', label = 'Subir imagen' }) => {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [browseFolder, setBrowseFolder] = useState(folder);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('Solo se permiten archivos de imagen'); return; }
    if (file.size > 5 * 1024 * 1024) { alert('La imagen no debe exceder 5 MB'); return; }
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      if (url) onUploaded(url);
    } catch (err) {
      alert('Error al subir imagen: ' + err.message);
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const openBrowser = async () => {
    setShowBrowser(true);
    await loadImages(browseFolder);
  };

  const loadImages = async (f) => {
    setLoadingImages(true);
    const imgs = await listImages(f);
    setImages(imgs);
    setLoadingImages(false);
  };

  const selectImage = (url) => {
    onUploaded(url);
    setShowBrowser(false);
  };

  const formatSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
        <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
          style={{ padding: '8px 16px', background: uploading ? 'var(--card-border)' : 'var(--accent-color)', color: '#fff', border: 'none', borderRadius: '8px', cursor: uploading ? 'wait' : 'pointer', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <i className={uploading ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-cloud-arrow-up'}></i>
          {uploading ? 'Subiendo...' : label}
        </button>
        <button type="button" onClick={openBrowser}
          style={{ padding: '8px 16px', background: 'var(--bg-primary)', color: 'var(--accent-color)', border: '1px solid var(--accent-color)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <i className="fa-solid fa-images"></i> Galería
        </button>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Máx 5 MB</span>
      </div>

      {/* Image Browser Modal */}
      {showBrowser && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, padding: '20px', backdropFilter: 'blur(4px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowBrowser(false); }}>
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', borderRadius: '16px', maxWidth: '800px', width: '100%', maxHeight: '80vh', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
            {/* Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div>
                <h3 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: '700' }}>
                  <i className="fa-solid fa-images" style={{ marginRight: '10px', color: 'var(--accent-color)' }}></i>Galería de Imágenes
                </h3>
                <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Selecciona una imagen existente o sube una nueva</p>
              </div>
              <button onClick={() => setShowBrowser(false)} style={{ background: 'var(--bg-primary)', border: '1px solid var(--card-border)', color: 'var(--text-primary)', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Folder tabs */}
            <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--card-border)', display: 'flex', gap: '8px', flexShrink: 0 }}>
              {[{ id: 'contenido', label: 'Contenido', icon: 'fa-solid fa-book-open' },
                { id: 'preguntas', label: 'Preguntas', icon: 'fa-solid fa-question' },
                { id: 'modulos', label: 'Módulos', icon: 'fa-solid fa-cubes' }
              ].map(f => (
                <button key={f.id} type="button" onClick={() => { setBrowseFolder(f.id); loadImages(f.id); }}
                  style={{ padding: '6px 14px', borderRadius: '6px', border: browseFolder === f.id ? 'none' : '1px solid var(--card-border)', cursor: 'pointer', background: browseFolder === f.id ? 'var(--accent-color)' : 'var(--bg-primary)', color: browseFolder === f.id ? '#fff' : 'var(--text-secondary)', fontWeight: '600', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className={f.icon}></i> {f.label}
                </button>
              ))}
              <div style={{ marginLeft: 'auto' }}>
                <button type="button" onClick={() => loadImages(browseFolder)} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--card-border)', cursor: 'pointer', background: 'var(--bg-primary)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <i className="fa-solid fa-arrows-rotate"></i>
                </button>
              </div>
            </div>

            {/* Image grid */}
            <div style={{ padding: '20px 24px', overflow: 'auto', flex: 1 }}>
              {loadingImages ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                  <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2rem', display: 'block', marginBottom: '12px', color: 'var(--accent-color)' }}></i>
                  Cargando imágenes...
                </div>
              ) : images.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                  <i className="fa-solid fa-folder-open" style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px', opacity: 0.4 }}></i>
                  <p style={{ margin: 0, fontSize: '1rem' }}>No hay imágenes en esta carpeta</p>
                  <p style={{ margin: '6px 0 0', fontSize: '0.85rem', opacity: 0.7 }}>Sube una imagen con el botón de arriba</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
                  {images.map((img, idx) => (
                    <div key={idx} onClick={() => selectImage(img.url)}
                      style={{ cursor: 'pointer', borderRadius: '10px', border: '2px solid var(--card-border)', overflow: 'hidden', transition: 'all 0.2s', background: 'var(--bg-primary)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-color)'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.transform = 'scale(1)'; }}>
                      <div style={{ width: '100%', paddingBottom: '100%', position: 'relative', background: 'var(--bg-primary)' }}>
                        <img src={img.url} alt={img.name}
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<div style="position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#6b7280"><i class="fa-solid fa-image-slash" style="font-size:1.5rem"></i></div>'; }} />
                      </div>
                      <div style={{ padding: '6px 8px' }}>
                        <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{img.name}</p>
                        {img.size > 0 && <p style={{ margin: '2px 0 0', fontSize: '0.65rem', color: 'var(--text-secondary)', opacity: 0.6 }}>{formatSize(img.size)}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ============================================
// CONTENT EDIT MODAL
// ============================================
const ContentEditModal = ({ item, tipoOptions, onSave, onClose }) => {
  const [formData, setFormData] = useState(() => {
    const sep = '\n\n---MEDIA---\n';
    const parts = (item.contenido || '').split(sep);
    let media = {};
    if (parts[1]) { try { media = JSON.parse(parts[1]); } catch (e) {} }
    return { ...item, text: parts[0] || '', audio_url: media?.audio_url || item.audio_url || '', video_url: media?.video_url || item.video_url || '', imagen_url: media?.imagen_url || item.imagen_url || '' };
  });
  const [activeSection, setActiveSection] = useState('editor');
  const handleFieldChange = (field, value) => { setFormData(prev => ({ ...prev, [field]: value })); };
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
  const inputStyle = { width: '100%', background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)', padding: '12px 15px', borderRadius: '10px', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600', fontSize: '0.95rem' };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px', backdropFilter: 'blur(4px)' }}>
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', borderRadius: '16px', maxWidth: '900px', width: '100%', maxHeight: '95vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%)', color: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700', color: '#fff' }}>{item.id ? 'Editar Contenido' : 'Nuevo Contenido'}</h2>
            <p style={{ margin: '4px 0 0', opacity: 0.9, fontSize: '0.9rem', color: '#fff' }}>Editor HTML con soporte multimedia</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', width: '40px', height: '40px', borderRadius: '8px', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-xmark"></i></button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={labelStyle}><i className="fa-solid fa-heading" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>Título</label>
              <input type="text" value={formData.titulo} onChange={(e) => handleFieldChange('titulo', e.target.value)} placeholder="Título del contenido" style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}><i className="fa-solid fa-sort-numeric-up" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>Orden</label>
              <input type="number" value={formData.orden} onChange={(e) => handleFieldChange('orden', parseInt(e.target.value))} min="1" style={inputStyle} />
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}><i className="fa-solid fa-tag" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>Tipo</label>
            <select value={formData.tipo} onChange={(e) => handleFieldChange('tipo', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              {tipoOptions.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {[{ id: 'editor', label: 'Editor HTML', icon: 'fa-solid fa-pen-fancy' }, { id: 'media', label: 'Multimedia', icon: 'fa-solid fa-photo-film' }, { id: 'preview', label: 'Vista Previa', icon: 'fa-solid fa-eye' }].map(s => (
              <button key={s.id} type="button" onClick={() => setActiveSection(s.id)}
                style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: activeSection === s.id ? 'var(--accent-color)' : 'var(--bg-primary)', color: activeSection === s.id ? '#fff' : 'var(--text-secondary)', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className={s.icon}></i> {s.label}
              </button>
            ))}
          </div>
          {activeSection === 'editor' && <div style={{ marginBottom: '20px' }}><RichHTMLEditor value={formData.text} onChange={(html) => handleFieldChange('text', html)} /></div>}
          {activeSection === 'media' && (
            <div style={{ background: 'var(--bg-primary)', border: '1px dashed var(--card-border)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
              <h4 style={{ color: 'var(--text-primary)', margin: '0 0 16px', fontSize: '0.95rem' }}><i className="fa-solid fa-photo-film" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>Archivos Multimedia</h4>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}><i className="fa-solid fa-image" style={{ marginRight: '8px', color: '#10b981' }}></i>Imagen</label>
                <div style={{ marginBottom: '8px' }}>
                  <ImagePickerButton folder="contenido" label="Subir imagen" onUploaded={(url) => handleFieldChange('imagen_url', url)} />
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>o pega URL:</span>
                  <input type="url" value={formData.imagen_url} onChange={(e) => handleFieldChange('imagen_url', e.target.value)} placeholder="https://..." style={inputStyle} />
                </div>
                {formData.imagen_url && <div style={{ marginTop: '8px', borderRadius: '8px', overflow: 'hidden', maxHeight: '150px' }}><img src={formData.imagen_url} alt="Preview" style={{ width: '100%', maxHeight: '150px', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} /></div>}
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}><i className="fa-solid fa-video" style={{ marginRight: '8px', color: '#f59e0b' }}></i>URL de Video</label>
                <input type="url" value={formData.video_url} onChange={(e) => handleFieldChange('video_url', e.target.value)} placeholder="https://youtube.com/..." style={inputStyle} />
                {formData.video_url && <div style={{ marginTop: '8px', background: 'rgba(245,158,11,0.1)', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-video" style={{ color: '#f59e0b' }}></i><span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{formData.video_url}</span></div>}
              </div>
              <div>
                <label style={labelStyle}><i className="fa-solid fa-headphones" style={{ marginRight: '8px', color: '#ec4899' }}></i>URL de Audio</label>
                <input type="url" value={formData.audio_url} onChange={(e) => handleFieldChange('audio_url', e.target.value)} placeholder="https://..." style={inputStyle} />
                {formData.audio_url && <div style={{ marginTop: '8px' }}><audio controls src={formData.audio_url} style={{ width: '100%' }} /></div>}
              </div>
            </div>
          )}
          {activeSection === 'preview' && (
            <div style={{ background: 'var(--bg-primary)', borderRadius: '12px', padding: '24px', border: '1px solid var(--card-border)', marginBottom: '20px' }}>
              <div style={{ marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ background: formData.tipo ? getTipoBadgeColor(formData.tipo) : 'var(--accent-color)', color: '#fff', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <i className={getTipoIcon(formData.tipo)}></i> {formData.tipo || 'guia'}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Orden: {formData.orden}</span>
              </div>
              <h2 style={{ margin: '0 0 20px', color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: '700' }}>{formData.titulo || '(Sin título)'}</h2>
              {/* Rendered HTML content */}
              <div className="lesson-html-content" style={{ color: 'var(--text-primary)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '20px' }}
                dangerouslySetInnerHTML={{ __html: formData.text || '<p style="opacity:0.5">(Sin contenido)</p>' }} />
              {/* Multimedia preview */}
              {formData.imagen_url && (
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 8px' }}><i className="fa-solid fa-image" style={{ marginRight: '6px', color: '#10b981' }}></i>Imagen</h4>
                  <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--card-border)' }}>
                    <img src={formData.imagen_url} alt="Imagen del contenido" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', display: 'block' }} onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                </div>
              )}
              {formData.video_url && (
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 8px' }}><i className="fa-solid fa-video" style={{ marginRight: '6px', color: '#f59e0b' }}></i>Video</h4>
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                    <iframe src={formData.video_url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} allowFullScreen title="Video preview" />
                  </div>
                </div>
              )}
              {formData.audio_url && (
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 8px' }}><i className="fa-solid fa-headphones" style={{ marginRight: '6px', color: '#ec4899' }}></i>Audio</h4>
                  <audio controls src={formData.audio_url} style={{ width: '100%' }} />
                </div>
              )}
              {!formData.text && !formData.imagen_url && !formData.video_url && !formData.audio_url && (
                <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)', opacity: 0.6 }}>
                  <i className="fa-solid fa-eye-slash" style={{ fontSize: '2rem', display: 'block', marginBottom: '10px' }}></i>
                  No hay contenido para previsualizar
                </div>
              )}
            </div>
          )}
          <div style={{ display: 'flex', gap: '12px', paddingTop: '20px', borderTop: '1px solid var(--card-border)' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, background: 'var(--bg-primary)', border: '1px solid var(--card-border)', color: 'var(--text-primary)', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600' }}>Cancelar</button>
            <button type="submit" style={{ flex: 1, background: 'var(--accent-color)', border: 'none', color: '#fff', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600' }}><i className="fa-solid fa-save" style={{ marginRight: '8px' }}></i>Guardar</button>
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
  const handleFieldChange = (field, value) => { setFormData(prev => ({ ...prev, [field]: value })); };
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
  const inputStyle = { width: '100%', background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)', padding: '12px 15px', borderRadius: '10px', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600' };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px', backdropFilter: 'blur(4px)' }}>
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', borderRadius: '16px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%)', color: '#fff' }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700', color: '#fff' }}>{module.id ? 'Editar Módulo' : 'Nuevo Módulo'}</h2>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', width: '40px', height: '40px', borderRadius: '8px', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-xmark"></i></button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div style={{ marginBottom: '20px' }}><label style={labelStyle}>Título</label><input type="text" value={formData.titulo || ''} onChange={(e) => handleFieldChange('titulo', e.target.value)} style={inputStyle} required /></div>
          <div style={{ marginBottom: '20px' }}><label style={labelStyle}>Descripción</label><textarea value={formData.descripcion || ''} onChange={(e) => handleFieldChange('descripcion', e.target.value)} style={{ ...inputStyle, minHeight: '80px' }} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div><label style={labelStyle}>Color</label><input type="color" value={formData.color || '#a855f7'} onChange={(e) => handleFieldChange('color', e.target.value)} style={{ width: '100%', height: '44px', border: '1px solid var(--input-border)', borderRadius: '10px', cursor: 'pointer' }} /></div>
            <div><label style={labelStyle}>Ícono (Font Awesome)</label><input type="text" value={formData.icon || 'fa-solid fa-book'} onChange={(e) => handleFieldChange('icon', e.target.value)} placeholder="fa-solid fa-book" style={inputStyle} /></div>
          </div>
          <div style={{ background: 'var(--bg-primary)', border: '1px dashed var(--card-border)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
            <h4 style={{ color: 'var(--text-primary)', margin: '0 0 12px', fontSize: '0.95rem' }}><i className="fa-solid fa-photo-film" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>Multimedia del Módulo (inicio)</h4>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ ...labelStyle, fontSize: '0.9rem' }}><i className="fa-solid fa-image" style={{ marginRight: '6px', color: '#3b82f6' }}></i>Infografía</label>
              <div style={{ marginBottom: '8px' }}>
                <ImagePickerButton folder="modulos" label="Subir infografía" onUploaded={(url) => handleFieldChange('infografia_url', url)} />
              </div>
              <input type="url" value={formData.infografia_url || ''} onChange={(e) => handleFieldChange('infografia_url', e.target.value)} placeholder="https://..." style={inputStyle} />
              {formData.infografia_url && <div style={{ marginTop: '8px', borderRadius: '8px', overflow: 'hidden', maxHeight: '120px' }}><img src={formData.infografia_url} alt="Infografía" style={{ width: '100%', maxHeight: '120px', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} /></div>}
            </div>
            <div>
              <label style={{ ...labelStyle, fontSize: '0.9rem' }}><i className="fa-solid fa-headphones" style={{ marginRight: '6px', color: '#ec4899' }}></i>Audio URL</label>
              <input type="url" value={formData.audio_url || ''} onChange={(e) => handleFieldChange('audio_url', e.target.value)} placeholder="https://..." style={inputStyle} />
              {formData.audio_url && <div style={{ marginTop: '8px' }}><audio controls src={formData.audio_url} style={{ width: '100%' }} /></div>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', paddingTop: '20px', borderTop: '1px solid var(--card-border)' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, background: 'var(--bg-primary)', border: '1px solid var(--card-border)', color: 'var(--text-primary)', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600' }}>Cancelar</button>
            <button type="submit" style={{ flex: 1, background: 'var(--accent-color)', border: 'none', color: '#fff', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600' }}><i className="fa-solid fa-save" style={{ marginRight: '8px' }}></i>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ============================================
// PREGUNTA EDIT MODAL (con editor HTML rico + imagen)
// ============================================
const PreguntaEditModal = ({ pregunta, modules, onSave, onClose }) => {
  const [formData, setFormData] = useState(pregunta);
  const [activeTab, setActiveTab] = useState('contenido');
  const handleFieldChange = (field, value) => { setFormData(prev => ({ ...prev, [field]: value })); };
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
  const inputStyle = { width: '100%', background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)', padding: '12px 15px', borderRadius: '10px', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box' };
  const labelStyle = { display: 'block', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '600' };
  const tabBtnStyle = (active) => ({ padding: '10px 18px', border: 'none', borderRadius: '8px 8px 0 0', cursor: 'pointer', fontWeight: '600', fontSize: '0.9rem', background: active ? 'var(--accent-color)' : 'var(--bg-primary)', color: active ? '#fff' : 'var(--text-secondary)' });

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px', backdropFilter: 'blur(4px)', overflow: 'auto' }}>
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', borderRadius: '16px', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', margin: 'auto' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%)', color: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700', color: '#fff' }}>{pregunta.id ? 'Editar Pregunta' : 'Nueva Pregunta'}</h2>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', width: '40px', height: '40px', borderRadius: '8px', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa-solid fa-xmark"></i></button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', padding: '16px 24px 0', borderBottom: '1px solid var(--card-border)', flexWrap: 'wrap' }}>
          <button type="button" onClick={() => setActiveTab('contenido')} style={tabBtnStyle(activeTab === 'contenido')}><i className="fa-solid fa-pen"></i> Contenido</button>
          <button type="button" onClick={() => setActiveTab('opciones')} style={tabBtnStyle(activeTab === 'opciones')}><i className="fa-solid fa-list"></i> Opciones</button>
          <button type="button" onClick={() => setActiveTab('media')} style={tabBtnStyle(activeTab === 'media')}><i className="fa-solid fa-image"></i> Multimedia</button>
          <button type="button" onClick={() => setActiveTab('preview')} style={tabBtnStyle(activeTab === 'preview')}><i className="fa-solid fa-eye"></i> Vista Previa</button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {/* TAB: Contenido */}
          {activeTab === 'contenido' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div><label style={labelStyle}>Módulo</label><select value={formData.modulo_id || ''} onChange={(e) => handleFieldChange('modulo_id', parseInt(e.target.value))} style={{ ...inputStyle, cursor: 'pointer' }}><option value="">Selecciona módulo</option>{modules.map(mod => (<option key={mod.id} value={mod.id}>{mod.titulo}</option>))}</select></div>
                <div><label style={labelStyle}>Nivel</label><select value={formData.nivel || 'basico'} onChange={(e) => handleFieldChange('nivel', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}><option value="basico">Básico</option><option value="intermedio">Intermedio</option><option value="avanzado">Avanzado</option></select></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div><label style={labelStyle}>Tema</label><input type="text" value={formData.tema || ''} onChange={(e) => handleFieldChange('tema', e.target.value)} style={inputStyle} /></div>
                <div><label style={labelStyle}>Subtema</label><input type="text" value={formData.subtema || ''} onChange={(e) => handleFieldChange('subtema', e.target.value)} style={inputStyle} /></div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Pregunta (admite HTML)</label>
                <RichHTMLEditor value={formData.pregunta || ''} onChange={(val) => handleFieldChange('pregunta', val)} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Explicación (admite HTML)</label>
                <RichHTMLEditor value={formData.explicacion || ''} onChange={(val) => handleFieldChange('explicacion', val)} />
              </div>
              <div style={{ marginBottom: '20px' }}><label style={labelStyle}>Fórmula (opcional)</label><input type="text" value={formData.formula || ''} onChange={(e) => handleFieldChange('formula', e.target.value)} style={inputStyle} placeholder="Ej: UMgₓ = ∂U/∂X = 2XY" /></div>
            </>
          )}

          {/* TAB: Opciones */}
          {activeTab === 'opciones' && (
            <>
              <div style={{ background: 'var(--bg-primary)', border: '1px dashed var(--card-border)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
                <h4 style={{ color: 'var(--text-primary)', margin: '0 0 12px', fontSize: '0.95rem' }}><i className="fa-solid fa-circle-info" style={{ marginRight: '8px', color: 'var(--accent-color)' }}></i>Opciones de respuesta</h4>
                {['a', 'b', 'c', 'd'].map(letter => (
                  <div key={letter} style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', color: formData.respuesta_correcta === letter ? 'var(--success-color)' : 'var(--text-secondary)', marginBottom: '4px', fontSize: '0.85rem', fontWeight: '600' }}>
                      {formData.respuesta_correcta === letter && <i className="fa-solid fa-check" style={{ marginRight: '6px' }}></i>}
                      Opción {letter.toUpperCase()}
                    </label>
                    <input type="text" value={formData[`opcion_${letter}`] || ''} onChange={(e) => handleFieldChange(`opcion_${letter}`, e.target.value)} style={{ ...inputStyle, padding: '10px 12px', fontSize: '0.95rem', borderColor: formData.respuesta_correcta === letter ? 'var(--success-color)' : undefined }} />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: '20px' }}><label style={labelStyle}>Respuesta Correcta</label><select value={formData.respuesta_correcta || 'a'} onChange={(e) => handleFieldChange('respuesta_correcta', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}><option value="a">A</option><option value="b">B</option><option value="c">C</option><option value="d">D</option></select></div>
            </>
          )}

          {/* TAB: Multimedia */}
          {activeTab === 'media' && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}><i className="fa-solid fa-image" style={{ marginRight: '8px', color: '#10b981' }}></i>Imagen de la Pregunta</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                  <ImagePickerButton folder="preguntas" label="Subir imagen" onUploaded={(url) => handleFieldChange('imagen_url', url)} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>o pega URL:</span>
                </div>
                <input type="url" value={formData.imagen_url || ''} onChange={(e) => handleFieldChange('imagen_url', e.target.value)} placeholder="https://ejemplo.com/imagen.png" style={inputStyle} />
                {formData.imagen_url && (
                  <div style={{ marginTop: '12px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--card-border)', textAlign: 'center', background: 'var(--bg-primary)', padding: '12px' }}>
                    <img src={formData.imagen_url} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '8px' }}
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                    <p style={{ display: 'none', color: 'var(--error-color)', fontSize: '0.85rem' }}><i className="fa-solid fa-triangle-exclamation"></i> No se pudo cargar la imagen</p>
                  </div>
                )}
              </div>
              <div style={{ padding: '20px', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px dashed var(--card-border)' }}>
                <h4 style={{ color: 'var(--text-secondary)', margin: '0 0 8px', fontSize: '0.9rem' }}><i className="fa-solid fa-lightbulb" style={{ marginRight: '8px', color: 'var(--warning-color)' }}></i>Tip</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, lineHeight: '1.5' }}>
                  Las imágenes se guardan en el almacenamiento de Supabase (bucket "uploads"). También puedes insertar imágenes directamente en el texto usando el editor HTML en la pestaña Contenido.
                </p>
              </div>
            </>
          )}

          {/* TAB: Vista Previa */}
          {activeTab === 'preview' && (
            <div style={{ background: 'var(--bg-primary)', borderRadius: '12px', padding: '24px', border: '1px solid var(--card-border)' }}>
              <div style={{ marginBottom: '12px', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                {formData.nivel && <span style={{ padding: '4px 10px', background: formData.nivel === 'basico' ? 'rgba(34,197,94,0.15)' : formData.nivel === 'intermedio' ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.15)', color: formData.nivel === 'basico' ? '#22c55e' : formData.nivel === 'intermedio' ? '#eab308' : '#ef4444', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600' }}>{formData.nivel}</span>}
                {formData.tema && <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{formData.tema}</span>}
                {formData.subtema && <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', opacity: 0.7 }}>/ {formData.subtema}</span>}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px' }}>
                <RichText content={formData.pregunta || '(Sin pregunta)'} />
              </div>
              <QuestionImage url={formData.imagen_url} />
              {formData.formula && <div style={{ background: 'rgba(168,85,247,0.1)', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontFamily: 'monospace', color: 'var(--accent-color)', fontSize: '0.95rem' }}>{formData.formula}</div>}
              <div style={{ display: 'grid', gap: '8px', marginBottom: '20px' }}>
                {['a', 'b', 'c', 'd'].map(letter => (
                  <div key={letter} style={{
                    padding: '12px 16px', borderRadius: '10px',
                    background: formData.respuesta_correcta === letter ? 'rgba(34,197,94,0.15)' : 'var(--bg-secondary)',
                    border: `2px solid ${formData.respuesta_correcta === letter ? '#22c55e' : 'var(--card-border)'}`,
                    color: 'var(--text-primary)', fontSize: '0.95rem',
                    display: 'flex', alignItems: 'center', gap: '10px'
                  }}>
                    <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: formData.respuesta_correcta === letter ? '#22c55e' : 'var(--bg-primary)', color: formData.respuesta_correcta === letter ? '#fff' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem', flexShrink: 0 }}>
                      {formData.respuesta_correcta === letter ? <i className="fa-solid fa-check"></i> : letter.toUpperCase()}
                    </span>
                    {formData[`opcion_${letter}`] || <span style={{ opacity: 0.4 }}>(vacío)</span>}
                  </div>
                ))}
              </div>
              {formData.explicacion && (
                <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px', padding: '16px' }}>
                  <h4 style={{ color: '#3b82f6', margin: '0 0 8px', fontSize: '0.9rem' }}><i className="fa-solid fa-circle-info" style={{ marginRight: '6px' }}></i>Explicación</h4>
                  <RichText content={formData.explicacion} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }} />
                </div>
              )}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', paddingTop: '20px', borderTop: '1px solid var(--card-border)', marginTop: '20px' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, background: 'var(--bg-primary)', border: '1px solid var(--card-border)', color: 'var(--text-primary)', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600' }}>Cancelar</button>
            <button type="submit" style={{ flex: 1, background: 'var(--accent-color)', border: 'none', color: '#fff', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer', fontSize: '1rem', fontWeight: '600' }}><i className="fa-solid fa-save" style={{ marginRight: '8px' }}></i>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentManager;
