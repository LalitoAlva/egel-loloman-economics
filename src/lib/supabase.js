import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============================================
// FUNCIONES PARA PREGUNTAS
// ============================================

/**
 * Obtiene todas las preguntas (opcionalmente filtradas)
 */
export async function getPreguntas({ modulo, subtema, nivel } = {}) {
    let query = supabase.from('preguntas').select('*')

    if (modulo) query = query.eq('modulo', modulo)
    if (subtema) query = query.eq('subtema', subtema)
    if (nivel) query = query.eq('nivel', nivel)

    const { data, error } = await query

    if (error) {
        console.error('Error fetching preguntas:', error)
        throw error
    }

    return data
}

/**
 * Obtiene preguntas aleatorias para un quiz
 */
export async function getPreguntasAleatorias(cantidad = 10, filtros = {}) {
    let query = supabase.from('preguntas').select('*')

    if (filtros.modulo) query = query.eq('modulo', filtros.modulo)
    if (filtros.subtema) query = query.eq('subtema', filtros.subtema)
    if (filtros.nivel) query = query.eq('nivel', filtros.nivel)

    const { data, error } = await query

    if (error) {
        console.error('Error fetching preguntas:', error)
        throw error
    }

    // Mezclar aleatoriamente y tomar la cantidad deseada
    const shuffled = data.sort(() => Math.random() - 0.5)
    return shuffled.slice(0, cantidad)
}

/**
 * Obtiene los subtemas disponibles para un módulo
 */
export async function getSubtemas(modulo) {
    const { data, error } = await supabase
        .from('preguntas')
        .select('subtema')
        .eq('modulo', modulo)

    if (error) {
        console.error('Error fetching subtemas:', error)
        throw error
    }

    // Obtener valores únicos
    const uniqueSubtemas = [...new Set(data.map(d => d.subtema))]
    return uniqueSubtemas
}

/**
 * Obtiene estadísticas del banco de preguntas
 */
export async function getEstadisticas() {
    const { data, error } = await supabase
        .from('preguntas')
        .select('modulo, subtema, nivel')

    if (error) {
        console.error('Error fetching stats:', error)
        throw error
    }

    const stats = {
        total: data.length,
        porModulo: {},
        porNivel: {},
        porSubtema: {}
    }

    data.forEach(p => {
        stats.porModulo[p.modulo] = (stats.porModulo[p.modulo] || 0) + 1
        stats.porNivel[p.nivel] = (stats.porNivel[p.nivel] || 0) + 1
        stats.porSubtema[p.subtema] = (stats.porSubtema[p.subtema] || 0) + 1
    })

    return stats
}

// ============================================
// FUNCIONES PARA PROGRESO (opcional)
// ============================================

/**
 * Guarda el progreso de una respuesta
 */
export async function guardarProgreso(userId, preguntaId, correcta) {
    const { data, error } = await supabase
        .from('progreso_usuario')
        .upsert({
            user_id: userId,
            pregunta_id: preguntaId,
            respondida_correctamente: correcta,
            intentos: 1,
            ultimo_intento: new Date().toISOString()
        }, {
            onConflict: 'user_id,pregunta_id',
            ignoreDuplicates: false
        })

    if (error) {
        console.error('Error saving progress:', error)
        // No lanzar error, el progreso es opcional
    }

    return data
}

/**
 * Obtiene el progreso de un usuario
 */
export async function getProgreso(userId) {
    const { data, error } = await supabase
        .from('progreso_usuario')
        .select('*')
        .eq('user_id', userId)

    if (error) {
        console.error('Error fetching progress:', error)
        return []
    }

    return data
}

// ============================================
// FUNCIONES PARA UPLOAD DE IMÁGENES
// ============================================

/**
 * Sube una imagen a Supabase Storage
 */
export async function uploadImage(file, folder = 'modulos') {
    if (!file) return null

    try {
        const ext = file.name.split('.').pop()
        const filename = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`
        const filepath = `${folder}/${filename}`

        const { data, error } = await supabase.storage
            .from('uploads')
            .upload(filepath, file, {
                cacheControl: '3600',
                upsert: false
            })

        if (error) throw error

        // Obtener URL pública
        const { data: publicUrlData } = supabase.storage
            .from('uploads')
            .getPublicUrl(filepath)

        return publicUrlData.publicUrl
    } catch (error) {
        console.error('Upload error:', error.message)
        throw error
    }
}

/**
 * Elimina una imagen de Supabase Storage
 */
export async function deleteImage(fileUrl) {
    try {
        if (!fileUrl) return false

        // Extraer filepath de URL pública
        const parts = fileUrl.split('/uploads/')
        if (parts.length < 2) return false

        const filepath = parts[1]

        const { error } = await supabase.storage
            .from('uploads')
            .remove([filepath])

        if (error) throw error
        return true
    } catch (error) {
        console.error('Delete error:', error.message)
        return false
    }
}
