const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../src/assets/project');

async function processImages() {
    if (!fs.existsSync(ASSETS_DIR)) {
        console.error('Directory not found:', ASSETS_DIR);
        return;
    }

    const files = fs.readdirSync(ASSETS_DIR).filter(file => file.toLowerCase().endsWith('.png'));

    if (files.length === 0) {
        console.log('No PNG files found to convert.');
        return;
    }

    console.log(`Found ${files.length} PNG files. starting conversion...`);

    for (const file of files) {
        const pngPath = path.join(ASSETS_DIR, file);
        const webpPath = path.join(ASSETS_DIR, file.replace(/\.png$/i, '.webp'));

        try {
            await sharp(pngPath)
                .toFile(webpPath);
            console.log(`Converted: ${file} -> .webp`);

            // Delete original
            try {
                fs.unlinkSync(pngPath);
                console.log(`Deleted source: ${file}`);
            } catch (unlinkErr) {
                console.error(`Failed to delete ${file}:`, unlinkErr);
            }

        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    }
}

processImages();
