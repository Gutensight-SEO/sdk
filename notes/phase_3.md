Let's implement Phase 3 with the ML analysis integration. We'll create a robust system for sending SEO data to the ML API and handling responses:

**1. API Client Utility (apiClient.ts)**
```typescript
import axios from 'axios';
import { loadConfig } from './configLoader';
import path from 'path';
import fs from 'fs-extra';

interface AnalysisResult {
  pageScore: number;
  seoIssues: string[];
  suggestions: string[];
  technicalChecks: {
    headers: boolean;
    canonical: boolean;
    metaTags: boolean;
  };
  timestamp: string;
}

export async function analyzeContent(content: any): Promise<AnalysisResult> {
  const config = await loadConfig();
  
  if (!config.apiKey) {
    throw new Error('API key missing - run `seo login` or set GUTENSEO_API_KEY');
  }

  try {
    const response = await axios.post(config.mlEndpoint, content, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 15000
    });

    if (response.status !== 200) {
      throw new Error(`API responded with status ${response.status}`);
    }

    return {
      pageScore: response.data.score,
      seoIssues: response.data.issues || [],
      suggestions: response.data.suggestions || [],
      technicalChecks: response.data.technical || {},
      timestamp: new Date().toISOString()
    };
  } catch (error: any) {
    throw new Error(`Analysis failed: ${error.response?.data?.error || error.message}`);
  }
}

export async function saveAnalysisResult(result: AnalysisResult, pageIdentifier: string): Promise<string> {
  const config = await loadConfig();
  const outputDir = path.resolve(process.cwd(), config.analysisOutputDir);
  
  await fs.ensureDir(outputDir);
  const filename = `analysis-${pageIdentifier}-${Date.now()}.json`;
  const filePath = path.join(outputDir, filename);
  
  await fs.writeJson(filePath, result, { spaces: 2 });
  return filePath;
}
```

**2. Enhanced Page Analysis (analyzePage.ts)**
```typescript
import { analyzeContent, saveAnalysisResult } from '../utils/apiClient';
import { loadConfig } from '../utils/configLoader';
import fs from 'fs-extra';
import path from 'path';

export async function analyzePage(pageTitle: string) {
  try {
    const config = await loadConfig();
    const seoMapPath = path.resolve(process.cwd(), config.outputDir, 'seo-map.json');
    const seoMap = await fs.readJson(seoMapPath);

    const pageData = seoMap.find((entry: any) => 
      entry.title === pageTitle || entry.url === pageTitle
    );

    if (!pageData) {
      throw new Error(`Page "${pageTitle}" not found in SEO map`);
    }

    console.log(`Analyzing page: ${pageData.title}`);
    const analysis = await analyzeContent({
      url: pageData.url,
      metadata: {
        title: pageData.title,
        description: pageData.description,
        headers: pageData.headers
      },
      content: pageData.body
    });

    const outputPath = await saveAnalysisResult(analysis, pageData.url);
    console.log(`
Analysis complete for ${pageData.title}
Score: ${analysis.pageScore}/100
Issues found: ${analysis.seoIssues.length}
Suggestions: ${analysis.suggestions.length}
Full report saved to: ${outputPath}
    `);

  } catch (error: any) {
    console.error('Page analysis failed:', error.message);
    process.exit(1);
  }
}
```

**3. Bulk Analysis (analyzePages.ts)**
```typescript
import { analyzeContent, saveAnalysisResult } from '../utils/apiClient';
import { loadConfig } from '../utils/configLoader';
import fs from 'fs-extra';
import path from 'path';
import { promisify } from 'util';

const sleep = promisify(setTimeout);

export async function analyzePages() {
  try {
    const config = await loadConfig();
    const seoMapPath = path.resolve(process.cwd(), config.outputDir, 'seo-map.json');
    const seoMap = await fs.readJson(seoMapPath);

    console.log(`Starting analysis of ${seoMap.length} pages...`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const [index, pageData] of seoMap.entries()) {
      try {
        console.log(`Analyzing ${index + 1}/${seoMap.length}: ${pageData.title}`);
        
        const analysis = await analyzeContent({
          url: pageData.url,
          metadata: pageData,
          content: pageData.body
        });

        await saveAnalysisResult(analysis, pageData.url);
        successCount++;

        // Rate limit protection
        await sleep(500);
      } catch (error) {
        errorCount++;
        console.error(`Failed to analyze ${pageData.url}: ${error.message}`);
      }
    }

    console.log(`
Analysis completed:
- Successfully analyzed: ${successCount} pages
- Failed analyses: ${errorCount}
- Reports saved to: ${path.resolve(config.analysisOutputDir)}
    `);

  } catch (error: any) {
    console.error('Bulk analysis failed:', error.message);
    process.exit(1);
  }
}
```

**4. Updated Config Types (configLoader.ts)**
```typescript
// Add to SeoConfig interface
interface SeoConfig {
  // ... existing properties
  mlEndpoint: string;
  analysisOutputDir: string;
  rateLimit: {
    requests: number;
    interval: number;
  };
}
```

**5. Enhanced Error Handling (apiClient.ts)**
```typescript
// Add retry logic to analyzeContent
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export async function analyzeContent(content: any): Promise<AnalysisResult> {
  let attempt = 0;
  
  while (attempt < MAX_RETRIES) {
    try {
      // ... existing request code
    } catch (error: any) {
      if (error.response?.status === 429 && attempt < MAX_RETRIES) {
        const delay = error.response?.headers['retry-after'] || RETRY_DELAY;
        await sleep(delay);
        attempt++;
        continue;
      }
      throw error;
    }
  }
  throw new Error(`Max retries (${MAX_RETRIES}) exceeded`);
}
```

**Key Features:**
1. Rate-limited API requests
2. Comprehensive error handling with retries
3. Detailed analysis reporting
4. Automatic result saving in specified directory
5. Progress tracking for bulk analysis
6. Configurable timeout and retry policies
7. Human-readable output formatting

**Verification Steps:**
1. Run `seo page "/about"` with valid API key
2. Check analysis report generation
3. Test bulk analysis with `seo pages`
4. Verify error handling for:
   - Invalid API keys
   - Network failures
   - Rate limiting
   - Invalid SEO map entries

**Sample Analysis Report Format:**
```json
{
  "pageScore": 82,
  "seoIssues": [
    "Missing meta description",
    "Low keyword density"
  ],
  "suggestions": [
    "Add alt text to header image",
    "Improve H1 hierarchy"
  ],
  "technicalChecks": {
    "headers": true,
    "canonical": false,
    "metaTags": true
  },
  "timestamp": "2024-02-20T12:34:56.789Z"
}
```

Would you like to:
1. Add specific ML response handling logic?
2. Implement different report formats (CSV/HTML)?
3. Add pre-analysis validation checks?
4. Proceed to testing strategies for this phase?