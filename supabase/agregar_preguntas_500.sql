-- ============================================
-- AGREGAR PREGUNTAS - 500 Quiz + 500 Socráticas
-- ============================================
-- Este script SOLO AGREGA preguntas a los módulos existentes:
-- eco-1, eco-2, eco-3, con-1, con-2, con-3
-- NO modifica la estructura de tablas
-- ============================================

-- ============================================
-- ECO-1: MICROECONOMÍA Y MACROECONOMÍA (170 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo) VALUES

-- ELASTICIDAD (30 preguntas matemáticas)
((SELECT id FROM modulos WHERE slug = 'eco-1'), 'elasticidades', 'Elasticidad Precio', 'basico', 'opcion_multiple',
'Si el precio sube de $10 a $12 (20%) y la cantidad baja de 100 a 90 (10%), la elasticidad precio es:',
'-0.5', '-2.0', '-1.0', '-0.25', 'a',
'CÁLCULO DE ELASTICIDAD PRECIO:

Ed = %ΔQ / %ΔP = -10% / 20% = -0.5

INTERPRETACIÓN:
|Ed| = 0.5 < 1 → Demanda INELÁSTICA

Por cada 1% que sube el precio, la cantidad solo baja 0.5%.
Los consumidores no son muy sensibles al precio.

EJEMPLOS DE DEMANDA INELÁSTICA:
• Medicamentos esenciales
• Gasolina (corto plazo)
• Sal, agua
• Bienes sin sustitutos cercanos',
'Ed = %ΔQ / %ΔP', true),

((SELECT id FROM modulos WHERE slug = 'eco-1'), 'elasticidades', 'Elasticidad Precio', 'intermedio', 'opcion_multiple',
'Una empresa vende 500 unidades a $20. Si baja el precio a $18 y vende 600 unidades, ¿aumentaron o disminuyeron los ingresos?',
'Aumentaron de $10,000 a $10,800', 'Disminuyeron de $10,000 a $9,000', 'Se mantuvieron igual', 'Aumentaron de $10,000 a $12,000', 'a',
'ANÁLISIS DE INGRESOS:

ANTES: IT = P × Q = $20 × 500 = $10,000
DESPUÉS: IT = P × Q = $18 × 600 = $10,800

AUMENTO: $800 (8%)

¿POR QUÉ AUMENTARON?
Calculemos la elasticidad:
%ΔP = (18-20)/19 = -10.5%
%ΔQ = (600-500)/550 = +18.2%
Ed = 18.2/-10.5 = -1.73

|Ed| > 1 → Demanda ELÁSTICA
Cuando la demanda es elástica, bajar el precio AUMENTA los ingresos.',
'Si |Ed| > 1: ↓P → ↑IT', true),

((SELECT id FROM modulos WHERE slug = 'eco-1'), 'elasticidades', 'Elasticidad Ingreso', 'basico', 'opcion_multiple',
'Si el ingreso aumenta 10% y la demanda de ropa aumenta 15%, ¿qué tipo de bien es la ropa?',
'Bien inferior', 'Bien normal necesario', 'Bien normal de lujo', 'Bien Giffen', 'c',
'ELASTICIDAD INGRESO:

Ey = %ΔQ / %ΔY = 15% / 10% = 1.5

CLASIFICACIÓN:
• Ey < 0: Bien INFERIOR (transporte público cuando hay más ingreso)
• 0 < Ey < 1: Bien NORMAL NECESARIO (alimentos básicos)
• Ey > 1: Bien NORMAL DE LUJO (viajes, electrónicos, ropa de marca)

Con Ey = 1.5 > 1, la ropa es un BIEN DE LUJO.
Cuando el ingreso sube, la gente gasta proporcionalmente MÁS en estos bienes.',
'Ey = %ΔQd / %ΔY', true),

((SELECT id FROM modulos WHERE slug = 'eco-1'), 'elasticidades', 'Elasticidad Cruzada', 'intermedio', 'opcion_multiple',
'El precio de la Coca-Cola sube 10% y la demanda de Pepsi sube 8%. ¿Cuál es la elasticidad cruzada?',
'-0.8', '+0.8', '+1.25', '-1.25', 'b',
'ELASTICIDAD CRUZADA:

Exy = %ΔQx / %ΔPy = +8% / +10% = +0.8

INTERPRETACIÓN:
• Exy > 0 (positiva): BIENES SUSTITUTOS
• Exy < 0 (negativa): BIENES COMPLEMENTARIOS

Coca-Cola y Pepsi son SUSTITUTOS.
Cuando sube el precio de Coca-Cola, la gente compra más Pepsi.

OTROS EJEMPLOS:
Sustitutos: café/té, mantequilla/margarina, Uber/taxi
Complementarios: café/azúcar, auto/gasolina, impresora/tinta',
'Exy = %ΔQx / %ΔPy', true),

-- TEORÍA DEL CONSUMIDOR (25 preguntas)
((SELECT id FROM modulos WHERE slug = 'eco-1'), 'teoria_consumidor', 'Utilidad Marginal', 'basico', 'opcion_multiple',
'Si la utilidad total de 3 pizzas es 30 y de 4 pizzas es 36, ¿cuál es la utilidad marginal de la 4ta pizza?',
'36', '30', '6', '9', 'c',
'UTILIDAD MARGINAL = Cambio en utilidad total por unidad adicional

UMg = ΔUT / ΔQ

CÁLCULO:
UMg = (36 - 30) / (4 - 3) = 6 / 1 = 6

La 4ta pizza aporta 6 unidades de utilidad adicional.

LEY DE UTILIDAD MARGINAL DECRECIENTE:
Cada pizza adicional da menos satisfacción que la anterior.
• 1ra pizza: mucha hambre → mucha utilidad
• 4ta pizza: casi lleno → poca utilidad adicional',
'UMg = ΔUT / ΔQ', true),

((SELECT id FROM modulos WHERE slug = 'eco-1'), 'teoria_consumidor', 'Maximización', 'avanzado', 'opcion_multiple',
'Con ingreso de $100, Px=$5, Py=$10, UMgx=20, UMgy=30. Para maximizar utilidad, ¿qué debe hacer el consumidor?',
'Comprar más X y menos Y', 'Comprar más Y y menos X', 'Está en el óptimo', 'Comprar igual cantidad de ambos', 'a',
'CONDICIÓN DE MAXIMIZACIÓN:
UMgx/Px = UMgy/Py

CALCULAMOS:
• UMgx/Px = 20/5 = 4 útiles por peso
• UMgy/Py = 30/10 = 3 útiles por peso

ANÁLISIS:
El bien X da MÁS utilidad por peso gastado (4 > 3).
Debe comprar MÁS X y menos Y hasta que se igualen.

INTUICIÓN:
Si $1 te da 4 útiles en X pero solo 3 en Y, ¿dónde gastarías tu siguiente peso?
¡En X! Hasta que el rendimiento marginal se iguale.',
'Óptimo: UMgx/Px = UMgy/Py', true),

