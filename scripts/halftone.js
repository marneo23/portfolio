// Usage: node scripts/halftone.js input.jpg output.png [dotSize] [contrast]
// Example: node scripts/halftone.js hero.jpg hero-halftone.png 5 1.4
// Requires: npm install canvas

const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

const [, , inputPath, outputPath, dotSizeArg, contrastArg] = process.argv;
const DOT_SIZE = parseInt(dotSizeArg) || 5;
const CONTRAST = parseFloat(contrastArg) || 1.4;

if (!inputPath || !outputPath) {
  console.error("Usage: node halftone.js <input> <output> [dotSize] [contrast]");
  process.exit(1);
}

async function halftone() {
  const img = await loadImage(inputPath);
  const { width, height } = img;

  // Step 1: Draw source image, desaturate, boost contrast
  const srcCanvas = createCanvas(width, height);
  const srcCtx = srcCanvas.getContext("2d");
  srcCtx.filter = `grayscale(1) contrast(${CONTRAST})`;
  srcCtx.drawImage(img, 0, 0);
  const srcData = srcCtx.getImageData(0, 0, width, height);

  // Step 2: Draw halftone dots on black canvas
  const outCanvas = createCanvas(width, height);
  const outCtx = outCanvas.getContext("2d");
  outCtx.fillStyle = "#000000";
  outCtx.fillRect(0, 0, width, height);
  outCtx.fillStyle = "#FFFFFF";

  const cols = Math.ceil(width / DOT_SIZE);
  const rows = Math.ceil(height / DOT_SIZE);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = col * DOT_SIZE + DOT_SIZE / 2;
      const cy = row * DOT_SIZE + DOT_SIZE / 2;

      // Sample average brightness in this cell
      let total = 0;
      let count = 0;
      for (let dy = 0; dy < DOT_SIZE && row * DOT_SIZE + dy < height; dy++) {
        for (let dx = 0; dx < DOT_SIZE && col * DOT_SIZE + dx < width; dx++) {
          const px =
            ((row * DOT_SIZE + dy) * width + (col * DOT_SIZE + dx)) * 4;
          total += srcData.data[px]; // R channel (already grayscale)
          count++;
        }
      }

      const brightness = total / count / 255; // 0=black, 1=white
      const radius = ((1 - brightness) * DOT_SIZE) / 2; // darker = bigger dot

      if (radius > 0.3) {
        outCtx.beginPath();
        outCtx.arc(cx, cy, radius, 0, Math.PI * 2);
        outCtx.fill();
      }
    }
  }

  // Step 3: Write output
  const buffer = outCanvas.toBuffer("image/png");
  fs.writeFileSync(outputPath, buffer);
  console.log(
    `Halftoned: ${outputPath} (${cols}x${rows} dots, size ${DOT_SIZE}px)`
  );
}

halftone().catch(console.error);
