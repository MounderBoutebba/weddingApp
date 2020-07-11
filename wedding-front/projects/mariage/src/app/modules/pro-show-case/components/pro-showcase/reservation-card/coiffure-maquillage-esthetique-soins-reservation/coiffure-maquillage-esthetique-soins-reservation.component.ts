import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { BookingStore, BookingState } from 'projects/mariage/src/app/modules/store/booking';
import { CoiffureMaquillageEsthetiqueSoinsBookingService } from '../../../../services/price-calculation/coiffure-maquillage-esthetique-soins.booking.service';
import { BookingService } from '../../../../services/booking.service';
import { Observable } from 'rxjs';
import { coiffureMaquillageEsthetiqueSoinsBookingInterface } from '../../categories/coiffure-maquillage-esthetique-soins/coiffure-maquillage-esthetique-soins.booking.interface';

@Component({
  selector: 'app-coiffure-maquillage-esthetique-soins-reservation',
  templateUrl: './coiffure-maquillage-esthetique-soins-reservation.component.html',
  styleUrls: ['./coiffure-maquillage-esthetique-soins-reservation.component.scss']
})
export class CoiffureMaquillageEsthetiqueSoinsReservationComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() adultsNumber: number;
  @Input() enfantsNumber: number;
  panelExpanded: boolean;
  booking$: Observable<BookingState>;
  bookingObj: coiffureMaquillageEsthetiqueSoinsBookingInterface;
  coiffureObj: any;
  maquillageObj: any;
  esthetiqueObj: any;
  soinsObj: any;
  initialPrice: number;
  prices: {
    total: number,
    coiffure: {
      produits: number,
      prestationsInvites: number,
      majorations: number,
    },
    maquillage: {
      produits: number,
      prestationsInvites: number,
      majorations: number,
    },
    esthetique: {
      manucureEtpedicure: number,
      epilation: number,
    },
    soins: {
      soins: number,
      massage: number,
    },
    optionDivers: number,
		periodeMaj: number,
		weekEndMaj: number,
  } = {
    total: 0,
    coiffure: {
      produits: 0,
      prestationsInvites: 0,
      majorations: 0,
    },
    maquillage: {
      produits: 0,
      prestationsInvites: 0,
      majorations: 0,
    },
    esthetique: {
      manucureEtpedicure: 0,
      epilation: 0,
    },
    soins: {
      soins: 0,
      massage: 0,
    },
    optionDivers: 0,
		periodeMaj: 0,
		weekEndMaj: 0,
  };
  constructor(
    private readonly bookingStore: BookingStore,
		private readonly coiffureMaquillageEsthetiqueSoinsBookingService: CoiffureMaquillageEsthetiqueSoinsBookingService,
		private readonly generalBookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.coiffureObj = this.coiffureMaquillageEsthetiqueSoinsBookingService
                      .setCritereObj('coiffure_', this.companyDescriptionInfo.criteres);
    this.maquillageObj = this.coiffureMaquillageEsthetiqueSoinsBookingService
                        .setCritereObj('maquillage_', this.companyDescriptionInfo.criteres);
    this.esthetiqueObj = this.coiffureMaquillageEsthetiqueSoinsBookingService
                        .setCritereObj('esthetique_', this.companyDescriptionInfo.criteres);
    this.soinsObj = this.coiffureMaquillageEsthetiqueSoinsBookingService
                        .setCritereObj('soins_', this.companyDescriptionInfo.criteres);
		this.bookingStore.stateChanged.subscribe(res => this.calculatePrice(this.adultsNumber + this.enfantsNumber));
		this.generalBookingService.totalToggledAccordeon.subscribe(val => {
			this.panelExpanded = val;
		});
		this.panelExpanded = true;
  }
  calculatePrice(guestsNumber: number) {
    this.bookingObj = this.bookingStore.getCurrentBookingObj();
    this.initialPrice = this.coiffureMaquillageEsthetiqueSoinsBookingService
                        .setInitialPrice(this.bookingObj, this.coiffureObj, this.maquillageObj, this.esthetiqueObj, this.soinsObj);
    this.generalBookingService.initialPrice.next(this.initialPrice);
    this.prices.total = this.coiffureMaquillageEsthetiqueSoinsBookingService.calculatePrice(
      this.bookingObj,
      this.coiffureObj,
      this.maquillageObj,
      this.esthetiqueObj,
      this.soinsObj,
      guestsNumber,
			this.bookingStore.getCurrentBookingDate(),
			this.companyDescriptionInfo.company.settings,
			this.companyDescriptionInfo.categories,
			{value: this.companyDescriptionInfo.company.weekendVariation,
			percentage: this.companyDescriptionInfo.company.weekendVariationPercentage},
    );
    this.generalBookingService.bookingPeriodeMaj.subscribe(  value => this.prices.periodeMaj = value );
    this.generalBookingService.bookingWeekEndMaj.subscribe(  value => this.prices.weekEndMaj = value );
    this.prices.optionDivers = this.coiffureMaquillageEsthetiqueSoinsBookingService.priceForOptionDivers(
			this.bookingObj,
			guestsNumber
    );
    if (this.bookingObj.coiffure?.selected) {
      this.prices.coiffure.produits =
      this.coiffureMaquillageEsthetiqueSoinsBookingService
      .calculatePriceProduitsAccessoire(0, this.bookingObj, 'coiffure', this.coiffureObj, this.maquillageObj);
      this.prices.coiffure.majorations =
      this.coiffureMaquillageEsthetiqueSoinsBookingService
      .calculatePriceTypeMajoration(0, this.bookingObj, 'coiffure', this.coiffureObj, this.maquillageObj);

      this.prices.coiffure.prestationsInvites =
      this.coiffureMaquillageEsthetiqueSoinsBookingService
      .calculatePricePrestationInvites(0,
                                      this.bookingObj,
                                      'coiffure',
                                      this.coiffureObj,
                                      this.maquillageObj,
                                      this.esthetiqueObj,
                                      this.soinsObj);
    }
    if (this.bookingObj.maquillage?.selected) {
      this.prices.maquillage.produits =
      this.coiffureMaquillageEsthetiqueSoinsBookingService
      .calculatePriceProduitsAccessoire(0, this.bookingObj, 'maquillage', this.coiffureObj, this.maquillageObj);

      this.prices.maquillage.majorations =
      this.coiffureMaquillageEsthetiqueSoinsBookingService
      .calculatePriceTypeMajoration(0, this.bookingObj, 'maquillage', this.coiffureObj, this.maquillageObj);

      this.prices.maquillage.prestationsInvites =
      this.coiffureMaquillageEsthetiqueSoinsBookingService
      .calculatePricePrestationInvites(0,
                                      this.bookingObj,
                                      'maquillage',
                                      this.coiffureObj,
                                      this.maquillageObj,
                                      this.esthetiqueObj,
                                      this.soinsObj);
    }
    if (this.bookingObj.esthetique?.selected) {
      this.prices.esthetique.manucureEtpedicure =
      this.coiffureMaquillageEsthetiqueSoinsBookingService
      .calculatePricePrestationInvites(0,
                                      this.bookingObj,
                                      'esthetique',
                                      this.coiffureObj,
                                      this.maquillageObj,
                                      this.esthetiqueObj,
                                      this.soinsObj,
                                      'manucureEtpedicure'
                                      );
      this.prices.esthetique.epilation =
      this.coiffureMaquillageEsthetiqueSoinsBookingService
      .calculatePricePrestationInvites(0,
                                      this.bookingObj,
                                      'esthetique',
                                      this.coiffureObj,
                                      this.maquillageObj,
                                      this.esthetiqueObj,
                                      this.soinsObj,
                                      'epilation'
                                      );
    }
    if (this.bookingObj.soins?.selected) {
      this.prices.soins.soins =
      this.coiffureMaquillageEsthetiqueSoinsBookingService
      .calculatePricePrestationInvites(0,
                                      this.bookingObj,
                                      'soins',
                                      this.coiffureObj,
                                      this.maquillageObj,
                                      this.esthetiqueObj,
                                      this.soinsObj,
                                      'soins'
                                      );
      this.prices.soins.massage =
      this.coiffureMaquillageEsthetiqueSoinsBookingService
      .calculatePricePrestationInvites(0,
                                      this.bookingObj,
                                      'soins',
                                      this.coiffureObj,
                                      this.maquillageObj,
                                      this.esthetiqueObj,
                                      this.soinsObj,
                                      'massage'
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
