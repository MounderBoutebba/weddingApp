import { Coach, CoachCriteres } from './coach.model';
export declare class ChoregrapheMariage implements Coach {
    criteres: ChoregrapheMariageCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface ChoregrapheMariageCriteres extends CoachCriteres {
    tarif_horaire: number;
    dureeMin: number;
    lieu: string[];
    elevesSimultane: number;
    typesDeDances: string[];
    AgrementServiceALaPersonne: boolean;
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
    conseilsPersonnalises: boolean;
    conseilsPersonnalisesTarif: number;
    essais: boolean;
    essaisTarif: number;
}
