import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-voiture-bus-filter',
  templateUrl: './voiture-bus-filter.component.html',
  styleUrls: ['./voiture-bus-filter.component.scss']
})
export class VoitureBusFilterComponent implements OnInit, OnDestroy {

  public filterForm: FormGroup;
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public type: string;
  @Input() hiddenSearchbar: boolean;
  @Output() public cancel: EventEmitter<string> = new EventEmitter<string>();
  @Output() public search: EventEmitter<any> = new EventEmitter<any>();
  @Input() priceFilter: Subject<any>;
  public showMore=false;


  constructor(private readonly fb: FormBuilder,
              private readonly activatedRoute: ActivatedRoute,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService) {
  }

  ngOnInit() {
    this.type = this.activatedRoute.snapshot.queryParamMap.get('type');
    this.initForm();
    if (this.type === 'bus') {
      this.bus = true;
    } else {
      this.voiture = true;
    }

    this.filterForm.get('categories').get('bus').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetBus();
      }
    });

    this.filterForm.get('categories').get('voiture').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetVoiture();
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
        voiture: [{ value: this.type === 'voiture', disabled: this.type === 'voiture' }],
        bus: [{ value: this.type === 'bus', disabled: this.type === 'bus' }]
      }),

      voiture_voitures: this.fb.group({
        voitureHautDeGamme: [],
        voitureDeCollection: [],
        limousine: [],
        voitureSportive: []
      }),

      voiture_chauffeur: [],

      bus_bus: this.fb.group({
        van: [],
        microbus: [],
        minibus: [],
        midibus: []
      }),

      bus_chauffeur: []

    });

  }

  public submit() {
    const form = this.filterForm.getRawValue();
    const nestedArray = ['voiture_voitures', 'bus_bus'];
    if (!form.categories.bus && !form.categories.voiture) {
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
              return { [`${key}.fields.search`]: reelValue };
            }
          } else if (key === 'voiture_chauffeur' && !!value) {
            return { [`voiture_services.options.search`]: `chauffeur` };
          } else if (key === 'bus_chauffeur' && !!value) {
            return { [`bus_services.options.search`]: `chauffeur` };
          }else {
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

  get bus() {
    return this.filterForm.get('categories').get('bus').value;
  }

  set bus(value: boolean) {
    this.filterForm.get('categories').get('bus').setValue(value);
  }

  get voiture() {
    return this.filterForm.get('categories').get('voiture').value;
  }

  set voiture(value: boolean) {
    this.filterForm.get('categories').get('voiture').setValue(value);
  }

  private resetBus() {
    this.filterForm.get('bus_bus').reset();
    this.filterForm.get('bus_chauffeur').reset();
  }

  private resetVoiture() {
    this.filterForm.get('voiture_voitures').reset();
    this.filterForm.get('voiture_chauffeur').reset();
  }

  private selectDefaultOptions() {
    if (this.type === 'bus') {
      this.bus = true;
    } else {
      this.voiture = true;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

