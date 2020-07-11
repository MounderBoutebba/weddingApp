import { Souvernirs, SouvernirsCriteres } from './souvernirs.model';
export declare class Photographe implements Souvernirs {
    criteres: PhotographeCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface PhotographeCriteres extends SouvernirsCriteres {
    styleDePhoto: string[];
    techniqueUtilisees: string[];
    appareils: string[];
    objectifs: string[];
    accessoires: string[];
    tarif_horaire: number;
    dureeDeReservationMinimum: number;
    duoPhoto: boolean;
    duoPhotoTarif: number;
    delaisDeLivraisonJours: number;
    livraisonExpress: boolean;
    livraisonExpressTarif: number;
    seanceEngagement: boolean;
    seanceEngagementDureeMinimum: number;
    seanceEngagementDureeMinimumTarifHoraire: number;
    seanceBrunchOuDejeuner: boolean;
    seanceBrunchOuDejeunerDureeMinimum: number;
    seanceBrunchOuDejeunerDureeMinimumTarifHoraire: number;
    seanceApresMariage: boolean;
    seanceApresMariageDureeMinimum: number;
    seanceApresMariageDureeMinimumTarifHoraire: number;
    photomaton: boolean;
    photomatonTarifUnique: number;
    photocall: boolean;
    photocallTraifUnique: number;
    creationAlbum: {
        type: string;
        value: boolean;
        finitions: string[];
        formats: Array<{
            field?: string;
            search?: string;
            name: string;
            value: boolean;
            modeles: Array<{
                name: string;
                tarif: number;
                checked: boolean;
            }>;
        }>;
    };
    tiragePapier: {
        type: string;
        value: boolean;
        finitions: string[];
        formats: Array<{
            field?: string;
            search?: string;
            name: string;
            value: boolean;
            modeles: Array<{
                name: string;
                tarif: number;
            }>;
        }>;
    };
    galeriePrive: boolean;
    galeriePriveTarif: number;
    retouchesPhoto: boolean;
    retouchesPhotoFormats: Array<{
        name: string;
        tarifUnitaire: number;
    }>;
    remise: boolean;
    remiseFormats: Array<{
        name: string;
        tarifUnitaire: number;
    }>;
    livraisonHauteResolution: boolean;
    livraisonHauteResolutionTarif: number;
}
