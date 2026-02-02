-- ============================================
-- MIGRACIÓN COMPLETA: Recrear esquema con modulo_id (FK)
-- ============================================
-- Este script:
-- 1. Respalda tus preguntas existentes
-- 2. Elimina tablas antiguas (manejando FKs)
-- 3. Crea esquema nuevo con modulo_id como FK
-- 4. Restaura todas tus preguntas
-- ============================================

-- ============================================
-- PASO 1: CREAR TABLA TEMPORAL PARA BACKUP
-- ============================================
DROP TABLE IF EXISTS preguntas_backup;

CREATE TABLE preguntas_backup AS
SELECT * FROM preguntas;

-- Verificar backup
SELECT 'Preguntas respaldadas:' as info, COUNT(*) as cantidad FROM preguntas_backup;

-- ============================================
-- PASO 2: ELIMINAR TABLAS EXISTENTES (orden correcto por FKs)
-- ============================================

-- Primero eliminar tablas que dependen de preguntas
DROP TABLE IF EXISTS respuestas_examen CASCADE;
DROP TABLE IF EXISTS examenes CASCADE;

-- Eliminar preguntas
DROP TABLE IF EXISTS preguntas CASCADE;

-- Eliminar modulos si existe
DROP TABLE IF EXISTS modulos CASCADE;

-- ============================================
-- PASO 3: CREAR TABLA MODULOS
-- ============================================
CREATE TABLE modulos (
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

-- Insertar módulos basados en los valores únicos del backup
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
        ELSE 'Preguntas de práctica para el EGEL'
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
FROM preguntas_backup
WHERE modulo IS NOT NULL
GROUP BY modulo;

-- ============================================
-- PASO 4: CREAR TABLA PREGUNTAS CON modulo_id FK
-- ============================================
CREATE TABLE preguntas (
    id SERIAL PRIMARY KEY,
    modulo_id INTEGER NOT NULL REFERENCES modulos(id) ON DELETE CASCADE,
    subtema VARCHAR(200),
    tema VARCHAR(200),
    nivel VARCHAR(50) DEFAULT 'intermedio',
    tipo VARCHAR(50) DEFAULT 'opcion_multiple',
    pregunta TEXT NOT NULL,
    opcion_a TEXT,
    opcion_b TEXT,
    opcion_c TEXT,
    opcion_d TEXT,
    respuesta_correcta CHAR(1),
    explicacion TEXT,
    formula TEXT,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_preguntas_modulo ON preguntas(modulo_id);
CREATE INDEX idx_preguntas_nivel ON preguntas(nivel);
CREATE INDEX idx_preguntas_activo ON preguntas(activo);

-- ============================================
-- PASO 5: RESTAURAR PREGUNTAS CON modulo_id
-- ============================================
INSERT INTO preguntas (modulo_id, subtema, tema, nivel, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo, created_at)
SELECT
    m.id as modulo_id,
    b.subtema,
    b.tema,
    COALESCE(b.nivel, 'intermedio'),
    b.pregunta,
    b.opcion_a,
    b.opcion_b,
    b.opcion_c,
    b.opcion_d,
    b.respuesta_correcta,
    b.explicacion,
    b.formula,
    COALESCE(b.activo, true),
    COALESCE(b.created_at, NOW())
FROM preguntas_backup b
JOIN modulos m ON m.slug = b.modulo
WHERE b.modulo IS NOT NULL;

-- ============================================
-- PASO 6: RECREAR TABLAS DE EXÁMENES
-- ============================================
CREATE TABLE examenes (
    id SERIAL PRIMARY KEY,
    usuario_id UUID NOT NULL,
    tipo VARCHAR(50) DEFAULT 'quiz',
    modulo_id INTEGER REFERENCES modulos(id),
    total_preguntas INTEGER DEFAULT 0,
    correctas INTEGER DEFAULT 0,
    incorrectas INTEGER DEFAULT 0,
    porcentaje DECIMAL(5,2) DEFAULT 0,
    tiempo_limite_min INTEGER,
    tiempo_segundos INTEGER,
    fecha_inicio TIMESTAMP DEFAULT NOW(),
    fecha_fin TIMESTAMP,
    completado BOOLEAN DEFAULT false,
    tiempo_agotado BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE respuestas_examen (
    id SERIAL PRIMARY KEY,
    examen_id INTEGER NOT NULL REFERENCES examenes(id) ON DELETE CASCADE,
    pregunta_id INTEGER NOT NULL REFERENCES preguntas(id) ON DELETE CASCADE,
    respuesta_usuario CHAR(1),
    es_correcta BOOLEAN DEFAULT false,
    tiempo_respuesta_seg INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para exámenes
CREATE INDEX idx_examenes_usuario ON examenes(usuario_id);
CREATE INDEX idx_examenes_tipo ON examenes(tipo);
CREATE INDEX idx_respuestas_examen ON respuestas_examen(examen_id);

-- ============================================
-- PASO 7: VERIFICACIÓN FINAL
-- ============================================
SELECT '=== MIGRACIÓN COMPLETADA ===' as resultado;

SELECT 'Módulos creados:' as tabla, COUNT(*) as cantidad FROM modulos
UNION ALL
SELECT 'Preguntas restauradas:', COUNT(*) FROM preguntas
UNION ALL
SELECT 'Preguntas en backup:', COUNT(*) FROM preguntas_backup;

-- Mostrar distribución por módulo
SELECT
    m.icon,
    m.titulo,
    COUNT(p.id) as preguntas,
    m.color
FROM modulos m
LEFT JOIN preguntas p ON p.modulo_id = m.id
GROUP BY m.id, m.icon, m.titulo, m.color, m.numero
ORDER BY m.numero;

-- ============================================
-- PASO 8: LIMPIAR BACKUP (opcional - descomentar cuando confirmes que todo está bien)
-- ============================================
-- DROP TABLE IF EXISTS preguntas_backup;

SELECT '¡Listo! Ejecuta: DROP TABLE preguntas_backup; cuando confirmes que todo funciona.' as nota;
