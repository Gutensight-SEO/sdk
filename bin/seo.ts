#!/usr/bin/env node

import { Command } from 'commander';
import { login, logout, init, compile, analyzePage, analyzePages, generateSitemap, generateRobots, generateSeoMap } from '../src/commands';

const program = new Command();

program
  .name('seo')
  .version("0.2.0", '-v, --version', 'Output the current version')
  .description('SEO optimization toolkit for Single-Page Web Applications')
  .option('-d, --debug', 'output extra debugging information')

program
  .command('login')
  .description('Authenticate user command')
  .action(login);

program
  .command('logout')
  .description('Remove user authentication command')
  .action(logout);

program
  .command('init')
  .alias('i')
  .description('Initialize project command')
  .option('--ts', 'Use TypeScript configuration')
  .action(init);

program
  .command('compile')
  .description('Compile SEO files (sitemap.xml, robots.txt, seo-map.json)')
  .action(compile);

program
  .command('page <path>')
    //   .command('page')
    //   .argument('<url>', 'Page URL to analyze (e.g., /about)')
  .description('Analyze specific page')
  .action(analyzePage);

program
  .command('pages')
  .description('Analyze all pages')
  .action(analyzePages);

program
  .command('sitemap')
  .description('Generate sitemap.xml')
  .action(generateSitemap);

program
  .command('robots')
  .description('Generate robots.txt')
  .action(generateRobots);

program
  .command('seomap')
  .description('Build and inject SEO into index.html')
  .action(generateSeoMap);


// Add examples
program.addHelpText('after', `
    Commands Summary:
      login     Authentication command
      init      Initialize project command
      seomap    SEO Map file Generation command
      sitemap   Sitemap file Generation command
      robots    Robots file Generation command
      page      Single-Page SEO analysis command
      pages     SEO analysis for all pages command
      compile   Compilation and optimization command
    
    Examples:
      $ seo login                     # Login with your API keys (one time)
      $ seo init                      # Initialize SEO configuration (for every new project)
      $ seo compile                   # Compile SEO files (generate and build seo-optimization files; sitemap.xml, robots.txt, seo-map.json)
      $ seo pages             # Analyze all pages (after successful compilation)
      $ seo page /about       # Analyze specific page (analyze single page)
      $ seo seomap                 # Build and inject SEO into index.html file if "injectSeoMap" is set to true
      $ seo sitemap          # Generate sitemap.xml (generate the sitemap for the project)
      $ seo robots           # Generate robots.txt (generate the robots.txt file for the project)
    
    For more information, visit: https://gutensight-seo.netlify.app/v1/documentation
`);

// Error handling
program
  .showHelpAfterError('(add --help for additional information)')
  .exitOverride((err) => {
    if (err.code === 'commander.missingArgument') {
      console.error('Missing required argument');
    }
    process.exit(1);
});

program.parse(process.argv);
