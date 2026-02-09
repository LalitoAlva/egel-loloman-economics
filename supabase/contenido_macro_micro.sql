-- ============================================================================
-- CONTENIDO EDUCATIVO PARA MICROECONOMÍA Y MACROECONOMÍA
-- Tabla: contenido_clase
-- ============================================================================

-- MICROECONOMÍA (modulo_id = 1)

INSERT INTO contenido_clase (modulo_id, orden, tipo, titulo, contenido, imagen_url)
VALUES (
  1,
  1,
  'guia',
  'Teoría del Consumidor: Utilidad, Curvas de Indiferencia y Restricción Presupuestaria',
  '# Teoría del Consumidor: Fundamentos Esenciales

## Introducción

La teoría del consumidor es el pilar fundamental de la microeconomía moderna. Estudia cómo los individuos toman decisiones de consumo para maximizar su satisfacción (utilidad) dada una restricción de ingresos limitados. Este análisis es crucial para entender el comportamiento de la demanda y la formación de precios en los mercados.

## 1. Conceptos Fundamentales

### Utilidad y Preferencias

La **utilidad** es una medida subjetiva de la satisfacción que obtiene un consumidor al consumir bienes o servicios. La teoría moderna, desarrollada por Vilfredo Pareto (1906), utiliza un enfoque **ordinal** donde solo importa el ordenamiento de preferencias, no valores absolutos.

**Axiomas de las Preferencias del Consumidor:**

1. **Completitud**: El consumidor puede comparar cualquier par de canastas de bienes (A ≿ B, B ≿ A, o ambas).

2. **Transitividad**: Si A ≿ B y B ≿ C, entonces A ≿ C. Esto asegura consistencia lógica.

3. **Reflexividad**: Toda canasta es al menos tan preferida como ella misma (A ≿ A).

4. **Continuidad**: Las preferencias no tienen saltos discontinuos.

5. **No Saciedad (Monotonicidad)**: El consumidor siempre prefiere más cantidad de cualquier bien (más es mejor).

6. **Convexidad de Preferencias**: El consumidor prefiere combinaciones balanceadas de bienes sobre especializarse en uno solo.

## 2. Curvas de Indiferencia

Una **curva de indiferencia** representa todas las combinaciones de dos bienes que proporcionan al consumidor el mismo nivel de utilidad o satisfacción. Es una herramienta gráfica fundamental para analizar las preferencias.

### Propiedades de las Curvas de Indiferencia

**Pendiente Negativa**: Para mantener la misma utilidad, si el consumidor aumenta el consumo de un bien, debe reducir el del otro.

**No se Intersectan**: Dos curvas de indiferencia nunca se cruzan. Si lo hicieran, violarían el axioma de transitividad.

**Convexas al Origen**: Reflejan la preferencia por combinaciones balanceadas (rendimientos marginales decrecientes en la sustitución).

**Más alejadas del origen = Mayor Utilidad**: Las curvas más lejanas del origen representan mayores niveles de satisfacción.

### La Relación Marginal de Sustitución (RMS)

La **RMS** mide la cantidad de bien Y que el consumidor está dispuesto a sacrificar para obtener una unidad adicional del bien X, manteniendo la utilidad constante.

**Fórmula:**
RMS = UMg(X) / UMg(Y) = -dY/dX

Donde UMg representa la utilidad marginal (cambio en utilidad total ante cambio unitario en consumo).

**Interpretación Económica**: La RMS es la pendiente de la curva de indiferencia. Típicamente disminuye conforme aumenta el consumo de X (RMS decreciente), reflejando que mientras más tienes de un bien, menos estás dispuesto a sacrificar del otro para obtener más.

### Tipos de Preferencias y sus Curvas de Indiferencia

**A) Sustitutos Perfectos** (Curvas Lineales)
- Función de Utilidad: U(X,Y) = aX + bY
- La RMS es constante
- El consumidor es indiferente entre los bienes
- Ejemplo: Billetes de $10 y dos billetes de $5

**B) Complementos Perfectos** (Curvas en Forma de L)
- Función de Utilidad: U(X,Y) = min{aX, bY}
- La RMS es indefinida en el punto óptimo
- Los bienes deben consumirse en proporciones fijas
- Ejemplo: Zapatos izquierdos y derechos

**C) Cobb-Douglas** (Curvas Suaves y Convexas)
- Función de Utilidad: U(X,Y) = X^α · Y^(1-α)
- RMS decreciente, curvatura suave
- Comportamiento realista para muchos bienes
- Ejemplo: Alimentos y entretenimiento

## 3. Función de Utilidad

Una **función de utilidad** es una representación matemática que asigna un número a cada canasta de consumo, preservando el ordenamiento de preferencias. Si el consumidor prefiere A sobre B, entonces U(A) > U(B).

### Utilidad Marginal

La **utilidad marginal** (UMg) es el cambio en la utilidad total cuando se consume una unidad adicional del bien.

**Fórmula:**
UMg(X) = ∂U/∂X
UMg(Y) = ∂U/∂Y

**Ley de Utilidad Marginal Decreciente**: A medida que aumenta el consumo de un bien, la utilidad adicional (marginal) disminuye. Esta es una observación empírica fundamental que explica por qué las curvas de demanda tienen pendiente negativa.

**Ejemplo Práctico:**
- Primera pizza: genera 10 unidades de satisfacción
- Segunda pizza: genera 7 unidades adicionales
- Tercera pizza: genera 4 unidades adicionales
- La utilidad marginal decrece (10 > 7 > 4)

## 4. Restricción Presupuestaria

La **restricción presupuestaria** (o recta de presupuesto) muestra todas las combinaciones de bienes que el consumidor puede comprar con su ingreso disponible, dados los precios de los bienes.

**Ecuación:**
M = Px·X + Py·Y

Donde:
- M = Ingreso monetario del consumidor
- Px = Precio del bien X
- Py = Precio del bien Y

### Representación Gráfica

La restricción presupuestaria es una línea recta con:
- **Intercepto en X**: M/Px (máximo X si todo se gasta en X)
- **Intercepto en Y**: M/Py (máximo Y si todo se gasta en Y)
- **Pendiente**: -Px/Py (razón de precios)

### Cambios en la Restricción Presupuestaria

**Aumento del Ingreso (M)**: La línea se desplaza paralelamente hacia la derecha (mayor poder adquisitivo).

**Disminución del Ingreso (M)**: La línea se desplaza paralelamente hacia la izquierda (menor poder adquisitivo).

**Cambio en Precio de X**: Cambia el intercepto en X pero no en Y. Si Px disminuye, la línea rota hacia afuera.

**Cambio en Precio de Y**: Cambia el intercepto en Y pero no en X. Si Py aumenta, la línea rota hacia adentro.

## 5. Equilibrio del Consumidor

El consumidor alcanza su **máxima utilidad** donde su curva de indiferencia más alta es tangente (toca) a su recta presupuestaria. En este punto:

**Condición de Tangencia:**
RMS = Px/Py

O equivalentemente:
UMg(X)/UMg(Y) = Px/Py

**Interpretación Económica:**
- El lado izquierdo (RMS) representa cuánto está dispuesto a sustituir el consumidor
- El lado derecho (Px/Py) representa cuánto puede sustituir en el mercado
- En equilibrio, ambos valores coinciden

Si RMS > Px/Py: El consumidor valora relativamente más X de lo que cuesta en el mercado, debe aumentar consumo de X.

Si RMS < Px/Py: El consumidor valora relativamente menos X de lo que cuesta, debe disminuir consumo de X.

## Conclusión

La teoría del consumidor proporciona el marco para entender cómo las preferencias individuales (representadas por curvas de indiferencia) interactúan con restricciones económicas (recta presupuestaria) para determinar las decisiones de consumo óptimas. Este análisis es la base para derivar funciones de demanda individual y, agregadamente, la demanda de mercado.',
  NULL
);

INSERT INTO contenido_clase (modulo_id, orden, tipo, titulo, contenido, imagen_url)
VALUES (
  1,
  2,
  'guia',
  'Elasticidades de Demanda: Medidas de Sensibilidad de la Demanda',
  '# Elasticidades de Demanda: Análisis Completo

## Introducción

Las elasticidades son medidas fundamentales que cuantifican la responsividad (sensibilidad) de la cantidad demandada ante cambios en precios, ingresos u otros factores. Son herramientas esenciales para predecir cómo cambios en el entorno económico afectarán las decisiones de compra de consumidores y empresas.

## 1. Elasticidad Precio de la Demanda (EPD)

La **elasticidad precio de la demanda** mide la sensibilidad de la cantidad demandada respecto a cambios en el precio del bien.

**Fórmula:**
EPD = (% Cambio en Cantidad Demandada) / (% Cambio en Precio)
EPD = (ΔQd/Qd) / (ΔP/P)

O en términos de derivada:
EPD = (dQd/dP) × (P/Qd)

### Interpretación del Valor de EPD

**Demanda Elástica** (|EPD| > 1):
- La cantidad es muy sensible al precio
- Un aumento del 1% en precio causa una disminución mayor al 1% en cantidad
- Ejemplos: Bienes de lujo, bienes con muchos sustitutos (restaurantes, viajes)
- Implicación para ingresos: Si sube el precio, los ingresos totales DISMINUYEN

**Demanda Inelástica** (|EPD| < 1):
- La cantidad es poco sensible al precio
- Un aumento del 1% en precio causa una disminución menor al 1% en cantidad
- Ejemplos: Bienes de primera necesidad, bienes sin sustitutos (insulina, servicios esenciales)
- Implicación para ingresos: Si sube el precio, los ingresos totales AUMENTAN

**Demanda Unitaria** (|EPD| = 1):
- La cantidad cambia proporcionalmente al precio
- Un aumento del 1% en precio causa exactamente 1% de disminución en cantidad
- Los ingresos totales permanecen constantes

**Demanda Perfectamente Elástica** (|EPD| = ∞):
- Muy pequeño aumento en precio causa colapso total en demanda
- Gráficamente es una línea horizontal
- Raro en la práctica, se aproxima en mercados competitivos

**Demanda Perfectamente Inelástica** (|EPD| = 0):
- La cantidad demandada no cambia con el precio
- Gráficamente es una línea vertical
- Ejemplo: Medicinas vitales en corto plazo

### Factores Determinantes de la Elasticidad Precio

**Disponibilidad de Sustitutos**: Cuantos más sustitutos cercanos existan, mayor será la elasticidad (más sensible al precio).

**Grado de Necesidad**: Los bienes necesarios son menos elásticos que los de lujo.

**Proporción del Gasto en el Presupuesto**: Bienes que representan gran proporción del gasto son más elásticos.

**Horizonte Temporal**: La demanda es más elástica en el largo plazo (tiempo para ajustarse) que en el corto plazo.

**Amplitud de Mercado**: Mercados más amplios tienden a ser menos elásticos que segmentos específicos.

## 2. Elasticidad Precio Cruzada de la Demanda

Mide cómo cambia la cantidad demandada de un bien ante cambios en el precio de otro bien.

**Fórmula:**
Epx,py = (% Cambio en Qd del bien X) / (% Cambio en Precio de Y)

### Interpretación

**Bienes Sustitutos** (Epx,py > 0):
- La elasticidad cruzada es positiva
- Si sube el precio de Y, la demanda de X aumenta
- Ejemplos: Café y té, mantequilla y margarina, Coca-Cola y Pepsi
- Los bienes compiten entre sí

**Bienes Complementarios** (Epx,py < 0):
- La elasticidad cruzada es negativa
- Si sube el precio de Y, la demanda de X disminuye
- Ejemplos: Autos y gasolina, café y azúcar, computadoras y software
- Los bienes se consumen juntos

**Bienes Independientes** (Epx,py ≈ 0):
- La elasticidad cruzada es cercana a cero
- Cambios en el precio de Y no afectan significativamente la demanda de X
- Ejemplos: Libros y gasolina, ropa y servicios dentales
- Los bienes no tienen relación de consumo

### Aplicaciones Prácticas

Las elasticidades cruzadas ayudan a:
- Identificar competidores reales en un mercado
- Predecir efectos de cambios en precios de productos relacionados
- Entender la estructura de preferencias de los consumidores

## 3. Elasticidad Ingreso de la Demanda

Mide cómo cambia la cantidad demandada ante variaciones en el ingreso del consumidor.

**Fórmula:**
Ei = (% Cambio en Qd) / (% Cambio en Ingreso)
Ei = (ΔQd/Qd) / (ΔM/M)

### Clasificación de Bienes por Elasticidad Ingreso

**Bienes Normales** (Ei > 0):
- La cantidad demandada aumenta cuando sube el ingreso
- Comportamiento típico para la mayoría de bienes
- Ejemplos: Ropa, electrónica, viajes

**Bienes Inferiores** (Ei < 0):
- La cantidad demandada disminuye cuando sube el ingreso
- El consumidor sustituye hacia bienes de mejor calidad
- Ejemplos: Fideos baratos, autobús (vs. taxi), ropa de baja calidad

**Bienes de Lujo** (Ei > 1):
- Demanda muy sensible al ingreso
- El gasto en estos bienes aumenta proporcionalmente más que el ingreso
- Ejemplos: Viajes internacionales, joyas, arte, autos de lujo
- Son los primeros sacrificados en crisis económicas

**Bienes Necesarios** (0 < Ei < 1):
- Demanda insensible al ingreso
- El gasto en estos bienes representa proporción decreciente del ingreso
- Ejemplos: Alimentos básicos, servicios de salud esencial
- Se consumen incluso con bajos ingresos

## 4. Elasticidad de la Oferta

Mide la sensibilidad de la cantidad ofrecida ante cambios en el precio.

**Fórmula:**
Eo = (% Cambio en Qo) / (% Cambio en Precio)
Eo = (dQo/dP) × (P/Qo)

### Factores que Afectan la Elasticidad de Oferta

**Flexibilidad de Producción**: Mayor flexibilidad = mayor elasticidad.

**Capacidad Excedente**: Empresas con capacidad ociosa pueden aumentar producción fácilmente.

**Tiempo de Reacción**: La oferta es más elástica en largo plazo que en corto plazo.

**Disponibilidad de Insumos**: Si los insumos están disponibles, la oferta es más elástica.

**Movilidad de Factores**: Factores fácilmente reasignables permiten mayor elasticidad.

## 5. Aplicaciones Económicas de Elasticidades

### Para Empresas

Las elasticidades guían decisiones de precios:
- **Si demanda es elástica**: Reducir precios aumenta ingresos totales
- **Si demanda es inelástica**: Aumentar precios aumenta ingresos totales

### Para Gobiernos

- **Impuestos**: Bienes inelásticos son buenos objetivos impositivos (proporcionan ingresos sin reducir mucho la cantidad)
- **Precios Máximos**: Efectivos en bienes elásticos, inefectivos en inelásticos
- **Subsidios**: Más efectivos para estimular consumo de bienes elásticos

### Para Análisis Macroeconómico

- **Inflación**: La elasticidad determina cómo cambios de precios afectan el comportamiento económico agregado
- **Desempleo**: Elasticidad de oferta de trabajo afecta mercados laborales

## Conclusión

Las elasticidades son herramientas cuantitativas esenciales en economía que permiten medir la magnitud de respuestas económicas a cambios en precios e ingresos. Su comprensión es crucial para tomar decisiones empresariales y políticas públicas informadas.',
  NULL
);

