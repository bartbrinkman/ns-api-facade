import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpService } from '@nestjs/axios';
import { mockStation, mockTrack, mockVehicle, mockTrainResponse } from './utils/test-fixtures';
import { createMockHttpService, mockApiResponse, mockErrorResponse, mockTrainApiResponse, setupTestModule, cleanupTestModule } from './utils/test-utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  const mockHttpService = createMockHttpService();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(HttpService)
      .useValue(mockHttpService)
      .compile();

    const { app: testApp } = await setupTestModule(moduleFixture, []);
    app = testApp;
    httpService = moduleFixture.get<HttpService>(HttpService);
  });

  afterEach(async () => {
    await cleanupTestModule(app);
  });

  describe('GET /stations', () => {
    it('should return stations', () => {
      mockHttpService.get.mockReturnValue(mockApiResponse([mockStation]));

      return request(app.getHttpServer())
        .get('/stations')
        .expect(200)
        .expect([mockStation]);
    });

    it('should handle API errors', () => {
      mockHttpService.get.mockReturnValue(mockErrorResponse('API Error'));

      return request(app.getHttpServer())
        .get('/stations')
        .expect(500);
    });
  });

  describe('GET /stations/:code', () => {
    it('should return station details', () => {
      mockHttpService.get.mockReturnValue(mockApiResponse([mockStation]));

      return request(app.getHttpServer())
        .get('/stations/UT')
        .expect(200)
        .expect(mockStation);
    });

    it('should return 404 for invalid station code', () => {
      mockHttpService.get.mockReturnValue(mockApiResponse([]));

      return request(app.getHttpServer())
        .get('/stations/INVALID')
        .expect(404);
    });
  });

  describe('GET /tracks', () => {
    it('should return tracks', () => {
      mockHttpService.get.mockReturnValue(mockApiResponse([mockTrack]));

      return request(app.getHttpServer())
        .get('/tracks')
        .expect(200)
        .expect([mockTrack]);
    });

    it('should handle API errors', () => {
      mockHttpService.get.mockReturnValue(mockErrorResponse('API Error'));

      return request(app.getHttpServer())
        .get('/tracks')
        .expect(500);
    });
  });

  describe('GET /vehicles', () => {
    it('should return vehicles', () => {
      mockHttpService.get.mockReturnValue(mockApiResponse([mockVehicle]));

      return request(app.getHttpServer())
        .get('/vehicles')
        .expect(200)
        .expect([mockVehicle]);
    });

    it('should handle API errors', () => {
      mockHttpService.get.mockReturnValue(mockErrorResponse('API Error'));

      return request(app.getHttpServer())
        .get('/vehicles')
        .expect(500);
    });
  });

  describe('GET /trains', () => {
    it('should return trains', () => {
      mockHttpService.get.mockReturnValue(mockTrainApiResponse(mockTrainResponse));

      return request(app.getHttpServer())
        .get('/trains')
        .expect(200)
        .expect(mockTrainResponse);
    });

    it('should handle API errors', () => {
      mockHttpService.get.mockReturnValue(mockErrorResponse('API Error'));

      return request(app.getHttpServer())
        .get('/trains')
        .expect(500);
    });
  });
});
