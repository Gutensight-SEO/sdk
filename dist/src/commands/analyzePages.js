"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzePages = analyzePages;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const configLoader_1 = require("../utils/configLoader");
async function analyzePages() {
    try {
        const config = await (0, configLoader_1.loadConfig)();
        const seoMapPath = path_1.default.resolve(process.cwd(), config.outputDir, 'seo-map.json');
        if (!fs_extra_1.default.existsSync(seoMapPath)) {
            throw new Error('seo-map.json not found. Please run `seo compile` first.');
        }
        const seoMap = await fs_extra_1.default.readJson(seoMapPath);
        console.log('SEO Analysis for all pages:');
        seoMap.forEach((entry) => {
            console.log(`Route: ${entry.route}`);
            console.log(`  Title: ${entry.metadata.title || 'Not specified'}`);
            console.log(`  Description: ${entry.metadata.description || 'Not specified'}`);
            console.log(`  Keywords: ${entry.metadata.keywords.join(', ') || 'Not specified'}`);
        });
    }
    catch (error) {
        console.error('Error analyzing pages:', error.message);
    }
}
//# sourceMappingURL=analyzePages.js.map