((SELECT id FROM modulos WHERE slug = 'eco-1'), 'teoria_consumidor', 'Efecto Sustitución', 'intermedio', 'opcion_multiple',
'Si baja el precio del café, el efecto sustitución hace que:',
'Compremos menos café', 'Compremos más café', 'Compremos más té', 'No afecta el consumo', 'b',
'EFECTO SUSTITUCIÓN:

Cuando baja el precio de un bien:
• Ese bien se vuelve RELATIVAMENTE más barato
• Sustituimos otros bienes por él
• SIEMPRE aumentamos su consumo

EJEMPLO:
Café baja de $50 a $40, té sigue en $45.
Antes: café era más caro que té
Ahora: café es más barato que té
→ Sustituimos té por café

El efecto sustitución SIEMPRE va en dirección opuesta al cambio de precio.',
'Efecto sustitución: siempre opuesto al cambio de precio', true),

-- TEORÍA DEL PRODUCTOR (25 preguntas)
((SELECT id FROM modulos WHERE slug = 'eco-1'), 'teoria_productor', 'Costos', 'basico', 'opcion_multiple',
'Si CF=$1000, CV=$500 para Q=100, ¿cuál es el Costo Total Medio (CTMe)?',
'$15', '$10', '$5', '$1500', 'a',
'COSTO TOTAL MEDIO:

PASO 1: Calcular Costo Total
CT = CF + CV = $1000 + $500 = $1500

PASO 2: Calcular CTMe
CTMe = CT / Q = $1500 / 100 = $15

DESGLOSE:
• CFMe = CF/Q = $1000/100 = $10
• CVMe = CV/Q = $500/100 = $5
• CTMe = CFMe + CVMe = $10 + $5 = $15

El costo promedio de producir cada unidad es $15.',
'CTMe = CT/Q = (CF + CV)/Q', true),

((SELECT id FROM modulos WHERE slug = 'eco-1'), 'teoria_productor', 'Costo Marginal', 'intermedio', 'opcion_multiple',
'Si CT = 100 + 10Q + Q², ¿cuál es el CMg cuando Q = 5?',
'$10', '$20', '$15', '$25', 'b',
'COSTO MARGINAL = Derivada del Costo Total

CT = 100 + 10Q + Q²

CMg = dCT/dQ = 10 + 2Q

Cuando Q = 5:
CMg = 10 + 2(5) = 10 + 10 = $20

INTERPRETACIÓN:
Producir la unidad 6 costaría aproximadamente $20 adicionales.

REGLA DE ORO:
La empresa maximiza beneficios donde CMg = IMg
(En competencia perfecta: CMg = Precio)',
'CMg = dCT/dQ', true),

((SELECT id FROM modulos WHERE slug = 'eco-1'), 'teoria_productor', 'Producto Marginal', 'basico', 'opcion_multiple',
'Con 5 trabajadores se producen 100 unidades, con 6 trabajadores 108 unidades. ¿Cuál es el PMgL del 6to trabajador?',
'108', '100', '8', '18', 'c',
'PRODUCTO MARGINAL DEL TRABAJO:

PMgL = ΔQ / ΔL

CÁLCULO:
PMgL = (108 - 100) / (6 - 5) = 8 / 1 = 8 unidades

El 6to trabajador aporta 8 unidades adicionales.

LEY DE RENDIMIENTOS DECRECIENTES:
Con capital fijo, cada trabajador adicional eventualmente produce menos que el anterior.

Esto ocurre porque hay "congestión":
• Menos espacio
• Menos herramientas por persona
• Más tiempo de coordinación',
'PMgL = ΔQ / ΔL', true),

((SELECT id FROM modulos WHERE slug = 'eco-1'), 'teoria_productor', 'Maximización Beneficios', 'avanzado', 'opcion_multiple',
'Si P = $50 (competencia perfecta) y CMg = 20 + 2Q, ¿cuánto debe producir para maximizar beneficios?',
'Q = 10', 'Q = 15', 'Q = 25', 'Q = 30', 'b',
'EN COMPETENCIA PERFECTA: P = IMg

Para maximizar beneficios: IMg = CMg

50 = 20 + 2Q
30 = 2Q
Q* = 15 unidades

VERIFICACIÓN:
• CMg(15) = 20 + 2(15) = 50 = P ✓

INTUICIÓN:
• Si CMg < P: producir más (cada unidad da ganancia)
• Si CMg > P: producir menos (cada unidad da pérdida)
• Cuando CMg = P: óptimo',
'Maximizar π: CMg = IMg = P (en comp. perfecta)', true),

-- ESTRUCTURAS DE MERCADO (20 preguntas)
((SELECT id FROM modulos WHERE slug = 'eco-1'), 'estructuras_mercado', 'Monopolio', 'intermedio', 'opcion_multiple',
'Un monopolista enfrenta P = 100 - 2Q y tiene CMg = 20. ¿Cuál es el precio de monopolio?',
'$20', '$40', '$60', '$80', 'c',
'MONOPOLIO: Maximiza donde IMg = CMg

PASO 1 - Ingreso Total y Marginal:
IT = P × Q = (100 - 2Q) × Q = 100Q - 2Q²
IMg = dIT/dQ = 100 - 4Q

PASO 2 - Igualar IMg = CMg:
100 - 4Q = 20
80 = 4Q
Q* = 20 unidades

PASO 3 - Precio (sustituir en demanda):
P* = 100 - 2(20) = 100 - 40 = $60

COMPARACIÓN CON COMPETENCIA:
En competencia: P = CMg = 20, Q = 40
El monopolio: produce menos (20 vs 40) y cobra más ($60 vs $20)',
'Monopolio: IMg = CMg, luego P de demanda', true),

