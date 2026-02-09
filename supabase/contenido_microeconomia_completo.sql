-- ============================================
-- MIGRACIÓN: CONTENIDO COMPLETO MICROECONOMÍA Y MACROECONOMÍA
-- Inserta lecciones estructuradas en la tabla contenido_clase
-- ============================================

-- Limpiar contenido anterior
DELETE FROM contenido_clase WHERE modulo_id IN (1, 2);

-- ============================================
-- MÓDULO 1: MICROECONOMÍA (21 lecciones)
-- ============================================

-- 1. Introducción y Autores
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  1,
  'Introducción y Autores Clave',
  '## Fundadores de la Microeconomía Moderna

La teoría microeconómica se construye sobre contribuciones de destacados economistas:

### **Teoría del Consumidor**
- **Vilfredo Pareto** (1848-1923): Curvas de indiferencia y optimalidad de Pareto
- **John R. Hicks** (1904-1989): Demandas compensadas (hicksianas)
- **Alfred Marshall** (1842-1924): Demandas ordinarias (marshallianas)
- **Paul A. Samuelson** (1915-2009): Preferencias reveladas

### **Teoría del Productor**
- **Charles W. Cobb & Paul H. Douglas** (1928): Función Cobb-Douglas
- **Antoine Augustin Cournot** (1838): Monopolio y oligopolio
- **Joseph Bertrand** (1883): Competencia en precios
- **Heinrich von Stackelberg** (1934): Liderazgo en oligopolio

### **Obras Fundamentales**
1. Marshall (1890): *Principles of Economics*
2. Samuelson (1947): *Foundations of Economic Analysis*
3. Varian (2010): *Intermediate Microeconomics*
4. Mas-Colell et al. (1995): *Microeconomic Theory*',
  NOW()
);

-- 2. Axiomas de Preferencias
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  2,
  'Axiomas de Preferencias del Consumidor',
  '## Fundamentos Teóricos del Comportamiento Consumidor

Los axiomas formalizan cómo los consumidores toman decisiones entre canastas de bienes.

### **Axioma 1: Completitud**
El consumidor puede comparar cualquier par de canastas (A, B, C).
- Siempre puede decir: A > B, B > A, o A ~ B (indiferente)

**Ejemplo:** Entre (2 manzanas, 3 naranjas) y (1 manzana, 4 naranjas), puedes ordenarlas.

### **Axioma 2: Transitividad**
Si A > B y B > C, entonces A > C (sin ciclos de preferencia).

**Ejemplo:** Si prefieres café > té, y té > agua, entonces café > agua.

### **Axioma 3: No Saciedad (Más es Mejor)**
Con más cantidad de un bien, mayor satisfacción, manteniendo lo demás igual.

**Ejemplo:** (5 manzanas, 3 naranjas) > (5 manzanas, 2 naranjas)

Estos axiomas garantizan que las preferencias sean **racionales y consistentes**.',
  NOW()
);

-- 3. Curvas de Indiferencia
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  3,
  'Curvas de Indiferencia y Tipos de Preferencias',
  '## Representación Gráfica de Preferencias

Una curva de indiferencia muestra combinaciones de bienes que dan **igual satisfacción**.

### **Propiedades Clave**
1. **Pendiente negativa:** Si consumes más X, debes consumir menos Y
2. **No se cruzan:** Violaría la transitividad
3. **Convexidad:** Refleja preferencia por variedad (no especialización)
4. **Más alejadas = Mayor utilidad**

### **Tipos de Preferencias**

**A) Sustitutos Perfectos (Lineales)**
- Fórmula: U(X,Y) = aX + bY
- Ejemplo: Café y té (intercambiables)
- RMS constante
- Gráfica: Líneas rectas paralelas

**B) Complementos Perfectos (Leontief)**
- Fórmula: U(X,Y) = min{aX, bY}
- Ejemplo: Zapatos izquierdos y derechos
- RMS indefinida (esquina de L)
- Se usan en proporciones fijas

**C) Cobb-Douglas (Estándar)**
- Fórmula: U(X,Y) = X^α · Y^β
- Ejemplo: U(X,Y) = X^0.5 · Y^0.5
- RMS decreciente
- Gráfica: Curvas suaves convexas',
  NOW()
);

-- 4. Función de Utilidad y Utilidad Marginal
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  4,
  'Función de Utilidad y Utilidad Marginal',
  '## Medición de Satisfacción

La **utilidad** representa la satisfacción derivada del consumo. Aunque ordinal (no cardinal), se modela matemáticamente.

### **Función de Utilidad**
Asigna un número a cada canasta:
```
U(X,Y) = función que depende de X e Y
```

**Ejemplo:** U(X,Y) = X^0.5 · Y^0.5

### **Utilidad Marginal (UMg)**
Cambio en utilidad total al consumir **una unidad adicional** de un bien.

```
UMgₓ = ∂U/∂X  (derivada parcial respecto a X)
UMgᵧ = ∂U/∂Y  (derivada parcial respecto a Y)
```

### **Ley de Utilidad Marginal Decreciente**
A medida que consumes más de un bien, cada unidad adicional **proporciona menos satisfacción**.

**Ejemplo:** Primera pizza excelente (+100 utilidad), quinta pizza mediocre (+20 utilidad).

### **Problema Básico**
U(X,Y) = 3X + 2Y
- UMgₓ = 3 (cada X adicional suma 3 de utilidad)
- UMgᵧ = 2 (cada Y adicional suma 2 de utilidad)
- **Utilidades marginales constantes** → Sustitutos perfectos',
  NOW()
);

-- 5. Relación Marginal de Sustitución (RMS)
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  5,
  'Relación Marginal de Sustitución (RMS)',
  '## Tasa de Sustitución entre Bienes

La **RMS** mide cuántas unidades de Y estás dispuesto a sacrificar por **una unidad adicional de X**, manteniendo utilidad constante.

### **Fórmula**
```
RMS = UMgₓ/UMgᵧ = -dY/dX

RMS es la PENDIENTE de la curva de indiferencia
```

### **Interpretación**
- RMS = 2: Por cada X adicional, renuncias a 2 unidades de Y
- RMS = 0.5: Por cada X adicional, renuncias a 0.5 unidades de Y

### **Relación con Tipos de Preferencias**

**Sustitutos Perfectos:** RMS CONSTANTE
- U(X,Y) = 3X + 2Y → RMS = 3/2 = 1.5
- Disposición a cambiar es siempre la misma

**Complementos Perfectos:** RMS INDEFINIDA (ángulo recto)
- U(X,Y) = min{2X, 3Y} → RMS no existe en equilibrio

**Cobb-Douglas:** RMS DECRECIENTE
- U(X,Y) = X^0.3 Y^0.7 → RMS = (0.3/0.7)(Y/X)
- A más X, menor disposición a ceder Y

