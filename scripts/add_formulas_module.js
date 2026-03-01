import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xutsiuyihbufpnvhhccs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dHNpdXlpaGJ1ZnBudmhoY2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTcwOTUsImV4cCI6MjA4NTUzMzA5NX0.v31871_4RQKZGLSZOEQlR6n57nsxTsc_aP6D45CLwng';
const supabase = createClient(supabaseUrl, supabaseKey);

const nuevoModulo = {
    titulo: "Fórmulas y Tips de Resolución EGEL",
    slug: "formulas-y-tips",
    descripcion: "El acordeón definitivo. Todas las fórmulas clave de microeconomía, macroeconomía, finanzas y contabilidad, junto con trucos (hacks) para dominarlas en tu examen.",
    icon: "fa-solid fa-calculator",
    color: "#ec4899", // Pink
    activo: true,
    numero: 11
};

const leccionesFormulas = [
    {
        orden: 1, tipo: "teoria", titulo: "Microeconomía: Elasticidad y Costos",
        contenido: "📝 **Elasticidad Precio de la Demanda (EpD)**\n`EpD = % Cambio en Cantidad / % Cambio en Precio`\n> *Hack:* Si EpD > 1 es Elástica (lujos). Si EpD < 1 es Inelástica (necesidades). Si EpD = 1 es Unitaria.\n\n📝 **Costo Marginal (CMg)**\n`CMg = Cambio en el Costo Total / Cambio en la Cantidad`\n> *Hack:* El CMg cruza al Costo Medio (CMe) SIEMPRE en su punto más bajo. Es la regla de oro para maximizar ganancias (donde IMg = CMg).\n\n📝 **Elasticidad Cruzada**\n> *Hack:* Si el resultado es POSITIVO, son bienes Sustitutos (Peps vs Coca). Si es NEGATIVO, son Complementarios (Hotdog y Mostaza)."
    },
    {
        orden: 2, tipo: "teoria", titulo: "Macroeconomía: PIB y Multiplicador",
        contenido: "📝 **PIB por Enfoque de Gasto**\n`PIB = C + I + G + (X - M)`\n(Consumo + Inversión + Gasto de Gobierno + Exportaciones Netas)\n> *Hack:* Recuerda que si importamos más de lo que exportamos (X - M es negativo), el PIB general disminuye. A esto se le llama déficit comercial.\n\n📝 **Deflactor del PIB (Ajuste de Inflación)**\n`Deflactor = (PIB Nominal / PIB Real) × 100`\n> *Hack:* El PIB Real es el único que nos dice si realmente se produjeron más cosas. El Nominal está inflado por el cambio de precios.\n\n📝 **Multiplicador Keynesiano**\n`Multiplicador = 1 / (1 - Propensión Marginal a Consumir)`\n> *Hack:* Si el gobierno inyecta 100 pesos, la economía crece mucho más que 100 pesos por el efecto dominó del gasto."
    },
    {
        orden: 3, tipo: "teoria", titulo: "Finanzas Corporativas: VAN y TIR",
        contenido: "📝 **Valor Actual Neto (VAN o VPN)**\n`VAN = -Inversión Inicial + Sumatoria[Flujos / (1 + r)^t]`\n> *Hack:* Si VAN > 0, SE ACEPTA el proyecto porque genera valor extra. Si VAN = 0, apenas cubre el costo.\n\n📝 **Tasa Interna de Retorno (TIR)**\nEs la tasa (r) que hace que tu VAN sea exactamente CERO.\n> *Hack de Examen:* Regla de Oro. Acepta el proyecto SOLO SI la TIR es MAyor al costo de oportunidad del dinero (WACC o TREMA). `TIR > WACC -> ACEPTAR`.\n\n📝 **WACC (Costo Promedio Ponderado de Capital)**\n> *Hack:* Evalúa de dónde viene el dinero (Deuda vs Capital Propio). Recuerda que la DEUDA tiene escudo fiscal, por lo que su costo real es `Costo(1 - Tax)`."
    },
    {
        orden: 4, tipo: "teoria", titulo: "Razones Financieras Vitales",
        contenido: "📝 **Prueba del Ácido (Liquidez Estricta)**\n`(Activos Corrientes - Inventario) / Pasivos Corrientes`\n> *Hack:* Quito el inventario porque si hay una crisis, es lo más difícil de vender rápido para pagar nóminas o tarjetas de crédito.\n\n📝 **Sistema DuPont (Desglose del ROE)**\n`ROE = Margen Neto × Rotación de Activos × Multiplicador de Capital`\n> *Hack:* Si te preguntan si una empresa mejoró su ROE subiendo precios, busca que el *Margen Neto* sea el componente que subió. Si lo hizo pidiendo más préstamos, el *Multiplicador de Capital* subió.\n\n📝 **Margen de Contribución**\n`Precio de Venta Unitario - Costo Variable Unitario`\n> *Hack:* Lo que sobra para pagar la renta (Costo Fijo)."
    },
    {
        orden: 5, tipo: "teoria", titulo: "Contabilidad: Fórmulas Base",
        contenido: "📝 **Ecuación Contable Fundamental**\n`ACTIVO = PASIVO + CAPITAL`\n> *Hack:* Todo lo que *tienes* (Activo), o se lo *debes* a alguien (Pasivo) o es *tuyo* (Capital).\n\n📝 **Depreciación en Línea Recta**\n`(Costo de Activo - Valor de Rescate) / Vida Útil`\n> *Hack:* Esta fórmula desgasta el equipo de manera uniforme (todos los años se deprecia la misma cantidad de dinero).\n\n📝 **Punto de Equilibrio (en unidades)**\n`Costos Fijos Totales / Margen de Contribución Unitario`\n> *Hack:* Simplemente te dice cuántas piezas tienes que vender al mes para quedar en 'Ceros' (ni pierdes ni ganas)."
    }
];

