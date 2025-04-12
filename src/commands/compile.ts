import fs from 'fs-extra';
import path from 'path';
import { generateSitemap } from './generateSitemap';
import { generateRobots } from './generateRobots';
import { generateSeoMap } from './generateSeoMap';
import { loadConfig } from '../utils/configLoader';

export async function compile() {
  try {
    // Check if the configuration file exists
    const configPath = path.resolve(process.cwd(), 'seo.config.js');
    const tsConfigPath = path.resolve(process.cwd(), 'seo.config.ts');
    if (!fs.existsSync(configPath) && !fs.existsSync(tsConfigPath)) {
      console.error(
        'Error: Configuration file not found. Please run `seo init` to initialize the project before running `seo compile`.'
      );
      process.exit(1);
    }

    // Load the configuration
    const config = await loadConfig();
    const outputDir = path.resolve(process.cwd(), config.outputDir);

    // Ensure output directory exists
    await fs.ensureDir(outputDir);

    try {
      // console.log('Generating sitemap.xml...');
      // await generateSitemap();

      // console.log('Generating robots.txt...');
      // await generateRobots();

      console.log('Generating seo-map.json...');
      await generateSeoMap();

      // if (success){
      //   return 'Compilation completed successfully.'
      // }
      console.log('✅ Compilation completed successfully.');
    } catch (genError: any) {
      console.error(genError.message);
      process.exit(1);
    }
  } catch (error: any) {
    console.error(`❌ ${error.message ? error.message : error}`);
    process.exit(1);
  }
}
