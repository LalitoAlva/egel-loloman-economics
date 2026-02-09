# Quick Start: Socratic Questions Loader

## TL;DR - Load Questions in 30 Seconds

```bash
# From project root directory
node scripts/load_socratic_questions.js
```

Wait for completion. Should see:
```
✓ Batch 1/3 inserted...
✓ Batch 2/3 inserted...
✓ Batch 3/3 inserted...
✓ Found 111 active questions in module 1
✨ COMPLETE!
```

That's it! Questions are now in the database.

---

## Alternative: Use SQL File Instead

If the script fails:

1. Go to **Supabase Dashboard**
2. Click **SQL Editor**
3. Click **New Query**
4. Open file: `supabase/socratic_questions_insert.sql`
5. Copy **entire** contents
6. Paste into Supabase
7. Click **Run**

Should insert 111 rows.

---

## Verify It Worked

In Supabase SQL Editor, run:
```sql
SELECT COUNT(*) FROM preguntas WHERE modulo_id = 1 AND activo = true;
```

Should return: **111**

---

## Test in the App

```bash
npm run dev
```

1. Open http://localhost:5173
2. Click "Ponte a Prueba"
3. Click "Microeconomía"
4. Should see Socratic questions with 3 phases:
   - Read question
   - Click "Ya pensé" → See hint
   - Click "Ver Respuesta" → See full answer

---

## What Got Loaded?

- **111 questions** on Microeconomía
- **40 básico** (basic) level
- **40 intermedio** (intermediate) level
- **31 avanzado** (advanced) level

All with:
- Multiple choice answers (a, b, c, d)
- Detailed explanations
- Automatic exam tracking

---

## If Something Goes Wrong

See **SOCRATIC_LOADER_README.md** for troubleshooting.

Common issues:
- **"Cannot find module"** → Run `npm install` first
- **"RLS Policy"** → Use SQL method instead
- **No questions appear** → Check if module 1 exists

---

## Files Created

```
scripts/load_socratic_questions.js       ← Node.js loader (RECOMMENDED)
supabase/socratic_questions_insert.sql   ← SQL backup method
SOCRATIC_LOADER_README.md                ← Full documentation
QUICK_START.md                           ← This file
```

---

## Data Flow

```
Questions (111) → Database (Supabase) → App (SocraticMode) → User
```

---

Done! Questions are loaded and ready to use.
