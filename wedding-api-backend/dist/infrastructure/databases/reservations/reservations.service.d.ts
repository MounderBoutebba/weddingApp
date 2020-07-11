import { ReservationRepository } from './reservation.repository';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { UserCategoriesIndexModel } from '../entities/userCategoriesIndex.model';
import { ReservationEntity } from '../entities/reservation.entity';
import { ReservationsIndexModel } from '../entities/reservationsIndex.model';
import { UpdateBookingDto } from '../../../presentation/booking/dto/updateBooking.dto';
import { BillingServices } from '../company/billing/billing.service';
import { StripeService } from '../../externalInterfaces/stripe/stripe.service';
import { PaiementsRepositoryService } from '../paiements/paiements-repository.service';
import { InvoicesService } from '../invoices/invoices.service';
export declare class ReservationsService {
    private readonly reservationRepository;
    private readonly elasticsearchService;
    private billingServices;
    private readonly externalPaiementsService;
    private readonly paiementsService;
    private readonly invoicesService;
    constructor(reservationRepository: ReservationRepository, elasticsearchService: ElasticsearchService, billingServices: BillingServices, externalPaiementsService: StripeService, paiementsService: PaiementsRepositoryService, invoicesService: InvoicesService);
    getCompany(userId: string): Promise<UserCategoriesIndexModel>;
    createReservation(reservation: ReservationEntity): Promise<ReservationsIndexModel>;
    findReservation(id: string): Promise<ReservationEntity>;
    deleteReservation(reservation: ReservationEntity): Promise<void>;
    validateReservationByClient(order: UpdateBookingDto, id: string): Promise<unknown>;
    updateReservation(order: UpdateBookingDto, id: string): Promise<unknown>;
    private isPaiementReccurenceAccepted;
    private buildInvoices;
    private saveAllFuturesPaiment;
    private monthsDiff;
    private yearsDiff;
    cronMakeExecutesPaiements(): Promise<void>;
    private asyncForEach;
    findES(id: string): Promise<unknown>;
    searchES(query: any, page: number): Promise<{
        data: unknown[];
        total: any;
    }>;
}
