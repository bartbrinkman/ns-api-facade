/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MaterieelDeel } from './MaterieelDeel';
export type Trein = {
    ritId?: string;
    lat?: number;
    lng?: number;
    snelheid?: number;
    richting?: number;
    horizontaleNauwkeurigheid?: number;
    type?: string;
    materieelDeelList?: Array<MaterieelDeel>;
    treinCloneWithMaterieel?: Trein;
};

