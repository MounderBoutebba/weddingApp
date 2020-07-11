import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationRepository } from './reservation.repository';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { UserCategoriesIndexModel } from '../entities/userCategoriesIndex.model';
import { ReservationEntity } from '../entities/reservation.entity';
import { ReservationsIndexModel } from '../entities/reservationsIndex.model';
import { UpdateBookingDto } from '../../../presentation/booking/dto/updateBooking.dto';
import { PaymentType, ReservationStatus } from '../../../domain/entities/reservation.model';
import { BillingServices } from '../company/billing/billing.service';
import { TypeExecution } from '../../../domain/entities/invoice.model';
import { StripeService } from '../../externalInterfaces/stripe/stripe.service';
import { PaiementsRepositoryService } from '../paiements/paiements-repository.service';
import { InvoicesService } from '../invoices/invoices.service';
import { InvoiceEntity } from '../entities/invoice.entity';
import { Cron, CronExpression } from '@nestjs/schedule';


@Injectable()
export class ReservationsService {
	constructor(
		@InjectRepository(ReservationRepository) private readonly reservationRepository: ReservationRepository,
		private readonly elasticsearchService: ElasticsearchService,
		private billingServices: BillingServices,
		private readonly externalPaiementsService: StripeService,
		private readonly paiementsService: PaiementsRepositoryService,
		private readonly invoicesService: InvoicesService
	) {}

	public async getCompany(userId: string): Promise<UserCategoriesIndexModel> {
		const res = await this.elasticsearchService.findById('categories', '_doc', userId);
		return res._source as UserCategoriesIndexModel;
	}

	public async createReservation(reservation: ReservationEntity) {
		const reserv = await this.reservationRepository.save(reservation);
		reserv.bill = reservation.bill;
		reserv.variations = reservation.variations;
		// @ts-ignore
		let esReservation: ReservationsIndexModel = { ...reserv, paymentType: reserv.paymentType };
		delete esReservation['company'];
		delete esReservation['client'];
		esReservation = {
			...esReservation,
			company: {
				id: reserv.company.id,
				name: reserv.company.name
			},
			client: {
				id: reserv.client.id,
				name: `${reserv.client.firstname} ${reserv.client.lastname}`,
				email: reserv.client.email
			}
		};
		delete esReservation['order'];
		await this.elasticsearchService.insert('reservations', esReservation, esReservation.id);
		return esReservation;
	}

	public async findReservation(id: string) {
		try {
			return await this.reservationRepository.findOneOrFail(id);
		} catch (e) {
			throw new NotFoundException();
		}
	}

	public async deleteReservation(reservation: ReservationEntity): Promise<void> {
		const id = reservation.id;
		await this.reservationRepository.remove(reservation);
		await this.elasticsearchService.deleteIndexById('reservations', '_doc', id);
	}

