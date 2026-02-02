-- ============================================
-- FUNCIONES PARA MANEJO DE PASSWORDS CON MD5
-- ============================================

-- Función para verificar password
CREATE OR REPLACE FUNCTION verificar_password(user_id UUID, password_input TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    stored_hash TEXT;
BEGIN
    SELECT password_hash INTO stored_hash
    FROM usuarios
    WHERE id = user_id;

    IF stored_hash IS NULL THEN
        RETURN FALSE;
    END IF;

    RETURN stored_hash = MD5(password_input);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para cambiar password
CREATE OR REPLACE FUNCTION cambiar_password(
    user_id UUID,
    old_password TEXT,
    new_password TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
    is_valid BOOLEAN;
BEGIN
    -- Verificar password actual
    SELECT verificar_password(user_id, old_password) INTO is_valid;

    IF NOT is_valid THEN
        RAISE EXCEPTION 'Contraseña actual incorrecta';
    END IF;

    -- Actualizar con nuevo password hasheado
    UPDATE usuarios
    SET password_hash = MD5(new_password),
        updated_at = NOW()
    WHERE id = user_id;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para login con MD5
CREATE OR REPLACE FUNCTION login_usuario(
    email_input TEXT,
    password_input TEXT
)
RETURNS TABLE (
    id UUID,
    email VARCHAR,
    nombre VARCHAR,
    avatar VARCHAR,
    rol_id INTEGER,
    rol_nombre VARCHAR,
    activo BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        u.id,
        u.email,
        u.nombre,
        u.avatar,
        u.rol_id,
        r.nombre AS rol_nombre,
        u.activo
    FROM usuarios u
    LEFT JOIN roles r ON u.rol_id = r.id
    WHERE u.email = LOWER(TRIM(email_input))
      AND u.password_hash = MD5(password_input)
      AND u.activo = true;

    -- Actualizar último acceso si login exitoso
    UPDATE usuarios
    SET ultimo_acceso = NOW()
    WHERE usuarios.email = LOWER(TRIM(email_input))
      AND usuarios.password_hash = MD5(password_input);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para crear usuario con password MD5
CREATE OR REPLACE FUNCTION crear_usuario(
    p_email TEXT,
    p_nombre TEXT,
    p_password TEXT,
    p_avatar TEXT DEFAULT '📚',
    p_rol_id INTEGER DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    new_user_id UUID;
    default_rol_id INTEGER;
BEGIN
    -- Obtener rol por defecto (estudiante) si no se especifica
    IF p_rol_id IS NULL THEN
        SELECT id INTO default_rol_id FROM roles WHERE nombre = 'estudiante' LIMIT 1;
    ELSE
        default_rol_id := p_rol_id;
    END IF;

    -- Insertar usuario con password hasheado
    INSERT INTO usuarios (email, nombre, password_hash, avatar, rol_id, activo)
    VALUES (
        LOWER(TRIM(p_email)),
        TRIM(p_nombre),
        MD5(p_password),
        p_avatar,
        default_rol_id,
        true
    )
    RETURNING id INTO new_user_id;

    RETURN new_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Función para aprobar solicitud de cuenta
CREATE OR REPLACE FUNCTION aprobar_solicitud_cuenta(
    p_solicitud_id UUID,
    p_admin_id UUID,
    p_notas TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    solicitud RECORD;
    nuevo_usuario_id UUID;
    rol_estudiante_id INTEGER;
BEGIN
    -- Obtener la solicitud
    SELECT * INTO solicitud
    FROM solicitudes_cuenta
    WHERE id = p_solicitud_id AND estado = 'pendiente';

    IF solicitud IS NULL THEN
        RAISE EXCEPTION 'Solicitud no encontrada o ya procesada';
    END IF;

    -- Obtener rol de estudiante
    SELECT id INTO rol_estudiante_id FROM roles WHERE nombre = 'estudiante' LIMIT 1;

    -- Crear usuario (el password_hash ya viene hasheado de la solicitud)
    INSERT INTO usuarios (nombre, email, password_hash, avatar, rol_id, activo)
    VALUES (
        solicitud.nombre,
        solicitud.email,
        solicitud.password_hash, -- Ya está hasheado con MD5
        COALESCE(solicitud.avatar, '📚'),
        rol_estudiante_id,
        true
    )
    RETURNING id INTO nuevo_usuario_id;

    -- Actualizar solicitud
    UPDATE solicitudes_cuenta
    SET estado = 'aprobada',
        admin_id = p_admin_id,
        notas_admin = p_notas,
        processed_at = NOW()
    WHERE id = p_solicitud_id;

    -- Crear notificación de bienvenida
    INSERT INTO notificaciones (usuario_id, tipo, titulo, mensaje, icono, color)
    VALUES (
        nuevo_usuario_id,
        'sistema',
        '🎉 ¡Bienvenido a EGEL Study!',
        'Tu solicitud de cuenta ha sido aprobada. ¡Comienza a estudiar ahora!',
        '✅',
        '#22c55e'
    );

    RETURN nuevo_usuario_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para hashear password al insertar/actualizar (opcional, para casos legacy)
CREATE OR REPLACE FUNCTION hashear_password_trigger()
RETURNS TRIGGER AS $$
BEGIN
    -- Solo hashear si el password no parece ya estar hasheado (32 chars hex)
    IF NEW.password_hash IS NOT NULL AND LENGTH(NEW.password_hash) != 32 THEN
        NEW.password_hash := MD5(NEW.password_hash);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear trigger (comentado por si interfiere)
-- DROP TRIGGER IF EXISTS trigger_hash_password ON usuarios;
-- CREATE TRIGGER trigger_hash_password
--     BEFORE INSERT OR UPDATE OF password_hash ON usuarios
--     FOR EACH ROW
--     EXECUTE FUNCTION hashear_password_trigger();

-- Actualizar passwords existentes a MD5 (solo si no están ya hasheados)
-- NOTA: Ejecutar esto solo una vez y con cuidado
-- UPDATE usuarios
-- SET password_hash = MD5(password_hash)
-- WHERE LENGTH(password_hash) != 32;
