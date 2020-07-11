import { Component, OnInit, Input, ViewChild, Inject, PLATFORM_ID, AfterViewInit, HostListener } from '@angular/core';
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
import { CoachPricingService } from './coach-pricing.service';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';
@Component({
  selector: 'app-coach-pricing',
  templateUrl: './coach-pricing.component.html',
  styleUrls: ['./coach-pricing.component.scss']
})
export class CoachPricingComponent implements OnInit, AfterViewInit {
	@Input() criteres: any;
	@Input() categories: string[] = [];
	@ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
	showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
  public form: FormGroup;
  public parsedCriteres: DynamicFormFieldInterface[];
  currentEmail = '';
	constructor(private readonly coachService: CoachPricingService,
             private readonly authStore: AuthStore,
             @Inject(PLATFORM_ID) private readonly platformId: object,
             private readonly toastrService: ToastrService,
             private readonly translateService: TranslateService,
             private readonly router: Router,
             private readonly route: ActivatedRoute,
             private readonly dialogService: DialogService,
             private readonly authService: AuthService,
             private readonly companyService: CompanyService) {
}
ngOnInit() {
  this.currentEmail = this.route.snapshot.paramMap.get('email');
  this.criteres = this.coachService.selectCriteres(this.criteres, CategoryLabelEnum.COACH);
  console.log('selected criteres', this.criteres);
  this.criteres = this.coachService.removePrefix(this.criteres, CategoryLabelEnum.COACH);
  this.parsedCriteres = this.coachService.initFormValuesWithCriteria(this.criteres);
  this.buildForm();
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
  this.parsedCriteres = await this.coachService.addOption(this.parsedCriteres, field);
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
formSubmitted() {
  const formIsValid: boolean = this.formBuilder.form.valid;
  if (this.checkBoxChangesAreChecked()) {
    if (formIsValid) {
      const formValue = this.formBuilder.form.value;
      const dataObject = this.coachService.mapFormValueToCriteria(formValue, this.criteres);
      this.companyService.putServiceByEmailAndService(CategoryLabelEnum.COACH,
        this.currentEmail,
        dataObject).subscribe(
          (data) => {
            this.formWasSubmitted = true;
            this.updateCurrentStep();
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