	public async validateReservationByClient(order: UpdateBookingDto, id: string) {
		// si status : VALIDATED_BY_CLIENT
		// on valide le loyer (le loyer doit avoir l'accompte + frais winwez) + mensualités, type de paiements, creation des factures

		let invoicesSaved = [];
		if (order.reservationsStatus === ReservationStatus.VALIDATED_BY_CLIENT) {

			const reserv = await this.reservationRepository.findOne(id);
			const companybilling = await this.billingServices.getBilling(reserv.company.id);
			const accompte = companybilling.depositPercentage;
			let total = reserv.totalPrice;
			reserv.additionalFees.forEach(frais => (total += frais.price));
			reserv.discounts.forEach(remise => (total -= remise.price));
			if (order.paymentType === PaymentType.RECURRENCE) {
				const totalClient = order.loyer * order.nombreDeMois;
				const tva = 20;
				const fraisDeServicesHT = (total * 10) / 100;
				const fraisDeServicesTTC = fraisDeServicesHT + (fraisDeServicesHT * tva) / 100;

				const accomptePrice = (total * accompte) / 100;

				if (accomptePrice && accomptePrice + fraisDeServicesTTC > order.loyer) {
					throw new HttpException('loyer supperieur a l accompte + frais de services', 400);
				}

				if (order.loyer < fraisDeServicesTTC) {
					throw new HttpException('loyer supperieur au frais de services sans accompte', 400);
				}

				if (totalClient !== total) {
					throw new HttpException('total a payer pas le client different du total reservation', 400);
				}

				if (!this.isPaiementReccurenceAccepted(reserv, order)) {
					throw new HttpException('nombre de loyer impossible dans cette periode', 400);
				}

				// creation factures
				invoicesSaved = await this.buildInvoices(reserv, order, total);
			} else if (order.paymentType === PaymentType.CASH) {
				// creation 1 facture
				invoicesSaved = await this.buildInvoices(reserv, order, total);
			}
			// after build and save invoice, must update reservation
			const reservationUpdate = new ReservationEntity();
			reservationUpdate.invoices = invoicesSaved;
			await this.reservationRepository.update(id, ({
				...reservationUpdate
			} as unknown) as Partial<ReservationEntity>);
		}




		await this.reservationRepository.update(id, order as Partial<ReservationEntity>);

		const reserv = await this.reservationRepository.findOne(id);
		// @ts-ignore
		let esReservation: ReservationsIndexModel = {
			...reserv,
			paymentType: reserv.paymentType
		};
		delete esReservation['company'];
		delete esReservation['client'];
		esReservation = {
			...esReservation,
			company: {
				id: reserv.company.id,
				name: reserv.company.name
			},
			client: {
				id: reserv.client.id,
				name: `${reserv.client.firstname} ${reserv.client.lastname}`,
				email: reserv.client.email
			}
		};
		await this.elasticsearchService.updateIndexById('reservations', '_doc', reserv.id, esReservation);
		return await this.findES(id);
	}


	public async updateReservation(order: UpdateBookingDto, id: string) {

		await this.reservationRepository.update(id, order as Partial<ReservationEntity>);
		const reserv = await this.reservationRepository.findOne(id);
		// @ts-ignore
		let esReservation: ReservationsIndexModel = {
			...reserv,
			paymentType: reserv.paymentType
		};
		delete esReservation['company'];
		delete esReservation['client'];
		esReservation = {
			...esReservation,
			company: {
				id: reserv.company.id,
				name: reserv.company.name
			},
			client: {
				id: reserv.client.id,
				name: `${reserv.client.firstname} ${reserv.client.lastname}`,
				email: reserv.client.email
			}
		};
		await this.elasticsearchService.updateIndexById('reservations', '_doc', reserv.id, esReservation);
		return await this.findES(id);
	}

	private isPaiementReccurenceAccepted(reservation: ReservationEntity, reservationUpdate: UpdateBookingDto) {
		const dateEvenement = reservation.start;
		const dateReservation = new Date();
		const nbrMounthBetweenEventAndReservation = this.monthsDiff(dateReservation, dateEvenement);
		if (nbrMounthBetweenEventAndReservation < reservationUpdate.nombreDeMois) {
			return false;
		} else {
			return true;
		}
	}

	private async buildInvoices(reservation: ReservationEntity, reservationUpdate: UpdateBookingDto, total: number) {
		// create invoice and save db
		let invoices = [];
		const customerInfo = await this.paiementsService.getPaiementAccount(reservation.client.email);
		if (reservationUpdate.paymentType === PaymentType.CASH) {
			const invoice = new InvoiceEntity();
			invoice.reservation = reservation;
			invoice.typeExecution = TypeExecution.non_differe;
			invoice.dateExecution = new Date();
			invoice.montant = total;

			// save invoice in data base
			const invoiceSaved: InvoiceEntity = await this.invoicesService.createInvoice(invoice);
			// make payment stripe
			const paymentIntent = await this.externalPaiementsService.createPaymentIntent(
				customerInfo.customerId,
				total,
				invoiceSaved.id
			);

			invoice.status = paymentIntent.status as any;
			invoice.stripePaymentIntentId = paymentIntent.id;

			// update data base invoice
			const invoiceUpdated = await this.invoicesService.updateInvoice(invoice.id, invoice);
			invoices.push(invoiceUpdated);
		} else if (reservationUpdate.paymentType === PaymentType.RECURRENCE) {
			const invoice = new InvoiceEntity();
			invoice.reservation = reservation;
			invoice.typeExecution = TypeExecution.non_differe;
			invoice.dateExecution = new Date();
			invoice.montant = reservationUpdate.loyer;

			// save invoice in data base
			const invoiceSaved: InvoiceEntity = await this.invoicesService.createInvoice(invoice);
			// make payment stripe
			const paymentIntent = await this.externalPaiementsService.createPaymentIntent(
				customerInfo.customerId,
				total,
				invoiceSaved.id
			);

			invoice.status = paymentIntent.status as any;
			invoice.stripePaymentIntentId = paymentIntent.id;

			// update data base invoice
			const invoiceUpdated = await this.invoicesService.updateInvoice(invoice.id, invoice);
			invoices.push(invoiceUpdated);

			// create other paiements
			const invoicesSaved: InvoiceEntity[] = await this.saveAllFuturesPaiment(
				reservationUpdate.nombreDeMois,
				new Date(),
				reservation,
				reservationUpdate.loyer
			);
			invoices = invoices.concat(invoicesSaved);
		}

		return invoices;
	}

