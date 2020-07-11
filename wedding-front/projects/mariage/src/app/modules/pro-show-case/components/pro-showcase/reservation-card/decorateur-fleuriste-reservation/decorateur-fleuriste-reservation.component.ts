import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { BookingService } from '../../../../services/booking.service';
import { BookingState, BookingStore } from 'projects/mariage/src/app/modules/store/booking';
import { Observable } from 'rxjs';
import { DecorateurFleuristBookingInterface } from '../../categories/decorateur-fleuriste/decorateur-fleuriste.booking.interface';
import { DecorateurFleuristeBookingService } from '../../../../services/price-calculation/decorateur-fleuriste.booking.service';
import { CategoryLabelEnum } from 'projects/mariage/src/app/modules/user/components/company/company-details/category-label.enum';

@Component({
	selector: 'app-decorateur-fleuriste-reservation',
	templateUrl: './decorateur-fleuriste-reservation.component.html',
	styleUrls: ['./decorateur-fleuriste-reservation.component.scss']
})
export class DecorateurFleuristeReservationComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() adultsNumber: number;
	@Input() enfantsNumber: number;
	panelExpanded: boolean;
	booking$: Observable<BookingState>;

	bookingObj: DecorateurFleuristBookingInterface;

	decorateurObj: any;
	fleuristObj: any;
	initialPrice: number;

	prices: {
		total: number;
		decorateur: {
			decorations: number;
		};
		fleurist: {
			fleurs: number;
			feuillages: number;
			decorations: number;
		};
		optionDivers: number;
		periodeMaj: number;
		weekEndMaj: number;
	} = {
		total: 0,
		decorateur: {
			decorations: 0
		},
		fleurist: {
			fleurs: 0,
			feuillages: 0,
			decorations: 0
		},
		optionDivers: 0,
		periodeMaj: 0,
		weekEndMaj: 0
	};

	constructor(
		private readonly bookingStore: BookingStore,
		private readonly decorateurFleuristeBookingService: DecorateurFleuristeBookingService,
		private readonly generalBookingService: BookingService
	) {}

	ngOnInit(): void {
		this.decorateurObj = this.decorateurFleuristeBookingService.setCritereObj(
			`${CategoryLabelEnum.DECORATUER}_`,
			this.companyDescriptionInfo.criteres
		);
		this.fleuristObj = this.decorateurFleuristeBookingService.setCritereObj(
			`${CategoryLabelEnum.FLEURISTE}_`,
			this.companyDescriptionInfo.criteres
		);
		console.log('decorateur object', this.decorateurObj);
		this.bookingStore.stateChanged.subscribe(res => this.calculatePrice(this.adultsNumber + this.enfantsNumber));
		this.generalBookingService.totalToggledAccordeon.subscribe(val => {
			this.panelExpanded = val;
		});
		this.panelExpanded = true;
	}

	calculatePrice(guestsNumber: number) {
		this.bookingObj = this.bookingStore.getCurrentBookingObj();
		this.initialPrice = this.decorateurFleuristeBookingService.setInitialPrice(this.bookingObj, this.decorateurObj);
		this.generalBookingService.initialPrice.next(this.initialPrice);
		this.prices.total = this.decorateurFleuristeBookingService.calculatePrice(
			this.bookingObj,
			this.decorateurObj,
			this.fleuristObj,
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
		this.prices.optionDivers = this.decorateurFleuristeBookingService.priceForOptionDivers(
			this.bookingObj,
			guestsNumber,
			0
		);

		if (this.bookingObj.decorateur.selected) {
			this.prices.decorateur.decorations = this.decorateurFleuristeBookingService.priceFordecorations(
				this.bookingObj,
				this.decorateurObj,
				0
			);
		}
		if (this.bookingObj.fleurist.selected) {
			this.prices.fleurist.fleurs = this.decorateurFleuristeBookingService.priceForFleurs(
				0,
				this.bookingObj,
				this.fleuristObj
			);

			this.prices.fleurist.feuillages = this.decorateurFleuristeBookingService.priceForFeuillages(
				0,
				this.bookingObj,
				this.fleuristObj
			);

			this.prices.fleurist.decorations = this.decorateurFleuristeBookingService.priceForDecorations(
				0,
				this.bookingObj,
				this.fleuristObj
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
