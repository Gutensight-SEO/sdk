import fs from 'fs-extra';
import path from 'path';
import { loadConfig } from '../utils/configLoader';
import { getRoutesFromRouterFile } from '../utils/routerLoader';


export async function generateRobots() {
  try {
    const config = await loadConfig();
    const { customOptions: {sitemap: {hostname}} } = config;
    const routes = await getRoutesFromRouterFile();

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

    const outputPath = path.resolve(process.cwd(), config.outputDir, 'robots.txt');
    await fs.writeFile(outputPath, robotsContent.trim());
    console.log('⚠️ You can customize the robots.txt file in the output directory.');
    console.log('✅ robots.txt generated successfully.');
  } catch (error: any) {
    throw new Error(`❌ ${error.message ? error.message : error}`);
  }
}