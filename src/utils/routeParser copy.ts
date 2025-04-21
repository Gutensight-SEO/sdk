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
  const nodeMap = new WeakMap<t.ObjectExpression, RouteNode>();

  traverse(ast, {
    ObjectExpression(path: NodePath<t.ObjectExpression>) {
      const obj = path.node;

      // Extract metadata
      const pathStr = extractStringProperty(obj, 'path')?.replace(/^\//, '') ?? '';
      const seoExclude = extractBooleanProperty(obj, 'seoExclude');

      // Initialize RouteNode
      const route: RouteNode = { path: pathStr, seoExclude, children: [] };
      nodeMap.set(obj, route);

      // Determine if this object is under a "children" array
      const parent = path.parentPath;
      if (
        parent?.isArrayExpression() &&
        parent.parentPath?.isObjectProperty() &&
        t.isIdentifier(parent.parentPath.node.key, { name: 'children' })
      ) {
        // We are inside a children array; attach to parent RouteNode
        const grandParentObj = parent.parentPath.parentPath;
        if (grandParentObj?.isObjectExpression()) {
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
    const fullPath = node.path ? `${base}/${node.path}`.replace(/\/\/+/, '/').replace(/\/$/, '') : base || '/';
    if (node.children.length === 0) {
      absoluteRoutes.push({ path: fullPath || '/', seoExclude: node.seoExclude });
    }
    node.children.forEach(child => buildPaths(child, fullPath));
  };

  routeTree.forEach(root => buildPaths(root));

  // Return only SEO-included routes
  return absoluteRoutes.filter(r => !r.seoExclude);
}

/**
 * Safely extracts a string property from an ObjectExpression.
 */
function extractStringProperty(
  node: t.ObjectExpression,
  propertyName: string
): string | undefined {
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
function extractBooleanProperty(
  node: t.ObjectExpression,
  propertyName: string
): boolean {
  for (const prop of node.properties) {
    if (t.isObjectProperty(prop) && t.isIdentifier(prop.key, { name: propertyName }) && t.isBooleanLiteral(prop.value)) {
      return prop.value.value;
    }
  }
  return false;
}
