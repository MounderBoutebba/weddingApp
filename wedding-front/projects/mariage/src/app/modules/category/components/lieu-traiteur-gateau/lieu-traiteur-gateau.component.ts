import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lieu-traiteur-gateau',
  templateUrl: './lieu-traiteur-gateau.component.html',
  styleUrls: ['./lieu-traiteur-gateau.component.scss']
})
export class LieuTraiteurGateauComponent implements OnInit, OnDestroy {


  public filterForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  public type: string;
  @Input() hiddenSearchbar: boolean;
  @Output() public cancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() public search: EventEmitter<any> = new EventEmitter<any>();
  @Input() priceFilter: Subject<any>;
  public showMore=false;

  public gateaumariageGateauxShow = false;
  public lieuTypeDeLieuShow = false;
  public lieuTypesOfSpacesShow = false;
  public lieuTypeReceptionShow = false;
  public lieuSituationGeographiqueShow = false;
  public traiteurSpecialiteCuisineShow = false;

  constructor(private readonly fb: FormBuilder,
              private readonly activatedRoute: ActivatedRoute,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService) {
  }

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.queryParamMap.get('type');
    this.initForm();
    this.selectDefaultOptions();

    this.filterForm.get('categories').get('lieu').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetLieu();
      }
    });

    this.filterForm.get('categories').get('traiteur').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetTraiteur();
      }
    });

    this.filterForm.get('categories').get('gateaumariage').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetGateaumariage();
      }
    });

    this.priceFilter.pipe(takeUntil(this.destroy$)).subscribe((value => {
      this.submit();
    }));
  }

  private initForm(): void {
    this.filterForm = this.fb.group({
      verifiedProvider: [],
      securePayment: [],
      topRatedProviders:[],
      categories: this.fb.group({
        lieu: [{ value: this.type === 'lieu', disabled: this.type === 'lieu' }],
        traiteur: [{ value: this.type === 'traiteur', disabled: this.type === 'traiteur' }],
        gateaumariage: [{ value: this.type === 'gateaumariage', disabled: this.type === 'gateaumariage' }]
      }),
      lieu_typeDeLieu: this.fb.group({
        auberge: [],
        domaine: [],
        chateau: [],
        salle_des_fetes: [],

        restaurant: [],
        peniche: [],
        bateau: [],
        hotel: []
      }),
      lieu_capaciteInvites: this.fb.group({
        lt50: [],
        lt120gt51: [],
        lt200gt121: [],
        gt201: []
      }),
      lieu_salleDeReception: [],
      lieu_pisteDeDense: [],
      lieu_terrasse: [],
      lieu_jardin: [],

      lieu_chambrePourLesMariee: [],
      lieu_cuisinePourLeTraiteur: [],
      lieu_chapiteau: [],
      lieu_parking: [],
      lieu_tente: [],
      lieu_hebergementInvites: [],

      lieu_situationGeographique: this.fb.group({
        sur_la_plage: [],
        pres_de_la_mer: [],
        a_la_montagne: [],
        en_ville: [],

        a_la_sortie_de_la_ville: [],
        a_la_campagne: []
      }),
      lieu_typeReception: this.fb.group({
        vin_honneur: [],
        reception: [],
        cocktail: [],
        buffet: [],

        diner: [],
        aperitif: []
      }),
      lieu_utilisationDuLieu: this.fb.group({
        interieur_et_exterieur: [],
        interieur_seul: [],
        exterieur_seul: []
      }),
      lieu_configurationDeLaReception: this.fb.group({
        assis_et_debout: [],
        debout_seul: [],
        assis_seul: []
      }),
      lieu_heureMinDeDebut: this.fb.group({
        lt5: [],
        lt10gt6: [],
        lt18gt11: []
      }),
      lieu_limiteHoraireDuree: this.fb.group({
        lt0gt0: [],
        lt2gt1: [],
        lt3gt2: [],
        gt3: []
      }),
      lieu_adaptabiliteMobiliteReduite: [],
      lieu_lieuSansServiceTraiteur: [],
      lieu_lieuSansServiceGateau: [],
      lieu_lieuSansServicePhotographeVideaste: [],
      lieu_lieuSansServiceMusic: [],
      lieu_lieuSansServiceDecoration: [],
      lieu_decoration: [],
      lieu_laviselleEtCouvert: [],
      lieu_drapeDeTable: [],

      // Traiteur
      traiteur_specialiteCuisine: this.fb.group({
        francaise: [],
        mediterraneenne: [],
        italienne: [],
        americaine: [],

        asiatique:[],
        indienne:[],
        barbecue:[],
        healthy_saine:[],
        mexicaine_latine:[]
      }),
      traiteur_niveauElaboration: this.fb.group({
        cuisine_brut: [],
        cuisine_simple: [],
        cuisine_semi_gastronomique: [],
        cuisine_gastronomique: []
      }),
      traiteur_specificiteReligieuses: this.fb.group({
        adapte_au_client: [],
        casher: [],
        halal: [],
        vegetarienne: []
      }),
      traiteur_vinHonneurCocktailBuffet: [],
      traiteur_diner: [],
      traiteur_boissonAlcooliseeEtNonAlcoolise: [],
      traiteur_DroitDeBouchon: [],
      traiteur_serviceEnSalle: [],

      //  gateau mariage

      gateaumariage_gateaux: this.fb.group({
        weddingCake: [],
        nakedCake: [],

        vintageChic: []
      })


    });
  }

  public submit() {
    const form = this.filterForm.getRawValue();
    const listArray = [
      'categories', 'lieu_typeDeLieu', 'lieu_situationGeographique', 'lieu_typeReception', 'lieu_utilisationDuLieu',
      'lieu_configurationDeLaReception', 'traiteur_specialiteCuisine', 'traiteur_niveauElaboration', 'traiteur_specificiteReligieuses'];
    const rangeArray = ['lieu_capaciteInvites', 'lieu_heureMinDeDebut', 'lieu_limiteHoraireDuree'];
    const nestedArray = ['gateaumariage_gateaux'];

    if (!form.categories.lieu && !form.categories.traiteur && !form.categories.gateaumariage) {
      this.toastrService.warning(this.translateService.instant('you have to select at least one category'));
    } else {
      const res = Object.entries(form)
        .map(([key, value]) => {
          if (key === 'traiteur_vinHonneurCocktailBuffet') {
            if (value) {
              return { [`${key}.value`]: value };
            }
          } else if (key === 'traiteur_diner') {
            if (value) {
              return { [`traiteur_Dinner.value`]: value };
            }
          } else if (listArray.includes(key)) {
            const reelValue = Object.entries(value)
              .map(([k, v]) => !!v ? k : null)
              .filter(v => !!v);
            if (reelValue.length > 0) {
              return { [key]: reelValue };
            }
          } else if (nestedArray.includes(key)) {
            const reelValue = Object.entries(value)
              .map(([k, v]) => !!v ? k : null)
              .filter(v => !!v);
            if (reelValue.length > 0) {
              return { [`${key}.options.search`]: reelValue };
            }
          } else if (rangeArray.includes(key)) {
            const delais = Object.entries(value)
              .map(([k, v]) => {
                if (!!v) {
                  if (k === 'lt50') {
                    return { lte: 50 };
                  } else if (k === ' lt120gt51') {
                    return { lte: 120, gt: 50 };
                  } else if (k === 'lt200gt121') {
                    return { lte: 200, gt: 120 };
                  } else if (k === 'gt201') {
                    return { gt: 200 };
                    // -----------------
                  } else if (k === ' lt5') {
                    return { lte: 5 };
                  } else if (k === 'lt10gt6') {
                    return { lte: 10, gt: 6 };
                  } else if (k === 'lt18gt11') {
                    return { lte: 18, gt: 11 };
                    // -----------------
                  } else if (k === 'lt0gt0') {
                    return { lte: 0, gte: 0 };
                  } else if (k === 'lt2gt1') {
                    return { lte: 2, gt: 1 };
                  } else if (k === 'lt3gt2') {
                    return { lte: 3, gt: 2 };
                  } else if (k === 'gt3') {
                    return { gt: 3 };
                  }
                  return null;
                }})
              .filter(v => !!v);
            if (delais.length === 0) {
              return null;
            }
            if (key === `lieu_heureMinDeDebut`) {
              return { [`debutLocation.heures`]: delais };
            } else if (key === `lieu_limiteHoraireDuree`) {
              return { [`limiteHoraire.heures`]: delais };
            } else {
              return { [key]: delais };
            }
          } else {
            if (key === 'traiteur_DroitDeBouchon') {
              return !!value ? { [key]: !value } : null;
            }
            return !!value ? { [key]: value } : null;
          }

        })
        .filter(val => !!val)
        .reduce((acc, val) => ({ ...acc, ...val }), {});

      this.search.emit(res);
    }
  }

  public reset() {
    this.filterForm.reset();
    this.selectDefaultOptions();
  }

  private selectDefaultOptions() {
    if (this.type === 'lieu') {
      this.filterForm.get('categories').get('lieu').setValue(true);
    } else if (this.type === 'traiteur') {
      this.filterForm.get('categories').get('traiteur').setValue(true);
    } else {
      this.filterForm.get('categories').get('gateaumariage').setValue(true);
    }
  }

  public cancelForm() {
    this.filterForm.reset();
    this.selectDefaultOptions();
    this.cancel.emit('cancel');
  }

  get lieu() {
    return this.filterForm.get('categories').get('lieu').value;
  }

  set lieu(value: boolean) {
    this.filterForm.get('categories').get('lieu').setValue(value);
  }

  get traiteur() {
    return this.filterForm.get('categories').get('traiteur').value;
  }

  set traiteur(value: boolean) {
    this.filterForm.get('categories').get('traiteur').setValue(value);
  }

  get gateaumariage() {
    return this.filterForm.get('categories').get('gateaumariage').value;
  }

  set gateaumariage(value: boolean) {
    this.filterForm.get('categories').get('gateaumariage').setValue(value);
  }


  private resetLieu() {
    this.filterForm.get('lieu_typeDeLieu').reset();
    this.filterForm.get('lieu_capaciteInvites').reset();
    this.filterForm.get('lieu_salleDeReception').reset();
    this.filterForm.get('lieu_pisteDeDense').reset();
    this.filterForm.get('lieu_terrasse').reset();
    this.filterForm.get('lieu_jardin').reset();
    this.filterForm.get('lieu_situationGeographique').reset();
    this.filterForm.get('lieu_typeReception').reset();
    this.filterForm.get('lieu_utilisationDuLieu').reset();
    this.filterForm.get('lieu_configurationDeLaReception').reset();
    this.filterForm.get('lieu_heureMinDeDebut').reset();
    this.filterForm.get('lieu_limiteHoraireDuree').reset();
    this.filterForm.get('lieu_adaptabiliteMobiliteReduite').reset();
    this.filterForm.get('lieu_hebergementInvites').reset();
    this.filterForm.get('lieu_lieuSansServiceTraiteur').reset();
    this.filterForm.get('lieu_lieuSansServiceGateau').reset();
    this.filterForm.get('lieu_lieuSansServicePhotographeVideaste').reset();
    this.filterForm.get('lieu_lieuSansServiceMusic').reset();
    this.filterForm.get('lieu_lieuSansServiceDecoration').reset();

    this.filterForm.get('lieu_chambrePourLesMariee').reset();
    this.filterForm.get('lieu_cuisinePourLeTraiteur').reset();
    this.filterForm.get('lieu_chapiteau').reset();
    this.filterForm.get('lieu_parking').reset();
    this.filterForm.get('lieu_tente').reset();
    this.filterForm.get('lieu_hebergementInvites').reset();
  }

  private resetTraiteur() {
    this.filterForm.get('traiteur_specialiteCuisine').reset();
    this.filterForm.get('traiteur_niveauElaboration').reset();
    this.filterForm.get('traiteur_specificiteReligieuses').reset();
    this.filterForm.get('traiteur_vinHonneurCocktailBuffet').reset();
    this.filterForm.get('traiteur_diner').reset();
    this.filterForm.get('traiteur_boissonAlcooliseeEtNonAlcoolise').reset();
    this.filterForm.get('traiteur_DroitDeBouchon').reset();
    this.filterForm.get('traiteur_serviceEnSalle').reset();

  }

  private resetGateaumariage() {
    this.filterForm.get('gateaumariage_gateaux').reset();
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
