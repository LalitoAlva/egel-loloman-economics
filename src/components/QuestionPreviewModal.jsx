import React, { useEffect } from 'react';

export default function QuestionPreviewModal({ question, onClose }) {
  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!question) return null;

  // Cerrar al hacer click fuera del modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const options = [
    { letter: 'A', text: question.opcion_a },
    { letter: 'B', text: question.opcion_b },
    { letter: 'C', text: question.opcion_c },
    { letter: 'D', text: question.opcion_d },
  ];

  return (
    <div className="preview-modal-overlay" onClick={handleOverlayClick}>
      <div className="preview-modal">
        {/* Botón cerrar */}
        <button className="preview-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        {/* Encabezado con info */}
        <div className="preview-modal-header">
          <div className="preview-question-number">
            Pregunta {question.id || '?'}
          </div>
          <div className="preview-tags">
            {question.modulos && (
              <span className="preview-tag modulo-tag">
                {question.modulos.titulo}
              </span>
            )}
            {question.nivel && (
              <span className="preview-tag nivel-tag">
                {question.nivel.charAt(0).toUpperCase() + question.nivel.slice(1)}
              </span>
            )}
            {question.tipo && (
              <span className="preview-tag tipo-tag">{question.tipo}</span>
            )}
          </div>
        </div>

        {/* Pregunta */}
        <div className="preview-question-text">
          <p>{question.pregunta}</p>
        </div>

        {/* Opciones */}
        <div className="preview-options">
          {options.map((option) => (
            <div key={option.letter} className="preview-option">
              <div className="preview-option-letter">{option.letter}</div>
              <div className="preview-option-text">{option.text}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="preview-modal-footer">
          <button className="preview-close-btn" onClick={onClose}>
            <i className="fas fa-arrow-left"></i> Volver a responder
          </button>
        </div>
      </div>
    </div>
  );
}
