import { Reception, ReceptionCriteres } from './reception.model';
export declare class GateauMariage implements Reception {
    criteres: GateauMariageCriteres;
    label: string;
    userid: string;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
}
export interface GateauMariageCriteres extends ReceptionCriteres {
    tarif_horaire: number;
    typesDeCreation: string[];
    gateaux: {
        type: string;
        value: boolean;
        livraison: {
            value: boolean;
            tarif: number;
        };
        options: Array<{
            field?: string;
            search?: string;
            value: boolean;
            name: string;
            label: string;
            opts: Array<{
                name: string;
                value: number;
                step: number;
                unit: string;
            }>;
        }>;
    };
}
