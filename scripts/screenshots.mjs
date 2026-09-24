import { chromium } from 'playwright';
import path from 'path';

const SIZES = [
  { width: 1440, height: 900, name: 'desktop' },
  { width: 1024, height: 768, name: 'tablet-landscape' },
  { width: 768, height: 1024, name: 'tablet-portrait' },
  { width: 375, height: 812, name: 'mobile' }
];

async function takeScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // File URL
  const fileUrl = `file://${path.resolve('./index.html')}`;
  console.log(`Navigating to ${fileUrl}`);
  
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Wait a bit for animations
  await page.waitForTimeout(2000);

  for (const size of SIZES) {
    console.log(`Taking screenshot for ${size.width}x${size.height} (${size.name})...`);
    await page.setViewportSize({ width: size.width, height: size.height });
    await page.waitForTimeout(500); // allow layout to settle
    
    // Make sure we take a full page screenshot
    await page.screenshot({ 
      path: `screenshots/${size.name}-${size.width}.png`, 
      fullPage: true 
    });
  }

  await browser.close();
  console.log('Screenshots done.');
}

takeScreenshots().catch(console.error);
