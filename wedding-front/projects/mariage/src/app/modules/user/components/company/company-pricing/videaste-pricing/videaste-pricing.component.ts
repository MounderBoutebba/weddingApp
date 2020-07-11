import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { VideastePricingService } from './videaste-pricing.service';
import { DynamicFormBuilderComponent } from '../../../../../shared/components/dynamic-form-builder';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { AuthStore } from '../../../../../store/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../../services/company.service';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { AuthService } from '../../../../../../core/auth.service';
import { newPhotographeCriteres } from '../../company-details/photographe/photographe.interface';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-videaste-pricing',
  templateUrl: './videaste-pricing.component.html',
  styleUrls: ['./videaste-pricing.component.scss']
})
export class VideastePricingComponent implements OnInit, AfterViewInit {
	@Input() criteres: any;
	@Input() primaryComponent = true;
	@Input() categories: string[] = [];
	@ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
	showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
  showPhotographPricingComponent = false;
  currentEmail = '';
	photographInitCriteres: any = newPhotographeCriteres;
	public form: FormGroup;
	public isPhotographePricing: boolean;
	public parsedCriteres: DynamicFormFieldInterface[];
	@ViewChild('photographPricingComponent') photographPricingComponent: any;
	constructor(private readonly videastePricingService: VideastePricingService,
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
  this.isPhotographePricing = this.categories.includes(CategoryLabelEnum.PHOTOGRAPHE);
  this.initPhotoGraphCriteres(this.isPhotographePricing);
  console.log('criteres', this.criteres);
  this.criteres = this.videastePricingService.selectCriteres(this.criteres, CategoryLabelEnum.VIDEALISTE);
  console.log('selected criteres', this.criteres);
  this.criteres = this.videastePricingService.removePrefix(this.criteres, CategoryLabelEnum.VIDEALISTE);
  this.parsedCriteres = this.videastePricingService.initFormValuesWithVideastePricingCriteria(this.criteres);
  this.buildForm();
}
initPhotoGraphCriteres(isPhotographePricing: boolean) {
  if (isPhotographePricing) {
    this.photographInitCriteres = this.criteres;
    this.showPhotographPricingComponent = true;
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
  this.parsedCriteres = await this.videastePricingService.addOption(this.parsedCriteres, field);
  this.buildForm();
  this.formBuilder.ngOnInit();
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
formSubmitted() {
  const formIsValid: boolean = this.formBuilder.form.valid;
    if (formIsValid) {
      this.formWasSubmitted = true;
      this.updateCurrentStep();
      if (this.primaryComponent) {
        this.patchService('primary');
      } else {
        this.patchService('secondary');
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
patchService(purpose: string) {
  const formValue = this.formBuilder.form.value;
  const dataObject = this.videastePricingService.mapFormValueToVideasteCriteria(formValue, this.criteres);
  console.log('data object', dataObject);
  switch (purpose) {
    case 'primary':
      //#region
      this.companyService.putServiceByEmailAndService(CategoryLabelEnum.VIDEALISTE,
      this.currentEmail,
      dataObject).subscribe(
        (data) => {
          if (this.showPhotographPricingComponent) {
            this.photographPricingComponent.formSubmitted();
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
    this.companyService.putServiceByEmailAndService(CategoryLabelEnum.VIDEALISTE,
    this.currentEmail,
    dataObject).subscribe(
      (data) => {
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
