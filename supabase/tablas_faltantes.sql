-- ============================================
-- TABLAS FALTANTES: Notificaciones y Solicitudes
-- ============================================
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- ============================================
-- TABLA: solicitudes_cuenta
-- Para gestionar solicitudes de nuevas cuentas
-- ============================================
CREATE TABLE IF NOT EXISTS solicitudes_cuenta (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password_hash TEXT,
    motivo TEXT,
    estado VARCHAR(50) DEFAULT 'pendiente',
    fecha_solicitud TIMESTAMP DEFAULT NOW(),
    fecha_respuesta TIMESTAMP,
    respondido_por UUID,
    notas_admin TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para solicitudes
CREATE INDEX IF NOT EXISTS idx_solicitudes_estado ON solicitudes_cuenta(estado);
CREATE INDEX IF NOT EXISTS idx_solicitudes_email ON solicitudes_cuenta(email);
CREATE INDEX IF NOT EXISTS idx_solicitudes_fecha ON solicitudes_cuenta(fecha_solicitud);

-- ============================================
-- TABLA: notificaciones
-- Para el sistema de notificaciones
-- ============================================
CREATE TABLE IF NOT EXISTS notificaciones (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID,
    tipo VARCHAR(50) NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    mensaje TEXT,
    icono VARCHAR(10) DEFAULT '📢',
    color VARCHAR(20) DEFAULT '#a855f7',
    accion_url TEXT,
    leida BOOLEAN DEFAULT false,
    activa BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para notificaciones
CREATE INDEX IF NOT EXISTS idx_notificaciones_usuario ON notificaciones(usuario_id);
CREATE INDEX IF NOT EXISTS idx_notificaciones_tipo ON notificaciones(tipo);
CREATE INDEX IF NOT EXISTS idx_notificaciones_activa ON notificaciones(activa);
CREATE INDEX IF NOT EXISTS idx_notificaciones_leida ON notificaciones(leida);

-- ============================================
-- HABILITAR RLS con políticas abiertas
-- (La app maneja autenticación internamente)
-- ============================================

-- RLS para solicitudes_cuenta
ALTER TABLE solicitudes_cuenta ENABLE ROW LEVEL SECURITY;

-- Política abierta para solicitudes (la app maneja permisos)
DROP POLICY IF EXISTS "Acceso completo solicitudes" ON solicitudes_cuenta;
CREATE POLICY "Acceso completo solicitudes" ON solicitudes_cuenta
    FOR ALL USING (true) WITH CHECK (true);

-- RLS para notificaciones
ALTER TABLE notificaciones ENABLE ROW LEVEL SECURITY;

-- Política abierta para notificaciones
DROP POLICY IF EXISTS "Acceso completo notificaciones" ON notificaciones;
CREATE POLICY "Acceso completo notificaciones" ON notificaciones
    FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- Notificación global de bienvenida
-- ============================================
INSERT INTO notificaciones (usuario_id, tipo, titulo, mensaje, icono, color)
VALUES (
    NULL,
    'sistema',
    '📚 ¡Nueva actualización disponible!',
    'Hemos agregado más de 500 preguntas nuevas para tu preparación.',
    '📚',
    '#3b82f6'
);

-- ============================================
-- VERIFICACIÓN
-- ============================================
SELECT 'Tablas creadas exitosamente' as resultado;

SELECT table_name
FROM information_schema.tables
WHERE table_name IN ('solicitudes_cuenta', 'notificaciones')
AND table_schema = 'public';
