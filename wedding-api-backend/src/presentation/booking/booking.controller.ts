import {
	Body,
	ConflictException,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	Patch,
	Post,
	Query,
	Request,
	Response,
	UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateBookingDto } from './dto/createBooking.dto';
import { UpdateBookingDto } from './dto/updateBooking.dto';
import { ReservationStatus } from '../../domain/entities/reservation.model';
import { RolesGuard } from '../../global/guards/roles.guard';
import { Roles } from '../../global/decorators/roles.decorator';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';
import { EmailService } from '../../global/services/mail/email.service';

@ApiBearerAuth()
@ApiTags('booking')
@Controller('booking')
export class BookingController {
	constructor(
		private readonly bookingService: BookingService,
		private readonly notificationsService: NotificationsService,
		private readonly usersService: UsersService,
		private readonly emailService: EmailService
	) {}

	@Post()
	@UseGuards(AuthGuard())
	async addNewBooking(@Body() order: CreateBookingDto, @Request() req, @Response() res) {
		if (!req.user.role) {
			throw new ForbiddenException();
		} else {
			try {
				const data = await this.bookingService.createBooking(order, req.user);
				return res.status(HttpStatus.CREATED).json({ data });
			} catch (e) {
				if (e.status === HttpStatus.CONFLICT) {
					throw new ConflictException('La réservation existe déjà');
				}
				if (e.status === HttpStatus.NOT_FOUND) {
					throw new NotFoundException();
				}
				throw e;
			}
		}
	}

	@Post('_search')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('admin')
	async getBookings(@Body() query: any, @Query('page') page: number = 0, @Request() req, @Response() res) {
		try {
			const data = await this.bookingService.findAllBookings(query, page);
			return res.status(HttpStatus.OK).json(data);
		} catch (e) {
			throw new NotFoundException();
		}
	}

	@Get('reservation/request-client')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client')
	public async getReservationRequestsClient(@Query('page') page: number = 0, @Request() req) {
		try {
			const user = req.user;
			const query = {
				bool: {
					must: [
						{ match: { reservationsStatus: ReservationStatus.VALIDATED_BY_wedding } },
						{ match: { 'client.id': user.id } },
					],
				},
			};
			const data = await this.bookingService.findAllBookings(query, page);
			return data;
		} catch (e) {
			throw new NotFoundException();
		}
	}

	@Get('reservation/validated-provider')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client')
	public async getReservationValidatedByProvider(@Query('page') page: number = 0, @Request() req) {
		try {
			const user = req.user;
			const query = {
				bool: {
					must: [
						{ match: { reservationsStatus: ReservationStatus.VALIDATED_BY_PROVIDER } },
						{ match: { 'client.id': user.id } },
					],
				},
			};
			const data = await this.bookingService.findAllBookings(query, page);
			return data;
		} catch (e) {
			throw new NotFoundException();
		}
	}

	@Get('reservation/payed')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client')
	public async getReservationPayedProvider(@Query('page') page: number = 0, @Request() req) {
		try {
			const user = req.user;
			const query = {
				bool: {
					must: [
						{ match: { reservationsStatus: ReservationStatus.PAYED_BY_CLIENT } },
						{ match: { 'client.id': user.id } },
					],
				},
			};
			const data = await this.bookingService.findAllBookings(query, page);
			return data;
		} catch (e) {
			throw new NotFoundException();
		}
	}

	@Get('reservation/validated-provider-request')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider')
	public async getReservationRequestsValidatedByProvider(@Query('page') page: number = 0, @Request() req) {
		try {
			const user = req.user;
			const company = await user.company;
			const query = {
				bool: {
					must: [
						{ match: { reservationsStatus: ReservationStatus.VALIDATED_BY_PROVIDER } },
						{ match: { 'company.id': company.id } },
					],
				},
			};
			const data = await this.bookingService.findAllBookings(query, page);
			return data;
		} catch (e) {
			throw new NotFoundException();
		}
	}

