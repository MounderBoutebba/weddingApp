import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dj-groupe-musicien-filter',
  templateUrl: './dj-groupe-musicien-filter.component.html',
  styleUrls: ['./dj-groupe-musicien-filter.component.scss']
})
export class DjGroupeMusicienFilterComponent  implements OnInit, OnDestroy {


  public filterForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  public type: string;
  @Output() public cancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() public search: EventEmitter<any> = new EventEmitter<any>();
  @Input() priceFilter: Subject<any>;
  @Input() hiddenSearchbar: boolean;

  public showMore=false;

  public djInstrumentsShow = false;
  public groupeInstrumentsShow = false;
  public musicienInstrumentsShow = false;

  public djSpecialiteShow = false;
  public groupeSpecialiteShow = false;
  public musicienSpecialiteShow = false;

  public djAnimationsShow = false;
  public groupeAnimationsShow = false;
  public musicienAnimationsShow = false;

  constructor(private readonly fb: FormBuilder,
              private readonly activatedRoute: ActivatedRoute,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService) {
  }

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.queryParamMap.get('type');
    this.initForm();
    this.selectDefaultOptions();

    this.filterForm.get('categories').get('dj').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetDj();
      }
    });

    this.filterForm.get('categories').get('groupe').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetGroupe();
      }
    });

    this.filterForm.get('categories').get('musicien').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetMusicien();
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
        dj: [{ value: this.type === 'dj', disabled: this.type === 'dj' }],
        groupe: [{ value: this.type === 'groupe', disabled: this.type === 'groupe' }],
        musicien: [{ value: this.type === 'musicien', disabled: this.type === 'musicien' }]
      }),
      // Dj
      dj_specialite: this.fb.group({
        generaliste: [],
        musique_actuelles: [],
        oriental: [],
        africain: [],

        indien: [],
        latino: [],
        antillais: [],
        pop: [],
        hip_hop_rap_rnb: [],
        electronic_dance_House: [],
        annees_80_disco: []
      }),
      dj_instruments: this.fb.group({
        table_de_mixage: [],
        piano: [],
        batterie: [],
        guitare: [],
        saxophone: [],
        violon: []
      }),
      dj_adaptabiliteLieu: this.fb.group({
        interieur_et_exterieur: [],
        interieur_seul: [],
        exterieur_seul: []
      }),
      dj_typePublic: this.fb.group({
        adultes_et_enfants: [],
        adultes_seulement: []
      }),

      dj_materiels: this.fb.group({
        video_projecteur: [],
        lasers: [],
        machineFummee: [],
        jeuxDeLumiere: []
      }),

      dj_animations: this.fb.group({
        animateur: [],
        karaoke: [],
        derbouka: [],
        danseurs: [],

        chanteurs: [],
        deguisements: [],
        machineFummee: []

      }),

      // Groupe
      groupe_specialite: this.fb.group({
        generaliste: [],
        musique_actuelles: [],
        oriental: [],
        africain: [],

        indien: [],
        latino: [],
        antillais: [],
        pop: [],
        hip_hop_rap_rnb: [],
        electronic_dance_House: [],
        annees_80_disco: []
      }),
      groupe_instruments: this.fb.group({
        table_de_mixage: [],
        piano: [],
        batterie: [],
        guitare: [],
        saxophone: [],
        violon: []
      }),
      groupe_adaptabiliteLieu: this.fb.group({
        interieur_et_exterieur: [],
        interieur_seul: [],
        exterieur_seul: []
      }),
      groupe_typePublic: this.fb.group({
        adultes_et_enfants: [],
        adultes_seulement: []
      }),

      groupe_materiels: this.fb.group({
        video_projecteur: [],
        lasers: [],
        machineFummee: [],
        jeuxDeLumiere: []
      }),

      groupe_animations: this.fb.group({
        animateur: [],
        karaoke: [],
        derbouka: [],
        danseurs: [],

        chanteurs: [],
        deguisements: [],
        machineFummee: []
      }),

      // Musicien
      musicien_specialite: this.fb.group({
        generaliste: [],
        musique_actuelles: [],
        oriental: [],
        africain: [],

        indien: [],
        latino: [],
        antillais: [],
        pop: [],
        hip_hop_rap_rnb: [],
        electronic_dance_House: [],
        annees_80_disco: []
      }),
      musicien_instruments: this.fb.group({
        table_de_mixage: [],
        piano: [],
        batterie: [],
        guitare: [],
        saxophone: [],
        violon: []
      }),
      musicien_adaptabiliteLieu: this.fb.group({
        interieur_et_exterieur: [],
        interieur_seul: [],
        exterieur_seul: []
      }),
      musicien_typePublic: this.fb.group({
        adultes_et_enfants: [],
        adultes_seulement: []
      }),

      musicien_materiels: this.fb.group({
        video_projecteur: [],
        lasers: [],
        machineFummee: [],
        jeuxDeLumiere: []
      }),
      musicien_animations: this.fb.group({
        animateur: [],
        karaoke: [],
        derbouka: [],
        danseurs: [],

        chanteurs: [],
        deguisements: [],
        machineFummee: []
      })

    });
  }

  public submit() {
    const form = this.filterForm.getRawValue();
    const listArray = [
      'categories', 'dj_specialite', 'dj_instruments', 'dj_adaptabiliteLieu', 'dj_typePublic',
      'musicien_specialite', 'musicien_instruments', 'musicien_adaptabiliteLieu', 'musicien_typePublic',
      'groupe_specialite', 'groupe_instruments', 'groupe_adaptabiliteLieu', 'groupe_typePublic'
    ];
    const nestedArray = [
      'dj_materiels', 'dj_animations',
      'groupe_materiels', 'groupe_animations',
      'musicien_animations', 'musicien_materiels'
    ];

    if (!form.categories.dj && !form.categories.groupe && !form.categories.musicien) {
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
    if (this.type === 'dj') {
      this.filterForm.get('categories').get('dj').setValue(true);
    } else if (this.type === 'groupe') {
      this.filterForm.get('categories').get('groupe').setValue(true);
    } else {
      this.filterForm.get('categories').get('musicien').setValue(true);
    }
  }

  public cancelForm() {
    this.filterForm.reset();
    this.selectDefaultOptions();
    this.cancel.emit('cancel');
  }

  get dj() {
    return this.filterForm.get('categories').get('dj').value;
  }

  set dj(value: boolean) {
    this.filterForm.get('categories').get('dj').setValue(value);
  }

  get groupe() {
    return this.filterForm.get('categories').get('groupe').value;
  }

  set groupe(value: boolean) {
    this.filterForm.get('categories').get('groupe').setValue(value);
  }

  get musicien() {
    return this.filterForm.get('categories').get('musicien').value;
  }

  set musicien(value: boolean) {
    this.filterForm.get('categories').get('musicien').setValue(value);
  }


  private resetDj() {
    this.filterForm.get('dj_specialite').reset();
    this.filterForm.get('dj_instruments').reset();
    this.filterForm.get('dj_adaptabiliteLieu').reset();
    this.filterForm.get('dj_typePublic').reset();
    this.filterForm.get('dj_materiels').reset();
    this.filterForm.get('dj_animations').reset();
  }

  private resetMusicien() {
    this.filterForm.get('musicien_specialite').reset();
    this.filterForm.get('musicien_instruments').reset();
    this.filterForm.get('musicien_adaptabiliteLieu').reset();
    this.filterForm.get('musicien_typePublic').reset();
    this.filterForm.get('musicien_materiels').reset();
    this.filterForm.get('musicien_animations').reset();
  }

  private resetGroupe() {
    this.filterForm.get('groupe_specialite').reset();
    this.filterForm.get('groupe_instruments').reset();
    this.filterForm.get('groupe_adaptabiliteLieu').reset();
    this.filterForm.get('groupe_typePublic').reset();
    this.filterForm.get('groupe_materiels').reset();
    this.filterForm.get('groupe_animations').reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