### **Propiedad Importante**
La RMS es **homogénea de grado 0**: si duplicas X e Y proporcionalmente, RMS no cambia.',
  NOW()
);

-- 6. Restricción Presupuestaria
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  6,
  'Restricción Presupuestaria',
  '## Límite Económico del Consumidor

La restricción presupuestaria muestra todas las **combinaciones asequibles** de bienes con ingreso disponible.

### **Ecuación Fundamental**
```
M = Pₓ·X + Pᵧ·Y
```

Donde:
- M = Ingreso monetario total
- Pₓ = Precio del bien X
- Pᵧ = Precio del bien Y
- X, Y = Cantidades consumidas

### **Elementos Clave**

**Interceptos:**
- En X: X = M/Pₓ (si gasta TODO en X)
- En Y: Y = M/Pᵧ (si gasta TODO en Y)

**Pendiente:**
```
Pendiente = -Pₓ/Pᵧ
```
Representa el **costo de oportunidad**: para obtener 1 unidad más de X, renuncias a Pₓ/Pᵧ unidades de Y.

### **Cambios en la Restricción**

**Si sube Pₓ:**
- Intercepto X disminuye
- Línea rota hacia adentro
- Puedes comprar MENOS X

**Si aumenta M (ingreso):**
- Ambos interceptos aumentan
- Línea se desplaza hacia afuera
- Conjunto presupuestario más grande',
  NOW()
);

-- 7. Maximización de Utilidad (Demandas Marshallianas)
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  7,
  'Maximización de Utilidad y Demandas Marshallianas',
  '## Decisión Óptima del Consumidor

El consumidor elige la canasta que maximiza satisfacción, sujeto a su restricción presupuestaria.

### **Condición de Equilibrio Interior**
En óptimo, la **RMS iguala la relación de precios**:
```
UMgₓ/UMgᵧ = Pₓ/Pᵧ
```

**Interpretación:** El consumidor está dispuesto a cambiar bienes en la misma proporción que los precios los intercambian.

### **Procedimiento Paso a Paso**

**Paso 1:** Calcular UMgₓ y UMgᵧ

**Paso 2:** Igualar RMS = Pₓ/Pᵧ
- Despejar variable (Condición Fundamental)

**Paso 3:** Sustituir en restricción presupuestaria
- Resolver para obtener X* e Y*

### **Ejemplo Completo**
U(X,Y) = XY, Pₓ = 2, Pᵧ = 4, M = 40

1. UMgₓ = Y, UMgᵧ = X
2. Y/X = 2/4 → Y = X/2
3. 40 = 2X + 4(X/2) → X* = 10, Y* = 5

**Utilidad máxima:** U(10,5) = 50

### **Demandas Marshallianas Generales**
Para Cobb-Douglas U = X^α Y^β:
```
X* = [α/(α+β)] · (M/Pₓ)
Y* = [β/(α+β)] · (M/Pᵧ)
```

Proporción fija de ingreso gastada en cada bien.',
  NOW()
);

-- 8. Minimización de Gasto (Demandas Hicksianas)
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  8,
  'Minimización de Gasto y Demandas Hicksianas',
  '## Enfoque Dual: Minimizar Costo para Utilidad Dada

Mientras que Marshall maximiza utilidad dado ingreso, Hicks **minimiza gasto dado un nivel de utilidad**.

### **Problema de Minimización**
```
Minimizar: M = Pₓ·X + Pᵧ·Y
Sujeto a: U(X,Y) = Ū (utilidad fija)
```

### **Condición de Equilibrio**
Misma que en maximización:
```
UMgₓ/UMgᵧ = Pₓ/Pᵧ
```

Pero ahora la restricción es la **curva de indiferencia**, no la línea presupuestaria.

### **Relación entre Marshallianas e Hicksianas**

**Demandas Marshallianas:** x(P, M)
- Cantidad como función de precios e ingreso
- Observable en mercado
- Incluye efectos ingreso y sustitución

**Demandas Hicksianas:** h(P, Ū)
- Cantidad como función de precios y utilidad objetivo
- No observable directamente
- Aísla efecto sustitución puro

### **Ecuación de Slutsky**
Relaciona ambas demandas:
```
∂x/∂Pᵢ = ∂h/∂Pᵢ - x·(∂x/∂M)

Efecto Total = Efecto Sustitución + Efecto Ingreso
```

### **Aplicación**
Gasto mínimo para mantener utilidad constante ante cambios de precios.',
  NOW()
);

-- 9. Efectos Ingreso y Sustitución
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  9,
  'Efectos Ingreso y Sustitución',
  '## Descomposición del Efecto Precio

Cuando cambia el precio de un bien, el **efecto total** se descompone en dos:

### **Definiciones**

**Efecto Sustitución (ES):**
- Cambio en cantidad demandada manteniendo utilidad constante
- Refleja cambio en precios relativos
- Siempre negativo: ↑Precio → ↓Cantidad

**Efecto Ingreso (EI):**
- Cambio por variación en poder adquisitivo (real income)
- Puede ser negativo o positivo según tipo de bien
- ↑Precio → ↓Ingreso real → ↓Cantidad (normal) o ↑Cantidad (inferior)

**Efecto Total:** ET = ES + EI

### **Clasificación de Bienes**

**BIEN NORMAL:**
- ES < 0 (negativo)
- EI < 0 (negativo)
- ET < 0 (demanda con pendiente normal)
- Ejemplo: Carne, educación

**BIEN INFERIOR:**
- ES < 0 (negativo)
- EI > 0 (positivo)
- ET podría ser < 0 o > 0 según magnitudes

**BIEN GIFFEN** (caso especial inferior):
- ES < 0
- EI > 0 y |EI| > |ES|
- ET > 0 (demanda con pendiente POSITIVA)
- Paradoja: ↑Precio → ↑Cantidad demandada
- Ejemplo histórico: Papas en hambruna irlandesa

### **Ecuación de Slutsky**
```
∂x/∂Pₓ = ∂h/∂Pₓ - x(∂x/∂M)
         ↑           ↑
    Sustitución    Ingreso
```',
  NOW()
);

-- 10. Preferencias Reveladas
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  10,
  'Teoría de Preferencias Reveladas',
  '## Inferir Preferencias desde Comportamiento Observable

La **Teoría de Preferencias Reveladas** (Samuelson, 1938) permite estudiar preferencias sin asumir funciones de utilidad.

### **Principio Fundamental**
"Si un consumidor elige A cuando podría haber elegido B, entonces **A es revelada como preferida a B**."

### **Axioma Débil de Preferencia Revelada (ADPR)**

Si en la situación 1:
- El consumidor elige (X₁, Y₁)
- Podía haber elegido (X₂, Y₂) porque era asequible

Entonces **NO puede elegir (X₂, Y₂) en situación 2** si (X₁, Y₁) es asequible a esos precios (contradicción).

