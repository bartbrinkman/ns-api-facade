import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  const mockStation = {
    id: { code: 'UT', type: 'station' },
    name: 'Utrecht Centraal',
    countryCode: 'NL',
    uicCode: '8400621',
    lat: 52.089444,
    lng: 5.109722,
    stationType: 'main',
    hasFacilities: true,
  };

  const mockTrack = {
    type: 'Feature',
    properties: { name: 'Track 1' },
    geometry: {
      type: 'LineString',
      coordinates: [[5.109722, 52.089444], [5.110000, 52.090000]],
    },
  };

  const mockVehicle = {
    id: '1',
    type: 'train',
    name: 'Train 1',
    number: '1234',
    status: 'active',
    location: { lat: 52.089444, lng: 5.109722 },
  };

  const mockTrainResponse = {
    trains: [
      {
        id: '1',
        type: 'train',
        number: '1234',
        status: 'active',
        location: { lat: 52.089444, lng: 5.109722 },
        route: { from: 'UT', to: 'ASD' },
        delay: 0,
        platform: '1',
      },
    ],
    timestamp: '2024-03-20T12:00:00Z',
  };

  const createMockResponse = <T>(data: T): AxiosResponse<T> => ({
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {} as any,
  });

  beforeEach(async () => {
    const mockHttpService = {
      get: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(HttpService)
      .useValue(mockHttpService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpService = moduleFixture.get<HttpService>(HttpService);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /stations', () => {
    it('should return stations', () => {
      const mockHttpService = httpService as jest.Mocked<HttpService>;
      mockHttpService.get.mockReturnValue(of(createMockResponse({ payload: [mockStation] })));

      return request(app.getHttpServer())
        .get('/stations')
        .expect(200)
        .expect([mockStation]);
    });

    it('should handle API errors', () => {
      const mockHttpService = httpService as jest.Mocked<HttpService>;
      mockHttpService.get.mockReturnValue(throwError(() => new Error('API Error')));

      return request(app.getHttpServer())
        .get('/stations')
        .expect(500);
    });
  });

  describe('GET /stations/:code', () => {
    it('should return station details', () => {
      const mockHttpService = httpService as jest.Mocked<HttpService>;
      mockHttpService.get.mockReturnValue(of(createMockResponse({ payload: [mockStation] })));

      return request(app.getHttpServer())
        .get('/stations/UT')
        .expect(200)
        .expect(mockStation);
    });

    it('should return 404 for invalid station code', () => {
      const mockHttpService = httpService as jest.Mocked<HttpService>;
      mockHttpService.get.mockReturnValue(of(createMockResponse({ payload: [] })));

      return request(app.getHttpServer())
        .get('/stations/INVALID')
        .expect(404);
    });
  });

  describe('GET /tracks', () => {
    it('should return tracks', () => {
      const mockHttpService = httpService as jest.Mocked<HttpService>;
      mockHttpService.get.mockReturnValue(of(createMockResponse({ payload: [mockTrack] })));

      return request(app.getHttpServer())
        .get('/tracks')
        .expect(200)
        .expect([mockTrack]);
    });

    it('should handle API errors', () => {
      const mockHttpService = httpService as jest.Mocked<HttpService>;
      mockHttpService.get.mockReturnValue(throwError(() => new Error('API Error')));

      return request(app.getHttpServer())
        .get('/tracks')
        .expect(500);
    });
  });

  describe('GET /vehicles', () => {
    it('should return vehicles', () => {
      const mockHttpService = httpService as jest.Mocked<HttpService>;
      mockHttpService.get.mockReturnValue(of(createMockResponse({ payload: [mockVehicle] })));

      return request(app.getHttpServer())
        .get('/vehicles')
        .expect(200)
        .expect([mockVehicle]);
    });

    it('should handle API errors', () => {
      const mockHttpService = httpService as jest.Mocked<HttpService>;
      mockHttpService.get.mockReturnValue(throwError(() => new Error('API Error')));

      return request(app.getHttpServer())
        .get('/vehicles')
        .expect(500);
    });
  });

  describe('GET /trains', () => {
    it('should return trains', () => {
      const mockHttpService = httpService as jest.Mocked<HttpService>;
      mockHttpService.get.mockReturnValue(of(createMockResponse(mockTrainResponse)));

      return request(app.getHttpServer())
        .get('/trains')
        .expect(200)
        .expect(mockTrainResponse);
    });

    it('should handle API errors', () => {
      const mockHttpService = httpService as jest.Mocked<HttpService>;
      mockHttpService.get.mockReturnValue(throwError(() => new Error('API Error')));

      return request(app.getHttpServer())
        .get('/trains')
        .expect(500);
    });
  });
});
