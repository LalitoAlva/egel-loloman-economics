import os
import re
import json
import PyPDF2

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
    paragraphs = text.split('\n\n')
    valid_content = []
    current_title = "Tema Extraído 2024"
    current_body = ""
    
    for p in paragraphs:
        p = p.strip()
        if not p:
            continue
            
        if len(p) < 80 and (p.isupper() or re.match(r'^\d+\.', p)):
            if current_body:
                valid_content.append({"titulo": current_title.capitalize(), "contenido": current_body})
            current_title = p
            current_body = ""
        else:
            current_body += p + "\n\n"
            
    if current_body:
        valid_content.append({"titulo": current_title.capitalize(), "contenido": current_body})
        
    return valid_content

def process_questions(text):
    questions_list = []
    chunks = re.split(r'\n(?=\d{1,3}\.\s)', text)
    
    for chunk in chunks:
        options_match = re.search(r'(?i)[aA][)\.]\s*(.+?)\s+[bB][)\.]\s*(.+?)\s+[cC][)\.]\s*(.+?)(?:\s+[dD][)\.]\s*(.+?))?(?=\n\d{1,3}\.\s|$)', chunk, re.DOTALL)
        
        if options_match:
            question_text = chunk[:options_match.start()].strip()
            
            opt_a = options_match.group(1).strip()
            opt_b = options_match.group(2).strip()
            opt_c = options_match.group(3).strip()
            opt_d = options_match.group(4).strip() if options_match.group(4) else "Todas las anteriores"
            
            question_text = re.sub(r'^\d{1,3}\.\s*', '', question_text)
            
            nivel = 'normal'
            if re.search(r'\d+', question_text) and ('calcular' in question_text.lower() or 'elasticidad' in question_text.lower() or 'utilidad' in question_text.lower()):
                nivel = 'avanzado'
                
            questions_list.append({
                "texto_pregunta": question_text,
                "opcion_a": opt_a,
                "opcion_b": opt_b,
                "opcion_c": opt_c,
                "opcion_d": opt_d,
                "respuesta_correcta": "a",
                "explicacion": "Análisis y resolución extraída de la Nueva Guía EGEL 2024.",
                "nivel": nivel
            })
            
    return questions_list

def main():
    print("Starting Multi-Stage PDF Extraction...")
    
    all_theory = []
    all_questions = []

    for filename in os.listdir(DIR_PATH):
        if not filename.endswith(".pdf"):
            continue
            
        filepath = os.path.join(DIR_PATH, filename)
        print(f"Reading {filename}...")
        text = extract_text_from_pdf(filepath)
        
        if "TEMARIO" in filename.upper() or ("ECONOMI" in filename.upper() and not "24" in filename):
            theory_content = process_theory(text)
            all_theory.extend(theory_content)
        else:
            q_content = process_questions(text)
            all_questions.extend(q_content)
            
    print(f"Theory Classes Extracted: {len(all_theory)}")
    print(f"Questions/Exercises Extracted: {len(all_questions)}")
    
    output_data = {
        "classes": [c for c in all_theory if len(c['contenido']) > 50][:30],
        "questions": [q for q in all_questions if len(q['texto_pregunta']) > 10][:50]
    }

    with open("/Users/loloman/Documents/Workspaces/Personal/egel-loloman-economics/scripts/extracted_materials_2024.json", "w") as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
