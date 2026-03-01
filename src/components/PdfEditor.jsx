import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { processMarkdown } from '../utils/pdfGenerator';

/**
 * PdfEditor
 * Interfaz 100% dedicada a gestionar las fórmulas que se renderizan en el PDF.
 * Permite añadir contenido en formato HTML.
 */
const PdfEditor = ({ onBack }) => {
    const { user } = useAuth();
    const { theme } = useTheme();

    const [loading, setLoading] = useState(true);
    const [formulasModule, setFormulasModule] = useState(null);
    const [contentItems, setContentItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showRawHtml, setShowRawHtml] = useState(false);

    // Auth Check
    const isAdmin = user?.roles?.nombre === 'admin';
    const canManageContent = user?.roles?.permisos?.gestionar_contenido || isAdmin;

    useEffect(() => {
        if (canManageContent) {
            loadFormulasModule();
        }
    }, [canManageContent]);

    const loadFormulasModule = async () => {
        try {
            setLoading(true);

            let { data: mods, error: mError } = await supabase
                .from('modulos')
                .select('*')
                .ilike('titulo', '%Fórmula%');

            if (mError) throw mError;

            let targetModule = mods && mods.length > 0 ? mods[0] : null;

            if (!targetModule) {
                const { data: fallback, error: fbError } = await supabase
                    .from('modulos')
                    .select('*')
                    .eq('numero', 11)
                    .single();
                if (!fbError && fallback) targetModule = fallback;
            }

            if (!targetModule) {
                alert("No se encontró el módulo de Fórmulas en la base de datos.");
                setLoading(false);
                return;
            }

            setFormulasModule(targetModule);

            const { data, error } = await supabase
                .from('contenido_clase')
                .select('*')
                .eq('modulo_id', targetModule.id)
                .order('orden', { ascending: true });

            if (error) throw error;
            setContentItems(data || []);

        } catch (error) {
            console.error('Error cargando origen de PDF:', error);
            alert("Error al cargar datos del PDF.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddFormula = () => {
        setEditingItem({
            id: null,
            orden: contentItems.length + 1,
            contenido: ''
        });
        setShowRawHtml(false);
        setIsEditModalOpen(true);
    };

    const handleEditFormula = (item) => {
        const { text } = parseMediaFromContent(item.contenido);

        let htmlText = text;
        const trimmed = (text || '').trim();

        // Si no es HTML, intenta transformar el sintaxis markdown viejo a HTML para el WYSIWYG
        if (text && !trimmed.startsWith('<')) {
            let lines = text.split('\n');
            let newHtml = '';
            lines.forEach((line) => {
                let ln = line.trim();
                let match = ln.match(/^\*\s*\*\*([^*]+)\*\*:?\s*(.*)$/);
                if (match) {
                    newHtml += `<table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;" border="1"><tbody><tr><td style="padding: 10px; width: 35%;"><strong>${match[1]}</strong></td><td style="padding: 10px;"><code>${match[2].replace(/`/g, '')}</code></td></tr></tbody></table>`;
                } else if (ln.startsWith('### ')) {
                    newHtml += `<h3>${ln.replace('### ', '')}</h3>`;
                } else if (ln.startsWith('> *(Hack')) {
                    newHtml += `<blockquote>${ln}</blockquote>`;
                } else if (ln !== '') {
                    newHtml += `<p>${ln}</p>`;
                }
            });
            htmlText = newHtml;
        }

        setEditingItem({
            id: item.id,
            orden: item.orden,
            contenido: htmlText || ''
        });
        setShowRawHtml(false);
        setIsEditModalOpen(true);
    };

    const handleDeleteFormula = async (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar este contenido del PDF?')) return;

        try {
            const { error } = await supabase.from('contenido_clase').delete().eq('id', id);
            if (error) throw error;

            const remaining = contentItems.filter(item => item.id !== id);
            const reordered = remaining.map((item, idx) => ({ ...item, orden: idx + 1 }));
            setContentItems(reordered);

            for (const r of reordered) {
                await supabase.from('contenido_clase').update({ orden: r.orden }).eq('id', r.id);
            }

        } catch (err) {
            alert('Error al eliminar: ' + err.message);
        }
    };

    const parseMediaFromContent = (contenido) => {
        if (!contenido) return { text: '', media: {} };
        const sep = '\n\n---MEDIA---\n';
        const parts = contenido.split(sep);
        let media = {};
        if (parts[1]) { try { media = JSON.parse(parts[1]); } catch (e) { } }
        return { text: parts[0], media };
    };

    const handleSaveItem = async () => {
        try {
            if (!editingItem.contenido) {
                alert('El contenido no puede estar vacío');
                return;
            }

            const contenido = editingItem.contenido;

            if (editingItem.id) {
                const { error } = await supabase
                    .from('contenido_clase')
                    .update({
                        contenido: contenido,
                        titulo: 'Contenido PDF',
                        tipo: 'guia'
                    })
                    .eq('id', editingItem.id);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('contenido_clase')
                    .insert([{
                        modulo_id: formulasModule.id,
                        titulo: 'Contenido PDF',
                        contenido: contenido,
                        orden: editingItem.orden,
                        tipo: 'guia'
                    }]);

                if (error) throw error;
            }

            setIsEditModalOpen(false);
            setEditingItem(null);
            loadFormulasModule();

        } catch (err) {
            alert('Error al guardar: ' + err.message);
        }
    };

    if (!canManageContent) {
        return (
            <div className="container fade-in" style={{ textAlign: 'center', paddingTop: '60px' }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🚫</div>
                <h1 style={{ color: 'var(--text-primary)' }}>Acceso Denegado</h1>
                <button onClick={onBack} className="btn-primary" style={{ marginTop: '20px' }}>← Volver</button>
            </div>
        );
    }

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-secondary)' }}>
                <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '3rem', marginBottom: '20px', color: 'var(--accent-color)' }}></i>
                <p>Cargando Estructura del PDF...</p>
            </div>
        );
    }

    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ color: [] }, { background: [] }],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <div style={{ minHeight: '100vh', padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <button onClick={onBack} style={{ background: 'transparent', border: '2px solid var(--accent-color)', color: 'var(--accent-color)', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <div>
                        <h1 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <i className="fa-solid fa-file-pdf" style={{ color: '#ef4444' }}></i>
                            Editor Formulario PDF (HTML)
                        </h1>
                        <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>
                            Módulo vinculado: <strong>{formulasModule?.titulo}</strong>
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleAddFormula}
                    style={{ background: 'var(--accent-color)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(168,85,247,0.3)' }}
                >
                    <i className="fa-solid fa-plus"></i> Añadir Contenido
                </button>
            </div>

            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', borderRadius: '16px', overflow: 'hidden' }}>
                {contentItems.map((item, index) => {
                    const { text } = parseMediaFromContent(item.contenido);

                    return (
                        <div key={item.id} style={{ padding: '20px', borderBottom: index < contentItems.length - 1 ? '1px solid var(--card-border)' : 'none', display: 'flex', gap: '20px', alignItems: 'flex-start', transition: 'background 0.2s' }}>
                            <div style={{ background: 'var(--accent-color)', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                                {item.orden}
                            </div>

                            <div style={{ flex: 1, minWidth: 0, background: 'var(--bg-primary)', padding: '15px', borderRadius: '8px', border: '1px solid var(--input-border)', color: 'var(--text-primary)', overflowX: 'auto' }}>
                                {(text || '').trim().startsWith('<') ? (
                                    <div className="ql-editor" style={{ padding: 0 }} dangerouslySetInnerHTML={{ __html: text }} />
                                ) : (
                                    <div dangerouslySetInnerHTML={{ __html: processMarkdown(text) }} />
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
                                <button
                                    onClick={() => handleEditFormula(item)}
                                    style={{ background: 'rgba(168, 85, 247, 0.1)', color: 'var(--accent-color)', border: 'none', width: '40px', height: '40px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}
                                    title="Editar"
                                >
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <button
                                    onClick={() => handleDeleteFormula(item.id)}
                                    style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', width: '40px', height: '40px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}
                                    title="Eliminar"
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    );
                })}

                {contentItems.length === 0 && (
                    <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        <i className="fa-regular fa-folder-open" style={{ fontSize: '3rem', marginBottom: '15px' }}></i>
                        <p>No hay contenido en el documento PDF.</p>
                    </div>
                )}
            </div>

            {/* Modal de Edición */}
            {isEditModalOpen && editingItem && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px' }}>
                    <div className="slide-card" style={{ background: 'var(--bg-primary)', width: '100%', maxWidth: '800px', borderRadius: '20px', padding: '30px', border: '1px solid var(--card-border)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                            <h2 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <i className="fa-solid fa-code" style={{ color: 'var(--accent-color)' }}></i>
                                {editingItem.id ? 'Editar Contenido PDF (HTML)' : 'Nuevo Contenido PDF (HTML)'}
                            </h2>
                            <button
                                onClick={() => setShowRawHtml(!showRawHtml)}
                                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', color: 'var(--text-primary)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
                            >
                                <i className="fa-solid fa-exchange-alt" style={{ marginRight: '6px' }}></i>
                                {showRawHtml ? 'Usar Editor Visual' : 'Editar Código HTML'}
                            </button>
                        </div>

                        <div style={{ marginBottom: '30px', background: '#fff', borderRadius: '8px', color: '#000' }}>
                            {showRawHtml ? (
                                <textarea
                                    value={editingItem.contenido}
                                    onChange={(e) => setEditingItem({ ...editingItem, contenido: e.target.value })}
                                    rows={15}
                                    style={{ width: '100%', padding: '15px', fontFamily: 'monospace', fontSize: '14px', border: '1px solid #ccc', borderRadius: '8px', resize: 'vertical' }}
                                    placeholder="<p>Escribe tu HTML aquí...</p>"
                                />
                            ) : (
                                <div style={{ minHeight: '300px' }}>
                                    <ReactQuill
                                        theme="snow"
                                        value={editingItem.contenido}
                                        onChange={(val) => setEditingItem({ ...editingItem, contenido: val })}
                                        modules={quillModules}
                                        style={{ height: '250px', marginBottom: '40px' }}
                                    />
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginTop: showRawHtml ? '10px' : '40px' }}>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                style={{ padding: '12px 24px', background: 'transparent', color: 'var(--text-secondary)', border: '2px solid var(--card-border)', borderRadius: '10px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSaveItem}
                                style={{ padding: '12px 30px', background: 'var(--accent-color)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(168,85,247,0.3)' }}
                            >
                                <i className="fa-solid fa-save" style={{ marginRight: '8px' }}></i>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PdfEditor;