INSERT INTO contenido_clase (modulo_id, orden, tipo, titulo, contenido, imagen_url)
VALUES (
  1,
  3,
  'guia',
  'Teoría del Productor: Función de Producción y Rendimientos',
  '# Teoría del Productor: Análisis de Producción y Eficiencia

## Introducción

La teoría del productor analiza cómo las empresas combinan factores de producción (trabajo, capital, materias primas) para generar bienes y servicios. A diferencia del consumidor que maximiza utilidad, el productor busca maximizar beneficios, minimizar costos, u otros objetivos empresariales. Este análisis es simétrico al de la teoría del consumidor pero enfocado en decisiones de producción.

## 1. La Función de Producción

La **función de producción** describe la relación técnica entre cantidades de insumos (inputs) utilizados y la cantidad máxima de producto (output) que puede producirse.

**Notación Matemática:**
Q = f(L, K, M)

Donde:
- Q = Cantidad producida (output)
- L = Cantidad de trabajo (labor)
- K = Cantidad de capital
- M = Materias primas u otros insumos

### Propiedades Fundamentales

**Eficiencia Técnica**: La función de producción representa solo las combinaciones técnicamente eficientes de insumos (no desperdicia recursos).

**Rendimientos Marginales Decrecientes**: A medida que se aumenta un factor manteniendo otros fijos, la producción adicional disminuye.

**Largo vs Corto Plazo**:
- **Corto Plazo**: Al menos un factor es fijo (capital típicamente)
- **Largo Plazo**: Todos los factores son variables

### Tipos de Funciones de Producción

**Función Cobb-Douglas:**
Q = A × L^α × K^β

Donde A es un parámetro de productividad total y α, β son elasticidades de producción. Esta es la más usada en economía empírica porque:
- Tiene propiedades matemáticas convenientes
- Se estima fácilmente econométricamente
- Aproxima bien el comportamiento real

**Función Lineal (Sustitutos Perfectos):**
Q = a×L + b×K

Los factores son perfectamente sustituibles. Una unidad de capital equivale exactamente a b/a unidades de trabajo.

**Función Leontief (Complementos Perfectos):**
Q = min{a×L, b×K}

Los factores deben usarse en proporciones fijas (proporciones técnicas). No hay sustitución posible. Ejemplo: Un automóvil necesita exactamente 4 llantas y 1 motor.

## 2. Productividad Marginal y Media

### Producto Marginal (PMg)

El **producto marginal** de un factor es la producción adicional obtenida al utilizar una unidad adicional de ese factor, manteniendo otros factores constantes.

**Fórmulas:**
PMg(L) = ∂Q/∂L (producto marginal del trabajo)
PMg(K) = ∂Q/∂K (producto marginal del capital)

**Interpretación**: Si PMg(L) = 50, significa que contratar un trabajador adicional agrega 50 unidades de producción.

### Producto Medio (PMe)

El **producto medio** es la producción promedio por unidad de factor utilizado.

**Fórmulas:**
PMe(L) = Q/L (producto medio del trabajo)
PMe(K) = Q/K (producto medio del capital)

**Interpretación**: Si PMe(L) = 100, significa que en promedio, cada trabajador produce 100 unidades.

### Relación entre PMg y PMe

**Regla Fundamental:**
- Cuando PMg > PMe: El PMe está aumentando (PMg tira el promedio hacia arriba)
- Cuando PMg = PMe: El PMe está en su máximo
- Cuando PMg < PMe: El PMe está disminuyendo (PMg tira el promedio hacia abajo)

**Ley de Rendimientos Marginales Decrecientes**:
Después de cierto nivel de producción, cada unidad adicional de un factor produce incrementos cada vez menores en la producción. Esta es la observación empírica más importante en teoría de producción.

## 3. Las Tres Etapas de la Producción

En corto plazo, la relación entre PMg y PMe define tres etapas de producción:

**Etapa I: Rendimientos Crecientes**
- PMg > PMe (ambos crecientes)
- El factor fijo está subutilizado
- Más factores variables mejora la eficiencia del factor fijo
- Racionalmente ineficiente producir aquí

**Etapa II: Rendimientos Decrecientes (Etapa Racional)**
- PMg < PMe (ambos decrecientes pero positivos)
- Uso equilibrado de factores
- Ambos contribuyen positivamente a la producción
- Esta es la zona de producción racional
- Una empresa típicamente opera en esta etapa

**Etapa III: Rendimientos Negativos**
- PMg < 0
- La producción adicional es negativa
- Hay congestión y conflicto entre factores
- Nunca es racional producir aquí (se produce menos con más factores)

## 4. Relación Marginal de Sustitución Técnica (RMST)

La **RMST** mide cuántas unidades de capital pueden reemplazarse por una unidad adicional de trabajo, manteniendo la producción constante.

**Fórmula:**
RMST(L,K) = PMg(L) / PMg(K) = -dK/dL

**Interpretación**: Si RMST = 2, significa que se pueden eliminar 2 unidades de capital por cada trabajador adicional sin cambiar la producción.

### Isocuantas

Una **isocuanta** es una curva que muestra todas las combinaciones de capital y trabajo que generan el mismo nivel de producción. Gráficamente es similar a las curvas de indiferencia, pero para producción.

**Propiedades:**
- Pendiente negativa (RMST es negativa)
- Convexas al origen (RMST decreciente)
- No se intersectan
- Más alejadas del origen = Mayor producción

## 5. Rendimientos a Escala

Los **rendimientos a escala** miden cómo cambia la producción cuando TODOS los factores aumentan en la misma proporción.

**Clasificación:**

**Rendimientos Crecientes a Escala**:
- Si multiplicamos todos los inputs por λ > 1, la producción aumenta más que λ
- Q(λL, λK) > λ Q(L, K)
- Para Cobb-Douglas: α + β > 1
- Ejemplos: Industrias de tecnología con fuertes economías de aglomeración, acero
- Causa: Especialización, economías de escala en compras

**Rendimientos Constantes a Escala**:
- Si multiplicamos todos los inputs por λ > 1, la producción aumenta exactamente λ
- Q(λL, λK) = λ Q(L, K)
- Para Cobb-Douglas: α + β = 1
- Esta es la hipótesis de proporcionalidad: duplicar inputs duplica producción
- Muchas empresas operan bajo este supuesto

**Rendimientos Decrecientes a Escala**:
- Si multiplicamos todos los inputs por λ > 1, la producción aumenta menos que λ
- Q(λL, λK) < λ Q(L, K)
- Para Cobb-Douglas: α + β < 1
- Ejemplos: Empresas de servicios personalizados donde hay limitaciones gerenciales
- Causa: Problemas coordinación, limitaciones de gerencia, congestión

### Importancia de los Rendimientos a Escala

Los rendimientos a escala determinan:
- **Estructura de la industria**: Rendimientos crecientes concentran producción en pocas empresas grandes
- **Tamaño óptimo de empresa**: Rendimientos crecientes favorecen empresas grandes
- **Competencia**: Rendimientos decrecientes permiten mercados más competitivos

## Conclusión

La teoría del productor proporciona el marco analítico para entender cómo las decisiones técnicas de producción (combinación de factores) se relacionan con decisiones económicas (minimización de costos, maximización de beneficios). Los conceptos de productividad marginal, etapas de producción y rendimientos a escala son fundamentales para entender la estructura de costos empresarial y la organización industrial.',
  NULL
);

INSERT INTO contenido_clase (modulo_id, orden, tipo, titulo, contenido, imagen_url)
VALUES (
  1,
  4,
  'guia',
  'Costos de Producción: Estructura, Comportamiento y Análisis',
  '# Costos de Producción: Análisis Integral

## Introducción

Entender los costos de producción es esencial para cualquier decisión empresarial. Los costos determinan precios, márgenes de ganancia, decisiones de producción y viabilidad de la empresa. Este análisis conecta la función de producción (relación técnica) con la realidad económica de precios de factores.

## 1. Clasificación de Costos

### Costo Fijo (CF)

Los **costos fijos** no varían con el nivel de producción en el corto plazo. Deben pagarse incluso si la empresa produce cero unidades.

**Ejemplos:**
- Renta del local
- Salarios de gerencia
- Seguros
- Depreciación de equipos
- Servicios básicos (parte fija)

**Características:**
- Constante e independiente de Q
- A largo plazo todos los costos son variables
- En análisis de corto plazo, CF es relevante solo para decisión de cerrar la empresa

### Costo Variable (CV)

Los **costos variables** cambian directamente con el nivel de producción. Aumentan cuando se produce más, disminuyen cuando se produce menos.

**Ejemplos:**
- Materias primas
- Mano de obra directa
- Servicios de utilidad proporcionales a producción
- Empaque y transporte

**Características:**
- Cero cuando Q = 0
- Generalmente aumentan a tasa creciente (por productividad marginal decreciente)
- Son evitables en corto plazo si la empresa cierra

### Costo Total (CT)

El **costo total** es la suma de costos fijos y variables.

**Fórmula:**
CT = CF + CV

**Comportamiento:**
- Cuando Q = 0: CT = CF (solo costos fijos)
- A medida que Q aumenta, CT aumenta junto con CV
- La pendiente de CT es igual al costo marginal

## 2. Costos Promedios

### Costo Medio Total (CTM o CME)

El **costo medio total** es el costo total por unidad de producción.

**Fórmula:**
CTM = CT / Q

Se puede descomponer:
CTM = CF/Q + CV/Q = CFM + CVM

### Costo Medio Fijo (CFM)

El **costo medio fijo** es el costo fijo por unidad producida.

**Fórmula:**
CFM = CF / Q

**Comportamiento:**
- Disminuye continuamente a medida que Q aumenta (efecto de dispersión)
- Asintóticamente se aproxima a cero
- Esto explica por qué empresas grandes tienen ventajas de costo

**Ejemplo:** Una panadería con CF de $1,000:
- Si produce 100 panes: CFM = $10 por pan
- Si produce 1,000 panes: CFM = $1 por pan
- Si produce 10,000 panes: CFM = $0.10 por pan

### Costo Medio Variable (CVM)

El **costo medio variable** es el costo variable por unidad producida.

**Fórmula:**
CVM = CV / Q

**Comportamiento:**
- Inicialmente disminuye (mejor utilización de factores)
- Posteriormente aumenta (rendimientos marginales decrecientes)
- Forma característica de U

## 3. Costo Marginal (CMg)

El **costo marginal** es el aumento en el costo total al producir una unidad adicional.

**Fórmula:**
CMg = ΔCT / ΔQ = dCT/dQ

**Interpretación:** Si CMg(10) = $50, significa que producir la unidad 11 cuesta $50 adicionales.

### Relación entre CMg y Costos Medios

**Regla Fundamental:**
- Cuando CMg < CTM: El CTM está disminuyendo (CMg tira el promedio hacia abajo)
- Cuando CMg = CTM: El CTM está en su mínimo
- Cuando CMg > CTM: El CTM está aumentando (CMg tira el promedio hacia arriba)

**Implicación práctica:** La curva de CMg intersecta la curva de CTM en el punto más bajo del CTM. Esta es una relación geométrica fundamental.

### Forma de la Curva de CMg

Típicamente el CMg es U-shaped:
- **Inicialmente disminuye**: Porque hay capacidad ociosa y economías de escala
- **Mínimo**: En algún nivel de producción
- **Luego aumenta**: Por rendimientos marginales decrecientes, congestión

## 4. Análisis Gráfico de Costos

### La Familia de Curvas de Costo

Típicamente en una gráfica de costo vs cantidad vemos:

**CF**: Línea horizontal constante

**CV**: Comienza en origen, aumenta a tasa creciente

**CT**: Paralela a CV pero desplazada hacia arriba por CF

**CVM**: Curva en forma de U

**CFM**: Hipérbola decreciente

**CTM**: Curva en forma de U (envolvente de curvas de corto plazo)

**CMg**: Inicialmente baja, cruza CVM en su mínimo, luego sube. Cruza CTM en su mínimo.

### Interrelaciones Clave

1. CF + CV = CT (relación de adición)
2. CFM + CVM = CTM (relación de adición)
3. CMg intersecta CVM en mínimo de CVM
4. CMg intersecta CTM en mínimo de CTM
5. CMg está por debajo de CVM cuando CVM disminuye
6. CMg está por encima de CVM cuando CVM aumenta

## 5. Costos de Corto Plazo vs Largo Plazo

### Corto Plazo

- Al menos un factor es fijo (típicamente capital)
- Existen costos fijos y variables
- La empresa no puede ajustar completamente sus instalaciones
- Decisión importante: ¿continuar produciendo o cerrar?

**Regla de Cierre en Corto Plazo:**
Continuar produciendo si Precio > CVMe (precio cubre al menos costos variables)

### Largo Plazo

- Todos los factores son variables
- No hay costos fijos (todos se pueden evitar)
- La empresa puede construir la escala óptima
- La curva de CMeLP es la envolvente inferior de todas las curvas de CMeCP

**Economías y Deseconomías de Escala:**
- **Economías de Escala**: CMeLP disminuye conforme aumenta Q (costo unitario baja)
- **Escala Mínima Eficiente**: El nivel de producción donde CMeLP alcanza su mínimo
- **Deseconomías de Escala**: CMeLP aumenta conforme aumenta Q (problemas de coordinación, tamaño)

## 6. Aplicaciones de Análisis de Costos

### Para Decisiones de Producción

**Nivel Óptimo de Producción:**
- Empresa maximiza beneficios donde CMg = IMg (ingreso marginal)
- En competencia perfecta: P = CMg en equilibrio largo plazo

### Para Decisiones de Precios

**Margen sobre Costo:**
- Precio debe cubrir CMg para contribuir a ganancia
- Precio debe cubrir CTM en largo plazo para viabilidad

### Para Decisiones Estratégicas

**Entrada/Salida de Mercados:**
- Si P > CTM: Beneficio económico positivo, incentiva entrada
- Si P = CTM: Beneficio económico cero, equilibrio (largo plazo competitivo)
- Si P < CTM: Pérdidas, incentiva salida

## Conclusión

El análisis de costos es fundamental en economía empresarial. La estructura de costos determina viabilidad empresarial, decisiones de producción y estructura de mercados. La comprensión de cómo costos fijos y variables interactúan, y cómo se relacionan costos medios y marginales, es esencial para cualquier análisis microeconómico profundo.',
  NULL
);

INSERT INTO contenido_clase (modulo_id, orden, tipo, titulo, contenido, imagen_url)
VALUES (
  1,
  5,
  'guia',
  'Competencia Perfecta: Características, Equilibrio y Eficiencia',
  '# Competencia Perfecta: El Modelo de Referencia

## Introducción

La competencia perfecta es el modelo de mercado más importante en microeconomía, aunque raramente existe en forma pura en la realidad. Sirve como punto de referencia (benchmark) para evaluar la eficiencia de otros mercados. En competencia perfecta, el mercado funciona de manera eficiente asignando recursos sin intervención.

## 1. Características de Mercados Perfectamente Competitivos

### Muchos Compradores y Vendedores

- El número de empresas y consumidores es tan grande que ninguno puede influir en el precio de mercado
- Cada empresa es un "tomador de precios" (price taker), no puede fijar precios
- Cada consumidor es insignificante en la demanda total

### Producto Homogéneo

- El producto de diferentes empresas es idéntico (o percibido como tal)
- Los consumidores no pueden diferenciar entre productores
- La única razón para cambiar entre empresas es el precio
- Ejemplos reales: Granos, petróleo crudo, acciones

### Libre Entrada y Salida

- No hay barreras para que nuevas empresas entren al mercado
- No hay costos de salida para empresas que desean abandonar
- Las empresas pueden entrar con el mismo costo que las existentes
- Implica que en largo plazo, se eliminen beneficios extraordinarios

### Información Perfecta

- Todos los participantes (empresas y consumidores) tienen acceso a toda la información relevante
- Los consumidores conocen todos los precios y calidades
- Las empresas conocen todos los costos y demanda
- No hay costos de búsqueda o transacción

### Movilidad Perfecta de Factores

- Los factores de producción (trabajo, capital) pueden moverse libremente entre empresas e industrias
- El trabajo puede encontrar empleo rápidamente donde es más productivo
- El capital fluye hacia los mejores usos

## 2. Comportamiento de la Empresa en Competencia Perfecta

### Demanda Enfrentada por la Empresa

En competencia perfecta, cada empresa enfrenta una curva de demanda **perfectamente elástica** (horizontal) al precio de mercado.

**Matemáticamente:**
- Demanda de mercado: Qd = a - bP (con pendiente negativa)
- Demanda enfrentada por empresa individual: perfectamente elástica al P*

**Implicación:** La empresa puede vender cualquier cantidad al precio de mercado P*, pero nada a precio superior.

### Maximización de Beneficios

El beneficio de la empresa es:
π = IT - CT = P*·Q - CT(Q)

**Condición de Primer Orden:**
dπ/dQ = P* - CMg = 0

**Condición de Equilibrio:**
P* = CMg

**Interpretación Económica:**
- La empresa debe producir hasta el punto donde el precio (lo que obtiene por unidad adicional) iguala el costo marginal (lo que cuesta producir esa unidad)
- Si CMg < P*: Producir más unidades suma más a ingresos que a costos (beneficio aumenta)
- Si CMg > P*: Producir una unidad adicional cuesta más que lo que genera (beneficio disminuye)
- En equilibrio, la ganancia en ingresos iguala la ganancia en costos en la unidad marginal

### Curva de Oferta de la Empresa

La **curva de oferta** de una empresa en competencia perfecta es su **curva de costo marginal** (por encima del costo variable medio).

**Matemáticamente:**
- Oferta de empresa: Qo = f(P) donde P = CMg
- Solo la parte de CMg que está por encima de CVM (en corto plazo)

## 3. Equilibrio de Mercado

### Corto Plazo

**Equilibrio:**
- P* = CMg (empresa individual produce donde CMg = P*)
- Qd = Qo (cantidad demandada iguala cantidad ofrecida en mercado)
- Las empresas pueden tener beneficios económicos positivos, negativos o cero

**Beneficio Económico en Corto Plazo:**
π = (P* - CTM) · Q*

Puede ser:
- **π > 0**: Si P* > CTM (hay ganancia extraordinaria)
- **π = 0**: Si P* = CTM (ganancia normal)
- **π < 0**: Si P* < CTM (hay pérdida)

### Largo Plazo

**Entrada y Salida de Empresas:**
- Si π > 0 en corto plazo, nuevas empresas entran atraídas por ganancias
- Si π < 0 en corto plazo, empresas salen para evitar pérdidas
- El entrada y salida continúa hasta que π = 0

**Equilibrio de Largo Plazo:**
- P* = CMg = CTM (producir donde costo marginal = costo medio = precio)
- Beneficio económico = 0 (ganancia normal)
- Qd = Qo (equilibrio de mercado)
- Número de empresas se ajusta para que se cumpla la igualdad anterior

**Implicación:** En largo plazo, competencia perfecta lleva a un resultado donde:
- El precio se reduce hasta el nivel del costo medio mínimo
- Las empresas producen a escala eficiente
- No hay ganancias extraordinarias (solo ganancia normal)
- Hay máxima eficiencia productiva

## 4. Eficiencia en Competencia Perfecta

### Eficiencia Asignativa

La competencia perfecta logra **eficiencia asignativa**: El precio refleja tanto el costo marginal de producción como la valoración marginal del consumidor (utilidad marginal), optimizando la asignación de recursos.

**Condición de Eficiencia:**
P = CMg = UMg relativa (valoración del consumidor)

Esto significa:
- El costo de producir una unidad adicional = lo que está dispuesto a pagar el consumidor
- No hay desperdicio de recursos ni oportunidades no aprovechadas

### Eficiencia Productiva

La competencia perfecta logra **eficiencia productiva**: Se produce al mínimo costo posible.

**Condición:**
P = CTM mínimo

Las empresas producen con técnicas eficientes, sin desperdicio de insumos.

### Teoremas del Bienestar Económico

**Primer Teorema del Bienestar (Arrow-Debreu, 1951):**
"Todo equilibrio de competencia perfecta es Pareto eficiente."

Esto significa: No se puede mejorar la situación de una persona sin empeorar la de otra.

**Segundo Teorema del Bienestar:**
"Cualquier asignación Pareto eficiente puede alcanzarse como equilibrio de competencia perfecta mediante redistribuciones apropiadas de dotaciones iniciales."

Implicación: Eficiencia y equidad pueden separarse (redistribuir luego dejar actuar el mercado).

## 5. Oferta de la Industria en Largo Plazo

### Industrias de Costo Constante

Si los precios de los factores no cambian cuando la industria se expande:
- La curva de oferta de largo plazo es horizontal
- El precio de equilibrio no cambia aunque aumente producción

### Industrias de Costo Creciente

Si los precios de los factores aumentan cuando la industria se expande (factores se vuelven escasos):
- La curva de oferta de largo plazo tiene pendiente positiva
- A mayor producción, mayor debe ser el precio para cubrir costos

### Industrias de Costo Decreciente

Si los precios de los factores disminuyen cuando la industria se expande (economías externas):
- La curva de oferta de largo plazo tiene pendiente negativa (muy raro)
- A mayor producción, menor puede ser el precio

## 6. Excepciones y Limitaciones del Modelo

### Limitaciones en la Realidad

- **Productos diferenciados**: Pocas industrias tienen productos verdaderamente homogéneos
- **Información imperfecta**: Los consumidores y empresas no tienen información completa
- **Barreras a la entrada**: Patentes, economías de escala, licencias limitan entrada
- **Pocos productores**: La mayoría de mercados tienen número finito de empresas
- **Costos de transacción**: Existen costos reales de búsqueda e intercambio

### Excepciones Regulares

- **Agricul​tura**: Se aproxima bastante a competencia perfecta (muchos productores de bienes homogéneos)
- **Mercados financieros**: Altamente competitivos, muchos participantes, productos estandarizados
- **E-commerce**: La tecnología ha hecho mercados más competitivos

## Conclusión

La competencia perfecta es un ideal teórico que raramente existe en forma pura, pero es invaluable como punto de referencia. Demuestra que mercados competitivos pueden lograr eficiencia económica sin coordinación central. Aunque real mercados no alcanzan perfección, el análisis de competencia perfecta proporciona benchmark para evaluar eficiencia de otros mercados y comprende dinámicas de precio y cantidad que subyacen en economía real.',
  NULL
);

