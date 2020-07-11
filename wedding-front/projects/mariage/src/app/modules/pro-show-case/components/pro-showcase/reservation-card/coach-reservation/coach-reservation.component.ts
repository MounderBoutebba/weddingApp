import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { Observable } from 'rxjs';
import { BookingState, BookingStore } from 'projects/mariage/src/app/modules/store/booking';
import { CoachBookingInterface } from '../../categories/coach/coach.booking.interface';
import { CoachBookingService } from '../../../../services/price-calculation/coach.booking.service';
import { BookingService } from '../../../../services/booking.service';
import { CategoryLabelEnum } from 'projects/mariage/src/app/modules/user/components/company/company-details/category-label.enum';

@Component({
	selector: 'app-coach-reservation',
	templateUrl: './coach-reservation.component.html',
	styleUrls: ['./coach-reservation.component.scss']
})
export class CoachReservationComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() adultsNumber: number;
	@Input() enfantsNumber: number;
	panelExpanded: boolean;
	booking$: Observable<BookingState>;
	bookingObj: CoachBookingInterface;
	coachObj: any;
	initialPrice: number;
	prices: {
		total: number;
		coach: {
			servicesAssocies: number;
		};
		optionDivers: number;
		periodeMaj: number;
		weekEndMaj: number;
	} = {
		total: 0,
		coach: {
			servicesAssocies: 0
		},
		optionDivers: 0,
		periodeMaj: 0,
		weekEndMaj: 0
	};
	constructor(
		private readonly bookingStore: BookingStore,
		private readonly coachBookingService: CoachBookingService,
		private readonly generalBookingService: BookingService
	) {}

	ngOnInit(): void {
		this.coachObj = this.coachBookingService.setCritereObj(
			`${CategoryLabelEnum.COACH}_`,
			this.companyDescriptionInfo.criteres
		);
		this.bookingStore.stateChanged.subscribe(res => this.calculatePrice(this.adultsNumber + this.enfantsNumber));
		this.generalBookingService.totalToggledAccordeon.subscribe(val => {
			this.panelExpanded = val;
		});
		this.panelExpanded = true;
	}
	calculatePrice(guestsNumber: number) {
		this.bookingObj = this.bookingStore.getCurrentBookingObj();
		this.initialPrice = this.coachBookingService.setInitialPrice(this.bookingObj, this.coachObj);
		this.generalBookingService.initialPrice.next(this.initialPrice);
		this.prices.total = this.coachBookingService.calculatePrice(
			this.bookingObj,
			this.coachObj,
			guestsNumber,
			this.bookingStore.getCurrentBookingDate(),
			this.companyDescriptionInfo.company.settings,
			this.companyDescriptionInfo.categories,
			{
				value: this.companyDescriptionInfo.company.weekendVariation,
				percentage: this.companyDescriptionInfo.company.weekendVariationPercentage
			}
		);
		this.generalBookingService.bookingPeriodeMaj.subscribe(value => (this.prices.periodeMaj = value));
		this.generalBookingService.bookingWeekEndMaj.subscribe(value => (this.prices.weekEndMaj = value));
		this.prices.optionDivers = this.coachBookingService.priceForOptionDivers(this.bookingObj, guestsNumber, 0);
		if (this.bookingObj.coach.selected) {
			this.prices.coach.servicesAssocies = this.coachBookingService.priceForServices(
				this.bookingObj,
				this.coachObj,
				0
			);
		}
	}
	panelOpened() {
		this.generalBookingService.nbrInvitesToggledAccordeon.next(false);
		this.panelExpanded = true;
	}
	panelClosed() {
		this.generalBookingService.nbrInvitesToggledAccordeon.next(true);
		this.panelExpanded = false;
	}
}
