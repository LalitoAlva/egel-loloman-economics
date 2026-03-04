-- =============================================
-- V3: QUITAR TEXTO GENÉRICO DE TODOS LOS REGISTROS
-- =============================================

-- PASO 1: Quitar bloque INTUICIÓN genérico de TODOS los que lo tengan
UPDATE contenido_clase
SET contenido = regexp_replace(
  contenido,
  '<section class="bloque intuicion">\s*<h3>🧠 Intuición</h3>\s*<p>Usa este flujo mental:.*?reconoce la forma.*?condición correcta\.</p>\s*</section>',
  '',
  'gs'
)
WHERE contenido ~ 'flujo mental';


-- PASO 2: Quitar bloque RECONOCIMIENTO genérico de TODOS los que lo tengan
UPDATE contenido_clase
SET contenido = regexp_replace(
  contenido,
  '<section class="bloque reconocimiento">\s*<section class="subbloque">\s*<h4>🧭 Cómo sale en EGEL</h4>\s*<ul>\s*<li>Identifica: definición.*?condición de equilibrio\.</li>\s*<li>Pregunta típica:.*?dónde está el óptimo\?.*?</li>\s*</ul>\s*</section>\s*</section>',
  '',
  'gs'
)
WHERE contenido ~ 'Cómo sale en EGEL';


-- =============================================
-- VERIFICACIÓN: ambas deben dar 0
-- =============================================
SELECT count(*) AS quedan_con_flujo_mental FROM contenido_clase WHERE contenido LIKE '%flujo mental%';
SELECT count(*) AS quedan_con_egel_tip FROM contenido_clase WHERE contenido LIKE '%Cómo sale en EGEL%';