INSERT INTO contenido_clase (modulo_id, orden, tipo, titulo, contenido, imagen_url)
VALUES (
  1,
  6,
  'guia',
  'Monopolio: Poder de Mercado, Discriminación de Precios y Bienestar',
  '# Monopolio: Análisis del Poder de Mercado

## Introducción

El monopolio es la antítesis de la competencia perfecta: una sola empresa controlando toda la producción de un bien sin sustitutos cercanos. A diferencia del tomador de precios en competencia perfecta, el monopolista es "fijador de precios" (price maker) que elige simultáneamente precio y cantidad. Este poder de mercado genera ineficiencias que son centrales en análisis de política antitrust.

## 1. Características de Monopolios

### Monopolista Único

- Una sola empresa produce el bien o servicio
- Representa el 100% de la oferta de mercado
- La curva de demanda de la empresa es la curva de demanda de mercado

### Ausencia de Sustitutos Cercanos

- El producto no tiene alternativas viables
- Los consumidores no pueden sustituir fácilmente
- Ejemplos: Servicios de utilidad (agua, electricidad), medicinas patentadas, Microsoft Windows

### Barreras a la Entrada

Las barreras impiden que nuevas empresas entren y eroda el poder monopólico:

**Barreras Técnicas:**
- Economías de escala masivas (una empresa grande es más eficiente)
- Acceso exclusivo a factores de producción clave
- Tecnología propietaria difícil de replicar

**Barreras Legales:**
- Patentes que dan derechos exclusivos por tiempo limitado
- Licencias regulatorias (telecomunicaciones)
- Derechos de autor
- Franquicias exclusivas otorgadas por gobierno

**Barreras Estratégicas:**
- Control de puntos de distribución
- Contratos exclusivos con proveedores
- Prácticas predatorias para desalentar competencia
- Marca fuertemente establecida

### Control sobre el Precio

A diferencia del competidor perfecto que afronta demanda horizontal (perfectamente elástica), el monopolista afronta la curva de demanda de mercado (pendiente negativa).

**Implicación:** El monopolista no puede vender unidades adicionales sin reducir el precio. Debe elegir un punto en la curva de demanda.

## 2. Ingreso del Monopolista

### Ingreso Total (IT)

El ingreso total es:
IT = P(Q) · Q

Donde P(Q) es la función de demanda inversa.

**Característica Importante:**
Conforme aumenta Q, el precio P debe disminuir para vender más unidades.

### Ingreso Marginal (IMg)

El ingreso marginal es el ingreso adicional de vender una unidad más.

**Fórmula:**
IMg = dIT/dQ = d[P(Q)·Q]/dQ = P + Q·(dP/dQ)

**Relación con Demanda:**
IMg = P + Q·(dP/dQ) = P(1 + 1/EPD)

Donde EPD es la elasticidad precio de la demanda.

**Consecuencia Crítica:**
IMg < P (siempre, para el monopolista)

Esto es porque al vender una unidad adicional:
- Gana P por esa unidad
- Pero pierde Q·(dP/dQ) porque debe reducir precio en todas las unidades anteriores

**Intuición:** Si demanda es elástica (EPD > 1):
- Una reducción de precio aumenta ingresos totales
- IMg es positivo

Si demanda es inelástica (EPD < 1):
- Una reducción de precio reduce ingresos totales
- IMg es negativo

Un monopolista racional nunca produce donde IMg < 0 (inelástica), porque podría aumentar ingresos reduciendo cantidad.

## 3. Maximización de Beneficios Monopólica

### Condición de Primer Orden

El beneficio es:
π = IT - CT = P(Q)·Q - CT(Q)

**Condición de maximización:**
dπ/dQ = IMg - CMg = 0

**Equilibrio Monopólico:**
IMg = CMg

La empresa produce la cantidad donde el ingreso marginal iguala el costo marginal.

### Precio Monopólico

Una vez determinada la cantidad óptima Q*, el precio se obtiene de la curva de demanda:
P* = P(Q*)

**Diferencia crítica con competencia perfecta:**
- Competencia perfecta: P = CMg
- Monopolio: P > CMg (y por lo tanto P > IMg)

El monopolista cobra un precio superior al costo marginal, generando una "pérdida irrecuperable de eficiencia."

### Beneficio Monopólico

El beneficio es:
π = (P* - CTM*) · Q*

El monopolista puede tener beneficios económicos positivos persistentemente (a diferencia de competencia perfecta) porque las barreras a la entrada previenen que otras empresas entren.

**Poder de Mercado:**
- Índice de Lerner = (P - CMg)/P = 1/|EPD|
- Mide el poder de fijación de precios del monopolista
- Igual a cero en competencia perfecta
- Cercano a uno en monopolios puros

## 4. Ineficiencia del Monopolio

### Pérdida Irrecuperable de Eficiencia (PIE)

El monopolio no logra la asignación eficiente de recursos. Comparado con competencia perfecta:

**En Competencia Perfecta (Eficiente):**
- P = CMg = Valoración Marginal del Consumidor
- Se produce Qc unidades
- No hay desperdicio

**En Monopolio (Ineficiente):**
- P > CMg
- Se produce Qm < Qc (menos de lo eficiente)
- Los consumidores que valoran el bien entre P y CMg no lo compran
- Hay pérdida de transacciones mutuamente beneficiosas

**Gráficamente:** La PIE es el área del triángulo entre:
- La curva de demanda
- La curva de CMg
- Entre Qm y Qc

Esta área representa el valor agregado total perdido por la suproducción monopólica.

### Pérdida de Excedente del Consumidor

Los consumidores pagan precio más alto (P*) que en competencia (Pc), y consumen menos cantidad (Q*m < Qc).

**Efectos:**
- Traslado de excedente del consumidor al productor (redistribución)
- Pérdida total de excedente (ineficiencia)

## 5. Discriminación de Precios

Cuando es posible, el monopolista puede capturar más excedente del consumidor mediante **discriminación de precios**: cobrar diferentes precios a diferentes grupos de consumidores.

### Discriminación de Primer Grado (Perfecta)

El monopolista cobra a cada consumidor su precio de reserva (máximo que está dispuesto a pagar).

**Resultado:**
- Captura todo el excedente del consumidor
- El monopolista produce hasta donde P = CMg (cantidad eficiente)
- Hay eficiencia productiva pero redistribución extrema
- Ejemplo: Médicos que cobran según capacidad de pago del paciente

### Discriminación de Segundo Grado

El monopolista ofrece menús de opciones (diferentes cantidades y precios) de forma que los consumidores se autoseleccionen.

**Ejemplo:** Diferentes paquetes de software (básico, profesional, empresarial) con precios crecientes.

### Discriminación de Tercer Grado

El monopolista divide mercados en grupos (por edad, zona geográfica, etc.) y cobra diferente precio a cada grupo.

**Ejemplo:**
- Descuentos para estudiantes
- Precios diferentes por región
- Precios diferenciados por género o edad

**Condición de Discriminación de Tercer Grado:**
IMg₁ = IMg₂ = CMg (igualar ingresos marginales entre mercados)

Pero P₁ ≠ P₂ (precios pueden diferir según elasticidades).

## 6. Regulación de Monopolios

Los gobiernos frecuentemente regulan monopolios naturales para mejorar eficiencia:

### Regulación por Precio Promedio de Costo (P = CTM)

El regulador fija P = CTM (ganancia normal).

**Ventaja:** Mejora eficiencia vs. monopolio no regulado
**Problema:** La empresa no tiene incentivos de innovación, puede carecer de presupuesto para mantenimiento

### Regulación por Costo Marginal (P = CMg)

El regulador fija P = CMg (eficiente).

**Ventaja:** Eficiencia productiva y asignativa
**Problema:** Si CTM > CMg (empresa tiene costos fijos grandes), la empresa tiene pérdidas y debe ser subsidiada

### Regulación por Tasa de Retorno

El regulador permite que la empresa obtenga cierta tasa de retorno sobre inversión (típicamente 10-15%).

**Ventaja:** Balance entre eficiencia e incentivos de inversión
**Problema:** Puede crear ineficiencias (empresas sobreinvierten en capital para permitir mayores retornos)

## Conclusión

El monopolio representa un caso donde poder de mercado se traduce en ineficiencia económica. A diferencia de competencia perfecta donde P = CMg logra asignación eficiente, el monopolio produce menos de lo socialmente óptimo, generando pérdida de bienestar. La discriminación de precios es una estrategia monopolista de capturar excedente del consumidor. Entender la microeconomía del monopolio es fundamental para política antitrust y regulación de empresas con poder de mercado significativo.',
  NULL
);

INSERT INTO contenido_clase (modulo_id, orden, tipo, titulo, contenido, imagen_url)
VALUES (
  1,
  7,
  'guia',
  'Competencia Monopolística y Oligopolio: Estructuras Intermedias',
  '# Competencia Monopolística y Oligopolio

## Introducción

Entre los extremos de competencia perfecta (muchos vendedores, producto homogéneo) y monopolio (un vendedor, producto único) existen estructuras intermedias. La mayoría de mercados reales cae en estas categorías. Este módulo explora cómo operan estos mercados intermedios donde hay poder de mercado pero con competencia.

## 1. Competencia Monopolística

### Características Fundamentales

**Muchos Vendedores:**
- Número suficientemente grande de empresas que ninguna tiene poder significativo sobre el precio
- Pero suficientemente pequeño que hay competencia genuina

**Productos Diferenciados:**
- Cada empresa produce un producto único o percibido como diferente
- Diferenciación por: calidad, marca, ubicación, servicios

**Libre Entrada y Salida:**
- No hay barreras significativas para nuevas empresas
- Las empresas pueden entrar con costos similares a existentes

**Información Imperfecta:**
- Los consumidores no conocen perfectamente todos los precios y alternativas
- Hay costos de búsqueda

**Competencia no-precio:**
- Además de competencia por precio, hay: publicidad, diseño de producto, servicios
- Es importante la marca y la reputación

### Ejemplos Reales de Competencia Monopolística

- Restaurantes en una ciudad (muchos, productos diferenciados)
- Estaciones de gasolina (ubicación diferencia producto)
- Tiendas de ropa (marcas, estilos diferenciados)
- Salones de belleza
- Farmacias

### Equilibrio de Corto Plazo

Cada empresa enfrenta una **curva de demanda con pendiente negativa** (a diferencia de competencia perfecta) pero todavía bastante elástica (porque hay muchos sustitutos cercanos).

**Maximización de Beneficios:**
IMg = CMg (igual que monopolista)

**Pero:**
- La curva de demanda es más elástica que en monopolio (muchos competidores)
- El poder de mercado es limitado

**Posible Resultado:**
- Beneficio económico positivo
- Beneficio económico negativo
- Beneficio normal (según cómo esté el mercado)

### Equilibrio de Largo Plazo

**Entrada/Salida de Empresas:**
Si hay beneficios positivos, nuevas empresas entran, lo que:
- Desplaza la curva de demanda de cada empresa hacia la izquierda (su mercado se reduce)
- Reduce el poder de mercado de cada empresa
- Continúa hasta que π = 0

**Equilibrio de Largo Plazo:**
- Beneficio económico = 0 (como competencia perfecta)
- Pero P > CMg (como monopolio)
- Hay **exceso de capacidad**: cada empresa produce menos que su escala mínima eficiente

**Punto de Tangencia:**
La curva de demanda de la empresa es tangente a su curva de CTM:
- P = CTM (ganancia cero)
- P > CMg (ineficiencia asignativa)

### Ineficiencia en Competencia Monopolística

**Ineficiencia Asignativa:**
P > CMg, por lo que se produce menos de lo socialmente óptimo.

**Ineficiencia Productiva:**
Las empresas operan con exceso de capacidad (a la izquierda del CTM mínimo), produciendo a costo promedio mayor que el mínimo posible.

**Gasto en Publicidad:**
Gran parte de costos van a marketing y diferenciación (no a reducir costo de producción), lo que otros ven como desperdicio.

### Diferencia con Monopolio

- **Monopolio:** Una empresa, alto poder de mercado, muchas barreras, beneficios persistentes
- **Competencia Monopolística:** Muchas empresas, poder limitado, libertad de entrada, beneficios cero en LP

## 2. Oligopolio

### Características Fundamentales

**Pocos Vendedores:**
- Número pequeño de empresas (típicamente 2-10)
- Cada una es lo suficientemente grande para influir en precios y cantidades
- **Interdependencia estratégica**: Las acciones de una empresa afectan a otras

**Productos Homogéneos o Diferenciados:**
- Pueden ser similares (gasolina, acero) o diferenciados (autos, cereales)

**Barreras a la Entrada:**
- Economías de escala
- Capital intensivo
- Patentes
- Control de distribución
- Licencias

**Competencia Estratégica:**
- Empresas anticipan y responden a acciones de competidores
- Decisiones sobre precios, cantidad, publicidad, I+D son estratégicas

### Ejemplos de Oligopolios

- **Automotriz:** BMW, Mercedes, Toyota, Hyundai dominan segmento premium
- **Telecomunicaciones:** Movistar, Claro, Entel en muchos países
- **Bebidas:** Coca-Cola, Pepsi
- **Acero:** ArcelorMittal, Nippon Steel, POSCO
- **Aviación:** American, United, Delta dominan EE.UU.

### Modelos de Oligopolio

Debido a la interdependencia estratégica, el equilibrio en oligopolio es **indeterminado** sin asumir comportamiento específico.

#### **Modelo de Cournot (1838)** - Competencia en Cantidades

**Supuesto:** Las empresas eligen cantidades simultáneamente, asumiendo que la otra mantiene la suya constante.

**Equilibrio de Cournot:**
- Cada empresa produce donde su ingreso marginal (dado la cantidad esperada del rival) iguala su costo marginal
- **Curva de reacción**: qi(qj) = cantidad óptima de empresa i dada cantidad esperada de empresa j
- El equilibrio es la intersección de curvas de reacción

**Duopolio de Cournot (dos empresas idénticas):**

Si demanda es P = 120 - Q y CMg = 0:
- Equilibrio: q₁ = q₂ = 40
- P = 40
- Cada empresa produce 40, total 80
- Comparación: Si fuera monopolio: q = 60, P = 60. Si fuera competencia: q = 120, P = 0

**Observación:** Cournot está entre monopolio y competencia perfecta.

#### **Modelo de Bertrand (1883)** - Competencia en Precios

**Supuesto:** Las empresas eligen precios simultáneamente.

**Resultado (Paradoja de Bertrand):**
Si el producto es homogéneo y hay dos o más empresas con costos marginales iguales, el equilibrio es:
- P = CMg (como competencia perfecta)
- Aunque solo haya dos empresas

**Intuición:** Si P > CMg, una empresa puede capturar todo el mercado bajando precio ligeramente. Esto continúa hasta P = CMg.

**En práctica:** Este resultado fuerte sugiere que:
- Diferenciación de producto rompe la paradoja de Bertrand
- Capacidad de producción limitada cambia resultados
- Acuerdos colusivos evitan la competencia de precios destructiva

#### **Modelo de Stackelberg (1934)** - Líder-Seguidor

**Supuesto:** Una empresa (líder) elige cantidad primero, anticipando que otra (seguidor) responderá óptimamente.

**Ventaja del Líder:**
- El líder obtiene mayores beneficios que en Cournot
- El seguidor obtiene menores beneficios que en Cournot
- Total de output está entre Cournot y monopolio

**Intuición:** El líder se compromete a producción mayor, lo que lleva al seguidor a producir menos (para no bajar precio). El líder gana por anticipación.

### Colusión y Carteles

Empresas oligopólicas tienen incentivo a **coludirse** (actuar como monopolio conjunto) para maximizar beneficios agregados.

**Acuerdo Colusivo Típico:**
- Fijar cantidad total como monopolio
- Dividir mercados por región, cliente, etc.
- Mantener precios altos
- Repartir beneficios

**Problemas con Colusión:**
- **Inestabilidad:** Cada empresa tiene incentivo a desviarse (vender más a precio alto) si otras mantienen precio
- **Dilema del Prisionero:** Equilibrio de Nash tiene desviaciones mutuas de acuerdo
- **Detección:** Es difícil monitorear acuerdos silenciosos

**Política Antitrust:**
- Prohibe carteles explícitos
- Investiga conducta colusiva
- Muchos carteles históricos desmantelados (OPEC tiene limitado éxito)

### Diferenciación de Producto y Competencia Oligopólica

Cuando hay diferenciación:
- Las empresas no pueden capturar 100% del mercado bajando precio
- Hay lealtad de marca
- La competencia es más suave que en Bertrand
- Resultados pueden estar cerca de competencia monopolística

## 3. Teoría de Juegos y Equilibrio de Nash

El análisis de oligopolio usa **equilibrio de Nash** de teoría de juegos.

### Equilibrio de Nash

Situación donde ningún jugador puede mejorar su payoff cambiando unilateralmente su estrategia, dado que otros mantienen sus estrategias.

**Matemáticamente:**
En equilibrio Nash (q₁*, q₂*):
- q₁* maximiza π₁ dado q₂*
- q₂* maximiza π₂ dado q₁*

**Característica Importante:**
El equilibrio de Nash no es necesariamente eficiente (Pareto optimal). Ejemplo: Dilema del Prisionero.

### Aplicación: Batalla de Marcas

Dos empresas deben decidir si invertir en publicidad (Alto o Bajo):

```
Empresa 2
          Bajo        Alto
Empresa 1
    Bajo    5,5        3,6
    Alto    6,3        4,4
```

Números son beneficios.

**Equilibrio de Nash:** Ambas en Alto (4,4) aunque mutuamente preferirían ambas en Bajo (5,5).
- Si empresa 1 está en Bajo, empresa 2 prefiere Alto (6 > 5)
- Si empresa 2 está en Bajo, empresa 1 prefiere Alto (6 > 5)
- Resultado: Competencia destructiva de publicidad

## 4. Comparación de Estructuras de Mercado

| Aspecto | Competencia Perfecta | Monopolística | Oligopolio | Monopolio |
|---------|-------------------|--------------|-----------|-----------|
| Número de empresas | Muy muchas | Muchas | Pocas | Una |
| Diferenciación | No | Sí | Posible | N/A |
| Barreras entrada | Ninguna | Ninguna | Sí | Sí |
| P vs CMg LP | P = CMg | P > CMg | P > CMg | P > CMg |
| Beneficio LP | π = 0 | π = 0 | π > 0 | π > 0 |
| Eficiencia | Sí | No (exceso capacidad) | No (suproducción) | No |

## Conclusión

La competencia monopolística y oligopolio representan la mayoría de mercados reales. La competencia monopolística tiende a resultados similares a competencia perfecta en largo plazo (beneficio cero) pero con ineficiencia de exceso capacidad. El oligopolio es más complejo due a interdependencia estratégica, pero teoría de juegos (Cournot, Bertrand, Stackelberg, Nash) proporciona frameworks para análisis. La colusión es amenaza a competencia en oligopolios, motivando regulación antitrust.',
  NULL
);