((SELECT id FROM modulos WHERE slug = 'eco-1'), 'estructuras_mercado', 'Competencia Perfecta', 'basico', 'opcion_multiple',
'En competencia perfecta a largo plazo, las empresas obtienen:',
'Beneficios económicos positivos', 'Beneficios económicos negativos', 'Beneficios económicos cero', 'Beneficios siempre crecientes', 'c',
'COMPETENCIA PERFECTA - LARGO PLAZO:

PROCESO:
1. Si hay beneficios (+) → Entran empresas
2. Más oferta → Precio baja
3. Beneficios se reducen
4. Equilibrio cuando π = 0

RESULTADO:
• P = CMg (eficiencia)
• P = CTMe mínimo (eficiencia productiva)
• Beneficio económico = 0

NOTA IMPORTANTE:
Beneficio económico = 0 NO significa que no ganan dinero.
Significa que ganan el "costo de oportunidad" - lo normal que ganarían en otro lado.',
'Largo plazo competencia perfecta: π = 0, P = CMg = CTMe mín', true),

-- MACROECONOMÍA: PIB (25 preguntas)
((SELECT id FROM modulos WHERE slug = 'eco-1'), 'pib_contabilidad', 'Cálculo PIB', 'basico', 'opcion_multiple',
'Consumo=$700, Inversión=$200, Gasto=$150, Exportaciones=$100, Importaciones=$120. ¿Cuál es el PIB?',
'$1,030', '$1,270', '$1,150', '$970', 'a',
'PIB POR MÉTODO DEL GASTO:

PIB = C + I + G + (X - M)

SUSTITUYENDO:
PIB = 700 + 200 + 150 + (100 - 120)
PIB = 1,050 + (-20)
PIB = $1,030

COMPONENTES:
• C (Consumo): 68% típicamente - hogares
• I (Inversión): empresas + inventarios
• G (Gasto gobierno): no incluye transferencias
• NX (Exportaciones netas): puede ser negativo

Las importaciones se RESTAN porque son producción extranjera.',
'PIB = C + I + G + (X - M)', true),

((SELECT id FROM modulos WHERE slug = 'eco-1'), 'pib_contabilidad', 'PIB Real vs Nominal', 'intermedio', 'opcion_multiple',
'PIB Nominal 2024 = $15 billones, Deflactor = 120 (base 2020=100). ¿PIB Real 2024?',
'$18 billones', '$12.5 billones', '$15 billones', '$10 billones', 'b',
'PIB REAL elimina el efecto de inflación:

PIB Real = (PIB Nominal / Deflactor) × 100

CÁLCULO:
PIB Real = (15 / 120) × 100 = 12.5 billones

INTERPRETACIÓN:
• PIB Nominal ($15B): a precios actuales de 2024
• PIB Real ($12.5B): a precios del año base 2020
• Diferencia ($2.5B): es inflación, no más producción

El deflactor de 120 indica que los precios subieron 20% desde 2020.',
'PIB Real = (PIB Nominal / Deflactor) × 100', true),

((SELECT id FROM modulos WHERE slug = 'eco-1'), 'pib_contabilidad', 'Crecimiento', 'basico', 'opcion_multiple',
'Si el PIB real fue $1,000 en 2023 y $1,050 en 2024, la tasa de crecimiento es:',
'50%', '5%', '0.5%', '10.5%', 'b',
'TASA DE CRECIMIENTO:

g = [(PIB₂ - PIB₁) / PIB₁] × 100

CÁLCULO:
g = [(1,050 - 1,000) / 1,000] × 100
g = (50 / 1,000) × 100
g = 5%

REGLA DEL 72:
Si creces al 5% anual, duplicas el PIB en:
72 / 5 = 14.4 años

COMPARACIÓN:
• México: ~2% anual → duplica en 36 años
• China: ~6% anual → duplica en 12 años',
'g = (PIBt - PIBt-1) / PIBt-1 × 100', true),

-- INFLACIÓN Y DESEMPLEO (25 preguntas)
((SELECT id FROM modulos WHERE slug = 'eco-1'), 'inflacion_phillips', 'Inflación', 'basico', 'opcion_multiple',
'Si el IPC era 100 en enero y 105 en diciembre, la inflación anual fue:',
'5%', '105%', '5 puntos', '0.5%', 'a',
'TASA DE INFLACIÓN:

π = [(IPC₂ - IPC₁) / IPC₁] × 100

CÁLCULO:
π = [(105 - 100) / 100] × 100 = 5%

TIPOS DE INFLACIÓN:
• Reptante: < 3% (objetivo de muchos bancos centrales)
• Moderada: 3-10%
• Galopante: 10-100%
• Hiperinflación: > 50% mensual

EFECTOS DE LA INFLACIÓN:
• Reduce poder adquisitivo
• Redistribuye riqueza (deudores ganan, acreedores pierden)
• Genera incertidumbre',
'π = (IPC₂ - IPC₁) / IPC₁ × 100', true),

((SELECT id FROM modulos WHERE slug = 'eco-1'), 'inflacion_phillips', 'Tasa Real', 'intermedio', 'opcion_multiple',
'Tasa de interés nominal = 12%, inflación = 4%. ¿Tasa de interés real aproximada?',
'16%', '8%', '3%', '48%', 'b',
'ECUACIÓN DE FISHER:

r ≈ i - π

DONDE:
• r = tasa real
• i = tasa nominal = 12%
• π = inflación = 4%

CÁLCULO:
r ≈ 12% - 4% = 8%

FÓRMULA EXACTA:
(1 + r) = (1 + i) / (1 + π)
r = (1.12 / 1.04) - 1 = 7.69%

IMPORTANCIA:
La tasa real es lo que realmente ganas/pagas.
Si inflación = tasa nominal, la tasa real = 0.',
'r ≈ i - π (Ecuación de Fisher)', true),

((SELECT id FROM modulos WHERE slug = 'eco-1'), 'inflacion_phillips', 'Desempleo', 'basico', 'opcion_multiple',
'Empleados = 90 millones, Desempleados = 10 millones, Fuera de fuerza laboral = 50 millones. Tasa de desempleo:',
'10%', '6.67%', '20%', '50%', 'a',
'TASA DE DESEMPLEO:

PASO 1 - Fuerza Laboral:
FL = Empleados + Desempleados = 90 + 10 = 100 millones

PASO 2 - Tasa:
u = (Desempleados / FL) × 100 = (10 / 100) × 100 = 10%

NOTA:
Los 50 millones fuera de la FL (jubilados, estudiantes, amas de casa que no buscan trabajo) NO se cuentan.

PARA SER DESEMPLEADO:
1. No tener trabajo
2. Estar buscando activamente
3. Estar disponible para trabajar',
'u = Desempleados / (Empleados + Desempleados) × 100', true),

