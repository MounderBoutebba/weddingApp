import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-animateur-enfants-adultes-filter',
  templateUrl: './animateur-enfants-adultes-filter.component.html',
  styleUrls: ['./animateur-enfants-adultes-filter.component.scss']
})
export class AnimateurEnfantsAdultesFilterComponent implements OnInit, OnDestroy {

  public filterForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  public type: string;
  @Output() public cancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() public search: EventEmitter<any> = new EventEmitter<any>();
  @Input() priceFilter: Subject<any>;
  @Input() hiddenSearchbar: boolean;

  public showMore=false;
  public animateurEnfantsAnimationsMore = false;
  public animateurAdultsAnimationsMore = false;


  constructor(private readonly fb: FormBuilder,
              private readonly activatedRoute: ActivatedRoute,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService) {
  }

  get animateurAdultes() {
    return this.filterForm.get('categories').get('animateurAdultes').value;
  }

  set animateurAdultes(value: boolean) {
    this.filterForm.get('categories').get('animateurAdultes').setValue(value);
  }

  get animateurEnfants() {
    return this.filterForm.get('categories').get('animateurEnfants').value;
  }

  set animateurEnfants(value: boolean) {
    this.filterForm.get('categories').get('animateurEnfants').setValue(value);
  }

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.queryParamMap.get('type');
    this.initForm();
    this.selectDefaultOptions();

    this.filterForm.get('categories').get('animateurEnfants').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetAnimateurEnfants();
      }
    });

    this.filterForm.get('categories').get('animateurAdultes').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetAnimateurAdultes();
      }
    });

    this.priceFilter.pipe(takeUntil(this.destroy$)).subscribe((value => {
      this.submit();
    }));

  }

  public submit() {
    const form = this.filterForm.getRawValue();
    const nestedArray = ['animateurEnfants_animations'];
    if (!form.categories.animateurAdultes && !form.categories.animateurEnfants) {
      this.toastrService.warning(this.translateService.instant('you have to select at least one category'));
    } else {
      const res = Object.entries(form)
        .map(([key, value]) => {
          if (key === 'categories' || key === 'animateurAdultes_typeDeService') {
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

  public cancelForm() {
    this.filterForm.reset();
    this.selectDefaultOptions();
    this.cancel.emit('cancel');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {

    this.filterForm = this.fb.group({
      verifiedProvider: [],
      securePayment: [],
      topRatedProviders:[],
      categories: this.fb.group({
        animateurAdultes: [{ value: this.type === 'animateurAdultes', disabled: this.type === 'animateurAdultes' }],
        animateurEnfants: [{ value: this.type === 'animateurEnfants', disabled: this.type === 'animateurEnfants' }]
      }),


      animateurEnfants_animations: this.fb.group({
        magie: [],
        clown: [],
        dessin: [],
        maquillage: [],

        spectacle_complet_avec_decor:[],
        compteur:[],
        pere_noel:[],
        structure_gonflable:[],
        slupteur_de_ballons:[],
        atelier_artistique:[],
        marionnettiste:[],
        danse:[]
      }),


      animateurAdultes_typeDeService: this.fb.group({
        magicien: [],
        dessinateur: [],
        danseurs: [],
        sosie: [],
        mentaliste:[]
      })

    });

  }

  private selectDefaultOptions() {
    if (this.type === 'animateurAdultes') {
      this.animateurAdultes = true;
    } else {
      this.animateurEnfants = true;
    }
  }

  private resetAnimateurEnfants() {
    this.filterForm.get('animateurEnfants_animations').reset();
  }

  private resetAnimateurAdultes() {
    this.filterForm.get('animateurAdultes_typeDeService').reset();
  }

}