INSERT INTO contenido_clase (modulo_id, orden, tipo, titulo, contenido, imagen_url)
VALUES (
  1,
  8,
  'guia',
  'Fallas de Mercado y Externalidades: Ineficiencias y Soluciones',
  '# Fallas de Mercado y Externalidades

## Introducción

Aunque competencia perfecta logra eficiencia, en la realidad los mercados tienen "fallas" que evitan resultados óptimos. Las externalidades, bienes públicos, información asimétrica y poder de mercado son fallas que causan ineficiencia. Este módulo examina las fuentes de ineficiencia y soluciones de política.

## 1. Tipos de Fallas de Mercado

### Poder de Mercado (Monopolio, Oligopolio)

Ya cubierto en módulos anteriores. El resultado es P > CMg y suproducción.

**Soluciones:**
- Leyes antitrust
- Regulación de precios
- Competencia potencial (amenaza de entrada)

### Externalidades

Una externalidad ocurre cuando las acciones de un agente afectan a terceras partes de forma no compensada por el mercado.

### Bienes Públicos

Bienes donde no es posible excluir a quien no paga y/o hay no rivalidad en consumo.

### Información Asimétrica

Cuando una parte en transacción tiene más/mejor información que la otra.

### Mercados Incompletos

Cuando ciertos mercados no existen (no se puede asegurar ciertos riesgos).

## 2. Externalidades

### Definición y Clasificación

Una **externalidad positiva (beneficio externo)** beneficia a terceros:
- Educación: Beneficia a sociedad además del estudiante
- Investigación: Genera conocimiento aprovechable por otros
- Jardinería: Embellecer el barrio beneficia a vecinos

Una **externalidad negativa (costo externo)** daña a terceros:
- Contaminación: Perjudica a quienes respiran aire contaminado
- Ruido: Perjudica a vecinos
- Congestión: Perjudica a otros conductores

### El Problema de Ineficiencia

**En Competencia Perfecta sin Externalidades:**
P = CMgPrivado = CMgSocial (eficiente)

**Con Externalidades Negativas:**
- CMgPrivado < CMgSocial (productor ignora costo externo)
- Empresa produce donde P = CMgPrivado
- Pero esto es mayor que cantidad socialmente óptima donde P = CMgSocial
- Hay **sobreproducción** (produce demasiado)
- **Pérdida de bienestar:** Costo externo no compensado

**Con Externalidades Positivas:**
- CMgPrivado > CMgBeneficio Privado Marginal (consumidor ignora beneficio externo)
- Cantidad privada es menor que socialmente óptima
- Hay **subproducción** (produce poco)
- Oportunidades de mejora Pareto no aprovechadas

### Ejemplo: Contaminación Industrial

Suponga que industria produce acero:
- Demanda: P = 100 - Q
- CMgPrivado = 10 (costos de la empresa)
- CMgSocial = CMgPrivado + Costo Externo = 10 + 0.5Q

**Sin Regulación (Equilibrio de Mercado):**
- P = CMgPrivado: 100 - Q = 10 → Q = 90, P = 10
- Pérdida de bienestar = Área entre CMgSocial y Demanda de Q=0 a Q=90

**Óptimo Social:**
- P = CMgSocial: 100 - Q = 10 + 0.5Q → Q = 60, P = 40
- Mayor precio, menor cantidad

**Diferencia:** La industria produce 90 cuando la sociedad preferirería 60.

### Soluciones de Política para Externalidades

#### **1. Impuestos Pigouvianos**

El gobierno cobra impuesto igual al costo externo marginal.

**Efecto:**
- Empresa enfrenta CMgPrivado + Impuesto = CMgSocial
- Produce cantidad socialmente óptima
- Recauda ingresos para compensar afectados o financiar bienes públicos

**Ventaja:** Incentiva que empresa considere costo externo en decisiones
**Desventaja:** Requiere conocer exactamente magnitud de externalidad

#### **2. Regulación Directa (Cuotas)**

El gobierno fija cantidad máxima permitida o estándar de emisión.

**Ejemplo:** Límite máximo de emisiones de CO₂ por empresa.

**Ventaja:** Asegura límite máximo
**Desventaja:** No incentiva reducción adicional más allá del límite

#### **3. Derechos de Propiedad (Teorema de Coase, 1960)**

Si se asignan derechos de propiedad claramente (derecho a contaminar o derecho a aire limpio), las partes pueden negociar eficientemente.

**Ejemplo:**
- Si empresa tiene derecho a contaminar: Sociedad paga a empresa por reducir contaminación
- Si sociedad tiene derecho a aire limpio: Empresa paga a sociedad por derecho a contaminar

**Resultado:** Cantidad óptima se alcanza mediante negociación, sin necesidad de gobierno

**Teorema de Coase:** Con costos de transacción cero y derechos de propiedad claros, la asignación es eficiente **independientemente** de a quién se asigne el derecho (solo la distribución de renta cambia).

**Limitación:** Costos de transacción reales, especialmente con muchas partes afectadas.

#### **4. Mercados de Permisos Negociables**

Gobierno asigna permisos negociables de emisión (total que permite = cantidad óptima).

**Funcionamiento:**
- Empresa que reduce emisión más barato vende permisos
- Empresa que reduce caro compra permisos
- Precio de permiso se ajusta para igualar oferta y demanda
- Resultado eficiente (minimiza costo total de reducir)

**Ventaja:** Logra objetivo ambiental a costo mínimo
**Ejemplo:** EU Emissions Trading System (ETS)

#### **5. Subvenciones para Externalidades Positivas**

Subsidiar bienes con externalidades positivas para alentar mayor consumo/producción.

**Ejemplos:**
- Subsidios a educación
- Créditos fiscales para I+D
- Subsidios a energías renovables

**Efecto:** Reduce precio efectivo, aumenta cantidad hacia nivel óptimo.

## 3. Bienes Públicos

### Características Definitorias

**No Exclusión:**
- Imposible o muy caro excluir a quien no paga
- Una vez provisto, todos pueden disfrutar

**No Rivalidad:**
- El consumo por una persona no reduce disponibilidad para otros
- El costo marginal de servir a otro consumidor es cero

**Ejemplos:**
- Defensa nacional: Si defiende el país, todos están defendidos
- Carreteras públicas: Múltiples usuarios sin conflicto
- Faro de navegación: Muchas naves pueden usar sin competencia
- Investigación básica: Conocimiento aprovechable por muchos

### El Problema: Provisión Insuficiente

Si bien los bienes públicos benefician a muchos, el mercado provee insuficientemente porque:

**Free-rider (Polizón):**
- Nadie quiere pagar por bien público mientras otros lo disfrutan
- Cada uno espera que otros lo paguen
- Resultado: Nadie lo paga, aunque todos lo valoren

**Solución de Mercado Privado Falla:**
- Empresa no puede excluir a no-pagadores
- Empresas privadas no pueden cobrar precio igual a beneficio marginal social
- Bajo provisión de mercado respecto a óptimo social

### Soluciones

**Provisión Pública:**
- Gobierno provee bien público
- Financia con impuestos (obliga a contribuir a todos)
- Ejemplo: Defensa, policía, justicia

**Impuestos Correctivos + Provisión Privada:**
- Subsidios para reducir precio a nivel socialmente óptimo
- Ejemplo: Subsidios a investigación académica

**Mecanismos de Revelación de Preferencias:**
- Votación
- Mercados privados para preferencias reveladas (si es posible excluir)

## 4. Información Asimétrica

Cuando una parte tiene más información que la otra, pueden surgir problemas:

### Selección Adversa

Cuando compradores no pueden distinguir calidad, los vendedores de calidad baja tienen incentivo a venderse como calidad alta.

**Ejemplo: Mercado de Autos Usados:**
- Comprador no sabe si auto es "limón" (defectuoso) o "melocotón" (bueno)
- Vendedores de lim
ones quieren parecer melocotones
- Compradores, anticipando selección adversa, bajan precio
- Vendedores de melocotones verdaderos salen del mercado (precio muy bajo)
- El mercado se "desmorona": Solo limones se venden

**Soluciones:**
- Garantías
- Inspección independiente
- Reputación (eBay, Amazon)
- Señalización (educación, certificados)

### Riesgo Moral

Cuando asegurado cha se comporta riesgosamente porque está asegurado.

**Ejemplo: Seguro de Auto:**
- Con seguro completo, conductor maneja menos cuidadosamente
- Compañía aseguradora enfrenta costo mayor que esperado
- Ajusta prima hacia arriba
- Conductores cuidadosos salen del mercado

**Soluciones:**
- Coaseguros (paciente paga parte)
- Deducibles
- Monitoreo
- Reputación

## 5. Implicaciones para Política Económica

Las fallas de mercado justifican intervención gubernamental:

**Cuando el Mercado Falla, el Gobierno Puede Mejorar:**
- Monopolios: Regulación antitrust
- Externalidades: Impuestos, regulación, mercados de permisos
- Bienes públicos: Provisión pública
- Información asimétrica: Regulación de información, garantías

**Pero el Gobierno Tiene Limitaciones:**
- Información incompleta (problema conocimiento de Hayek)
- Captura regulatoria (reguladores controlados por industria)
- Ineficiencia burocrática
- Problemas políticos (votación ciclante, rent-seeking)

**Enfoque Pragmático:**
Comparar falla de mercado con falla de gobierno. A veces mejor tolerar ineficiencia de mercado que crear burocracia ineficiente.

## Conclusión

Las externalidades, bienes públicos e información asimétrica son fuentes importantes de ineficiencia de mercado. Entender estas fallas es crucial para diseñar políticas públicas efectivas. El análisis costo-beneficio de diferentes soluciones (impuestos, regulación, mercados de permisos, provisión pública) debe considerar tanto eficiencia como viabilidad política e implementación práctica.',
  NULL
);

-- MACROECONOMÍA (modulo_id = 2) STARTS HERE

INSERT INTO contenido_clase (modulo_id, orden, tipo, titulo, contenido, imagen_url)
VALUES (
  2,
  1,
  'guia',
  'PIB y Cuentas Nacionales: Medición de la Actividad Económica',
  '# PIB y Cuentas Nacionales: Fundamentos

## Introducción

Las cuentas nacionales son el sistema estadístico que mide el desempeño económico agregado de un país. El Producto Interno Bruto (PIB) es el indicador más importante, pero es solo una parte de un sistema completo de medición. Entender cómo se calcula el PIB, sus limitaciones y sus relaciones con otros indicadores es fundamental para análisis macroeconómico.

## 1. El Producto Interno Bruto (PIB)

### Definición

El **Producto Interno Bruto** es el valor de mercado de todos los bienes y servicios finales producidos dentro de las fronteras geográficas de un país durante un período específico (usualmente un año).

**Componentes de la Definición:**

**Valor de Mercado:**
- Usa precios de mercado para valorar bienes y servicios
- Permite agregar bienes heterogéneos (manzanas + autos) en una medida común

**Bienes y Servicios Finales:**
- Solo se cuentan bienes finales, no intermedios (evita doble conteo)
- Ejemplo: Se cuenta un auto terminado, no las ruedas vendidas a fabricante
- Servicios incluyen educación, salud, entretenimiento, transporte, etc.

**Producidos Dentro de las Fronteras:**
- **PIB** = producción dentro del territorio (independiente de nacionalidad)
- **PNB (Producto Nacional Bruto)** = producción por nacionales (dondequiera que estén)
- Diferencia: Entradas y salidas netas de ingresos de factores

**Durante un Período Específico:**
- Eliminina flujos de stock para evitar reconteos
- PIB es flujo anual, no acumulación de riqueza

### Enfoques de Cálculo del PIB

Los tres métodos son equivalentes teóricamente pero pueden diferir por errores estadísticos.

#### **Enfoque de Gasto (Demanda Agregada)**

El PIB es suma del gasto en bienes y servicios finales:

**PIB = C + I + G + (X - M)**

Donde:
- **C = Consumo**: Gasto de hogares en bienes y servicios (excepto vivienda nueva)
- **I = Inversión**: Gasto en bienes de capital, inventarios, y vivienda nueva
- **G = Gasto Público**: Gasto en bienes, servicios y transferencias del gobierno
- **X = Exportaciones**: Valor de bienes y servicios vendidos al extranjero
- **M = Importaciones**: Valor de bienes y servicios comprados del extranjero
- **X - M = Saldo de Comercio Internacional**: Posición neta comercial

**Características Importantes:**
- Mide demanda agregada o gasto total planeado
- Más directo para análisis de ciclo económico
- Usado para calcular PIB por el lado de la demanda

#### **Enfoque de Ingreso**

El PIB es suma de todos los ingresos generados en la producción:

**PIB = Salarios + Rentas + Intereses + Ganancias**

O más detalladamente:
- **Remuneración a Empleados**: Salarios, sueldos, beneficios
- **Ingresos Empresariales**: Ganancias de empresas no incorporadas
- **Rentas**: Ingresos por alquiler de propiedades
- **Intereses Netos**: Ingresos por préstamos menos intereses pagados
- **Ganancias Corporativas**: Beneficios de empresas incorporadas
- **Más Depreciación**: Para obtener PIB (vs. PNI)
- **Más Impuestos Indirectos Netos de Subsidios**

**Características:**
- Mide ingresos generados en la producción
- Responde pregunta: ¿A quién se distribuyó el valor creado?
- Útil para analizar distribución de ingresos

#### **Enfoque de Producción (Valor Agregado)**

El PIB es suma del valor agregado en todas las etapas de producción:

**PIB = Suma de Valores Agregados en todas las industrias**

Donde:
- **Valor Agregado** = Valor de Producción - Bienes Intermedios Usados

**Ventaja:** Evita doble conteo explícitamente sumando solo valor agregado en cada etapa.

**Ejemplo:**
- Panadería vende pan en $5 (valor agregado = $5 si compra harina en $2, entonces VA = $3)
- Todos los valores agregados se suman para PIB total

## 2. PIB Nominal vs PIB Real

### PIB Nominal

El **PIB nominal** valoriza producción a **precios corrientes** del año en cuestión.

**Fórmula:**
PIB_Nominal = Σ(Precio_Corriente × Cantidad)

**Problema:**
- Aumenta si cantidad aumenta O si precios aumentan
- No diferencia entre crecimiento real y inflación
- No es comparable entre años para medir crecimiento real

**Ejemplo:**
- Año 1: Producción 100 unidades a $10 = PIB Nominal $1,000
- Año 2: Producción 100 unidades a $12 = PIB Nominal $1,200
- Parece crecimiento de 20%, pero cantidad es igual (crecimiento real = 0%)

### PIB Real

El **PIB real** valoriza **toda** la producción a **precios de un año base**, eliminando efecto de inflación.

**Fórmula:**
PIB_Real = Σ(Precio_Año_Base × Cantidad_Año_Corriente)

**Ventajas:**
- Permite comparar magnitudes reales entre años
- Mide crecimiento económico verdadero (cantidad, no precios)
- Estándar para análisis de ciclos económicos

**Ejemplo (continuación):**
- Año 1 (base): 100 unidades a $10 = PIB Real $1,000
- Año 2 (a precios año 1): 100 unidades a $10 = PIB Real $1,000
- Crecimiento real = 0% (correcto)

### Deflactor del PIB

El **deflactor del PIB** es índice de precios que convierte PIB nominal a real:

**Fórmula:**
Deflactor del PIB = (PIB_Nominal / PIB_Real) × 100

**Interpretación:**
- Deflactor = 100: Precios iguales a año base
- Deflactor > 100: Precios han subido (inflación)
- Deflactor < 100: Precios han bajado (deflación, raro)

**Relación con Inflación:**
Tasa de Inflación = [(Deflactor_Año2 - Deflactor_Año1) / Deflactor_Año1] × 100%

## 3. Componentes del PIB: Análisis Detallado

### Consumo (C)

El **consumo** es el gasto de hogares en bienes y servicios de consumo.

**Características:**
- Típicamente 60-70% del PIB en economías desarrolladas
- Incluye bienes duraderos (autos) y no duraderos (alimentos)
- Excluye vivienda nueva (contada como inversión)
- Relación directa con ingreso disponible

**Función de Consumo Keynesiana:**
C = C₀ + c·Yd

Donde:
- C₀ = Consumo autónomo (cuando Yd = 0)
- c = Propensión Marginal a Consumir (0 < c < 1)
- Yd = Ingreso disponible

### Inversión (I)

La **inversión** es gasto en bienes de capital y cambios en inventarios.

**Componentes:**
- **Inversión Fija**: Fábricas, máquinas, edificios, infraestructura
- **Inversión Residencial**: Construcción de viviendas nuevas
- **Cambios de Inventario**: Producción no vendida (acumulación de stocks)

**Características:**
- Más volátil que consumo (10-20% del PIB)
- Muy sensible a tasas de interés y expectativas de ganancias futuras
- Crucial para crecimiento a largo plazo (acumula capital)

**Función de Inversión:**
I = I₀ - i·r

Donde:
- I₀ = Inversión autónoma
- i = Sensibilidad a tasa de interés
- r = Tasa de interés real

### Gasto Público (G)

El **gasto público** es gasto del gobierno en bienes, servicios e inversión.

**Nota Importante:** Las transferencias (pensiones, subsidios) NO se incluyen en G (aunque aparecen en cuentas fiscales) porque el gasto real ocurre cuando el receptor gasta.

**Características:**
- 15-25% del PIB típicamente
- Incluye defensa, educación, salud, infraestructura
- Herramienta de política fiscal (puede aumentar o disminuir demanda agregada)

### Comercio Neto (X - M)

El **saldo de comercio neto** es diferencia entre exportaciones e importaciones.

**Exportaciones (X):**
- Bienes y servicios producidos localmente y vendidos al extranjero
- Inyección de demanda agregada

**Importaciones (M):**
- Bienes y servicios producidos extranjero y comprados localmente
- Filtración de demanda agregada

**Saldo Comercial (X - M):**
- Positivo (superávit): Exporta más de lo que importa
- Negativo (déficit): Importa más de lo que exporta
- Relacionado con cuenta corriente de balanza de pagos

## 4. Del PIB a Otras Medidas de Ingreso

### Producto Nacional Bruto (PNB)

**PNB = PIB + Ingresos Netos del Extranjero**

Donde:
- Ingresos Netos del Extranjero = Ingresos de factores recibidos del extranjero - Ingresos de factores pagados al extranjero

**Ejemplo:**
- Chilenos trabajando en EE.UU. envían dinero (ingreso extranjero)
- Empresas extranjeras en Chile envían ganancias (pago extranjero)
- Diferencia neta se suma al PIB para obtener PNB

### Ingreso Nacional Neto (INN)

**INN = PNB - Depreciación de Capital**

**Depreciación:**
- Desgaste de capital físico
- Reducción de capital disponible para producción futura
- Restando da medida más pura de ingreso sostenible

### Ingreso Personal (IP)

**IP = INN - Beneficios Corporativos Retenidos - Contribuciones a Seguro Social + Transferencias Públicas**

Medida de ingreso disponible para personas (antes de impuestos).

### Ingreso Disponible (Yd)

**Yd = IP - Impuestos Personales Directos**

Ingreso que queda para consumo o ahorro.

## 5. Limitaciones del PIB

### PIB no Mide Bienestar

El PIB es medida de **producción económica**, no de **bienestar**.

**Problemas:**
- **Aumenta con actividad dañina**: Contaminación aumenta gastos médicos (PIB sube)
- **No cuenta bienes no mercadeados**: Crianza de hijos, voluntariado, ocio
- **Ignora distribución**: PIB en $1 millón con riqueza concentrada vs. distribuida son iguales
- **Calidad de vida**: Educación, salud, esperanza de vida no capturados

### El PIB Puede Crecer mientras Bienestar Cae

**Ejemplo:** Desastre natural que destruye capital pero genera gasto en reconstrucción (PIB aumenta).

### Limitaciones Estadísticas

- **Economía informal**: Dinero en efectivo sin registrar
- **Economía clandestina**: Drogas, prostitución (no se mide)
- **Valuación problemática**: Algunos servicios públicos difíciles de valorar

### Alternativas Propuestas

- **Índice de Desarrollo Humano (IDH)**: Incluye educación, salud, ingresos
- **Medidas de Bienestar Multidimensionales**: Incluyendo sostenibilidad ambiental
- **Producto Interno Neto Ecológico**: Ajusta por degradación ambiental

## 6. Aplicaciones de Contabilidad Nacional

Las cuentas nacionales se usan para:

**Análisis de Ciclo Económico:**
- Identificar recesiones (caída de PIB real por 2+ trimestres)
- Proyectar tasas de crecimiento futuro

**Comparaciones Internacionales:**
- PIB per cápita como medida aproximada de desarrollo
- Paridad de poder adquisitivo (PPA) para comparaciones válidas

**Política Económica:**
- Decidir si se necesita estímulo fiscal o restricción
- Evaluar efectividad de políticas anteriores

## Conclusión

Las cuentas nacionales y el PIB proporcionan marco para medir y analizar desempeño económico agregado. Aunque el PIB tiene limitaciones importantes como medida de bienestar, sigue siendo herramienta fundamental para macroeconomía. Entender cómo se construye, sus componentes y sus limitaciones es esencial para análisis económico profesional.',
  NULL
);

