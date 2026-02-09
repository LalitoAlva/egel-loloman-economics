#!/usr/bin/env node

/**
 * Bulk Load Socratic Questions Script
 * Loads all questions from socratic_questions.js into Supabase preguntas table
 * Usage: node scripts/load_socratic_questions.js
 */

import { createClient } from '@supabase/supabase-js'
import { socraticQuestions } from '../src/data/socratic_questions.js'

// Supabase configuration
const SUPABASE_URL = 'https://xutsiuyihbufpnvhhccs.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dHNpdXlpaGJ1ZnBudmhoY2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1MjE2MDMsImV4cCI6MjA2NTA5NzYwM30.oHVQLIHAiV-GFxKaZNBnmzaGnRe_YkyJeEBSylKRSJw'

// Batch size for insertions (avoid rate limits)
const BATCH_SIZE = 50
const DELAY_BETWEEN_BATCHES = 500 // ms

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

/**
 * Prepare questions for insertion by adding standard fields
 */
function prepareQuestions() {
    return socraticQuestions.map(q => ({
        modulo_id: q.modulo_id || 1,
        tema: q.tema,
        subtema: q.subtema,
        nivel: q.nivel,
        pregunta: q.pregunta,
        opcion_a: q.opcion_a,
        opcion_b: q.opcion_b,
        opcion_c: q.opcion_c,
        opcion_d: q.opcion_d,
        respuesta_correcta: q.respuesta_correcta,
        explicacion: q.explicacion,
        activo: true,
        tipo: q.tipo || 'socratica', // Mark as Socratic type
        created_at: new Date().toISOString()
    }))
}

/**
 * Insert questions in batches with delay between batches
 */
async function insertQuestionsBatch(questions) {
    const batches = []

    for (let i = 0; i < questions.length; i += BATCH_SIZE) {
        batches.push(questions.slice(i, i + BATCH_SIZE))
    }

    console.log(`Inserting ${questions.length} questions in ${batches.length} batches...`)
    console.log('=' .repeat(60))

    let totalInserted = 0

    for (let i = 0; i < batches.length; i++) {
        const batch = batches[i]

        try {
            const { data, error } = await supabase
                .from('preguntas')
                .insert(batch)
                .select()

            if (error) {
                console.error(`\n❌ Batch ${i + 1} failed:`, error.message)
                throw error
            }

            totalInserted += batch.length
            console.log(`✓ Batch ${i + 1}/${batches.length} inserted (${batch.length} questions, ${totalInserted}/${questions.length} total)`)

            // Delay between batches to avoid rate limits
            if (i < batches.length - 1) {
                await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES))
            }
        } catch (error) {
            console.error(`\n⚠️  Error inserting batch ${i + 1}:`)
            console.error(error)
            throw error
        }
    }

    return totalInserted
}

/**
 * Verify questions were inserted correctly
 */
async function verifyInsertion(moduloId = 1) {
    console.log('\n' + '='.repeat(60))
    console.log('Verifying insertion...')

    const { data, error } = await supabase
        .from('preguntas')
        .select('id, modulo_id, tema, nivel, activo')
        .eq('modulo_id', moduloId)
        .eq('activo', true)

    if (error) {
        console.error('❌ Verification failed:', error.message)
        throw error
    }

    if (data) {
        console.log(`✓ Found ${data.length} active questions in module ${moduloId}`)

        // Show breakdown by level
        const byLevel = {}
        data.forEach(q => {
            byLevel[q.nivel] = (byLevel[q.nivel] || 0) + 1
        })

        console.log('\nQuestions by level:')
        Object.entries(byLevel).forEach(([level, count]) => {
            console.log(`  - ${level}: ${count} questions`)
        })

        return data.length
    }

    return 0
}

/**
 * Main execution
 */
async function main() {
    console.log('Socratic Questions Bulk Loader')
    console.log('=' .repeat(60))
    console.log(`Database: ${SUPABASE_URL}`)
    console.log(`Questions to insert: ${socraticQuestions.length}`)
    console.log(`Batch size: ${BATCH_SIZE}`)
    console.log('')

    try {
        // Prepare questions
        const preparedQuestions = prepareQuestions()

        // Insert in batches
        const inserted = await insertQuestionsBatch(preparedQuestions)

        // Verify
        const verified = await verifyInsertion()

        console.log('\n' + '='.repeat(60))
        console.log('✨ COMPLETE!')
        console.log(`Inserted: ${inserted} questions`)
        console.log(`Verified: ${verified} questions in database`)
        console.log('')
        console.log('Next steps:')
        console.log('1. Test SocraticMode.jsx to query these questions')
        console.log('2. The component should load them via: select(*) from preguntas where modulo_id = ? AND activo = true')
        console.log('3. Questions are marked as "socratica" type for filtering if needed')

        process.exit(0)
    } catch (error) {
        console.error('\n❌ FAILED!')
        console.error(error.message)
        console.error('\nTroubleshooting:')
        console.error('- Check SUPABASE_URL and SUPABASE_ANON_KEY are correct')
        console.error('- Verify the preguntas table exists with required columns')
        console.error('- Check your Supabase RLS policies allow inserts')
        console.error('- Ensure modulo_id values (1) exist in the modulos table')
        process.exit(1)
    }
}

main()
