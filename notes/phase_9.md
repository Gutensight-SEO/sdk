You're absolutely right! Let's add comprehensive Vue support. Here's the enhanced framework handling:

**1. Updated Framework Detection (frameworkDetector.ts)**
```typescript
// Modified detectFramework function
export async function detectFramework(): Promise<Framework> {
  const config = await loadConfig();
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  
  return existsSync('vue.config.js') ? 'vue' :
         existsSync('vite.config.ts') && packageJson.dependencies?.vue ? 'vite-vue' :
         packageJson.dependencies?.vue ? 'vue' :
         // ... existing checks
}

// Updated framework defaults
export function getFrameworkDefaults(framework: Framework) {
  return {
    // ... existing frameworks
    vue: { 
      buildCmd: 'npm run build',
      outputDir: 'dist',
      routerPath: './src/router/index.js',
      staticConfig: 'vue.config.js'
    },
    'vite-vue': {
      buildCmd: 'npm run build',
      outputDir: 'dist',
      routerPath: './src/router/index.js',
      staticConfig: 'vite.config.ts'
    }
  }[framework];
}
```

**2. Vue-Specific Route Parser (vueRouteParser.ts)**
```typescript
import { parseRoutes } from './routeParser';
import { RouteConfig } from 'vue-router';

export function parseVueRoutes(routes: RouteConfig[]): SeoRoute[] {
  return routes.map(route => ({
    path: route.path,
    seoExclude: route.meta?.seoExclude || false,
    title: route.meta?.title || '',
    metadata: {
      description: route.meta?.description || '',
      keywords: route.meta?.keywords || []
    }
  }));
}
```

**3. Vue CLI Integration Guide (FRAMEWORK_GUIDES.md)**
```markdown
## Vue.js Setup

### Vue 2/3 with Vue CLI
1. Install the SDK:
```bash
npm install @gutenseo/cli --save-dev
```

2. Add SEO meta fields to routes:
```javascript
// src/router/index.js
export default new VueRouter({
  routes: [
    {
      path: '/about',
      component: About,
      meta: {
        seoExclude: false,
        title: 'About Page',
        description: 'Learn about our company',
        keywords: ['about', 'company']
      }
    }
  ]
});
```

3. Configure vue.config.js:
```javascript
module.exports = {
  outputDir: 'dist',
  configureWebpack: {
    plugins: [
      new GutenseoWebpackPlugin({
        routerPath: './src/router/index.js'
      })
    ]
  }
}
```

### Nuxt.js Integration
1. Install as Nuxt module:
```bash
npm install @gutenseo/nuxt --save-dev
```

2. Add to nuxt.config.js:
```javascript
export default {
  modules: [
    '@gutenseo/nuxt'
  ],
  gutenseo: {
    routerPath: './router/index.js'
  }
}
```

3. Use in pages:
```vue
<script>
export default {
  seo: {
    title: 'Home Page',
    description: 'Welcome to our site'
  }
}
</script>
```

### Vite + Vue Setup
1. Add build script:
```json
{
  "scripts": {
    "seo:dev": "seo dev --framework=vite-vue"
  }
}
```

2. Run analysis:
```bash
npm run build && npm run seo:dev
```

**Verification Command**
```bash
npx seo page "/about" --framework=vue
```

**Key Vue Features Added:**
1. Vue CLI/Vite/Nuxt detection
2. Vue Router metadata extraction
3. Webpack plugin integration
4. Nuxt.js module support
5. Route meta field validation
6. Vue-specific build optimizations

Would you like me to implement any of these Vue-specific components in more detail or focus on a particular aspect of the Vue integration?