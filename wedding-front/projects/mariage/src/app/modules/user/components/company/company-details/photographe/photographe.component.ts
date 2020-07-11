import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { FormControl, FormGroup } from '@angular/forms';
import { PhotographeService } from './photographe.service';
import { CompanyService } from '../../../../services/company.service';
import { AuthStore } from '../../../../../store/auth';
import { CategoryLabelEnum } from '../category-label.enum';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DynamicFormBuilderComponent } from '../../../../../shared/components/dynamic-form-builder';
import { AuthService } from '../../../../../../core/auth.service';
import { newVideasteCriteres } from '../videaste/videaste.interface';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';

@Component({
	selector: 'app-photographe',
	templateUrl: './photographe.component.html',
	styleUrls: ['./photographe.component.scss']
})
export class PhotographeComponent implements OnInit, AfterViewInit {
	@Input() criteres: any;
	@Input() primaryComponent = true;
	@Input() categories: string[] = [];
	@ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
	@ViewChild('videasteComponent') videasteComponent: any;
	showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
	showVideasteComponent = false;
	videasteInitCriteres: any = newVideasteCriteres;
	public form: FormGroup;
	public isVideaste: boolean;
	public parsedCriteres: DynamicFormFieldInterface[];
	currentEmail = '';
	constructor(private readonly photographeService: PhotographeService,
             private readonly authStore: AuthStore,
             private readonly authService: AuthService,
             @Inject(PLATFORM_ID) private readonly platformId: object,
             private readonly toastrService: ToastrService,
			 private readonly translateService: TranslateService,
			 private readonly dialogService: DialogService,
             private readonly router: Router,
			 private readonly companyService: CompanyService,
			 private readonly route: ActivatedRoute ) {
	}

	ngOnInit() {
		// afficher les input par type
		this.currentEmail = this.route.snapshot.paramMap.get('email');
		this.isVideaste = this.categories.includes(CategoryLabelEnum.VIDEALISTE);
		this.initVideasteCriteres(this.isVideaste);
		this.criteres = this.photographeService.selectCriteres(this.criteres, CategoryLabelEnum.PHOTOGRAPHE);
		console.log('selected criteres', this.criteres);
		this.criteres = this.photographeService.removePrefix(this.criteres, CategoryLabelEnum.PHOTOGRAPHE);
		this.parsedCriteres = this.photographeService.initFormValuesWithPhotographeCriteria(this.criteres);
		this.buildForm();
	}
	initVideasteCriteres(isPhotographe: boolean) {
		if (isPhotographe) {
			this.videasteInitCriteres = this.criteres;
			this.showVideasteComponent = true;
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
		this.parsedCriteres = await this.photographeService.addOption(this.parsedCriteres, field);
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
		if (!!!this.getMissingField()) {
			if (this.checkBoxChangesAreChecked()) {
				if (formIsValid) {
					this.formWasSubmitted = true;
					if (this.primaryComponent) {
						this.patchService('primary');
					} else {
						this.patchService('secondary');
					}
					this.updateCurrentStep();
				} else {
					this.dialogService.openErrorDialog('form is not valid');
				}
				} else {
					this.dialogService.openErrorDialog('please fill the missing information');
				}
		} else {
			this.dialogService.openErrorDialog(this.getMissingField(), true);
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
		const dataObject = this.photographeService.mapFormValueToPhotographeCriteria(formValue, this.criteres);
		console.log('data object', dataObject);
		switch (purpose) {
			case 'primary':
				//#region
				this.companyService.putServiceByEmailAndService(CategoryLabelEnum.PHOTOGRAPHE,
				this.currentEmail,
				dataObject).subscribe(
					(data) => {
						if (this.showVideasteComponent) {
							this.videasteComponent.formSubmitted();
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
			this.companyService.putServiceByEmailAndService(CategoryLabelEnum.PHOTOGRAPHE,
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
	videasteIsChecked(checked: boolean) {
		if (checked) {
			this.videasteInitCriteres = this.photographeService.addPrefix(this.videasteInitCriteres, CategoryLabelEnum.VIDEALISTE);
		} else {
			this.videasteInitCriteres = this.photographeService.removePrefix(this.videasteInitCriteres, CategoryLabelEnum.VIDEALISTE);
		}
		this.showVideasteComponent = checked;
	}

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHander(event) {
    return this.formWasSubmitted;
  }

  public canDeactivate(): Observable<boolean> | boolean {
	if (isPlatformBrowser(this.platformId)) {
	  if (!this.formWasSubmitted) {
		return this.dialogService.openConfirmDialog();
	  }
	}
	return of(true);
  }

/*  @HostListener('window:unload', ['$event'])
  public unloadHander(event) {
    if (!this.formWasSubmitted) {
      // this.authService.logout();
    }
  }*/

}
