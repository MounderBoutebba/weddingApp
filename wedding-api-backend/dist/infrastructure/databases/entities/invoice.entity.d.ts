import { TypeExecution, InvoiceStatus } from '../../../domain/entities/invoice.model';
import { ReservationEntity } from './reservation.entity';
export declare class InvoiceEntity {
    id: string;
    montant: number;
    dateExecution: Date;
    typeExecution: TypeExecution;
    stripePaymentIntentId: string;
    status: InvoiceStatus;
    reservation: ReservationEntity;
}