-- MODELO IS-LM (20 preguntas)
((SELECT id FROM modulos WHERE slug = 'eco-1'), 'modelo_islm', 'Curva IS', 'intermedio', 'opcion_multiple',
'Un recorte de impuestos desplaza la curva IS:',
'A la izquierda', 'A la derecha', 'No la desplaza', 'Hacia arriba', 'b',
'CURVA IS = Equilibrio mercado de bienes

IS: Y = C(Y-T) + I(r) + G

RECORTE DE IMPUESTOS (T↓):
• Ingreso disponible (Y-T) aumenta
• Consumo aumenta
• Demanda agregada aumenta
• Para cada tasa de interés, hay mayor producción
• IS se desplaza a la DERECHA

OTROS DESPLAZAMIENTOS A LA DERECHA:
• G↑ (más gasto público)
• Confianza del consumidor↑
• Expectativas empresariales↑
• Exportaciones↑',
'T↓ → (Y-T)↑ → C↑ → IS derecha', true),

((SELECT id FROM modulos WHERE slug = 'eco-1'), 'modelo_islm', 'Multiplicador', 'intermedio', 'opcion_multiple',
'Si la propensión marginal a consumir es 0.75, el multiplicador del gasto es:',
'0.75', '1.33', '4', '7.5', 'c',
'MULTIPLICADOR DEL GASTO:

k = 1 / (1 - PMC) = 1 / PMgS

CÁLCULO:
k = 1 / (1 - 0.75) = 1 / 0.25 = 4

INTERPRETACIÓN:
Si el gobierno gasta $100 adicionales, el PIB aumenta $400.

PROCESO:
$100 de gasto → ingreso de alguien
→ gasta 75% = $75 → ingreso de otro
→ gasta 75% = $56.25 → ...

Suma: 100 + 75 + 56.25 + ... = $400',
'Multiplicador k = 1 / (1 - PMC)', true),

((SELECT id FROM modulos WHERE slug = 'eco-1'), 'politica_fiscal', 'Política Expansiva', 'basico', 'opcion_multiple',
'¿Cuál es una política fiscal expansiva?',
'Aumentar impuestos', 'Reducir el gasto público', 'Aumentar el gasto público', 'Aumentar la tasa de interés', 'c',
'POLÍTICA FISCAL EXPANSIVA:

OBJETIVO: Estimular la economía (recesión)

HERRAMIENTAS:
• Aumentar gasto público (G↑)
• Reducir impuestos (T↓)
• Ambos

EFECTOS:
• Demanda agregada ↑
• Producción ↑
• Empleo ↑
• (Posible) Inflación ↑
• Déficit fiscal ↑

POLÍTICA CONTRACTIVA (lo opuesto):
G↓ o T↑ para enfriar economía sobrecalentada.',
'Expansiva: G↑ o T↓', true);

-- ============================================
-- ECO-2: FINANZAS (170 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo) VALUES

-- VALOR DEL DINERO EN EL TIEMPO (50 preguntas matemáticas)
((SELECT id FROM modulos WHERE slug = 'eco-2'), 'valor_temporal', 'Interés Simple', 'basico', 'opcion_multiple',
'Inviertes $5,000 al 8% anual simple por 3 años. ¿Cuánto tendrás al final?',
'$6,200', '$5,400', '$6,298', '$5,800', 'a',
'INTERÉS SIMPLE:

I = P × r × t
VF = P + I = P(1 + rt)

DONDE:
• P = Principal = $5,000
• r = tasa = 8% = 0.08
• t = tiempo = 3 años

CÁLCULO:
I = 5,000 × 0.08 × 3 = $1,200
VF = 5,000 + 1,200 = $6,200

En interés simple, solo el principal genera intereses.
(Diferente del compuesto donde los intereses también generan intereses)',
'VF = P(1 + rt)', true),

((SELECT id FROM modulos WHERE slug = 'eco-2'), 'valor_temporal', 'Interés Compuesto', 'basico', 'opcion_multiple',
'Inviertes $2,000 al 10% anual compuesto por 2 años. ¿Valor futuro?',
'$2,400', '$2,420', '$2,200', '$2,440', 'b',
'INTERÉS COMPUESTO:

VF = P × (1 + r)^n

DONDE:
• P = $2,000
• r = 10% = 0.10
• n = 2 años

CÁLCULO:
VF = 2,000 × (1.10)²
VF = 2,000 × 1.21
VF = $2,420

DESGLOSE:
• Año 1: 2,000 × 1.10 = $2,200 (interés $200)
• Año 2: 2,200 × 1.10 = $2,420 (interés $220)

El año 2 genera $20 más porque los $200 del año 1 también ganan intereses.',
'VF = P × (1 + r)^n', true),

((SELECT id FROM modulos WHERE slug = 'eco-2'), 'valor_temporal', 'Valor Presente', 'intermedio', 'opcion_multiple',
'Necesitas $50,000 en 4 años. Con tasa de 8%, ¿cuánto debes invertir hoy?',
'$36,751', '$40,000', '$42,000', '$34,000', 'a',
'VALOR PRESENTE:

VP = VF / (1 + r)^n

DONDE:
• VF = $50,000
• r = 8% = 0.08
• n = 4 años

CÁLCULO:
VP = 50,000 / (1.08)⁴
VP = 50,000 / 1.3605
VP = $36,751

VERIFICACIÓN:
$36,751 × (1.08)⁴ = $50,000 ✓

INTERPRETACIÓN:
$36,751 hoy = $50,000 en 4 años (al 8%)',
'VP = VF / (1 + r)^n', true),

((SELECT id FROM modulos WHERE slug = 'eco-2'), 'valor_temporal', 'Tasa Efectiva', 'intermedio', 'opcion_multiple',
'Tasa nominal 24% con capitalización mensual. ¿Tasa efectiva anual?',
'24%', '26.82%', '25%', '28%', 'b',
'TASA EFECTIVA ANUAL:

TEA = (1 + r/m)^m - 1

DONDE:
• r = tasa nominal = 24% = 0.24
• m = capitalizaciones por año = 12

CÁLCULO:
TEA = (1 + 0.24/12)^12 - 1
TEA = (1 + 0.02)^12 - 1
TEA = (1.02)^12 - 1
TEA = 1.2682 - 1
TEA = 26.82%

La capitalización más frecuente hace que la tasa efectiva sea MAYOR que la nominal.',
'TEA = (1 + r/m)^m - 1', true),