INSERT INTO contenido_clase (modulo_id, orden, tipo, titulo, contenido, imagen_url)
VALUES (
  2,
  2,
  'guia',
  'Modelo IS-LM: Equilibrio en Mercados de Bienes y Dinero',
  '# Modelo IS-LM: Síntesis Neoclásica Keynesiana

## Introducción

El modelo IS-LM, desarrollado por John Hicks (1937) para interpretar la obra de Keynes, integra el equilibrio en el mercado de bienes (curva IS) con el equilibrio en el mercado de dinero (curva LM). Este modelo, aunque simplificado, proporciona insights valiosos sobre cómo política fiscal y monetaria afectan el nivel de producción y tasa de interés en corto plazo.

## 1. La Curva IS (Inversión-Ahorro)

### Origen y Significado

La curva **IS** representa todas las combinaciones de tasa de interés (r) y nivel de producción/ingreso (Y) que equilibran el mercado de bienes.

**En equilibrio de mercado de bienes:**
Ahorro = Inversión
S = I

O equivalentemente (por identidad contable):
Producción = Demanda Agregada
Y = C + I + G

(Asumiendo economía cerrada para simplificar, sin comercio internacional)

### Derivación de la Curva IS

**Paso 1: Función de Consumo**
C = C₀ + c·(Y - T)

Donde:
- C₀ = Consumo autónomo
- c = Propensión marginal a consumir (0 < c < 1)
- Y - T = Ingreso disponible (Y menos impuestos)

**Paso 2: Función de Inversión**
I = I₀ - b·r

Donde:
- I₀ = Inversión autónoma
- b = Sensibilidad de inversión a tasa de interés
- r = Tasa de interés real

**Paso 3: Equilibrio de Mercado de Bienes**
Y = C₀ + c·(Y - T) + I₀ - b·r + G

Resolviendo para Y:
Y[1 - c] = C₀ + I₀ + G - c·T - b·r
Y = [1/(1-c)]·[C₀ + I₀ + G - c·T - b·r]

**Multiplicador Keynesiano:**
k = 1/(1-c)

**Forma de la Curva IS:**
Y = Ā - b/(1-c)·r

Donde Ā es la demanda autónoma.

### Propiedades de la Curva IS

**Pendiente Negativa:**
- Aumentar r reduce inversión
- Menor inversión → menor demanda agregada → menor Y de equilibrio
- Relación inversa entre r e Y

**Desplazamientos de IS:**

**Política Fiscal Expansiva (aumentar G o disminuir T):**
- Desplaza IS hacia la derecha
- Mayor Y para cada r
- Explicación: Mayor gasto fiscal aumenta demanda agregada

**Política Fiscal Restrictiva (disminuir G o aumentar T):**
- Desplaza IS hacia la izquierda
- Menor Y para cada r

**Mayor Propensión a Consumir (c):**
- Multiplicador 1/(1-c) aumenta
- IS se hace más horizontal (más sensible a r)
- Explicación: Mayor c significa más gasto autónomo genera más demanda

**Mayor Sensibilidad de Inversión a r (mayor b):**
- IS se hace más vertical (menos sensible a r)
- Cambios en r tienen mayor impacto en Y

## 2. La Curva LM (Liquidez-Dinero)

### Origen y Significado

La curva **LM** representa todas las combinaciones de r e Y que equilibran el mercado de dinero.

**En equilibrio de mercado monetario:**
Oferta de Dinero = Demanda de Dinero
M = L(r,Y)

### Demanda de Dinero

La teoría Keynesiana identifica tres motivos para demandar dinero:

**Motivo Transaccional (Lt):**
- Dinero para transacciones cotidianas
- Proporcional al nivel de ingresos
- Lt = d·Y donde d > 0

**Motivo Precaución (Lp):**
- Dinero para contingencias imprevistas
- También proporcional al ingreso
- Lp = e·Y donde e > 0

**Motivo Especulación (Le):**
- Dinero para aprovechar oportunidades de inversión
- Inverso a tasa de interés
- Le = f - g·r donde g > 0
- Si r sube: Costo de oportunidad de mantener dinero sube, disminuye dinero especulativo

**Demanda Total de Dinero:**
L(r,Y) = d·Y + e·Y + (f - g·r) = (d+e)·Y + f - g·r
L(r,Y) = h·Y - j·r

Donde h = d+e y j = g.

### Derivación de la Curva LM

**Equilibrio del Mercado Monetario:**
M/P = h·Y - j·r

Resolviendo para r:
j·r = h·Y - M/P
r = (h/j)·Y - (M/P)/j

**Forma de la Curva LM:**
r = (h/j)·Y - (1/j)·(M/P)

### Propiedades de la Curva LM

**Pendiente Positiva:**
- Aumentar Y eleva demanda de dinero
- Tasa de interés debe subir para equilibrar oferta dada
- Relación directa entre r e Y

**Desplazamientos de LM:**

**Expansión Monetaria (aumentar M):**
- Desplaza LM hacia la derecha (o abajo)
- Mayor Y para cada r (o menor r para cada Y)
- Explicación: Mayor oferta de dinero baja tasa de interés, estimula inversión

**Contracción Monetaria (disminuir M):**
- Desplaza LM hacia la izquierda (o arriba)
- Menor Y para cada r

**Mayor Sensibilidad de Demanda de Dinero a Y (h):**
- LM más horizontal
- Cambios en Y generan grandes cambios en r

**Mayor Sensibilidad a r (mayor j):**
- LM más vertical
- Cambios en M tienen mayor impacto en Y

## 3. Equilibrio IS-LM

### El Equilibrio

El equilibrio IS-LM ocurre en la intersección de ambas curvas:
- Mercado de bienes en equilibrio (IS)
- Mercado de dinero en equilibrio (LM)

En el equilibrio:
- r* = tasa de interés de equilibrio
- Y* = nivel de producción de equilibrio

Ambas son simultáneamente determinadas en el modelo.

### Fuera de Equilibrio

**Si Y > Y* de equilibrio (exceso de demanda de bienes):**
- Existe presión para Y caiga de vuelta a equilibrio
- Si mercado de dinero también fuera de equilibrio, puede tomar tiempo

**Si r > r* de equilibrio (exceso de oferta de dinero):**
- Las personas tienen más dinero de lo que desean
- Tratan de gastarlo, lo que aumenta Y
- Proceso de ajuste continúa hasta intersección IS-LM

## 4. Efectos de Política Fiscal

### Política Fiscal Expansiva

**Instrumentos:**
- Aumentar gasto público (G)
- Disminuir impuestos (T)
- Ambos desplazan IS hacia la derecha

**Efectos Inmediatos:**
1. IS se desplaza derecha
2. Y aumenta, r aumenta (movimiento a lo largo de LM)
3. Nuevo equilibrio: Y' > Y*, r' > r*

**Resultados:**
- Mayor producción (objetivo keynesiano)
- Mayor tasa de interés

**Efecto Crowding-Out:**
El aumento en r reduce inversión privada, parcialmente compensando el estímulo fiscal.

- Si inversión muy sensible a r: Crowding-out es severo
- Si inversión insensible a r: Crowding-out es limitado

### Política Fiscal Restrictiva

**Instrumentos:**
- Disminuir gasto público
- Aumentar impuestos
- IS desplaza hacia la izquierda

**Efectos:**
- Y disminuye, r disminuye
- Efectos opuestos a expansiva

## 5. Efectos de Política Monetaria

### Política Monetaria Expansiva

**Instrumentos:**
- Aumentar oferta de dinero (M)
- Banco Central compra valores o reduce tasas de encaje

**Efectos Inmediatos:**
1. LM se desplaza derecha
2. Y aumenta, r disminuye (movimiento a lo largo de IS)
3. Nuevo equilibrio: Y' > Y*, r' < r*

**Resultados:**
- Mayor producción
- Menor tasa de interés (abarata crédito)

### Política Monetaria Restrictiva

**Instrumentos:**
- Disminuir oferta de dinero
- Banco Central vende valores o aumenta tasas de encaje

**Efectos:**
- Y disminuye, r aumenta
- Efectos opuestos a expansiva

## 6. Casos Especiales: Trampa de Liquidez y Mercado Clásico

### Trampa de Liquidez (Keynes, 1936)

Cuando tasa de interés alcanza nivel mínimo (cercano a cero), la demanda de dinero se vuelve perfectamente elástica.

**Características:**
- LM se vuelve horizontal a tasa mínima
- Política monetaria se vuelve inefectiva (aumentar M solo aumenta dinero inactivo)
- Política fiscal se vuelve muy efectiva (no hay crowding-out por r constante)

**Situación Histórica:**
- Japón 1990s-2000s: Tasas de interés cercanas a cero
- EE.UU. 2008-2015: Post-crisis financiera con tasas mínimas

**Implicación:**
En trampa de liquidez, solo política fiscal funciona para estimular Y.

### Caso Clásico (Dinero No Afecta Variables Reales)

Si demanda de dinero insensible a r:

- LM es vertical
- Política monetaria solo afecta r, no Y (dinero es neutral)
- Política fiscal afecta solo r (no Y), totalmente desplazado por crowding-out

## 7. Limitaciones del Modelo IS-LM

### Supuestos Simplificadores

- **Nivel de precios fijo**: En realidad, aumentar Y puede aumentar precios (inflación)
- **Expectativas no modeladas**: Pero cruciales para decisiones de consumo e inversión
- **Economía cerrada**: Sin comercio ni movimientos de capital
- **Mercados de trabajo no modelados**: Desempleo determinado exógenamente
- **Un solo bien**: Realidad tiene múltiples bienes con efectos sustitución/ingreso

### Extensiones Importantes

- **Modelo IS-LM-BP**: Añade balanza de pagos (apertura económica)
- **Modelo de Oferta Agregada-Demanda Agregada (OA-DA)**: Endogeniza nivel de precios
- **Modelos de Expectativas Racionales**: Nueva macroeconomía clásica y keynesiana

## Conclusión

El modelo IS-LM proporciona herramienta pedagógica valiosa para entender cómo política fiscal y monetaria afectan el equilibrio macroeconómico en corto plazo. Aunque tiene limitaciones, captura dinámicas fundamentales de demanda agregada y mercado monetario. Entender IS-LM es requisito para entender debates modernos sobre efectividad de políticas de estabilización.',
  NULL
);

