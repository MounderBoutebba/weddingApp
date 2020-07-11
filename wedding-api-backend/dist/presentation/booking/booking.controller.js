"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const createBooking_dto_1 = require("./dto/createBooking.dto");
const updateBooking_dto_1 = require("./dto/updateBooking.dto");
const reservation_model_1 = require("../../domain/entities/reservation.model");
const roles_guard_1 = require("../../global/guards/roles.guard");
const roles_decorator_1 = require("../../global/decorators/roles.decorator");
const notifications_service_1 = require("../notifications/notifications.service");
const users_service_1 = require("../users/users.service");
const email_service_1 = require("../../global/services/mail/email.service");
let BookingController = class BookingController {
    constructor(bookingService, notificationsService, usersService, emailService) {
        this.bookingService = bookingService;
        this.notificationsService = notificationsService;
        this.usersService = usersService;
        this.emailService = emailService;
    }
    async addNewBooking(order, req, res) {
        if (!req.user.role) {
            throw new common_1.ForbiddenException();
        }
        else {
            try {
                const data = await this.bookingService.createBooking(order, req.user);
                return res.status(common_1.HttpStatus.CREATED).json({ data });
            }
            catch (e) {
                if (e.status === common_1.HttpStatus.CONFLICT) {
                    throw new common_1.ConflictException('La réservation existe déjà');
                }
                if (e.status === common_1.HttpStatus.NOT_FOUND) {
                    throw new common_1.NotFoundException();
                }
                throw e;
            }
        }
    }
    async getBookings(query, page = 0, req, res) {
        try {
            const data = await this.bookingService.findAllBookings(query, page);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async getReservationRequestsClient(page = 0, req) {
        try {
            const user = req.user;
            const query = {
                bool: {
                    must: [
                        { match: { reservationsStatus: reservation_model_1.ReservationStatus.VALIDATED_BY_MARIAGESEREIN } },
                        { match: { 'client.id': user.id } }
                    ]
                }
            };
            const data = await this.bookingService.findAllBookings(query, page);
            return data;
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async getReservationValidatedByProvider(page = 0, req) {
        try {
            const user = req.user;
            const query = {
                bool: {
                    must: [
                        { match: { reservationsStatus: reservation_model_1.ReservationStatus.VALIDATED_BY_PROVIDER } },
                        { match: { 'client.id': user.id } }
                    ]
                }
            };
            const data = await this.bookingService.findAllBookings(query, page);
            return data;
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async getReservationPayedProvider(page = 0, req) {
        try {
            const user = req.user;
            const query = {
                bool: {
                    must: [
                        { match: { reservationsStatus: reservation_model_1.ReservationStatus.PAYED_BY_CLIENT } },
                        { match: { 'client.id': user.id } }
                    ]
                }
            };
            const data = await this.bookingService.findAllBookings(query, page);
            return data;
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async getReservationRequestsValidatedByProvider(page = 0, req) {
        try {
            const user = req.user;
            const company = await user.company;
            const query = {
                bool: {
                    must: [
                        { match: { reservationsStatus: reservation_model_1.ReservationStatus.VALIDATED_BY_PROVIDER } },
                        { match: { 'company.id': company.id } }
                    ]
                }
            };
            const data = await this.bookingService.findAllBookings(query, page);
            return data;
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async getReservationRequestsProvider(page = 0, req) {
        try {
            const user = req.user;
            const company = await user.company;
            const query = {
                bool: {
                    must: [
                        { match: { reservationsStatus: reservation_model_1.ReservationStatus.VALIDATED_BY_MARIAGESEREIN } },
                        { match: { 'company.id': company.id } }
                    ]
                }
            };
            const data = await this.bookingService.findAllBookings(query, page);
            return data;
        }
        catch (e) {
            console.log('error', e);
            throw new common_1.NotFoundException();
        }
    }
    async getReservationRequestsayedByClients(page = 0, req) {
        try {
            const user = req.user;
            const company = await user.company;
            const query = {
                bool: {
                    must: [
                        { match: { reservationsStatus: reservation_model_1.ReservationStatus.VALIDATED_BY_CLIENT } },
                        { match: { 'company.id': company.id } }
                    ]
                }
            };
            const data = await this.bookingService.findAllBookings(query, page);
            return data;
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async getReservationPayedByClients(page = 0, req) {
        try {
            let query = {};
            const user = req.user;
            if (user.role === 'provider') {
                const company = await user.company;
                query = {
                    bool: {
                        must: [
                            { match: { reservationsStatus: reservation_model_1.ReservationStatus.PAYED_BY_CLIENT } },
                            { match: { 'company.id': company.id } }
                        ]
                    }
                };
            }
            else if (user.role === 'client') {
                query = {
                    bool: {
                        must: [
                            { match: { reservationsStatus: reservation_model_1.ReservationStatus.PAYED_BY_CLIENT } },
                            { match: { 'client.id': user.id } }
                        ]
                    }
                };
            }
            const data = await this.bookingService.findAllBookings(query, page);
            return data;
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async deleteBooking(id, req, res) {
        try {
            const data = await this.bookingService.deleteBooking(id, req.user);
            return res.status(common_1.HttpStatus.NO_CONTENT).json({ data });
        }
        catch (e) {
            console.log('error', e);
            if (e.status === 403) {
                throw new common_1.ForbiddenException();
            }
            throw new common_1.NotFoundException();
        }
    }
    async findBooking(id, req, res) {
        if (!req.user.role) {
            throw new common_1.ForbiddenException();
        }
        else {
            try {
                const data = await this.bookingService.findBooking(id);
                return res.status(common_1.HttpStatus.OK).json({ data });
            }
            catch (e) {
                console.log('error', e);
                if (e.status === 403) {
                    throw new common_1.ForbiddenException();
                }
                throw new common_1.NotFoundException();
            }
        }
    }
    async patchBooking(order, id, req) {
        try {
            const data = await this.bookingService.updateBooking(id, order);
            return { data };
        }
        catch (e) {
            console.log('error', e);
            throw new common_1.NotFoundException();
        }
    }
    async validateRequest(order, id, req) {
        try {
            if (![
                reservation_model_1.ReservationStatus.VALIDATED_BY_MARIAGESEREIN,
                reservation_model_1.ReservationStatus.ARCHIVED_BY_MARIAGESEREIN,
                reservation_model_1.ReservationStatus.REFUSED_BY_MARIAGESEREIN
            ].includes(order.reservationsStatus)) {
                throw new common_1.NotFoundException();
            }
            order = { reservationsStatus: order.reservationsStatus };
            const reservation = await this.bookingService.findReservation(id);
            if (reservation.reservationsStatus !== reservation_model_1.ReservationStatus.RESERVATION_REQUEST) {
                throw new common_1.ForbiddenException();
            }
            const data = await this.bookingService.updateBooking(id, order);
            return { data };
        }
        catch (e) {
            console.log('error', e);
            throw new common_1.NotFoundException();
        }
    }
    async validateRequestByProvider(order, id, req) {
        try {
            if (![reservation_model_1.ReservationStatus.VALIDATED_BY_PROVIDER, reservation_model_1.ReservationStatus.REFUSED_BY_PROVIDER].includes(order.reservationsStatus)) {
                throw new common_1.NotFoundException();
            }
            order = {
                reservationsStatus: order.reservationsStatus,
                additionalFees: order.additionalFees || [],
                discounts: order.discounts || [],
                providerConfirmationDate: new Date()
            };
            const user = req.user;
            const company = await user.company;
            const reservation = await this.bookingService.findReservation(id);
            if (reservation.company.id !== company.id ||
                reservation.reservationsStatus !== reservation_model_1.ReservationStatus.VALIDATED_BY_MARIAGESEREIN) {
                throw new common_1.ForbiddenException();
            }
            const totalDiscounts = order.discounts.reduce((acc, val) => {
                return acc + val.price;
            }, 0);
            const totalAdditionalFees = order.additionalFees.reduce((acc, val) => {
                return acc + val.price;
            }, 0);
            const allPrice = reservation.finalPrice + totalAdditionalFees - totalDiscounts;
            order.allPrice = allPrice;
            const data = await this.bookingService.updateBooking(id, order);
            return {
                data
            };
        }
        catch (e) {
            throw e;
        }
    }
    async cancelRequestByProvider(order, id, req) {
        try {
            if (![reservation_model_1.ReservationStatus.CANCELED_REQUEST_BY_PROVIDER].includes(order.reservationsStatus)) {
                throw new common_1.NotFoundException();
            }
            order = {
                reservationsStatus: order.reservationsStatus
            };
            const user = req.user;
            const company = await user.company;
            const reservation = await this.bookingService.findReservation(id);
            if (reservation.company.id !== company.id ||
                reservation.reservationsStatus !== reservation_model_1.ReservationStatus.VALIDATED_BY_PROVIDER) {
                throw new common_1.ForbiddenException();
            }
            const data = await this.bookingService.updateBooking(id, order);
            const content = `Votre demande de reservation N ${data.orderNumber} est annulée par ${data.company.name}`;
            await this.notificationsService.createNotification({
                content,
                url: '',
                userId: data.client.id
            });
            await this.emailService.sendMmail(content, data.client.email);
            return {
                data
            };
        }
        catch (e) {
            throw e;
        }
    }
    async cancelReservationByProvider(order, id, req) {
        try {
            if (![reservation_model_1.ReservationStatus.CANCELED_RESERVATION_BY_PROVIDER].includes(order.reservationsStatus)) {
                throw new common_1.NotFoundException();
            }
            order = {
                reservationsStatus: order.reservationsStatus
            };
            const user = req.user;
            const company = await user.company;
            const reservation = await this.bookingService.findReservation(id);
            if (reservation.company.id !== company.id ||
                reservation.reservationsStatus !== reservation_model_1.ReservationStatus.VALIDATED_BY_CLIENT) {
                throw new common_1.ForbiddenException();
            }
            const data = await this.bookingService.updateBooking(id, order);
            const content = `Votre réservation N ${data.orderNumber} est annulée par ${data.company.name}`;
            await this.notificationsService.createNotification({
                content,
                url: '',
                userId: data.client.id
            });
            await this.emailService.sendMmail(content, data.client.email);
            return {
                data
            };
        }
        catch (e) {
            throw e;
        }
    }
    async remindClientByProvider(id, req) {
        try {
            const user = req.user;
            const company = await user.company;
            const reservation = await this.bookingService.findReservation(id);
            if (reservation.company.id !== company.id ||
                reservation.reservationsStatus !== reservation_model_1.ReservationStatus.VALIDATED_BY_PROVIDER) {
                throw new common_1.ForbiddenException();
            }
            const content = `Vous avez une demande de réservation N ${reservation.orderNumber} en attente de paiement. Veuillez procéder à son règlement pour la confirmer`;
            await this.notificationsService.createNotification({
                content,
                url: '',
                userId: reservation.client.id
            });
            await this.emailService.sendMmail(content, reservation.client.email);
            const count = reservation.notifyClientCount || 0;
            const order = {
                notifyClientCount: count + 1
            };
            const data = await this.bookingService.updateBooking(id, order);
            return {
                data
            };
        }
        catch (e) {
            throw e;
        }
    }
    async cancelPendingRequestByClient(order, id, req) {
        try {
            if (![reservation_model_1.ReservationStatus.CANCELED_PENDING_BY_CLIENT].includes(order.reservationsStatus)) {
                throw new common_1.NotFoundException();
            }
            order = {
                reservationsStatus: order.reservationsStatus
            };
            const user = req.user;
            const reservation = await this.bookingService.findReservation(id);
            if (reservation.client.id !== user.id ||
                reservation.reservationsStatus !== reservation_model_1.ReservationStatus.VALIDATED_BY_MARIAGESEREIN) {
                throw new common_1.ForbiddenException();
            }
            const data = await this.bookingService.updateBooking(id, order);
            return {
                data
            };
        }
        catch (e) {
            throw e;
        }
    }
    async validateRequestByClient(order, id, req) {
        try {
            if (![reservation_model_1.ReservationStatus.REFUSED_BY_CLIENT, reservation_model_1.ReservationStatus.VALIDATED_BY_CLIENT].includes(order.reservationsStatus)) {
                throw new common_1.NotFoundException();
            }
            order = {
                reservationsStatus: order.reservationsStatus
            };
            const user = req.user;
            const reservation = await this.bookingService.findReservation(id);
            if (reservation.client.id !== user.id ||
                reservation.reservationsStatus !== reservation_model_1.ReservationStatus.VALIDATED_BY_PROVIDER) {
                throw new common_1.ForbiddenException();
            }
            const data = await this.bookingService.validateReservationByClient(order, id);
            return {
                data
            };
        }
        catch (e) {
            throw e;
        }
    }
    async terminateRequest(order, id, req) {
        try {
            if (![reservation_model_1.ReservationStatus.PAYED_BY_CLIENT].includes(order.reservationsStatus)) {
                throw new common_1.NotFoundException();
            }
            order = { reservationsStatus: order.reservationsStatus };
            const reservation = await this.bookingService.findReservation(id);
            if (reservation.reservationsStatus !== reservation_model_1.ReservationStatus.VALIDATED_BY_CLIENT) {
                throw new common_1.ForbiddenException();
            }
            const data = await this.bookingService.updateBooking(id, order);
            return { data };
        }
        catch (e) {
            console.log('error', e);
            throw new common_1.NotFoundException();
        }
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Body()), __param(1, common_1.Request()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBooking_dto_1.CreateBookingDto, Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "addNewBooking", null);
__decorate([
    common_1.Post('_search'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Body()), __param(1, common_1.Query('page')), __param(2, common_1.Request()), __param(3, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBookings", null);
__decorate([
    common_1.Get('reservation/request-client'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client'),
    __param(0, common_1.Query('page')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getReservationRequestsClient", null);
__decorate([
    common_1.Get('reservation/validated-provider'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client'),
    __param(0, common_1.Query('page')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getReservationValidatedByProvider", null);
__decorate([
    common_1.Get('reservation/payed'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client'),
    __param(0, common_1.Query('page')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getReservationPayedProvider", null);
__decorate([
    common_1.Get('reservation/validated-provider-request'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider'),
    __param(0, common_1.Query('page')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getReservationRequestsValidatedByProvider", null);
__decorate([
    common_1.Get('reservation/validated-request'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider'),
    __param(0, common_1.Query('page')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getReservationRequestsProvider", null);
__decorate([
    common_1.Get('reservation/payed-client-provider'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider'),
    __param(0, common_1.Query('page')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getReservationRequestsayedByClients", null);
__decorate([
    common_1.Get('reservation/finished-provider'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider', 'client'),
    __param(0, common_1.Query('page')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getReservationPayedByClients", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('id')), __param(1, common_1.Request()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "deleteBooking", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('id')), __param(1, common_1.Request()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findBooking", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Body()), __param(1, common_1.Param('id')), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateBooking_dto_1.UpdateBookingDto, String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "patchBooking", null);
__decorate([
    common_1.Patch(':id/validate-request'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Body()), __param(1, common_1.Param('id')), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateBooking_dto_1.UpdateBookingDto, String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "validateRequest", null);
__decorate([
    common_1.Patch(':id/validate-provider'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider'),
    __param(0, common_1.Body()), __param(1, common_1.Param('id')), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateBooking_dto_1.UpdateBookingDto, String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "validateRequestByProvider", null);
__decorate([
    common_1.Patch(':id/cancel_request_provider'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider'),
    __param(0, common_1.Body()), __param(1, common_1.Param('id')), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateBooking_dto_1.UpdateBookingDto, String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "cancelRequestByProvider", null);
__decorate([
    common_1.Patch(':id/cancel_reservation_provider'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider'),
    __param(0, common_1.Body()), __param(1, common_1.Param('id')), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateBooking_dto_1.UpdateBookingDto, String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "cancelReservationByProvider", null);
__decorate([
    common_1.Post(':id/remind-client-provider'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider'),
    __param(0, common_1.Param('id')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "remindClientByProvider", null);
__decorate([
    common_1.Patch(':id/cancel-request-client'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client'),
    __param(0, common_1.Body()), __param(1, common_1.Param('id')), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateBooking_dto_1.UpdateBookingDto, String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "cancelPendingRequestByClient", null);
__decorate([
    common_1.Patch(':id/validate-client'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client'),
    __param(0, common_1.Body()), __param(1, common_1.Param('id')), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateBooking_dto_1.UpdateBookingDto, String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "validateRequestByClient", null);
__decorate([
    common_1.Patch(':id/terminate-request'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Body()), __param(1, common_1.Param('id')), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateBooking_dto_1.UpdateBookingDto, String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "terminateRequest", null);
BookingController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('booking'),
    common_1.Controller('booking'),
    __metadata("design:paramtypes", [booking_service_1.BookingService,
        notifications_service_1.NotificationsService,
        users_service_1.UsersService,
        email_service_1.EmailService])
], BookingController);
exports.BookingController = BookingController;
//# sourceMappingURL=booking.controller.js.map