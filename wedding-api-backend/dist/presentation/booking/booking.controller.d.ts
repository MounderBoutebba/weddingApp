import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/createBooking.dto';
import { UpdateBookingDto } from './dto/updateBooking.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';
import { EmailService } from '../../global/services/mail/email.service';
export declare class BookingController {
    private readonly bookingService;
    private readonly notificationsService;
    private readonly usersService;
    private readonly emailService;
    constructor(bookingService: BookingService, notificationsService: NotificationsService, usersService: UsersService, emailService: EmailService);
    addNewBooking(order: CreateBookingDto, req: any, res: any): Promise<any>;
    getBookings(query: any, page: number, req: any, res: any): Promise<any>;
    getReservationRequestsClient(page: number, req: any): Promise<{
        data: unknown[];
        total: any;
    }>;
    getReservationValidatedByProvider(page: number, req: any): Promise<{
        data: unknown[];
        total: any;
    }>;
    getReservationPayedProvider(page: number, req: any): Promise<{
        data: unknown[];
        total: any;
    }>;
    getReservationRequestsValidatedByProvider(page: number, req: any): Promise<{
        data: unknown[];
        total: any;
    }>;
    getReservationRequestsProvider(page: number, req: any): Promise<{
        data: unknown[];
        total: any;
    }>;
    getReservationRequestsayedByClients(page: number, req: any): Promise<{
        data: unknown[];
        total: any;
    }>;
    getReservationPayedByClients(page: number, req: any): Promise<{
        data: unknown[];
        total: any;
    }>;
    deleteBooking(id: string, req: any, res: any): Promise<any>;
    findBooking(id: string, req: any, res: any): Promise<any>;
    patchBooking(order: UpdateBookingDto, id: string, req: any): Promise<{
        data: unknown;
    }>;
    validateRequest(order: UpdateBookingDto, id: string, req: any): Promise<{
        data: unknown;
    }>;
    validateRequestByProvider(order: UpdateBookingDto, id: string, req: any): Promise<{
        data: unknown;
    }>;
    cancelRequestByProvider(order: UpdateBookingDto, id: string, req: any): Promise<{
        data: any;
    }>;
    cancelReservationByProvider(order: UpdateBookingDto, id: string, req: any): Promise<{
        data: any;
    }>;
    remindClientByProvider(id: string, req: any): Promise<{
        data: any;
    }>;
    cancelPendingRequestByClient(order: UpdateBookingDto, id: string, req: any): Promise<{
        data: unknown;
    }>;
    validateRequestByClient(order: UpdateBookingDto, id: string, req: any): Promise<{
        data: unknown;
    }>;
    terminateRequest(order: UpdateBookingDto, id: string, req: any): Promise<{
        data: unknown;
    }>;
}
