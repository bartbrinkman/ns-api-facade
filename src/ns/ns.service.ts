import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { StationV3 } from '../generated/nsapp-stations/models/StationV3';
import { Feature } from '../generated/spoorkaart/models/Feature';
import { Trein } from '../generated/virtual-train/models/Trein';
import { TrainResponse } from '../generated/facade/models/TrainResponse';

@Injectable()
export class NsService {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly cache = new Map<string, { data: any; timestamp: number }>();
  private readonly cacheDuration = 5 * 60 * 1000; // 5 minutes in milliseconds

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('nsApi.baseUrl') || 'https://gateway.apiportal.ns.nl';
    this.apiKey = this.configService.get<string>('nsApi.apiKey') || '';
  }

  private async getFromCache<T>(key: string): Promise<T | null> {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return cached.data as T;
    }
    return null;
  }

  private setCache<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  private getHeaders() {
    return {
      'Ocp-Apim-Subscription-Key': this.apiKey,
    };
  }

  async getStations(): Promise<StationV3[]> {
    const cacheKey = 'stations';
    const cached = await this.getFromCache<StationV3[]>(cacheKey);
    if (cached) return cached;

    const response = await firstValueFrom(
      this.httpService.get<{ payload: StationV3[] }>(`${this.baseUrl}/nsapp-stations/v3?countryCodes=nl`, {
        headers: this.getHeaders(),
      })
    );
    this.setCache(cacheKey, response.data.payload);
    return response.data.payload;
  }

  async getTracks(): Promise<Feature[]> {
    const cacheKey = 'tracks';
    const cached = await this.getFromCache<Feature[]>(cacheKey);
    if (cached) return cached;

    const response = await firstValueFrom(
      this.httpService.get<{ payload: Feature[] }>(`${this.baseUrl}/Spoorkaart-API/api/v1/spoorkaart`, {
        headers: this.getHeaders(),
      })
    );
    this.setCache(cacheKey, response.data.payload);
    return response.data.payload;
  }

  async getStationDetails(code: string): Promise<StationV3> {
    const stations = await this.getStations();
    const station = stations.find(s => s.id.code === code);
    if (!station) {
      throw new NotFoundException(`Station with code ${code} not found`);
    }
    return station;
  }

  async getVehicles(): Promise<Trein[]> {
    const cacheKey = 'vehicles';
    const cached = await this.getFromCache<Trein[]>(cacheKey);
    if (cached) return cached;

    const response = await firstValueFrom(
      this.httpService.get<{ payload: Trein[] }>(`${this.baseUrl}/virtual-train-api/vehicle`, {
        headers: this.getHeaders(),
      })
    );
    this.setCache(cacheKey, response.data.payload);
    return response.data.payload;
  }

  async getTrains(): Promise<TrainResponse> {
    const cacheKey = 'trains';
    const cached = await this.getFromCache<TrainResponse>(cacheKey);
    if (cached) return cached;

    const response = await firstValueFrom(
      this.httpService.get<TrainResponse>(`${this.baseUrl}/virtual-train-api/v1/trein`, {
        headers: this.getHeaders(),
      })
    );
    this.setCache(cacheKey, response.data);
    return response.data;
  }
} 