### **Prueba de Consistencia**

**Datos:** Dos observaciones de compra
- Situación 1: Precios (P¹ₓ, P¹ᵧ), compra (X₁, Y₁)
- Situación 2: Precios (P²ₓ, P²ᵧ), compra (X₂, Y₂)

**Verificación ADPR:**
1. ¿Era (X₂, Y₂) asequible en situación 1?
   - P¹ₓ·X₂ + P¹ᵧ·Y₂ ≤ P¹ₓ·X₁ + P¹ᵧ·Y₁?
   - Si NO → Sin violación

2. ¿Era (X₁, Y₁) asequible en situación 2?
   - P²ₓ·X₁ + P²ᵧ·Y₁ ≤ P²ₓ·X₂ + P²ᵧ·Y₂?
   - Si SÍ → VIOLACIÓN (contradicción)

### **Implicaciones Prácticas**
- Permite estimar preferencias con solo datos de precio y cantidad
- No requiere asumir forma funcional de utilidad
- Base para análisis empírico de comportamiento consumidor',
  NOW()
);

-- 11. Índices de Precios
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  11,
  'Índices de Precios: Laspeyres, Paasche y Fisher',
  '## Medición de Cambios de Precios

Los índices cuantifican cómo cambian los precios **ponderados** por cantidades.

### **Índice de Laspeyres** (Laspeyres, 1871)
Usa cantidades del **período base** como ponderación:
```
IL = [ΣP₁Q₀ / ΣP₀Q₀] × 100
```

**Características:**
- Tiende a **SOBREESTIMAR** inflación
- No considera sustitución de bienes
- Cálculo simple (no necesita datos nuevos)
- Usado en IPC (Índice de Precios al Consumidor)

### **Índice de Paasche** (Paasche, 1874)
Usa cantidades del **período actual** como ponderación:
```
IP = [ΣP₁Q₁ / ΣP₀Q₁] × 100
```

**Características:**
- Tiende a **SUBESTIMAR** inflación
- Refleja sustitución real de consumidores
- Requiere datos actuales (más costoso)
- Más preciso pero difícil de recopilar

### **Índice de Fisher** (Fisher, 1922)
Media geométrica de Laspeyres y Paasche:
```
IF = √(IL × IP)
```

**Ventajas:**
- Equilibra sesgos de ambos índices
- **"Índice ideal"** de Fisher
- Satisface prueba de reversibilidad temporal
- Mejor aproximación a índice "verdadero"

### **Ejemplo Comparativo**
| Índice | Fórmula | Resultado | Sesgo |
|--------|---------|-----------|-------|
| Laspeyres | Con Q₀ | 120.9% | Sobreestima |
| Paasche | Con Q₁ | 185.7% | Subestima |
| Fisher | Media geométrica | 202.5% | Balanceado |

Laspeyres > Fisher > Paasche (típicamente)',
  NOW()
);

-- 12. Consumo bajo Incertidumbre
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  12,
  'Consumo bajo Incertidumbre y Utilidad Esperada',
  '## Decisiones cuando Resultados son Inciertos

Cuando los resultados no son seguros, el consumidor se basa en **utilidades esperadas**.

### **Teorema von Neumann-Morgenstern** (1944)
Si las preferencias satisfacen 4 axiomas (completitud, transitividad, continuidad, independencia), existe una función de utilidad U tal que el consumidor elige la lotería con mayor **utilidad esperada**.

### **Utilidad Esperada**
```
E(U) = Σ [probabilidad × utilidad]

Ejemplo: 60% de ganar $2,000 (U=110) + 40% de ganar $3,000 (U=140)
E(U) = 0.6(110) + 0.4(140) = 66 + 56 = 122
```

### **Conceptos Clave**

**Aversión al Riesgo:**
- Función de utilidad cóncava: U''''(W) < 0
- Prefiere certeza a lotería con igual valor esperado
- Ejemplo: Prefiere $1,000 seguro a 50% de $2,000

**Premio Equivalente Cierto (PEC):**
- Cantidad segura que da misma utilidad que lotería
- U(PEC) = E(U)
- Diferencia con valor esperado = Prima de riesgo

**Elasticidad-Riesgo de Aversión:**
```
r(W) = -U''''(W)/U''(W)
```
Mide cuánta aversión al riesgo tiene (mayor r = más adverso).

### **Extensiones Modernas**
- **Teoría Prospectiva** (Kahneman & Tversky, 1979): Anomalías en decisiones (ilusión de control, sesgo de anclaje)
- Consumidores no siempre siguen utilidad esperada
- Importancia de cómo se presentan alternativas',
  NOW()
);

-- 13. Función de Producción
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  13,
  'Función de Producción',
  '## Transformación de Factores en Producto

La **función de producción** relaciona cantidad de factores (inputs: K, L) con cantidad de producto (output).

### **Notación General**
```
Q = f(K, L)
```
- Q = Output (cantidad producida)
- K = Capital (máquinas, equipos)
- L = Trabajo (horas-persona)

### **Tipos de Funciones de Producción**

**1. COBB-DOUGLAS** (Cobb & Douglas, 1928)
```
Q = AK^α L^β
```
- A = Factor de productividad total
- α, β = Elasticidades
- **Ventaja:** Fácil de estimar, flexible, común en aplicaciones
- Ejemplo: Q = 10K^0.25 L^0.75

**2. FUNCIÓN LINEAL** (Sustitutos perfectos)
```
Q = aK + bL
```
- Factores completamente sustituibles
- RMST constante
- Poco realista pero útil teóricamente
- Ejemplo: Q = 5K + 8L

**3. FUNCIÓN LEONTIEF** (Complementos perfectos)
```
Q = min{aK, bL}
```
- Factores se usan en proporciones FIJAS
- Sin posibilidad de sustitución
- Realista en algunos procesos
- Ejemplo: Q = min{2K, 3L}

### **Propiedades Importantes**
- **Homogeneidad:** Si multiplicas K y L por t, Q multiplica por t^(α+β)
- **Rendimientos crecientes:** α+β > 1
- **Rendimientos constantes:** α+β = 1
- **Rendimientos decrecientes:** α+β < 1',
  NOW()
);

-- 14. Productividad Marginal y Media
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  14,
  'Productividad Marginal y Media',
  '## Medidas de Eficiencia Productiva

### **Producto Marginal (PMg)**
Cambio en **producto total** al usar **una unidad adicional** de factor.

```
PMgₗ = ∂Q/∂L  (marginal del trabajo)
PMgₖ = ∂Q/∂K  (marginal del capital)
```

**Interpretación:** Producto que genera el último trabajador contratado.

**Ley de Producto Marginal Decreciente:**
En corto plazo (con capital fijo), el PMg del trabajo **disminuye** conforme crece L.

### **Producto Medio (PMe)**
Producto **promedio** por unidad de factor.

```
PMeₗ = Q/L  (producto por trabajador)
PMeₖ = Q/K  (producto por unidad de capital)
```

### **Relación entre PMg y PMe**

| Situación | PMg | PMe | Implicación |
|-----------|-----|-----|-------------|
| PMg > PMe | ↑ | ↑ | PMe creciente |
| PMg = PMe | - | máx | PMe en máximo |
| PMg < PMe | ↓ | ↓ | PMe decreciente |

### **Ejemplo Numérico**
Q = 50L + 40L² - 5L³

```
PMeₗ = Q/L = 50 + 40L - 5L²
PMgₗ = ∂Q/∂L = 50 + 80L - 15L²
```

- Con L=1: PMe = 85, PMg = 115 (PMg > PMe)
- Con L=3: PMe = 155, PMg = 155 (PMg = PMe)
- Con L=5: PMe = 150, PMg = 100 (PMg < PMe)

### **Aplicación Práctica**
La empresa contrata hasta que PMg = w (salario).',
  NOW()
);

-- 15. Isocuantas y RMST
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  15,
  'Isocuantas y Relación Marginal de Sustitución Técnica (RMST)',
  '## Combinaciones de Factores para Mismo Nivel de Producción

Una **isocuanta** muestra todas las combinaciones de K y L que producen el **mismo output Q**.

### **Concepto de Isocuanta**
```
Q = f(K, L) = Q̄ (cantidad constante)
```

**Propiedades:**
- Pendiente NEGATIVA (trade-off entre factores)
- NO se cruzan (violaría la lógica)
- Convexas al origen (preferencia por balance)
- Más alejadas del origen = mayor producción

### **Relación Marginal de Sustitución Técnica (RMST)**
Cantidad de capital que se puede sustituir por **una unidad adicional de trabajo**, manteniendo producción constante.

```
RMST = PMgₗ/PMgₖ = -dK/dL

