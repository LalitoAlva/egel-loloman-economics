export const modules = [
    {
        id: 'eco-1',
        title: 'Economía I: Fundamentos Micro y Macro',
        desc: 'Teoría del Consumidor, Productor y Equilibrio Macroeconómico',
        icon: '📊',
        color: '#38bdf8',
        detailed_report: `# Fundamentos Integrales de Micro y Macroeconomía
**Marco Teórico para el EGEL de Economía**

## Introducción Estratégica
La economía moderna requiere dominar tanto el análisis individual (microeconomía) como el agregado (macroeconomía). Este módulo integra ambas perspectivas para proporcionar una visión completa de la toma de decisiones económicas, desde el consumidor individual hasta las políticas nacionales.

---

## PARTE I: MICROECONOMÍA

### 1. Teoría del Consumidor

El consumidor busca maximizar su utilidad sujeto a una restricción presupuestaria. Este problema de optimización se resuelve donde:
- **Curvas de Indiferencia:** Representan combinaciones de bienes que dan la misma satisfacción
- **Restricción Presupuestaria:** M = Px·X + Py·Y (donde M es el ingreso)
- **Condición de Equilibrio:** TMS = Px/Py

**Utilidad Marginal y Ley de Utilidades Marginales Decrecientes:**
A medida que consumes más de un bien, la satisfacción adicional (utilidad marginal) disminuye.

### 2. Elasticidades de Demanda

**Elasticidad Precio de la Demanda (EPD):**
$$EPD = \\frac{\\%\\Delta Q_d}{\\%\\Delta P}$$

- **Elástica (|EPD| > 1):** Demanda sensible. ↑P → ↓Ingresos Totales
- **Inelástica (|EPD| < 1):** Demanda insensible. ↑P → ↑Ingresos Totales  
- **Unitaria (|EPD| = 1):** Cambio proporcional. Ingresos constantes

**Elasticidad Precio Cruzada:**
- Positiva → Bienes Sustitutos (café y té)
- Negativa → Bienes Complementarios (café y azúcar)

**Elasticidad Ingreso:**
- Positiva → Bien Normal (↑M → ↑Qd)
- Negativa → Bien Inferior (↑M → ↓Qd)

### 3. Teoría del Productor

**Función de Producción:** Q = f(L, K)

**Conceptos Clave:**
- **Producto Marginal (PMg):** Producción adicional por unidad adicional de insumo
- **Producto Medio (PMe):** Producción promedio por unidad de insumo
- **Relación:** PMg corta a PMe en su máximo

**Etapas de la Producción:**
1. **Etapa I:** PMe creciente. PMg > PMe (Ineficiente - Factor fijo subutilizado)
2. **Etapa II:** PMg y PMe decrecientes pero positivos (Zona Racional de Producción)
3. **Etapa III:** PMg negativo (Ineficiente - Exceso de factor variable)

**Rendimientos a Escala:**
Si multiplicamos todos los inputs por λ > 1:
- **Crecientes:** Q aumenta más que λ (economías de escala)
- **Constantes:** Q aumenta exactamente λ (escala eficiente)
- **Decrecientes:** Q aumenta menos que λ (deseconomías de escala)

### 4. Costos de Producción

**Corto Plazo:**
- Costo Fijo (CF): No varía con Q
- Costo Variable (CV): Varía con Q  
- Costo Total (CT) = CF + CV
- Costo Marginal (CMg) = ΔCT/ΔQ
- Costo Medio Total (CMe) = CT/Q

**Relación Importante:**
CMg corta al CMe en su punto mínimo. Cuando CMg < CMe, el CMe está bajando.

**Largo Plazo:**
Todos los costos son variables. La curva de Costo Medio de Largo Plazo (CMeLP) es la envolvente de todas las curvas de CMeCP.

### 5. Estructuras de Mercado

**Competencia Perfecta:**
- Muchos compradores y vendedores
- Producto homogéneo
- Libre entrada y salida
- Información perfecta
- **Equilibrio:** P = CMg = CMe (largo plazo)
- **Beneficio económico:** Cero en el largo plazo

**Monopolio:**
- Un solo vendedor
- No hay sustitutos cercanos
- Barreras a la entrada
- **Maximización:** IMg = CMg (donde IMg < P)
- **Pérdida Irrecuperable:** Área entre P monopolio y CMg
- **Discriminación de Precios:** Captura excedente del consumidor

**Competencia Monopolística:**
- Muchos vendedores
- Productos diferenciados
- Libre entrada
- **Largo plazo:** P > CMg, beneficio económico = 0

**Oligopolio:**
- Pocos vendedores
- Interdependencia estratégica
- **Modelo de Cournot:** Competencia en cantidades
- **Modelo de Bertrand:** Competencia en precios
- **Modelo de Stackelberg:** Líder y seguidor

### 6. Teoría de Juegos

**Equilibrio de Nash:** 
Situación donde ningún jugador puede mejorar unilateralmente cambiando su estrategia.

**Dilema del Prisionero:**
El equilibrio de Nash puede ser subóptimo para ambos jugadores (equilibrio no cooperativo).

**Estrategias Dominantes:**
Estrategia óptima independientemente de lo que haga el rival.

---

## PARTE II: MACROECONOMÍA

### 7. Contabilidad Nacional

**PIB (Producto Interno Bruto):**
Valor de mercado de todos los bienes y servicios finales producidos en un país durante un periodo.

**Enfoques de Cálculo:**
1. **Gasto:** PIB = C + I + G + (X - M)
2. **Ingreso:** PIB = Salarios + Rentas + Intereses + Beneficios
3. **Producción:** Suma del valor agregado en cada etapa

**PIB Real vs Nominal:**
- **Nominal:** A precios corrientes
- **Real:** A precios constantes (ajustado por inflación)
- **Deflactor del PIB:** (PIB Nominal / PIB Real) × 100

### 8. Modelo IS-LM

**Curva IS (Inversión-Ahorro):**
Equilibrio en el mercado de bienes.
- **Ecuación:** Y = C(Y - T) + I(i) + G
- **Pendiente:** Negativa (↑i → ↓I → ↓Y)
- **Desplazamiento:** Política fiscal expansiva desplaza IS a la derecha

**Curva LM (Liquidez-Dinero):**
Equilibrio en el mercado monetario.
- **Ecuación:** M/P = L(i, Y)
- **Pendiente:** Positiva (↑Y → ↑demanda de dinero → ↑i)
- **Desplazamiento:** Política monetaria expansiva desplaza LM a la derecha

**Efectos de las Políticas:**
- **Política Fiscal Expansiva (↑G o ↓T):** ↑Y, ↑i (efecto crowding-out)
- **Política Monetaria Expansiva (↑M):** ↑Y, ↓i

### 9. Modelo Mundell-Fleming (Economía Abierta)

**La Trinidad Imposible:**
Un país no puede tener simultáneamente:
1. Tipo de cambio fijo
2. Libre movilidad de capitales  
3. Política monetaria independiente

**Efectividad de Políticas:**

Con **Tipo de Cambio Fijo:**
- Política Fiscal: Muy efectiva
- Política Monetaria: Inefectiva (se pierde en defender el tipo de cambio)

Con **Tipo de Cambio Flexible:**
- Política Fiscal: Inefectiva (apreciación anula el efecto)
- Política Monetaria: Muy efectiva

### 10. Oferta y Demanda Agregada

**Demanda Agregada (DA):**
Relación inversa entre nivel de precios y producción demandada.
- Desplazamientos: Política fiscal, monetaria, confianza del consumidor

**Oferta Agregada de Corto Plazo (OACP):**
Pendiente positiva (precios rígidos en el corto plazo)

**Oferta Agregada de Largo Plazo (OALP):**
Vertical al nivel de pleno empleo (precios flexibles)

**Equilibrio Macroeconómico:**
Intersección de DA y OA determina P* y Y*

### 11. Inflación y Desempleo

**Curva de Phillips (Corto Plazo):**
Relación inversa entre inflación y desempleo.
- **Trade-off:** Menor desempleo → Mayor inflación

**Curva de Phillips de Largo Plazo:**
Vertical a la tasa natural de desempleo (NAIRU).

**Tipos de Inflación:**
- **Demanda:** Exceso de demanda agregada
- **Costos:** Aumento en costos de producción (ej. petróleo)
- **Estructural:** Rigideces en la economía

### 12. Modelo de Solow (Crecimiento)

**Ecuación Fundamental:**
$$\\Delta k = sy - (n + \\delta)k$$

Donde:
- k = capital per cápita
- s = tasa de ahorro
- y = producto per cápita
- n = crecimiento poblacional
- δ = tasa de depreciación

**Estado Estacionario:**
Capital per cápita constante (inversión = depreciación).

**Conclusión Clave:**
Solo el progreso tecnológico genera crecimiento sostenido del ingreso per cápita.

### 13. Política Fiscal

**Multiplicador del Gasto:**
$$k = \\frac{1}{1 - c(1-t)}$$

Donde c es la propensión marginal a consumir y t la tasa impositiva.

**Tipos de Política:**
- **Expansiva:** ↑G o ↓T → Estimula la economía
- **Contractiva:** ↓G o ↑T → Frena la economía

**Déficit y Deuda:**
- **Déficit:** Gasto > Ingresos (flujo)
- **Deuda:** Acumulación de déficits (stock)

### 14. Política Monetaria

**Instrumentos del Banco Central:**
1. Operaciones de Mercado Abierto (más usado)
2. Tasa de redescuento
3. Coeficiente de reservas obligatorias

**Transmisión Monetaria:**
↑M → ↓i → ↑I → ↑DA → ↑Y

**Trampa de Liquidez:**
Situación donde i ≈ 0 y la política monetaria es inefectiva.

**Regla de Taylor:**
$$i = r^* + \\pi + 0.5(\\pi - \\pi^*) + 0.5(Y - Y^*)$$

---

## Conectividad Micro-Macro

1. **Agregación:** La macroeconomía suma comportamientos microeconómicos
2. **Función de Consumo:** Basada en utilidad microeconómica
3. **Función de Inversión:** Basada en maximización de beneficios
4. **Oferta Agregada:** Agregación de funciones de producción individuales
5. **Mercado Laboral:** Oferta y demanda de trabajo (micro) determinan empleo agregado (macro)`,

        topics: [
            // ============ MICROECONOMÍA ============
            {
                id: 't1-micro-consumidor',
                title: '1. Equilibrio del Consumidor',
                content: 'Maximización de utilidad con restricción presupuestaria',
                lesson: {
                    explanation: "El consumidor maximiza su utilidad eligiendo la cesta de bienes donde la Tasa Marginal de Sustitución (TMS) se iguala a la relación de precios. TMS mide cuánto estás dispuesto a sacrificar de un bien por obtener más del otro. En equilibrio, tu valoración subjetiva (TMS) coincide con el precio relativo del mercado (Px/Py).",
                    example_title: "Tacos vs Pizza: Tu Dilema del Viernes",
                    example: "Tienes $200. Los tacos cuestan $20 y la pizza $40. Tu TMS es 3 (darías 3 tacos por 1 pizza). Pero el mercado pide Px/Py = 40/20 = 2. Como valoras la pizza más (3) de lo que cuesta (2), debes comprar MÁS pizza. Al hacerlo, tu TMS baja (ley de utilidad marginal decreciente) hasta que TMS = 2. Ahí maximizas tu felicidad gastronómica."
                },
                socratic_questions: [
                    {
                        q: "Si TMS = 4 y Px/Py = 2, ¿qué bien debes consumir más y por qué?",
                        hint: "Compara tu valoración subjetiva con el costo de mercado",
                        answer: "Debes consumir más X. Valoras X el doble de lo que cuesta en términos de Y. Estás 'subvaluando' Y. Al comprar más X, su utilidad marginal baja hasta que TMS = 2."
                    },
                    {
                        q: "¿Por qué las curvas de indiferencia no pueden cruzarse?",
                        hint: "Piensa en las preferencias transitivas",
                        answer: "Si se cruzaran, un punto estaría en dos niveles de utilidad diferentes. Esto violaría la transitividad: si A~B y B~C, entonces A~C. Es una contradicción lógica."
                    }
                ]
            },
            {
                id: 't2-micro-elasticidad',
                title: '2. Elasticidad Precio de la Demanda',
                content: 'Sensibilidad de la cantidad demandada ante cambios en el precio',
                lesson: {
                    explanation: "La elasticidad precio mide qué tan dramática es la reacción de los consumidores ante un cambio de precio. EPD = %ΔQd / %ΔP. Si |EPD| > 1 (elástica), los consumidores son muy sensibles: un aumento de precio reduce tanto la cantidad que los ingresos totales CAEN. Si |EPD| < 1 (inelástica), la cantidad casi no cambia y los ingresos SUBEN con el precio.",
                    example_title: "Insulina vs iPhone",
                    example: "Insulina (inelástica): Subes precio 50%, vendes casi lo mismo. La gente NECESITA insulina. Ingresos totales suben 50%. iPhone (elástico): Subes 50%, la gente compra Samsung o espera. Vendes 70% menos. Ingresos totales CAEN. Por eso Apple jamás sube precios drásticamente."
                },
                socratic_questions: [
                    {
                        q: "Una aerolínea tiene EPD de pasajeros de negocios = -0.4 y turistas = -2.1. ¿A quién debe cobrarle más caro?",
                        hint: "Inelástico significa que no se van aunque subas el precio",
                        answer: "A los ejecutivos (negocios). Son inelásticos: subes 10%, solo pierdes 4% de pasajeros. Ganas 10%-4%=6% más. Los turistas son elásticos: subes 10%, pierdes 21%. Te quedas sin ingresos."
                    },
                    {
                        q: "¿Por qué los bienes de lujo tienden a ser más elásticos que los de primera necesidad?",
                        hint: "¿Puedes vivir sin ellos?",
                        answer: "Porque puedes posponer o cancelar su compra sin mayor problema. La sal (necesidad) es inelástica: la necesitas YA. Un Rolex (lujo) es elástico: si sube mucho, simplemente no lo compras o esperas una oferta."
                    }
                ]
            },
            {
                id: 't3-micro-productor',
                title: '3. Teoría del Productor - Función de Producción',
                content: 'Relación técnica entre insumos y producto',
                lesson: {
                    explanation: "La función de producción Q = f(L,K) muestra el máximo output que puedes obtener con cada combinación de trabajo (L) y capital (K). El Producto Marginal (PMg) mide cuánto produces DE MÁS con una unidad adicional de insumo. PMg decreciente es una ley universal: el primer trabajador es productivo, el décimo ya se estorba con los demás.",
                    example_title: "La Taquería con 1 Comal",
                    example: "Tienes 1 comal (K fijo). Primer taquero: hace 50 tacos/hora (PMgL=50). Segundo: 40 tacos más (PMgL=40, rendimientos decrecientes). Tercer taquero: solo 25 más (se estorban en el comal). Cuarto: solo 10 tacos adicionales. Quinto: -5 tacos (¡ya ni caben! PMgL negativo = Etapa III). Zona racional: contratar entre el 2° y 4° taquero."
                },
                socratic_questions: [
                    {
                        q: "Si PMg = 0, ¿qué significa y en qué etapa de producción estás?",
                        hint: "¿Aumenta la producción total?",
                        answer: "Significa que agregar una unidad más de factor NO aumenta la producción. Es el límite entre Etapa II (eficiente) y Etapa III (ineficiente). Estás saturando el factor fijo."
                    },
                    {
                        q: "¿Por qué ninguna empresa racional opera en la Etapa I?",
                        hint: "Piensa en el factor fijo",
                        answer: "Porque el factor fijo está SUBUTILIZADO. El PMe está creciendo, lo que significa que puedes aumentar la productividad promedio simplemente usando más del factor variable. Hay 'espacio libre' en la fábrica."
                    }
                ]
            },
            {
                id: 't4-micro-costos',
                title: '4. Estructura de Costos',
                content: 'Costos fijos, variables, marginales y medios',
                lesson: {
                    explanation: "En el CORTO plazo tienes Costos Fijos (CF, no cambian con Q, ej. renta) y Variables (CV, aumentan con Q, ej. materia prima). El Costo Marginal (CMg = ΔCT/ΔQ) es el costo de producir UNA unidad más. El Costo Medio (CMe = CT/Q) es el costo promedio por unidad. Relación CLAVE: CMg corta al CMe en su mínimo. Si CMg < CMe, producir la siguiente unidad BAJA el promedio.",
                    example_title: "Tu Calificación en el Semestre",
                    example: "Llevas promedio de 8.5 (CMe). Sacas 9 en el siguiente examen (CMg=9). Como CMg > CMe, tu promedio SUBE. Pero si sacas 7 (CMg=7 < CMe=8.5), tu promedio BAJA. Cuando CMg = CMe, el promedio se mantiene (punto mínimo del CMe)."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué el CMg siempre corta al CMe en su punto mínimo?",
                        hint: "Piensa en la lógica del promedio",
                        answer: "Si CMg < CMe, producir una más BAJA el promedio (CMe bajando). Si CMg > CMe, producir una más SUBE el promedio (CMe subiendo). El único punto donde CMe deja de bajar y empieza a subir es cuando CMg = CMe. Es el mínimo."
                    },
                    {
                        q: "Si tu CF = $1000 y produces 0 unidades, ¿cuánto pierdes?",
                        hint: "Los costos fijos se pagan aunque no produzcas",
                        answer: "Pierdes exactamente $1000. Los costos fijos son un 'costo hundido' en el corto plazo. Incluso sin producir, debes pagarlos (renta, seguros, etc.). Por eso, en el corto plazo, solo cierras si P < CVMe."
                    }
                ]
            },
            {
                id: 't5-micro-competencia',
                title: '5. Competencia Perfecta',
                content: 'Modelo de mercado con muchos vendedores idénticos',
                lesson: {
                    explanation: "En competencia perfecta hay TANTOS vendedores que ninguno puede influir en el precio. El precio es dado por el mercado (precio-aceptante). La empresa maximiza beneficios donde P = CMg. En el LARGO plazo, la entrada de nuevas empresas (atraídas por beneficios) hace que el precio baje hasta P = CMe (mínimo). Beneficio económico = 0.",
                    example_title: "El Mercado de Tomates",
                    example: "Eres UN productor entre 10,000. Si intentas cobrar $1 más por kilo que el mercado, NADIE te compra (producto homogéneo). Si cobras menos, te quedas sin inventario pero pierdes dinero. Debes vender al precio de mercado $15/kg. Produces donde CMg = $15. Si ganas beneficios extraordinarios, entran MÁS productores, la oferta aumenta, el precio cae a $12, y tu beneficio se evapora."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué en competencia perfecta la curva de demanda de la empresa es horizontal?",
                        hint: "¿Qué pasa si subes 1 peso el precio?",
                        answer: "Porque la empresa es precio-aceptante. Si sube el precio aunque sea 1 centavo por encima del mercado, NADIE le compra (hay miles de sustitutos perfectos). Si baja el precio, puede vender todo lo que quiera pero pierde dinero innecesariamente."
                    },
                    {
                        q: "Si P = $50, CMg = $50 y CMe = $60, ¿qué debe hacer la empresa en el corto plazo?",
                        hint: "Compara con CVMe, no con CMe",
                        answer: "Depende del CVMe. Si CVMe < $50, debe seguir produciendo (cubre costos variables y algo de los fijos). Si CVMe > $50, debe cerrar inmediatamente (ni siquiera cubre los costos variables). Los CF ya están hundidos."
                    }
                ]
            },
            {
                id: 't6-micro-monopolio',
                title: '6. Monopolio y Poder de Mercado',
                content: 'Único vendedor que fija precio y cantidad',
                lesson: {
                    explanation: "El monopolista ES el mercado. Enfrenta toda la curva de demanda (no solo un precio). Para vender más, debe BAJAR el precio de TODAS las unidades (no puede discriminar). Por eso su Ingreso Marginal (IMg) es MENOR que el Precio. Maximiza beneficio donde IMg = CMg, pero COBRA un precio P > CMg (usando la curva de demanda). Esto crea una Pérdida Irrecuperable de Eficiencia.",
                    example_title: "CFE (Monopolio Eléctrico)",
                    example: "CFE es el único que vende luz. Produce 100 millones de kWh donde IMg = CMg = $2/kWh. Pero COBRA $5/kWh (usando la demanda). Hay gente que pagaría $4/kWh (más del costo $2) pero NO lo hacen porque el precio es $5. Esa transacción beneficiosa (valor social de $4 - costo $2 = ganancia social $2) se PIERDE. Es la ineficiencia del monopolio."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué el monopolista NUNCA produce en la zona inelástica de la demanda?",
                        hint: "¿Qué pasa con los ingresos si subes precio en zona inelástica?",
                        answer: "Porque en la zona inelástica (|EPD| < 1), si sube el precio, sus ingresos SUBEN (la cantidad cae menos que proporcionalmente). Como los costos BAJAN al producir menos, el beneficio aumenta. Seguirá subiendo precio hasta entrar a la zona elástica."
                    },
                    {
                        q: "Si un monopolio puede discriminar precios perfectamente (cobrar a cada cliente su disposición a pagar), ¿hay pérdida irrecuperable?",
                        hint: "¿Se pierden transacciones beneficiosas?",
                        answer: "NO. La discriminación perfecta elimina la pérdida irrecuperable porque TODAS las transacciones con valor social positivo se realizan. El monopolista captura TODO el excedente del consumidor, pero no hay ineficiencia. Es redistributivo, no ineficiente."
                    }
                ]
            },
            {
                id: 't7-micro-juegos',
                title: '7. Teoría de Juegos - Equilibrio de Nash',
                content: 'Toma de decisiones estratégicas interdependientes',
                lesson: {
                    explanation: "En un Equilibrio de Nash, cada jugador elige su mejor respuesta dada la estrategia del otro. NADIE puede mejorar unilateralmente cambiando de estrategia. No es necesariamente el mejor resultado para todos (ver Dilema del Prisionero), pero es estable. Busca la estrategia donde, cuando tu rival juega X, tú juegas Y, y cuando tú juegas Y, él juega X.",
                    example_title: "Dilema del Prisionero - Dos Cárteles",
                    example: "Pemex y Exxon pueden cooperar (producir poco, precio alto) o traicionar (producir mucho). Matriz de pagos: (Cooperar, Cooperar) = (50, 50). (Traicionar, Cooperar) = (80, 10). (Cooperar, Traicionar) = (10, 80). (Traicionar, Traicionar) = (30, 30). Equilibrio de Nash: (Traicionar, Traicionar) aunque (50,50) sería mejor para AMBOS. La traición es estrategia dominante."
                },
                socratic_questions: [
                    {
                        q: "¿Puede haber más de un Equilibrio de Nash en un juego?",
                        hint: "Piensa en el juego de 'Battle of the Sexes'",
                        answer: "SÍ. Ejemplo: tú y tu pareja eligen entre Fútbol o Teatro. Ambos prefieren estar juntos que separados. Hay DOS equilibrios de Nash: (Fútbol, Fútbol) y (Teatro, Teatro). Requieren coordinación para elegir uno."
                    },
                    {
                        q: "En el Dilema del Prisionero, ¿por qué no cooperan si ambos estarían mejor?",
                        hint: "¿Qué pasa si el otro traiciona y tú cooperas?",
                        answer: "Porque traicionar es estrategia dominante. Si el otro coopera, yo gano más traicionando (80 > 50). Si el otro traiciona, yo pierdo menos traicionando (30 > 10). Racionalmente, ambos traicionan aunque cooperar sería Pareto superior."
                    }
                ]
            },

            // ============ MACROECONOMÍA ============
            {
                id: 't8-macro-pib',
                title: '8. PIB y Contabilidad Nacional',
                content: 'Medición del producto y el ingreso agregado',
                lesson: {
                    explanation: "El PIB mide el valor de mercado de todos los bienes y servicios FINALES producidos en un país durante un año. Solo cuenta bienes finales para evitar doble contabilización. PIB = C + I + G + (X-M). PIB Nominal usa precios corrientes. PIB Real usa precios constantes (ajustado por inflación). PIB Real es mejor para medir crecimiento económico real.",
                    example_title: "Pan y Harina",
                    example: "El trigo se vende en $10, se convierte en harina por $20, y en pan final por $50. El PIB solo cuenta los $50 del pan (bien final). Si contáramos todo ($10+$20+$50=$80), estaríamos contando el trigo 3 veces. Alternativamente, suma VALOR AGREGADO: Trigo ($10) + Harina ($20-$10=$10) + Pan ($50-$20=$30) = $50 PIB."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué la compra de acciones en la Bolsa NO cuenta en el PIB?",
                        hint: "¿Se está produciendo algo nuevo?",
                        answer: "Porque es una transacción financiera, no la producción de un bien o servicio. Las acciones son un activo que cambia de manos. Solo contaría en el PIB la COMISIÓN del corredor (ese sí es un servicio producido)."
                    },
                    {
                        q: "Si el PIB Nominal sube 8% pero la inflación fue 5%, ¿cuánto creció la economía REALMENTE?",
                        hint: "Usa la aproximación: %ΔPIB Real ≈ %ΔPIB Nominal - Inflación",
                        answer: "Aproximadamente 3%. El PIB Real = PIB Nominal / Deflactor. Si eliminamos el efecto de los precios (5%), el crecimiento REAL fue solo 3%. La economía creció menos de lo que parece."
                    }
                ]
            },
            {
                id: 't9-macro-islm',
                title: '9. Modelo IS-LM',
                content: 'Equilibrio simultáneo en mercado de bienes y dinero',
                lesson: {
                    explanation: "IS (Inversión-Ahorro) muestra equilibrio en mercado de BIENES. Pendiente negativa: mayor tasa de interés → menor inversión → menor producción. LM (Liquidez-Dinero) muestra equilibrio en mercado MONETARIO. Pendiente positiva: mayor producción → mayor demanda de dinero → mayor tasa de interés. La intersección determina (i*, Y*) simultáneamente.",
                    example_title: "Política Fiscal vs Monetaria",
                    example: "Gobierno aumenta gasto (↑G). IS se desplaza a la derecha. Nueva intersección: Y sube (↑PIB), i sube (↑tasa). Pero la tasa alta desalienta inversión privada (crowding-out). Banco Central aumenta oferta monetaria (↑M). LM se desplaza a la derecha. Nueva intersección: Y sube, i BAJA. Estimula economía SIN crowding-out. ¿Cuál usarías en recesión?"
                },
                socratic_questions: [
                    {
                        q: "¿Qué es el efecto crowding-out y por qué ocurre?",
                        hint: "¿Qué pasa con la tasa de interés cuando el gobierno gasta más?",
                        answer: "Cuando el gobierno aumenta G (política fiscal expansiva), la tasa de interés SUBE (IS a la derecha). La tasa alta DESALIENTA la inversión privada. El gasto público 'desplaza' inversión privada. Es el costo de la política fiscal: estimulas con una mano pero frenas con la otra."
                    },
                    {
                        q: "¿En qué situación la política monetaria es completamente inefectiva?",
                        hint: "Trampa de liquidez",
                        answer: "En la TRAMPA DE LIQUIDEZ (i ≈ 0%). La LM es horizontal. Aumentar M no baja más la tasa (ya está en cero). No hay incentivo adicional para invertir. La política monetaria pierde tracción. Solo queda la política fiscal. Japón en los 90s."
                    }
                ]
            },
            {
                id: 't10-macro-mundell',
                title: '10. Modelo Mundell-Fleming',
                content: 'IS-LM en economía abierta',
                lesson: {
                    explanation: "Mundell-Fleming extiende IS-LM a una economía abierta. La Trinidad Imposible establece que NO puedes tener: (1) Tipo de cambio fijo, (2) Libre movilidad de capitales, Y (3) Política monetaria independiente. Debes elegir solo DOS. Con tipo de cambio fijo, la política fiscal es muy potente pero la monetaria es inútil (se gasta defendiendo el tipo de cambio).",
                    example_title: "México post-1994",
                    example: "México tenía tipo de cambio fijo ($3.40/dólar), libre movilidad de capitales, pero NO podía usar política monetaria independiente. En diciembre 1994, cuando se agotaron las reservas, tuvo que DEVALUAR (abandonar tipo fijo). Hoy tiene tipo FLEXIBLE, lo que le da política monetaria independiente (Banxico sube tasas sin defender un tipo de cambio)."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué con tipo de cambio fijo la política monetaria expansiva NO aumenta Y?",
                        hint: "¿Qué pasa cuando bajas la tasa de interés con libre movilidad de capitales?",
                        answer: "Bajas i → capitales SALEN del país (buscan mayor rendimiento afuera) → presión a DEPRECIAR moneda → Banco Central VENDE dólares y COMPRA pesos (defendiendo tipo fijo) → Oferta monetaria REGRESA a su nivel original. ¡La política monetaria se auto-destruye!"
                    },
                    {
                        q: "¿Qué combinación de la Trinidad Imposible tienen China y Estados Unidos?",
                        hint: "China controla su tipo de cambio. USA tiene dólar flotante",
                        answer: "China: Tipo de cambio fijo + Política monetaria independiente = NO libre movilidad de capitales (controles de capital). USA: Tipo de cambio flexible + Libre movilidad de capitales = Política monetaria independiente. Dos estrategias distintas."
                    }
                ]
            },
            {
                id: 't11-macro-inflacion',
                title: '11. Inflación y Curva de Phillips',
                content: 'Relación entre inflación y desempleo',
                lesson: {
                    explanation: "La Curva de Phillips (corto plazo) muestra un trade-off: menor desempleo → mayor inflación. Cuando contratas más gente, los salarios suben (escasez de trabajadores), los costos suben, los precios suben. En el LARGO plazo, la curva es VERTICAL a la tasa natural de desempleo (NAIRU). No hay trade-off permanente: puedes tener inflación alta Y desempleo alto (estanflación años 70s).",
                    example_title: "La Ilusión del Banco Central",
                    example: "El banco central baja tasas, estimula economía, desempleo cae de 5% a 3%. ¡Éxito! Pero los trabajadores notan que la inflación subió de 2% a 5%. Exigen salarios más altos. Costos suben. Inflación sube a 8%. Al final, el desempleo REGRESA a 5% (tasa natural) pero ahora con inflación de 8%. Solo ganaste inflación, no empleo permanente."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué en el largo plazo la Curva de Phillips es vertical?",
                        hint: "Expectativas adaptativas",
                        answer: "Porque la gente ajusta sus expectativas de inflación. Si el banco central intenta mantener desempleo bajo inflando la economía, la gente anticipa la inflación y la incorpora en contratos salariales. Al final, vuelves a la tasa natural de desempleo pero con mayor inflación. No hay trade-off en el largo plazo."
                    },
                    {
                        q: "¿Qué tipo de shock causaría inflación SIN reducir el desempleo (peor escenario)?",
                        hint: "Shock de oferta negativo",
                        answer: "Un SHOCK DE OFERTA negativo (ej. aumento del petróleo en 1973). Los costos de producción suben, la Oferta Agregada se contrae, suben precios (inflación) Y cae producción (más desempleo). Inflación + Recesión = ESTANFLACIÓN. La peor combinación."
                    }
                ]
            },
            {
                id: 't12-macro-solow',
                title: '12. Modelo de Solow - Crecimiento Económico',
                content: 'Teoría del crecimiento de largo plazo',
                lesson: {
                    explanation: "Solow explica el crecimiento del PIB per cápita a largo plazo. En el estado estacionario, la inversión bruta iguala a la depreciación. El capital per cápita (k) deja de crecer. La acumulación de capital SOLA no genera crecimiento perpetuo por rendimientos decrecientes. Solo el PROGRESO TECNOLÓGICO puede sostener crecimiento continuo del ingreso per cápita.",
                    example_title: "¿Por qué Corea del Sur creció tanto?",
                    example: "1960: Corea invierte 10% del PIB, acumula capital, crece 8% anual. 1980: Ya tiene mucho capital, rendimientos decrecientes, crece solo 4%. ¿Se estancará? NO. Adopta nueva tecnología (Samsung, LG), mejora educación, innovación. Ahora con el MISMO capital, producen MÁS (progreso tecnológico = A). Vuelve a crecer 6%. Tecnología > Capital."
                },
                socratic_questions: [
                    {
                        q: "Si un país aumenta su tasa de ahorro (s) de 20% a 30%, ¿crecerá para siempre más rápido?",
                        hint: "Piensa en el nuevo estado estacionario",
                        answer: "NO. Mayor ahorro aumenta la inversión, el capital per cápita SUBE y llega a un NUEVO estado estacionario más alto. Hay crecimiento TRANSITORIO mientras ajusta, pero eventualmente se detiene en el nuevo equilibrio. Para crecer perpetuamente se necesita progreso tecnológico constante."
                    },
                    {
                        q: "¿Por qué los países pobres crecen más rápido que los ricos (convergencia)?",
                        hint: "Rendimientos decrecientes del capital",
                        answer: "Porque tienen POCO capital inicial. Cada máquina nueva es MUY productiva (altos rendimientos marginales). Los países ricos ya tienen MUCHO capital, cada máquina adicional agrega poco. Si ambos tienen la misma tecnología, el pobre 'alcanza' al rico. Eso sí, si no hay tecnología ni instituciones, no convergen (África)."
                    }
                ]
            },
            {
                id: 't13-macro-fiscal',
                title: '13. Política Fiscal y Multiplicador del Gasto',
                content: 'Efectos del gasto e impuestos gubernamentales',
                lesson: {
                    explanation: "El Multiplicador del Gasto mide cuánto aumenta el PIB por cada peso adicional de gasto público. Multiplicador = 1/(1-c(1-t)), donde c es propensión marginal a consumir y t la tasa impositiva. Si c=0.8 y t=0.25, multiplicador = 1/(1-0.8(0.75)) = 1/0.4 = 2.5. ¡Cada peso gastado aumenta Y en $2.50! Pero ojo con el crowding-out (sube tasa de interés).",
                    example_title: "Estímulo Fiscal de López Obrador",
                    example: "Gobierno gasta $100,000 millones extras en Tren Maya. Primera ronda: trabajadores reciben ese ingreso. Segunda ronda: gastan 80% ($80,000 millones, c=0.8). Tercera ronda: esos receptores gastan 80% de $80,000 = $64,000. Y así sucesivamente. Total: $100k + $80k + $64k + ... = $100k × (1/(1-0.8)) = $500,000 millones de PIB. Multiplicador = 5 (sin impuestos)."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué el multiplicador de los impuestos es MENOR que el del gasto público?",
                        hint: "Primer impacto: gasto público va 100% a la economía, impuestos no",
                        answer: "Porque cuando el gobierno GASTA $100, los $100 van directamente a la economía. Cuando BAJA impuestos en $100, la gente solo GASTA una fracción c (ej. 80%), ahorra el resto. El primer impacto es menor: $80 vs $100. Multiplicador de impuestos = -c/(1-c). Es menor (en valor absoluto) que 1/(1-c)."
                    },
                    {
                        q: "Si el gobierno aumenta G y T en la misma cantidad, ¿el PIB aumenta, baja o queda igual?",
                        hint: "Multiplicador balanceado (Teorema de Haavelmo)",
                        answer: "AUMENTA exactamente en la cantidad del aumento (multiplicador balanceado = 1). Ejemplo: ↑G=$100, ↑T=$100. ΔY = $100×(mult G) - $100×(mult T) = $100×(1/(1-c)) - $100×(c/(1-c)) = $100. El efecto neto es positivo pero moderado."
                    }
                ]
            },
            {
                id: 't14-macro-monetaria',
                title: '14. Política Monetaria',
                content: 'Control de oferta monetaria y tasas de interés',
                lesson: {
                    explanation: "El Banco Central controla la oferta monetaria (M) para influir en la economía. Instrumentos: (1) Operaciones de Mercado Abierto (compra/venta bonos), (2) Tasa de redescuento, (3) Reservas obligatorias. Mecanismo: ↑M → ↓i → ↑I → ↑DA → ↑Y. Política expansiva estimula la economía (útil en recesión). Política contractiva frena inflación (sube tasas).",
                    example_title: "Banxico vs Inflación 2022-2024",
                    example: "2022: Inflación llega a 8.7% (muy alta). Banxico sube tasa de 4% a 11.25% (política contractiva). ↑i → ↓Consumo (créditos más caros) + ↓Inversión (préstamos caros) → ↓DA → ↓Presión inflacionaria. 2024: Inflación baja a 4%. Banxico empieza a BAJAR tasas (política expansiva) para no frenar economía. Es un balance delicado."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué comprar bonos gubernamentales AUMENTA la oferta monetaria?",
                        hint: "¿Con qué paga el Banco Central?",
                        answer: "Cuando Banxico COMPRA bonos del mercado, PAGA con dinero nuevo (lo crea electrónicamente). Ese dinero entra a la economía. Los bancos tienen más reservas, prestan más, multiplicador monetario actúa. M aumenta. Al VENDER bonos, hace lo contrario: retira dinero de circulación."
                    },
                    {
                        q: "Si el banco central quiere bajar la tasa de interés pero la gente espera alta inflación, ¿funcionará?",
                        hint: "Tasa real vs nominal (Ecuación de Fisher)",
                        answer: "Depende de la tasa REAL, no nominal. Ecuación de Fisher: i_real = i_nominal - π_esperada. Si el banco baja i_nominal a 5% pero la inflación esperada es 6%, la tasa real es ¡-1%! (negativa). Eso SÍ estimula. Pero si solo baja a 7%, la tasa real es +1%, aún restrictiva. Las expectativas importan."
                    }
                ]
            }
        ]
    },
    {
        id: 'eco-2',
        title: 'Economía II: Finanzas',
        desc: 'Proyectos y Riesgo',
        icon: '📈',
        color: '#4ade80',
        detailed_report: `# Clase Magistral de Finanzas Corporativas
**Tema: Herramientas Críticas para la Valuación y Decisión Financiera**

## 1. El Costo de los Fondos: WACC
El **WACC** (Weighted Average Cost of Capital) representa el costo promedio de las fuentes de financiamiento (deuda y capital propio), ponderado por su peso en la estructura.
*   **Costo de la deuda:** Más bajo y deducible de impuestos.
*   **Costo del capital propio (Ke):** Más alto por el riesgo residual del accionista.
*   **Uso:** Es la "varilla de salto". Cualquier proyecto debe rendir más que el WACC para crear valor (EVA positivo).

## 2. Costo Anual Equivalente (CAE)
Indispensable para comparar proyectos con **vidas útiles diferentes**.
*   **Problema:** El Valor Presente (VPN) favorece proyectos de corta duración con inversión baja, ignorando que tendrás que reemplazarlos pronto.
*   **Solución:** El CAE convierte el costo total (inversión + operación) en una anualidad uniforme. Elige siempre la opción con menor CAE.

## 3. Periodo de Recuperación (Payback)
Tiempo necesario para recuperar la inversión inicial.
*   **Ventaja:** Mide liquidez y riesgo simple.
*   **Desventaja:** Ignora el valor del dinero en el tiempo y todos los flujos después del punto de corte (miopía financiera).

## 4. Punto de Equilibrio Financiero
Nivel de ventas donde Ingresos Totales = Costos Totales.
*   **Utilidad Operativa = 0.**
*   Si vendes una unidad más, entras en zona de ganancias.
*   Ayuda a medir el "Margen de Seguridad": ¿cuánto pueden caer mis ventas antes de empezar a perder dinero?

## 5. Apalancamiento (Leverage)
Uso de costos fijos para magnificar rendimientos.
*   **Apalancamiento Operativo:** Muchos costos fijos operativos (máquinas, rentas). Si vendes más, tu utilidad explota. Si vendes menos, quiebras rápido.
*   **Apalancamiento Financiero:** Mucha deuda. Aumenta el ROE de los socios, pero sube el riesgo de insolvencia.`,
        topics: [
            {
                id: 't1-fin',
                title: 'WACC',
                content: 'Costo Promedio Ponderado.',
                lesson: {
                    explanation: "Es el promedio del costo de tu deuda y tu capital. Es la 'varilla' que tus proyectos deben saltar para ser aprobados.",
                    example_title: "Dinero Mixto",
                    example: "Si el banco te cobra 10% y tus socios piden 20%, tu costo real es un promedio (ej. 15%). Si un proyecto da 12%, lo rechazas aunque parezca rentable, porque no contenta a los socios."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué el costo del capital propio (Ke) siempre es mayor al costo de la deuda (Kd)?",
                        hint: "Riesgo de cobro.",
                        answer: "Porque los accionistas son los últimos en cobrar si la empresa quiebra (riesgo residual), así que exigen mayor premio que el banco."
                    }
                ]
            },
            {
                id: 't2-fin',
                title: 'Costo Anual Equivalente (CAE)',
                content: 'Vidas útiles distintas.',
                lesson: {
                    explanation: "Convierte el costo total de un proyecto en una 'renta anual'. Indispensable para comparar máquinas que duran distinto.",
                    example_title: "La Maquina Duradera",
                    example: "Máquina A cuesta $100 y dura 1 año. Máquina B cuesta $150 y dura 2 años. B es más cara en total, pero por año ($75) es más barata que A ($100)."
                },
                socratic_questions: [
                    {
                        q: "Si usas solo Valor Presente (VPN) para comparar proyectos de distinta duración, ¿qué error cometes?",
                        hint: "Reemplazo.",
                        answer: "Ignoras que el proyecto corto tendrá que repetirse (y volver a pagarse) para cubrir el mismo tiempo que el largo."
                    }
                ]
            },
            {
                id: 't3-fin-new',
                title: 'Periodo de Recuperación (Payback)',
                content: 'Velocidad de retorno.',
                lesson: {
                    explanation: "Tiempo que tardas en recuperar tu inversión inicial. Mide liquidez y riesgo, pero ignora lo que pasa después del punto de recuperación.",
                    example_title: "El Negocio Rápido",
                    example: "Proyecto A: Inviertes 100, recibes 50/año (recuperas en 2 años). Proyecto B: Inviertes 100, recibes 0 por 3 años y luego 1000. Payback prefiere A, aunque B te haga millonario."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué el Payback es un mal indicador de rentabilidad (creación de riqueza)?",
                        hint: "Valor del dinero en el tiempo y flujos tardíos.",
                        answer: "Porque ignora el valor del dinero en el tiempo (un peso hoy vale más que mañana) y desprecia totalmente las ganancias gigantes que podrían venir después de recuperar la inversión."
                    }
                ]
            },
            {
                id: 't4-fin-new',
                title: 'Punto de Equilibrio Financiero',
                content: 'Ni ganancia ni pérdida.',
                lesson: {
                    explanation: "El nivel de ventas donde tus ingresos cubren exactamente tus costos fijos y variables. Utilidad = 0. A partir de aquí empiezas a ganar.",
                    example_title: "Vender para vivir",
                    example: "Tienes costos fijos de $1000 (renta). Ganas $10 por cada café vendido. Necesitas vender 100 cafés solo para pagar la renta. Tu punto de equilibrio son 100 cafés."
                },
                socratic_questions: [
                    {
                        q: "¿Qué le pasa al Punto de Equilibrio si aumentas tus Costos Fijos (te mudas a un local más caro)?",
                        hint: "La mochila pesa más.",
                        answer: "Aumenta. Necesitas vender más unidades solo para empezar a generar utilidades, lo que incrementa el riesgo operativo."
                    }
                ]
            },
            {
                id: 't5-fin-new',
                title: 'Apalancamiento Operativo',
                content: 'Potencia de las utilidades.',
                lesson: {
                    explanation: "Uso de costos fijos para magnificar ganancias. Si tienes muchos costos fijos y pocos variables, un pequeño aumento en ventas dispara tu utilidad.",
                    example_title: "Software vs Consultoría",
                    example: "Software (Alto Apalancamiento): Cuesta millones hacerlo (Fijo), pero vender una copia extra cuesta $0 (Variable). Si vendes mucho, todo es ganancia pura. Consultoría (Bajo): Cada cliente requiere horas de consultor (Variable)."
                },
                socratic_questions: [
                    {
                        q: "En una recesión donde las ventas caen, ¿quién sufre más: la empresa con alto o bajo apalancamiento operativo?",
                        hint: "Rigidez de costos.",
                        answer: "La de Alto Apalancamiento. Al tener muchos costos fijos que no puede quitarse, sus pérdidas se magnifican rápidamente cuando bajan las ventas."
                    }
                ]
            }
        ]
    },
    {
        id: 'eco-3',
        title: 'Economía III: Internacional',
        desc: 'Comercio y Bienestar',
        icon: '🌍',
        color: '#facc15',
        detailed_report: `# Teoría Económica Internacional
**Módulo: Fundamentos de Comercio y Bienestar**

## 1. El Modelo Heckscher-Ohlin
Explica el comercio basándose en la **dotación de factores**.
*   Un país exportará el bien que utiliza intensivamente su factor abundante.
*   Ejemplo: China (abundante en trabajo) exporta manufacturas. EE.UU. (abundante en capital) exporta tecnología/servicios.

## 2. Teorema Stolper-Samuelson
Analiza quién gana y quién pierde con el comercio dentro del país.
*   **Ganador:** El dueño del factor abundante (sus servicios son más demandados globalmente).
*   **Perdedor:** El dueño del factor escaso (ahora compite con importaciones baratas).
*   **Conclusión:** El comercio aumenta el bienestar total del país, pero empeora la distribución del ingreso a menos que haya compensaciones.

## 3. Teorema de Arrow (Elección Social)
Demuestra matemáticamente que no existe un sistema de votación perfecto (democracia ideal) que cumpla simultáneamente con criterios básicos de lógica y justicia cuando hay más de 2 opciones.
*   **Paradoja de Condorcet:** Las preferencias pueden ser cíclicas (A gana a B, B gana a C, C gana a A).
*   **Implicación:** La "voluntad del pueblo" puede ser un artefacto de cómo se organiza la votación (quién controla la agenda).`,
        topics: [
            {
                id: 't1-intl',
                title: 'Teorema Stolper-Samuelson',
                content: 'Ganadores del comercio.',
                lesson: {
                    explanation: "El comercio sube el pago al factor abundante. En México (abundante en trabajo), el libre comercio debería subir los salarios reales.",
                    example_title: "Maquiladoras",
                    example: "Al llegar fábricas extranjeras por el TLCAN, aumentó la demanda de operarios mexicanos, presionando sus salarios al alza en la frontera norte (en teoría)."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué en EE.UU. (abundante en capital) los obreros suelen estar en contra del libre comercio?",
                        hint: "Factor escaso.",
                        answer: "Porque son el factor escaso allá. Compiten contra la mano de obra barata importada, lo que presiona sus salarios a la baja."
                    }
                ]
            },
            {
                id: 't2-intl',
                title: 'Teorema de Arrow',
                content: 'Paradoja del voto.',
                lesson: {
                    explanation: "Es imposible un sistema de votación perfecto con >2 opciones. Siempre violarás alguna regla de lógica o justicia.",
                    example_title: "El Ciclo Sin Fin",
                    example: "A gana a B. B gana a C. C gana a A. El resultado de la elección depende de en qué orden pongas las votaciones, no de lo que la gente quiere."
                },
                socratic_questions: [
                    {
                        q: "¿Qué implica el Teorema de Arrow sobre la frase 'la voluntad del pueblo'?",
                        hint: "Agregación de preferencias.",
                        answer: "Que matemáticamente tal vez no existe. Las preferencias individuales racionales pueden sumar una preferencia colectiva irracional o cíclica."
                    }
                ]
            }
        ]
    },
    {
        id: 'con-1',
        title: 'Contaduría I: Información',
        desc: 'Costos y Normas',
        icon: '📑',
        color: '#f472b6',
        detailed_report: `# Normatividad Contable y Costos

## 1. Sustancia Económica (NIF A-2)
La contabilidad debe capturar la **esencia económica** de la transacción, no su forma legal.
*   **Ejemplo:** Arrendamiento Financiero. Legalmente es renta, económicamente es una compra a crédito. Se registra el Activo y la Deuda.

## 2. Costeo Absorbente (NIF C-4)
Método obligatorio para valuar inventarios y determinar el Costo de Ventas.
*   **Regla:** Todos los costos de producción (Fijos y Variables) se absorben en el costo del producto.
*   **Efecto:** Si produces más de lo que vendes, "escondes" costos fijos en el inventario final, inflando la utilidad del periodo.

## 3. Depreciación (NIF C-6)
Reconocimiento sistemático del desgaste de un componente.
*   **Métodos:** Línea Recta (uniforme), Saldos Decrecientes (acelerada), Unidades Producidas.
*   **Depreciación Acelerada:** Útil fiscalmente para deducir más rápido, o financieramente para activos que pierden valor rápido (tecnología).

## 4. Estado de Flujos de Efectivo (NIF B-2)
Muestra la generación y uso de efectivo real.
*   **Operación:** El negocio diario (Cobros a clientes - Pagos a prov/empleados). Es el más importante.
*   **Inversión:** Compra/Venta de activos fijos (Maquinaria, Edificios).
*   **Financiamiento:** Deuda bancaria o aportaciones/retiros de socios.

## 5. Costeo Estándar
Costo predeterminado bajo condiciones de eficiencia.
*   Sirve para medir el desempeño. La diferencia entre el Costo Real y el Estándar se llama **Desviación** (en Precio o en Cantidad) y debe analizarse para corregir ineficiencias.`,
        topics: [
            {
                id: 't1-cont',
                title: 'Sustancia Económica',
                content: 'Realidad sobre forma.',
                lesson: {
                    explanation: "Registra lo que es, no lo que dice el papel. Si vendes algo pero sigues usándolo y pagando por él, es un préstamo garantizado, no una venta.",
                    example_title: "Sale & Leaseback",
                    example: "Vendes tu edificio y lo rentas por 30 años. Legalmente no es tuyo. Contablemente SÍ es tuyo (Activo) y el dinero que recibiste es deuda (Pasivo)."
                },
                socratic_questions: [
                    {
                        q: "¿Qué NIF postula que la forma legal no debe ocultar la realidad financiera?",
                        hint: "NIF A-2.",
                        answer: "La NIF A-2 (Postulados Básicos). Sustancia Económica obliga a capturar la esencia de la transacción."
                    }
                ]
            },
            {
                id: 't2-cont',
                title: 'Costeo Absorbente',
                content: 'Costo total.',
                lesson: {
                    explanation: "El costo fijo de fábrica se guarda en el producto. Si no vendes, el costo se va al inventario y no afecta tu utilidad hoy.",
                    example_title: "Esconder pérdidas en el almacén",
                    example: "Fabricas mucho para bajar el costo unitario. Como no vendes, esos costos no aparecen en el Estado de Resultados. Tu utilidad sube artificialmente, pero tu almacén está lleno de costos."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué el Costeo Directo (Variable) es mejor para la toma de decisiones internas?",
                        hint: "Margen de contribución.",
                        answer: "Porque no mezcla costos fijos con variables. Te permite ver exactamente cuánto ganas por cada unidad extra vendida (Margen de Contribución) sin el 'ruido' de los costos fijos asignados."
                    }
                ]
            },
            {
                id: 't3-cont-new',
                title: 'Métodos de Depreciación (NIF C-6)',
                content: 'Desgaste contable.',
                lesson: {
                    explanation: "Reconocer que los activos pierden valor. Línea Recta: Igual cada año. Saldos Decrecientes: Mucho al principio, poco al final.",
                    example_title: "El Coche Nuevo",
                    example: "Un coche pierde 20% de su valor en cuanto sale de la agencia (Depreciación acelerada real). Si usas Línea Recta, contablemente pierde igual el año 1 que el año 10. Saldos Decrecientes se acerca más a la realidad del coche."
                },
                socratic_questions: [
                    {
                        q: "¿Cuándo convendría fiscal o financieramente usar una depreciación acelerada?",
                        hint: "Impuestos hoy vs mañana.",
                        answer: "Para deducir más gastos AHORA y pagar menos impuestos hoy (diferir el impuesto). Financieramente, si el activo es tecnológico y se vuelve obsoleto rápido."
                    }
                ]
            },
            {
                id: 't4-cont-new',
                title: 'Estado de Flujos de Efectivo (NIF B-2)',
                content: 'Operación, Inversión, Financiamiento.',
                lesson: {
                    explanation: "Muestra de dónde vino el dinero y a dónde fue. La utilidad es una opinión, el efectivo es un hecho. Se divide en Operación (diario), Inversión (activos) y Financiamiento (deuda/socios).",
                    example_title: "Rico pero sin dinero",
                    example: "Vendes muchísimo a crédito. Tu Estado de Resultados dice 'Utilidad Gigante'. Tu Flujo de Efectivo Operativo dice 'Cero', porque no has cobrado. ¡Puedes quebrar ganando dinero!"
                },
                socratic_questions: [
                    {
                        q: "Si una empresa tiene Flujo Operativo Negativo pero Flujo de Financiamiento Positivo, ¿qué está pasando?",
                        hint: "Sobreviviendo con tarjeta de crédito.",
                        answer: "Su negocio principal no genera dinero; está sobreviviendo pidiendo préstamos o dinero a los socios. Es una situación insostenible a largo plazo."
                    }
                ]
            },
            {
                id: 't5-cont-new',
                title: 'Costeo Estándar',
                content: 'Lo que DEBERÍA costar.',
                lesson: {
                    explanation: "Calculas cuánto deberías gastar en condiciones ideales (eficiencia perfecta). Luego comparas con la realidad y analizas las 'Desviaciones'.",
                    example_title: "La Receta del Chef",
                    example: "La receta dice que la hamburguesa lleva 200g de carne (Estándar). En la realidad, el cocinero usó 250g. Tienes una 'Desviación en Cantidad' de 50g que debes investigar (¿robo, desperdicio, error?)."
                },
                socratic_questions: [
                    {
                        q: "Si tienes una Desviación favorable en Precio (barato) pero desfavorable en Cantidad (usas mucho), ¿qué pudo pasar?",
                        hint: "Lo barato sale caro.",
                        answer: "Compraste materia prima de mala calidad. Ahorraste en el precio, pero rinde menos o se rompe, obligándote a usar más cantidad."
                    }
                ]
            }
        ]
    },
    {
        id: 'con-2',
        title: 'Contaduría II: Fiscal',
        desc: 'Impuestos y Leyes',
        icon: '⚖️',
        color: '#a78bfa',
        detailed_report: `# Guía Fiscal Integral 2025

## 1. Acumulación de Ingresos
*   **P. Morales (Título II):** Acumulan al FACTURAR (expedir CFDI), entregar el bien o cobrar (lo que ocurra primero). Pagan ISR sobre utilidades devengadas, aunque no tengan flujo.
*   **RESICO / Físicas:** Acumulan al COBRAR efectivamente. Pagan sobre flujo de efectivo real.

## 2. Discrepancia Fiscal
Mecanismo de control del SAT para Personas Físicas.
*   Si **Erogaciones (Gastos + Tarjetas + Depósitos) > Ingresos Declarados**, se presume ingreso omitido.
*   El contribuyente debe aclarar el origen (préstamos, donaciones, ahorros) o pagar ISR + Multas.

## 3. Deducciones Personales
Gastos que reducen la base gravable en la Declaración Anual.
*   Salud, Educación, Funeral, Hipoteca real.
*   **Requisito Vital:** Deben pagarse con medios electrónicos (Tarjeta, Cheque, Transferencia). El efectivo NO deduce.

## 4. Pagos Provisionales
Anticipos mensuales a cuenta del ISR anual.
*   Se calculan aplicando un **Coeficiente de Utilidad** (histórico) a los ingresos nominales del mes.
*   Problema: Si tu margen real bajó este año, tus pagos provisionales serán excesivos y tendrás saldo a favor al final.

## 5. IVA Acreditable
Derecho a restar el IVA que pagas a proveedores del IVA que cobras a clientes.
*   Requisitos: Gasto deducible, traslado expreso, pago efectivo.
*   **Proporcionalidad:** Si tienes ingresos Exentos y Gravados, solo puedes acreditar una proporción del IVA de tus gastos compartidos.`,
        topics: [
            {
                id: 't1-fisc',
                title: 'Acumulación de Ingresos',
                content: '¿Cuándo pagas?',
                lesson: {
                    explanation: "Personas Morales: Al facturar (Devengado). RESICO: Al cobrar (Flujo Efectivo).",
                    example_title: "La Trampa de Facturar",
                    example: "Facturas hoy, cobras en 3 meses. El SAT te pide el IVA e ISR el mes que viene. Tienes que sacar de tu bolsa para pagar impuestos de dinero que no tienes. ¡Cuidado con el flujo!"
                },
                socratic_questions: [
                    {
                        q: "¿Cuál es la lógica de cobrarle impuestos a una Persona Moral sobre ingresos no cobrados (crédito)?",
                        hint: "Capacidad administrativa.",
                        answer: "Se asume que una empresa grande tiene capacidad financiera para financiar el impuesto y controles para asegurar el cobro. En cambio, a las Pymes (RESICO) se les protege cuidando su liquidez."
                    }
                ]
            },
            {
                id: 't2-fisc',
                title: 'Discrepancia Fiscal',
                content: 'Gastos > Ingresos.',
                lesson: {
                    explanation: "Si gastas más de lo que declaras ganar, el SAT asume que mientes y que la diferencia es ingreso oculto.",
                    example_title: "Vida de Rico, Declaración de Pobre",
                    example: "Declaras $5,000 al mes pero pagas tarjeta Platinum de $50,000. El SAT ve tus gastos y te cobra impuestos sobre los $45,000 de diferencia, más multas."
                },
                socratic_questions: [
                    {
                        q: "¿Los préstamos y donativos cuentan como Discrepancia Fiscal?",
                        hint: "Informar.",
                        answer: "No, SIEMPRE Y CUANDO se informen correctamente en la declaración anual (si superan ciertos montos) y se tenga soporte documental. Si no avisas, el SAT asume que es ingreso."
                    }
                ]
            },
            {
                id: 't3-fisc-new',
                title: 'Deducciones Personales',
                content: 'Beneficios anuales.',
                lesson: {
                    explanation: "Gastos humanos (salud, educación, funeral) que puedes restar en tu Anual para pagar menos impuestos o pedir devolución. Tienen topes.",
                    example_title: "La visita al Dentista",
                    example: "Si pagas al dentista en efectivo, NO es deducible. Si pagas con tarjeta y pides factura, el SAT te devuelve una parte (ej. 30%) de ese gasto en abril."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué el SAT exige que las deducciones personales se paguen con medios electrónicos (tarjeta/cheque)?",
                        hint: "Rastreo.",
                        answer: "Para asegurar la trazabilidad del dinero y evitar facturas falsas o simulación de operaciones que ocurren mucho con el efectivo."
                    }
                ]
            },
            {
                id: 't4-fisc-new',
                title: 'Pagos Provisionales (ISR)',
                content: 'Abonos chiquitos.',
                lesson: {
                    explanation: "Es un anticipo a cuenta del impuesto anual. Se calcula usando un 'Coeficiente de Utilidad' del año pasado (tu margen de ganancia histórico).",
                    example_title: "Pagando por el pasado",
                    example: "El año pasado ganaste mucho (Coeficiente alto). Este año vendes igual pero tus costos subieron y no ganas nada. ¡El SAT te sigue cobrando impuestos altos porque usa tu coeficiente viejo! Estás pagando utilidades que no tienes."
                },
                socratic_questions: [
                    {
                        q: "¿Qué puedes hacer si a mitad de año te das cuenta que tus Pagos Provisionales son excesivos comparados con tu utilidad real?",
                        hint: "Solicitud.",
                        answer: "Solicitar una Disminución de Pagos Provisionales a partir del segundo semestre, demostrando con estados financieros que el coeficiente es demasiado alto."
                    }
                ]
            },
            {
                id: 't5-fisc-new',
                title: 'IVA Acreditable',
                content: 'Cadena de impuestos.',
                lesson: {
                    explanation: "Tú cobras IVA (Trasladado) y pagas IVA (Acreditable). Solo le das al SAT la diferencia. Si pagas más del que cobras, tienes Saldo a Favor.",
                    example_title: "El Médico y el IVA",
                    example: "Un médico NO cobra IVA (Exento). Pero sí paga IVA en luz, renta, teléfono. Como no cobra, no puede restar ('acreditar') ese IVA que pagó. Para él, el IVA se convierte en un costo, no en un impuesto de paso."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué un exportador (Tasa 0%) está en la mejor posición posible respecto al IVA?",
                        hint: "Devolución.",
                        answer: "Porque no cobra IVA (0%), pero sí acredita todo el IVA que paga a sus proveedores. El SAT le tiene que DEVOLVER todo ese dinero cada mes. Flujo de efectivo positivo."
                    }
                ]
            }
        ]
    },
    {
        id: 'con-3',
        title: 'Contaduría III: Auditoría',
        desc: 'Dictámenes y Control',
        icon: '🔍',
        color: '#fb923c',
        detailed_report: `# Fundamentos de Auditoría

## 1. Riesgos de Auditoría
El auditor no revisa todo al 100%, se basa en riesgos.
*   **Riesgo Inherente:** Peligro natural de la cuenta o transacción (ej. efectivo, joyas, estimaciones complejas).
*   **Riesgo de Control:** Probabilidad de que los controles de la empresa fallen y no detecten el error.
*   **Riesgo de Detección:** Probabilidad de que el auditor falle en encontrar el error con sus pruebas. Es el único que el auditor controla (haciendo más pruebas).

## 2. Tipos de Opinión
El dictamen final sobre los Estados Financieros.
*   **No Modificada (Limpia):** Todo está razonablemente correcto.
*   **Con Salvedades:** Todo bien, EXCEPTO por un asunto específico (material pero no generalizado).
*   **Desfavorable (Negativa):** Los estados financieros NO sirven. El error es material y generalizado (afecta todo).
*   **Abstención de Opinión:** El auditor no pudo obtener evidencia (limitación al alcance) para opinar. No sabe si están bien o mal.`,
        topics: [
            {
                id: 't1-aud',
                title: 'Tipos de Opinión',
                content: 'Calificación del Auditor.',
                lesson: {
                    explanation: "Limpia (Todo bien). Salvedades (Todo bien excepto algo). Negativa (Todo mal). Abstención (No pude revisar).",
                    example_title: "El Inventario Perdido",
                    example: "Se quemó el almacén y no hay registros. El auditor no puede saber cuánto había. No puede decir que está mal ni bien. Dictamina: 'Abstención de Opinión' (No opino porque no sé)."
                },
                socratic_questions: [
                    {
                        q: "Si la empresa se niega a dejarte ver las cuentas bancarias, ¿qué opinión emites?",
                        hint: "Limitación al alcance.",
                        answer: "Abstención de Opinión. Si hay una limitación impuesta por la gerencia que te impide obtener evidencia sobre algo material, no puedes opinar."
                    }
                ]
            },
            {
                id: 't2-aud',
                title: 'Riesgo Inherente vs Control',
                content: 'Peligro natural vs Falla de seguridad.',
                lesson: {
                    explanation: "Inherente: Es peligroso per se. Control: La seguridad falló.",
                    example_title: "Diamantes vs Carbón",
                    example: "Auditar diamantes tiene alto Riesgo Inherente (se los pueden robar en el bolsillo). Auditar carbón, bajo riesgo. Si el almacén de diamantes lo dejan abierto, es alto Riesgo de Control."
                },
                socratic_questions: [
                    {
                        q: "¿Puede el auditor reducir el Riesgo Inherente de su cliente?",
                        hint: "Naturaleza del negocio.",
                        answer: "No. El auditor no puede cambiar el negocio del cliente. Solo puede evaluar ese riesgo y diseñar pruebas (Riesgo de Detección) para contrarrestarlo."
                    }
                ]
            }
        ]
    }
];