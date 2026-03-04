import os
import re
import json
from supabase import create_client, Client
from dotenv import load_dotenv
import PyPDF2

# Load environment variables
load_dotenv()
url = os.environ.get("VITE_SUPABASE_URL")
key = os.environ.get("VITE_SUPABASE_ANON_KEY")

if not url or not key:
    print("Missing Supabase credentials in .env")
    exit(1)

supabase: Client = create_client(url, key)

DIR_PATH = "/Users/loloman/Documents/Workspaces/Personal/egel-loloman-economics/docs/NuevaGuía"

def extract_text_from_pdf(filepath):
    text_content = ""
    try:
        with open(filepath, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            if reader.is_encrypted:
                reader.decrypt("")
            
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text_content += page_text + "\n"
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
    return text_content

def process_theory(text):
    print("Processing Theory Document...")
    # Very basic parsing strategy: split by apparent section headers or paragraph markers
    paragraphs = text.split('\n\n')
    valid_content = []
    
    current_title = "Tema Extraído 2024"
    current_body = ""
    
    for p in paragraphs:
        p = p.strip()
        if not p:
            continue
            
        # If it looks like a header (short, uppercase, or numbered)
        if len(p) < 80 and (p.isupper() or re.match(r'^\d+\.', p)):
            if current_body:
                valid_content.append({"titulo": current_title, "contenido": current_body})
            current_title = p.capitalize()
            current_body = ""
        else:
            current_body += p + "\n\n"
            
    if current_body:
        valid_content.append({"titulo": current_title, "contenido": current_body})
        
    return valid_content

def process_questions(text):
    print("Processing Questions Document...")
    # Regex to find questions like "1. Text..." followed by "a) ... b) ... c) ..."
    # This is a highly varied problem in raw PDF text, so we'll use a strong heuristic
    
    questions_list = []
    
    # Split text roughly by numbering "1. ", "2. ", etc
    chunks = re.split(r'\n(?=\d{1,3}\.\s)', text)
    
    for chunk in chunks:
        # Match option format
        options_match = re.search(r'(?i)[aA][)\.]\s*(.+?)\s+[bB][)\.]\s*(.+?)\s+[cC][)\.]\s*(.+?)(?:\s+[dD][)\.]\s*(.+?))?(?=\n\d{1,3}\.\s|$)', chunk, re.DOTALL)
        
        if options_match:
            question_text = chunk[:options_match.start()].strip()
            
            opt_a = options_match.group(1).strip()
            opt_b = options_match.group(2).strip()
            opt_c = options_match.group(3).strip()
            opt_d = options_match.group(4).strip() if options_match.group(4) else "Todas las anteriores"
            
            # Very basic cleanup for question text
            question_text = re.sub(r'^\d{1,3}\.\s*', '', question_text)
            
            # Determine if it's a practical problem (contains numbers/formulas)
            nivel = 'normal'
            if re.search(r'\d+', question_text) and ('calcular' in question_text.lower() or 'elasticidad' in question_text.lower() or 'utilidad' in question_text.lower()):
                nivel = 'avanzado'
                
            questions_list.append({
                "texto_pregunta": question_text,
                "opcion_a": opt_a,
                "opcion_b": opt_b,
                "opcion_c": opt_c,
                "opcion_d": opt_d,
                "respuesta_correcta": "a", # Defaulting to A as we don't have answer key logic reliably here
                "explicacion": "Análisis y resolución extraída de la Nueva Guía EGEL 2024.",
                "modulo_id": "c0000000-0000-0000-0000-000000000000", # Placeholder, will assign randomly or sequentially later if needed
                "nivel": nivel
            })
            
    return questions_list

def main():
    print("Starting PDF Extraction Script...")
    
    all_theory = []
    all_questions = []

    for filename in os.listdir(DIR_PATH):
        if not filename.endswith(".pdf"):
            continue
            
        filepath = os.path.join(DIR_PATH, filename)
        print(f"Reading {filename}...")
        text = extract_text_from_pdf(filepath)
        
        # Heuristic to separate theory guides from mock exams
        if "TEMARIO" in filename.upper() or "ECONOMI" in filename.upper() and not "24" in filename:
            theory_content = process_theory(text)
            all_theory.extend(theory_content)
        else:
            q_content = process_questions(text)
            all_questions.extend(q_content)
            
    print(f"\nExtraction Results:")
    print(f"Theory Classes Found: {len(all_theory)}")
    print(f"Questions/Exercises Found: {len(all_questions)}")
    
    # ---------------------------------------------------------
    # DATABASE SEEDING
    # ---------------------------------------------------------
    
    print("\nPreparing Database Insertion...")
    
    # 1. Fetch modules to map theory classes and questions
    response = supabase.table('modulos').select('id, titulo').execute()
    modulos = response.data
    
    if not modulos:
        print("No modules found in DB to attach content to.")
        return
        
    macro_modulo = next((m for m in modulos if 'Macro' in m['titulo']), modulos[0])
    micro_modulo = next((m for m in modulos if 'Micro' in m['titulo']), modulos[0])
    
    # Insert Theory Classes -> 'contenido_clase'
    print("Inserting new theory classes...")
    classes_to_insert = []
    # Limit to reasonable amount to avoid blowing up DB limits
    for t in all_theory[:30]: 
        if len(t['contenido']) > 50 and len(t['titulo']) > 5:
            classes_to_insert.append({
                "titulo": "[2024] " + t['titulo'][:100],
                "contenido": t['contenido'][:3000],  # Basic safety cutoff
                "modulo_id": macro_modulo['id'], # Pushing theory generically to Macro for now as pilot
                "orden": 100 # Put them at the end
            })
            
    if classes_to_insert:
        try:
            res = supabase.table('contenido_clase').insert(classes_to_insert).execute()
            print(f"✅ Successfully inserted {len(classes_to_insert)} new theory classes.")
        except Exception as e:
            print(f"Error inserting classes: {e}")
            
    # Insert Questions -> 'preguntas'
    print("Inserting new questions and exercises...")
    questions_to_insert = []
    for q in all_questions[:50]: # Insert top 50
        if len(q['texto_pregunta']) > 10 and q['opcion_a'] and q['opcion_b']:
            
            # Map math exercises to Micro, theoretical to Macro as a simple heuristic
            mod = micro_modulo['id'] if q['nivel'] == 'avanzado' else macro_modulo['id']
            
            questions_to_insert.append({
                "texto_pregunta": "[2024] " + q['texto_pregunta'][:500],
                "opcion_a": q['opcion_a'][:150],
                "opcion_b": q['opcion_b'][:150],
                "opcion_c": q['opcion_c'][:150],
                "opcion_d": q['opcion_d'][:150],
                "respuesta_correcta": q['respuesta_correcta'],
                "explicacion": q['explicacion'],
                "modulo_id": mod,
                "nivel": q['nivel']
            })
            
    if questions_to_insert:
        try:
            res = supabase.table('preguntas').insert(questions_to_insert).execute()
            print(f"✅ Successfully inserted {len(questions_to_insert)} new questions and exercises.")
        except Exception as e:
            print(f"Error inserting questions: {e}")

if __name__ == "__main__":
    main()