RMST es la PENDIENTE de la isocuanta
```

**Interpretación:** Si RMST = 2, renuncias a 2 máquinas por 1 trabajador adicional sin cambiar output.

### **Relación con Función de Producción**

**Cobb-Douglas:** Q = AK^α L^β
```
RMST = (α/β) × (K/L)
```
- Decreciente: A más L, menor RMST
- Refleja sustitución imperfecta

**Leontief:** Q = min{aK, bL}
```
RMST = indefinida en codo (ángulo recto)
      = 0 arriba del codo
      = ∞ abajo del codo
```

**Lineal:** Q = aK + bL
```
RMST = a/b (CONSTANTE)
```
- Sustitución perfecta

### **Elasticidad de Sustitución**
```
σ = (% cambio en K/L) / (% cambio en RMST)
```
- σ = 1 para Cobb-Douglas
- σ > 1: Fácil sustitución
- σ < 1: Difícil sustitución',
  NOW()
);

-- 16. Rendimientos a Escala
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  16,
  'Rendimientos a Escala',
  '## Comportamiento del Producto ante Cambios Equiproporcionales de Factores

**Rendimientos a escala** miden cómo varía la producción cuando **todos los factores** aumentan en la misma proporción.

### **Clasificación**

**PARA COBB-DOUGLAS:** Q = AK^α L^β

Suma de exponentes: S = α + β

```
S > 1 → RENDIMIENTOS CRECIENTES a escala
S = 1 → RENDIMIENTOS CONSTANTES a escala
S < 1 → RENDIMIENTOS DECRECIENTES a escala
```

### **Prueba Matemática**
Si multiplicas todos los factores por t:

```
Q(tK, tL) = A(tK)^α(tL)^β
          = A·t^α·K^α·t^β·L^β
          = t^(α+β)·Q(K,L)
          = t^S·Q
```

Si S > 1: Q se multiplica por más que t (crecientes).

### **Ejemplos**

| Función | α+β | Tipo |
|---------|-----|------|
| Q = K^0.4 L^0.6 | 1.0 | Constantes |
| Q = K^0.5 L^0.5 | 1.0 | Constantes |
| Q = K^0.3 L^0.4 | 0.7 | Decrecientes |
| Q = K + 2L | 1.0 | Constantes (lineal) |
| Q = K² + L² | 2.0 | Crecientes |

### **Interpretación Económica**

**Crecientes:** Eficiencias por escala (automatización, especialización)
- Ejemplo: Red de distribución

**Constantes:** Firma replica procesos (estándar en LP)
- Duplicar inputs → Duplicar output

**Decrecientes:** Costos administrativos (control, coordinación)
- Difícil gestionar muy grande

### **Implicación para Largo Plazo**
Rendimientos constantes a escala → Competencia perfecta viable
Rendimientos crecientes → Monopolio natural (un productor eficiente)',
  NOW()
);

-- 17. Minimización de Costos
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  17,
  'Minimización de Costos del Productor',
  '## Producción Eficiente: Elección Óptima de Factores

El productor elige la combinación de K y L que **minimiza costo** para producir cantidad dada.

### **Problema de Optimización**
```
Minimizar: CT = w·L + r·K
Sujeto a: Q = f(K, L) = Q̄
```

Donde:
- w = salario (precio del trabajo)
- r = renta del capital (tasa de interés de largo plazo)

### **Condición de Equilibrio**
La RMST debe igualar la relación de precios:

```
RMST = w/r

