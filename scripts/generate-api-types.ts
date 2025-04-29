import { generate } from 'openapi-typescript-codegen';
import * as path from 'path';
import * as fs from 'fs';

const SPECS_DIR = path.join(__dirname, '../src/openapi/spec');
const OUTPUT_DIR = path.join(__dirname, '../src/generated');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// List of API specs to generate types for
const specs = [
  {
    name: 'facade',
    file: 'facade-api.yaml',
    output: 'facade',
  },
  {
    name: 'spoorkaart',
    file: 'spoorkaart-api.yaml',
    output: 'spoorkaart',
  },
  {
    name: 'virtual-train',
    file: 'virtual-train-api.yaml',
    output: 'virtual-train',
  },
  {
    name: 'nsapp-stations',
    file: 'nsapp-stations-api.yaml',
    output: 'nsapp-stations',
  },
];

async function generateTypes() {
  for (const spec of specs) {
    console.log(`Generating types for ${spec.name}...`);
    
    const outputPath = path.join(OUTPUT_DIR, spec.output);
    
    // Clean up existing generated files
    if (fs.existsSync(outputPath)) {
      fs.rmSync(outputPath, { recursive: true, force: true });
    }
    
    // Create output directory
    fs.mkdirSync(outputPath, { recursive: true });
    
    try {
      await generate({
        input: path.join(SPECS_DIR, spec.file),
        output: outputPath,
        useOptions: false,
        useUnionTypes: true,
        exportSchemas: false,
        exportServices: false,
        exportCore: false,
        exportModels: true,
      });

      // Create an index.ts file to export all models
      const modelsDir = path.join(outputPath, 'models');
      if (fs.existsSync(modelsDir)) {
        const modelFiles = fs.readdirSync(modelsDir)
          .filter(file => file.endsWith('.ts') && !file.endsWith('.d.ts'))
          .map(file => file.replace('.ts', ''));

        const indexContent = modelFiles
          .map(model => `export * from './models/${model}';`)
          .join('\n');

        fs.writeFileSync(path.join(outputPath, 'index.ts'), indexContent);
      }

      console.log(`Generated types for ${spec.name}`);
    } catch (error) {
      console.error(`Error generating types for ${spec.name}:`, error);
    }
  }
}

generateTypes().catch(console.error); 