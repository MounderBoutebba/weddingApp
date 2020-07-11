import { Component, OnInit, Input, Inject, PLATFORM_ID, ViewChild, AfterViewInit, HostListener } from '@angular/core';
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
import { DecorateurService } from './decorateur.service';
import { newFleuristeCriteres } from '../fleuriste/fleuriste.interface';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';
@Component({
  selector: 'app-decorateur',
  templateUrl: './decorateur.component.html',
  styleUrls: ['./decorateur.component.scss']
})
export class DecorateurComponent implements OnInit, AfterViewInit {
	@Input() criteres: any;
	@Input() primaryComponent = true;
	@Input() categories: string[] = [];
	@ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
	@ViewChild('fleuristeComponent') fleuristeComponent: any;
	showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
  	showFleuristeComponent = false;
  	fleuristeInitCriteres: any = newFleuristeCriteres;
  	public form: FormGroup;
	public isFleuriste: boolean;
	public parsedCriteres: DynamicFormFieldInterface[];
	currentEmail = '';
  constructor(private readonly decorateurService: DecorateurService,
              private readonly authStore: AuthStore,
              private readonly authService: AuthService,
              @Inject(PLATFORM_ID) private readonly platformId: object,
              private readonly toastrService: ToastrService,
			  private readonly translateService: TranslateService,
			  private readonly dialogService: DialogService,
			  private readonly router: Router,
			  private readonly route: ActivatedRoute,
              private readonly companyService: CompanyService) {
}

  ngOnInit() {
		this.currentEmail = this.route.snapshot.paramMap.get('email');
    // afficher les input par type
		this.isFleuriste = this.categories.includes(CategoryLabelEnum.FLEURISTE);
		this.initFleuristeCriteres(this.isFleuriste);
		this.criteres = this.decorateurService.selectCriteres(this.criteres, CategoryLabelEnum.DECORATUER);
		console.log('selected criteres', this.criteres);
		this.criteres = this.decorateurService.removePrefix(this.criteres, CategoryLabelEnum.DECORATUER);
		this.parsedCriteres = this.decorateurService.initFormValuesWithDecorateurCriteria(this.criteres);
		this.buildForm();
  }
  initFleuristeCriteres(isFleuriste: boolean) {
		if (isFleuriste) {
			this.fleuristeInitCriteres = this.criteres;
			this.showFleuristeComponent = true;
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
	this.parsedCriteres = await this.decorateurService.addOption(this.parsedCriteres, field);
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
	let thereIsFleurs = false;
	Object.keys(this.fleuristeComponent.form.value.fleurs.fleurs).forEach(fleur => {
	  if (typeof this.fleuristeComponent.form.value.fleurs.fleurs[fleur] === 'boolean') {
		thereIsFleurs = thereIsFleurs || this.fleuristeComponent.form.value.fleurs.fleurs[fleur];
	  }
	});
	return  thereIsFleurs;
}
  formSubmitted() {
    const formIsValid: boolean = this.formBuilder.form.valid;
    if (this.checkBoxChangesAreChecked()) {
      if (formIsValid) {
		  if (this.checkBoxChangesAreChecked()) {
			this.formWasSubmitted = true;
			this.updateCurrentStep();
			if (this.primaryComponent) {
			  this.patchService('primary');
			} else {
			  this.patchService('secondary');
			}
		  } else {
			this.toastrService.error(this.translateService.instant('vous devez entrer les info concernant les fleurs'));
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
		const dataObject = this.decorateurService.mapFormValueToDecorateurCriteria(formValue, this.criteres);
		console.log('data object', dataObject);
		switch (purpose) {
			case 'primary':
				//#region
				this.companyService.putServiceByEmailAndService(CategoryLabelEnum.DECORATUER,
				this.currentEmail,
				dataObject).subscribe(
					(data) => {
						this.formWasSubmitted = true;
						if (this.showFleuristeComponent) {
							this.fleuristeComponent.formSubmitted();
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
			this.companyService.putServiceByEmailAndService(CategoryLabelEnum.DECORATUER,
			this.currentEmail,
			dataObject).subscribe(
				(data) => {
					this.formWasSubmitted = true;
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
	fleuristeIsChecked(checked: boolean) {
		if (checked) {
			this.fleuristeInitCriteres = this.decorateurService.addPrefix(this.fleuristeInitCriteres, CategoryLabelEnum.FLEURISTE);
		} else {
			this.fleuristeInitCriteres = this.decorateurService.removePrefix(this.fleuristeInitCriteres, CategoryLabelEnum.FLEURISTE);
		}
		this.showFleuristeComponent = checked;
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
