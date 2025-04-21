import fs from 'fs-extra';
import path from 'path';
import { loadConfig } from '../utils/configLoader';
import { getRoutesFromRouterFile } from '../utils/routerLoader';

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

export async function generateRobots() {
  try {
    const config = await loadConfig();
    const { customOptions: {sitemap: {hostname}} } = config;
    const routes = await getRoutesFromRouterFile();

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

    const outputPath = path.resolve(process.cwd(), config.outputDir, 'robots.txt');
    await fs.writeFile(outputPath, robotsContent.trim());
    console.log('robots.txt generated successfully.');
  } catch (error: any) {
    throw new Error(`❌ ${error.message ? error.message : error}`);
  }
}