import json
import random
import os

def create_distractors(question, group_answers):
    # If True/False
    ans = question["respuesta_correcta"].lower().strip()
    if ans in ["verdadero", "falso"]:
        options = ["Verdadero", "Falso"]
    else:
        # Pick 3 random answers from the same group that are not the correct answer
        distractors = [a for a in group_answers if a != question["respuesta_correcta"] 
                       and a.lower() not in ["verdadero", "falso"]]
        
        # If we don't have enough distractors, we might need to duplicate or fallback
        if len(distractors) < 3:
            distractors += ["(Opción no disponible)"] * (3 - len(distractors))
        else:
            distractors = random.sample(distractors, 3)
            
        options = [question["respuesta_correcta"]] + distractors
        random.shuffle(options)
        
    # Map to a, b, c, d
    labels = ['a', 'b', 'c', 'd']
    mapped_options = {}
    correct_key = 'a'
    
    for i, opt in enumerate(options):
        if i < len(labels):
            mapped_options[labels[i]] = opt
            if opt == question["respuesta_correcta"]:
                correct_key = labels[i]
                
    return mapped_options, correct_key

def main():
    input_file = "/Users/loloman/Documents/Workspaces/Personal/egel-loloman-economics/scripts/extracted_epe_questions.json"
    js_output = "/Users/loloman/Documents/Workspaces/Personal/egel-loloman-economics/src/data/banco_preguntas_epe.js"
    md_output = "/Users/loloman/Documents/Workspaces/Personal/egel-loloman-economics/Ponte_a_Prueba_EPE.md"
    
    with open(input_file, 'r', encoding='utf-8') as f:
        questions = json.load(f)
        
    # Group by exam
    grouped = {}
    for q in questions:
        exam = q["exam"]
        if exam not in grouped:
            grouped[exam] = []
        grouped[exam].append(q)
        
    # Generate JS structured data
    js_content = "export const epeQuestionBank = {\n"
    
    md_content = "# 🎯 PONTE A PRUEBA - Banco de Preguntas EPE\n\n"
    
    for exam, qs in grouped.items():
        # Get all unique correct answers for distractors
        group_answers = list(set([q["respuesta_correcta"] for q in qs if len(q["respuesta_correcta"]) > 0]))
        
        # JS Setup
        formatted_exam_name = exam.lower().replace(" ", "_")
        js_content += f"    {formatted_exam_name}: [\n"
        
        # MD Setup
        md_content += f"## 📌 {exam.upper()}\n\n"
        
        for i, q in enumerate(qs):
            # Generate options
            options, correct_key = create_distractors(q, group_answers)
            
            q_id = f"epe-{formatted_exam_name}-{i+1:03d}"
            
            # Add to JS
            js_content += "        {\n"
            js_content += f"            id: '{q_id}',\n"
            js_content += f"            nivel: 'intermedio',\n"
            # Escape single quotes in question
            pregunta_escaped = q["pregunta"].replace("'", "\\'")
            js_content += f"            pregunta: '{pregunta_escaped}',\n"
            js_content += "            opciones: {\n"
            for k, val in options.items():
                val_escaped = val.replace("'", "\\'")
                js_content += f"                {k}: '{val_escaped}',\n"
            js_content += "            },\n"
            js_content += f"            respuesta_correcta: '{correct_key}',\n"
            js_content += f"            explicacion: 'Respuesta correcta obtenida desde documentos EPE.',\n"
            js_content += f"            tema: '{exam}'\n"
            js_content += "        }"
            if i < len(qs) - 1:
                js_content += ",\n"
            else:
                js_content += "\n"
                
            # Add to MD
            md_content += f"**{i+1}.** {q['pregunta']}\n"
            for k, val in options.items():
                md_content += f"- {k}) {val}\n"
            md_content += f"\n*Respuesta correcta: {correct_key})*\n\n"
            
        js_content += "    ],\n"
        md_content += "---\n\n"
        
    js_content += "};\n"
    
    # Save JS
    with open(js_output, 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    # Save MD
    with open(md_output, 'w', encoding='utf-8') as f:
        f.write(md_content)
        
    print(f"Generated {js_output}")
    print(f"Generated {md_output}")

if __name__ == "__main__":
    main()
