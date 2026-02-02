-- ============================================
-- EGEL STUDY - SCHEMA COMPLETO
-- Ejecutar este script en orden
-- ============================================

-- ============================================
-- 1. ROLES DEL SISTEMA
-- ============================================
INSERT INTO roles (nombre, descripcion, permisos, activo) VALUES
('admin', 'Administrador del sistema', '{"all": true}', true),
('profesor', 'Profesor o tutor', '{"read": true, "create_content": true}', true),
('estudiante', 'Usuario estudiante', '{"read": true}', true)
ON CONFLICT (nombre) DO NOTHING;

-- ============================================
-- 2. TABLA DE NOTIFICACIONES
-- ============================================
CREATE TABLE IF NOT EXISTS notificaciones (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    tipo VARCHAR(50) DEFAULT 'info',
    titulo VARCHAR(200) NOT NULL,
    mensaje TEXT NOT NULL,
    icono VARCHAR(10) DEFAULT '🔔',
    color VARCHAR(20) DEFAULT '#3b82f6',
    leida BOOLEAN DEFAULT false,
    descartada BOOLEAN DEFAULT false,
    accion_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notificaciones_usuario ON notificaciones(usuario_id);
CREATE INDEX IF NOT EXISTS idx_notificaciones_leida ON notificaciones(leida);

-- ============================================
-- 3. TABLA DE SOLICITUDES DE CUENTA
-- ============================================
CREATE TABLE IF NOT EXISTS solicitudes_cuenta (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar VARCHAR(10) DEFAULT '📚',
    motivo TEXT NOT NULL,
    estado VARCHAR(20) DEFAULT 'pendiente',
    admin_id UUID REFERENCES usuarios(id),
    notas_admin TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    processed_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_solicitudes_estado ON solicitudes_cuenta(estado);
CREATE INDEX IF NOT EXISTS idx_solicitudes_email ON solicitudes_cuenta(email);

-- ============================================
-- 4. TABLA DE PREGUNTAS SOCRÁTICAS
-- ============================================
CREATE TABLE IF NOT EXISTS preguntas_socraticas (
    id TEXT PRIMARY KEY,
    modulo TEXT NOT NULL,
    tema TEXT NOT NULL,
    pregunta TEXT NOT NULL,
    pista TEXT NOT NULL,
    respuesta TEXT NOT NULL,
    nivel TEXT DEFAULT 'intermedio',
    created_at TIMESTAMP DEFAULT NOW(),
    activo BOOLEAN DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_socraticas_modulo ON preguntas_socraticas(modulo);

-- ============================================
-- 5. MÓDULOS DE ECONOMÍA
-- ============================================
INSERT INTO modulos (numero, slug, titulo, descripcion, color, icon, activo) VALUES
(1, 'microeconomia', 'Microeconomía', 'Teoría del consumidor, productor y mercados', '#3b82f6', '📐', true),
(2, 'macroeconomia', 'Macroeconomía', 'Agregados económicos, política fiscal y monetaria', '#22c55e', '🏢', true),
(3, 'economia-internacional', 'Economía Internacional', 'Comercio internacional, tipo de cambio y balanza de pagos', '#f59e0b', '🌐', true),
(4, 'finanzas', 'Finanzas', 'Mercados financieros, valuación y riesgo', '#ef4444', '📊', true),
(5, 'estadistica', 'Estadística y Econometría', 'Probabilidad, inferencia y modelos econométricos', '#8b5cf6', '📉', true),
(6, 'historia-economica', 'Historia Económica', 'Evolución económica de México y el mundo', '#ec4899', '🏛️', true),
(7, 'politica-economica', 'Política Económica', 'Instrumentos y objetivos de política económica', '#14b8a6', '⚖️', true),
(8, 'desarrollo-economico', 'Desarrollo Económico', 'Teorías del desarrollo y economía del bienestar', '#f97316', '🌿', true)
ON CONFLICT (slug) DO UPDATE SET
    titulo = EXCLUDED.titulo,
    descripcion = EXCLUDED.descripcion,
    color = EXCLUDED.color,
    icon = EXCLUDED.icon;

-- ============================================
-- 6. PREGUNTAS DE QUIZ - MICROECONOMÍA
-- ============================================
INSERT INTO preguntas (id, modulo, tema, subtema, nivel, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, activo) VALUES

-- Microeconomía - Nivel Básico
('micro-001', 'microeconomia', 'Teoría del Consumidor', 'Utilidad', 'basico',
'¿Qué representa la utilidad marginal?',
'La satisfacción total del consumidor',
'El cambio en la satisfacción por consumir una unidad adicional',
'El precio máximo que pagaría un consumidor',
'La cantidad demandada a cada precio',
'B', 'La utilidad marginal mide el cambio en la utilidad total cuando se consume una unidad adicional de un bien.', true),

('micro-002', 'microeconomia', 'Teoría del Consumidor', 'Curvas de Indiferencia', 'basico',
'Las curvas de indiferencia son convexas al origen porque:',
'Los bienes son sustitutos perfectos',
'Existe una tasa marginal de sustitución decreciente',
'Los precios son constantes',
'La renta del consumidor aumenta',
'B', 'La convexidad refleja que a medida que consumimos más de un bien, estamos dispuestos a renunciar a menos del otro bien.', true),

('micro-003', 'microeconomia', 'Teoría del Consumidor', 'Restricción Presupuestaria', 'basico',
'Si el precio de un bien aumenta, la restricción presupuestaria:',
'Se desplaza hacia afuera paralelamente',
'Rota hacia adentro sobre el eje del otro bien',
'No cambia',
'Se vuelve vertical',
'B', 'Un aumento de precio reduce la cantidad máxima que se puede comprar de ese bien, rotando la recta presupuestaria.', true),

('micro-004', 'microeconomia', 'Teoría del Consumidor', 'Demanda', 'basico',
'¿Qué establece la ley de la demanda?',
'A mayor precio, mayor cantidad demandada',
'A mayor precio, menor cantidad demandada',
'El precio no afecta la demanda',
'La demanda siempre es constante',
'B', 'La ley de la demanda establece una relación inversa entre precio y cantidad demandada, ceteris paribus.', true),

('micro-005', 'microeconomia', 'Teoría del Productor', 'Costos', 'basico',
'El costo marginal representa:',
'El costo total dividido entre la cantidad producida',
'El cambio en el costo total por producir una unidad adicional',
'Los costos que no varían con la producción',
'El costo promedio de producción',
'B', 'El costo marginal mide cuánto aumenta el costo total al producir una unidad más.', true),

('micro-006', 'microeconomia', 'Teoría del Productor', 'Producción', 'basico',
'La ley de rendimientos marginales decrecientes establece que:',
'Los costos siempre aumentan',
'Al agregar más de un factor variable, eventualmente el producto marginal disminuye',
'La producción nunca puede aumentar',
'Los rendimientos siempre son constantes',
'B', 'Manteniendo otros factores constantes, el producto marginal de un factor variable eventualmente disminuye.', true),

('micro-007', 'microeconomia', 'Mercados', 'Competencia Perfecta', 'basico',
'En competencia perfecta, las empresas son:',
'Fijadoras de precios',
'Tomadoras de precios',
'Monopolistas',
'Oligopolistas',
'B', 'En competencia perfecta, las empresas son tan pequeñas respecto al mercado que no pueden influir en el precio.', true),

('micro-008', 'microeconomia', 'Mercados', 'Monopolio', 'basico',
'Un monopolio natural surge cuando:',
'El gobierno otorga una licencia exclusiva',
'Una empresa tiene una patente',
'Los costos medios decrecen en todo el rango relevante de producción',
'Hay muchos competidores',
'C', 'En un monopolio natural, es más eficiente que una sola empresa abastezca todo el mercado debido a economías de escala.', true),

('micro-009', 'microeconomia', 'Elasticidad', 'Precio', 'basico',
'Si la elasticidad precio de la demanda es -2, un aumento del 10% en el precio provocará:',
'Un aumento del 20% en la cantidad demandada',
'Una disminución del 20% en la cantidad demandada',
'Una disminución del 5% en la cantidad demandada',
'Ningún cambio en la cantidad demandada',
'B', 'Elasticidad = %ΔQ/%ΔP, entonces -2 = %ΔQ/10%, por lo que %ΔQ = -20%.', true),

('micro-010', 'microeconomia', 'Elasticidad', 'Ingreso', 'basico',
'Un bien inferior tiene elasticidad ingreso:',
'Positiva y mayor que 1',
'Positiva y menor que 1',
'Negativa',
'Igual a cero',
'C', 'Los bienes inferiores tienen elasticidad ingreso negativa: al aumentar el ingreso, disminuye su consumo.', true),

-- Microeconomía - Nivel Intermedio
('micro-011', 'microeconomia', 'Teoría del Consumidor', 'Efecto Sustitución', 'intermedio',
'El efecto sustitución de Slutsky mide:',
'El cambio en la demanda manteniendo la utilidad constante',
'El cambio en la demanda manteniendo el poder adquisitivo constante',
'El cambio total en la demanda',
'El cambio en el precio relativo',
'B', 'Slutsky mantiene constante el poder adquisitivo (la canasta original sigue siendo alcanzable).', true),

('micro-012', 'microeconomia', 'Teoría del Consumidor', 'Bien Giffen', 'intermedio',
'Un bien Giffen se caracteriza porque:',
'Su curva de demanda tiene pendiente positiva',
'Es un bien de lujo',
'Tiene elasticidad unitaria',
'Es un sustituto perfecto',
'A', 'En un bien Giffen, el efecto ingreso negativo supera al efecto sustitución, resultando en una demanda con pendiente positiva.', true),

('micro-013', 'microeconomia', 'Teoría del Productor', 'Isocuantas', 'intermedio',
'La tasa marginal de sustitución técnica (TMST) representa:',
'La relación de precios de los factores',
'La tasa a la que se puede sustituir un factor por otro manteniendo el producto constante',
'El costo mínimo de producción',
'La productividad total de los factores',
'B', 'La TMST mide cuántas unidades de un factor se necesitan para sustituir una unidad de otro, manteniendo el mismo nivel de producción.', true),

('micro-014', 'microeconomia', 'Teoría del Productor', 'Economías de Escala', 'intermedio',
'Las economías de escala existen cuando:',
'El costo medio aumenta con la producción',
'El costo medio disminuye con la producción',
'El costo marginal es constante',
'Los rendimientos son decrecientes',
'B', 'Las economías de escala implican que el costo promedio por unidad disminuye a medida que aumenta la escala de producción.', true),

('micro-015', 'microeconomia', 'Mercados', 'Oligopolio', 'intermedio',
'En el modelo de Cournot, las empresas compiten en:',
'Precios simultáneamente',
'Cantidades simultáneamente',
'Precios secuencialmente',
'Publicidad',
'B', 'En Cournot, las empresas eligen simultáneamente sus niveles de producción, tomando como dada la producción del rival.', true),

('micro-016', 'microeconomia', 'Mercados', 'Oligopolio', 'intermedio',
'El modelo de Bertrand predice que con productos homogéneos:',
'Las empresas obtienen beneficios de monopolio',
'El precio será igual al costo marginal',
'Las empresas coluden',
'La cantidad será la de monopolio',
'B', 'La paradoja de Bertrand muestra que con competencia en precios y productos homogéneos, el precio cae al costo marginal.', true),

('micro-017', 'microeconomia', 'Bienestar', 'Excedente', 'intermedio',
'El excedente del consumidor se mide como:',
'El área debajo de la curva de demanda y arriba del precio',
'El área debajo de la curva de oferta',
'El ingreso total menos el costo total',
'El precio menos el costo marginal',
'A', 'El excedente del consumidor es la diferencia entre lo que los consumidores están dispuestos a pagar y lo que realmente pagan.', true),

('micro-018', 'microeconomia', 'Bienestar', 'Pérdida de Eficiencia', 'intermedio',
'La pérdida de peso muerto de un monopolio se debe a:',
'Los altos beneficios del monopolista',
'La producción menor que el óptimo social',
'Los costos fijos elevados',
'La discriminación de precios',
'B', 'El monopolio produce menos que el nivel socialmente óptimo, generando una pérdida de bienestar.', true),

('micro-019', 'microeconomia', 'Externalidades', 'Negativas', 'intermedio',
'Un impuesto pigouviano tiene como objetivo:',
'Aumentar la recaudación fiscal',
'Internalizar una externalidad negativa',
'Proteger a la industria nacional',
'Redistribuir el ingreso',
'B', 'El impuesto pigouviano iguala el costo privado marginal con el costo social marginal.', true),

('micro-020', 'microeconomia', 'Externalidades', 'Teorema de Coase', 'intermedio',
'Según el teorema de Coase, las externalidades pueden resolverse eficientemente si:',
'El gobierno interviene',
'Los derechos de propiedad están bien definidos y no hay costos de transacción',
'Se aplican impuestos',
'Hay competencia perfecta',
'B', 'Coase demostró que con derechos de propiedad claros y sin costos de transacción, las partes negociarán la solución eficiente.', true),

-- Microeconomía - Nivel Avanzado
('micro-021', 'microeconomia', 'Teoría del Consumidor', 'Dualidad', 'avanzado',
'La función de gasto mínimo e(p,u) es:',
'Creciente en precios y utilidad',
'Decreciente en precios, creciente en utilidad',
'Creciente en precios, decreciente en utilidad',
'Homogénea de grado cero en precios',
'A', 'La función de gasto es creciente en p (mayores precios requieren más gasto) y en u (mayor utilidad requiere más gasto).', true),

('micro-022', 'microeconomia', 'Teoría del Consumidor', 'Identidad de Roy', 'avanzado',
'La identidad de Roy establece que la demanda marshalliana puede obtenerse de:',
'La función de utilidad directamente',
'El cociente de derivadas parciales de la función de utilidad indirecta',
'La función de producción',
'El lagrangiano del consumidor',
'B', 'x_i = -[∂V/∂p_i] / [∂V/∂m], donde V es la función de utilidad indirecta.', true),

('micro-023', 'microeconomia', 'Teoría del Productor', 'Lema de Shephard', 'avanzado',
'El lema de Shephard relaciona:',
'La función de costos con las demandas condicionadas de factores',
'La función de producción con los precios',
'El beneficio con el ingreso marginal',
'La oferta con la demanda',
'A', 'Las demandas condicionadas de factores son las derivadas parciales de la función de costos respecto a los precios de los factores.', true),

('micro-024', 'microeconomia', 'Teoría de Juegos', 'Equilibrio de Nash', 'avanzado',
'Un equilibrio de Nash en estrategias mixtas:',
'Siempre existe en juegos finitos',
'Nunca existe',
'Solo existe en juegos de suma cero',
'Requiere información perfecta',
'A', 'El teorema de Nash garantiza la existencia de al menos un equilibrio (posiblemente en estrategias mixtas) en juegos finitos.', true),

('micro-025', 'microeconomia', 'Información Asimétrica', 'Selección Adversa', 'avanzado',
'El problema de los "limones" de Akerlof ilustra:',
'La señalización en el mercado laboral',
'La selección adversa en mercados con información asimétrica',
'El riesgo moral en seguros',
'La discriminación de precios',
'B', 'Akerlof mostró cómo la información asimétrica puede llevar al colapso de mercados donde solo quedan productos de baja calidad.', true),

('micro-026', 'microeconomia', 'Información Asimétrica', 'Riesgo Moral', 'avanzado',
'El riesgo moral se refiere a:',
'El riesgo de quiebra de una empresa',
'El cambio de comportamiento después de firmar un contrato',
'La selección de individuos de alto riesgo',
'La volatilidad del mercado',
'B', 'El riesgo moral ocurre cuando una parte cambia su comportamiento después de establecer un acuerdo porque la otra parte no puede observarlo.', true),

('micro-027', 'microeconomia', 'Diseño de Mecanismos', 'Subastas', 'avanzado',
'En una subasta de segundo precio (Vickrey), la estrategia dominante es:',
'Ofertar menos que la valoración real',
'Ofertar más que la valoración real',
'Ofertar exactamente la valoración real',
'No participar',
'C', 'En una subasta Vickrey, ofertar tu verdadera valoración es estrategia dominante porque pagas el segundo precio más alto.', true),

('micro-028', 'microeconomia', 'Economía del Bienestar', 'Segundo Mejor', 'avanzado',
'La teoría del segundo mejor establece que:',
'Siempre es óptimo eliminar todas las distorsiones',
'Si una condición de optimalidad no puede cumplirse, no es necesariamente óptimo cumplir las demás',
'El monopolio es siempre ineficiente',
'Los impuestos siempre reducen el bienestar',
'B', 'Lipsey y Lancaster demostraron que en presencia de una distorsión inevitable, introducir otras puede mejorar el bienestar.', true),

('micro-029', 'microeconomia', 'Equilibrio General', 'Teoremas del Bienestar', 'avanzado',
'El Primer Teorema del Bienestar establece que:',
'Todo equilibrio competitivo es Pareto eficiente',
'Todo óptimo de Pareto puede alcanzarse como equilibrio competitivo',
'Los mercados siempre fallan',
'La distribución en equilibrio es justa',
'A', 'El Primer Teorema dice que, bajo ciertas condiciones, el equilibrio competitivo es eficiente en el sentido de Pareto.', true),

('micro-030', 'microeconomia', 'Equilibrio General', 'Teoremas del Bienestar', 'avanzado',
'El Segundo Teorema del Bienestar requiere:',
'Mercados completos solamente',
'Preferencias convexas y transferencias de suma fija',
'Competencia imperfecta',
'Externalidades',
'B', 'El Segundo Teorema permite alcanzar cualquier asignación Pareto eficiente mediante el mercado, con transferencias apropiadas.', true),

-- ============================================
-- 7. PREGUNTAS DE QUIZ - MACROECONOMÍA
-- ============================================

('macro-001', 'macroeconomia', 'Cuentas Nacionales', 'PIB', 'basico',
'El PIB mide:',
'El valor de todos los bienes producidos en un país',
'El valor de mercado de todos los bienes y servicios finales producidos en un país en un período',
'La riqueza total de un país',
'Los ingresos del gobierno',
'B', 'El PIB es el valor de mercado de todos los bienes y servicios finales producidos dentro de las fronteras de un país.', true),

('macro-002', 'macroeconomia', 'Cuentas Nacionales', 'PIB', 'basico',
'¿Cuál NO es un componente del PIB por el lado del gasto?',
'Consumo privado',
'Inversión',
'Impuestos',
'Exportaciones netas',
'C', 'PIB = C + I + G + (X-M). Los impuestos no son un componente directo del gasto.', true),

('macro-003', 'macroeconomia', 'Cuentas Nacionales', 'Deflactor', 'basico',
'El deflactor del PIB se calcula como:',
'PIB nominal / PIB real × 100',
'PIB real / PIB nominal × 100',
'PIB nominal - PIB real',
'PIB nominal + PIB real',
'A', 'El deflactor del PIB = (PIB nominal / PIB real) × 100, y mide el nivel general de precios.', true),

('macro-004', 'macroeconomia', 'Mercado de Trabajo', 'Desempleo', 'basico',
'La tasa de desempleo se calcula como:',
'Desempleados / Población total',
'Desempleados / Población en edad de trabajar',
'Desempleados / Población económicamente activa',
'Empleados / Población total',
'C', 'Tasa de desempleo = (Desempleados / PEA) × 100, donde PEA incluye ocupados y desocupados que buscan empleo.', true),

('macro-005', 'macroeconomia', 'Mercado de Trabajo', 'Tipos de Desempleo', 'basico',
'El desempleo friccional se refiere a:',
'La falta de empleos en la economía',
'El tiempo que toman los trabajadores en encontrar un empleo adecuado',
'El desempleo causado por recesiones',
'El desempleo tecnológico',
'B', 'El desempleo friccional es el resultado natural del proceso de búsqueda y emparejamiento en el mercado laboral.', true),

('macro-006', 'macroeconomia', 'Dinero', 'Funciones', 'basico',
'¿Cuál NO es una función del dinero?',
'Medio de cambio',
'Unidad de cuenta',
'Depósito de valor',
'Generador de riqueza',
'D', 'Las tres funciones del dinero son: medio de cambio, unidad de cuenta y depósito de valor.', true),

('macro-007', 'macroeconomia', 'Dinero', 'Agregados Monetarios', 'basico',
'M1 incluye:',
'Solo billetes y monedas',
'Billetes, monedas y depósitos a la vista',
'Todos los depósitos bancarios',
'Acciones y bonos',
'B', 'M1 es el agregado monetario más líquido: efectivo en circulación más depósitos a la vista (cuentas de cheques).', true),

('macro-008', 'macroeconomia', 'Inflación', 'Definición', 'basico',
'La inflación es:',
'El aumento de precios de algunos productos',
'El aumento sostenido y generalizado del nivel de precios',
'La disminución del valor del PIB',
'El aumento del tipo de cambio',
'B', 'La inflación es un aumento sostenido (continuo) y generalizado (de la mayoría de precios) del nivel de precios.', true),

('macro-009', 'macroeconomia', 'Política Fiscal', 'Instrumentos', 'basico',
'La política fiscal expansiva implica:',
'Aumentar impuestos y reducir gasto',
'Reducir impuestos y/o aumentar gasto público',
'Aumentar la tasa de interés',
'Vender bonos del gobierno',
'B', 'La política fiscal expansiva busca estimular la economía mediante menor carga tributaria o mayor gasto gubernamental.', true),

('macro-010', 'macroeconomia', 'Política Monetaria', 'Instrumentos', 'basico',
'¿Cuál es un instrumento de política monetaria?',
'Impuestos',
'Gasto público',
'Tasa de interés de referencia',
'Aranceles',
'C', 'Los bancos centrales usan la tasa de interés de referencia, operaciones de mercado abierto y encaje legal como instrumentos.', true),

-- Macroeconomía - Nivel Intermedio
('macro-011', 'macroeconomia', 'Modelo IS-LM', 'Curva IS', 'intermedio',
'La curva IS tiene pendiente negativa porque:',
'Un aumento en la tasa de interés reduce la inversión y por tanto la demanda agregada',
'Un aumento en el ingreso aumenta la demanda de dinero',
'Los precios son rígidos',
'El consumo es constante',
'A', 'Tasas de interés más altas reducen la inversión, lo que disminuye la demanda agregada y el ingreso de equilibrio.', true),

('macro-012', 'macroeconomia', 'Modelo IS-LM', 'Curva LM', 'intermedio',
'La curva LM tiene pendiente positiva porque:',
'Mayor ingreso aumenta la demanda de dinero, requiriendo mayor tasa de interés para equilibrar',
'Mayor ingreso reduce la oferta de dinero',
'Los precios aumentan con el ingreso',
'La inversión aumenta con el ingreso',
'A', 'Un mayor ingreso aumenta la demanda de dinero para transacciones; para equilibrar el mercado monetario, la tasa de interés debe subir.', true),

('macro-013', 'macroeconomia', 'Modelo IS-LM', 'Política Fiscal', 'intermedio',
'En el modelo IS-LM, una expansión fiscal:',
'Desplaza la IS a la izquierda',
'Desplaza la IS a la derecha, aumentando ingreso y tasa de interés',
'Desplaza la LM a la derecha',
'No tiene efectos',
'B', 'La expansión fiscal desplaza IS a la derecha; el nuevo equilibrio tiene mayor Y y mayor i (efecto crowding out parcial).', true),

('macro-014', 'macroeconomia', 'Modelo IS-LM', 'Trampa de Liquidez', 'intermedio',
'En la trampa de liquidez:',
'La política monetaria es muy efectiva',
'La política monetaria es inefectiva porque la tasa de interés ya está en su límite inferior',
'La política fiscal es inefectiva',
'Los precios aumentan rápidamente',
'B', 'Cuando las tasas están en cero (o muy cerca), inyectar más dinero no reduce más las tasas ni estimula la inversión.', true),

('macro-015', 'macroeconomia', 'Modelo OA-DA', 'Demanda Agregada', 'intermedio',
'La curva de demanda agregada tiene pendiente negativa debido a:',
'El efecto riqueza, el efecto tasa de interés y el efecto tipo de cambio',
'La ley de rendimientos decrecientes',
'Los costos marginales crecientes',
'La competencia imperfecta',
'A', 'Estos tres efectos explican por qué un menor nivel de precios aumenta la demanda agregada.', true),

('macro-016', 'macroeconomia', 'Modelo OA-DA', 'Oferta Agregada LP', 'intermedio',
'La curva de oferta agregada de largo plazo es vertical porque:',
'Los precios son rígidos',
'En el largo plazo, la producción depende solo de factores reales, no del nivel de precios',
'La tecnología no cambia',
'El dinero no es neutral',
'B', 'En el largo plazo, la producción está determinada por capital, trabajo y tecnología, no por variables nominales.', true),

('macro-017', 'macroeconomia', 'Curva de Phillips', 'Corto Plazo', 'intermedio',
'La curva de Phillips de corto plazo muestra:',
'Una relación positiva entre inflación y desempleo',
'Una relación negativa entre inflación y desempleo',
'Ninguna relación entre inflación y desempleo',
'Una relación entre crecimiento y desempleo',
'B', 'En el corto plazo, existe un trade-off: menor desempleo está asociado con mayor inflación.', true),

('macro-018', 'macroeconomia', 'Curva de Phillips', 'Expectativas', 'intermedio',
'Según la curva de Phillips aumentada con expectativas:',
'El trade-off inflación-desempleo existe permanentemente',
'El trade-off solo existe si la inflación es diferente a la esperada',
'No hay relación entre inflación y desempleo',
'La inflación siempre es cero',
'B', 'Solo hay trade-off cuando la inflación sorprende a los agentes; en el largo plazo, el desempleo vuelve a su tasa natural.', true),

('macro-019', 'macroeconomia', 'Crecimiento', 'Modelo de Solow', 'intermedio',
'En el modelo de Solow, el estado estacionario se caracteriza por:',
'Crecimiento constante del capital per cápita',
'Capital per cápita constante',
'Crecimiento exponencial del producto',
'Ahorro igual a cero',
'B', 'En el estado estacionario, la inversión iguala la depreciación, manteniendo constante el capital por trabajador.', true),

('macro-020', 'macroeconomia', 'Crecimiento', 'Regla de Oro', 'intermedio',
'La regla de oro en el modelo de Solow maximiza:',
'La tasa de ahorro',
'El consumo per cápita en estado estacionario',
'La inversión',
'El crecimiento del PIB',
'B', 'La regla de oro determina la tasa de ahorro que maximiza el consumo por trabajador en el estado estacionario.', true),

-- Macroeconomía - Nivel Avanzado
('macro-021', 'macroeconomia', 'Expectativas Racionales', 'Implicaciones', 'avanzado',
'Bajo expectativas racionales, la política monetaria sistemática:',
'Siempre es efectiva',
'Es inefectiva para afectar variables reales',
'Aumenta permanentemente el empleo',
'Reduce la inflación sin costos',
'B', 'Si los agentes anticipan correctamente la política, ajustan precios y salarios, neutralizando efectos reales.', true),

('macro-022', 'macroeconomia', 'Expectativas Racionales', 'Crítica de Lucas', 'avanzado',
'La crítica de Lucas se refiere a:',
'Los modelos keynesianos son inútiles',
'Los parámetros de modelos econométricos cambian con cambios de política',
'Las expectativas son irracionales',
'El gobierno no debe intervenir',
'B', 'Lucas argumentó que los parámetros estimados históricamente no son estables ante cambios de régimen de política.', true),

('macro-023', 'macroeconomia', 'Ciclos Económicos Reales', 'RBC', 'avanzado',
'Los modelos de ciclos económicos reales (RBC) atribuyen las fluctuaciones a:',
'Shocks monetarios',
'Shocks de productividad',
'Políticas fiscales',
'Cambios en expectativas',
'B', 'Los modelos RBC explican los ciclos como respuestas óptimas a perturbaciones tecnológicas o de productividad.', true),

('macro-024', 'macroeconomia', 'Nuevos Keynesianos', 'Rigideces', 'avanzado',
'Los modelos nuevos keynesianos incorporan:',
'Precios y salarios perfectamente flexibles',
'Rigideces nominales con fundamentos microeconómicos',
'Expectativas adaptativas',
'Mercados siempre en equilibrio',
'B', 'Los NK justifican rigideces con costos de menú, contratos escalonados (Calvo) y otras fricciones microeconómicas.', true),

('macro-025', 'macroeconomia', 'Política Monetaria', 'Regla de Taylor', 'avanzado',
'La regla de Taylor sugiere que el banco central debe:',
'Mantener la tasa de interés constante',
'Ajustar la tasa según la inflación y la brecha del producto',
'Imprimir dinero cuando hay recesión',
'Fijar el tipo de cambio',
'B', 'Taylor propuso: i = r* + π + 0.5(π - π*) + 0.5(y - y*), respondiendo a desviaciones de inflación y producto.', true),

('macro-026', 'macroeconomia', 'Política Monetaria', 'Inconsistencia Temporal', 'avanzado',
'El problema de inconsistencia temporal en política monetaria surge porque:',
'Los banqueros centrales son incompetentes',
'Hay incentivos a sorprender con inflación después de que se forman expectativas',
'La inflación siempre es mala',
'Los agentes son irracionales',
'B', 'Una vez fijadas las expectativas, el BC tiene incentivo a inflacionar para reducir desempleo, pero esto genera sesgo inflacionario.', true),

('macro-027', 'macroeconomia', 'Economía Abierta', 'Mundell-Fleming', 'avanzado',
'En el modelo Mundell-Fleming con tipo de cambio flexible y perfecta movilidad de capitales:',
'La política fiscal es muy efectiva',
'La política monetaria es muy efectiva',
'Ambas políticas son inefectivas',
'El tipo de cambio es fijo',
'B', 'Con TC flexible y movilidad perfecta, la política monetaria es potente (afecta TC y exportaciones); la fiscal es débil.', true),

('macro-028', 'macroeconomia', 'Economía Abierta', 'Trilema', 'avanzado',
'El trilema de la política monetaria implica que no se puede tener simultáneamente:',
'Alta inflación, alto desempleo y alto crecimiento',
'Tipo de cambio fijo, libre movilidad de capitales y política monetaria independiente',
'Bajo déficit, baja deuda y bajo crecimiento',
'Exportaciones, importaciones y balanza comercial',
'B', 'El trilema (o trinidad imposible) establece que solo dos de estas tres condiciones pueden coexistir.', true),

('macro-029', 'macroeconomia', 'Deuda Pública', 'Equivalencia Ricardiana', 'avanzado',
'La equivalencia ricardiana sugiere que:',
'Los impuestos y la deuda siempre son equivalentes en sus efectos',
'Bajo ciertas condiciones, financiar gasto con deuda o impuestos tiene el mismo efecto',
'La deuda pública siempre es mala',
'Los consumidores son miopes',
'B', 'Barro argumentó que consumidores racionales anticipan impuestos futuros para pagar la deuda, neutralizando el efecto.', true),

('macro-030', 'macroeconomia', 'Crisis Financieras', 'Acelerador Financiero', 'avanzado',
'El mecanismo del acelerador financiero implica que:',
'Las crisis son siempre inesperadas',
'Los shocks se amplifican a través del deterioro de los balances y restricciones crediticias',
'Los bancos nunca quiebran',
'La política monetaria es siempre efectiva',
'B', 'El acelerador financiero de Bernanke-Gertler muestra cómo las fricciones financieras amplifican y propagan shocks.', true),

-- ============================================
-- 8. PREGUNTAS DE QUIZ - ECONOMÍA INTERNACIONAL
-- ============================================

('int-001', 'economia-internacional', 'Comercio', 'Ventaja Comparativa', 'basico',
'La teoría de la ventaja comparativa de Ricardo establece que:',
'Los países deben producir todo internamente',
'Los países deben especializarse en bienes donde tienen menor costo de oportunidad',
'Solo los países grandes deben comerciar',
'El libre comercio siempre perjudica',
'B', 'Ricardo demostró que el comercio beneficia a ambos países cuando cada uno se especializa en su ventaja comparativa.', true),

('int-002', 'economia-internacional', 'Comercio', 'Ventaja Absoluta', 'basico',
'Un país tiene ventaja absoluta si:',
'Puede producir un bien con menos recursos que otro país',
'Tiene menor costo de oportunidad',
'Exporta más de lo que importa',
'Tiene más recursos naturales',
'A', 'La ventaja absoluta se refiere a la productividad: producir más con los mismos recursos, o lo mismo con menos.', true),

('int-003', 'economia-internacional', 'Balanza de Pagos', 'Cuenta Corriente', 'basico',
'La cuenta corriente incluye:',
'Solo exportaciones e importaciones de bienes',
'Comercio de bienes, servicios, rentas y transferencias',
'Inversión extranjera directa',
'Reservas internacionales',
'B', 'La cuenta corriente registra transacciones de bienes, servicios, ingresos primarios (rentas) y secundarios (transferencias).', true),

('int-004', 'economia-internacional', 'Balanza de Pagos', 'Cuenta Financiera', 'basico',
'La inversión extranjera directa se registra en:',
'La cuenta corriente',
'La cuenta financiera',
'La cuenta de capital',
'Las reservas internacionales',
'B', 'La cuenta financiera registra flujos de IED, inversión de cartera y otras inversiones.', true),

('int-005', 'economia-internacional', 'Tipo de Cambio', 'Definición', 'basico',
'Una depreciación de la moneda nacional:',
'Encarece las importaciones',
'Abarata las importaciones',
'No afecta el comercio',
'Reduce las exportaciones',
'A', 'Cuando la moneda se deprecia, se necesitan más unidades de moneda local para comprar divisas, encareciendo importaciones.', true),

('int-006', 'economia-internacional', 'Tipo de Cambio', 'Sistemas', 'basico',
'En un sistema de tipo de cambio fijo:',
'El banco central no interviene',
'El banco central debe comprar o vender reservas para mantener la paridad',
'El tipo de cambio fluctúa libremente',
'No existen reservas internacionales',
'B', 'Con TC fijo, el BC interviene comprando/vendiendo divisas para mantener el tipo de cambio en el nivel establecido.', true),

('int-007', 'economia-internacional', 'Aranceles', 'Efectos', 'basico',
'Un arancel a las importaciones:',
'Beneficia a los consumidores domésticos',
'Protege a los productores domésticos pero perjudica a consumidores',
'Aumenta las importaciones',
'No tiene efectos en el bienestar',
'B', 'Los aranceles protegen la industria local elevando precios, lo que beneficia a productores pero perjudica a consumidores.', true),

('int-008', 'economia-internacional', 'Comercio', 'Términos de Intercambio', 'basico',
'Los términos de intercambio mejoran cuando:',
'Los precios de exportación aumentan relativamente a los de importación',
'Los precios de importación aumentan más',
'El volumen de comercio disminuye',
'La balanza comercial es deficitaria',
'A', 'TI = (Precio exportaciones / Precio importaciones). Mejoran cuando el numerador crece más que el denominador.', true),

('int-009', 'economia-internacional', 'Integración', 'Tipos', 'intermedio',
'Una unión aduanera implica:',
'Solo eliminación de aranceles entre miembros',
'Eliminación de aranceles y arancel externo común',
'Libre movilidad de factores',
'Política monetaria común',
'B', 'La unión aduanera va más allá del área de libre comercio: incluye un arancel externo común hacia terceros.', true),

('int-010', 'economia-internacional', 'Modelo H-O', 'Teorema', 'intermedio',
'El teorema de Heckscher-Ohlin predice que:',
'Los países exportan bienes intensivos en su factor abundante',
'Los países importan todos los bienes',
'El comercio elimina las diferencias salariales',
'La tecnología determina el comercio',
'A', 'H-O predice que países con abundancia de trabajo exportan bienes trabajo-intensivos, y viceversa.', true),

('int-011', 'economia-internacional', 'Modelo H-O', 'Teorema Stolper-Samuelson', 'intermedio',
'El teorema de Stolper-Samuelson establece que:',
'El comercio beneficia a todos los factores',
'El comercio beneficia al factor abundante y perjudica al escaso',
'Los precios de los factores se igualan',
'La producción aumenta en todos los sectores',
'B', 'El libre comercio aumenta la remuneración real del factor abundante y reduce la del factor escaso.', true),

('int-012', 'economia-internacional', 'Comercio', 'Paradoja de Leontief', 'intermedio',
'La paradoja de Leontief encontró que:',
'EE.UU. exportaba bienes trabajo-intensivos pese a ser abundante en capital',
'EE.UU. no comerciaba internacionalmente',
'Los términos de intercambio eran desfavorables',
'El modelo H-O era perfectamente correcto',
'A', 'Leontief encontró que las exportaciones de EE.UU. eran más trabajo-intensivas que sus importaciones, contradiciendo H-O.', true),

('int-013', 'economia-internacional', 'Tipo de Cambio', 'PPA', 'intermedio',
'La paridad del poder adquisitivo (PPA) sugiere que:',
'Los tipos de cambio nominales son constantes',
'Los tipos de cambio se ajustan para igualar el poder de compra entre países',
'La inflación no afecta el tipo de cambio',
'Los flujos de capital determinan el tipo de cambio',
'B', 'La PPA predice que el TC se ajustará hasta que el mismo bien cueste lo mismo en diferentes países.', true),

('int-014', 'economia-internacional', 'Tipo de Cambio', 'Paridad de Tasas de Interés', 'intermedio',
'La paridad de tasas de interés descubierta implica que:',
'Las tasas de interés son iguales en todos los países',
'El diferencial de tasas de interés iguala la depreciación esperada',
'No hay flujos de capital',
'Los tipos de cambio son fijos',
'B', 'PTI descubierta: i - i* = (E^e - E)/E, el diferencial de tasas iguala la depreciación esperada.', true),

('int-015', 'economia-internacional', 'Comercio', 'Comercio Intraindustrial', 'intermedio',
'El comercio intraindustrial se explica principalmente por:',
'Diferencias en dotaciones de factores',
'Economías de escala y preferencia por variedad',
'Ventajas absolutas',
'Barreras comerciales',
'B', 'El comercio intraindustrial (exportar e importar productos similares) se explica por economías de escala y diferenciación.', true),

('int-016', 'economia-internacional', 'Balanza de Pagos', 'Identidad', 'intermedio',
'La identidad de la balanza de pagos establece que:',
'Las exportaciones siempre igualan las importaciones',
'La cuenta corriente más la cuenta financiera más errores y omisiones suman cero',
'Los países siempre tienen superávit',
'El ahorro siempre iguala la inversión',
'B', 'La BP debe sumar cero: CC + CF + CK + Errores = 0 (con cambio en reservas incluido).', true),

('int-017', 'economia-internacional', 'Crisis', 'Cambiarias', 'avanzado',
'Los modelos de crisis cambiarias de primera generación (Krugman) enfatizan:',
'Ataques especulativos autoconfirmados',
'Políticas fiscales insostenibles con tipo de cambio fijo',
'Contagio entre países',
'Factores psicológicos',
'B', 'Krugman mostró que políticas incompatibles (déficit + TC fijo) inevitablemente llevan a una crisis cuando se agotan reservas.', true),

('int-018', 'economia-internacional', 'Crisis', 'Segunda Generación', 'avanzado',
'Los modelos de crisis de segunda generación se caracterizan por:',
'Fundamentales siempre malos',
'Equilibrios múltiples y profecías autocumplidas',
'Política monetaria siempre expansiva',
'Ausencia de ataques especulativos',
'B', 'Obstfeld mostró que incluso con fundamentales aceptables, las expectativas pueden generar crisis autoconfirmadas.', true),

('int-019', 'economia-internacional', 'Comercio', 'Nueva Geografía Económica', 'avanzado',
'La nueva geografía económica de Krugman explica:',
'Por qué el comercio siempre es beneficioso',
'La concentración geográfica de la actividad económica mediante rendimientos crecientes y costos de transporte',
'Por qué los países no comercian',
'La irrelevancia de la distancia',
'B', 'Krugman modeló cómo la interacción de economías de escala, costos de transporte y demanda genera aglomeración.', true),

('int-020', 'economia-internacional', 'Finanzas', 'Deuda Soberana', 'avanzado',
'El problema del sobreendeudamiento (debt overhang) implica que:',
'Los países siempre pagan su deuda',
'Un alto nivel de deuda desincentiva reformas porque los beneficios irían a acreedores',
'La deuda no tiene costos',
'Los mercados financieros son perfectos',
'B', 'Con deuda excesiva, los beneficios de reformas son capturados por acreedores, reduciendo incentivos del deudor.', true),

-- ============================================
-- 9. PREGUNTAS DE QUIZ - FINANZAS
-- ============================================

('fin-001', 'finanzas', 'Valuación', 'Valor Presente', 'basico',
'El valor presente de $1,000 a recibir en 2 años con tasa del 10% es aproximadamente:',
'$909',
'$826',
'$1,100',
'$1,210',
'B', 'VP = 1000/(1.10)² = 1000/1.21 ≈ $826.45', true),

('fin-002', 'finanzas', 'Valuación', 'Perpetuidad', 'basico',
'El valor presente de una perpetuidad que paga $100 anuales con tasa del 5% es:',
'$500',
'$1,000',
'$2,000',
'$5,000',
'C', 'VP perpetuidad = C/r = 100/0.05 = $2,000', true),

('fin-003', 'finanzas', 'Riesgo', 'Diversificación', 'basico',
'La diversificación reduce:',
'Todo el riesgo',
'El riesgo sistemático',
'El riesgo no sistemático',
'Los rendimientos esperados',
'C', 'La diversificación elimina el riesgo específico (no sistemático), pero no el riesgo de mercado (sistemático).', true),

('fin-004', 'finanzas', 'Riesgo', 'Beta', 'basico',
'Una acción con beta igual a 1.5:',
'Se mueve menos que el mercado',
'Se mueve 1.5 veces más que el mercado',
'No tiene riesgo',
'Tiene rendimiento negativo',
'B', 'Beta mide la sensibilidad al mercado. Beta=1.5 significa que si el mercado sube 1%, la acción sube 1.5%.', true),

('fin-005', 'finanzas', 'CAPM', 'Modelo', 'basico',
'Según el CAPM, el rendimiento esperado de un activo depende de:',
'Su riesgo total',
'Su riesgo sistemático (beta)',
'Su riesgo no sistemático',
'El tamaño de la empresa',
'B', 'CAPM: E(Ri) = Rf + βi(E(Rm) - Rf). Solo el riesgo sistemático es recompensado.', true),

('fin-006', 'finanzas', 'Mercados', 'Eficiencia', 'basico',
'Un mercado eficiente en forma débil implica que:',
'Nadie puede ganar dinero',
'Los precios reflejan toda la información histórica',
'Los precios reflejan toda la información pública y privada',
'Los precios son siempre correctos',
'B', 'En forma débil, no se puede obtener rendimientos anormales usando información histórica (análisis técnico inútil).', true),

('fin-007', 'finanzas', 'Bonos', 'Rendimiento', 'basico',
'Si un bono se vende por encima de su valor nominal:',
'Su rendimiento al vencimiento es mayor que el cupón',
'Su rendimiento al vencimiento es menor que el cupón',
'Su rendimiento es igual al cupón',
'El bono está en default',
'B', 'Un bono con prima (precio > par) tiene YTM < tasa cupón porque el inversor paga más de lo que recibirá al vencimiento.', true),

('fin-008', 'finanzas', 'Bonos', 'Duración', 'basico',
'La duración de un bono mide:',
'Su plazo al vencimiento',
'La sensibilidad de su precio a cambios en tasas de interés',
'Su probabilidad de default',
'Su liquidez',
'B', 'La duración es una medida de sensibilidad: indica cuánto cambia el precio ante un cambio de 1% en tasas.', true),

('fin-009', 'finanzas', 'Acciones', 'Valuación', 'intermedio',
'El modelo de Gordon (dividendos crecientes) establece que P0 =:',
'D1 / r',
'D1 / (r - g)',
'D1 / (r + g)',
'D0 × (1 + g)',
'B', 'P0 = D1/(r-g), donde D1 es el dividendo esperado, r la tasa requerida y g la tasa de crecimiento.', true),

('fin-010', 'finanzas', 'Derivados', 'Opciones', 'intermedio',
'Una opción call otorga a su tenedor:',
'La obligación de comprar',
'El derecho de comprar',
'La obligación de vender',
'El derecho de vender',
'B', 'Un call da el derecho (no obligación) de comprar el subyacente al precio de ejercicio.', true),

('fin-011', 'finanzas', 'Derivados', 'Put-Call Parity', 'intermedio',
'La paridad put-call establece que:',
'C + PV(K) = P + S',
'C - P = S - K',
'C + P = S + K',
'C = P siempre',
'A', 'C + PV(K) = P + S, donde C es call, P es put, S es precio spot y PV(K) es valor presente del strike.', true),

('fin-012', 'finanzas', 'Portafolios', 'Frontera Eficiente', 'intermedio',
'La frontera eficiente representa:',
'Todos los portafolios posibles',
'Los portafolios con máximo rendimiento para cada nivel de riesgo',
'Solo activos libres de riesgo',
'Portafolios con correlación perfecta',
'B', 'La frontera eficiente contiene portafolios que maximizan rendimiento dado el riesgo, o minimizan riesgo dado el rendimiento.', true),

('fin-013', 'finanzas', 'Portafolios', 'Sharpe Ratio', 'intermedio',
'El ratio de Sharpe mide:',
'El rendimiento total del portafolio',
'El exceso de rendimiento por unidad de riesgo total',
'El beta del portafolio',
'La duración del portafolio',
'B', 'Sharpe = (Rp - Rf) / σp, mide cuánto rendimiento en exceso se obtiene por cada unidad de riesgo.', true),

('fin-014', 'finanzas', 'Estructura de Capital', 'Modigliani-Miller', 'intermedio',
'El teorema de Modigliani-Miller (sin impuestos) establece que:',
'El apalancamiento siempre aumenta el valor de la firma',
'El valor de la firma es independiente de su estructura de capital',
'La deuda siempre es preferible al capital',
'Los dividendos aumentan el valor de la firma',
'B', 'MM Proposición I: en un mundo sin fricciones, el valor de la empresa no depende de cómo se financia.', true),

('fin-015', 'finanzas', 'Estructura de Capital', 'Con Impuestos', 'intermedio',
'Según MM con impuestos corporativos:',
'La deuda no tiene ventajas',
'La deuda tiene ventaja fiscal porque los intereses son deducibles',
'El capital es siempre preferible',
'No hay valor óptimo de deuda',
'B', 'Con impuestos, los intereses reducen la base gravable, creando un escudo fiscal que aumenta el valor de la firma.', true),

('fin-016', 'finanzas', 'Valuación', 'Opciones Reales', 'avanzado',
'El enfoque de opciones reales reconoce que:',
'Los proyectos de inversión son como opciones con flexibilidad gerencial',
'Los proyectos no tienen valor de opción',
'El VPN tradicional siempre es correcto',
'La incertidumbre reduce el valor',
'A', 'Las opciones reales valoran la flexibilidad (esperar, expandir, abandonar) que el VPN tradicional ignora.', true),

('fin-017', 'finanzas', 'Derivados', 'Black-Scholes', 'avanzado',
'El modelo Black-Scholes supone que:',
'Los precios siguen un movimiento browniano geométrico con volatilidad constante',
'La volatilidad cambia aleatoriamente',
'No hay tasa libre de riesgo',
'Las opciones no pueden valorarse',
'A', 'BS asume precio log-normal, volatilidad constante, mercados sin fricciones y negociación continua.', true),

('fin-018', 'finanzas', 'Derivados', 'Delta Hedging', 'avanzado',
'El delta de una opción representa:',
'Su valor total',
'La sensibilidad del precio de la opción a cambios en el subyacente',
'El tiempo hasta el vencimiento',
'La volatilidad implícita',
'B', 'Delta = ∂C/∂S, indica cuánto cambia el precio de la opción por cada unidad de cambio en el subyacente.', true),

('fin-019', 'finanzas', 'Riesgo', 'Value at Risk', 'avanzado',
'El Value at Risk (VaR) al 95% representa:',
'La pérdida esperada promedio',
'La pérdida máxima que no será excedida con 95% de confianza',
'El rendimiento esperado',
'El 95% de las ganancias',
'B', 'VaR 95% indica que hay 5% de probabilidad de que las pérdidas excedan ese monto en el horizonte dado.', true),

('fin-020', 'finanzas', 'Riesgo', 'Expected Shortfall', 'avanzado',
'El Expected Shortfall (CVaR) complementa al VaR porque:',
'Es más fácil de calcular',
'Mide la pérdida esperada dado que se excede el VaR',
'Ignora las colas de la distribución',
'Solo considera ganancias',
'B', 'CVaR = E[Loss | Loss > VaR], captura mejor el riesgo de cola al promediar las pérdidas extremas.', true),

-- ============================================
-- 10. PREGUNTAS DE QUIZ - ESTADÍSTICA Y ECONOMETRÍA
-- ============================================

('est-001', 'estadistica', 'Probabilidad', 'Conceptos Básicos', 'basico',
'Si P(A) = 0.3 y P(B) = 0.4, y A y B son independientes, entonces P(A∩B) =:',
'0.7',
'0.12',
'0.1',
'0.70',
'B', 'Para eventos independientes, P(A∩B) = P(A) × P(B) = 0.3 × 0.4 = 0.12', true),

('est-002', 'estadistica', 'Probabilidad', 'Distribuciones', 'basico',
'La distribución normal se caracteriza por:',
'Ser asimétrica',
'Tener media igual a la mediana igual a la moda',
'Solo tener valores positivos',
'Tener colas pesadas',
'B', 'La distribución normal es simétrica, por lo que media = mediana = moda.', true),

('est-003', 'estadistica', 'Estadística Descriptiva', 'Medidas', 'basico',
'La mediana es preferible a la media cuando:',
'Los datos son simétricos',
'Hay valores atípicos (outliers)',
'La muestra es grande',
'Los datos son normales',
'B', 'La mediana es más robusta a outliers porque no se ve afectada por valores extremos.', true),

('est-004', 'estadistica', 'Inferencia', 'Intervalos de Confianza', 'basico',
'Un intervalo de confianza del 95% significa que:',
'Hay 95% de probabilidad de que el parámetro esté en el intervalo',
'Si repetimos el muestreo muchas veces, 95% de los intervalos contendrán el parámetro',
'El 95% de los datos está en el intervalo',
'La muestra es 95% precisa',
'B', 'La interpretación frecuentista: en muestreo repetido, 95% de los intervalos construidos contendrán el verdadero parámetro.', true),

('est-005', 'estadistica', 'Inferencia', 'Pruebas de Hipótesis', 'basico',
'El valor p representa:',
'La probabilidad de que la hipótesis nula sea verdadera',
'La probabilidad de obtener un estadístico tan extremo como el observado, dado que H0 es verdadera',
'El nivel de significancia',
'El error tipo II',
'B', 'El valor p es la probabilidad de observar datos tan o más extremos que los obtenidos, asumiendo H0 verdadera.', true),

('est-006', 'estadistica', 'Regresión', 'MCO', 'basico',
'El método de mínimos cuadrados ordinarios minimiza:',
'La suma de los residuos',
'La suma de los residuos al cuadrado',
'El valor absoluto de los residuos',
'La varianza de Y',
'B', 'MCO minimiza Σ(yi - ŷi)² = Σei², la suma de los cuadrados de los residuos.', true),

('est-007', 'estadistica', 'Regresión', 'Coeficiente', 'basico',
'En una regresión Y = α + βX + ε, β representa:',
'El valor de Y cuando X = 0',
'El cambio esperado en Y por cada unidad de aumento en X',
'La correlación entre X e Y',
'El error de la regresión',
'B', 'β es la pendiente: indica cuánto cambia Y en promedio cuando X aumenta en una unidad.', true),

('est-008', 'estadistica', 'Regresión', 'R-cuadrado', 'basico',
'El R² mide:',
'La significancia de los coeficientes',
'La proporción de la varianza de Y explicada por el modelo',
'La causalidad entre variables',
'El error de predicción',
'B', 'R² = 1 - (SSR/SST) indica qué porcentaje de la variabilidad de Y es explicada por las variables independientes.', true),

('est-009', 'estadistica', 'Regresión', 'Supuestos', 'intermedio',
'La homocedasticidad significa que:',
'Los errores tienen media cero',
'La varianza de los errores es constante',
'Los errores están correlacionados',
'Las variables independientes están correlacionadas',
'B', 'Homocedasticidad: Var(ε|X) = σ² constante para todos los valores de X.', true),

('est-010', 'estadistica', 'Regresión', 'Multicolinealidad', 'intermedio',
'La multicolinealidad causa:',
'Estimadores sesgados',
'Estimadores con varianzas altas',
'Heterocedasticidad',
'Autocorrelación',
'B', 'La multicolinealidad no sesga los estimadores pero aumenta sus varianzas, haciendo las inferencias menos precisas.', true),

('est-011', 'estadistica', 'Regresión', 'Autocorrelación', 'intermedio',
'La prueba de Durbin-Watson detecta:',
'Heterocedasticidad',
'Autocorrelación de primer orden en los errores',
'Multicolinealidad',
'No normalidad',
'B', 'Durbin-Watson prueba si los errores consecutivos están correlacionados (autocorrelación AR(1)).', true),

('est-012', 'estadistica', 'Regresión', 'Variables Instrumentales', 'intermedio',
'Un instrumento válido debe ser:',
'Correlacionado con Y',
'Correlacionado con X pero no con el error',
'No correlacionado con X',
'Correlacionado con el error',
'B', 'Un instrumento válido: (1) correlacionado con X endógena (relevancia), (2) no correlacionado con ε (exogeneidad).', true),

('est-013', 'estadistica', 'Series de Tiempo', 'Estacionariedad', 'intermedio',
'Una serie es estacionaria débil si:',
'Su media y varianza son constantes en el tiempo y la covarianza solo depende del lag',
'No tiene tendencia',
'Es siempre positiva',
'No tiene estacionalidad',
'B', 'Estacionariedad débil: E(Yt) = μ constante, Var(Yt) = σ² constante, Cov(Yt, Yt-k) depende solo de k.', true),

('est-014', 'estadistica', 'Series de Tiempo', 'Raíz Unitaria', 'intermedio',
'La prueba de Dickey-Fuller se utiliza para:',
'Detectar heterocedasticidad',
'Probar si una serie tiene raíz unitaria (no estacionaria)',
'Comparar modelos',
'Probar causalidad',
'B', 'Dickey-Fuller prueba H0: la serie tiene raíz unitaria (no estacionaria) vs. H1: estacionaria.', true),

('est-015', 'estadistica', 'Series de Tiempo', 'Cointegración', 'intermedio',
'Dos series I(1) están cointegradas si:',
'Ambas son estacionarias',
'Existe una combinación lineal de ellas que es estacionaria',
'No tienen relación',
'Ambas tienen raíz unitaria múltiple',
'B', 'Cointegración: aunque individualmente sean I(1), existe una combinación lineal I(0), indicando relación de largo plazo.', true),

('est-016', 'estadistica', 'Panel', 'Efectos Fijos', 'avanzado',
'El modelo de efectos fijos:',
'Asume que los efectos individuales no están correlacionados con las variables explicativas',
'Permite correlación entre efectos individuales y regresores eliminando la heterogeneidad invariante en el tiempo',
'No controla por heterogeneidad',
'Solo aplica a datos cross-section',
'B', 'Efectos fijos elimina la heterogeneidad no observada invariante en el tiempo mediante transformaciones within o diferencias.', true),

('est-017', 'estadistica', 'Panel', 'Prueba de Hausman', 'avanzado',
'La prueba de Hausman compara:',
'Modelos de efectos fijos y efectos aleatorios',
'Modelos lineales y no lineales',
'Datos panel y datos cross-section',
'R² de diferentes modelos',
'A', 'Hausman prueba si los efectos individuales están correlacionados con los regresores (FE vs. RE).', true),

('est-018', 'estadistica', 'Métodos', 'Diferencias en Diferencias', 'avanzado',
'El estimador de diferencias en diferencias:',
'Compara promedios simples entre grupos',
'Compara el cambio en el grupo tratado vs. el cambio en el grupo control',
'Solo usa datos post-tratamiento',
'Requiere asignación aleatoria perfecta',
'B', 'DID estima el efecto comparando (Y_tratados_post - Y_tratados_pre) - (Y_control_post - Y_control_pre).', true),

('est-019', 'estadistica', 'Métodos', 'Regresión Discontinua', 'avanzado',
'La regresión discontinua explota:',
'La variación aleatoria en todo el rango de datos',
'Un umbral o cutoff que determina el tratamiento',
'Variables instrumentales',
'Panel de datos',
'B', 'RD identifica efectos causales comparando unidades justo arriba y justo abajo de un umbral de asignación.', true),

('est-020', 'estadistica', 'GMM', 'Método', 'avanzado',
'El Método Generalizado de Momentos (GMM):',
'Solo puede usarse con datos normales',
'Estima parámetros igualando momentos muestrales con poblacionales',
'Es un caso especial de MCO',
'Requiere distribuciones conocidas',
'B', 'GMM estima parámetros usando condiciones de momento E[g(data, θ)] = 0, más general que MV o MCO.', true),

-- ============================================
-- 11. PREGUNTAS DE QUIZ - POLÍTICA ECONÓMICA
-- ============================================

('pol-001', 'politica-economica', 'Política Fiscal', 'Multiplicadores', 'basico',
'El multiplicador del gasto público es:',
'Siempre igual a 1',
'Mayor que 1 porque el gasto genera ingresos adicionales',
'Siempre negativo',
'Cero en economía cerrada',
'B', 'El multiplicador amplifica el efecto del gasto: un peso de gasto genera más de un peso de ingreso vía consumo inducido.', true),

('pol-002', 'politica-economica', 'Política Fiscal', 'Estabilizadores', 'basico',
'Los estabilizadores automáticos incluyen:',
'Cambios discrecionales en impuestos',
'Impuestos progresivos y seguro de desempleo',
'Política monetaria',
'Aranceles',
'B', 'Los estabilizadores automáticos (impuestos progresivos, transferencias) suavizan fluctuaciones sin acción discrecional.', true),

('pol-003', 'politica-economica', 'Política Monetaria', 'Mecanismos', 'basico',
'El mecanismo de transmisión de la política monetaria incluye:',
'Solo el canal de tasas de interés',
'Canales de tasas de interés, crédito, tipo de cambio y precios de activos',
'Solo el canal fiscal',
'Solo expectativas',
'B', 'La política monetaria afecta la economía a través de múltiples canales: tasas, crédito, TC, riqueza y expectativas.', true),

('pol-004', 'politica-economica', 'Inflación', 'Objetivos', 'basico',
'La mayoría de los bancos centrales modernos tienen como objetivo principal:',
'Maximizar el empleo',
'Mantener la estabilidad de precios',
'Financiar al gobierno',
'Fijar el tipo de cambio',
'B', 'La estabilidad de precios (inflación baja y estable) es el mandato principal de la mayoría de bancos centrales.', true),

('pol-005', 'politica-economica', 'Inflación', 'Metas', 'intermedio',
'El esquema de metas de inflación implica:',
'Controlar directamente los precios',
'Anunciar un objetivo de inflación y ajustar la política para alcanzarlo',
'Fijar el tipo de cambio',
'No tener objetivos explícitos',
'B', 'Inflation targeting: el BC anuncia una meta, comunica su estrategia y ajusta instrumentos para lograr el objetivo.', true),

('pol-006', 'politica-economica', 'Coordinación', 'Fiscal-Monetaria', 'intermedio',
'La dominancia fiscal ocurre cuando:',
'La política fiscal se subordina a la monetaria',
'La política monetaria se ve forzada a financiar déficits fiscales',
'Ambas políticas son independientes',
'No hay banco central',
'B', 'Con dominancia fiscal, el BC pierde autonomía y debe monetizar déficits, generando inflación.', true),

('pol-007', 'politica-economica', 'Banco Central', 'Independencia', 'intermedio',
'La independencia del banco central se asocia con:',
'Mayor inflación',
'Menor inflación promedio',
'Mayor crecimiento económico',
'Mayor desempleo',
'B', 'Estudios empíricos muestran que BCs independientes logran menor inflación sin sacrificar crecimiento.', true),

('pol-008', 'politica-economica', 'Deuda', 'Sostenibilidad', 'intermedio',
'La deuda pública es sostenible si:',
'Siempre aumenta',
'La tasa de crecimiento del PIB supera la tasa de interés real',
'El déficit primario es grande',
'No hay mercado de bonos',
'B', 'Si g > r, la razón deuda/PIB puede estabilizarse o reducirse incluso con déficit primario moderado.', true),

('pol-009', 'politica-economica', 'Reglas vs Discreción', 'Debate', 'avanzado',
'El argumento a favor de reglas de política monetaria es que:',
'Los banqueros centrales siempre son óptimos',
'Las reglas evitan el problema de inconsistencia temporal',
'La discreción siempre es mejor',
'Las reglas son flexibles',
'B', 'Las reglas pueden prevenir el sesgo inflacionario que surge de la inconsistencia temporal bajo discreción.', true),

('pol-010', 'politica-economica', 'Límite Cero', 'ZLB', 'avanzado',
'En el límite inferior cero (ZLB), los bancos centrales pueden usar:',
'Solo tasas de interés negativas',
'Herramientas no convencionales como QE y forward guidance',
'Ninguna herramienta',
'Solo política fiscal',
'B', 'En ZLB, los BCs recurren a QE (compra de activos), forward guidance (comunicación) y otras medidas no convencionales.', true)

ON CONFLICT (id) DO UPDATE SET
    pregunta = EXCLUDED.pregunta,
    opcion_a = EXCLUDED.opcion_a,
    opcion_b = EXCLUDED.opcion_b,
    opcion_c = EXCLUDED.opcion_c,
    opcion_d = EXCLUDED.opcion_d,
    respuesta_correcta = EXCLUDED.respuesta_correcta,
    explicacion = EXCLUDED.explicacion;

-- ============================================
-- 12. PREGUNTAS SOCRÁTICAS (PONTE A PRUEBA)
-- ============================================
INSERT INTO preguntas_socraticas (id, modulo, tema, pregunta, pista, respuesta, nivel, activo) VALUES

-- Microeconomía - Socráticas
('soc-micro-001', 'microeconomia', 'Teoría del Consumidor',
'¿Por qué un consumidor racional nunca elegiría un punto dentro de su restricción presupuestaria en lugar de uno sobre ella?',
'Piensa en qué significa "no gastar todo el presupuesto" en términos de satisfacción...',
'Porque cualquier punto dentro de la restricción presupuestaria implica que no está gastando todo su ingreso. Como más consumo genera más utilidad (no saciedad), siempre puede alcanzar una curva de indiferencia más alta gastando todo su presupuesto, es decir, eligiendo un punto sobre la restricción.',
'basico', true),

('soc-micro-002', 'microeconomia', 'Teoría del Consumidor',
'Si los bienes X e Y son complementarios perfectos, ¿qué forma tendrán las curvas de indiferencia y por qué?',
'Considera cómo consumes zapatos izquierdos y derechos...',
'Las curvas de indiferencia tendrán forma de "L" (ángulo recto). Esto ocurre porque los bienes se consumen en proporciones fijas y tener más de uno sin más del otro no aumenta la utilidad. Por ejemplo, un zapato izquierdo adicional sin el derecho no genera satisfacción adicional.',
'basico', true),

('soc-micro-003', 'microeconomia', 'Elasticidad',
'¿Por qué las empresas con productos de demanda inelástica tienen incentivos para aumentar precios?',
'Piensa en qué pasa con el ingreso total cuando subes el precio de un bien con demanda inelástica...',
'Cuando la demanda es inelástica (|Ed| < 1), un aumento de precio reduce la cantidad demandada proporcionalmente menos. Por tanto, el ingreso total (P × Q) aumenta. La ganancia por precio mayor supera la pérdida por menor cantidad vendida.',
'intermedio', true),

('soc-micro-004', 'microeconomia', 'Teoría del Productor',
'¿Por qué la curva de costo marginal corta a la curva de costo medio en su punto mínimo?',
'Piensa en cómo un promedio se ve afectado cuando agregas un valor mayor o menor que él...',
'Cuando el CM está por debajo del CMe, cada unidad adicional tiene un costo menor al promedio, por lo que "jala" el promedio hacia abajo. Cuando CM > CMe, jala el promedio hacia arriba. Por tanto, el CMe solo puede estar en su mínimo cuando CM = CMe.',
'intermedio', true),

('soc-micro-005', 'microeconomia', 'Mercados',
'En competencia perfecta, ¿por qué las empresas son tomadoras de precios aunque la curva de demanda del mercado tenga pendiente negativa?',
'Considera qué fracción del mercado representa una sola empresa...',
'Cada empresa individual es tan pequeña respecto al mercado total que su producción no afecta el precio de mercado. Si intenta cobrar más, pierde todas sus ventas (hay sustitutos perfectos). Si cobra menos, vende todo a un precio menor innecesariamente. Por eso acepta el precio de mercado.',
'intermedio', true),

('soc-micro-006', 'microeconomia', 'Monopolio',
'¿Por qué un monopolista nunca produce en el tramo inelástico de su curva de demanda?',
'Relaciona la elasticidad con el ingreso marginal...',
'El ingreso marginal es IM = P(1 + 1/Ed). En el tramo inelástico, |Ed| < 1, por lo que IM < 0. Como el costo marginal siempre es positivo, nunca puede igualar un IM negativo. Además, reducir producción (moverse al tramo elástico) aumentaría ingresos y reduciría costos.',
'avanzado', true),

('soc-micro-007', 'microeconomia', 'Bienestar',
'¿Por qué la discriminación de precios de primer grado elimina la pérdida de peso muerto del monopolio?',
'Piensa en quién captura todo el excedente...',
'Con discriminación perfecta, el monopolista cobra a cada consumidor exactamente su disposición a pagar. Produce hasta donde P = CM (como en competencia), eliminando la ineficiencia. No hay pérdida de peso muerto porque se realizan todas las transacciones eficientes. El monopolista simplemente captura todo el excedente.',
'avanzado', true),

('soc-micro-008', 'microeconomia', 'Externalidades',
'¿Por qué el Teorema de Coase no funciona bien en la práctica aunque sea teóricamente elegante?',
'Considera los supuestos del teorema y qué pasa cuando no se cumplen...',
'El teorema requiere: derechos de propiedad bien definidos, costos de transacción cero, e información perfecta. En la realidad, negociar es costoso, especialmente con muchas partes (contaminación atmosférica). Los derechos pueden ser ambiguos, hay asimetrías de información, y hay problemas de free-rider cuando el daño es difuso.',
'avanzado', true),

-- Macroeconomía - Socráticas
('soc-macro-001', 'macroeconomia', 'Cuentas Nacionales',
'¿Por qué el PIB no es una buena medida del bienestar de un país?',
'Piensa en qué cosas valiosas no se incluyen y qué cosas dañinas sí se incluyen...',
'El PIB no incluye: trabajo doméstico no remunerado, economía informal, ocio, calidad ambiental, distribución del ingreso. Además, incluye "males" como gastos en seguridad o reparar daños. Tampoco ajusta por depreciación del capital natural ni considera la sostenibilidad.',
'basico', true),

('soc-macro-002', 'macroeconomia', 'Mercado de Trabajo',
'¿Por qué puede existir desempleo incluso cuando la economía está en pleno empleo?',
'Considera los diferentes tipos de desempleo y cuáles son "naturales"...',
'El pleno empleo no significa desempleo cero. Siempre existe desempleo friccional (búsqueda de empleo) y estructural (desajuste de habilidades). Estos forman la "tasa natural de desempleo" (NAIRU). Solo el desempleo cíclico es el que se elimina en pleno empleo.',
'basico', true),

('soc-macro-003', 'macroeconomia', 'Dinero',
'¿Cómo pueden los bancos comerciales "crear" dinero si no pueden imprimir billetes?',
'Piensa en qué pasa con un depósito cuando el banco lo presta...',
'Mediante el sistema de reservas fraccionarias. Cuando depositas $100, el banco guarda una fracción (ej. 10%) como reserva y presta $90. Ese préstamo se deposita en otro banco, que presta $81, y así sucesivamente. El multiplicador monetario (1/r) amplifica la base monetaria en M1.',
'intermedio', true),

('soc-macro-004', 'macroeconomia', 'Inflación',
'¿Por qué una inflación moderada y predecible puede ser preferible a inflación cero?',
'Considera la rigidez de salarios nominales y las tasas de interés reales...',
'Razones: (1) Permite ajustes de salarios reales con rigidez nominal a la baja, (2) Da margen a tasas de interés reales negativas cuando es necesario, (3) El IPC sobreestima la inflación verdadera, (4) El "aceite en los engranajes" facilita ajustes de precios relativos.',
'intermedio', true),

('soc-macro-005', 'macroeconomia', 'Modelo IS-LM',
'¿Por qué la política monetaria es más efectiva con curva LM más plana?',
'Dibuja el diagrama y observa el desplazamiento de LM...',
'Con LM más plana (mayor sensibilidad de la demanda de dinero a la tasa de interés), un desplazamiento de LM hacia la derecha genera mayor cambio en el ingreso y menor cambio en la tasa de interés. Hay menos "crowding out" y el efecto expansivo es mayor.',
'intermedio', true),

('soc-macro-006', 'macroeconomia', 'Crecimiento',
'En el modelo de Solow, ¿por qué el crecimiento del PIB per cápita a largo plazo solo depende del progreso tecnológico?',
'Piensa qué pasa en el estado estacionario con el capital por trabajador...',
'En estado estacionario, el capital por trabajador (k) es constante porque la inversión iguala exactamente la depreciación y dilución por crecimiento poblacional. Sin progreso tecnológico, el producto por trabajador también sería constante. Solo la tecnología puede aumentar el producto por trabajador sostenidamente.',
'avanzado', true),

('soc-macro-007', 'macroeconomia', 'Expectativas',
'¿Por qué la credibilidad del banco central es tan importante para controlar la inflación?',
'Piensa en cómo las expectativas de inflación afectan los contratos y precios...',
'Si el BC es creíble, las expectativas de inflación se anclan en la meta. Los contratos salariales y de precios se fijan considerando esa meta, lo que hace más fácil alcanzarla (profecía autocumplida). Sin credibilidad, las expectativas son altas, generando inercia inflacionaria difícil de romper.',
'avanzado', true),

('soc-macro-008', 'macroeconomia', 'Crisis',
'¿Por qué los rescates bancarios pueden crear riesgo moral pero aun así ser necesarios?',
'Considera las consecuencias de no rescatar vs. rescatar...',
'El dilema: no rescatar permite quiebras sistémicas con efectos devastadores (contagio, credit crunch). Pero rescatar crea riesgo moral: los bancos toman más riesgos esperando ser salvados. La solución ideal combina rescates con regulación estricta, supervisión y mecanismos de resolución ordenada.',
'avanzado', true),

-- Economía Internacional - Socráticas
('soc-int-001', 'economia-internacional', 'Comercio',
'¿Por qué dos países comercian incluso si uno es más eficiente en producir TODO?',
'Piensa en costos de oportunidad, no en costos absolutos...',
'Por la ventaja comparativa. Aunque un país sea absolutamente mejor en todo, tendrá menor costo de oportunidad en algunos bienes. Se especializará en estos. El otro país se especializará donde tenga menor desventaja relativa. Ambos ganan porque aumenta la producción total.',
'basico', true),

('soc-int-002', 'economia-internacional', 'Tipo de Cambio',
'¿Por qué la Paridad del Poder Adquisitivo (PPA) no se cumple en el corto plazo?',
'Considera qué bienes no son comerciables internacionalmente...',
'Razones: (1) Bienes no transables (servicios, vivienda) no están sujetos a arbitraje, (2) Costos de transporte y barreras comerciales, (3) Diferencias en impuestos, (4) Rigideces de precios, (5) Los tipos de cambio responden también a flujos de capital, no solo a comercio.',
'intermedio', true),

('soc-int-003', 'economia-internacional', 'Balanza de Pagos',
'¿Por qué un déficit de cuenta corriente no es necesariamente malo?',
'Piensa en qué financia ese déficit y para qué se usa...',
'Un déficit CC implica que el país importa capital (superávit en cuenta financiera). Si ese capital financia inversión productiva que aumentará la capacidad de exportar en el futuro, puede ser sostenible y beneficioso. El problema es cuando financia consumo o inversión improductiva.',
'intermedio', true),

('soc-int-004', 'economia-internacional', 'Política Comercial',
'¿Por qué los países usan aranceles si la teoría dice que reducen el bienestar?',
'Considera los efectos distributivos y la economía política...',
'Razones: (1) Proteger industria naciente, (2) Presión de grupos de interés (productores organizados vs. consumidores dispersos), (3) Términos de intercambio en países grandes, (4) Reciprocidad en negociaciones, (5) Seguridad nacional, (6) Empleos en sectores específicos.',
'avanzado', true),

-- Finanzas - Socráticas
('soc-fin-001', 'finanzas', 'Valuación',
'¿Por qué un peso hoy vale más que un peso mañana?',
'Piensa en qué podrías hacer con ese peso mientras esperas...',
'Por tres razones: (1) Costo de oportunidad: podrías invertirlo y ganar interés, (2) Inflación: el poder adquisitivo puede disminuir, (3) Riesgo: existe incertidumbre sobre recibir el peso futuro. Por eso descontamos los flujos futuros a valor presente.',
'basico', true),

('soc-fin-002', 'finanzas', 'Riesgo',
'¿Por qué la diversificación reduce el riesgo de un portafolio pero no lo elimina completamente?',
'Piensa en qué riesgos son específicos de una empresa vs. comunes a todo el mercado...',
'La diversificación elimina el riesgo idiosincrático (específico de cada activo) porque los eventos que afectan una empresa se cancelan con los de otras. Pero el riesgo sistemático (recesiones, guerras, pandemias) afecta a todo el mercado simultáneamente y no puede diversificarse.',
'intermedio', true),

('soc-fin-003', 'finanzas', 'CAPM',
'¿Por qué el CAPM dice que solo el riesgo sistemático merece compensación?',
'Piensa en qué riesgo puede eliminarse sin costo...',
'El riesgo no sistemático puede eliminarse gratis mediante diversificación. Como los inversionistas pueden eliminarlo, el mercado no los compensa por asumirlo. Solo el riesgo que NO puede eliminarse (sistemático, beta) merece un mayor rendimiento esperado.',
'intermedio', true),

('soc-fin-004', 'finanzas', 'Estructura de Capital',
'Si la deuda tiene ventajas fiscales, ¿por qué las empresas no se financian 100% con deuda?',
'Considera qué pasa cuando hay mucha deuda...',
'Porque la deuda también tiene costos: (1) Mayor probabilidad de quiebra y sus costos asociados, (2) Costos de agencia (conflictos entre accionistas y acreedores), (3) Pérdida de flexibilidad financiera, (4) Costos de estrés financiero. El óptimo balancea beneficios fiscales contra estos costos.',
'avanzado', true),

-- Estadística - Socráticas
('soc-est-001', 'estadistica', 'Inferencia',
'¿Por qué un resultado "estadísticamente significativo" puede no ser "prácticamente significativo"?',
'Piensa en qué determina la significancia estadística además del tamaño del efecto...',
'La significancia estadística depende del tamaño de muestra. Con n muy grande, incluso efectos diminutos son "significativos". Pero un efecto de 0.1% puede ser estadísticamente significativo con n=1 millón y aun así ser irrelevante en la práctica. Hay que considerar el tamaño del efecto, no solo el valor p.',
'intermedio', true),

('soc-est-002', 'estadistica', 'Regresión',
'¿Por qué correlación no implica causalidad?',
'Piensa en qué otras explicaciones hay para que dos variables estén correlacionadas...',
'Porque pueden existir: (1) Causalidad reversa (Y causa X, no X causa Y), (2) Variables omitidas (Z causa tanto X como Y), (3) Correlación espuria (coincidencia o tendencias comunes). Para establecer causalidad se necesitan experimentos controlados, variables instrumentales u otros métodos causales.',
'basico', true),

('soc-est-003', 'estadistica', 'Regresión',
'¿Por qué la endogeneidad es el problema más importante en econometría aplicada?',
'Piensa qué pasa con nuestras estimaciones si X está correlacionada con el error...',
'Porque si Cov(X,ε) ≠ 0, los estimadores MCO son sesgados e inconsistentes: no convergen al parámetro verdadero ni con muestras infinitas. Las fuentes son: variables omitidas, simultaneidad, error de medición. Sin resolver la endogeneidad, no podemos hacer inferencia causal válida.',
'avanzado', true),

('soc-est-004', 'estadistica', 'Series de Tiempo',
'¿Por qué es peligroso hacer regresiones con series no estacionarias?',
'Piensa qué pasa con dos caminatas aleatorias independientes...',
'Puedes encontrar relaciones espurias: dos series con tendencia o raíz unitaria pueden mostrar correlación alta y t-estadísticos significativos aunque no tengan relación causal. Los estadísticos convencionales no son válidos. Por eso hay que diferenciar las series o usar cointegración.',
'avanzado', true),

-- Preguntas adicionales socráticas mixtas
('soc-mix-001', 'microeconomia', 'Mercados',
'¿Por qué los carteles son inestables aunque beneficien a todos sus miembros?',
'Piensa en el dilema del prisionero...',
'Cada miembro tiene incentivo individual para hacer trampa: si los demás mantienen precios altos, uno puede ganar más bajando un poco su precio y capturando más mercado. Es un dilema del prisionero: la cooperación es mejor colectivamente, pero la defección es racionalmente individual.',
'intermedio', true),

('soc-mix-002', 'macroeconomia', 'Política',
'¿Por qué los déficits fiscales de hoy pueden ser un problema para generaciones futuras?',
'Piensa en cómo se paga eventualmente la deuda...',
'La deuda de hoy debe pagarse con impuestos futuros o inflación. Las generaciones futuras heredan la deuda sin haber votado por el gasto que la generó. Sin embargo, si la deuda financia inversión productiva (infraestructura, educación), también heredan los beneficios, mitigando el problema.',
'intermedio', true),

('soc-mix-003', 'finanzas', 'Mercados',
'¿Por qué existen las burbujas si los mercados son eficientes?',
'Considera los límites del arbitraje...',
'Posibles explicaciones: (1) Límites al arbitraje (costos, riesgo de que la burbuja crezca antes de colapsar), (2) Sesgos psicológicos (exceso de optimismo, comportamiento de manada), (3) Problemas de agencia (traders juegan con dinero ajeno), (4) Información asimétrica. Los mercados pueden no ser perfectamente eficientes.',
'avanzado', true),

('soc-mix-004', 'economia-internacional', 'Desarrollo',
'¿Por qué algunos países ricos en recursos naturales son pobres (la "maldición de los recursos")?',
'Piensa en los efectos sobre tipo de cambio, instituciones e incentivos...',
'Causas: (1) Enfermedad holandesa: exportaciones de recursos aprecian el TC, dañando otros sectores, (2) Volatilidad de precios de commodities, (3) Instituciones débiles y corrupción (rentas fáciles), (4) Conflictos por control de recursos, (5) Menor incentivo para invertir en capital humano y diversificación.',
'avanzado', true),

('soc-mix-005', 'politica-economica', 'Coordinación',
'¿Por qué la política monetaria sola no puede estabilizar perfectamente la economía?',
'Piensa en los límites de lo que puede hacer la tasa de interés...',
'Limitaciones: (1) ZLB: las tasas no pueden ser muy negativas, (2) Rezagos largos y variables en la transmisión, (3) Efectos distributivos limitados, (4) No puede afectar oferta agregada directamente, (5) Puede generar burbujas buscando estimular demanda, (6) En economía abierta, limitada por trilema.',
'avanzado', true)

ON CONFLICT (id) DO UPDATE SET
    pregunta = EXCLUDED.pregunta,
    pista = EXCLUDED.pista,
    respuesta = EXCLUDED.respuesta;

-- ============================================
-- 13. USUARIO ADMINISTRADOR (con MD5)
-- ============================================
INSERT INTO usuarios (email, nombre, password_hash, avatar, rol_id, activo)
SELECT
    'admin@egelstudy.com',
    'Administrador',
    MD5('admin123'),
    '👨‍💼',
    (SELECT id FROM roles WHERE nombre = 'admin' LIMIT 1),
    true
WHERE NOT EXISTS (
    SELECT 1 FROM usuarios WHERE email = 'admin@egelstudy.com'
);

-- ============================================
-- 14. CONFIGURACIÓN INICIAL
-- ============================================
INSERT INTO configuracion (clave, valor, descripcion) VALUES
('prueba_semanal_activa', 'true', 'Indica si la prueba semanal está activa'),
('preguntas_por_prueba', '80', 'Número de preguntas en la prueba semanal'),
('tiempo_prueba_minutos', '60', 'Tiempo límite para la prueba semanal'),
('registro_abierto', 'false', 'Si es true, cualquiera puede registrarse sin aprobación')
ON CONFLICT (clave) DO UPDATE SET
    valor = EXCLUDED.valor;

-- ============================================
-- FIN DEL SCRIPT
-- ============================================
-- Total aproximado:
-- - 100+ preguntas de Quiz (todos los módulos)
-- - 25+ preguntas Socráticas
-- - Usuario admin con password MD5
-- - Configuración inicial
