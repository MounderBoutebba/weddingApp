import { CompanyEntity } from 'src/infrastructure/databases/entities';

export interface Reservation {
	id: string;
	clientId: string;
	companyId: string;
	reservationsStatus: ReservationStatus;
	paymentType?: PaymentType;
	characteristic: string/*Categorie*/;
	bookingDate?: string;
	company: CompanyEntity;
	start: number;
	end: number;
	totalPrice: number;
	criteres: any ;
}

export enum ReservationStatus {
	RESERVATION_REQUEST = 'reservation_request',

	VALIDATED_BY_MARIAGESEREIN = 'validated_by_mariageserein', // admin
	REFUSED_BY_MARIAGESEREIN = 'refused_by_mariageserein', // admin
	ARCHIVED_BY_MARIAGESEREIN = 'archived_by_mariageserein', // admin

	VALIDATED_BY_PROVIDER = 'validated_by_provider', // provider
	REFUSED_BY_PROVIDER = 'refused_by_provider', // provider
	CANCELED_REQUEST_BY_PROVIDER = 'canceled_request_by_provider', // provider
	CANCELED_RESERVATION_BY_PROVIDER = 'canceled_reservation_by_provider', // provider

	VALIDATED_BY_CLIENT = 'validated_by_client', // client
	REFUSED_BY_CLIENT = 'refused_by_client', // client
	CANCELED_PENDING_BY_CLIENT = 'canceled_pending_by_client', // client
	CANCELED_REQUEST_BY_CLIENT = 'canceled_request_by_client', // client
	CANCELED_RESERVATION_BY_CLIENT = 'canceled_reservation_by_client', // client

	PAYED_BY_CLIENT = 'payed_by_client' // client
}
export enum PaymentType {
	CASH = 'cash',
	RECURRENCE = 'recurrence'
}
