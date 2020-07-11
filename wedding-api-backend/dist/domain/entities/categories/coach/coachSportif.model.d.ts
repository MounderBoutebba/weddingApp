import { Coach, CoachCriteres } from './coach.model';
export declare class CoachSportif extends Coach {
    criteres: CoachSportifCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface CoachSportifCriteres extends CoachCriteres {
    tarif_horaire: number;
    dureeMin: number;
    lieu: string[];
    elevesSimultane: number;
    typesDeSport: string[];
    AgrementServiceALaPersonne: boolean;
    conseilsPersonnalises: boolean;
    conseilsPersonnalisesTarif: number;
    essais: boolean;
    essaisTarif: number;
    servicesAssocies: {
        type: string;
        options: Array<{
            field?: string;
            search?: string;
            value: boolean;
            name: string;
            label: string;
            inclusDansPrix: boolean;
            tarif: number;
        }>;
    };
}
