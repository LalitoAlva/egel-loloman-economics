const processMarkdown = (text) => {
    if (!text) return '';

    // Bypass markdown parser if the content is already HTML (from Quill Editor)
    const trimmed = text.trim();
    if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
        return `<div class="quill-content">${trimmed}</div>`;
    }

    let inList = false;
    let lines = text.split('\n');
    let htmlLines = [];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        // Match bullet points that start with a bold title like "* **VAN**: formula"
        if (line.startsWith('* **')) {
            if (!inList) {
                inList = true;
                htmlLines.push('<table style="table-layout: auto; width: 100%; border-collapse: collapse; margin-block: 15px; font-size: 13px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-radius: 8px; overflow: hidden;">');
                htmlLines.push('<thead><tr style="background-color: #f8fafc; border-bottom: 2px solid #cbd5e1;"><th style="padding: 12px 15px; text-align: left; width: 35%; color: #334155; font-weight: bold;">Concepto / Razón</th><th style="padding: 12px 15px; text-align: left; width: 65%; color: #334155; font-weight: bold;">Fórmula / Ecuación</th></tr></thead>');
                htmlLines.push('<tbody>');
            }

            // Parse: "* **Title**: rest" or "* **Title** rest"
            let match = line.match(/^\*\s*\*\*([^*]+)\*\*:?\s*(.*)$/);
            if (match) {
                let title = match[1].trim();
                let formula = match[2].trim();

                // Format formula backticks inside the cell
                formula = formula.replace(/`([^`]+)`/g, '<code style="word-break: break-word; white-space: pre-wrap; display: inline-block; max-width: 100%; background:#f1f5f9;padding:4px 8px;border-radius:6px;color:#ec4899;font-family:monospace;border:1px solid #e2e8f0;font-weight:bold;letter-spacing:1px;font-size:14px;">$1</code>');
                formula = formula.replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, '<em>$1</em>');

                htmlLines.push(`<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 14px 15px; font-weight: 600; color: #0f172a; vertical-align: middle; word-wrap: break-word; overflow-wrap: break-word;">${title}</td><td style="padding: 14px 15px; vertical-align: middle; word-wrap: break-word; overflow-wrap: break-word;">${formula}</td></tr>`);
            } else {
                line = line.replace(/^\*\s*/, '');
                line = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
                line = line.replace(/`([^`]+)`/g, '<code style="word-break: break-word; white-space: pre-wrap; display: inline-block; max-width: 100%; background:#f1f5f9;padding:2px 4px;border-radius:4px;color:#ec4899;font-weight:bold;">$1</code>');
                htmlLines.push(`<tr style="border-bottom: 1px solid #e2e8f0;"><td colspan="2" style="padding: 10px; word-wrap: break-word; overflow-wrap: break-word;">${line}</td></tr>`);
            }
        } else {
            if (inList) {
                inList = false;
                htmlLines.push('</tbody></table>');
            }

            if (line.startsWith('### ')) {
                htmlLines.push(`<h4 style="color: #475569; font-size: 15px; margin-top: 25px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">${line.replace('### ', '')}</h4>`);
            } else if (line.startsWith('> *(Hack')) {
                let match = line.match(/> \*(Hack[^:]*:)\*\s*(.*)/) || line.match(/> \*(Hack)\*\s*(.*)/);
                if (match) {
                    htmlLines.push(`<div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px 18px; margin: 20px 0; border-radius: 0 8px 8px 0;"><strong style="color: #d97706; display: block; margin-bottom: 4px; font-size:14px;">💡 ${match[1]}</strong><span style="color: #92400e; font-size:13px; line-height: 1.5;">${match[2]}</span></div>`);
                }
            } else if (line !== '') {
                line = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
                line = line.replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, '<em>$1</em>');
                line = line.replace(/`([^`]+)`/g, '<code style="word-break: break-word; white-space: pre-wrap; display: inline-block; max-width: 100%; background:#f1f5f9;padding:2px 4px;border-radius:4px;color:#ec4899;font-weight:bold;">$1</code>');
                htmlLines.push(`<p style="margin: 0 0 10px 0; line-height: 1.6; word-wrap: break-word; overflow-wrap: break-word;">${line}</p>`);
            }
        }
    }

    if (inList) {
        htmlLines.push('</tbody></table>');
    }

    return htmlLines.join('\n');
};

console.log("Ready to export");
