"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = build;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const generateSitemap_1 = require("./generateSitemap");
const generateRobots_1 = require("./generateRobots");
const configLoader_1 = require("../utils/configLoader");
async function build() {
    try {
        // Check if the configuration file exists
        const configPath = path_1.default.resolve(process.cwd(), 'seo.config.js');
        const tsConfigPath = path_1.default.resolve(process.cwd(), 'seo.config.ts');
        if (!fs_extra_1.default.existsSync(configPath) && !fs_extra_1.default.existsSync(tsConfigPath)) {
            console.error('Error: ❌ SEO file not found. Please run `seo compile` to compile seo routes and metadat of the project before building the seo required files with `seo build`.');
            process.exit(1);
        }
        // Load the configuration
        const config = await (0, configLoader_1.loadConfig)();
        const outputDir = path_1.default.resolve(process.cwd(), config.outputDir);
        // Ensure output directory exists
        await fs_extra_1.default.ensureDir(outputDir);
        try {
            console.log('Generating sitemap.xml...');
            await (0, generateSitemap_1.generateSitemap)();
            console.log('Generating robots.txt...');
            await (0, generateRobots_1.generateRobots)();
            // if (success){
            //   return 'SEO files generated successfully.'
            // }
            console.log('✅ SEO files generated successfully.');
        }
        catch (genError) {
            console.error(`❌ ${genError.message}`);
            process.exit(1);
        }
    }
    catch (error) {
        console.error(`❌ ${error.message ? error.message : error}`);
        process.exit(1);
    }
}
//# sourceMappingURL=build.js.map