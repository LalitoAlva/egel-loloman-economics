import os
import subprocess
import re
import json

def extract_text_from_docx(docx_path):
    # Use textutil to convert docx to txt
    result = subprocess.run(['textutil', '-convert', 'txt', docx_path, '-stdout'], capture_output=True, text=True)
    return result.stdout

def parse_exam_text(text, exam_name):
    # Split by instances of '•       Pregunta'
    blocks = re.split(r'•\s+Pregunta\s+\d+', text)[1:]
    questions = []
    
    for block in blocks:
        # Each block should have the question text, 'Respuesta seleccionada:' and 'Respuesta correcta:'
        lines = block.strip().split('\n')
        
        # Remove empty lines
        lines = [line.strip() for line in lines if line.strip()]
        
        # Usually first line is point value like "2 de 2 puntos"
        if len(lines) > 0 and 'puntos' in lines[0]:
            lines.pop(0)
            
        # The remaining lines until "Respuesta seleccionada:" is the question text
        question_lines = []
        selected_answer = ""
        correct_answer = ""
        
        mode = "question"
        for line in lines:
            if line == "Respuesta seleccionada:":
                mode = "selected"
            elif line == "Respuesta correcta:":
                mode = "correct"
            else:
                if mode == "question":
                    question_lines.append(line)
                elif mode == "selected":
                    selected_answer += line + " "
                elif mode == "correct":
                    correct_answer += line + " "
                    
        question_text = " ".join(question_lines).strip()
        selected_answer = selected_answer.strip()
        correct_answer = correct_answer.strip()
        
        if not correct_answer and selected_answer: # Sometime only correct answer is provided or selected answer is also correct
            correct_answer = selected_answer if "Respuesta seleccionada:" in block and "Respuesta correcta:" in block else ""
            
        if question_text and correct_answer:
            questions.append({
                "exam": exam_name,
                "pregunta": question_text,
                "respuesta_correcta": correct_answer
            })
            
    return questions

def main():
    docs_dir = "/Users/loloman/Documents/Workspaces/Personal/egel-loloman-economics/docs/EPE"
    output_file = "/Users/loloman/Documents/Workspaces/Personal/egel-loloman-economics/scripts/extracted_epe_questions.json"
    
    all_questions = []
    
    for filename in os.listdir(docs_dir):
        if filename.endswith(".docx") and not filename.startswith("~"):
            print(f"Processing {filename}...")
            filepath = os.path.join(docs_dir, filename)
            text = extract_text_from_docx(filepath)
            
            exam_name = filename.replace("ExamenesEPE_", "").replace(".docx", "")
            questions = parse_exam_text(text, exam_name)
            all_questions.extend(questions)
            
            print(f"  Extracted {len(questions)} questions.")
            
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_questions, f, ensure_ascii=False, indent=2)
        
    print(f"Total questions extracted: {len(all_questions)}")
    print(f"Saved to {output_file}")

if __name__ == "__main__":
    main()
