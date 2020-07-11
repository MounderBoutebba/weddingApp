import { IsArray, IsDate, IsNotEmptyObject, IsUUID } from 'class-validator';
import { BookingInterface } from '../metier/models/PhotographeVideasteBookingInterface';
import { FeeType } from '../../../infrastructure/databases/entities';

export abstract class CreateBookingDto {

	@IsUUID()
	public userId: string;

	@IsNotEmptyObject()
	public location: { address: string, geo: { lat: number, lon: number } };

	@IsArray()
	public categories: string[];

	@IsDate()
	public start: Date;

	@IsDate()
	public end: Date;

	@IsNotEmptyObject()
	order: OrderInterface;
}

export interface OrderInterface {
	guestsNumber: number,
	bookingObj: BookingInterface
}


export interface OptionObject {
	name: string,
	description: string,
	optionRate: number,
	feeType: FeeType,
	exemplaire: number
}