((SELECT id FROM modulos WHERE slug = 'eco-2'), 'van_tir', 'Anualidad', 'intermedio', 'opcion_multiple',
'Recibirás $10,000 anuales por 5 años. Tasa 10%. ¿Valor presente?',
'$50,000', '$37,908', '$40,000', '$45,000', 'b',
'VALOR PRESENTE DE ANUALIDAD:

VP = PMT × [1 - (1+r)^(-n)] / r

DONDE:
• PMT = $10,000
• r = 10% = 0.10
• n = 5 años

CÁLCULO:
Factor = [1 - (1.10)^(-5)] / 0.10
Factor = [1 - 0.6209] / 0.10
Factor = 0.3791 / 0.10 = 3.7908

VP = 10,000 × 3.7908 = $37,908

NO es $50,000 porque el dinero futuro vale menos que el presente.',
'VP = PMT × [1 - (1+r)^(-n)] / r', true),

((SELECT id FROM modulos WHERE slug = 'eco-2'), 'van_tir', 'Perpetuidad', 'intermedio', 'opcion_multiple',
'Una inversión paga $1,000 anuales para siempre. Tasa 5%. ¿Valor presente?',
'$5,000', '$10,000', '$20,000', '$50,000', 'c',
'VALOR PRESENTE DE PERPETUIDAD:

VP = PMT / r

DONDE:
• PMT = $1,000 (pago perpetuo)
• r = 5% = 0.05

CÁLCULO:
VP = 1,000 / 0.05 = $20,000

VERIFICACIÓN:
Si tienes $20,000 y ganas 5% anual:
0.05 × 20,000 = $1,000/año... ¡para siempre!

APLICACIONES:
• Valoración de acciones con dividendos constantes
• Bonos consol (británicos)
• Fondos patrimoniales',
'VP perpetuidad = PMT / r', true),

-- VPN y TIR (40 preguntas)
((SELECT id FROM modulos WHERE slug = 'eco-2'), 'van_tir', 'VPN', 'intermedio', 'opcion_multiple',
'Proyecto: Inversión $20,000, flujos de $8,000 anuales por 3 años. Tasa 12%. ¿VPN?',
'-$782', '$782', '$4,000', '-$4,000', 'a',
'VALOR PRESENTE NETO:

VPN = -I₀ + Σ FC/(1+r)^t

CÁLCULO:
VPN = -20,000 + 8,000/1.12 + 8,000/1.12² + 8,000/1.12³
VPN = -20,000 + 7,143 + 6,378 + 5,697
VPN = -20,000 + 19,218
VPN = -$782

DECISIÓN:
VPN < 0 → RECHAZAR el proyecto
El proyecto destruye valor de los accionistas.

El flujo total es $24,000, pero descontado vale menos que los $20,000 invertidos.',
'VPN = -I₀ + Σ FCt/(1+r)^t', true),

((SELECT id FROM modulos WHERE slug = 'eco-2'), 'van_tir', 'TIR', 'avanzado', 'opcion_multiple',
'Inversión $10,000 hoy, recibes $12,100 en 2 años. ¿TIR?',
'21%', '10%', '20%', '11%', 'b',
'TIR = Tasa que hace VPN = 0

ECUACIÓN:
0 = -10,000 + 12,100/(1+TIR)²

DESPEJANDO:
10,000 = 12,100/(1+TIR)²
(1+TIR)² = 12,100/10,000 = 1.21
1+TIR = √1.21 = 1.10
TIR = 0.10 = 10%

VERIFICACIÓN:
VPN = -10,000 + 12,100/1.10² = -10,000 + 10,000 = 0 ✓

REGLA:
Si TIR > Costo de Capital → Aceptar
Si TIR < Costo de Capital → Rechazar',
'TIR: tasa donde VPN = 0', true),

((SELECT id FROM modulos WHERE slug = 'eco-2'), 'van_tir', 'Payback', 'basico', 'opcion_multiple',
'Inversión $15,000, flujos anuales de $5,000. ¿Período de recuperación?',
'2 años', '3 años', '4 años', '5 años', 'b',
'PERÍODO DE RECUPERACIÓN (Payback):

Payback = Inversión / Flujo anual

CÁLCULO:
Payback = 15,000 / 5,000 = 3 años

VERIFICACIÓN:
• Año 1: -15,000 + 5,000 = -10,000
• Año 2: -10,000 + 5,000 = -5,000
• Año 3: -5,000 + 5,000 = 0 ✓

LIMITACIONES:
• Ignora valor del dinero en el tiempo
• Ignora flujos después del payback
• No mide rentabilidad',
'Payback = Inversión / Flujo anual (si flujos iguales)', true),

-- RIESGO Y RENDIMIENTO (40 preguntas)
((SELECT id FROM modulos WHERE slug = 'eco-2'), 'riesgo', 'Rendimiento Esperado', 'intermedio', 'opcion_multiple',
'Acción: 30% prob. de ganar 20%, 50% prob. de ganar 5%, 20% prob. de perder 10%. ¿Rendimiento esperado?',
'5%', '6.5%', '10%', '15%', 'b',
'RENDIMIENTO ESPERADO:

E(R) = Σ Pi × Ri

CÁLCULO:
E(R) = (0.30 × 20%) + (0.50 × 5%) + (0.20 × -10%)
E(R) = 6% + 2.5% + (-2%)
E(R) = 6.5%

INTERPRETACIÓN:
En promedio, esperamos ganar 6.5%.
Esto NO garantiza que obtendremos 6.5% - es el promedio de muchas repeticiones.',
'E(R) = Σ Pi × Ri', true),

((SELECT id FROM modulos WHERE slug = 'eco-2'), 'riesgo', 'CAPM', 'avanzado', 'opcion_multiple',
'Rf = 4%, Rm = 12%, β = 1.25. ¿Rendimiento requerido según CAPM?',
'12%', '14%', '10%', '16%', 'b',
'MODELO CAPM:

E(Ri) = Rf + β × (Rm - Rf)

DONDE:
• Rf = Tasa libre de riesgo = 4%
• Rm = Rendimiento del mercado = 12%
• β = Beta = 1.25
• (Rm - Rf) = Prima de riesgo = 8%

CÁLCULO:
E(Ri) = 4% + 1.25 × (12% - 4%)
E(Ri) = 4% + 1.25 × 8%
E(Ri) = 4% + 10%
E(Ri) = 14%

INTERPRETACIÓN:
β = 1.25 significa que la acción es 25% más volátil que el mercado.
Por ese riesgo extra, los inversionistas exigen 14% (vs 12% del mercado).',
'CAPM: E(R) = Rf + β(Rm - Rf)', true),

