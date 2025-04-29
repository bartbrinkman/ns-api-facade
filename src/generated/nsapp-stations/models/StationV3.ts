/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Coordinate } from './Coordinate';
import type { NearbyMeLocationId } from './NearbyMeLocationId';
import type { StationIdentification } from './StationIdentification';
import type { StationNames } from './StationNames';
import type { StationTypeV3 } from './StationTypeV3';
export type StationV3 = {
    id: StationIdentification;
    stationType: StationTypeV3;
    names: StationNames;
    location?: Coordinate;
    /**
     * List of tracks known to this station
     */
    tracks: Array<string>;
    /**
     * Indicates whether this station has known facilities
     */
    hasKnownFacilities: boolean;
    /**
     * Indicates whether this station is available for accessible travel (i.e. has travel assistance or tracks that are independently accessible)
     */
    availableForAccessibleTravel: boolean;
    /**
     * Indicates that NSRA (NS Reisassistentie) is available at this station
     */
    hasTravelAssistance: boolean;
    /**
     * Indicates that the tracks at this station are accessible without assistance. Please note that when the train itself is not accessible without assistance, the traveller still needs assistance.
     */
    areTracksIndependentlyAccessible: boolean;
    /**
     * Indicates whether this station is only used to mark a border between two countries
     */
    isBorderStop: boolean;
    /**
     * Country that this station is in
     */
    country: string;
    /**
     * Radius around the exact location of the station where a someone is considered to be at the station
     */
    radius?: number;
    /**
     * Radius around a station where a train is considered to be approaching the station
     */
    approachingRadius?: number;
    /**
     * Distance in meters to a requested coordinate (latitude, longitude)
     */
    distance?: number;
    /**
     * Start date for this station (ISO Format). If not set, the date is unknown and the station is supposed to be opened
     */
    startDate?: string;
    /**
     * End date for this station (ISO Format). If not set, the date is unknown and the station is supposed to be opened.
     */
    endDate?: string;
    nearbyMeLocationId?: NearbyMeLocationId;
};

