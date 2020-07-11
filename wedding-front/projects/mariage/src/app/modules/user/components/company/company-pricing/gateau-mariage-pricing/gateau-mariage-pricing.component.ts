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
import { TraiteurPricingService } from '../traiteur-pricing/traiteur-pricing.service';
import { GateauMariagePricingService } from './gateau-mariage-pricing.service';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { newTraiteurCriteres } from '../../company-details/traiteur/traiteur.interface';
import { newLieuCriteres } from '../../company-details/lieu/lieu.interface';
import { AuthService } from '../../../../../../core/auth.service';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-gateau-mariage-pricing',
  templateUrl: './gateau-mariage-pricing.component.html',
  styleUrls: ['./gateau-mariage-pricing.component.scss']
})
export class GateauMariagePricingComponent implements OnInit, AfterViewInit {
  @Input() criteres: any;
  @Input() primaryComponent = true;
  @Input() categories: string[] = [];
  @ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
  @ViewChild('traiteurComponent') traiteurComponent: any;
  @ViewChild('lieuComponent') lieuComponent: any;
  showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
	showTraiteurComponent = false;
  showLieuComponent = false;
  traiteurInitCriteres: any = newTraiteurCriteres;
  lieuInitCriteres: any = newLieuCriteres;
  public form: FormGroup;
	public isLieu: boolean;
	public isTraiteur: boolean;
  public parsedCriteres: DynamicFormFieldInterface[];
  currentEmail = '';
  constructor(private readonly lieuService: LieuPricingService,
              private readonly traiteurService: TraiteurPricingService,
              private readonly gateauMariageService: GateauMariagePricingService,
              private readonly authStore: AuthStore,
              private readonly dialogService: DialogService,
              @Inject(PLATFORM_ID) private readonly platformId: object,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService,
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
  this.isLieu = this.categories.includes(CategoryLabelEnum.LIEU);
  this.initLieuCriteres(this.isLieu);
  this.criteres = this.gateauMariageService.selectCriteres(this.criteres, CategoryLabelEnum.GATEAU_MARIAGE);
  // console.log('selected criteres', this.criteres);
  this.criteres = this.gateauMariageService.removePrefix(this.criteres, CategoryLabelEnum.GATEAU_MARIAGE);
  this.parsedCriteres = this.gateauMariageService.initFormValuesWithGateauMariageCriteria(this.criteres);
  this.buildForm();
}
initTraiteurCriteres(isTraiteur: boolean) {
  if (isTraiteur) {
    this.traiteurInitCriteres = this.criteres;
    this.showTraiteurComponent = true;
  }
}
initLieuCriteres(isLieu: boolean) {
  if (isLieu) {
    this.lieuInitCriteres = this.criteres;
    this.showLieuComponent = true;
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
  this.parsedCriteres = await this.gateauMariageService.addOption(this.parsedCriteres, field);
  this.buildForm();
  this.formBuilder.ngOnInit();
}
setFormIsValid(): boolean {
  let formIsValid: boolean = this.formBuilder.form.valid;
  if (this.isTraiteur && this.showTraiteurComponent) { formIsValid = formIsValid && this.traiteurComponent.formBuilder.form.valid; }
  if (this.isLieu && this.showLieuComponent) { formIsValid = formIsValid && this.lieuComponent.formBuilder.form.valid; }
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
  if (this.formBuilder.form.value.gateaux.value) {
    console.log('gateaux', this.formBuilder.form.value.gateaux);
    let hasGateau = false;
    Object.keys(this.formBuilder.form.value.gateaux).forEach(gateauName => {
      if (this.formBuilder.form.value.gateaux[gateauName].hasOwnProperty('name')) {
        const gateauValue = this.formBuilder.form.value.gateaux[gateauName].value;
        hasGateau = hasGateau || gateauValue;
      }

    });
    if (!hasGateau) {
      this.toastrService.error(this.translateService
        .instant(`Vous devez renseigner au minium un gâteau pour continuer`));
    }
    return hasGateau;
  } else {
    return true;
  }
}
formSubmitted() {
  if (this.setFormIsValid()) {
    if (this.getGateauxValid()) {
      if (this.getTraiteurValid()) {
        if (this.getLimitHoraireValid()) {
          this.formWasSubmitted = true;
          this.patchService();
          this.updateCurrentStep();
        } else {
          this.toastrService.error(this.translateService.instant('limite horaire est obligatoire'));
        }
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
  const gateauFormValue = this.formBuilder.form.value;
  const dataObject = this.gateauMariageService.mapFormValueToGateauMariageCriteria(gateauFormValue, this.criteres);
  console.log('gateau data object', dataObject);
  this.companyService.putServiceByEmailAndService(CategoryLabelEnum.GATEAU_MARIAGE,
      this.currentEmail,
      dataObject).subscribe(
        (data) => {
          if (!this.showTraiteurComponent && !this.showLieuComponent) {
            // tslint:disable-next-line:max-line-length
            if (this.authStore.getUser().role === 'provider') {
              this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
            }
            if (this.authStore.getUser().role === 'admin') {
              this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
            }
          }
          if (this.showTraiteurComponent && this.showLieuComponent) {
            const traiteurFormValue = this.traiteurComponent.formBuilder.form.value;
            // tslint:disable-next-line:max-line-length
            const traiteurDataObject = this.traiteurService.mapFormValueToTraiteurCriteria(traiteurFormValue, this.traiteurComponent.criteres);
            console.log('traiteur data object', traiteurDataObject);
            this.companyService.putServiceByEmailAndService(CategoryLabelEnum.TRAITEUR,
              this.currentEmail,
              traiteurDataObject).subscribe(
                (traiteurData) => {
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

          } else if (this.showLieuComponent) {
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
