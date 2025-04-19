interface RouterConfig {
    path: string;
    type: string;
    routeProperties: {
        title: string;
        seoExclude: string;
        metadata: string;
    };
}
export interface SeoConfig {
    outputDir: string;
    apiKey: string;
    mlEndpoint: string;
    analyticsDir: string;
    language: string;
    seoMapFile: string;
    siteUrl: string;
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
export declare function loadConfig(): Promise<SeoConfig>;
export {};
