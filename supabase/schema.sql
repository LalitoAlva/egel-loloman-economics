-- ============================================
-- ESQUEMA DE BASE DE DATOS EGEL ECONOMÍA
-- ============================================

-- Tabla principal de preguntas
CREATE TABLE IF NOT EXISTS preguntas (
    id TEXT PRIMARY KEY,
    modulo TEXT NOT NULL CHECK (modulo IN ('microeconomia', 'macroeconomia')),
    subtema TEXT NOT NULL,
    nivel TEXT NOT NULL CHECK (nivel IN ('basico', 'intermedio', 'avanzado')),
    pregunta TEXT NOT NULL,
    opcion_a TEXT NOT NULL,
    opcion_b TEXT NOT NULL,
    opcion_c TEXT NOT NULL,
    opcion_d TEXT NOT NULL,
    respuesta_correcta TEXT NOT NULL CHECK (respuesta_correcta IN ('a', 'b', 'c', 'd')),
    explicacion TEXT,
    tema TEXT,
    formula TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_preguntas_modulo ON preguntas(modulo);
CREATE INDEX IF NOT EXISTS idx_preguntas_subtema ON preguntas(subtema);
CREATE INDEX IF NOT EXISTS idx_preguntas_nivel ON preguntas(nivel);
CREATE INDEX IF NOT EXISTS idx_preguntas_tema ON preguntas(tema);

-- Tabla para tracking de progreso del usuario (opcional)
CREATE TABLE IF NOT EXISTS progreso_usuario (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    pregunta_id TEXT REFERENCES preguntas(id),
    respondida_correctamente BOOLEAN,
    intentos INTEGER DEFAULT 0,
    ultimo_intento TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, pregunta_id)
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE preguntas ENABLE ROW LEVEL SECURITY;
ALTER TABLE progreso_usuario ENABLE ROW LEVEL SECURITY;

-- Política para que todos puedan leer preguntas
CREATE POLICY "Preguntas son públicas" ON preguntas
    FOR SELECT USING (true);

-- Política para progreso de usuario (cada quien ve solo su progreso)
CREATE POLICY "Usuarios ven su propio progreso" ON progreso_usuario
    FOR ALL USING (true);

-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para auto-actualizar updated_at
CREATE TRIGGER preguntas_updated_at
    BEFORE UPDATE ON preguntas
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
