-- =========================================================================
-- SCRIPT DE EMERGENCIA: DESHABILITAR RLS TEMPORALMENTE
-- =========================================================================
-- Si las pantallas están vacías después del script anterior,
-- ejecuta esto para DESACTIVAR RLS y permitir lectura/escritura total.
-- ⚠️ ESTO ES TEMPORAL - Solo para desarrollo/debug

-- Deshabilitar RLS en todas las tablas
ALTER TABLE usuarios DISABLE ROW LEVEL SECURITY;
ALTER TABLE modulos DISABLE ROW LEVEL SECURITY;
ALTER TABLE preguntas DISABLE ROW LEVEL SECURITY;
ALTER TABLE contenido_clase DISABLE ROW LEVEL SECURITY;
ALTER TABLE roles DISABLE ROW LEVEL SECURITY;

-- Limipiar TODAS las políticas existentes
DROP POLICY IF EXISTS "Usuarios ven su propio perfil" ON usuarios;
DROP POLICY IF EXISTS "Admins gestionan todo usuarios" ON usuarios;
DROP POLICY IF EXISTS "Lectura pública de módulos" ON modulos;
DROP POLICY IF EXISTS "Admins gestionan modulos" ON modulos;
DROP POLICY IF EXISTS "Lectura pública de preguntas" ON preguntas;
DROP POLICY IF EXISTS "Admins gestionan preguntas" ON preguntas;
DROP POLICY IF EXISTS "Lectura pública de contenido" ON contenido_clase;
DROP POLICY IF EXISTS "Admins gestionan contenido" ON contenido_clase;
