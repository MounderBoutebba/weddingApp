import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DynamicFormBuilderComponent } from '../../../../../shared/components/dynamic-form-builder';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthStore } from '../../../../../store/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../../services/company.service';
import { VideasteService } from './videaste.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../category-label.enum';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../../../../core/auth.service';
import { newPhotographeCriteres } from '../photographe/photographe.interface';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';

@Component({
	selector: 'app-videaste',
	templateUrl: './videaste.component.html',
	styleUrls: ['./videaste.component.scss']
})
export class VideasteComponent implements OnInit, AfterViewInit {
	@Input() criteres: any;
	@Input() primaryComponent = true;
	@Input() categories: string[] = [];
	@ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
	showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
	showPhotographComponent = false;
	photographInitCriteres: any = newPhotographeCriteres;
	public form: FormGroup;
	public isPhotographe: boolean;
	public parsedCriteres: DynamicFormFieldInterface[];
	currentEmail = '';
	@ViewChild('photographComponent') photographComponent: any;
	constructor(private readonly videasteService: VideasteService,
             private readonly authService: AuthService,
             private readonly authStore: AuthStore,
             @Inject(PLATFORM_ID) private readonly platformId: object,
             private readonly toastrService: ToastrService,
             private readonly translateService: TranslateService,
			 private readonly router: Router,
			 private readonly dialogService: DialogService,
             private readonly route: ActivatedRoute,
             private readonly companyService: CompanyService) {
}

	ngOnInit() {
		// afficher les input par type
		this.currentEmail = this.route.snapshot.paramMap.get('email');
		this.isPhotographe = this.categories.includes(CategoryLabelEnum.PHOTOGRAPHE);
		this.initPhotoGraphCriteres(this.isPhotographe);
		console.log('criteres', this.criteres);
		this.criteres = this.videasteService.selectCriteres(this.criteres, CategoryLabelEnum.VIDEALISTE);
		console.log('selected criteres', this.criteres);
		this.criteres = this.videasteService.removePrefix(this.criteres, CategoryLabelEnum.VIDEALISTE);
		this.parsedCriteres = this.videasteService.initFormValuesWithVideasteCriteria(this.criteres);
		this.buildForm();
	}
	initPhotoGraphCriteres(isPhotographe: boolean) {
		if (isPhotographe) {
			this.photographInitCriteres = this.criteres;
			this.showPhotographComponent = true;
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
		this.parsedCriteres = await this.videasteService.addOption(this.parsedCriteres, field);
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
		const dataObject = this.videasteService.mapFormValueToVideasteCriteria(formValue, this.criteres);
		console.log('data object', dataObject);
		switch (purpose) {
			case 'primary':
				//#region
				this.companyService.putServiceByEmailAndService(CategoryLabelEnum.VIDEALISTE,
				this.currentEmail,
				dataObject).subscribe(
					(data) => {
						if (this.showPhotographComponent) {
							this.photographComponent.formSubmitted();
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
			this.companyService.putServiceByEmailAndService(CategoryLabelEnum.VIDEALISTE,
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
	photographIsChecked(checked: boolean) {
		if (checked) {
			this.photographInitCriteres = this.videasteService.addPrefix(this.photographInitCriteres, CategoryLabelEnum.PHOTOGRAPHE);
		} else {
			this.photographInitCriteres = this.videasteService.removePrefix(this.photographInitCriteres, CategoryLabelEnum.PHOTOGRAPHE);
		}
		this.showPhotographComponent = checked;
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
