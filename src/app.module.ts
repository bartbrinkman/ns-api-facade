import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { NsService } from './ns.service';
import configuration from './config/configuration';
import { OpenApiModule } from './openapi/openapi.module';
import { OpenApiController } from './openapi/openapi.controller';
import { OpenApiService } from './openapi/openapi.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    HttpModule,
    OpenApiModule,
  ],
  controllers: [AppController, OpenApiController],
  providers: [NsService, OpenApiService],
})
export class AppModule {}
