/**
 * BANCO DE PREGUNTAS TIPO EGEL - ECONOMÍA
 * Más de 100 preguntas intercambiables organizadas por temas
 * Niveles: Básico, Intermedio, Avanzado
 */

export const questionBank = {

    // ============================================
    // MICROECONOMÍA
    // ============================================

    microeconomia: {

        // TEMA: Teoría del Consumidor
        teoria_consumidor: [
            {
                id: 'mc-tc-001',
                nivel: 'basico',
                pregunta: 'Un consumidor tiene función de utilidad U(x,y) = x^0.5 * y^0.5, ingreso de $100, Px = $10 y Py = $5. ¿Cuántas unidades de X comprará en equilibrio?',
                opciones: {
                    a: '3 unidades',
                    b: '5 unidades',
                    c: '7 unidades',
                    d: '10 unidades'
                },
                respuesta_correcta: 'b',
                explicacion: 'Con función Cobb-Douglas U = x^a * y^b, la demanda óptima es: x* = (a/(a+b)) * (M/Px). Aquí: x* = (0.5/1) * (100/10) = 0.5 * 10 = 5 unidades.',
                tema: 'Equilibrio del Consumidor',
                formula: 'x* = (a/(a+b)) * (M/Px) para Cobb-Douglas'
            },
            {
                id: 'mc-tc-002',
                nivel: 'intermedio',
                pregunta: 'Si la Tasa Marginal de Sustitución (TMS) es 3 y la relación de precios Px/Py es 2, ¿qué debe hacer el consumidor para maximizar su utilidad?',
                opciones: {
                    a: 'Consumir más de Y y menos de X',
                    b: 'Consumir más de X y menos de Y',
                    c: 'Mantener el consumo actual, ya está en equilibrio',
                    d: 'Consumir cantidades iguales de X e Y'
                },
                respuesta_correcta: 'b',
                explicacion: 'TMS = 3 significa que valoras X tres veces más que Y. Pero en el mercado, X solo cuesta 2 veces más que Y (Px/Py = 2). Por tanto, X es "barato" relativo a tu valoración. Debes consumir MÁS X hasta que tu TMS baje a 2.',
                tema: 'Equilibrio del Consumidor',
                formula: 'Equilibrio: TMS = Px/Py'
            },
            {
                id: 'mc-tc-003',
                nivel: 'avanzado',
                pregunta: 'Un consumidor tiene preferencias cuasilineales U(x,y) = ln(x) + y. Si el precio de X baja, ¿qué efecto predomina?',
                opciones: {
                    a: 'Efecto sustitución únicamente (no hay efecto ingreso en X)',
                    b: 'Efecto ingreso únicamente',
                    c: 'Ambos efectos en igual proporción',
                    d: 'Ningún efecto (demanda inelástica)'
                },
                respuesta_correcta: 'a',
                explicacion: 'En preferencias cuasilineales, el efecto ingreso es CERO para el bien con utilidad marginal decreciente (X). Solo existe efecto sustitución. La demanda de X depende solo de los precios relativos, no del ingreso.',
                tema: 'Efectos Ingreso y Sustitución',
                formula: 'Cuasilineales: ∂x/∂M = 0 (no efecto ingreso en X)'
            },
            {
                id: 'mc-tc-004',
                nivel: 'basico',
                pregunta: '¿Cuál de las siguientes afirmaciones sobre las curvas de indiferencia es FALSA?',
                opciones: {
                    a: 'Son convexas al origen',
                    b: 'Nunca se cruzan entre sí',
                    c: 'Tienen pendiente positiva',
                    d: 'Muestran combinaciones de bienes con igual utilidad'
                },
                respuesta_correcta: 'c',
                explicacion: 'Las curvas de indiferencia tienen pendiente NEGATIVA (no positiva). Para mantener la utilidad constante, al aumentar un bien debes disminuir el otro. Una pendiente positiva violaría el supuesto de "más es mejor".',
                tema: 'Curvas de Indiferencia',
                formula: 'Pendiente CI = -TMS < 0'
            },
            {
                id: 'mc-tc-005',
                nivel: 'intermedio',
                pregunta: 'Si el ingreso de un consumidor aumenta 20% y su consumo de papas disminuye 10%, las papas son:',
                opciones: {
                    a: 'Un bien normal',
                    b: 'Un bien inferior',
                    c: 'Un bien de lujo',
                    d: 'Un bien Giffen'
                },
                respuesta_correcta: 'b',
                explicacion: 'Elasticidad ingreso = %ΔQ / %ΔM = -10% / 20% = -0.5 (negativa). Cuando la elasticidad ingreso es negativa, el bien es INFERIOR: al tener más dinero, consumes menos (cambias a bienes mejores).',
                tema: 'Clasificación de Bienes',
                formula: 'Elasticidad Ingreso < 0 → Bien Inferior'
            }
        ],

        // TEMA: Elasticidades
        elasticidades: [
            {
                id: 'mc-el-001',
                nivel: 'basico',
                pregunta: 'Si la elasticidad precio de la demanda es -2.5 y el precio aumenta 10%, ¿cuánto cambia la cantidad demandada?',
                opciones: {
                    a: 'Disminuye 25%',
                    b: 'Disminuye 4%',
                    c: 'Aumenta 25%',
                    d: 'Disminuye 2.5%'
                },
                respuesta_correcta: 'a',
                explicacion: 'EPD = %ΔQd / %ΔP. Entonces %ΔQd = EPD × %ΔP = -2.5 × 10% = -25%. La cantidad demandada DISMINUYE 25%.',
                tema: 'Elasticidad Precio',
                formula: 'EPD = (%ΔQd) / (%ΔP)'
            },
            {
                id: 'mc-el-002',
                nivel: 'intermedio',
                pregunta: 'Una empresa tiene EPD = -0.6. Si aumenta su precio 15%, ¿qué ocurre con sus ingresos totales?',
                opciones: {
                    a: 'Aumentan, porque la demanda es inelástica',
                    b: 'Disminuyen, porque la demanda es elástica',
                    c: 'Se mantienen constantes',
                    d: 'No se puede determinar sin conocer la cantidad'
                },
                respuesta_correcta: 'a',
                explicacion: '|EPD| = 0.6 < 1 (inelástica). En demanda inelástica, al subir el precio, los ingresos AUMENTAN porque la cantidad cae menos que proporcionalmente. ↑P 15% → ↓Q solo 9% (0.6×15%) → IT sube aproximadamente 5%.',
                tema: 'Elasticidad e Ingresos',
                formula: 'Inelástica (|EPD|<1): ↑P → ↑IT'
            },
            {
                id: 'mc-el-003',
                nivel: 'avanzado',
                pregunta: 'La elasticidad precio cruzada entre bien X y bien Y es +1.8. Si el precio de Y aumenta 20%, ¿qué pasa con la demanda de X?',
                opciones: {
                    a: 'Aumenta 36% (son sustitutos)',
                    b: 'Disminuye 36% (son complementarios)',
                    c: 'Aumenta 11.1% (son independientes)',
                    d: 'No cambia (elasticidad unitaria)'
                },
                respuesta_correcta: 'a',
                explicacion: 'EPCxy = +1.8 > 0, por tanto son SUSTITUTOS. %ΔQx = EPCxy × %ΔPy = 1.8 × 20% = 36%. Cuando sube el precio de Y, los consumidores CAMBIAN a X (aumenta demanda de X en 36%).',
                tema: 'Elasticidad Cruzada',
                formula: 'EPC > 0 → Sustitutos; EPC < 0 → Complementarios'
            },
            {
                id: 'mc-el-004',
                nivel: 'intermedio',
                pregunta: '¿En qué parte de la curva de demanda un monopolista NUNCA operará?',
                opciones: {
                    a: 'Zona elástica (|EPD| > 1)',
                    b: 'Zona inelástica (|EPD| < 1)',
                    c: 'Elasticidad unitaria (|EPD| = 1)',
                    d: 'Zona de demanda perfectamente inelástica'
                },
                respuesta_correcta: 'b',
                explicacion: 'En la zona inelástica, al subir precio aumentan los ingresos Y bajan los costos (menos producción). El monopolista siempre puede mejorar su beneficio subiendo el precio. Seguirá haciéndolo hasta entrar en la zona elástica donde IMg = CMg.',
                tema: 'Monopolio y Elasticidad',
                formula: 'Monopolio opera donde |EPD| > 1'
            },
            {
                id: 'mc-el-005',
                nivel: 'basico',
                pregunta: 'Si dos bienes tienen elasticidad cruzada negativa, son:',
                opciones: {
                    a: 'Bienes sustitutos',
                    b: 'Bienes complementarios',
                    c: 'Bienes independientes',
                    d: 'Bienes Giffen'
                },
                respuesta_correcta: 'b',
                explicacion: 'Elasticidad cruzada negativa significa que cuando sube el precio de uno, BAJA la demanda del otro. Se consumen juntos (café y azúcar, autos y gasolina). Son COMPLEMENTARIOS.',
                tema: 'Relación entre Bienes',
                formula: 'EPCxy < 0 → Complementarios'
            },
            {
                id: 'mc-el-006',
                nivel: 'avanzado',
                pregunta: 'Una aerolínea enfrenta EPD de ejecutivos = -0.4 y turistas = -2.2. Para maximizar ingresos, debe:',
                opciones: {
                    a: 'Cobrar más caro a ejecutivos (discriminación de precios)',
                    b: 'Cobrar más caro a turistas',
                    c: 'Cobrar el mismo precio a ambos (no discriminar)',
                    d: 'Cobrar menos a ejecutivos para capturar más volumen'
                },
                respuesta_correcta: 'a',
                explicacion: 'Los ejecutivos son INELÁSTICOS (|-0.4| < 1): no son sensibles al precio (necesitan viajar por negocios). Los turistas son ELÁSTICOS (|-2.2| > 1): muy sensibles. Cobra CARO a inelásticos (ejecutivos), barato a elásticos (turistas). Clásica discriminación de precios de 3er grado.',
                tema: 'Discriminación de Precios',
                formula: 'Cobra más al segmento menos elástico'
            }
        ],

        // TEMA: Teoría del Productor
        teoria_productor: [
            {
                id: 'mc-tp-001',
                nivel: 'basico',
                pregunta: 'Una empresa con función de producción Q = 2L^0.5 * K^0.5 tiene rendimientos a escala:',
                opciones: {
                    a: 'Decrecientes',
                    b: 'Constantes',
                    c: 'Crecientes',
                    d: 'Negativos'
                },
                respuesta_correcta: 'b',
                explicacion: 'Suma los exponentes: 0.5 + 0.5 = 1. Si multiplicas L y K por λ, Q se multiplica por λ^1 = λ. Esto define rendimientos CONSTANTES a escala. (Suma < 1 = decrecientes, Suma > 1 = crecientes).',
                tema: 'Rendimientos a Escala',
                formula: 'Q = AL^α K^β → Suma α+β = 1 → Constantes'
            },
            {
                id: 'mc-tp-002',
                nivel: 'intermedio',
                pregunta: 'Si el Producto Marginal del trabajo es 20 y el Producto Medio es 25, al contratar un trabajador más:',
                opciones: {
                    a: 'El Producto Medio aumentará',
                    b: 'El Producto Medio disminuirá',
                    c: 'El Producto Medio se mantendrá constante',
                    d: 'El Producto Total disminuirá'
                },
                respuesta_correcta: 'b',
                explicacion: 'PMg (20) < PMe (25). Cuando el marginal está por debajo del promedio, el promedio BAJA. Es como sacar 20 en un examen cuando tu promedio es 25: tu promedio cae. Ley matemática universal.',
                tema: 'Producto Marginal y Medio',
                formula: 'PMg < PMe → PMe decreciente'
            },
            {
                id: 'mc-tp-003',
                nivel: 'avanzado',
                pregunta: 'Una función de producción es homotética si:',
                opciones: {
                    a: 'La RMST depende solo del cociente K/L',
                    b: 'Tiene rendimientos constantes a escala',
                    c: 'El PMg es constante',
                    d: 'Los isocuantas son líneas rectas'
                },
                respuesta_correcta: 'a',
                explicacion: 'Homoteticidad significa que la Relación Marginal de Sustitución Técnica (RMST = PMgL/PMgK) depende ÚNICAMENTE de la proporción K/L, no de los niveles absolutos. Implica que las sendas de expansión son líneas rectas desde el origen.',
                tema: 'Homoteticidad',
                formula: 'Homotética: RMST = f(K/L)'
            },
            {
                id: 'mc-tp-004',
                nivel: 'basico',
                pregunta: '¿En qué etapa de la producción una empresa racional operará?',
                opciones: {
                    a: 'Etapa I (PMe creciente)',
                    b: 'Etapa II (PMg y PMe decrecientes pero positivos)',
                    c: 'Etapa III (PMg negativo)',
                    d: 'Cualquier etapa, depende del precio'
                },
                respuesta_correcta: 'b',
                explicacion: 'Etapa I: Factor fijo subutilizado (ineficiente). Etapa III: PMg negativo (más trabajadores REDUCEN producción, absurdo). Etapa II es la ÚNICA zona racional: PMg > 0 (cada trabajador adicional produce algo) pero decreciente (rendimientos decrecientes).',
                tema: 'Etapas de Producción',
                formula: 'Zona Racional: 0 < PMg < PMe'
            },
            {
                id: 'mc-tp-005',
                nivel: 'intermedio',
                pregunta: 'Una empresa minimiza costos cuando:',
                opciones: {
                    a: 'PMgL / PL = PMgK / PK',
                    b: 'PMgL = PMgK',
                    c: 'PL = PK',
                    d: 'RMST = 1'
                },
                respuesta_correcta: 'a',
                explicacion: 'Minimización de costos requiere que la productividad marginal por peso gastado sea IGUAL para todos los insumos. Si PMgL/PL > PMgK/PK, debes contratar más L y menos K (L es "más productivo por peso"). También expresable como RMST = PL/PK.',
                tema: 'Minimización de Costos',
                formula: 'PMgL/PL = PMgK/PK (Condición de 1er orden)'
            },
            {
                id: 'mc-tp-006',
                nivel: 'avanzado',
                pregunta: 'El multiplicador de Lagrange (λ) en el problema de maximización de producción sujeto a un presupuesto representa:',
                opciones: {
                    a: 'La productividad del gasto (cuánto aumenta Q por cada peso adicional de presupuesto)',
                    b: 'El costo marginal de producción',
                    c: 'La elasticidad de escala',
                    d: 'El producto marginal promedio'
                },
                respuesta_correcta: 'a',
                explicacion: 'λ = ∂Q/∂C mide cuántas unidades adicionales puedes producir con un peso más de presupuesto. Es la "productividad del gasto". A mayor λ, más eficiente es tu uso del presupuesto en generar output.',
                tema: 'Optimización con Lagrange',
                formula: 'λ = ∂Q/∂Presupuesto'
            }
        ],

        // TEMA: Costos de Producción
        costos: [
            {
                id: 'mc-co-001',
                nivel: 'basico',
                pregunta: 'Una empresa tiene CT(q) = 100 + 5q + 2q^2. Su costo fijo es:',
                opciones: {
                    a: '$100',
                    b: '$5',
                    c: '$2',
                    d: '$0 (no hay costos fijos)'
                },
                respuesta_correcta: 'a',
                explicacion: 'El costo fijo (CF) es el término que NO depende de q. En CT = 100 + 5q + 2q^2, el término constante es 100. Incluso si produces Q=0, pagas $100 (renta, seguros, etc.).',
                tema: 'Identificación de Costos',
                formula: 'CT = CF + CV(q) donde CF es constante'
            },
            {
                id: 'mc-co-002',
                nivel: 'intermedio',
                pregunta: 'Si CMe(q) = 10 + 2q y produces 5 unidades, ¿cuál es el Costo Total?',
                opciones: {
                    a: '$20',
                    b: '$50',
                    c: '$100',
                    d: '$60'
                },
                respuesta_correcta: 'c',
                explicacion: 'CMe = CT/q, entonces CT = CMe × q. CMe(5) = 10 + 2(5) = 20. Por tanto, CT = 20 × 5 = $100.',
                tema: 'Relación entre Costos',
                formula: 'CT = CMe × q'
            },
            {
                id: 'mc-co-003',
                nivel: 'avanzado',
                pregunta: 'El Costo Marginal corta al Costo Medio en su punto mínimo porque:',
                opciones: {
                    a: 'Cuando CMg < CMe, el promedio está bajando; cuando CMg > CMe, está subiendo',
                    b: 'Los costos fijos se minimizan en ese punto',
                    c: 'Es una consecuencia de los rendimientos constantes a escala',
                    d: 'El Producto Marginal es máximo en ese punto'
                },
                respuesta_correcta: 'a',
                explicacion: 'Es pura lógica matemática del promedio. Si el marginal (costo de la siguiente unidad) está por debajo del promedio, produce "barato" y el promedio baja. Si está por encima, produce "caro" y el promedio sube. El cambio de tendencia ocurre exactamente cuando CMg = CMe.',
                tema: 'Relación CMg y CMe',
                formula: 'dCMe/dq = 0 cuando CMg = CMe'
            },
            {
                id: 'mc-co-004',
                nivel: 'intermedio',
                pregunta: 'Una empresa debe cerrar en el corto plazo si:',
                opciones: {
                    a: 'Precio < Costo Medio Total',
                    b: 'Precio < Costo Variable Medio',
                    c: 'Precio < Costo Marginal',
                    d: 'Beneficio económico es negativo'
                },
                respuesta_correcta: 'b',
                explicacion: 'En el corto plazo, los CF ya están hundidos. Solo importa si P cubre los CVMe. Si P < CVMe, ni siquiera cubres los costos variables (salarios, materiales). Mejor cerrar temporalmente. Si P > CVMe pero P < CMe, operas con pérdidas pero cubres algo de los CF.',
                tema: 'Decisión de Cierre',
                formula: 'Cerrar si: P < CVMe (corto plazo)'
            },
            {
                id: 'mc-co-005',
                nivel: 'basico',
                pregunta: '¿Cuál es la diferencia fundamental entre el corto y el largo plazo?',
                opciones: {
                    a: 'En el corto plazo hay al menos un factor fijo; en el largo todos son variables',
                    b: 'El corto plazo dura menos de un año',
                    c: 'En el largo plazo no hay costos fijos',
                    d: 'Ambas: a y c'
                },
                respuesta_correcta: 'd',
                explicacion: 'Corto plazo: Al menos UN factor es fijo (ej. la planta). Hay CF. Largo plazo: TODOS los factores son variables, puedes cambiar TODO (tamaño de planta, ubicación). NO hay CF (todo es variable). No es cuestión de tiempo cronológico sino de flexibilidad.',
                tema: 'Corto vs Largo Plazo',
                formula: 'LP: todos los insumos son variables'
            }
        ],

        // TEMA: Estructuras de Mercado
        estructuras_mercado: [
            {
                id: 'mc-em-001',
                nivel: 'basico',
                pregunta: 'En competencia perfecta, el equilibrio de largo plazo implica:',
                opciones: {
                    a: 'P = CMg = CMe mínimo, beneficio económico = 0',
                    b: 'P > CMg, beneficios positivos',
                    c: 'P < CMe, pérdidas permanentes',
                    d: 'Barreras a la entrada altas'
                },
                respuesta_correcta: 'a',
                explicacion: 'Si hay beneficios extraordinarios (P > CMe), entran nuevas empresas → oferta aumenta → precio baja. Si hay pérdidas (P < CMe), empresas salen → oferta baja → precio sube. Equilibrio LP: P = CMe (mínimo) = CMg. Beneficio económico = 0 (solo beneficio normal).',
                tema: 'Competencia Perfecta LP',
                formula: 'Equilibrio LP: P = CMg = CMe_min, π = 0'
            },
            {
                id: 'mc-em-002',
                nivel: 'intermedio',
                pregunta: 'Un monopolista maximiza beneficios donde:',
                opciones: {
                    a: 'IMg = CMg, pero cobra P > CMg usando la curva de demanda',
                    b: 'P = CMg como en competencia perfecta',
                    c: 'IMg = P = CMg',
                    d: 'CMg es mínimo'
                },
                respuesta_correcta: 'a',
                explicacion: 'Regla universal: producir donde IMg = CMg. Pero el monopolista tiene poder de mercado: la curva de demanda tiene pendiente negativa, por tanto IMg < P. Produce donde IMg = CMg, luego usa la DEMANDA para fijar P > CMg.',
                tema: 'Maximización Monopolio',
                formula: 'IMg = CMg (producción); P > IMg (precio)'
            },
            {
                id: 'mc-em-003',
                nivel: 'avanzado',
                pregunta: 'La pérdida irrecuperable de eficiencia (deadweight loss) en monopolio se debe a:',
                opciones: {
                    a: 'Transacciones con valor social positivo (disposición a pagar > costo marginal) que NO se realizan',
                    b: 'Los altos costos fijos del monopolista',
                    c: 'La discriminación de precios',
                    d: 'Los beneficios extraordinarios del monopolio'
                },
                respuesta_correcta: 'a',
                explicacion: 'El monopolista restringe producción (Q_monopolio < Q_competencia) para subir el precio. Hay consumidores que pagarían MÁS del CMg pero MENOS del P_monopolio. Esas transacciones mutuamente beneficiosas NO ocurren. Eso es ineficiencia económica pura (DWL).',
                tema: 'Ineficiencia del Monopolio',
                formula: 'DWL = Área entre Demanda y CMg no transada'
            },
            {
                id: 'mc-em-004',
                nivel: 'intermedio',
                pregunta: 'En el modelo de Bertrand con productos homogéneos, el resultado es:',
                opciones: {
                    a: 'P = CMg (como competencia perfecta)',
                    b: 'P = Precio de monopolio',
                    c: 'P > CMg pero < monopolio (colusión tácita)',
                    d: 'Depende del número de empresas'
                },
                respuesta_correcta: 'a',
                explicacion: 'Paradoja de Bertrand: Con solo DOS empresas compitiendo en PRECIOS (productos homogéneos), el resultado es P = CMg (competencia perfecta). Cada empresa tiene incentivo a bajar precio ligeramente para capturar TODO el mercado. Se undercutean hasta P = CMg. Beneficios = 0.',
                tema: 'Modelo de Bertrand',
                formula: 'Bertrand + Homogéneos → P = CMg'
            },
            {
                id: 'mc-em-005',
                nivel: 'avanzado',
                pregunta: 'En competencia monopolística, el equilibrio de largo plazo tiene:',
                opciones: {
                    a: 'P > CMg, beneficio económico = 0, exceso de capacidad',
                    b: 'P = CMg, beneficio económico = 0',
                    c: 'P > CMg, beneficios positivos permanentes',
                    d: 'P < CMe, pérdidas permanentes'
                },
                respuesta_correcta: 'a',
                explicacion: 'Similar a monopolio: P > CMg (poder de mercado por diferenciación). Pero como hay libre entrada (similar a CP), beneficios extraordinarios atraen competencia hasta que π = 0. Tangencia: P = CMe pero P > CMg. Produce menos del CMe mínimo (exceso de capacidad).',
                tema: 'Competencia Monopolística',
                formula: 'CM-LP: P = CMe > CMg, exceso capacidad'
            }
        ],

        // TEMA: Teoría de Juegos
        teoria_juegos: [
            {
                id: 'mc-tj-001',
                nivel: 'basico',
                pregunta: 'En el siguiente juego, ¿cuál es el Equilibrio de Nash?\n\n        Jugador 2: Izq  Der\nJugador 1: \nArriba        (3,3)  (0,5)\nAbajo         (5,0)  (1,1)',
                opciones: {
                    a: '(Arriba, Izquierda) con payoff (3,3)',
                    b: '(Abajo, Derecha) con payoff (1,1)',
                    c: '(Arriba, Derecha) con payoff (0,5)',
                    d: 'No hay equilibrio de Nash'
                },
                respuesta_correcta: 'b',
                explicacion: 'Equilibrio de Nash: ninguno puede mejorar unilateralmente. En (Abajo,Derecha): Si J1 cambia a Arriba, baja de 1 a 0. Si J2 cambia a Izquierda, baja de 1 a 0. Nadie mejora. Es estable. (3,3) NO es equilibrio: cada uno querría traicionar para ganar 5.',
                tema: 'Equilibrio de Nash',
                formula: 'Nash: Mejor respuesta mutua'
            },
            {
                id: 'mc-tj-002',
                nivel: 'intermedio',
                pregunta: '¿Qué es una estrategia dominante?',
                opciones: {
                    a: 'La mejor estrategia independientemente de lo que haga el rival',
                    b: 'La estrategia que siempre gana',
                    c: 'La estrategia con mayor payoff en el equilibrio de Nash',
                    d: 'La estrategia que el líder elige en Stackelberg'
                },
                respuesta_correcta: 'a',
                explicacion: 'Estrategia dominante: Tu mejor opción SIN IMPORTAR lo que haga el otro jugador. Ejemplo: "Traicionar" en el Dilema del Prisionero. Sea que el otro coopere o traicione, TÚ siempre estás mejor traicionando. Es raro que exista.',
                tema: 'Estrategia Dominante',
                formula: 'u(D, s_{-i}) > u(s_i, s_{-i}) ∀ s_i, s_{-i}'
            },
            {
                id: 'mc-tj-003',
                nivel: 'avanzado',
                pregunta: 'El Dilema del Prisionero muestra que:',
                opciones: {
                    a: 'El equilibrio de Nash puede ser Pareto-ineficiente',
                    b: 'La cooperación siempre es racional',
                    c: 'No existe equilibrio de Nash en juegos simultáneos',
                    d: 'El jugador con más información siempre gana'
                },
                respuesta_correcta: 'a',
                explicacion: 'En el Dilema del Prisionero, (Traicionar, Traicionar) es el Equilibrio de Nash, pero ambos estarían MEJOR en (Cooperar, Cooperar). El equilibrio es Pareto-ineficiente: existe otro resultado que mejoraría a ambos. Muestra que racionalidad individual ≠ óptimo colectivo.',
                tema: 'Dilema del Prisionero',
                formula: 'Nash puede ser subóptimo socialmente'
            },
            {
                id: 'mc-tj-004',
                nivel: 'intermedio',
                pregunta: 'En el modelo de Cournot, las empresas compiten en:',
                opciones: {
                    a: 'Cantidades simultáneamente',
                    b: 'Precios simultáneamente',
                    c: 'Cantidades secuencialmente',
                    d: 'Publicidad'
                },
                respuesta_correcta: 'a',
                explicacion: 'Cournot: Competencia en CANTIDADES. Cada empresa elige cuánto producir SIMULTÁNEAMENTE. El precio se determina por la demanda del mercado. Resultado: Q_Cournot > Q_Monopolio pero < Q_Competencia. P_Cournot intermedio.',
                tema: 'Modelo de Cournot',
                formula: 'Cournot: Competencia en q simultánea'
            },
            {
                id: 'mc-tj-005',
                nivel: 'avanzado',
                pregunta: 'En el modelo de Stackelberg, el líder tiene ventaja porque:',
                opciones: {
                    a: 'Se compromete primero, lo que influye en la decisión del seguidor (credibilidad)',
                    b: 'Produce más barato que el seguidor',
                    c: 'Puede cobrar precios más altos',
                    d: 'No enfrenta competencia'
                },
                respuesta_correcta: 'a',
                explicacion: 'Ventaja del primer movedor: Al producir PRIMERO, el líder se "compromete" a una cantidad. El seguidor observa y elige su mejor respuesta. El líder anticipa esto y elige la cantidad óptima considerando la reacción del seguidor. Gana más que en Cournot simultáneo.',
                tema: 'Modelo de Stackelberg',
                formula: 'Stackelberg: Líder mueve primero (ventaja)'
            }
        ]
    },

    // ============================================
    // MACROECONOMÍA
    // ============================================

    macroeconomia: {

        // TEMA: PIB y Contabilidad Nacional
        pib_contabilidad: [
            {
                id: 'ma-pib-001',
                nivel: 'basico',
                pregunta: 'El PIB mide:',
                opciones: {
                    a: 'El valor de mercado de todos los bienes y servicios finales producidos en un país durante un año',
                    b: 'El ingreso total de todos los residentes de un país',
                    c: 'La riqueza total de un país',
                    d: 'Solo los bienes físicos producidos (no servicios)'
                },
                respuesta_correcta: 'a',
                explicacion: 'PIB = valor de mercado de bienes y servicios FINALES (no intermedios para evitar doble conteo) producidos DENTRO del país (no importa nacionalidad del productor) en un PERIODO determinado (flujo, no stock).',
                tema: 'Definición de PIB',
                formula: 'PIB = Valor bienes finales en periodo t'
            },
            {
                id: 'ma-pib-002',
                nivel: 'intermedio',
                pregunta: 'PIB Nominal = $10,000, Deflactor del PIB = 125 (base 100). ¿Cuál es el PIB Real?',
                opciones: {
                    a: '$8,000',
                    b: '$10,000',
                    c: '$12,500',
                    d: '$7,500'
                },
                respuesta_correcta: 'a',
                explicacion: 'PIB Real = (PIB Nominal / Deflactor) × 100 = (10,000 / 125) × 100 = $8,000. El deflactor de 125 indica que los precios subieron 25% desde el año base. Al deflactar, eliminamos ese efecto inflacionario.',
                tema: 'PIB Real vs Nominal',
                formula: 'PIB Real = (PIB Nominal / Deflactor) × 100'
            },
            {
                id: 'ma-pib-003',
                nivel: 'basico',
                pregunta: '¿Cuál de las siguientes transacciones SÍ cuenta en el PIB de este año?',
                opciones: {
                    a: 'La compra de un auto nuevo 2025',
                    b: 'La compra de un auto usado 2020',
                    c: 'La compra de acciones de Tesla en la Bolsa',
                    d: 'El pago de pensión de un jubilado'
                },
                respuesta_correcta: 'a',
                explicacion: 'Solo el auto NUEVO cuenta (producción corriente). El auto usado ya se contó en 2020. Las acciones son activos financieros, no producción (solo cuenta la comisión del broker). La pensión es transferencia, no producción.',
                tema: 'Qué cuenta en PIB',
                formula: 'PIB = Solo producción corriente'
            },
            {
                id: 'ma-pib-004',
                nivel: 'avanzado',
                pregunta: 'Si el PIB Nominal creció 10% pero el PIB Real solo creció 4%, la inflación aproximada fue:',
                opciones: {
                    a: '6%',
                    b: '14%',
                    c: '2.5%',
                    d: '10%'
                },
                respuesta_correcta: 'a',
                explicacion: 'Aproximación: %ΔPIB Nominal ≈ %ΔPIB Real + Inflación. Entonces: 10% ≈ 4% + Inflación. Inflación ≈ 6%. Es la "Ecuación de Fisher" para el PIB. El crecimiento nominal se descompone en real + precios.',
                tema: 'Descomposición Nominal/Real',
                formula: '%ΔNominal ≈ %ΔReal + %ΔPrecios'
            },
            {
                id: 'ma-pib-005',
                nivel: 'intermedio',
                pregunta: 'En el enfoque del GASTO, PIB =',
                opciones: {
                    a: 'C + I + G + (X - M)',
                    b: 'C + S + T',
                    c: 'Salarios + Rentas + Intereses + Beneficios',
                    d: 'Suma del valor agregado de cada industria'
                },
                respuesta_correcta: 'a',
                explicacion: 'Enfoque del Gasto: suma de todos los gastos finales. C = Consumo privado, I = Inversión bruta, G = Gasto gubernamental, (X-M) = Exportaciones netas. Es la identidad fundamental de la Contabilidad Nacional.',
                tema: 'Identidad del Gasto',
                formula: 'PIB = C + I + G + (X - M)'
            },
            {
                id: 'ma-pib-006',
                nivel: 'avanzado',
                pregunta: '¿Cuál es la diferencia entre PIB y PNB (PNI)?',
                opciones: {
                    a: 'PIB es producción dentro del territorio; PNB es ingreso de los nacionales (incluye RFN)',
                    b: 'PIB incluye depreciación; PNB no',
                    c: 'PIB es nominal; PNB es real',
                    d: 'No hay diferencia, son sinónimos'
                },
                respuesta_correcta: 'a',
                explicacion: 'PIB = Producción DENTRO del país (sin importar nacionalidad). PNB (Ingreso Nacional Bruto) = Ingreso de NACIONALES (dentro y fuera del país). PNB = PIB + Renta de Factores del exterior Netos (RFN). Si trabajas en USA pero eres mexicano, cuentas en PNB de México pero PIB de USA.',
                tema: 'PIB vs PNB',
                formula: 'PNB = PIB + RFN (Renta Factores Netos)'
            }
        ],

        // TEMA: Modelo IS-LM
        modelo_islm: [
            {
                id: 'ma-is-001',
                nivel: 'basico',
                pregunta: 'La curva IS tiene pendiente negativa porque:',
                opciones: {
                    a: 'Mayor tasa de interés → Menor inversión → Menor producción',
                    b: 'Mayor tasa de interés → Mayor ahorro → Mayor producción',
                    c: 'Mayor producción → Menor consumo',
                    d: 'La curva IS tiene pendiente positiva, no negativa'
                },
                respuesta_correcta: 'a',
                explicacion: 'IS = equilibrio en mercado de BIENES. Cuando sube i (tasa de interés), la inversión (I) cae (más caro pedir préstamos). Menor I → Menor Demanda Agregada → Menor Y (producción). Relación inversa entre i e Y.',
                tema: 'Pendiente de IS',
                formula: 'IS: ↑i → ↓I → ↓Y (pendiente negativa)'
            },
            {
                id: 'ma-is-002',
                nivel: 'intermedio',
                pregunta: 'Una política fiscal EXPANSIVA (↑G) desplaza la curva IS:',
                opciones: {
                    a: 'A la derecha, aumentando Y e i',
                    b: 'A la izquierda, reduciendo Y e i',
                    c: 'No afecta IS, solo LM',
                    d: 'A la derecha, aumentando Y pero reduciendo i'
                },
                respuesta_correcta: 'a',
                explicacion: '↑G → ↑Demanda Agregada → IS se desplaza a la DERECHA. Nuevo equilibrio: Y más alto (↑producción) pero i también sube (efecto crowding-out: el gobierno compite por fondos prestables). Es el dilema de la política fiscal.',
                tema: 'Desplazamiento de IS',
                formula: '↑G → IS derecha → ↑Y, ↑i'
            },
            {
                id: 'ma-is-003',
                nivel: 'basico',
                pregunta: 'La curva LM tiene pendiente positiva porque:',
                opciones: {
                    a: 'Mayor producción → Mayor demanda de dinero → Mayor tasa de interés',
                    b: 'Mayor tasa de interés → Mayor producción',
                    c: 'Mayor oferta monetaria → Mayor producción',
                    d: 'La curva LM es horizontal'
                },
                respuesta_correcta: 'a',
                explicacion: 'LM = equilibrio en mercado de DINERO. Cuando sube Y (producción), la gente necesita más dinero para transacciones. Con oferta monetaria fija (M/P constante), mayor demanda de dinero → sube i. Relación directa entre Y e i.',
                tema: 'Pendiente de LM',
                formula: 'LM: ↑Y → ↑L(demanda dinero) → ↑i'
            },
            {
                id: 'ma-is-004',
                nivel: 'avanzado',
                pregunta: '¿Qué es el efecto "crowding-out"?',
                opciones: {
                    a: 'El gasto público aumenta la tasa de interés, desplazando inversión privada',
                    b: 'La política monetaria anula la política fiscal',
                    c: 'El consumo privado sustituye al gasto público',
                    d: 'Las exportaciones caen cuando sube el gasto público'
                },
                respuesta_correcta: 'a',
                explicacion: 'Cuando el gobierno aumenta G (política fiscal), compite por fondos → tasa de interés sube (IS derecha). La i alta DESALIENTA inversión privada (I cae). El efecto neto en Y es menor que el multiplicador puro. El gasto público "desplaza" (crowds out) inversión privada.',
                tema: 'Crowding-Out',
                formula: '↑G → ↑i → ↓I (inversión privada)'
            },
            {
                id: 'ma-is-005',
                nivel: 'intermedio',
                pregunta: 'Una política monetaria EXPANSIVA (↑M) desplaza la curva LM:',
                opciones: {
                    a: 'A la derecha, aumentando Y y reduciendo i',
                    b: 'A la izquierda, reduciendo Y y aumentando i',
                    c: 'No afecta LM, solo IS',
                    d: 'A la derecha, aumentando tanto Y como i'
                },
                respuesta_correcta: 'a',
                explicacion: '↑M (oferta monetaria) → LM se desplaza a la DERECHA. Con más dinero disponible, para cualquier nivel de Y, la tasa i es MENOR. Nuevo equilibrio: Y más alto, i más bajo. Estimula economía sin crowding-out (de hecho, incentiva inversión).',
                tema: 'Desplazamiento de LM',
                formula: '↑M → LM derecha → ↑Y, ↓i'
            },
            {
                id: 'ma-is-006',
                nivel: 'avanzado',
                pregunta: 'La Trampa de Liquidez ocurre cuando:',
                opciones: {
                    a: 'i ≈ 0, la LM es horizontal, política monetaria inefectiva',
                    b: 'El multiplicador fiscal es cero',
                    c: 'IS y LM no se intersectan',
                    d: 'La inflación es muy alta'
                },
                respuesta_correcta: 'a',
                explicacion: 'Cuando i está cerca de CERO, la gente es indiferente entre bonos y dinero (ambos rinden ~0). Aumentar M no baja más la tasa. LM horizontal. La política monetaria "pierde tracción". Solo queda política fiscal. Caso: Japón años 90, USA 2008-2015.',
                tema: 'Trampa de Liquidez',
                formula: 'Trampa: i→0, LM horizontal, ΔM→0 efecto'
            }
        ],

        // TEMA: Mundell-Fleming
        mundell_fleming: [
            {
                id: 'ma-mf-001',
                nivel: 'basico',
                pregunta: 'La "Trinidad Imposible" establece que NO puedes tener simultáneamente:',
                opciones: {
                    a: 'Tipo de cambio fijo, libre movilidad de capitales, y política monetaria independiente',
                    b: 'Inflación baja, desempleo bajo, y crecimiento alto',
                    c: 'Déficit fiscal, déficit comercial, y déficit de cuenta corriente',
                    d: 'Política fiscal, política monetaria, y política comercial'
                },
                respuesta_correcta: 'a',
                explicacion: 'Solo puedes elegir DOS de los tres. Ejemplo: Si fijas tipo de cambio Y permites capitales libres, NO puedes tener política monetaria independiente (cualquier cambio en i provoca flujo de capitales que te obliga a defender el tipo de cambio).',
                tema: 'Trinidad Imposible',
                formula: 'Elige 2 de 3: Tipo fijo, Capitales libres, Política monetaria'
            },
            {
                id: 'ma-mf-002',
                nivel: 'intermedio',
                pregunta: 'Con tipo de cambio FIJO y libre movilidad de capitales, una política monetaria EXPANSIVA:',
                opciones: {
                    a: 'Es INEFECTIVA (se auto-destruye)',
                    b: 'Es muy efectiva para aumentar Y',
                    c: 'Deprecia la moneda permanentemente',
                    d: 'Solo afecta la inflación, no Y'
                },
                respuesta_correcta: 'a',
                explicacion: 'Intentas expandir M → i baja → capitales SALEN (buscan mayor rendimiento afuera) → presión a depreciar → Banco Central VENDE divisas y COMPRA moneda local (defendiendo tipo fijo) → M regresa a su nivel original. ¡La política monetaria se anula sola!',
                tema: 'Política Monetaria con Tipo Fijo',
                formula: 'Tipo fijo + Capitales libres → PM inefectiva'
            },
            {
                id: 'ma-mf-003',
                nivel: 'avanzado',
                pregunta: 'Con tipo de cambio FLEXIBLE y libre movilidad de capitales, una política fiscal EXPANSIVA:',
                opciones: {
                    a: 'Es INEFECTIVA (apreciación anula el efecto)',
                    b: 'Es muy efectiva (mayor que en economía cerrada)',
                    c: 'Deprecia la moneda permanentemente',
                    d: 'Solo afecta el sector externo'
                },
                respuesta_correcta: 'a',
                explicacion: '↑G → IS derecha → i sube → ENTRAN capitales (buscan mayor i) → APRECIA moneda → Exportaciones caen, Importaciones suben → (X-M) cae → IS regresa casi a su lugar original. El efecto en Y es NULO. La apreciación "anula" la política fiscal.',
                tema: 'Política Fiscal con Tipo Flexible',
                formula: 'Tipo flexible + Capitales libres → PF inefectiva'
            },
            {
                id: 'ma-mf-004',
                nivel: 'intermedio',
                pregunta: '¿Qué combinación de la Trinidad Imposible tiene actualmente México?',
                opciones: {
                    a: 'Tipo de cambio flexible + Libre movilidad de capitales = Política monetaria independiente',
                    b: 'Tipo de cambio fijo + Política monetaria independiente = Sin movilidad de capitales',
                    c: 'Tipo fijo + Capitales libres = Sin política monetaria',
                    d: 'México no participa en la Trinidad Imposible'
                },
                respuesta_correcta: 'a',
                explicacion: 'México (desde 1994): Tipo de cambio FLOTANTE (flexible) + Capitales LIBRES = Política Monetaria INDEPENDIENTE. Banxico puede subir/bajar tasas sin preocuparse por defender un tipo de cambio. El peso sube o baja libremente.',
                tema: 'Caso México',
                formula: 'MX: Tipo flexible + K libre → PM independiente'
            },
            {
                id: 'ma-mf-005',
                nivel: 'avanzado',
                pregunta: '¿Qué combinación de la Trinidad tiene China?',
                opciones: {
                    a: 'Tipo de cambio controlado + Política monetaria independiente = Controles de capital',
                    b: 'Tipo flexible + Capitales libres + PM independiente (tiene las 3)',
                    c: 'Tipo fijo + Capitales libres = Sin PM',
                    d: 'China no tiene sistema monetario definido'
                },
                respuesta_correcta: 'a',
                explicacion: 'China CONTROLA su tipo de cambio (managed float) + quiere Política Monetaria INDEPENDIENTE = debe restringir movilidad de capitales. Por eso tiene estrictos CONTROLES DE CAPITAL (no puedes sacar dinero fácilmente del país). Estrategia opuesta a México.',
                tema: 'Caso China',
                formula: 'China: Tipo controlado + PM → Controles K'
            }
        ],

        // TEMA: Oferta y Demanda Agregada
        oferta_demanda_agregada: [
            {
                id: 'ma-oda-001',
                nivel: 'basico',
                pregunta: 'La curva de Demanda Agregada (DA) tiene pendiente negativa por el efecto:',
                opciones: {
                    a: 'Riqueza, tasa de interés y tipo de cambio',
                    b: 'Ingreso y sustitución',
                    c: 'Crowding-out',
                    d: 'Multiplicador'
                },
                respuesta_correcta: 'a',
                explicacion: 'Cuando baja P (nivel de precios): (1) Efecto riqueza: saldos reales M/P suben, gente se siente más rica, consume más. (2) Efecto i: menor P → menor demanda dinero → i baja → I sube. (3) Efecto tipo cambio: i baja → moneda deprecia → X sube. Los tres aumentan la cantidad demandada.',
                tema: 'Pendiente de DA',
                formula: '↓P → ↑M/P, ↓i, ↓TC → ↑(C+I+X)'
            },
            {
                id: 'ma-oda-002',
                nivel: 'intermedio',
                pregunta: 'Un aumento en el gasto público desplaza:',
                opciones: {
                    a: 'La DA a la derecha',
                    b: 'La DA a la izquierda',
                    c: 'La OA a la derecha',
                    d: 'Ni DA ni OA (solo afecta IS-LM)'
                },
                respuesta_correcta: 'a',
                explicacion: '↑G → ↑Demanda Agregada (es un componente de DA = C+I+G+X-M). La curva DA se desplaza a la derecha. Para cualquier nivel de precios P, ahora se demanda más producción Y. Efecto: ↑Y, ↑P (si OA tiene pendiente positiva).',
                tema: 'Desplazamiento de DA',
                formula: '↑G → DA derecha → ↑Y, ↑P'
            },
            {
                id: 'ma-oda-003',
                nivel: 'basico',
                pregunta: 'La curva de Oferta Agregada de CORTO PLAZO (OACP):',
                opciones: {
                    a: 'Tiene pendiente positiva (precios y salarios parcialmente rígidos)',
                    b: 'Es vertical (pleno empleo)',
                    c: 'Es horizontal (precios fijos)',
                    d: 'Tiene pendiente negativa'
                },
                respuesta_correcta: 'a',
                explicacion: 'En el CORTO plazo, salarios y algunos precios son RÍGIDOS (contratos, menús). Cuando sube P (nivel de precios general), los costos NO suben proporcionalmente (salarios fijos). Las empresas tienen incentivo a producir más (mayor margen). OACP con pendiente positiva.',
                tema: 'Pendiente de OACP',
                formula: 'OACP: ↑P → ↑Y (CP, salarios rígidos)'
            },
            {
                id: 'ma-oda-004',
                nivel: 'avanzado',
                pregunta: 'La curva de Oferta Agregada de LARGO PLAZO (OALP) es vertical porque:',
                opciones: {
                    a: 'En el largo plazo, todos los precios y salarios se ajustan, Y = Y* (pleno empleo)',
                    b: 'La tecnología es fija en el largo plazo',
                    c: 'La demanda agregada no afecta la oferta',
                    d: 'Los costos son constantes'
                },
                respuesta_correcta: 'a',
                explicacion: 'En el LARGO plazo, salarios y precios son FLEXIBLES. Si sube P, los salarios también suben proporcionalmente. No hay incentivo a producir más. La producción está en su nivel NATURAL (Y*), determinado por tecnología, capital y trabajo disponible. Cambios en DA solo afectan P, no Y.',
                tema: 'Pendiente de OALP',
                formula: 'OALP: Vertical en Y* (pleno empleo)'
            },
            {
                id: 'ma-oda-005',
                nivel: 'intermedio',
                pregunta: 'Un shock de oferta NEGATIVO (ej. aumento del petróleo):',
                opciones: {
                    a: 'Desplaza OACP a la izquierda, aumentando P y reduciendo Y (estanflación)',
                    b: 'Desplaza DA a la izquierda, reduciendo P e Y',
                    c: 'Desplaza OALP a la derecha',
                    d: 'No afecta el equilibrio macroeconómico'
                },
                respuesta_correcta: 'a',
                explicacion: 'Shock de oferta negativo (↑costos producción) → OACP a la IZQUIERDA. Para cualquier P, las empresas producen MENOS (es más caro). Resultado: P sube (inflación) Y Y cae (recesión). ESTANFLACIÓN: lo peor de ambos mundos. Caso: Crisis petrolera 1973.',
                tema: 'Shock de Oferta',
                formula: 'Shock OA negativo → ↑P, ↓Y (estanflación)'
            }
        ],

        // TEMA: Inflación y Phillips
        inflacion_phillips: [
            {
                id: 'ma-ip-001',
                nivel: 'basico',
                pregunta: 'La Curva de Phillips de CORTO plazo muestra:',
                opciones: {
                    a: 'Relación inversa entre inflación y desempleo',
                    b: 'Relación directa entre inflación y desempleo',
                    c: 'Relación entre salarios y productividad',
                    d: 'Relación entre PIB e inflación'
                },
                respuesta_correcta: 'a',
                explicacion: 'Phillips (CP): trade-off temporal. Cuando BAJAS desempleo (contratas más gente), los salarios SUBEN (escasez laboral) → costos suben → inflación sube. Cuando SUBES desempleo (despides), salarios caen → inflación baja. Relación INVERSA en el corto plazo.',
                tema: 'Phillips Corto Plazo',
                formula: 'Phillips CP: ↓u → ↑π (trade-off temporal)'
            },
            {
                id: 'ma-ip-002',
                nivel: 'intermedio',
                pregunta: '¿Por qué la Curva de Phillips de LARGO plazo es vertical?',
                opciones: {
                    a: 'Porque las expectativas de inflación se ajustan (no hay trade-off permanente)',
                    b: 'Porque la inflación es siempre constante',
                    c: 'Porque el desempleo no afecta los salarios',
                    d: 'La Curva de Phillips de largo plazo NO es vertical'
                },
                respuesta_correcta: 'a',
                explicacion: 'En el LARGO plazo, la gente ajusta sus expectativas. Si intentas mantener u bajo con inflación, la gente ANTICIPA la inflación futura y la incorpora en contratos salariales. Al final, vuelves a la tasa natural de desempleo (NAIRU) pero con MAYOR inflación. No hay trade-off permanente. Phillips LP = vertical.',
                tema: 'Phillips Largo Plazo',
                formula: 'Phillips LP: Vertical en u* (NAIRU)'
            },
            {
                id: 'ma-ip-003',
                nivel: 'avanzado',
                pregunta: '¿Qué es la NAIRU?',
                opciones: {
                    a: 'Tasa de desempleo que no acelera la inflación (tasa natural)',
                    b: 'Nivel de inflación objetivo del banco central',
                    c: 'Tasa de interés neutral',
                    d: 'Nivel de PIB potencial'
                },
                respuesta_correcta: 'a',
                explicacion: 'NAIRU = Non-Accelerating Inflation Rate of Unemployment. Es la tasa de desempleo NATURAL o estructural. Si intentas bajar u por debajo de NAIRU, la inflación se ACELERA (no solo sube, sino que sube cada vez más rápido). Es el punto donde Phillips LP es vertical.',
                tema: 'NAIRU',
                formula: 'u < NAIRU → π acelerándose'
            },
            {
                id: 'ma-ip-004',
                nivel: 'intermedio',
                pregunta: 'La estanflación (inflación alta + desempleo alto) se explica por:',
                opciones: {
                    a: 'Un shock de oferta negativo (ej. petróleo 1973)',
                    b: 'Exceso de demanda agregada',
                    c: 'Política monetaria muy expansiva',
                    d: 'Trade-off de Phillips'
                },
                respuesta_correcta: 'a',
                explicacion: 'Estanflación = pesadilla. Normalmente inflación y desempleo se mueven en direcciones opuestas (Phillips). Pero un SHOCK DE OFERTA negativo (↑costos) causa AMBOS: ↑P (inflación) Y ↓Y (más desempleo). Phillips se desplaza hacia arriba-derecha. Casos: 1973, 1979 (petróleo).',
                tema: 'Estanflación',
                formula: 'Shock OA negativo → ↑π, ↑u (estanflación)'
            },
            {
                id: 'ma-ip-005',
                nivel: 'basico',
                pregunta: 'La inflación de DEMANDA ocurre cuando:',
                opciones: {
                    a: 'La Demanda Agregada crece más rápido que la Oferta',
                    b: 'Los costos de producción aumentan',
                    c: 'Hay desempleo estructural',
                    d: 'El banco central sube tasas'
                },
                respuesta_correcta: 'a',
                explicacion: 'Inflación de demanda = "demasiado dinero persiguiendo muy pocos bienes". DA crece (política fiscal/monetaria expansiva, boom de confianza) pero OA no puede seguir el ritmo (cerca de pleno empleo). Resultado: P sube. Caso típico de economías sobrecalentadas.',
                tema: 'Inflación de Demanda',
                formula: '↑↑DA > OA → ↑P (inflación demanda)'
            }
        ],

        // TEMA: Crecimiento (Modelo de Solow)
        crecimiento_solow: [
            {
                id: 'ma-cs-001',
                nivel: 'basico',
                pregunta: 'En el modelo de Solow, el crecimiento de LARGO plazo del ingreso per cápita depende de:',
                opciones: {
                    a: 'El progreso tecnológico',
                    b: 'La tasa de ahorro',
                    c: 'El crecimiento de la población',
                    d: 'La inversión en capital físico'
                },
                respuesta_correcta: 'a',
                explicacion: 'Conclusión CLAVE de Solow: La acumulación de capital SOLA no genera crecimiento perpetuo (rendimientos decrecientes). Eventualmente llegas al estado estacionario (k constante). Solo el PROGRESO TECNOLÓGICO (mejoras en A) puede sostener crecimiento continuo del y (ingreso per cápita).',
                tema: 'Crecimiento de Largo Plazo',
                formula: 'LP: Δy/y = ΔA/A (solo tecnología)'
            },
            {
                id: 'ma-cs-002',
                nivel: 'intermedio',
                pregunta: 'En el estado estacionario del modelo de Solow:',
                opciones: {
                    a: 'Inversión = Depreciación, capital per cápita constante',
                    b: 'Ahorro = 0',
                    c: 'Crecimiento del PIB es máximo',
                    d: 'No hay depreciación del capital'
                },
                respuesta_correcta: 'a',
                explicacion: 'Estado estacionario: Δk = 0. La inversión (sy) es exactamente igual a la depreciación del capital existente ((n+δ)k). El capital per cápita NO crece. La economía sigue produciendo, pero k se mantiene constante. Sin progreso tecnológico, y también es constante.',
                tema: 'Estado Estacionario',
                formula: 'Estado estacionario: sy = (n+δ)k → Δk=0'
            },
            {
                id: 'ma-cs-003',
                nivel: 'avanzado',
                pregunta: 'Si un país aumenta su tasa de ahorro (s) de 20% a 30%:',
                opciones: {
                    a: 'Llegará a un estado estacionario con MAYOR k e y, pero el crecimiento volverá a cero',
                    b: 'Crecerá perpetuamente más rápido',
                    c: 'No afectará el largo plazo, solo el corto',
                    d: 'El consumo siempre aumentará'
                },
                respuesta_correcta: 'a',
                explicacion: '↑s → más inversión → k sube hacia un NUEVO estado estacionario más alto. Hay crecimiento TRANSITORIO mientras se ajusta. Pero eventualmente Δk vuelve a cero (nuevo equilibrio sy = (n+δ)k con k mayor). No genera crecimiento perpetuo. Necesitas ΔA (tecnología).',
                tema: 'Cambio en Tasa de Ahorro',
                formula: '↑s → ↑k*, ↑y* (niveles), pero Δy→0 (sin ΔA)'
            },
            {
                id: 'ma-cs-004',
                nivel: 'intermedio',
                pregunta: '¿Por qué los países POBRES tienden a crecer más rápido que los RICOS (convergencia)?',
                opciones: {
                    a: 'Porque tienen poco capital, los rendimientos marginales son altos',
                    b: 'Porque tienen mejor tecnología',
                    c: 'Porque ahorran más',
                    d: 'La convergencia es un mito, no ocurre'
                },
                respuesta_correcta: 'a',
                explicacion: 'Países pobres: k bajo → PMgK alto (rendimientos decrecientes funcionan al revés). Cada máquina nueva es MUY productiva. Países ricos: k alto → PMgK bajo (máquinas adicionales agregan poco). Si tienen misma tecnología (A) e instituciones, el pobre "alcanza" al rico. Eso sí, si no mejoran A ni instituciones, NO convergen (caso África).',
                tema: 'Convergencia',
                formula: 'Pobres: k bajo → PMgK alto → crecimiento rápido'
            },
            {
                id: 'ma-cs-005',
                nivel: 'avanzado',
                pregunta: 'La Regla de Oro del capital implica:',
                opciones: {
                    a: 'Elegir k* que maximiza el CONSUMO per cápita en estado estacionario',
                    b: 'Ahorrar el 100% del ingreso',
                    c: 'Igualar inversión con PIB',
                    d: 'Eliminar la depreciación'
                },
                respuesta_correcta: 'a',
                explicacion: 'Mayor ahorro (s) → mayor k* → mayor y*. Pero también MENOS consumo actual. Hay un trade-off. La Regla de Oro encuentra el k* óptimo que MAXIMIZA el consumo per cápita (c*) en estado estacionario. Condición: PMgK = n + δ. Más capital de eso reduce c* (sobre-ahorro).',
                tema: 'Regla de Oro',
                formula: 'Regla Oro: PMgK = n + δ (max consumo)'
            }
        ],

        // TEMA: Política Fiscal
        politica_fiscal: [
            {
                id: 'ma-pf-001',
                nivel: 'basico',
                pregunta: 'El multiplicador del gasto público es:',
                opciones: {
                    a: '1 / (1 - c(1-t))',
                    b: 'c / (1-c)',
                    c: '1 / (1-c)',
                    d: 't / (1-t)'
                },
                respuesta_correcta: 'a',
                explicacion: 'Multiplicador completo: k = 1/(1-c(1-t)), donde c = propensión marginal a consumir, t = tasa impositiva. Si c=0.8 y t=0.25: k = 1/(1-0.8×0.75) = 1/0.4 = 2.5. Cada peso de G aumenta Y en $2.50 (vía consumo inducido).',
                tema: 'Multiplicador del Gasto',
                formula: 'k = 1 / (1 - c(1-t))'
            },
            {
                id: 'ma-pf-002',
                nivel: 'intermedio',
                pregunta: 'Si c = 0.8 (propensión marginal a consumir) y NO hay impuestos (t=0), el multiplicador es:',
                opciones: {
                    a: '5',
                    b: '1.25',
                    c: '0.8',
                    d: '4'
                },
                respuesta_correcta: 'a',
                explicacion: 'Multiplicador simple: k = 1/(1-c) = 1/(1-0.8) = 1/0.2 = 5. Cada peso de gasto gubernamental genera $5 de PIB total. Rondas sucesivas: $1 + $0.80 + $0.64 + $0.512 + ... = $5 (serie geométrica).',
                tema: 'Multiplicador Keynesiano',
                formula: 'k = 1/(1-c) cuando t=0'
            },
            {
                id: 'ma-pf-003',
                nivel: 'avanzado',
                pregunta: '¿Por qué el multiplicador de IMPUESTOS es MENOR (en valor absoluto) que el de GASTO?',
                opciones: {
                    a: 'Porque cuando bajas impuestos, solo se gasta una fracción c; cuando aumentas G, todo va a la economía',
                    b: 'Porque los impuestos no afectan el consumo',
                    c: 'Porque el multiplicador de impuestos es siempre positivo',
                    d: 'No es cierto, son iguales'
                },
                respuesta_correcta: 'a',
                explicacion: 'Multiplicador de G: ΔY/ΔG = 1/(1-c). Multiplicador de T: ΔY/ΔT = -c/(1-c). El de T tiene una "c" extra multiplicando. ¿Por qué? Cuando ↑G en $100, los $100 van DIRECTOS a la economía. Cuando ↓T en $100, la gente ahorra (1-c) y solo gasta c×$100. El primer impacto es menor.',
                tema: 'Multiplicador de Impuestos',
                formula: 'Mult_T = -c/(1-c) < Mult_G = 1/(1-c)'
            },
            {
                id: 'ma-pf-004',
                nivel: 'intermedio',
                pregunta: 'Según el Teorema de Haavelmo, si aumentas G y T en la misma cantidad:',
                opciones: {
                    a: 'El PIB aumenta exactamente en esa cantidad (multiplicador balanceado = 1)',
                    b: 'El PIB no cambia (efectos se anulan)',
                    c: 'El PIB aumenta más que la cantidad (efecto multiplicador)',
                    d: 'El PIB disminuye'
                },
                respuesta_correcta: 'a',
                explicacion: 'Presupuesto balanceado: ↑G = ↑T en $100. ΔY = $100×(mult_G) - $100×(mult_T) = $100×[1/(1-c) - c/(1-c)] = $100×[(1-c)/(1-c)] = $100. El efecto neto es POSITIVO pero solo $1 por cada $1 de gasto financiado con impuestos.',
                tema: 'Multiplicador Balanceado',
                formula: 'ΔG = ΔT → ΔY = ΔG (mult = 1)'
            },
            {
                id: 'ma-pf-005',
                nivel: 'basico',
                pregunta: '¿Cuál es la diferencia entre DÉFICIT y DEUDA pública?',
                opciones: {
                    a: 'Déficit es flujo (G-T en un año); Deuda es stock (acumulación de déficits)',
                    b: 'Déficit es stock; Deuda es flujo',
                    c: 'Son sinónimos',
                    d: 'Déficit es siempre malo; Deuda es neutral'
                },
                respuesta_correcta: 'a',
                explicacion: 'DÉFICIT = G - T en un periodo (ej. -5% del PIB este año, FLUJO). DEUDA = suma de todos los déficits pasados (ej. 80% del PIB acumulado, STOCK). Analogía: Déficit es cuánto gastas DE MÁS cada mes. Deuda es el SALDO total de tu tarjeta de crédito.',
                tema: 'Déficit vs Deuda',
                formula: 'Deuda_t = Deuda_{t-1} + Déficit_t'
            }
        ],

        // TEMA: Política Monetaria
        politica_monetaria: [
            {
                id: 'ma-pm-001',
                nivel: 'basico',
                pregunta: 'Los tres instrumentos principales de política monetaria son:',
                opciones: {
                    a: 'Operaciones de mercado abierto, tasa de descuento, reservas obligatorias',
                    b: 'Gasto público, impuestos, deuda',
                    c: 'Tipo de cambio, aranceles, cuotas',
                    d: 'Inflación, desempleo, crecimiento'
                },
                respuesta_correcta: 'a',
                explicacion: '(1) Operaciones Mercado Abierto: Compra/venta de bonos (más usado). (2) Tasa de descuento: Tasa a la que BC presta a bancos. (3) Reservas obligatorias: % de depósitos que bancos deben mantener en BC. Todos afectan oferta monetaria M.',
                tema: 'Instrumentos de PM',
                formula: 'PM: OMAs, Tasa descuento, Reservas'
            },
            {
                id: 'ma-pm-002',
                nivel: 'intermedio',
                pregunta: 'Cuando el Banco Central COMPRA bonos en el mercado abierto:',
                opciones: {
                    a: 'Aumenta la oferta monetaria (política expansiva)',
                    b: 'Reduce la oferta monetaria (política contractiva)',
                    c: 'No afecta la oferta monetaria',
                    d: 'Solo afecta las tasas de largo plazo'
                },
                respuesta_correcta: 'a',
                explicacion: 'BC compra bonos → PAGA con dinero nuevo (reservas electrónicas) → bancos tienen más reservas → prestan más → multiplicador bancario actúa → M aumenta. Es política EXPANSIVA (estimula economía). Efecto: ↓i, ↑I, ↑Y.',
                tema: 'Operaciones de Mercado Abierto',
                formula: 'BC compra bonos → ↑M → ↓i → ↑Y'
            },
            {
                id: 'ma-pm-003',
                nivel: 'avanzado',
                pregunta: 'La Regla de Taylor sugiere que el banco central debe subir la tasa de interés cuando:',
                opciones: {
                    a: 'La inflación está por encima de su meta O la producción está por encima del potencial',
                    b: 'Solo cuando hay desempleo alto',
                    c: 'Cuando el tipo de cambio se aprecia',
                    d: 'Nunca (debe ser constante)'
                },
                respuesta_correcta: 'a',
                explicacion: 'Regla de Taylor: i = r* + π + 0.5(π - π*) + 0.5(Y - Y*). Si inflación > meta: sube i. Si Y > Y* (sobrecalentamiento): sube i. Es una regla "prescriptiva" que balancea estabilidad de precios y empleo. Fed la usa informalmente.',
                tema: 'Regla de Taylor',
                formula: 'i = r* + π + 0.5(π-π*) + 0.5(Y-Y*)'
            },
            {
                id: 'ma-pm-004',
                nivel: 'intermedio',
                pregunta: 'El mecanismo de transmisión de la política monetaria es:',
                opciones: {
                    a: '↑M → ↓i → ↑I → ↑DA → ↑Y',
                    b: '↑M → ↑i → ↑I → ↑Y',
                    c: '↑M → ↓C → ↓Y',
                    d: '↑M → ↑Inflación directa (sin efecto real)'
                },
                respuesta_correcta: 'a',
                explicacion: 'Cadena causal: Banco Central aumenta M (oferta monetaria) → tasa i baja (más dinero disponible) → Inversión I sube (préstamos baratos) → Demanda Agregada sube → Producción Y aumenta. Funciona SI la economía no está en trampa de liquidez (i≈0) ni a pleno empleo.',
                tema: 'Transmisión Monetaria',
                formula: '↑M → ↓i → ↑I → ↑DA → ↑Y'
            },
            {
                id: 'ma-pm-005',
                nivel: 'avanzado',
                pregunta: 'La Ecuación de Fisher establece que:',
                opciones: {
                    a: 'i_nominal = i_real + π_esperada',
                    b: 'M × V = P × Y',
                    c: 'i = r* + π + 0.5(π-π*)',
                    d: 'ΔM/M = Δπ'
                },
                respuesta_correcta: 'a',
                explicacion: 'Fisher: i_nom = i_real + π^e. La tasa NOMINAL (lo que ves en el banco) se descompone en: (1) Tasa REAL (compensación por posponer consumo) + (2) Inflación esperada (compensación por pérdida de poder adquisitivo). Si esperas 5% inflación, exigirás al menos 5% nominal solo para mantener poder de compra.',
                tema: 'Ecuación de Fisher',
                formula: 'i = r + πᵉ (tasa Fisher)'
            }
        ]
    },

    // ============================================
    // MATEMÁTICAS FINANCIERAS
    // ============================================

    matematicas_financieras: {

        // TEMA: Interés Simple y Compuesto
        interes: [
            {
                id: 'mf-int-001',
                nivel: 'basico',
                pregunta: 'Inviertes $10,000 a interés simple de 8% anual durante 3 años. ¿Cuánto recibes de intereses?',
                opciones: {
                    a: '$2,400',
                    b: '$2,597',
                    c: '$12,400',
                    d: '$800'
                },
                respuesta_correcta: 'a',
                explicacion: 'Interés Simple: I = P × i × t = $10,000 × 0.08 × 3 = $2,400. Los intereses NO se capitalizan, siempre se calculan sobre el capital inicial.',
                tema: 'Interés Simple',
                formula: 'I = P × i × t'
            },
            {
                id: 'mf-int-002',
                nivel: 'intermedio',
                pregunta: 'Inviertes $10,000 a interés compuesto de 8% anual durante 3 años. ¿Cuál es el monto final?',
                opciones: {
                    a: '$12,597.12',
                    b: '$12,400.00',
                    c: '$10,800.00',
                    d: '$13,000.00'
                },
                respuesta_correcta: 'a',
                explicacion: 'Interés Compuesto: S = P(1+i)^t = $10,000(1.08)^3 = $10,000 × 1.259712 = $12,597.12. Los intereses se capitalizan (generan nuevos intereses).',
                tema: 'Interés Compuesto',
                formula: 'S = P(1+i)^n'
            },
            {
                id: 'mf-int-003',
                nivel: 'avanzado',
                pregunta: 'Un banco ofrece 12% TNA (Tasa Nominal Anual) con capitalización MENSUAL. ¿Cuál es la TEA (Tasa Efectiva Anual)?',
                opciones: {
                    a: '12.68%',
                    b: '12.00%',
                    c: '13.00%',
                    d: '11.50%'
                },
                respuesta_correcta: 'a',
                explicacion: 'TEA = (1 + TNA/m)^m - 1 = (1 + 0.12/12)^12 - 1 = (1.01)^12 - 1 = 1.1268 - 1 = 0.1268 = 12.68%. La TEA es mayor que la TNA cuando hay capitalización (m>1).',
                tema: 'TNA vs TEA',
                formula: 'TEA = (1 + TNA/m)^m - 1'
            },
            {
                id: 'mf-int-004',
                nivel: 'basico',
                pregunta: '¿Cuál es la diferencia fundamental entre interés simple y compuesto?',
                opciones: {
                    a: 'Simple: interés solo sobre capital inicial. Compuesto: interés sobre capital + intereses acumulados',
                    b: 'Simple se usa para plazos cortos; Compuesto para largos',
                    c: 'Simple tiene tasa más alta',
                    d: 'No hay diferencia matemática'
                },
                respuesta_correcta: 'a',
                explicacion: 'Interés SIMPLE: I se calcula siempre sobre P (base constante). Interés COMPUESTO: I se calcula sobre P + intereses acumulados (base creciente). Compuesto crece exponencialmente; Simple crece linealmente.',
                tema: 'Simple vs Compuesto',
                formula: 'Simple: I=P×i×t (lineal). Compuesto: S=P(1+i)^n (exponencial)'
            },
            {
                id: 'mf-int-005',
                nivel: 'intermedio',
                pregunta: '¿Cuánto tiempo tardará un capital en DUPLICARSE a interés compuesto de 6% anual?',
                opciones: {
                    a: 'Aproximadamente 11.9 años',
                    b: 'Exactamente 12 años (Regla del 72)',
                    c: '16.7 años',
                    d: '10 años'
                },
                respuesta_correcta: 'a',
                explicacion: 'Fórmula: 2 = (1.06)^t. Aplicando logaritmos: t = ln(2)/ln(1.06) = 0.693/0.0583 = 11.9 años. La Regla del 72 (72/6 = 12 años) es una APROXIMACIÓN cercana.',
                tema: 'Tiempo de Duplicación',
                formula: 't = ln(2)/ln(1+i)'
            }
        ],

        // TEMA: Valor Presente y Futuro
        valor_temporal: [
            {
                id: 'mf-vp-001',
                nivel: 'basico',
                pregunta: '¿Cuál es el Valor Presente de $15,000 que recibirás en 4 años si la tasa de descuento es 10% anual?',
                opciones: {
                    a: '$10,245.40',
                    b: '$15,000.00',
                    c: '$21,961.50',
                    d: '$13,636.36'
                },
                respuesta_correcta: 'a',
                explicacion: 'VP = VF / (1+i)^n = $15,000 / (1.10)^4 = $15,000 / 1.4641 = $10,245.40. Es lo que vale HOY recibir $15,000 en el futuro.',
                tema: 'Valor Presente',
                formula: 'VP = VF / (1+i)^n'
            },
            {
                id: 'mf-vp-002',
                nivel: 'intermedio',
                pregunta: 'Recibes 3 flujos: $1,000 en año 1, $2,000 en año 2, $3,000 en año 3. Tasa 8%. ¿Valor presente total?',
                opciones: {
                    a: '$5,022.10',
                    b: '$6,000.00',
                    c: '$4,500.00',
                    d: '$5,500.00'
                },
                respuesta_correcta: 'a',
                explicacion: 'VP = 1000/1.08 + 2000/(1.08)^2 + 3000/(1.08)^3 = 925.93 + 1,714.68 + 2,381.50 = $5,022.10. Cada flujo se descuenta a su periodo correspondiente.',
                tema: 'VP de Flujos Múltiples',
                formula: 'VP = Σ [Flujo_t / (1+i)^t]'
            },
            {
                id: 'mf-vp-003',
                nivel: 'avanzado',
                pregunta: 'Una perpetuidad paga $500 al año indefinidamente. Si la tasa es 5%, ¿cuál es su valor presente?',
                opciones: {
                    a: '$10,000',
                    b: '$5,000',
                    c: 'Infinito',
                    d: '$50,000'
                },
                respuesta_correcta: 'a',
                explicacion: 'Perpetuidad: VP = C / i = $500 / 0.05 = $10,000. Es el valor presente de una anualidad infinita. Sorprendente: infinitos pagos tienen valor FINITO por el descuento exponencial.',
                tema: 'Perpetuidad',
                formula: 'VP_perpetuidad = C / i'
            },
            {
                id: 'mf-vp-004',
                nivel: 'basico',
                pregunta: 'El Valor Futuro de $5,000 invertidos hoy a 7% anual durante 5 años es:',
                opciones: {
                    a: '$7,012.76',
                    b: '$6,750.00',
                    c: '$5,350.00',
                    d: '$8,000.00'
                },
                respuesta_correcta: 'a',
                explicacion: 'VF = P(1+i)^n = $5,000(1.07)^5 = $5,000 × 1.402552 = $7,012.76. Es cuánto valdrá tu inversión en el futuro.',
                tema: 'Valor Futuro',
                formula: 'VF = P(1+i)^n'
            },
            {
                id: 'mf-vp-005',
                nivel: 'intermedio',
                pregunta: '¿Por qué $100 hoy valen más que $100 en un año?',
                opciones: {
                    a: 'Inflación, costo de oportunidad y riesgo',
                    b: 'Solo por inflación',
                    c: 'Es un error, valen lo mismo',
                    d: 'Depende del banco'
                },
                respuesta_correcta: 'a',
                explicacion: 'Tres razones del Valor Temporal del Dinero: (1) Inflación (pierde poder adquisitivo), (2) Costo de oportunidad (podrías invertirlos y ganar rendimiento), (3) Riesgo/Incertidumbre (es más seguro tener el dinero hoy que una promesa futura).',
                tema: 'Valor Temporal del Dinero',
                formula: 'VTD por: Inflación + Costo Oportunidad + Riesgo'
            }
        ],

        // TEMA: VAN y TIR
        van_tir: [
            {
                id: 'mf-vt-001',
                nivel: 'basico',
                pregunta: 'Un proyecto requiere invertir $100,000 hoy y generará $30,000 anuales durante 5 años. Tasa de descuento 10%. ¿VAN?',
                opciones: {
                    a: '$13,723.60',
                    b: '$50,000.00',
                    c: '-$100,000.00',
                    d: '$30,000.00'
                },
                respuesta_correcta: 'a',
                explicacion: 'VAN = -100,000 + 30,000×[(1-(1.10)^-5)/0.10] = -100,000 + 30,000×3.7908 = -100,000 + 113,723.60 = $13,723.60. VAN > 0, el proyecto es rentable.',
                tema: 'VAN (Valor Actual Neto)',
                formula: 'VAN = -I₀ + Σ[Flujo_t/(1+i)^t]'
            },
            {
                id: 'mf-vt-002',
                nivel: 'intermedio',
                pregunta: '¿Cuál es la regla de decisión del VAN?',
                opciones: {
                    a: 'Aceptar si VAN > 0; Rechazar si VAN < 0',
                    b: 'Aceptar si VAN > 1',
                    c: 'Aceptar si TIR > VAN',
                    d: 'Siempre aceptar el proyecto con mayor inversión inicial'
                },
                respuesta_correcta: 'a',
                explicacion: 'VAN > 0: El proyecto rinde MÁS que la tasa de descuento exigida (crea valor). VAN = 0: Rinde exactamente la tasa exigida (indiferente). VAN < 0: Rinde MENOS que la tasa exigida (destruye valor, rechazar).',
                tema: 'Criterio VAN',
                formula: 'Aceptar si: VAN > 0'
            },
            {
                id: 'mf-vt-003',
                nivel: 'avanzado',
                pregunta: '¿Por qué el VAN es superior a la TIR para evaluar proyectos?',
                opciones: {
                    a: 'VAN mide creación de valor absoluta; TIR puede tener problemas de múltiples tasas y no considera escala',
                    b: 'TIR es más fácil de calcular',
                    c: 'VAN siempre es mayor que TIR',
                    d: 'No es cierto, TIR es superior'
                },
                respuesta_correcta: 'a',
                explicacion: 'Problemas de TIR: (1) Múltiples TIRs en proyectos no convencionales, (2) No considera escala (un proyecto pequeño puede tener TIR alta pero VAN bajo), (3) Asume reinversión a la TIR (irreal). VAN asume reinversión a la tasa de descuento (más realista) y mide valor absoluto creado.',
                tema: 'VAN vs TIR',
                formula: 'VAN mide $ creados; TIR mide % retorno'
            },
            {
                id: 'mf-vt-004',
                nivel: 'intermedio',
                pregunta: 'La TIR de un proyecto es 18%. La tasa de descuento requerida es 12%. ¿Decisión?',
                opciones: {
                    a: 'Aceptar (TIR > tasa requerida)',
                    b: 'Rechazar (TIR > tasa requerida)',
                    c: 'Indiferente',
                    d: 'Falta información'
                },
                respuesta_correcta: 'a',
                explicacion: 'Si TIR > tasa de descuento, el proyecto es rentable. Rinde 18% mientras solo exiges 12%. Equivalente a VAN > 0. Regla TIR: Aceptar si TIR > k (costo de capital).',
                tema: 'Criterio TIR',
                formula: 'Aceptar si: TIR > k (tasa requerida)'
            },
            {
                id: 'mf-vt-005',
                nivel: 'basico',
                pregunta: '¿Qué mide la TIR (Tasa Interna de Retorno)?',
                opciones: {
                    a: 'La tasa de descuento que hace el VAN = 0 (rentabilidad del proyecto)',
                    b: 'La tasa de inflación esperada',
                    c: 'El costo de capital de la empresa',
                    d: 'La tasa de interés del banco'
                },
                respuesta_correcta: 'a',
                explicacion: 'TIR es la tasa "i" que resuelve: VAN = 0. Es decir, la tasa a la cual el proyecto "se paga a sí mismo". Representa la rentabilidad INTERNA del proyecto. Se compara con la tasa de descuento requerida.',
                tema: 'Definición de TIR',
                formula: 'TIR: VAN(i) = 0 → Resuelve para i'
            }
        ]
    }
};

