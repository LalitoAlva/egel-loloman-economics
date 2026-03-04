const fs = require('fs');
const pdf = require('pdf-parse');
const dataBuffer = fs.readFileSync('/Users/loloman/Documents/Workspaces/Personal/egel-loloman-economics/docs/NuevaGuía/EGEL ECONOMIA.pdf');

console.log('Type of pdf:', typeof pdf);
if (typeof pdf === 'function') {
    pdf(dataBuffer).then(function (data) {
        console.log("Success! Characters:", data.text.length);
    }).catch(e => console.error("Error running pdf():", e));
} else {
    console.log("PDF keys:", Object.keys(pdf));
}
