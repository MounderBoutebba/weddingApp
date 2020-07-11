import { Categorie, Critere } from '../categorie.model';
export declare class Decoration implements Categorie {
    criteres: DecorationCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface DecorationCriteres extends Critere {
}
