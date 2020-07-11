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
const typeorm_1 = require("@nestjs/typeorm");
const reservation_repository_1 = require("./reservation.repository");
const elasticsearch_service_1 = require("../elasticsearch/elasticsearch.service");
const reservation_entity_1 = require("../entities/reservation.entity");
const reservation_model_1 = require("../../../domain/entities/reservation.model");
const billing_service_1 = require("../company/billing/billing.service");
const invoice_model_1 = require("../../../domain/entities/invoice.model");
const stripe_service_1 = require("../../externalInterfaces/stripe/stripe.service");
const paiements_repository_service_1 = require("../paiements/paiements-repository.service");
const invoices_service_1 = require("../invoices/invoices.service");
const invoice_entity_1 = require("../entities/invoice.entity");
const schedule_1 = require("@nestjs/schedule");
let ReservationsService = class ReservationsService {
    constructor(reservationRepository, elasticsearchService, billingServices, externalPaiementsService, paiementsService, invoicesService) {
        this.reservationRepository = reservationRepository;
        this.elasticsearchService = elasticsearchService;
        this.billingServices = billingServices;
        this.externalPaiementsService = externalPaiementsService;
        this.paiementsService = paiementsService;
        this.invoicesService = invoicesService;
    }
    async getCompany(userId) {
        const res = await this.elasticsearchService.findById('categories', '_doc', userId);
        return res._source;
    }
    async createReservation(reservation) {
        const reserv = await this.reservationRepository.save(reservation);
        reserv.bill = reservation.bill;
        reserv.variations = reservation.variations;
        let esReservation = Object.assign(Object.assign({}, reserv), { paymentType: reserv.paymentType });
        delete esReservation['company'];
        delete esReservation['client'];
        esReservation = Object.assign(Object.assign({}, esReservation), { company: {
                id: reserv.company.id,
                name: reserv.company.name
            }, client: {
                id: reserv.client.id,
                name: `${reserv.client.firstname} ${reserv.client.lastname}`,
                email: reserv.client.email
            } });
        delete esReservation['order'];
        await this.elasticsearchService.insert('reservations', esReservation, esReservation.id);
        return esReservation;
    }
    async findReservation(id) {
        try {
            return await this.reservationRepository.findOneOrFail(id);
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async deleteReservation(reservation) {
        const id = reservation.id;
        await this.reservationRepository.remove(reservation);
        await this.elasticsearchService.deleteIndexById('reservations', '_doc', id);
    }
    async validateReservationByClient(order, id) {
        let invoicesSaved = [];
        if (order.reservationsStatus === reservation_model_1.ReservationStatus.VALIDATED_BY_CLIENT) {
            const reserv = await this.reservationRepository.findOne(id);
            const companybilling = await this.billingServices.getBilling(reserv.company.id);
            const accompte = companybilling.depositPercentage;
            let total = reserv.totalPrice;
            reserv.additionalFees.forEach(frais => (total += frais.price));
            reserv.discounts.forEach(remise => (total -= remise.price));
            if (order.paymentType === reservation_model_1.PaymentType.RECURRENCE) {
                const totalClient = order.loyer * order.nombreDeMois;
                const tva = 20;
                const fraisDeServicesHT = (total * 10) / 100;
                const fraisDeServicesTTC = fraisDeServicesHT + (fraisDeServicesHT * tva) / 100;
                const accomptePrice = (total * accompte) / 100;
                if (accomptePrice && accomptePrice + fraisDeServicesTTC > order.loyer) {
                    throw new common_1.HttpException('loyer supperieur a l accompte + frais de services', 400);
                }
                if (order.loyer < fraisDeServicesTTC) {
                    throw new common_1.HttpException('loyer supperieur au frais de services sans accompte', 400);
                }
                if (totalClient !== total) {
                    throw new common_1.HttpException('total a payer pas le client different du total reservation', 400);
                }
                if (!this.isPaiementReccurenceAccepted(reserv, order)) {
                    throw new common_1.HttpException('nombre de loyer impossible dans cette periode', 400);
                }
                invoicesSaved = await this.buildInvoices(reserv, order, total);
            }
            else if (order.paymentType === reservation_model_1.PaymentType.CASH) {
                invoicesSaved = await this.buildInvoices(reserv, order, total);
            }
            const reservationUpdate = new reservation_entity_1.ReservationEntity();
            reservationUpdate.invoices = invoicesSaved;
            await this.reservationRepository.update(id, Object.assign({}, reservationUpdate));
        }
        await this.reservationRepository.update(id, order);
        const reserv = await this.reservationRepository.findOne(id);
        let esReservation = Object.assign(Object.assign({}, reserv), { paymentType: reserv.paymentType });
        delete esReservation['company'];
        delete esReservation['client'];
        esReservation = Object.assign(Object.assign({}, esReservation), { company: {
                id: reserv.company.id,
                name: reserv.company.name
            }, client: {
                id: reserv.client.id,
                name: `${reserv.client.firstname} ${reserv.client.lastname}`,
                email: reserv.client.email
            } });
        await this.elasticsearchService.updateIndexById('reservations', '_doc', reserv.id, esReservation);
        return await this.findES(id);
    }
    async updateReservation(order, id) {
        await this.reservationRepository.update(id, order);
        const reserv = await this.reservationRepository.findOne(id);
        let esReservation = Object.assign(Object.assign({}, reserv), { paymentType: reserv.paymentType });
        delete esReservation['company'];
        delete esReservation['client'];
        esReservation = Object.assign(Object.assign({}, esReservation), { company: {
                id: reserv.company.id,
                name: reserv.company.name
            }, client: {
                id: reserv.client.id,
                name: `${reserv.client.firstname} ${reserv.client.lastname}`,
                email: reserv.client.email
            } });
        await this.elasticsearchService.updateIndexById('reservations', '_doc', reserv.id, esReservation);
        return await this.findES(id);
    }
    isPaiementReccurenceAccepted(reservation, reservationUpdate) {
        const dateEvenement = reservation.start;
        const dateReservation = new Date();
        const nbrMounthBetweenEventAndReservation = this.monthsDiff(dateReservation, dateEvenement);
        if (nbrMounthBetweenEventAndReservation < reservationUpdate.nombreDeMois) {
            return false;
        }
        else {
            return true;
        }
    }
    async buildInvoices(reservation, reservationUpdate, total) {
        let invoices = [];
        const customerInfo = await this.paiementsService.getPaiementAccount(reservation.client.email);
        if (reservationUpdate.paymentType === reservation_model_1.PaymentType.CASH) {
            const invoice = new invoice_entity_1.InvoiceEntity();
            invoice.reservation = reservation;
            invoice.typeExecution = invoice_model_1.TypeExecution.non_differe;
            invoice.dateExecution = new Date();
            invoice.montant = total;
            const invoiceSaved = await this.invoicesService.createInvoice(invoice);
            const paymentIntent = await this.externalPaiementsService.createPaymentIntent(customerInfo.customerId, total, invoiceSaved.id);
            invoice.status = paymentIntent.status;
            invoice.stripePaymentIntentId = paymentIntent.id;
            const invoiceUpdated = await this.invoicesService.updateInvoice(invoice.id, invoice);
            invoices.push(invoiceUpdated);
        }
        else if (reservationUpdate.paymentType === reservation_model_1.PaymentType.RECURRENCE) {
            const invoice = new invoice_entity_1.InvoiceEntity();
            invoice.reservation = reservation;
            invoice.typeExecution = invoice_model_1.TypeExecution.non_differe;
            invoice.dateExecution = new Date();
            invoice.montant = reservationUpdate.loyer;
            const invoiceSaved = await this.invoicesService.createInvoice(invoice);
            const paymentIntent = await this.externalPaiementsService.createPaymentIntent(customerInfo.customerId, total, invoiceSaved.id);
            invoice.status = paymentIntent.status;
            invoice.stripePaymentIntentId = paymentIntent.id;
            const invoiceUpdated = await this.invoicesService.updateInvoice(invoice.id, invoice);
            invoices.push(invoiceUpdated);
            const invoicesSaved = await this.saveAllFuturesPaiment(reservationUpdate.nombreDeMois, new Date(), reservation, reservationUpdate.loyer);
            invoices = invoices.concat(invoicesSaved);
        }
        return invoices;
    }
    async saveAllFuturesPaiment(nombreDeLoyersRest, startDate, reservation, loyer) {
        const invoicesSaved = [];
        for (let i = 1; i < nombreDeLoyersRest; i++) {
            const invoice = new invoice_entity_1.InvoiceEntity();
            invoice.reservation = reservation;
            invoice.typeExecution = invoice_model_1.TypeExecution.non_differe;
            invoice.dateExecution = new Date(startDate.setMonth(startDate.getMonth() + i));
            invoice.montant = loyer;
            const invoiceSaved = await this.invoicesService.createInvoice(invoice);
            invoicesSaved.push(invoiceSaved);
        }
        return invoicesSaved;
    }
    monthsDiff(d1, d2) {
        const date1 = new Date(d1);
        const date2 = new Date(d2);
        const years = this.yearsDiff(d1, d2);
        const months = years * 12 + (date2.getMonth() - date1.getMonth());
        return months;
    }
    yearsDiff(d1, d2) {
        const date1 = new Date(d1);
        const date2 = new Date(d2);
        const yearsDiff = date2.getFullYear() - date1.getFullYear();
        return yearsDiff;
    }
    async cronMakeExecutesPaiements() {
        const allInvoicesNotExecuted = await this.invoicesService.getAllInvoiceNotExecutedByToday();
        this.asyncForEach(allInvoicesNotExecuted, async (invoice) => {
            const reserv = await this.reservationRepository.findOne(invoice.reservation.id);
            const customerInfo = await this.paiementsService.getPaiementAccount(reserv.client.email);
            const paymentIntent = await this.externalPaiementsService.createPaymentIntent(customerInfo.customerId, invoice.montant, invoice.id);
            invoice.status = paymentIntent.status;
            invoice.stripePaymentIntentId = paymentIntent.id;
            const invoiceUpdated = await this.invoicesService.updateInvoice(invoice.id, invoice);
        });
    }
    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
    async findES(id) {
        const reservationES = await this.elasticsearchService.findById('reservations', '_doc', id);
        const reservation = await this.findReservation(id);
        reservationES['_source']['comment'] = reservation.comment;
        return reservationES._source;
    }
    async searchES(query, page) {
        const sort = [
            { 'createdAt': 'desc' }
        ];
        const reservations = await this.elasticsearchService.normaleearch('reservations', query, page, sort);
        const hits = await Promise.all(reservations.hits.hits.map(async (es) => {
            const res = es._source;
            const reservation = await this.findReservation(res.id);
            res['comment'] = reservation.comment;
            res['company'] = reservation.company;
            res['client'] = reservation.client;
            return res;
        }));
        return { data: hits, total: reservations.hits.total.value };
    }
};
__decorate([
    schedule_1.Cron(schedule_1.CronExpression.EVERY_12_HOURS),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReservationsService.prototype, "cronMakeExecutesPaiements", null);
ReservationsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(reservation_repository_1.ReservationRepository)),
    __metadata("design:paramtypes", [reservation_repository_1.ReservationRepository,
        elasticsearch_service_1.ElasticsearchService,
        billing_service_1.BillingServices,
        stripe_service_1.StripeService,
        paiements_repository_service_1.PaiementsRepositoryService,
        invoices_service_1.InvoicesService])
], ReservationsService);
exports.ReservationsService = ReservationsService;
//# sourceMappingURL=reservations.service.js.map