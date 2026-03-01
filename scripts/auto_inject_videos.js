import { createClient } from '@supabase/supabase-js';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ytSearch from 'yt-search';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars manually
const envPath = path.resolve(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        env[match[1]] = match[2].replace(/['"]/g, '').trim();
    }
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const searchYouTube = async (query) => {
    try {
        const r = await ytSearch(query);
        const videos = r.videos.slice(0, 3);
        if (videos.length > 0) {
            return videos[0].url;
        }
        return null;
    } catch (e) {
        console.error("Search error:", e);
        return null;
    }
};

const run = async () => {
    console.log("Fetching all classes...");
    const { data: classes, error } = await supabase.from('contenido_clase').select('*');
    if (error) {
        console.error("Error fetching:", error);
        return;
    }

    let updatedCount = 0;
    let skippedCount = 0;

    for (const cls of classes) {
        try {
            if (!cls.contenido) continue;

            let text = cls.contenido;
            let mediaObj = {};

            const mediaSplit = text.split('\n\n---MEDIA---\n');
            let hasMediaBlock = false;

            if (mediaSplit.length > 1) {
                text = mediaSplit[0];
                try {
                    mediaObj = JSON.parse(mediaSplit[1]);
                    hasMediaBlock = true;
                } catch (e) { }
            }

            if (mediaObj.video_url) {
                console.log(`[SKIP] ID ${cls.id} "${cls.titulo}" already has video: ${mediaObj.video_url}`);
                skippedCount++;
                continue;
            }

            // Create a good search query.
            const searchQuery = `Economía Explicación didáctica ${cls.titulo}`;
            console.log(`[SEARCH] Fetching video for "${cls.titulo}"...`);

            const videoUrl = await searchYouTube(searchQuery);

            if (videoUrl) {
                console.log(`   -> Found: ${videoUrl}`);
                mediaObj.video_url = videoUrl;

                const newContenido = `${text}\n\n---MEDIA---\n${JSON.stringify(mediaObj)}`;

                const { error: updateError } = await supabase
                    .from('contenido_clase')
                    .update({ contenido: newContenido })
                    .eq('id', cls.id);

                if (updateError) {
                    console.error(`   -> Error updating ID ${cls.id}:`, updateError);
                } else {
                    console.log(`   -> Successfully updated ID ${cls.id}.`);
                    updatedCount++;
                }
            } else {
                console.log(`   -> No video found for "${cls.titulo}".`);
            }

            // Wait 1.5 seconds between requests to avoid rate limiting
            await delay(1500);

        } catch (e) {
            console.error(`[ERROR] Processing ID ${cls.id}:`, e);
        }
    }

    console.log(`\nFinished! Added videos to ${updatedCount} classes. Skipped ${skippedCount} classes with existing videos.`);
};

run();
