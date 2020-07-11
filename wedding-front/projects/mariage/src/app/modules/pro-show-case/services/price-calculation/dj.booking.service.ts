import { Injectable } from '@angular/core';
import { BookingService } from '../booking.service';
import { DjBookingInterface } from '../../components/pro-showcase/categories/dj/dj.booking.interface';
import { FeeType } from '../../../user/models/option.model';
import { DjCriteres } from '../../../user/components/company/company-details/dj/dj.interface';
import { Setting } from '../../../user/models/setting.model';

@Injectable({
	providedIn: 'root'
})
export class DjBookingService {
	constructor(private readonly bookingService: BookingService) {}

	priceForOptionDivers(bookingObj: DjBookingInterface, numberOfGuests: number, total: number): number {
		if (!!bookingObj?.optionDivers) {
			bookingObj.optionDivers.forEach(opt => {
				if (opt.checked) {
					switch (opt.feeType) {
						case FeeType.SINGLE_FEE:
							total += opt.optionRate;
							break;
						case FeeType.UNIT_FEE:
							total += opt.examplaire * opt.optionRate;
							break;
						case FeeType.GUEST_FEE:
							total += numberOfGuests * opt.optionRate;
							break;
						default:
							break;
					}
				}
			});
		}
		return total;
	}

	setInitialPrice(bookingObj: DjBookingInterface, djCriteres: DjCriteres): number {
		let total = 0;

		total += bookingObj.dj.dureeMissionDj * djCriteres.tarif_horaire;

		return total;
	}

	setCritereObj(prefix: string, esObject: any): any {
		const objectKeys = Object.keys(esObject);
		const object = {};
		objectKeys.forEach(key => {
			if (key.includes(prefix)) {
				object[key.replace(prefix, '')] = esObject[key];
			}
		});
		return object;
	}

	calculatePrice(
		bookingObj: DjBookingInterface,
		djCriteres: DjCriteres,
		numberOfGuests: number,
		bookingDate: { startDate: Date; endDate: Date },
		settings: Setting[],
		categories: string[],
		weekendVariation: { value: boolean; percentage: number }
	): number {
		let total = 0;
		// dj

		// duree mission dj
		total = bookingObj.dj?.dureeMissionDj
			? (total += bookingObj.dj.dureeMissionDj * djCriteres.tarif_horaire)
			: total;

		// Services

		total = this.priceForServices(bookingObj, djCriteres, total);

		// Matriels

		total = this.priceForMatriels(bookingObj, djCriteres, total);

		// option divers
		total = this.priceForOptionDivers(bookingObj, numberOfGuests, total);

		total = this.bookingService.applyMajorationToTotal(total, bookingDate, settings, categories, weekendVariation);
		return total;
	}

	priceForServices(bookingObj: DjBookingInterface, djCriteres: DjCriteres, total: number): number {
		if (!!bookingObj.dj.services?.length) {
			bookingObj.dj.services.forEach(animation => {
				if (animation.checked) {
					const animationCritere = djCriteres.animations.options.find(s => s.name === animation.name);
					total = total + animationCritere.tarif;
				}
			});
		}

		return total;
	}

	priceForMatriels(bookingObj: DjBookingInterface, djCriteres: DjCriteres, total: number): number {
		if (!!bookingObj.dj.matriels?.length) {
			bookingObj.dj.matriels.forEach(materiel => {
				if (materiel.checked) {
					const materielCritere = djCriteres.materiels.options.find(s => s.name === materiel.name);
					total = total + materielCritere.tarif;
				}
			});
		}

		return total;
	}
}
