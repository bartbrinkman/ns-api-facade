export interface TrainInfo {
  id: string;
  type: string;
  number: string;
  status: string;
  location: {
    lat: number;
    lng: number;
  };
  route: {
    from: string;
    to: string;
  };
  delay: number;
  platform: string;
}

export interface TrainResponse {
  trains: TrainInfo[];
  timestamp: string;
} 