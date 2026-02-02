-- ============================================
-- SCHEMA DE SOLICITUDES DE CUENTA
-- ============================================

-- Tabla de Solicitudes de Cuenta
CREATE TABLE IF NOT EXISTS solicitudes_cuenta (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    avatar VARCHAR(10) DEFAULT '📚',
    motivo TEXT NOT NULL, -- Razón por la que solicita la cuenta
    estado VARCHAR(20) DEFAULT 'pendiente', -- 'pendiente', 'aprobada', 'rechazada'
    admin_id UUID REFERENCES usuarios(id), -- Admin que procesó la solicitud
    notas_admin TEXT, -- Notas del admin al aprobar/rechazar
    created_at TIMESTAMP DEFAULT NOW(),
    processed_at TIMESTAMP
);

-- Índices para mejorar consultas
CREATE INDEX IF NOT EXISTS idx_solicitudes_estado ON solicitudes_cuenta(estado);
CREATE INDEX IF NOT EXISTS idx_solicitudes_email ON solicitudes_cuenta(email);
CREATE INDEX IF NOT EXISTS idx_solicitudes_created ON solicitudes_cuenta(created_at);

-- RLS Policies
ALTER TABLE solicitudes_cuenta ENABLE ROW LEVEL SECURITY;

-- Solo admins pueden ver solicitudes
CREATE POLICY "Admins can view requests" ON solicitudes_cuenta
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            WHERE u.id = auth.uid() AND r.nombre = 'admin'
        )
    );

-- Solo admins pueden actualizar solicitudes
CREATE POLICY "Admins can update requests" ON solicitudes_cuenta
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM usuarios u
            JOIN roles r ON u.rol_id = r.id
            WHERE u.id = auth.uid() AND r.nombre = 'admin'
        )
    );

-- Cualquiera puede insertar una solicitud (para registro)
CREATE POLICY "Anyone can create requests" ON solicitudes_cuenta
    FOR INSERT WITH CHECK (true);

-- ============================================
-- FUNCIÓN PARA APROBAR SOLICITUD
-- ============================================

CREATE OR REPLACE FUNCTION aprobar_solicitud(solicitud_id UUID, admin_usuario_id UUID, notas TEXT DEFAULT NULL)
RETURNS UUID AS $$
DECLARE
    solicitud RECORD;
    nuevo_usuario_id UUID;
    rol_estudiante_id UUID;
BEGIN
    -- Obtener la solicitud
    SELECT * INTO solicitud FROM solicitudes_cuenta WHERE id = solicitud_id AND estado = 'pendiente';

    IF solicitud IS NULL THEN
        RAISE EXCEPTION 'Solicitud no encontrada o ya procesada';
    END IF;

    -- Obtener el rol de estudiante
    SELECT id INTO rol_estudiante_id FROM roles WHERE nombre = 'estudiante' LIMIT 1;

    IF rol_estudiante_id IS NULL THEN
        -- Crear rol si no existe
        INSERT INTO roles (nombre, descripcion, permisos)
        VALUES ('estudiante', 'Usuario estudiante', '{"leer": true}')
        RETURNING id INTO rol_estudiante_id;
    END IF;

    -- Crear el usuario
    INSERT INTO usuarios (nombre, email, password_hash, avatar, rol_id, activo)
    VALUES (solicitud.nombre, solicitud.email, solicitud.password_hash, solicitud.avatar, rol_estudiante_id, true)
    RETURNING id INTO nuevo_usuario_id;

    -- Actualizar solicitud como aprobada
    UPDATE solicitudes_cuenta
    SET estado = 'aprobada',
        admin_id = admin_usuario_id,
        notas_admin = notas,
        processed_at = NOW()
    WHERE id = solicitud_id;

    -- Crear notificación para el nuevo usuario
    INSERT INTO notificaciones (usuario_id, tipo, titulo, mensaje, icono, color)
    VALUES (
        nuevo_usuario_id,
        'sistema',
        '🎉 ¡Cuenta Aprobada!',
        'Tu solicitud de cuenta ha sido aprobada. ¡Bienvenido a EGEL Study!',
        '✅',
        '#22c55e'
    );

    RETURN nuevo_usuario_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- FUNCIÓN PARA RECHAZAR SOLICITUD
-- ============================================

CREATE OR REPLACE FUNCTION rechazar_solicitud(solicitud_id UUID, admin_usuario_id UUID, notas TEXT DEFAULT NULL)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE solicitudes_cuenta
    SET estado = 'rechazada',
        admin_id = admin_usuario_id,
        notas_admin = COALESCE(notas, 'Solicitud rechazada'),
        processed_at = NOW()
    WHERE id = solicitud_id AND estado = 'pendiente';

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- FUNCIÓN PARA NOTIFICAR ADMINS DE NUEVA SOLICITUD
-- ============================================

CREATE OR REPLACE FUNCTION notificar_admins_nueva_solicitud()
RETURNS TRIGGER AS $$
DECLARE
    admin_record RECORD;
BEGIN
    -- Para cada administrador activo
    FOR admin_record IN
        SELECT u.id FROM usuarios u
        JOIN roles r ON u.rol_id = r.id
        WHERE r.nombre = 'admin' AND u.activo = true
    LOOP
        -- Crear notificación
        INSERT INTO notificaciones (usuario_id, tipo, titulo, mensaje, icono, color, accion_url)
        VALUES (
            admin_record.id,
            'sistema',
            '📋 Nueva Solicitud de Cuenta',
            'El usuario ' || NEW.nombre || ' ha solicitado una cuenta. Motivo: ' || LEFT(NEW.motivo, 100),
            '📋',
            '#f59e0b',
            'admin-requests'
        );
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para notificar admins cuando se crea una solicitud
DROP TRIGGER IF EXISTS trigger_notificar_nueva_solicitud ON solicitudes_cuenta;
CREATE TRIGGER trigger_notificar_nueva_solicitud
    AFTER INSERT ON solicitudes_cuenta
    FOR EACH ROW
    EXECUTE FUNCTION notificar_admins_nueva_solicitud();

-- ============================================
-- PERMISOS PÚBLICOS PARA DEMO
-- ============================================

-- Permitir operaciones públicas para demo
DROP POLICY IF EXISTS "Admins can view requests" ON solicitudes_cuenta;
DROP POLICY IF EXISTS "Admins can update requests" ON solicitudes_cuenta;
DROP POLICY IF EXISTS "Anyone can create requests" ON solicitudes_cuenta;

CREATE POLICY "Public access solicitudes" ON solicitudes_cuenta
    FOR ALL USING (true);
