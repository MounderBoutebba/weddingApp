import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { CategoryLabelEnum } from '../../../../user/components/company/company-details/category-label.enum';
import { Company } from '../../../../user/models/company.model';
import { BookingService } from '../../../services/booking.service';
import { BookingStore } from '../../../../store/booking';
import { AuthStore } from '../../../../store/auth';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import * as moment from 'moment';
import { Moment } from 'moment';

declare var google: any;

@Component({
	selector: 'app-reservation-card',
	templateUrl: './reservation-card.component.html',
	styleUrls: ['./reservation-card.component.scss']
})
export class ReservationCardComponent implements OnInit, AfterViewInit {
  public minDate: Moment = moment();
	@Input() searchTerm: string;
	@Input() companyDescriptionInfo: Company;
	@ViewChild('reservationPrice') reservationComp: any;
	@ViewChild('autocompleteaddr') autocompleteAddr: ElementRef<HTMLElement>;
	panelExpanded: boolean;
	categoryLabelEnum = CategoryLabelEnum;
	initialPrice: number;
	adultsNumber = 1;
	enfantsNumber = 0;
	bebeNumber = 0;
	dateRange: { startDate: Date; endDate: Date };
  location: { address: string, geo: { lat: number, lon: number } } = { address: '', geo: { lat: 0, lon: 0 } };
	showDateError = false;
	showPlaceError = false;
	showNumberError = false;
  public limit?: string;
	constructor(
    private readonly bookingService: BookingService,
    private readonly bookingStore: BookingStore,
    private readonly authStore: AuthStore,
    private readonly activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private readonly platformId
	) {}
	ngOnInit() {

    const oneDayCategories = [
      'dj', 'musicien', 'groupe', 'animateurAdultes', 'animateurEnfants', 'feuArtifices',
      'lacher', 'lieu', 'traiteur', 'gateaumariage', 'photographe',
      'videaliste', 'coiffure', 'maquillage', 'estetique', 'soins',
      'choregrapheMariage', 'coachSportif', 'officiantCeremonie', 'decorateur',
      'fleuriste', 'faireparts'
    ];

    if (oneDayCategories.includes(this.activatedRoute.snapshot.paramMap.get('category'))) {
      this.limit = '0';
    }


		this.bookingService.nbrInvitesToggledAccordeon.subscribe(val => {
			this.panelExpanded = val;
		});
		this.panelExpanded = false;
	}
	ngAfterViewInit(): void {
		this.initialPrice = this.reservationComp.initialPrice;
    if (isPlatformBrowser(this.platformId)) {
      this.getPlaceAutocomplete();
    }
	}
	onNgModelChange(valueFromModel: number, value2: number) {
		if (!!valueFromModel && this.reservationComp) {
			this.reservationComp.calculatePrice(valueFromModel + value2);
		}
		this.setErrorMessages();
	}
	dateChange(date: {startDate: Date, endDate: Date}) {
		this.bookingStore.setBookingDate(date);
		this.setErrorMessages();
	}
	submitBooking() {
		if (this.authStore.isAuthenticated()) {
			this.dateRange = this.bookingStore.getCurrentBookingDate();
			const valid =
				!!this.dateRange.startDate && !!this.dateRange.endDate &&
				(+this.adultsNumber) + (+this.enfantsNumber) > 0 &&
				this.location.address !== '';
			if (valid) {
				const bookingObj = this.bookingStore.getCurrentBookingObj();
				let categories: string[] = [];
				if (bookingObj.photographe?.selected) categories.push(CategoryLabelEnum.PHOTOGRAPHE);
				if (bookingObj.videaliste?.selected) categories.push(this.categoryLabelEnum.VIDEALISTE);
				if (bookingObj.coiffure?.selected) categories.push(this.categoryLabelEnum.COIFFURE);
				if (bookingObj.maquillage?.selected) categories.push(this.categoryLabelEnum.MAQUILLAGE);
				if (bookingObj.esthetique?.selected) categories.push(this.categoryLabelEnum.ESTHETIQUE);
				if (bookingObj.soins?.selected) categories.push(this.categoryLabelEnum.SOIN);
				if (bookingObj.lieu?.selected) categories.push(this.categoryLabelEnum.LIEU);
				if (bookingObj.traiteur?.selected) categories.push(this.categoryLabelEnum.TRAITEUR);
				if (bookingObj.gateau?.selected) categories.push(this.categoryLabelEnum.GATEAU_MARIAGE);

				console.log('obj', {
					userID: this.companyDescriptionInfo.id,
					categories,
					start: this.dateRange.startDate,
					end: this.dateRange.endDate,
					order: {bookingObj, guestsNumber: (+this.adultsNumber) + (+this.enfantsNumber)},
          location:this.location
				});
				this.bookingService
					// tslint:disable-next-line:max-line-length
					.createBooking(
						this.companyDescriptionInfo.id,
						categories,
						this.dateRange.startDate,
						this.dateRange.endDate,
						{bookingObj, guestsNumber: (+this.adultsNumber) + (+this.enfantsNumber)},
            this.location
					)
					.subscribe(res => {console.log('res', res); categories = []});
			}
			this.setErrorMessages();
		} else {
			console.log('needs to be authenticated');
		}
	}
	setErrorMessages() {
		this.showDateError = !this.dateRange?.startDate ? true : false;
		this.showNumberError = (+this.adultsNumber) + (+this.enfantsNumber) <= 0 ? true : false;
		this.showPlaceError = this.location.address === '' ? true : false;
	}
	panelOpened() {
		this.bookingService.totalToggledAccordeon.next(false);
		this.panelExpanded = true;
	}
	panelClosed() {
		this.bookingService.totalToggledAccordeon.next(true);
		this.panelExpanded = false;
	}

  public getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.autocompleteAddr.nativeElement, {
      componentRestrictions: { country: 'FR' },
      types: ['address'] // 'establishment' / 'address' / 'geocode'
    });
    this.location = { address: '', geo: { lat: 0, lon: 0 } };
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.location = {
        address: place.formatted_address,
        geo: {
          lon: place.geometry.location.lng(),
          lat: place.geometry.location.lat()
        }
      };
      this.setErrorMessages();
    });
  }


}
