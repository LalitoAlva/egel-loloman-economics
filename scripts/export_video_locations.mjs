import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function main() {
    console.log("Fetching data from Supabase...");

    // Fetch all modules
    const { data: modulos, error: modError } = await supabase
        .from('modulos')
        .select('*')
        .order('numero', { ascending: true });

    if (modError) {
        console.error("Error fetching modules:", modError);
        return;
    }

    // Fetch all classes
    const { data: clases, error: classError } = await supabase
        .from('contenido_clase')
        .select('id, titulo, modulo_id, contenido')
        .order('orden', { ascending: true });

    if (classError) {
        console.error("Error fetching classes:", classError);
        return;
    }

    let markdown = `# Catálogo de Videos "Economía para Dummies" Integrados\n\nA continuación se listan todos los videos del canal insertados exitosamente en la plataforma, organizados por Módulo y Clase.\n\n`;

    let totalVideos = 0;

    for (const mod of modulos) {
        let modHasVideos = false;
        let modText = `## Módulo ${mod.numero}: ${mod.titulo}\n\n`;

        const modClasses = clases.filter(c => c.modulo_id === mod.id);

        for (const cls of modClasses) {
            let vids = [];

            if (cls.contenido) {
                // Check for explicit ![video](url)
                const explicitMatches = [...cls.contenido.matchAll(/!\[video\]\((https?:\/\/[^\)]+)\)/gi)];
                for (const m of explicitMatches) {
                    if (!vids.includes(m[1])) vids.push(m[1]);
                }

                // Check for ---MEDIA--- JSON
                const parts = cls.contenido.split('\n\n---MEDIA---\n');
                if (parts.length > 1) {
                    try {
                        const media = JSON.parse(parts[1]);
                        if (media.videos && Array.isArray(media.videos)) {
                            for (const v of media.videos) {
                                if (!vids.includes(v)) {
                                    vids.push(v);
                                }
                            }
                        }
                    } catch (e) { }
                }

                // Check [VIDEO](url)
                const htmlMatches = [...cls.contenido.matchAll(/\[VIDEO\]\((https?:\/\/[^\)]+)\)/gi)];
                for (const m of htmlMatches) {
                    if (!vids.includes(m[1])) {
                        vids.push(m[1]);
                    }
                }
            }

            if (vids.length > 0) {
                modHasVideos = true;
                modText += `### ${cls.titulo}\n`;
                vids.forEach((vUrl, i) => {
                    totalVideos++;
                    modText += `- [Video](${vUrl})\n`;
                });
                modText += `\n`;
            }
        }

        if (modHasVideos) {
            markdown += modText + `---\n\n`;
        }
    }

    markdown += `\n**Total de videos listados:** ${totalVideos}`;

    // Using simple path instead of full root to avoid issues
    const outputPath = path.resolve(__dirname, '..', 'docs', 'Videos_Integrados.md');
    fs.writeFileSync(outputPath, markdown);
    console.log(`Markdown generated successfully at ${outputPath} with ${totalVideos} videos.`);
}

main();
