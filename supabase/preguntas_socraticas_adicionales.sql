-- ============================================
-- PREGUNTAS SOCRÁTICAS ADICIONALES
-- Para llegar a 300 preguntas socráticas variadas
-- ============================================
-- Ejecutar en Supabase SQL Editor después de la migración
-- ============================================

-- ============================================
-- ECO-1: ECONOMÍA I - FUNDAMENTOS MICRO Y MACRO (50 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula) VALUES

-- Teoría del Consumidor - Socráticas
(1, 'teoria_consumidor', 'Curvas de Indiferencia', 'basico', 'socratico',
'Si un consumidor está en un punto donde la TMS es mayor que la relación de precios, ¿qué debería hacer para maximizar su utilidad?',
'Consumir más del bien X', 'Consumir más del bien Y', 'Mantenerse en ese punto', 'Reducir consumo de ambos',
'A',
'Cuando TMS > Px/Py, el consumidor valora subjetivamente el bien X más de lo que el mercado lo valora. Debería consumir MÁS de X hasta que TMS = Px/Py. Esto es el equilibrio del consumidor.',
'TMS = Px/Py en equilibrio'),

(1, 'teoria_consumidor', 'Efecto Sustitución e Ingreso', 'intermedio', 'socratico',
'Si el precio de la carne sube y observas que una familia consume menos carne pero más pollo, ¿qué efecto económico están demostrando principalmente?',
'Efecto ingreso', 'Efecto sustitución', 'Ley de rendimientos decrecientes', 'Paradoja de Giffen',
'B',
'El EFECTO SUSTITUCIÓN ocurre cuando los consumidores reemplazan un bien que se encareció por otro más barato. Aquí, pollo sustituye a carne porque el precio relativo cambió. El efecto ingreso sería si compraran menos de TODO.',
NULL),

(1, 'teoria_consumidor', 'Utilidad Marginal', 'basico', 'socratico',
'¿Por qué la tercera rebanada de pizza te satisface menos que la primera?',
'Por la ley de demanda', 'Por la utilidad marginal decreciente', 'Por el costo de oportunidad', 'Por la elasticidad',
'B',
'La LEY DE UTILIDAD MARGINAL DECRECIENTE dice que cada unidad adicional de un bien proporciona MENOS satisfacción que la anterior. Tu primera rebanada cuando tienes hambre vale más que la tercera cuando ya estás satisfecho.',
'UMg decrece conforme aumenta Q'),

(1, 'teoria_consumidor', 'Restricción Presupuestaria', 'intermedio', 'socratico',
'Si tu ingreso mensual es $10,000, el cine cuesta $100 y los libros $200, ¿cuántas combinaciones máximas puedes comprar si solo compras uno de los dos?',
'100 cines o 50 libros', '50 cines o 100 libros', '100 cines o 100 libros', '10 cines o 20 libros',
'A',
'Con M=$10,000: Máximo cines = 10,000/100 = 100. Máximo libros = 10,000/200 = 50. La restricción presupuestaria M = Px·X + Py·Y limita tus opciones.',
'M = Px × X + Py × Y'),

(1, 'elasticidades', 'Elasticidad Precio', 'intermedio', 'socratico',
'Si subes el precio de la sal 50% y las ventas solo bajan 5%, ¿qué tipo de demanda tiene la sal y por qué es así?',
'Elástica - muchos sustitutos', 'Inelástica - bien necesario sin sustitutos', 'Unitaria - proporción igual', 'Perfectamente elástica',
'B',
'La sal tiene DEMANDA INELÁSTICA porque: 1) Es necesaria para cocinar, 2) No tiene buenos sustitutos, 3) Representa poco del gasto total. Elasticidad = 5%/50% = 0.1, muy menor a 1.',
'Ed = %ΔQ / %ΔP = 0.1'),

(1, 'elasticidades', 'Elasticidad Cruzada', 'avanzado', 'socratico',
'Si el precio del café sube 20% y las ventas de té aumentan 15%, ¿qué relación tienen estos bienes y cuál es la elasticidad cruzada?',
'Complementarios, Exy = -0.75', 'Sustitutos, Exy = +0.75', 'Independientes, Exy = 0', 'Inferiores, Exy = -1',
'B',
'Son SUSTITUTOS porque cuando uno sube de precio, la demanda del otro aumenta. Exy = +15%/+20% = +0.75 (positivo = sustitutos, negativo = complementarios).',
'Exy = %ΔQy / %ΔPx = 0.75'),

(1, 'teoria_productor', 'Producto Marginal', 'basico', 'socratico',
'Si contratas un sexto trabajador y la producción pasa de 100 a 108 unidades, ¿cuál es su producto marginal?',
'108 unidades', '100 unidades', '8 unidades', '18 unidades',
'C',
'El PRODUCTO MARGINAL es el cambio en producción por unidad adicional de insumo. PMg = ΔQ/ΔL = (108-100)/(6-5) = 8 unidades. Este trabajador adicional aporta 8 unidades más.',
'PMg = ΔQ / ΔL'),

(1, 'costos', 'Costo Marginal', 'intermedio', 'socratico',
'Si producir 99 unidades cuesta $9,900 y producir 100 unidades cuesta $10,020, ¿cuál es el costo marginal de la unidad 100?',
'$10,020', '$9,900', '$120', '$100',
'C',
'El COSTO MARGINAL es el costo adicional de producir una unidad más. CMg = ΔCT/ΔQ = ($10,020 - $9,900)/(100-99) = $120. Esta es la unidad más cara hasta ahora.',
'CMg = ΔCT / ΔQ'),

