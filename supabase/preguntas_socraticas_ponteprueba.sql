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

-- ============================================================================
-- SECCIÓN 1: PIB Y CUENTAS NACIONALES (4 preguntas)
-- ============================================================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'PIB y Cuentas Nacionales',
    'Medición del PIB',
    'basico',
    'analisis',
    'Un país tiene: Consumo (C) = $500 mil millones, Inversión (I) = $120 mil millones, Gasto Público (G) = $150 mil millones, Exportaciones (X) = $80 mil millones, Importaciones (M) = $60 mil millones. Calcula el PIB usando el enfoque del gasto.',
    NULL, NULL, NULL, NULL,
    'a',
    'El PIB por el enfoque del gasto se calcula como: PIB = C + I + G + (X - M). Sustituyendo los valores: PIB = 500 + 120 + 150 + (80 - 60) = 500 + 120 + 150 + 20 = 790 mil millones. Este método suma todos los gastos finales en bienes y servicios producidos domesticamente. Nota que contamos (X - M) porque las exportaciones son producción doméstica vendida al exterior (sumamos) mientras las importaciones son producción extranjera (restamos para no contarlas como producción nuestra). El PIB de 790 mil millones representa el valor total de bienes y servicios finales producidos en un año.',
    'PIB = C + I + G + (X - M) = 500 + 120 + 150 + 20 = 790 mil millones',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'PIB y Cuentas Nacionales',
    'Medición del PIB',
    'basico',
    'analisis',
    'Método del Ingreso: Una economía tiene Salarios = $400, Ganancias = $150, Rentas = $50, Intereses = $40. Además hay depreciación = $30 e impuestos indirectos = $20. Calcula el PIB nominal.',
    NULL, NULL, NULL, NULL,
    'a',
    'El PIB por el enfoque del ingreso suma todos los ingresos de factores de producción: PIB = Salarios + Ganancias + Rentas + Intereses. Pero esta es la medida de Ingreso Nacional NETO. Para obtener PIB necesitamos sumar depreciación (bienes de capital gastados en producción) e impuestos indirectos netos de subsidios: PIB = 400 + 150 + 50 + 40 + 30 + 20 = 690. Los salarios compensan trabajo, ganancias compensan capital, rentas compensan tierra, intereses compensan uso de dinero prestado. La depreciación es parte del ingreso bruto (no neto) necesaria para mantener el stock de capital. Los impuestos indirectos son costos de producción que no van a factores.',
    'PIB = Salarios + Ganancias + Rentas + Intereses + Depreciación + Impuestos Indirectos = 400 + 150 + 50 + 40 + 30 + 20 = 690',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'PIB y Cuentas Nacionales',
    'Deflactor del PIB',
    'intermedio',
    'analisis',
    'En año 0: PIB nominal = $1000, PIB real (precios año 0) = $1000. En año 1: PIB nominal = $1200, PIB real (precios año 0) = $1100. Calcula el deflactor del PIB para año 1. ¿Cuál fue la inflación?',
    NULL, NULL, NULL, NULL,
    'a',
    'El deflactor del PIB mide cambios de precios en TODA la economía. Se calcula: Deflactor = (PIB Nominal / PIB Real) × 100. Para año 1: Deflactor = (1200 / 1100) × 100 = 1.0909 × 100 = 109.09. Esto significa precios subieron 9.09% de año 0 a año 1. Interpretación: si tuvieras $1200 en año 1, podrías comprar lo mismo que $1100 en precios de año 0 (después de ajustar por inflación). La tasa de inflación = 109.09 - 100 = 9.09% (cambio porcentual en deflactor). PIB real = 1100 significa crecimiento económico real (producción) de 10%, pero solo 9.09% fue inflación, así que el crecimiento real fue 10% / 1.0909 ≈ 9.17%.',
    'Deflactor = (PIB Nominal / PIB Real) × 100 = (1200 / 1100) × 100 = 109.09; Inflación = 9.09%',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'PIB y Cuentas Nacionales',
    'Producto Interno vs Producto Nacional',
    'intermedio',
    'analisis',
    'Un país A tiene: PIB = $5000 (producción dentro del territorio). Ciudadanos de A ganan $300 en el exterior. Extranjeros dentro de A ganan $200. Calcula el PNB (Producto Nacional Bruto) de A.',
    NULL, NULL, NULL, NULL,
    'a',
    'PNB = PIB + Ingresos de ciudadanos del exterior - Ingresos de extranjeros en el territorio. PNB = 5000 + 300 - 200 = 5100. El PNB mide PRODUCCIÓN DE NACIONALES (donde trabajen), mientras PIB mide PRODUCCIÓN DENTRO DE FRONTERA (quién lo haga). En economías globalizadas, estos son diferentes. Ejemplo: Si trabajas en el extranjero y ganas dinero, cuenta para PNB de tu país pero NO para PIB del país donde trabajas (aunque puede contar como ingreso de factor extranjero restado del PIB). Las empresas multinacionales crean esta diferencia: una fábrica estadounidense en México suma al PIB de México pero al PNB de USA solo si es propiedad de USA.',
    'PNB = PIB + Ingresos Factores Extranjero - Ingresos a Extranjeros = 5000 + 300 - 200 = 5100',
    true
);

