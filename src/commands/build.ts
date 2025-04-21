import fs from 'fs-extra';
import path from 'path';
import { generateSitemap } from './generateSitemap';
import { generateRobots } from './generateRobots';
import { loadConfig } from '../utils/configLoader';

export async function build() {
  try {
    // Check if the configuration file exists
    const configPath = path.resolve(process.cwd(), 'seo.config.js');
    const tsConfigPath = path.resolve(process.cwd(), 'seo.config.ts');
    if (!fs.existsSync(configPath) && !fs.existsSync(tsConfigPath)) {
      console.error(
        'Error: ❌ SEO file not found. Please run `seo compile` to compile seo routes and metadat of the project before building the seo required files with `seo build`.'
      );
      process.exit(1);
    }

    // Load the configuration
    const config = await loadConfig();
    const outputDir = path.resolve(process.cwd(), config.outputDir);

    // Ensure output directory exists
    await fs.ensureDir(outputDir);

    try {
      console.log('Generating sitemap.xml...');
      await generateSitemap();

      console.log('Generating robots.txt...');
      await generateRobots();

      // if (success){
      //   return 'SEO files generated successfully.'
      // }
      console.log('✅ SEO files generated successfully.');
    } catch (genError: any) {
      console.error(`❌ ${genError.message}`);
      process.exit(1);
    }
  } catch (error: any) {
    console.error(`❌ ${error.message ? error.message : error}`);
    process.exit(1);
  }
}