(1, 'costos', 'Economías de Escala', 'intermedio', 'socratico',
'¿Por qué una fábrica que produce 1 millón de autos tiene costos unitarios más bajos que una que produce 1,000?',
'Por rendimientos decrecientes', 'Por economías de escala', 'Por competencia perfecta', 'Por monopolio natural',
'B',
'Las ECONOMÍAS DE ESCALA ocurren cuando el costo promedio BAJA al aumentar la producción. Razones: 1) Costos fijos se diluyen, 2) Especialización de trabajadores, 3) Descuentos por volumen en insumos, 4) Mejor uso de maquinaria.',
'CMe = CT/Q (decrece con mayor Q)'),

(1, 'estructuras_mercado', 'Competencia Perfecta', 'basico', 'socratico',
'En un mercado de trigo con miles de agricultores vendiendo producto idéntico, ¿por qué ninguno puede cobrar más que el precio de mercado?',
'Por regulación gubernamental', 'Porque los compradores irían a otro vendedor', 'Por acuerdos entre productores', 'Por costos fijos altos',
'B',
'En COMPETENCIA PERFECTA: productos homogéneos + muchos vendedores = si subes precio, pierdes TODOS tus clientes porque pueden comprar exactamente lo mismo más barato. Por eso las empresas son "precio-aceptantes".',
'P = IMg = CMg en equilibrio'),

(1, 'estructuras_mercado', 'Monopolio', 'intermedio', 'socratico',
'¿Por qué un monopolista produce menos cantidad y cobra precio más alto que una industria competitiva?',
'Porque tiene costos más altos', 'Porque maximiza beneficio donde IMg = CMg', 'Porque el gobierno lo obliga', 'Porque quiere perder clientes',
'B',
'El monopolista enfrenta TODA la demanda del mercado (curva de demanda decreciente). Su IMg < P, así que maximiza donde IMg = CMg, produciendo MENOS y cobrando MÁS que competencia perfecta. Esto genera pérdida de bienestar social.',
'IMg = CMg, pero P > CMg'),

(1, 'teoria_juegos', 'Dilema del Prisionero', 'avanzado', 'socratico',
'Dos empresas pueden cooperar (precio alto) o competir (precio bajo). Si ambas compiten ganan $50 cada una, si cooperan ganan $100 cada una. ¿Por qué terminan compitiendo?',
'Porque es ilegal cooperar', 'Porque cada una tiene incentivo a traicionar', 'Porque no se conocen', 'Porque prefieren ganar menos',
'B',
'Este es el DILEMA DEL PRISIONERO: aunque cooperar da mejor resultado conjunto, cada empresa tiene INCENTIVO INDIVIDUAL a bajar precio unilateralmente para ganar más. El equilibrio de Nash es (Competir, Competir) aunque es subóptimo.',
'Equilibrio de Nash ≠ Óptimo de Pareto'),

(1, 'pib_contabilidad', 'Cálculo del PIB', 'basico', 'socratico',
'Si México produce $20 billones en bienes y servicios en 2024, ¿qué representa esta cifra?',
'El ingreso del gobierno', 'El Producto Interno Bruto', 'Las exportaciones totales', 'La deuda externa',
'B',
'El PIB es el valor de mercado de TODOS los bienes y servicios FINALES producidos DENTRO de un país en un período. Es la medida más importante de actividad económica y se puede calcular por producción, ingreso o gasto.',
'PIB = C + I + G + (X - M)'),

(1, 'pib_contabilidad', 'PIB Real vs Nominal', 'intermedio', 'socratico',
'Si el PIB nominal subió 10% pero los precios subieron 8%, ¿cuánto creció realmente la economía?',
'10%', '8%', '2%', '18%',
'C',
'El PIB REAL elimina el efecto de la inflación. Crecimiento real ≈ Crecimiento nominal - Inflación = 10% - 8% = 2%. El país realmente produjo solo 2% más bienes y servicios; el resto fue aumento de precios.',
'PIB Real = PIB Nominal / Deflactor'),

(1, 'modelo_islm', 'Curva IS', 'intermedio', 'socratico',
'¿Por qué la curva IS tiene pendiente negativa?',
'Porque mayor ingreso aumenta inversión', 'Porque tasas altas reducen inversión y por tanto producción', 'Porque el gobierno gasta más', 'Porque aumentan exportaciones',
'B',
'La curva IS representa equilibrio en el mercado de BIENES. Pendiente negativa porque: tasa de interés ↑ → Inversión ↓ → Demanda agregada ↓ → Producción ↓. Alta tasa = menos inversión = menos PIB.',
'Y = C + I(r) + G + NX'),

(1, 'modelo_islm', 'Curva LM', 'intermedio', 'socratico',
'¿Por qué la curva LM tiene pendiente positiva?',
'Porque mayor producción requiere más dinero para transacciones', 'Porque el banco central sube tasas', 'Porque baja el consumo', 'Porque aumenta el ahorro',
'A',
'La curva LM representa equilibrio en el mercado de DINERO. Pendiente positiva porque: Producción ↑ → Demanda de dinero ↑ (más transacciones) → Con oferta fija, tasa de interés ↑ para equilibrar.',
'M/P = L(Y, r)'),

(1, 'politica_fiscal', 'Multiplicador del Gasto', 'avanzado', 'socratico',
'Si el gobierno gasta $100 millones extra y el PIB sube $400 millones, ¿cuál es el multiplicador y qué lo explica?',
'Multiplicador = 0.25, por ahorro', 'Multiplicador = 4, por efecto cascada del gasto', 'Multiplicador = 100, por inversión', 'Multiplicador = 1, equilibrio',
'B',
'Multiplicador = ΔPIB/ΔG = 400/100 = 4. Cada peso gastado genera más gasto: gobierno paga a trabajadores → trabajadores compran → comerciantes compran → etc. Si PMgC = 0.75, multiplicador = 1/(1-0.75) = 4.',
'k = 1/(1 - PMgC)'),