const preguntasProblemas = [
    {
        subtema: "Evaluación de Proyectos", nivel: "avanzado", tipo: "problema",
        pregunta: "Una empresa analiza un proyecto con inversión inicial de $10,000 MXN. Generará flujos netos de efectivo de $5,000 MXN el Año 1, y $7,000 MXN el Año 2. Si la Tasa de Descuento (TREMA) es del 10%, ¿cuál es el Valor Actual Neto (VAN) aproximado?",
        opcion_a: "$4,545.45", opcion_b: "$330.58", opcion_c: "$2,000.00", opcion_d: "$784.60",
        respuesta_correcta: "b", explicacion: "VAN = -10,000 + [5000/(1.10)^1] + [7000/(1.10)^2] = -10,000 + 4,545.45 + 5,785.12 = + $330.58. Como el VAN es mayor a cero, el proyecto se acepta.",
        tema: "Finanzas", activo: true
    },
    {
        subtema: "Razones Financieras", nivel: "avanzado", tipo: "problema",
        pregunta: "La compañía 'TechBeta' reporta lo siguiente: Utilidad Neta $50,000, Activos Totales $200,000, e Ingresos Totales (Ventas) por $500,000. Utilizando el esquema DuPont, ¿cuál es el Margen de Utilidad Neta y su Rotación de Activos?",
        opcion_a: "Margen: 25%, Rotación: 4.0 veces", opcion_b: "Margen: 10%, Rotación: 2.5 veces", opcion_c: "Margen: 40%, Rotación: 1.5 veces", opcion_d: "Margen: 10%, Rotación: 1.0 veces",
        respuesta_correcta: "b", explicacion: "1) Margen Neto = Utilidad Neta / Ventas = 50k/500k = 10%. 2) Rotación de Activos = Ventas / Activos Totales = 500k/200k = 2.5 veces.",
        tema: "Finanzas", activo: true
    },
    {
        subtema: "Microeconomía", nivel: "avanzado", tipo: "problema",
        pregunta: "El precio de la carne de res pasa de $100 a $120 el kilo. Acto seguido, la cantidad demandada de pollo (un bien sustituto) aumenta de 50 a 60 unidades. Calcula la elasticidad cruzada de la demanda. ¿De qué tipo de bienes hablamos?",
        opcion_a: "-1.0, Bienes Complementarios", opcion_b: "0.5, Bienes Normales", opcion_c: "+1.0, Bienes Sustitutos", opcion_d: "+2.0, Bienes De Lujo",
        respuesta_correcta: "c", explicacion: "El % de cambio en Cantidad de pollo = (60-50)/50 = +20%. El % de cambio en Precio de Res = (120-100)/100 = +20%. Elasticidad Cruzada = +20% / +20% = +1.0. Al ser el signo positivo, el incremento del precio de la res aumenta la demanda del pollo, lo que comprueba algebraicamente que son sustitutos.",
        tema: "Economía", activo: true
    },
    {
        subtema: "Contabilidad de Costos", nivel: "intermedio", tipo: "problema",
        pregunta: "Una fábrica de libretas tiene costos fijos mensuales de $20,000. Producir cada libreta le cuesta $15 (costo variable) y la vende al público en $40. ¿Cuántas libretas debe vender al mes para alcanzar su Punto de Equilibrio?",
        opcion_a: "1,333 libretas", opcion_b: "800 libretas", opcion_c: "500 libretas", opcion_d: "1,000 libretas",
        respuesta_correcta: "b", explicacion: "El margen de contribución por libreta es Precio - Costo Variable = 40 - 15 = $25 pesos libres por unidad. La fórmula de Punto de Equilibrio es Costos Fijos / Margen de Contribución = 20,000 / 25 = 800 libretas.",
        tema: "Contaduría", activo: true
    },
    {
        subtema: "Matemáticas Financieras", nivel: "avanzado", tipo: "problema",
        pregunta: "Adquieres un préstamo de $1,000,000 MXN a una tasa de interés simple anual del 12%, a pagar en 3 años. ¿Cuánto será el interés total que pagarás al finalizar el periodo y el monto total final (capital + intereses)?",
        opcion_a: "Interés: $404,928 / Monto: $1,404,928", opcion_b: "Interés: $120,000 / Monto: $1,120,000", opcion_c: "Interés: $360,000 / Monto: $1,360,000", opcion_d: "Interés: $240,000 / Monto: $1,240,000",
        respuesta_correcta: "c", explicacion: "La fórmula de interés simple es I = Capital × Tasa × Tiempo. I = 1,000,000 × 0.12 × 3 = $360,000 de interés total. El pago final es el Capital + Interés = $1,360,000. Si dijera 'interés compuesto' el cálculo sería distinto.",
        tema: "Finanzas", activo: true
    },
    {
        subtema: "Depreciación", nivel: "intermedio", tipo: "problema",
        pregunta: "Una empresa adquiere maquinaria por $500,000 con una vida útil estimada de 10 años y un valor de rescate (salvamento) de $50,000. Utilizando el método de línea recta, ¿cuál será la depreciación acumulada reportada en el Balance General al finalizar el Año 4?",
        opcion_a: "$45,000", opcion_b: "$180,000", opcion_c: "$200,000", opcion_d: "$50,000",
        respuesta_correcta: "b", explicacion: "Depreciación anual = (Costo - Valor de Rescate) / Vida útil = (500,000 - 50,000) / 10 = $45,000 por año. Luego de 4 años, la Depreciación Acumulada es 45,000 × 4 = $180,000.",
        tema: "Contaduría", activo: true
    }
];

