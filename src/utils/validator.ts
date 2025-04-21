export function validateMetadata(metadata: any): boolean {
  if (!metadata.title || typeof metadata.title !== 'string') {
    throw new Error('❌ Invalid metadata: "title" is required and must be a string.');
  }

  if (!metadata.description || typeof metadata.description !== 'string') {
    throw new Error('❌ Invalid metadata: "description" is required and must be a string.');
  }

  if (!Array.isArray(metadata.keywords)) {
    throw new Error('❌ Invalid metadata: "keywords" must be an array.');
  }

  return true;
}

export function validateConfig(config: any): boolean {
  if (!config.siteUrl || typeof config.siteUrl !== 'string') {
    throw new Error('❌ Invalid configuration: "siteUrl" is required and must be a string.');
  }

  if (!config.outputDir || typeof config.outputDir !== 'string') {
    throw new Error('❌ Invalid configuration: "outputDir" is required and must be a string.');
  }

  if (!Array.isArray(config.routes)) {
    throw new Error('❌ Invalid configuration: "routes" must be an array.');
  }

  return true;
}
