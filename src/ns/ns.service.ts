import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Station } from './interfaces/station.interface';
import { Route } from './interfaces/route.interface';

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

  async getStations(): Promise<Station[]> {
    const cacheKey = 'stations';
    const cached = await this.getFromCache<Station[]>(cacheKey);
    if (cached) return cached;

    const response = await firstValueFrom(
      this.httpService.get<Station[]>(`${this.baseUrl}/stations/v2`, {
        headers: this.getHeaders(),
      })
    );
    this.setCache(cacheKey, response.data);
    return response.data;
  }

  async getRoutes(from: string, to: string): Promise<Route[]> {
    const cacheKey = `routes:${from}:${to}`;
    const cached = await this.getFromCache<Route[]>(cacheKey);
    if (cached) return cached;

    const response = await firstValueFrom(
      this.httpService.get<Route[]>(`${this.baseUrl}/reisinformatie-api/api/v3/trips`, {
        headers: this.getHeaders(),
        params: { fromStation: from, toStation: to }
      })
    );
    this.setCache(cacheKey, response.data);
    return response.data;
  }

  async getStationDetails(code: string): Promise<Station> {
    const cacheKey = `station:${code}`;
    const cached = await this.getFromCache<Station>(cacheKey);
    if (cached) return cached;

    const response = await firstValueFrom(
      this.httpService.get<Station>(`${this.baseUrl}/stations/v2/${code}`, {
        headers: this.getHeaders(),
      })
    );
    this.setCache(cacheKey, response.data);
    return response.data;
  }
}
