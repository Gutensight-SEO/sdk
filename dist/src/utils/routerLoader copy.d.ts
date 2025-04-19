type RouteData = {
    path: string;
    seoExclude: boolean;
};
/**
 * Resolves and parses the router file specified in the configuration.
 * @returns {Promise<RouteData[]>} An array of routes with metadata parsed from the router file.
 * @throws {Error} If the router file is missing or invalid.
 */
export declare function getRoutesFromRouterFile(): Promise<RouteData[]>;
export {};
