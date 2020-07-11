import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { Observable } from 'rxjs';
import { BookingState, BookingStore } from 'projects/mariage/src/app/modules/store/booking';
import { AnimateurEnfantBookingInterface } from '../../categories/animateur-enfants/animateurEnfant.booking.interface';
import { BookingService } from '../../../../services/booking.service';
import { AnimateurEnfantsBookingService } from '../../../../services/price-calculation/animateurEnfants.booking.service';
import { CategoryLabelEnum } from 'projects/mariage/src/app/modules/user/components/company/company-details/category-label.enum';

@Component({
	selector: 'app-animateur-enfant-reservation',
	templateUrl: './animateur-enfant-reservation.component.html',
	styleUrls: ['./animateur-enfant-reservation.component.scss']
})
export class AnimateurEnfantReservationComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() adultsNumber: number;
	@Input() enfantsNumber: number;
	panelExpanded: boolean;
	booking$: Observable<BookingState>;
	bookingObj: AnimateurEnfantBookingInterface;
	animateurObj: any;
	initialPrice: number;
	prices: {
		total: number;
		animateur: {
			animations: number;
		};
		optionDivers: number;
		periodeMaj: number;
		weekEndMaj: number;
	} = {
		total: 0,
		animateur: {
			animations: 0
		},
		optionDivers: 0,
		periodeMaj: 0,
		weekEndMaj: 0
	};
	constructor(
		private readonly bookingStore: BookingStore,
		private readonly animateurEnfantsBookingService: AnimateurEnfantsBookingService,
		private readonly generalBookingService: BookingService
	) {}

	ngOnInit(): void {
		this.animateurObj = this.animateurEnfantsBookingService.setCritereObj(
			`${CategoryLabelEnum.ANIMATEUR_ENFANTS}_`,
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
		this.initialPrice = this.animateurEnfantsBookingService.setInitialPrice(this.bookingObj, this.animateurObj);
		this.generalBookingService.initialPrice.next(this.initialPrice);
		this.prices.total = this.animateurEnfantsBookingService.calculatePrice(
			this.bookingObj,
			this.animateurObj,
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
		this.prices.optionDivers = this.animateurEnfantsBookingService.priceForOptionDivers(
			this.bookingObj,
			guestsNumber,
			0
		);

		this.prices.animateur.animations = this.animateurEnfantsBookingService.priceForAnimations(
			this.bookingObj,
			this.animateurObj,
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
