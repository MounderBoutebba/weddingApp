import { Transport, TransportCriteres } from './transport.model';
export declare class Bus implements Transport {
    criteres: BusCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface BusCriteres extends TransportCriteres {
    tarif_horaire: number;
    bus: {
        type: string;
        fields: Array<{
            field?: string;
            search?: string;
            value: boolean;
            name: string;
            label: string;
            categorie: string;
            nbrPlace: number;
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
