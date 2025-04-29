import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NsController } from './ns.controller';
import { NsService } from './ns.service';

@Module({
  imports: [HttpModule],
  controllers: [NsController],
  providers: [NsService],
})
export class NsModule {}
