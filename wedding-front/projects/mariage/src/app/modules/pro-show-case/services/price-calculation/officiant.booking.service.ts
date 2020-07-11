import { Injectable } from '@angular/core';
import { BookingService } from '../booking.service';
import { FeeType } from '../../../user/models/option.model';
import { OfficiantBookingInterface } from '../../components/pro-showcase/categories/officiant/officiant.booking.interface';
import { OfficiantCriteres } from '../../../user/components/company/company-details/officiant/officiant.interface';

import { Setting } from '../../../user/models/setting.model';

@Injectable({ providedIn: 'root' })
export class OfficiantBookingService {
	constructor(private readonly bookingService: BookingService) {}

	priceForOptionDivers(bookingObj: OfficiantBookingInterface, numberOfGuests: number, total: number): number {
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

	setInitialPrice(bookingObj: OfficiantBookingInterface, officiantCriteres: OfficiantCriteres): number {
		let total = 0;

		total += bookingObj.officiant.durreDeLaMission * officiantCriteres.tarif_horaire;

		return total;
	}

	priceForServices(
		bookingObj: OfficiantBookingInterface,
		officiantCriteres: OfficiantCriteres,
		total: number
	): number {
		if (!!bookingObj.officiant.services?.length) {
			bookingObj.officiant.services.forEach(service => {
				if (service.checked) {
					const serviceCriteres = officiantCriteres.servicesAssocies.options.find(
						s => s.name === service.name
					);
					total = serviceCriteres.inclusDansPrix ? total : total + serviceCriteres.tarif;
				}
			});
		}
		return total;
	}
	calculatePrice(
		bookingObj: OfficiantBookingInterface,
		officiantCriteres: OfficiantCriteres,
		numberOfGuests: number,
		bookingDate: { startDate: Date; endDate: Date },
		settings: Setting[],
		categories: string[],
		weekendVariation: { value: boolean; percentage: number }
	): number {
		let total = 0;

		// duree mission officiant

		total += officiantCriteres.tarif_horaire * bookingObj.officiant.durreDeLaMission;

		// prix officiant services
		total = this.priceForServices(bookingObj, officiantCriteres, total);

		//  price conseils

		total = bookingObj.officiant.conseilsPersonnalises
			? total + officiantCriteres.conseilsPersonnalisesTarif
			: total;

		// option divers
		total = this.priceForOptionDivers(bookingObj, numberOfGuests, total);

		// majoration
		total = this.bookingService.applyMajorationToTotal(total, bookingDate, settings, categories, weekendVariation);

		return total;
	}
}
