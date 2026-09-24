import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';

const IMG_DIR = path.resolve('./assets/img');

const IMAGES = {
  'hero': 'https://images.unsplash.com/photo-1649083048337-4aeb6dda80bb?w=1800&q=80',
  'real-1': 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1800&q=80',
  'real-2': 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=1800&q=80',
  'real-3': 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=1800&q=80',
  'real-4': 'https://images.unsplash.com/photo-1649083048381-520a5b3d91ff?w=1800&q=80',
  'real-5': 'https://images.unsplash.com/photo-1501183638710-841dd1904471?w=1800&q=80',
  'real-6': 'https://images.unsplash.com/photo-1648475236583-2e25a6cbf3bd?w=1800&q=80',
  'avant': 'https://images.unsplash.com/photo-1736182615481-3795ea557614?w=1800&q=80',
  'apres': 'https://images.unsplash.com/photo-1649083048770-82e8ffd80431?w=1800&q=80',
  'diff-1': 'https://images.unsplash.com/photo-1618832515490-e181c4794a45?w=1800&q=80',
  'diff-2': 'https://images.unsplash.com/photo-1692890659047-079b769ee3e6?w=1800&q=80',
  'diff-3': 'https://images.unsplash.com/photo-1560185009-dddeb820c7b7?w=1800&q=80'
};

const SIZES = [480, 960, 1600];

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', (err) => { fs.unlink(dest, () => reject(err)); });
    }).on('error', reject);
  });
}

async function processImage(name, url) {
  const tempFile = path.join(IMG_DIR, `_tmp_${name}`);
  try {
    console.log(`Downloading ${name}...`);
    await downloadFile(url, tempFile);
    
    console.log(`Processing ${name} (WebP & JPG)...`);
    for (const size of SIZES) {
      const pipeline = sharp(tempFile).resize({ width: size, withoutEnlargement: true });
      await pipeline.clone().webp({ quality: 80 }).toFile(path.join(IMG_DIR, `${name}-${size}.webp`));
      if (size === 960) {
        await pipeline.clone().jpeg({ quality: 80 }).toFile(path.join(IMG_DIR, `${name}.jpg`));
      }
    }
    fs.unlinkSync(tempFile);
    console.log(`Done: ${name}`);
  } catch (err) {
    console.error(`Failed for ${name}: ${err.message}`);
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
  }
}

async function run() {
  if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });
  
  const tasks = [];
  for (const [name, url] of Object.entries(IMAGES)) {
    tasks.push(processImage(name, url));
  }
  
  await Promise.allSettled(tasks);
  console.log('All downloads/processing finished.');
}

run();