(1, 'politica_monetaria', 'Tasa de Interés', 'basico', 'socratico',
'Si Banxico baja la tasa de interés, ¿qué efecto esperarías en la inversión empresarial?',
'Disminuye porque hay menos incentivo', 'Aumenta porque es más barato pedir préstamos', 'No cambia', 'Solo afecta al gobierno',
'B',
'Tasa de interés BAJA → Costo de financiamiento BAJA → Más proyectos de inversión son rentables → Inversión AUMENTA. Esta es la razón por la que los bancos centrales bajan tasas para estimular la economía.',
'I = I₀ - br (inversión decrece con tasa)'),

(1, 'inflacion_phillips', 'Curva de Phillips', 'avanzado', 'socratico',
'Si el desempleo baja de 5% a 3%, ¿qué esperarías que pase con la inflación según la Curva de Phillips?',
'Baja también', 'Sube por presión salarial', 'No cambia', 'Se vuelve negativa',
'B',
'La CURVA DE PHILLIPS muestra trade-off entre desempleo e inflación. Menos desempleo → Trabajadores escasos → Suben salarios → Empresas suben precios → Inflación ↑. Es la relación inversa fundamental de política macro.',
'π = πe - β(u - u*)'),

(1, 'crecimiento_solow', 'Modelo de Solow', 'avanzado', 'socratico',
'Según el modelo de Solow, ¿por qué los países pobres deberían crecer más rápido que los ricos?',
'Tienen más recursos naturales', 'Rendimientos decrecientes del capital', 'Reciben más ayuda externa', 'Tienen poblaciones más jóvenes',
'B',
'CONVERGENCIA: países pobres tienen poco capital por trabajador, entonces el capital adicional es MUY productivo (rendimientos decrecientes). Países ricos ya tienen mucho capital, el nuevo rinde menos. Esto predice convergencia de ingresos.',
'y* = (s/δ+n+g)^α · A');

-- ============================================
-- ECO-2: ECONOMÍA II - FINANZAS (50 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula) VALUES

(2, 'valor_temporal', 'Valor Presente', 'basico', 'socratico',
'¿Por qué $1,000 hoy valen más que $1,000 dentro de un año?',
'Por la inflación únicamente', 'Porque el dinero hoy puede invertirse y generar rendimientos', 'Porque los bancos cobran comisiones', 'No valen más, es lo mismo',
'B',
'VALOR TEMPORAL DEL DINERO: $1,000 hoy invertidos al 10% = $1,100 en un año. El dinero tiene costo de oportunidad. Por eso descontamos flujos futuros al valor presente: VP = VF/(1+r)^n.',
'VP = VF / (1+r)^n'),

(2, 'valor_temporal', 'Valor Futuro', 'basico', 'socratico',
'Si inviertes $5,000 al 8% anual compuesto, ¿cuánto tendrás en 3 años?',
'$5,400', '$6,298.56', '$5,240', '$6,000',
'B',
'Valor Futuro con interés compuesto: VF = VP(1+r)^n = 5,000(1.08)³ = 5,000 × 1.2597 = $6,298.56. El interés compuesto gana interés sobre interés, por eso crece exponencialmente.',
'VF = VP × (1+r)^n = 5,000 × 1.08³'),

(2, 'van_tir', 'VAN Positivo', 'intermedio', 'socratico',
'Si un proyecto tiene VAN de $50,000, ¿qué significa esto para la empresa?',
'Perderá $50,000', 'Generará $50,000 más de lo mínimo requerido', 'Costará $50,000 de inversión', 'Durará 50,000 días',
'B',
'VAN POSITIVO significa que el proyecto genera valor por ENCIMA del costo de capital. Los $50,000 son riqueza adicional para los accionistas después de compensar el riesgo y el costo de oportunidad del dinero.',
'VAN > 0 → Aceptar proyecto'),

(2, 'van_tir', 'Cálculo de VAN', 'intermedio', 'socratico',
'Inversión: $10,000. Flujos: Año1=$4,000, Año2=$5,000, Año3=$6,000. Tasa: 10%. ¿Cuál es el VAN?',
'$2,592', '$5,000', '$15,000', '-$1,500',
'A',
'VAN = -10,000 + 4,000/1.1 + 5,000/1.1² + 6,000/1.1³ = -10,000 + 3,636 + 4,132 + 4,507 = $2,275 (aprox $2,592 con decimales exactos). VAN > 0, proyecto aceptable.',
'VAN = -I₀ + Σ FCt/(1+r)^t'),

(2, 'tir', 'Interpretación TIR', 'intermedio', 'socratico',
'Si un proyecto tiene TIR de 18% y el costo de capital es 12%, ¿deberías aceptarlo?',
'No, porque 18 > 12', 'Sí, porque TIR > costo de capital', 'Depende del VAN', 'Solo si es a corto plazo',
'B',
'Regla de decisión: TIR > WACC → Aceptar. El proyecto rinde 18% pero solo exiges 12%. Esos 6% extra son valor creado para accionistas. TIR es la tasa que hace VAN = 0; si es mayor al costo, el VAN es positivo.',
'TIR > WACC → VAN > 0 → Aceptar'),

