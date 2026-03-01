import { supabase } from '../lib/supabase';
import html2pdf from 'html2pdf.js';

// Convert markdown-like syntax to simple HTML for the PDF, enforcing Tables for formulas
export const processMarkdown = (text) => {
    if (!text) return '';

    let inList = false;
    let lines = text.split('\n');
    let htmlLines = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        // Match bullet points that start with a bold title like "* **VAN**: formula"
        if (line.startsWith('* **')) {
            if (!inList) {
                inList = true;
                htmlLines.push('<table style="table-layout: auto; width: 100%; border-collapse: collapse; margin-block: 15px; font-size: 11px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">');
                htmlLines.push('<thead><tr style="background-color: #f8fafc; border-bottom: 2px solid #cbd5e1;"><th style="padding: 10px 12px; text-align: left; width: 35%; color: #334155; font-weight: bold;">Concepto</th><th style="padding: 10px 12px; text-align: left; width: 65%; color: #334155; font-weight: bold;">Ecuación</th></tr></thead>');
                htmlLines.push('<tbody>');
            }

            // Parse: "* **Title**: rest" or "* **Title** rest"
            let match = line.match(/^\*\s*\*\*([^*]+)\*\*:?\s*(.*)$/);
            if (match) {
                let title = match[1].trim();
                let formula = match[2].trim();

                // Format formula backticks inside the cell
                formula = formula.replace(/`([^`]+)`/g, '<code style="word-break: break-word; white-space: normal; display: block; background:#f1f5f9;padding:6px 10px;border-radius:6px;color:#ec4899;font-family:monospace;border:1px solid #e2e8f0;font-weight:600;letter-spacing:0.5px;font-size:11.5px;">$1</code>');
                formula = formula.replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, '<em>$1</em>');

                htmlLines.push(`<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 12px; font-weight: 600; color: #0f172a; vertical-align: middle; word-wrap: break-word; overflow-wrap: break-word;">${title}</td><td style="padding: 12px; vertical-align: middle; word-wrap: break-word; overflow-wrap: break-word;">${formula}</td></tr>`);
            } else {
                line = line.replace(/^\*\s*/, '');
                line = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
                line = line.replace(/`([^`]+)`/g, '<code style="word-break: break-word; white-space: normal; display: inline-block; background:#f1f5f9;padding:2px 4px;border-radius:4px;color:#ec4899;font-weight:bold;">$1</code>');
                htmlLines.push(`<tr style="border-bottom: 1px solid #e2e8f0;"><td colspan="2" style="padding: 10px; word-wrap: break-word; overflow-wrap: break-word;">${line}</td></tr>`);
            }
        } else {
            if (inList) {
                inList = false;
                htmlLines.push('</tbody></table>');
            }

            if (line.startsWith('### ')) {
                htmlLines.push(`<h4 style="color: #475569; font-size: 14px; margin-top: 25px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">${line.replace('### ', '')}</h4>`);
            } else if (line.startsWith('> *(Hack')) {
                let match = line.match(/> \*(Hack[^:]*:)\*\s*(.*)/) || line.match(/> \*(Hack)\*\s*(.*)/);
                if (match) {
                    htmlLines.push(`<div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px 18px; margin: 20px 0; border-radius: 0 8px 8px 0;"><strong style="color: #d97706; display: block; margin-bottom: 4px; font-size:13px;">💡 ${match[1]}</strong><span style="color: #92400e; font-size:12px; line-height: 1.5;">${match[2]}</span></div>`);
                }
            } else if (line !== '') {
                line = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
                line = line.replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, '<em>$1</em>');
                line = line.replace(/`([^`]+)`/g, '<code style="word-break: break-word; white-space: normal; display: inline-block; background:#f1f5f9;padding:2px 4px;border-radius:4px;color:#ec4899;font-weight:bold;">$1</code>');
                htmlLines.push(`<p style="margin: 0 0 10px 0; line-height: 1.6; word-wrap: break-word; overflow-wrap: break-word; font-size: 12px;">${line}</p>`);
            }
        }
    }

    if (inList) {
        htmlLines.push('</tbody></table>');
    }

    return htmlLines.join('\n');
};

export const generateFormulasPDF = async (moduloId) => {
    try {
        if (!moduloId) {
            throw new Error("No hay módulo especificado para generar el PDF.");
        }

        // 1. Fetch the content for the module (the formulas/tips)
        const { data: formulas, error: fError } = await supabase
            .from('contenido_clase')
            .select('*')
            .eq('modulo_id', moduloId)
            .order('orden');

        if (fError) throw fError;

        // 2. Fetch the complex practical problems (examples)
        const { data: problems, error: pError } = await supabase
            .from('preguntas')
            .select('*')
            .eq('tipo', 'problema')
            .eq('nivel', 'avanzado');

        if (pError) throw pError;

        // 3. Build the off-screen DOM
        const container = document.createElement('div');
        container.style.padding = '40px';
        container.style.fontFamily = "'Inter', sans-serif";
        container.style.color = '#333';
        container.style.width = '780px'; // A4 Portrait + padding cushion
        container.style.maxWidth = '100%';
        container.style.boxSizing = 'border-box';
        container.style.overflowWrap = 'break-word';
        container.style.wordWrap = 'break-word';

        // HTML Template
        let htmlContent = `
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #ec4899; padding-bottom: 15px;">
                <h1 style="color: #ec4899; font-size: 28px; margin: 0;">Formulario y Tips EGEL</h1>
                <p style="color: #666; font-size: 14px; margin-top: 5px;">Guía rápida de fórmulas económicas, financieras y contables.</p>
            </div>
            
            <h2 style="color: #3b82f6; font-size: 20px; margin-bottom: 20px;">📘 SECCIÓN 1: FÓRMULAS VITALES</h2>
        `;

        // Render Formulas
        formulas.forEach((f, idx) => {
            // Strip out media JSON block
            const cleanText = f.contenido ? f.contenido.split('---MEDIA---')[0].trim() : '';
            htmlContent += `
                <div style="margin-bottom: 25px; page-break-inside: avoid;">
                    <h3 style="color: #1e293b; font-size: 16px; margin-bottom: 10px; border-left: 4px solid #3b82f6; padding-left: 8px;">
                        ${idx + 1}. ${f.titulo}
                    </h3>
                    <div style="font-size: 12px; line-height: 1.6; color: #475569; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">
                        ${processMarkdown(cleanText)}
                    </div>
                </div>
            `;
        });

        // Forced Page break for Examples
        htmlContent += `<div class="html2pdf__page-break"></div>`;

        htmlContent += `
            <h2 style="color: #f59e0b; font-size: 20px; margin-top: 20px; margin-bottom: 20px;">🧠 SECCIÓN 2: EJEMPLOS REPRESENTATIVOS (PASO A PASO)</h2>
        `;

        // Render Problems & Explanations
        problems.forEach((p, idx) => {
            htmlContent += `
                <div style="margin-bottom: 25px; page-break-inside: avoid; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; max-width: 100%;">
                    <div style="background: #fffbeb; padding: 12px 15px; border-bottom: 1px solid #fde68a;">
                        <strong style="color: #d97706; font-size: 14px;">Ejemplo ${idx + 1}: ${p.subtema} (${p.tema})</strong>
                    </div>
                    <div style="padding: 15px; font-size: 12px; line-height: 1.5; color: #334155; max-width: 100%; overflow: hidden;">
                        <p style="margin-top: 0; font-weight: 500; word-wrap: break-word; overflow-wrap: break-word; word-break: break-word; max-width: 100%;">Problema: ${p.pregunta}</p>
                        <div style="background: #f1f5f9; padding: 12px; border-radius: 6px; margin-top: 15px; border-left: 3px solid #10b981; overflow-wrap: break-word; word-wrap: break-word; word-break: break-all; max-width: 100%; overflow: hidden;">
                            <strong style="color: #059669; display: block; margin-bottom: 5px;">Resolución:</strong>
                            ${processMarkdown(p.explicacion)}
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = htmlContent;

        // Configuration for html2pdf
        const opt = {
            margin: 10,
            filename: 'Formulario_EGEL_Economia.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Fire the download
        await html2pdf().set(opt).from(container).save();
        return true;

    } catch (error) {
        console.error("Error generating PDF", error);
        throw error;
    }
};
