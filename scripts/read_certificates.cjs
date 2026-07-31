const fs = require('fs');
const pdfLib = require('pdf-parse');
const path = require('path');

const pdfDir = path.join(__dirname, '..', 'PDF');
const files = [
    '수료-학-부스트코스_딥러닝_1단계_수료증_전현식.pdf',
    '수료-학-전기자동차_정비_플러스과정_수료증_전현식.pdf',
    '수료-학-전기차_고전압_안전교육_1단계_TUVSUD_수료증_전현식.pdf',
    '자격-학-자동차정비산업기사_자격증_전현식.pdf',
    '증빙-학-2023_대학생_창작_모빌리티_경진대회_참가확인서_신한대_SDS_전현식.pdf'
];

console.log('Type of pdfLib:', typeof pdfLib);

let parse = pdfLib;
if (typeof parse !== 'function' && parse.default) {
    parse = parse.default;
}

console.log('Selected parse function type:', typeof parse);

async function readPdfs() {
    for (const file of files) {
        const filePath = path.join(pdfDir, file);
        if (fs.existsSync(filePath)) {
            try {
                const dataBuffer = fs.readFileSync(filePath);
                try {
                    const data = await parse(dataBuffer);
                    console.log(`\n\n=== FILE: ${file} ===`);
                    console.log(data.text);
                    console.log('=================================');
                } catch (e) {
                    console.error(`Error parsing ${file}:`, e);
                }
            } catch (err) {
                console.error(`Error reading ${file}:`, err);
            }
        } else {
            console.error(`File not found: ${filePath}`);
        }
    }
}

readPdfs();
