import { Decoration, DecorationCriteres } from './decoration.model';
export declare class Fleuriste implements Decoration {
    criteres: FleuristeCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface FleuristeCriteres extends DecorationCriteres {
    tarif_horaire: number;
    quantiteCommande: number;
    fleurs: {
        type: string;
        value: boolean;
        options: {
            name: string;
            tarif: number;
            label: string;
            checked: boolean;
            field: string;
            search: string;
        }[];
    };
    feuillages: {
        type: string;
        value: boolean;
        options: {
            name: string;
            tarif: number;
            label: string;
            checked: boolean;
            field: string;
            search: string;
        }[];
    };
    decoration: {
        type: string;
        value: boolean;
        options: {
            name: string;
            tarif: number;
            label: string;
            checked: boolean;
            field: string;
            search: string;
        }[];
    };
    livraison: boolean;
    livraisonInclusDansPrix: boolean;
    livraisonTarif: number;
}
