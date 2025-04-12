import fs from 'fs-extra';
import path from 'path';
import { loadConfig } from '../utils/configLoader';

export async function analyzePage(pagePath: string) {
  try {
    const config = await loadConfig();
    const seoMapPath = path.resolve(process.cwd(), config.outputDir, 'seo-map.json');

    if (!fs.existsSync(seoMapPath)) {
      throw new Error('seo-map.json not found. Please run `seo compile` first.');
    }

    const seoMap = await fs.readJson(seoMapPath);
    const pageData = seoMap.find((entry: any) => entry.route === pagePath);

    if (!pageData) {
      console.log(`No SEO data found for the page: ${pagePath}`);
      return;
    }

    console.log(`SEO Analysis for ${pagePath}:`);
    console.log(`Title: ${pageData.metadata.title || 'Not specified'}`);
    console.log(`Description: ${pageData.metadata.description || 'Not specified'}`);
    console.log(`Keywords: ${pageData.metadata.keywords.join(', ') || 'Not specified'}`);
  } catch (error: any) {
    console.error('Error analyzing page:', error.message);
  }
}
