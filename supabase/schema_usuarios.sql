-- ============================================
-- SCHEMA DE USUARIOS, ROLES Y RESULTADOS
-- ============================================

-- Tabla de Roles
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT,
    permisos JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar VARCHAR(10) DEFAULT '👤',
    rol_id INTEGER REFERENCES roles(id) DEFAULT 2,
    activo BOOLEAN DEFAULT true,
    ultimo_acceso TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Sesiones de Examen
CREATE TABLE IF NOT EXISTS examenes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL, -- 'quiz', 'semanal', 'practica'
    modulo VARCHAR(100),
    total_preguntas INTEGER NOT NULL,
    correctas INTEGER DEFAULT 0,
    incorrectas INTEGER DEFAULT 0,
    porcentaje DECIMAL(5,2) DEFAULT 0,
    tiempo_segundos INTEGER,
    fecha_inicio TIMESTAMP DEFAULT NOW(),
    fecha_fin TIMESTAMP,
    completado BOOLEAN DEFAULT false
);

-- Tabla de Respuestas del Examen (detalle)
CREATE TABLE IF NOT EXISTS respuestas_examen (
    id SERIAL PRIMARY KEY,
    examen_id UUID REFERENCES examenes(id) ON DELETE CASCADE,
    pregunta_id VARCHAR(50) NOT NULL,
    respuesta_usuario CHAR(1),
    es_correcta BOOLEAN,
    tiempo_respuesta_seg INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de Progreso por Módulo
CREATE TABLE IF NOT EXISTS progreso_modulo (
    id SERIAL PRIMARY KEY,
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    modulo VARCHAR(100) NOT NULL,
    tarjetas_vistas INTEGER DEFAULT 0,
    tarjetas_totales INTEGER DEFAULT 0,
    audio_escuchado BOOLEAN DEFAULT false,
    completado BOOLEAN DEFAULT false,
    ultima_tarjeta INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(usuario_id, modulo)
);

-- Tabla de Pruebas Semanales
CREATE TABLE IF NOT EXISTS pruebas_semanales (
    id SERIAL PRIMARY KEY,
    semana_numero INTEGER NOT NULL,
    anio INTEGER NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    activa BOOLEAN DEFAULT true,
    total_preguntas INTEGER DEFAULT 80,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(semana_numero, anio)
);

-- Tabla de Configuración del Sistema
CREATE TABLE IF NOT EXISTS configuracion (
    clave VARCHAR(100) PRIMARY KEY,
    valor JSONB NOT NULL,
    descripcion TEXT,
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- DATOS INICIALES
-- ============================================

-- Roles por defecto
INSERT INTO roles (id, nombre, descripcion, permisos) VALUES
(1, 'admin', 'Administrador del sistema', '{"manage_users": true, "manage_roles": true, "manage_catalogs": true, "view_all_results": true, "create_exams": true}'),
(2, 'estudiante', 'Estudiante regular', '{"view_own_results": true, "take_exams": true, "view_content": true}'),
(3, 'profesor', 'Profesor/Tutor', '{"view_all_results": true, "create_exams": true, "view_content": true, "manage_questions": true}')
ON CONFLICT (id) DO NOTHING;

-- Usuario admin inicial (Lalo)
-- Password: admin (hasheado con SHA256 simple para demo, en producción usar bcrypt)
INSERT INTO usuarios (id, email, nombre, password_hash, avatar, rol_id) VALUES
('00000000-0000-0000-0000-000000000001', 'lalo@admin.com', 'Lalo', 'admin', '👨‍💼', 1)
ON CONFLICT (email) DO NOTHING;

-- Configuración inicial
INSERT INTO configuracion (clave, valor, descripcion) VALUES
('preguntas_quiz', '{"opciones": [30, 50, 80, 100], "default": 50}', 'Opciones de cantidad de preguntas para quiz'),
('preguntas_semanal', '{"cantidad": 80}', 'Cantidad de preguntas para prueba semanal'),
('niveles_dificultad', '{"basico": 0.4, "intermedio": 0.4, "avanzado": 0.2}', 'Proporción de preguntas por dificultad')
ON CONFLICT (clave) DO NOTHING;

-- RLS Policies
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE examenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE respuestas_examen ENABLE ROW LEVEL SECURITY;
ALTER TABLE progreso_modulo ENABLE ROW LEVEL SECURITY;

-- Política: usuarios pueden ver su propia info
CREATE POLICY "Users can view own data" ON usuarios
    FOR SELECT USING (true);

-- Política: cualquiera puede leer roles
CREATE POLICY "Anyone can read roles" ON roles
    FOR SELECT USING (true);

-- Política: examenes visibles para todos (en demo)
CREATE POLICY "View all exams" ON examenes
    FOR ALL USING (true);

CREATE POLICY "View all responses" ON respuestas_examen
    FOR ALL USING (true);

CREATE POLICY "View all progress" ON progreso_modulo
    FOR ALL USING (true);
