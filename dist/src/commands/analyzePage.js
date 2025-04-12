"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzePage = analyzePage;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const configLoader_1 = require("../utils/configLoader");
async function analyzePage(pagePath) {
    try {
        const config = await (0, configLoader_1.loadConfig)();
        const seoMapPath = path_1.default.resolve(process.cwd(), config.outputDir, 'seo-map.json');
        if (!fs_extra_1.default.existsSync(seoMapPath)) {
            throw new Error('seo-map.json not found. Please run `seo compile` first.');
        }
        const seoMap = await fs_extra_1.default.readJson(seoMapPath);
        const pageData = seoMap.find((entry) => entry.route === pagePath);
        if (!pageData) {
            console.log(`No SEO data found for the page: ${pagePath}`);
            return;
        }
        console.log(`SEO Analysis for ${pagePath}:`);
        console.log(`Title: ${pageData.metadata.title || 'Not specified'}`);
        console.log(`Description: ${pageData.metadata.description || 'Not specified'}`);
        console.log(`Keywords: ${pageData.metadata.keywords.join(', ') || 'Not specified'}`);
    }
    catch (error) {
        console.error('Error analyzing page:', error.message);
    }
}
//# sourceMappingURL=analyzePage.js.map