const fs = require('fs');
const PDFParser = require("pdf2json");
const path = require('path');

const pdfPath = path.join(__dirname, '..', 'personal_data_temp', '[컨설팅] 전현식 이력서.pdf');
const pdfParser = new PDFParser(this, 1); // 1 for text content

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    console.log("--- START PDF CONTENT ---");
    console.log(pdfParser.getRawTextContent());
    console.log("--- END PDF CONTENT ---");
});

pdfParser.loadPDF(pdfPath);
