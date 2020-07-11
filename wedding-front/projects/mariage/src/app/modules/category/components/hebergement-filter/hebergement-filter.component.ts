import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-hebergement-filter',
  templateUrl: './hebergement-filter.component.html',
  styleUrls: ['./hebergement-filter.component.scss']
})
export class HebergementFilterComponent implements OnInit, OnDestroy {


  public filterForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  public type: string;
  @Output() public cancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() public search: EventEmitter<any> = new EventEmitter<any>();
  @Input() priceFilter: Subject<any>;
  @Input() hiddenSearchbar: boolean;

  public showMore=false;

  public hebergementServicesMore = false;
  public hebergementEquipementsMore = false;

  constructor(private readonly fb: FormBuilder,
              private readonly activatedRoute: ActivatedRoute,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService) {
  }

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.queryParamMap.get('type');
    this.initForm();

    this.priceFilter.pipe(takeUntil(this.destroy$)).subscribe((value => {
      this.submit();
    }));
  }

  private initForm(): void {
    this.filterForm = this.fb.group({
      verifiedProvider: [],
      securePayment: [],
      topRatedProviders:[],
      categories: [['hebergement']],
      hebergement_typeHebergement: this.fb.group({
        hotel: [],
        chambre_hotel: [],
        camping: [],
        appartement_Maison: []
      }),
      hebergement_nombreDeChambre: this.fb.group({
        lte5gt1: [],
        lte10gt5: [],
        lte20gt10: [],
        gt20: []
      }),
      hebergement_equipements: this.fb.group({
        chauffage: [],
        climatisation: [],
        television: [],

        cuisine: [],
        salle_deau: [],
        wc: [],
        piscine: [],
        fer_a_repasser: [],
        acces_handicapes: [],
        bar_lounge: [],
        casino_et_jeux_dargent: [],
        salle_de_sport: [],
        kitchenette: [],
        restaurant: [],
        parking: [],
        sauna: [],
        spa: []
      }),
      hebergement_services: this.fb.group({
        breakfast: [],
        lunch: [],
        dinner: [],
        room_service: [],

        parking: [],
        wifi: [],
        bus_service: []
      }),

    });
  }

  public submit() {
    const form = this.filterForm.getRawValue();
    const listArray = ['hebergement_typeHebergement'];
    const listNested = ['hebergement_equipements', 'hebergement_services'];

    const res = Object.entries(form)
      .map(([key, value]) => {
        if (listArray.includes(key)) {
          const reelValue = Object.entries(value)
            .map(([k, v]) => !!v ? k : null)
            .filter(v => !!v);
          if (reelValue.length > 0) {
            return { [key]: reelValue };
          }
        } else if (listNested.includes(key)) {
          const reelValue = Object.entries(value)
            .map(([k, v]) => !!v ? k : null)
            .filter(v => !!v);
          if (reelValue.length > 0) {
            return { [`${key}.options.search`]: reelValue };
          }
        } else if (key === 'hebergement_nombreDeChambre') {
          const delais = Object.entries(value)
            .map(([k, v]) => {
              if (!!v) {
                if (k === ' lte10gt5') {
                  return { lte: 5, gte: 1 };
                } else if (k === 'lte10gt5') {
                  return { lte: 10, gt: 5 };
                } else if (k === 'lte20gt10') {
                  return { lte: 20, gt: 10 };
                } else if (k === 'gt20') {
                  return { gt: 20 };
                }
                return null;
              }})
            .filter(v => !!v);
          if (delais.length === 0) {
            return null;
          }
          return { [key]: delais };
        } else {
          return !!value ? { [key]: value } : null;
        }

      })
      .filter(val => !!val)
      .reduce((acc, val) => ({ ...acc, ...val }), {});

    this.search.emit(res);

  }

  public reset() {
    this.filterForm.reset();
  }



  public cancelForm() {
    this.filterForm.reset();
    this.cancel.emit('cancel');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
