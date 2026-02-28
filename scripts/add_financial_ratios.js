// scripts/add_financial_ratios.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xutsiuyihbufpnvhhccs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dHNpdXlpaGJ1ZnBudmhoY2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTcwOTUsImV4cCI6MjA4NTUzMzA5NX0.v31871_4RQKZGLSZOEQlR6n57nsxTsc_aP6D45CLwng';
const supabase = createClient(supabaseUrl, supabaseKey);

const nuevoModulo = {
    titulo: "Razones Financieras y Análisis",
    slug: "razones-financieras",
    descripcion: "Aprende a diagnosticar la salud de una empresa. Rentabilidad, liquidez, actividad y endeudamiento explicados de forma clara.",
    icon: "fa-solid fa-chart-pie",
    color: "#f59e0b",
    activo: true,
    numero: 6
};

const leccionesRazones = [
    {
        orden: 1, tipo: "teoria", titulo: "¿Qué son y para qué sirven las Razones Financieras?",
        contenido: "Las razones financieras son como el **'análisis de sangre'** de una empresa. Permiten a inversores y gerentes diagnosticar su salud financiera.\n\nSe dividen en 4 grandes grupos:\n1. **Liquidez**: Capacidad de pago a corto plazo.\n2. **Actividad / Eficiencia**: Qué tan bien se usan los activos e inventarios.\n3. **Deuda / Apalancamiento**: Nivel de endeudamiento y riesgo.\n4. **Rentabilidad**: Capacidad de generar ganancias reales."
    },
    {
        orden: 2, tipo: "teoria", titulo: "Razones de Liquidez",
        contenido: "Miden la capacidad de la empresa para cumplir sus obligaciones a corto plazo.\n\n- **Razón Circulante (o Corriente)** = `Activo Corriente / Pasivo Corriente`.\n  Nos dice cuántos dólares tenemos líquidos por cada dólar de deuda a corto plazo. Lo ideal es > 1.\n\n- **Prueba del Ácido** = `(Activo Corriente - Inventarios) / Pasivo Corriente`.\n  Es más estricta porque asume que los inventarios son difíciles de vender rápido. Si es > 1, la empresa es súper líquida y solvente."
    },
    {
        orden: 3, tipo: "teoria", titulo: "Razones de Rentabilidad",
        contenido: "¿El negocio vale la pena? Estas miden el retorno.\n\n- **Margen de Utilidad Neta** = `Utilidad Neta / Ventas Totales`.\n  Por cada dólar que vendemos, ¿cuánto nos queda libre de polvo y paja (después de impuestos)?\n\n- **ROA (Return on Assets)** = `Utilidad Neta / Activos Totales`.\n  Mide la eficiencia con la que los ACTIVOS generan ingresos.\n\n- **ROE (Return on Equity)** = `Utilidad Neta / Capital Contable`.\n  La reina para el accionista: indica cuánto rinde el dinero que los dueños invirtieron."
    },
    {
        orden: 4, tipo: "teoria", titulo: "Razones de Actividad y Deuda",
        contenido: "**Actividad (Eficiencia)**:\n- **Rotación de Inventarios** = `Costo de Ventas / Inventario Promedio`.\n  Cuántas veces se vende/renueva el almacén entero en el año. Entre más alto el número, más eficiente eres.\n\n**Deuda (Apalancamiento)**:\n- **Razón de Deuda Total** = `Pasivos Totales / Activos Totales`.\n  Qué porcentaje de tus pertenencias (activos) está financiado por el banco o proveedores. Arriba del 50% el riesgo financiero comienza a ser elevado."
    },
    {
        orden: 5, tipo: "teoria", titulo: "El Sistema DuPont (El Truco Maestro)",
        contenido: "El esquema DuPont es la radiografía del ROE. Descompone a la reina de la rentabilidad en 3 motores para saber EXACTAMENTE de dónde viene la ganancia:\n\n`ROE = Margen Neto × Rotación de Activos × Multiplicador de Capital`\n\n1. **Margen Neto**: Refleja la eficiencia operativa (si controlas bien tus gastos).\n2. **Rotación de Activos**: Eficiencia de uso (si vendes mucho usando poca maquinaria/bodegas).\n3. **Multiplicador de Capital**: Uso estratégico de deuda (apalancamiento). Usar dinero del banco aumenta la ganancia de los dueños... pero también el riesgo."
    }
];

