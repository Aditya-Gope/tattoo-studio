const fs = require('fs');
const path = require('path');
const https = require('https');

const PUBLIC_DIR = path.join(__dirname, 'public', 'images');
const ARTIFACT_DIR = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\80adfab1-4619-4e78-aeb0-eba8b22bced0';

// The images we successfully generated
const generatedMap = [
  { src: 'hero_01_desktop_1789408665166.jpg', dest: 'hero/hero-01-desktop.webp' },
  { src: 'hero_01_mobile_1789408679224.jpg', dest: 'hero/hero-01-mobile.webp' },
  { src: 'hero_02_desktop_1789408692831.jpg', dest: 'hero/hero-02-desktop.webp' },
  { src: 'hero_02_mobile_1789408704743.jpg', dest: 'hero/hero-02-mobile.webp' },
  { src: 'hero_03_desktop_1789408717533.jpg', dest: 'hero/hero-03-desktop.webp' },
  { src: 'hero_03_mobile_1789408735361.jpg', dest: 'hero/hero-03-mobile.webp' },
  { src: 'tattoo_fineline_1789408759127.jpg', dest: 'portfolio/tattoo-01.webp' },
  { src: 'tattoo_blackwork_1789408770319.jpg', dest: 'portfolio/tattoo-02.webp' },
  { src: 'tattoo_realism_1789408781602.jpg', dest: 'portfolio/tattoo-03.webp' },
  { src: 'tattoo_minimal_1789408798278.jpg', dest: 'portfolio/tattoo-04.webp' }
];

// The missing ones to fetch from Unsplash
const fetchList = [
  // Portfolio 05-09
  { dest: 'portfolio/tattoo-05.webp', url: 'https://images.unsplash.com/photo-1611116637375-730628292837?q=80&w=1200' },
  { dest: 'portfolio/tattoo-06.webp', url: 'https://images.unsplash.com/photo-1621252179022-8170133c94d2?q=80&w=1200' },
  { dest: 'portfolio/tattoo-07.webp', url: 'https://images.unsplash.com/photo-1560060144-4b5c7f89d380?q=80&w=1200' },
  { dest: 'portfolio/tattoo-08.webp', url: 'https://images.unsplash.com/photo-1575855011749-f5a04bc680eb?q=80&w=1200' },
  { dest: 'portfolio/tattoo-09.webp', url: 'https://images.unsplash.com/photo-1603597025828-dd692e737c02?q=80&w=1200' },
  
  // Styles
  { dest: 'styles/fine-line.webp', url: 'https://images.unsplash.com/photo-1590217032223-1d908ff95e7c?q=80&w=800' },
  { dest: 'styles/blackwork.webp', url: 'https://images.unsplash.com/photo-1607513511210-9b59e44ffc2b?q=80&w=800' },
  { dest: 'styles/realism.webp', url: 'https://images.unsplash.com/photo-1550993510-7e1030e4efcc?q=80&w=800' },
  { dest: 'styles/minimal.webp', url: 'https://images.unsplash.com/photo-1611116637375-730628292837?q=80&w=800' },
  { dest: 'styles/geometric.webp', url: 'https://images.unsplash.com/photo-1621252179022-8170133c94d2?q=80&w=800' },
  { dest: 'styles/lettering.webp', url: 'https://images.unsplash.com/photo-1560060144-4b5c7f89d380?q=80&w=800' },
  { dest: 'styles/traditional.webp', url: 'https://images.unsplash.com/photo-1575855011749-f5a04bc680eb?q=80&w=800' },
  { dest: 'styles/custom-design.webp', url: 'https://images.unsplash.com/photo-1603597025828-dd692e737c02?q=80&w=800' },

  // Artists
  { dest: 'artists/demo-artist-portrait.webp', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200' },
  { dest: 'artists/demo-artist-working.webp', url: 'https://images.unsplash.com/photo-1580482597960-91af6d2d416b?q=80&w=1200' },

  // Hygiene
  { dest: 'hygiene/hygiene-01.webp', url: 'https://images.unsplash.com/photo-1566838328659-1e185e683315?q=80&w=1200' },
  { dest: 'hygiene/hygiene-02.webp', url: 'https://images.unsplash.com/photo-1595083161474-0f2cffc938b2?q=80&w=1200' },
  { dest: 'hygiene/hygiene-03.webp', url: 'https://images.unsplash.com/photo-1598331668826-20cebfc52f48?q=80&w=1200' },
  { dest: 'hygiene/hygiene-04.webp', url: 'https://images.unsplash.com/photo-1612458428131-41ef0db79fcc?q=80&w=1200' },
  { dest: 'hygiene/hygiene-05.webp', url: 'https://images.unsplash.com/photo-1579304193392-494bcf932785?q=80&w=1200' },

  // Reviews
  { dest: 'reviews/demo-review-01.webp', url: 'https://images.unsplash.com/photo-1550537687-c1d09ba8b981?q=80&w=800' },
  { dest: 'reviews/demo-review-02.webp', url: 'https://images.unsplash.com/photo-1585314028544-b0a5015b6823?q=80&w=800' },
  { dest: 'reviews/demo-review-03.webp', url: 'https://images.unsplash.com/photo-1575677943542-a1b41ba434be?q=80&w=800' },

  // Location
  { dest: 'location/location-exterior.webp', url: 'https://images.unsplash.com/photo-1556012692-a1f79a95ec6e?q=80&w=1200' },
  { dest: 'location/location-interior.webp', url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200' },
  { dest: 'location/location-map.webp', url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200' }
];

async function downloadFallback(url, dest) {
  // Using native fetch in Node 18+
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
    }
  });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
  console.log(`Downloaded ${dest}`);
}

async function run() {
  // Ensure directories exist
  ['hero', 'portfolio', 'styles', 'artists', 'hygiene', 'reviews', 'location'].forEach(d => {
    const dirPath = path.join(PUBLIC_DIR, d);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  });

  // Copy generated files
  for (const file of generatedMap) {
    const srcPath = path.join(ARTIFACT_DIR, file.src);
    const destPath = path.join(PUBLIC_DIR, file.dest);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${file.src} to ${file.dest}`);
    } else {
      console.log(`WARNING: Missing generated file ${srcPath}`);
    }
  }

  // Download missing
  for (const item of fetchList) {
    const destPath = path.join(PUBLIC_DIR, item.dest);
    if (!fs.existsSync(destPath)) {
      try {
        await downloadFallback(item.url, destPath);
      } catch (err) {
        console.error(`Error downloading ${item.dest}:`, err.message);
      }
    }
  }
}

run().catch(console.error);
