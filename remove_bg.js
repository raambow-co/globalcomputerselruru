const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
const files = [
  'epson_printer.jpg',
  'pro_monitor.jpg',
  'mech_keyboard.jpg',
  'gpu_card.jpg',
  'motherboard.jpg',
  'ram_modules.jpg'
];

async function removeBackground(file) {
  const inputPath = path.join(assetsDir, file);
  const outputPath = path.join(assetsDir, file.replace('.jpg', '.png'));

  console.log(`Processing ${file}...`);
  const image = sharp(inputPath);
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4: R, G, B, A

  // Process raw pixel buffer to remove white background and defringe edges
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const minColor = Math.min(r, g, b);
    const maxColor = Math.max(r, g, b);
    const colorDiff = maxColor - minColor; // Color saturation

    // If pixel is near-white / studio background
    if (minColor > 220 && colorDiff < 20) {
      if (minColor >= 250) {
        // Pure background
        data[i + 3] = 0;
      } else {
        // Anti-aliased boundary / soft edge
        const factor = (250 - minColor) / 30; // 0 to 1
        const alpha = Math.floor(Math.pow(factor, 1.2) * 255);
        data[i + 3] = alpha;

        // Un-multiply white to remove white halo fringing
        if (alpha > 0) {
          const a = alpha / 255;
          data[i] = Math.max(0, Math.min(255, Math.floor((r - 255 * (1 - a)) / a)));
          data[i + 1] = Math.max(0, Math.min(255, Math.floor((g - 255 * (1 - a)) / a)));
          data[i + 2] = Math.max(0, Math.min(255, Math.floor((b - 255 * (1 - a)) / a)));
        }
      }
    } else if (minColor > 240) {
      const factor = (255 - minColor) / 15;
      data[i + 3] = Math.floor(Math.max(0, Math.min(255, factor * 255)));
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels
    }
  })
  .png({ quality: 100, compressionLevel: 8 })
  .toFile(outputPath);

  console.log(`Saved transparent PNG -> ${outputPath}`);
}

async function main() {
  for (const f of files) {
    await removeBackground(f);
  }
  console.log('All 3D assets processed with 100% transparent backgrounds!');
}

main().catch(err => console.error(err));
