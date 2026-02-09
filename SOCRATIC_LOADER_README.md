# Socratic Questions Bulk Loader

This guide explains how to load 111 Socratic questions into the Supabase database and verify they work with the SocraticMode component.

## Files Created

### 1. Load Script
**File:** `/scripts/load_socratic_questions.js`

A Node.js script that bulk-loads all Socratic questions from `src/data/socratic_questions.js` into the Supabase `preguntas` table.

**Features:**
- Batches insertions in groups of 50 to avoid rate limits
- 500ms delay between batches for safety
- Progress reporting
- Verification after insertion
- Breakdown by difficulty level

**Usage:**
```bash
node scripts/load_socratic_questions.js
```

**Output:**
```
Socratic Questions Bulk Loader
============================================================
Database: https://xutsiuyihbufpnvhhccs.supabase.co
Questions to insert: 111
Batch size: 50

Inserting 111 questions in 3 batches...
============================================================
✓ Batch 1/3 inserted (50 questions, 50/111 total)
✓ Batch 2/3 inserted (50 questions, 100/111 total)
✓ Batch 3/3 inserted (11 questions, 111/111 total)

============================================================
Verifying insertion...
✓ Found 111 active questions in module 1

Questions by level:
  - basico: 40 questions
  - intermedio: 40 questions
  - avanzado: 31 questions

✨ COMPLETE!
```

### 2. SQL Migration File
**File:** `/supabase/socratic_questions_insert.sql`

Contains complete SQL INSERT statements for all 111 Socratic questions. Can be run directly in the Supabase SQL Editor as an alternative to the Node.js script.

**Usage:**
1. Open your Supabase project
2. Go to SQL Editor
3. Create a new query
4. Copy the entire contents of `socratic_questions_insert.sql`
5. Run the query
6. Verify: Should insert 111 rows into the `preguntas` table

**Structure:**
```sql
INSERT INTO preguntas (modulo_id, tema, subtema, nivel, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, explicacion, activo) VALUES
('1', '...', '...', 'basico', '...', '...', '...', '...', '...', 'a', '...', true),
...
```

## How It Works

### Data Source
All questions come from `/src/data/socratic_questions.js`, which exports an array of 111 question objects structured as:

```javascript
{
    modulo_id: 1,
    tema: "Función de Utilidad y Utilidad Marginal",
    subtema: "Funciones lineales",
    nivel: "basico",
    pregunta: "¿Qué significa que la función sea U(X,Y) = 2X + 4Y?",
    opcion_a: "Es una suma simple sin interacción...",
    opcion_b: "Hay interacción multiplicativa...",
    opcion_c: "Los bienes son complementos perfectos",
    opcion_d: "La función no puede interpretarse...",
    respuesta_correcta: "a",
    explicacion: "U(X,Y) = 2X + 4Y es lineal, representando..."
}
```

### Database Table Structure
The questions are inserted into the existing `preguntas` table with these columns:
- `id` - Auto-generated UUID (primary key)
- `modulo_id` - Foreign key to `modulos` table (set to 1 for all Socratic questions)
- `tema` - Main topic/theme
- `subtema` - Sub-topic
- `nivel` - Difficulty level: `basico`, `intermedio`, or `avanzado`
- `pregunta` - The question text
- `opcion_a` through `opcion_d` - Multiple choice options
- `respuesta_correcta` - Correct answer (a, b, c, or d)
- `explicacion` - Detailed explanation
- `activo` - Set to true so questions are loaded by SocraticMode
- `tipo` - Set to 'socratica' for filtering
- `created_at` - Timestamp (auto-set to current time)

### How SocraticMode Uses These Questions

The existing `SocraticMode.jsx` component already queries these questions correctly:

```javascript
const { data, error } = await supabase
    .from('preguntas')
    .select('*, modulos(titulo, icon, color)')
    .eq('modulo_id', moduloId)      // Filter by module
    .eq('activo', true)              // Only active questions
    .order('created_at')
```

Once these questions are inserted:
1. User selects a module (e.g., "Microeconomía" with `modulo_id = 1`)
2. SocraticMode queries the `preguntas` table for all active questions with `modulo_id = 1`
3. Gets 111 Socratic questions (questions marked as 'socratica' type)
4. Shuffles them and shows up to 20 per session
5. Displays the 3-phase Socratic method:
   - **Phase 1 (REFLEXIONA):** Shows the question, user thinks about it
   - **Phase 2 (PISTA):** Shows a hint from the explanation
   - **Phase 3 (RESPUESTA):** Shows the complete answer and explanation

## Verification Steps

