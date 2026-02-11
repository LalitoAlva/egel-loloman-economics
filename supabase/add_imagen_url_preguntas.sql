-- ============================================================================
-- MIGRACIÓN: Agregar columna imagen_url a la tabla preguntas
-- Permite asociar una imagen a cada pregunta
-- ============================================================================

-- Agregar columna imagen_url (nullable, tipo text para URLs)
ALTER TABLE preguntas ADD COLUMN IF NOT EXISTS imagen_url TEXT DEFAULT NULL;

-- Comentario descriptivo
COMMENT ON COLUMN preguntas.imagen_url IS 'URL de imagen asociada a la pregunta (opcional)';
