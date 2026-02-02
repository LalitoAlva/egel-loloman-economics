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
    audio_url TEXT,
    infografia_url TEXT,
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insertar los 6 módulos originales (según courseContent.js y assets)
INSERT INTO modulos (slug, titulo, descripcion, icon, color, numero, audio_url, infografia_url) VALUES
    ('eco-1', 'Economía I: Fundamentos Micro y Macro', 'Teoría del Consumidor, Productor y Equilibrio Macroeconómico', '📊', '#38bdf8', 1, '/assets/audio/1.5.MacroMicroEconomia.m4a', '/assets/infografias/1.3.MacroMicroEconomia.png'),
    ('eco-2', 'Economía II: Finanzas', 'Proyectos y Riesgo', '📈', '#4ade80', 2, '/assets/audio/2.5.ProyectosYRIesgo.m4a', '/assets/infografias/2.3.ProyectosYRiesgo.png'),
    ('eco-3', 'Economía III: Internacional', 'Comercio y Bienestar', '🌍', '#facc15', 3, '/assets/audio/3.5.Internacional.m4a', '/assets/infografias/3.3.Internacional.png'),
    ('con-1', 'Contaduría I: Información', 'Costos y Normas', '📑', '#f472b6', 4, '/assets/audio/4.5.CostosYNormas.m4a', '/assets/infografias/4.3.CostosYNormas.png'),
    ('con-2', 'Contaduría II: Fiscal', 'Impuestos y Leyes', '⚖️', '#a78bfa', 5, '/assets/audio/5.5.ImpuestosYLeyes.m4a', '/assets/infografias/5.3.ImpuestosYLeyes.png'),
    ('con-3', 'Contaduría III: Auditoría', 'Dictámenes y Control', '🔍', '#fb923c', 6, '/assets/audio/6.5.DictamenesYControl.m4a', '/assets/infografias/6.4.DictamenesYControl.png');

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
-- Mapea los subtemas antiguos a los 6 módulos nuevos
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
JOIN modulos m ON m.slug = (
    CASE 
        -- ECO-1: Micro y Macro Fundamentos
        WHEN b.subtema IN ('teoria_consumidor', 'elasticidades', 'teoria_productor', 'costos', 'estructuras_mercado', 'teoria_juegos', 'pib_contabilidad', 'modelo_islm', 'politica_fiscal', 'politica_monetaria', 'mundell_fleming', 'oferta_demanda_agregada', 'inflacion_phillips', 'crecimiento_solow') THEN 'eco-1'
        
        -- ECO-2: Finanzas
        WHEN b.subtema IN ('interes', 'valor_temporal', 'van_tir', 'van', 'riesgo', 'descuento', 'tir', 'amortizacion', 'costo_capital', 'flujos') THEN 'eco-2'
        WHEN b.subtema = 'evaluacion' AND b.tema IN ('Período de Recuperación', 'Limitaciones del Payback', 'Índice de Rentabilidad', 'Razón Beneficio-Costo') THEN 'eco-2'
        
        -- ECO-3: Internacional
        WHEN b.subtema IN ('internacional', 'comercio', 'balanza_pagos') THEN 'eco-3'
        
        -- CON-1: Información Financiera
        WHEN b.subtema IN ('postulados', 'caracteristicas', 'elementos', 'juicio', 'marco', 'valuacion', 'presentacion') THEN 'con-1'
        
        -- CON-2: Fiscal
        WHEN b.subtema IN ('iva', 'acreditamiento', 'isr', 'presuntiva', 'seguro_social', 'obligaciones', 'gobierno', 'laboral') THEN 'con-2'
        
        -- CON-3: Auditoría
        WHEN b.subtema IN ('evidencia', 'procedimientos', 'coso', 'dictamen', 'riesgo_auditoria', 'documentacion', 'expertos', 'materialidad') THEN 'con-3'
        
        -- Excluir otros (pedagogía, etc.)
        ELSE NULL
    END
)
WHERE b.subtema IS NOT NULL;

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
