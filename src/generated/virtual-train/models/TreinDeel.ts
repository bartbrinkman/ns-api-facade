/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Bak } from './Bak';
import type { ImageData } from './ImageData';
import type { ZitplaatsInformatie } from './ZitplaatsInformatie';
export type TreinDeel = {
    materieelType?: 'DDZ_4' | 'DDZ_6' | 'DDZ_4SA' | 'SGMM_2' | 'SGMM_3' | 'SNG_3' | 'SNG_4' | 'SLT_4' | 'SLT_4E' | 'SLT_4ES' | 'SLT_6' | 'SLT_6E' | 'SLT_6ES' | 'SLT_6S' | 'FLIRT_2' | 'FLIRT_2_ARR' | 'FLIRT_3_ARR' | 'FLIRT_2_RNET' | 'FLIRT_3' | 'FLIRT_3_NS' | 'FLIRT_3_FFF' | 'FLIRT_3_BLAUWNET' | 'FLIRT_3_KEOLIS' | 'FLIRT_4' | 'FLIRT_4_NS' | 'FLIRT_4_FFF' | 'FLIRT_4_SY' | 'FLIRT_4_KEOLIS' | 'FLIRT_ABELLIO' | 'FLIRT_CONNEXXION' | 'FLIRT_4_VL' | 'FLIRT_5_VL' | 'FLIRT_5_HGL' | 'VIRM_4' | 'VIRMm1_4' | 'VIRMm2_4' | 'VIRM_6' | 'VIRMm1_6' | 'VIRMm2_6' | 'DB_REGIO_643' | 'DB_BPMZ' | 'DB_BER9_9' | 'DB_AVMZ' | 'DB_B15' | 'OEBB_BMZ' | 'MS80M3' | 'MS75_4' | 'DDM1_4DDM' | 'ICR_GV1_9_B10' | 'ICR_GV2_9_B10' | 'ICR_BNL_6_B10' | 'ICR_BNN_6_B10' | 'ICR_HSL_6_B10' | 'ICR_7' | 'SW6_25KV_2_6' | 'SW7_25KV_2_7' | 'SW9_25KV_2_9' | 'ELOC_1700' | 'ELOC_TR25' | 'ELOC_TRBE' | 'ELOC_TRAX' | 'CPROTOS_2' | 'DM90_2' | 'DDAR_3' | 'EUROSTAR' | 'THALYS' | 'TGV_PB' | 'ICE' | 'ICE_3' | 'ICE_3NEO' | 'MAT64' | 'GTW26' | 'GTWE26' | 'GTW28' | 'GTWE28' | 'GTWE26_VECHTDAL' | 'GTWE28_VETCHDAL' | 'GTW26_LIMBURG' | 'GTW28_LIMBURG' | 'GTWE26_LIMBURG' | 'GTWE28_LIMBURG' | 'GTW26_ARRIVA' | 'GTW28_ARRIVA' | 'GTW26_NOORD' | 'GTW28_NOORD' | 'GTWE26_ARRIVA' | 'GTWE28_ARRIVA' | 'GTW26_VEOLIA' | 'GTW28_VEOLIA' | 'GTWE26_VEOLIA' | 'GTWE28_VEOLIA' | 'GTW8_BRENG' | 'GTW26_QBUZZ' | 'GTWE28_QBUZZ' | 'LINT2' | 'LINT2_ARRIVA' | 'LINT2_VEOLIA' | 'LINT2_SYNTUS' | 'LINT2_KEOLIS' | 'ICM3' | 'ICM4' | 'ICNG5' | 'ICNG8' | 'WINK_ARRIVA' | 'UNKNOWN';
    drukteSVGPath?: string;
    materieelnummer?: number;
    type?: string;
    faciliteiten?: Array<'TOILET' | 'STILTE' | 'STROOM' | 'TOEGANKELIJK' | 'FIETS' | 'WIFI' | 'BISTRO'>;
    afbeelding?: string;
    eindbestemming?: string;
    bakken?: Array<Bak>;
    afbeeldingsSpecs?: ImageData;
    zitplaatsInfo?: ZitplaatsInformatie;
};