	@Get('reservation/validated-request')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider')
	public async getReservationRequestsProvider(@Query('page') page: number = 0, @Request() req) {
		try {
			const user = req.user;
			const company = await user.company;
			const query = {
				bool: {
					must: [
						{ match: { reservationsStatus: ReservationStatus.VALIDATED_BY_wedding } },
						{ match: { 'company.id': company.id } },
					],
				},
			};
			const data = await this.bookingService.findAllBookings(query, page);
			return data;
		} catch (e) {
			console.log('error', e);
			throw new NotFoundException();
		}
	}

	@Get('reservation/payed-client-provider')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider')
	public async getReservationRequestsayedByClients(@Query('page') page: number = 0, @Request() req) {
		try {
			const user = req.user;
			const company = await user.company;
			const query = {
				bool: {
					must: [
						{ match: { reservationsStatus: ReservationStatus.VALIDATED_BY_CLIENT } },
						{ match: { 'company.id': company.id } },
					],
				},
			};
			const data = await this.bookingService.findAllBookings(query, page);
			return data;
		} catch (e) {
			throw new NotFoundException();
		}
	}

	@Get('reservation/finished-provider')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider', 'client')
	public async getReservationPayedByClients(@Query('page') page: number = 0, @Request() req) {
		try {
			let query = {};
			const user = req.user;
			if (user.role === 'provider') {
				const company = await user.company;
				query = {
					bool: {
						must: [
							{ match: { reservationsStatus: ReservationStatus.PAYED_BY_CLIENT } },
							{ match: { 'company.id': company.id } },
						],
					},
				};
			} else if (user.role === 'client') {
				query = {
					bool: {
						must: [
							{ match: { reservationsStatus: ReservationStatus.PAYED_BY_CLIENT } },
							{ match: { 'client.id': user.id } },
						],
					},
				};
			}
			const data = await this.bookingService.findAllBookings(query, page);
			return data;
		} catch (e) {
			throw new NotFoundException();
		}
	}

	@Delete(':id')
	@UseGuards(AuthGuard())
	async deleteBooking(@Param('id') id: string, @Request() req, @Response() res) {
		try {
			const data = await this.bookingService.deleteBooking(id, req.user);
			return res.status(HttpStatus.NO_CONTENT).json({ data });
		} catch (e) {
			console.log('error', e);
			if (e.status === 403) {
				throw new ForbiddenException();
			}
			throw new NotFoundException();
		}
	}

	@Get(':id')
	@UseGuards(AuthGuard())
	async findBooking(@Param('id') id: string, @Request() req, @Response() res) {
		if (!req.user.role) {
			throw new ForbiddenException();
		} else {
			try {
				const data = await this.bookingService.findBooking(id);
				return res.status(HttpStatus.OK).json({ data });
			} catch (e) {
				console.log('error', e);
				if (e.status === 403) {
					throw new ForbiddenException();
				}
				throw new NotFoundException();
			}
		}
	}

	@Patch(':id')
	async patchBooking(@Body() order: UpdateBookingDto, @Param('id') id: string, @Request() req) {
		try {
			const data = await this.bookingService.updateBooking(id, order);
			return { data };
		} catch (e) {
			console.log('error', e);
			throw new NotFoundException();
		}
	}

	@Patch(':id/validate-request')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('admin')
	async validateRequest(@Body() order: UpdateBookingDto, @Param('id') id: string, @Request() req) {
		try {
			if (
				![
					ReservationStatus.VALIDATED_BY_wedding,
					ReservationStatus.ARCHIVED_BY_wedding,
					ReservationStatus.REFUSED_BY_wedding,
				].includes(order.reservationsStatus)
			) {
				throw new NotFoundException();
			}
			order = { reservationsStatus: order.reservationsStatus };
			const reservation = await this.bookingService.findReservation(id);
			if (reservation.reservationsStatus !== ReservationStatus.RESERVATION_REQUEST) {
				throw new ForbiddenException();
			}
			const data = await this.bookingService.updateBooking(id, order);
			return { data };
		} catch (e) {
			console.log('error', e);
			throw new NotFoundException();
		}
	}

