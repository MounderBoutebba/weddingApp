import { Component, OnInit, Input } from '@angular/core';
import { BookingState, BookingStore } from 'projects/mariage/src/app/modules/store/booking';
import { Observable } from 'rxjs';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { OfficiantBookingInterface } from '../../categories/officiant/officiant.booking.interface';
import { BookingService } from '../../../../services/booking.service';
import { OfficiantBookingService } from '../../../../services/price-calculation/officiant.booking.service';
import { CategoryLabelEnum } from 'projects/mariage/src/app/modules/user/components/company/company-details/category-label.enum';

@Component({
	selector: 'app-officiant-reservation',
	templateUrl: './officiant-reservation.component.html',
	styleUrls: ['./officiant-reservation.component.scss']
})
export class OfficiantReservationComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() adultsNumber: number;
	@Input() enfantsNumber: number;
	panelExpanded: boolean;
	booking$: Observable<BookingState>;
	bookingObj: OfficiantBookingInterface;
	officiantObj: any;
	initialPrice: number;

	prices: {
		total: number;
		officiant: {
			services: number;
		};
		optionDivers: number;
		periodeMaj: number;
		weekEndMaj: number;
	} = {
		total: 0,
		officiant: {
			services: 0
		},
		optionDivers: 0,
		periodeMaj: 0,
		weekEndMaj: 0
	};

	constructor(
		private readonly bookingStore: BookingStore,
		private readonly officiantBookingService: OfficiantBookingService,
		private readonly generalBookingService: BookingService
	) {}

	ngOnInit(): void {
		this.officiantObj = this.officiantBookingService.setCritereObj(
			`${CategoryLabelEnum.OFFICIANT}_`,
			this.companyDescriptionInfo.criteres
		);
		console.log('officiant obj :: ==== ::', this.officiantObj);
		this.bookingStore.stateChanged.subscribe(res => this.calculatePrice(this.adultsNumber + this.enfantsNumber));
		this.generalBookingService.totalToggledAccordeon.subscribe(val => {
			this.panelExpanded = val;
		});
		this.panelExpanded = true;
	}

	calculatePrice(guestsNumber: number) {
		this.bookingObj = this.bookingStore.getCurrentBookingObj();
		this.initialPrice = this.officiantBookingService.setInitialPrice(this.bookingObj, this.officiantObj);
		this.generalBookingService.initialPrice.next(this.initialPrice);
		this.prices.total = this.officiantBookingService.calculatePrice(
			this.bookingObj,
			this.officiantObj,
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
		this.prices.optionDivers = this.officiantBookingService.priceForOptionDivers(this.bookingObj, guestsNumber, 0);

		this.prices.officiant.services = this.officiantBookingService.priceForServices(
			this.bookingObj,
			this.officiantObj,
			0
		);
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
