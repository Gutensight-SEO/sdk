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
async function generateRobots() {
    try {
        const config = await (0, configLoader_1.loadConfig)();
        const { customOptions: { sitemap: { hostname } } } = config;
        const routes = await (0, routerLoader_1.getRoutesFromRouterFile)();
        const paths = routes.map(route => route.path);
        let robotsContent = `User-agent: *`;
        // Add Allow for all paths
        paths.forEach(path => {
            robotsContent += `\nAllow: ${path}`;
        });
        // Add Disallow for all other routes
        robotsContent += `\n\nDisallow: *`;
        // Add Sitemap link
        robotsContent += `\n\nSitemap: ${hostname}/sitemap.xml`;
        const outputPath = path_1.default.resolve(process.cwd(), config.outputDir, 'robots.txt');
        await fs_extra_1.default.writeFile(outputPath, robotsContent.trim());
        console.log('⚠️ You can customize the robots.txt file in the output directory.');
        console.log('✅ robots.txt generated successfully.');
    }
    catch (error) {
        throw new Error(`❌ ${error.message ? error.message : error}`);
    }
}
//# sourceMappingURL=generateRobots.js.map