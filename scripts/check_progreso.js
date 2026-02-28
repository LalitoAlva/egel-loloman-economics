import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xutsiuyihbufpnvhhccs.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dHNpdXlpaGJ1ZnBudmhoY2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTcwOTUsImV4cCI6MjA4NTUzMzA5NX0.v31871_4RQKZGLSZOEQlR6n57nsxTsc_aP6D45CLwng';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    const { data, error } = await supabase.rpc('get_schema', { table_name: 'progreso_modulo' })
    if (error) {
        // If no RPC, let's just insert a dummy and see error
        const { error: err2 } = await supabase.from('progreso_modulo').insert({ usuario_id: '00000000-0000-0000-0000-000000000000' });
        console.log("Insert Error:", err2);
    } else {
        console.log("Schema:", data);
    }
}
test();
