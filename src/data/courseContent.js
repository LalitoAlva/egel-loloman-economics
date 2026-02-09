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