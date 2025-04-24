# Gutensight SEO SDK

**An advanced SEO management SDK for Single-Page Applications (SPA)**

**Version:** 0.1.5

---

## Overview

Gutensight SEO SDK is an advanced command-line toolkit and library designed to simplify and enhance Search Engine Optimization (SEO) for modern Single-Page Applications. It provides commands for project initialization, compilation of routes and metadata, analysis using AI-driven insights, and generation of traditional SEO files like `robots.txt` and `sitemap.xml`.

## Features

- **Authentication:** Secure login/logout workflows for managing API keys.
- **Project Initialization:** Generate `seo.config` in TypeScript or JavaScript for your project.
- **Compilation:** Parse application routes and build a centralized `seo-map.json`.
- **AI-Driven Analysis:** Analyze pages or single routes for metadata quality and SEO recommendations; save analysis result(s) into a `gutensight-analytics` directory.
- **File Generation:** Automatically generate `robots.txt` and `sitemap.xml` to ensure crawler-friendly output.
- **Extensible:** Easily integrate with any SPA framework (React, Vue, Angular, Svelte, etc.).

## Installation

```
npm install -g gutensight
```

## CLI Usage

All commands are accessible via the `seo` binary.

```
# Show version and help
seo --version
seo --help
```

### Authentication

Note: An API key (via subscription) is required. Run seo login to authenticate before using other commands.

```
# Login and save API keys
seo login

# Logout and remove API keys
seo logout
```

### Project Setup

```
# Initialize SEO config (TypeScript)
seo init --ts

# Initialize SEO config (JavaScript)
seo init
```

### Compilation 

```
# Compile routes into seo-map.json
seo compile

# Set an optional 'injectSeoMap' to 'true' inside the 'seo.config' file. Default is 'false'.
# 'injectSeoMap: true' Injects the compiled seo-map.json routes it into your index.html for immediate crawler-friendly output.

# Make necessary adjustments and update the metadata of the compiled routes
```

### Build SEO Files

```
# Generate sitemap.xml and robots.txt
seo build
```

### Analysis

```
# Analyze all pages based on seo-map.json
seo pages

# Analyze a single page by route (e.g., /about)
seo page /about

# Analysis results are saved inside a customizable 'gutensight-analytics' directory.
```

## Programmatic Usage

Install locally without global flag when using programmatically:

```
npm install -g gutensight
```

```
import { login, init, compile, analyzePages, analyzePage, build } from 'gutensight';

(async () => {
  // Authenticate
  await login();

  // Initialize project
  await init({ useTs: true });

  // Compile routes
  await compile();

  // Analyze pages
  await analyzePages();

  // Build SEO files
  await build();
})();
```

## Configuration

After running `seo init`, edit the generated `seo.config.ts` (or `.js`) to specify:

- `routerFile`: Path to your framework router file.
- `indexFile`: Path to `index.html` for metadata injection.
- `outputDir`: Directory for analysis reports (default `gutensight-analytics`).

<details>
<summary>Example seo.config.ts</summary>

```
export default {
  routerFile: './src/router.ts',
  indexFile: './public/index.html',
  outputDir: './gutensight-analytics',
  injectSeoMap: true,
};
</details>

## seo-map.json Structure

The `seo compile` command generates an array of route metadata objects:

```
[
  {
    "route": "/",
    "metadata": {
      "title": "",
      "description": "",
      "body": "",
      "keywords": [],
      "headers": [],
      "changefreq": "",
      "priority": 0
    }
  },
  {
    "route": "/about",
    "metadata": { /* ... */ }
  }
]
```

Edit this file to add or adjust metadata before analysis and building.

## Contributing

Gutensight SEO SDK is released under **BUSL-1.1**. Contributions are welcome via GitHub Issues and Pull Requests. Note: Commercial use of backend API requires a valid subscription.

1. Fork the repo
2. Create a feature branch
3. Submit a Pull Request

## License

This project is licensed under the **Business Source License 1.1**.

See the [LICENSE](./LICENSE) file for details.

## Getting Help

If you run into issues, please open an issue on [GitHub](https://github.com/Gutensight-SEO/sdk/issues)  # or join our community Slack at `#gutensight-support`.


---

*Gutensight-SEO: Make every page count.*

Gutensight-SEO. All rights reserved.