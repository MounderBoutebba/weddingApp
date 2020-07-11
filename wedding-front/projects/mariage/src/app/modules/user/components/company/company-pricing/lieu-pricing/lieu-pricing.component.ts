import { Component, OnInit, Input, ViewChild, PLATFORM_ID, Inject, AfterViewInit, HostListener } from '@angular/core';
import { DynamicFormBuilderComponent } from '../../../../../shared/components/dynamic-form-builder';
import { FormGroup, FormControl } from '@angular/forms';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { AuthStore } from '../../../../../store/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../../services/company.service';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LieuPricingService } from './lieu-pricing.service';
import { TraiteurPricingService } from '../traiteur-pricing/traiteur-pricing.service';
import { GateauMariagePricingService } from '../gateau-mariage-pricing/gateau-mariage-pricing.service';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { newTraiteurCriteres } from '../../company-details/traiteur/traiteur.interface';
import { newGateauMariageCriteres } from '../../company-details/gateau-mariage/gateau-mariage.interface';
import { AuthService } from '../../../../../../core/auth.service';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-lieu-pricing',
  templateUrl: './lieu-pricing.component.html',
  styleUrls: ['./lieu-pricing.component.scss']
})
export class LieuPricingComponent implements OnInit, AfterViewInit {
  @Input() criteres: any;
  @Input() primaryComponent = true;
  @Input() categories: string[] = [];
  @ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
  @ViewChild('traiteurComponent') traiteurComponent: any;
  @ViewChild('gateauMariageComponent') gateauMariageComponent: any;
  showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
	showTraiteurComponent = false;
  showGateauMariageComponent = false;
  traiteurInitCriteres: any = newTraiteurCriteres;
  gateauMariageInitCriteres: any = newGateauMariageCriteres;
  public form: FormGroup;
	public isTraiteur: boolean;
	public isGateauMariage: boolean;
  public parsedCriteres: DynamicFormFieldInterface[];
  currentEmail = '';
  constructor(private readonly lieuService: LieuPricingService,
              private readonly traiteurService: TraiteurPricingService,
              private readonly gateauMariageService: GateauMariagePricingService,
              private readonly authStore: AuthStore,
              @Inject(PLATFORM_ID) private readonly platformId: object,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService,
              private readonly dialogService: DialogService,
              private readonly router: Router,
              private readonly authService: AuthService,
              private readonly route: ActivatedRoute,
              private readonly companyService: CompanyService) {
  }

