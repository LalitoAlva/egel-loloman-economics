-- =============================================
-- INSERTS de contenido nuevo para contenido_clase
-- Solo temas NUEVOS en módulos EXISTENTES
-- Ejecutar en: Supabase SQL Editor
-- =============================================

-- ---- Módulo 1: Economía I (5 temas nuevos) ----

INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido) VALUES (
  1, 'guia', 31, 'Ley de Oferta y Demanda', '<div class="clase">
  <h2>Ley de Oferta y Demanda</h2>

  <section class="bloque que-es">
    <h3>🎯 ¿Qué es?</h3>
    <p>El mercado se equilibra donde oferta = demanda.</p>
  </section>

  <section class="bloque intuicion">
    <h3>🧠 Intuición</h3>
    <p>La Ley de Demanda: ↑Precio → ↓Cantidad demandada (relación inversa). La Ley de Oferta: ↑Precio → ↑Cantidad ofrecida (relación directa). El equilibrio ocurre donde las curvas se cruzan (Qd = Qs). Un exceso de oferta (precio arriba del equilibrio) presiona el precio a la baja. Un exceso de demanda (precio abajo del equilibrio) presiona al alza. Desplazamientos: cambios en ingreso, gustos o tecnología mueven las CURVAS; cambios en precio mueven SOBRE la curva.</p>
  </section>

  <section class="bloque desarrollo">
    <h3>📚 El Aguacate en Super Bowl</h3>
    <p>Antes del Super Bowl, la demanda de aguacate se dispara (la curva de demanda se desplaza a la derecha). Con la misma oferta, el precio sube de $30 a $60/kg. Los productores de Michoacán responden produciendo más (movimiento SOBRE la curva de oferta). Si además hay sequía, la oferta se desplaza a la izquierda y el precio sube aún más. El nuevo equilibrio tiene precio más alto y cantidad incierta.</p>
  </section>

  <section class="bloque autoevaluacion">
    <h3>📝 Autoevaluación</h3>
    <p><strong>Pregunta:</strong> ¿Cuál es la diferencia entre un ''''cambio en la cantidad demandada'''' y un ''''cambio en la demanda''''?</p>
    <p><em>Pista:</em> Movimiento sobre vs desplazamiento de la curva.</p>
    <p><strong>Respuesta:</strong> Un cambio en la cantidad demandada es un movimiento SOBRE la misma curva causado por un cambio en el PRECIO del bien. Un cambio en la demanda es un DESPLAZAMIENTO de toda la curva causado por factores externos (ingreso, gustos, precios de bienes relacionados, expectativas, número de consumidores).</p>
  </section>

  <section class="bloque idea-fuerza">
    <h3>🔑 Idea fuerza</h3>
    <p><strong>Quédate con esto: Ley de Oferta y Demanda = El mercado se equilibra donde oferta = demanda.</strong></p>
  </section>
</div>'
);

INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido) VALUES (
  1, 'guia', 32, 'Modelos de Duopolio: Cournot, Edgeworth y Chamberlin', '<div class="clase">
  <h2>Modelos de Duopolio: Cournot, Edgeworth y Chamberlin</h2>

  <section class="bloque que-es">
    <h3>🎯 ¿Qué es?</h3>
    <p>Cómo compiten dos empresas.</p>
  </section>

  <section class="bloque intuicion">
    <h3>🧠 Intuición</h3>
    <p>Cournot (1838): Las empresas compiten eligiendo CANTIDADES simultáneamente. Cada una decide cuánto producir tomando como dada la producción del rival. Equilibrio: cada empresa produce q = (a-c)/3 (1/3 de la demanda). Bertrand (1883): Compiten en PRECIOS → precio cae hasta costo marginal (resultado competitivo). Edgeworth: Como Bertrand pero con restricción de capacidad → no hay equilibrio en precios puros, hay ciclos. Chamberlin: Competencia monopolística → muchas empresas con productos diferenciados. Cada una tiene algo de poder de mercado por diferenciación.</p>
  </section>

  <section class="bloque desarrollo">
    <h3>📚 Coca-Cola vs Pepsi</h3>
    <p>Modelo Cournot: Ambas deciden cuántos litros producir. Si Coca produce mucho, Pepsi produce menos (reacción estratégica). Equilibrio: ambas producen menos que un monopolio pero más que en competencia perfecta. Modelo Chamberlin: Coca tiene sabor diferente a Pepsi → cada una enfrenta su propia curva de demanda con pendiente negativa. Pueden cobrar más que el costo marginal gracias a la lealtad de marca. Beneficio económico → entran nuevas marcas → demanda individual se reduce hasta beneficio cero a largo plazo.</p>
  </section>

  <section class="bloque autoevaluacion">
    <h3>📝 Autoevaluación</h3>
    <p><strong>Pregunta:</strong> ¿Por qué el resultado de Cournot da un precio ENTRE el de monopolio y el de competencia perfecta?</p>
    <p><em>Pista:</em> Número de empresas.</p>
    <p><strong>Respuesta:</strong> Porque con 2 empresas hay algo de competencia (presiona precio a la baja) pero no tanta como con muchas empresas. A medida que aumentan las empresas en el modelo de Cournot, el resultado converge al competitivo. Con 1 empresa = monopolio, con n→∞ = competencia perfecta. El duopolio de Cournot queda exactamente en medio.</p>
  </section>

  <section class="bloque idea-fuerza">
    <h3>🔑 Idea fuerza</h3>
    <p><strong>Quédate con esto: Modelos de Duopolio: Cournot, Edgeworth y Chamberlin = Cómo compiten dos empresas.</strong></p>
  </section>
</div>'
);

INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido) VALUES (
  1, 'guia', 33, 'Equilibrio Competitivo y Óptimo de Pareto', '<div class="clase">
  <h2>Equilibrio Competitivo y Óptimo de Pareto</h2>

  <section class="bloque que-es">
    <h3>🎯 ¿Qué es?</h3>
    <p>No se puede mejorar a uno sin empeorar a otro.</p>
  </section>

  <section class="bloque intuicion">
    <h3>🧠 Intuición</h3>
    <p>Un Óptimo de Pareto es una asignación donde NO es posible mejorar a alguien sin empeorar a otro. Primer Teorema del Bienestar: Todo equilibrio competitivo es Pareto-óptimo (eficiente). Segundo Teorema: Todo óptimo de Pareto puede alcanzarse como equilibrio competitivo con las transferencias adecuadas. La Caja de Edgeworth visualiza el intercambio entre 2 personas con 2 bienes: la Curva de Contrato une todos los puntos Pareto-óptimos.</p>
  </section>

  <section class="bloque desarrollo">
    <h3>📚 Repartir Pizza y Refresco</h3>
    <p>Ana tiene 3 pizzas y 1 refresco. Luis tiene 1 pizza y 3 refrescos. Ana prefiere refresco, Luis prefiere pizza. Si intercambian 1 pizza por 1 refresco, AMBOS mejoran → la asignación original NO era Pareto-óptima. Siguen intercambiando hasta que cualquier cambio adicional perjudicaría a uno → Óptimo de Pareto. En la Caja de Edgeworth, este punto está donde sus curvas de indiferencia son tangentes (RMS_Ana = RMS_Luis).</p>
  </section>

  <section class="bloque autoevaluacion">
    <h3>📝 Autoevaluación</h3>
    <p><strong>Pregunta:</strong> ¿Un Óptimo de Pareto es necesariamente ''''justo'''' o equitativo?</p>
    <p><em>Pista:</em> Una persona con todo y otra con nada.</p>
    <p><strong>Respuesta:</strong> No. Una asignación donde una persona tiene TODOS los bienes y la otra nada es Pareto-óptima (no puedes mejorar a la segunda sin quitarle a la primera). Pareto mide eficiencia, NO equidad. Por eso el Segundo Teorema del Bienestar es importante: permite redistribuir primero y luego dejar al mercado alcanzar la eficiencia.</p>
  </section>

  <section class="bloque idea-fuerza">
    <h3>🔑 Idea fuerza</h3>
    <p><strong>Quédate con esto: Equilibrio Competitivo y Óptimo de Pareto = No se puede mejorar a uno sin empeorar a otro.</strong></p>
  </section>
</div>'
);

INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido) VALUES (
  1, 'guia', 34, 'Contabilidad Nacional: PNB, Desempleo y Balanza Comercial', '<div class="clase">
  <h2>Contabilidad Nacional: PNB, Desempleo y Balanza Comercial</h2>

  <section class="bloque que-es">
    <h3>🎯 ¿Qué es?</h3>
    <p>Los indicadores que miden la salud de un país.</p>
  </section>

  <section class="bloque intuicion">
    <h3>🧠 Intuición</h3>
    <p>PIB = valor de todo lo producido DENTRO del país. PNB = PIB + ingresos de nacionales en el exterior - ingresos de extranjeros en el país. PIB per cápita = PIB / Población (indicador de nivel de vida promedio). Tasa de Desempleo = Desempleados / PEA × 100. PEA = personas que trabajan + buscan trabajo. Balanza Comercial = Exportaciones - Importaciones. Superávit: X > M. Déficit: M > X. Balanza de Pagos = Cuenta Corriente + Cuenta de Capital + Cuenta Financiera.</p>
  </section>

  <section class="bloque desarrollo">
    <h3>📚 México 2023 en Números</h3>
    <p>PIB: $1.3 billones USD. PNB: ligeramente menor porque muchas empresas extranjeras operan en México (sus ganancias salen). PIB per cápita: $10,800 USD (divide entre 130 millones). Desempleo: 2.8% (bajo, pero 55% está en informalidad → no se cuenta como ''''desempleado''''). Balanza Comercial con EE.UU.: superávit de $130,000 MDD (exportamos más). Con China: déficit de $90,000 MDD (importamos electrónicos).</p>
  </section>

  <section class="bloque autoevaluacion">
    <h3>📝 Autoevaluación</h3>
    <p><strong>Pregunta:</strong> ¿Por qué un país puede tener baja tasa de desempleo pero alta pobreza al mismo tiempo?</p>
    <p><em>Pista:</em> Calidad del empleo.</p>
    <p><strong>Respuesta:</strong> Porque la tasa de desempleo solo mide si tienes trabajo o no, no la CALIDAD del empleo. En México, 55% del empleo es informal (sin prestaciones, bajo salario). Una persona vendiendo chicles en la calle cuenta como ''''empleada''''. Por eso se complementa con indicadores como tasa de informalidad, subempleo y pobreza laboral (CONEVAL).</p>
  </section>

  <section class="bloque idea-fuerza">
    <h3>🔑 Idea fuerza</h3>
    <p><strong>Quédate con esto: Contabilidad Nacional: PNB, Desempleo y Balanza Comercial = Los indicadores que miden la salud de un país.</strong></p>
  </section>
</div>'
);

INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido) VALUES (
  1, 'guia', 35, 'Ciclos Económicos y Mercado Laboral', '<div class="clase">
  <h2>Ciclos Económicos y Mercado Laboral</h2>

  <section class="bloque que-es">
    <h3>🎯 ¿Qué es?</h3>
    <p>Expansión, recesión, y el empleo.</p>
  </section>

  <section class="bloque intuicion">
    <h3>🧠 Intuición</h3>
    <p>Los ciclos económicos tienen 4 fases: Expansión (PIB crece, empleo sube), Auge (pico del ciclo, presión inflacionaria), Recesión (PIB cae 2 trimestres consecutivos, desempleo sube), Depresión (recesión prolongada). Ley de Okun: por cada 1% que el PIB cae debajo de su potencial, el desempleo sube ~2%. Curva de Phillips de largo plazo: vertical en la tasa natural de desempleo → no hay trade-off permanente inflación-desempleo. NAIRU: tasa de desempleo que no acelera la inflación.</p>
  </section>

  <section class="bloque desarrollo">
    <h3>📚 La Crisis de 2008-2009 en México</h3>
    <p>2008: Expansión previa con PIB creciendo 3%. Crisis de EE.UU. contagia a México por: 1) Caída de exportaciones (70% van a EE.UU.), 2) Caída de remesas, 3) Caída del turismo. 2009: PIB cae -5.3%. Desempleo sube de 3.5% a 5.5% (Ley de Okun). Gobierno aplica política fiscal expansiva y Banxico baja tasas. 2010: Recuperación con PIB +5.1%. Ciclo completo en ~3 años.</p>
  </section>

  <section class="bloque autoevaluacion">
    <h3>📝 Autoevaluación</h3>
    <p><strong>Pregunta:</strong> Si la Curva de Phillips de largo plazo es vertical, ¿por qué los gobiernos intentan reducir el desempleo con política monetaria expansiva?</p>
    <p><em>Pista:</em> Corto vs largo plazo.</p>
    <p><strong>Respuesta:</strong> Porque en el CORTO PLAZO sí existe el trade-off: una política monetaria expansiva puede reducir temporalmente el desempleo por debajo de su tasa natural. Pero a largo plazo, los agentes ajustan expectativas de inflación, los salarios suben, y el desempleo regresa a su tasa natural pero con inflación más alta.</p>
  </section>

  <section class="bloque idea-fuerza">
    <h3>🔑 Idea fuerza</h3>
    <p><strong>Quédate con esto: Ciclos Económicos y Mercado Laboral = Expansión, recesión, y el empleo.</strong></p>
  </section>