INSERT INTO contenido_clase (modulo_id, orden, tipo, titulo, contenido, imagen_url)
VALUES (
  2,
  3,
  'guia',
  'Oferta y Demanda Agregada: Equilibrio Macroeconómico',
  '# Oferta y Demanda Agregada (OA-DA): Equilibrio de Corto y Largo Plazo

## Introducción

El modelo de Oferta Agregada y Demanda Agregada (OA-DA) es herramienta fundamental de macroeconomía moderna. A diferencia de IS-LM que mantiene precios fijos, el modelo OA-DA endogeniza el nivel general de precios (inflación) y proporciona framework para entender ciclos económicos, inflación y desempleo.

## 1. Demanda Agregada (DA)

### Definición

La **Demanda Agregada** es la cantidad total de bienes y servicios que los agentes económicos (consumidores, empresas, gobierno, extranjero) desean comprar a cada nivel de precios.

**Relación Inversa con Precios:**
- Cuando P↑: Cantidad demandada ↓
- Cuando P↓: Cantidad demandada ↑

### Derivación de DA desde IS-LM

En el modelo IS-LM en términos reales:
- M/P = dinero real
- Si P sube: M/P disminuye (para M fijo)
- LM se desplaza izquierda
- Y disminuye (para cada r)

**Mecanismos de Pendiente Negativa:**

**Efecto Riqueza:**
- ↑P → Dinero real (M/P) ↓ → Consumidores se sienten más pobres → C↓ → DA↓

**Efecto de Tasa de Interés:**
- ↑P → M/P↓ → Demanda de dinero sube tasa r → I↓ → DA↓

**Efecto de Exportaciones Netas:**
- ↑P doméstico → Bienes locales más caros → X↓, M↑ → (X-M)↓ → DA↓

### Forma de la Curva DA

Típicamente escrita como:
Y = Ȳ - α(P - P*)

Donde:
- Ȳ = Ingreso autónomo
- α = Sensibilidad a nivel de precios
- P* = Nivel de precios esperado

### Desplazamientos de DA

**Política Fiscal Expansiva:**
- ↑G o ↓T → DA se desplaza derecha

**Política Monetaria Expansiva:**
- ↑M → Para cada P, M/P↑ → DA se desplaza derecha

**Aumento en Confianza del Consumidor:**
- Consumo autónomo sube → DA se desplaza derecha

**Mejora en Exportaciones (por demanda mundial):**
- X↑ → DA se desplaza derecha

## 2. Oferta Agregada (OA)

La **Oferta Agregada** es la cantidad total de bienes y servicios que las empresas desean producir a cada nivel de precios.

### Oferta Agregada de Corto Plazo (OACP)

En el corto plazo, muchos precios están fijos contractualmente:
- Salarios fijados en contratos anuales
- Precios publicados (menú costs de cambiar)
- Expectativas de precios no ajustadas

**Características de OACP:**

**Pendiente Positiva:**
- ↑P → Márgenes de ganancia ↑ (costos fijos) → Empresas producen más
- Empresas creen que precios relativos suben mientras costos se mantienen

**Sensibilidad a Sorpresas de Precio:**
- Si P > Pᵉ (precio sube más que esperado): Empresas producen más
- Si P < Pᵉ (precio sube menos que esperado): Empresas producen menos

**Ecuación de OACP (Curva de Phillips Modificada):**
Y = Y* + β(P - Pᵉ)

Donde:
- Y* = Producción potencial (pleno empleo)
- β = Sensibilidad de producción a sorpresas de precio
- Pᵉ = Nivel de precios esperado

**Desplazamientos de OACP:**

**Shock de Oferta Negativo:**
- Aumento de costos de insumos (petróleo)
- Aumento de salarios no relacionado con productividad
- OACP se desplaza izquierda/arriba
- Resultado: Estanflación (menor producción, mayor inflación)

**Shock de Oferta Positivo:**
- Mejora tecnológica
- Disminución de precios de insumos
- OACP se desplaza derecha/abajo
- Resultado: Mayor producción y menor inflación

**Mayor Expectativa de Inflación (Pᵉ ↑):**
- OACP se desplaza izquierda/arriba
- Empresas anticipan mayores costos futuros

### Oferta Agregada de Largo Plazo (OALP)

En el largo plazo, todos los precios se ajustan:
- Contratos se renegocian
- Expectativas se forman correctamente
- No hay sorpresas de precio (P = Pᵉ)

**Características de OALP:**

**Vertical a Y = Y* (Producción Potencial):**
- La producción de largo plazo está determinada por: capital, trabajo, tecnología
- No depende del nivel de precios nominal
- Resultado de la hipótesis de tasa natural de desempleo

**Ecuación de OALP:**
Y = Y* (independientemente de P)

**Intuición:**
- A largo plazo, dinero es neutral
- Cambios en cantidad de dinero afectan solo precios, no producción real

**Derivación de Y*:**
Y* = f(K, L, A)

Donde:
- K = Capital disponible
- L = Fuerza laboral empleada
- A = Nivel tecnológico
- f = función de producción agregada

## 3. Equilibrio Macroeconómico

### Equilibrio de Corto Plazo

Ocurre en la intersección de DA y OACP.

**Determinado por:**
- Demanda agregada (política fiscal, monetaria, confianza)
- Capacidad de oferta de corto plazo (precios, salarios esperados)

**Características:**
- No necesariamente en pleno empleo
- Producción Y puede ser > Y* (sobrecalentamiento) o < Y* (recesión)
- Inflación determinada por movimiento a lo largo de OACP

### Equilibrio de Largo Plazo

En largo plazo, la economía converge donde DA intersecta OALP.

**Mecanismo de Ajuste:**

**Si Y > Y* (Sobrecalentamiento):**
1. Desempleo bajo → Presión al alza en salarios
2. Empresas anticipan inflación futura → Pᵉ ↑
3. OACP se desplaza izquierda
4. Equilibrio se mueve arriba en DA
5. Precio sube, Y disminuye hacia Y*
6. Continúa hasta Y = Y*

**Si Y < Y* (Recesión):**
1. Desempleo alto → Presión a la baja en salarios
2. Empresas anticipan deflación → Pᵉ ↓
3. OACP se desplaza derecha
4. Equilibrio se mueve abajo en DA
5. Precio baja, Y aumenta hacia Y*
6. Continúa hasta Y = Y*

**Resultado de Largo Plazo:**
- Y siempre converge a Y* (pleno empleo)
- P se ajusta para equilibrar DA con OALP
- Cambios permanentes en M solo afectan P, no Y

## 4. Análisis de Shocks

### Shock de Demanda Positivo (Política Fiscal Expansiva)

**Corto Plazo:**
- DA se desplaza derecha
- Y↑, P↑, desempleo↓
- Económica prospera

**Largo Plazo:**
- Precios y salarios suben (Pᵉ↑)
- OACP se desplaza izquierda
- Y vuelve a Y*, pero P más alta permanentemente
- Dinero es neutral, pero proceso dinámico es inflacionario

**Conclusión:** Política fiscal expansiva estimula corto plazo pero causa inflación sin ganancia permanente en producción.

### Shock de Oferta Negativo (Aumento de Precios de Petróleo)

**Corto Plazo:**
- OACP se desplaza izquierda
- Y↓, P↑ (estanflación)
- Desempleo sube mientras inflación sube (trade-off negativo)

**Largo Plazo:**
- Depende de respuesta de política
- Si Banco Central valida con expansión: Inflación permanece alta
- Si Banco Central se resiste: Recesión dura hasta que salarios/precios ajusten

**Ejemplo Histórico:**
- Crisis del petróleo 1973: OPEC reduce oferta
- Muchos países experimentaron estanflación (inflación de dos dígitos + desempleo alto)
- Países que resistieron inflación experimentaron recesiones prolongadas

## 5. Dinero, Precios e Inflación

### Teoría Cuantitativa del Dinero

**Ecuación de Fisher:**
M·V = P·Q

Donde:
- M = Oferta de dinero
- V = Velocidad de circulación del dinero
- P = Nivel de precios
- Q = Cantidad de bienes producidos

**En términos de tasas de crecimiento:**
m + v = p + q

Donde minúsculas = tasas de crecimiento.

**Implicación:**
- Si m (dinero crece), y v y q son constantes → p (precios) crece
- Inflación a largo plazo es fenómeno monetario (causado por crecimiento de dinero excesivo)

### Relación de Largo Plazo: Dinero es Neutral

En equilibrio de largo plazo:
- Q = Y* (determinado por oferta agregada, no por dinero)
- V = constante (determinada por tecnología de pagos, no por dinero)
- Por lo tanto: M determina P
- Duplicar M en largo plazo solo duplica P

## Conclusión

El modelo OA-DA proporciona framework poderoso para entender ciclos económicos y efectos de política. La distinción entre corto plazo (precios rígidos, dinero no neutral) y largo plazo (precios flexibles, dinero neutral) es central. Entender cómo shocks de demanda vs. oferta generan diferentes dinámicas de producción, empleo e inflación es crítico para análisis macroeconómico y diseño de política económica.',
  NULL
);

-- Continuará con los módulos de Política Fiscal, Monetaria, Phillips y más...
-- Debido a restricciones de tokens, el resto se insertará en siguiente llamada

INSERT INTO contenido_clase (modulo_id, orden, tipo, titulo, contenido, imagen_url)
VALUES (
  2,
  4,
  'guia',
  'Política Fiscal: Herramienta de Estabilización y Crecimiento Económico',
  '# Política Fiscal: Teoría y Aplicación

## Introducción

La política fiscal se refiere a decisiones de gobierno respecto a gasto público (G) e impuestos (T). Es herramienta fundamental de política macroeconómica para estabilizar económica y promover crecimiento. El debate entre uso activo de política fiscal para estabilización vs. enfoque más pasivo es uno de los más importantes en macroeconomía.

## 1. Fundamentos de Política Fiscal

### Definición y Objetivos

La **política fiscal** comprende:
- **Gasto Público (G)**: Gasto del gobierno en bienes, servicios, inversión
- **Impuestos (T)**: Recaudación de ingresos para financiar gobierno
- **Transferencias**: Pagos sin contraprestación (pensiones, subsidios)

**Objetivos Típicos:**
1. **Estabilización cíclica**: Suavizar fluctuaciones de ciclo económico
2. **Crecimiento económico**: Inversión pública en capital humano, infraestructura
3. **Distribución de ingresos**: Impuestos progresivos, transferencias para equidad
4. **Solvencia fiscal**: Mantener deuda pública sostenible

### Herramientas de Política Fiscal

**Política Fiscal Expansiva (Estimulante):**
- ↑ Gasto público (construir carreteras, aumentar educación)
- ↓ Impuestos (reducir impuestos a ingresos, a ventas)
- Aumenta déficit fiscal (G > T)
- Apropiada en recesiones

**Política Fiscal Restrictiva (Contractiva):**
- ↓ Gasto público (reducir proyectos, gastos)
- ↑ Impuestos (aumentar tasas impositivas)
- Aumenta superávit fiscal (T > G)
- Apropiada en economía sobrecalentada/inflacionaria

## 2. Multiplicadores Fiscales

### El Multiplicador de Gasto Público

Un aumento en gasto público de ΔG genera aumento en renta total mayor que ΔG.

**Derivación Simple (Modelo Keynesiano):**

Consumo: C = C₀ + c(Y - T)
Inversión: I = I₀ (exógena, para simplificar)
Equilibrio: Y = C + I + G

Substituyendo:
Y = C₀ + c(Y - T) + I₀ + G
Y - cY = C₀ - cT + I₀ + G
Y(1 - c) = C₀ - cT + I₀ + G
Y = [1/(1-c)] × [C₀ - cT + I₀ + G]

**Multiplicador de Gasto Público:**
ky = ∂Y/∂G = 1/(1-c)

Si c = 0.8 (PMC = 80%):
ky = 1/(1-0.8) = 1/0.2 = 5

**Interpretación:**
Un aumento de $1 en gasto público genera aumento de $5 en ingreso total.

**Intuición:**
1. Gobierno gasta $1
2. Receptor de gasto consume 80% adicional = $0.80
3. Estos receptores gastan 80% de $0.80 = $0.64
4. Y así sucesivamente...
5. Suma total: $1 + $0.80 + $0.64 + ... = $5

### El Multiplicador de Impuestos

Una reducción de impuestos de ΔT genera aumento en ingreso.

**Derivación:**
Y = [1/(1-c)] × [C₀ - cT + I₀ + G]

Multiplicador de impuestos:
kt = ∂Y/∂T = -c/(1-c)

Si c = 0.8:
kt = -0.8/(1-0.8) = -0.8/0.2 = -4

**Interpretación:**
Una reducción de impuestos de $1 genera aumento de $4 en ingreso total.

**Comparación:**
- Multiplicador de gasto = 5
- Multiplicador de impuestos (en magnitud) = 4
- Gasto es más efectivo que reducción de impuestos

**Por qué diferencia:**
- Gasto va todo a demanda agregada
- Reducción de impuestos: Solo c parte es gasto, (1-c) va a ahorro

### Limitaciones de los Multiplicadores

**1. Ajuste de Inversión (Crowding-Out):**
En modelo IS-LM, gasto fiscal aumenta r, lo que reduce inversión privada.

- Multiplicador efectivo < multiplicador keynesiano simple
- Magnitud depende de sensibilidad de inversión a tasa de interés

**2. Expectativas Racionales:**
Si consumidores anticipan que gasto fiscal temporal requiere impuestos futuros, pueden reducir consumo presente (Ricardian Equivalence).

**3. Oferta Agregada:**
Si economía está en pleno empleo, mayor demanda solo genera inflación, no mayor producción.

**4. Efectos Internacionales:**
Mayor ingreso aumenta importaciones (fuga), reduciendo multiplicador en economía abierta.

**Multiplicador en Economía Abierta:**
ky = 1/[1 - c(1-t) - m]

Donde m = propensión marginal a importar

## 3. Posición Fiscal

### Balance Fiscal o Déficit Público

El **balance fiscal** es:
Balance = T - G - TR (Transferencias)

Si Balance < 0: Déficit fiscal (gasto > ingresos)
Si Balance > 0: Superávit fiscal (ingresos > gasto)

### Dos Conceptos Importantes

**Déficit Nominal vs Déficit Estructural (Cíclicamente Ajustado):**

- **Déficit Nominal**: Déficit actual observable
- **Déficit Estructural**: Déficit que existiría a pleno empleo

Relación:
Déficit Nominal = Déficit Estructural + Déficit Cíclico

**Ejemplo:**
- En recesión: Ingresos caen automáticamente, gasto aumenta (seguros desempleo)
- Esto crea déficit cíclico aunque posición estructural sea equilibrada
- Importancia: Evaluar si déficit es estructural (requiere reforma) o temporal (se resuelve con recuperación)

## 4. Sostenibilidad de Deuda Pública

### Dinámica de Deuda

La deuda pública evoluciona como:
Dt+1 = (1+r)Dt - (T - G)

Donde:
- Dt = Deuda pública en t
- r = Tasa de interés real
- T - G = Balance primario (superávit sin intereses)

**Reescribiendo:**
ΔD = rD - (T - G)

La deuda crece si:
- r > 0 y balance primario es déficit
- Si r muy alto, incluso superávit primario puede no prevenir aumento de deuda

### Relación Deuda/PIB

Indicador más importante: Deuda como % del PIB.

Si deuda/PIB sube continuamente, eventualmente: 
- Costo de financiamiento sube (mercados menos confiados)
- Crisis de deuda posible

**Sostenibilidad Requiere:**
En largo plazo: (Deuda/PIB) sea estable o decreciente

## 5. Limitaciones de Política Fiscal Discrecional

### Rezagos (Lags)

**Lag de Reconocimiento:** Tiempo para reconocer que hay recesión
**Lag de Implementación:** Tiempo para diseñar y aprobar medida fiscal
**Lag de Efecto:** Tiempo para que política tenga efectos en economía

Estos rezagos largos pueden hacer que estímulo fiscal llegue cuando economía ya se recuperó.

### Inflexibilidad Política

- Aumentar impuestos es impopular (políticos evitan)
- Reducir gasto es impopular (afecta grupos de interés)
- Resultado: Tendencia hacia déficits persistentes (ilusión fiscal)

### Desplazamiento Privado (Crowding-Out)

Mayor gasto fiscal → Tasas de interés suben → Inversión privada baja

Si crowding-out es completo: Gasto público solo desplaza privado, sin efecto en demanda agregada total.

## 6. Política Fiscal en Diferentes Contextos

### Política Fiscal en Recesión

**Apropiado:**
- Gasto fiscal expansivo
- Aumenta demanda agregada
- Empleo y producción suben

**Desafío:**
- Déficit fiscal aumenta
- Preocupación sobre sostenibilidad de deuda

**Ejemplo:** Crisis 2008 - Gobiernos aumentaron gasto fiscal y redujeron impuestos.

### Política Fiscal en Inflación

**Apropiado:**
- Reducir gasto o aumentar impuestos
- Reduce demanda agregada
- Presión inflacionaria disminuye

**Desafío:**
- Medidas impopulares
- Riesgo de caída en producción (recesión)

### Política Fiscal en Crisisdeuda

Si deuda/PIB muy alto y sostenibilidad cuestionada:
- Mercados pueden rehusar financiar déficits
- Tasas de interés suben bruscamente
- Espacio fiscal muy limitado

**Ejemplo:** Crisis de deuda Europa 2010-2012 (Grecia, Irlanda, Portugal).

## Conclusión

La política fiscal es herramienta potente para estabilización y crecimiento, pero con limitaciones importantes. Los multiplicadores fiscales indican que cambios en gasto o impuestos tienen efectos significativos, pero estos están atenuados por crowding-out y efectos de economía abierta. La sostenibilidad de deuda es restricción importante que limita espacio fiscal en largo plazo. El debate académico continúa sobre cuándo política fiscal debe ser usada activamente vs. confiar en estabilizadores automáticos.',
  NULL
);

