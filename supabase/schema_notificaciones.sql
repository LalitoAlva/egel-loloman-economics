-- ============================================
-- SCHEMA DE NOTIFICACIONES
-- ============================================

-- Tabla de Notificaciones
CREATE TABLE IF NOT EXISTS notificaciones (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL, -- 'prueba_semanal', 'resultado', 'sistema', 'recordatorio'
    titulo VARCHAR(200) NOT NULL,
    mensaje TEXT,
    icono VARCHAR(10) DEFAULT '📢',
    color VARCHAR(20) DEFAULT '#a855f7',
    accion_url VARCHAR(100),
    leida BOOLEAN DEFAULT false,
    activa BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para mejorar consultas
CREATE INDEX IF NOT EXISTS idx_notificaciones_usuario ON notificaciones(usuario_id);
CREATE INDEX IF NOT EXISTS idx_notificaciones_tipo ON notificaciones(tipo);
CREATE INDEX IF NOT EXISTS idx_notificaciones_activa ON notificaciones(activa);

-- RLS Policies
ALTER TABLE notificaciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications" ON notificaciones
    FOR SELECT USING (usuario_id = auth.uid() OR usuario_id IS NULL);

CREATE POLICY "Users can update own notifications" ON notificaciones
    FOR UPDATE USING (usuario_id = auth.uid());

CREATE POLICY "System can insert notifications" ON notificaciones
    FOR INSERT WITH CHECK (true);

-- ============================================
-- COLUMNAS ADICIONALES EN EXAMENES
-- ============================================

-- Agregar columnas faltantes a examenes si no existen
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'examenes' AND column_name = 'tiempo_limite_min') THEN
        ALTER TABLE examenes ADD COLUMN tiempo_limite_min INTEGER;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'examenes' AND column_name = 'tiempo_agotado') THEN
        ALTER TABLE examenes ADD COLUMN tiempo_agotado BOOLEAN DEFAULT false;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'examenes' AND column_name = 'updated_at') THEN
        ALTER TABLE examenes ADD COLUMN updated_at TIMESTAMP DEFAULT NOW();
    END IF;
END
$$;

-- ============================================
-- NOTIFICACIONES INICIALES DEL SISTEMA
-- ============================================

-- Notificación de bienvenida global (sin usuario específico)
INSERT INTO notificaciones (usuario_id, tipo, titulo, mensaje, icono, color) VALUES
(NULL, 'sistema', '¡Bienvenido a EGEL Study!', 'Comienza tu preparación para el examen EGEL de Economía. Explora los módulos y realiza quizzes.', '🎉', '#a855f7')
ON CONFLICT DO NOTHING;

-- ============================================
-- FUNCIÓN PARA CREAR NOTIFICACIÓN DE PRUEBA SEMANAL
-- ============================================

CREATE OR REPLACE FUNCTION crear_notificacion_semanal()
RETURNS void AS $$
DECLARE
    user_record RECORD;
BEGIN
    -- Para cada usuario activo
    FOR user_record IN SELECT id FROM usuarios WHERE activo = true
    LOOP
        -- Verificar si ya tiene notificación de esta semana
        IF NOT EXISTS (
            SELECT 1 FROM notificaciones
            WHERE usuario_id = user_record.id
            AND tipo = 'prueba_semanal'
            AND created_at >= date_trunc('week', NOW())
        ) THEN
            -- Crear notificación
            INSERT INTO notificaciones (usuario_id, tipo, titulo, mensaje, icono, color, accion_url)
            VALUES (
                user_record.id,
                'prueba_semanal',
                '📅 Prueba Semanal Disponible',
                '¡Es hora de tu prueba semanal! 80 preguntas en 60 minutos te esperan.',
                '📅',
                '#3b82f6',
                'weekly'
            );
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- PERMISOS PÚBLICOS PARA DEMO
-- ============================================

-- Permitir operaciones públicas en notificaciones para demo
DROP POLICY IF EXISTS "Users can view own notifications" ON notificaciones;
DROP POLICY IF EXISTS "Users can update own notifications" ON notificaciones;
DROP POLICY IF EXISTS "System can insert notifications" ON notificaciones;

CREATE POLICY "Public access notifications" ON notificaciones
    FOR ALL USING (true);
