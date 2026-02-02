/**
 * Script para migrar contenido de docs a Supabase
 * Genera SQL para insertar en la base de datos
 *
 * Ejecutar: node scripts/migrate-contenido.js > supabase/contenido_data.sql
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const docsPath = './src/docs';

// Definición de módulos
const modulos = [
    { numero: 1, slug: 'macro-micro', titulo: 'Macro y Microeconomía', icon: '📊', color: '#38bdf8' },
    { numero: 2, slug: 'proyectos-riesgo', titulo: 'Proyectos y Riesgo', icon: '📈', color: '#a855f7' },
    { numero: 3, slug: 'internacional', titulo: 'Economía Internacional', icon: '🌍', color: '#22c55e' },
    { numero: 4, slug: 'costos-normas', titulo: 'Costos y Normas', icon: '📋', color: '#f59e0b' },
    { numero: 5, slug: 'impuestos-leyes', titulo: 'Impuestos y Leyes', icon: '⚖️', color: '#ef4444' },
    { numero: 6, slug: 'dictamenes-control', titulo: 'Dictámenes y Control', icon: '🔍', color: '#06b6d4' }
];

// Mapeo de prefijos de archivo a módulo
const filePatterns = {
    '1.': 0, // Macro Micro
    '2.': 1, // Proyectos
    '3.': 2, // Internacional
    '4.': 3, // Costos
    '5.': 4, // Impuestos
    '6.': 5  // Dictamenes
};

function escapeSQL(str) {
    if (!str) return 'NULL';
    return "'" + str.replace(/'/g, "''") + "'";
}

function parseMarkdownToSections(content) {
    // Dividir por separadores o headers principales
    const sections = [];
    const lines = content.split('\n');

    let currentSection = { titulo: '', contenido: [] };
    let sectionIndex = 0;

    for (const line of lines) {
        // Detectar headers de nivel 1 o 2 o separadores
        if (line.match(/^#{1,2}\s+/) || line.match(/^[IVX]+\.\s+/) || line.match(/^\d+\.\s+[A-Z]/)) {
            // Guardar sección anterior si tiene contenido
            if (currentSection.contenido.length > 0) {
                sections.push({
                    orden: sectionIndex++,
                    titulo: currentSection.titulo || `Sección ${sectionIndex}`,
                    contenido: currentSection.contenido.join('\n').trim()
                });
            }
            // Nueva sección
            currentSection = {
                titulo: line.replace(/^#+\s*/, '').replace(/^[IVX]+\.\s*/, '').replace(/^\d+\.\s*/, '').trim(),
                contenido: []
            };
        } else if (line.match(/^-{3,}$/)) {
            // Separador - guardar sección actual
            if (currentSection.contenido.length > 0) {
                sections.push({
                    orden: sectionIndex++,
                    titulo: currentSection.titulo || `Sección ${sectionIndex}`,
                    contenido: currentSection.contenido.join('\n').trim()
                });
                currentSection = { titulo: '', contenido: [] };
            }
        } else {
            currentSection.contenido.push(line);
        }
    }

    // Guardar última sección
    if (currentSection.contenido.length > 0) {
        sections.push({
            orden: sectionIndex++,
            titulo: currentSection.titulo || `Sección ${sectionIndex}`,
            contenido: currentSection.contenido.join('\n').trim()
        });
    }

    return sections.filter(s => s.contenido.length > 10); // Filtrar secciones muy cortas
}

// Generar SQL
console.log('-- ============================================');
console.log('-- DATOS DE MÓDULOS Y CONTENIDO');
console.log('-- Generado automáticamente');
console.log('-- ============================================');
console.log('');

// Insertar módulos
console.log('-- MÓDULOS');
console.log('INSERT INTO modulos (numero, slug, titulo, icon, color, infografia_url, audio_url) VALUES');
const modulosSQL = modulos.map((m, i) => {
    const infografia = `/assets/infografias/${m.numero}.3.%20${encodeURIComponent(getModuloFileName(m.numero))}%20-%20Infografía.png`;
    const audio = `/assets/audio/${m.numero}.5.%20${encodeURIComponent(getModuloFileName(m.numero))}%20-%20Audio.m4a`;
    return `(${m.numero}, ${escapeSQL(m.slug)}, ${escapeSQL(m.titulo)}, ${escapeSQL(m.icon)}, ${escapeSQL(m.color)}, ${escapeSQL(infografia)}, ${escapeSQL(audio)})`;
});
console.log(modulosSQL.join(',\n') + ';');
console.log('');

function getModuloFileName(numero) {
    const names = {
        1: 'Macro Micro Economía',
        2: 'Proyectos y RIesgo',
        3: 'Internacional',
        4: 'CostosYNormas',
        5: 'ImpuestosYLeyes',
        6: 'DictámenesYControl'
    };
    return names[numero] || '';
}

// Leer archivos y generar contenido
console.log('-- CONTENIDO DE CLASES');
const files = readdirSync(docsPath).filter(f => f.endsWith('.md'));

const contenidoSQL = [];
let globalOrden = 1;

for (const file of files) {
    // Determinar módulo
    const prefix = file.substring(0, 2);
    const moduloIndex = filePatterns[prefix];
    if (moduloIndex === undefined) continue;

    const moduloNumero = moduloIndex + 1;

    // Determinar tipo
    let tipo = 'otro';
    if (file.includes('Guía')) tipo = 'guia';
    else if (file.includes('Informe')) tipo = 'informe';

    // Leer contenido
    const content = readFileSync(join(docsPath, file), 'utf-8');
    const sections = parseMarkdownToSections(content);

    for (const section of sections) {
        contenidoSQL.push(`((SELECT id FROM modulos WHERE numero = ${moduloNumero}), ${escapeSQL(tipo)}, ${globalOrden++}, ${escapeSQL(section.titulo)}, ${escapeSQL(section.contenido)})`);
    }
}

if (contenidoSQL.length > 0) {
    console.log('INSERT INTO contenido_clase (modulo_id, tipo, orden, titulo, contenido) VALUES');
    console.log(contenidoSQL.join(',\n') + ';');
}

console.log('');
console.log(`-- Total: ${modulos.length} módulos, ${contenidoSQL.length} secciones de contenido`);
