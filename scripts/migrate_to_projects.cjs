const fs = require('fs');
const path = require('path');

// Mappings for readable filenames as requested by the user
const ID_MAP = {
    "jeon2026enhancing": "MS_SeeGround.json",
    "jeonhyeonsig2025uniad": "MS_UniAD.json",
    "jeonhyeonsig2025viewformer": "MS_ViewFormer.json",
    "intl-car-competition": "Competition_Autonomous_Club.json",
    "ijaeug2023lidar": "BS_Lidar_Control.json",
    "ijaeug2023lidara": "BS_Lidar_LowSpec.json",
    "anseongju2022jeogeungjeog": "BS_Lane_Detection_Adaptive.json",
    "jeonhyeonsig2022caseon": "BS_Lane_Detection_Removal.json"
};

const OUTPUT_DIR = path.join(__dirname, '../src/data/projects');

// Source files
const PUBLICATIONS_PATH = path.join(__dirname, '../src/data/publications.json');
const ENGINEERING_PATH = path.join(__dirname, '../src/data/engineering_projects.json');

function migrate() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    let allItems = [];

    // Read Publications
    if (fs.existsSync(PUBLICATIONS_PATH)) {
        const pubs = JSON.parse(fs.readFileSync(PUBLICATIONS_PATH, 'utf-8'));
        console.log(`Loaded ${pubs.length} publications.`);
        allItems = allItems.concat(pubs);
    } else {
        console.warn(`Warning: ${PUBLICATIONS_PATH} not found.`);
    }

    // Read Engineering Projects
    if (fs.existsSync(ENGINEERING_PATH)) {
        const engs = JSON.parse(fs.readFileSync(ENGINEERING_PATH, 'utf-8'));
        console.log(`Loaded ${engs.length} engineering projects.`);
        allItems = allItems.concat(engs);
    } else {
        console.warn(`Warning: ${ENGINEERING_PATH} not found.`);
    }

    // Process and Write
    allItems.forEach(item => {
        let filename;
        if (ID_MAP[item.id]) {
            filename = ID_MAP[item.id];
        } else {
            // Default to ID, sanitize just in case
            const safeId = item.id.replace(/[^a-zA-Z0-9-_]/g, '_');
            filename = `${safeId}.json`;
        }

        const filePath = path.join(OUTPUT_DIR, filename);
        fs.writeFileSync(filePath, JSON.stringify(item, null, 4), 'utf-8');
        console.log(`Saved: ${filename}`);
    });

    console.log(`Migration complete. ${allItems.length} files created in ${OUTPUT_DIR}`);
}

migrate();
