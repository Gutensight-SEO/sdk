"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSeoMap = generateSeoMap;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const configLoader_1 = require("../utils/configLoader");
const routerLoader_1 = require("../utils/routerLoader");
async function generateSeoMap() {
    try {
        const config = await (0, configLoader_1.loadConfig)();
        const { customOptions: { seoRules }, outputDir } = config;
        // Get routes from the centralized utility
        const routes = await (0, routerLoader_1.getRoutesFromRouterFile)();
        // Filter out excluded routes
        const allowedRoutes = routes.filter(route => !route.seoExclude);
        const seoMap = allowedRoutes.map(route => ({
            route: route.path,
            metadata: {
                title: '',
                description: '',
                body: '',
                keywords: [],
                headers: [],
                changefreq: '',
                priority: 0
            },
        }));
        const seoMapPath = path_1.default.resolve(process.cwd(), outputDir, 'seo-map.json');
        await fs_extra_1.default.writeJson(seoMapPath, seoMap, { spaces: 2 });
        console.log('✅ seo-map.json generated successfully.');
        if (seoRules.injectSeoMap) {
            const indexPath = path_1.default.resolve(process.cwd(), outputDir, 'index.html');
            if (!fs_extra_1.default.existsSync(indexPath)) {
                console.warn('index.html not found. Skipping SEO injection.');
                return;
            }
            let indexContent = await fs_extra_1.default.readFile(indexPath, 'utf-8');
            const seoScript = `<script id="seo-map" type="application/json">${JSON.stringify(seoMap)}</script>`;
            if (indexContent.includes('<script id="seo-map"')) {
                indexContent = indexContent.replace(/<script id="seo-map".*?<\/script>/s, seoScript);
            }
            else {
                indexContent = indexContent.replace('</head>', `${seoScript}</head>`);
            }
            await fs_extra_1.default.writeFile(indexPath, indexContent);
            console.log('✅ SEO metadata injected into index.html.');
        }
    }
    catch (error) {
        throw new Error(`${error.message ? error.message : error}`);
    }
}
//# sourceMappingURL=generateSeoMap.js.map