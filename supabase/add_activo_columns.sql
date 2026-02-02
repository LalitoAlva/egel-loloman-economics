-- =========================================================================
-- AGREGAR COLUMNA 'activo' A TODAS LAS TABLAS DEL ADMIN PANEL
-- =========================================================================

-- Agregar columna 'activo' a usuarios (si no existe)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'usuarios' AND column_name = 'activo') THEN
        ALTER TABLE usuarios ADD COLUMN activo BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Agregar columna 'activo' a roles (si no existe)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'roles' AND column_name = 'activo') THEN
        ALTER TABLE roles ADD COLUMN activo BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Agregar columna 'activo' a modulos (si no existe)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'modulos' AND column_name = 'activo') THEN
        ALTER TABLE modulos ADD COLUMN activo BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Agregar columna 'activo' a preguntas (si no existe)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'preguntas' AND column_name = 'activo') THEN
        ALTER TABLE preguntas ADD COLUMN activo BOOLEAN DEFAULT true;
    END IF;
END $$;

-- Asegurarse de que todos los registros existentes tengan activo = true
UPDATE usuarios SET activo = true WHERE activo IS NULL;
UPDATE roles SET activo = true WHERE activo IS NULL;
UPDATE modulos SET activo = true WHERE activo IS NULL;
UPDATE preguntas SET activo = true WHERE activo IS NULL;
