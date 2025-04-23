import fs from 'fs-extra';
import path from 'path';
import axios from 'axios';
import { loadConfig } from '../utils/configLoader';
import Configstore from 'configstore';
import { API_URL_BATCH } from '../constants';

const config = new Configstore('gutensight-seo');

export async function analyzePages() {
  try {
    const apiKey = config.get('apiKey');
    if (!apiKey) {
      throw new Error('API key not found. Please login first.');
    }

    const userConfig = await loadConfig();
    const seoMapPath = path.resolve(
      process.cwd(), 
      userConfig.outputDir, 
      userConfig.seoMapFile || 'seo-map.json'
    );

    if (!fs.existsSync(seoMapPath)) {
      throw new Error('❌ SEO map file not found. Please run `seo compile` first.');
    }

    const seoMap = await fs.readJson(seoMapPath);

    const pages = seoMap.map((entry: { metadata: { title: any; description: any; headers: any; keywords: any; body: any; }; route: any; }) => ({
      title: entry.metadata.title || 'Not specified',
      description: entry.metadata.description || 'Not specified',
      headers: entry.metadata.headers || [],
      keywords: entry.metadata.keywords || [],
      url: entry.route,
      content: entry.metadata.body || '',
      mobile_friendly: true, // default assumption
      structured_data: false, // default assumption
      status_code: 200 // default assumption
    }));

    const response = await axios.post(
      API_URL_BATCH,
      {
        apiKey,
        pages
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const analyticsDir = path.resolve(process.cwd(), userConfig.analyticsDir);
    const timestamp = Date.now();
    const outputPath = path.join(analyticsDir, `analysis-${timestamp}.json`);
    
    await fs.ensureDir(analyticsDir);
    await fs.writeJson(outputPath, response.data);

    console.log(`✅ Analysis completed successfully. Results saved to: ${outputPath}`);

  } catch (error: any) {
    if (error.message == "Request failed with status code 400") console.error('❌ Invalid request body');
    else if (error.message == "Request failed with status code 401") console.error('❌ Error analyzing pages:', "Invalid API key");
    else if (error.message == "Request failed with status code 402") console.error('❌ Error analyzing pages:', "Quota Exceeded");
    else console.error('❌ Analysis failed. Please try again');
    process.exit(1);
  }
}