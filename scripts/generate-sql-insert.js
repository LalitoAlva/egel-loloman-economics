/**
 * Genera SQL INSERT para las preguntas
 * Ejecutar con: node scripts/generate-sql-insert.js > supabase/data.sql
 */

import { questionBank } from '../src/data/banco_preguntas_egel.js'

function escapeSQL(str) {
    if (str === null || str === undefined) return 'NULL'
    return "'" + String(str).replace(/'/g, "''") + "'"
}

console.log('-- ============================================')
console.log('-- DATOS DEL BANCO DE PREGUNTAS EGEL')
console.log('-- Generado automáticamente')
console.log('-- ============================================')
console.log('')
console.log('INSERT INTO preguntas (id, modulo, subtema, nivel, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, tema, formula) VALUES')

const values = []

for (const [modulo, subtemas] of Object.entries(questionBank)) {
    for (const [subtema, preguntas] of Object.entries(subtemas)) {
        for (const p of preguntas) {
            const row = `(${escapeSQL(p.id)}, ${escapeSQL(modulo)}, ${escapeSQL(subtema)}, ${escapeSQL(p.nivel)}, ${escapeSQL(p.pregunta)}, ${escapeSQL(p.opciones.a)}, ${escapeSQL(p.opciones.b)}, ${escapeSQL(p.opciones.c)}, ${escapeSQL(p.opciones.d)}, ${escapeSQL(p.respuesta_correcta)}, ${escapeSQL(p.explicacion)}, ${escapeSQL(p.tema)}, ${escapeSQL(p.formula)})`
            values.push(row)
        }
    }
}

console.log(values.join(',\n') + ';')
console.log('')
console.log('-- Total: ' + values.length + ' preguntas')
