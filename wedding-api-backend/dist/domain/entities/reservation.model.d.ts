import { CompanyEntity } from 'src/infrastructure/databases/entities';
export interface Reservation {
    id: string;
    clientId: string;
    companyId: string;
    reservationsStatus: ReservationStatus;
    paymentType?: PaymentType;
    characteristic: string;
    bookingDate?: string;
    company: CompanyEntity;
    start: number;
    end: number;
    totalPrice: number;
    criteres: any;
}
export declare enum ReservationStatus {
    RESERVATION_REQUEST = "reservation_request",
    VALIDATED_BY_MARIAGESEREIN = "validated_by_mariageserein",
    REFUSED_BY_MARIAGESEREIN = "refused_by_mariageserein",
    ARCHIVED_BY_MARIAGESEREIN = "archived_by_mariageserein",
    VALIDATED_BY_PROVIDER = "validated_by_provider",
    REFUSED_BY_PROVIDER = "refused_by_provider",
    CANCELED_REQUEST_BY_PROVIDER = "canceled_request_by_provider",
    CANCELED_RESERVATION_BY_PROVIDER = "canceled_reservation_by_provider",
    VALIDATED_BY_CLIENT = "validated_by_client",
    REFUSED_BY_CLIENT = "refused_by_client",
    CANCELED_PENDING_BY_CLIENT = "canceled_pending_by_client",
    CANCELED_REQUEST_BY_CLIENT = "canceled_request_by_client",
    CANCELED_RESERVATION_BY_CLIENT = "canceled_reservation_by_client",
    PAYED_BY_CLIENT = "payed_by_client"
}
export declare enum PaymentType {
    CASH = "cash",
    RECURRENCE = "recurrence"
}
