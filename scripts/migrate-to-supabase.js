/**
 * Script de migración: banco_preguntas_egel.js → Supabase
 *
 * Ejecutar con: node scripts/migrate-to-supabase.js
 */

import { createClient } from '@supabase/supabase-js'
import { questionBank } from '../src/data/banco_preguntas_egel.js'

// Configuración de Supabase
const supabaseUrl = 'https://xutsiuyihbufpnvhhccs.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dHNpdXlpaGJ1ZnBudmhoY2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTcwOTUsImV4cCI6MjA4NTUzMzA5NX0.v31871_4RQKZGLSZOEQlR6n57nsxTsc_aP6D45CLwng'

const supabase = createClient(supabaseUrl, supabaseKey)

async function migrate() {
    console.log('🚀 Iniciando migración a Supabase...\n')

    const preguntasToInsert = []

    // Recorrer la estructura del banco de preguntas
    for (const [modulo, subtemas] of Object.entries(questionBank)) {
        console.log(`📦 Procesando módulo: ${modulo}`)

        for (const [subtema, preguntas] of Object.entries(subtemas)) {
            console.log(`   📝 Subtema: ${subtema} (${preguntas.length} preguntas)`)

            for (const p of preguntas) {
                preguntasToInsert.push({
                    id: p.id,
                    modulo: modulo,
                    subtema: subtema,
                    nivel: p.nivel,
                    pregunta: p.pregunta,
                    opcion_a: p.opciones.a,
                    opcion_b: p.opciones.b,
                    opcion_c: p.opciones.c,
                    opcion_d: p.opciones.d,
                    respuesta_correcta: p.respuesta_correcta,
                    explicacion: p.explicacion || null,
                    tema: p.tema || null,
                    formula: p.formula || null
                })
            }
        }
    }

    console.log(`\n📊 Total de preguntas a migrar: ${preguntasToInsert.length}`)

    // Insertar en lotes de 50 para evitar timeouts
    const batchSize = 50
    let inserted = 0

    for (let i = 0; i < preguntasToInsert.length; i += batchSize) {
        const batch = preguntasToInsert.slice(i, i + batchSize)

        const { data, error } = await supabase
            .from('preguntas')
            .upsert(batch, { onConflict: 'id' })

        if (error) {
            console.error(`❌ Error en lote ${i / batchSize + 1}:`, error.message)
        } else {
            inserted += batch.length
            console.log(`✅ Insertadas ${inserted}/${preguntasToInsert.length} preguntas`)
        }
    }

    console.log('\n🎉 Migración completada!')
    console.log(`   Total insertadas: ${inserted} preguntas`)

    // Verificar
    const { count } = await supabase
        .from('preguntas')
        .select('*', { count: 'exact', head: true })

    console.log(`   Verificación: ${count} preguntas en la base de datos`)
}

migrate().catch(console.error)
