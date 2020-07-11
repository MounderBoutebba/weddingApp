import { Component, OnInit, Input, ViewChild, Inject, PLATFORM_ID, AfterViewInit, HostListener } from '@angular/core';
import { DynamicFormBuilderComponent } from '../../../../../shared/components/dynamic-form-builder';
import { FormGroup, FormControl } from '@angular/forms';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { AuthStore } from '../../../../../store/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../../services/company.service';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { VoiturePricingService } from './voiture-pricing.service';
import { newBusCriteres } from '../../company-details/bus/bus.interface';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-voiture-pricing',
  templateUrl: './voiture-pricing.component.html',
  styleUrls: ['./voiture-pricing.component.scss']
})
export class VoiturePricingComponent implements OnInit, AfterViewInit {
	@Input() criteres: any;
	@Input() primaryComponent = true;
	@Input() categories: string[] = [];
	@ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
	@ViewChild('busPricingComponent') busPricingComponent: any;
	showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
  showBusPricingComponent = false;
  busInitCriteres: any = newBusCriteres;
  currentEmail = '';
  public form: FormGroup;
	public isBusPricing: boolean;
	public parsedCriteres: DynamicFormFieldInterface[];
	constructor(private readonly voiturePricingService: VoiturePricingService,
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
    this.isBusPricing = this.categories.includes(CategoryLabelEnum.BUS);
    this.initBusCriteres(this.isBusPricing);
    this.criteres = this.voiturePricingService.selectCriteres(this.criteres, CategoryLabelEnum.VOITURE);
    console.log('selected criteres', this.criteres);
    this.criteres = this.voiturePricingService.removePrefix(this.criteres, CategoryLabelEnum.VOITURE);
    this.parsedCriteres = this.voiturePricingService.initFormValuesWithVoiturePricingCriteria(this.criteres);
    this.buildForm();
  }
  initBusCriteres(isBusPricing: boolean) {
    if (isBusPricing) {
      this.busInitCriteres = this.criteres;
      this.showBusPricingComponent = true;
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
    this.parsedCriteres = await this.voiturePricingService.addOption(this.parsedCriteres, field);
    this.buildForm();
    this.formBuilder.ngOnInit();
    this.formBuilder.appFieldBuilderComponent.checkBoxChanged(field);
  }
  checkBoxChangesAreChecked(): boolean {
    let checkBoxIsRequired = true;
    this.parsedCriteres.forEach( field => {
      if (field.type === FieldTypeEnum.CHECK_BOX || field.type === FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER) {
        checkBoxIsRequired = checkBoxIsRequired
                      && !!field.options.filter( opt => opt.value === true ).length;
      }
    });
    return checkBoxIsRequired;
  }
  getVoitureValid() {
    let thereIsVoiture = false;
    let thereIsService = false;
    console.log('value', this.formBuilder.form.value);
    Object.keys(this.formBuilder.form.value.voitures).forEach(voiture => {
        thereIsVoiture = thereIsVoiture || this.formBuilder.form.value.voitures[voiture].value;
    });
    Object.keys(this.formBuilder.form.value.services).forEach(service => {
      thereIsService = thereIsService || this.formBuilder.form.value.services[service].value;
    });
    return thereIsVoiture && thereIsService;
  }
  getBusValid() {
    let thereIsBus = false;
    let thereIsService = false;
    if (this.busPricingComponent) {
      console.log('value', this.busPricingComponent.formBuilder.form.value);
      Object.keys(this.busPricingComponent.formBuilder.form.value.bus).forEach(bus => {
        thereIsBus = thereIsBus || this.busPricingComponent.formBuilder.form.value.bus[bus].value;
      });
      Object.keys(this.busPricingComponent.formBuilder.form.value.services).forEach(service => {
        thereIsService = thereIsService || this.busPricingComponent.formBuilder.form.value.services[service].value;
      });
      return thereIsBus && thereIsService;
    } else {
      return true;
    }

  }
  formSubmitted() {
    const formIsValid: boolean = this.formBuilder.form.valid;
    if (this.checkBoxChangesAreChecked()) {
      if (this.getVoitureValid()) {
        if (formIsValid) {
          if (this.getBusValid()) {
            this.formWasSubmitted = true;
            this.updateCurrentStep();
            if (this.primaryComponent) {
              this.patchService('primary');
            } else {
              this.patchService('secondary');
            }
          } else {
            this.toastrService.error(this.translateService.instant('vous devez ajouter au moin un bus et un service'));
          }
        } else {
          this.dialogService.openErrorDialog('form is not valid');
        }
      } else {
        this.toastrService.error(this.translateService.instant('vous devez ajouter au moin une voiture et un service'));
      }
    } else {
      this.dialogService.openErrorDialog('please fill the missing information');
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
  patchService(purpose: string) {
    const formValue = this.formBuilder.form.value;
    const dataObject = this.voiturePricingService.mapFormValueToVoitureCriteria(formValue, this.criteres);
    console.log('data object', dataObject);
    switch (purpose) {
      case 'primary':
        //#region
        this.companyService.putServiceByEmailAndService(CategoryLabelEnum.VOITURE,
        this.currentEmail,
        dataObject).subscribe(
          (data) => {
            this.formWasSubmitted = true;
            if (this.showBusPricingComponent) {
              this.busPricingComponent.formSubmitted();
            } else {
              if (this.authStore.getUser().role === 'provider') {
                this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
              }
              if (this.authStore.getUser().role === 'admin') {
                this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
              }

            }
          },
          (err) => {
            this.toastrService.error(this.translateService.instant('error'));
          }
      );
        break;
      //#endregion
      case 'secondary':
      //#region
      this.companyService.putServiceByEmailAndService(CategoryLabelEnum.VOITURE,
      this.currentEmail,
      dataObject).subscribe(
        (data) => {
          this.formWasSubmitted = true;
          if (this.authStore.getUser().role === 'provider') {
            this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-settings/`]);
          }
          if (this.authStore.getUser().role === 'admin') {
            this.router.navigate([`/administration/${this.authStore.getUser()
            .email}/company-admin/${this.currentEmail}/edit/company-settings/`]);
          }
        },
        (err) => {
          this.toastrService.error(this.translateService.instant('error'));
        }
    );
      break;
    //#endregion
      default:
        break;
    }
  }
  busIsChecked(checked: boolean) {
    if (checked) {
      this.busInitCriteres = this.voiturePricingService.addPrefix(this.busInitCriteres, CategoryLabelEnum.BUS);
    } else {
      this.busInitCriteres = this.voiturePricingService.removePrefix(this.busInitCriteres, CategoryLabelEnum.BUS);
    }
    this.showBusPricingComponent = checked;
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
