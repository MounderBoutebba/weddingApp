import { Reception, ReceptionCriteres } from './reception.model';
export declare class Traiteur implements Reception {
    criteres: TraiteurCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface TraiteurCriteres extends ReceptionCriteres {
    tarif_horaire: number;
    specialiteCuisine: string[];
    niveauElaboration: string;
    specificiteReligieuses: string;
    vinHonneurCocktailBuffet: {
        type: string;
        value: boolean;
        quantity: number;
        products: {
            name: string;
            options: {
                field?: string;
                search?: string;
                value: boolean;
                name: string;
                label: string;
                tarif: number;
            }[];
        }[];
    };
    Dinner: {
        type: string;
        value: boolean;
        dinerCapacite: number;
        convivesMin: number;
        products: {
            name: string;
            options: {
                field?: string;
                search?: string;
                value: boolean;
                name: string;
                label: string;
                tarif: number;
            }[];
        }[];
    };
    droitDeBouchon: boolean;
    sansDroitDeBouchon: boolean;
    droitDeBouchonTarif: number;
    boissonsAlcoolises: {
        type: string;
        options: {
            field?: string;
            search?: string;
            value: boolean;
            name: string;
            label: string;
            tarif: number;
        }[];
    };
    boissonsNonAlcoolises: {
        type: string;
        options: {
            field?: string;
            search?: string;
            value: boolean;
            name: string;
            label: string;
            tarif: number;
        }[];
    };
    serviceEnSalle: boolean;
    serviceEnSalleTarif: number;
    serviceDebarrassageEtNettoyage: boolean;
    serviceDebarrassageEtNettoyageTarif: number;
    boissonAlcooliseeEtNonAlcoolise: boolean;
}
