import { PaymentType, ReservationStatus } from '../../../domain/entities/reservation.model';
export declare abstract class ReservationsIndexModel {
    reservationsStatus: ReservationStatus;
    totalPrice: number;
    guestcount: number;
    location: {
        address: string;
        geo: {
            lat: number;
            lon: number;
        };
    };
    start: Date;
    end: Date;
    bill: BillModel[];
    id: string;
    updatedAt: Date;
    createdAt: Date;
    company: {
        id: string;
        name: string;
    };
    client: {
        id: string;
        name: string;
        email: string;
    };
    orderNumber: number;
    categories: string[];
    paymentType: PaymentType;
    variations: any[];
    additionalFees?: {
        title: string;
        price: number;
    }[];
    discounts?: {
        title: string;
        price: number;
    }[];
    providerConfirmationDate: Date;
}
export interface BillModel {
    option: string;
    qte: number;
    total: number;
    qteUnit?: string;
    categorie: string;
}
export declare enum VariationTypes {
    WEEKEND_PERIODE = "weekend periode",
    WEEKEND = "weekend",
    WEEK_PERIODE = "week periode"
}
