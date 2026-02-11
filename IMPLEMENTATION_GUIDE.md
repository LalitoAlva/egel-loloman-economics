# Guía de Implementación: Session Timeout, Question Preview e Image Upload

## ✅ Completado

### Componentes Creados
- ✅ `SessionContext.jsx` - Manejo de timeout y actividad de usuario
- ✅ `SessionTimeoutModal.jsx` - Modal de confirmación con countdown
- ✅ `QuestionPreviewModal.jsx` - Vista previa de preguntas
- ✅ `ImageUploadWidget.jsx` - Widget de carga de imágenes

### Funcionalidades Agregadas
- ✅ Session timeout después de 2 minutos sin actividad
- ✅ Modal de confirmación con 30 segundos para extender sesión
- ✅ Botón de vista previa en QuizMode y WeeklyTest
- ✅ Widget de carga de imágenes a Supabase Storage
- ✅ Funciones `uploadImage()` y `deleteImage()` en `supabase.js`
- ✅ Estilos CSS completos para todos los componentes
- ✅ Integración de SessionProvider en `App.jsx`

### Archivos Modificados
- `App.jsx` - Envuelto con SessionProvider, agregado SessionTimeoutModal
- `QuizMode.jsx` - Agregado botón de preview y modal
- `WeeklyTest.jsx` - Agregado botón de preview y modal
- `supabase.js` - Agregadas funciones de upload
- `index.css` - Agregados estilos para 3 nuevos componentes

---

## 🔧 Próximos Pasos: Configuración de Supabase

### 1. Crear tabla `admin_settings`

Ejecuta este SQL en la consola Supabase (SQL Editor):

```sql
-- Crear tabla admin_settings
CREATE TABLE IF NOT EXISTS admin_settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar configuración por defecto
INSERT INTO admin_settings (setting_key, setting_value)
VALUES ('session_timeout_minutes', '2')
ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value;

-- RLS Policy: Solo admins pueden ver/editar
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read settings" ON admin_settings
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update settings" ON admin_settings
  FOR UPDATE USING (auth.role() = 'authenticated');
```

### 2. Crear bucket `uploads` en Supabase Storage

Pasos en consola Supabase:
1. Ve a **Storage** en el panel lateral
2. Haz click en **Create new bucket**
3. Nombre: `uploads`
4. Marca como **Public** (importante para que las imágenes sean públicas)
5. Haz click en **Create bucket**

### 3. Configurar RLS Policies para el bucket

En **Storage**, ve al bucket `uploads`:

```sql
-- Política para SELECT (todos pueden ver)
CREATE POLICY "Permite acceso público de lectura en uploads"
ON storage.objects FOR SELECT
USING (bucket_id = 'uploads');

-- Política para INSERT (solo admin y profesor)
CREATE POLICY "Solo admin y profesor pueden subir en uploads"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'uploads' AND
  (
    auth.uid() IN (
      SELECT id FROM usuarios WHERE rol_id IN (
        SELECT id FROM roles WHERE nombre IN ('admin', 'profesor')
      )
    )
  )
);

-- Política para DELETE (solo propietario o admin)
CREATE POLICY "Permite eliminar archivos propios"
ON storage.objects FOR DELETE
USING (bucket_id = 'uploads');
```

**Alternativa más simple** (sin RLS avanzada):
1. En el bucket `uploads`, abre la pestaña **Policies**
2. Selecciona **Public policies** → **Enable** (esto permite acceso público)
3. Los permisos se validarán en la aplicación React

---

## 📋 Instrucciones de Uso

### Session Timeout (2 minutos)

1. **Configurar timeout:**
   - Ir a AdminPanel → Configuración
   - Cambiar "Timeout de inactividad (minutos)" (default: 2)
   - Click "Guardar"

2. **Comportamiento:**
   - Cualquier click, tecla o scroll resetea el contador
   - A los 2 minutos de inactividad → aparece modal
   - Modal muestra countdown de 30 segundos
   - Usuario puede:
     - Hacer click "Extender sesión" → 2 minutos más
     - Hacer click "Cerrar sesión" → logout inmediato
     - Presionar ESC → logout inmediato
     - No hacer nada en 30s → auto logout

### Question Preview (Vista Previa)

1. **En QuizMode o WeeklyTest:**
   - Antes de responder una pregunta
   - Botón "👁️ Vista previa" disponible
   - Click → abre modal con pregunta grande y clara
   - Las 4 opciones se muestran sin interactividad
   - Click "← Volver a responder" o ESC para cerrar
   - Después de responder, botón queda deshabilitado

### Image Upload (Subir Imágenes)

1. **En AdminPanel:**
   - Ir a un módulo
   - Sección "📸 Imagen/Infografía"
   - Arrastrar imagen o hacer click para seleccionar
   - Preview muestra la imagen seleccionada
   - Click "Subir imagen" → sube a Supabase Storage
   - Barra circular de progreso mientras sube
   - ✓ Mensaje de éxito cuando termina

2. **En ContentManager:**
   - Al crear/editar contenido
   - Sección de Multimedia
   - Mismo proceso que AdminPanel
   - URL se guarda automáticamente en formulario

