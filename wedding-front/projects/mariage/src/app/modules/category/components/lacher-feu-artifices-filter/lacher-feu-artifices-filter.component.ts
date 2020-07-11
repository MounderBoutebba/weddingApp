import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lacher-feu-artifices-filter',
  templateUrl: './lacher-feu-artifices-filter.component.html',
  styleUrls: ['./lacher-feu-artifices-filter.component.scss']
})
export class LacherFeuArtificesFilterComponent implements OnInit, OnDestroy {


  public filterForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  public type: string;
  @Output() public cancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() public search: EventEmitter<any> = new EventEmitter<any>();
  @Input() priceFilter: Subject<any>;
  @Input() hiddenSearchbar: boolean;

  public showMore=false;

  public feuArtificesProgrammesShow = false;
  public feuArtificesEffetsShow = false;

  constructor(private readonly fb: FormBuilder,
              private readonly activatedRoute: ActivatedRoute,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService) {
  }

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.queryParamMap.get('type');
    this.initForm();
    this.selectDefaultOptions();

    this.filterForm.get('categories').get('lacher').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetLacher();
      }
    });

    this.filterForm.get('categories').get('feuArtifices').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetFeuArtifices();
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
        feuArtifices: [{ value: this.type === 'feuArtifices', disabled: this.type === 'feuArtifices' }],
        lacher: [{ value: this.type === 'lacher', disabled: this.type === 'lacher' }],
      }),
      // FeuArtifices
      feuArtifices_effets: this.fb.group({
        jongleriesDePivoinesRouges: [],
        archesDePlumeauxJaunes: [],
        batailleDePlumetsBlancsEtCroisillonsTopaze: [],
        eventailDeGerbesOr: [],

        envolees_de_papillons: [],
        rideaux_etoiles_de_poussiereor: [],
        palmiers_coiffes_de_lucioles: [],
        elevation_craquante_pointes_violettes: [],
        rideau_de_poussieres_emeraude: [],
        tourbillons_spirale_argent: [],
        fontaines_or_cascade_de_saphir: [],
        plumets_filaments_nacres: [],
        bouquet_croisement_orange: [],
        coeur_rouge_et_jet_argent: [],
        pluie_scintillante_argentee: [],
        roseaux_mosaique_de_cocotiers_argent: [],
        sequences_effets_speciaux: [],
        lettre_ou_chiffre_de_feu: [],
        jongleries_de_palmiers_or: [],
        lanceurs_de_coeurs_blanc_ou_rouge: []

      }),

      feuArtifices_programmes: this.fb.group({
        tableauxDeFontaines: [],
        facadeDeChandelles: [],
        tableauxMajestueux: [],
        couleursIntenses: [],

        façade_de_gerbes: [],
        tableaux_aeriens: [],
        bouquet_spectaculaire_avant_le_bouquet_final: [],
        mise_en_scene_exceptionnelle: [],
        produits_pyrotechniques_grand_spectacle: [],
        bouquet_final_puissant_et_volumineux: []


      }),

      // Lacher

      lachers_lachers: this.fb.group({
        ballons: [],
        lanternes: [],
        colombes: [],
        papillons: []
      })

    });
  }

  public submit() {
    const form = this.filterForm.getRawValue();
    const listArray = ['categories'];
    const nestedArray = ['feuArtifices_effets', 'feuArtifices_programmes', 'lachers_lachers'];

    if (!form.categories.feuArtifices && !form.categories.lacher) {
      this.toastrService.warning(this.translateService.instant('you have to select at least one category'));
    } else {
      const res = Object.entries(form)
        .map(([key, value]) => {
          if (listArray.includes(key)) {
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

  private selectDefaultOptions() {
    if (this.type === 'feuArtifices') {
      this.filterForm.get('categories').get('feuArtifices').setValue(true);
    } else {
      this.filterForm.get('categories').get('lacher').setValue(true);
    }
  }

  public cancelForm() {
    this.filterForm.reset();
    this.selectDefaultOptions();
    this.cancel.emit('cancel');
  }

  get feuArtifices() {
    return this.filterForm.get('categories').get('feuArtifices').value;
  }

  set feuArtifices(value: boolean) {
    this.filterForm.get('categories').get('feuArtifices').setValue(value);
  }

  get lacher() {
    return this.filterForm.get('categories').get('lacher').value;
  }

  set lacher(value: boolean) {
    this.filterForm.get('categories').get('lacher').setValue(value);
  }

  private resetFeuArtifices() {
    this.filterForm.get('feuArtifices_effets').reset();
    this.filterForm.get('feuArtifices_programmes').reset();
  }

  private resetLacher() {
    this.filterForm.get('lachers_lachers').reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