/**
 * FUNCIÓN AUXILIAR: Obtener preguntas aleatorias por tema
 * @param {string} area - 'microeconomia', 'macroeconomia', 'matematicas_financieras'
 * @param {string} tema - Tema específico (ej. 'elasticidades')
 * @param {number} cantidad - Número de preguntas a obtener
 * @param {string} nivel - 'basico', 'intermedio', 'avanzado', 'mixto'
 * @returns {Array} Array de preguntas
 */
export function obtenerPreguntasAleatorias(area, tema, cantidad, nivel = 'mixto') {
    const preguntas = questionBank[area][tema];

    let preguntasFiltradas = preguntas;
    if (nivel !== 'mixto') {
        preguntasFiltradas = preguntas.filter(p => p.nivel === nivel);
    }

    // Mezclar aleatoriamente
    const mezcladas = [...preguntasFiltradas].sort(() => Math.random() - 0.5);

    // Tomar la cantidad solicitada
    return mezcladas.slice(0, cantidad);
}

/**
 * FUNCIÓN AUXILIAR: Generar examen simulador
 * @param {number} numPreguntas - Número total de preguntas
 * @param {Object} distribucion - {micro: 40, macro: 40, finanzas: 20} (porcentajes)
 * @returns {Array} Array de preguntas para el examen
 */
