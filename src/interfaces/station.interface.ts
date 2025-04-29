export interface Station {
  id: {
    code: string;
    type: string;
  };
  name: string;
  countryCode: string;
  uicCode: string;
  lat: number;
  lng: number;
  stationType: string;
  hasFacilities: boolean;
  hasParking: boolean;
  hasBicycleParking: boolean;
  hasTaxi: boolean;
  hasCarRental: boolean;
  hasLuggageLockers: boolean;
  hasElevatedPlatform: boolean;
  hasEscalator: boolean;
  hasElevator: boolean;
  hasToilet: boolean;
} 