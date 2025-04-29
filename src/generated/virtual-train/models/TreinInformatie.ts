/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PerronVoorziening } from './PerronVoorziening';
import type { TreinDeel } from './TreinDeel';
import type { TreinDrukte } from './TreinDrukte';
export type TreinInformatie = {
    crowdInfoResponse?: string;
    crowdInfoRequest?: string;
    bron?: 'DVS' | 'KV6' | 'OBIS' | 'DAGPLAN' | 'NMBS';
    ritnummer?: number;
    station?: string;
    type?: string;
    vervoerder?: string;
    spoor?: string;
    materieeldelen?: Array<TreinDeel>;
    geplandeMaterieeldelen?: Array<TreinDeel>;
    lengte?: number;
    lengteInMeters?: number;
    lengteInPixels?: number;
    geplandeLengte?: number;
    perronVoorzieningen?: Array<PerronVoorziening>;
    bakbord?: number;
    rijrichting?: 'LINKS' | 'RECHTS';
    drukteVoorspelling?: TreinDrukte;
    treinDelen?: Array<TreinDeel>;
};

