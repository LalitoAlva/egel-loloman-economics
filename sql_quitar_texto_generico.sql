-- =============================================
-- QUITAR TEXTO GENÉRICO DE INTUICIÓN Y EGEL
-- =============================================
-- 79 registros tienen el bloque genérico de "Intuición" (flujo mental: reconoce la forma...)
-- 74 registros tienen el bloque genérico de "Cómo sale en EGEL" (definición → gráfica...)
--
-- Ese texto SOLO aplica a temas de teoría del consumidor/productor (micro).
-- Se MANTIENE en 21 temas de micro (IDs: 473, 475-489, 491-492, 501-503).
-- Se QUITA de 58 registros donde NO tiene sentido:
--   - ID 472 (Intro y Autores)
--   - ID 490 (Estructuras de Mercado)
--   - IDs 493-500 (Módulo 2: Macro/Finanzas)
--   - IDs 377-411 (Módulo 4: Contaduría Información)
--   - IDs 412-424 (Módulo 5: Contaduría Fiscal)
-- =============================================


-- PASO 1: Quitar bloque genérico de INTUICIÓN
UPDATE contenido_clase
SET contenido = REPLACE(
  contenido,
  '<section class="bloque intuicion">
    <h3>🧠 Intuición</h3>
    <p>Usa este flujo mental: <strong>reconoce la forma</strong> (suma/min/producto), <strong>decide</strong> si el óptimo es interior o esquina, y <strong>resuelve</strong> con la condición correcta.</p>
  </section>',
  ''
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
);


-- PASO 2: Quitar bloque genérico de CÓMO SALE EN EGEL
UPDATE contenido_clase
SET contenido = REPLACE(
  contenido,
  '<section class="bloque reconocimiento">
    <section class="subbloque">
  <h4>🧭 Cómo sale en EGEL</h4>
  <ul>
    <li>Identifica: definición → gráfica/fórmula → condición de equilibrio.</li>
    <li>Pregunta típica: "¿qué pasa si sube el precio/ingreso?" o "¿dónde está el óptimo?"</li>
  </ul>
</section>
  </section>',
  ''
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
);


-- =============================================
-- VERIFICACIÓN
-- =============================================

-- Debe dar 0 (ningún registro fuera de micro con el texto genérico)
SELECT id, modulo_id, titulo
FROM contenido_clase
WHERE contenido LIKE '%flujo mental%'
  AND id NOT IN (473, 475, 476, 477, 478, 479, 480, 481, 482, 483,
                 484, 485, 486, 487, 488, 489, 491, 492, 501, 502, 503);

-- Los 21 de micro que SÍ deben conservarlo
SELECT id, modulo_id, titulo
FROM contenido_clase
WHERE contenido LIKE '%flujo mental%'
  AND id IN (473, 475, 476, 477, 478, 479, 480, 481, 482, 483,
             484, 485, 486, 487, 488, 489, 491, 492, 501, 502, 503);