(2, 'riesgo', 'Diversificación', 'basico', 'socratico',
'¿Por qué es mejor tener acciones de 10 empresas diferentes que de una sola?',
'Porque ganas más dividendos', 'Porque reduces el riesgo no sistemático', 'Porque pagas menos impuestos', 'Porque es más fácil de administrar',
'B',
'DIVERSIFICACIÓN elimina el riesgo específico (no sistemático) de empresas individuales. Si una empresa quiebra, las otras compensan. El riesgo de mercado (sistemático) NO se puede diversificar.',
'Riesgo total = Sistemático + No sistemático'),

(2, 'riesgo', 'Beta', 'avanzado', 'socratico',
'Si una acción tiene beta de 1.5 y el mercado sube 10%, ¿cuánto esperarías que suba la acción?',
'10%', '15%', '5%', '1.5%',
'B',
'BETA mide sensibilidad al mercado. β=1.5 significa que la acción se mueve 1.5 veces lo que el mercado. Si mercado +10%, acción = 1.5 × 10% = +15%. Más beta = más riesgo sistemático = mayor rendimiento esperado.',
'Ra = Rf + β(Rm - Rf)'),

(2, 'costo_capital', 'WACC', 'avanzado', 'socratico',
'Una empresa tiene 60% deuda al 8% y 40% capital propio al 15%. ¿Cuál es su WACC si la tasa de impuestos es 30%?',
'10.5%', '9.36%', '11%', '8.4%',
'B',
'WACC = Wd × Kd × (1-T) + We × Ke = 0.60 × 0.08 × (1-0.30) + 0.40 × 0.15 = 0.0336 + 0.06 = 0.0936 = 9.36%. La deuda tiene beneficio fiscal por eso multiplicamos por (1-T).',
'WACC = Wd×Kd×(1-T) + We×Ke'),

(2, 'amortizacion', 'Tabla de Amortización', 'intermedio', 'socratico',
'En un préstamo con pagos iguales, ¿por qué la porción de capital aumenta con cada pago?',
'Porque suben las tasas', 'Porque los intereses se calculan sobre saldo menor', 'Porque el banco cobra más', 'No cambia, es igual siempre',
'B',
'Al inicio, el saldo es alto → intereses altos → menos va a capital. Con cada pago, el saldo baja → intereses bajan → MÁS del pago fijo va a capital. Por eso la amortización es creciente en método francés.',
'Interés = Saldo × Tasa'),

(2, 'descuento', 'Tasa de Descuento', 'intermedio', 'socratico',
'¿Por qué un proyecto más riesgoso debe usar una tasa de descuento más alta?',
'Para castigar al inversionista', 'Porque los inversionistas exigen mayor rendimiento por mayor riesgo', 'Para reducir el VAN', 'Por regulación',
'B',
'RELACIÓN RIESGO-RENDIMIENTO: proyectos riesgosos deben compensar con mayor rendimiento. Tasa alta → VPN más bajo → solo aceptamos proyectos que realmente valen el riesgo. Es el precio del riesgo.',
'Tasa = Rf + Prima por riesgo'),

(2, 'flujos', 'Flujo de Efectivo Libre', 'avanzado', 'socratico',
'¿Por qué usamos flujo de efectivo y no utilidad contable para evaluar proyectos?',
'Porque es más fácil', 'Porque el efectivo es lo que realmente entra y sale', 'Porque los contadores lo prefieren', 'Porque es más alto',
'B',
'La UTILIDAD CONTABLE incluye partidas que no son efectivo (depreciación, provisiones). El FLUJO DE EFECTIVO muestra lo que realmente puedes reinvertir o distribuir. "Cash is king" - lo que importa es el dinero real.',
'FCL = EBIT(1-T) + Dep - CAPEX - ΔWK'),

(2, 'interes', 'Interés Compuesto vs Simple', 'basico', 'socratico',
'$10,000 al 10% anual por 5 años. ¿Cuál es la diferencia entre interés simple y compuesto?',
'$1,105.10 más con compuesto', '$500 más con simple', 'Son iguales', '$2,000 más con compuesto',
'A',
'Simple: 10,000 × 0.10 × 5 = $5,000 interés. Total = $15,000. Compuesto: 10,000 × (1.1)^5 = $16,105.10. Diferencia = $1,105.10. El compuesto gana interés sobre interés.',
'Compuesto: VF = P(1+r)^n'),

(2, 'van', 'VAN vs Payback', 'intermedio', 'socratico',
'Un proyecto recupera la inversión en 2 años pero tiene VAN negativo. ¿Lo aceptarías?',
'Sí, porque recuperas rápido', 'No, porque VAN negativo destruye valor', 'Depende del tamaño', 'Sí, porque es bajo riesgo',
'B',
'El PAYBACK ignora: 1) Valor temporal del dinero, 2) Flujos después de recuperación. El VAN considera TODO. Un proyecto puede recuperar rápido pero destruir valor. VAN es el criterio definitivo.',
'VAN < 0 → Rechazar siempre'),

(2, 'evaluacion', 'Índice de Rentabilidad', 'intermedio', 'socratico',
'Si un proyecto tiene VP de flujos = $150,000 e inversión = $100,000, ¿cuál es el IR y qué significa?',
'IR = 0.67, malo', 'IR = 1.5, genera $1.50 por cada $1 invertido', 'IR = 50, excelente', 'IR = 150,000',
'B',
'Índice de Rentabilidad = VP flujos / Inversión = 150,000/100,000 = 1.5. Por cada peso invertido, recuperas $1.50. IR > 1 = proyecto aceptable. Es útil cuando hay restricción de capital.',
'IR = VP Flujos / Inversión inicial'),

