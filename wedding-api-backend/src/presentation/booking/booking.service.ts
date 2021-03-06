import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CompanyService } from '../company/company.service';
import { UsersService } from '../users/users.service';
import { CreateBookingDto, OrderInterface } from './dto/createBooking.dto';
import { ReservationsService } from '../../infrastructure/databases/reservations/reservations.service';
import { ClientEntity, FeeType, OptionEntity, TripFeeType } from '../../infrastructure/databases/entities';
import { ReservationEntity } from '../../infrastructure/databases/entities/reservation.entity';
import { UpdateBookingDto } from './dto/updateBooking.dto';
import {
	CoiffureCriteresES,
	EsthetiqueCriteresES,
	GateauMariageCriteresES,
	LieuCriteresES,
	MaquillageCriteresES,
	PhotographeCriteresES,
	SoinsCriteresES,
	TraiteurCriteresES,
	VideasteCriteresES
} from './metier/models/PhotographeVideasteBookingInterface';
import { UserCategoriesIndexModel } from '../../infrastructure/databases/entities/userCategoriesIndex.model';
import { differenceInDays, eachDayOfInterval, isWeekend, isWithinInterval } from 'date-fns';
import { isEqual, uniqWith } from 'lodash';
import { VariationTypes } from '../../infrastructure/databases/entities/reservationsIndex.model';
import axios, { AxiosRequestConfig } from 'axios';
import { NotificationsService } from '../notifications/notifications.service';
import { EmailService } from '../../global/services/mail/email.service';

@Injectable()
export class BookingService {
	constructor(
		private readonly companyService: CompanyService,
		private readonly usersService: UsersService,
		private readonly reservationsService: ReservationsService,
		private readonly notificationsService: NotificationsService,
		private readonly emailService: EmailService
	) {}

	public async createBooking(order: CreateBookingDto, client: ClientEntity) {
		let user;
		let company;
		let proUserES;
		try {
			user = await this.usersService.findUser(order.userId);
			company = await this.companyService.getCompany(user.email);
			proUserES = await this.reservationsService.getCompany(order.userId);
		} catch (e) {
			throw new NotFoundException();
		}
		const reservation = new ReservationEntity();
		reservation.client = client;
		reservation.company = company;
		reservation.start = new Date(order.start);
		reservation.end = new Date(order.end);
		reservation.categories = order.categories;
		reservation.order = order.order;
		reservation.guestcount = order.order.guestsNumber;
		reservation.location = order.location;
		const data: any = await this.calculateTotalPrice(proUserES, reservation);
		reservation.totalPrice = data.total;
		reservation.finalPrice = data.final;
		reservation.bill = data.bill;
		reservation.variations = data.variations;
		try {
			const res = await this.reservationsService.createReservation(reservation);
			const content=`Vous avez une nouvelle demande de reservation`;
			await this.notificationsService.createNotification({
				content,
				url:'/user/reservation/validate-client-requests',
				userId:user.id
			});
			await this.emailService.sendMmail(content,user.email);
			return res;
		} catch (e) {
			throw new ConflictException();
		}
	}

