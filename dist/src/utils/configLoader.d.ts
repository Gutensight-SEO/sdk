interface RouterConfig {
    path: string;
    routeProperties: {
        title: string;
        seoExclude: string;
        metadata: string;
    };
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
export declare function loadConfig(): Promise<SeoConfig>;
export {};