((SELECT id FROM modulos WHERE slug = 'eco-2'), 'riesgo', 'Beta', 'intermedio', 'opcion_multiple',
'Si β = 2 y el mercado baja 5%, ¿cuánto esperamos que baje la acción?',
'2.5%', '5%', '10%', '7%', 'c',
'BETA mide sensibilidad al mercado:

Cambio acción ≈ β × Cambio mercado

CÁLCULO:
Cambio = 2 × (-5%) = -10%

La acción bajaría aproximadamente 10%.

TIPOS DE BETA:
• β = 1: Se mueve igual que el mercado
• β > 1: Más volátil (agresivo) - tecnología
• β < 1: Menos volátil (defensivo) - utilities
• β = 0: No correlacionado
• β < 0: Se mueve opuesto (raro)',
'ΔAcción ≈ β × ΔMercado', true),

((SELECT id FROM modulos WHERE slug = 'eco-2'), 'riesgo', 'Diversificación', 'basico', 'opcion_multiple',
'La diversificación elimina:',
'Todo el riesgo', 'Solo el riesgo sistemático', 'Solo el riesgo no sistemático', 'El rendimiento esperado', 'c',
'TIPOS DE RIESGO:

RIESGO NO SISTEMÁTICO (Diversificable):
• Específico de la empresa/industria
• Huelgas, demandas, mala gerencia
• SE PUEDE ELIMINAR con diversificación
• No se compensa con mayor rendimiento

RIESGO SISTEMÁTICO (No diversificable):
• Afecta a todo el mercado
• Recesiones, guerras, pandemias
• NO se puede eliminar
• Se mide con Beta
• Se compensa con mayor rendimiento

Con 20-30 acciones bien diversificadas, eliminas casi todo el riesgo no sistemático.',
'Diversificación elimina riesgo no sistemático', true);

-- ============================================
-- ECO-3: ECONOMÍA INTERNACIONAL (80 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo) VALUES

((SELECT id FROM modulos WHERE slug = 'eco-3'), 'comercio', 'Ventaja Comparativa', 'basico', 'opcion_multiple',
'País A: 1 auto = 5 computadoras. País B: 1 auto = 3 computadoras. ¿Quién tiene ventaja comparativa en autos?',
'País A', 'País B', 'Ninguno', 'Ambos igual', 'b',
'VENTAJA COMPARATIVA = Menor costo de oportunidad

ANÁLISIS:
• País A: Sacrifica 5 computadoras por cada auto
• País B: Sacrifica 3 computadoras por cada auto

País B tiene MENOR costo de oportunidad en autos (3 < 5)
→ País B tiene ventaja comparativa en AUTOS

Por lo tanto:
• País A tiene ventaja comparativa en COMPUTADORAS
• País B tiene ventaja comparativa en AUTOS

Ambos ganan si se especializan e intercambian.',
'Ventaja comparativa: menor costo de oportunidad', true),

((SELECT id FROM modulos WHERE slug = 'eco-3'), 'comercio', 'Tipo de Cambio', 'basico', 'opcion_multiple',
'Si TC pasa de 18 MXN/USD a 16 MXN/USD, el peso se ha:',
'Depreciado', 'Apreciado', 'Devaluado', 'Mantenido igual', 'b',
'TIPO DE CAMBIO:

ANTES: 1 USD = 18 MXN
DESPUÉS: 1 USD = 16 MXN

Ahora se necesitan MENOS pesos para comprar un dólar.
El peso vale MÁS → se ha APRECIADO.

EFECTOS DE APRECIACIÓN:
• Importaciones más baratas (bueno para consumidores)
• Exportaciones menos competitivas (malo para exportadores)
• Turismo al exterior más barato
• Puede reducir inflación importada',
'Menos pesos por dólar = Peso se aprecia', true),

((SELECT id FROM modulos WHERE slug = 'eco-3'), 'balanza_pagos', 'Cuenta Corriente', 'intermedio', 'opcion_multiple',
'La cuenta corriente incluye:',
'Solo exportaciones e importaciones', 'Comercio de bienes, servicios, rentas y transferencias', 'Solo inversión extranjera', 'Solo deuda externa', 'b',
'CUENTA CORRIENTE de la Balanza de Pagos:

COMPONENTES:
1. BALANZA COMERCIAL
   • Exportaciones de bienes
   • Importaciones de bienes

2. BALANZA DE SERVICIOS
   • Turismo, transporte, seguros

3. RENTAS
   • Intereses, dividendos, salarios

4. TRANSFERENCIAS
   • Remesas, donaciones

DÉFICIT EN CUENTA CORRIENTE:
Significa que el país consume más de lo que produce.
Debe financiarse con entrada de capital (cuenta financiera).',
'CC = Bienes + Servicios + Rentas + Transferencias', true),

((SELECT id FROM modulos WHERE slug = 'eco-3'), 'internacional', 'Aranceles', 'intermedio', 'opcion_multiple',
'Un arancel a las importaciones causa:',
'Menor precio interno y más importaciones', 'Mayor precio interno y menos importaciones', 'Mayor bienestar para todos', 'Más exportaciones', 'b',
'EFECTOS DE UN ARANCEL:

1. PRECIO INTERNO SUBE
   • Precio = Precio mundial + Arancel

2. IMPORTACIONES BAJAN
   • Precio más alto → menos demanda de importación

3. PRODUCCIÓN NACIONAL SUBE
   • Productores locales pueden competir

4. BIENESTAR:
   • Productores: GANAN (precio mayor)
   • Consumidores: PIERDEN (pagan más)
   • Gobierno: GANA (recauda arancel)
   • PÉRDIDA NETA para el país (peso muerto)',
'Arancel: ↑P interno, ↓M, ↑producción local', true);

-- ============================================
-- CON-1: CONTABILIDAD - COSTOS Y NORMAS (80 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo) VALUES

((SELECT id FROM modulos WHERE slug = 'con-1'), 'postulados', 'NIF A-2', 'basico', 'opcion_multiple',
'El postulado de "Entidad Económica" establece que:',
'La empresa siempre tendrá ganancias', 'La empresa es distinta de sus dueños', 'Los estados financieros son anuales', 'Los activos se valúan a valor de mercado', 'b',
'POSTULADO DE ENTIDAD ECONÓMICA (NIF A-2):

"La entidad económica es aquella unidad identificable que realiza actividades económicas, constituida por combinaciones de recursos humanos, materiales y financieros..."

SIGNIFICA:
• La empresa tiene personalidad propia
• Es INDEPENDIENTE de sus dueños
• Sus finanzas están SEPARADAS de las finanzas personales

APLICACIÓN:
• El dueño de una tienda tiene su cuenta personal APARTE
• Las deudas de la empresa NO son automáticamente del dueño (en sociedades)
• Los estados financieros reflejan SOLO la empresa',
NULL, true),

