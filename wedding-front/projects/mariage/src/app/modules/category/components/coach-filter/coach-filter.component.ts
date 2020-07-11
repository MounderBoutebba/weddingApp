import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-coach-filter',
  templateUrl: './coach-filter.component.html',
  styleUrls: ['./coach-filter.component.scss']
})
export class CoachFilterComponent implements OnInit, OnDestroy {


  public filterForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  public type: string;
  @Output() public cancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() public search: EventEmitter<any> = new EventEmitter<any>();
  @Input() priceFilter: Subject<any>;
  @Input() hiddenSearchbar: boolean;
  public showMore=false;


  public officiantCeremonieServicesAssociesMore = false;
  public coachSportifTypesDeSportMore = false;
  public choregrapheMariageTypesDeDancesMore = false;


  constructor(private readonly fb: FormBuilder,
              private readonly activatedRoute: ActivatedRoute,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService) {
  }

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.queryParamMap.get('type');
    this.initForm();
    this.selectDefaultOptions();

    this.filterForm.get('categories').get('choregrapheMariage').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetChoregrapheMariage();
      }
    });

    this.filterForm.get('categories').get('coachSportif').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetCoachSportif();
      }
    });

    this.filterForm.get('categories').get('officiantCeremonie').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetOfficiantCeremonie();
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
        choregrapheMariage: [{ value: this.type === 'choregrapheMariage', disabled: this.type === 'choregrapheMariage' }],
        coachSportif: [{ value: this.type === 'coachSportif', disabled: this.type === 'coachSportif' }],
        officiantCeremonie: [{ value: this.type === 'officiantCeremonie', disabled: this.type === 'officiantCeremonie' }]
      }),
      // Choregraphe Mariage
      choregrapheMariage_lieu: this.fb.group({
        domicile: [],
        salle: []
      }),
      choregrapheMariage_typesDeDances: this.fb.group({
        classique: [],
        salsa: [],
        ballet: [],
        flamenco: [],

        traditionnelle:[],
        danse_de_salon:[],
        contemporain_moderne:[],
        hip_hop:[],
        latin_salsa:[],
        jazz:[],
        claquettes:[]
      }),
      choregrapheMariage_servicesAssocies:this.fb.group({
        creation_choregraphie: [],
        creation_bande_musical: [],
        corrections_distance: [],
        conseils_sur_les_tenues_adaptees: []
      }),
      choregrapheMariage_essais: [],
      choregrapheMariage_conseilsPersonnalises: [],

      //  Coach Sportif
      coachSportif_lieu: this.fb.group({
        domicile: [],
        salle: []
      }),
      coachSportif_typesDeSport: this.fb.group({
        musculation: [],
        cardioBoxing: [],
        pilates: [],
        lesMills: [],
        jump_fit:[],
        cycling:[]
      }),
      coachSportif_servicesAssocies: this.fb.group({
        reequilibrage_alimentaire: [],
        remise_en_forme: [],
        perte_de_masse_graisseuse: [],
        prise_de_muscle: []
      }),

      coachSportif_essais: [],
      coachSportif_conseilsPersonnalises: [],

      // Officiant Ceremonie
      officiantCeremonie_servicesAssocies: this.fb.group({
        officier_la_ceremonie_laique_avec_rituel: [],
        organisation_des_entrees_et_sorties_de_la_ceremonie: [],
        orchestrer_la_duree_et_le_timing: [],
        creation_du_texte_des_maries: [],

        creation_des_textes_des_intervenants: [],
        edition_la_playlist_musicale: []
      }),

      officiantCeremonie_conseilsPersonnalises: []
    });
  }

  public submit() {
    const form = this.filterForm.getRawValue();
    const listArray = [
      'categories', 'choregrapheMariage_lieu', 'choregrapheMariage_typesDeDances', 'coachSportif_lieu',
      'coachSportif_typesDeSport'
    ];
    const nestedArray = ['choregrapheMariage_servicesAssocies', 'coachSportif_servicesAssocies','officiantCeremonie_servicesAssocies'];

    if (!form.categories.choregrapheMariage && !form.categories.coachSportif && !form.categories.officiantCeremonie) {
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
          } else if(nestedArray.includes(key)){
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
    if (this.type === 'choregrapheMariage') {
      this.choregrapheMariage = true;
    } else if (this.type === 'coachSportif') {
      this.coachSportif = true;
    } else {
      this.officiantCeremonie = true;
    }
  }

  public cancelForm() {
    this.filterForm.reset();
    this.selectDefaultOptions();
    this.cancel.emit('cancel');
  }

  get choregrapheMariage() {
    return this.filterForm.get('categories').get('choregrapheMariage').value;
  }

  set choregrapheMariage(value: boolean) {
    this.filterForm.get('categories').get('choregrapheMariage').setValue(value);
  }

  get coachSportif() {
    return this.filterForm.get('categories').get('coachSportif').value;
  }

  set coachSportif(value: boolean) {
    this.filterForm.get('categories').get('coachSportif').setValue(value);
  }

  get officiantCeremonie() {
    return this.filterForm.get('categories').get('officiantCeremonie').value;
  }

  set officiantCeremonie(value: boolean) {
    this.filterForm.get('categories').get('officiantCeremonie').setValue(value);
  }


  private resetChoregrapheMariage() {
    this.filterForm.get('choregrapheMariage_lieu').reset();
    this.filterForm.get('choregrapheMariage_typesDeDances').reset();
    this.filterForm.get('choregrapheMariage_servicesAssocies').reset();
    this.filterForm.get('choregrapheMariage_essais').reset();
    this.filterForm.get('choregrapheMariage_conseilsPersonnalises').reset();
  }

  private resetCoachSportif() {
    this.filterForm.get('coachSportif_lieu').reset();
    this.filterForm.get('coachSportif_typesDeSport').reset();
    this.filterForm.get('coachSportif_servicesAssocies').reset();
    this.filterForm.get('coachSportif_essais').reset();
    this.filterForm.get('coachSportif_conseilsPersonnalises').reset();
  }

  private resetOfficiantCeremonie() {
    this.filterForm.get('officiantCeremonie_servicesAssocies').reset();
    this.filterForm.get('officiantCeremonie_conseilsPersonnalises').reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
