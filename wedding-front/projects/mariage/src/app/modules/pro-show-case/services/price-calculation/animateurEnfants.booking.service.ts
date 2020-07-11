import { Injectable } from '@angular/core';
import { BookingService } from '../booking.service';
import { FeeType } from '../../../user/models/option.model';
import { AnimateurEnfantBookingInterface } from '../../components/pro-showcase/categories/animateur-enfants/animateurEnfant.booking.interface';
import { AnimateurEnfantsCriteres } from '../../../user/components/company/company-details/animateur-enfants/animateur-enfants.interface';

import { Setting } from '../../../user/models/setting.model';

@Injectable({ providedIn: 'root' })
export class AnimateurEnfantsBookingService {
	constructor(private readonly bookingService: BookingService) {}

	priceForOptionDivers(bookingObj: AnimateurEnfantBookingInterface, numberOfGuests: number, total: number): number {
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
		bookingObj: AnimateurEnfantBookingInterface,
		animateurEnfantsCriteres: AnimateurEnfantsCriteres,
		numberOfGuests: number,
		bookingDate: { startDate: Date; endDate: Date },
		settings: Setting[],
		categories: string[],
		weekendVariation: { value: boolean; percentage: number }
	): number {
		let total = 0;
		// animateur

		// duree mission animateur
		total = bookingObj.animateur?.dureeMissionAnimateur
			? (total += bookingObj.animateur.dureeMissionAnimateur * animateurEnfantsCriteres.tarif_horaire)
			: total;

		// animations

		total = this.priceForAnimations(bookingObj, animateurEnfantsCriteres, total);

		// option divers
		total = this.priceForOptionDivers(bookingObj, numberOfGuests, total);

		total = this.bookingService.applyMajorationToTotal(total, bookingDate, settings, categories, weekendVariation);
		return total;
	}

	setInitialPrice(
		bookingObj: AnimateurEnfantBookingInterface,
		animateurEnfantsCriteres: AnimateurEnfantsCriteres
	): number {
		let total = 0;

		total += bookingObj.animateur.dureeMissionAnimateur * animateurEnfantsCriteres.tarif_horaire;

		return total;
	}

	priceForAnimations(
		bookingObj: AnimateurEnfantBookingInterface,
		animateurEnfantsCriteres: AnimateurEnfantsCriteres,
		total: number
	): number {
		if (!!bookingObj.animateur.animations?.length) {
			bookingObj.animateur.animations.forEach(animation => {
				if (animation.checked) {
					const animationCritere = animateurEnfantsCriteres.animations.options.find(
						s => s.name === animation.name
					);
					total = total + animationCritere.tarif;
				}
			});
		}

		return total;
	}
}
