"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzePage = analyzePage;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const configLoader_1 = require("../utils/configLoader");
const configstore_1 = __importDefault(require("configstore"));
const config = new configstore_1.default('gutensight-seo');
async function analyzePage(pagePath) {
    try {
        const apiKey = config.get('apiKey');
        if (!apiKey) {
            throw new Error('❌ API key not found. Please login first.');
        }
        const userConfig = await (0, configLoader_1.loadConfig)();
        const seoMapPath = path_1.default.resolve(process.cwd(), userConfig.outputDir, userConfig.seoMapFile || 'seo-map.json');
        if (!fs_extra_1.default.existsSync(seoMapPath)) {
            throw new Error('❌ SEO map file not found. Please run `seo compile` first.');
        }
        const seoMap = await fs_extra_1.default.readJson(seoMapPath);
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
        const response = await axios_1.default.post('http://localhost:10000/api/v1/analyze/page', 
        // 'https://gs-server-hzfd.onrender.com/api/v1/analyze/page',
        {
            apiKey,
            page: pageData
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const analyticsDir = path_1.default.resolve(process.cwd(), userConfig.analyticsDir);
        const outputPath = path_1.default.join(analyticsDir, `page-${pagePath}.json`);
        // const timestamp = Date.now();
        // const outputPath = path.join(analyticsDir, `page-${pagePath}-${timestamp}.json`);
        await fs_extra_1.default.ensureDir(analyticsDir);
        let existingData = [];
        if (fs_extra_1.default.existsSync(outputPath)) {
            existingData = await fs_extra_1.default.readJson(outputPath);
        }
        // Remove existing entry if present
        const filteredData = existingData.filter((item) => item.url !== pagePath);
        filteredData.push(response.data);
        await fs_extra_1.default.writeJson(outputPath, filteredData, { spaces: 2 });
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