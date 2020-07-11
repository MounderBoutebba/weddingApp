import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
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
import { FairePartPricingService } from './faire-part-pricing.service';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-faire-part-pricing',
  templateUrl: './faire-part-pricing.component.html',
  styleUrls: ['./faire-part-pricing.component.scss']
})
export class FairePartPricingComponent implements OnInit, AfterViewInit {
	@Input() criteres: any;
	@Input() categories: string[] = [];
	@ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
	showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
  public form: FormGroup;
  public parsedCriteres: DynamicFormFieldInterface[];
  currentEmail = '';
	constructor(private readonly fairePartPricingService: FairePartPricingService,
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
    this.currentEmail = this.route.snapshot.paramMap.get('email');
    this.criteres = this.fairePartPricingService.selectCriteres(this.criteres, CategoryLabelEnum.FAIRE_PART);
    console.log('selected criteres', this.criteres);
    this.criteres = this.fairePartPricingService.removePrefix(this.criteres, CategoryLabelEnum.FAIRE_PART);
    this.parsedCriteres = this.fairePartPricingService.initFormValuesWithCriteria(this.criteres);
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
  async onAddOption(value: any) {
    console.log('value', value);
    if (value.hasOwnProperty('list') || value.hasOwnProperty('formatName')) {
      if (value.hasOwnProperty('list')) {
        this.parsedCriteres = await this.fairePartPricingService.addOption(this.parsedCriteres, value.field, value.list);
      } else if (value.hasOwnProperty('formatName')) {
        this.parsedCriteres = await this.fairePartPricingService.addOption(this.parsedCriteres, value.field, value.formatName);
      }
    } else {
      this.parsedCriteres = await this.fairePartPricingService.addOption(this.parsedCriteres, value);
    }
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
  checkBoxNumberListFinitions(): boolean {
    let isRequired = true;
    this.parsedCriteres.forEach( field => {
      let finitionsRequired = false;
      let thereIsAtleastFormatActive = false;
      if (field.type === FieldTypeEnum.CHECKBOX_NUMBER_LIST && field.value) {
        field.finitions.forEach(finition => {
          finitionsRequired = finitionsRequired || finition.value;
          });
        field.formats.forEach(format => {
          thereIsAtleastFormatActive = thereIsAtleastFormatActive || format.value;
        });
        isRequired = isRequired && finitionsRequired && thereIsAtleastFormatActive;
      }
    });
    console.log('isRequired', isRequired);
    return isRequired;
  }
  formSubmitted() {
    const formIsValid: boolean = this.formBuilder.form.valid;
    if (this.checkBoxChangesAreChecked() && this.checkBoxNumberListFinitions()) {
      if (formIsValid) {
        const formValue = this.formBuilder.form.value;
        const dataObject = this.fairePartPricingService.mapFormValueToCriteria(formValue, this.criteres);
        this.companyService.putServiceByEmailAndService(CategoryLabelEnum.FAIRE_PART,
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
      //  this.authService.logout();
    }
  }*/


}
