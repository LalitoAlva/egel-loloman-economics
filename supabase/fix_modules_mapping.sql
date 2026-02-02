-- ============================================
-- SCRIPT DE CORRECCIÓN: Ajustar Módulos y Preguntas
-- ============================================
-- Este script:
-- 1. Asegura que existan los 6 módulos correctos
-- 2. Actualiza las preguntas existentes para apuntar a estos 6 módulos
-- 3. Elimina módulos y preguntas "basura" (pedagogía, etc.)

-- 0. Asegurar que las columnas existan en la tabla modulos
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

ALTER TABLE modulos ADD COLUMN IF NOT EXISTS audio_url TEXT;
ALTER TABLE modulos ADD COLUMN IF NOT EXISTS infografia_url TEXT;

-- 1. Insertar o Actualizar los 6 Módulos Originales
INSERT INTO modulos (slug, titulo, descripcion, icon, color, numero, audio_url, infografia_url) VALUES
    ('eco-1', 'Economía I: Fundamentos Micro y Macro', 'Teoría del Consumidor, Productor y Equilibrio Macroeconómico', '📊', '#38bdf8', 1, '/assets/audio/1.5.MacroMicroEconomia.m4a', '/assets/infografias/1.3.MacroMicroEconomia.png'),
    ('eco-2', 'Economía II: Finanzas', 'Proyectos y Riesgo', '📈', '#4ade80', 2, '/assets/audio/2.5.ProyectosYRIesgo.m4a', '/assets/infografias/2.3.ProyectosYRiesgo.png'),
    ('eco-3', 'Economía III: Internacional', 'Comercio y Bienestar', '🌍', '#facc15', 3, '/assets/audio/3.5.Internacional.m4a', '/assets/infografias/3.3.Internacional.png'),
    ('con-1', 'Contaduría I: Información', 'Costos y Normas', '📑', '#f472b6', 4, '/assets/audio/4.5.CostosYNormas.m4a', '/assets/infografias/4.3.CostosYNormas.png'),
    ('con-2', 'Contaduría II: Fiscal', 'Impuestos y Leyes', '⚖️', '#a78bfa', 5, '/assets/audio/5.5.ImpuestosYLeyes.m4a', '/assets/infografias/5.3.ImpuestosYLeyes.png'),
    ('con-3', 'Contaduría III: Auditoría', 'Dictámenes y Control', '🔍', '#fb923c', 6, '/assets/audio/6.5.DictamenesYControl.m4a', '/assets/infografias/6.4.DictamenesYControl.png')
ON CONFLICT (slug) DO UPDATE SET
    titulo = EXCLUDED.titulo,
    descripcion = EXCLUDED.descripcion,
    icon = EXCLUDED.icon,
    color = EXCLUDED.color,
    numero = EXCLUDED.numero,
    audio_url = EXCLUDED.audio_url,
    infografia_url = EXCLUDED.infografia_url;

-- 2. Actualizar las preguntas para mapearlas a los nuevos módulos según su subtema
UPDATE preguntas p
SET modulo_id = m.id
FROM modulos m
WHERE m.slug = (
    CASE 
        -- ECO-1
        WHEN p.subtema IN ('teoria_consumidor', 'elasticidades', 'teoria_productor', 'costos', 'estructuras_mercado', 'teoria_juegos', 'pib_contabilidad', 'modelo_islm', 'politica_fiscal', 'politica_monetaria', 'mundell_fleming', 'oferta_demanda_agregada', 'inflacion_phillips', 'crecimiento_solow') THEN 'eco-1'
        -- ECO-2
        WHEN p.subtema IN ('interes', 'valor_temporal', 'van_tir', 'van', 'riesgo', 'descuento', 'tir', 'amortizacion', 'costo_capital', 'flujos') THEN 'eco-2'
        WHEN p.subtema = 'evaluacion' AND p.tema IN ('Período de Recuperación', 'Limitaciones del Payback', 'Índice de Rentabilidad', 'Razón Beneficio-Costo') THEN 'eco-2'
        -- ECO-3
        WHEN p.subtema IN ('internacional', 'comercio', 'balanza_pagos') THEN 'eco-3'
        -- CON-1
        WHEN p.subtema IN ('postulados', 'caracteristicas', 'elementos', 'juicio', 'marco', 'valuacion', 'presentacion') THEN 'con-1'
        -- CON-2
        WHEN p.subtema IN ('iva', 'acreditamiento', 'isr', 'presuntiva', 'seguro_social', 'obligaciones', 'gobierno', 'laboral') THEN 'con-2'
        -- CON-3
        WHEN p.subtema IN ('evidencia', 'procedimientos', 'coso', 'dictamen', 'riesgo_auditoria', 'documentacion', 'expertos', 'materialidad') THEN 'con-3'
        ELSE NULL
    END
)
AND p.subtema IS NOT NULL;

-- 3. Eliminar preguntas que quedaron huérfanas (no corresponden a los 6 módulos)
-- Esto borrará las preguntas de pedagogía/educación
DELETE FROM preguntas 
WHERE modulo_id NOT IN (
    SELECT id FROM modulos WHERE slug IN ('eco-1', 'eco-2', 'eco-3', 'con-1', 'con-2', 'con-3')
);

-- 4. Eliminar módulos antiguos que ya no se usan (limpieza)
DELETE FROM modulos 
WHERE slug NOT IN ('eco-1', 'eco-2', 'eco-3', 'con-1', 'con-2', 'con-3');

-- Confirmación
SELECT m.slug, COUNT(p.id) as preguntas_count 
FROM modulos m 
LEFT JOIN preguntas p ON p.modulo_id = m.id 
GROUP BY m.slug 
ORDER BY m.slug;
