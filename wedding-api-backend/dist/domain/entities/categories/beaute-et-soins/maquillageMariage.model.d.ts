import { BeauteEtSoins, BeauteEtSoinsCriteres } from './beauteEtSoins.model';
export declare class MaquillageMariage extends BeauteEtSoins {
    criteres: MaquillageMariageCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface MaquillageMariageCriteres extends BeauteEtSoinsCriteres {
    tarif_horaire: number;
    conseilsPersonnalises: boolean;
    conseilsPersonnalisesDuree: number;
    conseilsPersonnalisesTarif: number;
    essais: boolean;
    essaisNombre: number;
    essaisTarif: number;
    majorationTypeDePeau: {
        type: string;
        value: boolean;
        options: {
            name: string;
            majoration: number;
            label: string;
        }[];
    };
    produits: {
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
    maquillageNombre: number;
    lieuRealisation: string[];
}