PMgₗ/PMgₖ = w/r
```

**Interpretación:** Productividad por dólar debe ser igual en ambos factores.

### **Procedimiento Paso a Paso**

**Paso 1:** Calcular PMgₗ y PMgₖ

**Paso 2:** Igualar RMST = w/r
```
PMgₗ/PMgₖ = w/r
```
Despejar K en función de L → **Condición Fundamental**

**Paso 3:** Sustituir en restricción de cantidad
```
Q = f(K(L), L)
```
Resolver para L* y K*

**Paso 4:** Calcular costo total
```
CT* = w·L* + r·K*
```

### **Ejemplo**
Q = 10K^0.25 L^0.25, w = 2, r = 4, Q* = 100

1. PMgₗ = 2.5K^0.25/L^0.75, PMgₖ = 2.5L^0.25/K^0.75
2. RMST = K/L = w/r = 2/4 = 0.5 → K = L/2
3. 100 = 10(L/2)^0.25·L^0.25 = 10·(L/2)^0.25·L^0.25
4. Resolver para L*, luego K*, luego CT*',
  NOW()
);

-- 18. Maximización de Beneficios
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  18,
  'Maximización de Beneficios',
  '## Decisión de Producción del Empresario

El productor elige cantidad que **maximiza beneficio** (utilidad económica):

```
π = Ingresos Totales - Costos Totales
π = P·Q - CT(Q)
```

### **Condiciones de Maximización**

**COMPETENCIA PERFECTA:**
La empresa es **tomadora de precios** (no afecta precio de mercado).

Condición de equilibrio:
```
P = CMg (Precio = Costo Marginal)
```

Donde CMg = ∂CT/∂Q

**Logro:** Empresa produce donde el precio iguala su costo de producir unidad adicional.

**MONOPOLIO:**
La empresa es **fijadora de precios** (enfrenta demanda de mercado con pendiente negativa).

Condición de equilibrio:
```
IMg = CMg (Ingreso Marginal = Costo Marginal)
```

Donde IMg = ∂IT/∂Q = P + Q(dP/dQ) < P

**Logro:** Empresa produce donde ingreso de unidad adicional iguala su costo.

### **Diferencia Clave**

| Estructura | Condición | P vs CMg | Beneficio |
|-----------|-----------|----------|-----------|
| Competencia | P = CMg | P = CMg | Normal (cero económico) |
| Monopolio | IMg = CMg | P > CMg | Supernormal |

En monopolio, el precio **supera** el costo marginal, generando **beneficio económico**.

### **Ejemplo: Competencia**
CT = 100 + 10Q + Q², P = $50

```
CMg = 10 + 2Q = 50
Q* = 20
IT = 50(20) = 1,000
CT = 100 + 200 + 400 = 700
π = 1,000 - 700 = 300
```

### **Ejemplo: Monopolio**
Demanda: P = 120 - Q, CT = 200 + 2Q²

```
IT = (120-Q)Q = 120Q - Q²
IMg = 120 - 2Q = CMg = 4Q
Q* = 20, P* = 100
π = IT - CT = 2,000 - 1,000 = 1,000
```',
  NOW()
);

-- 19. Estructuras de Mercado
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'guia',
  19,
  'Estructuras de Mercado: Competencia, Monopolio, Oligopolio',
  '## Clasificación de Mercados por Número de Competidores

### **COMPETENCIA PERFECTA**
**Características:**
- Muchos compradores y vendedores
- Producto homogéneo (idénticos)
- Libre entrada y salida
- Información perfecta
- Ningún productor afecta precio

**Equilibrio:** P = CMg (máxima eficiencia)

**Bienestar:** Pareto eficiente (Primer Teorema del Bienestar, Arrow-Debreu 1951)

### **MONOPOLIO**
**Características:**
- Un solo vendedor
- No hay sustitutos cercanos
- Barreras a la entrada
- Puede fijar precios

**Equilibrio:** IMg = CMg, P > CMg

**Bienestar:** Pérdida de eficiencia, precio más alto, cantidad menor

**Poder de mercado:** Capacidad de fijar precio por encima de CMg

### **OLIGOPOLIO** (Pocos competidores)

**MODELO DE COURNOT** (Cournot, 1838)
- Empresas compiten en **cantidades**
- Decisiones simultáneas
- Cada empresa anticipa cantidad de rivales
- Equilibrio de Nash-Cournot

**Ejemplo:** 2 empresas, Demanda: P = 10 - (q₁+q₂)
- Cada empresa resuelve: max πᵢ = [10-(qᵢ+q₋ᵢ)]qᵢ
- Equilibrio: q₁* = q₂* = 10/3

**MODELO DE BERTRAND** (Bertrand, 1883)
- Empresas compiten en **precios**
- Productos homogéneos
- Paradoja de Bertrand: P = CMg (igual que competencia)
- Incluso con 2 empresas

**MODELO DE STACKELBERG** (Stackelberg, 1934)
- Líder mueve primero, elegir cantidad
- Seguidor observa y responde
- Líder obtiene ventaja estratégica
- Mayor cantidad que Cournot

**Comparación:**

| Modelo | Cantidad | Precio | Beneficio |
|--------|----------|--------|-----------|
| Competencia | Mayor | Menor | Normal |
| Cournot | Medio | Medio | Medio |
| Stackelberg | Menos | Mayor | Mayor (líder) |
| Cartel | Mínimo | Máximo | Máximo (conjunto) |
| Bertrand | Mayor | Menor | Normal |',
  NOW()
);

-- 20. Problemas Resueltos: Consumidor
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'informe',
  20,
  'Problemas Resueltos del Consumidor: Maximización y Preferencias',
  '## Banco de Problemas Modelo

### **Problema 1: Maximización Cobb-Douglas**
U(X,Y) = X^0.6 Y^0.4, Pₓ=3, Pᵧ=2, M=120

**Solución:**
1. UMgₓ = 0.6X^(-0.4)Y^0.4, UMgᵧ = 0.4X^0.6Y^(-0.6)
2. RMS = (0.6/0.4)(Y/X) = 1.5(Y/X) = 3/2
3. Y/X = 1 → Y = X
4. 120 = 3X + 2X = 5X → X*=24, Y*=24
5. U*=24^1 = 24

### **Problema 2: Sustitutos Perfectos**
U(X,Y) = 2X + 3Y, Pₓ=1, Pᵧ=2, M=10

**Solución:**
- UMgₓ/Pₓ = 2/1 = 2
- UMgᵧ/Pᵧ = 3/2 = 1.5
- X mejor compra → Solución esquina
- X*=10, Y*=0, U*=20

### **Problema 3: Complementos Perfectos**
U(X,Y) = min{X, 2Y}, Pₓ=2, Pᵧ=3, M=30

**Solución:**
- Proporción: X = 2Y
- 30 = 2(2Y) + 3Y = 7Y
- Y*=30/7≈4.3, X*=60/7≈8.6

### **Problema 4: Efectos de Cambio de Precio**
U(X,Y) = XY, Pₓ:2→4, Pᵧ=4, M=40

**Inicial:** Y/X = 1/2, X*=5, Y*=5, U*=25
**Final:** Y/X = 1, X**=5, Y**=5, U**=25

Paradoja: Cantidad no cambió, precio sí. (RMS cambió pero relación precios cambió proporcionalmente)

### **Problema 5: Demanda Hicksiana**
U(X,Y) = XY, Pₓ=4, Pᵧ=2, minimizar gasto para U=50

**Solución:**
- Condición: Y/X = 4/2 → Y = 2X
- En U=50: X(2X) = 50 → X=5, Y=10
- Gasto mínimo: 4(5) + 2(10) = 40',
  NOW()
);

-- 21. Problemas Resueltos: Productor
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  1,
  'informe',
  21,
  'Problemas Resueltos del Productor: Costos y Maximización',
  '## Casos de Aplicación Empresarial

### **Problema 1: Minimización de Costos Cobb-Douglas**
Q = 10K^0.25 L^0.25, w=2, r=4, Q*=100

**Solución:**
1. PMgₗ/PMgₖ = K/L = w/r = 1/2
2. K = L/2
3. 100 = 10(L/2)^0.25 L^0.25 = 10·(L²/2)^0.25
4. L* = 250, K* = 125
5. CT* = 2(250) + 4(125) = 1,000

### **Problema 2: Beneficios en Competencia**
CT = 100 + 10Q + Q², P=50

**Solución:**
- CMg = 10 + 2Q = 50 → Q*=20
- IT = 50(20) = 1,000
- CT = 100 + 200 + 400 = 700
- π* = 300

### **Problema 3: Monopolio**
P = 120 - Q, CT = 200 + 2Q²

**Solución:**
- IT = 120Q - Q², IMg = 120 - 2Q
- CMg = 4Q
- IMg = CMg: 120 - 2Q = 4Q → Q*=20
- P* = 100
- π* = 2,000 - 1,000 = 1,000
- Exceso: 1,000 vs 300 en competencia

### **Problema 4: Oligopolio Cournot**
Demanda: P = 10 - (q₁+q₂), CMg₁=CMg₂=0

**Solución:**
- Curva reacción 1: q₁ = 5 - q₂/2
- Curva reacción 2: q₂ = 5 - q₁/2
- Equilibrio: q₁*=q₂*=10/3, P*=10/3

### **Problema 5: Rendimientos a Escala**
Q = 5K^0.3 L^0.4

**Análisis:**
- α+β = 0.7 < 1 → Rendimientos DECRECIENTES
- Si K,L se duplican: Q'' = 2^0.7·Q = 1.62Q
- Producción aumenta solo 62% (menos que 100%)',
  NOW()
);

-- ============================================
-- MÓDULO 2: MACROECONOMÍA (8 lecciones)
-- ============================================

-- 1. PIB y Métodos de Cálculo
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  2,
  'guia',
  1,
  'PIB y Métodos de Cálculo',
  '## Medición de la Actividad Económica Total

El **Producto Interno Bruto (PIB)** mide el valor de **todos los bienes y servicios finales** producidos en una economía durante un período.

### **Características Clave**
- **Interno:** Dentro de fronteras del país
- **Bruto:** Sin restar depreciación
- **Final:** Solo bienes listos para consumo (evita doble conteo)

### **Tres MÉTODOS DE CÁLCULO**

**1. ENFOQUE DEL GASTO**
```
PIB = C + I + G + (X - M)
```
- C = Consumo privado
- I = Inversión privada
- G = Gasto del gobierno
- (X-M) = Exportaciones netas

**Ejemplo:** Si C=700, I=200, G=150, X=100, M=50
```
PIB = 700 + 200 + 150 + (100-50) = 1,100
```

**2. ENFOQUE DEL INGRESO**
```
PIB = W + R + i + π
```
- W = Salarios (rentas del trabajo)
- R = Rentas del capital (tierra)
- i = Intereses (capital prestado)
- π = Beneficios (ganancia empresarial)

Los ingresos distribuidos deben igualar el gasto total.

**3. ENFOQUE DEL VALOR AÑADIDO**
```
PIB = Σ Valor Añadido en cada etapa
```

Suma el valor que cada etapa productiva **agrega**, evitando doble conteo.

**Ejemplo:** Pan
- Agricultor cultiva trigo → Valor añadido = $1
- Molinero transforma en harina → Valor añadido = $2
- Panadero elabora pan → Valor añadido = $3
- **PIB = $1 + $2 + $3 = $6** (no $1+$2+$3+$6)

### **Medidas Relacionadas**
- **PIB nominal:** A precios corrientes del año
- **PIB real:** A precios de año base (ajustado por inflación)
- **PNB:** Incluye ingresos de residentes en exterior
- **PIB per cápita:** PIB/Población',
  NOW()
);

-- 2. Modelo IS-LM
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  2,
  'guia',
  2,
  'Modelo IS-LM',
  '## Equilibrio Simultáneo de Mercados Real y Monetario

El **modelo IS-LM** (Hicks, 1937) integra decisiones de gasto (mercado de bienes) y decisiones monetarias (mercado de dinero).

### **CURVA IS (Inversión-Ahorro)**
Relación entre tasa de interés y nivel de ingreso donde **mercado de bienes está en equilibrio**.

```
IS: S = I  o equivalentemente  Y = C(Y) + I(r) + G
```

Donde inversión depende inversamente de tasa de interés.

**Propiedades IS:**
- Pendiente NEGATIVA: Mayor r → Menor I → Menor Y
- Desplazamiento: Cambios en G o preferencias de consumo

### **CURVA LM (Liquidez-Dinero)**
Relación entre tasa de interés y nivel de ingreso donde **mercado de dinero está en equilibrio**.

```
LM: M/P = L(Y, r)
```

Donde:
- M/P = Oferta real de dinero (fija)
- L = Demanda de dinero (aumenta con Y, disminuye con r)

**Propiedades LM:**
- Pendiente POSITIVA: Mayor Y → Mayor demanda de dinero → Mayor r
- Desplazamiento: Cambios en M o P

### **EQUILIBRIO IS-LM**
Intersección de ambas curvas:
```
Y*, r* = niveles de equilibrio
```

**Interpretación:**
- Ingreso Y*: Cantidad de bienes/servicios producidos
- Tasa r*: Precio del dinero que equilibra oferta y demanda

### **EFECTOS DE POLÍTICA ECONÓMICA**

**Política Fiscal Expansiva** (↑G):
- IS se desplaza derecha
- Y aumenta, r aumenta
- Efecto crowding-out: parte de gasto público sustituye inversión privada

**Política Monetaria Expansiva** (↑M):
- LM se desplaza derecha
- Y aumenta, r disminuye
- Relación más directa entre M e Y

### **Limitaciones**
- Precios fijos (solo relevante corto plazo)
- Expectativas no modeladas
- Dinero solo para transacciones',
  NOW()
);

-- 3. Modelo Mundell-Fleming
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  2,
  'guia',
  3,
  'Modelo Mundell-Fleming',
  '## Equilibrio en Economía Abierta

El **modelo Mundell-Fleming** (Fleming 1962, Mundell 1963) extiende IS-LM a economía abierta con flujos de capital internacional.

### **NUEVA COMPONENTE: SALDO DE CUENTA CORRIENTE**
```
CA = X(e) - M(Y)
```
- X = Exportaciones (sensibles al tipo de cambio e)
- M = Importaciones (sensibles al ingreso Y)
- Si e ↑ (moneda fuerte) → X ↓, M ↑

### **EQUILIBRIO DE BALANZA DE PAGOS**
```
BP = CA + KA = 0  (saldo neto cero en largo plazo)
```
- CA = Cuenta corriente (bienes, servicios, rentas)
- KA = Cuenta financiera (inversión, capital)

**Movilidad de capital perfecta:**
- Si r > r*, entra capital
- Si r < r*, sale capital
- Largo plazo: r = r* (tasa mundial)

### **EL TRILEMMA IMPOSIBLE** (Imposible Trinity)
Imposible simultaneamente:
1. **Tipo de cambio fijo**
2. **Movilidad perfecta de capital**
3. **Autonomía en política monetaria**

Solo se pueden lograr DOS de tres:

**Opción A:** Tipo fijo + Movilidad capital → Sin autonomía monetaria
- Ejemplo: Patrón oro, Eurozona

**Opción B:** Tipo flexible + Movilidad capital → Autonomía monetaria
- Ejemplo: Régimen flotante moderno (USA, UE)

**Opción C:** Tipo fijo + Control de capital → Autonomía monetaria
- Ejemplo: Algunos mercados emergentes

### **POLÍTICA FISCAL EN ECONOMÍA ABIERTA**
Con tipo flexible y movilidad de capital:

**Expansión fiscal (↑G):**
- r sube → Atrae capital
- Tipo de cambio se aprecia
- Exportaciones caen
- Efecto crowding-out total

**Resultado:** Expansión fiscal ineficaz con flotación y movilidad de capital

### **POLÍTICA MONETARIA EN ECONOMÍA ABIERTA**
Con tipo flexible y movilidad de capital:

**Expansión monetaria (↑M):**
- r cae → Capital sale
- Tipo de cambio se deprecia
- Exportaciones suben, importaciones bajan
- Ingreso aumenta

**Resultado:** Política monetaria muy efectiva',
  NOW()
);

-- 4. Oferta y Demanda Agregada
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  2,
  'guia',
  4,
  'Oferta y Demanda Agregada',
  '## Determinantes de Precio y Cantidad Macroeconómicos

### **DEMANDA AGREGADA (DA)**
Cantidad total de bienes/servicios que se desean comprar a cada nivel de precios.

```
DA = C(Y-T) + I(r) + G + NX(e)
```

**Relación negativa P ↔ Y:**
1. Efecto Pigou: P ↑ → Riqueza real ↓ → C ↓
2. Efecto Keynes: P ↑ → Demanda dinero ↑ → r ↑ → I ↓
3. Efecto sustitución internacional: P ↑ → Competitividad ↓ → NX ↓

**Desplazamientos de DA:**
- Fiscal: ↑G o ↓T → DA derecha
- Monetaria: ↑M → DA derecha
- Expectativas: Optimismo → DA derecha

### **OFERTA AGREGADA (OA)**

**CORTO PLAZO (OACT):**
- Relación positiva P ↔ Y
- Salarios y precios **rígidos**
- Empresas producen más si P sube (márgenes ganan)
- Curva con pendiente positiva

```
OACT: Y = Ȳ + a(P - P^e)
```
Donde Ȳ = producto natural, P^e = precios esperados

**LARGO PLAZO (OALP):**
- Relación **vertical** en Y = Ȳ
- Salarios y precios totalmente flexibles
- Economía regresa a nivel natural
- Dinero neutro a largo plazo

**Transición:**
1. Shock aumenta P (corto plazo: Y sube)
2. Trabajadores reclaman salarios mayores
3. Costos empresariales suben
4. Producción cae, OACT sube
5. Retorno a Ȳ, pero P permanentemente mayor

### **EQUILIBRIO MACROECONÓMICO**

**Corto plazo:** DA intersecta OACT → (P*, Y*)
**Largo plazo:** DA intersecta OALP → (P**, Ȳ)

### **SHOCKS**

**Demanda positivo (+DA):**
- CP: Inflación + Desempleo ↓
- LP: Solo inflación, Y = Ȳ

**Oferta negativo (-OACT):**
- CP: Inflación + Desempleo ↑ (Stagflación)
- LP: Retorno gradual',
  NOW()
);

-- 5. Inflación y Curva de Phillips
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  2,
  'guia',
  5,
  'Inflación y Curva de Phillips',
  '## Trade-off entre Inflación y Desempleo

La **Curva de Phillips** (Phillips 1958) documenta relación inversa entre inflación de salarios y tasa de desempleo.

### **CURVA DE PHILLIPS ORIGINAL (Corto Plazo)**
```
π = ā - b·u

