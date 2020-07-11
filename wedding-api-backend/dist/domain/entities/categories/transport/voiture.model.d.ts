import { Transport, TransportCriteres } from './transport.model';
export declare class Voiture implements Transport {
    criteres: VoitureCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface VoitureCriteres extends TransportCriteres {
    tarif_horaire: number;
    voitures: {
        type: string;
        fields: Array<{
            field?: string;
            search?: string;
            value: boolean;
            name: string;
            label: string;
            categorie: string;
            options: Array<{
                name: string;
                value: number;
                step: number;
                unit: string;
            }>;
        }>;
    };
    services: {
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
}
