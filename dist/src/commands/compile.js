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
        // Load the configuration
        const config = await (0, configLoader_1.loadConfig)();
        const { language } = config;
        let configPath;
        // Check if the configuration file exists
        if (language === 'ts') {
            configPath = path_1.default.resolve(process.cwd(), 'seo.config.ts');
        }
        else {
            configPath = path_1.default.resolve(process.cwd(), 'seo.config.js');
        }
        if (!fs_extra_1.default.existsSync(configPath)) {
            console.error('Error: ❌ Configuration file not found. Please run `seo init` to initialize the project before running `seo compile`.');
            process.exit(1);
        }
        // const configPath = path.resolve(process.cwd(), 'seo.config.js');
        // const tsConfigPath = path.resolve(process.cwd(), 'seo.config.ts');
        // if (!fs.existsSync(configPath) && !fs.existsSync(tsConfigPath)) {
        //   console.error(
        //     'Error: ❌ Configuration file not found. Please run `seo init` to initialize the project before running `seo compile`.'
        //   );
        //   process.exit(1);
        // }
        const outputDir = path_1.default.resolve(process.cwd(), config.outputDir);
        // Ensure output directory exists
        await fs_extra_1.default.ensureDir(outputDir);
        try {
            // console.log(`Generating SEO map file...`);
            await (0, generateSeoMap_1.generateSeoMap)();
            console.log("Update routes and metadata in the SEO map file!");
        }
        catch (genError) {
            console.error(genError.message);
            process.exit(1);
        }
    }
    catch (error) {
        console.error(`❌ ${error.message ? error.message : error}`);
        process.exit(1);
    }
}
//# sourceMappingURL=compile.js.map