Donde:
π = inflación de salarios
u = tasa de desempleo
```

**Interpretación:**
- Mayor desempleo → Presión salarial menor → Inflación menor
- Desempleo bajo → Salarios suben rápido → Inflación alta

**Trade-off:** Autoridades pueden elegir combinación (π, u)
- Menos desempleo CUESTA más inflación
- Menos inflación CUESTA más desempleo

### **INCORPORACIÓN DE EXPECTATIVAS**
```
π = π^e - b·u + v

Donde v = shock de oferta (petróleo, etc.)
```

**Cambio crucial:** Inflación depende de inflación esperada πᵉ

**Implicación de Friedman-Phelps (1968):**
- LP: NAIRU (tasa desempleo no acelerador de inflación)
- No hay trade-off permanente
- π* = π^e cuando u = NAIRU

### **EVOLUCIÓN EMPÍRICA**

**1950s-60s:** Phillips inversa clara, trade-off aprovechable

**1970s:** STAGFLACIÓN (inflación + desempleo alto)
- Shocks de petróleo
- Phillips se desplazó
- Trade-off desapareció temporalmente

**1980s-90s:** Curvas más planas
- Credibilidad anti-inflacionaria
- Inflación esperada baja

### **CURVA DE PHILLIPS AUMENTADA**
```
π - π^e = -b(u - u*)
```

- Lado izquierdo: Sorpresa inflacionaria
- Solo desvíos de expectativas afectan desempleo
- u* = NAIRU (Natural Rate of Unemployment)

### **IMPLICACIONES POLÍTICAS**
- **CP:** Existe trade-off π-u explotable
- **LP:** No hay trade-off, solo u*
- **Credibilidad importa:** Si central banco es creíble, πᵉ baja

**Costo de desinflación:** Desempleo temporal elevado durante transición',
  NOW()
);

-- 6. Modelo de Solow
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  2,
  'guia',
  6,
  'Modelo de Crecimiento de Solow',
  '## Determinantes del Crecimiento Económico de Largo Plazo

El **modelo de Solow** (Solow 1956, Premio Nobel 1987) explica qué impulsa crecimiento sostenido del PIB per cápita.

### **FUNCIÓN DE PRODUCCIÓN AGREGADA**
```
Y = F(K, L, A)
```

Donde:
- K = Capital agregado (máquinas, edificios)
- L = Población/trabajo
- A = Productividad total de factores (PTF), tecnología

**Forma usual:** Cobb-Douglas
```
Y = AK^α L^(1-α)
```

### **DINÁMICA DE ACUMULACIÓN DE CAPITAL**
```
Capital mañana = Capital hoy - Depreciación + Inversión

