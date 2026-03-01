import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

/**
 * PdfEditor
 * Interfaz 100% dedicada a gestionar las fórmulas que se renderizan en el PDF.
 * Permite añadir conceptos visualmente sin tener que recordar la sintaxis Markdown especial.
 */
const PdfEditor = ({ onBack }) => {
    const { user } = useAuth();
    const { theme } = useTheme();

    const [loading, setLoading] = useState(true);
    const [formulasModule, setFormulasModule] = useState(null);
    const [contentItems, setContentItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

            // 1. Encontrar el módulo de "Fórmulas y Tips EGEL"
            // Buscamos por título o fallback al módulo 11
            let { data: mods, error: mError } = await supabase
                .from('modulos')
                .select('*')
                .ilike('titulo', '%Fórmula%');

            if (mError) throw mError;

            let targetModule = mods && mods.length > 0 ? mods[0] : null;

            // Si no lo encuentra por título, intenta buscar el ID 11
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

            // 2. Cargar el contenido
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

    // Interpretar el contenido Markdown especial en Concepto y Fórmula
    const extractFormData = (markdownText) => {
        if (!markdownText) return { concepto: '', formula: '', isList: false };

        let match = markdownText.match(/^\*\s*\*\*([^*]+)\*\*:?\s*(.*)$/);
        if (match) {
            return {
                concepto: match[1].trim(),
                formula: match[2].trim(),
                isList: true
            };
        }

        // Es un párrafo normal o tip oscuro
        return {
            concepto: '',
            formula: markdownText.trim(),
            isList: false
        };
    };

    // Reconstruir en formato Markdown exacto para el Generador PDF
    const buildMarkdown = (concepto, formula, isList) => {
        if (isList) {
            return `* **${concepto}**: ${formula}`;
        }
        return formula;
    };

    const handleAddFormula = () => {
        setEditingItem({
            id: null,
            orden: contentItems.length + 1,
            concepto: '',
            formula: '',
            isList: true // Por defecto enseñarle la plantilla de tabla
        });
        setIsEditModalOpen(true);
    };

    const handleEditFormula = (item) => {
        const { text } = parseMediaFromContent(item.contenido);
        const { concepto, formula, isList } = extractFormData(text);

        setEditingItem({
            id: item.id,
            orden: item.orden,
            concepto: concepto,
            formula: formula,
            isList: isList || concepto !== ''
        });
        setIsEditModalOpen(true);
    };

    const handleDeleteFormula = async (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar esta fórmula del PDF?')) return;

        try {
            const { error } = await supabase.from('contenido_clase').delete().eq('id', id);
            if (error) throw error;

            // Reordenar
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
            if (!editingItem.formula) {
                alert('La fórmula o texto no puede estar vacío');
                return;
            }

            const finalMarkdown = buildMarkdown(editingItem.concepto, editingItem.formula, editingItem.isList);
            // El editor PDF está simplificado para texto, conservamos si hubiera medios pero normalmente las fórmulas no los tienen
            const contenido = finalMarkdown;

            if (editingItem.id) {
                // Actualizar
                const { error } = await supabase
                    .from('contenido_clase')
                    .update({
                        contenido: contenido,
                        titulo: editingItem.isList ? editingItem.concepto : 'Razón Financiera / Tip',
                        tipo: 'guia'
                    })
                    .eq('id', editingItem.id);

                if (error) throw error;
            } else {
                // Insertar
                const { error } = await supabase
                    .from('contenido_clase')
                    .insert([{
                        modulo_id: formulasModule.id,
                        titulo: editingItem.isList ? editingItem.concepto : 'Razón Financiera / Tip',
                        contenido: contenido,
                        orden: editingItem.orden,
                        tipo: 'guia'
                    }]);

                if (error) throw error;
            }

            setIsEditModalOpen(false);
            setEditingItem(null);
            loadFormulasModule(); // Refrescar

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

    return (
        <div style={{ minHeight: '100vh', padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <button onClick={onBack} style={{ background: 'transparent', border: '2px solid var(--accent-color)', color: 'var(--accent-color)', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <div>
                        <h1 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <i className="fa-solid fa-file-pdf" style={{ color: '#ef4444' }}></i>
                            Editor Formulario PDF
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
                    <i className="fa-solid fa-plus"></i> Añadir Fórmula
                </button>
            </div>

            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', borderRadius: '16px', overflow: 'hidden' }}>
                {contentItems.map((item, index) => {
                    const { text } = parseMediaFromContent(item.contenido);
                    const { concepto, formula, isList } = extractFormData(text);

                    return (
                        <div key={item.id} style={{ padding: '20px', borderBottom: index < contentItems.length - 1 ? '1px solid var(--card-border)' : 'none', display: 'flex', gap: '20px', alignItems: 'center', transition: 'background 0.2s' }}>
                            <div style={{ background: 'var(--accent-color)', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                                {item.orden}
                            </div>

                            <div style={{ flex: 1, minWidth: 0 }}>
                                {isList ? (
                                    <>
                                        <div style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '6px' }}>{concepto}</div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', background: 'var(--bg-primary)', padding: '10px 15px', borderRadius: '8px', fontFamily: 'monospace', display: 'inline-block', border: '1px solid var(--input-border)' }}>
                                            {formula}
                                        </div>
                                    </>
                                ) : (
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontStyle: 'italic' }}>
                                        {formula.substring(0, 100)}{formula.length > 100 ? '...' : ''}
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '10px' }}>
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
                        <p>No hay fórmulas en el documento PDF.</p>
                    </div>
                )}
            </div>

            {/* Modal de Edición */}
            {isEditModalOpen && editingItem && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px' }}>
                    <div className="slide-card" style={{ background: 'var(--bg-primary)', width: '100%', maxWidth: '600px', borderRadius: '20px', padding: '30px', border: '1px solid var(--card-border)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                        <h2 style={{ color: 'var(--text-primary)', margin: '0 0 25px 0', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <i className="fa-solid fa-pen-to-square" style={{ color: 'var(--accent-color)' }}></i>
                            {editingItem.id ? 'Editar Fila del PDF' : 'Nueva Fila del PDF'}
                        </h2>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                                <input
                                    type="checkbox"
                                    checked={editingItem.isList}
                                    onChange={(e) => setEditingItem({ ...editingItem, isList: e.target.checked })}
                                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                />
                                Formato de Tabla (Concepto : Fórmula)
                            </label>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '8px', marginLeft: '28px' }}>
                                Desmárcalo si solo quieres meter un texto libre o un Tip (Ej. <i>{"> *(Hack)*: Analiza primero el CTM..."}</i>)
                            </p>
                        </div>

                        {editingItem.isList && (
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: '600' }}>Concepto o Nombre de Razón</label>
                                <input
                                    type="text"
                                    value={editingItem.concepto}
                                    onChange={(e) => setEditingItem({ ...editingItem, concepto: e.target.value })}
                                    placeholder="Ej. Rentabilidad Económica"
                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>
                        )}

                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: '600' }}>
                                {editingItem.isList ? 'Fórmula matemática' : 'Texto libre'}
                            </label>
                            <textarea
                                value={editingItem.formula}
                                onChange={(e) => setEditingItem({ ...editingItem, formula: e.target.value })}
                                placeholder={editingItem.isList ? "Ej. UODI / Activo Total" : "Agrega el texto plano o Hack..."}
                                rows={4}
                                style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid var(--input-border)', background: 'var(--input-bg)', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none', resize: 'vertical', fontFamily: 'monospace' }}
                            />
                            {editingItem.isList && (
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '10px' }}>
                                    💡 Tip: Envuelve fórmulas matemáticas entre comillas invertidas (<strong>`</strong>UODI / Activo<strong>`</strong>) para que salgan con fondo rosa en el PDF.
                                </p>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
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
                                Guardar en PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PdfEditor;