	@Patch(':id/validate-provider')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider')
	public async validateRequestByProvider(@Body() order: UpdateBookingDto, @Param('id') id: string, @Request() req) {
		try {
			if (
				![ReservationStatus.VALIDATED_BY_PROVIDER, ReservationStatus.REFUSED_BY_PROVIDER].includes(
					order.reservationsStatus
				)
			) {
				throw new NotFoundException();
			}
			order = {
				reservationsStatus: order.reservationsStatus,
				additionalFees: order.additionalFees || [],
				discounts: order.discounts || [],
				providerConfirmationDate: new Date(),
			};
			const user = req.user;
			const company = await user.company;
			const reservation = await this.bookingService.findReservation(id);
			if (
				reservation.company.id !== company.id ||
				reservation.reservationsStatus !== ReservationStatus.VALIDATED_BY_wedding
			) {
				throw new ForbiddenException();
			}
			const totalDiscounts = order.discounts.reduce((acc, val) => {
				return acc + val.price;
			}, 0);
			const totalAdditionalFees = order.additionalFees.reduce((acc, val) => {
				return acc + val.price;
			}, 0);

			const allPrice = reservation.finalPrice + totalAdditionalFees - totalDiscounts;
			// @ts-ignore
			order.allPrice = allPrice;
			const data = await this.bookingService.updateBooking(id, order);
			return {
				data,
			};
		} catch (e) {
			throw e;
		}
	}

	@Patch(':id/cancel_request_provider')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider')
	public async cancelRequestByProvider(@Body() order: UpdateBookingDto, @Param('id') id: string, @Request() req) {
		try {
			if (![ReservationStatus.CANCELED_REQUEST_BY_PROVIDER].includes(order.reservationsStatus)) {
				throw new NotFoundException();
			}
			order = {
				reservationsStatus: order.reservationsStatus,
			};
			const user = req.user;
			const company = await user.company;
			const reservation = await this.bookingService.findReservation(id);
			if (
				reservation.company.id !== company.id ||
				reservation.reservationsStatus !== ReservationStatus.VALIDATED_BY_PROVIDER
			) {
				throw new ForbiddenException();
			}
			const data: any = await this.bookingService.updateBooking(id, order);
			const content = `Votre demande de reservation N ${data.orderNumber} est annulée par ${data.company.name}`;
			await this.notificationsService.createNotification({
				content,
				url: '',
				userId: data.client.id,
			});
			await this.emailService.sendMmail(content, data.client.email);
			return {
				data,
			};
		} catch (e) {
			throw e;
		}
	}

	@Patch(':id/cancel_reservation_provider')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider')
	public async cancelReservationByProvider(@Body() order: UpdateBookingDto, @Param('id') id: string, @Request() req) {
		try {
			if (![ReservationStatus.CANCELED_RESERVATION_BY_PROVIDER].includes(order.reservationsStatus)) {
				throw new NotFoundException();
			}
			order = {
				reservationsStatus: order.reservationsStatus,
			};
			const user = req.user;
			const company = await user.company;
			const reservation = await this.bookingService.findReservation(id);
			if (
				reservation.company.id !== company.id ||
				reservation.reservationsStatus !== ReservationStatus.VALIDATED_BY_CLIENT
			) {
				throw new ForbiddenException();
			}
			const data: any = await this.bookingService.updateBooking(id, order);
			const content = `Votre réservation N ${data.orderNumber} est annulée par ${data.company.name}`;
			await this.notificationsService.createNotification({
				content,
				url: '',
				userId: data.client.id,
			});
			await this.emailService.sendMmail(content, data.client.email);
			return {
				data,
			};
		} catch (e) {
			throw e;
		}
	}

