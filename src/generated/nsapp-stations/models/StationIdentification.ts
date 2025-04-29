/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StationIdentification = {
    /**
     * Short UIC code for this station
     */
    uicCode: string;
    /**
     * Long UIC code for this station, if present
     */
    uicCdCode?: string;
    /**
     * EuroEVA code for this station, if present
     */
    evaCode?: string;
    /**
     * Short code that is used for price computations (MRP)
     */
    cdCode?: number;
    /**
     * Short station code (e.g. UT for Utrecht Centraal)
     */
    code?: string;
};

