import { Categorie, Critere } from '../categorie.model';
export declare class AnimateurEnfants implements Categorie {
    criteres: EnfantsCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface EnfantsCriteres extends Critere {
    tranchesAge: string[];
    tarif_horaire: number;
    dureeDeReservation: number;
    nombreEnfantsParIntervenant: number;
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
}
