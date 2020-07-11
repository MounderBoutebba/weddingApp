import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-decorateur-fleuriste-filter',
  templateUrl: './decorateur-fleuriste-filter.component.html',
  styleUrls: ['./decorateur-fleuriste-filter.component.scss']
})
export class DecorateurFleuristeFilterComponent implements OnInit, OnDestroy {

  public filterForm: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public type: string;
  @Output() public cancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() public search: EventEmitter<any> = new EventEmitter<any>();
  @Input() priceFilter: Subject<any>;
  @Input() hiddenSearchbar: boolean;

  public decorateurDecorationAssocieesMore=false;
  public fleuristeFleursMore=false;
  public fleuristeFeuillagesMore=false;
  public fleuristeDecorationMore=false;
  public showMore=false;

  constructor(private readonly fb: FormBuilder,
              private readonly activatedRoute: ActivatedRoute,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService) {
  }

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.queryParamMap.get('type');
    this.initForm();
    if (this.type === 'fleuriste') {
      this.fleuriste = true;
    } else {
      this.decorateur = true;
    }

    this.filterForm.get('categories').get('decorateur').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetDecorateur();
      }
    });

    this.filterForm.get('categories').get('fleuriste').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetFleuriste();
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
        decorateur: [{ value: this.type === 'decorateur', disabled: this.type === 'decorateur' }],
        fleuriste: [{ value: this.type === 'fleuriste', disabled: this.type === 'fleuriste' }]
      }),


      decorateur_decorationAssociees: this.fb.group({
        decorationDeLaSalle: [],
        centreDeTable: [],
        lesBuffets: [],
        espaceLounge: [],

        espace_jeux_enfants:[],
        les_fleurs_compositions_florales:[],
        arches:[],
        tonelle:[],
        drapes:[],
        espace_photo:[],
        chapiteau:[],
        la_table_de_signature:[],
        la_signaletique:[],
        plan_de_table:[]

      }),

      decorateur_livraisonMateriel: [],
      decorateur_montageDemontage: [],


      fleuriste_decoration: this.fb.group({
        brancheDeCoton: [],
        bouleMetal8cmMulticolore: [],
        filDeLaiton: [],
        mitsumataGrand: [],

        rafia: [],
        saule: [],
        boule_metal_5cm_jaune: [],
        Pommes_de_pin: []
      }),

      fleuriste_fleurs: this.fb.group({
        roses: [],
        orchides: [],
        lys: [],
        lotus: [],

        alstroemeria: [],
        amaryllis: [],
        anthurium: [],
        aster: [],
        eillet: [],
        clochettes: [],
        oiseau: [],
        bupleurum: []
      }),

      fleuriste_feuillages: this.fb.group({
        lierre: [],
        eucalyptusParvifolia: [],
        eucalyptusCinerea: [],
        alchemille: [],

        aralias: [],
        asparagus: [],
        Fougere_us_petite: [],
        ruscus: [],
      }),

      fleuriste_livraison: []

    });

  }

  public submit() {
    const form = this.filterForm.getRawValue();
    const nestedArray = [
      'decorateur_decorationAssociees', 'decorateur_decoration',
      'fleuriste_feuillages', 'fleuriste_fleurs', 'fleuriste_decoration'
    ];
    if (!form.categories.fleuriste && !form.categories.decorateur) {
      this.toastrService.warning(this.translateService.instant('you have to select at least one category'));
    } else {
    const res = Object.entries(form)
      .map(([key, value]) => {
        if (key === 'categories') {
          const reelValue = Object.entries(value)
            .map(([k, v]) => !!v ? k : null)
            .filter(v => !!v);
          if (reelValue.length > 0) {
            return { [key]: reelValue };
          }
        }else if (nestedArray.includes(key)){
          const reelValue = Object.entries(value)
            .map(([k, v]) => !!v ? k : null)
            .filter(v => !!v);
          if (reelValue.length > 0) {
            return { [`${key}.options.search`]: reelValue };
          }
        } else {
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

  public cancelForm() {
    this.filterForm.reset();
    this.selectDefaultOptions();
    this.cancel.emit('cancel');
  }

  private selectDefaultOptions() {
    if (this.type === 'fleuriste') {
      this.fleuriste = true;
    } else {
      this.decorateur = true;
    }
  }

  get fleuriste() {
    return this.filterForm.get('categories').get('fleuriste').value;
  }

  set fleuriste(value: boolean) {
    this.filterForm.get('categories').get('fleuriste').setValue(value);
  }

  get decorateur() {
    return this.filterForm.get('categories').get('decorateur').value;
  }

  set decorateur(value: boolean) {
    this.filterForm.get('categories').get('decorateur').setValue(value);
  }

  private resetDecorateur() {
    this.filterForm.get('decorateur_decorationAssociees').reset();
    this.filterForm.get('decorateur_livraisonMateriel').reset();
    this.filterForm.get('decorateur_montageDemontage').reset();
  }

  private resetFleuriste() {
    this.filterForm.get('fleuriste_decoration').reset();
    this.filterForm.get('fleuriste_feuillages').reset();
    this.filterForm.get('fleuriste_fleurs').reset();
    this.filterForm.get('fleuriste_livraison').reset();

  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
