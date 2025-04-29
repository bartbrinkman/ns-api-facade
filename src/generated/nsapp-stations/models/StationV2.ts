/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NearbyMeLocationId } from './NearbyMeLocationId';
import type { StationsNamen } from './StationsNamen';
import type { StationTypeV2 } from './StationTypeV2';
import type { Track } from './Track';
export type StationV2 = {
    UICCode: string;
    UICCdCode?: string;
    stationType: StationTypeV2;
    EVACode?: string;
    cdCode?: number;
    code?: string;
    sporen: Array<Track>;
    synoniemen: Array<string>;
    heeftFaciliteiten: boolean;
    heeftVertrektijden: boolean;
    heeftReisassistentie: boolean;
    namen?: StationsNamen;
    land?: string;
    lat?: number;
    lng?: number;
    radius?: number;
    naderenRadius?: number;
    distance?: number;
    ingangsDatum?: string;
    eindDatum?: string;
    nearbyMeLocationId?: NearbyMeLocationId;
};

