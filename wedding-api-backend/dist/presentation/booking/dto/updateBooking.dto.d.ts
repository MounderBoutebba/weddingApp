import { PaymentType, ReservationStatus } from '../../../domain/entities/reservation.model';
export declare abstract class UpdateBookingDto {
    reservationsStatus?: ReservationStatus;
    notifyClientCount?: number;
    additionalFees?: {
        title: string;
        price: number;
    }[];
    discounts?: {
        title: string;
        price: number;
    }[];
    providerConfirmationDate?: Date;
    paymentType?: PaymentType;
    loyer?: number;
    nombreDeMois?: number;
    remunerationProvider?: number;
}
