import { Categorie, Critere } from '../categorie.model';
export declare class Souvernirs implements Categorie {
    criteres: SouvernirsCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface SouvernirsCriteres extends Critere {
}
