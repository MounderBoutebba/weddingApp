import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-voyage-noces-filter',
  templateUrl: './voyage-noces-filter.component.html',
  styleUrls: ['./voyage-noces-filter.component.scss']
})
export class VoyageNocesFilterComponent implements OnInit, OnDestroy {


  public filterForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  public type: string;
  @Output() public cancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() public search: EventEmitter<any> = new EventEmitter<any>();
  @Input() priceFilter: Subject<any>;
  @Input() hiddenSearchbar: boolean;
  public showMore=false;


  public voyagenocesActivitiesMore = false;
  public voyagenocesServicesMore = false;
  public voyagenocesEquipementsMore = false;
  public voyagenocesSituationGeoMore = false;

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
      categories: [['voyagenoces']],
      voyagenoces_zoneGeo: this.fb.group({
        metropolitan_france: [],
        europe: [],
        mediterranean_basin: [],
        distant_destinations: []
      }),
      voyagenoces_situationGeo: this.fb.group({
        pres_de_la_mer: [],
        a_la_montagne: [],
        en_ville: [],
        a_la_sortie_de_la_ville: [],
        a_la_campagne: []
      }),
      voyagenoces_classificationHoteliere: this.fb.group({
        one: [],
        two: [],
        three: [],
        four: [],
        five: []
      }),
      voyagenoces_equipements: this.fb.group({
        salle_de_sport: [],
        piscine: [],
        parking: [],
        spa: [],
        enfants: [],
        animaux: [],

        sauna:[],
        cuisine:[],
        salle_deau:[],
        wc:[],
        climatisation:[],
        chauffage:[],
        television:[],
        fer_a_repasser:[],
        acces_handicapes:[],
        bar_lounge:[],
        casino_et_jeux_dargent:[],
        kitchenette:[],
        restaurant:[],
        seche_cheveux:[]

      }),
      voyagenoces_services: this.fb.group({
        coupe_de_champagne_bienvenu: [],
        navette_aeroport: [],
        service_en_chambre: [],
        petit_dejeuner: [],

        lunch:[],
        dinner:[],
        parking:[],
        wifi:[],
        service_autobus:[]
      }),
      voyagenoces_activities: this.fb.group({
        balade_a_cheval: [],
        croisiere_en_bateau: [],
        plongee: [],
        massage: [],

        balade_en_kayak:[],
        location_jet_ski:[]
      })

    });
  }

  public submit() {
    const form = this.filterForm.getRawValue();
    const listArray = ['voyagenoces_services', 'voyagenoces_activities', 'voyagenoces_equipements'];
    const simpleArray=['voyagenoces_situationGeo','voyagenoces_zoneGeo'];

    const res = Object.entries(form)
        .map(([key, value]) => {
          if (listArray.includes(key)) {
            const reelValue = Object.entries(value)
              .map(([k, v]) => !!v ? k : null)
              .filter(v => !!v);
            if (reelValue.length > 0) {
              return { [`${key}.options.search`]: reelValue };
            }
          } else if(simpleArray.includes(key)){
            const reelValue = Object.entries(value)
              .map(([k, v]) => !!v ? k : null)
              .filter(v => !!v);
            if (reelValue.length > 0) {
              return { [`${key}`]: reelValue };
            }
          } else if (key === 'voyagenoces_classificationHoteliere') {
            const val = Object.entries(value)
              .map(([k, v]) => {
                if (k === 'one' && !!v) {
                  return 1;
                } else if (k === 'two' && !!v) {
                  return 2;
                } else if (k === 'three' && !!v) {
                  return 3;
                } else if (k === 'four' && !!v) {
                  return 4;
                } else if (k === 'five' && !!v) {
                  return 5;
                }
              })
              .filter(v => !!v);
            if (val.length > 0) {
              return { ['terms']: { ['criteres.voyagenoces_classificationHoteliere']: val }};
              // return { [key]: val };
            }
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