	private async calculateTotalPrice(proUserES: UserCategoriesIndexModel, reservation: ReservationEntity) {
		let bills: { total: number; final: number; bill: any[]; variations: [] } = {
			total: 0,
			final: 0,
			bill: [],
			variations: []
		};

		if (reservation.categories.includes('photographe')) {
			const photographeStuff = await this.calculatePhotographePrice(reservation.order, proUserES.criteres);
			bills = {
				total: bills.total + photographeStuff.total,
				final: bills.final,
				bill: [...bills.bill, ...photographeStuff.bill],
				// @ts-ignore
				variations: [...bills.variations]
			};
		}

		if (reservation.categories.includes('videaliste')) {
			const videasteStuff = await this.calculateVideastePrice(reservation.order, proUserES.criteres);
			bills = {
				total: bills.total + videasteStuff.total,
				final: bills.final,
				bill: [...bills.bill, ...videasteStuff.bill],
				// @ts-ignore
				variations: [...bills.variations]
			};
		}

		if (reservation.categories.includes('gateaumariage')) {
			const gateauMariageStuff = await this.calculateGateauMariagePrice(reservation.order, proUserES.criteres);
			bills = {
				total: bills.total + gateauMariageStuff.total,
				final: bills.final,
				bill: [...bills.bill, ...gateauMariageStuff.bill],
				// @ts-ignore
				variations: [...bills.variations]
			};
		}

		if (reservation.categories.includes('lieu')) {
			const lieuStuff = await this.calculateLieuPrice(reservation.order, proUserES.criteres);
			bills = {
				total: bills.total + lieuStuff.total,
				final: bills.final,
				bill: [...bills.bill, ...lieuStuff.bill],
				// @ts-ignore
				variations: [...bills.variations]
			};
		}

		if (reservation.categories.includes('traiteur')) {
			const traiteurStuff = await this.calculateTraiteurPrice(reservation.order, proUserES.criteres);
			bills = {
				total: bills.total + traiteurStuff.total,
				final: bills.final,
				bill: [...bills.bill, ...traiteurStuff.bill],
				// @ts-ignore
				variations: [...bills.variations]
			};
		}

		if (reservation.categories.includes('maquillage')) {
			const maquillageStuff = await this.calculateMaquillagePrice(reservation.order, proUserES.criteres);
			bills = {
				total: bills.total + maquillageStuff.total,
				final: bills.final,
				bill: [...bills.bill, ...maquillageStuff.bill],
				// @ts-ignore
				variations: [...bills.variations]
			};
		}

		if (reservation.categories.includes('soins')) {
			const soinsStuff = await this.calculateSoinsPrice(reservation.order, proUserES.criteres);
			bills = {
				total: bills.total + soinsStuff.total,
				final: bills.final,
				bill: [...bills.bill, ...soinsStuff.bill],
				// @ts-ignore
				variations: [...bills.variations]
			};
		}

		if (reservation.categories.includes('coiffure')) {
			const coiffureStuff = await this.calculateCoiffurePrice(reservation.order, proUserES.criteres);
			bills = {
				total: bills.total + coiffureStuff.total,
				final: bills.final,
				bill: [...bills.bill, ...coiffureStuff.bill],
				// @ts-ignore
				variations: [...bills.variations]
			};
		}

		if (reservation.categories.includes('esthetique')) {
			const esthetiqueStuff = await this.calculateEsthetiquePrice(reservation.order, proUserES.criteres);
			bills = {
				total: bills.total + esthetiqueStuff.total,
				final: bills.final,
				bill: [...bills.bill, ...esthetiqueStuff.bill],
				// @ts-ignore
				variations: [...bills.variations]
			};
		}

		if (reservation.order.bookingObj?.optionDivers?.length > 0) {
			// @ts-ignore
			const optionDivers = await this.calculateOptionDiversPrice(
				reservation.order,
				proUserES.options,
				reservation.categories
			);
			bills = {
				total: bills.total + optionDivers.total,
				final: bills.final,
				bill: [...bills.bill, ...optionDivers.bill],
				// @ts-ignore
				variations: [...bills.variations]
			};
		}

		if (reservation?.location?.address?.length > 0) {
			// @ts-ignore
			const travelDistance = await this.calculateFraisDeplacementPrice(reservation, proUserES);
			bills = {
				total: bills.total + travelDistance.total,
				final: bills.final,
				bill: [...bills.bill, ...travelDistance.bill],
				// @ts-ignore
				variations: [...bills.variations]
			};
		}

		if (!proUserES?.variationPeriode?.length) {
			proUserES.variationPeriode = [];
		}
		const totalDays = differenceInDays(reservation.end, reservation.start) + 1;
		const totalOneDay = bills.total / totalDays;

		let appliedVariations: any = new Set<any>();

		const variations = eachDayOfInterval({ start: reservation.start, end: reservation.end }).map(date => {
			let augmentation = 0;
			let inPeriode = false;
			proUserES?.variationPeriode?.map(periode => {
				periode.periodStartDate = new Date(periode.periodStartDate);
				periode.periodEndDate = new Date(periode.periodEndDate);
				if (periode.autoApplication) {
					const currentYear = new Date(Date.now()).getFullYear();
					periode.periodEndDate = new Date(periode.periodEndDate.setFullYear(currentYear));
					periode.periodStartDate = new Date(periode.periodStartDate.setFullYear(currentYear));
				}
				if (isWithinInterval(date, { start: periode.periodStartDate, end: periode.periodEndDate })) {
					inPeriode = true;
					if (isWeekend(date)) {
						augmentation = periode.increaseWeekend;
						if(augmentation>0){
							appliedVariations.add({
								name:`Majoration période weekend`,
								start: periode.periodStartDate,
								end: periode.periodEndDate,
								basePrice: totalOneDay,
								type: VariationTypes.WEEKEND_PERIODE,
								increase: augmentation
							});
						}
					} else {
						augmentation = periode.increaseWeek;
						if(augmentation>0){
							appliedVariations.add({
								name:`Majoration période`,
								start: periode.periodStartDate,
								end: periode.periodEndDate,
								basePrice: totalOneDay,
								type: VariationTypes.WEEK_PERIODE,
								increase: augmentation
							});
						}
					}
				}
			});
			if (!inPeriode) {
				if (isWeekend(date)) {
					augmentation = proUserES.weekendVariationPercentage;
					if(augmentation>0){
						appliedVariations.add({
							name:`Majoration weekend`,
							type: VariationTypes.WEEKEND,
							basePrice: totalOneDay,
							increase: augmentation
						});
					}
				} else {
					augmentation = 0;
				}
			}
			return augmentation;
		});

		const duplicated = [...appliedVariations];
		appliedVariations = uniqWith([...appliedVariations], isEqual);

		appliedVariations = appliedVariations.map(variation => {
			let count = 0;
			const array = duplicated.filter(elm => elm.type === variation.type && elm.start === variation.start);
			count = array.length;
			variation.days = count;
			variation.augmentedPrice = count * ((variation.basePrice * variation.increase) / 100);
			return { ...variation };
		});

		bills.final = variations
			.map((pourcentage: number) => totalOneDay + totalOneDay * (pourcentage / 100))
			.reduce((acc, val) => acc + val, 0);
		bills.variations = appliedVariations;
		return bills;
	}

	async deleteBooking(id: string, user: ClientEntity) {
		const reservation = await this.reservationsService.findReservation(id);
		if (reservation.client.id === user.id) {
			return await this.reservationsService.deleteReservation(reservation);
		} else {
			throw new ForbiddenException();
		}
	}

	public async updateBooking(id: string, order: UpdateBookingDto) {
		return await this.reservationsService.updateReservation(order, id);
	}

	public async findReservation(id: string) {
		return await this.reservationsService.findReservation(id);
	}

	public async findAllBookings(query: any, page: number) {
		const reservations = await this.reservationsService.searchES(query, page);
		// @ts-ignore
		return reservations;
	}

	public async findBooking(id: string) {
		return await this.reservationsService.findES(id);
	}

	public async findBookingPsql(id: string) {
		const reservation = await this.reservationsService.findReservation(id);
		return reservation;
	}

