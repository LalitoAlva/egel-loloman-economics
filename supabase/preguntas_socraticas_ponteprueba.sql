-- ============================================================================
-- PREGUNTAS PARA MODO SOCRÁTICO - PONTE A PRUEBA
-- ============================================================================
--
-- Este archivo contiene INSERT statements para la tabla 'preguntas' con
-- problemas del método socrático para microeconomía.
--
-- Características:
-- - tipo = 'analisis' para activar modo socrático en Ponte a Prueba
-- - pregunta = Planteamiento del problema + pregunta derivada
-- - explicacion = Solución completa (primeras 150 chars como hint)
-- - formula = Fórmulas matemáticas clave
-- - respuesta_correcta = 'a' (requerido pero no usado en análisis)
-- - opciones A-D = NULL (no aplica para análisis)
--
-- Estructura por tema:
-- 1. Función de Utilidad y Utilidad Marginal (Problemas 1-10)
-- 2. Relación Marginal de Sustitución (RMS) (Problemas 11-20)
-- 3. Restricción Presupuestaria (Problema 21)
--
-- Modulo IDs:
-- - Microeconomía (eco-1): modulo_id = 1
--
-- ============================================================================

-- ============================================================================
-- SECCIÓN 1: FUNCIÓN DE UTILIDAD Y UTILIDAD MARGINAL
-- ============================================================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Función de Utilidad y Utilidad Marginal',
    'Teoría del Consumidor',
    'basico',
    'analisis',
    'Una consumidora tiene la función de utilidad U(X,Y) = 2X + 4Y. Actualmente consume X=5 unidades e Y=3 unidades. Calcula las utilidades marginales y determina qué tipo de bienes son X e Y.',
    NULL, NULL, NULL, NULL,
    'a',
    'Las utilidades marginales son constantes: UMgx = 2 y UMgy = 4. Cada unidad adicional de X da 2 unidades de utilidad, mientras Y da 4. Y es dos veces más valioso que X. Son sustitutos perfectos porque la función es lineal, lo que significa que las curvas de indiferencia son líneas rectas.',
    'UMgx = ∂U/∂X = 2; UMgy = ∂U/∂Y = 4; U(5,3) = 2(5) + 4(3) = 22',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Función de Utilidad y Utilidad Marginal',
    'Teoría del Consumidor',
    'intermedio',
    'analisis',
    'Función de utilidad: U(X,Y) = X²Y. Evalúa en el punto (X=3, Y=4) y calcula las utilidades marginales. ¿Cómo cambian con el consumo?',
    NULL, NULL, NULL, NULL,
    'a',
    'Las utilidades marginales son: UMgx = 2XY y UMgy = X². En el punto (3,4): UMgx = 2(3)(4) = 24 y UMgy = (3)² = 9. Una unidad más de X aumenta utilidad en 24 unidades; una unidad más de Y aumenta utilidad en 9 unidades. Las utilidades marginales NO son constantes—dependen del punto de consumo. UMgx depende de Y y UMgy depende de X, indicando complementariedad entre los bienes.',
    'UMgx = ∂(X²Y)/∂X = 2XY; UMgy = ∂(X²Y)/∂Y = X²; En (3,4): UMgx = 24; UMgy = 9',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Función de Utilidad y Utilidad Marginal',
    'Teoría del Consumidor',
    'intermedio',
    'analisis',
    'U(X,Y) = min{3X, 2Y}. El consumidor tiene X=4, Y=5. Calcula la utilidad actual y las utilidades marginales. ¿Qué ocurre si aumentas solo X o solo Y?',
    NULL, NULL, NULL, NULL,
    'a',
    'La utilidad actual es: U = min{3(4), 2(5)} = min{12, 10} = 10. En este punto (4,5): UMgx = 0 porque Y es el limitante (cuello de botella). UMgy > 0 porque aumentar Y aumenta utilidad. Estos son complementos perfectos tipo Leontief. El consumidor tiene exceso de X. La proporción óptima es 3X = 2Y, o X/Y = 2/3.',
    'U = min{3(4), 2(5)} = 10; UMgx = 0; UMgy > 0; Proporción óptima: 3X = 2Y',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Función de Utilidad y Utilidad Marginal',
    'Teoría del Consumidor',
    'intermedio',
    'analisis',
    'U(X,Y) = X^0.5 Y^0.5. Evalúa las utilidades marginales en el punto (16, 9). Verifica si se cumple la ley de utilidad marginal decreciente.',
    NULL, NULL, NULL, NULL,
    'a',
    'Las utilidades marginales son: UMgx = 0.5X^(-0.5)Y^0.5 = 0.5√(Y/X) y UMgy = 0.5X^0.5Y^(-0.5) = 0.5√(X/Y). En (16, 9): UMgx = 0.5√(9/16) = 0.5(3/4) = 0.375 y UMgy = 0.5√(16/9) = 0.5(4/3) = 0.667. Esta es una función Cobb-Douglas con rendimientos constantes (0.5 + 0.5 = 1). Las utilidades marginales son decrecientes: UMgx depende inversamente de X (↑X → ↓UMgx).',
    'UMgx = 0.5√(Y/X) = (1/2)√(Y/X); UMgy = 0.5√(X/Y); En (16,9): UMgx = 0.375; UMgy = 0.667',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Función de Utilidad y Utilidad Marginal',
    'Teoría del Consumidor',
    'basico',
    'analisis',
    'U(X,Y) = 5X + 3Y. Precios: Pₓ = $2, Pᵧ = $3. Calcula la utilidad por peso gastado (UMg/P) para cada bien. ¿Cuál bien da más "utilidad por peso"?',
    NULL, NULL, NULL, NULL,
    'a',
    'La utilidad por peso gastado es: UMgx/Px = 5/2 = 2.5 unidades de utilidad por dólar, y UMgy/Py = 3/3 = 1.0 unidad de utilidad por dólar. X da 2.5 unidades de utilidad por dólar, mientras Y da solo 1.0. Entonces X es mejor compra (más "bang for the buck"). Con sustitutos perfectos, gastarías TODO tu presupuesto en X. Solo comprarías Y si su precio baja o si X se agota en el mercado.',
    'UMgx/Px = 5/2 = 2.5; UMgy/Py = 3/3 = 1.0; Decisión óptima: gastar todo en X',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Función de Utilidad y Utilidad Marginal',
    'Teoría del Consumidor',
    'avanzado',
    'analisis',
    'U(X,Y) = 10X^0.6 Y^0.4. Calcula las utilidades marginales y verifica si son decrecientes verificando la segunda derivada respecto a X.',
    NULL, NULL, NULL, NULL,
    'a',
    'Las utilidades marginales son: UMgx = 10(0.6)X^(-0.4)Y^0.4 = 6X^(-0.4)Y^0.4 = 6Y^0.4/X^0.4 y UMgy = 10(0.4)X^0.6Y^(-0.6) = 4X^0.6/Y^0.6. La segunda derivada: ∂²U/∂X² = 6(-0.4)X^(-1.4)Y^0.4 = -2.4Y^0.4/X^1.4 < 0. Como es negativa, SÍ hay utilidad marginal decreciente. A medida que X aumenta, cada unidad adicional da menos utilidad. Esto explica por qué los consumidores prefieren variedad.',
    'UMgx = 6X^(-0.4)Y^0.4; UMgy = 4X^0.6Y^(-0.6); ∂²U/∂X² = -2.4Y^0.4/X^1.4 < 0',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Función de Utilidad y Utilidad Marginal',
    'Teoría del Consumidor',
    'basico',
    'analisis',
    'U(M,N) = M + N donde M = manzanas, N = naranjas. Precio manzanas = $1, naranjas = $2. ¿Son sustitutos perfectos? Si tienes $10, ¿cuál canasta de consumo es óptima?',
    NULL, NULL, NULL, NULL,
    'a',
    'SÍ son sustitutos perfectos porque la función es lineal con coeficientes iguales (1:1 tasa de sustitución). Las utilidades marginales son: UMgₘ = 1 y UMgₙ = 1. La utilidad por peso: UMgₘ/Pₘ = 1/1 = 1.0 y UMgₙ/Pₙ = 1/2 = 0.5. Las manzanas dan más utilidad por dólar. Con $10 y Pₘ=$1, comprarías 10 manzanas y 0 naranjas (utilidad = 10). Solo comprarías naranjas si su precio bajara a $1 o menos.',
    'U = M + N; UMgₘ = 1; UMgₙ = 1; Decisión óptima: 10 manzanas, 0 naranjas; Utilidad = 10',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Función de Utilidad y Utilidad Marginal',
    'Teoría del Consumidor',
    'avanzado',
    'analisis',
    'U(X,Y) = XY. Calcula la utilidad marginal ponderada: UMgₓ×X + UMgᵧ×Y. Compara con U. ¿Qué teorema se cumple?',
    NULL, NULL, NULL, NULL,
    'a',
    'Las utilidades marginales son: UMgₓ = Y y UMgᵧ = X. Multiplicando por cantidades: UMgₓ×X = Y×X = XY y UMgᵧ×Y = X×Y = XY. Sumando: UMgₓ×X + UMgᵧ×Y = XY + XY = 2XY = 2U. Esto es el Teorema de Euler para funciones homogéneas. La función U(X,Y) = XY es homogénea de grado 2 (si multiplicas (X,Y) por t, la función se multiplica por t²). Por Euler: ΣUMgᵢ×Xᵢ = n×U, donde n es el grado de homogeneidad.',
    'UMgₓ = Y; UMgᵧ = X; UMgₓ×X + UMgᵧ×Y = 2XY = 2U; Grado de homogeneidad: n=2',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Función de Utilidad y Utilidad Marginal',
    'Teoría del Consumidor',
    'basico',
    'analisis',
    'U(X,Y) = X² + Y². Calcula las utilidades marginales. ¿Dependen una de la otra? ¿Qué tipo de bienes son?',
    NULL, NULL, NULL, NULL,
    'a',
    'Las utilidades marginales son: UMgₓ = 2X y UMgᵧ = 2Y. Aquí, UMgₓ NO depende de Y y UMgᵧ NO depende de X. Los bienes son INDEPENDIENTES ADITIVAMENTE. No hay complementariedad ni sustitución. La función es aditiva separable, donde la utilidad total es la suma de utilidades independientes. Comparando con U = XY donde UMgₓ = Y (depende de Y), esta función muestra una estructura de preferencias diferente donde el valor de cada bien es completamente independiente del otro.',
    'UMgₓ = 2X; UMgᵧ = 2Y; Bienes independientes (aditivos separables)',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Función de Utilidad y Utilidad Marginal',
    'Teoría del Consumidor',
    'intermedio',
    'analisis',
    'U(X,Y) = 4√X + 2√Y. Evalúa las utilidades marginales en (X=4, Y=9). ¿Cuál utilidad marginal es mayor? ¿Son decrecientes?',
    NULL, NULL, NULL, NULL,
    'a',
    'Reescribiendo: U = 4X^0.5 + 2Y^0.5. Las utilidades marginales son: UMgₓ = 4(0.5)X^(-0.5) = 2/√X y UMgᵧ = 2(0.5)Y^(-0.5) = 1/√Y. En (4,9): UMgₓ = 2/√4 = 2/2 = 1.0 y UMgᵧ = 1/√9 = 1/3 ≈ 0.333. La utilidad marginal de X es mayor que la de Y en este punto. Ambas son decrecientes: si X aumenta de 4 a 16, UMgₓ baja de 1.0 a 2/4 = 0.5. Esto es la ley de utilidad marginal decreciente.',
    'UMgₓ = 2/√X; UMgᵧ = 1/√Y; En (4,9): UMgₓ = 1.0; UMgᵧ = 0.333',
    true
);

