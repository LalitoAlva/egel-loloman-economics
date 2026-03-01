import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xutsiuyihbufpnvhhccs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dHNpdXlpaGJ1ZnBudmhoY2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTcwOTUsImV4cCI6MjA4NTUzMzA5NX0.v31871_4RQKZGLSZOEQlR6n57nsxTsc_aP6D45CLwng';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    console.log("Fetching modules...");
    const { data: modulos, error } = await supabase.from('modulos').select('*');
    if (error) {
        console.error("Fetch error:", error);
        return;
    }

    // Ordered slugs based on the original structure first, then the new ones.
    const order = [
        "economia-1",
        "economia-2",
        "economia-3",
        "contaduria-1",
        "contaduria-2",
        "contaduria-3",
        "redaccion-indirecta",
        "comprension-lectora",
        "diagnostica-transversal",
        "razones-financieras"
    ];

    for (let i = 0; i < order.length; i++) {
        const slug = order[i];
        const num = i + 1;
        const target = modulos.find(m => m.slug === slug);
        if (target) {
            console.log(`Updating ${target.titulo} to number ${num}`);
            const { error: updateErr } = await supabase.from('modulos').update({ numero: num }).eq('id', target.id);
            if (updateErr) {
                console.error("Update error mapping " + slug, updateErr);
            }
        }
    }
    console.log('Update complete.');
}
run().catch(console.error);
