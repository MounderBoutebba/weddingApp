import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { FormControl, FormGroup } from '@angular/forms';
import { CompanyService } from '../../../../services/company.service';
import { AuthStore } from '../../../../../store/auth';
import { CategoryLabelEnum } from '../category-label.enum';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicFormBuilderComponent } from '../../../../../shared/components/dynamic-form-builder';
import { newLachersCriteres } from '../lachers/lachers.interface';
import { FeuArtificesService } from './feu-artifices.service';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-feu-artifices',
  templateUrl: './feu-artifices.component.html',
  styleUrls: ['./feu-artifices.component.scss']
})
export class FeuArtificesComponent implements OnInit, AfterViewInit {
	@Input() criteres: any;
	@Input() primaryComponent = true;
	@Input() categories: string[] = [];
	@ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
	@ViewChild('lachersComponent') lachersComponent: any;
	showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
	showLachersComponent = false;
	lachersInitCriteres: any = newLachersCriteres;
	public form: FormGroup;
	public isLachers: boolean;
	public parsedCriteres: DynamicFormFieldInterface[];
	currentEmail = '';
	constructor(private readonly feuArtificesService: FeuArtificesService,
             private readonly authStore: AuthStore,
             @Inject(PLATFORM_ID) private readonly platformId: object,
             private readonly toastrService: ToastrService,
             private readonly authService: AuthService,
             private readonly translateService: TranslateService,
			 private readonly router: Router,
			 private readonly dialogService: DialogService,
			 private readonly companyService: CompanyService,
			 private readonly route: ActivatedRoute) {
}
  ngOnInit() {
	// afficher les input par type
		this.currentEmail = this.route.snapshot.paramMap.get('email');
		this.isLachers = this.categories.includes(CategoryLabelEnum.LACHERS);
		this.initLachersCriteres(this.isLachers);
		this.criteres = this.feuArtificesService.selectCriteres(this.criteres, CategoryLabelEnum.FEU_ARTIFICES);
		console.log('selected criteres', this.criteres);
		this.criteres = this.feuArtificesService.removePrefix(this.criteres, CategoryLabelEnum.FEU_ARTIFICES);
		this.parsedCriteres = this.feuArtificesService.initFormValuesWithCriteria(this.criteres);
		this.buildForm();
  }
  initLachersCriteres(isLachers: boolean) {
		if (isLachers) {
			this.lachersInitCriteres = this.criteres;
			this.showLachersComponent = true;
		}
	}
	ngAfterViewInit() {
		this.showSubmitBtn = true;
		console.log('show submit btn', this.showSubmitBtn);
		console.log('primary', this.primaryComponent);

	}
	buildForm() {
		this.showForm = false;
		this.form = new FormGroup({
		  fields: new FormControl(JSON.stringify(this.parsedCriteres))
		});
		this.showForm = true;
	}
	async onAddOption(field: DynamicFormFieldInterface) {
		this.parsedCriteres = await this.feuArtificesService.addOption(this.parsedCriteres, field);
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
		  company.currentStep = 'company-pricing';
		  this.companyService.updateCurrentStep(company.id, currentEmail, company).subscribe( res => {
		  });
		});
	  }
	patchService(purpose: string) {
		const formValue = this.formBuilder.form.value;
		const dataObject = this.feuArtificesService.mapFormValueToCriteria(formValue, this.criteres);
		console.log('data object', dataObject);
		switch (purpose) {
			case 'primary':
				//#region
				this.companyService.putServiceByEmailAndService(CategoryLabelEnum.FEU_ARTIFICES,
				this.currentEmail,
				dataObject).subscribe(
					(data) => {
						if (this.showLachersComponent) {
							this.lachersComponent.formSubmitted();
						} else {
							if (this.authStore.getUser().role === 'provider') {
								this.router.navigate([`/user/${this.authStore.getUser().email}/edit/company-pricing/${data.company.categories[0]}`]);
							}
							if (this.authStore.getUser().role === 'admin') {
								this.router.navigate([`/administration/${this.authStore.getUser()
									.email}/company-admin/${this.currentEmail}/edit/company-pricing/${data.company.categories[0]}`]);
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
			this.companyService.putServiceByEmailAndService(CategoryLabelEnum.FEU_ARTIFICES,
			this.currentEmail,
			dataObject).subscribe(
				(data) => {
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
			break;
		//#endregion
			default:
				break;
		}
	}
	lachersIsChecked(checked: boolean) {
		if (checked) {
			this.lachersInitCriteres = this.feuArtificesService.addPrefix(this.lachersInitCriteres, CategoryLabelEnum.LACHERS);
		} else {
			this.lachersInitCriteres = this.feuArtificesService.removePrefix(this.lachersInitCriteres, CategoryLabelEnum.LACHERS);
		}
		this.showLachersComponent = checked;
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
