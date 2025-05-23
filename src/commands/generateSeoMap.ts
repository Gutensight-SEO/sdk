import fs from 'fs-extra';
import path from 'path';
import { loadConfig } from '../utils/configLoader';
import { getRoutesFromRouterFile } from '../utils/routerLoader';

export async function generateSeoMap() {
  try {
    const config = await loadConfig();
    const { customOptions: { seoRules}, outputDir, seoMapFile, htmlEntryFile } = config;

    // Get routes from the centralized utility
    const routes = await getRoutesFromRouterFile();

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

    const seoMapPath = path.resolve(process.cwd(), outputDir, seoMapFile);
    await fs.writeJson(seoMapPath, seoMap, { spaces: 2 });
    console.log(`✅ ${seoMapFile} generated successfully.`);

    if (seoRules.injectSeoMap) {
      const indexPath = path.resolve(process.cwd(), htmlEntryFile);
      if (!fs.existsSync(indexPath)) {
        console.warn('❌ index html file not found. Skipping SEO injection.');
        return;
      }

      let indexContent = await fs.readFile(indexPath, 'utf-8');
      const seoScript = `<script id="seo-map" type="application/json">${JSON.stringify(seoMap)}</script>`;

      if (indexContent.includes('<script id="seo-map"')) {
        indexContent = indexContent.replace(/<script id="seo-map".*?<\/script>/s, seoScript);
      } else {
        indexContent = indexContent.replace('</head>', `${seoScript}</head>`);
      }

      await fs.writeFile(indexPath, indexContent);
      console.log('✅ SEO metadata injected into index.html.');
    }
  } catch (error: any) {
    throw new Error(`❌ ${error.message ? error.message : error}`);
  }
}
