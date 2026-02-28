// scripts/map_youtube_videos.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xutsiuyihbufpnvhhccs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dHNpdXlpaGJ1ZnBudmhoY2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTcwOTUsImV4cCI6MjA4NTUzMzA5NX0.v31871_4RQKZGLSZOEQlR6n57nsxTsc_aP6D45CLwng';
const supabase = createClient(supabaseUrl, supabaseKey);

const videoMapping = [
    { matcher: "Efectos Ingreso y Sustitución", url: "https://www.youtube.com/watch?v=UmkCi9yqsg8" },
    { matcher: "Maximización de Utilidad", url: "https://www.youtube.com/watch?v=IZmSVyH9pTw" },
    { matcher: "Restricción Presupuestaria", url: "https://www.youtube.com/watch?v=Iqult77HhKc" },
    { matcher: "IS-LM", url: "https://www.youtube.com/watch?v=IY0Y8lNxGTs" },
    { matcher: "Oferta y Demanda", url: "https://www.youtube.com/watch?v=N4ANgXTd3Tc" },
    { matcher: "Equilibrios de Mercado", url: "https://www.youtube.com/watch?v=N4ANgXTd3Tc" },
    { matcher: "Externalidades", url: "https://www.youtube.com/watch?v=Uq83H3wmqmE" },
    { matcher: "Oferta Agregada", url: "https://www.youtube.com/watch?v=MG-ZxjtKkI8" },
    { matcher: "Consumo Intertemporal", url: "https://www.youtube.com/watch?v=3OTJRAiGL60" },
    { matcher: "Mercado de Trabajo", url: "https://www.youtube.com/watch?v=FVUvkncO900" },
    { matcher: "Edgeworth", url: "https://www.youtube.com/watch?v=8onQLpPqnrE" },
    { matcher: "Monopolio", url: "https://www.youtube.com/watch?v=ffUmWY_JNL4" },
    { matcher: "Economías de Escala", url: "https://www.youtube.com/watch?v=bTay1Ib6i4U" },
    { matcher: "Déficit Público", url: "https://www.youtube.com/watch?v=ze4UBCCjt0U" },
    { matcher: "Oferta Monetaria", url: "https://www.youtube.com/watch?v=vhKv6KHMg3o" },
    { matcher: "Bancos", url: "https://www.youtube.com/watch?v=vhKv6KHMg3o" }
];

async function run() {
    console.log("Iniciando mapeo de videos en la base de datos...");
    const { data: clases, error } = await supabase.from('contenido_clase').select('id, titulo, contenido');
    if (error) throw error;

    let updated = 0;
    for (let c of clases) {
        let matchedUrl = null;
        for (let mapping of videoMapping) {
            if (c.titulo.toLowerCase().includes(mapping.matcher.toLowerCase())) {
                matchedUrl = mapping.url;
                break;
            }
        }

        if (matchedUrl) {
            // Check if already has media block
            if (c.contenido.includes('---MEDIA---')) {
                // Parse the JSON and update video_url
                const parts = c.contenido.split('\n\n---MEDIA---\n');
                try {
                    let mediaObjStr = parts[1].trim();
                    // Some rows might have stray spaces, fix them just in case
                    const mediaJSON = JSON.parse(mediaObjStr || '{}');
                    if (mediaJSON.video_url !== matchedUrl) {
                        mediaJSON.video_url = matchedUrl;
                        const newContent = `${parts[0].trim()}\n\n---MEDIA---\n${JSON.stringify(mediaJSON)}`;
                        await supabase.from('contenido_clase').update({ contenido: newContent }).eq('id', c.id);
                        console.log(`[UPDATE] ${c.titulo} -> Video reemplazado a ${matchedUrl}`);
                        updated++;
                    } else {
                        console.log(`[SKIP] ${c.titulo} ya contaba con este video asignado.`);
                    }
                } catch (e) {
                    // Si json format no es válido, sobrescribimos
                    const mediaJSON = { video_url: matchedUrl };
                    const newContent = `${parts[0].trim()}\n\n---MEDIA---\n${JSON.stringify(mediaJSON)}`;
                    await supabase.from('contenido_clase').update({ contenido: newContent }).eq('id', c.id);
                    console.log(`[FIX] Reparado JSON roto en ${c.titulo} y video asignado.`);
                    updated++;
                }
            } else {
                // Create media block
                const mediaJSON = { video_url: matchedUrl };
                const newContent = `${c.contenido.trim()}\n\n---MEDIA---\n${JSON.stringify(mediaJSON)}`;
                await supabase.from('contenido_clase').update({ contenido: newContent }).eq('id', c.id);
                console.log(`[ADD] ${c.titulo} -> Video asignado exitosamente.`);
                updated++;
            }
        }
    }
    console.log(`¡Todo listo! Actualizadas ${updated} filas de la base de datos.`);
}
run().catch(console.error);
