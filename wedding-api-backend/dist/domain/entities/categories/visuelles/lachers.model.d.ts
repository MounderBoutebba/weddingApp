import { Categorie, Critere } from '../categorie.model';
export declare class Lachers implements Categorie {
    criteres: LachersCriteres;
    label: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
    userid: string;
}
export interface LachersCriteres extends Critere {
    tarif_horaire: number;
    dureeMin: number;
    lachers: {
        type: string;
        options: Array<{
            field?: string;
            search?: string;
            value: boolean;
            name: string;
            label: string;
            tarif: number;
        }>;
    };
    complements: {
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
    autorisation: boolean;
    autorisationRequired: boolean;
    lunettesOritectionEnfants: boolean;
    lunettesOritectionEnfantsNumber: number;
}