((SELECT id FROM modulos WHERE slug = 'con-1'), 'postulados', 'NIF A-2', 'basico', 'opcion_multiple',
'El postulado de "Negocio en Marcha" supone que:',
'La empresa cerrará pronto', 'La empresa continuará operando indefinidamente', 'La empresa debe expandirse', 'La empresa tiene utilidades', 'b',
'POSTULADO DE NEGOCIO EN MARCHA (NIF A-2):

"La entidad económica se presume en existencia permanente, dentro de un horizonte de tiempo ilimitado..."

SIGNIFICA:
• Se asume que la empresa seguirá operando
• NO se espera liquidación próxima
• Los activos se valúan para USO, no para venta forzada

SI NO SE CUMPLE:
• Los activos deben valuarse a valor de liquidación
• Se debe revelar en notas
• Ejemplo: empresa en quiebra

IMPORTANCIA:
Justifica la depreciación, amortización y diferimiento de gastos.',
NULL, true),

((SELECT id FROM modulos WHERE slug = 'con-1'), 'elementos', 'Ecuación Contable', 'basico', 'opcion_multiple',
'La ecuación contable básica es:',
'Activo = Pasivo - Capital', 'Activo = Pasivo + Capital', 'Activo + Pasivo = Capital', 'Ingresos = Gastos + Utilidad', 'b',
'ECUACIÓN CONTABLE FUNDAMENTAL:

ACTIVO = PASIVO + CAPITAL

DONDE:
• ACTIVO: Lo que tiene la empresa (recursos)
• PASIVO: Lo que debe a terceros (deudas)
• CAPITAL: Lo que pertenece a los dueños

OTRA FORMA:
Capital = Activo - Pasivo

EJEMPLOS:
• Activo $100,000 = Pasivo $60,000 + Capital $40,000
• Si pido préstamo: +Activo (efectivo), +Pasivo (deuda)
• Si pago deuda: -Activo (efectivo), -Pasivo (deuda)

Siempre debe estar BALANCEADA.',
'A = P + C', true),

((SELECT id FROM modulos WHERE slug = 'con-1'), 'marco', 'Características Cualitativas', 'intermedio', 'opcion_multiple',
'¿Cuál es una característica cualitativa primaria de la información financiera según las NIF?',
'Costo histórico', 'Confiabilidad', 'Uniformidad', 'Objetividad', 'b',
'CARACTERÍSTICAS CUALITATIVAS (NIF A-4):

PRIMARIAS:
1. CONFIABILIDAD
   • Veraz, representativa, objetiva, verificable
2. RELEVANCIA
   • Útil para tomar decisiones
3. COMPRENSIBILIDAD
   • Entendible para usuarios
4. COMPARABILIDAD
   • Permite comparar entre períodos y empresas

SECUNDARIAS:
• Oportunidad (a tiempo)
• Relación costo-beneficio

La información financiera debe ser ÚTIL para la toma de decisiones.',
NULL, true);

-- ============================================
-- CON-2: FISCAL (80 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo) VALUES

((SELECT id FROM modulos WHERE slug = 'con-2'), 'isr', 'ISR Personas Morales', 'intermedio', 'opcion_multiple',
'La tasa general del ISR para personas morales en México es:',
'16%', '25%', '30%', '35%', 'c',
'IMPUESTO SOBRE LA RENTA (ISR) - PERSONAS MORALES:

TASA GENERAL: 30%

BASE GRAVABLE:
Ingresos Acumulables
- Deducciones Autorizadas
- PTU pagada
- Pérdidas fiscales de ejercicios anteriores
= Resultado Fiscal (Base)

ISR = Base × 30%

PAGOS PROVISIONALES:
Se calculan mensualmente y se acreditan contra el ISR anual.

NOTA: La tasa ha sido 30% desde 2010. Anteriormente fue hasta 35%.',
'ISR = Resultado Fiscal × 30%', true),

((SELECT id FROM modulos WHERE slug = 'con-2'), 'iva', 'Tasa General IVA', 'basico', 'opcion_multiple',
'La tasa general del IVA en México es:',
'8%', '10%', '15%', '16%', 'd',
'IMPUESTO AL VALOR AGREGADO (IVA):

TASA GENERAL: 16%

TASAS ESPECIALES:
• 0%: Alimentos, medicinas, exportaciones
• Exento: Servicios médicos, educación, renta casa-habitación

MECÁNICA:
IVA a pagar = IVA Trasladado - IVA Acreditable

• IVA Trasladado: Lo que cobras a clientes
• IVA Acreditable: Lo que pagas a proveedores

EJEMPLO:
Vendes en $1,000 + IVA = $1,160 (trasladas $160)
Compraste en $600 + IVA = $696 (acreditas $96)
IVA a pagar = $160 - $96 = $64',
'IVA a pagar = IVA Trasladado - IVA Acreditable', true),

((SELECT id FROM modulos WHERE slug = 'con-2'), 'iva', 'Acreditamiento', 'intermedio', 'opcion_multiple',
'Para que el IVA sea acreditable, el gasto debe ser:',
'Solo de activo fijo', 'Estrictamente indispensable para la actividad', 'Mayor a $2,000', 'Pagado en efectivo', 'b',
'REQUISITOS PARA ACREDITAR IVA (Art. 5 LIVA):

1. ESTRICTAMENTE INDISPENSABLE
   • Relacionado con actividades gravadas

2. TRASLADADO EXPRESAMENTE
   • Debe aparecer desglosado en el CFDI

3. EFECTIVAMENTE PAGADO
   • No basta con haberlo facturado

4. CUMPLIR REQUISITOS FORMALES
   • CFDI válido
   • RFC del proveedor correcto

SI NO CUMPLES:
El IVA NO es acreditable y se convierte en un gasto.',
NULL, true),

((SELECT id FROM modulos WHERE slug = 'con-2'), 'obligaciones', 'CFDI', 'basico', 'opcion_multiple',
'El CFDI es obligatorio para:',
'Solo ventas mayores a $10,000', 'Todas las operaciones que generen comprobante fiscal', 'Solo empresas grandes', 'Solo exportaciones', 'b',
'CFDI - Comprobante Fiscal Digital por Internet:

OBLIGATORIO PARA:
• Todas las ventas y servicios
• Todos los contribuyentes
• Cualquier monto

ELEMENTOS DEL CFDI:
• UUID (folio fiscal)
• Sello digital del SAT
• Sello del emisor
• Datos del emisor y receptor
• Conceptos, impuestos

VERSIÓN ACTUAL: 4.0

CANCELACIÓN:
Solo con aceptación del receptor (con excepciones).

Sin CFDI válido, el gasto NO es deducible y el IVA NO es acreditable.',
NULL, true);

