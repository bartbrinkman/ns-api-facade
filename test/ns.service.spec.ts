import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of, throwError } from 'rxjs';
import { NsService } from '../src/ns/ns.service';
import { Station } from '../src/interfaces/station.interface';
import { Track } from '../src/interfaces/route.interface';
import { Vehicle } from '../src/interfaces/vehicle.interface';
import { TrainResponse, TrainInfo } from '../src/interfaces/train.interface';

describe('NsService', () => {
  let service: NsService;
  let httpService: HttpService;
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        'nsApi.baseUrl': 'https://test-api.ns.nl',
        'nsApi.apiKey': 'test-api-key',
      };
      return config[key];
    }),
  };

  const mockHttpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NsService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<NsService>(NsService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getStations', () => {
    const mockStations: Station[] = [
      {
        id: { code: 'UT', type: 'station' },
        name: 'Utrecht Centraal',
        countryCode: 'NL',
        uicCode: '8400621',
        lat: 52.089444,
        lng: 5.109722,
        stationType: 'main',
        hasFacilities: true,
        hasParking: true,
        hasBicycleParking: true,
        hasTaxi: true,
        hasCarRental: true,
        hasLuggageLockers: true,
        hasElevatedPlatform: true,
        hasEscalator: true,
        hasElevator: true,
        hasToilet: true,
      },
    ];

    it('should return stations from API', async () => {
      mockHttpService.get.mockReturnValue(of({ data: { payload: mockStations } }));

      const result = await service.getStations();

      expect(result).toEqual(mockStations);
      expect(mockHttpService.get).toHaveBeenCalledWith(
        'https://test-api.ns.nl/nsapp-stations/v3?countryCodes=nl',
        { headers: { 'Ocp-Apim-Subscription-Key': 'test-api-key' } }
      );
    });

    it('should return cached stations if available', async () => {
      mockHttpService.get.mockReturnValue(of({ data: { payload: mockStations } }));

      // First call to populate cache
      await service.getStations();
      // Second call should use cache
      const result = await service.getStations();

      expect(result).toEqual(mockStations);
      expect(mockHttpService.get).toHaveBeenCalledTimes(1);
    });

    it('should handle API errors', async () => {
      mockHttpService.get.mockReturnValue(throwError(() => new Error('API Error')));

      await expect(service.getStations()).rejects.toThrow('API Error');
    });
  });

  describe('getTracks', () => {
    const mockTracks: Track[] = [
      {
        id: '1',
        name: 'Track 1',
        type: 'main',
        coordinates: [
          { lat: 52.089444, lng: 5.109722 },
          { lat: 52.090000, lng: 5.110000 },
        ],
        stations: [
          { code: 'UT', name: 'Utrecht Centraal' },
          { code: 'ASD', name: 'Amsterdam Centraal' },
        ],
      },
    ];

    it('should return tracks from API', async () => {
      mockHttpService.get.mockReturnValue(of({ data: { payload: mockTracks } }));

      const result = await service.getTracks();

      expect(result).toEqual(mockTracks);
      expect(mockHttpService.get).toHaveBeenCalledWith(
        'https://test-api.ns.nl/Spoorkaart-API/api/v1/spoorkaart',
        { headers: { 'Ocp-Apim-Subscription-Key': 'test-api-key' } }
      );
    });

    it('should return cached tracks if available', async () => {
      mockHttpService.get.mockReturnValue(of({ data: { payload: mockTracks } }));

      await service.getTracks();
      const result = await service.getTracks();

      expect(result).toEqual(mockTracks);
      expect(mockHttpService.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('getStationDetails', () => {
    const mockStations: Station[] = [
      {
        id: { code: 'UT', type: 'station' },
        name: 'Utrecht Centraal',
        countryCode: 'NL',
        uicCode: '8400621',
        lat: 52.089444,
        lng: 5.109722,
        stationType: 'main',
        hasFacilities: true,
        hasParking: true,
        hasBicycleParking: true,
        hasTaxi: true,
        hasCarRental: true,
        hasLuggageLockers: true,
        hasElevatedPlatform: true,
        hasEscalator: true,
        hasElevator: true,
        hasToilet: true,
      },
    ];

    it('should return station details for valid code', async () => {
      mockHttpService.get.mockReturnValue(of({ data: { payload: mockStations } }));

      const result = await service.getStationDetails('UT');

      expect(result).toEqual(mockStations[0]);
    });

    it('should throw error for invalid station code', async () => {
      mockHttpService.get.mockReturnValue(of({ data: { payload: mockStations } }));

      await expect(service.getStationDetails('INVALID')).rejects.toThrow('Station with code INVALID not found');
    });
  });

  describe('getVehicles', () => {
    const mockVehicles: Vehicle[] = [
      {
        id: '1',
        type: 'train',
        name: 'Train 1',
        number: '1234',
        status: 'active',
        location: { lat: 52.089444, lng: 5.109722 },
      },
    ];

    it('should return vehicles from API', async () => {
      mockHttpService.get.mockReturnValue(of({ data: { payload: mockVehicles } }));

      const result = await service.getVehicles();

      expect(result).toEqual(mockVehicles);
      expect(mockHttpService.get).toHaveBeenCalledWith(
        'https://test-api.ns.nl/virtual-train-api/vehicle',
        { headers: { 'Ocp-Apim-Subscription-Key': 'test-api-key' } }
      );
    });

    it('should return cached vehicles if available', async () => {
      mockHttpService.get.mockReturnValue(of({ data: { payload: mockVehicles } }));

      await service.getVehicles();
      const result = await service.getVehicles();

      expect(result).toEqual(mockVehicles);
      expect(mockHttpService.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTrains', () => {
    const mockTrainResponse: TrainResponse = {
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

    it('should return trains from API', async () => {
      mockHttpService.get.mockReturnValue(of({ data: mockTrainResponse }));

      const result = await service.getTrains();

      expect(result).toEqual(mockTrainResponse);
      expect(mockHttpService.get).toHaveBeenCalledWith(
        'https://test-api.ns.nl/virtual-train-api/v1/trein',
        { headers: { 'Ocp-Apim-Subscription-Key': 'test-api-key' } }
      );
    });

    it('should return cached trains if available', async () => {
      mockHttpService.get.mockReturnValue(of({ data: mockTrainResponse }));

      await service.getTrains();
      const result = await service.getTrains();

      expect(result).toEqual(mockTrainResponse);
      expect(mockHttpService.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('configuration', () => {
    it('should use default baseUrl if not configured', async () => {
      mockConfigService.get.mockReturnValue(undefined);
      const service = new NsService(mockHttpService as any, mockConfigService as any);

      expect(service['baseUrl']).toBe('https://gateway.apiportal.ns.nl');
    });

    it('should use default apiKey if not configured', async () => {
      mockConfigService.get.mockReturnValue(undefined);
      const service = new NsService(mockHttpService as any, mockConfigService as any);

      expect(service['apiKey']).toBe('');
    });
  });
}); 