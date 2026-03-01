import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function fixMicroeconomia() {
  console.log('Fixing ---MEDIA--- string in Microeconomía...');

  // Find the classes in 'Microeconomía' (Modulo 2) that contain the broken string
  const { data: microClasses, error } = await supabase
    .from('contenido_clase')
    .select('id, contenido, imagen_url')
    .ilike('contenido', '%---MEDIA---%');

  if (error) {
    console.error('Error fetching class:', error);
    return;
  }

  if (microClasses.length === 0) {
    console.log('No broken records found.');
    return;
  }

  for (let cls of microClasses) {
    const parts = cls.contenido.split('---MEDIA---');
    try {
      const jsonMedia = JSON.parse(parts[1].trim());
      const newText = parts[0].trim();

      console.log(`Updating Record ID ${cls.id}...`);

      const { error: updateError } = await supabase
        .from('contenido_clase')
        .update({
          contenido: newText,
          imagen_url: jsonMedia.imagenurl || cls.imagen_url || null,
          video_url: jsonMedia.videourl || null,
          audio_url: jsonMedia.audiourl || null
        })
        .eq('id', cls.id);

      if (updateError) {
        console.error('Update failed:', updateError.message);
      } else {
        console.log('Success!');
      }
    } catch (err) {
      console.error(`Failed to parse the broken media block for ID ${cls.id}:`, err);
    }
  }
}

fixMicroeconomia();