	private async calculatePhotographePrice(order: OrderInterface, criteres: PhotographeCriteresES) {
		let total = 0;
		const bill = new Set();
		const categorie = 'photographe';

		if (!!order.bookingObj.photographe?.dureeMissionPhoto) {
			const qte = order.bookingObj.photographe.dureeMissionPhoto;
			const unitPrice = criteres.photographe_tarif_horaire;
			const totalOption = qte * unitPrice;
			bill.add({
				option: 'Durée de la mission (photos)',
				qte,
				unitPrice,
				total: totalOption,
				categorie,
				unit: 'H'
			});
			total = total + totalOption;
		}

		if (!!order.bookingObj.photographe?.duoPhoto) {
			const unitPrice = criteres.photographe_duoPhotoTarif;
			const totalOption = unitPrice;
			bill.add({ option: 'Duo photo', qte: 1, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj.photographe?.photomaton) {
			const unitPrice = criteres.photographe_photomatonTarifUnique;
			const totalOption = unitPrice;
			bill.add({ option: 'Photomaton', qte: 1, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj.photographe?.photocall) {
			const unitPrice = criteres.photographe_photocallTraifUnique;
			const totalOption = unitPrice;
			bill.add({ option: 'Photocall', qte: 1, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj.photographe?.livraisonHauteResolutionPhoto) {
			const unitPrice = criteres.photographe_livraisonHauteResolutionTarif;
			const totalOption = unitPrice;
			bill.add({
				option: 'Livraison haute résolution (photos)',
				qte: 1,
				unitPrice,
				total: totalOption,
				categorie
			});
			total = total + totalOption;
		}

		if (!!order.bookingObj.photographe?.galeriePrive) {
			const unitPrice = criteres.photographe_galeriePriveTarif;
			const totalOption = unitPrice;
			bill.add({ option: 'Galerie privé (photos)', qte: 1, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj.photographe?.dureeMissionSeanceEngagement) {
			const unitPrice = criteres.photographe_seanceEngagementDureeMinimumTarifHoraire;
			const qte = order.bookingObj.photographe?.dureeMissionSeanceEngagement;
			const totalOption = unitPrice * qte;
			bill.add({
				option: 'Durée mission séance engagement (photos)',
				qte,
				unitPrice,
				total: totalOption,
				qteUnit: 'H',
				categorie
			});
			total = total + totalOption;
		}

		if (!!order.bookingObj.photographe?.dureeMissionSeanceBrunchOuDejeuner) {
			const unitPrice = criteres.photographe_seanceBrunchOuDejeunerDureeMinimumTarifHoraire;
			const qte = order.bookingObj.photographe?.dureeMissionSeanceBrunchOuDejeuner;
			const totalOption = unitPrice * qte;
			bill.add({
				option: 'Séance brunch déjeuner (photos)',
				qte,
				unitPrice,
				total: totalOption,
				qteUnit: 'H',
				categorie
			});
			total = total + totalOption;
		}

		if (!!order.bookingObj.photographe?.dureeMissionSeanceApresMariage) {
			const unitPrice = criteres.photographe_seanceApresMariageDureeMinimumTarifHoraire;
			const qte = order.bookingObj.photographe?.dureeMissionSeanceApresMariage;
			const totalOption = unitPrice * qte;
			bill.add({
				option: 'Séance après mariage (photos)',
				qte,
				unitPrice,
				total: totalOption,
				qteUnit: 'H',
				categorie
			});
			total = total + totalOption;
		}

		if (!!order.bookingObj.photographe?.donneesDvdExamplairesPhoto) {
			const index = criteres.photographe_remiseFormats.findIndex(element => element.name === 'DVD');
			const unitPrice = criteres.photographe_remiseFormats[index].tarifUnitaire;
			const qte = order.bookingObj.photographe?.donneesDvdExamplairesPhoto;
			const totalOption = unitPrice * qte;
			bill.add({ option: 'Données sous dvd (photo)', qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj.photographe?.donneesUsbExamplairesPhoto) {
			const index = criteres.photographe_remiseFormats.findIndex(element => element.name === 'Clé_USB');
			const unitPrice = criteres.photographe_remiseFormats[index].tarifUnitaire;
			const qte = order.bookingObj.photographe?.donneesUsbExamplairesPhoto;
			const totalOption = unitPrice * qte;
			bill.add({ option: 'Données sous usb (photos)', qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj.photographe?.livraisonExpressPhoto) {
			const unitPrice = criteres.photographe_livraisonHauteResolutionTarif;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: 'Livraison express (photos)', qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (order.bookingObj.photographe?.tiragePapier?.length > 0) {
			let totalTiragePapier: number;
			const prices = order.bookingObj.photographe?.tiragePapier.map(format => {
				const formatCriteres = criteres.photographe_tiragePapier.formats.find(
					element => element.name === format.name
				);
				const qte = format.examplaire;
				let unitPrice = 0;
				let totalOption = 0;
				let model;
				if (qte >= 1 && qte < 10) {
					model = formatCriteres.modeles.find(mod => mod.name === '1 à 9 tirages');
					unitPrice = model.tarif;
					totalOption = unitPrice * qte;
				} else if (qte >= 10 && qte < 20) {
					model = formatCriteres.modeles.find(mod => mod.name === '10 à 19 tirages');
					unitPrice = model.tarif;
					totalOption = unitPrice * qte;
				} else if (qte >= 20 && qte < 50) {
					model = formatCriteres.modeles.find(mod => mod.name === '20 à 49 tirages');
					unitPrice = model.tarif;
					totalOption = unitPrice * qte;
				} else if (qte >= 50 && qte < 100) {
					model = formatCriteres.modeles.find(mod => mod.name === '50 à 99 tirages');
					unitPrice = model.tarif;
					totalOption = unitPrice * qte;
				} else if (qte >= 100 && qte < 200) {
					model = formatCriteres.modeles.find(mod => mod.name === '100 à 199 tirages');
					unitPrice = model.tarif;
					totalOption = unitPrice * qte;
				} else if (qte >= 200 && qte < 500) {
					model = formatCriteres.modeles.find(mod => mod.name === '200 à 499 tirages');
					unitPrice = model.tarif;
					totalOption = unitPrice * qte;
				} else if (qte >= 500 && qte < 1000) {
					model = formatCriteres.modeles.find(mod => mod.name === '500 à 999 tirages');
					unitPrice = model.tarif;
					totalOption = unitPrice * qte;
				} else if (qte >= 1000) {
					model = formatCriteres.modeles.find(mod => mod.name === '1000 tirages et plus');
					unitPrice = model.tarif;
					totalOption = unitPrice * qte;
				}
				const finition = [];
				if (order.bookingObj.photographe?.tiragePapierFinitionBrillante) {
					finition.push('Brillant');
				}
				if (order.bookingObj.photographe?.tiragePapierFinitionMate) {
					finition.push('Mate');
				}
				const finitionString = finition.join(' , ');
				bill.add({
					option: `Tirage Papier (${formatCriteres.name}) (${finitionString}) (photos)`,
					qte,
					unitPrice,
					total: totalOption,
					categorie
				});
				return totalOption;
			});
			totalTiragePapier = prices.reduce((val, acc) => {
				return val + acc;
			}, 0);
			total = total + totalTiragePapier;
		}

		if (!!order.bookingObj.photographe?.retouchesPhotoExamplaires) {
			const qte = order.bookingObj.photographe?.retouchesPhotoExamplaires;
			let unitPrice = 0;
			let format: { name: string; tarifUnitaire: number };
			if (qte >= 1 && qte < 10) {
				format = criteres.photographe_retouchesPhotoFormats.find(form => form.name === '1_à_9');
			} else if (qte >= 10 && qte < 20) {
				format = criteres.photographe_retouchesPhotoFormats.find(form => form.name === '10_à_19');
			} else if (qte >= 20 && qte < 50) {
				format = criteres.photographe_retouchesPhotoFormats.find(form => form.name === '20_à_49');
			} else if (qte >= 50 && qte < 100) {
				format = criteres.photographe_retouchesPhotoFormats.find(form => form.name === '50_à_99');
			} else if (qte >= 100 && qte < 200) {
				format = criteres.photographe_retouchesPhotoFormats.find(form => form.name === '100_à_199');
			} else if (qte >= 200 && qte < 500) {
				format = criteres.photographe_retouchesPhotoFormats.find(form => form.name === '200_à_499');
			} else if (qte >= 500 && qte < 1000) {
				format = criteres.photographe_retouchesPhotoFormats.find(form => form.name === '500_à_999');
			} else if (qte >= 1000) {
				format = criteres.photographe_retouchesPhotoFormats.find(form => form.name === '1000_et_plus');
			}
			unitPrice = format.tarifUnitaire;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Retouches photos`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (order.bookingObj?.photographe?.creationAlbum?.length > 0) {
			const finition = [];
			if (order.bookingObj?.photographe.creationAlbumFinitionMate) {
				finition.push('Mate');
			}
			if (order.bookingObj?.photographe.creationAlbumFinitionBrillante) {
				finition.push('Brillant');
			}
			const finitionString = finition.join(' , ');
			order.bookingObj?.photographe.creationAlbum.map(format => {
				const name = format.name;
				const formatCriteres = criteres.photographe_creationAlbum.formats.find(
					element => element.name === format.name
				);
				const models = format.modeles.filter(elm => elm.checked);
				models.map(model => {
					const formatCriteresModel = formatCriteres.modeles.find(elm => elm.name === model.name);
					const unitPrice = formatCriteresModel.tarif;
					const qte = model.examplaire;
					const totalModel = unitPrice * qte;
					bill.add({
						option: `Création album (${name}) (${model.name}) (${finitionString})`,
						qte,
						unitPrice,
						total: totalModel,
						categorie
					});
					total = totalModel + total;
				});
			});
		}

		return { total, bill, categorie };
	}

	private async calculateVideastePrice(order: OrderInterface, criteres: VideasteCriteresES) {
		let total = 0;
		const bill = new Set();
		const categorie = 'videaliste';

		if (!!order.bookingObj.videaliste?.donneesDvdExamplairesVideo) {
			const index = criteres.videaliste_remiseFormats.findIndex(element => element.name === 'DVD');
			const unitPrice = criteres.videaliste_remiseFormats[index].tarifUnitaire;
			const qte = order.bookingObj.videaliste?.donneesDvdExamplairesVideo;
			const totalOption = unitPrice * qte;
			bill.add({ option: 'Données sous dvd (vidéo)', qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj.videaliste?.donneesUsbExamplairesVideo) {
			const index = criteres.videaliste_remiseFormats.findIndex(element => element.name === 'Clé_USB');
			const unitPrice = criteres.videaliste_remiseFormats[index].tarifUnitaire;
			const qte = order.bookingObj.videaliste?.donneesUsbExamplairesVideo;
			const totalOption = unitPrice * qte;
			bill.add({ option: 'Données sous clé usb (vidéo)', qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj.videaliste?.bandeAnnonce) {
			const qte = 1;
			const unitPrice = criteres.videaliste_bandeAnnonceTarif;
			const totalOption = qte * unitPrice;
			bill.add({ option: 'Bande annonce (vidéo)', qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj.videaliste?.dureeMissionVideo) {
			const qte = order.bookingObj.videaliste?.dureeMissionVideo;
			const unitPrice = criteres.videaliste_tarif_horaire;
			const totalOption = qte * unitPrice;
			bill.add({
				option: 'Durée de la mission (vidéo)',
				qte,
				unitPrice,
				total: totalOption,
				categorie,
				unit: 'H'
			});
			total = total + totalOption;
		}

		if (!!order.bookingObj.videaliste?.courtMetrage) {
			const qte = 1;
			const unitPrice = criteres.videaliste_courtMetrageTarif;
			const totalOption = qte * unitPrice;
			bill.add({ option: 'Court métrage', qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj.videaliste?.duoVideo) {
			const qte = 1;
			const unitPrice = criteres.videaliste_duoVideoTarif;
			const totalOption = qte * unitPrice;
			bill.add({ option: 'Duo vidéo', qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj.videaliste?.etalonnageVideo) {
			const qte = 1;
			const unitPrice = criteres.videaliste_etalonnageVideoTarif;
			const totalOption = qte * unitPrice;
			bill.add({ option: 'Étalonnage vidéo', qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj.videaliste?.filmCourt) {
			const qte = 1;
			const unitPrice = criteres.videaliste_filmCourtTarif;
			const totalOption = qte * unitPrice;
			bill.add({ option: 'Film court', qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj.videaliste?.filmLong) {
			const qte = 1;
			const unitPrice = criteres.videaliste_filmLongTarif;
			const totalOption = qte * unitPrice;
			bill.add({ option: 'Film long', qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj.videaliste?.livraisonExpressVideo) {
			const qte = 1;
			const unitPrice = criteres.videaliste_livraisonExpressTarif;
			const totalOption = qte * unitPrice;
			bill.add({ option: 'Livraison express (vidéo)', qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj.videaliste?.livraisonOriginauxHauteResolutionVideo) {
			const qte = 1;
			const unitPrice = criteres.videaliste_livraisonOriginauxHauteResolutionTarif;
			const totalOption = qte * unitPrice;
			bill.add({
				option: 'Livraison des originaux haute définition (vidéo)',
				qte,
				unitPrice,
				total: totalOption,
				categorie
			});
			total = total + totalOption;
		}

		if (!!order.bookingObj.videaliste?.videoAerienne) {
			const qte = 1;
			const unitPrice = criteres.videaliste_videoAerienneTarif;
			const totalOption = qte * unitPrice;
			bill.add({ option: 'Vidéo aérienne (Drone)', qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		return { total, bill, categorie };
	}

	private async calculateGateauMariagePrice(order: OrderInterface, criteres: GateauMariageCriteresES) {
		let total = 0;
		const bill = new Set();
		const categorie = 'gateaumariage';

		if(criteres.gateaumariage_tarif_horaire){
			const unitPrice = criteres.gateaumariage_tarif_horaire;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Tarif de location (Gateau)`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj.gateau?.livraison) {
			const unitPrice = criteres.gateaumariage_gateaux.livraison.tarif;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: 'Livraison (Gâteau)', qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.gateau?.produits) {
			order.bookingObj.gateau?.produits.map((produit) => {
				if (!!produit.value) {
					const option = criteres.gateaumariage_gateaux.options.find(opt => opt.name === produit.name);
					const unitPrice = option.opts.find(res=>res.name==='Tarif par part').value;
					const qte = produit.nbrParts;
					const totalOption = unitPrice * qte;
					bill.add({ option: `${option.name} (Gâteau)`, qte, unitPrice, total: totalOption, categorie });
					total = total + totalOption;
				}
			});
		}

		return { total, bill, categorie };
	}

	private async calculateLieuPrice(order: OrderInterface, criteres: LieuCriteresES) {
		let total = 0;
		const bill = new Set();
		const categorie = 'lieu';

		if ((!!order.bookingObj.lieu.debutLocation) && (!!order.bookingObj.lieu.limiteHoraire)) {
			const start = order.bookingObj.lieu.debutLocation;
			const end = order.bookingObj.lieu.limiteHoraire;
			const unitPrice = criteres.lieu_tarif_horaire;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({
				option: `Tarif de location (Lieu) (${start.heure}:${start.min} - ${end.heure}:${end.min})`,
				qte,
				unitPrice,
				total: totalOption,
				categorie,
			});
			total = total + totalOption;
		}

		if (!!order.bookingObj?.lieu.chambrePourLesMariee) {
			const unitPrice = criteres.lieu_chambrePourLesMarieeTarif;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Chambre pour les mariés`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.lieu.cuisinePourLeTraiteur) {
			const unitPrice = criteres.lieu_cuisinePourLeTraiteurTarif;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Cuisine pour le traiteur`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.lieu.terrasse) {
			const unitPrice = criteres.lieu_terrasseTarif;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Terrasse`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.lieu.jardin) {
			const unitPrice = criteres.lieu_jardinTarif;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Jardin`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.lieu.chapiteau) {
			const unitPrice = criteres.lieu_chapiteauTarif;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Chapiteau`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.lieu.parking) {
			const unitPrice = criteres.lieu_parkingTarif;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Parking x ${order.bookingObj?.lieu.parkingNbrPlace}`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.lieu.hebergementInvites) {
			const unitPrice = criteres.lieu_hebergementInvitesTarif;
			const qte = order.bookingObj?.lieu.hebergementInvitesNbrInvites;
			const nuits=order.bookingObj?.lieu.hebergementInvitesNbrDeNuits;
			const qteFinale = qte * nuits;
			const totalOption = unitPrice * qteFinale;
			bill.add({
				option: `Hébergement invités ( ${nuits} nuits)`,
				qte,
				unitPrice,
				total: totalOption,
				categorie,
				unit:'invités'
			});
			total = total + totalOption;
		}

		if (!!order.bookingObj?.lieu.decoration) {
			const unitPrice = criteres.lieu_decorationTarif;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Décoration`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.lieu.vaiselleEtCouvert) {
			const unitPrice = criteres.lieu_laviselleEtCouvertTarif;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Vaisselle et Couverts`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.lieu.drapeDeTable) {
			const unitPrice = criteres.lieu_drapeDeTableTarif;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Drapé de table`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.lieu.salleDeReception) {
			const unitPrice = 0;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Salle de réception`,inclus:true, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.lieu.pisteDeDense) {
			const unitPrice = 0;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Piste de danse`,inclus:true, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		return { total, bill, categorie };
	}

	private async calculateTraiteurPrice(order: OrderInterface, criteres: TraiteurCriteresES) {
		let total = 0;
		const bill = new Set();
		const categorie = 'traiteur';

		if(criteres.traiteur_tarif_horaire){
			const unitPrice = criteres.traiteur_tarif_horaire;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Tarif de location (Traiteur)`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.traiteur.droitDeBouchon && !!order.bookingObj?.traiteur.droitDeBouchonNbrBouteilles) {
			const unitPrice = criteres.traiteur_droitDeBouchonTarif;
			const qte = order.bookingObj?.traiteur.droitDeBouchonNbrBouteilles;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Droit de bouchon`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.traiteur.serviceEnSalle) {
			const unitPrice = criteres.traiteur_serviceEnSalleTarif;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Service en salle`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.traiteur.serviceDebarrassageEtNettoyage) {
			const unitPrice = criteres.traiteur_serviceDebarrassageEtNettoyageTarif;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Service de débarrassage et nettoyage`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (order.bookingObj?.traiteur.boissonsAlcoolises?.length > 0) {
			order.bookingObj?.traiteur.boissonsAlcoolises.map((res) => {
				if(res.value){
					const option = criteres.traiteur_boissonsAlcoolises.options.find(op => op.name === res.name);
					const unitPrice = option.tarif;
					const qte = res.nbrPieces;
					const totalOption = unitPrice * qte;
					bill.add({ option: `${option.name}`, qte, unitPrice, total: totalOption, categorie });
					total = total + totalOption;
				}
			});
		}

		if (order.bookingObj?.traiteur.boissonsNonAlcoolises?.length > 0) {
			order.bookingObj?.traiteur.boissonsNonAlcoolises.map((res) => {
				if(res.value){
					const option = criteres.traiteur_boissonsNonAlcoolises.options.find(op => op.name === res.name);
					const unitPrice = option.tarif;
					const qte = res.nbrPieces;
					const totalOption = unitPrice * qte;
					bill.add({ option: `${option.name}`, qte, unitPrice, total: totalOption, categorie });
					total = total + totalOption;
				}
			});
		}

		if (order.bookingObj?.traiteur.Dinner.products?.length > 0) {
			order.bookingObj?.traiteur.Dinner.products.map((res) => {
					const products = criteres.traiteur_Dinner.products.find(prod => prod.name === res.name);
					res.options.map(opt=>{
						if(opt.value){
							const option = products.options.find(op=>op.name===opt.name);
							const unitPrice = option.tarif;
							const qte = opt.nbrPieces;
							const totalOption = unitPrice * qte;
							bill.add({ option: `${option.name} ( ${products.name} )`, qte, unitPrice, total: totalOption, categorie });
							total = total + totalOption;
						}
					})

			});
		}

		if (order.bookingObj?.traiteur.vinHonneurCocktailBuffet.products?.length > 0) {
			order.bookingObj?.traiteur.vinHonneurCocktailBuffet.products.map((res) => {
					const products = criteres.traiteur_vinHonneurCocktailBuffet.products.find(prod => prod.name === res.name);
					res.options.map(opt=>{
						if(opt.value){
							const option = products.options.find(op=>op.name===opt.name);
							const unitPrice = option.tarif;
							const qte = opt.nbrPieces;
							const totalOption = unitPrice * qte;
							bill.add({ option: `${option.name} ( ${products.name} )`, qte, unitPrice, total: totalOption, categorie });
							total = total + totalOption;
						}
					})

			});
		}


		return { total, bill, categorie };
	}



	private async calculateMaquillagePrice(order: OrderInterface, criteres: MaquillageCriteresES) {
		let total = 0;
		const bill = new Set();
		const categorie = 'maquillage';

		if (!!order.bookingObj?.maquillage?.maquillageNombre) {
			const unitPrice = criteres.maquillage_tarif_horaire;
			const qte = order.bookingObj?.maquillage.maquillageNombre;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Nombre de maquillages`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.maquillage?.conseilsPersonnalises) {
			const unitPrice = criteres.maquillage_conseilsPersonnalisesTarif;
			const qte = order.bookingObj?.maquillage?.conseilsPersonnalisesDuree;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Rendez-vous conseils (Maquillage)`, qte, unitPrice, total: totalOption, categorie, unit:'H' });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.maquillage?.essais) {
			const unitPrice = criteres.maquillage_essaisTarif;
			const qte = order.bookingObj?.maquillage?.essaisNombre;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Essais (Maquillage)`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.maquillage?.majorationTypeDePeau) {
			order.bookingObj?.maquillage?.majorationTypeDePeau.map(res => {
				if(res.checked){
					const option = criteres.maquillage_majorationTypeDePeau.options.find(opt => opt.name === res.name);
					const unitPrice = option.majoration * 0.01 * criteres.maquillage_tarif_horaire;
					const qte = 1;
					const totalOption = unitPrice * qte;
					bill.add({ option: `Majoration type de peau (${option.name}) (Maquillage)`, qte, unitPrice, total: totalOption, categorie });
					total = total + totalOption;
				}
			});
		}

		if (order.bookingObj?.maquillage?.produitsEtAccessoires?.length > 0) {
			order.bookingObj.maquillage.produitsEtAccessoires.map(res => {
				if (res.checked) {
					const option = criteres.maquillage_produitsEtAccessoires.options.find(opt => opt.name === res.name);
					const unitPrice = option.tarif;
					const qte = res.quantity;
					const totalOption = unitPrice * qte;
					bill.add({ option: ` Produits et Accessoires (${option.name}) (Maquillage)`, qte, unitPrice, total: totalOption, categorie });
					total = total + totalOption;
				}
			});
		}

		if (order.bookingObj?.maquillage?.prestationInvitesProches?.length > 0) {
			order.bookingObj.maquillage.prestationInvitesProches.map(res => {
				if (res.checked) {
					res.options.map(opts=>{
						criteres.maquillage_prestationInvitesProches.prestations.map(opt=>{
							const option = opt.options.find(o=>o.name===opts.name)
							const unitPrice = option.tarif;
							const qte = opts.value;
							const totalOption = unitPrice * qte;
							bill.add({ option: ` Préstations pour les invités (${option.name})`, qte, unitPrice, total: totalOption, categorie });
							total = total + totalOption;
						});

					})
				}
			});
		}

		return { total, bill, categorie };
	}

	private async calculateSoinsPrice(order: OrderInterface, criteres: SoinsCriteresES) {
		let total = 0;
		const bill = new Set();
		const categorie = 'soins';

		if(criteres.soins_tarif_horaire){
			const unitPrice = criteres.soins_tarif_horaire;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Tarif de location (Soins)`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.soins.conseilsPersonnalises) {
			const unitPrice = criteres.soins_conseilsPersonnalisesTarif;
			const qte = order.bookingObj?.soins.conseilsPersonnalisesDuree;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Rendez-vous conseils (Soins)`, qte, unitPrice, total: totalOption, categorie, unit:'H' });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.soins.essais) {
			const unitPrice = criteres.soins_essaisTarif;
			const qte = order.bookingObj?.soins.essaisNombre;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Essais (Soins)`, qte, unitPrice, total: totalOption, categorie});
			total = total + totalOption;
		}

		if (order.bookingObj?.soins?.soins?.length > 0) {
			order.bookingObj.soins.soins.map(bookingRes=>{
				if(bookingRes.checked){
					const prestations = criteres.soins_soins.prestations.find(opt=>opt.name===bookingRes.name);
					bookingRes.options.map(opt=>{
						if(opt.checked){
							const option = prestations.options.find(o=>o.name===opt.name);
							const unitPrice = option.tarif;
							const qte = opt.value;
							const totalOption = unitPrice * qte;
							bill.add({ option: `Soins ${prestations.name} (${opt.name}) (Soins)`, qte, unitPrice, total: totalOption, categorie});
							total = total + totalOption;
						}
					})
				}
			})
		}

		if (order.bookingObj?.soins?.massage?.length > 0) {
			order.bookingObj.soins.massage.map(bookingRes=>{
				if(bookingRes.checked){
					const prestations = criteres.soins_massage.prestations.find(opt=>opt.name===bookingRes.name);
					bookingRes.options.map(opt=>{
						if(opt.checked){
							const option = prestations.options.find(o=>o.name===opt.name);
							const unitPrice = option.tarif;
							const qte = opt.value;
							const totalOption = unitPrice * qte;
							bill.add({ option: `Massage ${prestations.name} (${opt.name}) (Soins)`, qte, unitPrice, total: totalOption, categorie});
							total = total + totalOption;
						}
					})
				}
			})
		}

		return { total, bill, categorie };
	}

	private async calculateEsthetiquePrice(order: OrderInterface, criteres: EsthetiqueCriteresES) {
		let total = 0;
		const bill = new Set();
		const categorie = 'esthetique';

		if(criteres.esthetique_tarif_horaire){
			const unitPrice = criteres.esthetique_tarif_horaire;
			const qte = 1;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Tarif de location (Esthetique)`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.esthetique.conseilsPersonnalises) {
			const unitPrice = criteres.esthetique_conseilsPersonnalisesTarif;
			const qte = order.bookingObj?.esthetique.conseilsPersonnalisesDuree;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Rendez-vous conseils (Esthétique)`, qte, unitPrice, total: totalOption, categorie, unit:'H' });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.esthetique.essais) {
			const unitPrice = criteres.esthetique_essaisTarif;
			const qte = order.bookingObj?.esthetique.essaisNombre;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Essais (Esthétique)`, qte, unitPrice, total: totalOption, categorie});
			total = total + totalOption;
		}

		if (order.bookingObj?.esthetique?.manucureEtpedicure?.length > 0) {
			order.bookingObj.esthetique.manucureEtpedicure.map(bookingRes=>{
				if(bookingRes.checked){
					const prestations = criteres.esthetique_manucureEtpedicure.prestations.find(opt=>opt.name===bookingRes.name);
					bookingRes.options.map(opt=>{
						if(opt.checked){
							const option = prestations.options.find(o=>o.name===opt.name);
							const unitPrice = option.tarif;
							const qte = opt.value;
							const totalOption = unitPrice * qte;
							bill.add({ option: `Manucure et pédicure ${prestations.name} (${opt.name}) (Esthétique)`, qte, unitPrice, total: totalOption, categorie});
							total = total + totalOption;
						}
					})
				}
			})
		}

		if (order.bookingObj?.esthetique?.epilation?.length > 0) {
			order.bookingObj.esthetique.epilation.map(bookingRes=>{
				if(bookingRes.checked){
					const prestations = criteres.esthetique_epilation.prestations.find(opt=>opt.name===bookingRes.name);
					bookingRes.options.map(opt=>{
						if(opt.checked){
							const option = prestations.options.find(o=>o.name===opt.name);
							const unitPrice = option.tarif;
							const qte = opt.value;
							const totalOption = unitPrice * qte;
							bill.add({ option: `Épilation ${prestations.name} (${opt.name}) (Esthétique)`, qte, unitPrice, total: totalOption, categorie});
							total = total + totalOption;
						}
					})
				}
			})
		}


		return { total, bill, categorie };
	}

	private async calculateCoiffurePrice(order: OrderInterface, criteres: CoiffureCriteresES) {
		let total = 0;
		const bill = new Set();
		const categorie = 'coiffure';

		if (!!order.bookingObj?.coiffure?.coiffureNombre) {
			const unitPrice = criteres.coiffure_tarif_horaire;
			const qte = order.bookingObj?.coiffure.coiffureNombre;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Nombre de coiffures`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.coiffure.conseilsPersonnalises) {
			const unitPrice = criteres.coiffure_conseilsPersonnalisesTarif;
			const qte = order.bookingObj?.coiffure.conseilsPersonnalisesDuree;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Rendez-vous conseils (Coiffure)`, qte, unitPrice, total: totalOption, categorie, unit:'H' });
			total = total + totalOption;
		}

		if (!!order.bookingObj?.coiffure.essais) {
			const unitPrice = criteres.coiffure_essaisTarif;
			const qte = order.bookingObj?.coiffure.essaisNombre;
			const totalOption = unitPrice * qte;
			bill.add({ option: `Essais (Coiffure)`, qte, unitPrice, total: totalOption, categorie});
			total = total + totalOption;
		}

		if (order.bookingObj?.coiffure?.majorationTypeCheveux?.length > 0) {
			order.bookingObj.coiffure.majorationTypeCheveux.map(bookingRes=>{
				if(bookingRes.checked){
					const option = criteres.coiffure_majorationTypeCheveux.options.find(opt=>opt.name===bookingRes.name);
					const unitPrice = option.majoration * 0.01 * criteres.coiffure_tarif_horaire;
					const qte = 1;
					const totalOption = unitPrice * qte;
					bill.add({ option: `Majoration type cheveux (${option.name}) (Coiffure)`, qte, unitPrice, total: totalOption, categorie});
					total = total + totalOption;
				}
			})
		}

		if (order.bookingObj?.coiffure?.produitsEtAccessoires?.length > 0) {
			order.bookingObj.coiffure.produitsEtAccessoires.map(bookingRes=>{
				if(bookingRes.checked){
					const option = criteres.coiffure_produitsEtAccessoires.options.find(opt=>opt.name===bookingRes.name);
					const unitPrice = option.tarif;
					const qte = bookingRes.quantity;
					const totalOption = unitPrice * qte;
					bill.add({ option: `Produits et accessoires (${option.name}) (Coiffure)`, qte, unitPrice, total: totalOption, categorie});
					total = total + totalOption;
				}
			})
		}

		if (order.bookingObj?.coiffure?.prestationInvitesProches?.length > 0) {
			order.bookingObj.coiffure.prestationInvitesProches.map(bookingRes=>{
				if(bookingRes.checked){
					const prestations = criteres.coiffure_prestationInvitesProches.prestations.find(opt=>opt.name===bookingRes.name);
					bookingRes.options.map(opt=>{
							const option = prestations.options.find(o=>o.name===opt.name);
							const unitPrice = option.tarif;
							const qte = opt.value;
							const totalOption = unitPrice * qte;
							bill.add({ option: `${prestations.name} (${opt.name}) (Coiffure)`, qte, unitPrice, total: totalOption, categorie});
							total = total + totalOption;
					})
				}
			})
		}



		return { total, bill, categorie };
	}


	private async calculateOptionDiversPrice(order: OrderInterface, options: OptionEntity[], categories: string[]) {
		order.bookingObj.optionDivers = order.bookingObj.optionDivers.filter(res => {
			const optionES = options.find(elm => elm.name === res.name);
			return optionES.categories.some(t => categories.includes(t));
		});
		let total = 0;
		const bill = new Set();
		const categorieG = `options divers`;
		const data = order.bookingObj.optionDivers.map(option => {
			const optionES = options.find(elm => elm.name === option.name);
			const categorie = `options divers (${optionES.feeType})`;
			let qte;
			let unitPrice;
			let totalOption;

			if (optionES.feeType === FeeType.SINGLE_FEE) {
				qte = 1;
				unitPrice = optionES.optionRate;
				totalOption = qte * unitPrice;
			}

			if (optionES.feeType === FeeType.GUEST_FEE) {
				qte = order.guestsNumber;
				unitPrice = optionES.optionRate;
				totalOption = qte * unitPrice;
			}

			if (optionES.feeType === FeeType.UNIT_FEE) {
				// @ts-ignore
				qte = option.examplaire;
				unitPrice = optionES.optionRate;
				totalOption = qte * unitPrice;
			}

			bill.add({ option: `${optionES.name}`, qte, unitPrice, total: totalOption, categorie });
			total = total + totalOption;
		});
		return { total, bill, categorieG };
	}

	private async calculateFraisDeplacementPrice(reservation: ReservationEntity, proUserES: UserCategoriesIndexModel) {
		let total = 0;
		const bill = new Set();
		const categorieG = `frais de déplacement`;
		if (!!proUserES.tripExpences) {
			if (proUserES.tripExpences.rateType === TripFeeType.SINGLE_FEE) {
				const categorie = `frais de déplacement (${proUserES.tripExpences.rateType})`;
				const qte = 1;
				const unitPrice = proUserES.tripExpences.typePrice;
				const totalOption = qte * unitPrice;
				total = total + totalOption;
				bill.add({ option: `Frais de déplacement`, qte, unitPrice, total: totalOption, categorie });
			}

			if (proUserES.tripExpences.rateType === TripFeeType.FEE_PER_KM) {
				const config: AxiosRequestConfig = {
					params: {
						units: 'metric',
						mode: 'driving',
						key: 'AIzaSyBkjTJgW1LxVJUqIi-wPQsce-GFAtzKJkQ',
						origins: `${reservation.location.geo.lat},${reservation.location.geo.lon}`,
						destinations: `${proUserES.location.geo.lat},${proUserES.location.geo.lon}`
					}
				};
				const { data } = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json`, config);
				const categorie = `frais de déplacement (${proUserES.tripExpences.rateType})`;
				const totalDistance = data.rows[0].elements[0].distance.value / 1000;
				if (totalDistance > proUserES.tripExpences.distance) {
					const qte = totalDistance - proUserES.tripExpences.distance;
					const unitPrice = proUserES.tripExpences.typePrice;
					const totalOption = qte * unitPrice;
					total = total + totalOption;
					bill.add({ option: `Frais de déplacement`, qte, unitPrice, total: totalOption, categorie, unit: 'KM' });
				}
			}
		}
		return { total, bill, categorieG };
	}

	public async validateReservationByClient(order: UpdateBookingDto, id: string) {
		return await this.reservationsService.validateReservationByClient(order, id);
	}
}
