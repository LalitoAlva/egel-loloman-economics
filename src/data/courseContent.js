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

#### 1.1 Axiomas de Preferencias y Curvas de Indiferencia

**Axiomas Fundamentales** (Samuelson, 1938; Hicks & Allen, 1934):
- **Completitud:** El consumidor puede comparar cualquier par de canastas (A > B, B > A, o A ~ B)
- **Transitividad:** Si A > B y B > C, entonces A > C
- **No Saciedad (Más es Mejor):** El consumidor siempre prefiere mayor cantidad

**Curvas de Indiferencia** (Pareto, 1906; Edgeworth, 1881):
Representan combinaciones de bienes que dan la misma satisfacción.
- **Pendiente Negativa:** Para mantener utilidad constante, si consumes más X, debes consumir menos Y
- **No Se Cruzan:** Violaría la transitividad
- **Convexas al Origen:** Reflejan preferencia por combinaciones balanceadas

**Tipos de Preferencias Reveladas:**

1. **Sustitutos Perfectos:** U(X,Y) = aX + bY
   - Curvas de indiferencia: líneas rectas
   - RMS constante: RMS = a/b
   - Ejemplos: café y té, gasolina de diferentes marcas
   - Autores: Marshall, 1890

2. **Complementos Perfectos:** U(X,Y) = min{aX, bY}
   - Curvas de indiferencia: forma de L
   - RMS indefinida en el codo, 0 o ∞ fuera
   - Ejemplos: zapatos izquierdo y derecho, café y azúcar
   - Función Leontief: Wassily Leontief, 1941

3. **Cobb-Douglas:** U(X,Y) = X^α · Y^β
   - Curvas de indiferencia: suaves y convexas
   - RMS decreciente: RMS = (α/β)(Y/X)
   - Elasticidades de sustitución unitarias
   - Cobb & Douglas, 1928

#### 1.2 Función de Utilidad y Utilidad Marginal

El consumidor busca maximizar su utilidad sujeto a una restricción presupuestaria. Este problema de optimización se resuelve donde:
- **Curvas de Indiferencia:** Representan combinaciones de bienes que dan la misma satisfacción
- **Restricción Presupuestaria:** M = Px·X + Py·Y (donde M es el ingreso)
- **Condición de Equilibrio:** TMS = Px/Py

**Utilidad Marginal y Ley de Utilidades Marginales Decrecientes:**
A medida que consumes más de un bien, la satisfacción adicional (utilidad marginal) disminuye.
- **UMgₓ = ∂U/∂X:** Utilidad adicional de una unidad más de X
- **Ley Fundamental:** UMg siempre decrece cuando aumenta el consumo del bien
- **Implicación:** Segundo bien tiene mayor utilidad marginal cuando tienes poco de él

### 2. Demandas Marshallianas y Hicksianas

#### 2.1 Demandas Marshallianas (Demandas Ordinarias)

**Concepto** (Alfred Marshall, 1890 - Principles of Economics):
El consumidor maximiza utilidad sujeto a restricción presupuestaria.
- **Problema:** Max U(X,Y) s.a. M = Pₓ·X + Pᵧ·Y
- **Solución:** X* = x(P, M) y Y* = y(P, M)
- **Propiedades:** Muestran cómo cambia demanda ante cambios de precios e ingreso

#### 2.2 Demandas Hicksianas (Demandas Compensadas)

**Concepto** (John R. Hicks, 1939 - Value and Capital):
El consumidor minimiza gasto para alcanzar un nivel de utilidad dado.
- **Problema:** Min M s.a. U(X,Y) = Ū
- **Solución:** X^h = h_x(P, Ū) y Y^h = h_y(P, Ū)
- **Diferencia con Marshallianas:** Aíslan efecto sustitución puro (mantienen utilidad constante)

**Relación Fundamental:**
La descomposición de Hicks-Slutsky separa el efecto total en:
- **Efecto Sustitución (ES):** Cambio manteniendo utilidad constante
- **Efecto Ingreso (EI):** Cambio por variación del poder adquisitivo
- **Ecuación de Slutsky:** ∂x/∂p = ∂x^h/∂p - x(∂x/∂M)

#### 2.3 Elasticidades de Demanda

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

#### 3.1 Funciones de Producción

**Función General:** Q = f(L, K)

**Tipos de Funciones:**

1. **Cobb-Douglas** (Cobb & Douglas, 1928 - "A Theory of Production"):
   - Forma: Q = A·K^α·L^β
   - Propiedades: Elasticidades constantes, fácil estimación econométrica
   - Rendimientos a escala: α + β > 1 (crecientes), = 1 (constantes), < 1 (decrecientes)
   - Ejemplo: Q = 10K^0.4L^0.6

2. **Lineal** (Sustitutos Perfectos):
   - Forma: Q = aK + bL
   - Propiedades: Productividades marginales constantes
   - RMST constante
   - Ejemplo: Q = 5K + 3L (máquinas y trabajo completamente intercambiables)

3. **Leontief** (Wassily Leontief, 1941 - Complementos Perfectos):
   - Forma: Q = min{aK, bL}
   - Propiedades: Proporciones fijas, no hay sustitución
   - RMST indefinida en el óptimo
   - Ejemplo: Q = min{2K, 3L} (máquinas-trabajador en proporción fija)

#### 3.2 Productividad Marginal y Media

**Conceptos Clave:**
- **Producto Marginal (PMg):** Producción adicional por unidad adicional de insumo
  - PMgₗ = ∂Q/∂L (productividad marginal del trabajo)
  - PMgₖ = ∂Q/∂K (productividad marginal del capital)
- **Producto Medio (PMe):** Producción promedio por unidad de insumo
  - PMeₗ = Q/L (productividad media del trabajo)
  - PMeₖ = Q/K (productividad media del capital)
- **Relación:** PMg corta a PMe en su máximo

**Etapas de la Producción:**
1. **Etapa I:** PMe creciente. PMg > PMe (Ineficiente - Factor fijo subutilizado)
2. **Etapa II:** PMg y PMe decrecientes pero positivos (Zona Racional de Producción)
3. **Etapa III:** PMg negativo (Ineficiente - Exceso de factor variable)

#### 3.3 Relación Marginal de Sustitución Técnica (RMST)

**Definición:**
Cuántas unidades de capital pueden sustituirse por una unidad de trabajo, manteniendo producción constante.
- RMST = PMgₗ/PMgₖ = -dK/dL
- Es la pendiente de la isocuanta
- Decreciente: A más trabajo, menor RMST (ley de sustitución decreciente)

#### 3.4 Rendimientos a Escala

Si multiplicamos todos los inputs por λ > 1:
- **Crecientes:** Q aumenta más que λ (economías de escala)
- **Constantes:** Q aumenta exactamente λ (escala eficiente)
- **Decrecientes:** Q aumenta menos que λ (deseconomías de escala)

**Para Cobb-Douglas:** Determinados por suma de exponentes
- α + β > 1: Crecientes
- α + β = 1: Constantes
- α + β < 1: Decrecientes

### 4. Minimización de Costos y Teoría de Costos

#### 4.1 Problema de Minimización de Costos

**Concepto:**
El productor elige combinación de K y L que minimiza costo para producir Q dado.
- **Condición:** RMST = w/r (donde w = salario, r = renta del capital)
- **Demandas Condicionadas:** L*(w, r, Q) y K*(w, r, Q)
- **Función de Costo:** CT(w, r, Q)

#### 4.2 Estructura de Costos - Corto Plazo

**Corto Plazo:** (Factor fijo K, factor variable L)
- **Costo Fijo (CF):** No varía con Q (renta, seguros, salarios administrativos)
- **Costo Variable (CV):** Varía con Q (materias primas, mano de obra directa)
- **Costo Total (CT):** CT = CF + CV
- **Costo Marginal (CMg):** CMg = ∂CT/∂Q (costo de producir una unidad más)
- **Costo Medio Total (CMe):** CMe = CT/Q
- **Costo Medio Variable (CVMe):** CVMe = CV/Q
- **Costo Medio Fijo (CFMe):** CFMe = CF/Q

**Relación Importante:**
- CMg corta al CMe en su punto mínimo
- Cuando CMg < CMe: CMe está bajando
- Cuando CMg > CMe: CMe está subiendo
- Cuando CMg = CMe: CMe está en su mínimo

#### 4.3 Estructura de Costos - Largo Plazo

**Largo Plazo:** Todos los costos son variables
- **Costo Medio de Largo Plazo (CMeLP):** Envolvente de todas las curvas de CMeCP
- **Escala Mínima Eficiente:** Punto donde CMeLP es mínimo
- **Relación con Rendimientos a Escala:**
  - Rendimientos crecientes → CMeLP decreciente
  - Rendimientos constantes → CMeLP horizontal
  - Rendimientos decrecientes → CMeLP creciente

### 5. Estructuras de Mercado

#### 5.1 Competencia Perfecta (Adam Smith, 1776; Marshall, 1890)

**Características:**
- Muchos compradores y vendedores
- Producto homogéneo
- Libre entrada y salida
- Información perfecta
- Empresa es precio-aceptante

**Condición de Equilibrio:** P = CMg (maximiza beneficio)

**Equilibrio de Largo Plazo:**
- P = CMg = CMe (beneficio económico = cero)
- **Primer Teorema del Bienestar** (Arrow & Debreu, 1951): Equilibrio competitivo es Pareto eficiente

#### 5.2 Monopolio (Cournot, 1838)

**Características:**
- Un solo vendedor
- No hay sustitutos cercanos
- Barreras a la entrada
- Empresa es precio-fijadora

**Maximización:** IMg = CMg
- **Nota Importante:** IMg < P (ingreso marginal menor que precio)
- El monopolista restringe cantidad para subir precio

**Ineficiencia:** Pérdida Irrecuperable de Eficiencia
- Hay transacciones beneficiosas (valor > costo) que no ocurren
- El monopolista produce menos que la cantidad socialmente óptima
- **Estimación empírica:** Harberger (1954) mide pérdida de bienestar

**Discriminación de Precios:**
- Perfecto: Cobra a cada cliente su disposición a pagar
- Elimina pérdida irrecuperable
- Problema práctico: Difícil identificar disposiciones a pagar

#### 5.3 Competencia Monopolística

**Características:**
- Muchos vendedores
- Productos diferenciados
- Libre entrada
- Poder de mercado limitado

**Largo Plazo:**
- P > CMg (tiene poder de mercado)
- P = CMe (beneficio económico = 0 por libre entrada)

#### 5.4 Oligopolio - Modelos de Competencia Estratégica

**Modelo de Cournot** (Cournot, 1838 - "Recherches sur les Principes Mathématiques"):
- Competencia en **cantidades**
- Empresas eligen cantidad simultáneamente
- Cada empresa anticipa cantidad de rivales (expectativas)
- Equilibrio de Nash: Ninguna puede mejorar unilateralmente

**Modelo de Bertrand** (Bertrand, 1883):
- Competencia en **precios**
- Empresas eligen precio simultáneamente
- **Paradoja de Bertrand:** Con 2 empresas idénticas, P = CMg
- Resultado: casi competencia perfecta

**Modelo de Stackelberg** (Stackelberg, 1934 - "Marktform und Gleichgewicht"):
- **Líder-Seguidor**
- Empresa líder elige cantidad primero
- Empresa seguidora observa y responde
- Ventaja del primer movimiento: Líder gana más beneficio que en Cournot
- Modelado con ecuaciones de reacción secuenciales

#### 5.5 Teoremas Fundamentales del Bienestar

**Primer Teorema** (Arrow & Debreu, 1951):
Todo equilibrio competitivo es Pareto eficiente.

**Segundo Teorema** (Arrow & Debreu, 1951):
Cualquier asignación Pareto eficiente puede lograrse como equilibrio competitivo con redistribución apropiada de riqueza.

