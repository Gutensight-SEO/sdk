import fs from 'fs-extra';
import path from 'path';
import { loadConfig } from '../utils/configLoader';
import { getRoutesFromRouterFile } from '../utils/routerLoader';

export async function generateSitemap() {
  try {
    const config = await loadConfig();
    const { customOptions: {sitemap: {hostname}}, outputDir } = config;

    // Get routes from the centralized utility
    const routes = await getRoutesFromRouterFile();

    // Filter out excluded routes
    const allowedRoutes = routes.filter(route => !route.seoExclude).map(route => route.path);

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allowedRoutes
    .map(
      (route: string) => `
  <url>
    <loc>${hostname}${route}</loc>
  </url>`
    )
    .join('')}
</urlset>`;

    const outputPath = path.resolve(process.cwd(), outputDir, 'sitemap.xml');
    await fs.writeFile(outputPath, sitemapContent.trim());
    console.log('sitemap.xml generated successfully.');
  } catch (error: any) {
    throw new Error(`❌ ${error.message ? error.message : error}`);
  }
}
