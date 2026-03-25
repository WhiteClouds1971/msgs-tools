import sharp from 'sharp';
import fs from 'fs';

export default function imageOrientationPlugin() {
  return {
    name: 'image-orientation-plugin',
    apply: 'build',
    async generateBundle(options, bundle) {
      for (const fileName of Object.keys(bundle)) {
        if (fileName.match(/\.(jpg|jpeg)$/i)) {
          const asset = bundle[fileName];
          if (asset.type === 'asset' && asset.source) {
            try {
              const buffer = Buffer.isBuffer(asset.source)
                ? asset.source
                : Buffer.from(asset.source);

              const image = sharp(buffer);
              const metadata = await image.metadata();

              if (metadata.orientation && metadata.orientation !== 1) {
                console.log(
                  `  \x1b[36m[vite-plugin-image-orientation]\x1b[0m - Correcting orientation for ${fileName} (orientation: ${metadata.orientation})`
                );

                const rotatedBuffer = await sharp(buffer)
                  .rotate()
                  .toBuffer();

                asset.source = rotatedBuffer;
              }
            } catch (error) {
              console.error(`Error processing image ${fileName}:`, error);
            }
          }
        }
      }
    },
  };
}
