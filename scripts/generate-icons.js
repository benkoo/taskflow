import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputSvg = join(__dirname, '../public/icons/icon-192x192.svg');
const outputDir = join(__dirname, '../public/icons');

// Create output directory if it doesn't exist
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Generate PNG icons for each size
try {
  await Promise.all(
    sizes.map(size => {
      const outputFile = join(outputDir, `icon-${size}x${size}.png`);
      console.log(`Generating ${outputFile}...`);
      
      return sharp(inputSvg)
        .resize(size, size)
        .png()
        .toFile(outputFile)
        .catch(err => {
          console.error(`Error generating ${size}x${size} icon:`, err);
        });
    })
  );
  console.log('All icons generated successfully!');
} catch (err) {
  console.error('Error generating icons:', err);
  process.exit(1);
}
