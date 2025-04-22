import fs from 'fs-extra';
import path from 'path';
import axios from 'axios';
import { loadConfig } from '../utils/configLoader';
import Configstore from 'configstore';

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
      throw new Error('SEO map file not found. Please run `seo compile` first.');
    }

    const seoMap = await fs.readJson(seoMapPath);

    const pages = seoMap.map((entry: { metadata: { title: any; description: any; headers: any; keywords: any; body: any; }; route: any; }) => ({
      title: entry.metadata.title || 'Not specified',
      description: entry.metadata.description || 'Not specified',
      headers: entry.metadata.headers || [],
      keywords: entry.metadata.keywords || [],
      url: entry.route,
      content: entry.metadata.body || '',
      mobile_friendly: true, // Default assumption
      structured_data: false, // Default assumption
      status_code: 200 // Default assumption
    }));

    const response = await axios.post(
      'http://localhost:10000/api/v1/analyze/batch',
      // 'https://gs-server-hzfd.onrender.com/api/v1/analyze/batch',
      {
        apiKey,
        pages
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // 'x-api-key': apiKey
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
    if (error.message == "Request failed with status code 400") console.error('❌ Error during login:', "API key is missing");
    else if (error.message == "Request failed with status code 404") console.error('❌ Error during login:', "Invalid API key");
    else if (error.message == "Request failed with status code 403") console.error('❌ Error during login:', "Quota Exceeded");
    else console.error('❌ Error analyzing pages:', error.message);
    process.exit(1);
  }
}