-- ============================================
-- TABLA DE MÓDULOS Y CONTENIDO
-- ============================================

CREATE TABLE IF NOT EXISTS modulos (
    id SERIAL PRIMARY KEY,
    numero INTEGER NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    color TEXT DEFAULT '#38bdf8',
    icon TEXT DEFAULT '📚',
    infografia_url TEXT,
    audio_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contenido_clase (
    id SERIAL PRIMARY KEY,
    modulo_id INTEGER REFERENCES modulos(id),
    tipo TEXT NOT NULL CHECK (tipo IN ('guia', 'informe', 'otro')),
    orden INTEGER NOT NULL,
    titulo TEXT NOT NULL,
    contenido TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_contenido_modulo ON contenido_clase(modulo_id);
CREATE INDEX IF NOT EXISTS idx_contenido_orden ON contenido_clase(orden);

-- RLS
ALTER TABLE modulos ENABLE ROW LEVEL SECURITY;
ALTER TABLE contenido_clase ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Modulos públicos" ON modulos FOR SELECT USING (true);
CREATE POLICY "Insertar modulos" ON modulos FOR INSERT WITH CHECK (true);

CREATE POLICY "Contenido público" ON contenido_clase FOR SELECT USING (true);
CREATE POLICY "Insertar contenido" ON contenido_clase FOR INSERT WITH CHECK (true);