const preguntasRazones = [
    {
        subtema: "Razones Financieras", nivel: "basico", tipo: "opcion_multiple",
        pregunta: "Si una empresa tiene un Activo Corriente de $1,000, un Pasivo Corriente de $500 y un Inventario de $300, ¿cuál es el resultado de su Prueba del Ácido?",
        opcion_a: "2.0", opcion_b: "1.4", opcion_c: "0.8", opcion_d: "1.6",
        respuesta_correcta: "b", explicacion: "Prueba del Ácido = (Activo Corriente - Inventario) / Pasivo Corriente = (1000 - 300) / 500 = 700 / 500 = 1.4",
        tema: "Finanzas", activo: true
    },
    {
        subtema: "Razones Financieras", nivel: "intermedio", tipo: "opcion_multiple",
        pregunta: "¿Qué componente del Sistema DuPont está directamente asociado a la política de precios y el control de costos de la empresa?",
        opcion_a: "Rotación de Activos Totales", opcion_b: "Multiplicador del Capital (Apalancamiento)", opcion_c: "Margen de Utilidad Neta", opcion_d: "Rendimiento sobre Inversión",
        respuesta_correcta: "c", explicacion: "El Margen Neto captura la capacidad de cobrar buenos precios y mantener bajos los costos, quedando más utilidad al final.",
        tema: "Finanzas", activo: true
    },
    {
        subtema: "Razones Financieras", nivel: "basico", tipo: "opcion_multiple",
        pregunta: "¿Qué señala financieramente una Razón Circulante menor a 1?",
        opcion_a: "Exceso de liquidez ociosa en bancos.", opcion_b: "Potencial incapacidad para cubrir deudas de corto plazo.", opcion_c: "Uso altamente ineficiente de activos fijos.", opcion_d: "Excelente y muy rápida rotación de inventarios.",
        respuesta_correcta: "b", explicacion: "Si la razón circulante (Activo Corriente / Pasivo Corriente) es menor a 1, indica que las deudas inmediatas superan los fondos inmediatos.",
        tema: "Finanzas", activo: true
    },
    {
        subtema: "Razones Financieras", nivel: "intermedio", tipo: "opcion_multiple",
        pregunta: "Una rotación de inventarios notablemente alta, comparada con el promedio de la industria, sugiere que la empresa:",
        opcion_a: "Mueve y concreta la venta de sus productos de forma muy ágil.", opcion_b: "Mantiene excesivo inventario parado en sus almacenes.", opcion_c: "Tiene graves problemas para cobrar a sus clientes.", opcion_d: "Está financiándose principalmente y arriesgadamente con deuda.",
        respuesta_correcta: "a", explicacion: "Entre más veces 'rote' el inventario, menos tiempo pasa almacenado sin generar dinero.",
        tema: "Finanzas", activo: true
    },
    {
        subtema: "Razones Financieras", nivel: "avanzado", tipo: "opcion_multiple",
        pregunta: "Asumiendo que Margen Neto y Rotación de Activos se mantienen constantes, si una empresa adquiere deuda bancaria nueva exclusivamente para recomprar acciones propias, ¿qué ocurrirá con su ROE (Return on Equity)?",
        opcion_a: "Disminuirá drásticamente por los intereses bancarios.", opcion_b: "Permanecerá inalterado.", opcion_c: "Aumentará, impulsado por el componente del multiplicador de capital.", opcion_d: "El ratio ya no podrá calcularse positivamente.",
        respuesta_correcta: "c", explicacion: "Bajo la identidad DuPont, el apalancamiento aumenta (menos capital propio, más deuda), lo que eleva el Multiplicador de Capital, inflando matemáticamente el ROE.",
        tema: "Finanzas", activo: true
    }
];

