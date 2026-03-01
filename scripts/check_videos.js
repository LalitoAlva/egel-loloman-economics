require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function main() {
    const { data: clases } = await supabase.from('contenido_clase').select('id, titulo, contenido, video_url');
    console.log("Checking for duplicate video references...");
    for (const cls of clases) {
        if (!cls.contenido) continue;
        const parts = cls.contenido.split('\n\n---MEDIA---\n');
        let media = {};
        if (parts.length > 1) {
            try {
                media = JSON.parse(parts[1]);
            } catch(e) {}
        }
        
        let dupes = 0;
        let vids = [];
        if (media.videos) vids.push(...media.videos);
        if (media.video_url) vids.push(media.video_url);
        if (cls.video_url) vids.push(cls.video_url);
        
        if (vids.length > 1) {
            console.log(`\nLesson: ${cls.titulo}`);
            console.log(`media.videos:`, media.videos);
            console.log(`media.video_url:`, media.video_url);
            console.log(`cls.video_url:`, cls.video_url);
        }
    }
}
main();
