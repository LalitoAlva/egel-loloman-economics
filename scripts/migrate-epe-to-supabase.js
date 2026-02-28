/**
 * Script de migración: banco_preguntas_epe.js → Supabase
 *
 * Ejecutar con: node scripts/migrate-epe-to-supabase.js
 */

import { createClient } from '@supabase/supabase-js'
import { epeQuestionBank } from '../src/data/banco_preguntas_epe.js'

// Configuración de Supabase
const supabaseUrl = 'https://xutsiuyihbufpnvhhccs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dHNpdXlpaGJ1ZnBudmhoY2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTcwOTUsImV4cCI6MjA4NTUzMzA5NX0.v31871_4RQKZGLSZOEQlR6n57nsxTsc_aP6D45CLwng'

const supabase = createClient(supabaseUrl, supabaseKey)

// Mapping EPE modules to modulo_id in Supabase
const moduleMapping = {
    'evaluacióndiagnósticatransversal': 1,
    'microeconomía': 1,
    'macroeconomía': 1,
    'proyectosdeinversión': 2,
    'comprensiónlectora': 1,
    'redacciónindirecta': 1,
    'economíafinanciera': 2
}

async function migrate() {
    console.log('🚀 Iniciando inserción de preguntas EPE a Supabase...\n')

    const preguntasToInsert = []

    for (const [modulo, preguntas] of Object.entries(epeQuestionBank)) {
        console.log(`📦 Procesando módulo: ${modulo} (${preguntas.length} preguntas)`)

        const modulo_id = moduleMapping[modulo] || 1;

        for (const p of preguntas) {
            preguntasToInsert.push({
                modulo_id: modulo_id,
                subtema: p.tema,
                nivel: p.nivel,
                tipo: 'opcion_multiple',
                pregunta: p.pregunta,
                opcion_a: p.opciones.a,
                opcion_b: p.opciones.b,
                opcion_c: p.opciones.c,
                opcion_d: p.opciones.d,
                respuesta_correcta: p.respuesta_correcta,
                explicacion: p.explicacion || 'Pregunta del banco EPE',
                tema: p.tema || 'EPE',
                formula: null,
                activo: true
            })
        }
    }

    console.log(`\n📊 Total de preguntas a insertar: ${preguntasToInsert.length}`)

    const batchSize = 50
    let inserted = 0

    for (let i = 0; i < preguntasToInsert.length; i += batchSize) {
        const batch = preguntasToInsert.slice(i, i + batchSize)

        const { data, error } = await supabase
            .from('preguntas')
            .insert(batch)

        if (error) {
            console.error(`❌ Error en lote ${i / batchSize + 1}:`, error.message)
        } else {
            inserted += batch.length
            console.log(`✅ Insertadas ${inserted}/${preguntasToInsert.length} preguntas`)
        }
    }

    console.log('\n🎉 Migración completada!')
    console.log(`   Total insertadas: ${inserted} preguntas`)

    const { count } = await supabase
        .from('preguntas')
        .select('*', { count: 'exact', head: true })

    console.log(`   Verificación: ${count} preguntas totales en la base de datos`)
}

migrate().catch(console.error)
