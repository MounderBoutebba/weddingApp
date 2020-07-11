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
import { FleuristePricingService } from './fleuriste-pricing.service';
import { newDecorateurCriteres } from '../../company-details/decorateur/decorateur.interface';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';
import { FleuristeCriteres } from '../../company-details/fleuriste/fleuriste.interface';
@Component({
  selector: 'app-fleuriste-pricing',
  templateUrl: './fleuriste-pricing.component.html',
  styleUrls: ['./fleuriste-pricing.component.scss']
})
export class FleuristePricingComponent implements OnInit, AfterViewInit {
	@Input() criteres: any;
	@Input() primaryComponent = true;
	@Input() categories: string[] = [];
	@ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
	@ViewChild('decorateurPricingComponent') decorateurPricingComponent: any;
	showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
  showDecorateurPricingComponent = false;
  decorateurPricingInitCriteres: any = newDecorateurCriteres;
  public form: FormGroup;
	public isDecorateurPricing: boolean;
  public parsedCriteres: DynamicFormFieldInterface[];
  currentEmail = '';
  constructor(private readonly fleuristePricingService: FleuristePricingService,
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
  this.isDecorateurPricing = this.categories.includes(CategoryLabelEnum.DECORATUER);
  this.initDecorateurPricingCriteres(this.isDecorateurPricing);
  this.criteres = this.fleuristePricingService.selectCriteres(this.criteres, CategoryLabelEnum.FLEURISTE);
  console.log('selected criteres', this.criteres);
  this.criteres = this.fleuristePricingService.removePrefix(this.criteres, CategoryLabelEnum.FLEURISTE);
  this.parsedCriteres = this.fleuristePricingService.initFormValuesWithFleuristeCriteria(this.criteres);
  this.buildForm();
}
  initDecorateurPricingCriteres(isDecorateurPricing: boolean) {
    if (isDecorateurPricing) {
      this.decorateurPricingInitCriteres = this.criteres;
      this.showDecorateurPricingComponent = true;
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
    this.parsedCriteres = await this.fleuristePricingService.addOption(this.parsedCriteres, field);
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
  getFleuristeValid() {
      let valid = false;
      if (this.formBuilder.form.value.fleurs.value) {
        const fleursKeys = Object.keys(this.formBuilder.form.value.fleurs.options);
        fleursKeys.forEach(fleur => {
          valid = valid || this.formBuilder.form.value.fleurs.options[fleur].checked;
        });
      } if (this.formBuilder.form.value.feuillages.value && valid) {
        valid = false;
        const feuillagesKeys = Object.keys(this.formBuilder.form.value.feuillages.options);
        feuillagesKeys.forEach(feuillage => {
          valid = valid || this.formBuilder.form.value.feuillages.options[feuillage].checked;
        });
      } if (this.formBuilder.form.value.decoration.value && valid) {
        valid = false;
        const decorationKeys = Object.keys(this.formBuilder.form.value.decoration.options);
        decorationKeys.forEach(decoration => {
          valid = valid || this.formBuilder.form.value.decoration.options[decoration].checked;
        });
      }
      return valid;
  }
  formSubmitted() {
    const formIsValid: boolean = this.formBuilder.form.valid;
    if (this.checkBoxChangesAreChecked()) {
      if (formIsValid) {
        if (this.getFleuristeValid()) {
          this.formWasSubmitted = true;
          this.updateCurrentStep();
          if (this.primaryComponent) {
            this.patchService('primary');
          } else {
            this.patchService('secondary');
          }
        } else {
          this.toastrService.error(this.translateService.instant('vous devez entrer les info concernant les fleurs, feuillages ou décoration'));
        }

      } else {
        this.dialogService.openErrorDialog('form is not valid');
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
    const dataObject = this.fleuristePricingService.mapFormValueToFleuristeCriteria(formValue, this.criteres);
    console.log('data object', dataObject);
    switch (purpose) {
      case 'primary':
        //#region
        this.companyService.putServiceByEmailAndService(CategoryLabelEnum.FLEURISTE,
        this.currentEmail,
        dataObject).subscribe(
          (data) => {
            this.formWasSubmitted = true;
            if (this.showDecorateurPricingComponent) {
              this.decorateurPricingComponent.formSubmitted();
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
      this.companyService.putServiceByEmailAndService(CategoryLabelEnum.FLEURISTE,
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
