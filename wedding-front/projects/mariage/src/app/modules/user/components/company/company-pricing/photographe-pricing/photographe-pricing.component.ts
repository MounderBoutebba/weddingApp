import { Component, OnInit, Input, PLATFORM_ID, Inject, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { PhotographePricingService } from './photographe-pricing.service';
import { AuthStore } from '../../../../../store/auth';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../../../services/company.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { DynamicFormBuilderComponent } from '../../../../../shared/components/dynamic-form-builder';
import { AuthService } from '../../../../../../core/auth.service';
import { newVideasteCriteres } from '../../company-details/videaste/videaste.interface';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-photographe-pricing',
  templateUrl: './photographe-pricing.component.html',
  styleUrls: ['./photographe-pricing.component.scss']
})
export class PhotographePricingComponent implements OnInit, AfterViewInit {
	@Input() criteres: any;
	@Input() primaryComponent = true;
	@Input() categories: string[] = [];
	@ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
	@ViewChild('videastePricingComponent') videastePricingComponent: any;
	showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
	showVideastePricingComponent = false;
	currentEmail = '';
	videasteInitCriteres: any = newVideasteCriteres;
	public form: FormGroup;
	public isVideastePricing: boolean;
	public parsedCriteres: DynamicFormFieldInterface[];
  constructor(private readonly photographePricingService: PhotographePricingService,
              private readonly authStore: AuthStore,
              @Inject(PLATFORM_ID) private readonly platformId: object,
              private readonly toastrService: ToastrService,
              private readonly translateService: TranslateService,
              private readonly authService: AuthService,
			  private readonly router: Router,
			  private readonly dialogService: DialogService,
			  private readonly route: ActivatedRoute,
              private readonly companyService: CompanyService) {}
			  ngOnInit() {
				// afficher les input par type
				this.currentEmail = this.route.snapshot.paramMap.get('email');
				this.isVideastePricing = this.categories.includes(CategoryLabelEnum.VIDEALISTE);
				this.initVideasteCriteres(this.isVideastePricing);
				this.criteres = this.photographePricingService.selectCriteres(this.criteres, CategoryLabelEnum.PHOTOGRAPHE);
				console.log('selected criteres', this.criteres);
				this.criteres = this.photographePricingService.removePrefix(this.criteres, CategoryLabelEnum.PHOTOGRAPHE);
				this.parsedCriteres = this.photographePricingService.initFormValuesWithPhotographePricingCriteria(this.criteres);
				this.buildForm();
			}
			initVideasteCriteres(isVideastePricing: boolean) {
				if (isVideastePricing) {
					this.videasteInitCriteres = this.criteres;
					this.showVideastePricingComponent = true;
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
			async onAddOption(value: any) {
				console.log('value', value);
				if (value.hasOwnProperty('list') || value.hasOwnProperty('formatName')) {
					if (value.hasOwnProperty('list')) {
						this.parsedCriteres = await this.photographePricingService.addOption(this.parsedCriteres, value.field, value.list);
					} else if (value.hasOwnProperty('formatName')) {
						this.parsedCriteres = await this.photographePricingService.addOption(this.parsedCriteres, value.field, value.formatName);
					}
				} else {
					this.parsedCriteres = await this.photographePricingService.addOption(this.parsedCriteres, value);
				}
				this.buildForm();
				this.formBuilder.ngOnInit();
			}
			checkBoxChangesAreChecked(): boolean {
				let checkBoxIsRequired = true;
				this.parsedCriteres.forEach( field => {
					if (field.type === FieldTypeEnum.CHECK_BOX ||
						(field.type === FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER && field.name !== 'retouchesPhoto' && field.name !== 'remise')) {
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
					let modelesRequired = false;
					let thereIsAtleastFormatActive = false;
					if (field.type === FieldTypeEnum.CHECKBOX_NUMBER_LIST && field.value) {
						field.finitions.forEach(finition => {
							finitionsRequired = finitionsRequired || finition.value;
						  });
						if (field.name === 'creationAlbum') {
							console.log('format', field.formats);
							field.formats.forEach(format => {
								if (format.value) {
									format.modeles.forEach(modele => {
										modelesRequired = modelesRequired || modele.checked;
									});
									isRequired = isRequired && modelesRequired;
								}
							});
						}
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
				const dataObject = this.photographePricingService.mapFormValueToPhotographeCriteria(formValue, this.criteres);
				console.log('data object', dataObject);
				switch (purpose) {
					case 'primary':
						//#region
						this.companyService.putServiceByEmailAndService(CategoryLabelEnum.PHOTOGRAPHE,
						this.currentEmail,
						dataObject).subscribe(
							(data) => {
								if (this.showVideastePricingComponent) {
									this.videastePricingComponent.formSubmitted();
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
					this.companyService.putServiceByEmailAndService(CategoryLabelEnum.PHOTOGRAPHE,
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
