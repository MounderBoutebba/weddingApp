import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-soins-estetique-maquillage-coiffure-filter',
  templateUrl: './soins-estetique-maquillage-coiffure-filter.component.html',
  styleUrls: ['./soins-estetique-maquillage-coiffure-filter.component.scss']
})
export class SoinsEstetiqueMaquillageCoiffureFilterComponent implements OnInit, OnDestroy {


  public filterForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
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
    this.selectDefaultOptions();

    this.filterForm.get('categories').get('coiffure').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetCoiffure();
      }
    });

    this.filterForm.get('categories').get('maquillage').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetMaquillage();
      }
    });

    this.filterForm.get('categories').get('estetique').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetEstetique();
      }
    });

    this.filterForm.get('categories').get('soins').valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(value => {
      if (!value) {
        this.resetSoins();
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
        coiffure: [{ value: this.type === 'coiffure', disabled: this.type === 'coiffure' }],
        maquillage: [{ value: this.type === 'maquillage', disabled: this.type === 'maquillage' }],
        estetique: [{ value: this.type === 'estetique', disabled: this.type === 'estetique' }],
        soins: [{ value: this.type === 'soins', disabled: this.type === 'soins' }]
      }),
      // coiffure
      coiffure_lieuRealisation: this.fb.group({
        domicile: [],
        salon: []
      }),
      coiffure_conseilsPersonnalises: [],
      coiffure_essais: [],
      coiffure_prestationInvitesProches: [],

      // maquillage
      maquillage_lieuRealisation: this.fb.group({
        domicile: [],
        salon: []
      }),
      maquillage_conseilsPersonnalises: [],
      maquillage_essais: [],
      maquillage_prestationInvitesProches: [],

      // estetique
      estetique_lieuRealisation: this.fb.group({
        domicile: [],
        salon: []
      }),
      estetique_conseilsPersonnalises: [],
      estetique_essais: [],
      estetique_epilation: [],
      estetique_manucurePedicure: [],

      // soins
      soins_lieuRealisation: this.fb.group({
        domicile: [],
        salon: []
      }),
      soins_conseilsPersonnalises: [],
      soins_essais: [],
      soins_massage: [],
      soins_soins: []

    });
  }

  public submit() {
    const form = this.filterForm.getRawValue();
    const listArray = [
      'categories', 'coiffure_lieuRealisation', 'maquillage_lieuRealisation', 'estetique_lieuRealisation', 'soins_lieuRealisation'
    ];

    if (!form.categories.coiffure && !form.categories.maquillage && !form.categories.estetique && !form.categories.soins) {
      this.toastrService.warning(this.translateService.instant('you have to select at least one category'));
    } else {
      const res = Object.entries(form)
        .map(([key, value]) => {
          if (key === 'estetique_manucurePedicure') {
            return { [`estetique_manucureEtpedicure.value`]: value };
          } else if (key === 'estetique_epilation') {
            return { [`estetique_epilation.value`]: value };
          } else if (key === 'soins_massage') {
            return { [`soins_massage.value`]: value };
          } else if (key === 'soins_soins') {
            return { [`soins_soins.value`]: value };
          } else if (listArray.includes(key)) {
            const reelValue = Object.entries(value)
              .map(([k, v]) => !!v ? k : null)
              .filter(v => !!v);
            if (reelValue.length > 0) {
              return { [key]: reelValue };
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
    if (this.type === 'coiffure') {
      this.coiffure = true;
    } else if (this.type === 'maquillage') {
      this.maquillage = true;
    } else if (this.type === 'estetique') {
      this.estetique = true;
    } else {
      this.soins = true;
    }
  }

  public cancelForm() {
    this.filterForm.reset();
    this.selectDefaultOptions();
    this.cancel.emit('cancel');
  }

  get coiffure() {
    return this.filterForm.get('categories').get('coiffure').value;
  }

  set coiffure(value: boolean) {
    this.filterForm.get('categories').get('coiffure').setValue(value);
  }

  get maquillage() {
    return this.filterForm.get('categories').get('maquillage').value;
  }

  set maquillage(value: boolean) {
    this.filterForm.get('categories').get('maquillage').setValue(value);
  }

  get estetique() {
    return this.filterForm.get('categories').get('estetique').value;
  }

  set estetique(value: boolean) {
    this.filterForm.get('categories').get('estetique').setValue(value);
  }

  get soins() {
    return this.filterForm.get('categories').get('soins').value;
  }

  set soins(value: boolean) {
    this.filterForm.get('categories').get('soins').setValue(value);
  }


  private resetCoiffure() {
    this.filterForm.get('coiffure_lieuRealisation').reset();
    this.filterForm.get('coiffure_conseilsPersonnalises').reset();
    this.filterForm.get('coiffure_essais').reset();
    this.filterForm.get('coiffure_prestationInvitesProches').reset();
  }

  private resetMaquillage() {
    this.filterForm.get('maquillage_lieuRealisation').reset();
    this.filterForm.get('maquillage_conseilsPersonnalises').reset();
    this.filterForm.get('maquillage_essais').reset();
    this.filterForm.get('maquillage_prestationInvitesProches').reset();
  }

  private resetEstetique() {
    this.filterForm.get('estetique_lieuRealisation').reset();
    this.filterForm.get('estetique_conseilsPersonnalises').reset();
    this.filterForm.get('estetique_essais').reset();
    this.filterForm.get('estetique_epilation').reset();
    this.filterForm.get('estetique_manucurePedicure').reset();
  }

  private resetSoins() {
    this.filterForm.get('soins_lieuRealisation').reset();
    this.filterForm.get('soins_conseilsPersonnalises').reset();
    this.filterForm.get('soins_essais').reset();
    this.filterForm.get('soins_massage').reset();
    this.filterForm.get('soins_soins').reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
