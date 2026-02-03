-- ============================================
-- ACTUALIZAR ICONOS DE MÓDULOS A FONT AWESOME
-- ============================================
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- Primero ampliar el campo icon para que acepte clases Font Awesome
ALTER TABLE modulos ALTER COLUMN icon TYPE VARCHAR(100);

-- Actualizar iconos de los 6 módulos a clases Font Awesome
UPDATE modulos SET icon = 'fa-solid fa-chart-line' WHERE slug = 'eco-1';
UPDATE modulos SET icon = 'fa-solid fa-coins' WHERE slug = 'eco-2';
UPDATE modulos SET icon = 'fa-solid fa-globe' WHERE slug = 'eco-3';
UPDATE modulos SET icon = 'fa-solid fa-file-invoice' WHERE slug = 'con-1';
UPDATE modulos SET icon = 'fa-solid fa-scale-balanced' WHERE slug = 'con-2';
UPDATE modulos SET icon = 'fa-solid fa-magnifying-glass-chart' WHERE slug = 'con-3';

-- Verificar
SELECT slug, titulo, icon FROM modulos ORDER BY numero;