-- ============================================================================
-- SECCIÓN 2: MODELO IS-LM (4 preguntas)
-- ============================================================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'Modelo IS-LM',
    'Equilibrio Macroeconómico',
    'intermedio',
    'analisis',
    'En el modelo IS-LM: La curva IS representa equilibrio en el mercado de bienes (Y = C + I + G). Explica qué pasa si G aumenta. ¿Cuál curva se desplaza?',
    NULL, NULL, NULL, NULL,
    'a',
    'Cuando G (Gasto Público) aumenta, el equilibrio Y = C + I + G aumenta para CUALQUIER tasa de interés r. La curva IS (no la LM) se desplaza hacia la DERECHA. En la nueva equilibrio: ingreso Y es mayor y tasa de interés r también es mayor. Este es el EFECTO DESPLAZAMIENTO: el aumento en G "desplaza" la inversión privada al subir r. A mayor ingreso, mayor demanda de dinero (a cualquier r), entonces r sube para equilibrar mercado monetario (curva LM). La combinación final depende de dónde se corten IS y LM nuevamente. Si IS se desplaza hacia derecha e intersecta LM en punto más alto y a la derecha: Y sube, r sube. El multiplicador keynesiano se reduce por el efecto desplazamiento.',
    'Gasto Público ↑ → Curva IS desplaza DERECHA → Y↑ y r↑ (debido a efecto desplazamiento)',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'Modelo IS-LM',
    'Equilibrio Macroeconómico',
    'basico',
    'analisis',
    'La curva LM representa: M/P = L(Y, r) donde M es dinero nominal, P es nivel de precios, L es demanda de dinero que depende de ingreso Y y tasa de interés r. Si el Banco Central AUMENTA la oferta de dinero M, ¿qué pasa con LM?',
    NULL, NULL, NULL, NULL,
    'a',
    'Si M aumenta (oferta monetaria aumenta), a cualquier combinación de (Y, r), ahora hay MÁS dinero disponible de lo que se demanda. En el lado izquierdo de ecuación M/P crece. Para reequilibrar, necesitamos aumentar L(Y, r). Esto puede ocurrir por: (1) aumentar Y (que aumenta demanda por dinero para transacciones), o (2) disminuir r (que aumenta demanda por dinero como activo de reserva, sustituto de bonos). Gráficamente, la curva LM se desplaza hacia la DERECHA. A cualquier Y dado, r necesita ser menor para mantener equilibrio M/P = L(Y, r). La nueva LM permite mayores combinaciones (Y, r). Cuando Banco Central aumenta M, busca bajar r para estimular inversión (política monetaria expansiva).',
    'Aumento en M → Oferta Monetaria ↑ → Curva LM desplaza DERECHA → r↓ (para cualquier Y dado)',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'Modelo IS-LM',
    'Políticas Macroeconómicas',
    'avanzado',
    'analisis',
    'En IS-LM, la pendiente de la curva IS es -1/(c + i_r) donde c = propensión marginal a consumir, i_r = sensibilidad inversión a r. Si c aumenta o i_r aumenta, ¿qué ocurre con la pendiente de IS? ¿Cuál es la implicación económica?',
    NULL, NULL, NULL, NULL,
    'a',
    'La pendiente de IS = -1/(c + i_r). Si el denominador (c + i_r) AUMENTA, el valor absoluto de la pendiente 1/(c + i_r) DISMINUYE, haciendo la curva más HORIZONTAL. Si c aumenta (más propenso a consumir) o i_r aumenta (inversión es más sensible a tasa), la economía responde más a cambios en r. Una IS más plana significa: cambios pequeños en r generan grandes cambios en Y (mercado de bienes es muy sensible a tasas). Implicación: si i_r es grande (inversión muy sensible a r), el efecto desplazamiento es mayor—una política monetaria expansiva es más efectiva en aumentar Y porque baja r y dispara I mucho. Conversamente, si c y i_r son pequeños, IS es muy pronunciada (inelástica), menos respuesta a r.',
    'Pendiente IS = -1/(c + i_r); Si c↑ o i_r↑ → |Pendiente|↓ → IS más horizontal → Y más sensible a r',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'Modelo IS-LM',
    'Trampa de Liquidez',
    'avanzado',
    'analisis',
    'La curva LM tiene pendiente positiva: ∂r/∂Y = L_Y / L_r, donde L_Y = sensibilidad demanda dinero a Y, L_r = sensibilidad demanda dinero a r. En la "Trampa de Liquidez", r = 0 (tasa cero), ¿qué implica sobre L_r? ¿Por qué es problema?',
    NULL, NULL, NULL, NULL,
    'a',
    'En la trampa de liquidez, r está en su límite inferior de cero. Cuando L_r → ∞ (demanda de dinero infinitamente sensible a r), la pendiente de LM ∂r/∂Y = L_Y / L_r → 0, haciendo LM HORIZONTAL a r=0. Interpretación: a r=0, los bonos (activos que pagan interés) son inútiles—mejor mantener dinero que no paga nada que bonos que tampoco pagan (r=0 en ambos). Cualquier cantidad de dinero se demanda ("trampa"—dinero no se convierte en inversión). PROBLEMA ECONÓMICO: El Banco Central aumenta M, pero no baja r (ya es 0) ni aumenta Y. La política monetaria es INEFECTIVA. Las empresas no invierten porque r=0 no hace bonos más atractivos; demanda agregada se estanca. Solución requiere política fiscal (desplazar IS derecha) o reforma estructural. Histórico: Japón 1990s-2000s, USA 2008-2015.',
    'Trampa Liquidez: r=0 → LM horizontal → L_r→∞ → Política monetaria inefectiva → Multiplicador fiscal ↑',
    true
);

