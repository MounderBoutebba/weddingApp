import { BeauteEtSoins, BeauteEtSoinsCriteres } from './beauteEtSoins.model';
export declare class CoiffureMariage implements BeauteEtSoins {
    criteres: CoiffureMariageCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface CoiffureMariageCriteres extends BeauteEtSoinsCriteres {
    tarif_horaire: number;
    coiffureNombre: number;
    conseilsPersonnalises: boolean;
    conseilsPersonnalisesDuree: number;
    conseilsPersonnalisesTarif: number;
    essais: boolean;
    essaisNombre: number;
    essaisTarif: number;
    majorationTypeCheveux: {
        type: string;
        value: boolean;
        options: {
            name: string;
            majoration: number;
            label: string;
        }[];
    };
    produitsEtAccessoires: {
        type: string;
        value: boolean;
        options: {
            name: string;
            tarif: number;
            label: string;
            checked: boolean;
            field: string;
            search: string;
        }[];
    };
    prestationInvitesProches: {
        type: string;
        value: boolean;
        capacite: number;
        prestations: {
            name: string;
            search: string;
            field: string;
            options: {
                name: string;
                tarif: number;
            }[];
        }[];
    };
    lieuRealisation: string[];
}