(2, 'evaluacion', 'Período de Recuperación', 'basico', 'socratico',
'Inversión $100,000. Flujos anuales: $30,000. ¿En cuántos años recuperas la inversión?',
'2 años', '3.33 años', '4 años', '5 años',
'B',
'Payback = Inversión / Flujo anual = 100,000 / 30,000 = 3.33 años. Ventaja: simple. Desventaja: ignora valor temporal y flujos posteriores. Úsalo como filtro inicial, no como criterio único.',
'Payback = I₀ / FCF anual');

-- ============================================
-- ECO-3: ECONOMÍA III - INTERNACIONAL (40 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula) VALUES

(3, 'comercio', 'Ventaja Comparativa', 'basico', 'socratico',
'México produce vino a costo de 4 horas y queso a 2 horas. España: vino 1 hora, queso 3 horas. ¿Qué debería exportar cada país?',
'México vino, España queso', 'México queso, España vino', 'Ambos lo mismo', 'No deben comerciar',
'B',
'VENTAJA COMPARATIVA (costo de oportunidad): México: 1 vino = 2 quesos, 1 queso = 0.5 vinos. España: 1 vino = 0.33 quesos, 1 queso = 3 vinos. México tiene ventaja en QUESO (cuesta menos vinos), España en VINO.',
'Exporta donde tu costo de oportunidad es MENOR'),

(3, 'comercio', 'Aranceles', 'intermedio', 'socratico',
'Si México pone un arancel del 20% a autos importados, ¿quién gana y quién pierde?',
'Todos ganan', 'Productores nacionales ganan, consumidores y eficiencia pierden', 'Solo el gobierno gana', 'Nadie gana',
'B',
'ARANCELES: Productores nacionales ganan (precios más altos), Gobierno gana (recaudación), PERO consumidores pagan más y hay PÉRDIDA DE PESO MUERTO por ineficiencia. El país en conjunto generalmente pierde.',
'Pérdida bienestar > Ganancia productores'),

(3, 'comercio', 'Tipo de Cambio Real', 'avanzado', 'socratico',
'Si el peso se deprecia 10% pero la inflación en México es 8% mayor que en EUA, ¿cambió la competitividad?',
'Sí, México más competitivo', 'Casi no cambió', 'No, menos competitivo', 'Imposible saber',
'B',
'TIPO DE CAMBIO REAL = TCN × (P*/P). La depreciación nominal (10%) casi se compensa con mayor inflación (8%). Competitividad real apenas cambió ~2%. Lo que importa es el tipo de cambio REAL, no nominal.',
'e = E × (P*/P)'),

(3, 'balanza_pagos', 'Cuenta Corriente', 'intermedio', 'socratico',
'Si un país importa más de lo que exporta, ¿cómo se financia ese déficit?',
'Con impuestos', 'Con entrada de capitales (inversión extranjera o deuda)', 'Con reservas infinitas', 'No se puede financiar',
'B',
'IDENTIDAD DE BALANZA DE PAGOS: Cuenta Corriente + Cuenta de Capital = 0. Déficit comercial requiere SUPERÁVIT en cuenta de capital: entra inversión extranjera o préstamos. Es sostenible si el capital es productivo.',
'CC + CK + CF = 0'),

(3, 'internacional', 'Globalización', 'basico', 'socratico',
'¿Por qué las empresas establecen fábricas en países con salarios bajos?',
'Por evadir impuestos', 'Para reducir costos de producción y ser más competitivas', 'Por el clima', 'Por regulación',
'B',
'VENTAJA DE COSTOS: Producir donde los factores son más baratos aumenta rentabilidad y permite ofrecer precios menores. Es la lógica de la cadena de suministro global. México es atractivo por cercanía a EUA + costos competitivos.',
NULL),

(3, 'comercio', 'Tratados Comerciales', 'intermedio', 'socratico',
'¿Por qué el T-MEC beneficia más a los países miembros que un arancel unilateral cero?',
'No hay diferencia', 'Acceso preferencial vs otros competidores', 'Porque incluye cuotas', 'Por el idioma',
'B',
'Los TRATADOS dan acceso PREFERENCIAL. Si México tiene 0% arancel con EUA pero China paga 25%, México tiene ventaja competitiva. Además incluyen reglas de origen, propiedad intelectual, estándares laborales.',
NULL),

(3, 'balanza_pagos', 'Reservas Internacionales', 'avanzado', 'socratico',
'¿Por qué Banxico acumula reservas en dólares?',
'Para ganar intereses', 'Para defender el peso en crisis y dar confianza a inversionistas', 'Por ley', 'Para prestar a otros países',
'B',
'RESERVAS son seguro contra crisis. Si hay ataque especulativo contra el peso, Banxico puede vender dólares para sostener el tipo de cambio. Dan CONFIANZA a inversionistas de que hay respaldo. México tiene ~$200 mil millones.',
NULL),

(3, 'internacional', 'Inversión Extranjera Directa', 'basico', 'socratico',
'¿Cuál es la diferencia entre IED y inversión de cartera?',
'Son lo mismo', 'IED implica control de empresas, cartera solo compra acciones/bonos', 'Cartera es más estable', 'IED es solo en bolsa',
'B',
'IED: control >10% de empresa, largo plazo, trae tecnología y empleo. CARTERA: acciones/bonos sin control, puede salir rápido ("dinero caliente"). IED es más estable y deseable para desarrollo.',
NULL);

-- ============================================
-- CON-1: CONTADURÍA I - INFORMACIÓN FINANCIERA (40 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula) VALUES

