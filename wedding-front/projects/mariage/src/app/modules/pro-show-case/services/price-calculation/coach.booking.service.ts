import { Injectable } from '@angular/core';
import { BookingService } from '../booking.service';
import { FeeType } from '../../../user/models/option.model';
import { CoachBookingInterface } from '../../components/pro-showcase/categories/coach/coach.booking.interface';
import { CoachCriteres } from '../../../user/components/company/company-details/coach/coach.interface';
import { Setting } from '../../../user/models/setting.model';

@Injectable({providedIn: 'root'})
export class CoachBookingService {
    constructor(private readonly bookingService: BookingService) { }
    priceForOptionDivers(bookingObj: CoachBookingInterface, numberOfGuests: number, total: number): number {
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
    setInitialPrice(
        bookingObj: CoachBookingInterface,
        coachCriteres: CoachCriteres,
        ): number {
		let total = 0;

        total = bookingObj.coach.selected ? total += coachCriteres.tarif_horaire * bookingObj.coach.durreDeLaMission : total;

		return total;
    }
    priceForServices(
        bookingObj: CoachBookingInterface,
        coachCriteres: CoachCriteres,
        total: number,
        ): number {
            if (!!bookingObj.coach.servicesAssocies?.length) {
                bookingObj.coach.servicesAssocies.forEach(service => {
                    if (service.value) {
                        const serviceCriteres = coachCriteres.servicesAssocies.options.find( s => s.name === service.name);
                        total = serviceCriteres.inclusDansPrix ? total : total + serviceCriteres.tarif;
                    }
                });
            }

		return total;
    }
    calculatePrice(
        bookingObj: CoachBookingInterface,
        coachCriteres: CoachCriteres,
        numberOfGuests: number,
        bookingDate: {startDate: Date, endDate: Date},
        settings: Setting[],
        categories: string[],
        weekendVariation: {value: boolean, percentage: number},
        ): number {
		let total = 0;
        if (bookingObj.coach.selected) {
            total += coachCriteres.tarif_horaire * bookingObj.coach.durreDeLaMission;

            total = this.priceForServices(bookingObj, coachCriteres, total);

            total = bookingObj.coach.conseilsPersonnalises ? total + coachCriteres.conseilsPersonnalisesTarif : total;

            total = bookingObj.coach.essais ? total + coachCriteres.essaisTarif : total;
        }
        // option divers
        total = this.priceForOptionDivers(bookingObj, numberOfGuests, total);

        // majoration
        total = this.bookingService.applyMajorationToTotal(total, bookingDate, settings, categories, weekendVariation);

		return total;
    }
}