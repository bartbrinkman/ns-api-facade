import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { NsService } from './ns.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
  ],
  providers: [NsService],
  exports: [NsService],
})
export class NsModule {} 