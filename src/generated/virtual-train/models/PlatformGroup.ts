/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlatformDirection } from './PlatformDirection';
import type { PlatformItem } from './PlatformItem';
export type PlatformGroup = {
    station?: string;
    platform?: string;
    directionFromLeftToRight?: string;
    platformItems?: Array<PlatformItem>;
    platformDirections?: Record<string, PlatformDirection>;
    perronEinde?: PlatformItem;
    perronBegin?: PlatformItem;
};

