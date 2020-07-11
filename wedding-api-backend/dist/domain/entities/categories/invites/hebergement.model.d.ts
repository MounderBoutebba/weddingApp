import { Invites, InvitesCriteres } from './invites.model';
export declare class Hebergement implements Invites {
    criteres: HebergementCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface HebergementCriteres extends InvitesCriteres {
    tarif_horaire: number;
    typeHebergement: string;
    typeDeTarification: {
        type: string;
        tarifs: Array<{
            label: string;
            step: number;
            value: number;
            unit: string;
        }>;
    };
    equipements: {
        type: string;
        options: Array<{
            field?: string;
            search?: string;
            value: boolean;
            name: string;
            label: string;
        }>;
    };
    parking: boolean;
    nombreDeChambre: number;
    services: {
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