INSERT INTO contenido_clase (modulo_id, orden, tipo, titulo, contenido, imagen_url)
VALUES (
  2,
  5,
  'guia',
  'Política Monetaria: Control de Dinero e Inflación',
  '# Política Monetaria: Teoría, Herramientas y Efectividad

## Introducción

La política monetaria es control de cantidad de dinero en circulación y condiciones de crédito, realizado por banco central. Es instrumento fundamental para controlar inflación, estimular crecimiento y estabilizar sistemas financieros. A diferencia de política fiscal que es política, la política monetaria es más técnica y generalmente delegada a autoridades independientes.

## 1. Fundamentos de Política Monetaria

### Rol del Banco Central

El **banco central** es institución responsable de:
- Emitir dinero de curso legal
- Supervisar sistema bancario y financiero
- Ejecutar política monetaria
- Mantener estabilidad de precios
- Mantener estabilidad del sistema financiero

**Objetivos Típicos (Mandato):**
1. Estabilidad de precios (control de inflación)
2. Máximo empleo (objetivo secundario en muchos países)
3. Estabilidad del sistema financiero

### Independencia del Banco Central

En la mayoría de países desarrollados, bancos centrales son **independientes**:
- No pueden ser ordenados por gobierno
- Mandato establecido por ley
- Decisiones técnicas sin presión política

**Razón:**
- Política monetaria requiere consistencia de largo plazo
- Gobiernos tienden a querer expansión pre-electoral (ciclo político-presupuestario)
- Independencia previene inflación crónica

**Ejemplo:**
- Banco Central de USA (Federal Reserve): Elegida por Junta de Gobernadores, no por Presidente
- Banco Central Europeo: Instituciones independientes, bancos centrales nacionales independientes

## 2. Herramientas de Política Monetaria

### 1. Operaciones de Mercado Abierto (OMA)

El banco central compra o vende valores (típicamente bonos del gobierno) en mercado secundario.

**Compra de Valores (Expansión Monetaria):**
- Banco central compra bonos de bancos privados
- Paga con dinero nuevo (creado electrónicamente)
- Oferta de dinero aumenta
- Tasa de interés baja
- Inversión y consumo aumentan

**Venta de Valores (Contracción Monetaria):**
- Banco central vende bonos que posee
- Recibe dinero, reduciendo oferta en circulación
- Tasa de interés sube
- Inversión y consumo disminuyen

**Ventaja:**
- Más flexible que otros instrumentos
- Rápido implementar
- Usado continuamente

### 2. Tasa de Descuento (Tasa de Redescuento)

Tasa a la que banco central presta dinero a bancos privados.

**Reducir Tasa de Descuento (Expansión):**
- Bancos encuentran más barato pedir prestado de BC
- Más disposición a prestar
- Oferta de dinero aumenta

**Aumentar Tasa de Descuento (Contracción):**
- Caro para bancos pedir de BC
- Menos disposición a prestar
- Oferta de dinero disminuye

### 3. Encaje Legal (Requisito de Reserva)

Porcentaje de depósitos que bancos deben mantener en reservas (no prestar).

**Reducir Encaje (Expansión):**
- Bancos deben mantener menos en reservas
- Pueden prestar más
- Oferta de dinero aumenta (efecto multiplicador)

**Aumentar Encaje (Contracción):**
- Bancos deben mantener más en reservas
- Menos disponible para prestar
- Oferta de dinero disminuye

**Efectividad:**
- Cambios en encaje tienen efecto grande (multiplicador de dinero)
- Pero menos flexible (cambios infrecuentes)

### 4. Comunicación y Guía Futura (Forward Guidance)

Banco central comunica intención futura de política.

**Ejemplo:**
- "Mantendremos tasas bajas por años"
- Reduce incertidumbre
- Consumidores y empresas ajustan planes hoy

**Importancia en Trampa de Liquidez:**
- Cuando tasas nominales están en cero, comunicación crucial
- Expansión cuantitativa (comprar bonos largo plazo) es herramienta de comunicación

## 3. Mecanismos de Transmisión Monetaria

¿Cómo cambios de política monetaria afectan variables reales (producción, empleo)?

### Mecanismo 1: Tasa de Interés

**Secuencia:**
1. Banco Central expande oferta de dinero
2. Tasa de interés baja (dinero es más abundante)
3. Inversión aumenta (menos costoso pedir prestado)
4. Demanda agregada sube
5. Producción y empleo suben

**Limitación:**
- Si tasa de interés ya cercana a cero (trampa de liquidez), no puede bajar más
- Política monetaria pierde efectividad

### Mecanismo 2: Precio de Activos (Wealth Effect)

**Secuencia:**
1. Expansión monetaria
2. Tasas bajas → Precios de acciones suben (descontamos flujos futuros a tasa menor)
3. Hogares se sienten más ricos
4. Consumo aumenta
5. Demanda agregada sube

**Limitación:**
- Efecto es volátil
- Puede generar burbujas de precios de activos

### Mecanismo 3: Tipo de Cambio

En economía abierta:

**Secuencia:**
1. Expansión monetaria
2. Dinero local menos escaso → Se deprecia (desvaloriza)
3. Exportaciones más competitivas (más baratas)
4. Importaciones menos atractivas (más caras)
5. Balanza comercial mejora (X-M sube)
6. Demanda agregada sube

**Limitación:**
- Depreciación puede no ocurrir si hay controles de cambio
- Puede haber represalias comerciales

### Mecanismo 4: Expectativas de Inflación

**Secuencia:**
1. Banco Central anuncia expansión futura
2. Público espera más inflación
3. Tasas reales bajan (tasa nominal - tasa de inflación esperada)
4. Inversión sube
5. Demanda agregada sube

**Importancia:**
- Mecanismo puro de expectativas
- Puede funcionar aunque BC no haya expandido aún (forward guidance)
- Crucial cuando tasa nominal en piso (trampa de liquidez)

## 4. Efectos de Política Monetaria

### Corto Plazo: Dinero No es Neutral

Expansión monetaria:
- Baja tasa de interés
- Estimula inversión y consumo
- Demanda agregada sube
- Producción y empleo suben

**Así que en corto plazo, dinero SÍ es neutral en el sentido que afecta variables reales.**

### Largo Plazo: Dinero es Neutral

**Mecanismo de Ajuste:**

1. Expansión monetaria creada inflación (más dinero chasing mismo bienes)
2. Precios suben
3. Tasas nominales suben (para mantener tasa real)
4. Tasas reales vuelven a nivel original
5. Inversión, consumo, producción vuelven a nivel original

**Conclusión:**
- Dinero aumenta en largo plazo solo causa inflación permanente
- Producción y empleo no afectados permanentemente

## 5. La Regla de Política Monetaria

Bancos centrales típicamente siguen alguna versión de la **Regla de Taylor** (John Taylor, 1993):

**Ecuación:**
r = r* + π + 0.5(π - π*) + 0.5(Y - Y*)

Donde:
- r = Tasa de política del BC
- r* = Tasa de interés real neutral
- π = Inflación actual
- π* = Meta de inflación del BC
- Y = Producción actual
- Y* = Producción potencial

**Interpretación:**
- BC aumenta tasa si inflación sube arriba de meta
- BC aumenta tasa si producción sube arriba del potencial (sobrecalentamiento)
- Responde a desviaciones de objetivos

**Ventaja:**
- Proporciona regla sistemática (no discrecional)
- Reduce incertidumbre
- Condiciona comportamiento

## 6. Conflictos entre Objetivos y Limitaciones

### Trade-off Inflación-Desempleo (Curva de Phillips)

En corto plazo, existe trade-off:
- Menor inflación requiere mayor desempleo
- Menor desempleo requiere aceptar mayor inflación

**Implicación:**
Banco Central enfrenta trade-off en corto plazo: ¿Cuál es la combinación óptima?

### Inconsistencia Temporal

Aunque BC quiere baja inflación de largo plazo, en cada momento tiene incentivo a expandir (estimular empleo).

**Solución:**
- Reglas vs. discreción
- Independencia del BC
- Metas de inflación con credibilidad

### Límites de Cero en Tasas Nominales

Tasas de interés nominales no pueden ser negativas (se usa dinero en efectivo).

**Implicación:**
- Cuando tasas en cero, BC pierde herramienta de política
- Trampa de liquidez (como en Japón, post-2008 EE.UU.)
- Solo expansión cuantitativa (comprar bonos) queda disponible

## 7. Política Monetaria en Crisisfinancieras

### Expansión Cuantitativa (Quantitative Easing - QE)

Cuando tasas están en cero, BC puede comprar activos a largo plazo (bonos del gobierno, valores corporativos).

**Mecanismo:**
- BC crea dinero digitalmente
- Compra bonos de largo plazo
- Reduce tasa de largo plazo
- Invierte en estos activos

**Ejemplo:** Federal Reserve post-2008 compró ~$3 billones en bonos.

**Efectividad Debatida:**
- Algunos estudios muestran efectos significativos
- Otros sugieren efectos limitados (mercados ya esperaban bajas tasas)
- Causa preocupación sobre inflación futura y efectos secundarios

## Conclusión

La política monetaria es instrumento potente pero con limitaciones. En corto plazo, puede estimular producción y empleo bajando tasas de interés. En largo plazo, afecta principalmente precios (dinero es neutral). Las herramientas modernas (OMA, QE) permiten políticas más sofisticadas. El debate sigue sobre cómo equilibrar estabilidad de precios con máximo empleo, particularmente cuando tasa nominal está limitada por cero.',
  NULL
);

INSERT INTO contenido_clase (modulo_id, orden, tipo, titulo, contenido, imagen_url)
VALUES (
  2,
  6,
  'guia',
  'Inflación y Desempleo: La Curva de Phillips y Cambios Estructurales',
  '# Inflación y Desempleo: La Curva de Phillips

## Introducción

La relación entre inflación y desempleo ha sido central en macroeconomía moderna. La Curva de Phillips, desarrollada por A.W. Phillips (1958), documenta un trade-off empírico: niveles más bajos de desempleo están asociados con mayor inflación. Este trade-off ha tenido profundas implicaciones para política macroeconómica y continúa siendo relevante hoy.

## 1. La Curva de Phillips Original

### Descubrimiento Empírico

**A.W. Phillips (1958)** estudió relación entre tasa de cambio de salarios nominales y tasa de desempleo en Reino Unido (1861-1957).

**Hallazgo:**
Relación inversa y no-lineal:
- Cuando desempleo bajo (< 5%): Salarios suben rápidamente
- Cuando desempleo alto (> 5%): Salarios bajan lentamente
- Cuando desempleo muy alto: Salarios prácticamente estancados

**Ecuación Original (Phillips):**
ΔW/W = -a + b/U

Donde:
- ΔW/W = Tasa de cambio de salarios nominales
- U = Tasa de desempleo
- a, b = Parámetros

**Gráficamente:**
Curva con pendiente negativa y convexa.

### Interpretación Económica

¿Por qué existe esta relación inversa?

**Mercado de Trabajo como Mercado Normal:**
- Bajo desempleo → Escasez de trabajo → Salarios suben (precio del trabajo sube)
- Alto desempleo → Exceso de oferta de trabajo → Salarios bajan (o suben lentamente)

**Esto es consistente con:**
- Demanda-Oferta: Menor oferta relativa → mayor precio
- Poder de negociación: Bajo desempleo → trabajadores tienen poder → mayores salarios

## 2. De Salarios a Precios: Phillips Modificada

Los sucesores de Phillips reconocieron que para política macroeconómica, lo relevante es relación entre **inflación de precios** (no salarios) y desempleo.

### Transformación a Inflación de Precios

**Ecuación de Phillips Modificada:**
π = π^e - α(U - U*)

Donde:
- π = Tasa de inflación de precios
- π^e = Tasa esperada de inflación
- U = Tasa de desempleo actual
- U* = Tasa natural de desempleo (NAIRU)
- α = Parámetro de sensibilidad

**Interpretación:**

**Cuando U < U* (Desempleo Bajo):**
- El mercado de trabajo está "caliente" (muy poco desempleo)
- Hay presión de inflación
- π > π^e

**Cuando U > U* (Desempleo Alto):**
- Hay "slack" en mercado de trabajo (mucho desempleo)
- Presión deflacionaria
- π < π^e

**Cuando U = U* (Tasa Natural):**
- No hay presión inflacionaria ni deflacionaria
- π = π^e

### El Concepto de NAIRU

**NAIRU = Non-Accelerating Inflation Rate of Unemployment**

Es la tasa de desempleo consistente con estabilidad de inflación.

**Características:**

**A Largo Plazo:**
- Cuando U > NAIRU: inflación disminuye (deflación)
- Cuando U < NAIRU: inflación aumenta
- Cuando U = NAIRU: inflación estable

**Interpretación:**
- NAIRU no es tasa de desempleo que se puede reducir permanentemente
- Está determinada por factores estructurales (instituciones laborales, tecnología, etc.)
- Intentar bajar desempleo permanentemente por debajo de NAIRU solo causa inflación creciente

**Estimación de NAIRU:**
- Varía entre países (3-5% en países desarrollados típicamente)
- Puede cambiar con el tiempo
- Difícil de estimar (requiere separar ciclo de tendencia)

## 3. Dinámicas de Corto Plazo: Expectativas Racionales

### Expectativas Racionales y la Crítica de Lucas

En los 1970s-1980s, **Robert Lucas** y escuela "nueva macroeconomía clásica" criticaron la Phillips tradicional.

**Crítica:**
Si las expectativas se forman racionalmente (usando toda información disponible), entonces:
- Cambios de política previsibles no tendrán efectos sobre desempleo real
- Solo sorpresas no anticipadas afectan variables reales

**Implicación:**
Los intentos de usar Phillips para reducir desempleo (mediante inflación sorpresiva) no funcionarán persistentemente.

### Trade-off de Corto Plazo con Expectativas

Aunque en muy corto plazo puede haber trade-off entre inflación y desempleo, este depende de si inflación es sorpresiva o esperada:

**Si Inflación es Sorpresiva (π > π^e):**
- Precios suben pero salarios no ajustaron (contratos, expectativas fijas)
- Salarios reales bajan
- Empresas contratan más (trabajo más barato)
- Desempleo baja

**Si Inflación es Esperada (π = π^e):**
- Salarios suben junto con precios
- Salarios reales no cambian
- Desempleo no afectado
- No hay trade-off

**Conclusión:** Trade-off requiere sorpresas, y sorpresas son transitorias por definición.

### Curva de Phillips de Largo Plazo: Vertical

En largo plazo, cuando π = π^e (inflación esperada se realiza):

π = π - α(U - U*)
0 = -α(U - U*)
U = U*

**Interpretación:**
- Curva de Phillips de largo plazo es **vertical** a NAIRU
- No hay trade-off permanente
- Dinero es neutral en largo plazo (cambios de dinero afectan solo precios)

## 4. Estanflación y el Caso de los 1970s

### El Problema de los 1970s

En 1970s, muchos países experimentaron inflación alta con desempleo alto simultáneamente.

**Esto violaba Phillips tradicional** (que predecía: bajo desempleo → alta inflación, no ambos simultáneamente).

**Explicación:**

**Shocks de Oferta (Crisis de Petróleo):**
- OPEC reduce oferta de petróleo
- Precios de energía suben
- Costos de producción suben

**Efecto en Phillips:**
π = π^e - α(U - U*) + Shock de Oferta

Cuando hay shock negativo:
- Inflación sube (incluso con desempleo alto)
- Desempleo sube (porque costos caen cantidad demandada)
- Ambos simultáneamente: Estanflación

**Resolución (1980s):**
- Banco Centrales (especialmente Paul Volcker en Federal Reserve)
- Redujeron oferta de dinero drásticamente
- Inflación se redujo pero con recesión severa
- Después, Phillips se restauró (inflación baja-moderada, desempleo normal)

## 5. Curva de Phillips Moderna

### Phillips con Dinámicas Hacia Adelante

La formulación moderna incluye:
1. Expectativas racionales
2. Costos de cambio de precios (Calvo pricing)
3. Maximización de beneficios

**Ecuación de Phillips Neokeynesiana:**
π_t = β E_t(π_{t+1}) + κ x_t + u_t

Donde:
- π_t = Inflación en período t
- E_t(π_{t+1}) = Inflación esperada futura
- x_t = Brecha de producto (diferencia entre Y y Y*)
- u_t = Shock de oferta

**Interpretación:**
- Inflación depende de inflación esperada futura
- Inflación depende de demanda agregada (brecha de producto)
- Brecha positiva (demanda > oferta potencial) causa inflación
- Shocks de oferta cambian inflación independientemente de demanda

### Aplanamiento de Phillips en Reciente

**Observación Empírica (últimas décadas):**
- Relación entre desempleo e inflación se ha debilitado
- Phillips parece más "plana" que antes

**Explicaciones Propuestas:**

**1. Expectativas Ancladas:**
- Credibilidad de bancos centrales en control de inflación
- Público espera inflación baja
- Menor respuesta de inflación a desempleo bajo
- π^e muy estable, poco cambio

**2. Cambios Estructurales:**
- Globalización: Competencia de trabajo/bienes de países bajo costo
- Tecnología: Cambios rápidos reducen poder de monopolio
- Debilitamiento de sindicatos: Menos negociación colectiva
- Gig economy: Mercado de trabajo más flexible

**3. Cambio en Medición:**
- Inflación de precios al consumidor vs. medidas alternativas
- Precios hedónicos (calidad ajustada)
- Cambios en canasta de consumo

## 6. Implicaciones para Política Macroeconómica

### Objetivo Dual de Banco Central

Federal Reserve de EE.UU. tiene **mandato dual:**
1. Estabilidad de precios (baja inflación)
2. Máximo empleo

Pero, ¿existe trade-off real que permite que BC logre ambos?

**De acuerdo a Phillips moderna:**
- En corto plazo: Posible trade-off, pero dependiente de expectativas
- En largo plazo: No hay trade-off (ambas restricciones al mismo nivel)

**Estrategia Óptima:**
- Mantener inflación en meta (anclando expectativas)
- Desempleo converge a NAIRU
- Mayor flexibilidad en corto plazo (estabilizar ciclo sin sacrificar largo plazo)

### Credibilidad y Reputación del Banco Central

Curva de Phillips moderna enfatiza **credibilidad** del BC.

**Banco Central con Alta Credibilidad:**
- Público cree que BC mantendrá inflación baja
- π^e baja y estable
- Phillips es más plana
- Menor costo de inflación en términos de desempleo

**Banco Central sin Credibilidad:**
- Público desconfiado de control de inflación
- π^e alta y sube con cualquier sorpresa inflacionaria
- Phillips es más empinada
- Muy caro reducir inflación

**Construcción de Credibilidad:**
- Mantener compromiso a meta de inflación
- Banco Central independiente
- Comunicación clara
- Consistencia en largo plazo

## 7. Perspectiva Histórica

### Phillips Corto Plazo Aparentemente Explotado

**1960s en EE.UU:**
- Policymakers pensaban que podían elegir punto en Phillips
- Redujeron desempleo (estimulación fiscal Vietnam War)
- Inflación aumentó pero pensaban era aceptable trade-off

**Resultado:** Inflación se aceleró en 1970s sin reducción permanente de desempleo.

**Lección:** Phillips no es menú estable de opciones que BC puede elegir.

## Conclusión

La Curva de Phillips documenta relación empírica importante entre inflación y desempleo, pero es relación compleja condicionada a expectativas. En corto plazo, puede haber trade-off si inflación es sorpresiva, pero en largo plazo, Phillips es vertical al NAIRU. La credibilidad del banco central en control de inflación es crucial para determinar planicidad de Phillips. Entender estas dinámicas es esencial para diseño y evaluación de política monetaria.',
  NULL
);

INSERT INTO contenido_clase (modulo_id, orden, tipo, titulo, contenido, imagen_url)
VALUES (
  2,
  7,
  'guia',
  'Comercio Internacional y Balanza de Pagos: Flujos Económicos Globales',
  '# Comercio Internacional y Balanza de Pagos

## Introducción

El comercio internacional y flujos de capital son dimensiones cada vez más importantes de economías modernas. La balanza de pagos, que registra todas las transacciones con el extranjero, proporciona marco para entender posición económica internacional de un país. Este módulo cubre fundamentos de comercio, ventaja comparativa y contabilidad de balanza de pagos.

## 1. Fundamentos de Comercio Internacional

### ¿Por qué Comercian los Países?

Países comercian porque pueden beneficiarse mutuamente. **David Ricardo (1817)** demostró que incluso si un país es más productivo en todo, ambas partes se benefician del comercio.

### Teoría de la Ventaja Comparativa

**Ejemplo Simple (2 países, 2 bienes):**

Suponga:
- País A: Puede producir 100 autos O 200 toneladas de alimentos
- País B: Puede producir 50 autos O 100 toneladas de alimentos

**Costo de Oportunidad:**
- País A: 1 auto cuesta 2 toneladas de alimentos
- País B: 1 auto cuesta 2 toneladas de alimentos

- País A: 1 tonelada de alimentos cuesta 0.5 autos
- País B: 1 tonelada de alimentos cuesta 0.5 autos

**Sin Comercio:**
Ambos producen 50 autos y 100 alimentos (punto medio).

**Con Comercio:**
- País A produce solo autos (100), tiene ventaja comparativa (costo relativo menor)
- País B produce solo alimentos (100), tiene ventaja comparativa

**Beneficios del Comercio:**
- Total aumenta a 100 autos y más de 100 alimentos
- Ambos países pueden consumir más que en autarquía

**Conclusión:**
La especialización según ventaja comparativa (no ventaja absoluta) genera ganancias del comercio.

### Modelos Modernos de Comercio

**Heckscher-Ohlin (H-O):**
Países se especializan según su abundancia relativa de factores:
- País con trabajo abundante se especializa en bienes intensivos en trabajo
- País con capital abundante se especializa en bienes intensivos en capital

**Teoría de Ciclo de Producto:**
Bienes pasan por ciclo:
1. Innovación (país desarrollado)
2. Estandarización (producción masiva)
3. Madurez (producción en país bajo costo)

## 2. Balanza de Pagos: Estructura y Componentes

La **Balanza de Pagos** es registro sistemático de todas las transacciones económicas de un país con el resto del mundo.

### Estructura Principal

**1. Cuenta Corriente:**
Registra transacciones de bienes, servicios, ingresos de factores y transferencias.

**a) Balanza de Comercial (Mercancías):**
- Exportaciones de bienes (X)
- Importaciones de bienes (M)
- Saldo: X - M

