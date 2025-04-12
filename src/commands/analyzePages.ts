import fs from 'fs-extra';
import path from 'path';
import { loadConfig } from '../utils/configLoader';

export async function analyzePages() {
  try {
    const config = await loadConfig();
    const seoMapPath = path.resolve(process.cwd(), config.outputDir, 'seo-map.json');

    if (!fs.existsSync(seoMapPath)) {
      throw new Error('seo-map.json not found. Please run `seo compile` first.');
    }

    const seoMap = await fs.readJson(seoMapPath);

    console.log('SEO Analysis for all pages:');
    seoMap.forEach((entry: any) => {
      console.log(`Route: ${entry.route}`);
      console.log(`  Title: ${entry.metadata.title || 'Not specified'}`);
      console.log(`  Description: ${entry.metadata.description || 'Not specified'}`);
      console.log(`  Keywords: ${entry.metadata.keywords.join(', ') || 'Not specified'}`);
    });
  } catch (error: any) {
    console.error('Error analyzing pages:', error.message);
  }
}
