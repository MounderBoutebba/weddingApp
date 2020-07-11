import { PaymentType, ReservationStatus } from '../../../domain/entities/reservation.model';
import { CompanyEntity } from './company.entity';
import { ClientEntity } from './user.entity';
import { OrderInterface } from '../../../presentation/booking/dto/createBooking.dto';
import { BillModel } from './reservationsIndex.model';
import { CommentsEntity } from './comments.entity';
import { InvoiceEntity } from './invoice.entity';
export declare class ReservationEntity {
    id: string;
    orderNumber: number;
    updatedAt: Date;
    createdAt: Date;
    providerConfirmationDate: Date;
    clientConfirmationDate: Date;
    notifyClientCount: number;
    reservationsStatus: ReservationStatus;
    company: CompanyEntity;
    client: ClientEntity;
    comment: CommentsEntity;
    invoices: InvoiceEntity[];
    paymentType: PaymentType;
    start: Date;
    end: Date;
    totalPrice: number;
    finalPrice: number;
    allPrice: number;
    guestcount: number;
    categories: string[];
    additionalFees: {
        title: string;
        price: number;
    }[];
    discounts: {
        title: string;
        price: number;
    }[];
    loyer: number;
    nombreDeMois: number;
    remunerationProvider: number;
    order: OrderInterface;
    bill: BillModel[];
    variations: any[];
    location: {
        address: string;
        geo: {
            lat: number;
            lon: number;
        };
    };
}