-- ============================================================================
-- SECCIÓN 3: OFERTA Y DEMANDA AGREGADA (3 preguntas)
-- ============================================================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'Oferta y Demanda Agregada',
    'Equilibrio Macroeconómico OA-DA',
    'basico',
    'analisis',
    'La curva de Demanda Agregada (DA) tiene pendiente negativa. Explica tres razones económicas por las que un aumento en nivel de precios P reduce la cantidad demandada de bienes Y.',
    NULL, NULL, NULL, NULL,
    'a',
    'Hay tres mecanismos que explican por qué DA tiene pendiente negativa: (1) EFECTO SALDOS REALES (Efecto Pigou): Cuando P sube, los saldos monetarios reales M/P disminuyen (dinero vale menos). Personas se sienten más pobres y reducen consumo, bajando Y. (2) EFECTO TASA DE INTERÉS (Efecto Keynes): Cuando P sube, demanda de dinero para transacciones sube (necesitas más dinero para comprar). Con oferta monetaria M fija, r sube para equilibrar. Tasas más altas desalientan inversión privada, bajando Y. (3) EFECTO SUSTITUCIÓN INTERNACIONAL (Efecto Mundell-Fleming): Cuando P sube (país se encarece), exportaciones caen (menos competitivas) e importaciones suben (bienes extranjeros más baratos). Esto reduce demanda neta de bienes domésticos. Los tres canales refuerzan: P↑ → Y↓ (da la pendiente negativa de DA).',
    'DA tiene pendiente negativa por: (1) Efecto Saldos Reales, (2) Efecto Tasa Interés, (3) Efecto Sustitución Internacional',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'Oferta y Demanda Agregada',
    'Equilibrio Macroeconómico OA-DA',
    'intermedio',
    'analisis',
    'Una economía tiene shock de oferta (crisis de petróleo) que desplaza OA hacia ARRIBA-IZQUIERDA. Describe qué ocurre al equilibrio P, Y y tasa desempleo en corto plazo.',
    NULL, NULL, NULL, NULL,
    'a',
    'Un shock de oferta negativo (aumenta costos de producción) desplaza OA hacia arriba-izquierda. Con DA fija, la intersección OA-DA se mueve a un punto con: MAYOR PRECIO (P↑) y MENOR INGRESO (Y↓). Este fenómeno se llama ESTANFLACIÓN: estancamiento (Y↓) + inflación (P↑) simultáneamente. Desempleo U sube porque Y baja—menos producción requiere menos trabajadores. El dilema para hacedores de política: (1) Si responden con política monetaria/fiscal expansiva (desplazar DA derecha) para aumentar Y, empeoran inflación (P sube más). (2) Si responden con política contractiva (desplazar DA izquierda) para reducir inflación, empeoran desempleo. No hay solución fácil en corto plazo. Solo en largo plazo (cuando salarios bajan por desempleo) OA vuelve a bajar. La crisis de petróleo 1973 ilustra: OPEC restringió suministro, P petróleo se cuadriplicó, causó estanflación global.',
    'Shock OA negativo → OA sube-izquierda → Nuevo equilibrio: P↑, Y↓, U↑ (Estanflación)',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'Oferta y Demanda Agregada',
    'Expectativas y Inflación',
    'avanzado',
    'analisis',
    'En modelo OA con expectativas: OA = Y + β(P - P^e) donde P^e = inflación esperada, β = sensibilidad a sorpresas. Si el Banco Central ANUNCIA creíblemente que mantendrá inflación en 2%, ¿qué ocurre con P^e y OA?',
    NULL, NULL, NULL, NULL,
    'a',
    'Si BC anuncia creíblemente meta de 2% y tiene reputación, los agentes actualizar ESPERATIVAS: P^e = 2%. Cuando P^e baja (era quizás 5% anteriormente), la curva OA se DESPLAZA HACIA ABAJO. En cualquier nivel de precios P actual, ahora (P - P^e) es mayor (sorpresa de precios positiva). Pero más importante: si BC cumple su anuncio (política monetaria creíble), entonces P actual también será ~2%. El equilibrio baja: P↓ y Y permanece cerca de potencial Y*. IMPLICACIÓN CRUCIAL: Las expectativas importan enormemente. Banco Central sin credibilidad que anuncia 2% no funciona—agentes ignoran anuncio (P^e sigue siendo 5%). Pero Banco Central creíble (como Bundesbank o Banco Central Europeo) puede anclar expectativas y bajar inflación sin costo de desempleo grande (desinflación suave). Esto explica por qué reputación monetaria es activo valioso.',
    'BC Anuncia Crediblemente 2% → P^e = 2% → OA desplaza ABAJO → P↓ con poco costo en Y',
    true
);

