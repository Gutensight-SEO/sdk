"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = compile;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const generateSeoMap_1 = require("./generateSeoMap");
const configLoader_1 = require("../utils/configLoader");
async function compile() {
    try {
        // Check if the configuration file exists
        const configPath = path_1.default.resolve(process.cwd(), 'seo.config.js');
        const tsConfigPath = path_1.default.resolve(process.cwd(), 'seo.config.ts');
        if (!fs_extra_1.default.existsSync(configPath) && !fs_extra_1.default.existsSync(tsConfigPath)) {
            console.error('Error: Configuration file not found. Please run `seo init` to initialize the project before running `seo compile`.');
            process.exit(1);
        }
        // Load the configuration
        const config = await (0, configLoader_1.loadConfig)();
        const outputDir = path_1.default.resolve(process.cwd(), config.outputDir);
        // Ensure output directory exists
        await fs_extra_1.default.ensureDir(outputDir);
        try {
            // console.log('Generating sitemap.xml...');
            // await generateSitemap();
            // console.log('Generating robots.txt...');
            // await generateRobots();
            console.log('Generating seo-map.json...');
            await (0, generateSeoMap_1.generateSeoMap)();
            // if (success){
            //   return 'Compilation completed successfully.'
            // }
            console.log('✅ Compilation completed successfully.');
        }
        catch (genError) {
            console.error(genError.message);
            process.exit(1);
        }
    }
    catch (error) {
        console.error('Error during compilation:', error.message);
        process.exit(1);
    }
}
//# sourceMappingURL=compile.js.map