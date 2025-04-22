import fs from 'fs-extra';
import path from 'path';
import axios from 'axios';
import { loadConfig } from '../utils/configLoader';
import Configstore from 'configstore';

const config = new Configstore('gutensight-seo');

export async function analyzePage(pagePath: string) {
  try {
    const apiKey = config.get('apiKey');
    if (!apiKey) {
      throw new Error('❌ API key not found. Please login first.');
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
    const pageEntry = seoMap.find((entry: any) => entry.route === pagePath);

    if (!pageEntry) {
      throw new Error(`❌ No SEO data found for route: ${pagePath}`);
    }

    const pageData = {
      title: pageEntry.metadata.title || '',
      description: pageEntry.metadata.description || '',
      headers: pageEntry.metadata.headers || [],
      keywords: pageEntry.metadata.keywords || [],
      url: pagePath,
      content: pageEntry.metadata.body || '',
      mobile_friendly: true,
      structured_data: false,
      status_code: 200
    };

    const response = await axios.post(
      'https://gs-server-hzfd.onrender.com/api/v1/analyze/page',
      {
        apiKey,
        content: pageData
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const analyticsDir = path.resolve(process.cwd(), userConfig.analyticsDir);
    const outputPath = path.join(analyticsDir, 'page-analyses.json');
    
    await fs.ensureDir(analyticsDir);

    let existingData = [];
    if (fs.existsSync(outputPath)) {
      existingData = await fs.readJson(outputPath);
    }

    // Remove existing entry if present
    const filteredData = existingData.filter((item: any) => item.url !== pagePath);
    filteredData.push(response.data);
    
    await fs.writeJson(outputPath, filteredData, { spaces: 2 });

    console.log(`✅ Page analysis completed for ${pagePath}`);
    console.log(`📊 Results updated in: ${outputPath}`);

  } catch (error: any) {
    if (error.message == "Request failed with status code 400") console.error('❌ Error during login:', "API key is missing");
    else if (error.message == "Request failed with status code 404") console.error('❌ Error during login:', "Invalid API key");
    else if (error.message == "Request failed with status code 403") console.error('❌ Error during login:', "Quota Exceeded");
    else console.error('❌ Error analyzing page:', error.message);
    process.exit(1);
  }
}