const leccionesTrucosEconomia = [
    {
        orden: 13, tipo: "teoria", titulo: "TRAMPA: La Trampa de Liquidez",
        contenido: "Concepto avanzado y muy evaluado en EGEL.\n\nOcurre cuando la tasa de interés dictada por el Banco Central ha caído a valores cercanos a CERO. A ese nivel, el público y los bancos prefieren atesorar efectivo (liquidez extrema) en lugar de invertir o prestar porque los rendimientos son nulos.\n\n**La Consecuencia:** La política monetaria (imprimir más dinero o bajar tasas) pierde TODO su efecto estimulante. El dinero nuevo simplemente se guarda bajo el colchón. Gráficamente, la curva LM se vuelve completamente **plana**.\n\n*HACK DE EXAMEN:* Ante una trampa de liquidez, la única herramienta del gobierno para salvar la economía es la **Política Fiscal expansiva** (aumentar el gasto público o construir puentes)."
    },
    {
        orden: 14, tipo: "teoria", titulo: "TRAMPA: Efecto Veblen y Bienes Giffen",
        contenido: "La Ley de la Demanda afirma: 'Si el precio sube, compran menos'. Pero existen dos grandes rebeldes que rompen esta regla sagrada y tienen demandas con **pendiente positiva**:\n\n1. **Bienes Giffen (Supervivencia)**: Son bienes inferiores de pobreza extrema (ej. papas en una hambruna). Si el precio de la papa sube tanto, la familia ya no tiene dinero para comprar la poca carne que comía, así que su única opción para no morir de hambre es comprar AÚN MÁS papas.\n\n2. **Efecto Veblen (Lujo y Ostentación)**: Si un reloj Rolex baja su precio a $20 dólares, los millonarios dejan de comprarlo porque ya no confiere 'estatus ni exclusividad'. Su atractivo se debe *exactamente* a que son impagables."
    },
    {
        orden: 15, tipo: "teoria", titulo: "TRUCO: Desplazamientos IS-LM al Instante",
        contenido: "No pierdas tiempo deduciendo en el examen. Memoriza estos gatillos:\n\n**Mueve la IS (Mercado de Bienes - Política Fiscal):**\n- *El Gobierno gasta más (↑G) o cobra menos impuestos (↓T)* -> IS a la Derecha -> (Sube Producción, Suben Tasas Púbicas).\n- *El Gobierno recorta gasto* -> IS a la Izquierda.\n\n**Mueve la LM (Mercado de Dinero - Política Monetaria):**\n- *Banco Central inyecta billetes (↑M)* -> LM a la Derecha -> (Bajan Tasas de Interés, Sube Producción Privada).\n- *Banco Central drena billetes (sube encaje legal)* -> LM a la Izquierda.\n\nSimplemente dibuja una 'X', la IS siempre baja (\\), la LM siempre sube (/). Mueve las líneas de acuerdo a la receta anterior."
    }
];

async function addContent() {
    console.log("Creando módulo de Razones Financieras...");
    const { data: modData, error: modErr } = await supabase.from('modulos').upsert([nuevoModulo], { onConflict: 'slug' }).select().single();
    if (modErr) throw modErr;

    console.log(`Módulo creado/obtenido: ${modData.titulo} (ID: ${modData.id})`);

    for (let l of leccionesRazones) {
        await supabase.from('contenido_clase').insert({
            modulo_id: modData.id,
            orden: l.orden,
            tipo: l.tipo,
            titulo: l.titulo,
            contenido: l.contenido
        });
    }
    console.log('Lecciones de razones financieras insertadas.');

    for (let p of preguntasRazones) {
        await supabase.from('preguntas').insert({
            modulo_id: modData.id,
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
    console.log('Preguntas de razones financieras insertadas.');

    // Inyectar trucos a Economía I
    // find ID for economia-1 (Economía I: Fundamentos Micro y Macro)
    const { data: econMod } = await supabase.from('modulos').select('id').eq('titulo', 'Economía I: Fundamentos Micro y Macro').single();
    if (econMod) {
        for (let l of leccionesTrucosEconomia) {
            await supabase.from('contenido_clase').insert({
                modulo_id: econMod.id,
                orden: l.orden,
                tipo: l.tipo,
                titulo: l.titulo,
                contenido: l.contenido
            });
        }
        console.log('Lecciones de trampas y trucos agregadas a Economía I.');
    } else {
        console.log('No se encontró el módulo Economía I.');
    }
    console.log('¡Todo finalizado!');
}

addContent().catch(console.error);