	private async saveAllFuturesPaiment(
		nombreDeLoyersRest: number,
		startDate: Date,
		reservation: ReservationEntity,
		loyer: number
	) {
		const invoicesSaved: InvoiceEntity[] = [];
		for (let i = 1; i < nombreDeLoyersRest; i++) {
			const invoice = new InvoiceEntity();
			invoice.reservation = reservation;
			invoice.typeExecution = TypeExecution.non_differe;
			invoice.dateExecution = new Date(startDate.setMonth(startDate.getMonth() + i));
			invoice.montant = loyer;
			// save invoice in data base
			const invoiceSaved: InvoiceEntity = await this.invoicesService.createInvoice(invoice);
			invoicesSaved.push(invoiceSaved);
		}
		return invoicesSaved;
	}

	private monthsDiff(d1: Date, d2: Date) {
		const date1 = new Date(d1);
		const date2 = new Date(d2);
		const years = this.yearsDiff(d1, d2);
		const months = years * 12 + (date2.getMonth() - date1.getMonth());
		return months;
	}

	private yearsDiff(d1: Date, d2: Date) {
		const date1 = new Date(d1);
		const date2 = new Date(d2);
		const yearsDiff = date2.getFullYear() - date1.getFullYear();
		return yearsDiff;
	}

	@Cron(CronExpression.EVERY_12_HOURS)
	async cronMakeExecutesPaiements() {
		const allInvoicesNotExecuted: InvoiceEntity[] = await this.invoicesService.getAllInvoiceNotExecutedByToday();
		this.asyncForEach(allInvoicesNotExecuted, async invoice => {
			const reserv = await this.reservationRepository.findOne(invoice.reservation.id);
			const customerInfo = await this.paiementsService.getPaiementAccount(reserv.client.email);
			// make payment stripe
			const paymentIntent = await this.externalPaiementsService.createPaymentIntent(
				customerInfo.customerId,
				invoice.montant,
				invoice.id
			);
			invoice.status = paymentIntent.status as any;
			invoice.stripePaymentIntentId = paymentIntent.id;

			// update data base invoice
			const invoiceUpdated = await this.invoicesService.updateInvoice(invoice.id, invoice);
		});
	}

	private async asyncForEach(array, callback) {
		for (let index = 0; index < array.length; index++) {
			await callback(array[index], index, array);
		}
	}

	public async findES(id: string) {
		const reservationES = await this.elasticsearchService.findById('reservations', '_doc', id);
		const reservation = await this.findReservation(id);
		reservationES['_source']['comment'] = reservation.comment;
		return reservationES._source;
	}

	public async searchES(query: any, page: number) {
		const sort = [
			{ 'createdAt': 'desc' }
		];
		const reservations = await this.elasticsearchService.normaleearch('reservations', query, page,sort);
		const hits = await Promise.all(
			reservations.hits.hits.map(async es => {
				const res = es._source;
				// @ts-ignore
				const reservation = await this.findReservation(res.id);
				res['comment'] = reservation.comment;
				res['company'] = reservation.company;
				res['client'] = reservation.client;
				return res;
			})
		);
		// @ts-ignore
		return { data: hits, total: reservations.hits.total.value };
	}
}
