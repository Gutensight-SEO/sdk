import fs from 'fs-extra';
import { parse } from '@babel/parser';
import traverse, { NodePath } from '@babel/traverse';
import * as t from '@babel/types';

interface RouteNode {
  path: string;
  seoExclude: boolean;
  children: RouteNode[];
}

/**
 * Parses the router file to extract route information.
 * @param entryFilePath Path to the router file.
 * @returns Array of normalized routes (path and seoExclude flag).
 */
export async function parseRoutes(
  entryFilePath: string
): Promise<{ path: string; seoExclude: boolean }[]> {
  const fileContent = await fs.readFile(entryFilePath, 'utf-8');
  const ast = parse(fileContent, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  const routeTree: RouteNode[] = [];
  const nodeMap = new WeakMap<any, RouteNode>();
  const excludedNodes = new WeakSet<any>();

  traverse(ast as any, {
    ObjectExpression(path: any) {
      const obj = path.node;

      // Check if any ancestor is excluded
      let currentPath: any = path;
      let hasExcludedParent = false;
      while (currentPath) {
        if (currentPath.isObjectExpression && currentPath.isObjectExpression() && excludedNodes.has(currentPath.node)) {
          hasExcludedParent = true;
          break;
        }
        currentPath = currentPath.parentPath;
      }
      if (hasExcludedParent) return;

      // Extract metadata
      const pathStr = extractStringProperty(obj, 'path')?.replace(/^\//, '') ?? '';
      const seoExclude = extractBooleanProperty(obj, 'seoExclude');

      // Skip excluded routes and mark for descendant exclusion
      if (seoExclude) {
        excludedNodes.add(obj);
        return;
      }

      // Initialize RouteNode
      const route: RouteNode = { path: pathStr, seoExclude, children: [] };
      nodeMap.set(obj, route);

      // Determine if this object is under a "children" array
      const parent = path.parentPath;
      if (
        parent?.isArrayExpression &&
        parent.isArrayExpression() &&
        parent.parentPath?.isObjectProperty &&
        parent.parentPath.isObjectProperty() &&
        t.isIdentifier(parent.parentPath.node.key as any, { name: 'children' })
      ) {
        // Attach to parent RouteNode
        const grandParentObj = parent.parentPath.parentPath;
        if (grandParentObj?.isObjectExpression && grandParentObj.isObjectExpression()) {
          const parentRoute = nodeMap.get(grandParentObj.node);
          parentRoute?.children.push(route);
        }
      } else {
        // Top-level route
        routeTree.push(route);
      }
    },
  });

  // Flatten tree into absolute paths
  const absoluteRoutes: { path: string; seoExclude: boolean }[] = [];
  const buildPaths = (node: RouteNode, base = '') => {
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
function extractStringProperty(
  node: any,
  propertyName: string
): string | undefined {
  for (const prop of node.properties) {
    if (t.isObjectProperty(prop as any) && t.isIdentifier(prop.key as any, { name: propertyName }) && t.isStringLiteral(prop.value as any)) {
      return (prop.value as any).value.trim();
    }
  }
  return undefined;
}

/**
 * Safely extracts a boolean property from an ObjectExpression.
 */
function extractBooleanProperty(
  node: any,
  propertyName: string
): boolean {
  for (const prop of node.properties) {
    if (t.isObjectProperty(prop as any) && t.isIdentifier(prop.key as any, { name: propertyName }) && t.isBooleanLiteral(prop.value as any)) {
      return (prop.value as any).value;
    }
  }
  return false;
}