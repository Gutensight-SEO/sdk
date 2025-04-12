Let's implement Phase 2 with detailed code changes. We'll focus on the core SEO map generation and build process restructuring:

**1. Enhanced SEO Map Generation (generateSeoMap.ts)**
```typescript
import fs from 'fs-extra';
import path from 'path';
import { loadConfig } from '../utils/configLoader';
import { getRoutesFromRouterFile } from '../utils/routerLoader';

interface SeoMapEntry {
  url: string;
  seoExclude: boolean;
  title: string;
  body: string;
  description: string;
  headers: string[];
  keywords: string[];
  changefreq: string;
  priority: number;
}

export async function generateSeoMap(): Promise<void> {
  try {
    const config = await loadConfig();
    const routes = await getRoutesFromRouterFile();

    const seoMap: SeoMapEntry[] = routes.map(route => ({
      url: route.path,
      seoExclude: route.seoExclude,
      title: route.title || '',
      body: route.body || '',
      description: route.metadata?.description || '',
      headers: route.metadata?.headers || [],
      keywords: route.metadata?.keywords || [],
      changefreq: route.changefreq || config.sitemap.changefreq,
      priority: route.priority ?? config.sitemap.priority
    }));

    const outputPath = path.resolve(process.cwd(), config.outputDir, 'seo-map.json');
    await fs.writeJson(outputPath, seoMap, { spaces: 2 });
    console.log('SEO map generated successfully');
  } catch (error: any) {
    console.error('SEO map generation failed:', error.message);
    process.exit(1);
  }
}
```

**2. New Build Command (build.ts)**
```typescript
import { generateSitemap } from './generateSitemap';
import { generateRobots } from './generateRobots';
import { injectSeoMap } from './generateSeoMap';
import { loadConfig } from '../utils/configLoader';
import fs from 'fs-extra';
import path from 'path';

export async function build(): Promise<void> {
  try {
    const config = await loadConfig();
    const seoMapPath = path.resolve(process.cwd(), config.outputDir, 'seo-map.json');

    if (!fs.existsSync(seoMapPath)) {
      throw new Error('SEO map not found - run `seo compile` first');
    }

    console.log('Generating sitemap...');
    await generateSitemap();

    console.log('Generating robots.txt...');
    await generateRobots();

    if (config.injectSeo) {
      console.log('Injecting SEO metadata...');
      await injectSeoMap();
    }

    console.log('Build completed successfully');
  } catch (error: any) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}
```

**3. Updated Sitemap Generation (generateSitemap.ts)**
```typescript
import fs from 'fs-extra';
import path from 'path';
import { loadConfig } from '../utils/configLoader';

export async function generateSitemap(): Promise<void> {
  try {
    const config = await loadConfig();
    const seoMapPath = path.resolve(process.cwd(), config.outputDir, 'seo-map.json');
    const seoMap = await fs.readJson(seoMapPath);

    const allowedRoutes = seoMap.filter((entry: any) => !entry.seoExclude);
    
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allowedRoutes.map((route: any) => `
  <url>
    <loc>${config.sitemap.hostname}${route.url}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('')}
</urlset>`;

    const outputPath = path.resolve(process.cwd(), config.outputDir, 'sitemap.xml');
    await fs.writeFile(outputPath, sitemapContent.trim());
  } catch (error: any) {
    console.error('Sitemap generation failed:', error.message);
    throw error;
  }
}
```

**4. Updated Robots Generation (generateRobots.ts)**
```typescript
import fs from 'fs-extra';
import path from 'path';
import { loadConfig } from '../utils/configLoader';

export async function generateRobots(): Promise<void> {
  try {
    const config = await loadConfig();
    const seoMapPath = path.resolve(process.cwd(), config.outputDir, 'seo-map.json');
    const seoMap = await fs.readJson(seoMapPath);

    const disallowedPaths = seoMap
      .filter((entry: any) => entry.seoExclude)
      .map((entry: any) => `Disallow: ${entry.url}`);

    const robotsContent = `User-agent: *
Allow: /
${disallowedPaths.join('\n')}
Sitemap: ${config.sitemap.hostname}/sitemap.xml`;

    const outputPath = path.resolve(process.cwd(), config.outputDir, 'robots.txt');
    await fs.writeFile(outputPath, robotsContent);
  } catch (error: any) {
    console.error('Robots.txt generation failed:', error.message);
    throw error;
  }
}
```

**5. Updated CLI Commands (seo.ts)**
```typescript
// Add to existing imports
import { build } from '../src/commands/build';

// Update command definitions
program
  .command('compile')
  .description('Generate SEO map from router configuration')
  .action(compile);

program
  .command('build')
  .description('Generate final SEO files and inject metadata')
  .action(build);
```

**Key Improvements:**
1. Strict TypeScript interfaces for SEO data
2. Clear separation between compilation and build phases
3. File generation based on SEO map as single source of truth
4. Proper error handling and status reporting
5. Config-driven behavior for injection
6. SEO map validation before build steps

**Verification Steps:**
1. Run `seo init --ts` and verify config file structure
2. Execute `seo compile` and check seo-map.json contains routes
3. Run `seo build` and verify generated files
4. Check index.html injection when enabled
5. Test error cases (missing config/seo-map)

Things to do:
1. See sample test cases for these changes
2. Adjust any implementation details
3. Review the architectural diagram of the new flow