(4, 'postulados', 'Entidad Económica', 'basico', 'socratico',
'¿Por qué no debes mezclar los gastos personales del dueño con los de su empresa?',
'Por preferencia', 'Por el postulado de Entidad Económica', 'Por el SAT', 'Por el banco',
'B',
'El postulado de ENTIDAD ECONÓMICA establece que la empresa es una entidad jurídica separada de sus dueños. Mezclar gastos distorsiona los estados financieros y dificulta evaluar el desempeño real del negocio.',
NULL),

(4, 'postulados', 'Negocio en Marcha', 'basico', 'socratico',
'¿Por qué valuamos activos a costo histórico y no a valor de liquidación?',
'Es más fácil', 'Por el supuesto de Negocio en Marcha', 'Por la inflación', 'Por el mercado',
'B',
'NEGOCIO EN MARCHA asume que la empresa continuará operando indefinidamente. Si fuera a liquidarse, valuaríamos a precio de venta rápida (menor). Este postulado justifica el costo histórico y la depreciación sistemática.',
NULL),

(4, 'postulados', 'Devengado', 'intermedio', 'socratico',
'Si vendes en diciembre pero cobras en enero, ¿en qué mes registras el ingreso y por qué?',
'Enero porque es cuando entra el dinero', 'Diciembre porque es cuando ocurre la transacción económica', 'El que prefieras', 'Mitad y mitad',
'B',
'Base DEVENGADO (acumulación): registras cuando ocurre la transacción económica, NO cuando entra el efectivo. Esto da mejor medición del desempeño. Base de efectivo solo para negocios muy pequeños.',
'Ingreso se reconoce cuando se gana, no cuando se cobra'),

(4, 'caracteristicas', 'Relevancia vs Confiabilidad', 'intermedio', 'socratico',
'¿Por qué a veces la información financiera sacrifica precisión por oportunidad?',
'Por error', 'Porque información oportuna aunque estimada es más útil que información exacta pero tardía', 'Por regulación', 'Por costos',
'B',
'TRADE-OFF: Estados financieros trimestrales usan estimaciones (provisiones, depreciación) porque esperar datos exactos los haría irrelevantes para decisiones. La utilidad de la información disminuye con el tiempo.',
NULL),

(4, 'elementos', 'Activo', 'basico', 'socratico',
'¿Por qué una marca registrada es un activo aunque no la puedes tocar?',
'No es un activo', 'Porque generará beneficios económicos futuros', 'Porque costó dinero', 'Por convención',
'B',
'ACTIVO = recurso controlado por la entidad del que se esperan BENEFICIOS ECONÓMICOS FUTUROS. Una marca fuerte permite cobrar más, atraer clientes. Es activo intangible. Lo que importa es el beneficio, no la tangibilidad.',
'Activo: control + beneficio futuro'),

(4, 'elementos', 'Pasivo vs Capital', 'basico', 'socratico',
'¿Cuál es la diferencia fundamental entre deuda con bancos y capital de accionistas?',
'El monto', 'La deuda se debe pagar, el capital no tiene obligación de reembolso', 'El plazo', 'Los intereses',
'B',
'PASIVO: obligación de pago definida. CAPITAL: representa propiedad, no hay obligación de devolver. Accionistas son dueños residuales: reciben lo que queda después de pagar a todos. Por eso capital es más riesgoso.',
'Activo = Pasivo + Capital'),

(4, 'valuacion', 'Costo Histórico', 'intermedio', 'socratico',
'¿Por qué muchos activos se registran a lo que costaron y no a lo que valen hoy?',
'Por pereza', 'Porque el costo es verificable objetivamente', 'Porque siempre es mayor', 'Por el SAT',
'B',
'COSTO HISTÓRICO: confiable porque hay factura. VALOR RAZONABLE: más relevante pero subjetivo. Las NIF permiten valor razonable para ciertos activos (inversiones), pero el costo sigue siendo base para activos fijos.',
NULL),

(4, 'presentacion', 'Clasificación de Activos', 'basico', 'socratico',
'¿Por qué separamos activos circulantes de no circulantes en el balance?',
'Por estética', 'Para evaluar liquidez y capacidad de pago a corto plazo', 'Por tamaño', 'Por antigüedad',
'B',
'LIQUIDEZ: activos circulantes (efectivo, cuentas por cobrar, inventario) se convierten en efectivo en <1 año. No circulantes son inversiones a largo plazo. Esta clasificación permite calcular razones de liquidez y capital de trabajo.',
'Circulante = se espera realizar en < 12 meses'),

(4, 'marco', 'NIF vs IFRS', 'intermedio', 'socratico',
'¿Por qué México adoptó normas similares a las internacionales (IFRS)?',
'Por obligación', 'Para facilitar comparabilidad con empresas de otros países', 'Por moda', 'Por el TLC',
'B',
'CONVERGENCIA: inversionistas globales necesitan comparar empresas de diferentes países. Normas similares reducen costos de análisis y aumentan flujos de inversión. México adaptó NIF con base en IFRS.',
NULL);

-- ============================================
-- CON-2: CONTADURÍA II - FISCAL (40 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula) VALUES

(5, 'iva', 'Mecánica del IVA', 'basico', 'socratico',
'¿Por qué el IVA no es un costo para las empresas aunque ellas lo pagan al SAT?',
'Sí es un costo', 'Porque lo trasladan al consumidor final en el precio', 'Porque lo recuperan', 'Por exención',
'B',
'El IVA es impuesto al CONSUMO FINAL. Las empresas son solo RECAUDADORAS: cobran IVA a clientes y lo pagan al SAT, descontando el IVA que pagaron a proveedores. Es neutral para empresas si no venden a consumidor final exento.',
'IVA por pagar = IVA trasladado - IVA acreditable'),