K(t+1) = K(t)(1-δ) + I

Donde δ = tasa de depreciación
```

### **ESTADO ESTACIONARIO (STEADY STATE)**
En equilibrio de largo plazo, capital por trabajador **k = K/L** es constante:

```
k* = [s/(n+g+δ)]^(1/(1-α))

Donde:
s = tasa de ahorro
n = tasa crecimiento población
g = tasa progreso tecnológico
```

**Implicación:** Más ahorro → Mayor k* → Mayor Y/L (más rico)

### **CRECIMIENTO ENDÓGENO**

**Corto/Mediano plazo:**
- Acumulación de capital
- Y/L crece

**Largo plazo:**
- Crecimiento depende SOLO de g (tecnología)
- Sin progreso tecnológico, crecimiento cesa
- Retornos decrecientes al capital

**Implicación política:**
- Ahorrar más ayuda temporalmente
- Crecimiento duradero requiere innovación (I+D)
- Educación aumenta A (capital humano)

### **VELOCIDAD DE CONVERGENCIA**
Economías pobres con K bajo crecen MÁS rápido que ricas:

```
Crecimiento inicial alto
↓ (conforme K aumenta)
Crecimiento converge a g
```

Explica por qué economías emergentes crecen rápido.

### **CRÍTICAS AL MODELO SOLOW**
1. No explica SOURCE de tecnología A
2. Capital humano exógeno
3. Supuestos de competencia perfecta muy restrictivos

Modelos posteriores (Romer, Lucas) endogenizan tecnología.',
  NOW()
);

-- 7. Política Fiscal
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  2,
  'guia',
  7,
  'Política Fiscal: Herramienta de Estabilización',
  '## Uso del Gasto e Impuestos para Controlar Economía

**Política fiscal** refiere a decisiones de gobierno sobre gasto (G) e impuestos (T) para alcanzar objetivos macroeconómicos.

### **TIPOS DE POLÍTICA FISCAL**

**EXPANSIVA** (estimular economía):
- ↑ G (aumentar gasto público)
- ↓ T (reducir impuestos)
- Incrementar déficit presupuestario
- Apropiado en recesión

**CONTRACTIVA** (enfríar economía):
- ↓ G
- ↑ T
- Reducir déficit o crear superávit
- Apropiado en inflación

### **MULTIPLICADOR DEL GASTO**
```
Multiplicador = 1/(1-c)

