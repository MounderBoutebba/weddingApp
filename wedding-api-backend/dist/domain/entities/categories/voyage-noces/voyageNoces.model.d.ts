import { Categorie, Critere } from '../categorie.model';
export declare class VoyageNoces implements Categorie {
    criteres: VoyageNocesCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface VoyageNocesCriteres extends Critere {
    tarif_horaire: number;
    zoneGeo: string;
    situationGeo: string;
    classificationHoteliere: number;
    enfants: boolean;
    animaux: boolean;
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
    typeDeTarification: {
        type: string;
        tarifs: Array<{
            label: string;
            step: number;
            value: number;
            unit: string;
        }>;
    };
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
    activites: {
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