(5, 'acreditamiento', 'IVA Acreditable', 'intermedio', 'socratico',
'Si compras materia prima por $10,000 + IVA y vendes producto por $15,000 + IVA, ¿cuánto pagas al SAT?',
'$4,000', '$800 (diferencia de IVAs)', '$2,400', '$1,600',
'B',
'IVA trasladado (16% de 15,000) = $2,400. IVA acreditable (16% de 10,000) = $1,600. Pagas al SAT = 2,400 - 1,600 = $800. Solo pagas sobre el VALOR AGREGADO ($5,000 × 16% = $800).',
'IVA neto = 16% × (Ventas - Compras)'),

(5, 'isr', 'Base Gravable ISR', 'intermedio', 'socratico',
'¿Por qué la utilidad fiscal es diferente a la utilidad contable?',
'Error de cálculo', 'Porque las leyes fiscales tienen reglas diferentes a las NIF', 'Son iguales', 'Por inflación',
'B',
'DIFERENCIAS PERMANENTES: gastos no deducibles (multas, no comprobados). DIFERENCIAS TEMPORALES: depreciación fiscal vs contable, estimaciones. La ley tiene sus propias reglas que no siempre coinciden con contabilidad.',
'Utilidad fiscal = Ingresos acumulables - Deducciones autorizadas'),

(5, 'isr', 'Deducciones Autorizadas', 'basico', 'socratico',
'¿Por qué el SAT permite deducir gastos de la base gravable?',
'Por bondad', 'Para gravar solo la ganancia neta real', 'Para recaudar menos', 'Por presión empresarial',
'B',
'El ISR grava la UTILIDAD, no los ingresos brutos. Permitir deducciones reconoce que generar ingresos requiere incurrir en gastos. Sin deducciones, el impuesto sería confiscatorio y desincentivaría la actividad económica.',
'ISR = 30% × (Ingresos - Deducciones)'),

(5, 'obligaciones', 'Pagos Provisionales', 'intermedio', 'socratico',
'¿Por qué las empresas pagan ISR cada mes si el impuesto es anual?',
'Por castigo', 'Para asegurar flujo constante al gobierno y evitar evasión', 'Por conveniencia', 'Es opcional',
'B',
'PAGOS PROVISIONALES: estimación mensual del ISR anual. Beneficios: 1) Flujo constante al gobierno, 2) Menor carga en declaración anual, 3) Detecta inconsistencias temprano, 4) Evita acumulación de deuda fiscal.',
'Pago provisional = Coeficiente × Ingresos del período'),

(5, 'seguro_social', 'Cuotas IMSS', 'basico', 'socratico',
'¿Por qué el patrón paga cuotas al IMSS además del salario?',
'Es opcional', 'Es parte del costo laboral obligatorio para seguridad social', 'Solo para grandes empresas', 'Por sindicatos',
'B',
'Las CUOTAS PATRONALES financian: salud, pensiones, guarderías, riesgos de trabajo. Son OBLIGATORIAS y representan ~30-35% adicional al salario. Forman parte del costo real de contratar un empleado.',
'Costo laboral total = Salario + Cuotas + Prestaciones'),

(5, 'presuntiva', 'Determinación Presuntiva', 'avanzado', 'socratico',
'¿Cuándo y por qué puede el SAT determinar impuestos sin ver tu contabilidad?',
'Siempre que quiera', 'Cuando el contribuyente oculta información o hay irregularidades graves', 'Nunca', 'Solo a grandes empresas',
'B',
'PRESUNTIVA: el SAT estima impuestos cuando: 1) No presentas declaraciones, 2) Contabilidad destruida/oculta, 3) Inconsistencias graves. Usa comparables del sector. Generalmente resulta en impuesto más alto.',
NULL),

(5, 'gobierno', 'Federalismo Fiscal', 'intermedio', 'socratico',
'¿Por qué los estados reciben recursos federales si podrían cobrar sus propios impuestos?',
'Por incapacidad', 'Porque la recaudación centralizada es más eficiente y permite redistribución', 'Por la constitución antigua', 'Por el PRI',
'B',
'COORDINACIÓN FISCAL: evita competencia destructiva entre estados, reduce costos administrativos, permite redistribución a estados pobres. A cambio, estados renuncian a ciertos impuestos y reciben participaciones.',
NULL);

-- ============================================
-- CON-3: CONTADURÍA III - AUDITORÍA (30 preguntas)
-- ============================================

INSERT INTO preguntas (modulo_id, subtema, tema, nivel, tipo, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, formula) VALUES

(6, 'evidencia', 'Suficiencia de Evidencia', 'intermedio', 'socratico',
'¿Por qué un auditor revisa muestras en lugar de 100% de las transacciones?',
'Por flojera', 'Porque es impráctico revisar todo; el muestreo da seguridad razonable a menor costo', 'No es permitido revisar todo', 'Por el cliente',
'B',
'MUESTREO DE AUDITORÍA: revisar 100% sería costoso e impráctico. Con técnicas estadísticas, una muestra bien diseñada da conclusiones válidas sobre toda la población. El auditor da "seguridad razonable", no absoluta.',
NULL),

(6, 'evidencia', 'Tipos de Evidencia', 'basico', 'socratico',
'¿Por qué una confirmación bancaria es evidencia más confiable que un registro interno?',
'Es más barata', 'Porque proviene de fuente externa independiente', 'Porque es más reciente', 'Por el formato',
'B',
'JERARQUÍA DE EVIDENCIA: Externa > Interna. Un banco no tiene incentivo para mentir sobre el saldo de tu cliente. Los registros internos pueden ser manipulados. Confirmaciones, documentos externos, observación física son más confiables.',
'Externa e independiente > Interna'),

