import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { NsService } from '../src/ns.service';
import { OpenApiService } from '../src/openapi/openapi.service';
import { mockStation, mockTrack, mockVehicle, mockTrainResponse } from './utils/test-fixtures';

describe('AppController', () => {
  let controller: AppController;
  let nsService: NsService;
  let openApiService: OpenApiService;

  const mockNsService = {
    getStations: jest.fn(),
    getStationDetails: jest.fn(),
    getTracks: jest.fn(),
    getVehicles: jest.fn(),
    getTrains: jest.fn(),
  };

  const mockOpenApiService = {
    // Add any methods that are used in the controller
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: NsService, useValue: mockNsService },
        { provide: OpenApiService, useValue: mockOpenApiService },
      ],
    }).compile();

    controller = module.get<AppController>(AppController);
    nsService = module.get<NsService>(NsService);
    openApiService = module.get<OpenApiService>(OpenApiService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getStations', () => {
    it('should return an array of stations', async () => {
      mockNsService.getStations.mockResolvedValue([mockStation]);

      const result = await controller.getStations();

      expect(result).toEqual([mockStation]);
      expect(mockNsService.getStations).toHaveBeenCalled();
    });

    it('should handle errors from the service', async () => {
      const error = new Error('Service error');
      mockNsService.getStations.mockRejectedValue(error);

      await expect(controller.getStations()).rejects.toThrow('Service error');
    });
  });

  describe('getStationDetails', () => {
    it('should return station details for a valid code', async () => {
      mockNsService.getStationDetails.mockResolvedValue(mockStation);

      const result = await controller.getStationDetails('UT');

      expect(result).toEqual(mockStation);
      expect(mockNsService.getStationDetails).toHaveBeenCalledWith('UT');
    });

    it('should handle errors from the service', async () => {
      const error = new Error('Station not found');
      mockNsService.getStationDetails.mockRejectedValue(error);

      await expect(controller.getStationDetails('INVALID')).rejects.toThrow('Station not found');
    });
  });

  describe('getTracks', () => {
    it('should return an array of tracks', async () => {
      mockNsService.getTracks.mockResolvedValue([mockTrack]);

      const result = await controller.getTracks();

      expect(result).toEqual([mockTrack]);
      expect(mockNsService.getTracks).toHaveBeenCalled();
    });

    it('should handle errors from the service', async () => {
      const error = new Error('Service error');
      mockNsService.getTracks.mockRejectedValue(error);

      await expect(controller.getTracks()).rejects.toThrow('Service error');
    });
  });

  describe('getVehicles', () => {
    it('should return an array of vehicles', async () => {
      mockNsService.getVehicles.mockResolvedValue([mockVehicle]);

      const result = await controller.getVehicles();

      expect(result).toEqual([mockVehicle]);
      expect(mockNsService.getVehicles).toHaveBeenCalled();
    });

    it('should handle errors from the service', async () => {
      const error = new Error('Service error');
      mockNsService.getVehicles.mockRejectedValue(error);

      await expect(controller.getVehicles()).rejects.toThrow('Service error');
    });
  });

  describe('getTrains', () => {
    it('should return train response', async () => {
      mockNsService.getTrains.mockResolvedValue(mockTrainResponse);

      const result = await controller.getTrains();

      expect(result).toEqual(mockTrainResponse);
      expect(mockNsService.getTrains).toHaveBeenCalled();
    });

    it('should handle errors from the service', async () => {
      const error = new Error('Service error');
      mockNsService.getTrains.mockRejectedValue(error);

      await expect(controller.getTrains()).rejects.toThrow('Service error');
    });
  });
}); 