**Implicaciones:**
- Eficiencia y equidad pueden separarse
- Usar mercados para eficiencia, impuestos para equidad

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
                title: '1. Equilibrio del Consumidor (Axiomas y Demandas Marshallianas)',
                content: 'Maximización de utilidad con restricción presupuestaria. Axiomas de Samuelson-Hicks. Demandas Marshallianas.',
                lesson: {
                    explanation: "El consumidor maximiza su utilidad eligiendo la cesta de bienes donde la Tasa Marginal de Sustitución (TMS) se iguala a la relación de precios. El problema se fundamenta en axiomas de completitud, transitividad y no saciedad (Samuelson, 1938; Hicks & Allen, 1934). La TMS mide cuánto estás dispuesto a sacrificar de un bien por obtener más del otro. En equilibrio, tu valoración subjetiva (TMS) coincide con el precio relativo del mercado (Px/Py). Las demandas marshallianas (Marshall, 1890) muestran cómo cambia la cantidad demandada ante variaciones de precios e ingreso.",
                    example_title: "Tacos vs Pizza: Tu Dilema del Viernes (Análisis de Preferencias Reveladas)",
                    example: "Tienes $200. Los tacos cuestan $20 y la pizza $40. Tu TMS es 3 (darías 3 tacos por 1 pizza). Pero el mercado pide Px/Py = 40/20 = 2. Como valoras la pizza más (3) de lo que cuesta (2), debes comprar MÁS pizza (preferencia revelada: eligirías pizza). Al hacerlo, tu TMS baja (ley de utilidad marginal decreciente de Samuelson) hasta que TMS = 2. Ahí maximizas tu felicidad gastronómica. Este proceso revela tus preferencias a través de tus decisiones de compra (Teoría de Preferencias Reveladas, Samuelson 1938)."
                },
                socratic_questions: [
                    {
                        q: "Si TMS = 4 y Px/Py = 2, ¿qué bien debes consumir más y por qué?",
                        hint: "Compara tu valoración subjetiva con el costo de mercado. Usa el axioma de no saciedad.",
                        answer: "Debes consumir más X. Valoras X el doble de lo que cuesta en términos de Y. Estás 'subvaluando' Y. Al comprar más X, su utilidad marginal baja hasta que TMS = 2 (ley de utilidad marginal decreciente)."
                    },
                    {
                        q: "¿Por qué las curvas de indiferencia no pueden cruzarse?",
                        hint: "Piensa en las preferencias transitivas (Axioma 2 de Samuelson)",
                        answer: "Si se cruzaran, un punto estaría en dos niveles de utilidad diferentes. Esto violaría la transitividad: si A~B y B~C, entonces A~C. Es una contradicción lógica. El axioma de transitividad garantiza que puedes ordenar todas las canastas consistentemente."
                    },
                    {
                        q: "¿Qué diferencia hay entre una demanda Marshalliana y una Hicksiana?",
                        hint: "Marshalliana: max U s.a. M. Hicksiana: min M s.a. U = Ū",
                        answer: "Marshalliana (Marshall, 1890) muestra cómo cambia demanda al variar precios CON ingreso fijo. Incluye efectos ingreso y sustitución. Hicksiana (Hicks, 1939) muestra demanda al mantener utilidad constante - solo efecto sustitución puro. La descomposición de Slutsky separa ambos efectos."
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
                title: '3. Teoría del Productor - Funciones de Producción y Productividad',
                content: 'Relación técnica entre insumos y producto. Cobb-Douglas, Lineal, Leontief. PMg y PMe.',
                lesson: {
                    explanation: "La función de producción Q = f(L,K) muestra el máximo output que puedes obtener con cada combinación de trabajo (L) y capital (K). El Producto Marginal (PMg) mide cuánto produces DE MÁS con una unidad adicional de insumo. Existen varios tipos de funciones: Cobb-Douglas (Cobb & Douglas, 1928) con elasticidades constantes, funciones lineales con sustitución perfecta, y funciones Leontief (Leontief, 1941) con complementos perfectos. PMg decreciente es una ley universal: el primer trabajador es productivo, el décimo ya se estorba con los demás.",
                    example_title: "La Taquería con 1 Comal: Etapas de Producción",
                    example: "Tienes 1 comal (K fijo). Función aproximada: Q = 50L + 10L² - 2L³. Primer taquero: PMgL = 50 (alta productividad). Segundo: PMgL = 40 tacos más (rendimientos decrecientes). Tercer taquero: PMgL = 25 más (se estorban). Cuarto: PMgL = 10 tacos. Quinto: PMgL = -5 (¡negativo! Etapa III). Zona racional II: contratar entre 2° y donde PMgL = CMgL. Demonstración de ley de utilidad/productividad marginal decreciente."
                },
                socratic_questions: [
                    {
                        q: "Si PMg = 0, ¿qué significa y en qué etapa de producción estás?",
                        hint: "¿Aumenta la producción total? ¿Se cumple la ley de rendimientos decrecientes?",
                        answer: "Significa que agregar una unidad más de factor NO aumenta la producción total. Es exactamente el límite entre Etapa II (eficiente) y Etapa III (ineficiente). Estás saturando el factor fijo. El PMe está en su máximo cuando PMg = PMe."
                    },
                    {
                        q: "¿Por qué ninguna empresa racional opera en la Etapa I? Usa el concepto de PMe creciente.",
                        hint: "Piensa en el factor fijo y la ley de productividad marginal decreciente",
                        answer: "Porque el factor fijo está SUBUTILIZADO. El PMe está creciendo (PMg > PMe), lo que significa que puedes aumentar la productividad promedio simplemente usando más del factor variable. Hay 'espacio libre' en la fábrica. Es ineficiente en sentido productivo."
                    },
                    {
                        q: "¿Cuál es la diferencia entre una función Cobb-Douglas y una función Leontief en términos de flexibilidad?",
                        hint: "Sustitución de factores. Cobb-Douglas tiene elasticidad de sustitución = 1",
                        answer: "Cobb-Douglas (α+β=1): Factores parcialmente sustituibles con elasticidad unitaria. Es flexible: puedes cambiar combinación K/L. Leontief (min): Proporciones fijas, NO hay sustitución. Es rígido: debes usar K y L en proporción exacta. En realidad, Cobb-Douglas es más realista para muchas industrias."
                    }
                ]
            },
            {
                id: 't4-micro-costos',
                title: '4. Estructura de Costos y Minimización de Costos',
                content: 'Costos fijos, variables, marginales y medios. Minimización de costos. CMeLP como envolvente.',
                lesson: {
                    explanation: "En el CORTO plazo tienes Costos Fijos (CF, no cambian con Q, ej. renta) y Variables (CV, aumentan con Q, ej. materia prima). El Costo Marginal (CMg = ∂CT/∂Q) es el costo de producir UNA unidad más. El Costo Medio (CMe = CT/Q) es el costo promedio por unidad. Relación CLAVE: CMg corta al CMe en su mínimo. En minimización de costos, el productor elige K y L donde RMST = w/r. En el LARGO plazo, todos los costos son variables y la CMeLP es la envolvente de todas las curvas de CMeCP, relacionada directamente con los rendimientos a escala.",
                    example_title: "Tamaño de Planta y Economías de Escala",
                    example: "En corto plazo con planta pequeña (K₁ fijo), CMeCP₁ es alta en Q=100. Al expandir a planta grande (K₂), CMeCP₂ es más baja en Q=100 porque CMg baja. La CMeLP es la envolvente: elige tamaño de planta que minimiza costo para cada Q. Si hay rendimientos constantes a escala, CMeLP es horizontal. Si hay crecientes, CMeLP es decreciente (economías de escala - industrias jóvenes). Si decrecientes, CMeLP es creciente (deseconomías - cuando supervisa muchas plantas)."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué el CMg siempre corta al CMe en su punto mínimo?",
                        hint: "Piensa en la lógica del promedio. Usa la lógica de marginal vs promedio.",
                        answer: "Si CMg < CMe, producir una más BAJA el promedio (CMe bajando). Si CMg > CMe, producir una más SUBE el promedio (CMe subiendo). El único punto donde CMe deja de bajar y empieza a subir es cuando CMg = CMe. Es el mínimo matemático."
                    },
                    {
                        q: "Si tu CF = $1000 y produces 0 unidades, ¿cuánto pierdes?",
                        hint: "Los costos fijos se pagan aunque no produzcas. ¿Son 'costos hundidos'?",
                        answer: "Pierdes exactamente $1000. Los costos fijos son un 'costo hundido' en el corto plazo. Incluso sin producir, debes pagarlos (renta, seguros, etc.). Por eso, en el corto plazo, solo cierras si P < CVMe (no cubre costos variables, entonces no compensa seguir operando)."
                    },
                    {
                        q: "¿Qué relación hay entre Rendimientos a Escala y la forma de CMeLP?",
                        hint: "Rendimientos crecientes vs CMeLP decreciente",
                        answer: "Directa: Rendimientos crecientes (α+β>1) → CMeLP decreciente (economías de escala). Constantes → CMeLP horizontal (costos promedio constante al escalar). Decrecientes → CMeLP creciente (deseconomías). La relación viene del Lema de Shephard y la función de gasto e(w,r,Q)."
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
                title: '6. Monopolio y Discriminación de Precios',
                content: 'Poder de mercado. IMg < P. Pérdida Irrecuperable. Discriminación de precios.',
                lesson: {
                    explanation: "El monopolista ES el mercado. Enfrenta toda la curva de demanda (no solo un precio). Para vender más, debe BAJAR el precio de TODAS las unidades. Por eso su Ingreso Marginal (IMg) es MENOR que el Precio: IMg < P. Maximiza beneficio donde IMg = CMg, pero COBRA un precio P > CMg (usando la curva de demanda). Esto crea una Pérdida Irrecuperable de Eficiencia (Harberger, 1954 estimó empíricamente). La discriminación de precios (primer grado = perfecta, segundo grado = volumen, tercero = mercados) puede eliminar la ineficiencia redistribuyendo el excedente.",
                    example_title: "CFE y Pérdida Irrecuperable: Comparación Monopolio vs Competencia",
                    example: "CFE (monopolio): Demanda P = 10 - Q, CMg = 2. IMg = 10 - 2Q. Óptimo: IMg = CMg → 10 - 2Q = 2 → Q* = 4, P* = 6. Beneficio = (6-2)×4 = $16. Competencia: P = CMg → 10 - Q = 2 → Q** = 8, P** = 2. PIE se perdió: Precio 6 vs 2 (↑3000%). Hay Q de 4 a 8 donde P (disposición a pagar) > CMg ($2), pero no se produce. Pérdida irrecuperable = área de ese triángulo = 0.5×(8-4)×(6-2) = $8. Con discriminación perfecta, CFE cobra a cada cliente su disposición pagar, produce Q=8, π=$16 (todo el excedente), sin ineficiencia."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué el monopolista NUNCA produce en la zona inelástica de la demanda?",
                        hint: "¿Qué pasa con los ingresos totales si subes precio cuando |EPD|<1?",
                        answer: "Porque en la zona inelástica (|EPD| < 1), si sube el precio, sus ingresos SUBEN (la cantidad cae menos que proporcionalmente). IT sube, pero Q baja → CT baja. Ambos aumentan el beneficio. Seguirá subiendo precio hasta entrar a la zona elástica donde IT empieza a caer."
                    },
                    {
                        q: "Si un monopolio puede discriminar precios perfectamente, ¿hay pérdida irrecuperable de eficiencia?",
                        hint: "¿Se pierden transacciones beneficiosas? ¿Qué nivel de Q se produce?",
                        answer: "NO. La discriminación perfecta (cada cliente paga su disposición a pagar) elimina la pérdida irrecuperable porque TODAS las transacciones con valor social positivo (P ≥ CMg) se realizan. Produce Q donde P = CMg (eficiente). El monopolista captura TODO el excedente del consumidor, pero no hay ineficiencia Pareto (solo redistributiva)."
                    },
                    {
                        q: "¿Por qué IMg < P en monopolio pero IMg = P en competencia perfecta?",
                        hint: "¿Cuántas unidades debe bajar precio para vender una más?",
                        answer: "En competencia, la empresa es precio-aceptante, vende todas las que quiere al P del mercado. La unidad adicional se vende sin bajar precio → IMg = P. En monopolio, para vender una unidad más, DEBE bajar precio de TODAS las unidades (no puede discriminar perfectamente). Entonces IMg = ΔIT/ΔQ < P porque IT crece menos que P×ΔQ."
                    }
                ]
            },
            {
                id: 't7-micro-demandas',
                title: '7. Demandas Marshallianas y Hicksianas',
                content: 'Descomposición de Slutsky. Efectos ingreso y sustitución. Demandas compensadas.',
                lesson: {
                    explanation: "Las Demandas Marshallianas (Marshall, 1890) muestran cómo cambia la cantidad demandada cuando varían precios e ingreso: x(p,M). Las Demandas Hicksianas (Hicks, 1939) muestran la demanda manteniendo utilidad constante: x^h(p,Ū). La descomposición de Slutsky (1915) separa cualquier cambio de demanda ante un cambio de precio en: (1) Efecto Sustitución (ES) - cambio manteniendo utilidad constante, (2) Efecto Ingreso (EI) - cambio por variación del poder adquisitivo. Matemáticamente: ∂x/∂p = ∂x^h/∂p - x(∂x/∂M). Para bienes normales, ambos efectos son negativos (demanda baja cuando sube precio). Para bienes inferiores, el EI es positivo pero el ES domina (excepto en bienes Giffen).",
                    example_title: "Cambio de Precio del Bien X: Descomposición de Hicks",
                    example: "Consumidor con U(X,Y)=XY, Pₓ=$2, Pᵧ=$4, M=$40. Óptimo inicial: X*=10, Y*=5. Precio de X sube a Pₓ'=$4. Marshalliana: Nueva demanda X**=5 (ET=-5). Hicksiana con Ū original: El consumidor necesitaría más ingreso para mantener U=50. A precios nuevos, M'=$60 daría X^h=7.5. ES = X^h - X* = 7.5 - 10 = -2.5 (puro efecto sustitución). EI = X** - X^h = 5 - 7.5 = -2.5 (efecto ingreso). ET = -5 = -2.5 + (-2.5). Bien normal: ambos efectos negativos."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué la Demanda Hicksiana es importante si la Marshalliana es más observable en la práctica?",
                        hint: "Efecto sustitución puro vs efecto total",
                        answer: "Porque aísla el efecto sustitución puro - cómo cambiarías tu cesta si mantuvieras la misma satisfacción. La Marshalliana mezcla dos efectos. Entender el efecto sustitución es importante para política: saber cuánto cambio es sustitución (reasignación) vs cambio de poder adquisitivo."
                    },
                    {
                        q: "Un bien es Giffen si EI > |ES| cuando sube el precio. ¿Por qué esto es raro en la realidad?",
                        hint: "Necesita ser bien inferior Y el efecto ingreso muy grande",
                        answer: "Porque requiere ser bien inferior (consumo baja cuando ingreso sube) Y además el efecto ingreso debe superar al de sustitución. Teóricamente posible (papas en hambruna irlandesa), pero empíricamente raro. Giffen (1862) fue quien lo propuso."
                    },
                    {
                        q: "Si un bien es normal, ¿puede el efecto ingreso ser positivo?",
                        hint: "¿Qué pasa con la demanda cuando sube el ingreso?",
                        answer: "No. Bien normal → ∂x/∂M > 0 (más demanda con más ingreso). Si sube precio, baja el poder adquisitivo (como si bajara M), entonces EI < 0. Solo bienes inferiores tienen EI > 0."
                    }
                ]
            },
            {
                id: 't8-micro-reveladas',
                title: '8. Preferencias Reveladas e Índices de Precios',
                content: 'Teoría de Samuelson. Axioma Débil. Índices Laspeyres, Paasche, Fisher.',
                lesson: {
                    explanation: "La Teoría de Preferencias Reveladas (Samuelson, 1938) permite inferir preferencias a partir de decisiones de compra observadas sin asumir utilidad cardinal. El Axioma Débil de Preferencia Revelada: si un consumidor elige A cuando B era asequible, entonces A es preferido a B (A ≻ B revelado). Los Índices de Precios miden cambios en el nivel de precios: (1) Laspeyres (1871) usa cantidades del período base - tiende a sobreestimar inflación, (2) Paasche (1874) usa cantidades actuales - tiende a subestimar, (3) Fisher (1922) es media geométrica de ambos - 'índice ideal'. La relación Laspeyres > Paasche es casi siempre cierta (sesgo de sustitución).",
                    example_title: "Preferencia Revelada: De Compras Observadas a Preferencias",
                    example: "Observación 1: Con Pₓ=$2, Pᵧ=$3, M=$18, consumidor elige (X=6, Y=2). Gasto: $18. Observación 2: Con Pₓ=$3, Pᵧ=$2, M=$18, elige (X=2, Y=6). Gasto: $18. En obs 1, ¿era (2,6) asequible? Costo: 2(3)+6(2)=$18 → SÍ. Eligió (6,2) → Prefiere A a B (A ≻ B revelado por Axioma Débil). En obs 2, ¿era (6,2) asequible? Costo: 6(3)+2(2)=$22 → NO. Sin contradicción, Axioma Débil se cumple."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué Samuelson (1938) desarrolló Preferencias Reveladas si ya existía la teoría de utilidad cardinal?",
                        hint: "Utilidad observable vs utilidad cardinal inmensurable",
                        answer: "Porque la utilidad cardinal (números de satisfacción) es inobservable. Las preferencias reveladas solo necesitan asumir que el consumidor elige lo mejor que puede darse. No requiere medir utilidad, solo observar elecciones. Es más fundamental matemáticamente."
                    },
                    {
                        q: "¿Cuál índice de precios (Laspeyres o Paasche) es mejor para medir inflación al consumidor?",
                        hint: "Sesgo de sustitución. Índice de Fisher como solución.",
                        answer: "Laspeyres (oficial en muchos países) tiende a sobrestimar porque no refleja cómo los consumidores sustituyen bienes que encarecen. Paasche subestima. Fisher (media geométrica) es más exacto pero costoso de calcular. En práctica: usar Laspeyres pero reconocer su sesgo, o usar Fisher para temas de distribución/salarios."
                    },
                    {
                        q: "Si IL = 150 (precios subieron 50% según Laspeyres) e IP = 140, ¿cuál es el sesgo de sustitución?",
                        hint: "Laspeyres - Paasche = sesgo",
                        answer: "Sesgo = 150 - 140 = 10 puntos. Laspeyres sobrestima inflación en 10 puntos. Esto significa que el consumidor IS adaptando sus compras para los nuevos precios relativos. El Índice de Fisher sería √(150×140)=145, intermedio entre ambos."
                    }
                ]
            },
            {
                id: 't9-micro-juegos',
                title: '9. Teoría de Juegos - Equilibrio de Nash y Modelos de Oligopolio',
                content: 'Toma de decisiones estratégicas. Nash. Cournot, Bertrand, Stackelberg.',
                lesson: {
                    explanation: "En un Equilibrio de Nash (Nash, 1950), cada jugador elige su mejor respuesta dada la estrategia del otro. NADIE puede mejorar unilateralmente cambiando de estrategia. En oligopolios: (1) Cournot (1838) - competencia en cantidades, (2) Bertrand (1883) - competencia en precios (paradoja: P=CMg con solo 2 empresas), (3) Stackelberg (1934) - modelo líder-seguidor donde líder tiene ventaja. El Dilema del Prisionero muestra que el equilibrio de Nash puede ser ineficiente (Pareto inferior).",
                    example_title: "Oligopolio Cournot: Dos Gasolineras en una Esquina",
                    example: "Gasolinera A y B compiten en cantidades. Demanda: P = 10 - (QA + QB). Ambas con CMg=0. En Cournot, cada una elige cantidad anticipando la del rival. Curvas de reacción: QA = 5 - QB/2, QB = 5 - QA/2. Equilibrio de Nash: QA* = QB* = 10/3 ≈ 3.33, P* = 10/3 ≈ 3.33, πA = πB ≈ 11.1 cada una. Si cooperaran (colusión): QA = QB = 2.5, P = 5, π = 6.25 cada una (mejor, pero menos que monopolio 100% = 12.5). Stackelberg: Líder elige primero Q_L = 5, seguidora responde Q_S = 2.5, líder obtiene π_L = 12.5, seguidora π_S = 6.25 (ventaja de mover primero)."
                },
                socratic_questions: [
                    {
                        q: "¿Puede haber más de un Equilibrio de Nash en un juego?",
                        hint: "Piensa en el juego de 'Battle of the Sexes' o coordinar en Redes",
                        answer: "SÍ. Ejemplo: tú y tu pareja eligen entre Fútbol o Teatro. Ambos prefieren estar juntos que separados. Hay DOS equilibrios de Nash puros: (Fútbol, Fútbol) y (Teatro, Teatro). También hay equilibrio mixto. Requieren coordinación para elegir uno (Schelling, 1960 - focal points)."
                    },
                    {
                        q: "En Bertrand con dos empresas idénticas y productos homogéneos, ¿por qué P = CMg?",
                        hint: "Si una empresa sube precio, ¿qué pasa?",
                        answer: "Paradoja de Bertrand: Si P > CMg, la otra empresa puede bajar P ligeramente y capturar TODO el mercado (productos homogéneos). Esto incentiva bajar precios. El equilibrio es P = CMg donde ninguna puede mejorar bajando más (pérdidas) o subiendo (pierden mercado)."
                    },
                    {
                        q: "En Stackelberg, ¿por qué el líder obtiene más beneficio que en Cournot?",
                        hint: "Ventaja de mover primero. Puede comprometerse con mayor cantidad.",
                        answer: "Porque puede comprometerse creíblemente a una cantidad mayor, sabiendo que el seguidor responderá con menor cantidad. El líder captura la porción de mercado más grande. En Cournot, son simétricas. Stackelberg demuestra el valor de liderazgo/ventaja de primer movimiento."
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
            },
            {
                id: 't15-oferta-demanda',
                title: 'Ley de Oferta y Demanda',
                content: 'El mercado se equilibra donde oferta = demanda.',
                lesson: {
                    explanation: "La Ley de Demanda: ↑Precio → ↓Cantidad demandada (relación inversa). La Ley de Oferta: ↑Precio → ↑Cantidad ofrecida (relación directa). El equilibrio ocurre donde las curvas se cruzan (Qd = Qs). Un exceso de oferta (precio arriba del equilibrio) presiona el precio a la baja. Un exceso de demanda (precio abajo del equilibrio) presiona al alza. Desplazamientos: cambios en ingreso, gustos o tecnología mueven las CURVAS; cambios en precio mueven SOBRE la curva.",
                    example_title: "El Aguacate en Super Bowl",
                    example: "Antes del Super Bowl, la demanda de aguacate se dispara (la curva de demanda se desplaza a la derecha). Con la misma oferta, el precio sube de $30 a $60/kg. Los productores de Michoacán responden produciendo más (movimiento SOBRE la curva de oferta). Si además hay sequía, la oferta se desplaza a la izquierda y el precio sube aún más. El nuevo equilibrio tiene precio más alto y cantidad incierta."
                },
                socratic_questions: [
                    {
                        q: "¿Cuál es la diferencia entre un 'cambio en la cantidad demandada' y un 'cambio en la demanda'?",
                        hint: "Movimiento sobre vs desplazamiento de la curva.",
                        answer: "Un cambio en la cantidad demandada es un movimiento SOBRE la misma curva causado por un cambio en el PRECIO del bien. Un cambio en la demanda es un DESPLAZAMIENTO de toda la curva causado por factores externos (ingreso, gustos, precios de bienes relacionados, expectativas, número de consumidores)."
                    }
                ]
            },
            {
                id: 't16-duopolio',
                title: 'Modelos de Duopolio: Cournot, Edgeworth y Chamberlin',
                content: 'Cómo compiten dos empresas.',
                lesson: {
                    explanation: "Cournot (1838): Las empresas compiten eligiendo CANTIDADES simultáneamente. Cada una decide cuánto producir tomando como dada la producción del rival. Equilibrio: cada empresa produce q = (a-c)/3 (1/3 de la demanda). Bertrand (1883): Compiten en PRECIOS → precio cae hasta costo marginal (resultado competitivo). Edgeworth: Como Bertrand pero con restricción de capacidad → no hay equilibrio en precios puros, hay ciclos. Chamberlin: Competencia monopolística → muchas empresas con productos diferenciados. Cada una tiene algo de poder de mercado por diferenciación.",
                    example_title: "Coca-Cola vs Pepsi",
                    example: "Modelo Cournot: Ambas deciden cuántos litros producir. Si Coca produce mucho, Pepsi produce menos (reacción estratégica). Equilibrio: ambas producen menos que un monopolio pero más que en competencia perfecta. Modelo Chamberlin: Coca tiene sabor diferente a Pepsi → cada una enfrenta su propia curva de demanda con pendiente negativa. Pueden cobrar más que el costo marginal gracias a la lealtad de marca. Beneficio económico → entran nuevas marcas → demanda individual se reduce hasta beneficio cero a largo plazo."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué el resultado de Cournot da un precio ENTRE el de monopolio y el de competencia perfecta?",
                        hint: "Número de empresas.",
                        answer: "Porque con 2 empresas hay algo de competencia (presiona precio a la baja) pero no tanta como con muchas empresas. A medida que aumentan las empresas en el modelo de Cournot, el resultado converge al competitivo. Con 1 empresa = monopolio, con n→∞ = competencia perfecta. El duopolio de Cournot queda exactamente en medio."
                    }
                ]
            },
            {
                id: 't17-pareto',
                title: 'Equilibrio Competitivo y Óptimo de Pareto',
                content: 'No se puede mejorar a uno sin empeorar a otro.',
                lesson: {
                    explanation: "Un Óptimo de Pareto es una asignación donde NO es posible mejorar a alguien sin empeorar a otro. Primer Teorema del Bienestar: Todo equilibrio competitivo es Pareto-óptimo (eficiente). Segundo Teorema: Todo óptimo de Pareto puede alcanzarse como equilibrio competitivo con las transferencias adecuadas. La Caja de Edgeworth visualiza el intercambio entre 2 personas con 2 bienes: la Curva de Contrato une todos los puntos Pareto-óptimos.",
                    example_title: "Repartir Pizza y Refresco",
                    example: "Ana tiene 3 pizzas y 1 refresco. Luis tiene 1 pizza y 3 refrescos. Ana prefiere refresco, Luis prefiere pizza. Si intercambian 1 pizza por 1 refresco, AMBOS mejoran → la asignación original NO era Pareto-óptima. Siguen intercambiando hasta que cualquier cambio adicional perjudicaría a uno → Óptimo de Pareto. En la Caja de Edgeworth, este punto está donde sus curvas de indiferencia son tangentes (RMS_Ana = RMS_Luis)."
                },
                socratic_questions: [
                    {
                        q: "¿Un Óptimo de Pareto es necesariamente 'justo' o equitativo?",
                        hint: "Una persona con todo y otra con nada.",
                        answer: "No. Una asignación donde una persona tiene TODOS los bienes y la otra nada es Pareto-óptima (no puedes mejorar a la segunda sin quitarle a la primera). Pareto mide eficiencia, NO equidad. Por eso el Segundo Teorema del Bienestar es importante: permite redistribuir primero y luego dejar al mercado alcanzar la eficiencia."
                    }
                ]
            },
            {
                id: 't18-contabilidad-nacional',
                title: 'Contabilidad Nacional: PNB, Desempleo y Balanza Comercial',
                content: 'Los indicadores que miden la salud de un país.',
                lesson: {
                    explanation: "PIB = valor de todo lo producido DENTRO del país. PNB = PIB + ingresos de nacionales en el exterior - ingresos de extranjeros en el país. PIB per cápita = PIB / Población (indicador de nivel de vida promedio). Tasa de Desempleo = Desempleados / PEA × 100. PEA = personas que trabajan + buscan trabajo. Balanza Comercial = Exportaciones - Importaciones. Superávit: X > M. Déficit: M > X. Balanza de Pagos = Cuenta Corriente + Cuenta de Capital + Cuenta Financiera.",
                    example_title: "México 2023 en Números",
                    example: "PIB: $1.3 billones USD. PNB: ligeramente menor porque muchas empresas extranjeras operan en México (sus ganancias salen). PIB per cápita: $10,800 USD (divide entre 130 millones). Desempleo: 2.8% (bajo, pero 55% está en informalidad → no se cuenta como 'desempleado'). Balanza Comercial con EE.UU.: superávit de $130,000 MDD (exportamos más). Con China: déficit de $90,000 MDD (importamos electrónicos)."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué un país puede tener baja tasa de desempleo pero alta pobreza al mismo tiempo?",
                        hint: "Calidad del empleo.",
                        answer: "Porque la tasa de desempleo solo mide si tienes trabajo o no, no la CALIDAD del empleo. En México, 55% del empleo es informal (sin prestaciones, bajo salario). Una persona vendiendo chicles en la calle cuenta como 'empleada'. Por eso se complementa con indicadores como tasa de informalidad, subempleo y pobreza laboral (CONEVAL)."
                    }
                ]
            },
            {
                id: 't19-ciclos-mercado-laboral',
                title: 'Ciclos Económicos y Mercado Laboral',
                content: 'Expansión, recesión, y el empleo.',
                lesson: {
                    explanation: "Los ciclos económicos tienen 4 fases: Expansión (PIB crece, empleo sube), Auge (pico del ciclo, presión inflacionaria), Recesión (PIB cae 2 trimestres consecutivos, desempleo sube), Depresión (recesión prolongada). Ley de Okun: por cada 1% que el PIB cae debajo de su potencial, el desempleo sube ~2%. Curva de Phillips de largo plazo: vertical en la tasa natural de desempleo → no hay trade-off permanente inflación-desempleo. NAIRU: tasa de desempleo que no acelera la inflación.",
                    example_title: "La Crisis de 2008-2009 en México",
                    example: "2008: Expansión previa con PIB creciendo 3%. Crisis de EE.UU. contagia a México por: 1) Caída de exportaciones (70% van a EE.UU.), 2) Caída de remesas, 3) Caída del turismo. 2009: PIB cae -5.3%. Desempleo sube de 3.5% a 5.5% (Ley de Okun). Gobierno aplica política fiscal expansiva y Banxico baja tasas. 2010: Recuperación con PIB +5.1%. Ciclo completo en ~3 años."
                },
                socratic_questions: [
                    {
                        q: "Si la Curva de Phillips de largo plazo es vertical, ¿por qué los gobiernos intentan reducir el desempleo con política monetaria expansiva?",
                        hint: "Corto vs largo plazo.",
                        answer: "Porque en el CORTO PLAZO sí existe el trade-off: una política monetaria expansiva puede reducir temporalmente el desempleo por debajo de su tasa natural. Pero a largo plazo, los agentes ajustan expectativas de inflación, los salarios suben, y el desempleo regresa a su tasa natural pero con inflación más alta."
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
            },
            {
                id: 't6-fin-vpn',
                title: 'Valor Presente Neto (VPN)',
                content: 'Cuánto vale hoy el dinero de mañana.',
                lesson: {
                    explanation: "El VPN descuenta todos los flujos futuros de un proyecto a valor presente y les resta la inversión inicial. Si VPN > 0, el proyecto genera más de lo que cuesta. Si VPN < 0, destruye valor. Fórmula: VPN = -I₀ + Σ[Fₜ / (1+r)ᵗ]",
                    example_title: "Abrir una Sucursal en Guadalajara",
                    example: "Inversión inicial: $500,000. Flujos esperados: Año 1: $150,000, Año 2: $200,000, Año 3: $250,000, Año 4: $200,000. Tasa de descuento: 10%. VPN = -500,000 + 150,000/1.1 + 200,000/1.21 + 250,000/1.331 + 200,000/1.4641 = -500,000 + 136,364 + 165,289 + 187,828 + 136,603 = $126,084. Como VPN > 0, el proyecto es viable."
                },
                socratic_questions: [
                    {
                        q: "Si la tasa de descuento sube de 10% a 15%, ¿qué le pasa al VPN del proyecto?",
                        hint: "Los flujos futuros valen menos hoy.",
                        answer: "Disminuye. Una tasa más alta descuenta más agresivamente los flujos futuros, reduciendo su valor presente. El proyecto puede dejar de ser rentable si el VPN se vuelve negativo."
                    }
                ]
            },
            {
                id: 't7-fin-tir',
                title: 'Tasa Interna de Retorno (TIR)',
                content: 'La tasa que hace VPN = 0.',
                lesson: {
                    explanation: "La TIR es la tasa de descuento que hace que el VPN sea exactamente cero. Es el rendimiento porcentual del proyecto. Regla: Si TIR > costo de capital → proyecto aceptable. Si TIR < costo de capital → rechazar.",
                    example_title: "Subway vs Starbucks",
                    example: "Abrir un Subway cuesta $800,000 y tiene TIR del 18%. Abrir un Starbucks cuesta $1,200,000 y tiene TIR del 22%. Si tu costo de capital es 12%, ambos son viables (TIR > 12%). Pero ojo: la TIR NO considera el tamaño. El VPN del Starbucks podría ser mayor en pesos aunque el Subway tenga buena TIR."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué puede ser peligroso elegir proyectos SOLO por la TIR más alta?",
                        hint: "Tamaño del proyecto.",
                        answer: "Porque la TIR no considera la escala. Un proyecto pequeño con TIR del 50% puede generar $10,000 de VPN, mientras que uno grande con TIR del 20% puede generar $500,000 de VPN. Siempre complementa con VPN."
                    }
                ]
            },
            {
                id: 't8-fin-inversion-publica',
                title: 'Evaluación de Inversión Pública',
                content: 'Beneficio social vs beneficio privado.',
                lesson: {
                    explanation: "La inversión pública usa análisis Costo-Beneficio Social. A diferencia del sector privado, incluye externalidades, precios sombra y beneficios no monetarios (salud, educación, medio ambiente). Se usa la Tasa Social de Descuento (más baja que la privada, ~10% en México según SHCP).",
                    example_title: "Hospital vs Carretera",
                    example: "Un hospital genera beneficios difíciles de medir en dinero: vidas salvadas, productividad recuperada, bienestar. El análisis costo-beneficio social asigna 'precios sombra' a estos beneficios. La SHCP en México exige que todo proyecto de inversión pública demuestre que sus beneficios sociales superan sus costos usando la metodología del CEPEP."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué la tasa social de descuento es menor que la tasa privada?",
                        hint: "Horizonte temporal del gobierno.",
                        answer: "Porque el gobierno tiene un horizonte de planeación más largo que las empresas privadas y debe considerar el bienestar de generaciones futuras. Una tasa más baja da más peso al futuro, justificando proyectos de largo plazo como infraestructura."
                    }
                ]
            },
            {
                id: 't9-fin-valor-dinero',
                title: 'Valor del Dinero en el Tiempo',
                content: 'Un peso hoy vale más que un peso mañana.',
                lesson: {
                    explanation: "Concepto fundamental de finanzas: el dinero tiene un costo de oportunidad temporal. Valor Futuro: VF = VP × (1+r)ⁿ. Valor Presente: VP = VF / (1+r)ⁿ. Anualidades: VP = PMT × [(1-(1+r)⁻ⁿ)/r]. Perpetuidades: VP = PMT/r.",
                    example_title: "La Herencia del Abuelo",
                    example: "Tu abuelo te ofrece: A) $100,000 hoy, o B) $150,000 en 5 años. Con una tasa del 10%: VP de opción B = 150,000/(1.1)⁵ = $93,138. ¡Opción A vale más! Necesitarías que te ofrecieran al menos $161,051 en 5 años para que fuera equivalente a $100,000 hoy."
                },
                socratic_questions: [
                    {
                        q: "Si la inflación es del 5% anual, ¿cuánto poder adquisitivo pierdes si guardas $10,000 bajo el colchón por 3 años?",
                        hint: "Fórmula de valor futuro invertida.",
                        answer: "Valor real = 10,000 / (1.05)³ = $8,638. Pierdes $1,362 de poder adquisitivo (13.6%). Por eso el dinero debe estar invertido al menos a la tasa de inflación para mantener su valor."
                    }
                ]
            },
            {
                id: 't10-fin-razones',
                title: 'Razones Financieras',
                content: 'Radiografía de la salud financiera.',
                lesson: {
                    explanation: "Las razones financieras se dividen en 4 familias: 1) LIQUIDEZ: Razón Circulante = Activo Circulante / Pasivo Circulante (capacidad de pagar deudas CP, ideal >1). Prueba Ácida = (AC - Inventarios) / PC (más estricta). 2) ACTIVIDAD: Rotación de Inventarios = Costo de Ventas / Inventario Promedio (veces que vendes tu inventario al año). Rotación CxC = Ventas a Crédito / CxC Promedio. Días de Cobro = 365 / Rotación CxC. 3) APALANCAMIENTO: Deuda/Capital = Pasivo Total / Capital Contable. Cobertura de Intereses = EBITDA / Gastos Financieros. 4) RENTABILIDAD: ROE = Utilidad Neta / Capital Contable. ROA = Utilidad Neta / Activo Total. Margen Neto = Utilidad Neta / Ventas. Fórmula DuPont: ROE = Margen × Rotación de Activos × Apalancamiento.",
                    example_title: "Diagnóstico de una Tienda de Ropa",
                    example: "La tienda tiene: AC $500,000, Inventarios $300,000, PC $400,000, Capital $600,000, Pasivo Total $800,000, Ventas $1,200,000, Utilidad Neta $120,000. Razón Circulante = 500/400 = 1.25 (puede pagar sus deudas). Prueba Ácida = (500-300)/400 = 0.5 (¡alerta! sin vender inventario no puede pagar). Deuda/Capital = 800/600 = 1.33 (debe más de lo que tiene propio). ROE = 120/600 = 20% (buen rendimiento). Diagnóstico: rentable pero con riesgo de liquidez por exceso de inventario."
                },
                socratic_questions: [
                    {
                        q: "Una empresa tiene Razón Circulante de 3.0. ¿Eso es necesariamente bueno?",
                        hint: "Demasiada liquidez tiene un costo.",
                        answer: "No necesariamente. Una razón muy alta puede indicar que la empresa tiene demasiado efectivo ocioso o inventario estancado que podría estar invertido generando rendimiento. Lo ideal depende de la industria, pero generalmente entre 1.5 y 2.5 es saludable. Hay que complementar con la Prueba Ácida y la rotación de inventarios."
                    }
                ]
            },
            {
                id: 't11-fin-inversion-privada',
                title: 'Evaluación de Inversión Privada',
                content: 'Maximizar rentabilidad con riesgo controlado.',
                lesson: {
                    explanation: "La evaluación de inversión privada busca maximizar el rendimiento para los accionistas. Herramientas: 1) Análisis de Sensibilidad: varía una variable a la vez (¿qué pasa si ventas caen 20%?). 2) Análisis de Escenarios: Optimista, Base, Pesimista con probabilidades. VPN Esperado = Σ(prob × VPN). 3) Punto de Equilibrio: unidades mínimas para cubrir costos. 4) Relación Riesgo-Rendimiento: mayor riesgo debe compensarse con mayor rendimiento. 5) Estructura de capital: proporción óptima deuda vs capital propio minimiza WACC.",
                    example_title: "Franquicia de Café: ¿Conviene?",
                    example: "Inversión: $2,000,000. Escenario Optimista (30%): VPN = $800,000. Base (50%): VPN = $200,000. Pesimista (20%): VPN = -$400,000. VPN Esperado = 0.3(800) + 0.5(200) + 0.2(-400) = $240 + $100 - $80 = $260,000. Proyecto viable en promedio. Pero sensibilidad muestra que si renta sube 30%, VPN base se vuelve negativo. Recomendación: negociar contrato de renta fija a largo plazo antes de invertir."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué una empresa usaría deuda si tiene suficiente capital propio?",
                        hint: "Escudo fiscal y costo de oportunidad.",
                        answer: "Porque la deuda tiene beneficio fiscal: los intereses son deducibles de impuestos, reduciendo el costo efectivo. Si la tasa de interés después de impuestos es menor que el ROE, conviene usar deuda (apalancamiento financiero positivo). Además, el capital propio tiene costo de oportunidad: podría invertirse en otro proyecto rentable."
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
            },
            {
                id: 't3-intl-balanza',
                title: '3. Balanza de Pagos',
                content: 'Registro de transacciones económicas con el exterior',
                lesson: {
                    explanation: "La Balanza de Pagos registra TODAS las transacciones económicas de un país con el resto del mundo. Se divide en: (1) Cuenta Corriente: exportaciones e importaciones de bienes (balanza comercial), servicios, ingreso primario (remesas de utilidades) e ingreso secundario (remesas familiares). (2) Cuenta de Capital: transferencias de activos no financieros. (3) Cuenta Financiera: inversión extranjera directa (IED), inversión de cartera, préstamos. Principio fundamental: la Balanza de Pagos SIEMPRE suma cero (contabilidad de partida doble). Un déficit en cuenta corriente se financia con superávit en cuenta financiera (entrada de capital extranjero).",
                    example_title: "México y las Remesas",
                    example: "México exporta petróleo ($30,000 MDD) pero importa más bienes ($45,000 MDD). Déficit comercial de -$15,000 MDD. Sin embargo, recibe $60,000 MDD en remesas (ingreso secundario). Esto compensa el déficit comercial y genera superávit en cuenta corriente. Si además llega IED ($35,000 MDD), la cuenta financiera también tiene superávit. Las reservas internacionales de Banxico crecen."
                },
                socratic_questions: [
                    {
                        q: "Si un país tiene déficit en cuenta corriente durante 10 años seguidos, ¿es necesariamente malo?",
                        hint: "¿Cómo se financia ese déficit?",
                        answer: "No necesariamente. Si se financia con IED productiva (fábricas, tecnología), es sostenible porque genera capacidad exportadora futura. Pero si se financia con deuda de corto plazo (capital golondrina), es peligroso: ese capital puede huir ante cualquier crisis, provocando una devaluación (como México en 1994)."
                    },
                    {
                        q: "¿Por qué las remesas familiares se registran en ingreso secundario y no en cuenta financiera?",
                        hint: "¿Es una inversión o una transferencia sin contraprestación?",
                        answer: "Porque son transferencias unilaterales: el trabajador envía dinero a su familia sin recibir un activo o servicio a cambio. No es inversión (cuenta financiera) ni pago por un servicio (cuenta corriente-servicios). Es ingreso secundario porque es una transferencia corriente sin contraprestación."
                    }
                ]
            },
            {
                id: 't4-intl-tipocambio',
                title: '4. Tipo de Cambio y Mercado de Divisas',
                content: 'Determinación del precio de las monedas',
                lesson: {
                    explanation: "El tipo de cambio es el precio de una moneda en términos de otra. Regímenes: (1) Tipo de cambio fijo: el banco central fija el precio y usa reservas para defenderlo. (2) Flotación libre: lo determina la oferta y demanda del mercado. (3) Flotación administrada (México actual): flota libremente pero el banco central interviene ocasionalmente. Teoría de Paridad del Poder Adquisitivo (PPP): a largo plazo, el tipo de cambio se ajusta para que un bien cueste lo mismo en dos países. Paridad de tasas de interés: si México tiene tasas más altas que EE.UU., el peso se aprecia en el corto plazo (entra capital buscando rendimiento), pero se esperaría una depreciación futura.",
                    example_title: "El Carry Trade con el Peso Mexicano",
                    example: "2023: Tasa en México = 11.25%, en EE.UU. = 5.25%. Diferencial = 6%. Inversionistas piden prestado dólares baratos, los cambian a pesos, los invierten en Cetes. Ganan 6% extra. Esto APRECIA el peso (demanda de pesos sube). El peso pasa de $20 a $17 por dólar. Pero si Banxico baja tasas, el carry trade se deshace: venden pesos, compran dólares, el peso se DEPRECIA rápidamente."
                },
                socratic_questions: [
                    {
                        q: "Si la inflación en México es 5% y en EE.UU. es 2%, ¿qué predice la PPP sobre el tipo de cambio?",
                        hint: "La moneda del país con mayor inflación se...",
                        answer: "El peso debería depreciarse aproximadamente 3% (diferencial de inflación). Si el tipo de cambio era $17, debería moverse hacia $17.51. La lógica: los bienes mexicanos se encarecen más rápido, pierden competitividad, la demanda de pesos cae. A largo plazo, PPP tiende a cumplirse, pero a corto plazo hay muchas desviaciones."
                    }
                ]
            },
            {
                id: 't5-intl-politica-comercial',
                title: '5. Política Comercial: Aranceles y Cuotas',
                content: 'Instrumentos de protección al comercio',
                lesson: {
                    explanation: "Los gobiernos intervienen en el comercio con: (1) Aranceles: impuesto a las importaciones. Efecto: sube precio doméstico, protege al productor local, perjudica al consumidor, genera recaudación fiscal, pero crea pérdida de eficiencia (triángulos de Harberger). (2) Cuotas: límite a la cantidad importada. Efecto similar al arancel pero sin recaudación para el gobierno (la renta va al importador con licencia). (3) Subsidios a exportaciones: pago del gobierno al exportador. Distorsiona precios, puede generar represalias (guerras comerciales). Argumento de la industria naciente (List, 1841): proteger temporalmente industrias nuevas hasta que sean competitivas. Problema: las protecciones 'temporales' suelen volverse permanentes.",
                    example_title: "T-MEC y el Acero",
                    example: "EE.UU. pone arancel de 25% al acero importado (Sección 232). Antes: acero chino costaba $500/ton en EE.UU. Después: $625/ton. Productores de acero de EE.UU. celebran (pueden cobrar hasta $624 sin perder competitividad). Pero las automotrices de Detroit sufren: su insumo subió 25%. ¿Ganó EE.UU.? El empleo en acero subió 1,800, pero se perdieron 75,000 empleos en industrias que usan acero. Pérdida neta."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué una cuota de importación es PEOR que un arancel que produce el mismo efecto en precios?",
                        hint: "¿Quién se queda con la 'renta' en cada caso?",
                        answer: "Con un arancel, el gobierno recauda ingresos (área c del diagrama). Con una cuota, esa misma renta va a quien tiene la licencia de importación (a menudo una empresa extranjera o un importador con conexiones políticas). El efecto en precios y cantidades es igual, pero la distribución de la renta es menos eficiente con cuotas."
                    }
                ]
            },
            {
                id: 't6-intl-ventaja-comparativa',
                title: '6. Ventaja Comparativa (Ricardo)',
                content: 'Por qué los países comercian aunque uno sea mejor en todo',
                lesson: {
                    explanation: "David Ricardo (1817) demostró que un país debe especializarse en producir aquello donde tiene MENOR costo de oportunidad, aunque sea peor en todo (ventaja absoluta). Clave: lo que importa no es ser el 'mejor', sino ser el 'menos malo relativamente'. Si México produce 10 autos o 50 toneladas de maíz, y EE.UU. produce 30 autos o 60 toneladas, EE.UU. tiene ventaja absoluta en ambos. Pero el costo de oportunidad de 1 auto en México es 5 ton maíz, y en EE.UU. es 2 ton. EE.UU. tiene ventaja comparativa en autos (costo de oportunidad menor). México debe especializarse en maíz. Ambos ganan con el comercio.",
                    example_title: "El Abogado y su Secretaria",
                    example: "Un abogado escribe 80 palabras por minuto y su secretaria 60. El abogado es MEJOR en todo (ventaja absoluta en ambas tareas). Pero su hora vale $2,000 (abogacía) vs $200 (mecanografía). El costo de oportunidad de que el abogado teclee es $2,000/hora. Debe especializarse en abogacía y contratar a la secretaria para teclear, aunque él teclee más rápido."
                },
                socratic_questions: [
                    {
                        q: "Si China es más eficiente que México en producir TODOS los bienes, ¿por qué México sigue exportando?",
                        hint: "Costo de oportunidad relativo.",
                        answer: "Porque México tiene ventaja comparativa en algunos bienes (menor costo de oportunidad). China puede ser mejor en todo (ventaja absoluta), pero no puede especializarse en todo simultáneamente. Si China tiene ventaja comparativa enorme en electrónica, le conviene más concentrarse ahí e importar aguacates de México, aunque también pudiera producirlos."
                    }
                ]
            },
            {
                id: 't7-intl-bloques',
                title: '7. Bloques Económicos e Integración',
                content: 'TLC, uniones aduaneras y mercados comunes',
                lesson: {
                    explanation: "Niveles de integración económica (de menor a mayor): (1) Área de Libre Comercio: eliminan aranceles entre sí, cada uno mantiene los suyos con terceros (T-MEC). (2) Unión Aduanera: libre comercio interno + arancel externo común (Mercosur). (3) Mercado Común: + libre movilidad de factores (trabajo, capital). (4) Unión Económica: + política económica común (UE pre-euro). (5) Unión Monetaria: + moneda común (Zona Euro). Efectos: creación de comercio (positivo, sustituyes producción cara nacional por importación barata del socio) vs desviación de comercio (negativo, dejas de comprar al más eficiente del mundo por comprarle al socio que tiene preferencia arancelaria).",
                    example_title: "T-MEC vs TPP",
                    example: "T-MEC (México-EE.UU.-Canadá): Área de libre comercio. México exporta autos a EE.UU. sin arancel, pero debe cumplir reglas de origen (75% contenido regional). Si México firma con China, EE.UU. no tiene que aceptar esas importaciones (cada país mantiene su política con terceros). Zona Euro: 20 países con una moneda (euro), un banco central (BCE), pero diferentes políticas fiscales. Problema: Grecia no podía devaluar su moneda para salir de la crisis de 2010."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué la desviación de comercio es negativa para el bienestar global?",
                        hint: "Piensa en quién es el productor más eficiente del mundo.",
                        answer: "Porque dejas de comprarle al productor más barato del mundo (que está fuera del bloque) para comprarle a tu socio comercial (que es más caro pero no paga arancel). Ejemplo: México importaba textiles de China a $5 (con arancel $7). Con T-MEC, importa de EE.UU. a $6 (sin arancel). Pagamos más ($6 vs $5), el mundo produce menos eficientemente."
                    }
                ]
            },
            {
                id: 't8-intl-relaciones',
                title: '8. Organismos Económicos Internacionales',
                content: 'FMI, Banco Mundial, OMC y su papel',
                lesson: {
                    explanation: "Principales organismos: (1) FMI (Fondo Monetario Internacional): prestamista de última instancia para países con crisis de balanza de pagos. Condiciona préstamos a reformas (austeridad fiscal, liberalización). Creado en Bretton Woods (1944). (2) Banco Mundial: financiamiento para desarrollo (infraestructura, educación, salud). Enfocado en países en desarrollo. (3) OMC (Organización Mundial del Comercio): regula el comercio internacional, resuelve disputas comerciales, promueve la liberalización. Principios: nación más favorecida (si das un beneficio a uno, a todos), trato nacional (importaciones tratadas igual que nacionales). (4) OCDE: club de países 'ricos', coordina políticas económicas, produce estadísticas y recomendaciones.",
                    example_title: "México y el FMI en 1995",
                    example: "Crisis del Tequila (1994-95): México agota reservas defendiendo el peso fijo. Devaluación de 50%. No puede pagar deuda de corto plazo. Acude al FMI que organiza un rescate de $50,000 MDD (el más grande hasta entonces). Condiciones: austeridad fiscal, altas tasas de interés, privatizaciones. México pagó todo anticipadamente en 2000. Lección: el FMI ayuda pero sus condiciones son dolorosas socialmente."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué el FMI es criticado por imponer 'austeridad' a países en crisis?",
                        hint: "Política fiscal contractiva en recesión.",
                        answer: "Porque exige recortar gasto público y subir impuestos (austeridad) justamente cuando el país está en recesión. Keynes diría que eso PROFUNDIZA la crisis. El argumento del FMI: es necesario para restaurar la confianza de inversionistas y estabilizar la moneda. El debate sigue vigente: ¿estabilidad primero o crecimiento primero?"
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
    },
    {
        id: 'pub-1',
        title: 'Economía Pública',
        desc: 'Política Fiscal, Monetaria y Papel del Estado',
        icon: '🏛️',
        color: '#a78bfa',
        detailed_report: `# Economía Pública
**Marco Teórico para el EGEL de Economía**

## Introducción
La Economía Pública estudia el papel del gobierno en la economía: cómo recauda (política fiscal), cómo gasta, cómo regula y cómo sus acciones afectan la eficiencia y equidad del sistema económico. Es una de las áreas con más peso en el EGEL-ECONO (46 reactivos).

---

## 1. Política Fiscal y Presupuesto Público

### 1.1 Ingresos Públicos
- **Tributarios:** Impuestos directos (ISR) e indirectos (IVA, IEPS)
- **No Tributarios:** Derechos, productos, aprovechamientos
- **Organismos y Empresas:** PEMEX, CFE, IMSS

### 1.2 Gasto Público
- **Gasto Corriente:** Sueldos, servicios, materiales (no genera activos)
- **Gasto de Capital:** Inversión en infraestructura (genera activos productivos)
- **Transferencias:** Programas sociales, subsidios, pensiones

### 1.3 Déficit y Deuda Pública
- **Déficit Fiscal:** Gasto > Ingresos → Necesidad de endeudamiento
- **Sostenibilidad:** Deuda/PIB como indicador clave
- **Equivalencia Ricardiana (Barro):** Bajo ciertos supuestos, financiar con deuda o impuestos tiene el mismo efecto

## 2. Bienes Públicos y Externalidades

### 2.1 Bienes Públicos
- **No Rivalidad:** El consumo de uno no reduce la disponibilidad para otros
- **No Exclusión:** No se puede impedir su consumo
- **Problema del Free Rider:** Nadie quiere pagar voluntariamente
- **Ejemplos:** Defensa nacional, alumbrado público, justicia

### 2.2 Externalidades
- **Negativas:** Contaminación (costo social > costo privado)
- **Positivas:** Educación, vacunación (beneficio social > beneficio privado)
- **Soluciones:** Impuestos pigouvianos, subsidios, regulación, derechos de propiedad (Coase)

## 3. Política Monetaria

### 3.1 Banco Central (Banxico)
- **Objetivo principal:** Estabilidad de precios (control de inflación)
- **Instrumentos:** Tasa de interés objetivo, operaciones de mercado abierto, encaje legal
- **Autonomía:** Independencia del gobierno para credibilidad

### 3.2 Transmisión Monetaria
- Banxico sube tasa → Crédito más caro → Menor inversión y consumo → Menor presión inflacionaria
- Canal del tipo de cambio: Tasa alta → Capital externo entra → Peso se aprecia → Importaciones más baratas

## 4. Distribución del Ingreso y Pobreza
- **Coeficiente de Gini:** Mide desigualdad (0 = igualdad perfecta, 1 = desigualdad total)
- **Curva de Lorenz:** Representación gráfica de la distribución
- **CONEVAL:** Mide pobreza multidimensional en México (ingreso + carencias sociales)`,
        topics: [
            {
                id: 't1-pub-fiscal',
                title: 'Política Fiscal y Presupuesto Público',
                content: 'Cómo el gobierno recauda y gasta.',
                lesson: {
                    explanation: "La política fiscal es la herramienta del gobierno para influir en la economía mediante impuestos y gasto público. Expansiva: ↑Gasto o ↓Impuestos → estimula demanda agregada. Contractiva: ↓Gasto o ↑Impuestos → frena inflación. El multiplicador fiscal amplifica el efecto: si el gobierno gasta $1, el PIB crece más de $1 por el efecto cascada del consumo.",
                    example_title: "Programa de Infraestructura 2024",
                    example: "El gobierno invierte $100 mil millones en carreteras. Paga a constructores → estos pagan salarios → trabajadores compran en tiendas → tiendas compran a proveedores. Si el multiplicador es 1.5, el PIB crece $150 mil millones. Pero si lo financia con deuda, la Equivalencia Ricardiana dice que los consumidores ahorrarán anticipando impuestos futuros, reduciendo el efecto."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué el multiplicador del gasto público es mayor que el multiplicador de una reducción de impuestos del mismo monto?",
                        hint: "Parte del dinero de los impuestos se ahorra.",
                        answer: "Porque cuando el gobierno gasta $1, ese $1 se gasta completamente en la economía. Pero si reduce impuestos en $1, el contribuyente ahorra una parte (propensión marginal al ahorro) y solo gasta el resto. Por eso ΔG tiene más impacto que ΔT."
                    }
                ]
            },
            {
                id: 't2-pub-bienes',
                title: 'Bienes Públicos y Externalidades',
                content: 'Fallas de mercado que justifican al gobierno.',
                lesson: {
                    explanation: "Los bienes públicos (no rivales y no excluibles) no los produce el mercado eficientemente porque nadie quiere pagar si puede consumirlos gratis (free rider). Las externalidades son costos o beneficios que recaen en terceros. Soluciones: Impuesto Pigouviano (igualar costo privado con social), Teorema de Coase (negociación privada si costos de transacción son bajos), regulación directa.",
                    example_title: "La Fábrica y el Río",
                    example: "Una fábrica de papel contamina el río. Su costo privado es $50/tonelada pero el costo social (incluyendo daño a pescadores, salud, turismo) es $80. La diferencia de $30 es la externalidad negativa. Solución Pigouviana: impuesto de $30/tonelada para que el precio refleje el verdadero costo. Solución Coase: si la fábrica y los pescadores pueden negociar, llegarán al nivel óptimo de contaminación sin intervención."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué el alumbrado público es un bien público pero la electricidad de tu casa no lo es?",
                        hint: "Rivalidad y exclusión.",
                        answer: "El alumbrado público es no rival (tu uso no reduce la luz para otros) y no excluible (no pueden impedirte verlo). La electricidad doméstica es rival (lo que usas tú no lo usa otro) y excluible (te cortan si no pagas). Por eso la electricidad doméstica la puede proveer el mercado pero el alumbrado no."
                    }
                ]
            },
            {
                id: 't3-pub-monetaria',
                title: 'Política Monetaria y Banxico',
                content: 'Control de inflación y tasas de interés.',
                lesson: {
                    explanation: "Banxico (autónomo desde 1993) tiene como mandato principal la estabilidad de precios. Su principal instrumento es la Tasa de Interés Interbancaria a 1 día. Mecanismo: ↑Tasa → Crédito caro → Menor consumo e inversión → Menor inflación. También afecta el tipo de cambio: tasa alta atrae capital extranjero → peso se aprecia → importaciones baratas → menor inflación.",
                    example_title: "Banxico vs Inflación 2022-2023",
                    example: "La inflación llegó a 8.7% en 2022. Banxico subió la tasa de 4% a 11.25%. Resultado: Créditos hipotecarios pasaron de 8% a 12%, las empresas frenaron inversiones, el peso se apreció de 20 a 17 por dólar (entró capital extranjero buscando rendimiento), y la inflación bajó gradualmente a 4.5%. Costo: menor crecimiento económico."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué es importante que el Banco Central sea autónomo del gobierno?",
                        hint: "Tentación de imprimir dinero.",
                        answer: "Porque si el gobierno controla la política monetaria, tiene incentivo a financiar su gasto imprimiendo dinero (señoreaje), lo que genera inflación. La autonomía da credibilidad: los agentes económicos confían en que se controlará la inflación, lo que ancla las expectativas y facilita el trabajo del banco central."
                    }
                ]
            },
            {
                id: 't4-pub-distribucion',
                title: 'Distribución del Ingreso y Pobreza',
                content: 'Medir y combatir la desigualdad.',
                lesson: {
                    explanation: "El Coeficiente de Gini va de 0 (igualdad perfecta) a 1 (un individuo tiene todo). México ~0.42. La Curva de Lorenz muestra el % acumulado de ingreso vs % acumulado de población. CONEVAL mide pobreza multidimensional: no solo ingreso, sino 6 carencias sociales (educación, salud, seguridad social, vivienda, servicios básicos, alimentación). Pobreza extrema: ingreso < línea de bienestar mínimo + 3 o más carencias.",
                    example_title: "Dos Méxicos",
                    example: "El 10% más rico de México gana 21 veces más que el 10% más pobre. Si dibujas la Curva de Lorenz, se aleja mucho de la línea de 45° (igualdad). El área entre la curva y la diagonal, dividida entre el área total del triángulo, te da el Gini. CONEVAL reporta que 36.3% de mexicanos están en pobreza (2022): tienen ingreso insuficiente Y al menos una carencia social."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué CONEVAL usa medición multidimensional y no solo ingreso para medir pobreza?",
                        hint: "Puedes ganar suficiente pero no tener acceso a servicios.",
                        answer: "Porque una persona puede tener ingreso suficiente pero carecer de acceso a salud, educación o vivienda digna. La pobreza no es solo falta de dinero sino falta de capacidades y oportunidades. La medición multidimensional captura mejor el bienestar real de las personas."
                    }
                ]
            }
        ]
    },
    {
        id: 'des-1',
        title: 'Desarrollo Económico',
        desc: 'Crecimiento, Desarrollo e Indicadores',
        icon: '🌱',
        color: '#34d399',
        detailed_report: `# Desarrollo y Crecimiento Económico
**Marco Teórico para el EGEL de Economía**

## Introducción
El área de Crecimiento y Desarrollo Económico (27 reactivos en EGEL-ECONO) analiza por qué unos países son ricos y otros pobres, qué determina el crecimiento de largo plazo y cómo se mide el desarrollo más allá del PIB.

---

## 1. Teorías del Crecimiento Económico

### 1.1 Modelo de Solow (1956)
- **Función de producción:** Y = A·K^α·L^(1-α)
- **Estado Estacionario:** Donde inversión = depreciación
- **Predicción:** Los países pobres crecen más rápido (convergencia)
- **Residuo de Solow:** La productividad total de factores (PTF) explica lo que capital y trabajo no

### 1.2 Crecimiento Endógeno
- **Romer (1986):** El conocimiento tiene rendimientos crecientes
- **Lucas (1988):** Capital humano como motor del crecimiento
- **Diferencia con Solow:** El crecimiento puede ser auto-sostenido sin depender de factores exógenos

## 2. Desarrollo Económico

### 2.1 Más Allá del PIB
- **IDH (PNUD):** Combina esperanza de vida, educación e ingreso
- **Componentes:** Salud (esperanza de vida), Educación (años promedio y esperados), Ingreso (INB per cápita PPP)
- **Categorías:** Muy alto (>0.8), Alto (0.7-0.8), Medio (0.55-0.7), Bajo (<0.55)

### 2.2 Trampas de Pobreza
- **Círculo vicioso:** Pobreza → Bajo ahorro → Baja inversión → Baja productividad → Pobreza
- **Sachs:** Big Push (inversión masiva coordinada)
- **Easterly:** Instituciones > Ayuda externa

## 3. Desarrollo en México
- **ISI (1940-1982):** Industrialización por Sustitución de Importaciones
- **Apertura (1986+):** Entrada al GATT, TLCAN/T-MEC
- **Retos actuales:** Desigualdad regional, informalidad (~55%), baja productividad, dependencia de remesas`,
        topics: [
            {
                id: 't1-des-crecimiento',
                title: 'Modelos de Crecimiento Económico',
                content: 'Solow, crecimiento endógeno y convergencia.',
                lesson: {
                    explanation: "El modelo de Solow predice que los países convergen al mismo nivel de ingreso si tienen las mismas tasas de ahorro y crecimiento poblacional. El estado estacionario es donde la inversión nueva solo repone la depreciación. El 'residuo de Solow' (PTF) captura tecnología, instituciones y eficiencia. Los modelos endógenos (Romer, Lucas) argumentan que la inversión en conocimiento y capital humano genera crecimiento auto-sostenido sin necesidad de choques tecnológicos externos.",
                    example_title: "China vs México: ¿Por qué China Creció Más?",
                    example: "En 1980, China y México tenían PIB per cápita similar (~$2,000 USD). Para 2020, China lo multiplicó por 15 y México por 3. Solow diría: China ahorró e invirtió más (~45% del PIB vs 20%). Romer diría: China invirtió masivamente en educación y tecnología. La PTF de China creció 4% anual vs 0.5% en México. La trampa de ingreso medio explica por qué México se estancó."
                },
                socratic_questions: [
                    {
                        q: "Si el modelo de Solow predice convergencia, ¿por qué muchos países pobres no han alcanzado a los ricos?",
                        hint: "Supuestos del modelo.",
                        answer: "Porque la convergencia de Solow requiere mismas tasas de ahorro, crecimiento poblacional y acceso a tecnología. En la realidad, los países pobres tienen menor ahorro, mayor crecimiento poblacional, peores instituciones y menor acceso a tecnología. La convergencia 'condicional' (controlando estas variables) sí se observa empíricamente."
                    }
                ]
            },
            {
                id: 't2-des-idh',
                title: 'IDH y Medición del Desarrollo',
                content: 'Medir desarrollo más allá del PIB.',
                lesson: {
                    explanation: "El Índice de Desarrollo Humano (IDH) del PNUD combina tres dimensiones: salud (esperanza de vida al nacer), educación (años promedio y esperados de escolaridad) e ingreso (INB per cápita en PPA). Va de 0 a 1. México: 0.758 (alto). Noruega: 0.961 (muy alto). El IDH muestra que PIB alto no garantiza desarrollo: Arabia Saudita tiene PIB per cápita alto pero IDH menor al esperado por desigualdad de género y educación.",
                    example_title: "Costa Rica vs Guinea Ecuatorial",
                    example: "Guinea Ecuatorial tiene PIB per cápita de $8,000 (por petróleo) pero IDH de 0.592 (medio). Costa Rica tiene PIB per cápita de $12,000 pero IDH de 0.806 (muy alto). ¿Por qué? Costa Rica invierte en salud (esperanza de vida: 80 años vs 59) y educación (años escolaridad: 12 vs 6). El dinero del petróleo no se tradujo en bienestar para la población."
                },
                socratic_questions: [
                    {
                        q: "¿Cuál es la principal limitación del PIB per cápita como indicador de bienestar?",
                        hint: "Distribución y dimensiones no monetarias.",
                        answer: "No refleja distribución (un país con Gini alto puede tener PIB per cápita alto pero la mayoría pobre), no incluye trabajo doméstico ni economía informal, no mide salud ni educación, no considera sustentabilidad ambiental, y no captura libertades o seguridad. Por eso el IDH y otros índices multidimensionales son complementos necesarios."
                    }
                ]
            },
            {
                id: 't3-des-mexico',
                title: 'Desarrollo Económico de México',
                content: 'De la ISI al T-MEC.',
                lesson: {
                    explanation: "México pasó por tres etapas: 1) ISI (1940-1982): Protección arancelaria, empresas paraestatales, crecimiento del 6% anual ('Milagro Mexicano'), pero dependencia de deuda externa y crisis de 1982. 2) Apertura (1986-2000): Entrada al GATT, privatizaciones, TLCAN en 1994, crisis del 'error de diciembre'. 3) Era actual: T-MEC (2020), nearshoring, retos de informalidad (~55% del empleo), baja recaudación fiscal (~17% del PIB vs 34% OCDE), y desigualdad regional (Norte industrial vs Sur agrícola).",
                    example_title: "El Nearshoring y Nuevo León",
                    example: "Desde 2020, empresas como Tesla, BMW y Samsung relocalizan producción de China a México (nearshoring). Nuevo León recibe la mayor inversión: $6,000 MDD en 2023. Pero el Sur (Chiapas, Guerrero, Oaxaca) no se beneficia por falta de infraestructura y capital humano. Esto amplía la desigualdad regional: PIB per cápita de Nuevo León es 5 veces el de Chiapas. El desarrollo económico de México sigue siendo geográficamente desigual."
                },
                socratic_questions: [
                    {
                        q: "¿Por qué fracasó el modelo ISI en México a pesar de que generó crecimiento por 40 años?",
                        hint: "Eficiencia y financiamiento.",
                        answer: "Porque la protección arancelaria creó empresas ineficientes que no podían competir internacionalmente, el gasto público excesivo se financió con deuda externa, y cuando subieron las tasas de interés en EE.UU. (1982), México no pudo pagar su deuda. Además, la ISI generó inflación crónica y un déficit comercial permanente por importar insumos que no se producían localmente."
                    }
                ]
            }
        ]
    },
    {
        id: 'ref-formulas',
        title: 'Formulario EGEL',
        desc: 'Todas las fórmulas clave para el examen',
        icon: '📐',
        color: '#f472b6',
        detailed_report: `# Formulario Integral EGEL Plus ECONO
**Referencia Rápida de Fórmulas**

---

## MICROECONOMÍA

### Teoría del Consumidor
- **Restricción Presupuestaria:** M = Pₓ·X + Pᵧ·Y
- **Condición de Equilibrio:** RMS = UMgₓ/UMgᵧ = Pₓ/Pᵧ
- **RMS Cobb-Douglas:** RMS = (α/β)(Y/X)
- **Demanda Marshalliana C-D:** X* = (α/(α+β)) · (M/Pₓ)
- **Ecuación de Slutsky:** ∂x/∂p = ∂xʰ/∂p − x·(∂x/∂M)
- **Sustitutos Perfectos:** U = aX + bY → RMS = a/b
- **Complementos Perfectos:** U = min{aX, bY} → Óptimo en aX = bY

### Elasticidades
- **Elasticidad Precio:** Eₚ = (∂Q/∂P)(P/Q) = %ΔQ/%ΔP
- **Elasticidad Ingreso:** Eᵢ = (∂Q/∂M)(M/Q)
- **Elasticidad Cruzada:** Eₓᵧ = (∂Qₓ/∂Pᵧ)(Pᵧ/Qₓ)
- **Ingreso Total y Elasticidad:** |Eₚ| > 1 → ↑P = ↓IT | |Eₚ| < 1 → ↑P = ↑IT

### Teoría del Productor
- **Función Cobb-Douglas:** Q = A·K^α·L^β
- **PMgL = ∂Q/∂L** | **PMeL = Q/L**
- **RMST = PMgL/PMgK** → Condición mín. costos: RMST = w/r
- **Rendimientos a Escala:** α+β > 1 (crecientes), = 1 (constantes), < 1 (decrecientes)

### Costos
- **CT = CF + CV(Q)** | **CMg = ∂CT/∂Q**
- **CMe = CT/Q** | **CVMe = CV/Q**
- **Punto de Cierre CP:** P = min CVMe
- **Beneficio Máximo:** IMg = CMg (y CMg creciente)

### Estructuras de Mercado
- **Competencia Perfecta:** P = CMg = IMg
- **Monopolio:** IMg = CMg donde IMg = P(1 + 1/Eₚ)
- **Índice de Lerner:** L = (P - CMg)/P = -1/Eₚ
- **Cournot (2 empresas simétricas):** qᵢ = (a - c)/(3b) | Q = 2(a-c)/(3b)
- **Bertrand:** P = CMg (resultado competitivo con solo 2 empresas)

---

## MACROECONOMÍA

### Contabilidad Nacional
- **PIB (Gasto):** Y = C + I + G + (X - M)
- **PIB (Ingreso):** Y = W + R + i + π + Depreciación + Impuestos Indirectos
- **PNB = PIB + Ingreso Factorial del Exterior - Pagos Factoriales al Exterior**
- **Deflactor = (PIB Nominal / PIB Real) × 100**
- **Tasa de Desempleo = (Desempleados / PEA) × 100**

### Modelo IS-LM
- **Multiplicador del Gasto:** k = 1/(1-c) donde c = PMgC
- **Multiplicador Tributario:** kₜ = -c/(1-c)
- **Multiplicador de Presupuesto Equilibrado:** k = 1

### Mundell-Fleming
- **TC fijo + movilidad de capital:** Fiscal efectiva, monetaria inefectiva
- **TC flexible + movilidad de capital:** Monetaria efectiva, fiscal inefectiva

### Inflación y Phillips
- **Ecuación de Fisher:** i = r + πᵉ
- **Curva de Phillips CP:** π = πᵉ - β(u - uₙ) + ε
- **Ley de Okun:** ΔU ≈ -0.5 × (ΔY - 3%)

### Crecimiento (Solow)
- **Y = A·K^α·L^(1-α)**
- **Estado Estacionario:** s·f(k) = (n + δ)·k
- **Regla de Oro:** PMgK = n + δ
- **Residuo de Solow:** ΔA/A = ΔY/Y - α·ΔK/K - (1-α)·ΔL/L

---

## PROYECTOS DE INVERSIÓN

### Valor del Dinero en el Tiempo
- **Valor Futuro:** VF = VP × (1 + r)ⁿ
- **Valor Presente:** VP = VF / (1 + r)ⁿ
- **Anualidad (VP):** VP = PMT × [(1 - (1+r)⁻ⁿ) / r]
- **Perpetuidad:** VP = PMT / r

### Evaluación de Proyectos
- **VPN = -I₀ + Σ [Fₜ / (1+r)ᵗ]** → aceptar si VPN > 0
- **TIR:** tasa r tal que VPN = 0 → aceptar si TIR > costo de capital
- **WACC = wₑ·Kₑ + wᵈ·Kᵈ·(1-T)**
- **CAE = VPN × [r / (1 - (1+r)⁻ⁿ)]**
- **Punto de Equilibrio:** Q* = CF / (PVu - CVu)

### Razones Financieras
- **Razón Circulante = AC / PC** (liquidez, ideal 1.5-2.5)
- **Prueba Ácida = (AC - Inventarios) / PC**
- **Capital de Trabajo Neto = AC - PC**
- **Rotación de Inventarios = Costo de Ventas / Inventario Promedio**
- **Rotación CxC = Ventas a Crédito / CxC Promedio**
- **Días de Cobro = 365 / Rotación CxC**
- **Deuda/Capital = Pasivo Total / Capital Contable**
- **Cobertura de Intereses = EBITDA / Gastos Financieros**
- **ROE = Utilidad Neta / Capital Contable**
- **ROA = Utilidad Neta / Activo Total**
- **Margen Neto = Utilidad Neta / Ventas Netas**
- **Margen Bruto = (Ventas - Costo de Ventas) / Ventas**
- **Fórmula DuPont:** ROE = Margen Neto × Rotación de Activos × Apalancamiento

### Inversión Pública
- **Beneficio-Costo Social = VP Beneficios Sociales / VP Costos Sociales** (aceptar si > 1)
- **Tasa Social de Descuento (México SHCP):** ~10%

---

## DISTRIBUCIÓN Y POBREZA
- **Coeficiente de Gini:** 0 = igualdad perfecta, 1 = desigualdad total
- **Gini = A / (A + B)** donde A = área entre Lorenz y diagonal
- **IDH = (Índice Salud × Índice Educación × Índice Ingreso)^(1/3)**`,
        topics: [
            {
                id: 't1-ref-micro',
                title: 'Fórmulas de Microeconomía',
                content: 'Consumidor, productor y mercados.',
                lesson: {
                    explanation: "Las fórmulas más importantes de micro para el EGEL: 1) Equilibrio del consumidor: RMS = Px/Py. Para Cobb-Douglas U=X^a·Y^b: X*=(a/(a+b))(M/Px). 2) Elasticidad: Ep=(ΔQ/ΔP)(P/Q). Si |Ep|>1, demanda elástica (↑P→↓IT). 3) RMST=PMgL/PMgK=w/r en el óptimo. 4) Beneficio máximo cuando IMg=CMg. 5) Monopolio: IMg=P(1+1/Ep), Lerner L=(P-CMg)/P. 6) Cournot: qi=(a-c)/3b para duopolio simétrico.",
                    example_title: "Resolución Rápida Tipo EGEL",
                    example: "Problema: U=X^0.4·Y^0.6, Px=10, Py=20, M=1000. Paso 1: X*=(0.4/1)(1000/10)=40. Paso 2: Y*=(0.6/1)(1000/20)=30. Verificar: 40(10)+30(20)=400+600=1000 ✓. RMS=0.4/0.6·(30/40)=0.5=10/20=Px/Py ✓. Tip EGEL: En Cobb-Douglas, el consumidor SIEMPRE gasta la fracción α/(α+β) de su ingreso en X."
                },
                socratic_questions: [
                    {
                        q: "Si tienes U=X²Y y Px=4, Py=2, M=120, ¿cuánto es X* y Y*?",
                        hint: "α=2, β=1, α+β=3.",
                        answer: "X*=(2/3)(120/4)=20. Y*=(1/3)(120/2)=20. Verificación: 20(4)+20(2)=80+40=120 ✓."
                    }
                ]
            },
            {
                id: 't2-ref-macro',
                title: 'Fórmulas de Macroeconomía',
                content: 'PIB, IS-LM, Solow y Phillips.',
                lesson: {
                    explanation: "Fórmulas macro esenciales: 1) PIB=C+I+G+(X-M). 2) Multiplicador=1/(1-PMgC). Si PMgC=0.8, k=5. 3) Ecuación de Fisher: i=r+πe. 4) Phillips: π=πe-β(u-un). 5) Solow: Estado estacionario donde s·f(k)=(n+δ)k. 6) Ley de Okun: ΔU≈-0.5(ΔY-3%). 7) Mundell-Fleming: TC fijo→fiscal efectiva; TC flexible→monetaria efectiva.",
                    example_title: "Multiplicador en Acción",
                    example: "PMgC=0.75, G aumenta en $100M. Multiplicador=1/(1-0.75)=4. ΔY=4×100=$400M. Con impuestos proporcionales t=0.2: Multiplicador=1/(1-0.75(1-0.2))=1/(1-0.6)=2.5. ΔY=2.5×100=$250M. Los impuestos 'filtran' parte del efecto. Tip EGEL: El multiplicador tributario siempre es MENOR que el del gasto porque parte del recorte de impuestos se ahorra."
                },
                socratic_questions: [
                    {
                        q: "En Mundell-Fleming con TC flexible y movilidad perfecta, ¿por qué la política fiscal es inefectiva?",
                        hint: "Tasa de interés y tipo de cambio.",
                        answer: "Porque ↑G → ↑Y → ↑demanda de dinero → ↑tasa de interés → entra capital extranjero → peso se aprecia → ↓exportaciones netas. La caída en exportaciones compensa exactamente el aumento del gasto público. Solo la política monetaria mueve el PIB con TC flexible."
                    }
                ]
            },
            {
                id: 't3-ref-finanzas',
                title: 'Fórmulas de Proyectos de Inversión',
                content: 'VPN, TIR, razones financieras.',
                lesson: {
                    explanation: "Fórmulas de inversión: 1) VP=VF/(1+r)^n. 2) VPN=-I₀+Σ[Ft/(1+r)^t], aceptar si >0. 3) TIR: tasa que hace VPN=0, aceptar si >WACC. 4) WACC=we·Ke+wd·Kd·(1-T). 5) Punto de Equilibrio: Q*=CF/(PVu-CVu). 6) Razones: RC=AC/PC, PA=(AC-Inv)/PC, ROE=UN/CC, ROA=UN/AT, Margen=UN/Ventas. 7) DuPont: ROE=Margen×Rotación×Apalancamiento. 8) B/C Social>1 = viable.",
                    example_title: "Evaluación Completa de Proyecto",
                    example: "Inversión: $1,000,000. Flujos: $350,000/año por 4 años. WACC=12%. VPN=-1,000,000+312,500+279,018+249,123+222,431=$63,072. VPN>0: viable. TIR≈15% (>12% WACC). Payback=1,000,000/350,000≈2.86 años. Si la empresa tiene RC=2.0, PA=1.2, ROE=18%, está en posición de financiar."
                },
                socratic_questions: [
                    {
                        q: "¿Qué pasa con el VPN si la inflación sube y el WACC se ajusta?",
                        hint: "Tasa de descuento más alta.",
                        answer: "El VPN disminuye porque una tasa más alta reduce el valor presente de los flujos futuros. Proyectos viables con inflación baja pueden volverse inviables con inflación alta. Por eso en épocas de alta inflación se invierte menos."
                    }
                ]
            }
        ]
    },
    {
        id: 'ref-autores',
        title: 'Autores Clave EGEL',
        desc: 'Economistas que debes conocer para el examen',
        icon: '👤',
        color: '#fbbf24',
        detailed_report: `# Autores Clave para el EGEL Plus ECONO
**Referencia de Economistas y sus Contribuciones**

---

## MICROECONOMÍA

### Teoría del Consumidor
- **Adam Smith (1723-1790):** "La Riqueza de las Naciones" (1776). Mano invisible, división del trabajo, libre mercado.
- **Alfred Marshall (1842-1924):** "Principles of Economics" (1890). Demandas ordinarias (marshallianas), excedente del consumidor, equilibrio parcial.
- **Vilfredo Pareto (1848-1923):** Curvas de indiferencia, óptimo de Pareto, distribución de Pareto (80/20).
- **John R. Hicks (1904-1989):** "Value and Capital" (1939). Demandas compensadas (hicksianas), IS-LM.
- **Paul Samuelson (1915-2009):** "Foundations of Economic Analysis" (1947). Preferencias reveladas, Stolper-Samuelson.
- **Hal Varian (1947-):** "Intermediate Microeconomics". Libro de texto estándar moderno.
- **Wassily Leontief (1905-1999):** Función de proporciones fijas (complementos perfectos), modelo input-output.

### Teoría del Productor y Mercados
- **Antoine Cournot (1801-1877):** Modelo de duopolio por cantidades (1838).
- **Joseph Bertrand (1822-1900):** Modelo de duopolio por precios (1883). P = CMg con solo 2 empresas.
- **Francis Edgeworth (1845-1926):** Caja de Edgeworth, duopolio con restricción de capacidad.
- **Edward Chamberlin (1899-1967):** Competencia monopolística (1933). Diferenciación de producto.
- **Joan Robinson (1903-1983):** "Economics of Imperfect Competition" (1933). Discriminación de precios, monopsonio.
- **Heinrich von Stackelberg (1905-1946):** Modelo líder-seguidor en oligopolio (1934).
- **John Nash (1928-2015):** Equilibrio de Nash (1950). Teoría de juegos no cooperativos.

### Bienestar y Fallos de Mercado
- **Arthur Pigou (1877-1959):** Impuestos pigouvianos para corregir externalidades.
- **Ronald Coase (1910-2013):** Teorema de Coase: negociación privada resuelve externalidades si costos de transacción son bajos.
- **Kenneth Arrow (1921-2017):** Teorema de imposibilidad, equilibrio general, economía de la información.

---

## MACROECONOMÍA

### Clásicos y Keynesianos
- **John M. Keynes (1883-1946):** "Teoría General" (1936). Demanda agregada, multiplicador, trampa de liquidez.
- **John Hicks & Alvin Hansen:** Modelo IS-LM (formalización de Keynes).
- **Irving Fisher (1867-1947):** Ecuación de Fisher (i = r + πe), teoría cuantitativa del dinero.
- **Milton Friedman (1912-2006):** Monetarismo, ingreso permanente, tasa natural de desempleo. "La inflación es siempre un fenómeno monetario."

### Phillips, Expectativas y Crecimiento
- **A.W. Phillips (1914-1975):** Curva de Phillips (1958): relación inflación-desempleo.
- **Robert Lucas (1937-2023):** Expectativas racionales, crítica de Lucas, crecimiento endógeno.
- **Robert Solow (1924-2023):** Modelo neoclásico de crecimiento (1956). Convergencia, residuo de Solow.
- **Paul Romer (1955-):** Crecimiento endógeno (1986). Rendimientos crecientes del conocimiento.
- **Robert Barro (1944-):** Equivalencia ricardiana, instituciones y crecimiento.

### Comercio Internacional
- **David Ricardo (1772-1823):** Ventaja comparativa.
- **Eli Heckscher & Bertil Ohlin:** Modelo H-O: comercio basado en dotación de factores.
- **Robert Mundell (1932-2021):** Mundell-Fleming, áreas monetarias óptimas.
- **Wolfgang Stolper & Samuelson:** El comercio beneficia al factor abundante.

---

## FINANZAS Y PROYECTOS
- **Franco Modigliani & Merton Miller:** Teorema M-M: estructura de capital irrelevante en mercados perfectos.
- **William Sharpe (1934-):** CAPM, Beta, relación riesgo-rendimiento.
- **Charles Cobb & Paul Douglas:** Función Cobb-Douglas (1928).

---

## DESARROLLO Y BIENESTAR
- **Amartya Sen (1933-):** Capacidades y libertades, IDH (co-creador).
- **Jeffrey Sachs (1954-):** Big Push, fin de la pobreza.
- **Douglass North (1920-2015):** Instituciones como determinantes del desarrollo.
- **Arthur Lewis (1915-1991):** Modelo dual (sector moderno vs tradicional).`,
        topics: [
            {
                id: 't1-aut-micro',
                title: 'Autores de Microeconomía',
                content: 'De Marshall a Nash.',
                lesson: {
                    explanation: "Autores clave de micro para el EGEL: Marshall (demandas ordinarias, equilibrio parcial), Hicks (demandas compensadas, IS-LM), Pareto (curvas de indiferencia, óptimo), Samuelson (preferencias reveladas), Leontief (complementos perfectos), Cournot (duopolio por cantidades), Bertrand (duopolio por precios), Nash (equilibrio no cooperativo), Chamberlin (competencia monopolística), Pigou (impuestos correctivos), Coase (negociación privada), Arrow (imposibilidad, equilibrio general).",
                    example_title: "¿Quién es Quién en el Examen?",
                    example: "Si el EGEL pregunta por 'demandas que mantienen utilidad constante' → Hicks. 'Demandas que dependen de ingreso y precios' → Marshall. 'Solución sin gobierno a externalidades' → Coase. 'No existe sistema de votación perfecto' → Arrow. 'Función min{aX,bY}' → Leontief. 'Empresas compiten en cantidades' → Cournot. 'Empresas compiten en precios' → Bertrand. 'Productos diferenciados' → Chamberlin."
                },
                socratic_questions: [
                    {
                        q: "¿Cuál es la diferencia fundamental entre Pigou y Coase para resolver externalidades?",
                        hint: "Intervención vs negociación.",
                        answer: "Pigou propone intervención del gobierno (impuestos/subsidios) para igualar costo privado con social. Coase argumenta que si los costos de transacción son bajos, las partes negocian privadamente sin gobierno. Pigou = 'arriba hacia abajo', Coase = 'abajo hacia arriba'. Coase falla cuando hay muchos afectados."
                    }
                ]
            },
            {
                id: 't2-aut-macro',
                title: 'Autores de Macroeconomía y Finanzas',
                content: 'De Keynes a Lucas.',
                lesson: {
                    explanation: "Autores macro: Keynes (demanda agregada, multiplicador, trampa de liquidez), Hicks-Hansen (IS-LM), Fisher (i=r+πe), Friedman (monetarismo, tasa natural de desempleo), Phillips (curva inflación-desempleo), Solow (crecimiento, estado estacionario), Romer (crecimiento endógeno), Lucas (expectativas racionales), Mundell (Mundell-Fleming). Finanzas: Modigliani-Miller (estructura de capital), Sharpe (CAPM, Beta). Desarrollo: Sen (IDH, capacidades), North (instituciones).",
                    example_title: "Debate Keynes vs Friedman",
                    example: "Si el EGEL plantea una recesión: Keynes diría 'aumenta gasto público, el multiplicador reactiva'. Friedman diría 'política fiscal solo genera inflación a largo plazo; mantén estable el crecimiento del dinero'. Trampa de liquidez → Keynes. 'Inflación es fenómeno monetario' → Friedman. Expectativas racionales → Lucas. Convergencia y PTF → Solow. Crecimiento por conocimiento → Romer."
                },
                socratic_questions: [
                    {
                        q: "¿Qué es la 'crítica de Lucas' y por qué cambió la macroeconomía?",
                        hint: "Los agentes cambian su comportamiento ante políticas nuevas.",
                        answer: "Lucas argumentó que los modelos basados en datos históricos NO pueden predecir el efecto de políticas nuevas, porque los agentes racionales CAMBIARÁN su comportamiento. Si el gobierno siempre combate recesiones con gasto, los agentes lo anticipan y ajustan precios, neutralizando el efecto. Obligó a usar modelos con 'microfundamentos'."
                    }
                ]
            }
        ]
    }
];