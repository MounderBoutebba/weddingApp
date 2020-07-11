import { Categorie, Critere } from '../categorie.model';
export declare class AnimateurAdultes implements Categorie {
    criteres: AdultesCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface AdultesCriteres extends Critere {
    typeDeService: string;
    tarif_horaire: number;
    dureeDeReservation: number;
}
