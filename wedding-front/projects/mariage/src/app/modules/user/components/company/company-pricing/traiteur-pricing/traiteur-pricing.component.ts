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
import { LieuPricingService } from '../lieu-pricing/lieu-pricing.service';
import { TraiteurPricingService } from './traiteur-pricing.service';
import { GateauMariagePricingService } from '../gateau-mariage-pricing/gateau-mariage-pricing.service';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { newLieuCriteres } from '../../company-details/lieu/lieu.interface';
import { newGateauMariageCriteres } from '../../company-details/gateau-mariage/gateau-mariage.interface';
import { AuthService } from '../../../../../../core/auth.service';
import { DialogService } from '../../../../services/dialog.service';
@Component({
  selector: 'app-traiteur-pricing',
  templateUrl: './traiteur-pricing.component.html',
  styleUrls: ['./traiteur-pricing.component.scss']
})
export class TraiteurPricingComponent implements OnInit, AfterViewInit {
  @Input() criteres: any;
  @Input() primaryComponent = true;
  @Input() categories: string[] = [];
  @ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
  @ViewChild('lieuComponent') lieuComponent: any;
  @ViewChild('gateauMariageComponent') gateauMariageComponent: any;
  showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
	showLieuComponent = false;
  showGateauMariageComponent = false;
  lieuInitCriteres: any = newLieuCriteres;
  gateauMariageInitCriteres: any = newGateauMariageCriteres;
  public form: FormGroup;
	public isLieu: boolean;
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
              private readonly router: Router,
              private readonly dialogService: DialogService,
              private readonly authService: AuthService,
              private readonly route: ActivatedRoute,
              private readonly companyService: CompanyService) {
}

