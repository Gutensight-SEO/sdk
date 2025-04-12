import fs from 'fs-extra';
import path from 'path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';


interface RouteNode {
  path: string;
  seoExclude: boolean;
  title: string;
  metadata: {
    body?: string;
    description?: string;
    headers?: string[];
    keywords?: string[];
    changefreq?: string;
    priority?: number;
  }
}

export async function parseRoutes(entryFilePath: string): Promise<{ path: string; seoExclude: boolean }[]> {
  try {
    const fileContent = await fs.readFile(entryFilePath, 'utf-8');
    const ast = parse(fileContent, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });

    const routes: Array<{ path: string; seoExclude: boolean }> = [];

    traverse(ast, {
      ObjectExpression(path) {
        const routeNode: RouteNode = {
          path: extractPropertyValue(path.node, 'path') || '',
          seoExclude: extractPropertyValue(path.node, 'seoExclude') === 'true',
          title: extractPropertyValue(path.node, 'title') || '',
          metadata: {
            body: extractPropertyValue(path.node, 'body') || '',            description: extractPropertyValue(path.node, 'description') || '',
            headers: extractArrayValue(path.node, 'headers') || [],
            keywords: extractArrayValue(path.node, 'keywords') || [],
            changefreq: extractPropertyValue(path.node, 'changefreq') || '',
            priority: parseFloat(extractPropertyValue(path.node, 'priority') || '0') || undefined,          }
        };
        
        if (routeNode.path) {
          routes.push(routeNode);
        }
      }
    });

    return flattenRoutes(routes);
  } catch (error: any) {
    throw new Error(error.message? error.message : error);
  }
}

function extractArrayValue(node: any, propertyName: string): string[] {
  const property = node.properties.find((p: any) => p.key.name === propertyName);
  return property?.value?.elements?.map((el: any) => el.value) || [];
}

function extractPropertyValue(node: any, propertyName: string): string | null {
  let value = null;
  node.properties.forEach((property: any) => {
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

function flattenRoutes(routes: Array<{ path: string; seoExclude: boolean }>): Array<{ path: string; seoExclude: boolean }> {
  const uniqueRoutes = new Map<string, boolean>();
  routes.forEach(route => {
    if (route.path && !uniqueRoutes.has(route.path)) {
      uniqueRoutes.set(route.path, route.seoExclude);
    }
  });
  return Array.from(uniqueRoutes).map(([path, seoExclude]) => ({ path, seoExclude }));
}
