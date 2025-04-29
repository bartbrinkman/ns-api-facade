/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Crs } from './Crs';
import type { GeoJsonObject } from './GeoJsonObject';
export type Feature = {
    crs?: Crs;
    bbox?: Array<number>;
    properties?: Record<string, Record<string, any>>;
    geometry?: GeoJsonObject;
    id?: string;
};

