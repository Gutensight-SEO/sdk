#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const commands_1 = require("../src/commands");
const program = new commander_1.Command();
program
    .name('seo')
    .version("0.2.0", '-v, --version', 'Output the current version')
    .description('SEO optimization toolkit for Single-Page Web Applications')
    .option('-d, --debug', 'output extra debugging information');
program
    .command('login')
    .description('Authenticate user command')
    .action(commands_1.login);
program
    .command('logout')
    .description('Remove user authentication command')
    .action(commands_1.logout);
program
    .command('init')
    .alias('i')
    .description('Initialize project command')
    .option('--ts', 'Use TypeScript configuration')
    .action(commands_1.init);
program
    .command('compile')
    .description('Compile SEO routes and metadata into seo-map.json file')
    .action(commands_1.compile);
program
    .command('build')
    .description('Build and inject SEO into index.html')
    .action(commands_1.build);
program
    .command('pages')
    .description('Analyze all pages')
    .action(commands_1.analyzePages);
program
    .command('page <path>')
    //   .command('page')
    //   .argument('<url>', 'Page URL to analyze (e.g., /about)')
    .description('Analyze specific page by specifying the page route as present in your seo-map file e.g "/about"')
    .action(commands_1.analyzePage);
// Add examples
program.addHelpText('after', `
    Commands Summary:
      login           Authentication command
      logout          Remove authentication command
      init            Initialize project command
      compile         Search and compile all SEO related routes and metadata command
      pages           SEO analysis for all pages command
      page            Single-Page SEO analysis command
      build           Build SEO optimization files (sitemap.xml & robots.txt) command
    
    Examples:
      $ seo login                     # Login with your API keys (one time)
      $ seo logout                    # Logout (remove) your API keys
      $ seo init                      # Initialize SEO configuration (for every new project)
      $ seo compile                   # Compile SEO routes and metadata (generate file - seo-map.json)
      $ seo pages                     # Analyze all pages (after successful compilation)
      $ seo page /about               # Analyze specific page (analyze single page)
      $ seo build                     # Generate sitemap.xml and robots.txt files for the project
    
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
//# sourceMappingURL=seo.js.map