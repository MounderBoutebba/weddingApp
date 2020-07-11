import { Categorie, Critere } from '../categorie.model';
export declare class Reception implements Categorie {
    criteres: ReceptionCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface ReceptionCriteres extends Critere {
}
