"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRoutes = parseRoutes;
const fs_extra_1 = __importDefault(require("fs-extra"));
const parser_1 = require("@babel/parser");
const traverse_1 = __importDefault(require("@babel/traverse"));
async function parseRoutes(entryFilePath) {
    try {
        const fileContent = await fs_extra_1.default.readFile(entryFilePath, 'utf-8');
        const ast = (0, parser_1.parse)(fileContent, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript'],
        });
        const routes = [];
        (0, traverse_1.default)(ast, {
            ObjectExpression(path) {
                const routeNode = {
                    path: extractPropertyValue(path.node, 'path') || '',
                    seoExclude: extractPropertyValue(path.node, 'seoExclude') === 'true',
                    title: extractPropertyValue(path.node, 'title') || '',
                    metadata: {
                        body: extractPropertyValue(path.node, 'body') || '', description: extractPropertyValue(path.node, 'description') || '',
                        headers: extractArrayValue(path.node, 'headers') || [],
                        keywords: extractArrayValue(path.node, 'keywords') || [],
                        changefreq: extractPropertyValue(path.node, 'changefreq') || '',
                        priority: parseFloat(extractPropertyValue(path.node, 'priority') || '0') || undefined,
                    }
                };
                if (routeNode.path) {
                    routes.push(routeNode);
                }
            }
        });
        return flattenRoutes(routes);
    }
    catch (error) {
        throw new Error(error.message ? error.message : error);
    }
}
function extractArrayValue(node, propertyName) {
    const property = node.properties.find((p) => p.key.name === propertyName);
    return property?.value?.elements?.map((el) => el.value) || [];
}
function extractPropertyValue(node, propertyName) {
    let value = null;
    node.properties.forEach((property) => {
        if (property.key.name === propertyName && property.value) {
            value = property.value.value?.toString() || null;
        }
    });
    return value;
}
// function extractRouteFromNode(node: any): string | null {
//   let pathValue = null;
//   node.properties.forEach((property: any) => {
//     if (property.key.name === 'path') {
//       pathValue = property.value.value;
//     }
//   });
//   return pathValue;
// }
function flattenRoutes(routes) {
    const uniqueRoutes = new Map();
    routes.forEach(route => {
        if (route.path && !uniqueRoutes.has(route.path)) {
            uniqueRoutes.set(route.path, route.seoExclude);
        }
    });
    return Array.from(uniqueRoutes).map(([path, seoExclude]) => ({ path, seoExclude }));
}
//# sourceMappingURL=routeParser.js.map