### Step 1: Load the Questions
```bash
cd /sessions/fervent-affectionate-heisenberg/mnt/egel-loloman-economics
npm install  # If not already installed
node scripts/load_socratic_questions.js
```

### Step 2: Verify in Supabase
Go to your Supabase dashboard and run this query:
```sql
SELECT COUNT(*) as total,
       COUNT(CASE WHEN nivel = 'basico' THEN 1 END) as basico,
       COUNT(CASE WHEN nivel = 'intermedio' THEN 1 END) as intermedio,
       COUNT(CASE WHEN nivel = 'avanzado' THEN 1 END) as avanzado
FROM preguntas
WHERE modulo_id = 1 AND activo = true AND tipo = 'socratica';
```

Expected result:
```
total | basico | intermedio | avanzado
------|--------|------------|----------
 111  |   40   |     40     |    31
```

### Step 3: Test in the App
1. Run the development server: `npm run dev`
2. Navigate to "Ponte a Prueba" (Socratic Mode)
3. Click on the "Microeconomía" module
4. The app should load 20 of the 111 Socratic questions
5. Go through the 3-phase method:
   - Read the question
   - Click "Ya pensé mi respuesta" to see the hint
   - Click "Ver Respuesta Completa" to see the full answer
   - Mark whether you mastered it
6. The questions should display correctly with all content

## Question Categories

The 111 Socratic questions cover these topics:

1. **Función de Utilidad y Utilidad Marginal** (20 questions)
   - Linear functions
   - Cobb-Douglas functions
   - Leontief (perfect complements)
   - Marginal utility concepts

2. **Restricción Presupuestaria** (15 questions)
   - Budget constraint equations
   - Income and price effects
   - Optimal consumption

3. **Teoría de la Demanda** (15 questions)
   - Demand curves
   - Price elasticity
   - Income elasticity

4. **Análisis de Cambios Económicos** (15 questions)
   - Substitution and income effects
   - Giffen goods
   - Inferior goods

5. **Producción y Costos** (20 questions)
   - Production functions
   - Marginal product
   - Cost minimization

6. **Mercados Competitivos** (16 questions)
   - Perfect competition
   - Profit maximization
   - Long-run equilibrium

## Troubleshooting

### Error: "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### Error: "Failed to insert questions - RLS Policy"
- Check that your Supabase RLS policies allow anon role to INSERT into preguntas
- Or run the SQL migration directly through the Supabase dashboard instead

### Error: "Foreign key constraint violation on modulo_id"
- Ensure module with `id = 1` exists in the `modulos` table
- Check: `SELECT * FROM modulos WHERE id = 1;`

### Error: "Column 'tipo' does not exist"
- The script sets `tipo = 'socratica'` but this column may not exist
- Option 1: Add the column: `ALTER TABLE preguntas ADD COLUMN tipo TEXT;`
- Option 2: Use the SQL migration file instead, which only uses required columns

### No questions appear in SocraticMode
- Verify questions were inserted: `SELECT COUNT(*) FROM preguntas WHERE modulo_id = 1 AND activo = true;`
- Check if module 1 is active: `SELECT * FROM modulos WHERE id = 1 AND activo = true;`
- Verify no RLS policies are blocking reads

## Alternative: Direct SQL Method

If the Node.js script fails, use the SQL file directly:

1. Go to Supabase dashboard → SQL Editor
2. Click "Create a new query"
3. Open `/supabase/socratic_questions_insert.sql`
4. Copy entire contents
5. Paste into the SQL editor
6. Click "Run"
7. Should see "111 rows inserted"

## Technical Notes

- **Batch Size:** Set to 50 questions per batch to avoid Supabase rate limits
- **Delay:** 500ms between batches provides safety margin
- **Module ID:** All questions are set to `modulo_id = 1` (Microeconomía)
- **Active Status:** All questions have `activo = true` to be immediately usable
- **Type:** Questions have `tipo = 'socratica'` to distinguish from other question types
- **Order:** Questions are shuffled randomly in SocraticMode, not used in the order stored

## Next Steps

1. Run the loader script: `node scripts/load_socratic_questions.js`
2. Test in SocraticMode: Select Microeconomía module
3. Verify all 3 phases work (Question → Hint → Answer)
4. Check that explanations and formulas display correctly
5. Monitor exam records being created in `examenes` table
6. Review student responses in `respuestas_examen` table

---

**Last Updated:** 2026-02-08
**Created By:** Socratic Questions Bulk Loader
**Questions:** 111
**Module:** Microeconomía (ID: 1)
**Difficulty Distribution:** 40 básico, 40 intermedio, 31 avanzado
