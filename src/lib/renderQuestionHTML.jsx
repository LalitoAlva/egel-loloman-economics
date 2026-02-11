import React from 'react';

/**
 * Detecta si un texto contiene HTML tags
 */
const isHTML = (text) => /<[a-z][\s\S]*>/i.test(text);

/**
 * Limpia HTML para obtener texto plano (para VoiceReader)
 */
export const stripHTML = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
};

/**
 * Sanitiza HTML: elimina img con src vacío/null y agrega onerror a las válidas
 */
const sanitizeHTML = (html) => {
    if (!html) return '';
    return html.replace(/<img\b[^>]*>/gi, (match) => {
        const srcMatch = match.match(/src\s*=\s*["']([^"']*)["']/i);
        const src = srcMatch ? srcMatch[1].trim() : '';
        if (!src || src === 'null' || src === 'undefined' || src === 'about:blank') {
            return '';
        }
        if (!match.includes('onerror')) {
            return match.replace(/^<img/, '<img onerror="this.style.display=\'none\'"');
        }
        return match;
    });
};

/**
 * Renderiza texto que puede ser HTML o texto plano.
 * Si contiene tags HTML → usa dangerouslySetInnerHTML con clase .lesson-html-content
 * Si es texto plano → lo muestra con whiteSpace: pre-wrap
 */
export const RichText = ({ content, style = {}, className = '' }) => {
    if (!content) return null;

    if (isHTML(content)) {
        return (
            <div
                className={`lesson-html-content ${className}`}
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(content) }}
                style={{ lineHeight: '1.7', ...style }}
            />
        );
    }

    return <span style={{ whiteSpace: 'pre-wrap', ...style }}>{content}</span>;
};

/**
 * Renderiza imagen de pregunta si existe la URL
 */
export const QuestionImage = ({ url, style = {} }) => {
    if (!url) return null;
    return (
        <div style={{ textAlign: 'center', margin: '16px 0', ...style }}>
            <img
                src={url}
                alt="Imagen de la pregunta"
                style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    objectFit: 'contain',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
                onError={(e) => { e.target.style.display = 'none'; }}
            />
        </div>
    );
};

/**
 * Obtiene texto limpio para VoiceReader
 */
export const getCleanQuestionText = (text) => {
    if (!text) return '';
    return isHTML(text) ? stripHTML(text) : text;
};
