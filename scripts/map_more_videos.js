import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xutsiuyihbufpnvhhccs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dHNpdXlpaGJ1ZnBudmhoY2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTcwOTUsImV4cCI6MjA4NTUzMzA5NX0.v31871_4RQKZGLSZOEQlR6n57nsxTsc_aP6D45CLwng';
const supabase = createClient(supabaseUrl, supabaseKey);

// A map of keywords in titles to the best practical YouTube videos.
const videoMappings = [
    // Finanzas
    { keyword: "van", video: "https://www.youtube.com/watch?v=kYI1WzP06F8" },
    { keyword: "tir", video: "https://www.youtube.com/watch?v=kYI1WzP06F8" },
    { keyword: "riesgo", video: "https://www.youtube.com/watch?v=Xh0YFMBZ-Z4" },
    { keyword: "acciones", video: "https://www.youtube.com/watch?v=Vl3rK2wYn7c" },
    { keyword: "bono", video: "https://www.youtube.com/watch?v=S3O7J2-U1OQ" },
    { keyword: "apalancamiento", video: "https://www.youtube.com/watch?v=yL-w4G5f9-o" },
    { keyword: "razones financieras", video: "https://www.youtube.com/watch?v=oItiIfP0x40" },
    { keyword: "dupont", video: "https://www.youtube.com/watch?v=eYkH_wP7QjI" },

    // Economía Macro/Micro
    { keyword: "inflación", video: "https://www.youtube.com/watch?v=0xMcBWNYIPI" },
    { keyword: "pib", video: "https://www.youtube.com/watch?v=Odb6L11VzF0" },
    { keyword: "multiplicador", video: "https://www.youtube.com/watch?v=y_x8t0BtzDE" },
    { keyword: "elasticidad", video: "https://www.youtube.com/watch?v=b1wZUK-82qI" },
    { keyword: "costo marginal", video: "https://www.youtube.com/watch?v=z8B9bWz3h7c" },
    { keyword: "veblen", video: "https://www.youtube.com/watch?v=l8D1pE3rM5w" },
    { keyword: "is-lm", video: "https://www.youtube.com/watch?v=JmEtZ4R7e1M" },

    // Internacional
    { keyword: "tipo de cambio", video: "https://www.youtube.com/watch?v=P4O5Z9v-LqI" },
    { keyword: "ventaja absoluta", video: "https://www.youtube.com/watch?v=zY-5T1gCDEU" },
    { keyword: "ventaja comparativa", video: "https://www.youtube.com/watch?v=zY-5T1gCDEU" },

    // Contabilidad / Costos
    { keyword: "costo", video: "https://www.youtube.com/watch?v=vVjV1jRk9k8" },
    { keyword: "depreciación", video: "https://www.youtube.com/watch?v=17H2UeO_nE8" },
    { keyword: "punto de equilibrio", video: "https://www.youtube.com/watch?v=sX8jMgEY1vU" }
];

async function addVideos() {
    console.log("Obteniendo todas las lecciones de la base de datos...");
    const { data: lecciones, error } = await supabase.from('contenido_clase').select('id, titulo, contenido');
    if (error) throw error;

    let updatedCount = 0;

    for (let leccion of lecciones) {
        let matchedVideo = null;
        const lowTitle = leccion.titulo.toLowerCase();

        for (let map of videoMappings) {
            if (lowTitle.includes(map.keyword.toLowerCase())) {
                matchedVideo = map.video;
                break;
            }
        }

        if (matchedVideo && !leccion.contenido.includes("video_url") && !leccion.contenido.includes(matchedVideo)) {
            // Check if there's an existing media block
            const sep = '\n\n---MEDIA---\n';
            let newContent = leccion.contenido;

            if (newContent.includes(sep)) {
                // Parse and update existing media
                const parts = newContent.split(sep);
                try {
                    let mediaObj = JSON.parse(parts[1]);
                    mediaObj.video_url = matchedVideo;
                    newContent = parts[0] + sep + JSON.stringify(mediaObj);
                } catch (e) {
                    console.log(`Failed to parse media for ${leccion.id}`);
                }
            } else {
                // Append new media block
                newContent = leccion.contenido + sep + JSON.stringify({ video_url: matchedVideo });
            }

            console.log(`- Mapeando video a la lección: [${leccion.titulo}] -> ${matchedVideo}`);
            await supabase.from('contenido_clase').update({ contenido: newContent }).eq('id', leccion.id);
            updatedCount++;
        }
    }

    console.log(`\n¡Mapeo de videos finalizado! ${updatedCount} lecciones fueron enriquecidas con videos prácticos.`);
}

addVideos().catch(console.error);
