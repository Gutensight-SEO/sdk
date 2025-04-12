"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const defaultConfig = {
    outputDir: './public',
    analyticsDir: './gutensight-analytics',
    language: 'ts',
    seoMapFile: 'seo-map.json',
    siteUrl: 'https://example.com/',
    htmlEntryFile: './index.html',
    router: {
        path: './src/navigation/Router/index.tsx',
        type: 'react-router'
    },
    injectSeoMap: false,
    customOptions: {
        seoRules: {
            minTitleLength: 10,
            maxTitleLength: 60,
            minDescriptionLength: 50,
            maxDescriptionLength: 160
        },
        sitemap: {
            exclude: [],
            changefreq: 'weekly',
            priority: 0.5
        },
        robots: {
            rules: ['User-agent: *', 'Allow: /'],
            sitemapPath: '/sitemap.xml'
        }
    },
    routes: [
        {
            path: '/',
            title: 'Home Page',
            description: 'Welcome to my website',
            keywords: ['home', 'welcome'],
            body: 'This is the home page of my website',
            changefreq: 'yearly',
            priority: 1.0
        }
    ]
};
exports.default = defaultConfig;
//# sourceMappingURL=seo.config.js.map