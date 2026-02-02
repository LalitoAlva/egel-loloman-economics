import React from 'react';


// Nota: En un proyecto real, instalaría 'react-markdown'. 
// Como no quiero detener el servidor para instalar paquetes, haré un render simple de texto con saltos de línea 
// o usaré una función simple de parseo si es necesario, pero para mantenerlo robusto sin deps extras,
// voy a formatear el texto manualmente con divs.

// UPDATE: El usuario ya tiene vite y react. No tengo react-markdown instalado en package.json.
// Voy a hacer un parser muy básico para Títulos (#) y Negritas (**) para no romper el build.

const SimpleMarkdown = ({ text }) => {
    if (!text) return null;

    const lines = text.split('\n');

    return (
        <div style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#e2e8f0' }}>
            {lines.map((line, index) => {
                // Headers
                if (line.startsWith('# ')) return <h1 key={index} style={{ color: 'var(--accent-color)', fontSize: '2.5rem', marginTop: '40px', marginBottom: '20px' }}>{line.replace('# ', '')}</h1>;
                if (line.startsWith('## ')) return <h2 key={index} style={{ color: '#fff', fontSize: '1.8rem', marginTop: '30px', marginBottom: '15px' }}>{line.replace('## ', '')}</h2>;
                if (line.startsWith('### ')) return <h3 key={index} style={{ color: 'var(--text-secondary)', fontSize: '1.4rem', marginTop: '25px', marginBottom: '10px' }}>{line.replace('### ', '')}</h3>;

                // Separators
                if (line.includes('***') || line.includes('---')) return <hr key={index} style={{ borderColor: 'var(--card-border)', margin: '30px 0' }} />;

                // List items (basic)
                if (line.trim().startsWith('* ')) {
                    return <li key={index} style={{ marginLeft: '20px', marginBottom: '10px' }}>{line.replace('* ', '')}</li>;
                }

                // Bold parsing (very basic: **word**)
                const parts = line.split('**');
                if (parts.length > 1) {
                    return (
                        <p key={index} style={{ marginBottom: '16px' }}>
                            {parts.map((part, i) => i % 2 === 1 ? <strong key={i} style={{ color: 'var(--warning-color)' }}>{part}</strong> : part)}
                        </p>
                    );
                }

                // Empty lines
                if (line.trim() === '') return <br key={index} />;

                return <p key={index} style={{ marginBottom: '16px' }}>{line}</p>;
            })}
        </div>
    );
};

const ClassMode = ({ module, onBack }) => {
    if (!module) return null;

    return (
        <div className="container fade-in">
            <button onClick={onBack} style={{ background: 'transparent', color: 'var(--text-secondary)', marginBottom: '20px', alignSelf: 'flex-start' }}>
                ← Volver al Menú
            </button>

            <div className="card" style={{ margin: '0 auto', borderTop: `8px solid ${module.color}`, padding: '40px 60px' }}>
                <button className="close-btn" onClick={onBack} title="Cerrar">×</button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                    <span style={{ fontSize: '3rem' }}>{module.icon}</span>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{module.title}</h1>
                        <p style={{ margin: 0, color: 'var(--accent-color)', fontWeight: 'bold' }}>INFORME DETALLADO / CLASE MAGISTRAL</p>
                    </div>
                </div>

                {/* Content Rental */}
                <div style={{ textAlign: 'justify' }}>
                    <SimpleMarkdown text={module.detailed_report} />
                </div>

                <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid var(--card-border)', textAlign: 'center' }}>
                    <p>¿Ya te sientes listo?</p>
                    <button className="btn-primary" onClick={onBack} style={{ maxWidth: '300px' }}>
                        Ir a Pruebas
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassMode;
