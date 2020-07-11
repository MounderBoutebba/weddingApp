import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DynamicFormBuilderComponent } from '../../../../../shared/components/dynamic-form-builder';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { AuthStore } from '../../../../../store/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../../services/company.service';
import { CategoryLabelEnum } from '../category-label.enum';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { CoachService } from './coach.service';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss']
})
export class CoachComponent implements OnInit, AfterViewInit {
	@Input() criteres: any;
	@Input() categories: string[] = [];
	@ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
	showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
  public form: FormGroup;
  public parsedCriteres: DynamicFormFieldInterface[];
  currentEmail = '';
  checkBoxIsRequired: boolean;
	constructor(private readonly coachService: CoachService,
             private readonly authStore: AuthStore,
             private readonly authService: AuthService,
             @Inject(PLATFORM_ID) private readonly platformId: object,
             private readonly toastrService: ToastrService,
             private readonly translateService: TranslateService,
             private readonly router: Router,
             private readonly dialogService: DialogService,
             private readonly route: ActivatedRoute,
             private readonly companyService: CompanyService) {
}
ngOnInit() {
  this.currentEmail = this.route.snapshot.paramMap.get('email');
  this.criteres = this.coachService.selectCriteres(this.criteres, CategoryLabelEnum.COACH);
  console.log('selected criteres', this.criteres);
  this.criteres = this.coachService.removePrefix(this.criteres, CategoryLabelEnum.COACH);
  this.parsedCriteres = this.coachService.initFormValuesWithCriteria(this.criteres);
  this.buildForm();
  this.checkBoxChangesAreChecked();
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
    if (field.type === FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER) {
      checkBoxIsRequired = checkBoxIsRequired
                    && !!field.options.filter( opt => opt.value === true ).length;
    }
  });
  this.checkBoxIsRequired = checkBoxIsRequired;
  console.log('checkBoxIsRequired', this.checkBoxIsRequired);
  return checkBoxIsRequired;
}
getMissingField(): string {
  let missingField = '';
  this.parsedCriteres.slice().reverse().forEach( field => {
    const hasCheckedOpt = !!field.options.filter( opt => opt.value === true ).length;
    if (field.type === FieldTypeEnum.CHECK_BOX && !hasCheckedOpt) {
      missingField = field.displayName;
    }
  });
  return missingField;
}
formSubmitted() {
  const formIsValid: boolean = this.formBuilder.form.valid;
  if (this.checkBoxChangesAreChecked()) {
    if (!!!this.getMissingField()) {
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
                this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${data.company.categories[0]}`]);
              }
              if (this.authStore.getUser().role === 'admin') {
              this.router.navigate([`/administration/${this.authStore.getUser()
                .email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
              }
            },
            (err) => {
              this.toastrService.error(this.translateService.instant('error'));
            }
        );
      }
    } else {
      this.dialogService.openErrorDialog(this.getMissingField(), true);
    }

  } else {
    this.dialogService.openErrorDialog('please fill the missing information');
  }
}
updateCurrentStep() {
  const currentEmail = this.route.snapshot.paramMap.get('email');
  this.companyService.findCompanyByEmail(currentEmail).subscribe( company => {
    company.currentStep = 'company-pricing';
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
