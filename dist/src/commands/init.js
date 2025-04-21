"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
const TS_TEMPLATE = `import 'dotenv/config';

const defaultConfig = {
  outputDir: './public',
  analyticsDir: './gutensight-analytics',
  language: 'ts',
  seoMapFile: 'seo-map.json',
  htmlEntryFile: './public/index.html',
  router: {
    path: './src/router.ts', // Path to the router file
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
    path: './src/router.js', // Path to the router file
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
async function init(options) {
    try {
        const configContent = options.ts ? TS_TEMPLATE : JS_TEMPLATE;
        const configFileName = `seo.config.${options.ts ? 'ts' : 'js'}`;
        const configDestinationPath = path_1.default.resolve(process.cwd(), configFileName);
        if (fs_extra_1.default.existsSync(configDestinationPath)) {
            const { overwrite } = await inquirer_1.default.prompt([
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
        await fs_extra_1.default.writeFile(configDestinationPath, configContent);
        console.log(`✅ Configuration file has been created successfully.`);
        console.log(`
Successfully created ${configFileName}
Next steps:
1. Update router configuration in ${configFileName}
2. Run 'seo compile' to compile SEO routes and metadata into SEO map file`);
    }
    catch (error) {
        console.error(`❌ ${error.message ? error.message : error}`);
    }
}
//# sourceMappingURL=init.js.map