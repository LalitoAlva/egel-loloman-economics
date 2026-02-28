#!/usr/bin/env python3
import sys

def main():
    source_file = "/Users/loloman/Documents/Workspaces/Personal/egel-loloman-economics/Ponte_a_Prueba_EPE.md"
    target_file = "/Users/loloman/Documents/Workspaces/Personal/egel-loloman-economics/Ponte_a_Prueba_Preguntas.md"
    
    # Read the EPE content
    with open(source_file, 'r', encoding='utf-8') as f:
        content_to_append = f.read()
        
    # Append to the main questions markdown
    with open(target_file, 'a', encoding='utf-8') as f:
        f.write("\n\n---\n\n## 📌 SECCIÓN EPE: EXTRAÍDA DE DOCUMENTOS\n\n")
        f.write(content_to_append)
        
    print("Append successful.")

if __name__ == "__main__":
    main()
