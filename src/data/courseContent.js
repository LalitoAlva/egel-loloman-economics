
export const modules = [
    {
        id: 'eco-1',
        title: 'Economía I: Fundamentos',
        desc: 'Micro, Macro y Modelos',
        icon: '📊',
        color: '#38bdf8',
        detailed_report: `# Fundamentos de Micro y Macroeconomía
**Capítulo: Análisis Integral de los Agentes y los Agregados Económicos**

## Introducción
La economía se divide en dos ramas principales para su estudio: la **microeconomía** y la **macroeconomía**. La microeconomía explora el comportamiento de los agentes individuales, como las empresas y las familias, y los factores que determinan el funcionamiento de mercados específicos. Se centra en las decisiones de precios, cantidades y los efectos de regulaciones e impuestos en mercados particulares. Por otro lado, la macroeconomía estudia el funcionamiento de la economía en su conjunto, analizando variables agregadas como el producto total (PIB), el empleo, la inflación y las tasas de interés.

---

## PARTE I: MICROECONOMÍA

### 1. Equilibrio del Consumidor
El objetivo fundamental del consumidor es maximizar su utilidad dada una restricción presupuestaria, eligiendo la mejor cesta de bienes que puede adquirir con su renta disponible.

#### 1.1 Preferencias y Restricción Presupuestaria
Las preferencias del consumidor se representan mediante **curvas de indiferencia**, que muestran combinaciones de bienes que otorgan el mismo nivel de satisfacción. Estas curvas tienen pendiente negativa y son convexas al origen. Por otro lado, la **restricción presupuestaria** (o recta de balance) indica las combinaciones de bienes que el consumidor puede comprar dado su ingreso y los precios del mercado.

#### 1.2 La Condición de Equilibrio
El consumidor alcanza el equilibrio cuando la curva de indiferencia es tangente a la recta presupuestaria. Matemáticamente, esto ocurre cuando la **Tasa Marginal de Sustitución (TMS)** —la disposición subjetiva a intercambiar un bien por otro— se iguala a la relación de precios del mercado ($Px/Py$).

### 2. Monopolio y Eficiencia
Un monopolio es una estructura de mercado donde existe un único vendedor de un bien o servicio que no tiene sustitutos cercanos.
*   **Maximización de Beneficios:** El monopolista elige el nivel de producción donde el Ingreso Marginal es igual al Costo Marginal (IMg = CMg).
*   **Ineficiencia Social:** A diferencia de la competencia perfecta, el monopolista fija un precio superior al Costo Marginal (P > CMg). Esto genera una **Pérdida Irrecuperable de Eficiencia**, ya que se producen menos unidades de las socialmente deseables.

### 3. Elasticidad Precio de la Demanda
Mide la sensibilidad de la cantidad demandada ante cambios en el precio.
*   **Demanda Elástica (>1):** Muy sensible. Si subes el precio, los ingresos totales caen.
*   **Demanda Inelástica (<1):** Poco sensible. Si subes el precio, los ingresos totales suben (ej. medicinas, vicios).

---

## PARTE II: MACROECONOMÍA

### 4. Modelo de Solow
Explica el crecimiento económico a largo plazo mediante la acumulación de capital, el crecimiento de la fuerza laboral y el cambio tecnológico.
*   **Estado Estacionario:** Punto donde la inversión bruta es igual a la depreciación del capital. En este punto, el capital por trabajador deja de crecer.
*   **Conclusión:** La acumulación de capital por sí sola no genera crecimiento perpetuo debido a los rendimientos decrecientes. Solo el **progreso tecnológico** puede sostener un aumento continuo en el nivel de vida.

### 5. Modelo IS-LM
Herramienta para analizar el equilibrio a corto plazo en una economía cerrada.
*   **Curva IS (Inversión-Ahorro):** Equilibrio en el mercado de bienes.
*   **Curva LM (Liquidez-Dinero):** Equilibrio en el mercado monetario.
La intersección determina la tasa de interés y el nivel de renta de equilibrio.

### 6. Modelo Mundell-Fleming
Extensión del IS-LM para una economía abierta (con comercio y capitales).
*   **Trinidad Imposible:** Un país no puede tener al mismo tiempo: 1) Tipo de cambio fijo, 2) Libre movilidad de capitales y 3) Política monetaria independiente.
*   **Resultado:** Con tipo de cambio fijo, la política fiscal es muy eficaz, pero la monetaria es inútil (se pierde en defender la moneda).`,
        topics: [
            {
                id: 't1-micro',
                title: 'Equilibrio del Consumidor',
                content: 'Optimización de la utilidad.',
                lesson: {
                    explanation: "El equilibrio se alcanza cuando la Tasa Marginal de Sustitución (TMS) se iguala a la relación de precios. Si TMS > Precios, valoras el bien más de lo que cuesta.",
                    example_title: "Pizza vs Hamburguesas",
                    example: "Si das 5 hamburguesas por 1 pizza (TMS=5) pero el mercado solo pide 2 (Px/Py=2), ¡compra más pizza! Ganas satisfacción 'barata'."
                },
                socratic_questions: [
                    {
                        q: "Si TMS (3) > Precio Relativo (1), ¿por qué NO estás maximizando utilidad?",
                        hint: "Valoras X más de lo que cuesta.",
                        answer: "Debes comprar más X. Al hacerlo, su utilidad marginal baja hasta que tu valoración subjetiva iguala al costo de mercado."
                    }
                ]
            },
            {
                id: 't2-micro',
                title: 'Monopolio y Eficiencia',
                content: 'Pérdida irrecuperable.',
                lesson: {
                    explanation: "El monopolista fija P > CMg. Esto crea una pérdida de bienestar porque hay gente dispuesta a pagar más del costo, pero menos del precio monopólico.",
                    example_title: "La Farmacéutica",
                    example: "Producir la pastilla cuesta $10. Se vende a $100. Quien pagaría $80 se queda sin ella. Esa transacción beneficiosa para ambos (ganancia social potencial de $70) se pierde."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué el monopolista no baja el precio para venderle a ese cliente de $80?",
                        hint: "Discriminación de precios.",
                        answer: "Porque si baja el precio a $80 para él, tendría que bajárselo a TODOS (si no puede discriminar), perdiendo margen en sus ventas actuales."
                    }
                ]
            },
            {
                id: 't3-micro-new',
                title: 'Elasticidad Precio de la Demanda',
                content: 'Sensibilidad del mercado.',
                lesson: {
                    explanation: "Mide cuánto cambia la cantidad comprada si cambia el precio. Elástica (>1): muy sensible. Inelástica (<1): poco sensible (vicio o necesidad).",
                    example_title: "Cigarros vs Autos de Lujo",
                    example: "Si subes 10% el precio de los cigarros, la gente fuma casi igual (Inelástica, ganas más dinero). Si subes 10% un auto de lujo, la gente compra otra marca (Elástica, pierdes clientes)."
                },
                socratic_questions: [
                    {
                        q: "Si vendes insulina (demanda perfectamente inelástica) y subes el precio al doble, ¿qué pasa con tus ingresos?",
                        hint: "¿La gente deja de comprarla?",
                        answer: "Tus ingresos se duplican. Al ser un bien vital sin sustitutos, la cantidad vendida no cae, así que absorbes todo el aumento de precio."
                    }
                ]
            },
            {
                id: 't4-micro-new',
                title: 'Costos: Corto vs Largo Plazo',
                content: 'Factores fijos y variables.',
                lesson: {
                    explanation: "Corto Plazo: Al menos un factor es fijo (ej. la fábrica). Largo Plazo: Todos los factores son variables (puedes construir otra fábrica).",
                    example_title: "La Cafetería Saturada",
                    example: "Corto plazo: Tienes mucha gente, contratas más baristas pero se estorban en la misma barra (rendimientos decrecientes). Largo plazo: Tiras la pared y amplías el local (cambias el factor fijo)."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué en el largo plazo no existen los Costos Fijos?",
                        hint: "Piensa en el contrato de alquiler a 10 años.",
                        answer: "Porque en el largo plazo todos los contratos vencen y todas las decisiones se pueden cambiar. Puedes cerrar la fábrica o mudarte; todo es variable."
                    }
                ]
            },
            {
                id: 't5-macro',
                title: 'Modelo de Solow',
                content: 'La trampa del capital.',
                lesson: {
                    explanation: "Más máquinas (capital) generan crecimiento, pero cada vez menos. Sin tecnología, llegas a un punto donde solo inviertes para reponer lo roto (Estado Estacionario).",
                    example_title: "Tractores Infinitos",
                    example: "Tener 1 tractor ayuda mucho. Tener 100 por agricultor es inútil. El crecimiento por pura inversión se agota; necesitas mejores semillas (tecnología) para seguir creciendo."
                },
                socratic_questions: [
                    {
                        q: "Según Solow, ¿qué efecto tiene un aumento permanente en la tasa de ahorro de un país?",
                        hint: "Nivel vs Tasa de Crecimiento.",
                        answer: "Aumenta el nivel de ingreso por habitante (eres más rico), pero NO la tasa de crecimiento a largo plazo. Solo creces mientras transitas al nuevo nivel."
                    }
                ]
            },
            {
                id: 't6-macro',
                title: 'Mundell-Fleming',
                content: 'Trinidad Imposible.',
                lesson: {
                    explanation: "Con Tipo de Cambio Fijo y libre capital, no tienes política monetaria. Si imprimes dinero, se fuga y tienes que recomprarlo para defender la moneda.",
                    example_title: "Fuga de Capitales",
                    example: "Bajas la tasa de interés para ayudar a Pymes. Los inversores huyen a EE.UU. por mejor rendimiento. Vendes tus reservas para sostener el peso. Resultado: te quedas sin reservas y la tasa vuelve a subir."
                },
                socratic_questions: [
                    {
                        q: "¿Qué única herramienta le queda al gobierno para estimular la economía bajo Tipo de Cambio Fijo?",
                        hint: "Si la monetaria no sirve...",
                        answer: "La Política Fiscal (Gasto Público). Al no afectar directamente el mercado cambiario como la tasa de interés, es muy potente en este régimen."
                    }
                ]
            },
            {
                id: 't7-macro-new',
                title: 'Política Fiscal (IS-LM)',
                content: 'Gasto Público y Crowding Out.',
                lesson: {
                    explanation: "Más gasto público mueve la curva IS a la derecha (más PIB), pero sube la tasa de interés (porque el gobierno compite por dinero), lo que 'expulsa' inversión privada.",
                    example_title: "Construyendo Carreteras",
                    example: "El gobierno pide prestado millones para hacer puentes. La demanda de crédito sube, y con ella la tasa de interés. La empresa que quería pedir para una nueva planta ya no puede pagarla."
                },
                socratic_questions: [
                    {
                        q: "¿Cómo puede el Banco Central evitar que el gasto público suba las tasas de interés (Crowding Out)?",
                        hint: "Acomodación monetaria.",
                        answer: "Imprimiendo dinero (Política Monetaria Expansiva). Esto mueve la LM a la derecha, manteniendo la tasa estable mientras el PIB crece."
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
