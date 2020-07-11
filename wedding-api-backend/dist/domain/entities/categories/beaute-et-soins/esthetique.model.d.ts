import { BeauteEtSoins, BeauteEtSoinsCriteres } from './beauteEtSoins.model';
export declare class Esthetique extends BeauteEtSoins {
    criteres: EsthetiqueCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface EsthetiqueCriteres extends BeauteEtSoinsCriteres {
    tarif_horaire: number;
    conseilsPersonnalises: boolean;
    conseilsPersonnalisesDuree: number;
    conseilsPersonnalisesTarif: number;
    essais: boolean;
    essaisNombre: number;
    essaisTarif: number;
    manucureEtpedicure: {
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
    epilation: {
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
