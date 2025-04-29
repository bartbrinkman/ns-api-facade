import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NsService } from './ns.service';
import { Station } from './interfaces/station.interface';
import { Route } from './interfaces/route.interface';

@ApiTags('ns')
@Controller('ns')
export class NsController {
  constructor(private readonly nsService: NsService) {}

  @Get('stations')
  @ApiOperation({ summary: 'Get all stations' })
  async getStations(): Promise<Station[]> {
    return this.nsService.getStations();
  }

  @Get('stations/:code')
  @ApiOperation({ summary: 'Get station details by code' })
  @ApiParam({ name: 'code', description: 'Station code' })
  async getStationDetails(@Param('code') code: string): Promise<Station> {
    return this.nsService.getStationDetails(code);
  }

  @Get('routes')
  @ApiOperation({ summary: 'Get routes between stations' })
  @ApiQuery({ name: 'from', description: 'Departure station code' })
  @ApiQuery({ name: 'to', description: 'Arrival station code' })
  async getRoutes(
    @Query('from') from: string,
    @Query('to') to: string,
  ): Promise<Route[]> {
    return this.nsService.getRoutes(from, to);
  }
}
