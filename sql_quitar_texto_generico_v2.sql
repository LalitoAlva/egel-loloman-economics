-- =============================================
-- V2: QUITAR TEXTO GENÉRICO (con regexp_replace)
-- =============================================
-- Usa regexp_replace para ser flexible con whitespace.
-- Quita de 58 registros donde NO aplica.
-- Conserva en 21 temas de micro donde SÍ aplica.
-- =============================================

-- PASO 1: Quitar bloque INTUICIÓN genérico
UPDATE contenido_clase
SET contenido = regexp_replace(
  contenido,
  '<section class="bloque intuicion">\s*<h3>🧠 Intuición</h3>\s*<p>Usa este flujo mental:.*?reconoce la forma.*?condición correcta\.</p>\s*</section>',
  '',
  'gs'
)
WHERE id IN (
  377, 378, 379, 380, 381, 382, 383, 384, 385, 386,
  387, 388, 389, 390, 391, 392, 393, 394, 395, 396,
  397, 398, 399, 400, 401, 402, 403, 404, 405, 406,
  407, 408, 409, 410, 411,
  412, 413, 414, 415, 416, 417, 418, 419, 420, 421,
  422, 423, 424,
  472, 490,
  493, 494, 495, 496, 497, 498, 499, 500
)
AND contenido ~ 'flujo mental';


-- PASO 2: Quitar bloque RECONOCIMIENTO genérico (Cómo sale en EGEL)
UPDATE contenido_clase
SET contenido = regexp_replace(
  contenido,
  '<section class="bloque reconocimiento">\s*<section class="subbloque">\s*<h4>🧭 Cómo sale en EGEL</h4>\s*<ul>\s*<li>Identifica: definición.*?condición de equilibrio\.</li>\s*<li>Pregunta típica:.*?dónde está el óptimo\?.*?</li>\s*</ul>\s*</section>\s*</section>',
  '',
  'gs'
)
WHERE id IN (
  377, 378, 379, 380, 381, 382, 383, 384, 385, 386,
  387, 388, 389, 390, 391, 392, 393, 394, 395, 396,
  397, 398, 399, 400, 401, 402, 403, 404, 405, 406,
  407, 408, 409, 410, 411,
  412, 413, 414, 415, 416, 417, 418, 419, 420, 421,
  422, 423, 424,
  472, 490,
  493, 494, 495, 496, 497, 498, 499, 500
)
AND contenido ~ 'Cómo sale en EGEL';


-- =============================================
-- VERIFICACIÓN
-- =============================================

-- Debe dar 0: nadie fuera de micro con texto genérico
SELECT id, modulo_id, titulo
FROM contenido_clase
WHERE contenido LIKE '%flujo mental%'
  AND id NOT IN (473, 475, 476, 477, 478, 479, 480, 481, 482, 483,
                 484, 485, 486, 487, 488, 489, 491, 492, 501, 502, 503);

-- Debe dar 21: los de micro que SÍ lo conservan
SELECT id, modulo_id, titulo
FROM contenido_clase
WHERE contenido LIKE '%flujo mental%'
  AND id IN (473, 475, 476, 477, 478, 479, 480, 481, 482, 483,
             484, 485, 486, 487, 488, 489, 491, 492, 501, 502, 503);
