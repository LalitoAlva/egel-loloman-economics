-- =============================================
-- PASO 1: LIMPIEZA — Eliminar duplicados y basura
-- =============================================

-- 1A. Duplicados en Módulo 1 (quedarse con el de menor ID)
DELETE FROM contenido_clase WHERE id IN (504, 505, 506);
-- Elimina: Sustitutos Perfectos (504), Complementos Perfectos (505), Cobb-Douglas (506)
-- Se quedan: 501, 502, 503

-- 1B. Contenido de EDUCACIÓN que NO pertenece al módulo 3 (Internacional)
-- Esto es contenido del EGEL de Educación, no de Economía
DELETE FROM contenido_clase WHERE id IN (
  354, 355, 356, 357, 358, 359, 360, 361,  -- guías genéricas/educación
  362, 363, 364, 365, 366, 367, 368,        -- informes de educación
  369, 370, 371, 372, 373, 374, 375, 376    -- otros de educación
);
-- Esto deja el módulo 3 solo con las 6 guías nuevas de economía internacional (IDs 611-616)


-- =============================================
-- PASO 2: REORDENAR — Fijar el orden en módulos limpiados
-- =============================================

-- 2A. Módulo 1: Reordenar los temas de preferencias que quedaron (501-503)
UPDATE contenido_clase SET orden = 25 WHERE id = 501; -- Sustitutos Perfectos
UPDATE contenido_clase SET orden = 26 WHERE id = 502; -- Complementos Perfectos
UPDATE contenido_clase SET orden = 27 WHERE id = 503; -- Cobb-Douglas

-- 2B. Módulo 1: Reordenar los 5 temas nuevos que agregamos
UPDATE contenido_clase SET orden = 28 WHERE id = 600; -- Oferta y Demanda
UPDATE contenido_clase SET orden = 29 WHERE id = 601; -- Duopolio
UPDATE contenido_clase SET orden = 30 WHERE id = 602; -- Pareto
UPDATE contenido_clase SET orden = 31 WHERE id = 603; -- Contabilidad Nacional
UPDATE contenido_clase SET orden = 32 WHERE id = 604; -- Ciclos Económicos

-- 2C. Módulo 3: Reordenar las 6 guías internacionales (ahora son las únicas)
UPDATE contenido_clase SET orden = 1 WHERE id = 611; -- Balanza de Pagos
UPDATE contenido_clase SET orden = 2 WHERE id = 612; -- Tipo de Cambio
UPDATE contenido_clase SET orden = 3 WHERE id = 613; -- Política Comercial
UPDATE contenido_clase SET orden = 4 WHERE id = 614; -- Ventaja Comparativa
UPDATE contenido_clase SET orden = 5 WHERE id = 615; -- Bloques Económicos
UPDATE contenido_clase SET orden = 6 WHERE id = 616; -- Organismos Internacionales


-- =============================================
-- PASO 3: VERIFICACIÓN — Corre esto para confirmar que todo quedó bien
-- =============================================

-- Cuenta por módulo
SELECT
  c.modulo_id,
  m.titulo as modulo,
  c.tipo,
  COUNT(*) as total
FROM contenido_clase c
JOIN modulos m ON c.modulo_id = m.id
GROUP BY c.modulo_id, m.titulo, c.tipo
ORDER BY c.modulo_id, c.tipo;
