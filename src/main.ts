import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { OpenApiService } from './openapi/openapi.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Get the OpenAPI service instance
  const openApiService = app.get(OpenApiService);
  
  // Create Swagger document
  const config = new DocumentBuilder()
    .setTitle('NS API Facade')
    .setDescription('API Facade for NS (Nederlandse Spoorwegen) services')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  
  // Merge our OpenAPI spec with the generated Swagger document
  document.components = {
    ...document.components,
    schemas: {
      ...document.components?.schemas,
      ...openApiService.getSchemas(),
    },
  };
  
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
