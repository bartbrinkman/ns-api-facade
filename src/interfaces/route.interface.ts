export interface Track {
  id: string;
  name: string;
  type: string;
  coordinates: {
    lat: number;
    lng: number;
  }[];
  stations: {
    code: string;
    name: string;
  }[];
} 