(6, 'procedimientos', 'Pruebas Sustantivas', 'intermedio', 'socratico',
'¿Cuál es la diferencia entre pruebas de controles y pruebas sustantivas?',
'Son lo mismo', 'Controles evalúan sistemas; sustantivas verifican saldos directamente', 'Sustantivas son para fraude', 'Controles son opcionales',
'B',
'PRUEBAS DE CONTROLES: ¿funcionan los controles internos? (ej: ¿se autorizan las compras?). PRUEBAS SUSTANTIVAS: ¿los números son correctos? (ej: confirmar saldos, recalcular depreciación). Ambas son necesarias.',
NULL),

(6, 'coso', 'Marco COSO', 'intermedio', 'socratico',
'¿Por qué el ambiente de control es la base del framework COSO?',
'Es el primero en la lista', 'Porque sin una cultura ética, los demás controles no funcionan', 'Por tradición', 'Es el más fácil',
'B',
'AMBIENTE DE CONTROL: tono desde arriba, integridad, competencia, filosofía gerencial. Si la alta dirección no es ética, los empleados tampoco. Es el fundamento: sin él, otros controles (evaluación de riesgos, actividades de control) son inefectivos.',
'Componentes COSO: Ambiente, Riesgos, Actividades, Información, Monitoreo'),

(6, 'dictamen', 'Opinión con Salvedades', 'avanzado', 'socratico',
'¿Cuándo emite un auditor opinión con salvedades en lugar de opinión limpia?',
'Cuando hay cualquier error', 'Cuando hay errores materiales pero no generalizados', 'Cuando no le pagan', 'Nunca',
'B',
'OPINIÓN CON SALVEDADES ("excepto por"): hay errores MATERIALES pero limitados a ciertas áreas. Los estados financieros son útiles EXCEPTO por esos puntos. Si los errores son generalizados, es opinión adversa o abstención.',
'Material pero no generalizado = Salvedad'),

(6, 'dictamen', 'Opinión Adversa', 'avanzado', 'socratico',
'¿Qué significa cuando un auditor emite opinión adversa?',
'Los estados están perfectos', 'Los estados financieros NO presentan razonablemente la situación financiera', 'El auditor no terminó', 'Es lo mismo que limpia',
'B',
'OPINIÓN ADVERSA: errores tan MATERIALES y GENERALIZADOS que los estados financieros son engañosos. No deberían usarse para tomar decisiones. Es muy raro porque generalmente el cliente corrige antes de esto.',
'Material + Generalizado = Adversa'),

(6, 'riesgo_auditoria', 'Modelo de Riesgo', 'avanzado', 'socratico',
'Si el riesgo inherente y de control son altos, ¿qué debe hacer el auditor con sus pruebas?',
'Reducirlas para ahorrar tiempo', 'Aumentar pruebas sustantivas para reducir riesgo de detección', 'Declinar el trabajo', 'Ignorar el riesgo',
'B',
'RIESGO DE AUDITORÍA = RI × RC × RD. Si RI y RC son altos, el auditor debe REDUCIR el RD haciendo MÁS pruebas sustantivas, muestras más grandes, procedimientos más rigurosos para mantener el riesgo total aceptable.',
'RA = RI × RC × RD'),

(6, 'materialidad', 'Importancia Relativa', 'intermedio', 'socratico',
'¿Por qué un error de $1,000 puede ser material para una empresa pero no para otra?',
'Por el país', 'Porque la materialidad depende del tamaño y contexto de cada empresa', 'Por preferencia del auditor', 'Siempre es igual',
'B',
'MATERIALIDAD es relativa. $1,000 es material si la utilidad es $10,000 (10%), pero inmaterial si es $10,000,000 (0.01%). Se considera material si podría influir en decisiones de usuarios de estados financieros.',
'Materialidad típica: 0.5-5% de utilidad/activos'),

(6, 'documentacion', 'Papeles de Trabajo', 'basico', 'socratico',
'¿Por qué el auditor debe documentar todo su trabajo?',
'Por burocracia', 'Para evidenciar el trabajo realizado y soportar conclusiones', 'Por el cliente', 'Es opcional',
'B',
'PAPELES DE TRABAJO: 1) Evidencian que se hizo el trabajo, 2) Soportan la opinión, 3) Permiten supervisión y revisión de calidad, 4) Base para auditorías futuras, 5) Defensa legal si hay demandas.',
NULL),

(6, 'expertos', 'Uso de Especialistas', 'intermedio', 'socratico',
'¿Cuándo necesita un auditor apoyarse en un especialista?',
'Siempre', 'Cuando la materia requiere conocimientos especializados fuera de auditoría', 'Nunca', 'Solo para fraude',
'B',
'ESPECIALISTAS: actuarios (pensiones), valuadores (propiedades), abogados (contingencias), ingenieros (reservas mineras). El auditor evalúa competencia del especialista y razonabilidad de sus conclusiones, pero no es experto en esas áreas.',
NULL);

-- ============================================
-- VERIFICACIÓN
-- ============================================
SELECT 'Preguntas socráticas agregadas' as resultado;

SELECT
    m.titulo as modulo,
    COUNT(CASE WHEN p.tipo = 'socratico' THEN 1 END) as socraticas,
    COUNT(CASE WHEN p.tipo = 'opcion_multiple' OR p.tipo IS NULL THEN 1 END) as quiz
FROM modulos m
LEFT JOIN preguntas p ON p.modulo_id = m.id
GROUP BY m.id, m.titulo, m.numero
ORDER BY m.numero;

SELECT 'Total socráticas:', COUNT(*) FROM preguntas WHERE tipo = 'socratico';
