import { Coach, CoachCriteres } from './coach.model';
export declare class OfficiantCeremonie extends Coach {
    criteres: OfficiantCeremonieCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface OfficiantCeremonieCriteres extends CoachCriteres {
    tarif_horaire: number;
    dureeMin: number;
    lieu: string[];
    conseilsPersonnalises: boolean;
    conseilsPersonnalisesTarif: number;
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
