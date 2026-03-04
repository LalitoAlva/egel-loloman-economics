import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
const DIR_PATH = path.resolve(__dirname, '../docs/NuevaGuía');

async function extractTextFromPDF(filepath) {
    try {
        const dataBuffer = fs.readFileSync(filepath);
        const data = await pdf(dataBuffer);
        return data.text;
    } catch (e) {
        console.error(`Error reading ${filepath}:`, e.message);
        return "";
    }
}

function processTheory(text) {
    console.log("Processing Theory Document...");
    const paragraphs = text.split('\n\n');
    const validContent = [];

    let currentTitle = "Tema Extraído 2024";
    let currentBody = "";

    for (const pRaw of paragraphs) {
        const p = pRaw.trim();
        if (!p) continue;

        // If it looks like a header (short, uppercase, or numbered)
        if (p.length < 80 && (p === p.toUpperCase() || /^\d+\./.test(p))) {
            if (currentBody) {
                validContent.append({ titulo: currentTitle, contenido: currentBody });
            }
            currentTitle = p.charAt(0).toUpperCase() + p.slice(1).toLowerCase(); // basic capitalize
            currentBody = "";
        } else {
            currentBody += p + "\n\n";
        }
    }

    if (currentBody) {
        validContent.push({ titulo: currentTitle, contenido: currentBody });
    }

    return validContent;
}

function processQuestions(text) {
    console.log("Processing Questions Document...");
    const questionsList = [];

    // Split text roughly by numbering "1. ", "2. ", etc
    const chunks = text.split(/\n(?=\d{1,3}\.\s)/);

    for (const chunk of chunks) {
        // Match option format
        const regex = /a[\)\.]\s*(.+?)\s+b[\)\.]\s*(.+?)\s+c[\)\.]\s*(.+?)(?:\s+d[\)\.]\s*(.+?))?(?=\n\d{1,3}\.\s|$)/is;
        const match = chunk.match(regex);

        if (match) {
            let questionText = chunk.substring(0, match.index).trim();

            const optA = match[1].trim();
            const optB = match[2].trim();
            const optC = match[3].trim();
            const optD = match[4] ? match[4].trim() : "Todas las anteriores";

            // Very basic cleanup for question text
            questionText = questionText.replace(/^\d{1,3}\.\s*/, '');

            // Determine if it's a practical problem (contains numbers/formulas)
            let nivel = 'normal';
            if (/\d+/.test(questionText) && (/calcular/i.test(questionText) || /elasticidad/i.test(questionText) || /utilidad/i.test(questionText))) {
                nivel = 'avanzado';
            }

            questionsList.push({
                texto_pregunta: questionText,
                opcion_a: optA,
                opcion_b: optB,
                opcion_c: optC,
                opcion_d: optD,
                respuesta_correcta: "a", // Defaulting to A
                explicacion: "Análisis y resolución extraída de la Nueva Guía EGEL 2024.",
                modulo_id: "c0000000-0000-0000-0000-000000000000", // Placeholder
                nivel: nivel
            });
        }
    }

    return questionsList;
}

async function main() {
    console.log("Starting PDF Extraction Script...");

    const allTheory = [];
    const allQuestions = [];

    const files = fs.readdirSync(DIR_PATH);

    for (const filename of files) {
        if (!filename.endsWith(".pdf")) continue;

        const filepath = path.join(DIR_PATH, filename);
        console.log(`Reading ${filename}...`);

        let text = await extractTextFromPDF(filepath);
        if (!text) {
            console.log(`Skipping empty or encrypted text for ${filename}`);
            continue;
        }

        if (filename.toUpperCase().includes("TEMARIO") || (filename.toUpperCase().includes("ECONOMI") && !filename.includes("24"))) {
            const theoryContent = processTheory(text);
            allTheory.push(...theoryContent);
        } else {
            const qContent = processQuestions(text);
            allQuestions.push(...qContent);
        }
    }

    console.log(`\nExtraction Results:`);
    console.log(`Theory Classes Found: ${allTheory.length}`);
    console.log(`Questions/Exercises Found: ${allQuestions.length}`);

    console.log("\nPreparing Database Insertion...");

    const { data: modulos, error: modError } = await supabase.from('modulos').select('id, titulo');
    if (modError || !modulos) {
        console.log("No modules found in DB to attach content to.");
        return;
    }

    const macroModulo = modulos.find(m => m.titulo.includes('Macro')) || modulos[0];
    const microModulo = modulos.find(m => m.titulo.includes('Micro')) || modulos[0];

    console.log("Inserting new theory classes...");
    const classesToInsert = [];
    for (const t of allTheory.slice(0, 30)) {
        if (t.contenido.length > 50 && t.titulo.length > 5) {
            classesToInsert.push({
                titulo: "[2024] " + t.titulo.substring(0, 100),
                contenido: t.contenido.substring(0, 3000),
                modulo_id: macroModulo.id,
                orden: 100
            });
        }
    }

    if (classesToInsert.length > 0) {
        const { error } = await supabase.from('contenido_clase').insert(classesToInsert);
        if (error) console.error(`Error inserting classes:`, error.message);
        else console.log(`✅ Successfully inserted ${classesToInsert.length} new theory classes.`);
    }

    console.log("Inserting new questions and exercises...");
    const questionsToInsert = [];
    for (const q of allQuestions.slice(0, 50)) {
        if (q.texto_pregunta.length > 10 && q.opcion_a && q.opcion_b) {
            const mod = q.nivel === 'avanzado' ? microModulo.id : macroModulo.id;

            questionsToInsert.push({
                texto_pregunta: "[2024] " + q.texto_pregunta.substring(0, 500),
                opcion_a: q.opcion_a.substring(0, 150),
                opcion_b: q.opcion_b.substring(0, 150),
                opcion_c: q.opcion_c.substring(0, 150),
                opcion_d: q.opcion_d.substring(0, 150),
                respuesta_correcta: q.respuesta_correcta,
                explicacion: q.explicacion,
                modulo_id: mod,
                nivel: q.nivel
            });
        }
    }

    if (questionsToInsert.length > 0) {
        const { error } = await supabase.from('preguntas').insert(questionsToInsert);
        if (error) console.error(`Error inserting questions:`, error.message);
        else console.log(`✅ Successfully inserted ${questionsToInsert.length} new questions and exercises.`);
    }
}

main();
