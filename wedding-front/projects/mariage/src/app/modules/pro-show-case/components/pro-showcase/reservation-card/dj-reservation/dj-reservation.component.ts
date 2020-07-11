import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { Observable } from 'rxjs';
import { BookingState, BookingStore } from 'projects/mariage/src/app/modules/store/booking';
import { DjBookingInterface } from '../../categories/dj/dj.booking.interface';
import { BookingService } from '../../../../services/booking.service';
import { DjBookingService } from '../../../../services/price-calculation/dj.booking.service';
import { CategoryLabelEnum } from 'projects/mariage/src/app/modules/user/components/company/company-details/category-label.enum';

@Component({
	selector: 'app-dj-reservation',
	templateUrl: './dj-reservation.component.html',
	styleUrls: ['./dj-reservation.component.scss']
})
export class DjReservationComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() adultsNumber: number;
	@Input() enfantsNumber: number;

	panelExpanded: boolean;

	booking$: Observable<BookingState>;
	bookingObj: DjBookingInterface;
	djObj: any;
	initialPrice: number;
	prices: {
		total: number;
		dj: {
			services: number;
			matriels: number;
		};
		optionDivers: number;
		periodeMaj: number;
		weekEndMaj: number;
	} = {
		total: 0,
		dj: {
			services: 0,
			matriels: 0
		},
		optionDivers: 0,
		periodeMaj: 0,
		weekEndMaj: 0
	};

	constructor(
		private readonly bookingStore: BookingStore,
		private readonly djBookingService: DjBookingService,
		private readonly generalBookingService: BookingService
	) {}

	ngOnInit(): void {
		this.djObj = this.djBookingService.setCritereObj(
			`${CategoryLabelEnum.DJ}_`,
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
		this.initialPrice = this.djBookingService.setInitialPrice(this.bookingObj, this.djObj);
		this.generalBookingService.initialPrice.next(this.initialPrice);

		this.prices.total = this.djBookingService.calculatePrice(
			this.bookingObj,
			this.djObj,
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
		this.prices.optionDivers = this.djObj.priceForOptionDivers(this.bookingObj, guestsNumber, 0);

		this.prices.dj.services = this.djBookingService.priceForServices(this.bookingObj, this.djObj, 0);

		this.prices.dj.matriels = this.djBookingService.priceForMatriels(this.bookingObj, this.djObj, 0);
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
