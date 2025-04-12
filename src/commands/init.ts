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
    path: './src/router.jsx', // Path to the router file
    type: 'react-router', // Type of router (e.g., react-router, vue-router, angular-router)
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
  language: 'ts',
  seoMapFile: 'seo-map.json',
  htmlEntryFile: './public/index.html',
  router: {
    path: './src/router.jsx', // Path to the router file
    type: 'react-router', // Type of router (e.g., react-router, vue-router, angular-router)
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
  },
};`;

export async function init(options: { ts: boolean }) {
  try {
    const configContent = options.ts ? TS_TEMPLATE : JS_TEMPLATE;
    const configFileName = `seo.config.${options.ts ? 'ts' : 'js'}`;
    // const configTemplatePath = path.resolve(__dirname, '../template', configFileName);
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

    // Copy the template configuration file
    // await fs.copy(configTemplatePath, configDestinationPath);
    // console.log(`${configFileName} has been created successfully.`);
    await fs.writeFile(configDestinationPath, configContent);
    console.log(`✅ Configuration file ${configFileName} has been created successfully.`);
    console.log(`
Successfully created ${configFileName}
Next steps:
1. Create .env file with:
    GUTENSEO_API_KEY=your_api_key
    SITE_URL=your_production_url
2. Update router configuration in ${configFileName}
3. Run 'seo compile' to generate initial SEO map`);
  } catch (error: any) {
    console.error(`❌ ${error.message ? error.message : error}`);
  }
}
