import {
  Component,
  OnInit,
  Input,
  ViewChild,
  PLATFORM_ID,
  Inject,
  AfterViewInit,
  ViewChildren,
  QueryList,
  HostListener
} from '@angular/core';
import { DynamicFormBuilderComponent } from '../../../../../shared/components/dynamic-form-builder';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthStore } from '../../../../../store/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../../services/company.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { newFeuArtificesCriteres } from '../../company-details/feu-artifices/feu-artifices.interface';
import { LachersPricingService } from './lachers-pricing.service';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';
@Component({
  selector: 'app-lachers-pricing',
  templateUrl: './lachers-pricing.component.html',
  styleUrls: ['./lachers-pricing.component.scss']
})
export class LachersPricingComponent implements OnInit, AfterViewInit {
	@Input() criteres: any;
	@Input() primaryComponent = true;
	@Input() categories: string[] = [];
  @ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
  @ViewChild('feuComponent') feuComponent: any;
	showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
	showFeuComponent = false;
	feuInitCriteres: any = newFeuArtificesCriteres;
	public form: FormGroup;
	public isFeu: boolean;
	public parsedCriteres: DynamicFormFieldInterface[];
	currentEmail = '';
	constructor(private readonly lachersService: LachersPricingService,
             private readonly authStore: AuthStore,
             @Inject(PLATFORM_ID) private readonly platformId: object,
             private readonly toastrService: ToastrService,
             private readonly translateService: TranslateService,
			 private readonly authService: AuthService,
			 private readonly dialogService: DialogService,
             private readonly router: Router,
			       private readonly route: ActivatedRoute,
             private readonly companyService: CompanyService) {
}

  ngOnInit() {
	// afficher les input par type
		this.currentEmail = this.route.snapshot.paramMap.get('email');
		this.isFeu = this.categories.includes(CategoryLabelEnum.FEU_ARTIFICES);
		this.initFeuCriteres(this.isFeu);
		console.log('criteres', this.criteres);
		this.criteres = this.lachersService.selectCriteres(this.criteres, CategoryLabelEnum.LACHERS);
		console.log('selected criteres', this.criteres);
		this.criteres = this.lachersService.removePrefix(this.criteres, CategoryLabelEnum.LACHERS);
		this.parsedCriteres = this.lachersService.initFormValuesWithCriteria(this.criteres);
		this.buildForm();
  }
  initFeuCriteres(isFeu: boolean) {
		if (isFeu) {
			this.feuInitCriteres = this.criteres;
			this.showFeuComponent = true;
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
		this.parsedCriteres = await this.lachersService.addOption(this.parsedCriteres, field);
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
getLachersValid() {
	let thereIsLachers = false;
	console.log('value', this.formBuilder.form.value);
	Object.keys(this.formBuilder.form.value.lachers).forEach(lacher => {
		thereIsLachers = thereIsLachers || this.formBuilder.form.value.lachers[lacher].value;
	});
	return thereIsLachers;
  }
formSubmitted() {
	const formIsValid: boolean = this.formBuilder.form.valid;
	if (this.checkBoxChangesAreChecked()) {
		if (formIsValid) {
			if (this.getLachersValid()) {
				this.formWasSubmitted = true;
				this.updateCurrentStep();
				if (this.primaryComponent) {
					this.patchService('primary');
				} else {
					this.patchService('secondary');
				}
			} else {
				this.toastrService.error(this.translateService.instant('vous devez entrer au moins un lâcher'));
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
		const dataObject = this.lachersService.mapFormValueToCriteria(formValue, this.criteres);
		console.log('data object', dataObject);
		switch (purpose) {
			case 'primary':
				//#region
				this.companyService.putServiceByEmailAndService(CategoryLabelEnum.LACHERS,
				this.currentEmail,
				dataObject).subscribe(
					(data) => {
						if (this.showFeuComponent) {
							this.feuComponent.formSubmitted();
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
			this.companyService.putServiceByEmailAndService(CategoryLabelEnum.LACHERS,
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
	feuIsChecked(checked: boolean) {
		if (checked) {
			this.feuInitCriteres = this.lachersService.addPrefix(this.feuInitCriteres, CategoryLabelEnum.FEU_ARTIFICES);
		} else {
			this.feuInitCriteres = this.lachersService.removePrefix(this.feuInitCriteres, CategoryLabelEnum.FEU_ARTIFICES);
		}
		this.showFeuComponent = checked;
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