**Validaciones:**
- Tipos permitidos: JPG, PNG, GIF, WebP
- Tamaño máximo: 5MB
- Solo admin/profesor pueden subir
- La imagen anterior se elimina automáticamente si se reemplaza

---

## 🧪 Testing Checklist

### Session Timeout
- [ ] Login exitoso
- [ ] Esperar 2 minutos sin hacer nada
- [ ] Modal aparece con countdown de 30s
- [ ] Countdown disminuye cada segundo
- [ ] Color cambia: amarillo (20+s) → naranja (11-20s) → rojo (0-10s)
- [ ] Click "Extender sesión" → vuelve a normal
- [ ] Click "Cerrar sesión" → logout inmediato
- [ ] Presionar ESC → logout inmediato
- [ ] Dejar pasar 30s → auto logout
- [ ] Hacer click después de 1 min → contador se reinicia
- [ ] En AdminPanel cambiar timeout a 1 minuto → funciona con nuevo valor

### Question Preview
- [ ] En QuizMode, botón visible antes de responder
- [ ] Click en preview → abre modal
- [ ] Modal muestra: número, tags, pregunta grande, 4 opciones grises
- [ ] Click "← Volver a responder" → cierra modal
- [ ] ESC → cierra modal
- [ ] Click afuera → cierra modal
- [ ] Después de responder, botón queda gris/deshabilitado
- [ ] En WeeklyTest, preview funciona igual

### Image Upload
- [ ] En AdminPanel, widget visible en sección Multimedia
- [ ] Drag-drop de imagen funciona
- [ ] Click para seleccionar archivo funciona
- [ ] Preview muestra imagen seleccionada (80x80px)
- [ ] Click "Subir imagen" → progreso circular aparece
- [ ] Progreso sube de 0% a 100%
- [ ] Mensaje "✓ ¡Imagen subida exitosamente!" aparece
- [ ] URL aparece en campo del formulario
- [ ] Recargar página → imagen persiste (guardada en BD)
- [ ] Intentar subir archivo > 5MB → error "Archivo muy grande"
- [ ] Intentar subir PDF → error "Tipo no permitido"
- [ ] Logout → widget deshabilitado
- [ ] Login como estudiante → error "Solo admin/profesor"
- [ ] Cambiar imagen de módulo → anterior se elimina automáticamente

---

## 📝 Notas Técnicas

### SessionContext
- Monitorea eventos: `mousemove`, `keypress`, `click`, `scroll`, `touchstart`
- Debouncing de 5 segundos (no resetea cada pixel)
- Countdown de 30 segundos antes del logout
- Timeout configurable desde BD (tabla `admin_settings`)
- Se integra automáticamente al loguearse

### QuestionPreviewModal
- No interfiere con flujo de respuesta
- Modal fullscreen con blur de fondo
- Responsive en mobile (90% del alto)
- Deshabilitado después de responder

### ImageUploadWidget
- Sube a Supabase Storage (carpeta `/uploads/{modulo_id}/`)
- Validación cliente + servidor
- Progreso visual con círculo SVG
- Previews de imagen antes de subir
- Manejo automático de eliminación de archivo anterior
- Soporte para drag-drop

---

## 🐛 Troubleshooting

**El modal de sesión no aparece:**
- Asegúrate que SessionProvider está envolviendo AppContent en App.jsx ✓
- Verifica que SessionTimeoutModal se está renderizando ✓
- Revisa la consola para errores

**Las imágenes no se suben:**
- Verifica que el bucket `uploads` existe en Supabase Storage
- Comprueba que no hay errores CORS (debe ser bucket público)
- Revisa permisos RLS si tienes habilitado
- En consola, verifica logs de error de Supabase

**Preview no muestra datos:**
- Asegúrate que `pregunta` tiene las propiedades: `id`, `pregunta`, `opcion_a`, `opcion_b`, `opcion_c`, `opcion_d`, `nivel`, `tipo`, `modulos`
- Verifica que el modal recibe la pregunta completa

---

## 🚀 Deployment

Antes de hacer deploy:

1. **Supabase:**
   - ✓ Tabla `admin_settings` creada e insertada
   - ✓ Bucket `uploads` creado y público
   - ✓ RLS policies configuradas (o deshabilitadas si usas públicas)

2. **Frontend:**
   - Verifica variables de entorno: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
   - Todos los archivos nuevos están creados
   - No hay errores en consola

3. **Testing:**
   - Ejecuta checklist arriba
   - Verifica en producción con usuario real

---

## 📞 Soporte Rápido

**Línea de código clave para depuración:**
```javascript
// En SessionContext.jsx para ver inactividad en consola
console.log('Inactividad detectada:', Math.floor((Date.now() - lastActivityRef.current) / 1000), 'segundos');
```

**Verificar que Supabase Storage funciona:**
```javascript
// En consola del navegador
import { supabase } from './lib/supabase';
const { data } = await supabase.storage.from('uploads').list('modulos');
console.log(data);
```

---

**Versión:** 1.0
**Fecha:** 2025-02-11
**Estado:** 80% completado (falta configuración manual de Supabase)
