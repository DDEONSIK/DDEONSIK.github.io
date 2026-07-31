const fs = require('fs');
const pdfLib = require('pdf-parse');
const path = require('path');

const pdfPath = path.join(__dirname, '..', 'personal_data_temp', '[컨설팅] 전현식 이력서.pdf');

if (!fs.existsSync(pdfPath)) {
    console.error('File not found:', pdfPath);
    process.exit(1);
}

const dataBuffer = fs.readFileSync(pdfPath);

// Handle potential ESM/CommonJS interop issues
let parse = pdfLib;
if (typeof parse !== 'function' && parse.default) {
    parse = parse.default;
}

if (typeof parse === 'function') {
    parse(dataBuffer).then(function (data) {
        console.log("--- START PDF CONTENT ---");
        console.log(data.text);
        console.log("--- END PDF CONTENT ---");
    }).catch(function (error) {
        console.error('Error parsing PDF:', error);
    });
} else {
    console.error('pdf-parse library did not export a function. Exported:', pdfLib);
}
