const fs = require('fs');
const path = require('path');
let sizeOf = require('image-size');
if (typeof sizeOf !== 'function') {
    if (sizeOf.default) sizeOf = sizeOf.default;
    else if (sizeOf.imageSize) sizeOf = sizeOf.imageSize;
}

const LIFE_JSON_PATH = path.join(__dirname, '../src/data/life.json');
const ASSETS_DIR = path.join(__dirname, '../src/assets/life');

const lifeData = JSON.parse(fs.readFileSync(LIFE_JSON_PATH, 'utf-8'));

console.log('Updating image dimensions in life.json...');

let updatedCount = 0;

lifeData.images = lifeData.images.map(item => {
    // Skip if already has dimensions (optional, but good for speed)
    // if (item.width && item.height) return item;

    const imagePath = path.join(ASSETS_DIR, item.file);

    if (fs.existsSync(imagePath)) {
        try {
            // Check if it's a video or image
            if (item.file.toLowerCase().endsWith('.mp4')) {
                // Videos are tricky without ffmpeg, but user only mentioned photos "popping".
                // We'll skip videos for now or set a default aspect ratio if requested.
                // Assuming 16:9 for now if undefined?
                // Actually, let's just log it.
                // console.log(`Skipping video: ${item.file}`);

                // Optional: If you want to force an aspect ratio for videos:
                if (!item.width) {
                    item.width = 1920;
                    item.height = 1080;
                }
            } else {
                // Pass buffer instead of path to avoid potential fs quirks
                const buffer = fs.readFileSync(imagePath);
                const dimensions = sizeOf(buffer);
                item.width = dimensions.width;
                item.height = dimensions.height;
                updatedCount++;
                // console.log(`Updated ${item.file}: ${dimensions.width}x${dimensions.height}`);
            }
        } catch (err) {
            console.error(`Error reading ${item.file}:`, err.message);
        }
    } else {
        console.warn(`File not found: ${item.file}`);
    }
    return item;
});

fs.writeFileSync(LIFE_JSON_PATH, JSON.stringify(lifeData, null, 4), 'utf-8');
console.log(`\nSuccess! Updated dimensions for ${updatedCount} images.`);
