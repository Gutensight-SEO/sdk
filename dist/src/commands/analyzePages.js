"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzePages = analyzePages;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const configLoader_1 = require("../utils/configLoader");
const configstore_1 = __importDefault(require("configstore"));
const config = new configstore_1.default('gutensight-seo');
async function analyzePages() {
    try {
        const apiKey = config.get('apiKey');
        if (!apiKey) {
            throw new Error('API key not found. Please login first.');
        }
        const userConfig = await (0, configLoader_1.loadConfig)();
        const seoMapPath = path_1.default.resolve(process.cwd(), userConfig.outputDir, userConfig.seoMapFile || 'seo-map.json');
        if (!fs_extra_1.default.existsSync(seoMapPath)) {
            throw new Error('SEO map file not found. Please run `seo compile` first.');
        }
        const seoMap = await fs_extra_1.default.readJson(seoMapPath);
        const pages = seoMap.map((entry) => ({
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
        const response = await axios_1.default.post('http://localhost:10000/api/v1/analyze/batch', 
        // 'https://gs-server-hzfd.onrender.com/api/v1/analyze/batch',
        {
            apiKey,
            pages
        }, {
            headers: {
                'Content-Type': 'application/json',
                // 'x-api-key': apiKey
            }
        });
        const analyticsDir = path_1.default.resolve(process.cwd(), userConfig.analyticsDir);
        const timestamp = Date.now();
        const outputPath = path_1.default.join(analyticsDir, `analysis-${timestamp}.json`);
        await fs_extra_1.default.ensureDir(analyticsDir);
        await fs_extra_1.default.writeJson(outputPath, response.data);
        console.log(`✅ Analysis completed successfully. Results saved to: ${outputPath}`);
    }
    catch (error) {
        console.error('❌ Error analyzing pages:', error.message);
        process.exit(1);
    }
}
//# sourceMappingURL=analyzePages.js.map