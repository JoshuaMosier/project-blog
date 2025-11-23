import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, '../static/posts');

// Configuration
const MAX_WIDTH = 1920;
const QUALITY = 85;

async function optimizeImage(filePath) {
    try {
        // Read file into buffer first to avoid file locking issues on Windows
        const inputBuffer = fs.readFileSync(filePath);
        const image = sharp(inputBuffer);
        const metadata = await image.metadata();

        // Skip if already smaller than target width
        if (metadata.width <= MAX_WIDTH) {
            // We could still optimize quality, but let's check if it's worth re-encoding
            // For now, let's just resize/optimize everything to ensure consistency
        }

        const buffer = await image
            .rotate() // Auto-rotate based on EXIF data
            .resize(MAX_WIDTH, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .jpeg({
                quality: QUALITY,
                mozjpeg: true,
                progressive: true
            })
            .toBuffer();

        fs.writeFileSync(filePath, buffer);
        console.log(`Optimized: ${path.relative(POSTS_DIR, filePath)}`);
    } catch (error) {
        console.error(`Error optimizing ${filePath}:`, error);
    }
}

async function processDirectory(directory) {
    if (!fs.existsSync(directory)) {
        console.warn(`Directory not found: ${directory}`);
        return;
    }

    const entries = fs.readdirSync(directory, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            await processDirectory(fullPath);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (ext === '.jpg' || ext === '.jpeg') {
                await optimizeImage(fullPath);
            }
        }
    }
}

console.log(`Starting image optimization in ${POSTS_DIR}...`);
await processDirectory(POSTS_DIR);
console.log('Image optimization complete!');

