import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xutsiuyihbufpnvhhccs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dHNpdXlpaGJ1ZnBudmhoY2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTcwOTUsImV4cCI6MjA4NTUzMzA5NX0.v31871_4RQKZGLSZOEQlR6n57nsxTsc_aP6D45CLwng';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const { data: modulos, error } = await supabase.from('modulos').select('id, titulo, slug, numero');
    if (error) throw error;
    console.log(modulos);
}
check();
