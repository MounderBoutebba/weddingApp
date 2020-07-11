import { Categorie, Critere } from '../categorie.model';
export declare class Coach implements Categorie {
    criteres: CoachCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface CoachCriteres extends Critere {
}
