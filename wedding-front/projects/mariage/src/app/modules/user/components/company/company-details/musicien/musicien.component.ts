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
import { newGroupeCriteres } from '../groupe/groupe.interface';
import { DjService } from '../dj/dj.service';
import { GroupeService } from '../groupe/groupe.service';
import { MusicienService } from './musicien.service';
import { newDjCriteres } from '../dj/dj.interface';
import { AuthService } from '../../../../../../core/auth.service';
import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DialogService } from '../../../../services/dialog.service';

@Component({
	selector: 'app-musicien',
	templateUrl: './musicien.component.html',
	styleUrls: ['./musicien.component.scss']
})
export class MusicienComponent implements OnInit, AfterViewInit {
	@Input() criteres: any;
	@Input() primaryComponent = true;
	@Input() categories: string[] = [];
	@ViewChild('formBuilder') formBuilder: DynamicFormBuilderComponent;
	@ViewChild('djComponent') djComponent: any;
	@ViewChild('groupeComponent') groupeComponent: any;
	showForm = false;
	formWasSubmitted = false;
	showSubmitBtn = false;
	showDjComponent = false;
	showGroupeComponent = false;
	DjInitCriteres: any = newDjCriteres;
	groupeInitCriteres: any = newGroupeCriteres;
	public form: FormGroup;
	public isDj: boolean;
	public isGroupe: boolean;
	public parsedCriteres: DynamicFormFieldInterface[];
	currentEmail = '';
	constructor(
		private readonly djService: DjService,
		private readonly groupeService: GroupeService,
		private readonly musicienService: MusicienService,
		private readonly authStore: AuthStore,
		@Inject(PLATFORM_ID) private readonly platformId: object,
		private readonly toastrService: ToastrService,
		private readonly translateService: TranslateService,
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly dialogService: DialogService,
		private readonly authService: AuthService,
		private readonly companyService: CompanyService
	) {}

