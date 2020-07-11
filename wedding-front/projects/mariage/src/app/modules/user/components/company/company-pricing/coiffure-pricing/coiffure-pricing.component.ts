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
import { CoiffurePricingService } from './coiffure-pricing.service';
import { MaquillagePricingService } from '../maquillage-pricing/maquillage-pricing.service';
import { EsthetiquePricingService } from '../esthetique-pricing/esthetique-pricing.service';
import { SoinPricingService } from '../soin-pricing/soin-pricing.service';
import { newMaquillageCriteres } from '../../company-details/maquillage/maquillage.interface';
import { newEsthetiqueCriteres } from '../../company-details/esthetique/esthetique.interface';
import { newSoinCriteres } from '../../company-details/soin/soin.interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { AuthService } from '../../../../../../core/auth.service';
import { DialogService } from '../../../../services/dialog.service';
@Component({
  selector: 'app-coiffure-pricing',
  templateUrl: './coiffure-pricing.component.html',
  styleUrls: ['./coiffure-pricing.component.scss']
})
export class CoiffurePricingComponent implements OnInit, AfterViewInit {
  @Input() criteres: any;
  @Input() primaryComponent = true;
  @Input() categories: string[] = [];
  @ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
  @ViewChild('maquillageComponent') maquillageComponent: any;
  @ViewChild('esthetiqueComponent') esthetiqueComponent: any;
  @ViewChild('soinComponent') soinComponent: any;
  showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
	showMaquillageComponent = false;
  showEsthetiqueComponent = false;
  showSoinComponent = false;
  maquillageInitCriteres: any = newMaquillageCriteres;
  esthetiqueInitCriteres: any = newEsthetiqueCriteres;
  soinInitCriteres: any = newSoinCriteres;
  public form: FormGroup;
	public isMaquillage: boolean;
	public isEsthetique: boolean;
	public isSoin: boolean;
  public parsedCriteres: DynamicFormFieldInterface[];
  currentEmail = '';
  constructor(private readonly coiffureService: CoiffurePricingService,
              private readonly maquillageService: MaquillagePricingService,
              private readonly esthetiqueService: EsthetiquePricingService,
              private readonly soinService: SoinPricingService,
              private readonly authStore: AuthStore,
              private readonly dialogService: DialogService,
              @Inject(PLATFORM_ID) private readonly platformId: object,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService,
              private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly authService: AuthService,
              private readonly companyService: CompanyService) {
}
  ngOnInit() {
  // afficher les input par type
  this.currentEmail = this.route.snapshot.paramMap.get('email');
  this.isMaquillage = this.categories.includes(CategoryLabelEnum.MAQUILLAGE);
  this.initMaquillageCriteres(this.isMaquillage);
  this.isEsthetique = this.categories.includes(CategoryLabelEnum.ESTHETIQUE);
  this.initEsthetiqueCriteres(this.isEsthetique);
  this.isSoin = this.categories.includes(CategoryLabelEnum.SOIN);
  this.initSoinCriteres(this.isSoin);
  this.criteres = this.coiffureService.selectCriteres(this.criteres, CategoryLabelEnum.COIFFURE);
  console.log('selected criteres', this.criteres);
  this.criteres = this.coiffureService.removePrefix(this.criteres, CategoryLabelEnum.COIFFURE);
  this.parsedCriteres = this.coiffureService.initFormValuesWithCriteria(this.criteres);
  this.buildForm();
  }
  initMaquillageCriteres(flag: boolean) {
    if (flag) {
      this.maquillageInitCriteres = this.criteres;
      this.showMaquillageComponent = true;
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
    if (this.isMaquillage && this.showMaquillageComponent) { formIsValid = formIsValid && this.maquillageComponent.formBuilder.form.valid; }
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
  getCoiffureValid() {
      if (this.formBuilder.form.value.produitsEtAccessoires.value) {
        let valid = false;
        const produitsKeys = Object.keys(this.formBuilder.form.value.produitsEtAccessoires.options);
        produitsKeys.forEach(produit => {
          valid = valid || this.formBuilder.form.value.produitsEtAccessoires.options[produit].checked;
        });
        return valid;
      }
      return true;
  }
  getMaquillageValid() {
      if (this.isMaquillage) {
        if (this.maquillageComponent.formBuilder.form.value.produits.value) {
          let valid = false;
          const produitsKeys = Object.keys(this.maquillageComponent.formBuilder.form.value.produits.options);
          produitsKeys.forEach(produit => {
            valid = valid || this.maquillageComponent.formBuilder.form.value.produits.options[produit].checked;
          });
          return valid;
        }
        return true;
      }
      return true;
  }
  getSoinValid() {
    if (this.isSoin) {
      return this.soinComponent.formBuilder.form.value.soins.soins;
    } else {
      return true;
    }
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
  const coiffureFormValue = this.formBuilder.form.value;
  const dataObject = this.coiffureService.mapFormValueToCriteria(coiffureFormValue, this.criteres);
  console.log('coiffure data object', dataObject);
  this.companyService.putServiceByEmailAndService(CategoryLabelEnum.COIFFURE,
    this.currentEmail,
    dataObject).subscribe(
      (data) => {
        if (!this.showMaquillageComponent && !this.showEsthetiqueComponent && !this.showSoinComponent) {
          // tslint:disable-next-line:max-line-length
          if (this.authStore.getUser().role === 'provider') {
            this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
          }
          if (this.authStore.getUser().role === 'admin') {
            this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
          }
        }
        if (this.showMaquillageComponent && this.showEsthetiqueComponent && this.showSoinComponent) {
          const maquillageFormValue = this.maquillageComponent.formBuilder.form.value;
          // tslint:disable-next-line:max-line-length
          const maquillageDataObject = this.maquillageService.mapFormValueToCriteria(maquillageFormValue, this.maquillageComponent.criteres);
          console.log('maquillage data object', maquillageDataObject);
          this.companyService.putServiceByEmailAndService(CategoryLabelEnum.MAQUILLAGE,
            this.currentEmail,
            maquillageDataObject).subscribe(
              (maquillageData) => {
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
        } else if (this.showMaquillageComponent) {
          const maquillageFormValue = this.maquillageComponent.formBuilder.form.value;
          // tslint:disable-next-line:max-line-length
          const maquillageDataObject = this.maquillageService.mapFormValueToCriteria(maquillageFormValue, this.maquillageComponent.criteres);
          console.log('maquillage data object', maquillageDataObject);
          this.companyService.putServiceByEmailAndService(CategoryLabelEnum.MAQUILLAGE,
            this.currentEmail,
            maquillageDataObject).subscribe(
              (maquillageData) => {
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
                if (!this.showMaquillageComponent && !this.showSoinComponent) {
                  // tslint:disable-next-line:max-line-length
                  if (this.authStore.getUser().role === 'provider') {
                    this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
                  }
                  if (this.authStore.getUser().role === 'admin') {
                    this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
                  }
                }
                if (this.showMaquillageComponent && this.showSoinComponent) {
                        const maquillageFormValue = this.maquillageComponent.formBuilder.form.value;
                        // tslint:disable-next-line:max-line-length
                        const maquillageDataObject = this.maquillageService.mapFormValueToCriteria(maquillageFormValue, this.maquillageComponent.criteres);
                        console.log('maquillage data object', maquillageDataObject);
                        this.companyService.putServiceByEmailAndService(CategoryLabelEnum.MAQUILLAGE,
                          this.currentEmail,
                          maquillageDataObject).subscribe(
                            (maquillageData) => {
                              this.submitSecondaryComp(this.soinComponent, CategoryLabelEnum.SOIN, this.soinService);
                            });
                } else if (this.showMaquillageComponent) {
                  this.submitSecondaryComp(this.maquillageComponent, CategoryLabelEnum.MAQUILLAGE, this.maquillageService);
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
                        if (!this.showEsthetiqueComponent && !this.showMaquillageComponent) {
                          // tslint:disable-next-line:max-line-length
                          if (this.authStore.getUser().role === 'provider') {
                            this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
                          }
                          if (this.authStore.getUser().role === 'admin') {
                            this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
                          }
                        }
                        if (this.showEsthetiqueComponent && this.showMaquillageComponent) {
                                const esthetiqueFormValue = this.esthetiqueComponent.formBuilder.form.value;
                                // tslint:disable-next-line:max-line-length
                                const esthetiqueDataObject = this.esthetiqueService.mapFormValueToCriteria(esthetiqueFormValue, this.esthetiqueComponent.criteres);
                                console.log('esthetique data object', esthetiqueDataObject);
                                this.companyService.putServiceByEmailAndService(CategoryLabelEnum.ESTHETIQUE,
                                  this.currentEmail,
                                  esthetiqueDataObject).subscribe(
                                    (esthetiqueData) => {
                                      // tslint:disable-next-line:max-line-length
                                      this.submitSecondaryComp(this.maquillageComponent, CategoryLabelEnum.MAQUILLAGE, this.maquillageService);
                                    });
                        } else if (this.showEsthetiqueComponent) {
                          this.submitSecondaryComp(this.esthetiqueComponent, CategoryLabelEnum.ESTHETIQUE, this.esthetiqueService);
                        } else if (this.showMaquillageComponent) {
                          this.submitSecondaryComp(this.maquillageComponent, CategoryLabelEnum.MAQUILLAGE, this.maquillageService);
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
  maquillageIsChecked(checked: boolean) {
    if (checked) {
      this.maquillageInitCriteres = this.coiffureService.addPrefix(this.maquillageInitCriteres, CategoryLabelEnum.MAQUILLAGE);
    } else {
      this.maquillageInitCriteres = this.coiffureService.removePrefix(this.maquillageInitCriteres, CategoryLabelEnum.MAQUILLAGE);
    }
    this.showMaquillageComponent = checked;
  }
  esthetiqueIsChecked(checked: boolean) {
    if (checked) {
      this.esthetiqueInitCriteres = this.coiffureService.addPrefix(this.esthetiqueInitCriteres, CategoryLabelEnum.ESTHETIQUE);
    } else {
      this.esthetiqueInitCriteres = this.coiffureService.removePrefix(this.esthetiqueInitCriteres, CategoryLabelEnum.ESTHETIQUE);
    }
    this.showEsthetiqueComponent = checked;
  }
  soinIsChecked(checked: boolean) {
    if (checked) {
      this.soinInitCriteres = this.coiffureService.addPrefix(this.soinInitCriteres, CategoryLabelEnum.SOIN);
    } else {
      this.soinInitCriteres = this.coiffureService.removePrefix(this.soinInitCriteres, CategoryLabelEnum.SOIN);
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
