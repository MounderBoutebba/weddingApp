import { Categorie, Critere } from '../categorie.model';
export declare class Transport implements Categorie {
    criteres: TransportCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface TransportCriteres extends Critere {
}
