import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xutsiuyihbufpnvhhccs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dHNpdXlpaGJ1ZnBudmhoY2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTcwOTUsImV4cCI6MjA4NTUzMzA5NX0.v31871_4RQKZGLSZOEQlR6n57nsxTsc_aP6D45CLwng';
const supabase = createClient(supabaseUrl, supabaseKey);

const descriptions = {
    1: 'Fundamentos de microeconomía y macroeconomía. Análisis de oferta, demanda, equilibrio de mercado y políticas económicas.',
    2: 'Evaluación de proyectos de inversión, análisis de riesgo, VAN, TIR y matemáticas financieras aplicadas.',
    3: 'Comercio internacional, balanza de pagos, tipos de cambio y organismos económicos internacionales.',
    4: 'Normas de Información Financiera (NIF), contabilidad de costos y sistemas de costeo.',
    5: 'Marco fiscal mexicano: ISR, IVA, IMSS, obligaciones fiscales y cumplimiento tributario.',
    6: 'Auditoría, control interno, dictámenes financieros y normatividad aplicable.'
};

async function migrateDescriptions() {
    console.log("Migrating descriptions...");
    for (let numero = 1; numero <= 6; numero++) {
        const desc = descriptions[numero];
        if (desc) {
            console.log(`Setting description for module ${numero}...`);
            const { error: updateErr } = await supabase.from('modulos').update({ descripcion: desc }).eq('numero', numero);
            if (updateErr) {
                console.error(`Update error mapping ${numero}`, updateErr);
            }
        }
    }
    console.log('Migration complete.');
}
migrateDescriptions().catch(console.error);
