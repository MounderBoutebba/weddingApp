import { IsEnum } from 'class-validator';
import { PaymentType, ReservationStatus } from '../../../domain/entities/reservation.model';

export abstract class UpdateBookingDto {

	@IsEnum(ReservationStatus)
	public reservationsStatus?: ReservationStatus;

	public notifyClientCount?: number;

	public additionalFees?: { title: string; price: number }[];
	public discounts?: { title: string; price: number }[];

	public providerConfirmationDate?: Date;

	@IsEnum(PaymentType)
	public paymentType?: PaymentType;

	public loyer?: number;
	public nombreDeMois?: number;
	public remunerationProvider?: number;
}
