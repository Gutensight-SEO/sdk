import dotenv from 'dotenv';
import fs from 'fs-extra';
import path from 'path';


interface RouterConfig {
  path: string;
  routeProperties: {
    title: string;
    seoExclude: string;
    metadata: string;
  }
}

export interface SeoConfig {
  outputDir: string;
  analyticsDir: string;
  language: string;
  seoMapFile: string;
  htmlEntryFile: string;
  router: RouterConfig;
  customOptions: {
    seoRules: {
      injectSeoMap: boolean;      
    };
    sitemap: {
      hostname: string;
      exclude: string[];
      changefreq: string;
      priority: number;
    };
    robots: {
      rules: string[];
      sitemapPath: string;
    };
  };
}

export async function loadConfig(): Promise<SeoConfig> {
  // // Load environment variables from .env file
  dotenv.config();
  
  try {    
    const possiblePaths = [
      path.resolve(process.cwd(), 'seo.config.js'),
      path.resolve(process.cwd(), 'seo.config.ts'),
      path.resolve(process.cwd(), '..', 'seo.config.js'),
      path.resolve(process.cwd(), '..', 'seo.config.ts'),
    ];

    let configPath: string | undefined;
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        configPath = p;
        break;
      }
    }
    if (!configPath) {
      throw new Error(
        '❌ Configuration file not found. Please ensure `seo.config.js` or `seo.config.ts` exists in the project root or run `seo init` to create one.'
      );
    }

    let config;
    try {
      config = require(configPath);
      // handle ES module default export
      if (config.default) {
        config = config.default;
      }
    } catch (requireError: any) {
      throw new Error(`${requireError.message}`);
    }

    const mergedConfig: SeoConfig = {
      ...(config.default || config),
      sitemap: {
        ...(config.default || config).sitemap,
        hostname: (config.default || config).sitemap?.hostname
      }
    }

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
  } catch (error: any) {
    throw new Error(error.message ? error.message : error);
  }
}
