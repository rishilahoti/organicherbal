import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const watermark = async () => {
  const imagesDir = path.join(process.cwd(), 'public/images');
  const outputDir = path.join(process.cwd(), 'public/watermarked');
  
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  
  const files = fs.readdirSync(imagesDir);
  
  for (const file of files) {
    try {
      const imagePath = path.join(imagesDir, file);
      const image = sharp(imagePath);
      const metadata = await image.metadata();
      
      // Calculate watermark size based on image dimensions
      const fontSize = Math.round(Math.min(metadata.width, metadata.height) * 0.05);
      const text = 'organichherbal.in';
      
      // Create SVG watermark that matches image dimensions
      const svg = `
        <svg width="${metadata.width}" height="${metadata.height}">
          <text x="50%" y="50%" 
                font-family="Arial" 
                font-size="${fontSize}" 
                fill="rgba(255,255,255,0.5)"
                text-anchor="middle">
            ${text}
          </text>
        </svg>
      `;
      
      const svgBuffer = Buffer.from(svg);
      
      await image
        .composite([{
          input: svgBuffer,
          gravity: 'southeast',  // Position in southeast corner
          blend: 'over'
        }])
        .toFile(path.join(outputDir, file));
      
      console.log(`Watermarked ${file} successfully`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }
};

watermark();