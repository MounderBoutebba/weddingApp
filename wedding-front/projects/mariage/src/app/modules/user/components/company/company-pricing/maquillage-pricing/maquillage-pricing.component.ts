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
import { CoiffurePricingService } from '../coiffure-pricing/coiffure-pricing.service';
import { MaquillagePricingService } from './maquillage-pricing.service';
import { EsthetiquePricingService } from '../esthetique-pricing/esthetique-pricing.service';
import { SoinPricingService } from '../soin-pricing/soin-pricing.service';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { newSoinCriteres } from '../../company-details/soin/soin.interface';
import { newEsthetiqueCriteres } from '../../company-details/esthetique/esthetique.interface';
import { newCoiffureCriteres } from '../../company-details/coiffure/coiffure.interface';
import { AuthService } from '../../../../../../core/auth.service';
import { DialogService } from '../../../../services/dialog.service';
@Component({
  selector: 'app-maquillage-pricing',
  templateUrl: './maquillage-pricing.component.html',
  styleUrls: ['./maquillage-pricing.component.scss']
})
export class MaquillagePricingComponent implements OnInit, AfterViewInit {
  @Input() criteres: any;
  @Input() primaryComponent = true;
  @Input() categories: string[] = [];
  @ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
  @ViewChild('coiffureComponent') coiffureComponent: any;
  @ViewChild('esthetiqueComponent') esthetiqueComponent: any;
  @ViewChild('soinComponent') soinComponent: any;
  showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
	showCoiffureComponent = false;
  showEsthetiqueComponent = false;
  showSoinComponent = false;
  coiffureInitCriteres: any = newCoiffureCriteres;
  esthetiqueInitCriteres: any = newEsthetiqueCriteres;
  soinInitCriteres: any = newSoinCriteres;
  currentEmail = '';
  public form: FormGroup;
	public isCoiffure: boolean;
	public isEsthetique: boolean;
	public isSoin: boolean;
	public parsedCriteres: DynamicFormFieldInterface[];
  constructor(private readonly coiffureService: CoiffurePricingService,
              private readonly maquillageService: MaquillagePricingService,
              private readonly esthetiqueService: EsthetiquePricingService,
              private readonly soinService: SoinPricingService,
              private readonly authStore: AuthStore,
              @Inject(PLATFORM_ID) private readonly platformId: object,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService,
              private readonly router: Router,
              private readonly authService: AuthService,
              private readonly dialogService: DialogService,
              private readonly route: ActivatedRoute,
              private readonly companyService: CompanyService) {
}
  ngOnInit() {
  // afficher les input par type
  this.currentEmail = this.route.snapshot.paramMap.get('email');
  this.isCoiffure = this.categories.includes(CategoryLabelEnum.COIFFURE);
  this.initCoiffureCriteres(this.isCoiffure);
  this.isEsthetique = this.categories.includes(CategoryLabelEnum.ESTHETIQUE);
  this.initEsthetiqueCriteres(this.isEsthetique);
  this.isSoin = this.categories.includes(CategoryLabelEnum.SOIN);
  this.initSoinCriteres(this.isSoin);
  this.criteres = this.maquillageService.selectCriteres(this.criteres, CategoryLabelEnum.MAQUILLAGE);
  console.log('selected criteres', this.criteres);
  this.criteres = this.maquillageService.removePrefix(this.criteres, CategoryLabelEnum.MAQUILLAGE);
  this.parsedCriteres = this.maquillageService.initFormValuesWithCriteria(this.criteres);
  this.buildForm();
  }
  initCoiffureCriteres(flag: boolean) {
    if (flag) {
      this.coiffureInitCriteres = this.criteres;
      this.showCoiffureComponent = true;
    }
  }
  initEsthetiqueCriteres(flag: boolean) {
    if (flag) {
      this.esthetiqueInitCriteres = this.criteres;
      this.showEsthetiqueComponent = true;
    }
  }
  initSoinCriteres(flag: boolean) {
    if (flag) {
      this.soinInitCriteres = this.criteres;
      this.showSoinComponent = true;
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
  async onAddOption(data: any) {
    if (data.hasOwnProperty('prestationName')) {
      this.parsedCriteres = await this.coiffureService.addOption(this.parsedCriteres, data.field, data.prestationName);
      this.formBuilder.fields = this.parsedCriteres;
      this.formBuilder.ngOnInit();
    } else {
      this.parsedCriteres = await this.coiffureService.addOption(this.parsedCriteres, data);
      this.buildForm();
      this.formBuilder.ngOnInit();
    }
    console.log('form value',  this.formBuilder.form.value);
  }
  setFormIsValid(): boolean {
    let formIsValid: boolean = this.formBuilder.form.valid;
    // tslint:disable-next-line:max-line-length
    if (this.isCoiffure && this.showCoiffureComponent) { formIsValid = formIsValid && this.coiffureComponent.formBuilder.form.valid; }
    // tslint:disable-next-line:max-line-length
    if (this.isEsthetique && this.showEsthetiqueComponent) { formIsValid = formIsValid && this.esthetiqueComponent.formBuilder.form.valid; }
    // tslint:disable-next-line:max-line-length
    if (this.isSoin && this.showSoinComponent) { formIsValid = formIsValid && this.soinComponent.formBuilder.form.valid; }
    return formIsValid;
  }
  getEsthetiqueValid() {
    if (this.isEsthetique) {
      const thereIsManucure = this.esthetiqueComponent.formBuilder.form.value.manucurePedicure.manucurePedicure;
      const thereIsEpilation = this.esthetiqueComponent.formBuilder.form.value.epilation.epilation;
      return  thereIsManucure && thereIsEpilation;
    } else {
      return true;
    }
  }
  getSoinValid() {
    if (this.isSoin) {
      return this.soinComponent.formBuilder.form.value.soins.soins;
    } else {
      return true;
    }
  }
  getCoiffureValid() {
    if (this.isCoiffure) {
      if (this.coiffureComponent.formBuilder.form.value.produitsEtAccessoires.value) {
        let valid = false;
        const produitsKeys = Object.keys(this.coiffureComponent.form.value.produitsEtAccessoires.options);
        produitsKeys.forEach(produit => {
          valid = valid || this.coiffureComponent.form.value.produitsEtAccessoires.options[produit].checked;
        });
        return valid;
      }
      return true;
    }
    return true;
  }
  getMaquillageValid() {
      if (this.formBuilder.form.value.produits.value) {
        let valid = false;
        const produitsKeys = Object.keys(this.formBuilder.form.value.produits.options);
        produitsKeys.forEach(produit => {
          valid = valid || this.formBuilder.form.value.produits.options[produit].checked;
        });
        return valid;
      }
      return true;
  }
  formSubmitted() {
    if (this.setFormIsValid()) {
      if (this.getCoiffureValid()) {
        if (this.getMaquillageValid()) {
          this.formWasSubmitted = true;
          this.patchService();
          this.updateCurrentStep();
        } else {
          this.toastrService
          .error(this.translateService.instant('Vous devez entrer les info concernant les produits et accéssoires pour maquillage'));
        }
      } else {
        this.toastrService
        .error(this.translateService.instant('Vous devez entrer les info concernant les produits et accéssoires pour coiffure'));
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
  const maquillageFormValue = this.formBuilder.form.value;
  const dataObject = this.maquillageService.mapFormValueToCriteria(maquillageFormValue, this.criteres);
  console.log('maquillage data object', dataObject);
  this.companyService.putServiceByEmailAndService(CategoryLabelEnum.MAQUILLAGE,
    this.currentEmail,
    dataObject).subscribe(
      (data) => {
        if (!this.showCoiffureComponent && !this.showEsthetiqueComponent && !this.showSoinComponent) {
          // tslint:disable-next-line:max-line-length
          if (this.authStore.getUser().role === 'provider') {
            this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
          }
          if (this.authStore.getUser().role === 'admin') {
            this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
          }
        }
        if (this.showCoiffureComponent && this.showEsthetiqueComponent && this.showSoinComponent) {
          const coiffureFormValue = this.coiffureComponent.formBuilder.form.value;
          // tslint:disable-next-line:max-line-length
          const coiffureDataObject = this.coiffureService.mapFormValueToCriteria(coiffureFormValue, this.coiffureComponent.criteres);
          console.log('coiffure data object', coiffureDataObject);
          this.companyService.putServiceByEmailAndService(CategoryLabelEnum.COIFFURE,
            this.currentEmail,
            coiffureDataObject).subscribe(
              (coiffureData) => {
                const esthetiqueFormValue = this.esthetiqueComponent.formBuilder.form.value;
                // tslint:disable-next-line:max-line-length
                const esthetiqueDataObject = this.esthetiqueService.mapFormValueToCriteria(esthetiqueFormValue, this.esthetiqueComponent.criteres);
                console.log('esthetique data object', esthetiqueDataObject);
                this.companyService.putServiceByEmailAndService(CategoryLabelEnum.ESTHETIQUE,
                  this.currentEmail,
                  esthetiqueDataObject).subscribe(
                    (esthetiqueData) => {
                      this.submitSecondaryComp(this.soinComponent, CategoryLabelEnum.SOIN, this.soinService);
                    });
              });
        } else if (this.showCoiffureComponent) {
          const coiffureFormValue = this.coiffureComponent.formBuilder.form.value;
          // tslint:disable-next-line:max-line-length
          const coiffureDataObject = this.coiffureService.mapFormValueToCriteria(coiffureFormValue, this.coiffureComponent.criteres);
          console.log('coiffure data object', coiffureDataObject);
          this.companyService.putServiceByEmailAndService(CategoryLabelEnum.COIFFURE,
            this.currentEmail,
            coiffureDataObject).subscribe(
              (coiffureData) => {
                // tslint:disable-next-line:max-line-length
                if (!this.showEsthetiqueComponent && !this.showSoinComponent) {
                  // tslint:disable-next-line:max-line-length
                  if (this.authStore.getUser().role === 'provider') {
                    this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
                  }
                  if (this.authStore.getUser().role === 'admin') {
                    this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
                  }
                }
                if (this.showEsthetiqueComponent && this.showSoinComponent) {
                        const esthetiqueFormValue = this.esthetiqueComponent.formBuilder.form.value;
                        // tslint:disable-next-line:max-line-length
                        const esthetiqueDataObject = this.esthetiqueService.mapFormValueToCriteria(esthetiqueFormValue, this.esthetiqueComponent.criteres);
                        console.log('esthetique data object', esthetiqueDataObject);
                        this.companyService.putServiceByEmailAndService(CategoryLabelEnum.ESTHETIQUE,
                          this.currentEmail,
                          esthetiqueDataObject).subscribe(
                            (esthetiqueData) => {
                              this.submitSecondaryComp(this.soinComponent, CategoryLabelEnum.SOIN, this.soinService);
                            });
                } else if (this.showEsthetiqueComponent) {
                  this.submitSecondaryComp(this.esthetiqueComponent, CategoryLabelEnum.ESTHETIQUE, this.esthetiqueService);
                } else if (this.showSoinComponent) {
                  this.submitSecondaryComp(this.soinComponent, CategoryLabelEnum.SOIN, this.soinService);
                }
              });

        } else if (this.showEsthetiqueComponent) {
          const esthetiqueFormValue = this.esthetiqueComponent.formBuilder.form.value;
          // tslint:disable-next-line:max-line-length
          const esthetiqueDataObject = this.esthetiqueService.mapFormValueToCriteria(esthetiqueFormValue, this.esthetiqueComponent.criteres);
          console.log('esthetique data object', esthetiqueDataObject);
          this.companyService.putServiceByEmailAndService(CategoryLabelEnum.ESTHETIQUE,
            this.currentEmail,
            esthetiqueDataObject).subscribe(
              (esthetiqueData) => {
                // tslint:disable-next-line:max-line-length
                if (!this.showCoiffureComponent && !this.showSoinComponent) {
                  // tslint:disable-next-line:max-line-length
                  if (this.authStore.getUser().role === 'provider') {
                    this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
                  }
                  if (this.authStore.getUser().role === 'admin') {
                    this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
                  }
                }
                if (this.showCoiffureComponent && this.showSoinComponent) {
                        const coiffureFormValue = this.coiffureComponent.formBuilder.form.value;
                        // tslint:disable-next-line:max-line-length
                        const coiffureDataObject = this.coiffureService.mapFormValueToCriteria(coiffureFormValue, this.coiffureComponent.criteres);
                        console.log('coiffure data object', coiffureDataObject);
                        this.companyService.putServiceByEmailAndService(CategoryLabelEnum.COIFFURE,
                          this.currentEmail,
                          coiffureDataObject).subscribe(
                            (coiffureData) => {
                              this.submitSecondaryComp(this.soinComponent, CategoryLabelEnum.SOIN, this.soinService);
                            });
                } else if (this.showCoiffureComponent) {
                  this.submitSecondaryComp(this.coiffureComponent, CategoryLabelEnum.COIFFURE, this.coiffureService);
                } else if (this.showSoinComponent) {
                  this.submitSecondaryComp(this.soinComponent, CategoryLabelEnum.SOIN, this.soinService);
                }
              });
        } else if (this.showSoinComponent) {
            // tslint:disable-next-line:max-line-length
            const soinFormValue = this.soinComponent.formBuilder.form.value;
            // tslint:disable-next-line:max-line-length
            const soinDataObject = this.soinService.mapFormValueToCriteria(soinFormValue, this.soinComponent.criteres);
            console.log('soin data object', soinDataObject);
            this.companyService.putServiceByEmailAndService(CategoryLabelEnum.SOIN,
                this.currentEmail,
                soinDataObject).subscribe(
                    (soinData) => {
                        // tslint:disable-next-line:max-line-length
                        if (!this.showEsthetiqueComponent && !this.showCoiffureComponent) {
                          // tslint:disable-next-line:max-line-length
                          if (this.authStore.getUser().role === 'provider') {
                            this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
                          }
                          if (this.authStore.getUser().role === 'admin') {
                            this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
                          }
                        }
                        if (this.showEsthetiqueComponent && this.showCoiffureComponent) {
                                const esthetiqueFormValue = this.esthetiqueComponent.formBuilder.form.value;
                                // tslint:disable-next-line:max-line-length
                                const esthetiqueDataObject = this.esthetiqueService.mapFormValueToCriteria(esthetiqueFormValue, this.esthetiqueComponent.criteres);
                                console.log('esthetique data object', esthetiqueDataObject);
                                this.companyService.putServiceByEmailAndService(CategoryLabelEnum.ESTHETIQUE,
                                  this.currentEmail,
                                  esthetiqueDataObject).subscribe(
                                    (esthetiqueData) => {
                                      this.submitSecondaryComp(this.coiffureComponent, CategoryLabelEnum.COIFFURE, this.coiffureService);
                                    });
                        } else if (this.showEsthetiqueComponent) {
                          this.submitSecondaryComp(this.esthetiqueComponent, CategoryLabelEnum.ESTHETIQUE, this.esthetiqueService);
                        } else if (this.showCoiffureComponent) {
                          this.submitSecondaryComp(this.coiffureComponent, CategoryLabelEnum.COIFFURE, this.coiffureService);
                        }
                });
        }
      });
  }
  submitSecondaryComp(comp: any, categoryLabel: string, service: any) {
    const formValue = comp.formBuilder.form.value;
    // tslint:disable-next-line:max-line-length
    const dataObject = service.mapFormValueToCriteria(formValue, comp.criteres);
    console.log(`${categoryLabel} data object`, dataObject);
    this.companyService.putServiceByEmailAndService(categoryLabel,
      this.currentEmail,
      dataObject).subscribe(
        (data) => {
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
coiffureIsChecked(checked: boolean) {
  if (checked) {
    this.coiffureInitCriteres = this.maquillageService.addPrefix(this.coiffureInitCriteres, CategoryLabelEnum.COIFFURE);
  } else {
    this.coiffureInitCriteres = this.maquillageService.removePrefix(this.coiffureInitCriteres, CategoryLabelEnum.COIFFURE);
  }
  this.showCoiffureComponent = checked;
}
esthetiqueIsChecked(checked: boolean) {
  if (checked) {
    this.esthetiqueInitCriteres = this.maquillageService.addPrefix(this.esthetiqueInitCriteres, CategoryLabelEnum.ESTHETIQUE);
  } else {
    this.esthetiqueInitCriteres = this.maquillageService.removePrefix(this.esthetiqueInitCriteres, CategoryLabelEnum.ESTHETIQUE);
  }
  this.showEsthetiqueComponent = checked;
}
soinIsChecked(checked: boolean) {
  if (checked) {
    this.soinInitCriteres = this.maquillageService.addPrefix(this.soinInitCriteres, CategoryLabelEnum.SOIN);
  } else {
    this.soinInitCriteres = this.maquillageService.removePrefix(this.soinInitCriteres, CategoryLabelEnum.SOIN);
  }
  this.showSoinComponent = checked;
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