Donde c = propensión marginal al consumo (0<c<1)
```

**Ejemplo:** Si c=0.8, entonces multiplicador = 1/(1-0.8) = 5

**Implicación:** Aumento de $1 en G → Aumento de $5 en Y
- Gobierno gasta $1
- Trabajadores reciben $1 y gastan $0.80
- Otros reciben $0.80 y gastan $0.64
- Proceso continúa

### **EFECTOS CON POLÍTICAS MONETARIAS**

**Fiscal expansiva + Monetaria acomodante (↑M):**
- Y ↑↑ (multiplicador fuerte)
- r estable

**Fiscal expansiva + Monetaria restrictiva:**
- Y ↑ (menos efectivo, crowding-out parcial)
- r ↑↑

### **LIMITACIONES DE POLÍTICA FISCAL**

**1. Crowding-out:**
- ↑G → r ↑ → I privada ↓
- Inversión privada sustituida por pública

**2. Ricardiana equivalencia:**
- Agentes anticipan futuro impuesto por déficit hoy
- Aumentan ahorro → Efecto nulo

**3. Rezagos políticos:**
- Demora identificar necesidad
- Tiempo legislativo en aprobar
- Cambios toman meses implementar

**4. Sostenibilidad deuda:**
```
Deuda crece si: r > g (tasa interés > crecimiento)
```
Déficits persistentes eventualmente insostenibles

### **MULTIPLICADOR REDUCIDO EN ECONOMÍA ABIERTA**
```
Multiplicador abierto = 1/(1-c+c·m)

Donde m = propensión marginal importar
```

Parte del gasto se filtra al exterior como importaciones.',
  NOW()
);

-- 8. Política Monetaria
INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido, created_at)
VALUES (
  2,
  'guia',
  8,
  'Política Monetaria y Transmisión al Ingreso',
  '## Control de Dinero para Alcanzar Objetivos Macroeconómicos

**Política monetaria** refiere a acciones del Banco Central para controlar oferta de dinero (M) y tasas de interés.

### **HERRAMIENTAS DEL BANCO CENTRAL**

**1. Operaciones de Mercado Abierto (OMA)**
- Compra/venta de bonos públicos por dinero
- Más común y flexible
- Compra: ↑M, r ↓ (expansiva)
- Venta: ↓M, r ↑ (contractiva)

**2. Tasa de Descuento (r_d)**
- Tasa que cobra BC al prestar a bancos
- Aumentar: ↓M (restricción)
- Disminuir: ↑M (expansión)

**3. Encaje Bancario (RR)**
- Proporción que bancos deben reservar
- Aumentar RR: ↓M (restricción)
- Disminuir RR: ↑M (expansión)

**4. Guidance Verbal (Forward Guidance)**
- Comunicaciones sobre futuro de tasas
- Afecta expectativas de agentes
- Influyente si BC es creíble

### **MECANISMO DE TRANSMISIÓN MONETARIA**

**Ruta de Tasa de Interés:**
```
↑M → r ↓ → I ↑ → Y ↑
```

Dinero más barato estimula inversión empresarial.

**Ruta de Precios de Activos:**
```
↑M → Buscan invertir → P_acciones ↑ → Riqueza ↑ → C ↑ → Y ↑
```

Mayor riqueza anima consumo.

**Ruta de Tipos de Cambio:**
```
↑M → r ↓ → Capital sale → e ↓ (moneda se deprecia) → X ↑, M ↓ → NX ↑ → Y ↑
```

Moneda más débil favorece exportaciones.

### **EFECTIVIDAD CUESTIONADA**

**Trampa de Liquidez:**
```
Si r ≈ 0 (límite cero), ↑M no reduce r más
Dinero es sustituto perfecto de bonos
Política monetaria inefectiva
```

Ocurrió en Japón 1990s, USA/Eurozona 2008+

**Solución: Expansión Cuantitativa (QE)**
- Comprar bonos largo plazo o activos riesgosos
- Reducir primas de riesgo
- Afectar precios de activos directamente

### **OBJETIVOS TÍPICOS DEL BC**

**Corto plazo:** Tasas de interés de referencia
- Ejemplo: Fed targets federal funds rate

**Mediano plazo:** Inflación
- Objetivo típico: 2% anual

**Largo plazo:** Estabilidad financiera
- Supervisión prudencial

### **TRADE-OFF INFLACIÓN-DESEMPLEO**

Curva Phillips con expectativas:
```
π - π^e = -b(u - u*)
```

BC que quiere bajar π debe generar desempleo temporal (desinflación cara) o mejorar credibilidad para bajar πᵉ.',
  NOW()
);

COMMIT;

-- Verificación
SELECT COUNT(*) as total_lecciones FROM contenido_clase WHERE modulo_id IN (1,2);
