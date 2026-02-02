-- ============================================
-- MIGRACIÓN OPCIONAL: Usar modulo_id (FK) en lugar de modulo (texto)
-- ============================================
-- NOTA: Esta migración es OPCIONAL. El código ya funciona con tu esquema actual.
-- Ejecutar esto solo si deseas un diseño de base de datos más normalizado.

-- Paso 1: Crear tabla modulos si no existe
CREATE TABLE IF NOT EXISTS modulos (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    icon VARCHAR(10) DEFAULT '📚',
    color VARCHAR(20) DEFAULT '#a855f7',
    numero INTEGER,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Paso 2: Insertar módulos basados en los valores únicos de tu tabla preguntas
INSERT INTO modulos (slug, titulo, descripcion, icon, color, numero)
SELECT DISTINCT
    modulo,
    CASE modulo
        WHEN 'costos_normas' THEN 'Costos y Normas'
        WHEN 'dictamenes_control' THEN 'Dictámenes y Control'
        WHEN 'fiscal' THEN 'Fiscal'
        WHEN 'auditoria' THEN 'Auditoría'
        WHEN 'finanzas' THEN 'Finanzas'
        WHEN 'contabilidad' THEN 'Contabilidad'
        WHEN 'administracion' THEN 'Administración'
        WHEN 'economia' THEN 'Economía'
        WHEN 'microeconomia' THEN 'Microeconomía'
        WHEN 'macroeconomia' THEN 'Macroeconomía'
        ELSE INITCAP(REPLACE(modulo, '_', ' '))
    END,
    CASE modulo
        WHEN 'costos_normas' THEN 'Normas contables y control de costos'
        WHEN 'dictamenes_control' THEN 'Control interno y dictámenes financieros'
        WHEN 'fiscal' THEN 'Impuestos y legislación fiscal'
        WHEN 'auditoria' THEN 'Procedimientos y técnicas de auditoría'
        WHEN 'finanzas' THEN 'Finanzas corporativas y mercados'
        WHEN 'contabilidad' THEN 'Contabilidad general y financiera'
        WHEN 'administracion' THEN 'Administración de empresas'
        WHEN 'economia' THEN 'Teoría económica general'
        WHEN 'microeconomia' THEN 'Comportamiento de agentes económicos'
        WHEN 'macroeconomia' THEN 'Economía a nivel agregado'
        ELSE 'Preguntas de práctica'
    END,
    CASE modulo
        WHEN 'costos_normas' THEN '📊'
        WHEN 'dictamenes_control' THEN '📋'
        WHEN 'fiscal' THEN '🏛️'
        WHEN 'auditoria' THEN '🔍'
        WHEN 'finanzas' THEN '💰'
        WHEN 'contabilidad' THEN '📒'
        WHEN 'administracion' THEN '📈'
        WHEN 'economia' THEN '🌐'
        WHEN 'microeconomia' THEN '📉'
        WHEN 'macroeconomia' THEN '📊'
        ELSE '📚'
    END,
    CASE modulo
        WHEN 'costos_normas' THEN '#3b82f6'
        WHEN 'dictamenes_control' THEN '#10b981'
        WHEN 'fiscal' THEN '#f59e0b'
        WHEN 'auditoria' THEN '#8b5cf6'
        WHEN 'finanzas' THEN '#ef4444'
        WHEN 'contabilidad' THEN '#06b6d4'
        WHEN 'administracion' THEN '#ec4899'
        WHEN 'economia' THEN '#14b8a6'
        WHEN 'microeconomia' THEN '#6366f1'
        WHEN 'macroeconomia' THEN '#22c55e'
        ELSE '#a855f7'
    END,
    ROW_NUMBER() OVER (ORDER BY modulo)
FROM preguntas
WHERE modulo IS NOT NULL
ON CONFLICT (slug) DO NOTHING;

-- Paso 3: Agregar columna modulo_id a preguntas si no existe
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'preguntas' AND column_name = 'modulo_id'
    ) THEN
        ALTER TABLE preguntas ADD COLUMN modulo_id INTEGER;
    END IF;
END $$;

-- Paso 4: Actualizar modulo_id basado en el texto modulo
UPDATE preguntas p
SET modulo_id = m.id
FROM modulos m
WHERE p.modulo = m.slug
  AND p.modulo_id IS NULL;

-- Paso 5: Agregar FK constraint (opcional, comentado por seguridad)
-- ALTER TABLE preguntas
-- ADD CONSTRAINT fk_preguntas_modulo
-- FOREIGN KEY (modulo_id) REFERENCES modulos(id);

-- Verificar la migración
SELECT
    'Módulos creados:' as info,
    COUNT(*) as cantidad
FROM modulos;

SELECT
    'Preguntas actualizadas:' as info,
    COUNT(*) as cantidad
FROM preguntas
WHERE modulo_id IS NOT NULL;

SELECT
    'Preguntas sin modulo_id:' as info,
    COUNT(*) as cantidad
FROM preguntas
WHERE modulo_id IS NULL;

-- Mostrar distribución de preguntas por módulo
SELECT
    m.titulo,
    m.icon,
    COUNT(p.id) as preguntas
FROM modulos m
LEFT JOIN preguntas p ON p.modulo_id = m.id
GROUP BY m.id, m.titulo, m.icon
ORDER BY m.numero;
