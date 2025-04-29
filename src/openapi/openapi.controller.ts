import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OpenApiService } from './openapi.service';

@ApiTags('NS API')
@Controller()
export class OpenApiController {
  constructor(private readonly openApiService: OpenApiService) {}


} 