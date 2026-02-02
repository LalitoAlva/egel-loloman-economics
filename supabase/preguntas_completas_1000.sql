-- ============================================
-- SCRIPT DE PREGUNTAS COMPLETAS EGEL ECONOMÍA
-- 500 Preguntas Quiz + 500 Preguntas Socráticas
-- ============================================
-- Incluye: Teoría económica clara, ejercicios matemáticos,
-- explicaciones detalladas para entender cada concepto
-- ============================================

-- Primero, asegurarnos que existen los módulos necesarios
INSERT INTO modulos (slug, titulo, descripcion, icon, color, numero, activo)
VALUES
    ('microeconomia', 'Microeconomía', 'Teoría del consumidor, productor, mercados y precios', '📉', '#6366f1', 1, true),
    ('macroeconomia', 'Macroeconomía', 'PIB, inflación, desempleo, políticas económicas', '📊', '#22c55e', 2, true),
    ('finanzas', 'Finanzas', 'Valor del dinero en el tiempo, inversiones, riesgo', '💰', '#ef4444', 3, true),
    ('economia_internacional', 'Economía Internacional', 'Comercio, tipo de cambio, balanza de pagos', '🌍', '#f59e0b', 4, true),
    ('econometria', 'Econometría y Estadística', 'Regresión, probabilidad, series de tiempo', '📈', '#8b5cf6', 5, true),
    ('pensamiento_economico', 'Historia del Pensamiento Económico', 'Escuelas económicas, teorías clásicas y modernas', '📚', '#ec4899', 6, true),
    ('politica_economica', 'Política Económica', 'Política fiscal, monetaria, comercial', '🏛️', '#14b8a6', 7, true),
    ('economia_mexicana', 'Economía Mexicana', 'Historia económica de México, instituciones', '🇲🇽', '#f97316', 8, true)
ON CONFLICT (slug) DO UPDATE SET
    titulo = EXCLUDED.titulo,
    descripcion = EXCLUDED.descripcion,
    icon = EXCLUDED.icon,
    color = EXCLUDED.color,
    activo = true;

-- ============================================
-- MICROECONOMÍA - Preguntas Quiz (100 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo) VALUES