ngOnInit() {
  // afficher les input par type
  this.currentEmail = this.route.snapshot.paramMap.get('email');
  this.isLieu = this.categories.includes(CategoryLabelEnum.LIEU);
  this.initLieuCriteres(this.isLieu);
  this.isGateauMariage = this.categories.includes(CategoryLabelEnum.GATEAU_MARIAGE);
  this.initGateauMariageCriteres(this.isGateauMariage);
  this.criteres = this.traiteurService.selectCriteres(this.criteres, CategoryLabelEnum.TRAITEUR);
  // console.log('selected criteres', this.criteres);
  this.criteres = this.traiteurService.removePrefix(this.criteres, CategoryLabelEnum.TRAITEUR);
  this.parsedCriteres = this.traiteurService.initFormValuesWithTraiteurCriteria(this.criteres);
  this.buildForm();
}
initLieuCriteres(isLieu: boolean) {
  if (isLieu) {
    this.lieuInitCriteres = this.criteres;
    this.showLieuComponent = true;
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
async onAddOption(field: any) {
  console.log('onAddOption', field);
  if (field.hasOwnProperty('productName')) {
    this.parsedCriteres = await this.traiteurService.addOption(this.parsedCriteres, field.field, field.productName);
  } else {
    this.parsedCriteres = await this.traiteurService.addOption(this.parsedCriteres, field);
  }
  this.buildForm();
  this.formBuilder.ngOnInit();
  this.formBuilder.appFieldBuilderComponent.checkBoxChanged(field);
}
getTraiteurValid() {
  if (this.formBuilder.form.value.vinHonneurCocktailBuffet.value || this.formBuilder.form.value.Dinner.value) {
    let vinHonneurCocktailBuffetIsValid = true;
    let dinnerIsValid = true;
    // vinHonneurCocktailBuffet
    if (this.formBuilder.form.value.vinHonneurCocktailBuffet.value) {
      Object.keys(this.formBuilder.form.value.vinHonneurCocktailBuffet.products).forEach(productName => {
        const productOptKeys = Object.keys(this.formBuilder.form.value.vinHonneurCocktailBuffet.products[productName]);
        let productIsValid = false;
        productOptKeys.forEach(optKey => {
          productIsValid =
          // tslint:disable-next-line:max-line-length
          productIsValid || this.formBuilder.form.value.vinHonneurCocktailBuffet.products[productName][optKey].value;
        });
        vinHonneurCocktailBuffetIsValid = vinHonneurCocktailBuffetIsValid && productIsValid;
      });
    }

    // Dinner
    if (this.formBuilder.form.value.Dinner.value) {
      Object.keys(this.formBuilder.form.value.Dinner.products).forEach(productName => {
        const productOptKeys = Object.keys(this.formBuilder.form.value.Dinner.products[productName]);
        let productIsValid = false;
        productOptKeys.forEach(optKey => {
          productIsValid = productIsValid
                          || this.formBuilder.form.value.Dinner.products[productName][optKey].value;
        });
        dinnerIsValid = dinnerIsValid && productIsValid;
      });
    }
    if (!vinHonneurCocktailBuffetIsValid) {
      this.toastrService.error(this.translateService
                        .instant(`Vous devez renseigner les info nécessaires dans vin d'honneur / cocktail / buffet`));
    }
    if (!dinnerIsValid) {
      this.toastrService.error(this.translateService
                        .instant(`Vous devez renseigner les info nécessaires dans dinner`));
    }
    return vinHonneurCocktailBuffetIsValid && dinnerIsValid;
  } else {
    return true;
  }
}
setFormIsValid(): boolean {
  let formIsValid: boolean = this.formBuilder.form.valid;
  if (this.isLieu && this.showLieuComponent) { formIsValid = formIsValid && this.lieuComponent.formBuilder.form.valid; }
  // tslint:disable-next-line:max-line-length
  if (this.isGateauMariage && this.showGateauMariageComponent) { formIsValid = formIsValid && this.gateauMariageComponent.formBuilder.form.valid; }
  return formIsValid;
}
getLimitHoraireValid() {
  if (this.showLieuComponent) {
    console.log('lieu value', this.lieuComponent?.formBuilder.form.value);
    return this.lieuComponent?.formBuilder.form.value.limiteHoraire.value ?
    // tslint:disable-next-line:max-line-length
    !!this.lieuComponent?.formBuilder.form.value.limiteHoraire.hourValue || !!this.lieuComponent?.formBuilder.form.value.limiteHoraire.minValue : true;
  } else {
    return true;
  }
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
    if (this.getTraiteurValid()) {
      if (this.getGateauxValid()) {
        this.formWasSubmitted = true;
        this.patchService();
        this.updateCurrentStep();
      }
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
  const traiteurFormValue = this.formBuilder.form.value;
  const dataObject = this.traiteurService.mapFormValueToTraiteurCriteria(traiteurFormValue, this.criteres);
  console.log('traiteur data object', dataObject);
  this.companyService.putServiceByEmailAndService(CategoryLabelEnum.TRAITEUR,
      this.currentEmail,
      dataObject).subscribe(
        (data) => {
          if (!this.showLieuComponent && !this.showGateauMariageComponent) {
            // tslint:disable-next-line:max-line-length
            console.log('no lieu no gateau');
            if (this.authStore.getUser().role === 'provider') {
              this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
            }
            if (this.authStore.getUser().role === 'admin') {
              this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
            }
          }
          if (this.showLieuComponent && this.showGateauMariageComponent) {
            console.log('lieu gateau');
            const lieuFormValue = this.lieuComponent.formBuilder.form.value;
            // tslint:disable-next-line:max-line-length
            const lieuDataObject = this.lieuService.mapFormValueToLieuCriteria(lieuFormValue, this.lieuComponent.criteres);
            console.log('lieu data object', lieuDataObject);
            this.companyService.putServiceByEmailAndService(CategoryLabelEnum.LIEU,
              this.currentEmail,
              lieuDataObject).subscribe(
                (lieuData) => {
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
          } else if (this.showLieuComponent) {
            console.log('just lieu');
            const lieuFormValue = this.lieuComponent.formBuilder.form.value;
            // tslint:disable-next-line:max-line-length
            const lieuDataObject = this.lieuService.mapFormValueToLieuCriteria(lieuFormValue, this.lieuComponent.criteres);
            console.log('lieu data object', lieuDataObject);
            this.companyService.putServiceByEmailAndService(CategoryLabelEnum.LIEU,
              this.currentEmail,
              lieuDataObject).subscribe(
                (lieuData) => {
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
            console.log('just gateau');
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
