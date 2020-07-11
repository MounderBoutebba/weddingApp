import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'projects/mariage/src/environments/environment';
import { Setting } from '../../user/models/setting.model';
import { BookingStore } from '../../store/booking';

@Injectable({ providedIn: 'root' })
export class BookingService {

	initialPrice: Subject<number> = new Subject<number>();
	bookingPeriodeMaj: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	bookingWeekEndMaj: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	totalToggledAccordeon: Subject<boolean> = new Subject<boolean>();
	nbrInvitesToggledAccordeon: Subject<boolean> = new Subject<boolean>();

	constructor(private readonly http: HttpClient,
				private readonly bookingStore: BookingStore) {}


  // tslint:disable-next-line:max-line-length
  public createBooking(
    userId: string,
    categories: string[],
    start: Date,
    end: Date,
    order: {bookingObj: any, guestsNumber: number},
    location: { address: string, geo: { lat: number, lon: number } }
  ): Observable<any> {
		return this.http.post(`${environment.apiUrl}/booking/`, {
			userId,
			categories,
			start,
			end,
			order,
      location
		});
	}

  public applyMajorationToTotal(
    total: number,
    bookingDate: { startDate: Date, endDate: Date },
    settings: Setting[],
    categories: string[],
    weekendVariation: { value: boolean, percentage: number }): number {
		if (!!bookingDate.startDate && !!bookingDate.endDate) {
			const oneDayCategories = [
				'dj', 'musicien', 'groupe', 'animateurAdultes', 'animateurEnfants', 'feuArtifices',
				'lacher', 'lieu', 'traiteur', 'gateaumariage', 'photographe',
				'videaliste', 'coiffure', 'maquillage', 'estetique', 'soins',
				'choregrapheMariage', 'coachSportif', 'officiantCeremonie', 'decorateur',
				'fleuriste', 'faireparts'
			];
			let isOneDayCategories = false;
			let percentageToAdd = 0;
			categories.forEach(cat => {
				if (oneDayCategories.includes(cat)) {
					isOneDayCategories = true;
				}
			});
			if (isOneDayCategories) {
				const date: Date = bookingDate.startDate;
				const isWeekend = date?.getDay() === 6 || date?.getDay() === 0;
				if (isWeekend && weekendVariation.value) {
					percentageToAdd = weekendVariation.percentage;
					this.bookingWeekEndMaj.next(total * percentageToAdd * 0.01);
					this.bookingPeriodeMaj.next(0);
				} else {
					percentageToAdd = 0;
					this.bookingWeekEndMaj.next(total * percentageToAdd * 0.01);
					this.bookingPeriodeMaj.next(total * percentageToAdd * 0.01);
				}
				settings.forEach(opt => {
					console.log('opt', opt);
					opt.periodStartDate = new Date(opt.periodStartDate);
					opt.periodEndDate = new Date(opt.periodEndDate);
					if (opt.autoApplication) {
						// apply this for all the years
						const newDate = new Date(date);
						newDate.setFullYear(opt.periodStartDate.getFullYear());
						if (opt.periodStartDate <= newDate && opt.periodEndDate >= newDate) {
							if (isWeekend) {
								percentageToAdd = opt.increaseWeekend;
								this.bookingWeekEndMaj.next(total * percentageToAdd * 0.01);
								this.bookingPeriodeMaj.next(0);
							} else {
								percentageToAdd = opt.increaseWeek;
								this.bookingPeriodeMaj.next(total * percentageToAdd * 0.01);
								this.bookingWeekEndMaj.next(0);
							}
						}
					} else {
						// only for the current year
						if (opt.periodStartDate <= date && opt.periodEndDate >= date) {
							if (isWeekend) {
								percentageToAdd = opt.increaseWeekend;
								this.bookingWeekEndMaj.next(total * percentageToAdd * 0.01);
								this.bookingPeriodeMaj.next(0);
							} else {
								percentageToAdd = opt.increaseWeek;
								this.bookingPeriodeMaj.next(total * percentageToAdd * 0.01);
								this.bookingWeekEndMaj.next(0);
							}
						}
					}
				});
			}
			console.log('percentageToAdd', percentageToAdd);
			return total+= total * percentageToAdd * 0.01;
		} else {
			return total;
		}
	}

  private calculateFraisDeplacementPrice(location: { lat: number, lon: number }, proUserES: any) {
    let total = 0;
    let distance = 0;

    if (!!proUserES.company.tripExpences) {
      if (proUserES.company.tripExpencesRateType === 'Frais unique') {
        const qte = 1;
        const unitPrice = proUserES.company.tripExpencesTypePrice;
        const totalOption = qte * unitPrice;
        total = totalOption;
      }

      if (proUserES.company.tripExpencesRateType === 'Frais par kilomètre') {
        this.http.get(`https://maps.googleapis.com/maps/api/distancematrix/json`, {
          params: {
            units: 'metric',
            mode: 'driving',
            key: 'AIzaSyBkjTJgW1LxVJUqIi-wPQsce-GFAtzKJkQ',
            origins: `${location.lat},${location.lon}`,
            destinations: `${proUserES.company.location.lat},${proUserES.company.location.lng}`
          }
        }).subscribe((res: any) => {
            const totalDistance = res.rows[0].elements[0].distance.value / 1000;
            if (totalDistance > proUserES.company.tripExpencesDistance) {
              const qte = totalDistance - proUserES.comapny.tripExpencesDistance;
              const unitPrice = proUserES.company.tripExpencesTypePrice;
              const totalOption = qte * unitPrice;
              total = totalOption;
              distance = totalDistance;
            }
          }
        );
      }
    }
    if (!!distance) {
      return { total, distance };
    }
    return { total };
  }


}
