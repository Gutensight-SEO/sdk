"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoutesFromRouterFile = getRoutesFromRouterFile;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const routeParser_1 = require("./routeParser");
const configLoader_1 = require("./configLoader");
/**
 * Resolves and parses the router file specified in the configuration.
 * @returns {Promise<RouteData[]>} An array of routes with metadata parsed from the router file.
 * @throws {Error} If the router file is missing or invalid.
 */
async function getRoutesFromRouterFile() {
    try {
        const config = await (0, configLoader_1.loadConfig)();
        const { router } = config;
        if (!router || !router.path) {
            throw new Error('❌ Router file path is missing in the configuration.');
        }
        // Resolve the router file path relative to the working directory
        const routerPath = path_1.default.resolve(process.cwd(), router.path);
        if (!fs_extra_1.default.existsSync(routerPath)) {
            throw new Error(`❌ Router file not found at: ${routerPath}. Please check your router path in seo.config`);
        }
        // Add basic route if no routes are found
        const routes = await (0, routeParser_1.parseRoutes)(routerPath);
        if (!routes.length) {
            return [{ path: '/', seoExclude: false }];
        }
        return routes;
    }
    catch (error) {
        throw new Error(`❌ ${error.message}`);
    }
}
//# sourceMappingURL=routerLoader.js.map