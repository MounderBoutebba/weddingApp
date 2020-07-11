import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { Observable } from 'rxjs';
import { BookingState, BookingStore } from 'projects/mariage/src/app/modules/store/booking';
import { PhotographeVideasteBookingInterface } from '../../categories/photographe-videaste-description/photographe-videaste.booking.interface';
import { PhotographeVideasteBookingService } from '../../../../services/price-calculation/photographe-videaste.booking.service';
import { BookingService } from '../../../../services/booking.service';
@Component({
	selector: 'app-photographe-videaste-reservation',
	templateUrl: './photographe-videaste-reservation.component.html',
	styleUrls: ['./photographe-videaste-reservation.component.scss']
})
export class PhotographeVideasteReservationComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() adultsNumber: number;
	@Input() enfantsNumber: number;
	panelExpanded: boolean;
	booking$: Observable<BookingState>;
	bookingObj: PhotographeVideasteBookingInterface;
	photographeObj: any;
	videasteObj: any;
	prices: {
		total: number,
		donneDvdPhoto: number,
		donneDvdVideo: number,
		donneUsbPhoto: number,
		donneUsbVideo: number,
		creationAlbum: number,
		tiragePapier: number,
		retouchesPhoto: number,
		optionDivers: number,
		periodeMaj: number,
		weekEndMaj: number
	} = {
		total: 0,
		donneDvdPhoto: 0,
		donneUsbPhoto: 0,
		retouchesPhoto: 0,
		donneDvdVideo: 0,
		donneUsbVideo: 0,
		optionDivers: 0,
		creationAlbum: 0,
		tiragePapier: 0,
		periodeMaj: 0,
		weekEndMaj: 0,
	};
	initialPrice: number;
	constructor(
		private readonly bookingStore: BookingStore,
		private readonly photographeVideasteBookingService: PhotographeVideasteBookingService,
		private readonly generalBookingService: BookingService
	) {}

	ngOnInit(): void {
		this.photographeObj = this.photographeVideasteBookingService.setCritereObj('photographe_', this.companyDescriptionInfo.criteres);
		this.videasteObj = this.photographeVideasteBookingService.setCritereObj('videaliste_', this.companyDescriptionInfo.criteres);
		this.bookingStore.stateChanged.subscribe(res => this.calculatePrice(this.adultsNumber + this.enfantsNumber));
		this.generalBookingService.totalToggledAccordeon.subscribe(val => {
			this.panelExpanded = val;
		});
		this.panelExpanded = true;
	}
	calculatePrice(guestsNumber: number) {
		console.log('calculatePrice');
		this.bookingObj = this.bookingStore.getCurrentBookingObj();
		this.initialPrice = this.photographeVideasteBookingService.setInitialPrice(this.bookingObj, this.photographeObj, this.videasteObj);
		this.generalBookingService.initialPrice.next(this.initialPrice);
		this.prices.total = this.photographeVideasteBookingService.calculatePrice(
			this.bookingObj,
			this.photographeObj,
			this.videasteObj,
			guestsNumber,
			this.bookingStore.getCurrentBookingDate(),
			this.companyDescriptionInfo.company.settings,
			this.companyDescriptionInfo.categories,
			{value: this.companyDescriptionInfo.company.weekendVariation,
			percentage: this.companyDescriptionInfo.company.weekendVariationPercentage},
		);
		this.generalBookingService.bookingPeriodeMaj.subscribe(  value => this.prices.periodeMaj = value );
		this.generalBookingService.bookingWeekEndMaj.subscribe(  value => this.prices.weekEndMaj = value );
		if (this.bookingObj.photographe.selected) {
			this.prices.donneDvdPhoto = this.photographeVideasteBookingService.priceForDonneDvdPhoto(
				this.bookingObj,
				this.photographeObj,
				this.videasteObj,
				guestsNumber
			);
			this.prices.donneUsbPhoto = this.photographeVideasteBookingService.priceForDonneUsbPhoto(
				this.bookingObj,
				this.photographeObj,
				this.videasteObj,
				guestsNumber
			);
			this.prices.retouchesPhoto = this.photographeVideasteBookingService.priceForRetouches(
				this.bookingObj,
				this.photographeObj,
				this.videasteObj,
				guestsNumber
			);
			this.prices.creationAlbum = this.photographeVideasteBookingService.priceForCreationAlbum(
				this.bookingObj,
				this.photographeObj,
				this.videasteObj,
				guestsNumber
			);
			this.prices.tiragePapier = this.photographeVideasteBookingService.priceForTiragePapier(
				this.bookingObj,
				this.photographeObj,
				this.videasteObj,
				guestsNumber
			);
		}
		if (this.bookingObj.videaliste.selected) {
			this.prices.donneDvdVideo = this.photographeVideasteBookingService.priceForDonneDvdVideo(
				this.bookingObj,
				this.photographeObj,
				this.videasteObj,
				guestsNumber
			);
			this.prices.donneUsbVideo = this.photographeVideasteBookingService.priceForDonneUsbVideo(
				this.bookingObj,
				this.photographeObj,
				this.videasteObj,
				guestsNumber
			);
		}
		this.prices.optionDivers = this.photographeVideasteBookingService.priceForOptionDivers(
			this.bookingObj,
			guestsNumber
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
