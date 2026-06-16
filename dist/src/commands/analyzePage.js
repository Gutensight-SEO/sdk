import fs from 'fs-extra';
import path from 'path';
import axios from 'axios';
import { loadConfig } from '../utils/configLoader';
import Configstore from 'configstore';
import { API_URL_PAGE } from '../constants';
const config = new Configstore('gutensight-seo');
export async function analyzePage(pagePath) {
    try {
        const apiKey = config.get('apiKey');
        if (!apiKey) {
            throw new Error('❌ API key not found. Please login first.');
        }
        const userConfig = await loadConfig();
        const seoMapPath = path.resolve(process.cwd(), userConfig.outputDir, userConfig.seoMapFile || 'seo-map.json');
        if (!fs.existsSync(seoMapPath)) {
            throw new Error('❌ SEO map file not found. Please run `seo compile` first.');
        }
        const seoMap = await fs.readJson(seoMapPath);
        const pageEntry = seoMap.find((entry) => entry.route === pagePath);
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
        const response = await axios.post(API_URL_PAGE, {
            apiKey,
            page: pageData
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const analyticsDir = path.resolve(process.cwd(), userConfig.analyticsDir);
        const outputPath = path.join(analyticsDir, `page-${pageData.title}.json`);
        await fs.ensureDir(analyticsDir);
        let existingData = [];
        if (fs.existsSync(outputPath)) {
            existingData = await fs.readJson(outputPath);
        }
        // Remove existing entry if present
        const filteredData = existingData.filter((item) => item.url !== pagePath);
        filteredData.push(response.data);
        await fs.writeJson(outputPath, filteredData, { spaces: 2 });
        console.log(`✅ Page analysis completed for ${pagePath}`);
        console.log(`📊 Results updated in: ${outputPath}`);
    }
    catch (error) {
        if (error.message == "Request failed with status code 400")
            console.error('❌ Invalid request body');
        else if (error.message == "Request failed with status code 401")
            console.error('❌ Error analyzing page:', "Invalid API key");
        else if (error.message == "Request failed with status code 402")
            console.error('❌ Error analyzing pages:', "Quota Exceeded");
        else
            console.error('❌ Analysis failed. Please try again');
        process.exit(1);
    }
}
//# sourceMappingURL=analyzePage.js.map