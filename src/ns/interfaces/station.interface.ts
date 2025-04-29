export interface Station {
  code: string;
  namen: {
    lang: string;
    middel: string;
    kort: string;
  };
  land: string;
  lat: number;
  lng: number;
  sporen: {
    spoorNummer: string;
    spoorType: string;
  }[];
} 