const fs = require('fs');
const path = require('path');
const assert = require('assert');

const PROJECTS_DIR = path.join(__dirname, '../src/data/projects');
const PUBLICATIONS_PATH = path.join(__dirname, '../src/data/publications.json');
const ENGINEERING_PATH = path.join(__dirname, '../src/data/engineering_projects.json');

function deepEqual(a, b, pathContext = '') {
    if (a === b) return true;

    if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
        console.error(`Mismatch at ${pathContext}: ${a} !== ${b}`);
        return false;
    }

    const keysA = Object.keys(a).sort();
    const keysB = Object.keys(b).sort();

    if (keysA.length !== keysB.length) {
        console.error(`Key count mismatch at ${pathContext}: ${keysA} vs ${keysB}`);
        return false;
    }

    for (let i = 0; i < keysA.length; i++) {
        if (keysA[i] !== keysB[i]) {
            console.error(`Key mismatch at ${pathContext}: ${keysA[i]} !== ${keysB[i]}`);
            return false;
        }
        const key = keysA[i];
        if (!deepEqual(a[key], b[key], `${pathContext}.${key}`)) {
            return false;
        }
    }

    return true;
}

function verify() {
    console.log("Starting verification...");

    // 1. Load Source Data
    const sourceMap = new Map();

    if (fs.existsSync(PUBLICATIONS_PATH)) {
        const pubs = JSON.parse(fs.readFileSync(PUBLICATIONS_PATH, 'utf-8'));
        pubs.forEach(p => sourceMap.set(p.id, p));
    }

    if (fs.existsSync(ENGINEERING_PATH)) {
        const engs = JSON.parse(fs.readFileSync(ENGINEERING_PATH, 'utf-8'));
        engs.forEach(e => sourceMap.set(e.id, e));
    }

    console.log(`Source items: ${sourceMap.size}`);

    // 2. Load Migrated Data
    const files = fs.readdirSync(PROJECTS_DIR).filter(f => f.endsWith('.json'));
    const migratedMap = new Map();

    files.forEach(f => {
        const item = JSON.parse(fs.readFileSync(path.join(PROJECTS_DIR, f), 'utf-8'));
        if (migratedMap.has(item.id)) {
            console.error(`Duplicate ID found in migrated files: ${item.id}`);
        }
        migratedMap.set(item.id, item);
    });

    console.log(`Migrated items: ${migratedMap.size}`);

    // 3. Compare Size
    if (sourceMap.size !== migratedMap.size) {
        console.error("Size mismatch!");
        // Find missing IDs
        const sourceIds = Array.from(sourceMap.keys());
        const migratedIds = Array.from(migratedMap.keys());

        const missingInMigrated = sourceIds.filter(id => !migratedMap.has(id));
        const extraInMigrated = migratedIds.filter(id => !sourceMap.has(id));

        console.error("Missing in migrated:", missingInMigrated);
        console.error("Extra in migrated:", extraInMigrated);
        process.exit(1);
    }

    // 4. Deep Compare
    let errors = 0;
    sourceMap.forEach((sourceItem, id) => {
        const migratedItem = migratedMap.get(id);
        const isEqual = deepEqual(sourceItem, migratedItem, id);
        if (!isEqual) {
            console.error(`Content mismatch for ID: ${id}`);
            errors++;
        }
    });

    if (errors === 0) {
        console.log("SUCCESS: All items match strictly.");
    } else {
        console.error(`FAILURE: ${errors} items mismatched.`);
        process.exit(1);
    }
}

verify();