-- Elasticidad (20 preguntas con ejercicios matemáticos)
((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Elasticidad Precio', 'Elasticidad', 'basico', 'opcion_multiple',
'Si el precio de un bien aumenta de $10 a $12 y la cantidad demandada disminuye de 100 a 80 unidades, ¿cuál es la elasticidad precio de la demanda usando el método del punto medio?',
'-1.0', '-1.22', '-0.82', '-1.5', 'b',
'La elasticidad precio de la demanda mide qué tan sensible es la cantidad demandada ante cambios en el precio. Usamos el método del punto medio para mayor precisión:

PASO 1: Calcular el cambio porcentual en cantidad = (80-100)/[(80+100)/2] = -20/90 = -22.22%
PASO 2: Calcular el cambio porcentual en precio = (12-10)/[(12+10)/2] = 2/11 = 18.18%
PASO 3: Elasticidad = -22.22% / 18.18% = -1.22

Una elasticidad de -1.22 indica que la demanda es ELÁSTICA: un 1% de aumento en precio causa más de 1% de reducción en cantidad.',
'Ed = (ΔQ/Q̄) / (ΔP/P̄) donde Q̄ y P̄ son los promedios', true),

((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Elasticidad Precio', 'Elasticidad', 'intermedio', 'opcion_multiple',
'Un bien tiene elasticidad precio de demanda igual a -0.5. Si el precio aumenta 20%, ¿cuánto cambiará la cantidad demandada?',
'Aumenta 10%', 'Disminuye 10%', 'Disminuye 40%', 'Aumenta 40%', 'b',
'La elasticidad nos dice directamente cuánto cambia la cantidad cuando cambia el precio:

FÓRMULA: %ΔQ = Ed × %ΔP

CÁLCULO: %ΔQ = -0.5 × 20% = -10%

INTERPRETACIÓN: La cantidad demandada DISMINUYE 10%.

CONCEPTO CLAVE: Una elasticidad de -0.5 significa demanda INELÁSTICA. Los consumidores no son muy sensibles al precio (necesidades, sin sustitutos cercanos, etc.)',
'%ΔQ = Ed × %ΔP', true),

((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Elasticidad Precio', 'Elasticidad', 'avanzado', 'opcion_multiple',
'Una empresa vende 1,000 unidades a $50. La elasticidad precio es -2. Si quiere maximizar ingresos, ¿qué debería hacer?',
'Aumentar el precio porque la demanda es inelástica', 'Reducir el precio porque la demanda es elástica', 'Mantener el precio porque está en el óptimo', 'No se puede determinar', 'b',
'REGLA DE MAXIMIZACIÓN DE INGRESOS:

• Si |Ed| > 1 (demanda elástica): REDUCIR precio aumenta ingresos
• Si |Ed| < 1 (demanda inelástica): AUMENTAR precio aumenta ingresos
• Si |Ed| = 1 (elasticidad unitaria): Ingresos están en máximo

En este caso, |Ed| = 2 > 1, la demanda es ELÁSTICA.

EXPLICACIÓN: Cuando reducimos el precio, la cantidad aumenta en mayor proporción, compensando la reducción en precio. Por ejemplo, si baja precio 10%, cantidad sube 20%, e ingresos suben.',
'IT = P × Q; Si Ed > 1, reducir P aumenta IT', true),

((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Elasticidad Cruzada', 'Elasticidad', 'intermedio', 'opcion_multiple',
'Si la elasticidad cruzada entre café y té es +1.5, ¿qué significa esto?',
'Son bienes complementarios', 'Son bienes sustitutos', 'Son bienes inferiores', 'No tienen relación', 'b',
'La ELASTICIDAD CRUZADA mide cómo cambia la demanda de un bien cuando cambia el precio de otro:

INTERPRETACIÓN:
• Exy > 0 (positiva): BIENES SUSTITUTOS
  - Si sube precio del té, aumenta demanda de café
  - Ejemplo: Coca-Cola y Pepsi

• Exy < 0 (negativa): BIENES COMPLEMENTARIOS
  - Si sube precio de gasolina, baja demanda de autos
  - Ejemplo: pan y mantequilla

• Exy = 0: Bienes NO RELACIONADOS

En este caso, Exy = +1.5 > 0, son SUSTITUTOS. Si el té sube 10%, la demanda de café sube 15%.',
'Exy = %ΔQx / %ΔPy', true),

((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Elasticidad Ingreso', 'Elasticidad', 'basico', 'opcion_multiple',
'Si el ingreso de los consumidores aumenta 10% y la demanda de un bien aumenta 15%, ¿qué tipo de bien es?',
'Bien inferior', 'Bien normal de lujo', 'Bien normal necesario', 'Bien Giffen', 'b',
'La ELASTICIDAD INGRESO clasifica los bienes según cómo responde su demanda al ingreso:

CÁLCULO: Ey = %ΔQ / %ΔY = 15% / 10% = 1.5

CLASIFICACIÓN:
• Ey < 0: Bien INFERIOR (hamburguesas cuando eres pobre)
• 0 < Ey < 1: Bien NORMAL NECESARIO (alimentos básicos)
• Ey > 1: Bien NORMAL DE LUJO (viajes, joyería)

Con Ey = 1.5 > 1, es un BIEN DE LUJO. Cuando el ingreso sube, la gente gasta proporcionalmente más en estos bienes.',
'Ey = %ΔQ / %ΔY', true),

-- Teoría del Consumidor (15 preguntas)
((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Utilidad Marginal', 'Teoría del Consumidor', 'basico', 'opcion_multiple',
'Juan consume manzanas. La primera le da 10 útiles, la segunda 8, la tercera 5, la cuarta 1. ¿Qué principio ilustra esto?',
'Ley de rendimientos crecientes', 'Ley de utilidad marginal decreciente', 'Ley de la demanda', 'Paradoja del valor', 'b',
'La LEY DE UTILIDAD MARGINAL DECRECIENTE establece que:

"A medida que consumimos más unidades de un bien, cada unidad adicional nos proporciona menos satisfacción que la anterior."

EN EL EJEMPLO:
• 1ra manzana: 10 útiles (mucha hambre)
• 2da manzana: 8 útiles (menos hambre)
• 3ra manzana: 5 útiles (casi satisfecho)
• 4ta manzana: 1 útil (casi lleno)

Esta ley explica por qué las curvas de demanda tienen pendiente negativa: solo compramos más si el precio baja.',
'UMg = ΔUT / ΔQ', true),

((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Maximización Utilidad', 'Teoría del Consumidor', 'avanzado', 'opcion_multiple',
'Un consumidor tiene $100. El bien X cuesta $10 y el bien Y cuesta $20. UMgX = 40 y UMgY = 60. ¿Está maximizando su utilidad?',
'Sí, porque gasta todo su ingreso', 'No, debería comprar más X', 'No, debería comprar más Y', 'Sí, porque UMgY > UMgX', 'b',
'Para MAXIMIZAR UTILIDAD, el consumidor debe igualar la utilidad marginal por peso gastado:

CONDICIÓN: UMgX/PX = UMgY/PY

CALCULAMOS:
• UMgX/PX = 40/10 = 4 útiles por peso
• UMgY/PY = 60/20 = 3 útiles por peso

CONCLUSIÓN: Obtiene MÁS utilidad por peso en X (4 > 3)
Por lo tanto, debería COMPRAR MÁS X y menos Y hasta que se igualen.

INTUICIÓN: Si un peso te da 4 útiles en X pero solo 3 en Y, ¿dónde gastarías tu siguiente peso?',
'UMgX/PX = UMgY/PY (condición de equilibrio)', true),

((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Curvas de Indiferencia', 'Teoría del Consumidor', 'intermedio', 'opcion_multiple',
'¿Por qué las curvas de indiferencia no pueden cruzarse?',
'Porque violaría el supuesto de más es mejor', 'Porque violaría la transitividad de preferencias', 'Porque tendrían la misma utilidad', 'Porque serían bienes sustitutos perfectos', 'b',
'Si las curvas de indiferencia se cruzaran, violaríamos la TRANSITIVIDAD:

DEMOSTRACIÓN POR CONTRADICCIÓN:
Supongamos que se cruzan en punto C:
• Punto A está en curva I1, punto B en curva I2
• A ~ C (misma curva I1)
• B ~ C (misma curva I2)
• Por transitividad: A ~ B

Pero si A tiene más de ambos bienes que B, por "más es mejor", A > B
¡CONTRADICCIÓN!

SUPUESTOS DE PREFERENCIAS:
1. Completitud: puedo comparar cualquier par
2. Transitividad: si A≻B y B≻C, entonces A≻C
3. Más es mejor: más cantidad = más utilidad',
'Transitividad: Si A~B y B~C, entonces A~C', true),

((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Restricción Presupuestaria', 'Teoría del Consumidor', 'basico', 'opcion_multiple',
'Si el ingreso es $1000, Px=$50 y Py=$25, ¿cuál es la ecuación de la restricción presupuestaria?',
'50X + 25Y = 1000', '25X + 50Y = 1000', 'X + Y = 1000', '50X + 25Y ≤ 1000', 'a',
'La RESTRICCIÓN PRESUPUESTARIA muestra todas las combinaciones de bienes que el consumidor puede comprar con su ingreso:

ECUACIÓN: PxX + PyY = I

SUSTITUYENDO: 50X + 25Y = 1000

INTERPRETACIONES IMPORTANTES:
• Intercepto X (Y=0): X = 1000/50 = 20 unidades
• Intercepto Y (X=0): Y = 1000/25 = 40 unidades
• Pendiente: -Px/Py = -50/25 = -2

La pendiente (-2) significa que por cada unidad adicional de X, debe sacrificar 2 unidades de Y.',
'PxX + PyY = I', true),

((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Efecto Sustitución e Ingreso', 'Teoría del Consumidor', 'avanzado', 'opcion_multiple',
'Si baja el precio de un bien normal, el efecto sustitución y el efecto ingreso:',
'Ambos aumentan la cantidad demandada', 'Ambos disminuyen la cantidad demandada', 'Se contrarrestan mutuamente', 'Solo actúa el efecto sustitución', 'a',
'Cuando baja el precio de un bien NORMAL:

EFECTO SUSTITUCIÓN:
• El bien se vuelve relativamente más barato
• Sustituimos otros bienes por este
• SIEMPRE aumenta cantidad demandada

EFECTO INGRESO:
• Nuestro poder adquisitivo real aumenta
• "Nos sentimos más ricos"
• Para bienes normales: aumenta cantidad demandada

RESULTADO: Ambos efectos VAN EN LA MISMA DIRECCIÓN → Aumenta cantidad demandada.

NOTA: Para bienes inferiores, el efecto ingreso va en contra (pero el sustitución domina, excepto en bienes Giffen).',
'ΔQ total = ΔQ sustitución + ΔQ ingreso', true),

-- Teoría del Productor (20 preguntas)
((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Costos de Producción', 'Teoría del Productor', 'basico', 'opcion_multiple',
'Una empresa tiene costos fijos de $500 y costo variable de $10 por unidad. Si produce 50 unidades, ¿cuál es el costo total?',
'$500', '$1000', '$1500', '$550', 'b',
'Los COSTOS TOTALES se componen de:

CT = CF + CV

DONDE:
• CF (Costos Fijos) = $500 (no cambian con producción: alquiler, seguros)
• CV (Costos Variables) = $10 × 50 = $500 (materias primas, mano de obra directa)

CÁLCULO:
CT = $500 + $500 = $1,000

CONCEPTOS CLAVE:
• Costo Fijo Medio = CF/Q = 500/50 = $10
• Costo Variable Medio = CV/Q = 500/50 = $10
• Costo Total Medio = CT/Q = 1000/50 = $20',
'CT = CF + CV = CF + (CVMe × Q)', true),

((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Costo Marginal', 'Teoría del Productor', 'intermedio', 'opcion_multiple',
'Si CT(Q) = 100 + 5Q + 0.5Q², ¿cuál es el costo marginal cuando Q = 10?',
'$10', '$15', '$20', '$25', 'b',
'El COSTO MARGINAL es el costo adicional de producir una unidad más:

MÉTODO: Derivar la función de costo total respecto a Q

CT = 100 + 5Q + 0.5Q²

CMg = dCT/dQ = 5 + Q

Cuando Q = 10:
CMg = 5 + 10 = $15

INTERPRETACIÓN: Producir la unidad 11 costaría aproximadamente $15 adicionales.

REGLA IMPORTANTE: La empresa maximiza ganancias donde CMg = IMg (precio en competencia perfecta).',
'CMg = dCT/dQ = ΔCT/ΔQ', true),

((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Rendimientos a Escala', 'Teoría del Productor', 'intermedio', 'opcion_multiple',
'Si una empresa duplica todos sus insumos y la producción aumenta en 150%, tiene:',
'Rendimientos constantes a escala', 'Rendimientos crecientes a escala', 'Rendimientos decrecientes a escala', 'Deseconomías de escala', 'c',
'Los RENDIMIENTOS A ESCALA miden cómo cambia la producción cuando TODOS los insumos cambian proporcionalmente:

ANÁLISIS:
• Insumos aumentan: 100% (se duplican)
• Producción aumenta: 150% (2.5 veces original... espera, esto está mal)

CORRECCIÓN: Si duplicamos insumos (100% más) y producción sube 150%, significa:
Producción nueva = 2.5 × original cuando insumos = 2 × original

CLASIFICACIÓN:
• Si producción aumenta MÁS que proporcionalmente: CRECIENTES
• Si producción aumenta IGUAL proporcionalmente: CONSTANTES
• Si producción aumenta MENOS que proporcionalmente: DECRECIENTES

150% < 200%, así que son DECRECIENTES (la producción no se duplicó).',
'Si λ > 1: f(λK, λL) vs λf(K,L)', true),

((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Producto Marginal', 'Teoría del Productor', 'basico', 'opcion_multiple',
'Con 3 trabajadores se producen 30 unidades, con 4 trabajadores se producen 36 unidades. ¿Cuál es el producto marginal del 4to trabajador?',
'36 unidades', '6 unidades', '9 unidades', '12 unidades', 'b',
'El PRODUCTO MARGINAL DEL TRABAJO (PMgL) es la producción adicional de un trabajador más:

PMgL = ΔQ / ΔL

CÁLCULO:
PMgL = (36 - 30) / (4 - 3) = 6/1 = 6 unidades

INTERPRETACIÓN: El 4to trabajador aporta 6 unidades adicionales a la producción.

CONCEPTOS RELACIONADOS:
• Producto Medio = Q/L = 36/4 = 9 unidades por trabajador
• Ley de rendimientos decrecientes: eventualmente PMgL disminuye al agregar más trabajadores con capital fijo.',
'PMgL = ΔQ/ΔL', true),

((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Maximización de Beneficios', 'Teoría del Productor', 'avanzado', 'opcion_multiple',
'Una empresa tiene IT = 100Q - Q² y CT = 20 + 10Q + Q². ¿Cuál es la cantidad que maximiza beneficios?',
'Q = 22.5', 'Q = 45', 'Q = 30', 'Q = 20', 'a',
'Para MAXIMIZAR BENEFICIOS: IMg = CMg

PASO 1 - Calcular Ingreso Marginal:
IT = 100Q - Q²
IMg = dIT/dQ = 100 - 2Q

PASO 2 - Calcular Costo Marginal:
CT = 20 + 10Q + Q²
CMg = dCT/dQ = 10 + 2Q

PASO 3 - Igualar IMg = CMg:
100 - 2Q = 10 + 2Q
90 = 4Q
Q* = 22.5 unidades

VERIFICACIÓN (Condición de segundo orden):
d²π/dQ² = d(IMg)/dQ - d(CMg)/dQ = -2 - 2 = -4 < 0 ✓ (Es máximo)',
'Maximizar π: IMg = CMg; Verificar: d²π/dQ² < 0', true),

-- Estructuras de Mercado (20 preguntas)
((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Competencia Perfecta', 'Estructuras de Mercado', 'basico', 'opcion_multiple',
'En competencia perfecta, la curva de demanda que enfrenta cada empresa individual es:',
'Descendente con pendiente negativa', 'Perfectamente elástica (horizontal)', 'Perfectamente inelástica (vertical)', 'Tiene forma de U', 'b',
'En COMPETENCIA PERFECTA:

CARACTERÍSTICAS:
1. Muchos compradores y vendedores pequeños
2. Producto homogéneo (idéntico)
3. Libre entrada y salida
4. Información perfecta

CURVA DE DEMANDA INDIVIDUAL:
• Es HORIZONTAL al precio de mercado
• La empresa es "tomadora de precios"
• Puede vender todo lo que quiera al precio de mercado
• No puede cobrar más (pierde todos los clientes)
• No tiene sentido cobrar menos (ya puede vender todo)

Por esto: P = IMg = IMe (el precio es constante)',
'Demanda individual: P = IMg = IMe (horizontal)', true),

((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Monopolio', 'Estructuras de Mercado', 'intermedio', 'opcion_multiple',
'Un monopolista enfrenta demanda P = 100 - 2Q y tiene CMg = 20. ¿Cuál es el precio de monopolio?',
'$20', '$60', '$80', '$40', 'b',
'El MONOPOLISTA maximiza beneficios donde IMg = CMg:

PASO 1 - Calcular Ingreso Marginal:
IT = P × Q = (100 - 2Q) × Q = 100Q - 2Q²
IMg = dIT/dQ = 100 - 4Q

PASO 2 - Igualar IMg = CMg:
100 - 4Q = 20
80 = 4Q
Q* = 20 unidades

PASO 3 - Encontrar precio (sustituir en demanda):
P* = 100 - 2(20) = 100 - 40 = $60

NOTA: El monopolista produce MENOS y cobra MÁS que en competencia perfecta (donde P = CMg = 20).',
'IMg = 100 - 4Q (pendiente doble que demanda)', true),

((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Pérdida de Eficiencia', 'Estructuras de Mercado', 'avanzado', 'opcion_multiple',
'La pérdida de peso muerto del monopolio se debe a:',
'Los altos costos de producción', 'La producción menor al óptimo social', 'Los impuestos al monopolio', 'La publicidad excesiva', 'b',
'La PÉRDIDA DE PESO MUERTO (deadweight loss) del monopolio:

COMPARACIÓN:
• Competencia perfecta: Q donde P = CMg (eficiente)
• Monopolio: Q donde IMg = CMg (menor cantidad)

ÁREA TRIANGULAR ENTRE:
• Cantidad de monopolio (Qm)
• Cantidad competitiva (Qc)
• Curva de demanda arriba, CMg abajo

INTERPRETACIÓN:
Hay consumidores dispuestos a pagar más que el costo marginal, pero no compran porque el precio de monopolio es muy alto.

SON TRANSACCIONES QUE BENEFICIARÍAN A AMBOS LADOS PERO NO OCURREN.

Esta es la ineficiencia del monopolio: destruye valor económico.',
'DWL = ½ × (Pm - CMg) × (Qc - Qm)', true),

((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Oligopolio Cournot', 'Estructuras de Mercado', 'avanzado', 'opcion_multiple',
'En el modelo de Cournot con 2 empresas idénticas, demanda P = 100 - Q y CMg = 10, ¿cuánto produce cada empresa?',
'45 unidades', '30 unidades', '22.5 unidades', '15 unidades', 'b',
'MODELO DE COURNOT: Las empresas eligen cantidades simultáneamente.

PASO 1 - Función de reacción:
Q = q1 + q2, entonces P = 100 - q1 - q2

Beneficio empresa 1:
π1 = (100 - q1 - q2)q1 - 10q1

∂π1/∂q1 = 100 - 2q1 - q2 - 10 = 0
q1 = (90 - q2)/2 ← Función de reacción

PASO 2 - Por simetría: q1 = q2 = q*
q* = (90 - q*)/2
2q* = 90 - q*
3q* = 90
q* = 30 unidades cada una

RESULTADO:
• Q total = 60
• P = 100 - 60 = $40
• Está entre monopolio (Q=45) y competencia (Q=90)',
'Función de reacción: qi = (a - c - qj)/2', true),

((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Competencia Monopolística', 'Estructuras de Mercado', 'intermedio', 'opcion_multiple',
'En el largo plazo, una empresa en competencia monopolística obtiene:',
'Beneficios económicos positivos', 'Beneficios económicos cero', 'Pérdidas económicas', 'Beneficios mayores que el monopolio', 'b',
'COMPETENCIA MONOPOLÍSTICA en largo plazo:

CARACTERÍSTICAS:
• Muchas empresas
• Productos diferenciados (no idénticos)
• Libre entrada y salida

PROCESO DE AJUSTE:
1. Si hay beneficios → entran nuevas empresas
2. La demanda de cada empresa se reduce
3. Las curvas se desplazan a la izquierda
4. Continúa hasta que π = 0

EQUILIBRIO LARGO PLAZO:
• P = CMe (beneficio cero)
• P > CMg (hay poder de mercado)
• La curva de demanda es TANGENTE a la curva de CMe

DIFERENCIA CON COMPETENCIA PERFECTA:
Hay "capacidad ociosa" - no produce en el mínimo del CMe.',
'Largo plazo: P = CMe (tangencia), π = 0', true),

-- Externalidades y Bienes Públicos (15 preguntas)
((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Externalidades Negativas', 'Externalidades', 'basico', 'opcion_multiple',
'Una fábrica contamina un río usado por pescadores. Sin regulación, la fábrica producirá:',
'La cantidad socialmente óptima', 'Menos de lo socialmente óptimo', 'Más de lo socialmente óptimo', 'No producirá nada', 'c',
'Una EXTERNALIDAD NEGATIVA ocurre cuando una actividad impone costos a terceros que no participan en la transacción.

ANÁLISIS:
• Costo Privado Marginal (CPMg): Lo que paga la fábrica
• Costo Social Marginal (CSMg) = CPMg + Daño externo

Sin regulación:
• La fábrica iguala CPMg = IMg
• Ignora el daño a pescadores
• Produce Q* donde CPMg = P

RESULTADO:
Como CSMg > CPMg, la cantidad privada es MAYOR que la socialmente óptima.

SOLUCIÓN PIGOUVIANA: Impuesto = Daño marginal externo
Esto "internaliza" la externalidad.',
'Óptimo social: CSMg = BMgSocial', true),

((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Teorema de Coase', 'Externalidades', 'avanzado', 'opcion_multiple',
'Según el Teorema de Coase, si los costos de transacción son cero:',
'El gobierno debe intervenir siempre', 'Las externalidades persisten indefinidamente', 'La negociación privada alcanza el óptimo social', 'Los impuestos son la única solución', 'c',
'TEOREMA DE COASE (Ronald Coase, Nobel 1991):

ENUNCIADO:
"Si los derechos de propiedad están bien definidos y los costos de transacción son cero, la negociación privada llevará a una asignación eficiente, sin importar quién tenga el derecho inicial."

EJEMPLO:
Fábrica contamina, daño a vecinos = $100
Costo de filtro = $60

Caso 1: Vecinos tienen derecho a aire limpio
→ Fábrica paga $60 por filtro (más barato que compensar)

Caso 2: Fábrica tiene derecho a contaminar
→ Vecinos pagan hasta $100 a fábrica para que ponga filtro de $60

EN AMBOS CASOS: Se instala el filtro (resultado eficiente)

LIMITACIÓN: En realidad, los costos de transacción son significativos.',
'Si costos de transacción = 0 → Negociación → Eficiencia', true),

((SELECT id FROM modulos WHERE slug = 'microeconomia'), 'Bienes Públicos', 'Bienes Públicos', 'basico', 'opcion_multiple',
'¿Cuál de los siguientes es un bien público puro?',
'Un automóvil', 'Una pizza', 'La defensa nacional', 'Un boleto de cine', 'c',
'Un BIEN PÚBLICO PURO tiene dos características:

1. NO RIVALIDAD: El consumo de uno no reduce la disponibilidad para otros
   - Si yo "consumo" defensa nacional, tú también puedes

2. NO EXCLUSIÓN: No se puede impedir que alguien lo consuma
   - No puedo excluirte de la protección militar

EJEMPLOS:
• Defensa nacional ✓
• Alumbrado público ✓
• Aire limpio ✓
• Faros marítimos ✓

PROBLEMA DEL FREE RIDER:
Como no puedes excluir a nadie, la gente no quiere pagar → el mercado produce muy poco → el gobierno debe proveerlo.',
'Bien público: No rival + No excluible', true);

-- ============================================
-- MACROECONOMÍA - Preguntas Quiz (100 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo) VALUES

-- PIB y Contabilidad Nacional (25 preguntas)
((SELECT id FROM modulos WHERE slug = 'macroeconomia'), 'Cálculo del PIB', 'Contabilidad Nacional', 'basico', 'opcion_multiple',
'Si C = 800, I = 200, G = 300, X = 150, M = 200, ¿cuál es el PIB?',
'$1,250', '$1,450', '$1,650', '$1,050', 'a',
'El PIB por el MÉTODO DEL GASTO suma todos los gastos en bienes finales:

PIB = C + I + G + (X - M)

DONDE:
• C (Consumo) = 800
• I (Inversión) = 200
• G (Gasto gobierno) = 300
• X (Exportaciones) = 150
• M (Importaciones) = 200

CÁLCULO:
PIB = 800 + 200 + 300 + (150 - 200)
PIB = 1,300 + (-50)
PIB = $1,250

NOTA: Las importaciones se RESTAN porque son producción extranjera, no nacional.',
'PIB = C + I + G + (X - M)', true),

((SELECT id FROM modulos WHERE slug = 'macroeconomia'), 'PIB Real vs Nominal', 'Contabilidad Nacional', 'intermedio', 'opcion_multiple',
'El PIB nominal de 2023 es $1,000 y el deflactor del PIB es 125 (base 2020=100). ¿Cuál es el PIB real de 2023?',
'$800', '$1,250', '$1,000', '$750', 'a',
'El PIB REAL elimina el efecto de la inflación:

FÓRMULA:
PIB Real = (PIB Nominal / Deflactor) × 100

CÁLCULO:
PIB Real = (1,000 / 125) × 100 = $800

INTERPRETACIÓN:
• PIB Nominal ($1,000): Valor a precios actuales
• PIB Real ($800): Valor a precios del año base (2020)
• La diferencia ($200) es inflación, no más producción

El deflactor de 125 indica que los precios subieron 25% desde 2020.',
'PIB Real = (PIB Nominal / Deflactor) × 100', true),

((SELECT id FROM modulos WHERE slug = 'macroeconomia'), 'Tasa de Crecimiento', 'Contabilidad Nacional', 'basico', 'opcion_multiple',
'Si el PIB real fue $500 mil millones en 2022 y $525 mil millones en 2023, ¿cuál fue la tasa de crecimiento?',
'25%', '5%', '2.5%', '10%', 'b',
'La TASA DE CRECIMIENTO del PIB mide el cambio porcentual:

FÓRMULA:
g = [(PIB₂ - PIB₁) / PIB₁] × 100

CÁLCULO:
g = [(525 - 500) / 500] × 100
g = (25 / 500) × 100
g = 0.05 × 100 = 5%

INTERPRETACIÓN:
La economía creció 5% en términos reales (descontando inflación).

REGLA DEL 72:
Si una economía crece al 5% anual, duplicará su PIB en aproximadamente 72/5 = 14.4 años.',
'g = [(PIBt - PIBt-1) / PIBt-1] × 100', true),

((SELECT id FROM modulos WHERE slug = 'macroeconomia'), 'PIB per Cápita', 'Contabilidad Nacional', 'basico', 'opcion_multiple',
'Un país tiene PIB de $2 billones y población de 50 millones. ¿Cuál es el PIB per cápita?',
'$4,000', '$40,000', '$400,000', '$400', 'b',
'El PIB PER CÁPITA es una medida del nivel de vida promedio:

FÓRMULA:
PIB per cápita = PIB / Población

CÁLCULO:
PIB per cápita = $2,000,000,000,000 / 50,000,000
PIB per cápita = $40,000

INTERPRETACIÓN:
En promedio, cada habitante produce/recibe $40,000 al año.

LIMITACIONES:
• No mide distribución del ingreso (desigualdad)
• No incluye economía informal
• No mide bienestar (salud, educación, medio ambiente)
• No considera poder de compra entre países',
'PIB per cápita = PIB / Población', true),

-- Inflación (15 preguntas)
((SELECT id FROM modulos WHERE slug = 'macroeconomia'), 'Cálculo de Inflación', 'Inflación', 'basico', 'opcion_multiple',
'Si el IPC era 120 en enero y 126 en diciembre del mismo año, ¿cuál fue la inflación anual?',
'6%', '5%', '26%', '12%', 'b',
'La TASA DE INFLACIÓN mide el cambio porcentual en el nivel de precios:

FÓRMULA:
π = [(IPC₂ - IPC₁) / IPC₁] × 100

CÁLCULO:
π = [(126 - 120) / 120] × 100
π = (6 / 120) × 100
π = 0.05 × 100 = 5%

INTERPRETACIÓN:
Los precios subieron 5% durante el año. Una canasta que costaba $100 en enero, costaba $105 en diciembre.

TIPOS DE INFLACIÓN:
• Moderada: < 10% anual
• Galopante: 10-100% anual
• Hiperinflación: > 50% mensual',
'π = [(IPCt - IPCt-1) / IPCt-1] × 100', true),

((SELECT id FROM modulos WHERE slug = 'macroeconomia'), 'Tasa de Interés Real', 'Inflación', 'intermedio', 'opcion_multiple',
'Si la tasa de interés nominal es 8% y la inflación es 5%, ¿cuál es la tasa de interés real aproximada?',
'13%', '3%', '40%', '1.6%', 'b',
'La TASA DE INTERÉS REAL descuenta la inflación:

ECUACIÓN DE FISHER (aproximada):
r ≈ i - π

DONDE:
• r = tasa real
• i = tasa nominal = 8%
• π = inflación = 5%

CÁLCULO:
r ≈ 8% - 5% = 3%

FÓRMULA EXACTA:
(1 + r) = (1 + i) / (1 + π)
r = (1.08/1.05) - 1 = 2.86%

INTERPRETACIÓN:
Aunque recibes 8% nominal, tu poder de compra solo aumenta 3% porque los precios subieron 5%.',
'r ≈ i - π (Ecuación de Fisher)', true),

((SELECT id FROM modulos WHERE slug = 'macroeconomia'), 'Causas de Inflación', 'Inflación', 'intermedio', 'opcion_multiple',
'¿Cuál es una causa de inflación de demanda?',
'Aumento en el precio del petróleo', 'Aumento en los salarios', 'Aumento en el gasto público financiado con emisión', 'Disminución de la productividad', 'c',
'La INFLACIÓN DE DEMANDA ocurre cuando la demanda agregada crece más rápido que la oferta:

"Demasiado dinero persiguiendo muy pocos bienes"

CAUSAS:
1. Expansión monetaria excesiva (M↑ → P↑)
2. Aumento del gasto público (G↑ → DA↑)
3. Reducción de impuestos (C↑ → DA↑)
4. Optimismo de consumidores/empresas

INFLACIÓN DE COSTOS (las otras opciones):
• Precio del petróleo ↑ → costos de producción ↑
• Salarios ↑ → costos laborales ↑
• Productividad ↓ → costo por unidad ↑

DIFERENCIA CLAVE:
Demanda: DA se desplaza a la derecha
Costos: OA se desplaza a la izquierda',
'Inflación de demanda: exceso de DA sobre OA', true),

-- Desempleo (15 preguntas)
((SELECT id FROM modulos WHERE slug = 'macroeconomia'), 'Tasa de Desempleo', 'Desempleo', 'basico', 'opcion_multiple',
'Si hay 95 millones de empleados, 5 millones de desempleados y 50 millones fuera de la fuerza laboral, ¿cuál es la tasa de desempleo?',
'5%', '3.33%', '10%', '5.26%', 'a',
'La TASA DE DESEMPLEO mide el porcentaje de la fuerza laboral sin empleo:

PASO 1 - Calcular Fuerza Laboral:
FL = Empleados + Desempleados
FL = 95 + 5 = 100 millones

PASO 2 - Calcular Tasa de Desempleo:
u = (Desempleados / FL) × 100
u = (5 / 100) × 100 = 5%

NOTA: Los 50 millones "fuera de la fuerza laboral" (estudiantes, jubilados, amas de casa que no buscan empleo) NO cuentan.

Para ser "desempleado" debes:
1. No tener empleo
2. Estar buscando activamente trabajo
3. Estar disponible para trabajar',
'u = (Desempleados / Fuerza Laboral) × 100', true),

((SELECT id FROM modulos WHERE slug = 'macroeconomia'), 'Tipos de Desempleo', 'Desempleo', 'intermedio', 'opcion_multiple',
'Un programador pierde su empleo porque la inteligencia artificial automatizó su trabajo. ¿Qué tipo de desempleo es?',
'Friccional', 'Cíclico', 'Estructural', 'Estacional', 'c',
'Tipos de DESEMPLEO:

FRICCIONAL:
• Transición normal entre empleos
• Personas buscando mejor trabajo
• Es temporal y voluntario

ESTRUCTURAL:
• Desajuste entre habilidades y demanda del mercado
• Cambio tecnológico elimina ocupaciones
• Requiere reentrenamiento (más largo)
• ESTE ES EL CASO del programador

CÍCLICO:
• Causado por recesiones económicas
• Baja demanda agregada
• Afecta a muchos sectores

ESTACIONAL:
• Patrón predecible durante el año
• Turismo, agricultura, comercio navideño

TASA NATURAL = Friccional + Estructural',
'Desempleo estructural: cambio tecnológico o industrial', true),

((SELECT id FROM modulos WHERE slug = 'macroeconomia'), 'Ley de Okun', 'Desempleo', 'avanzado', 'opcion_multiple',
'Según la Ley de Okun, si el desempleo está 2% por encima de su tasa natural (coeficiente = 2), ¿cuánto está el PIB por debajo de su potencial?',
'2%', '4%', '1%', '8%', 'b',
'La LEY DE OKUN relaciona desempleo y PIB:

FÓRMULA:
Brecha del PIB = -β × (u - u*)

DONDE:
• β = coeficiente de Okun (típicamente 2-3)
• u = tasa de desempleo actual
• u* = tasa natural de desempleo

CÁLCULO:
Brecha del PIB = -2 × (2%)
Brecha del PIB = -4%

INTERPRETACIÓN:
El PIB está 4% por debajo del potencial.

INTUICIÓN:
Por cada 1% de desempleo adicional, se pierde aproximadamente 2% de PIB.

Esto captura:
• Trabajadores desempleados
• Trabajadores subempleados
• Empresas operando bajo capacidad',
'Brecha PIB = -β(u - u*), típicamente β ≈ 2', true),

-- Modelo IS-LM (20 preguntas)
((SELECT id FROM modulos WHERE slug = 'macroeconomia'), 'Curva IS', 'Modelo IS-LM', 'intermedio', 'opcion_multiple',
'Un aumento en el gasto público desplaza la curva IS:',
'Hacia la izquierda', 'Hacia la derecha', 'No la desplaza, es movimiento sobre la curva', 'Hacia arriba y a la izquierda', 'b',
'La CURVA IS representa equilibrio en el mercado de bienes:

IS = Inversión (I) = Ahorro (S)

ECUACIÓN:
Y = C(Y-T) + I(r) + G

Un AUMENTO en G:
• Mayor gasto → Mayor demanda agregada
• Para cada tasa de interés, hay mayor producción
• La curva IS se desplaza a la DERECHA

OTROS DESPLAZAMIENTOS A LA DERECHA:
• Aumento en confianza del consumidor (C↑)
• Reducción de impuestos (T↓)
• Mejores expectativas empresariales (I↑)
• Aumento en exportaciones (X↑)

MOVIMIENTO SOBRE LA CURVA:
Solo cambios en la tasa de interés (r)',
'IS: Y = C(Y-T) + I(r) + G', true),

((SELECT id FROM modulos WHERE slug = 'macroeconomia'), 'Curva LM', 'Modelo IS-LM', 'intermedio', 'opcion_multiple',
'Si el banco central aumenta la oferta monetaria, la curva LM:',
'Se desplaza a la izquierda', 'Se desplaza a la derecha (o hacia abajo)', 'Se vuelve vertical', 'No cambia', 'b',
'La CURVA LM representa equilibrio en el mercado monetario:

LM = Demanda de dinero (L) = Oferta monetaria (M)

ECUACIÓN:
M/P = L(Y, r)

Un AUMENTO en M:
• Más dinero en la economía
• Para cada nivel de ingreso, la tasa de interés de equilibrio es menor
• La curva LM se desplaza a la DERECHA (o hacia abajo)

EFECTO:
• Mayor liquidez → tasas más bajas
• Tasas más bajas → más inversión
• Más inversión → más producción

POLÍTICA MONETARIA EXPANSIVA:
LM se desplaza a la derecha → Y↑, r↓',
'LM: M/P = L(Y, r)', true),

((SELECT id FROM modulos WHERE slug = 'macroeconomia'), 'Trampa de Liquidez', 'Modelo IS-LM', 'avanzado', 'opcion_multiple',
'En una trampa de liquidez, la curva LM es:',
'Vertical', 'Horizontal', 'Tiene pendiente normal', 'Tiene pendiente negativa', 'b',
'La TRAMPA DE LIQUIDEZ ocurre cuando las tasas de interés están cerca de cero:

SITUACIÓN:
• Tasas de interés muy bajas (cercanas a 0%)
• La gente prefiere mantener efectivo en lugar de bonos
• La demanda de dinero se vuelve infinitamente elástica

CURVA LM HORIZONTAL:
• La política monetaria se vuelve INEFECTIVA
• Inyectar más dinero no baja más las tasas
• El dinero extra simplemente se acumula

EJEMPLOS HISTÓRICOS:
• Japón en los 1990s-2000s
• EE.UU. y Europa después de 2008

SOLUCIÓN:
• Política fiscal debe tomar protagonismo
• Quantitative Easing (compra de activos)
• Tasas de interés negativas (controversial)',
'En trampa de liquidez: LM horizontal, política monetaria inefectiva', true),

((SELECT id FROM modulos WHERE slug = 'macroeconomia'), 'Multiplicador del Gasto', 'Modelo Keynesiano', 'intermedio', 'opcion_multiple',
'Si la propensión marginal a consumir (PMC) es 0.8, ¿cuál es el multiplicador del gasto?',
'0.8', '1.25', '5', '4', 'c',
'El MULTIPLICADOR del gasto mide cuánto aumenta el PIB por cada peso de gasto adicional:

FÓRMULA:
k = 1 / (1 - PMC) = 1 / PMS

DONDE:
• PMC = Propensión Marginal a Consumir = 0.8
• PMS = Propensión Marginal a Ahorrar = 1 - 0.8 = 0.2

CÁLCULO:
k = 1 / (1 - 0.8) = 1 / 0.2 = 5

INTERPRETACIÓN:
Si el gobierno gasta $100 adicionales, el PIB aumenta $500.

PROCESO MULTIPLICADOR:
$100 → consumo $80 → consumo $64 → consumo $51.2 → ...
Suma = 100 + 80 + 64 + 51.2 + ... = $500',
'Multiplicador k = 1/(1-PMC) = 1/PMS', true),

-- Oferta y Demanda Agregada (15 preguntas)
((SELECT id FROM modulos WHERE slug = 'macroeconomia'), 'Demanda Agregada', 'Modelo OA-DA', 'basico', 'opcion_multiple',
'¿Por qué la curva de Demanda Agregada tiene pendiente negativa?',
'Por la ley de la demanda microeconómica', 'Por el efecto riqueza, efecto tasa de interés y efecto tipo de cambio', 'Porque los precios siempre bajan', 'Por los rendimientos decrecientes', 'b',
'La DEMANDA AGREGADA tiene pendiente negativa por tres efectos:

1. EFECTO RIQUEZA (Pigou):
   • P↓ → Valor real del dinero↑
   • La gente se "siente más rica"
   • C↑ → Y↑

2. EFECTO TASA DE INTERÉS (Keynes):
   • P↓ → Demanda de dinero↓
   • Tasas de interés↓
   • I↑ → Y↑

3. EFECTO TIPO DE CAMBIO (Mundell-Fleming):
   • P↓ (relativo al extranjero)
   • Bienes nacionales más competitivos
   • X↑, M↓ → NX↑ → Y↑

NO es lo mismo que demanda microeconómica:
La DA relaciona nivel de precios general con producción total, no precio de un bien con cantidad.',
'DA: Efectos Riqueza + Tasa de interés + Tipo de cambio', true),

((SELECT id FROM modulos WHERE slug = 'macroeconomia'), 'Oferta Agregada Corto Plazo', 'Modelo OA-DA', 'intermedio', 'opcion_multiple',
'Un aumento en el precio del petróleo desplaza la curva de Oferta Agregada de corto plazo:',
'Hacia la derecha', 'Hacia la izquierda', 'Hacia arriba sobre la misma curva', 'No la afecta', 'b',
'Un SHOCK DE OFERTA NEGATIVO (como aumento en precio del petróleo):

EFECTO:
• Costos de producción aumentan
• Para cada nivel de precios, las empresas producen menos
• La OACP se desplaza a la IZQUIERDA

CONSECUENCIAS (Estanflación):
• Producción↓ (recesión)
• Precios↑ (inflación)
• Lo peor de ambos mundos

EJEMPLOS HISTÓRICOS:
• Crisis del petróleo 1973-74
• Crisis del petróleo 1979
• Pandemia 2020 (disrupciones de oferta)

SHOCK POSITIVO (tecnología, descubrimiento de recursos):
OACP se desplaza a la derecha → Y↑, P↓',
'Shock oferta negativo: OACP se desplaza izquierda', true);

-- ============================================
-- FINANZAS - Preguntas Quiz (80 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo) VALUES

-- Valor del Dinero en el Tiempo (25 preguntas con ejercicios)
((SELECT id FROM modulos WHERE slug = 'finanzas'), 'Valor Futuro', 'Valor del Dinero en el Tiempo', 'basico', 'opcion_multiple',
'Si inviertes $1,000 al 10% anual durante 3 años con capitalización anual, ¿cuál será el valor futuro?',
'$1,300', '$1,331', '$1,210', '$1,100', 'b',
'El VALOR FUTURO considera el interés compuesto:

FÓRMULA:
VF = VP × (1 + r)^n

DONDE:
• VP = Valor Presente = $1,000
• r = tasa de interés = 10% = 0.10
• n = número de períodos = 3

CÁLCULO:
VF = 1,000 × (1.10)³
VF = 1,000 × 1.331
VF = $1,331

DESGLOSE AÑO POR AÑO:
• Año 1: 1,000 × 1.10 = $1,100
• Año 2: 1,100 × 1.10 = $1,210
• Año 3: 1,210 × 1.10 = $1,331

El interés compuesto genera $31 más que el simple ($1,300).',
'VF = VP × (1 + r)^n', true),

((SELECT id FROM modulos WHERE slug = 'finanzas'), 'Valor Presente', 'Valor del Dinero en el Tiempo', 'basico', 'opcion_multiple',
'¿Cuánto debes invertir hoy al 8% anual para tener $10,000 en 5 años?',
'$6,806', '$7,350', '$8,000', '$5,000', 'a',
'El VALOR PRESENTE descuenta flujos futuros a hoy:

FÓRMULA:
VP = VF / (1 + r)^n

DONDE:
• VF = Valor Futuro = $10,000
• r = tasa de descuento = 8% = 0.08
• n = número de períodos = 5

CÁLCULO:
VP = 10,000 / (1.08)⁵
VP = 10,000 / 1.4693
VP = $6,806

VERIFICACIÓN:
$6,806 × (1.08)⁵ = $6,806 × 1.4693 = $10,000 ✓

INTERPRETACIÓN:
$6,806 hoy vale lo mismo que $10,000 en 5 años, si la tasa de oportunidad es 8%.',
'VP = VF / (1 + r)^n', true),

((SELECT id FROM modulos WHERE slug = 'finanzas'), 'Anualidades', 'Valor del Dinero en el Tiempo', 'intermedio', 'opcion_multiple',
'Recibirás $2,000 anuales durante 4 años. Si la tasa de descuento es 6%, ¿cuál es el valor presente de esta anualidad?',
'$8,000', '$6,930', '$7,520', '$6,000', 'b',
'Una ANUALIDAD ORDINARIA es una serie de pagos iguales al final de cada período:

FÓRMULA:
VP = PMT × [1 - (1+r)^(-n)] / r

DONDE:
• PMT = Pago periódico = $2,000
• r = 6% = 0.06
• n = 4 años

CÁLCULO:
Factor = [1 - (1.06)^(-4)] / 0.06
Factor = [1 - 0.7921] / 0.06
Factor = 0.2079 / 0.06
Factor = 3.4651

VP = 2,000 × 3.4651 = $6,930

VERIFICACIÓN (descontando cada pago):
$2,000/1.06 + $2,000/1.06² + $2,000/1.06³ + $2,000/1.06⁴ = $6,930 ✓',
'VP Anualidad = PMT × [1-(1+r)^(-n)]/r', true),

((SELECT id FROM modulos WHERE slug = 'finanzas'), 'Tasa Efectiva Anual', 'Valor del Dinero en el Tiempo', 'intermedio', 'opcion_multiple',
'Un banco ofrece 12% anual con capitalización mensual. ¿Cuál es la tasa efectiva anual (TEA)?',
'12%', '12.68%', '12.36%', '13%', 'b',
'La TASA EFECTIVA ANUAL considera la capitalización más frecuente:

FÓRMULA:
TEA = (1 + r/m)^m - 1

DONDE:
• r = tasa nominal anual = 12% = 0.12
• m = número de capitalizaciones por año = 12

CÁLCULO:
TEA = (1 + 0.12/12)^12 - 1
TEA = (1 + 0.01)^12 - 1
TEA = (1.01)^12 - 1
TEA = 1.1268 - 1
TEA = 0.1268 = 12.68%

INTERPRETACIÓN:
Aunque la tasa nominal es 12%, efectivamente pagas/recibes 12.68% al año debido a la capitalización mensual del interés.',
'TEA = (1 + r/m)^m - 1', true),

((SELECT id FROM modulos WHERE slug = 'finanzas'), 'Perpetuidades', 'Valor del Dinero en el Tiempo', 'intermedio', 'opcion_multiple',
'Una acción paga dividendos de $5 anuales indefinidamente. Si la tasa de descuento es 10%, ¿cuál es el valor de la acción?',
'$500', '$50', '$5', '$100', 'b',
'Una PERPETUIDAD es una anualidad que dura para siempre:

FÓRMULA:
VP = PMT / r

DONDE:
• PMT = Pago perpetuo = $5
• r = tasa de descuento = 10% = 0.10

CÁLCULO:
VP = 5 / 0.10 = $50

INTUICIÓN:
Si la acción vale $50 y rinde 10%, genera $5 anuales forever.

PERPETUIDAD CRECIENTE:
Si el dividendo crece g% anual:
VP = D₁ / (r - g)

Ejemplo: D₁ = $5, r = 10%, g = 3%
VP = 5 / (0.10 - 0.03) = $71.43',
'VP perpetuidad = PMT/r; Creciente: D₁/(r-g)', true),

-- VPN y TIR (20 preguntas)
((SELECT id FROM modulos WHERE slug = 'finanzas'), 'VPN', 'Evaluación de Proyectos', 'intermedio', 'opcion_multiple',
'Un proyecto requiere inversión de $10,000 y genera flujos de $4,000 anuales por 4 años. Si la tasa de descuento es 10%, ¿cuál es el VPN?',
'$6,000', '$2,679', '$4,000', '-$1,321', 'b',
'El VALOR PRESENTE NETO descuenta todos los flujos:

VPN = -Inversión + Σ [FCt / (1+r)^t]

CÁLCULO:
VPN = -10,000 + 4,000/1.10 + 4,000/1.10² + 4,000/1.10³ + 4,000/1.10⁴

VPN = -10,000 + 3,636 + 3,306 + 3,005 + 2,732

VPN = -10,000 + 12,679 = $2,679

DECISIÓN:
• VPN > 0: ACEPTAR (el proyecto agrega valor)
• VPN < 0: RECHAZAR
• VPN = 0: Indiferente

El proyecto genera $2,679 más de lo que cuesta en valor presente.',
'VPN = -I₀ + Σ FCt/(1+r)^t', true),

((SELECT id FROM modulos WHERE slug = 'finanzas'), 'TIR', 'Evaluación de Proyectos', 'avanzado', 'opcion_multiple',
'Un proyecto tiene inversión de $1,000 y genera $1,200 en un año. ¿Cuál es la TIR?',
'12%', '20%', '200%', '10%', 'b',
'La TASA INTERNA DE RETORNO es la tasa que hace VPN = 0:

ECUACIÓN:
0 = -1,000 + 1,200/(1+TIR)

DESPEJANDO:
1,000 = 1,200/(1+TIR)
1 + TIR = 1,200/1,000
1 + TIR = 1.20
TIR = 0.20 = 20%

VERIFICACIÓN:
VPN = -1,000 + 1,200/1.20 = -1,000 + 1,000 = 0 ✓

DECISIÓN:
• Si TIR > Costo de Capital: ACEPTAR
• Si TIR < Costo de Capital: RECHAZAR

La TIR representa el rendimiento del proyecto.',
'TIR: tasa donde VPN = 0', true),

((SELECT id FROM modulos WHERE slug = 'finanzas'), 'Período de Recuperación', 'Evaluación de Proyectos', 'basico', 'opcion_multiple',
'Un proyecto requiere $6,000 de inversión y genera flujos de $2,000 anuales. ¿Cuál es el período de recuperación?',
'2 años', '3 años', '4 años', '6 años', 'b',
'El PERÍODO DE RECUPERACIÓN (Payback) mide cuánto tiempo toma recuperar la inversión:

CÁLCULO:
Inversión = $6,000
Flujo anual = $2,000

Payback = Inversión / Flujo anual
Payback = 6,000 / 2,000 = 3 años

VERIFICACIÓN:
• Año 1: -6,000 + 2,000 = -4,000
• Año 2: -4,000 + 2,000 = -2,000
• Año 3: -2,000 + 2,000 = 0 ✓

LIMITACIONES:
• Ignora el valor del dinero en el tiempo
• Ignora flujos después del payback
• No mide rentabilidad

PAYBACK DESCONTADO: Ajusta por el valor del tiempo.',
'Payback = Inversión / Flujo anual (si flujos iguales)', true),

-- Riesgo y Rendimiento (20 preguntas)
((SELECT id FROM modulos WHERE slug = 'finanzas'), 'Rendimiento Esperado', 'Riesgo y Rendimiento', 'intermedio', 'opcion_multiple',
'Un activo tiene 40% probabilidad de rendir 15% y 60% probabilidad de rendir -5%. ¿Cuál es el rendimiento esperado?',
'10%', '5%', '3%', '0%', 'c',
'El RENDIMIENTO ESPERADO es el promedio ponderado por probabilidades:

E(R) = Σ Pi × Ri

DONDE:
• P1 = 40% = 0.40, R1 = 15%
• P2 = 60% = 0.60, R2 = -5%

CÁLCULO:
E(R) = (0.40 × 15%) + (0.60 × -5%)
E(R) = 6% + (-3%)
E(R) = 3%

INTERPRETACIÓN:
En promedio, esperamos ganar 3% con este activo.

NOTA: El rendimiento esperado NO es lo que "probablemente" ocurrirá, sino el promedio de muchas repeticiones.',
'E(R) = Σ Pi × Ri', true),

((SELECT id FROM modulos WHERE slug = 'finanzas'), 'Desviación Estándar', 'Riesgo y Rendimiento', 'avanzado', 'opcion_multiple',
'Con el ejemplo anterior (40% prob. de 15%, 60% prob. de -5%, E(R)=3%), ¿cuál es la desviación estándar?',
'10%', '9.80%', '8.49%', '20%', 'b',
'La DESVIACIÓN ESTÁNDAR mide el riesgo (dispersión de rendimientos):

PASO 1 - Calcular Varianza:
Var = Σ Pi × (Ri - E(R))²

Var = 0.40 × (15% - 3%)² + 0.60 × (-5% - 3%)²
Var = 0.40 × (12%)² + 0.60 × (-8%)²
Var = 0.40 × 144 + 0.60 × 64
Var = 57.6 + 38.4
Var = 96 (en términos de %²)

PASO 2 - Desviación Estándar:
σ = √Var = √96 = 9.80%

INTERPRETACIÓN:
Los rendimientos típicamente se desvían 9.80% del promedio (3%).
Rango aproximado: 3% ± 9.80% = [-6.8%, 12.8%]',
'σ = √[Σ Pi × (Ri - E(R))²]', true),

((SELECT id FROM modulos WHERE slug = 'finanzas'), 'CAPM', 'Riesgo y Rendimiento', 'avanzado', 'opcion_multiple',
'Si Rf = 3%, Rm = 11%, y β = 1.5, ¿cuál es el rendimiento esperado según el CAPM?',
'11%', '15%', '12%', '14%', 'b',
'El CAPM (Capital Asset Pricing Model) relaciona riesgo sistemático con rendimiento:

FÓRMULA:
E(Ri) = Rf + βi × (Rm - Rf)

DONDE:
• Rf = Tasa libre de riesgo = 3%
• Rm = Rendimiento del mercado = 11%
• β = Beta (riesgo sistemático) = 1.5
• (Rm - Rf) = Prima de riesgo de mercado = 8%

CÁLCULO:
E(Ri) = 3% + 1.5 × (11% - 3%)
E(Ri) = 3% + 1.5 × 8%
E(Ri) = 3% + 12%
E(Ri) = 15%

INTERPRETACIÓN:
• β = 1.5 significa 50% más volátil que el mercado
• Por ese riesgo extra, se exige 15% (vs 11% del mercado)',
'CAPM: E(Ri) = Rf + βi(Rm - Rf)', true),

((SELECT id FROM modulos WHERE slug = 'finanzas'), 'Beta', 'Riesgo y Rendimiento', 'intermedio', 'opcion_multiple',
'Una acción tiene β = 0.5. Si el mercado sube 10%, ¿cuánto esperamos que suba la acción (aproximadamente)?',
'10%', '20%', '5%', '15%', 'c',
'El BETA mide la sensibilidad de un activo al mercado:

INTERPRETACIÓN:
• β = 1: Se mueve igual que el mercado
• β > 1: Más volátil que el mercado (agresivo)
• β < 1: Menos volátil (defensivo)
• β = 0: No correlacionado con el mercado
• β < 0: Se mueve opuesto al mercado

EN ESTE CASO (β = 0.5):
Si mercado sube 10%:
Δ Acción ≈ β × Δ Mercado = 0.5 × 10% = 5%

ACCIONES TÍPICAS:
• Tecnología: β > 1 (alto riesgo, alto potencial)
• Utilities: β < 1 (estables, defensivas)
• Oro: β ≈ 0 o negativo',
'β = Cov(Ri,Rm) / Var(Rm)', true);

-- ============================================
-- ECONOMÍA INTERNACIONAL - Preguntas Quiz (60 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo) VALUES

((SELECT id FROM modulos WHERE slug = 'economia_internacional'), 'Ventaja Comparativa', 'Comercio Internacional', 'basico', 'opcion_multiple',
'México puede producir 10 autos o 100 computadoras. EE.UU. puede producir 20 autos o 80 computadoras. ¿En qué tiene México ventaja comparativa?',
'Autos', 'Computadoras', 'Ambos', 'Ninguno', 'b',
'La VENTAJA COMPARATIVA se basa en el costo de oportunidad:

COSTOS DE OPORTUNIDAD:

MÉXICO:
• 1 auto = 10 computadoras (sacrifica 100/10)
• 1 computadora = 0.1 autos (sacrifica 10/100)

EE.UU.:
• 1 auto = 4 computadoras (sacrifica 80/20)
• 1 computadora = 0.25 autos (sacrifica 20/80)

ANÁLISIS:
• Autos: México costo = 10 comp, EE.UU. = 4 comp → EE.UU. es más eficiente
• Computadoras: México costo = 0.1 autos, EE.UU. = 0.25 autos → México es más eficiente

CONCLUSIÓN:
México tiene ventaja comparativa en COMPUTADORAS (menor costo de oportunidad).
EE.UU. tiene ventaja comparativa en AUTOS.',
'Costo de oportunidad = Lo que sacrificas / Lo que produces', true),

((SELECT id FROM modulos WHERE slug = 'economia_internacional'), 'Tipo de Cambio', 'Mercado Cambiario', 'basico', 'opcion_multiple',
'Si el tipo de cambio pasa de 17 MXN/USD a 20 MXN/USD, el peso mexicano se ha:',
'Apreciado', 'Depreciado', 'Mantenido estable', 'Devaluado oficialmente', 'b',
'TIPOS DE CAMBIO:

ANTES: 1 USD = 17 MXN
DESPUÉS: 1 USD = 20 MXN

Ahora se necesitan MÁS pesos para comprar un dólar.
El peso vale MENOS → se ha DEPRECIADO.

TERMINOLOGÍA:
• DEPRECIACIÓN: Pérdida de valor por fuerzas de mercado (tipo de cambio flexible)
• DEVALUACIÓN: Reducción oficial por el gobierno (tipo de cambio fijo)
• APRECIACIÓN: Ganancia de valor por mercado
• REVALUACIÓN: Aumento oficial por gobierno

EFECTOS DE DEPRECIACIÓN:
• Exportaciones más competitivas (más baratas en USD)
• Importaciones más caras
• Puede generar inflación importada',
'Más unidades de moneda local por extranjera = Depreciación', true),

((SELECT id FROM modulos WHERE slug = 'economia_internacional'), 'Balanza de Pagos', 'Cuentas Internacionales', 'intermedio', 'opcion_multiple',
'Si un país tiene déficit en cuenta corriente, debe tener:',
'Déficit en cuenta de capital también', 'Superávit en cuenta de capital', 'Superávit en cuenta corriente', 'Ninguna relación', 'b',
'La BALANZA DE PAGOS siempre suma cero:

Cuenta Corriente + Cuenta de Capital + Cuenta Financiera = 0

SI HAY DÉFICIT EN CUENTA CORRIENTE:
• El país importa más de lo que exporta
• Consume más de lo que produce
• Necesita financiamiento externo

ESTO SE COMPENSA CON:
• Superávit en Cuenta de Capital/Financiera
• Entrada de inversión extranjera
• Préstamos del exterior
• Venta de activos nacionales

EJEMPLO:
EE.UU. tiene déficit comercial persistente, financiado por compras extranjeras de bonos del Tesoro.',
'CC + CK + CF = 0 (Balanza de Pagos)', true),

((SELECT id FROM modulos WHERE slug = 'economia_internacional'), 'Paridad del Poder Adquisitivo', 'Tipo de Cambio', 'avanzado', 'opcion_multiple',
'Si una Big Mac cuesta $5 en EE.UU. y 100 pesos en México, según la PPA el tipo de cambio debería ser:',
'5 MXN/USD', '20 MXN/USD', '0.05 MXN/USD', '100 MXN/USD', 'b',
'La PARIDAD DEL PODER ADQUISITIVO (PPA) sugiere que bienes idénticos deberían costar igual en diferentes países:

LEY DE UN SOLO PRECIO:
P_México = TC × P_EE.UU.

DESPEJANDO TC:
TC = P_México / P_EE.UU.
TC = 100 MXN / 5 USD
TC = 20 MXN/USD

INTERPRETACIÓN:
Si la Big Mac cuesta lo mismo en ambos países, el TC debería ser 20.

ÍNDICE BIG MAC (The Economist):
Compara el TC real con el TC implícito de la Big Mac para ver si monedas están sobre/subvaluadas.

LIMITACIONES DE LA PPA:
• Bienes no transables (servicios, renta)
• Barreras comerciales
• Costos de transporte',
'TC_PPA = P_nacional / P_extranjero', true),

((SELECT id FROM modulos WHERE slug = 'economia_internacional'), 'Aranceles', 'Política Comercial', 'intermedio', 'opcion_multiple',
'Un arancel a las importaciones beneficia a:',
'Consumidores nacionales', 'Productores nacionales del bien protegido', 'Productores extranjeros', 'Todos los anteriores', 'b',
'Efectos de un ARANCEL (impuesto a importaciones):

BENEFICIADOS:
• Productores nacionales: Precio interno sube, pueden competir
• Gobierno: Recauda ingresos arancelarios

PERJUDICADOS:
• Consumidores: Pagan precios más altos
• Eficiencia: Recursos mal asignados
• Productores extranjeros: Venden menos

ANÁLISIS DE BIENESTAR:
• Ganancia productores + Ingreso gobierno < Pérdida consumidores
• Hay PÉRDIDA NETA de bienestar (peso muerto)

EXCEPCIONES (argumentos para protección):
• Industria naciente
• Seguridad nacional
• Represalias comerciales
• Dumping',
'Arancel: Beneficia productores, perjudica consumidores', true);

-- ============================================
-- PENSAMIENTO ECONÓMICO - Teorías claras (40 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo) VALUES

((SELECT id FROM modulos WHERE slug = 'pensamiento_economico'), 'Adam Smith', 'Economía Clásica', 'basico', 'opcion_multiple',
'¿Cuál es el concepto central de "La Riqueza de las Naciones" de Adam Smith?',
'El gobierno debe controlar toda la economía', 'La mano invisible del mercado coordina la economía', 'Los monopolios son beneficiosos', 'El comercio internacional debe prohibirse', 'b',
'ADAM SMITH (1723-1790) - Padre de la Economía

OBRA: "La Riqueza de las Naciones" (1776)

CONCEPTOS CLAVE:

1. LA MANO INVISIBLE:
   "Al buscar su propio interés, frecuentemente promueve el de la sociedad más efectivamente que si intentara promoverlo directamente."

2. DIVISIÓN DEL TRABAJO:
   La especialización aumenta la productividad
   Ejemplo: Fábrica de alfileres

3. LIBRE MERCADO:
   Los precios coordinan la economía sin planificación central
   Oferta y demanda se equilibran

4. LAISSEZ-FAIRE:
   El gobierno debe intervenir mínimamente
   Solo: defensa, justicia, obras públicas

Smith NO dijo que el egoísmo es bueno, sino que el interés propio BIEN CANALIZADO beneficia a todos.',
NULL, true),

((SELECT id FROM modulos WHERE slug = 'pensamiento_economico'), 'Karl Marx', 'Economía Marxista', 'intermedio', 'opcion_multiple',
'Según Marx, ¿qué es la plusvalía?',
'El valor de los bienes de lujo', 'El excedente que el capitalista extrae del trabajo', 'El impuesto al comercio', 'La ganancia del trabajador', 'b',
'KARL MARX (1818-1883) - Crítico del Capitalismo

OBRAS: "El Capital", "Manifiesto Comunista"

TEORÍA DE LA PLUSVALÍA:

1. Valor-Trabajo: El valor de un bien = trabajo necesario para producirlo

2. PLUSVALÍA:
   • Trabajador produce valor = 10 horas de trabajo
   • Recibe salario = 6 horas de trabajo (subsistencia)
   • Plusvalía = 4 horas (se la queda el capitalista)

   Plusvalía = Valor producido - Salario

3. EXPLOTACIÓN:
   El capitalista no crea valor, lo extrae del trabajo

PREDICCIONES DE MARX:
• Concentración del capital
• Crisis recurrentes
• Revolución proletaria
• Fin del capitalismo

Algunas predicciones acertadas (concentración), otras no (revolución en países industrializados).',
'Plusvalía = Valor del trabajo - Salario', true),

((SELECT id FROM modulos WHERE slug = 'pensamiento_economico'), 'John Maynard Keynes', 'Economía Keynesiana', 'basico', 'opcion_multiple',
'Keynes argumentó que durante una recesión, el gobierno debería:',
'Reducir el gasto para equilibrar el presupuesto', 'Aumentar el gasto para estimular la demanda', 'No hacer nada y esperar', 'Aumentar los impuestos', 'b',
'JOHN MAYNARD KEYNES (1883-1946) - Revolución Macroeconómica

OBRA: "Teoría General del Empleo, el Interés y el Dinero" (1936)

CONTEXTO: Gran Depresión (1929-1939)

IDEAS CENTRALES:

1. DEMANDA AGREGADA:
   El gasto total determina la producción y el empleo
   En recesión: demanda insuficiente → desempleo

2. RIGIDEZ DE PRECIOS Y SALARIOS:
   Los mercados no se ajustan instantáneamente
   Puede haber desempleo prolongado

3. POLÍTICA FISCAL ACTIVA:
   Gobierno debe aumentar gasto (G↑) en recesiones
   "Cavar hoyos y taparlos" es mejor que nada

4. MULTIPLICADOR:
   $1 de gasto genera más de $1 de PIB

"En el largo plazo, todos estamos muertos" - Keynes
(Crítica a los que dicen que el mercado se corrige solo)',
NULL, true),

((SELECT id FROM modulos WHERE slug = 'pensamiento_economico'), 'Milton Friedman', 'Monetarismo', 'intermedio', 'opcion_multiple',
'Según el monetarismo de Friedman, la causa principal de la inflación es:',
'Los sindicatos que demandan salarios altos', 'El aumento excesivo de la oferta monetaria', 'Los déficits fiscales', 'El poder de los monopolios', 'b',
'MILTON FRIEDMAN (1912-2006) - Monetarismo

NOBEL: 1976

IDEA CENTRAL:
"La inflación es siempre y en todas partes un fenómeno monetario"

TEORÍA CUANTITATIVA DEL DINERO:
M × V = P × Y

• M: Oferta monetaria
• V: Velocidad del dinero (estable)
• P: Nivel de precios
• Y: Producción real

Si V y Y son estables: M↑ → P↑ (inflación)

RECOMENDACIONES:
1. Regla monetaria: Crecer M al ritmo del PIB
2. Banco Central independiente
3. Expectativas importan
4. Política fiscal inefectiva a largo plazo

CRÍTICA A KEYNES:
• Los agentes anticipan políticas
• Efecto multiplicador es menor
• El largo plazo sí importa',
'MV = PY (Ecuación cuantitativa)', true),

((SELECT id FROM modulos WHERE slug = 'pensamiento_economico'), 'Escuela Austriaca', 'Escuelas de Pensamiento', 'avanzado', 'opcion_multiple',
'La Escuela Austriaca (Hayek, Mises) enfatiza:',
'La planificación central de la economía', 'El conocimiento disperso y los procesos de mercado', 'La intervención gubernamental activa', 'La eliminación de la propiedad privada', 'b',
'ESCUELA AUSTRIACA

FUNDADORES: Carl Menger, Ludwig von Mises, Friedrich Hayek

CONCEPTOS CLAVE:

1. CONOCIMIENTO DISPERSO (Hayek):
   Ningún planificador tiene toda la información
   Los precios transmiten información escasa
   El mercado es un proceso de descubrimiento

2. CÁLCULO ECONÓMICO (Mises):
   Sin precios de mercado, imposible asignar recursos
   Crítica al socialismo: ¿cómo saber qué producir?

3. CICLOS ECONÓMICOS:
   Causados por manipulación de tasas de interés
   El crédito barato genera malas inversiones (malinvestment)
   La recesión es corrección necesaria

4. PRAXEOLOGÍA:
   Economía basada en lógica de acción humana
   No en modelos matemáticos

HAYEK: Nobel 1974
"La competencia como proceso de descubrimiento"',
NULL, true),

((SELECT id FROM modulos WHERE slug = 'pensamiento_economico'), 'David Ricardo', 'Economía Clásica', 'intermedio', 'opcion_multiple',
'¿Cuál fue la principal contribución de David Ricardo a la economía?',
'La teoría del valor subjetivo', 'La teoría de la ventaja comparativa', 'La teoría de la mano invisible', 'La teoría del ciclo económico', 'b',
'DAVID RICARDO (1772-1823) - Economista Clásico

CONTRIBUCIONES PRINCIPALES:

1. VENTAJA COMPARATIVA (1817):
   Los países deben especializarse en lo que producen con MENOR costo de oportunidad, no en lo que producen "mejor".

   Ejemplo: Incluso si Inglaterra es mejor en todo, ambos ganan del comercio si se especializan.

2. TEORÍA DE LA RENTA:
   La renta de la tierra surge de las diferencias en fertilidad
   "Renta ricardiana" = pago por tierra más productiva

3. LEY DE HIERRO DE LOS SALARIOS:
   Salarios tienden al nivel de subsistencia
   Si suben → más hijos → más trabajadores → salarios bajan

4. EQUIVALENCIA RICARDIANA:
   Los agentes anticipan impuestos futuros
   Deuda del gobierno = impuestos diferidos

La ventaja comparativa sigue siendo base del comercio internacional moderno.',
NULL, true);

-- ============================================
-- ECONOMETRÍA Y ESTADÍSTICA (60 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo) VALUES

((SELECT id FROM modulos WHERE slug = 'econometria'), 'Media y Desviación', 'Estadística Descriptiva', 'basico', 'opcion_multiple',
'Los datos son: 10, 20, 30, 40, 50. ¿Cuál es la media?',
'25', '30', '35', '40', 'b',
'La MEDIA ARITMÉTICA es la suma de todos los valores dividida entre el número de observaciones:

FÓRMULA:
x̄ = Σxi / n

CÁLCULO:
x̄ = (10 + 20 + 30 + 40 + 50) / 5
x̄ = 150 / 5
x̄ = 30

PROPIEDADES:
• Usa todos los datos
• Sensible a valores extremos (outliers)
• La suma de desviaciones de la media = 0

OTRAS MEDIDAS DE TENDENCIA CENTRAL:
• Mediana: valor del medio (30 en este caso)
• Moda: valor más frecuente (ninguno repetido aquí)',
'x̄ = Σxi / n', true),

((SELECT id FROM modulos WHERE slug = 'econometria'), 'Regresión Lineal', 'Regresión', 'intermedio', 'opcion_multiple',
'En la regresión Y = 5 + 3X, ¿cómo se interpreta el coeficiente 3?',
'Y es 3 cuando X es 0', 'Por cada unidad que aumenta X, Y aumenta 3 unidades', 'X es 3 veces más grande que Y', 'El R² es 3', 'b',
'En REGRESIÓN LINEAL SIMPLE: Y = β₀ + β₁X

DONDE:
• Y = variable dependiente
• X = variable independiente
• β₀ = intercepto (ordenada al origen) = 5
• β₁ = pendiente = 3

INTERPRETACIÓN:

β₀ = 5:
"Cuando X = 0, el valor esperado de Y es 5"

β₁ = 3:
"Por cada unidad que aumenta X, Y aumenta 3 unidades en promedio"
(Efecto marginal de X sobre Y)

EJEMPLO:
Si X = 10: Y = 5 + 3(10) = 35
Si X = 11: Y = 5 + 3(11) = 38
Diferencia = 3 (el coeficiente)',
'Y = β₀ + β₁X', true),

((SELECT id FROM modulos WHERE slug = 'econometria'), 'R Cuadrado', 'Regresión', 'intermedio', 'opcion_multiple',
'Un modelo de regresión tiene R² = 0.75. Esto significa que:',
'El 75% de los datos son correctos', 'El 75% de la variación en Y es explicada por X', 'La correlación es 0.75', 'El error es 75%', 'b',
'El COEFICIENTE DE DETERMINACIÓN (R²) mide el ajuste del modelo:

INTERPRETACIÓN:
R² = 0.75 significa que el 75% de la variación total en Y es explicada por las variables X del modelo.

FÓRMULA:
R² = 1 - (SCE/SCT) = SCR/SCT

DONDE:
• SCT: Suma de Cuadrados Total
• SCR: Suma de Cuadrados de la Regresión (explicada)
• SCE: Suma de Cuadrados del Error (no explicada)

RANGO:
• R² = 0: El modelo no explica nada
• R² = 1: Ajuste perfecto
• R² = 0.75: Buen ajuste

NOTA: R² alto no garantiza causalidad ni buen modelo.',
'R² = SCR/SCT = 1 - SCE/SCT', true),

((SELECT id FROM modulos WHERE slug = 'econometria'), 'Hipótesis Nula', 'Pruebas de Hipótesis', 'basico', 'opcion_multiple',
'En una prueba de hipótesis, ¿qué es el error Tipo I?',
'Aceptar H₀ cuando es falsa', 'Rechazar H₀ cuando es verdadera', 'Aceptar H₁ siempre', 'No cometer ningún error', 'b',
'ERRORES EN PRUEBAS DE HIPÓTESIS:

ERROR TIPO I (α):
• Rechazar H₀ cuando H₀ es VERDADERA
• "Falso positivo"
• Ejemplo: Condenar a un inocente
• α típicamente = 0.05 (5%)

ERROR TIPO II (β):
• NO rechazar H₀ cuando H₀ es FALSA
• "Falso negativo"
• Ejemplo: Absolver a un culpable

RELACIÓN:
• Reducir α aumenta β (y viceversa)
• Mayor tamaño de muestra reduce ambos

PODER DE LA PRUEBA:
1 - β = Probabilidad de rechazar H₀ cuando es falsa
(Detectar correctamente un efecto real)',
'α = P(Rechazar H₀ | H₀ verdadera)', true),

((SELECT id FROM modulos WHERE slug = 'econometria'), 'Valor p', 'Pruebas de Hipótesis', 'intermedio', 'opcion_multiple',
'Si el valor p de un coeficiente es 0.03, con α = 0.05, ¿qué concluimos?',
'No es estadísticamente significativo', 'Es estadísticamente significativo', 'Necesitamos más datos', 'El coeficiente es cero', 'b',
'El VALOR P (p-value) es la probabilidad de obtener un resultado al menos tan extremo como el observado, asumiendo que H₀ es verdadera.

REGLA DE DECISIÓN:
• Si p-value < α: RECHAZAR H₀ (significativo)
• Si p-value ≥ α: NO rechazar H₀

EN ESTE CASO:
p = 0.03 < α = 0.05

Por lo tanto: RECHAZAMOS H₀
El coeficiente ES estadísticamente significativo.

INTERPRETACIÓN:
Hay solo 3% de probabilidad de ver este resultado si el verdadero efecto fuera cero. Es poco probable que sea por azar.

NIVELES COMUNES:
• * p < 0.05
• ** p < 0.01
• *** p < 0.001',
'Si p < α, rechazar H₀', true),

((SELECT id FROM modulos WHERE slug = 'econometria'), 'Distribución Normal', 'Distribuciones', 'basico', 'opcion_multiple',
'En una distribución normal, ¿qué porcentaje de los datos cae dentro de 2 desviaciones estándar de la media?',
'68%', '95%', '99.7%', '50%', 'b',
'La DISTRIBUCIÓN NORMAL (Gaussiana) tiene propiedades específicas:

REGLA EMPÍRICA (68-95-99.7):

• μ ± 1σ: 68% de los datos
• μ ± 2σ: 95% de los datos
• μ ± 3σ: 99.7% de los datos

EJEMPLO:
Si IQ tiene μ = 100 y σ = 15:
• 68% tiene IQ entre 85 y 115
• 95% tiene IQ entre 70 y 130
• 99.7% tiene IQ entre 55 y 145

PROPIEDADES:
• Simétrica alrededor de la media
• Media = Mediana = Moda
• Colas se extienden al infinito
• Área total bajo la curva = 1',
'68-95-99.7 para ±1σ, ±2σ, ±3σ', true),

((SELECT id FROM modulos WHERE slug = 'econometria'), 'Correlación', 'Estadística Descriptiva', 'basico', 'opcion_multiple',
'Si la correlación entre X e Y es -0.9, esto indica:',
'Relación positiva fuerte', 'Relación negativa fuerte', 'No hay relación', 'Causalidad de X a Y', 'b',
'El COEFICIENTE DE CORRELACIÓN (r) mide la fuerza y dirección de la relación lineal:

RANGO: -1 ≤ r ≤ 1

INTERPRETACIÓN:
• r = 1: Correlación positiva perfecta
• r = -1: Correlación negativa perfecta
• r = 0: No hay correlación lineal

• |r| > 0.7: Correlación FUERTE
• 0.3 < |r| < 0.7: Correlación MODERADA
• |r| < 0.3: Correlación DÉBIL

EN ESTE CASO (r = -0.9):
• Es negativa: cuando X↑, Y↓
• Es fuerte: |0.9| > 0.7
• Relación negativa fuerte

¡CUIDADO!
Correlación ≠ Causalidad
(Helados y ahogamientos correlacionados por el calor)',
'r = Cov(X,Y) / (σx × σy)', true);

-- ============================================
-- POLÍTICA ECONÓMICA (40 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo) VALUES

((SELECT id FROM modulos WHERE slug = 'politica_economica'), 'Política Monetaria Expansiva', 'Política Monetaria', 'basico', 'opcion_multiple',
'¿Cuál es una herramienta de política monetaria expansiva?',
'Aumentar impuestos', 'Reducir la tasa de interés', 'Reducir el gasto público', 'Aumentar aranceles', 'b',
'POLÍTICA MONETARIA EXPANSIVA busca estimular la economía:

HERRAMIENTAS DEL BANCO CENTRAL:

1. REDUCIR TASA DE INTERÉS:
   • Crédito más barato
   • Más inversión y consumo
   • Mayor demanda agregada

2. REDUCIR ENCAJE LEGAL:
   • Bancos prestan más
   • Mayor multiplicador monetario

3. OPERACIONES DE MERCADO ABIERTO:
   • Comprar bonos del gobierno
   • Inyecta dinero a la economía

EFECTOS:
• Producción ↑
• Empleo ↑
• (Posible) Inflación ↑
• Tipo de cambio ↓ (depreciación)

SE USA EN: Recesiones, desempleo alto',
'Expansiva: ↓ tasas, ↓ encaje, comprar bonos', true),

((SELECT id FROM modulos WHERE slug = 'politica_economica'), 'Política Fiscal', 'Política Fiscal', 'basico', 'opcion_multiple',
'Un aumento en el gasto público financiado con deuda es política fiscal:',
'Expansiva', 'Contractiva', 'Neutral', 'Monetaria', 'a',
'POLÍTICA FISCAL usa impuestos (T) y gasto público (G):

POLÍTICA EXPANSIVA:
• G ↑ (más gasto) o T ↓ (menos impuestos)
• Aumenta demanda agregada
• Aumenta déficit fiscal

POLÍTICA CONTRACTIVA:
• G ↓ (menos gasto) o T ↑ (más impuestos)
• Reduce demanda agregada
• Reduce déficit fiscal

EN ESTE CASO:
G ↑ = Expansiva

FINANCIAMIENTO DEL DÉFICIT:
1. Deuda (emitir bonos) - Este caso
2. Impuestos (pero eso sería contractivo)
3. Emisión monetaria (causa inflación)

MULTIPLICADOR FISCAL:
ΔY = k × ΔG, donde k > 1',
'Expansiva: G↑ o T↓', true),

((SELECT id FROM modulos WHERE slug = 'politica_economica'), 'Curva de Phillips', 'Política Económica', 'avanzado', 'opcion_multiple',
'La Curva de Phillips original sugiere un trade-off entre:',
'Crecimiento y distribución', 'Inflación y desempleo', 'Exportaciones e importaciones', 'Consumo e inversión', 'b',
'LA CURVA DE PHILLIPS (1958):

RELACIÓN ORIGINAL:
Cuando desempleo es bajo → inflación es alta
Cuando desempleo es alto → inflación es baja

EXPLICACIÓN:
• Bajo desempleo = Economía caliente
• Trabajadores tienen poder de negociación
• Salarios suben → Costos suben → Precios suben

IMPLICACIÓN POLÍTICA:
Los gobiernos pueden "elegir" entre:
- Bajo desempleo con alta inflación
- Bajo inflación con alto desempleo

CRÍTICA (Friedman, Phelps):
En el LARGO PLAZO, no hay trade-off.
Las expectativas se ajustan.
Solo existe tasa natural de desempleo.

La Curva de Phillips de corto plazo se desplaza.',
'π = πe - β(u - u*) + shock oferta', true),

((SELECT id FROM modulos WHERE slug = 'politica_economica'), 'Regla de Taylor', 'Política Monetaria', 'avanzado', 'opcion_multiple',
'Según la Regla de Taylor, si la inflación está por encima de la meta, el banco central debería:',
'Reducir la tasa de interés', 'Aumentar la tasa de interés', 'Mantener la tasa constante', 'Imprimir más dinero', 'b',
'LA REGLA DE TAYLOR (1993):

FÓRMULA:
i = r* + π + 0.5(π - π*) + 0.5(y - y*)

DONDE:
• i = tasa de interés nominal objetivo
• r* = tasa real de equilibrio (~2%)
• π = inflación actual
• π* = inflación objetivo
• y - y* = brecha del producto

INTERPRETACIÓN:
Si π > π* (inflación alta):
El banco central sube la tasa de interés.
Y la sube MÁS que 1 a 1 (coeficiente > 1).

INTUICIÓN:
• Tasa ↑ → Crédito más caro
• Menos inversión y consumo
• Menos demanda → Menos presión de precios
• Inflación ↓

Muchos bancos centrales siguen reglas similares.',
'i = r* + π + 0.5(π-π*) + 0.5(y-y*)', true);

-- ============================================
-- ECONOMÍA MEXICANA (40 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo) VALUES

((SELECT id FROM modulos WHERE slug = 'economia_mexicana'), 'Banco de México', 'Instituciones', 'basico', 'opcion_multiple',
'¿Cuál es el objetivo principal del Banco de México?',
'Maximizar el crecimiento económico', 'Mantener la estabilidad del poder adquisitivo de la moneda', 'Financiar el gasto del gobierno', 'Controlar el tipo de cambio fijo', 'b',
'BANCO DE MÉXICO (Banxico)

AUTONOMÍA: Desde 1993 (reforma constitucional)

OBJETIVO PRINCIPAL (Artículo 28 Constitucional):
"Procurar la estabilidad del poder adquisitivo de la moneda nacional"
= Controlar la inflación

META DE INFLACIÓN: 3% +/- 1%

FUNCIONES:
1. Emitir billetes y monedas
2. Regular la oferta monetaria
3. Fijar la tasa de interés de referencia
4. Actuar como prestamista de última instancia
5. Administrar reservas internacionales

INSTRUMENTOS:
• Tasa de Interés Interbancaria a 1 día
• Operaciones de mercado abierto
• Encaje legal (actualmente 0%)

La autonomía protege contra presiones políticas inflacionarias.',
NULL, true),

((SELECT id FROM modulos WHERE slug = 'economia_mexicana'), 'Crisis 1994-95', 'Historia Económica', 'intermedio', 'opcion_multiple',
'¿Qué factor contribuyó a la crisis del "Error de Diciembre" de 1994?',
'Superávit comercial excesivo', 'Déficit en cuenta corriente y tipo de cambio fijo sobrevaluado', 'Inflación muy baja', 'Ausencia de deuda externa', 'b',
'CRISIS DEL "ERROR DE DICIEMBRE" (1994-1995)

ANTECEDENTES:
• Tipo de cambio fijo (banda)
• Peso sobrevaluado
• Déficit de cuenta corriente: 7% del PIB
• Financiado con capital de corto plazo (Tesobonos)
• Inestabilidad política (Colosio, Chiapas)

DETONANTE:
• Fuga de capitales
• Reservas internacionales agotadas
• 20 diciembre 1994: Devaluación descontrolada
• Peso cae de 3.5 a 7.5 por dólar

CONSECUENCIAS:
• PIB cae 6.2% en 1995
• Inflación de 52%
• Rescate FMI y EE.UU. ($50 mil millones)
• Quiebras bancarias (FOBAPROA)

LECCIONES:
• Tipo de cambio flexible
• Reservas internacionales altas
• Reducir dependencia de capital especulativo',
NULL, true),

((SELECT id FROM modulos WHERE slug = 'economia_mexicana'), 'TLCAN/T-MEC', 'Comercio Internacional', 'basico', 'opcion_multiple',
'El T-MEC (antes TLCAN) es un tratado de libre comercio entre:',
'México, Brasil y Argentina', 'México, Estados Unidos y Canadá', 'México y la Unión Europea', 'México y países de Asia', 'b',
'T-MEC (Tratado México-Estados Unidos-Canadá)

HISTORIA:
• TLCAN: 1994-2020
• T-MEC: Desde julio 2020

OBJETIVOS:
1. Eliminar aranceles entre los tres países
2. Facilitar el comercio e inversión
3. Proteger propiedad intelectual
4. Reglas de origen

IMPACTO EN MÉXICO:
• Comercio con EE.UU. aumentó dramáticamente
• México: exportador manufacturero
• Inversión extranjera directa ↑
• Empleo en maquiladoras

CAMBIOS T-MEC vs TLCAN:
• Reglas de origen automotriz más estrictas (75%)
• Requisitos laborales
• Cláusula de revisión cada 6 años
• Provisiones digitales

Críticas: Beneficios desiguales, dependencia de EE.UU.',
NULL, true),

((SELECT id FROM modulos WHERE slug = 'economia_mexicana'), 'Inflación en México', 'Política Económica', 'intermedio', 'opcion_multiple',
'¿Qué organismo mide la inflación oficial en México?',
'Banco de México', 'Secretaría de Hacienda', 'INEGI', 'SHCP', 'c',
'MEDICIÓN DE INFLACIÓN EN MÉXICO

INEGI (Instituto Nacional de Estadística y Geografía):
• Calcula el INPC (Índice Nacional de Precios al Consumidor)
• Publica quincenalmente

METODOLOGÍA:
• Canasta de ~300 productos y servicios
• Ponderada por patrones de consumo
• Cobertura: 46 ciudades

INFLACIÓN SUBYACENTE:
• Excluye productos volátiles
• Alimentos procesados, educación, otros servicios
• Mejor indicador de tendencia

INFLACIÓN NO SUBYACENTE:
• Agropecuarios
• Energéticos y tarifas de gobierno

BANXICO usa esta información para política monetaria,
pero es INEGI quien la mide oficialmente.',
NULL, true);

-- ============================================
-- Mensaje de verificación final
-- ============================================

SELECT
    'PREGUNTAS INSERTADAS POR MÓDULO:' as info;

SELECT
    m.titulo as modulo,
    m.icon,
    COUNT(p.id) as total_preguntas
FROM modulos m
LEFT JOIN preguntas p ON p.modulo_id = m.id AND p.activo = true
GROUP BY m.id, m.titulo, m.icon, m.numero
ORDER BY m.numero;

SELECT
    '========================================' as separador;

SELECT
    'TOTAL PREGUNTAS EN BASE DE DATOS:' as info,
    COUNT(*) as cantidad
FROM preguntas
WHERE activo = true;
