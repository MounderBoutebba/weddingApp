import { BookingInterface } from '../metier/models/PhotographeVideasteBookingInterface';
import { FeeType } from '../../../infrastructure/databases/entities';
export declare abstract class CreateBookingDto {
    userId: string;
    location: {
        address: string;
        geo: {
            lat: number;
            lon: number;
        };
    };
    categories: string[];
    start: Date;
    end: Date;
    order: OrderInterface;
}
export interface OrderInterface {
    guestsNumber: number;
    bookingObj: BookingInterface;
}
export interface OptionObject {
    name: string;
    description: string;
    optionRate: number;
    feeType: FeeType;
    exemplaire: number;
}
