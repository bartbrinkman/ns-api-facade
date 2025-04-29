export interface Route {
  ritId: string;
  treinNummer: string;
  vertrekTijd: string;
  aankomstTijd: string;
  vertrekStation: string;
  aankomstStation: string;
  stops: {
    station: string;
    aankomstTijd: string;
    vertrekTijd: string;
    spoor: string;
  }[];
  status: string;
  vertraging: number;
} 