	ngOnInit() {
		// afficher les input par type
		this.currentEmail = this.route.snapshot.paramMap.get('email');
		this.isDj = this.categories.includes(CategoryLabelEnum.DJ);
		this.initDjCriteres(this.isDj);
		this.isGroupe = this.categories.includes(CategoryLabelEnum.GROUPE);
		this.initGroupeCriteres(this.isGroupe);
		this.criteres = this.musicienService.selectCriteres(this.criteres, CategoryLabelEnum.MUSICIEN);
		console.log('selected criteres', this.criteres);
		this.criteres = this.musicienService.removePrefix(this.criteres, CategoryLabelEnum.MUSICIEN);
		this.parsedCriteres = this.musicienService.initFormValuesWithCriteria(this.criteres);
		this.buildForm();
	}
	initDjCriteres(isDj: boolean) {
		if (isDj) {
			this.DjInitCriteres = this.criteres;
			this.showDjComponent = true;
		}
	}
	initGroupeCriteres(isGroupe: boolean) {
		if (isGroupe) {
			this.groupeInitCriteres = this.criteres;
			this.showGroupeComponent = true;
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
		this.parsedCriteres = await this.musicienService.addOption(this.parsedCriteres, field);
		this.buildForm();
		this.formBuilder.ngOnInit();
		this.formBuilder.appFieldBuilderComponent.checkBoxChanged(field);
	}
	setFormIsValid(): boolean {
		let formIsValid: boolean = this.formBuilder.form.valid;
		if (this.isDj && this.showDjComponent) {
			formIsValid = formIsValid && this.djComponent.formBuilder.form.valid;
		}
		if (this.isGroupe && this.showGroupeComponent) {
			formIsValid = formIsValid && this.groupeComponent.formBuilder.form.valid;
		}
		return formIsValid;
	}
	checkBoxChangesAreChecked(): boolean {
		let checkBoxIsRequired = true;
		this.parsedCriteres.forEach(field => {
			if (field.type === FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER) {
				checkBoxIsRequired = checkBoxIsRequired && !!field.options.filter(opt => opt.value === true).length;
			}
		});
		return checkBoxIsRequired;
	}
	getMissingField(): string {
		let missingField = '';
		this.parsedCriteres
			.slice()
			.reverse()
			.forEach(field => {
				const hasCheckedOpt = field.options && !!field.options.filter(opt => opt.value === true).length;
				if (field.type === FieldTypeEnum.CHECK_BOX && !hasCheckedOpt) {
					missingField = field.displayName;
				}
			});
		return missingField;
	}
	formSubmitted() {
		if (!!!this.getMissingField()) {
			if (this.checkBoxChangesAreChecked()) {
				if (this.setFormIsValid()) {
					this.formWasSubmitted = true;
					this.patchService();
					this.updateCurrentStep();
				} else {
					this.dialogService.openErrorDialog('please fill the missing information');
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
		this.companyService.findCompanyByEmail(currentEmail).subscribe(company => {
			company.currentStep = 'company-pricing';
			this.companyService.updateCurrentStep(company.id, currentEmail, company).subscribe(res => {});
		});
	}
	patchService() {
		const musicienFormValue = this.formBuilder.form.value;
		const dataObject = this.musicienService.mapFormValueToCriteria(musicienFormValue, this.criteres);
		console.log('musicien data object', dataObject);
		this.companyService
			.putServiceByEmailAndService(CategoryLabelEnum.MUSICIEN, this.currentEmail, dataObject)
			.subscribe(data => {
				if (!this.showGroupeComponent && !this.showDjComponent) {
					// tslint:disable-next-line:max-line-length
					if (this.authStore.getUser().role === 'provider') {
						this.router.navigate([
							`/user/${this.authStore.getUser().email}/edit/company-pricing/${data.company.categories[0]}`
						]);
					}
					if (this.authStore.getUser().role === 'admin') {
						this.router.navigate([
							`/administration/${this.authStore.getUser().email}/company-admin/${
								this.currentEmail
							}/edit/company-pricing/${data.company.categories[0]}`
						]);
					}
				}
				if (this.showGroupeComponent && this.showDjComponent) {
					const groupeFormValue = this.groupeComponent.formBuilder.form.value;
					// tslint:disable-next-line:max-line-length
					const groupeDataObject = this.groupeService.mapFormValueToCriteria(
						groupeFormValue,
						this.groupeComponent.criteres
					);
					console.log('groupe data object', groupeDataObject);
					this.companyService
						.putServiceByEmailAndService(CategoryLabelEnum.GROUPE, this.currentEmail, groupeDataObject)
						.subscribe(groupeData => {
							const djFormValue = this.djComponent.formBuilder.form.value;
							// tslint:disable-next-line:max-line-length
							const djDataObject = this.djService.mapFormValueToCriteria(
								djFormValue,
								this.djComponent.criteres
							);
							console.log('dj data object', djDataObject);
							this.companyService
								.putServiceByEmailAndService(CategoryLabelEnum.DJ, this.currentEmail, djDataObject)
								.subscribe(djData => {
									// tslint:disable-next-line:max-line-length
									if (this.authStore.getUser().role === 'provider') {
										this.router.navigate([
											`/user/${this.authStore.getUser().email}/edit/company-pricing/${
												djData.company.categories[0]
											}`
										]);
									}
									if (this.authStore.getUser().role === 'admin') {
										this.router.navigate([
											`/administration/${this.authStore.getUser().email}/company-admin/${
												this.currentEmail
											}/edit/company-pricing/${data.company.categories[0]}`
										]);
									}
								});
						});
				} else if (this.showGroupeComponent) {
					const groupeFormValue = this.groupeComponent.formBuilder.form.value;
					// tslint:disable-next-line:max-line-length
					const groupeDataObject = this.groupeService.mapFormValueToCriteria(
						groupeFormValue,
						this.groupeComponent.criteres
					);
					console.log('groupe data object', groupeDataObject);
					this.companyService
						.putServiceByEmailAndService(CategoryLabelEnum.GROUPE, this.currentEmail, groupeDataObject)
						.subscribe(groupeData => {
							// tslint:disable-next-line:max-line-length
							if (this.authStore.getUser().role === 'provider') {
								this.router.navigate([
									`/user/${this.authStore.getUser().email}/edit/company-pricing/${
										groupeData.company.categories[0]
									}`
								]);
							}
							if (this.authStore.getUser().role === 'admin') {
								this.router.navigate([
									`/administration/${this.authStore.getUser().email}/company-admin/${
										this.currentEmail
									}/edit/company-pricing/${data.company.categories[0]}`
								]);
							}
						});
				} else if (this.showDjComponent) {
					const djFormValue = this.djComponent.formBuilder.form.value;
					// tslint:disable-next-line:max-line-length
					const djDataObject = this.djService.mapFormValueToCriteria(djFormValue, this.djComponent.criteres);
					console.log('dj data object', djDataObject);
					this.companyService
						.putServiceByEmailAndService(CategoryLabelEnum.DJ, this.currentEmail, djDataObject)
						.subscribe(djData => {
							// tslint:disable-next-line:max-line-length
							if (this.authStore.getUser().role === 'provider') {
								this.router.navigate([
									`/user/${this.authStore.getUser().email}/edit/company-pricing/${
										djData.company.categories[0]
									}`
								]);
							}
							if (this.authStore.getUser().role === 'admin') {
								this.router.navigate([
									`/administration/${this.authStore.getUser().email}/company-admin/${
										this.currentEmail
									}/edit/company-pricing/${data.company.categories[0]}`
								]);
							}
						});
				}
			});
	}
	djIsChecked(checked: boolean) {
		if (checked) {
			this.DjInitCriteres = this.djService.addPrefix(this.DjInitCriteres, CategoryLabelEnum.DJ);
		} else {
			this.DjInitCriteres = this.djService.removePrefix(this.DjInitCriteres, CategoryLabelEnum.DJ);
		}
		this.showDjComponent = checked;
	}
	groupeIsChecked(checked: boolean) {
		if (checked) {
			this.groupeInitCriteres = this.djService.addPrefix(this.groupeInitCriteres, CategoryLabelEnum.GROUPE);
		} else {
			this.groupeInitCriteres = this.djService.removePrefix(this.groupeInitCriteres, CategoryLabelEnum.GROUPE);
		}
		this.showGroupeComponent = checked;
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
