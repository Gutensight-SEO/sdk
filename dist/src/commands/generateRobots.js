"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRobots = generateRobots;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const configLoader_1 = require("../utils/configLoader");
const routerLoader_1 = require("../utils/routerLoader");
// export async function generateRobots() {
//   try {
//     const config = await loadConfig();
//     const { hostname } = config;
//     if (!hostname) {
//       throw new Error('hostname is missing in the configuration.');
//     }
//     const robotsContent = `User-agent: *
// Allow: /
// Sitemap: ${hostname}/sitemap.xml`;
//     const outputPath = path.resolve(process.cwd(), config.outputDir, 'robots.txt');
//     await fs.writeFile(outputPath, robotsContent.trim());
//     console.log('robots.txt generated successfully.');
//   } catch (error: any) {
//     console.error('Error generating robots.txt:', error.message);
//   }
// }
// generateRobots.ts
async function generateRobots() {
    try {
        const config = await (0, configLoader_1.loadConfig)();
        const { customOptions: { sitemap: { hostname } } } = config;
        const routes = await (0, routerLoader_1.getRoutesFromRouterFile)();
        // Get excluded routes
        const excludedRoutes = routes.filter(route => route.seoExclude).map(route => route.path);
        let robotsContent = `User-agent: *
Allow: /`;
        // Add Disallow for excluded routes
        if (excludedRoutes.length > 0) {
            robotsContent += `\n\n# Excluded Routes\n`;
            excludedRoutes.forEach(route => {
                robotsContent += `Disallow: ${route}\n`;
            });
        }
        robotsContent += `\nSitemap: ${hostname}/sitemap.xml`;
        const outputPath = path_1.default.resolve(process.cwd(), config.outputDir, 'robots.txt');
        await fs_extra_1.default.writeFile(outputPath, robotsContent.trim());
        console.log('robots.txt generated successfully.');
    }
    catch (error) {
        throw new Error(`❌ ${error.message ? error.message : error}`);
    }
}
//# sourceMappingURL=generateRobots.js.map