  ngOnInit() {
    // afficher les input par type
    this.currentEmail = this.route.snapshot.paramMap.get('email');
		this.isTraiteur = this.categories.includes(CategoryLabelEnum.TRAITEUR);
		this.initTraiteurCriteres(this.isTraiteur);
		this.isGateauMariage = this.categories.includes(CategoryLabelEnum.GATEAU_MARIAGE);
  this.initGateauMariageCriteres(this.isGateauMariage);
  this.criteres = this.lieuService.selectCriteres(this.criteres, CategoryLabelEnum.LIEU);
		// console.log('selected criteres', this.criteres);
		this.criteres = this.lieuService.removePrefix(this.criteres, CategoryLabelEnum.LIEU);
		this.parsedCriteres = this.lieuService.initFormValuesWithLieuCriteria(this.criteres);
		this.buildForm();
  }
  initTraiteurCriteres(isTraiteur: boolean) {
		if (isTraiteur) {
			this.traiteurInitCriteres = this.criteres;
			this.showTraiteurComponent = true;
		}
	}
  initGateauMariageCriteres(isGateauMariag: boolean) {
		if (isGateauMariag) {
			this.gateauMariageInitCriteres = this.criteres;
			this.showGateauMariageComponent = true;
		}
  }
  ngAfterViewInit() {
		this.showSubmitBtn = true;
	}
	buildForm() {
		this.showForm = false;
		this.form = new FormGroup({
		  fields: new FormControl(JSON.stringify(this.parsedCriteres))
		});
		this.showForm = true;
  }
  async onAddOption(field: DynamicFormFieldInterface) {
		this.parsedCriteres = await this.lieuService.addOption(this.parsedCriteres, field);
		this.buildForm();
    this.formBuilder.ngOnInit();
    this.formBuilder.appFieldBuilderComponent.checkBoxChanged(field);
  }
  setFormIsValid(): boolean {
    let formIsValid: boolean = this.formBuilder.form.valid;
    if (this.isTraiteur && this.showTraiteurComponent) { formIsValid = formIsValid && this.traiteurComponent.formBuilder.form.valid; }
    // tslint:disable-next-line:max-line-length
    if (this.isGateauMariage && this.showGateauMariageComponent) { formIsValid = formIsValid && this.gateauMariageComponent.formBuilder.form.valid; }
    return formIsValid;
  }
  getTraiteurValid() {
    if (this.showTraiteurComponent) {
      return this.traiteurComponent.getTraiteurValid();
    } else {
      return true;
    }
  }
  getLimitHoraireValid() {
    return true;
    /* return this.formBuilder.form.value.limiteHoraire.value ?
    !!this.formBuilder.form.value.limiteHoraire.hourValue || !!this.formBuilder.form.value.limiteHoraire.minValue : true;*/
  }
  getGateauxValid(): boolean {
    if (this.showGateauMariageComponent) {
      return this.gateauMariageComponent.getGateauxValid();
    } else {
      return true;
    }
  }
  formSubmitted() {
    if (this.setFormIsValid()) {
      if (this.getLimitHoraireValid()) {
        if (this.getTraiteurValid()) {
          if (this.getGateauxValid()) {
            this.formWasSubmitted = true;
            this.patchService();
            this.updateCurrentStep();
          }
        }
      } else {
        this.toastrService.error(this.translateService.instant('limite horaire est obligatoire'));
      }

    } else {
			this.dialogService.openErrorDialog('form is not valid');
		}
  }
  updateCurrentStep() {
    const currentEmail = this.route.snapshot.paramMap.get('email');
    this.companyService.findCompanyByEmail(currentEmail).subscribe( company => {
      company.currentStep = 'company-settings';
      this.companyService.updateCurrentStep(company.id, currentEmail, company).subscribe( res => {
      });
    });
  }
  patchService() {
		const lieuFormValue = this.formBuilder.form.value;
		const dataObject = this.lieuService.mapFormValueToLieuCriteria(lieuFormValue, this.criteres);
  console.log('lieu data object', dataObject);
  this.companyService.putServiceByEmailAndService(CategoryLabelEnum.LIEU,
      this.currentEmail,
      dataObject).subscribe(
        (data) => {
          if (!this.showTraiteurComponent && !this.showGateauMariageComponent) {
            // tslint:disable-next-line:max-line-length
            if (this.authStore.getUser().role === 'provider') {
              this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
            }
            if (this.authStore.getUser().role === 'admin') {
              this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
            }
          }
          if (this.showTraiteurComponent && this.showGateauMariageComponent) {
            const traiteurFormValue = this.traiteurComponent.formBuilder.form.value;
            // tslint:disable-next-line:max-line-length
            const traiteurDataObject = this.traiteurService.mapFormValueToTraiteurCriteria(traiteurFormValue, this.traiteurComponent.criteres);
            console.log('traiteur data object', traiteurDataObject);
            this.companyService.putServiceByEmailAndService(CategoryLabelEnum.TRAITEUR,
              this.currentEmail,
              traiteurDataObject).subscribe(
                (traiteurData) => {
                  const gateauFormValue = this.gateauMariageComponent.formBuilder.form.value;
                  // tslint:disable-next-line:max-line-length
                  const gateauDataObject = this.gateauMariageService.mapFormValueToGateauMariageCriteria(gateauFormValue, this.gateauMariageComponent.criteres);
                  console.log('gateau data object', gateauDataObject);
                  this.companyService.putServiceByEmailAndService(CategoryLabelEnum.GATEAU_MARIAGE,
                    this.currentEmail,
                    gateauDataObject).subscribe(
                      (gateauData) => {
                        // tslint:disable-next-line:max-line-length
                        if (this.authStore.getUser().role === 'provider') {
                          this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
                        }
                        if (this.authStore.getUser().role === 'admin') {
                          this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
                        }
                      });
                });
          } else if (this.showTraiteurComponent) {
            const traiteurFormValue = this.traiteurComponent.formBuilder.form.value;
            // tslint:disable-next-line:max-line-length
            const traiteurDataObject = this.traiteurService.mapFormValueToTraiteurCriteria(traiteurFormValue, this.traiteurComponent.criteres);
            console.log('traiteur data object', traiteurDataObject);
            this.companyService.putServiceByEmailAndService(CategoryLabelEnum.TRAITEUR,
              this.currentEmail,
              traiteurDataObject).subscribe(
                (traiteurData) => {
                  // tslint:disable-next-line:max-line-length
                  if (this.authStore.getUser().role === 'provider') {
                    this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
                  }
                  if (this.authStore.getUser().role === 'admin') {
                    this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
                  }
                });

          } else if (this.showGateauMariageComponent) {
            const gateauFormValue = this.gateauMariageComponent.formBuilder.form.value;
            // tslint:disable-next-line:max-line-length
            const gateauDataObject = this.gateauMariageService.mapFormValueToGateauMariageCriteria(gateauFormValue, this.gateauMariageComponent.criteres);
            console.log('gateau data object', gateauDataObject);
            this.companyService.putServiceByEmailAndService(CategoryLabelEnum.GATEAU_MARIAGE,
              this.currentEmail,
              gateauDataObject).subscribe(
                (gateauData) => {
                  // tslint:disable-next-line:max-line-length
                  if (this.authStore.getUser().role === 'provider') {
                    this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
                  }
                  if (this.authStore.getUser().role === 'admin') {
                    this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
                  }
                });

          }
        });
  }

  public canDeactivate(): Observable<boolean> | boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.formWasSubmitted) {
        return this.dialogService.openConfirmDialog();
      }
    }
    return of(true);
  }

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHander(event) {
    return this.formWasSubmitted;
  }

/*  @HostListener('window:unload', ['$event'])
  public unloadHander(event) {
    if (!this.formWasSubmitted) {
      // this.authService.logout();
    }
  }*/

}
