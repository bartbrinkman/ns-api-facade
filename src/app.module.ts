import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import configuration from './config/configuration';
import { OpenApiModule } from './openapi/openapi.module';
import { OpenApiService } from './openapi/openapi.service';
import { NsModule } from './ns/ns.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    OpenApiModule,
    NsModule,
  ],
  controllers: [AppController],
  providers: [OpenApiService],
})
export class AppModule {}