	@Post(':id/remind-client-provider')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('provider')
	public async remindClientByProvider(@Param('id') id: string, @Request() req) {
		try {
			const user = req.user;
			const company = await user.company;
			const reservation = await this.bookingService.findReservation(id);
			if (
				reservation.company.id !== company.id ||
				reservation.reservationsStatus !== ReservationStatus.VALIDATED_BY_PROVIDER
			) {
				throw new ForbiddenException();
			}
			const content = `Vous avez une demande de réservation N ${reservation.orderNumber} en attente de paiement. Veuillez procéder à son règlement pour la confirmer`;
			await this.notificationsService.createNotification({
				content,
				url: '',
				userId: reservation.client.id,
			});
			await this.emailService.sendMmail(content, reservation.client.email);
			const count = reservation.notifyClientCount || 0;
			const order = {
				notifyClientCount: count + 1,
			};
			const data: any = await this.bookingService.updateBooking(id, order);

			return {
				data,
			};
		} catch (e) {
			throw e;
		}
	}

	@Patch(':id/cancel-request-client')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client')
	public async cancelPendingRequestByClient(
		@Body() order: UpdateBookingDto,
		@Param('id') id: string,
		@Request() req
	) {
		try {
			if (![ReservationStatus.CANCELED_PENDING_BY_CLIENT].includes(order.reservationsStatus)) {
				throw new NotFoundException();
			}
			order = {
				reservationsStatus: order.reservationsStatus,
			};
			const user = req.user;
			const reservation = await this.bookingService.findReservation(id);
			if (
				reservation.client.id !== user.id ||
				reservation.reservationsStatus !== ReservationStatus.VALIDATED_BY_wedding
			) {
				throw new ForbiddenException();
			}
			const data = await this.bookingService.updateBooking(id, order);
			return {
				data,
			};
		} catch (e) {
			throw e;
		}
	}

	@Patch(':id/validate-client')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('client')
	public async validateRequestByClient(@Body() order: UpdateBookingDto, @Param('id') id: string, @Request() req) {
		// ajouter type paiement (total/ accoumpte + mensualites)
		// ajouter si mensualite (loyer (le loyer doit depasser 10% du total) + nombre de mois à partir de la date de demande et date d'evenement)
		try {
			if (
				![ReservationStatus.REFUSED_BY_CLIENT, ReservationStatus.VALIDATED_BY_CLIENT].includes(
					order.reservationsStatus
				)
			) {
				throw new NotFoundException();
			}
			order = {
				reservationsStatus: order.reservationsStatus,
			};
			const user = req.user;
			const reservation = await this.bookingService.findReservation(id);
			if (
				reservation.client.id !== user.id ||
				reservation.reservationsStatus !== ReservationStatus.VALIDATED_BY_PROVIDER
			) {
				throw new ForbiddenException();
			}
			const data = await this.bookingService.validateReservationByClient(order, id);
			return {
				data,
			};
		} catch (e) {
			throw e;
		}
	}

	@Patch(':id/terminate-request')
	@UseGuards(AuthGuard(), RolesGuard)
	@Roles('admin')
	public async terminateRequest(@Body() order: UpdateBookingDto, @Param('id') id: string, @Request() req) {
		try {
			if (![ReservationStatus.PAYED_BY_CLIENT].includes(order.reservationsStatus)) {
				throw new NotFoundException();
			}
			order = { reservationsStatus: order.reservationsStatus };
			const reservation = await this.bookingService.findReservation(id);
			if (reservation.reservationsStatus !== ReservationStatus.VALIDATED_BY_CLIENT) {
				throw new ForbiddenException();
			}
			const data = await this.bookingService.updateBooking(id, order);
			return { data };
		} catch (e) {
			console.log('error', e);
			throw new NotFoundException();
		}
	}
}
