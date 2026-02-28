import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xutsiuyihbufpnvhhccs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dHNpdXlpaGJ1ZnBudmhoY2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTcwOTUsImV4cCI6MjA4NTUzMzA5NX0.v31871_4RQKZGLSZOEQlR6n57nsxTsc_aP6D45CLwng'

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
    const { data, error } = await supabase.rpc('exec_sql', { sql: 'ALTER TABLE examenes ADD COLUMN IF NOT EXISTS lista_preguntas INT[];' })
    if (error) console.error(error)
    else console.log("Success:", data);
}
test()