// Additional 9 practical problems roughly distributed across different subjects needed to meet the 15+ request in tasks.
const extraPreguntasProblemas = [
    {
        subtema: "Macroeconomía", nivel: "avanzado", tipo: "problema",
        pregunta: "En una economía cerrada y sin gobierno, el consumo autónomo es de $1,000 y la Propensión Marginal a Consumir (PMC) es de 0.8. Si la inversión privada aumenta en $500 millones, ¿cuál es el incremento total resultante en el Producto Interno Bruto (Transmisión del Multiplicador)?",
        opcion_a: "$1,500 millones", opcion_b: "$400 millones", opcion_c: "$2,500 millones", opcion_d: "$5,000 millones",
        respuesta_correcta: "c", explicacion: "Multiplicador Keynesiano = 1 / (1 - PMC) = 1 / (1 - 0.8) = 1 / 0.2 = 5. Incremento Total en PIB = Inyección Inicial × Multiplicador = 500 × 5 = $2,500 millones.",
        tema: "Economía", activo: true
    },
    {
        subtema: "Finanzas - Bonos", nivel: "avanzado", tipo: "problema",
        pregunta: "Determina el precio actual de un bono de gobierno que tiene un valor nominal de $1,000, paga cupones anuales del 8% y vence en 2 años. Asume que la tasa de interés vigente en el mercado (rendimiento exigido) es del 10%.",
        opcion_a: "$1,000.00", opcion_b: "$965.29", opcion_c: "$1,080.00", opcion_d: "$1,036.70",
        respuesta_correcta: "b", explicacion: "Precio del Bono = [Cupón/(1+r)] + [(Cupón+Nominal)/(1+r)^2]. Cupón = 8% de 1000 = $80. Precio = [80 / 1.10] + [1080 / (1.10)^2] = = 72.72 + 892.56 = $965.28. Cae bajo la par porque la tasa de mercado (10%) es mayor al cupón (8%).",
        tema: "Finanzas", activo: true
    },
    {
        subtema: "Microeconomía", nivel: "avanzado", tipo: "problema",
        pregunta: "La función de Costo Total (CT) de un monopolista es CT = 50 + 2Q. La función inversa de demanda a la que se enfrenta es Precio (P) = 20 - Q. Para maximizar sus beneficios, ¿cuál será el nivel de producción (Q*) que elegirá el monopolista?",
        opcion_a: "Q = 9", opcion_b: "Q = 10", opcion_c: "Q = 5", opcion_d: "Q = 18",
        respuesta_correcta: "a", explicacion: "Paso 1: IMg = CMg. Ingreso Total (IT) = P*Q = (20-Q)*Q = 20Q - Q^2. Ingreso Marginal (IMg) = derivada de IT = 20 - 2Q. Costo Marginal (CMg) = derivada de CT = 2. Igualamos: 20 - 2Q = 2. Resolviendo: 18 = 2Q -> Q = 9 unidades.",
        tema: "Economía", activo: true
    },
    {
        subtema: "Contabilidad de Costos", nivel: "intermedio", tipo: "problema",
        pregunta: "Durante su primer año, Industrias Omega incurrió en $40,000 de costos fijos de fabricación y $60,000 de costos variables de fabricación para producir 10,000 unidades, vendiendo solo 8,000. Bajo el Sistema de Costeo Absorbente, ¿cuál es el valor del Inventario Final de Producto Terminado?",
        opcion_a: "$12,000", opcion_b: "$8,000", opcion_c: "$20,000", opcion_d: "$10,000",
        respuesta_correcta: "c", explicacion: "Costeo Absorbente incluye costos fijos y variables en el producto. Costo Total de Producción = 40,000 + 60,000 = 100,000 para 10,000 unidades. Costo unitario = $10/unidad. Inventario final = 2,000 unidades no vendidas x $10 = $20,000.",
        tema: "Contaduría", activo: true
    },
    {
        subtema: "Finanzas - Análisis DuPont", nivel: "avanzado", tipo: "problema",
        pregunta: "Cálculo DuPont a la Inversa: Si una empresa registra un ROE del 15%, un margen de utilidad neta del 5% y una rotación de activos de 2.0. ¿A cuánto equivale su Multiplicador de Capital (Apalancamiento Financiero)?",
        opcion_a: "3.2", opcion_b: "1.5", opcion_c: "2.0", opcion_d: "0.75",
        respuesta_correcta: "b", explicacion: "Fórmula DuPont: ROE = Margen Neto × Rotación Activos × Multiplicador Capital. 15% = 5% × 2.0 × Multiplicador. => 15 = 10 × Multiplicador => Multiplicador = 15 / 10 = 1.5.",
        tema: "Finanzas", activo: true
    },
    {
        subtema: "Evaluación de Proyectos", nivel: "avanzado", tipo: "problema",
        pregunta: "Una máquina reduce costos operativos en $10,000 anuales a perpetuidad. Si el costo de oportunidad del capital (WACC) es del 8%, ¿cuál es el Valor Actual de esos ahorros, asumiendo flujos perpetuos constantes?",
        opcion_a: "$125,000", opcion_b: "$100,000", opcion_c: "$80,000", opcion_d: "Infinito",
        respuesta_correcta: "a", explicacion: "La fórmula matemática para la suma de una anualidad perpetua (renta vitalicia) es [Flujo de Caja Anual / Tasa de Descuento]. Valor Presente Perpetuidad = 10,000 / 0.08 = $125,000.",
        tema: "Finanzas", activo: true
    },
    {
        subtema: "Evaluación de Inventarios", nivel: "intermedio", tipo: "problema",
        pregunta: "La tienda 'PC Gamer' empieza enero con 1 laptop costeada en $10,000. Compra otra el 10 de enero a $12,000 y una tercera el 20 de enero a $15,000. Si vende 2 laptops el 30 de enero y usa el método PEPS (FIFO), ¿cuál será el Costo de Ventas reportado?",
        opcion_a: "$27,000", opcion_b: "$22,000", opcion_c: "$24,666", opcion_d: "$25,000",
        respuesta_correcta: "b", explicacion: "PEPS / FIFO (Primeras Entradas, Primeras Salidas). Las dos laptops vendidas tomarán el costo de las dos más antiguas en inventario. Costo de Ventas = 10,000 (la inicial) + 12,000 (la primera compra) = $22,000.",
        tema: "Contaduría", activo: true
    },
    {
        subtema: "Fiscal y Contabilidad", nivel: "avanzado", tipo: "problema",
        pregunta: "Una empresa genera Ingresos Gravables de $1,000,000 y Deducciones Autorizadas operativas de $600,000. Adicionalmente, tiene pérdidas fiscales acumuladas de años anteriores por $150,000 avaladas. Bajo un esquema básico donde la tasa corporativa de ISR es del 30%, ¿cuál será el ISR Causado del Ejercicio (sin considerar PTU)?",
        opcion_a: "$120,000", opcion_b: "$75,000", opcion_c: "$300,000", opcion_d: "$45,000",
        respuesta_correcta: "b", explicacion: "Utilidad Fiscal Estimada = Ingresos (1,000,000) - Deducciones (600,000) = 400,000. Resultado Fiscal Base para ISR = Utilidad Fiscal (400,000) - Pérdidas Amortizables (150,000) = 250,000. IRS Causado = 250,000 × 30% = $75,000.",
        tema: "Contaduría", activo: true
    },
    {
        subtema: "Macroeconomía", nivel: "avanzado", tipo: "problema",
        pregunta: "Tasa de Desempleo. En el país B, la Población Económicamente Activa (PEA) es de 50 millones y hay 46 millones de personas empleadas. Existen 5 millones de amas de casa e inactivos. Bajo el estándar de la OIT, ¿cuál es la tasa de desempleo abierto y correcto (desocupación)?",
        opcion_a: "10%", opcion_b: "8%", opcion_c: "7.2%", opcion_d: "8.7%",
        respuesta_correcta: "b", explicacion: "Las amas de casa o estudiantes no entran en la PEA por no buscar empleo activamente. El recuento total de Desempleados = PEA (50m) - Empleados (46m) = 4 millones. Tasa de desempleo = (Desempleados / PEA) × 100 = (4 / 50) × 100 = 8%.",
        tema: "Economía", activo: true
    }
];

