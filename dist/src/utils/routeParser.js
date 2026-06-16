import fs from 'fs-extra';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
/**
 * Parses the router file to extract route information.
 * @param entryFilePath Path to the router file.
 * @returns Array of normalized routes (path and seoExclude flag).
 */
export async function parseRoutes(entryFilePath) {
    const fileContent = await fs.readFile(entryFilePath, 'utf-8');
    const ast = parse(fileContent, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
    });
    const routeTree = [];
    const nodeMap = new WeakMap();
    const excludedNodes = new WeakSet();
    traverse(ast, {
        ObjectExpression(path) {
            const obj = path.node;
            // Check if any ancestor is excluded
            let currentPath = path;
            let hasExcludedParent = false;
            while (currentPath) {
                if (currentPath.isObjectExpression && currentPath.isObjectExpression() && excludedNodes.has(currentPath.node)) {
                    hasExcludedParent = true;
                    break;
                }
                currentPath = currentPath.parentPath;
            }
            if (hasExcludedParent)
                return;
            // Extract metadata
            const pathStr = extractStringProperty(obj, 'path')?.replace(/^\//, '') ?? '';
            const seoExclude = extractBooleanProperty(obj, 'seoExclude');
            // Skip excluded routes and mark for descendant exclusion
            if (seoExclude) {
                excludedNodes.add(obj);
                return;
            }
            // Initialize RouteNode
            const route = { path: pathStr, seoExclude, children: [] };
            nodeMap.set(obj, route);
            // Determine if this object is under a "children" array
            const parent = path.parentPath;
            if (parent?.isArrayExpression &&
                parent.isArrayExpression() &&
                parent.parentPath?.isObjectProperty &&
                parent.parentPath.isObjectProperty() &&
                t.isIdentifier(parent.parentPath.node.key, { name: 'children' })) {
                // Attach to parent RouteNode
                const grandParentObj = parent.parentPath.parentPath;
                if (grandParentObj?.isObjectExpression && grandParentObj.isObjectExpression()) {
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
    const buildPaths = (node, base = '') => {
        const fullPath = node.path ? `${base}/${node.path}`.replace(/\/\/+/g, '/').replace(/\/$/g, '') : base || '/';
        if (node.children.length === 0) {
            absoluteRoutes.push({ path: fullPath || '/', seoExclude: node.seoExclude });
        }
        node.children.forEach(child => buildPaths(child, fullPath));
    };
    routeTree.forEach(root => buildPaths(root));
    return absoluteRoutes;
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