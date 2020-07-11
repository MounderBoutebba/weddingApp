import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DynamicFormBuilderComponent } from '../../../../../shared/components/dynamic-form-builder';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthStore } from '../../../../../store/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../../../services/company.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../category-label.enum';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { newAdultesCriteres } from '../animateur-adults/animateur-adult.interface';
import { AnimateurEnfantsService } from './animateur-enfants.service';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-animateur-enfants',
  templateUrl: './animateur-enfants.component.html',
  styleUrls: ['./animateur-enfants.component.scss']
})
export class AnimateurEnfantsComponent implements OnInit, AfterViewInit {
	@Input() criteres: any;
	@Input() primaryComponent = true;
	@Input() categories: string[] = [];
	@ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
	showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
	showAnimateurAdultesComponent = false;
	animateurAdultesInitCriteres: any = newAdultesCriteres;
	public form: FormGroup;
	public isAnimateurAdultes: boolean;
	public parsedCriteres: DynamicFormFieldInterface[];
	currentEmail = '';
	@ViewChild('animateurAdultesComponent') animateurAdultesComponent: any;
	constructor(private readonly animateurEnfantsService: AnimateurEnfantsService,
             private readonly authStore: AuthStore,
             @Inject(PLATFORM_ID) private readonly platformId: object,
             private readonly toastrService: ToastrService,
             private readonly authService: AuthService,
			          private readonly translateService: TranslateService,
			          private readonly dialogService: DialogService,
			          private readonly router: Router,
			          private readonly route: ActivatedRoute,
             private readonly companyService: CompanyService) {
        }
  ngOnInit() {
	this.currentEmail = this.route.snapshot.paramMap.get('email');
    // afficher les input par type
	this.isAnimateurAdultes = this.categories.includes(CategoryLabelEnum.ANIMATEUR_ADULTS);
	this.initAnimateurAdultesCriteres(this.isAnimateurAdultes);
	console.log('criteres', this.criteres);
	this.criteres = this.animateurEnfantsService.selectCriteres(this.criteres, CategoryLabelEnum.ANIMATEUR_ENFANTS);
	console.log('selected criteres', this.criteres);
	this.criteres = this.animateurEnfantsService.removePrefix(this.criteres, CategoryLabelEnum.ANIMATEUR_ENFANTS);
	this.parsedCriteres = this.animateurEnfantsService.initFormValuesWithCriteria(this.criteres);
	this.buildForm();
  }
  initAnimateurAdultesCriteres(isAnimateurAdultes: boolean) {
		if (isAnimateurAdultes) {
			this.animateurAdultesInitCriteres = this.criteres;
			this.showAnimateurAdultesComponent = true;
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
		this.parsedCriteres = await this.animateurEnfantsService.addOption(this.parsedCriteres, field);
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
		const dataObject = this.animateurEnfantsService.mapFormValueToCriteria(formValue, this.criteres);
		console.log('data object', dataObject);
		switch (purpose) {
			case 'primary':
				//#region
				this.companyService.putServiceByEmailAndService(CategoryLabelEnum.ANIMATEUR_ENFANTS,
				this.currentEmail,
				dataObject).subscribe(
					(data) => {
						if (this.showAnimateurAdultesComponent) {
							this.animateurAdultesComponent.formSubmitted();
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
			this.companyService.putServiceByEmailAndService(CategoryLabelEnum.ANIMATEUR_ENFANTS,
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
