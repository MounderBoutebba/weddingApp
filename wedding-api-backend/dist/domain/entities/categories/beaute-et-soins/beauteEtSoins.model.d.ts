import { Categorie, Critere } from '../categorie.model';
export declare class BeauteEtSoins implements Categorie {
    criteres: BeauteEtSoinsCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface BeauteEtSoinsCriteres extends Critere {
}