**b) Balanza de Servicios:**
- Exportaciones de servicios (transporte, turismo, finanzas)
- Importaciones de servicios
- Saldo: Diferencia

**c) Ingresos de Factores:**
- Ingresos por inversión extranjera (repatriación de ganancias)
- Remesas de emigrantes
- Pago a extranjeros por servicios

**d) Transferencias Corrientes:**
- Ayuda oficial
- Donaciones

**Saldo Cuenta Corriente = Balanza Comercial + Balanza Servicios + Ingresos Netos Factores + Transferencias**

**2. Cuenta Financiera (Capital):**
Registra flujos de capital y cambios en activos/pasivos externos.

**a) Inversión Directa Extranjera (IDE):**
- Inversión en negocios nuevos en el exterior
- Compra de empresas (fusiones y adquisiciones)
- Típicamente > 10% de propiedad = IDE

**b) Inversión de Cartera:**
- Compra de acciones y bonos
- Inversiones financieras

**c) Derivados Financieros:**
- Opciones, futuros, swaps

**d) Otros Flujos:**
- Créditos comerciales
- Préstamos

**e) Cambios en Reservas de Divisas:**
- Acumulación de reservas (típicamente oro, monedas extranjeras)

### Identidad Contable Fundamental

**Saldo Cuenta Corriente + Saldo Cuenta Financiera = 0**

(Ignorando cambios en reservas y errores estadísticos)

**Interpretación:**
- Si Cuenta Corriente es déficit (país importa más que exporta):
  - Debe haber superávit Financiero (país recibe inversión extranjera)
  - El déficit se financia con capital extranjero

- Si Cuenta Corriente es superávit (país exporta más que importa):
  - Cuenta Financiera es déficit (capital sale país)
  - El país invierte sus ahorros en el extranjero

### Ejemplo de Interpretación

**EE.UU. (típicamente):**
- Cuenta Corriente: Déficit de ~$400 billones (importa más que exporta)
- Cuenta Financiera: Superávit de ~$400 billones (extranjeros invierten en EE.UU.)
- Interpretación: EE.UU. consume más que produce, financiado por capital extranjero

**China (típicamente):**
- Cuenta Corriente: Superávit (exporta mucho)
- Cuenta Financiera: Déficit (invierte ahorros en extranjero)
- Interpretación: China produce más que consume, invierte ahorros en EE.UU. y otras economías

## 3. Determinantes de Balanza Comercial

### Enfoque Keynesiano

**Balanza Comercial = S - I + G - T**

Donde:
- S = Ahorro privado
- I = Inversión privada
- G = Gasto público
- T = Impuestos

**Reordenando:**
X - M = (S - I) + (T - G)

**Interpretación:**

Si (S - I) > 0: Ahorro privado > Inversión → Superávit comercial
Si (S - I) < 0: Ahorro privado < Inversión → Déficit comercial

Si (T - G) > 0: Superávit fiscal → Contribuye a superávit comercial
Si (T - G) < 0: Déficit fiscal → Contribuye a déficit comercial

**Ejemplo:**
- EE.UU. tiene déficit fiscal y déficit de ahorro privado
- Ambos contribuyen a déficit comercial
- Debe financiarse con capital extranjero

### Enfoque de Tipo de Cambio

**Tipo de Cambio Real:**
Mide competitividad de bienes domésticos vs. extranjeros.

**Tipo de Cambio Real (RER):**
RER = (P_doméstico / P_extranjero) × (Tipo de Cambio Nominal)

**Efecto en Comercio:**
- Si RER sube (moneda se aprecia realmente): Bienes domésticos más caros
  - X disminuye (menos competitivo)
  - M aumenta (extranjeros más baratos)
  - Déficit comercial

- Si RER baja (moneda se deprecia realmente): Bienes domésticos más baratos
  - X aumenta
  - M disminuye
  - Superávit comercial

## 4. Regímenes Cambiarios

### Tipo de Cambio Fijo

Gobierno fija valor de su moneda a otra moneda (típicamente dólar).

**Ventajas:**
- Reducida incertidumbre (certeza en transacciones)
- Ancla para inflación
- Facilita comercio

**Desventajas:**
- Pierde autonomía de política monetaria
- Debe acumular/gastar reservas para mantener paridad
- Rígido ante shocks económicos

**Ejemplo:** Muchos países Latino americanos en 1990s (Argentina 1:1 con dólar hasta 2001)

### Tipo de Cambio Flexible

La moneda flota libremente en mercado de divisas.

**Ventajas:**
- Autonomía de política monetaria
- Ajuste automático a shocks
- Refleja condiciones económicas

**Desventajas:**
- Volatilidad
- Incertidumbre para comercio
- Inflación puede aumentar (depreciación)

**Ejemplo:** EE.UU., Zona Euro, Canadá, Australia

### Tipo de Cambio Flotante Administrado

Banco Central interviene ocasionalmente para influir en tipo de cambio sin mantener paridad fija.

**Ejemplo:** China (aproximadamente)

## 5. Mundell-Fleming: La Trinidad Imposible

El **Modelo de Mundell-Fleming** muestra que un país no puede tener simultáneamente:
1. Tipo de cambio fijo
2. Libre movilidad de capitales
3. Política monetaria independiente

**Debe elegir 2 de 3.**

### Las Opciones

**Opción 1: Tipo Fijo + Libre Movilidad (EE.UU. pre-1971, Zona Euro):**
- Sin autonomía monetaria
- Política fiscal efectiva (desplaza demanda, mejora balanza comercial)
- Política monetaria inefectiva (dinero se pierde en defender tipo de cambio)

**Opción 2: Tipo Flexible + Libre Movilidad (EE.UU. post-1971, Canadá):**
- Autonomía monetaria
- Política fiscal menos efectiva (depreciación de moneda anula efecto)
- Política monetaria muy efectiva

**Opción 3: Tipo Fijo + Controles de Capital (China, Vietnam):**
- Autonomía monetaria (controles previenen salida de capital en respuesta a política)
- Política fiscal efectiva
- Pero restricción de libertad de capital (distorsiones)

## 6. Sostenibilidad de Déficits Comerciales

### ¿Puede un País Tener Déficit Comercial Persistente?

**Corto Plazo: Sí**
- País puede financiar déficit con préstamos
- O extranjeros invierten

**Largo Plazo: Depende**

**Sostenible si:**
- Déficit se debe a inversión productiva (IDE en fábricas)
- País está en crecimiento rápido (demanda de capital)
- Deuda externa manejable

**Insostenible si:**
- Déficit se debe a consumo excesivo (no productivo)
- Deuda externa crece más rápido que PIB
- Tasa de interés en ascenso (caro financiar)
- Confianza de inversionistas se erosiona

**Crisis de Cuenta Corriente:**
Cuando país con déficit persistente:
- Inversionistas pierden confianza
- Capital sale
- Moneda colapsa
- Ajuste doloroso

**Ejemplo:** Crisis asiáticas 1997-98 (Tailandia, Indonesia); crisis argentina 2001

## Conclusión

El comercio internacional proporciona ganancias por especialización según ventaja comparativa, pero distribuye beneficios de forma desigual. La balanza de pagos proporciona contabilidad de flujos comerciales y de capital. El tipo de cambio es crucial para competitividad. La trinidad imposible de Mundell-Fleming muestra que los países enfrentan trade-offs en política económica. Entender estas dinámicas es esencial para política comercial y financiera internacional.',
  NULL
);

INSERT INTO contenido_clase (modulo_id, orden, tipo, titulo, contenido, imagen_url)
VALUES (
  2,
  8,
  'guia',
  'Crecimiento Económico: Acumulación de Capital, Tecnología e Instituciones',
  '# Crecimiento Económico: Teoría y Determinantes

## Introducción

El crecimiento económico es aumento sostenido en producto por capita a lo largo del tiempo. Es determinante primario de nivel de vida a largo plazo. Un país que crece 3% anual vs. 1% anual exhibe diferencias enormes en nivel de vida después de décadas. Este módulo cubre teoría de crecimiento, desde Solow hasta teoría endógena moderna.

## 1. Hechos Estilizados sobre Crecimiento

### Disparidades Globales

**Variación Enorme en Niveles de Ingreso:**
- PIB per cápita EE.UU. (2023): ~$70,000
- PIB per cápita Chad (2023): ~$900
- Ratio: 77:1

**Variación en Tasas de Crecimiento:**
- Japón (1960-1990): 9% anual
- EE.UU. (1960-1990): 3% anual
- Argentina (1960-1990): 2% anual
- Chad (1960-2020): <1% anual

**Convergencia Parcial:**
- Algunos países pobres se alcanzado con ricos (Corea del Sur, Taiwan, Singapur)
- Otros quedaron atrás (muchos africanos)

### Hecho de Kaldor

**Economista Nicholas Kaldor** identificó "hechos estilizados" que cualquier teoría debe explicar:

1. Capital por trabajador crece con el tiempo
2. Tasa de retorno de capital es aproximadamente constante
3. Ratio capital/producto es aproximadamente constante
4. Tasa de crecimiento de capital y producto es similar
5. Hay variación importante entre países en tasas de crecimiento

## 2. Modelo de Crecimiento Neoclásico (Solow, 1956)

**Robert Solow** desarrolló modelo que explica crecimiento basado en acumulación de capital y crecimiento de población.

### Función de Producción Agregada

**Y = A·f(K, L)**

Donde:
- Y = Producto
- K = Capital
- L = Trabajo (Población)
- A = Productividad Total de Factores (PTF)

**Forma común (Cobb-Douglas):**
Y = A·K^α·L^(1-α)

Donde α es elasticidad de capital (típicamente 0.3).

### Dinámicas de Acumulación de Capital

**Inversión:**
I = sY (donde s = tasa de ahorro)

**Cambio de Capital:**
dK/dt = I - δK = sY - δK

Donde δ = tasa de depreciación.

**En términos por trabajador (k = K/L):**
dk/dt = sy - (δ + n)k

Donde n = tasa de crecimiento de población.

### Estado Estacionario de Solow

En equilibrio de largo plazo:
dk/dt = 0
sy* = (δ + n)k*

**Capital por Trabajador de Equilibrio:**
k* = [sA/(δ + n)]^(1/(1-α))

**Producción por Trabajador de Equilibrio:**
y* = Ak*^α

### Dinámicas de Transición

**Si k < k*:**
- sy > (δ + n)k (inversión > depreciación + crecimiento demográfico)
- Capital crece
- Tasa de crecimiento es alta

**Si k > k*:**
- sy < (δ + n)k (inversión < depreciación + crecimiento demográfico)
- Capital cae
- Tasa de crecimiento es negativa

**Economía converge a k* y crece a tasa n (igual a crecimiento de población).**

### Implicaciones de Solow

**Para Crecimiento de Largo Plazo:**
- Único determinante es crecimiento de población (y exógeno crecimiento de PTF)
- Cambios en tasa de ahorro s afectan nivel de capital, no tasa de crecimiento
- País pobre con s alta puede tener nivel de ingreso más alto que rico con s baja, pero crece a misma tasa

**Para Convergencia:**
- Países pobres con k < k* deberían crecer más rápido
- Debería haber convergencia entre países (todos convergen a misma tasa demográfica)
- **Predicción parcialmente confirmada:** Hay convergencia condicional (entre países similares), pero no convergencia absoluta

## 3. Residuo de Solow: Crecimiento de la Productividad

**Crecimiento de PTF:**
A_t aumenta a tasa g (exógeno en Solow)

**Crecimiento Total:**
dY/dt = αK·dK/dt + (1-α)L·dL/dt + K^α·L^(1-α)·dA/dt

Reescribiendo en tasas de crecimiento:
gy = α·gk + (1-α)·gL + gA

Donde g denota tasa de crecimiento.

**Residuo de Solow:**
gA = gy - α·gk - (1-α)·gL

**Observaciones Empíricas:**
- En EE.UU., gA explicó ~50% del crecimiento de 1900-2000
- Otros ~50% fue acumulación de capital y crecimiento laboral
- Pregunta: ¿Qué es gA exactamente? (Tecnología, educación, eficiencia, mejor organización, etc.)

## 4. Teoría de Crecimiento Endógeno

Solow dejaba PTF como "residuo misterioso". **Paul Romer (1986)** y **Robert Lucas (1988)** desarrollaron modelos donde crecimiento es endógeno (generado dentro del modelo, no exógeno).

### Modelo de Romer: Conocimiento como Factor

**Idea:** Conocimiento tiene características especiales:
- No rival: Mi uso de idea no impide tu uso
- Costo de replicación bajo: Una vez creada, fácil de copiar
- Genera externalidades positivas: Avances de uno benefician a otros

**Función de Producción:**
Y = A·K^α·L^(1-α)

Donde A (conocimiento) crece endógenamente con:
- I+D inversión
- Educación
- Learning-by-doing

**Tasa de Crecimiento Endógena:**
gY = g(I+D investment, education, etc.)

**Resultado:** Aumentar inversión en I+D permanentemente aumenta tasa de crecimiento permanentemente (a diferencia de Solow donde solo afecta nivel).

### Modelo de Lucas: Capital Humano

**Paul Lucas enfatiza:** Capital humano (educación, habilidades) es conductor principal de crecimiento.

**Función de Producción:**
Y = A·K^α·(e·L)^(1-α)

Donde e = nivel educativo promedio (capital humano per capita).

**Crecimiento de Capital Humano:**
de/dt = inversión en educación

**Implicación:** Países que invierten más en educación crecen más rápido.

**Evidencia Empírica:**
- Altamente correlacionado: Más educación → Crecimiento más alto
- Calidad de educación importante (no solo cantidad de años)

## 5. Instituciones y Crecimiento

**Teoría Institucional (North, Acemoglu, Robinson):**

Más reciente insight es que **instituciones son determinante crucial de crecimiento**.

### Tipos de Instituciones

**Instituciones Extractivas:**
- Gobernanza centralizada para beneficio de elites
- Propiedad insegura
- Bajo incentivo a innovar
- Resultado: Crecimiento lento

**Instituciones Inclusivas:**
- Estado de derecho
- Propiedad segura
- Mercados competitivos
- Acceso abierto a oportunidades

Resultado: Incentivos para innovación y crecimiento rápido.

### Evidencia

**Acemoglu y Robinson (2012):**
- Analizaron instituciones coloniales
- Colonias donde colonizadores se asentaron → Instituciones inclusivas
- Colonias con plantaciones → Instituciones extractivas
- Divergencia explícita entre paises con distintas instituciones históricas

**Conclusión:** Instituciones que protegen propiedad, permiten competencia y son accountable generan crecimiento sostenido.

## 6. Determinantes Empíricos de Crecimiento

### Análisis Multivariado (Regresiones)

Estudios empíricos identifican correlatos del crecimiento:

**Positivamente Correlacionado con Crecimiento:**
- Educación (capital humano)
- Inversión (como % de PIB)
- Apertura comercial
- Estabilidad política/instituciones
- Esperanza de vida (salud)
- Profundidad financiera

**Negativamente Correlacionado:**
- Inflación alta
- Inestabilidad política
- Corrupción
- Distorsiones de mercado

### Causalidad vs. Correlación

**Problema:** No está claro si estas correlaciones son causales.

Ejemplo: ¿Educación causa crecimiento? O ¿Países que crecen invierten más en educación?

**Métodos para inferir Causalidad:**
- Experimentos (difíciles de escala)
- Variables instrumentales (encuentrar determinantes "exógenos")
- Quasi-experimentos (explotar cambios de política)

## 7. Convergencia y Divergencia Global

### Convergencia β

Países pobres crecen más rápido que países ricos, lo que podría llevar a convergencia.

**Evidencia Mixta:**
- Convergencia entre países desarrollados (Club de Convergencia)
- Divergencia entre países desarrollados y muchos en desarrollo
- Algunos países en desarrollo convergen (East Asia), otros se quedan atrás (Africa)

### Explicación de Divergencia

**Porque algunos países sí convergen pero otros no?**

**Factores que Importan:**
1. **Instituciones:** Instituciones inclusivas vs. extractivas
2. **Políticas:** Macroeconomía estable, inversión en educación
3. **Geografía:** Acceso a mercados, clima, recursos
4. **Legado Histórico:** Colonialismo, esclavitud crearon diferencias iniciales
5. **Demografía:** Tasas altas de crecimiento poblacional ralentizan crecimiento per capita

## 8. Sostenibilidad y Crecimiento Verde

### Crecimiento Insostenible

Crecimiento basado en:
- Deforestación rápida
- Depleción de acuíferos
- Contaminación severa
- Cambio climático

**Problema:** Este crecimiento es "falso" porque consume capital natural.

### Crecimiento Verde

Crecimiento que:
- Mejora ingreso
- Mantiene capital natural
- Reduce contaminación

**Medidas:**
- Contabilidad ambiental (PIB verde)
- Precios de carbono
- Restricciones ambientales
- Inversión en energías renovables

## Conclusión

Crecimiento económico de largo plazo es determinado por acumulación de capital, crecimiento de capital humano, progreso tecnológico e instituciones. Solow proporciona baseline: crecimiento sostenido requiere progreso técnico. Teorías endógenas muestran cómo I+D y educación determinan crecimiento. Instituciones son crucial para crear incentivos para innovación. La divergencia global en ingresos refleja diferencias en capital (físico y humano), tecnología e instituciones. Entender estos determinantes es crucial para política de desarrollo.',
  NULL
);