</div>'
);

-- ---- Módulo 2: Finanzas (6 temas nuevos) ----

INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido) VALUES (
  2, 'guia', 9, 'Valor Presente Neto (VPN)', '<div class="clase">
  <h2>Valor Presente Neto (VPN)</h2>

  <section class="bloque que-es">
    <h3>🎯 ¿Qué es?</h3>
    <p>Cuánto vale hoy el dinero de mañana.</p>
  </section>

  <section class="bloque intuicion">
    <h3>🧠 Intuición</h3>
    <p>El VPN descuenta todos los flujos futuros de un proyecto a valor presente y les resta la inversión inicial. Si VPN > 0, el proyecto genera más de lo que cuesta. Si VPN < 0, destruye valor. Fórmula: VPN = -I₀ + Σ[Fₜ / (1+r)ᵗ]</p>
  </section>

  <section class="bloque desarrollo">
    <h3>📚 Abrir una Sucursal en Guadalajara</h3>
    <p>Inversión inicial: $500,000. Flujos esperados: Año 1: $150,000, Año 2: $200,000, Año 3: $250,000, Año 4: $200,000. Tasa de descuento: 10%. VPN = -500,000 + 150,000/1.1 + 200,000/1.21 + 250,000/1.331 + 200,000/1.4641 = -500,000 + 136,364 + 165,289 + 187,828 + 136,603 = $126,084. Como VPN > 0, el proyecto es viable.</p>
  </section>

  <section class="bloque autoevaluacion">
    <h3>📝 Autoevaluación</h3>
    <p><strong>Pregunta:</strong> Si la tasa de descuento sube de 10% a 15%, ¿qué le pasa al VPN del proyecto?</p>
    <p><em>Pista:</em> Los flujos futuros valen menos hoy.</p>
    <p><strong>Respuesta:</strong> Disminuye. Una tasa más alta descuenta más agresivamente los flujos futuros, reduciendo su valor presente. El proyecto puede dejar de ser rentable si el VPN se vuelve negativo.</p>
  </section>

  <section class="bloque idea-fuerza">
    <h3>🔑 Idea fuerza</h3>
    <p><strong>Quédate con esto: Valor Presente Neto (VPN) = Cuánto vale hoy el dinero de mañana.</strong></p>
  </section>
</div>'
);

INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido) VALUES (
  2, 'guia', 10, 'Tasa Interna de Retorno (TIR)', '<div class="clase">
  <h2>Tasa Interna de Retorno (TIR)</h2>

  <section class="bloque que-es">
    <h3>🎯 ¿Qué es?</h3>
    <p>La tasa que hace VPN = 0.</p>
  </section>

  <section class="bloque intuicion">
    <h3>🧠 Intuición</h3>
    <p>La TIR es la tasa de descuento que hace que el VPN sea exactamente cero. Es el rendimiento porcentual del proyecto. Regla: Si TIR > costo de capital → proyecto aceptable. Si TIR < costo de capital → rechazar.</p>
  </section>

  <section class="bloque desarrollo">
    <h3>📚 Subway vs Starbucks</h3>
    <p>Abrir un Subway cuesta $800,000 y tiene TIR del 18%. Abrir un Starbucks cuesta $1,200,000 y tiene TIR del 22%. Si tu costo de capital es 12%, ambos son viables (TIR > 12%). Pero ojo: la TIR NO considera el tamaño. El VPN del Starbucks podría ser mayor en pesos aunque el Subway tenga buena TIR.</p>
  </section>

  <section class="bloque autoevaluacion">
    <h3>📝 Autoevaluación</h3>
    <p><strong>Pregunta:</strong> ¿Por qué puede ser peligroso elegir proyectos SOLO por la TIR más alta?</p>
    <p><em>Pista:</em> Tamaño del proyecto.</p>
    <p><strong>Respuesta:</strong> Porque la TIR no considera la escala. Un proyecto pequeño con TIR del 50% puede generar $10,000 de VPN, mientras que uno grande con TIR del 20% puede generar $500,000 de VPN. Siempre complementa con VPN.</p>
  </section>

  <section class="bloque idea-fuerza">
    <h3>🔑 Idea fuerza</h3>
    <p><strong>Quédate con esto: Tasa Interna de Retorno (TIR) = La tasa que hace VPN = 0.</strong></p>
  </section>
</div>'
);

INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido) VALUES (
  2, 'guia', 11, 'Evaluación de Inversión Pública', '<div class="clase">
  <h2>Evaluación de Inversión Pública</h2>

  <section class="bloque que-es">
    <h3>🎯 ¿Qué es?</h3>
    <p>Beneficio social vs beneficio privado.</p>
  </section>

  <section class="bloque intuicion">
    <h3>🧠 Intuición</h3>
    <p>La inversión pública usa análisis Costo-Beneficio Social. A diferencia del sector privado, incluye externalidades, precios sombra y beneficios no monetarios (salud, educación, medio ambiente). Se usa la Tasa Social de Descuento (más baja que la privada, ~10% en México según SHCP).</p>
  </section>

  <section class="bloque desarrollo">
    <h3>📚 Hospital vs Carretera</h3>
    <p>Un hospital genera beneficios difíciles de medir en dinero: vidas salvadas, productividad recuperada, bienestar. El análisis costo-beneficio social asigna ''''precios sombra'''' a estos beneficios. La SHCP en México exige que todo proyecto de inversión pública demuestre que sus beneficios sociales superan sus costos usando la metodología del CEPEP.</p>
  </section>

  <section class="bloque autoevaluacion">
    <h3>📝 Autoevaluación</h3>
    <p><strong>Pregunta:</strong> ¿Por qué la tasa social de descuento es menor que la tasa privada?</p>
    <p><em>Pista:</em> Horizonte temporal del gobierno.</p>
    <p><strong>Respuesta:</strong> Porque el gobierno tiene un horizonte de planeación más largo que las empresas privadas y debe considerar el bienestar de generaciones futuras. Una tasa más baja da más peso al futuro, justificando proyectos de largo plazo como infraestructura.</p>
  </section>

  <section class="bloque idea-fuerza">
    <h3>🔑 Idea fuerza</h3>
    <p><strong>Quédate con esto: Evaluación de Inversión Pública = Beneficio social vs beneficio privado.</strong></p>
  </section>
</div>'
);

INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido) VALUES (
  2, 'guia', 12, 'Valor del Dinero en el Tiempo', '<div class="clase">
  <h2>Valor del Dinero en el Tiempo</h2>

  <section class="bloque que-es">
    <h3>🎯 ¿Qué es?</h3>
    <p>Un peso hoy vale más que un peso mañana.</p>
  </section>

  <section class="bloque intuicion">
    <h3>🧠 Intuición</h3>
    <p>Concepto fundamental de finanzas: el dinero tiene un costo de oportunidad temporal. Valor Futuro: VF = VP × (1+r)ⁿ. Valor Presente: VP = VF / (1+r)ⁿ. Anualidades: VP = PMT × [(1-(1+r)⁻ⁿ)/r]. Perpetuidades: VP = PMT/r.</p>
  </section>

  <section class="bloque desarrollo">
    <h3>📚 La Herencia del Abuelo</h3>
    <p>Tu abuelo te ofrece: A) $100,000 hoy, o B) $150,000 en 5 años. Con una tasa del 10%: VP de opción B = 150,000/(1.1)⁵ = $93,138. ¡Opción A vale más! Necesitarías que te ofrecieran al menos $161,051 en 5 años para que fuera equivalente a $100,000 hoy.</p>
  </section>

  <section class="bloque autoevaluacion">
    <h3>📝 Autoevaluación</h3>
    <p><strong>Pregunta:</strong> Si la inflación es del 5% anual, ¿cuánto poder adquisitivo pierdes si guardas $10,000 bajo el colchón por 3 años?</p>
    <p><em>Pista:</em> Fórmula de valor futuro invertida.</p>
    <p><strong>Respuesta:</strong> Valor real = 10,000 / (1.05)³ = $8,638. Pierdes $1,362 de poder adquisitivo (13.6%). Por eso el dinero debe estar invertido al menos a la tasa de inflación para mantener su valor.</p>
  </section>

  <section class="bloque idea-fuerza">
    <h3>🔑 Idea fuerza</h3>
    <p><strong>Quédate con esto: Valor del Dinero en el Tiempo = Un peso hoy vale más que un peso mañana.</strong></p>
  </section>
</div>'
);

INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido) VALUES (
  2, 'guia', 13, 'Razones Financieras', '<div class="clase">
  <h2>Razones Financieras</h2>

  <section class="bloque que-es">
    <h3>🎯 ¿Qué es?</h3>
    <p>Radiografía de la salud financiera.</p>
  </section>

  <section class="bloque intuicion">
    <h3>🧠 Intuición</h3>
    <p>Las razones financieras se dividen en 4 familias: 1) LIQUIDEZ: Razón Circulante = Activo Circulante / Pasivo Circulante (capacidad de pagar deudas CP, ideal >1). Prueba Ácida = (AC - Inventarios) / PC (más estricta). 2) ACTIVIDAD: Rotación de Inventarios = Costo de Ventas / Inventario Promedio (veces que vendes tu inventario al año). Rotación CxC = Ventas a Crédito / CxC Promedio. Días de Cobro = 365 / Rotación CxC. 3) APALANCAMIENTO: Deuda/Capital = Pasivo Total / Capital Contable. Cobertura de Intereses = EBITDA / Gastos Financieros. 4) RENTABILIDAD: ROE = Utilidad Neta / Capital Contable. ROA = Utilidad Neta / Activo Total. Margen Neto = Utilidad Neta / Ventas. Fórmula DuPont: ROE = Margen × Rotación de Activos × Apalancamiento.</p>
  </section>

  <section class="bloque desarrollo">
    <h3>📚 Diagnóstico de una Tienda de Ropa</h3>
    <p>La tienda tiene: AC $500,000, Inventarios $300,000, PC $400,000, Capital $600,000, Pasivo Total $800,000, Ventas $1,200,000, Utilidad Neta $120,000. Razón Circulante = 500/400 = 1.25 (puede pagar sus deudas). Prueba Ácida = (500-300)/400 = 0.5 (¡alerta! sin vender inventario no puede pagar). Deuda/Capital = 800/600 = 1.33 (debe más de lo que tiene propio). ROE = 120/600 = 20% (buen rendimiento). Diagnóstico: rentable pero con riesgo de liquidez por exceso de inventario.</p>
  </section>

  <section class="bloque autoevaluacion">
    <h3>📝 Autoevaluación</h3>
    <p><strong>Pregunta:</strong> Una empresa tiene Razón Circulante de 3.0. ¿Eso es necesariamente bueno?</p>
    <p><em>Pista:</em> Demasiada liquidez tiene un costo.</p>
    <p><strong>Respuesta:</strong> No necesariamente. Una razón muy alta puede indicar que la empresa tiene demasiado efectivo ocioso o inventario estancado que podría estar invertido generando rendimiento. Lo ideal depende de la industria, pero generalmente entre 1.5 y 2.5 es saludable. Hay que complementar con la Prueba Ácida y la rotación de inventarios.</p>
  </section>

  <section class="bloque idea-fuerza">
    <h3>🔑 Idea fuerza</h3>
    <p><strong>Quédate con esto: Razones Financieras = Radiografía de la salud financiera.</strong></p>
  </section>
</div>'
);

INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido) VALUES (
  2, 'guia', 14, 'Evaluación de Inversión Privada', '<div class="clase">
  <h2>Evaluación de Inversión Privada</h2>

  <section class="bloque que-es">
    <h3>🎯 ¿Qué es?</h3>
    <p>Maximizar rentabilidad con riesgo controlado.</p>
  </section>

  <section class="bloque intuicion">
    <h3>🧠 Intuición</h3>
    <p>La evaluación de inversión privada busca maximizar el rendimiento para los accionistas. Herramientas: 1) Análisis de Sensibilidad: varía una variable a la vez (¿qué pasa si ventas caen 20%?). 2) Análisis de Escenarios: Optimista, Base, Pesimista con probabilidades. VPN Esperado = Σ(prob × VPN). 3) Punto de Equilibrio: unidades mínimas para cubrir costos. 4) Relación Riesgo-Rendimiento: mayor riesgo debe compensarse con mayor rendimiento. 5) Estructura de capital: proporción óptima deuda vs capital propio minimiza WACC.</p>
  </section>

  <section class="bloque desarrollo">
    <h3>📚 Franquicia de Café: ¿Conviene?</h3>
    <p>Inversión: $2,000,000. Escenario Optimista (30%): VPN = $800,000. Base (50%): VPN = $200,000. Pesimista (20%): VPN = -$400,000. VPN Esperado = 0.3(800) + 0.5(200) + 0.2(-400) = $240 + $100 - $80 = $260,000. Proyecto viable en promedio. Pero sensibilidad muestra que si renta sube 30%, VPN base se vuelve negativo. Recomendación: negociar contrato de renta fija a largo plazo antes de invertir.</p>
  </section>

  <section class="bloque autoevaluacion">
    <h3>📝 Autoevaluación</h3>
    <p><strong>Pregunta:</strong> ¿Por qué una empresa usaría deuda si tiene suficiente capital propio?</p>
    <p><em>Pista:</em> Escudo fiscal y costo de oportunidad.</p>
    <p><strong>Respuesta:</strong> Porque la deuda tiene beneficio fiscal: los intereses son deducibles de impuestos, reduciendo el costo efectivo. Si la tasa de interés después de impuestos es menor que el ROE, conviene usar deuda (apalancamiento financiero positivo). Además, el capital propio tiene costo de oportunidad: podría invertirse en otro proyecto rentable.</p>
  </section>

  <section class="bloque idea-fuerza">
    <h3>🔑 Idea fuerza</h3>
    <p><strong>Quédate con esto: Evaluación de Inversión Privada = Maximizar rentabilidad con riesgo controlado.</strong></p>
  </section>
</div>'
);

-- ---- Módulo 3: Internacional (6 temas nuevos) ----

INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido) VALUES (
  3, 'guia', 63, '3. Balanza de Pagos', '<div class="clase">
  <h2>3. Balanza de Pagos</h2>

  <section class="bloque que-es">
    <h3>🎯 ¿Qué es?</h3>
    <p>Registro de transacciones económicas con el exterior</p>
  </section>

  <section class="bloque intuicion">
    <h3>🧠 Intuición</h3>
    <p>La Balanza de Pagos registra TODAS las transacciones económicas de un país con el resto del mundo. Se divide en: (1) Cuenta Corriente: exportaciones e importaciones de bienes (balanza comercial), servicios, ingreso primario (remesas de utilidades) e ingreso secundario (remesas familiares). (2) Cuenta de Capital: transferencias de activos no financieros. (3) Cuenta Financiera: inversión extranjera directa (IED), inversión de cartera, préstamos. Principio fundamental: la Balanza de Pagos SIEMPRE suma cero (contabilidad de partida doble). Un déficit en cuenta corriente se financia con superávit en cuenta financiera (entrada de capital extranjero).</p>
  </section>

  <section class="bloque desarrollo">
    <h3>📚 México y las Remesas</h3>
    <p>México exporta petróleo ($30,000 MDD) pero importa más bienes ($45,000 MDD). Déficit comercial de -$15,000 MDD. Sin embargo, recibe $60,000 MDD en remesas (ingreso secundario). Esto compensa el déficit comercial y genera superávit en cuenta corriente. Si además llega IED ($35,000 MDD), la cuenta financiera también tiene superávit. Las reservas internacionales de Banxico crecen.</p>
  </section>

  <section class="bloque autoevaluacion">
    <h3>📝 Autoevaluación</h3>
    <p><strong>Pregunta:</strong> Si un país tiene déficit en cuenta corriente durante 10 años seguidos, ¿es necesariamente malo?</p>
    <p><em>Pista:</em> ¿Cómo se financia ese déficit?</p>
    <p><strong>Respuesta:</strong> No necesariamente. Si se financia con IED productiva (fábricas, tecnología), es sostenible porque genera capacidad exportadora futura. Pero si se financia con deuda de corto plazo (capital golondrina), es peligroso: ese capital puede huir ante cualquier crisis, provocando una devaluación (como México en 1994).</p>
    <hr/>
    <p><strong>Pregunta:</strong> ¿Por qué las remesas familiares se registran en ingreso secundario y no en cuenta financiera?</p>
    <p><em>Pista:</em> ¿Es una inversión o una transferencia sin contraprestación?</p>
    <p><strong>Respuesta:</strong> Porque son transferencias unilaterales: el trabajador envía dinero a su familia sin recibir un activo o servicio a cambio. No es inversión (cuenta financiera) ni pago por un servicio (cuenta corriente-servicios). Es ingreso secundario porque es una transferencia corriente sin contraprestación.</p>
  </section>

  <section class="bloque idea-fuerza">
    <h3>🔑 Idea fuerza</h3>
    <p><strong>Quédate con esto: 3. Balanza de Pagos = Registro de transacciones económicas con el exterior</strong></p>
  </section>
</div>'
);

INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido) VALUES (
  3, 'guia', 64, '4. Tipo de Cambio y Mercado de Divisas', '<div class="clase">
  <h2>4. Tipo de Cambio y Mercado de Divisas</h2>

  <section class="bloque que-es">
    <h3>🎯 ¿Qué es?</h3>
    <p>Determinación del precio de las monedas</p>
  </section>

  <section class="bloque intuicion">
    <h3>🧠 Intuición</h3>
    <p>El tipo de cambio es el precio de una moneda en términos de otra. Regímenes: (1) Tipo de cambio fijo: el banco central fija el precio y usa reservas para defenderlo. (2) Flotación libre: lo determina la oferta y demanda del mercado. (3) Flotación administrada (México actual): flota libremente pero el banco central interviene ocasionalmente. Teoría de Paridad del Poder Adquisitivo (PPP): a largo plazo, el tipo de cambio se ajusta para que un bien cueste lo mismo en dos países. Paridad de tasas de interés: si México tiene tasas más altas que EE.UU., el peso se aprecia en el corto plazo (entra capital buscando rendimiento), pero se esperaría una depreciación futura.</p>
  </section>

  <section class="bloque desarrollo">
    <h3>📚 El Carry Trade con el Peso Mexicano</h3>
    <p>2023: Tasa en México = 11.25%, en EE.UU. = 5.25%. Diferencial = 6%. Inversionistas piden prestado dólares baratos, los cambian a pesos, los invierten en Cetes. Ganan 6% extra. Esto APRECIA el peso (demanda de pesos sube). El peso pasa de $20 a $17 por dólar. Pero si Banxico baja tasas, el carry trade se deshace: venden pesos, compran dólares, el peso se DEPRECIA rápidamente.</p>
  </section>

  <section class="bloque autoevaluacion">
    <h3>📝 Autoevaluación</h3>
    <p><strong>Pregunta:</strong> Si la inflación en México es 5% y en EE.UU. es 2%, ¿qué predice la PPP sobre el tipo de cambio?</p>
    <p><em>Pista:</em> La moneda del país con mayor inflación se...</p>
    <p><strong>Respuesta:</strong> El peso debería depreciarse aproximadamente 3% (diferencial de inflación). Si el tipo de cambio era $17, debería moverse hacia $17.51. La lógica: los bienes mexicanos se encarecen más rápido, pierden competitividad, la demanda de pesos cae. A largo plazo, PPP tiende a cumplirse, pero a corto plazo hay muchas desviaciones.</p>
  </section>

  <section class="bloque idea-fuerza">
    <h3>🔑 Idea fuerza</h3>
    <p><strong>Quédate con esto: 4. Tipo de Cambio y Mercado de Divisas = Determinación del precio de las monedas</strong></p>
  </section>
</div>'
);

INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido) VALUES (
  3, 'guia', 65, '5. Política Comercial: Aranceles y Cuotas', '<div class="clase">
  <h2>5. Política Comercial: Aranceles y Cuotas</h2>

  <section class="bloque que-es">
    <h3>🎯 ¿Qué es?</h3>
    <p>Instrumentos de protección al comercio</p>
  </section>

  <section class="bloque intuicion">
    <h3>🧠 Intuición</h3>
    <p>Los gobiernos intervienen en el comercio con: (1) Aranceles: impuesto a las importaciones. Efecto: sube precio doméstico, protege al productor local, perjudica al consumidor, genera recaudación fiscal, pero crea pérdida de eficiencia (triángulos de Harberger). (2) Cuotas: límite a la cantidad importada. Efecto similar al arancel pero sin recaudación para el gobierno (la renta va al importador con licencia). (3) Subsidios a exportaciones: pago del gobierno al exportador. Distorsiona precios, puede generar represalias (guerras comerciales). Argumento de la industria naciente (List, 1841): proteger temporalmente industrias nuevas hasta que sean competitivas. Problema: las protecciones ''''temporales'''' suelen volverse permanentes.</p>
  </section>

  <section class="bloque desarrollo">
    <h3>📚 T-MEC y el Acero</h3>
    <p>EE.UU. pone arancel de 25% al acero importado (Sección 232). Antes: acero chino costaba $500/ton en EE.UU. Después: $625/ton. Productores de acero de EE.UU. celebran (pueden cobrar hasta $624 sin perder competitividad). Pero las automotrices de Detroit sufren: su insumo subió 25%. ¿Ganó EE.UU.? El empleo en acero subió 1,800, pero se perdieron 75,000 empleos en industrias que usan acero. Pérdida neta.</p>
  </section>

  <section class="bloque autoevaluacion">
    <h3>📝 Autoevaluación</h3>
    <p><strong>Pregunta:</strong> ¿Por qué una cuota de importación es PEOR que un arancel que produce el mismo efecto en precios?</p>
    <p><em>Pista:</em> ¿Quién se queda con la ''''renta'''' en cada caso?</p>
    <p><strong>Respuesta:</strong> Con un arancel, el gobierno recauda ingresos (área c del diagrama). Con una cuota, esa misma renta va a quien tiene la licencia de importación (a menudo una empresa extranjera o un importador con conexiones políticas). El efecto en precios y cantidades es igual, pero la distribución de la renta es menos eficiente con cuotas.</p>
  </section>

  <section class="bloque idea-fuerza">
    <h3>🔑 Idea fuerza</h3>
    <p><strong>Quédate con esto: 5. Política Comercial: Aranceles y Cuotas = Instrumentos de protección al comercio</strong></p>
  </section>
</div>'
);

INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido) VALUES (
  3, 'guia', 66, '6. Ventaja Comparativa (Ricardo)', '<div class="clase">
  <h2>6. Ventaja Comparativa (Ricardo)</h2>

  <section class="bloque que-es">
    <h3>🎯 ¿Qué es?</h3>
    <p>Por qué los países comercian aunque uno sea mejor en todo</p>
  </section>

  <section class="bloque intuicion">
    <h3>🧠 Intuición</h3>
    <p>David Ricardo (1817) demostró que un país debe especializarse en producir aquello donde tiene MENOR costo de oportunidad, aunque sea peor en todo (ventaja absoluta). Clave: lo que importa no es ser el ''''mejor'''', sino ser el ''''menos malo relativamente''''. Si México produce 10 autos o 50 toneladas de maíz, y EE.UU. produce 30 autos o 60 toneladas, EE.UU. tiene ventaja absoluta en ambos. Pero el costo de oportunidad de 1 auto en México es 5 ton maíz, y en EE.UU. es 2 ton. EE.UU. tiene ventaja comparativa en autos (costo de oportunidad menor). México debe especializarse en maíz. Ambos ganan con el comercio.</p>
  </section>

  <section class="bloque desarrollo">
    <h3>📚 El Abogado y su Secretaria</h3>
    <p>Un abogado escribe 80 palabras por minuto y su secretaria 60. El abogado es MEJOR en todo (ventaja absoluta en ambas tareas). Pero su hora vale $2,000 (abogacía) vs $200 (mecanografía). El costo de oportunidad de que el abogado teclee es $2,000/hora. Debe especializarse en abogacía y contratar a la secretaria para teclear, aunque él teclee más rápido.</p>
  </section>

  <section class="bloque autoevaluacion">
    <h3>📝 Autoevaluación</h3>
    <p><strong>Pregunta:</strong> Si China es más eficiente que México en producir TODOS los bienes, ¿por qué México sigue exportando?</p>
    <p><em>Pista:</em> Costo de oportunidad relativo.</p>
    <p><strong>Respuesta:</strong> Porque México tiene ventaja comparativa en algunos bienes (menor costo de oportunidad). China puede ser mejor en todo (ventaja absoluta), pero no puede especializarse en todo simultáneamente. Si China tiene ventaja comparativa enorme en electrónica, le conviene más concentrarse ahí e importar aguacates de México, aunque también pudiera producirlos.</p>
  </section>

  <section class="bloque idea-fuerza">
    <h3>🔑 Idea fuerza</h3>
    <p><strong>Quédate con esto: 6. Ventaja Comparativa (Ricardo) = Por qué los países comercian aunque uno sea mejor en todo</strong></p>
  </section>
</div>'
);

INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido) VALUES (
  3, 'guia', 67, '7. Bloques Económicos e Integración', '<div class="clase">
  <h2>7. Bloques Económicos e Integración</h2>

  <section class="bloque que-es">
    <h3>🎯 ¿Qué es?</h3>
    <p>TLC, uniones aduaneras y mercados comunes</p>
  </section>

  <section class="bloque intuicion">
    <h3>🧠 Intuición</h3>
    <p>Niveles de integración económica (de menor a mayor): (1) Área de Libre Comercio: eliminan aranceles entre sí, cada uno mantiene los suyos con terceros (T-MEC). (2) Unión Aduanera: libre comercio interno + arancel externo común (Mercosur). (3) Mercado Común: + libre movilidad de factores (trabajo, capital). (4) Unión Económica: + política económica común (UE pre-euro). (5) Unión Monetaria: + moneda común (Zona Euro). Efectos: creación de comercio (positivo, sustituyes producción cara nacional por importación barata del socio) vs desviación de comercio (negativo, dejas de comprar al más eficiente del mundo por comprarle al socio que tiene preferencia arancelaria).</p>
  </section>

  <section class="bloque desarrollo">
    <h3>📚 T-MEC vs TPP</h3>
    <p>T-MEC (México-EE.UU.-Canadá): Área de libre comercio. México exporta autos a EE.UU. sin arancel, pero debe cumplir reglas de origen (75% contenido regional). Si México firma con China, EE.UU. no tiene que aceptar esas importaciones (cada país mantiene su política con terceros). Zona Euro: 20 países con una moneda (euro), un banco central (BCE), pero diferentes políticas fiscales. Problema: Grecia no podía devaluar su moneda para salir de la crisis de 2010.</p>
  </section>

  <section class="bloque autoevaluacion">
    <h3>📝 Autoevaluación</h3>
    <p><strong>Pregunta:</strong> ¿Por qué la desviación de comercio es negativa para el bienestar global?</p>
    <p><em>Pista:</em> Piensa en quién es el productor más eficiente del mundo.</p>
    <p><strong>Respuesta:</strong> Porque dejas de comprarle al productor más barato del mundo (que está fuera del bloque) para comprarle a tu socio comercial (que es más caro pero no paga arancel). Ejemplo: México importaba textiles de China a $5 (con arancel $7). Con T-MEC, importa de EE.UU. a $6 (sin arancel). Pagamos más ($6 vs $5), el mundo produce menos eficientemente.</p>
  </section>

  <section class="bloque idea-fuerza">
    <h3>🔑 Idea fuerza</h3>
    <p><strong>Quédate con esto: 7. Bloques Económicos e Integración = TLC, uniones aduaneras y mercados comunes</strong></p>
  </section>
</div>'
);

INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido) VALUES (
  3, 'guia', 68, '8. Organismos Económicos Internacionales', '<div class="clase">
  <h2>8. Organismos Económicos Internacionales</h2>

  <section class="bloque que-es">
    <h3>🎯 ¿Qué es?</h3>
    <p>FMI, Banco Mundial, OMC y su papel</p>
  </section>

  <section class="bloque intuicion">
    <h3>🧠 Intuición</h3>
    <p>Principales organismos: (1) FMI (Fondo Monetario Internacional): prestamista de última instancia para países con crisis de balanza de pagos. Condiciona préstamos a reformas (austeridad fiscal, liberalización). Creado en Bretton Woods (1944). (2) Banco Mundial: financiamiento para desarrollo (infraestructura, educación, salud). Enfocado en países en desarrollo. (3) OMC (Organización Mundial del Comercio): regula el comercio internacional, resuelve disputas comerciales, promueve la liberalización. Principios: nación más favorecida (si das un beneficio a uno, a todos), trato nacional (importaciones tratadas igual que nacionales). (4) OCDE: club de países ''''ricos'''', coordina políticas económicas, produce estadísticas y recomendaciones.</p>
  </section>

  <section class="bloque desarrollo">
    <h3>📚 México y el FMI en 1995</h3>
    <p>Crisis del Tequila (1994-95): México agota reservas defendiendo el peso fijo. Devaluación de 50%. No puede pagar deuda de corto plazo. Acude al FMI que organiza un rescate de $50,000 MDD (el más grande hasta entonces). Condiciones: austeridad fiscal, altas tasas de interés, privatizaciones. México pagó todo anticipadamente en 2000. Lección: el FMI ayuda pero sus condiciones son dolorosas socialmente.</p>
  </section>

  <section class="bloque autoevaluacion">
    <h3>📝 Autoevaluación</h3>
    <p><strong>Pregunta:</strong> ¿Por qué el FMI es criticado por imponer ''''austeridad'''' a países en crisis?</p>
    <p><em>Pista:</em> Política fiscal contractiva en recesión.</p>
    <p><strong>Respuesta:</strong> Porque exige recortar gasto público y subir impuestos (austeridad) justamente cuando el país está en recesión. Keynes diría que eso PROFUNDIZA la crisis. El argumento del FMI: es necesario para restaurar la confianza de inversionistas y estabilizar la moneda. El debate sigue vigente: ¿estabilidad primero o crecimiento primero?</p>
  </section>

  <section class="bloque idea-fuerza">
    <h3>🔑 Idea fuerza</h3>
    <p><strong>Quédate con esto: 8. Organismos Económicos Internacionales = FMI, Banco Mundial, OMC y su papel</strong></p>
  </section>
</div>'
);

-- =============================================
-- FIN de los INSERTs
-- =============================================
