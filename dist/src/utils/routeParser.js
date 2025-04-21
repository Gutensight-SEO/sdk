"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRoutes = parseRoutes;
const fs_extra_1 = __importDefault(require("fs-extra"));
const parser_1 = require("@babel/parser");
const traverse_1 = __importDefault(require("@babel/traverse"));
const t = __importStar(require("@babel/types"));
/**
 * Parses the router file to extract route information.
 * @param entryFilePath Path to the router file.
 * @returns Array of normalized routes (path and seoExclude flag).
 */
async function parseRoutes(entryFilePath) {
    const fileContent = await fs_extra_1.default.readFile(entryFilePath, 'utf-8');
    const ast = (0, parser_1.parse)(fileContent, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
    });
    const routeTree = [];
    const nodeMap = new WeakMap();
    (0, traverse_1.default)(ast, {
        ObjectExpression(path) {
            const obj = path.node;
            // Extract metadata
            const pathStr = extractStringProperty(obj, 'path')?.replace(/^\//, '') ?? '';
            const seoExclude = extractBooleanProperty(obj, 'seoExclude');
            // Initialize RouteNode
            const route = { path: pathStr, seoExclude, children: [] };
            nodeMap.set(obj, route);
            // Determine if this object is under a "children" array
            const parent = path.parentPath;
            if (parent?.isArrayExpression() &&
                parent.parentPath?.isObjectProperty() &&
                t.isIdentifier(parent.parentPath.node.key, { name: 'children' })) {
                // We are inside a children array; attach to parent RouteNode
                const grandParentObj = parent.parentPath.parentPath;
                if (grandParentObj?.isObjectExpression()) {
                    const parentRoute = nodeMap.get(grandParentObj.node);
                    parentRoute?.children.push(route);
                }
            }
            else {
                // Top-level route
                routeTree.push(route);
            }
        },
    });
    // Flatten tree into absolute paths
    const absoluteRoutes = [];
    // Inside parseRoutes function
    const buildPaths = (node, base = '', isParentExcluded = false) => {
        const isExcluded = node.seoExclude || isParentExcluded; // Combine current node's exclusion with ancestors'
        const fullPath = node.path
            ? `${base}/${node.path}`.replace(/\/\/+/g, '/').replace(/\/$/, '')
            : base || '/';
        if (!isExcluded) {
            if (node.children.length === 0) {
                absoluteRoutes.push({ path: fullPath, seoExclude: isExcluded });
            }
            else {
                // Add parent route if not excluded (even with children)
                absoluteRoutes.push({ path: fullPath, seoExclude: isExcluded });
            }
        }
        // Pass current exclusion status to children
        node.children.forEach(child => buildPaths(child, fullPath, isExcluded));
    };
    routeTree.forEach(root => buildPaths(root));
    // Return only SEO-included routes
    return absoluteRoutes.filter(r => !r.seoExclude);
}
/**
 * Safely extracts a string property from an ObjectExpression.
 */
function extractStringProperty(node, propertyName) {
    for (const prop of node.properties) {
        if (t.isObjectProperty(prop) && t.isIdentifier(prop.key, { name: propertyName }) && t.isStringLiteral(prop.value)) {
            return prop.value.value.trim();
        }
    }
    return undefined;
}
/**
 * Safely extracts a boolean property from an ObjectExpression.
 */
function extractBooleanProperty(node, propertyName) {
    for (const prop of node.properties) {
        if (t.isObjectProperty(prop) && t.isIdentifier(prop.key, { name: propertyName }) && t.isBooleanLiteral(prop.value)) {
            return prop.value.value;
        }
    }
    return false;
}
//# sourceMappingURL=routeParser.js.map