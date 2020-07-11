import { BeauteEtSoins, BeauteEtSoinsCriteres } from './beauteEtSoins.model';
export declare class Soins extends BeauteEtSoins {
    criteres: SoinsCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface SoinsCriteres extends BeauteEtSoinsCriteres {
    tarif_horaire: number;
    conseilsPersonnalises: boolean;
    conseilsPersonnalisesDuree: number;
    conseilsPersonnalisesTarif: number;
    essais: boolean;
    essaisNombre: number;
    essaisTarif: number;
    soins: {
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
    massage: {
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
    sexPraticien: string[];
}
