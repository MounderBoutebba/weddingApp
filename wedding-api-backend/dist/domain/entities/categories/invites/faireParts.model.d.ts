import { Invites, InvitesCriteres } from './invites.model';
export declare class FaireParts implements Invites {
    criteres: FairePartsCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface FairePartsCriteres extends InvitesCriteres {
    delaisDeRealisation: number;
    tarif_horaire: number;
    commandeMin: number;
    finitionsProposes: {
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
    colories: string[];
    dorures: {
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
    livraison: boolean;
    livraisonInclusDansPrix: boolean;
    livraisonTarif: number;
}