-- ============================================================================
-- SECCIÓN 4: POLÍTICA FISCAL Y MONETARIA (3 preguntas)
-- ============================================================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'Política Fiscal y Monetaria',
    'Multiplicadores y Efectividad',
    'basico',
    'analisis',
    'El multiplicador fiscal simple es: m = 1 / (1 - c) donde c = propensión marginal a consumir. Si c = 0.8, calcula el multiplicador. Si gobierno aumenta G en $100, ¿cuánto aumenta Y?',
    NULL, NULL, NULL, NULL,
    'a',
    'Con c = 0.8, el multiplicador es: m = 1 / (1 - 0.8) = 1 / 0.2 = 5. Esto significa que un aumento de $100 en gasto público G genera un aumento total de Y = m × ΔG = 5 × 100 = $500. ¿CÓMO FUNCIONA?: El gobierno gasta $100 (Ronda 1). Esos $100 son ingresos para empresas/trabajadores. Con c = 0.8, ellos consumen 0.8 × 100 = $80 (Ronda 2). Esos $80 generan ingresos para otros; consumen 0.8 × 80 = $64 (Ronda 3). Y así sucesivamente: 100 + 80 + 64 + 51.2 + ... = 100/(1 - 0.8) = 500. INTUICIÓN: Si personas consumen 80% de ingreso adicional, gastan mucho, generando demanda que se convierte en ingresos nuevos, que generan consumo nuevamente. El efecto se multiplica. Si c = 0.5, multiplicador = 2 (efecto menor porque solo gastan 50%). Multiplicador es grande cuando c es grande.',
    'm = 1/(1-c) = 1/(1-0.8) = 5; Si ΔG = 100 → ΔY = m × ΔG = 5 × 100 = 500',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'Política Fiscal y Monetaria',
    'Instrumentos Monetarios',
    'intermedio',
    'analisis',
    'El Banco Central controla tres instrumentos monetarios: (1) Tasa de referencia (descuento), (2) Depósitos de Reserva Obligatoria (RRR), (3) Operaciones de Mercado Abierto (OMA). Explica cómo cada uno afecta oferta de dinero M.',
    NULL, NULL, NULL, NULL,
    'a',
    '(1) TASA DE REFERENCIA (tasa de descuento): Es la tasa que BC cobra a bancos por prestar dinero overnight. Si BC BAJA tasa de descuento, es más barato para bancos pedir dinero → los bancos piden más → oferta de dinero M AUMENTA. Si BC SUBE tasa, menos piden, M baja. Este es instrumento de señalización principal (afecta otras tasas de mercado). (2) DEPÓSITO RESERVA OBLIGATORIA (RRR): Si tengo $100 en depósito y RRR = 10%, debo mantener $10 en reserva y puedo prestar $90. Si BC REDUCE RRR a 5%, ahora presto $95 con mismo depósito. Prestando más dinero (crear depósitos nuevos), M aumenta. Si BC SUBE RRR, menos dinero se presta, M baja. (3) OPERACIONES DE MERCADO ABIERTO (OMA): BC COMPRA bonos del público (inyecta dinero a cambio de bonos) → M sube. Si BC VENDE bonos (retira dinero del público), M baja. OMA es más preciso que cambiar tasas. En 2008, BC bajó tasa a ~0%, entonces hizo OMA masiva (QE—Quantitative Easing) comprando activos para inyectar dinero.',
    '(1) Tasa Descuento ↓ → M↑; (2) RRR ↓ → M↑; (3) OMA (Compras) → M↑',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'Política Fiscal y Monetaria',
    'Efectividad Relativa',
    'avanzado',
    'analisis',
    'En una economía con alta sensibilidad inversión a tasa (i_r grande) pero baja sensibilidad demanda dinero a Y, ¿es más efectiva política monetaria o fiscal? Analiza en marco IS-LM.',
    NULL, NULL, NULL, NULL,
    'a',
    'Analicemos ambas políticas en IS-LM: (1) POLÍTICA MONETARIA (M↑): Desplaza LM derecha. Si demanda dinero insensible a Y (L_Y pequeña), la curva LM es casi VERTICAL (pequeño cambio en r equilibra mucho dinero nuevo). Cuando LM se desplaza derecha, el nuevo equilibrio tiene r mucho más bajo. Con i_r grande (inversión MUY sensible a r), esa caída de r dispara inversión mucho. El resultado: Y sube BASTANTE. Política monetaria es MUY EFECTIVA. (2) POLÍTICA FISCAL (G↑): Desplaza IS derecha. Sin embargo, el aumento en Y aumenta demanda de dinero poco (L_Y pequeña), así que r sube poco. Pero con i_r grande, incluso ese pequeño aumento en r reduce mucho la inversión (desplazamiento fuerte). El resultado: multiplicador de Y es pequeño. Política fiscal es poco EFECTIVA. CONCLUSIÓN: Con i_r grande y L_Y pequeño, POLÍTICA MONETARIA es más efectiva. Caso opuesto: si i_r pequeño (inversión insensible a r) y L_Y grande, POLÍTICA FISCAL es más efectiva.',
    'i_r grande, L_Y pequeño → LM vertical, política monetaria efectiva; i_r pequeño, L_Y grande → LM horizontal, política fiscal efectiva',
    true
);

