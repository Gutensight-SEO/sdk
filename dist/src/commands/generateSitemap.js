"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSitemap = generateSitemap;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const configLoader_1 = require("../utils/configLoader");
const routerLoader_1 = require("../utils/routerLoader");
async function generateSitemap() {
    try {
        const config = await (0, configLoader_1.loadConfig)();
        const { customOptions: { sitemap: { hostname } }, outputDir } = config;
        // Get routes from the centralized utility
        const routes = await (0, routerLoader_1.getRoutesFromRouterFile)();
        // Filter out excluded routes
        const allowedRoutes = routes.filter(route => !route.seoExclude).map(route => route.path);
        const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allowedRoutes
            .map((route) => `
  <url>
    <loc>${hostname}${route}</loc>
  </url>`)
            .join('')}
</urlset>`;
        const outputPath = path_1.default.resolve(process.cwd(), outputDir, 'sitemap.xml');
        await fs_extra_1.default.writeFile(outputPath, sitemapContent.trim());
        console.log('sitemap.xml generated successfully.');
    }
    catch (error) {
        throw new Error(`❌ ${error.message ? error.message : error}`);
    }
}
//# sourceMappingURL=generateSitemap.js.map