async function run() {
    console.log("Creando módulo de Fórmulas y Tips...");
    const { data: modData, error: modErr } = await supabase.from('modulos').upsert([nuevoModulo], { onConflict: 'slug' }).select().single();
    if (modErr) throw modErr;

    console.log(`Módulo creado: ${modData.titulo}`);

    console.log("Insertando Lecciones (Acordeón de Fórmulas)....");
    for (let l of leccionesFormulas) {
        await supabase.from('contenido_clase').insert({
            modulo_id: modData.id,
            orden: l.orden,
            tipo: l.tipo,
            titulo: l.titulo,
            contenido: l.contenido
        });
    }

    console.log("Insertando Problemas Prácticos Avanzados en el banco de preguntas...");
    const allProblems = [...preguntasProblemas, ...extraPreguntasProblemas];

    // Asignar dinámicamente el módulo correcto a cada pregunta según su tema base
    // Vamos a buscar los modulos que coincidan.
    const { data: mods } = await supabase.from('modulos').select('id, slug');

    for (let p of allProblems) {
        let moduloId = modData.id; // Por defecto los echamos al módulo 11 si algo falla

        if (p.tema === "Economía") {
            const eco1 = mods.find(m => m.slug.includes('eco-1'));
            if (eco1) moduloId = eco1.id;
        } else if (p.tema === "Finanzas") {
            const finanzas = mods.find(m => m.slug.includes('eco-2'));
            if (finanzas) moduloId = finanzas.id;
        } else if (p.tema === "Contaduría") {
            const cont = mods.find(m => m.slug.includes('con-1') || m.slug.includes('con-2'));
            if (cont) moduloId = cont.id;
        }

        await supabase.from('preguntas').insert({
            modulo_id: moduloId,
            subtema: p.subtema,
            nivel: p.nivel,
            tipo: p.tipo,
            pregunta: p.pregunta,
            opcion_a: p.opcion_a,
            opcion_b: p.opcion_b,
            opcion_c: p.opcion_c,
            opcion_d: p.opcion_d,
            respuesta_correcta: p.respuesta_correcta,
            explicacion: p.explicacion,
            tema: p.tema,
            activo: p.activo
        });
    }

    console.log("¡15 problemas avanzados inyectados en sus respectivos módulos exitosamente!");
}

run().catch(console.error);
