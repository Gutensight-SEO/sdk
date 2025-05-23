import 'dotenv/config';

const defaultConfig = {
  outputDir: './public',
  analyticsDir: './gutensight-analytics',
  language: 'ts',
  seoMapFile: 'seo-map.json',
  htmlEntryFile: './index.html',
  router: {
    path: './src/navigation/Router/index.ts', // Path to the router file
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
      hostname: 'https://gutensight-seo.netlify.app',
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

export default defaultConfig;