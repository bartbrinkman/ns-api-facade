import { StationV3 } from '../../src/generated/nsapp-stations/models/StationV3';
import { Feature } from '../../src/generated/spoorkaart/models/Feature';
import { Trein } from '../../src/generated/virtual-train/models/Trein';
import { TrainResponse } from '../../src/generated/facade/models/TrainResponse';
import { StationIdentification } from '../../src/generated/nsapp-stations/models/StationIdentification';
import { StationNames } from '../../src/generated/nsapp-stations/models/StationNames';
import { StationTypeV3 } from '../../src/generated/nsapp-stations/models/StationTypeV3';
import { Coordinate } from '../../src/generated/nsapp-stations/models/Coordinate';
import { GeoJsonObject } from '../../src/generated/spoorkaart/models/GeoJsonObject';
import { StationTreinInfo } from '../../src/generated/facade/models/StationTreinInfo';

export const mockStation: StationV3 = {
  id: {
    uicCode: '8400621',
    code: 'UT',
  } as StationIdentification,
  stationType: 'STATION' as StationTypeV3,
  names: {
    short: 'Utrecht Centraal',
    medium: 'Utrecht Centraal',
    long: 'Utrecht Centraal',
  } as StationNames,
  location: {
    lat: 52.089444,
    lng: 5.109722,
  } as Coordinate,
  tracks: ['1', '2'],
  hasKnownFacilities: true,
  availableForAccessibleTravel: true,
  hasTravelAssistance: true,
  areTracksIndependentlyAccessible: true,
  isBorderStop: false,
  country: 'NL',
};

export const mockTrack: Feature = {
  id: '1',
  geometry: {
    type: 'LineString',
  } as GeoJsonObject,
  properties: {
    track: {
      id: '1',
      name: 'Track 1',
      type: 'main',
      stations: [
        { code: 'UT', name: 'Utrecht Centraal' },
        { code: 'ASD', name: 'Amsterdam Centraal' },
      ],
    },
  },
};

export const mockVehicle: Trein = {
  ritId: '1',
  type: 'train',
  lat: 52.089444,
  lng: 5.109722,
  snelheid: 0,
  richting: 0,
  horizontaleNauwkeurigheid: 0,
  materieelDeelList: [],
};

export const mockTrainResponse: TrainResponse = {
  '121': {
    'ASD': {
      stationCode: 'ASD',
      dienstregelingDag: '2025-04-29',
      vertrektijd: '2025-04-29T04:38:00',
      bron: 'DVS',
      treinnummer: 121,
      treindelen: [
        {
          materieelNummer: 8016,
          type: 'ICE-3NEO',
          vervoerder: 'NS Int',
          lengteInMeters: 20000,
        },
      ],
      spoor: '7b',
    } as StationTreinInfo,
  },
}; 