export function generarExamenSimulador(numPreguntas = 50, distribucion = { micro: 40, macro: 40, finanzas: 20 }) {
    const examen = [];

    const numMicro = Math.floor(numPreguntas * distribucion.micro / 100);
    const numMacro = Math.floor(numPreguntas * distribucion.macro / 100);
    const numFinanzas = numPreguntas - numMicro - numMacro;

    // Obtener todas las preguntas de cada área
    const todasMicro = Object.values(questionBank.microeconomia).flat();
    const todasMacro = Object.values(questionBank.macroeconomia).flat();
    const todasFinanzas = Object.values(questionBank.matematicas_financieras).flat();

    // Mezclar y seleccionar
    examen.push(...todasMicro.sort(() => Math.random() - 0.5).slice(0, numMicro));
    examen.push(...todasMacro.sort(() => Math.random() - 0.5).slice(0, numMacro));
    examen.push(...todasFinanzas.sort(() => Math.random() - 0.5).slice(0, numFinanzas));

    // Mezclar el examen final
    return examen.sort(() => Math.random() - 0.5);
}

// Exportar también las categorías para referencia
export const categorias = {
    microeconomia: [
        'teoria_consumidor',
        'elasticidades',
        'teoria_productor',
        'costos',
        'estructuras_mercado',
        'teoria_juegos'
    ],
    macroeconomia: [
        'pib_contabilidad',
        'modelo_islm',
        'mundell_fleming',
        'oferta_demanda_agregada',
        'inflacion_phillips',
        'crecimiento_solow',
        'politica_fiscal',
        'politica_monetaria'
    ],
    matematicas_financieras: [
        'interes',
        'valor_temporal',
        'van_tir'
    ]
};