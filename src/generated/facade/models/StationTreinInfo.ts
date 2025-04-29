/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TreinDeel } from './TreinDeel';
export type StationTreinInfo = {
    /**
     * Station code
     */
    stationCode?: string;
    /**
     * Schedule day
     */
    dienstregelingDag?: string;
    /**
     * Departure time
     */
    vertrektijd?: string;
    /**
     * Source of information
     */
    bron?: string;
    /**
     * Train number
     */
    treinnummer?: number;
    /**
     * Train parts
     */
    treindelen?: Array<TreinDeel>;
    /**
     * Track number
     */
    spoor?: string;
};

