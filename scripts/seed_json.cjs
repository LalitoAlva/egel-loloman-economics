const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function main() {
    console.log("Starting JSON Seeding...");
    const jsonPath = path.resolve(__dirname, 'extracted_materials_2024.json');
    if (!fs.existsSync(jsonPath)) {
        console.error("JSON not found at", jsonPath);
        return;
    }

    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    console.log(`Loaded ${data.classes.length} classes and ${data.questions.length} questions from JSON.`);

    const { data: modulos, error: modError } = await supabase.from('modulos').select('id, titulo');
    if (modError || !modulos) {
        console.error("No modules found in DB to attach content to:", modError);
        return;
    }

    const macroModulo = modulos.find(m => m.titulo.includes('Macro')) || modulos[0];
    const microModulo = modulos.find(m => m.titulo.includes('Micro')) || modulos[0];

    console.log("\nInserting Theory Classes...");
    const classesToInsert = data.classes.map(t => ({
        titulo: "[2024] " + t.titulo.substring(0, 100).replace(/\n/g, " "),
        contenido: t.contenido.substring(0, 4500),
        modulo_id: macroModulo.id,
        orden: 100,
        tipo: 'teoria'
    }));

    if (classesToInsert.length > 0) {
        const { error } = await supabase.from('contenido_clase').insert(classesToInsert);
        if (error) console.error(`Error inserting classes:`, error);
        else console.log(`✅ Successfully inserted ${classesToInsert.length} new theory classes.`);
    }

    console.log("\nInserting Questions and Exercises...");
    const questionsToInsert = data.questions.map(q => ({
        pregunta: "[2024] " + q.texto_pregunta.substring(0, 500).replace(/\n/g, " "),
        opcion_a: q.opcion_a.substring(0, 150).replace(/\n/g, " "),
        opcion_b: q.opcion_b.substring(0, 150).replace(/\n/g, " "),
        opcion_c: q.opcion_c.substring(0, 150).replace(/\n/g, " "),
        opcion_d: q.opcion_d.substring(0, 150).replace(/\n/g, " "),
        respuesta_correcta: q.respuesta_correcta,
        explicacion: q.explicacion,
        modulo_id: (q.nivel === 'avanzado') ? microModulo.id : macroModulo.id,
        nivel: q.nivel,
        tipo: 'opcion_multiple',
        tema: 'Simulador 2024',
        subtema: 'Desarrollo Práctico',
        activo: true
    }));

    if (questionsToInsert.length > 0) {
        const { error } = await supabase.from('preguntas').insert(questionsToInsert);
        if (error) console.error(`Error inserting questions:`, error);
        else console.log(`✅ Successfully inserted ${questionsToInsert.length} new questions and exercises.`);
    }
}

main();
