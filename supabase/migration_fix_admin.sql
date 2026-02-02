-- ==============================================================================
-- SCRIPT DE MIGRACIÓN: CORRECCIÓN DE SCHEMA Y PERMISOS (RLS) PARA ADMIN PANEL
-- ==============================================================================
-- Instrucciones: Ejecuta este script en el Editor SQL de tu proyecto Supabase.
-- Resolverá los errores: "Could not find the 'activo' column", "new row violates RLS policy".

-- 1. CORRECCIÓN DE SCHEMA: Agregar columna 'activo' a modulos
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'modulos' AND column_name = 'activo') THEN
        ALTER TABLE modulos ADD COLUMN activo BOOLEAN DEFAULT true;
    END IF;
END $$;

-- 2. CORRECCIÓN DE PERMISOS RLS (Row Level Security)

-- Habilitar RLS explícitamente (si no lo está)
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE modulos ENABLE ROW LEVEL SECURITY;
ALTER TABLE preguntas ENABLE ROW LEVEL SECURITY;
ALTER TABLE contenido_clase ENABLE ROW LEVEL SECURITY;

-- Eliminamos políticas antiguas conflictivas para recrearlas limpiamente
DROP POLICY IF EXISTS "Usuarios pueden ver sus propios datos" ON usuarios;
DROP POLICY IF EXISTS "Admins pueden ver todo" ON usuarios;
DROP POLICY IF EXISTS "Admins pueden insertar usuarios" ON usuarios;
DROP POLICY IF EXISTS "Admins pueden actualizar usuarios" ON usuarios;
DROP POLICY IF EXISTS "Admins pueden eliminar usuarios" ON usuarios;

DROP POLICY IF EXISTS "Lectura pública de módulos" ON modulos;
DROP POLICY IF EXISTS "Admins pueden gestionar modulos" ON modulos;

DROP POLICY IF EXISTS "Lectura pública de preguntas" ON preguntas;
DROP POLICY IF EXISTS "Admins pueden gestionar preguntas" ON preguntas;

-- === POLÍTICAS PARA USUARIOS ===
-- Permitir lectura basica
CREATE POLICY "Usuarios ven su propio perfil" ON usuarios 
    FOR SELECT USING (auth.uid() = id);

-- CRÍTICO: Permitir a los Admins (rol_id=1) crear, ver y editar CUALQUIER usuario
CREATE POLICY "Admins gestionan todo usuarios" ON usuarios
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM usuarios u 
            WHERE u.id = auth.uid() AND u.rol_id = 1
        )
    );

-- Nota: Si tu usuario actual NO es admin aún, necesitas insertarlo manualmente o deshabilitar RLS temporalmente
-- Para deshabilitar RLS temporalmente si te bloqueas a ti mismo: ALTER TABLE usuarios DISABLE ROW LEVEL SECURITY;

-- === POLÍTICAS PARA MÓDULOS ===
CREATE POLICY "Lectura pública de módulos" ON modulos
    FOR SELECT USING (true);

CREATE POLICY "Admins gestionan modulos" ON modulos
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM usuarios u 
            WHERE u.id = auth.uid() AND u.rol_id = 1
        )
    );

-- === POLÍTICAS PARA PREGUNTAS ===
CREATE POLICY "Lectura pública de preguntas" ON preguntas
    FOR SELECT USING (true);

CREATE POLICY "Admins gestionan preguntas" ON preguntas
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM usuarios u 
            WHERE u.id = auth.uid() AND u.rol_id = 1
        )
    );

-- === POLÍTICAS PARA CONTENIDO CLASE ===
CREATE POLICY "Lectura pública de contenido" ON contenido_clase
    FOR SELECT USING (true);

CREATE POLICY "Admins gestionan contenido" ON contenido_clase
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM usuarios u 
            WHERE u.id = auth.uid() AND u.rol_id = 1
        )
    );
