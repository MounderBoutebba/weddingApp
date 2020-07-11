import { Categorie, Critere } from '../categorie.model';
export declare class FeuArtifices implements Categorie {
    criteres: FeuArtificesCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface FeuArtificesCriteres extends Critere {
    tarif_horaire: number;
    dureeMin: number;
    effets: {
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
    programmes: {
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
    PersonnalisationPlaylisteMusical: boolean;
}
