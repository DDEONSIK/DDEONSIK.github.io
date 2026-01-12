import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfPath = path.join(__dirname, '..', 'personal_data_temp', '[컨설팅] 전현식 이력서.pdf');

if (!fs.existsSync(pdfPath)) {
    console.error('File not found:', pdfPath);
    process.exit(1);
}

const dataBuffer = fs.readFileSync(pdfPath);

try {
    const data = await pdf(dataBuffer);
    console.log("--- START PDF CONTENT ---");
    console.log(data.text);
    console.log("--- END PDF CONTENT ---");
} catch (error) {
    console.error('Error parsing PDF:', error);
}
