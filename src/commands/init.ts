import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';

const TS_TEMPLATE = `import 'dotenv/config';

const defaultConfig = {
  outputDir: './public',
  analyticsDir: './gutensight-analytics',
  language: 'ts',
  seoMapFile: 'seo-map.json',
  htmlEntryFile: './public/index.html',
  router: {
    path: './src/router.tsx', // Path to the router file
    routeProperties: {
      title: 'title',
      seoExclude: 'seoExclude',
      metadata: 'metadata'
    }
  },
  customOptions: {
    seoRules: {
      injectSeoMap: false,      
    },
    sitemap: {
      hostname: process.env.SITE_URL || 'https://example.com',
      exclude: [],
      changefreq: 'weekly',
      priority: 0.5
    },
    robots: {
      rules: ['User-agent: *', 'Allow: /'],
      sitemapPath: '/sitemap.xml',
    },
  }
} as const;

export default defaultConfig;`;

const JS_TEMPLATE = `require('dotenv').config();

module.exports = {
  outputDir: './public',
  analyticsDir: './gutensight-analytics',
  language: 'js',
  seoMapFile: 'seo-map.json',
  htmlEntryFile: './public/index.html',
  router: {
    path: './src/router.jsx', // Path to the router file
    routeProperties: {
      title: 'title',
      seoExclude: 'seoExclude',
      metadata: 'metadata'
    }
  },
  customOptions: {
    seoRules: {
      injectSeoMap: false,      
    },
    sitemap: {
      hostname: process.env.SITE_URL || 'https://example.com',
      exclude: [],
      changefreq: 'weekly',
      priority: 0.5
    },
    robots: {
      rules: ['User-agent: *', 'Allow: /'],
      sitemapPath: '/sitemap.xml',
    },
  }
};`;

export async function init(options: { ts: boolean }) {
  try {
    const configContent = options.ts ? TS_TEMPLATE : JS_TEMPLATE;
    const configFileName = `seo.config.${options.ts ? 'ts' : 'js'}`;
    const configDestinationPath = path.resolve(process.cwd(), configFileName);

    if (fs.existsSync(configDestinationPath)) {
      const { overwrite } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: `${configFileName} already exists. Overwrite?`,
          default: false,
        },
      ]);

      if (!overwrite) {
        console.log('Initialization cancelled.');
        return;
      }
    }

    // Create the config file
    await fs.writeFile(configDestinationPath, configContent);
    console.log(`✅ Configuration file has been created successfully.`);
    console.log(`
Successfully created ${configFileName}
Next steps:
1. Update router configuration in ${configFileName}
2. Run 'seo compile' to compile SEO routes and metadata into SEO map file`);
  } catch (error: any) {
    console.error(`❌ ${error.message ? error.message : error}`);
  }
}
