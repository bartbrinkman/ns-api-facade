export interface Vehicle {
  id: string;
  type: string;
  name: string;
  number: string;
  status: string;
  location: {
    lat: number;
    lng: number;
  };
} 