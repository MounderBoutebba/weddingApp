import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { Observable } from 'rxjs';
import { BookingState, BookingStore } from 'projects/mariage/src/app/modules/store/booking';
import { LieuTraiteurGateauBookingInterface } from '../../categories/lieu-traiteur-gateau/lieu-traiteur-gateau.booking.interface';
import { LieuTraiteurEsthetiqueBookingService } from '../../../../services/price-calculation/lieu-traiteur-gateau.booking.service';
import { BookingService } from '../../../../services/booking.service';
import { CategoryLabelEnum } from 'projects/mariage/src/app/modules/user/components/company/company-details/category-label.enum';

@Component({
  selector: 'app-lieu-traiteur-gateaux-reservation',
  templateUrl: './lieu-traiteur-gateaux-reservation.component.html',
  styleUrls: ['./lieu-traiteur-gateaux-reservation.component.scss']
})
export class LieuTraiteurGateauxReservationComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() adultsNumber: number;
  @Input() enfantsNumber: number;
  panelExpanded: boolean;
  booking$: Observable<BookingState>;
  bookingObj: LieuTraiteurGateauBookingInterface;
  lieuObj: any;
  traiteurObj: any;
  gateauxObj: any;
  initialPrice: number;
  prices: {
    total: number,
    lieu: {},
    traiteur: {
      vin: number,
      Dinner: number,
      boissonAlcoolise: number,
      boissonNonAlcoolise: number,
    },
    gateaux: {
      gateaux: number,
    },
    optionDivers: number,
		periodeMaj: number,
		weekEndMaj: number,
  } = {
    total: 0,
    lieu: {},
    traiteur: {
      vin: 0,
      Dinner: 0,
      boissonAlcoolise: 0,
      boissonNonAlcoolise: 0,
    },
    gateaux: {
      gateaux: 0,
    },
    optionDivers: 0,
		periodeMaj: 0,
		weekEndMaj: 0,
  };
  constructor(
    private readonly bookingStore: BookingStore,
		private readonly lieuTraiteurGateauxBookingService: LieuTraiteurEsthetiqueBookingService,
		private readonly generalBookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.lieuObj = this.lieuTraiteurGateauxBookingService
                  .setCritereObj(`${CategoryLabelEnum.LIEU}_`, this.companyDescriptionInfo.criteres);
    this.traiteurObj = this.lieuTraiteurGateauxBookingService
                  .setCritereObj(`${CategoryLabelEnum.TRAITEUR}_`, this.companyDescriptionInfo.criteres);
    this.gateauxObj = this.lieuTraiteurGateauxBookingService
                  .setCritereObj(`${CategoryLabelEnum.GATEAU_MARIAGE}_`, this.companyDescriptionInfo.criteres);
    this.bookingStore.stateChanged.subscribe(res => this.calculatePrice(this.adultsNumber + this.enfantsNumber));
		this.generalBookingService.totalToggledAccordeon.subscribe(val => {
			this.panelExpanded = val;
		});
		this.panelExpanded = true;
  }
  calculatePrice(guestsNumber: number) {
    this.bookingObj = this.bookingStore.getCurrentBookingObj();
    this.initialPrice = this.lieuTraiteurGateauxBookingService
                        .setInitialPrice(this.bookingObj, this.lieuObj, this.traiteurObj, this.gateauxObj);
    this.generalBookingService.initialPrice.next(this.initialPrice);
    this.prices.total = this.lieuTraiteurGateauxBookingService.calculatePrice(
      this.bookingObj,
      this.lieuObj,
      this.traiteurObj,
      this.gateauxObj,
      guestsNumber,
			this.bookingStore.getCurrentBookingDate(),
			this.companyDescriptionInfo.company.settings,
			this.companyDescriptionInfo.categories,
			{value: this.companyDescriptionInfo.company.weekendVariation,
			percentage: this.companyDescriptionInfo.company.weekendVariationPercentage},
    );
    this.generalBookingService.bookingPeriodeMaj.subscribe(  value => this.prices.periodeMaj = value );
    this.generalBookingService.bookingWeekEndMaj.subscribe(  value => this.prices.weekEndMaj = value );
    this.prices.optionDivers = this.lieuTraiteurGateauxBookingService.priceForOptionDivers(
			this.bookingObj,
      guestsNumber,
      0
    );
    if (this.bookingObj.traiteur.selected) {
      this.prices.traiteur.vin = this.lieuTraiteurGateauxBookingService
                  .priceForVin(this.bookingObj, this.traiteurObj, 0);
      this.prices.traiteur.Dinner = this.lieuTraiteurGateauxBookingService
                  .priceForDinner(this.bookingObj, this.traiteurObj, 0);
      this.prices.traiteur.boissonAlcoolise = this.lieuTraiteurGateauxBookingService
                  .priceForBoissonAlcoolise(this.bookingObj, this.traiteurObj, 0);
      this.prices.traiteur.boissonNonAlcoolise = this.lieuTraiteurGateauxBookingService
                  .priceForBoissonNonAlcoolise(this.bookingObj, this.traiteurObj, 0);
    }
    if (this.bookingObj.gateau.selected) {
      this.prices.gateaux.gateaux = this.lieuTraiteurGateauxBookingService
                  .priceForGateaux(this.bookingObj, this.gateauxObj, 0);
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
