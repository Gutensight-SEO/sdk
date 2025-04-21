import fs from 'fs-extra';
import path from 'path';
import { parseRoutes } from './routeParser';
import { loadConfig } from './configLoader';

type RouteData = {
  path: string;
  seoExclude: boolean;
};

/**
 * Resolves and parses the router file specified in the configuration.
 * @returns {Promise<RouteData[]>} An array of routes with metadata parsed from the router file.
 * @throws {Error} If the router file is missing or invalid.
 */
export async function getRoutesFromRouterFile(): Promise<RouteData[]> {
  try {
    const config = await loadConfig();
    const { router } = config;

    if (!router || !router.path) {
      throw new Error('❌ Router file path is missing in the configuration.');
    }

    // Resolve the router file path relative to the working directory
    const routerPath = path.resolve(process.cwd(), router.path);
    if (!fs.existsSync(routerPath)) {
      throw new Error(`❌ Router file not found at: ${routerPath}. Please check your router path in seo.config`);
    }

    // Add basic route if no routes are found
    const routes = await parseRoutes(routerPath);
    if (!routes.length) {
      return [{ path: '/', seoExclude: false }];
    }

    return routes;
  } catch (error: any) {
    throw new Error(`❌ ${error.message}`);
  }
}