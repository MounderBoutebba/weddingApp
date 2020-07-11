import { Categorie, Critere } from '../categorie.model';
export declare class Dj implements Categorie {
    criteres: DjCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface DjCriteres extends Critere {
    specialite: string[];
    instruments: string[];
    nombreIntervenants: number;
    typePublic: string;
    adaptabiliteLieu: string;
    tarif_horaire: number;
    dureeReservationMin: number;
    animations: {
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
    materiels: {
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
}