-- ============================================================================
-- SECCIÓN 5: MODELO DE CRECIMIENTO DE SOLOW (3 preguntas)
-- ============================================================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'Modelo de Crecimiento Solow',
    'Estado Estacionario',
    'intermedio',
    'analisis',
    'En modelo Solow: dK/dt = sY - δK donde s = tasa de ahorro, δ = depreciación, Y = output, K = capital. En estado estacionario, dK/dt = 0. Si Y = K^α con α < 1, explica qué determina K en estado estacionario.',
    NULL, NULL, NULL, NULL,
    'a',
    'En estado estacionario, dK/dt = 0, entonces: sY = δK (inversión bruta = depreciación). Con Y = K^α, esto es: sK^α = δK. Dividiendo ambos lados por K (si K > 0): sK^(α-1) = δ. Despejando: K^(α-1) = δ/s, entonces K* = (δ/s)^(1/(α-1)). Estado estacionario es el nivel de capital donde lo que se ahorra exactamente iguala lo que se deprecia. INTUICIÓN: Si K es muy bajo, K^α es bajo (poco output), ahorro sY es poco, insuficiente para reponer depreciación δK. Entonces K declina aún más (no hay estado estacionario). Conforme K crece, Y crece y ahorro sY crece. Cuando sY = δK, balance se alcanza. Si s sube (más ahorro), K* sube (capital estacionario mayor). Si δ sube (más depreciación), K* baja (menos capital acumulable). La dinámica: economía converge a K* y se queda ahí si no hay cambios tecnológicos. Crecimiento termina.',
    'Estado Estacionario: sY = δK; Si Y = K^α → K* = (δ/s)^(1/(α-1)); K* ↑ si s↑ o δ↓',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'Modelo de Crecimiento Solow',
    'Regla de Oro de Acumulación',
    'intermedio',
    'analisis',
    'La Regla de Oro de Solow: Encuentra la tasa de ahorro s que MAXIMIZA el consumo per cápita en estado estacionario. Si función producción es Y = K^α L^(1-α), ¿cuál es la tasa de ahorro óptima?',
    NULL, NULL, NULL, NULL,
    'a',
    'En estado estacionario per cápita: y = k^α (dividiendo Y/L y K/L). El consumo per cápita es: c = y - δk = k^α - δk (output menos lo que se deprecia/reinvierte). Para maximizar c: dc/dk = αk^(α-1) - δ = 0. Despejando: αk^(α-1) = δ, que es el capital per cápita óptimo k*_oro. Ahora, en estado estacionario, capital crece a tasa n (población): dK/dt = nK, entonces inversión = nK + δK = (n+δ)K. Si tasa ahorro es s, entonces sY = (n+δ)K, por lo que s = (n+δ)K/Y = (n+δ)k/y = (n+δ)k/(k^α). En punto de oro: (n+δ)k^(α-1) = α (condición). La tasa de ahorro de oro es: s*_oro = (n+δ)k^α / Y. En práctica, α ≈ 0.3, n ≈ 0.02, δ ≈ 0.05, entonces optimum s ≈ 25-35%. INTUICIÓN: Poco ahorro → bajo capital, bajo consumo. Demasiado ahorro → poco consumo presente para favorecer futuro (que nunca llega porque estado estacionario no crece). La Regla de Oro balancia.',
    'Regla de Oro: dc/dk = αk^(α-1) - δ = 0 → k*_oro = (δ/(α))^(1/(1-α)); s*_oro óptima depende de α, n, δ',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'Modelo de Crecimiento Solow',
    'Cambio Tecnológico',
    'avanzado',
    'analisis',
    'En Solow con progreso tecnológico: Y = K^α (AL)^(1-α) donde A = tecnología ("eficiencia de trabajo"). Si A crece a tasa g, en estado estacionario ¿a qué tasa crece capital K? ¿Capital por trabajador (k)?',
    NULL, NULL, NULL, NULL,
    'a',
    'Con progreso tecnológico A(t) = A₀ e^(gt), la dinámica es más compleja. Pero en estado estacionario con tasa de crecimiento tecnológico constante g: El crecimiento de Y en largo plazo es g (tasa tecnológica). Capital K y trabajo L crecen para mantener proporciones. Específicamente: TASA CRECIMIENTO K en estado estacionario = n + g (donde n = crecimiento población). Capital por trabajador k = K/L crece a tasa g (tecnología). Capital por unidad de trabajo eficiente, k/(A L), es CONSTANTE en estado estacionario. IMPLICACIÓN: A largo plazo, crecimiento de PIB per cápita (Y/L) = g. Nada de política fiscal, ni ahorro marginal adicional, cambia tasa crecimiento largo plazo—solo progreso tecnológico. ESTO explica por qué países ricos (mismo g) crecen similar a largo plazo. Diferencias en s, n, δ afectan NIVEL de ingreso, no tasa crecimiento. Acumulación capital tiene rendimientos decrecientes; solo tecnología genera crecimiento perpetuo. Esto justifica énfasis en I+D, educación, innovación.',
    'Con A creciendo a g: K crece a n+g; k crece a g; Y per cápita crece a g en largo plazo',
    true
);

