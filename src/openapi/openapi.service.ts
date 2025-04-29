import { Injectable } from '@nestjs/common';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { load } from 'js-yaml';
import { OpenAPIObject } from '@nestjs/swagger';

@Injectable()
export class OpenApiService {
  private spec: OpenAPIObject;

  constructor() {
    this.loadSpecs();
  }

  private loadSpecs() {
    try {
      const rootDir = process.cwd();
      const specDir = join(rootDir, 'src', 'openapi', 'spec');
      
      // Initialize with empty spec
      this.spec = {
        openapi: '3.0.0',
        info: {
          title: 'NS API',
          version: '1.0.0',
        },
        paths: {},
        components: {
          schemas: {},
        },
      };

      // Read all YAML files from spec directory
      const specFiles = readdirSync(specDir)
        .filter(file => file.endsWith('.yaml'));

      // Load and merge each specification
      for (const file of specFiles) {
        const filePath = join(specDir, file);
        const fileContents = readFileSync(filePath, 'utf8');
        const fileSpec = load(fileContents) as OpenAPIObject;

        // Merge paths
        this.spec.paths = {
          ...this.spec.paths,
          ...fileSpec.paths,
        };

        // Merge schemas
        if (fileSpec.components?.schemas) {
          this.spec.components = this.spec.components || {};
          this.spec.components.schemas = {
            ...(this.spec.components.schemas || {}),
            ...fileSpec.components.schemas,
          };
        }
      }
    } catch (error) {
      throw new Error(`Failed to load OpenAPI specifications: ${error.message}`);
    }
  }

  getSpec(): OpenAPIObject {
    return this.spec;
  }

  getSchemas() {
    return this.spec.components?.schemas || {};
  }
} 