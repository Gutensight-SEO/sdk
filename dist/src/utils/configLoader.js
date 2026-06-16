import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';
export async function loadConfig() {
    // // Load environment variables from .env file
    dotenv.config();
    try {
        const possiblePaths = [
            path.resolve(process.cwd(), 'seo.config.js'),
            path.resolve(process.cwd(), 'seo.config.ts'),
            path.resolve(process.cwd(), '..', 'seo.config.js'),
            path.resolve(process.cwd(), '..', 'seo.config.ts'),
        ];
        let configPath;
        for (const p of possiblePaths) {
            if (fs.existsSync(p)) {
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
            // handle ES module default export
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
        if (!path.extname(config.router.path)) {
            const extensions = ['.tsx', '.ts', '.jsx', '.js'];
            for (const ext of extensions) {
                const fullPath = path.resolve(process.cwd(), config.router.path + ext);
                if (fs.existsSync(fullPath)) {
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