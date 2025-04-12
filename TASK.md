Let's break this down into actionable tasks and implement them systematically. I'll organize the changes by priority and dependency flow:

**Phase 1: Core Configuration & Initialization**
1. **Enhance Config Structure**  
   - Update `seo.config.ts/js` template
   - Modify `configLoader.ts` to handle .env
   - Update `init.ts` to include new fields

2. **Router File Parsing Upgrade**  
   - Enhance `routeParser.ts` to extract SEO metadata
   - Update `routerLoader.ts` types

**Phase 2: SEO Map Generation**
3. **Revise SEO Map Generation**  
   - Modify `generateSeoMap.ts` structure
   - Update `compile.ts` command flow

**Phase 3: Build Process**
4. **Create Build Command**  
   - Add new `build.ts` with sitemap/robots generation
   - Modify `generateSitemap.ts` and `generateRobots.ts`

**Phase 4: Analysis Integration**
5. **Implement ML Analysis**  
   - Update `analyzePage.ts` and `analyzePages.ts`
   - Add API client utility

Let's start with **Phase 1 - Task 1**. Here are the specific code changes:

**1. seo.config.ts/js Template Update**
```typescript
// seo.config.ts updated template
const defaultConfig = {
  // ... existing properties
  injectSeo: true,
  apiKey: process.env.GUTENSEO_API_KEY || '',
  mlEndpoint: 'https://api.gutenseo.com/v1/analyze',
  analysisOutputDir: './seo-analysis',
  // ... rest of config
};
```

**2. Enhanced Config Loader with .env Support**
```typescript
// configLoader.ts updates
import 'dotenv/config';

export async function loadConfig() {
  // ... existing logic
  
  // Merge environment variables
  const envConfig = {
    apiKey: process.env.GUTENSEO_API_KEY,
    mlEndpoint: process.env.GUTENSEO_ML_ENDPOINT,
  };

  return {
    ...config,
    ...envConfig,
    router: config.router,
    customOptions: config.customOptions
  };
}
```

**3. Updated Init Command**
```typescript
// init.ts updates
const configContent = `const defaultConfig = {
  outputDir: './public',
  injectSeo: true,
  apiKey: process.env.GUTENSEO_API_KEY || '',
  mlEndpoint: 'https://api.gutenseo.com/v1/analyze',
  analysisOutputDir: './seo-analysis',
  router: {
    path: './src/router.${ext}',
    type: 'react-router'
  },
  // ... rest of config
};`;
```

**Required Package Updates**
```json
// package.json
"dependencies": {
  "dotenv": "^16.0.0",
  // ... existing
}
```

Before proceeding, would you like me to:
1. Continue with Phase 1 implementation details
2. See sample router file structure requirements
3. Adjust any of these initial changes
4. Move to Phase 2

Let me know your preference and I'll continue with detailed code modifications for the selected phase.