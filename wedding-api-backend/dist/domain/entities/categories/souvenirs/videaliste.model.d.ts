import { Souvernirs, SouvernirsCriteres } from './souvernirs.model';
export declare class Videaliste implements Souvernirs {
    criteres: VidealisteCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface VidealisteCriteres extends SouvernirsCriteres {
    styleDeVideo: string[];
    appareilsVideo: string[];
    objectifsVideo: string[];
    accessoiresVideo: string[];
    tarif_horaire: number;
    dureeDeReservationMinimum: number;
    duoVideo: boolean;
    duoVideoTarif: number;
    delaisDeLivraisonJours: number;
    livraisonExpress: boolean;
    livraisonExpressTarif: number;
    bandeAnnonce: boolean;
    bandeAnnonceTarif: number;
    filmCourt: boolean;
    filmCourtTarif: number;
    filmLong: boolean;
    filmLongTarif: number;
    courtMetrage: boolean;
    courtMetrageTarif: number;
    videoAerienne: boolean;
    videoAerienneTarif: number;
    etalonnageVideo: boolean;
    etalonnageVideoTarif: number;
    remise: boolean;
    remiseFormats: Array<{
        name: string;
        tarifUnitaire: number;
    }>;
    livraisonOriginauxHauteResolution: boolean;
    livraisonOriginauxHauteResolutionTarif: number;
}