-- ============================================================================
-- SECCIÓN 6: INFLACIÓN Y DESEMPLEO (3 preguntas)
-- ============================================================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'Inflación y Desempleo',
    'Curva de Phillips',
    'basico',
    'analisis',
    'La Curva de Phillips Original (años 1960): π = π* - b(U - U_n) donde π = inflación, U = desempleo, U_n = desempleo natural, b = parámetro. Si desempleo baja (U < U_n), ¿qué ocurre con inflación? ¿Cuál es el tradeoff?',
    NULL, NULL, NULL, NULL,
    'a',
    'Si U < U_n (desempleo BAJO, mercado laboral APRETADO), entonces (U - U_n) < 0. Multiplicando por -b: -b(U - U_n) > 0, sumando a π*: π = π* + [positivo] > π*. Entonces π sube (inflación AUMENTA). El tradeoff Phillips: Gobiernos pueden REDUCIR desempleo PERO A COSTO de inflación mayor. Ejemplo histórico: en 1960s, gobiernos redujeron U del 6% a 4%, pero inflación subió del 1% a 5%. Los economistas creían esto era tradeoff permanente: para cada 1% reducción en U, ganabas 2-3% de inflación. PERO: en 1970s, aparecieron AMBOS desempleo ALTO e inflación ALTA (estanflación), rompiendo la curva. La explicación: expectativas importan. Phillips antigua asumía expectativas fijas. Cuando gobiernos persistentemente inflaban, expectativas π^e se ajustaban, desplazando la curva Phillips hacia arriba. Relación π vs U cambió. Lección: tradeoffs no son permanentes si basados en sorpresas; se eronan cuando se anticipan.',
    'U < U_n → -b(U - U_n) > 0 → π↑; Tradeoff Phillips: bajar U requiere aceptar π↑',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'Inflación y Desempleo',
    'Tasa Natural de Desempleo',
    'intermedio',
    'analisis',
    'La Tasa Natural de Desempleo (NAIRU): es el desempleo cuando π = π^e (inflación = inflación esperada). En mercado laboral, cuando U = U_n, ¿qué ocurre con salarios y precios?',
    NULL, NULL, NULL, NULL,
    'a',
    'En U = U_n (tasa natural): Hay suficientes trabajadores para vacantes y suficientes vacantes para trabajadores. Sin presión de demanda laboral. Los salarios crecen aproximadamente al ritmo esperado. Si π^e = 3% (esperan inflación 3%), salarios también crecen ~3% para mantener poder adquisitivo. Precios crecen ~3% (empresas actualizan precios según presión demanda esperada). Resultado: π = π^e, la economía se "autorreproduce" en nivel inflacionario esperado. DESVIACIONES: Si U < U_n (mercado laboral apretado), trabajadores demandan salarios mayores a anticipado, empujan salarios y precios arriba de π^e (π > π^e). Inflación ACELERA. Si U > U_n (mercado laboral flojo), hay desempleo—salarios caen relativamente, presión inflacionaria desaparece (π < π^e). Inflación DESACELERA. U_n NO es cero; típicamente 4-5% en economías desarrolladas. Reflejar fricción laboral: búsqueda de trabajo, retransformación, regulaciones. Estimar U_n es crucial para saber cuándo mercado está "apretado".',
    'U = U_n → π = π^e; Presión laboral ausente; Salarios crecen con inflación esperada',
    true
);

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula, activo)
VALUES (
    2,
    'Inflación y Desempleo',
    'Sacrificio Desinflacionario',
    'avanzado',
    'analisis',
    'Si economía está en π = 6%, π^e = 6% (expectativas ancladas en 6%). Banco Central decide REDUCIR inflación a 2%. ¿Qué debe hacer? ¿Cuál es el costo en desempleo? Analiza "sacrificio ratio".',
    NULL, NULL, NULL, NULL,
    'a',
    'Para reducir π de 6% a 2%, Banco Central debe generar política CONTRACTIVA: reducir dinero (M↓), subir tasas (r↑). Esto reduce demanda agregada, reduciendo presión inflacionaria. CON EXPECTATIVAS RÍGIDAS: Si π^e = 6% (trabajadores aún esperan 6%) pero BC fuerza π actual = 4% en año 1, hay sorpresa de precios: π - π^e = -2%. Esto causará desempleo U > U_n según Phillips. Trabajadores, sin empleo, aceptan salarios más bajos, reduciendo presión de costos. Gradualmente π^e se ajusta hacia abajo. Pero proceso es LENTO (expectativas pegajosas). EL COSTO: mientras π^e baja, hay años de desempleo alto. "Sacrificio Ratio" = punto-años de desempleo por 1% reducción de inflación. Empiricamente: ~2-5 puntos de desempleo por 1% de desinflación. Ejemplo: para bajar inflación de 6% a 2% (4 puntos), podrías necesitar 4 × 3 = 12 puntos-años de desempleo (ej: 4% desempleo extra por 3 años). SOLUCIÓN: Si BC es CREÍBLE (anclada expectativas), π^e cae más rápido, reduciendo sacrificio. Caso Volcker 1979-1982: BC creíble, bajó inflación de 13% a 3% con "solo" 8 puntos-años desempleo.',
    'Sacrificio Ratio: Desempleo extra necesario para reducir inflación 1%; Depende credibilidad BC',
    true
);

END;
