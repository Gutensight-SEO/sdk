/**
 * Parses the router file to extract route information.
 * @param entryFilePath Path to the router file.
 * @returns Array of normalized routes (path and seoExclude flag).
 */
export declare function parseRoutes(entryFilePath: string): Promise<{
    path: string;
    seoExclude: boolean;
}[]>;