-- ============================================================================
-- SECCIÓN 2: RELACIÓN MARGINAL DE SUSTITUCIÓN (RMS)
-- ============================================================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Relación Marginal de Sustitución',
    'Teoría del Consumidor',
    'basico',
    'analisis',
    'U(X,Y) = 6X + 3Y. Calcula la Relación Marginal de Sustitución (RMS). ¿Es constante o variable? ¿Qué tipo de bienes son?',
    NULL, NULL, NULL, NULL,
    'a',
    'Las utilidades marginales son: UMgₓ = 6 y UMgᵧ = 3. La RMS = UMgₓ/UMgᵧ = 6/3 = 2. Esta RMS es CONSTANTE (no depende de X ni Y). Esto indica SUSTITUTOS PERFECTOS. Por cada unidad adicional de X, estás dispuesto a renunciar a 2 unidades de Y manteniendo la misma utilidad. Las curvas de indiferencia son líneas rectas. El consumidor siempre está dispuesto a cambiar en proporción 2:1.',
    'UMgₓ = 6; UMgᵧ = 3; RMS = 6/3 = 2 (constante)',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Relación Marginal de Sustitución',
    'Teoría del Consumidor',
    'intermedio',
    'analisis',
    'U(X,Y) = X^0.3 Y^0.7. Encuentra la RMS en el punto (X=10, Y=20). ¿Es constante? ¿Cómo cambia con X?',
    NULL, NULL, NULL, NULL,
    'a',
    'Para Cobb-Douglas U = X^α Y^β, existe un atajo: RMS = (α/β)(Y/X). Aquí α = 0.3 y β = 0.7, entonces RMS = (0.3/0.7)(Y/X) = (3/7)(Y/X). En (10,20): RMS = (3/7)(20/10) = (3/7)(2) = 6/7 ≈ 0.857. La RMS NO es constante—depende de la razón Y/X. Es decreciente: a más X, menor RMS. Esto refleja preferencia por diversidad. Las curvas de indiferencia son convexas al origen.',
    'RMS = (α/β)(Y/X) = (0.3/0.7)(Y/X); En (10,20): RMS = 6/7 ≈ 0.857',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Relación Marginal de Sustitución',
    'Teoría del Consumidor',
    'intermedio',
    'analisis',
    'U(X,Y) = min{2X, 5Y}. ¿Cuál es la RMS? ¿En qué puntos está definida? ¿Qué tipo de bienes son?',
    NULL, NULL, NULL, NULL,
    'a',
    'Esta es una función Leontief (complementos perfectos). Las curvas de indiferencia tienen forma de L con un ángulo recto en el "codo". En el codo (donde 2X = 5Y): la RMS es INDEFINIDA (0/0 o cambio brusco de pendiente). Si 2X > 5Y (región horizontal): UMgₓ = 0, UMgᵧ > 0, entonces RMS = 0. Si 2X < 5Y (región vertical): UMgₓ > 0, UMgᵧ = 0, entonces RMS = ∞. No hay tasa de sustitución suave. La proporción óptima es X/Y = 5/2. Ejemplo: café y azúcar (1:2).',
    'RMS = indefinida en el codo; RMS = 0 si 2X > 5Y; RMS = ∞ si 2X < 5Y; Proporción óptima: 2X = 5Y',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Relación Marginal de Sustitución',
    'Teoría del Consumidor',
    'avanzado',
    'analisis',
    'U(X,Y) = 4XY². Calcula la RMS. Demuestra que es decreciente respecto a X derivando.',
    NULL, NULL, NULL, NULL,
    'a',
    'Las utilidades marginales son: UMgₓ = 4Y² (derivando 4XY² respecto a X) y UMgᵧ = 8XY (derivando 4XY² respecto a Y). La RMS = UMgₓ/UMgᵧ = 4Y²/(8XY) = Y/(2X). Para verificar si es decreciente: ∂RMS/∂X = ∂(Y/2X)/∂X = -Y/(2X²) < 0. Como la derivada es negativa, SÍ es decreciente en X. A medida que X aumenta, RMS disminuye. Esto refleja que estás dispuesto a dar menos Y por X adicional. Curvas de indiferencia convexas al origen.',
    'UMgₓ = 4Y²; UMgᵧ = 8XY; RMS = Y/(2X); ∂RMS/∂X = -Y/(2X²) < 0',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Relación Marginal de Sustitución',
    'Teoría del Consumidor',
    'intermedio',
    'analisis',
    'U(X,Y) = (X+2)(Y+3). Calcula la RMS. ¿Cómo se compara con RMS de U = XY?',
    NULL, NULL, NULL, NULL,
    'a',
    'Usando la regla del producto: ∂[(X+2)(Y+3)]/∂X = (Y+3) y ∂[(X+2)(Y+3)]/∂Y = (X+2). Las utilidades marginales son: UMgₓ = Y+3 y UMgᵧ = X+2. La RMS = (Y+3)/(X+2). Para comparar con U = XY que tiene RMS = Y/X: aquí los términos constantes (+2, +3) desplazan la RMS. Las constantes previenen que UMg sea cero cuando X o Y es cero (representan "subsistencia mínima"). La RMS sigue siendo decreciente pero con estructura diferente.',
    'UMgₓ = Y + 3; UMgᵧ = X + 2; RMS = (Y+3)/(X+2)',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Relación Marginal de Sustitución',
    'Teoría del Consumidor',
    'intermedio',
    'analisis',
    'U = 10G^0.5 + 5T donde G = gasolina, T = transporte público. En G=4, T=10, calcula la RMS. ¿Qué tipo de función es esta?',
    NULL, NULL, NULL, NULL,
    'a',
    'Esta es una función CUASI-LINEAL de forma U = v(G) + T, donde v(G) = 10G^0.5 y el segundo bien tiene utilidad lineal. Las utilidades marginales son: UMgG = 10(0.5)G^(-0.5) = 5/√G y UMgT = 5 (constante). La RMS = (5/√G)/5 = 1/√G. En G=4: RMS = 1/√4 = 1/2 = 0.5. Esto significa por cada litro adicional de gasolina, renuncias a 0.5 viajes en transporte. G tiene utilidad marginal decreciente; T tiene utilidad marginal constante. Función típica para analizar bienes con características diferentes.',
    'UMgG = 5/√G; UMgT = 5; RMS = 1/√G; En G=4: RMS = 0.5',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Relación Marginal de Sustitución',
    'Teoría del Consumidor',
    'avanzado',
    'analisis',
    'U(X,Y) = ln(X) + ln(Y). Demuestra que RMS = Y/X. Verifica que ln(X) + ln(Y) = ln(XY).',
    NULL, NULL, NULL, NULL,
    'a',
    'La derivada de ln(X) es 1/X. Las utilidades marginales son: UMgₓ = 1/X y UMgᵧ = 1/Y. La RMS = (1/X)/(1/Y) = (1/X) × (Y/1) = Y/X. Usando la propiedad de logaritmos: ln(X) + ln(Y) = ln(XY). Por lo tanto, U = ln(X) + ln(Y) es equivalente a U = ln(XY). Esto es una transformación logarítmica (monótona) de U = XY. Ambas funciones representan idénticas preferencias y tienen la misma RMS = Y/X. Las transformaciones monótonas preservan las curvas de indiferencia y la RMS.',
    'UMgₓ = 1/X; UMgᵧ = 1/Y; RMS = Y/X; ln(X) + ln(Y) = ln(XY)',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Relación Marginal de Sustitución',
    'Teoría del Consumidor',
    'intermedio',
    'analisis',
    'U(X,Y) = X² + XY + Y². Calcula la RMS en (2,3). Evalúa en (3,2) y compara. ¿La función es simétrica?',
    NULL, NULL, NULL, NULL,
    'a',
    'Las utilidades marginales: UMgₓ = 2X + Y y UMgᵧ = X + 2Y. La RMS = (2X+Y)/(X+2Y). En (2,3): RMS = (2(2)+3)/(2+2(3)) = 7/8 = 0.875. En (3,2): RMS = (2(3)+2)/(3+2(2)) = 8/7 ≈ 1.143. Los valores son diferentes pero recíprocos (7/8 y 8/7). La función es SIMÉTRICA: U(X,Y) = X² + XY + Y² = Y² + YX + X² = U(Y,X). Verificación: U(2,3) = 4+6+9 = 19 y U(3,2) = 9+6+4 = 19 (iguales). Simetría implica que intercambiar X e Y invierte la RMS.',
    'UMgₓ = 2X + Y; UMgᵧ = X + 2Y; RMS = (2X+Y)/(X+2Y); En (2,3): RMS = 7/8; En (3,2): RMS = 8/7',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Relación Marginal de Sustitución',
    'Teoría del Consumidor',
    'basico',
    'analisis',
    'U = 2X + 3Y con Pₓ=$4, Pᵧ=$6. Calcula la RMS y la ratio de precios Pₓ/Pᵧ. ¿Son iguales? ¿Qué significa esto?',
    NULL, NULL, NULL, NULL,
    'a',
    'Las utilidades marginales: UMgₓ = 2, UMgᵧ = 3. La RMS = 2/3 ≈ 0.667. La ratio de precios: Pₓ/Pᵧ = 4/6 = 2/3 ≈ 0.667. ¡SON IGUALES! Esto es EXCEPCIONAL con sustitutos perfectos. Verificando utilidad por peso: UMgₓ/Pₓ = 2/4 = 0.5 y UMgᵧ/Pᵧ = 3/6 = 0.5 (también iguales). Cuando RMS = Pₓ/Pᵧ exactamente, el consumidor es INDIFERENTE entre los bienes. La solución NO es única: puede consumir cualquier combinación que satisfaga el presupuesto (infinitas soluciones óptimas).',
    'RMS = 2/3 = 0.667; Pₓ/Pᵧ = 4/6 = 0.667; UMgₓ/Pₓ = 0.5; UMgᵧ/Pᵧ = 0.5',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Relación Marginal de Sustitución',
    'Teoría del Consumidor',
    'basico',
    'analisis',
    'Para U(X,Y) = X^0.5 Y^0.5, si la RMS en un punto es 2, ¿cuál es el ratio Y/X en ese punto?',
    NULL, NULL, NULL, NULL,
    'a',
    'Para Cobb-Douglas U = X^α Y^β, la RMS = (α/β)(Y/X). Aquí α = 0.5, β = 0.5, entonces: RMS = (0.5/0.5)(Y/X) = 1 × (Y/X) = Y/X. Si RMS = 2, entonces Y/X = 2, o Y = 2X. Ejemplo: en el punto (5,10), RMS = 10/5 = 2. En (3,6), RMS = 6/3 = 2. Para esta función simétrica Cobb-Douglas (α = β), la RMS simplemente es Y/X. Si α ≠ β, entonces RMS = (α/β)(Y/X), agregando un factor multiplicativo.',
    'Para U = X^0.5 Y^0.5: RMS = Y/X; Si RMS = 2, entonces Y/X = 2 o Y = 2X',
    true
);

-- ============================================================================
-- SECCIÓN 3: RESTRICCIÓN PRESUPUESTARIA
-- ============================================================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    1,
    'Restricción Presupuestaria',
    'Teoría del Consumidor',
    'basico',
    'analisis',
    'Ingreso M=$120, Pₓ=$3, Pᵧ=$4. Escribe la ecuación de restricción presupuestaria y encuentra los interceptos en X e Y. ¿Cuál es la pendiente?',
    NULL, NULL, NULL, NULL,
    'a',
    'La ecuación de restricción presupuestaria es: 120 = 3X + 4Y. Puede simplificarse dividiendo entre cualquier factor común si lo hay. Intercepto en X (cuando Y=0): 120 = 3X, entonces X = 40. Intercepto en Y (cuando X=0): 120 = 4Y, entonces Y = 30. La pendiente de la línea presupuestaria es -Pₓ/Pᵧ = -3/4 = -0.75. Esto significa que por cada unidad adicional de X, renuncias a 0.75 unidades de Y (costo de oportunidad). La línea conecta (40, 0) a (0, 30).',
    'Restricción: 120 = 3X + 4Y; Intercepto X: 40; Intercepto Y: 30; Pendiente: -3/4 = -0.75',
    true
);

END;
