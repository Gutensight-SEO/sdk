"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = loadConfig;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
async function loadConfig() {
    // // Load environment variables from .env file
    dotenv_1.default.config();
    try {
        const possiblePaths = [
            path_1.default.resolve(process.cwd(), 'seo.config.js'),
            path_1.default.resolve(process.cwd(), 'seo.config.ts'),
            path_1.default.resolve(process.cwd(), '..', 'seo.config.js'),
            path_1.default.resolve(process.cwd(), '..', 'seo.config.ts'),
        ];
        let configPath;
        for (const p of possiblePaths) {
            if (fs_extra_1.default.existsSync(p)) {
                configPath = p;
                break;
            }
        }
        if (!configPath) {
            throw new Error('❌ Configuration file not found. Please ensure `seo.config.js` or `seo.config.ts` exists in the project root or run `seo init` to create one.');
        }
        let config;
        try {
            config = require(configPath);
            // Handle ES module default export
            if (config.default) {
                config = config.default;
            }
        }
        catch (requireError) {
            throw new Error(`${requireError.message}`);
        }
        const mergedConfig = {
            ...(config.default || config),
            sitemap: {
                ...(config.default || config).sitemap,
                hostname: (config.default || config).sitemap?.hostname
            }
        };
        if (!mergedConfig.router?.path || !mergedConfig.outputDir) {
            throw new Error('❌ Invalid configuration file. Ensure `router` and `outputDir` are defined.');
        }
        // Add .tsx, .ts, .jsx, .js extensions if not specified
        if (!path_1.default.extname(config.router.path)) {
            const extensions = ['.tsx', '.ts', '.jsx', '.js'];
            for (const ext of extensions) {
                const fullPath = path_1.default.resolve(process.cwd(), config.router.path + ext);
                if (fs_extra_1.default.existsSync(fullPath)) {
                    config.router.path += ext;
                    break;
                }
            }
        }
        return mergedConfig;
    }
    catch (error) {
        throw new Error(error.message ? error.message : error);
    }
}
//# sourceMappingURL=configLoader.js.map