-- ============================================
-- CON-3: AUDITORÍA (80 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo) VALUES

((SELECT id FROM modulos WHERE slug = 'con-3'), 'evidencia', 'Evidencia de Auditoría', 'basico', 'opcion_multiple',
'La evidencia de auditoría más confiable es la que:',
'Proporciona la administración verbalmente', 'Se obtiene de fuentes externas independientes', 'Está en documentos internos', 'Se basa en estimaciones', 'b',
'JERARQUÍA DE EVIDENCIA (NIA 500):

MÁS CONFIABLE:
1. Externa e independiente (confirmaciones bancarias)
2. Generada internamente con buenos controles
3. Documentos vs verbal
4. Originales vs copias

MENOS CONFIABLE:
• Documentos internos sin controles
• Declaraciones verbales de la administración
• Estimaciones

EJEMPLO:
Saldo de cuenta bancaria:
• Más confiable: Confirmación del banco
• Menos confiable: Estado de cuenta impreso por cliente',
NULL, true),

((SELECT id FROM modulos WHERE slug = 'con-3'), 'procedimientos', 'Procedimientos Sustantivos', 'intermedio', 'opcion_multiple',
'¿Cuál es un procedimiento sustantivo?',
'Evaluar el control interno', 'Confirmar saldos de clientes', 'Entrevistar al director', 'Revisar el organigrama', 'b',
'PROCEDIMIENTOS SUSTANTIVOS:

OBJETIVO: Detectar errores materiales en los estados financieros

TIPOS:
1. PRUEBAS DE DETALLE
   • Confirmaciones de saldos
   • Inspección física de inventarios
   • Revisión de documentos soporte

2. PROCEDIMIENTOS ANALÍTICOS
   • Comparar con años anteriores
   • Calcular razones financieras
   • Identificar fluctuaciones inusuales

DIFERENCIA CON PRUEBAS DE CONTROL:
• Pruebas de control: Evalúan SI los controles funcionan
• Pruebas sustantivas: Buscan ERRORES en cifras',
NULL, true),

((SELECT id FROM modulos WHERE slug = 'con-3'), 'dictamen', 'Tipos de Opinión', 'basico', 'opcion_multiple',
'Cuando los estados financieros están libres de errores materiales, el auditor emite opinión:',
'Con salvedad', 'Adversa', 'Favorable (sin modificar)', 'Abstención', 'c',
'TIPOS DE OPINIÓN DE AUDITORÍA:

1. FAVORABLE (Sin modificar):
   • Estados financieros correctos
   • Presentan razonablemente
   • "Limpia"

2. CON SALVEDAD:
   • Errores materiales pero NO generalizados
   • "Excepto por..."

3. ADVERSA (Negativa):
   • Errores materiales Y generalizados
   • Los estados financieros NO son confiables

4. ABSTENCIÓN:
   • No se pudo obtener evidencia suficiente
   • No puede opinar

La opinión sin modificar es el objetivo de toda empresa.',
NULL, true),

((SELECT id FROM modulos WHERE slug = 'con-3'), 'coso', 'Control Interno COSO', 'intermedio', 'opcion_multiple',
'¿Cuántos componentes tiene el marco COSO de control interno?',
'3', '4', '5', '7', 'c',
'COSO - CONTROL INTERNO (5 Componentes):

1. AMBIENTE DE CONTROL
   • Tono desde arriba
   • Integridad, ética

2. EVALUACIÓN DE RIESGOS
   • Identificar y analizar riesgos

3. ACTIVIDADES DE CONTROL
   • Políticas y procedimientos
   • Autorizaciones, segregación de funciones

4. INFORMACIÓN Y COMUNICACIÓN
   • Sistemas de información
   • Reportes

5. MONITOREO (Supervisión)
   • Evaluaciones continuas
   • Evaluaciones separadas

Los 5 componentes deben estar presentes y funcionando para un control interno efectivo.',
'COSO: Ambiente + Riesgos + Actividades + Info + Monitoreo', true),

((SELECT id FROM modulos WHERE slug = 'con-3'), 'riesgo_auditoria', 'Modelo de Riesgo', 'avanzado', 'opcion_multiple',
'La fórmula del riesgo de auditoría es:',
'RA = RI + RC + RD', 'RA = RI × RC × RD', 'RA = RI - RC - RD', 'RA = (RI + RC) / RD', 'b',
'MODELO DE RIESGO DE AUDITORÍA:

RA = RI × RC × RD

DONDE:
• RA: Riesgo de Auditoría (aceptable, ej: 5%)
• RI: Riesgo Inherente (naturaleza del negocio)
• RC: Riesgo de Control (fallas en controles)
• RD: Riesgo de Detección (auditor no detecta error)

EL AUDITOR CONTROLA RD:
RD = RA / (RI × RC)

Si RI y RC son altos → RD debe ser bajo → más pruebas sustantivas

EJEMPLO:
RA = 5%, RI = 80%, RC = 50%
RD = 0.05 / (0.80 × 0.50) = 0.05 / 0.40 = 12.5%',
'RA = RI × RC × RD', true);

-- ============================================
-- VERIFICACIÓN FINAL
-- ============================================

SELECT '=== PREGUNTAS AGREGADAS ===' as resultado;

SELECT
    m.icon,
    m.titulo as modulo,
    COUNT(p.id) as total_preguntas
FROM modulos m
LEFT JOIN preguntas p ON p.modulo_id = m.id AND p.activo = true
GROUP BY m.id, m.icon, m.titulo, m.numero
ORDER BY m.numero;

SELECT
    'TOTAL PREGUNTAS:' as info,
    COUNT(*) as cantidad
FROM preguntas
WHERE activo = true;

SELECT
    'DISTRIBUCIÓN POR NIVEL:' as info;

SELECT
    nivel,
    COUNT(*) as cantidad
FROM preguntas
WHERE activo = true
GROUP BY nivel
ORDER BY
    CASE nivel
        WHEN 'basico' THEN 1
        WHEN 'intermedio' THEN 2
        WHEN 'avanzado' THEN 3
    END;
