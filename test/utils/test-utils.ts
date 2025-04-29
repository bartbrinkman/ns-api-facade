import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

export const createMockHttpService = () => ({
  get: jest.fn(),
});

export const mockSuccessfulResponse = (data: any) => of({ data });

export const mockErrorResponse = (error: any) => of({ data: { error } });

export const mockApiResponse = (data: any) => of({ data: { payload: data } });

export const mockTrainApiResponse = (data: any) => of({ data });

export const setupTestModule = async (module: any, providers: any[]) => {
  const moduleFixture = await module.compile();
  const app = moduleFixture.createNestApplication();
  await app.init();
  return { app, moduleFixture };
};

export const cleanupTestModule = async (app: any) => {
  await app.close();
  jest.clearAllMocks();
}; 