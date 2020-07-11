import { Decoration, DecorationCriteres } from './decoration.model';
export declare class Decorateur implements Decoration {
    criteres: DecorateurCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface DecorateurCriteres extends DecorationCriteres {
    tarif_horaire: number;
    conseilPersonalises: boolean;
    conseilPersonalisesTarif: number;
    decorationAssociees: {
        type: string;
        options: Array<{
            field?: string;
            search?: string;
            value: boolean;
            name: string;
            label: string;
            inclusDansPrix: boolean;
            tarif: number;
        }>;
    };
    livraisonDuMateriel: boolean;
    livraisonDuMaterielInclusDansPrix: boolean;
    livraisonDuMaterielTarif: number;
    montageDemontage: boolean;
    montageDemontageInclusDansPrix: boolean;
    montageDemontageTarif: number;
}
