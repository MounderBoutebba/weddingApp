import { Component, OnInit, Input, Inject, PLATFORM_ID, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { FormControl, FormGroup } from '@angular/forms';
import { CompanyService } from '../../../../services/company.service';
import { AuthStore } from '../../../../../store/auth';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicFormBuilderComponent } from '../../../../../shared/components/dynamic-form-builder';
import { DecorateurPricingService } from './decorateur-pricing.service';
import { newFleuristeCriteres } from '../../company-details/fleuriste/fleuriste.interface';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-decorateur-pricing',
  templateUrl: './decorateur-pricing.component.html',
  styleUrls: ['./decorateur-pricing.component.scss']
})
export class DecorateurPricingComponent implements OnInit, AfterViewInit {
	@Input() criteres: any;
	@Input() primaryComponent = true;
	@Input() categories: string[] = [];
	@ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
	@ViewChild('fleuristePricingComponent') fleuristePricingComponent: any;
	showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
  showFleuristePricingComponent = false;
  fleuristePricingInitCriteres: any = newFleuristeCriteres;
  public form: FormGroup;
	public isFleuristePricing: boolean;
	public parsedCriteres: DynamicFormFieldInterface[];
	currentEmail = '';
  constructor(private readonly decorateurPricingService: DecorateurPricingService,
              private readonly authStore: AuthStore,
              @Inject(PLATFORM_ID) private readonly platformId: object,
			  private readonly toastrService: ToastrService,
			  private readonly dialogService: DialogService,
              private readonly translateService: TranslateService,
              private readonly authService: AuthService,
              private readonly router: Router,
              private readonly route: ActivatedRoute,
              private readonly companyService: CompanyService) {
}

ngOnInit() {
  // afficher les input par type
  this.currentEmail = this.route.snapshot.paramMap.get('email');
  this.isFleuristePricing = this.categories.includes(CategoryLabelEnum.FLEURISTE);
  this.initFleuristePricingCriteres(this.isFleuristePricing);
  this.criteres = this.decorateurPricingService.selectCriteres(this.criteres, CategoryLabelEnum.DECORATUER);
  console.log('selected criteres', this.criteres);
  this.criteres = this.decorateurPricingService.removePrefix(this.criteres, CategoryLabelEnum.DECORATUER);
  this.parsedCriteres = this.decorateurPricingService.initFormValuesWithDecorateurCriteria(this.criteres);
  this.buildForm();
}
  initFleuristePricingCriteres(isFleuristePricing: boolean) {
		if (isFleuristePricing) {
			this.fleuristePricingInitCriteres = this.criteres;
			this.showFleuristePricingComponent = true;
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
	this.parsedCriteres = await this.decorateurPricingService.addOption(this.parsedCriteres, field);
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
		const dataObject = this.decorateurPricingService.mapFormValueToDecorateurCriteria(formValue, this.criteres);
		console.log('data object', dataObject);
		switch (purpose) {
			case 'primary':
				//#region
				this.companyService.putServiceByEmailAndService(CategoryLabelEnum.DECORATUER,
				this.currentEmail,
				dataObject).subscribe(
					(data) => {
						this.formWasSubmitted = true;
						if (this.showFleuristePricingComponent) {
							this.fleuristePricingComponent.formSubmitted();
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
			this.companyService.putServiceByEmailAndService(CategoryLabelEnum.DECORATUER,
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
