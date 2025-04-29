import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NsService } from './ns/ns.service';
import { StationV3 } from './generated/nsapp-stations/models/StationV3';
import { Feature } from './generated/spoorkaart/models/Feature';
import { Trein } from './generated/virtual-train/models/Trein';
import { TrainResponse } from './generated/facade/models/TrainResponse';
import { OpenApiService } from './openapi/openapi.service';

@ApiTags('api')
@Controller()
export class AppController {
  constructor(
    private readonly nsService: NsService,
    private readonly openApiService: OpenApiService
  ) {}

  @Get('stations')
  @ApiOperation({ summary: 'Get all stations' })
  @ApiResponse({
    status: 200,
    description: 'A list of stations',
    schema: {
      type: 'array',
      items: {
         $ref: '#/components/schemas/StationV3'
      }
    }
  })
  async getStations(): Promise<StationV3[]> {
    return this.nsService.getStations();
  }

  @Get('stations/:code')
  @ApiOperation({ summary: 'Get station details by code' })
  @ApiParam({ name: 'code', description: 'Station code' })
  @ApiResponse({
    status: 200,
    schema: {
         $ref: '#/components/schemas/StationV3'
    }
  })
  async getStationDetails(@Param('code') code: string): Promise<StationV3> {
    return this.nsService.getStationDetails(code);
  }

  @Get('tracks')
  @ApiOperation({ summary: 'Get all train tracks' })
  @ApiResponse({
    status: 200,
    description: 'A list of geojson features',
    schema: {
         $ref: '#/components/schemas/FeatureCollection' 
    }
  })
  async getTracks(): Promise<Feature[]> {
    return this.nsService.getTracks();
  }

  @Get('vehicles')
  @ApiOperation({ summary: 'Get all vehicles' })
  @ApiResponse({
    status: 200,
    description: 'List of trains',
    schema: {
      type: 'array',
      items: {
        $ref: '#/components/schemas/Trein'
      }
    }
  })
  async getVehicles(): Promise<Trein[]> {
    return this.nsService.getVehicles();
  }

  @Get('trains')
  @ApiOperation({ summary: 'Get all trains' })
  @ApiResponse({
    status: 200,
    description: 'Map of train numbers to station information',
    schema: {
      $ref: '#/components/schemas/TrainResponse'
    }
  })
  async getTrains(): Promise<TrainResponse> {
    return this.nsService.getTrains();
  }
}
