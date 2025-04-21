import 'dotenv/config';

const defaultConfig = {
  outputDir: './public',
  analyticsDir: './gutensight-analytics',
  language: 'ts',
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
} as const;

export default defaultConfig;