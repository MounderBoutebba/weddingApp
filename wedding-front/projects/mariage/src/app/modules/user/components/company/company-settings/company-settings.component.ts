import { ChangeDetectorRef, Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Moment from 'moment';
import { Setting } from '../../../models/setting.model';
import { FeeType, Option } from '../../../models/option.model';
import { Company, TripFeeType } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';
import { AuthStore } from '../../../../store/auth';
import { SettingService } from '../../../services/setting.service';
import { OptionService } from '../../../services/option.service';
import { DialogService } from '../../../services/dialog.service';
import { AuthService } from '../../../../../core/auth.service';

const RangeValidator: ValidatorFn = (fg: FormGroup) => {
	const increaseWeek = fg.get('increaseWeek').value;
	const increaseWeekend = fg.get('increaseWeekend').value;
	return increaseWeek !== null && increaseWeekend !== null && (increaseWeekend > 0 || increaseWeek > 0)
		? null
		: { range: true };
};

export const categoryValidator = (control: AbstractControl): { [key: string]: boolean } => {
	const values = control.value;
	const length = Object.entries(values)
		.map(([key, value]) => !!value)
		.filter(val => !!val).length;
	const confirm = control.get('confirm');
	return length > 0 ? null : { category: true };
};

@Component({
	selector: 'app-company-settings',
	templateUrl: './company-settings.component.html',
	styleUrls: ['./company-settings.component.scss']
})
export class CompanySettingsComponent implements OnInit {
	autoApplication = false;
	selectedSetting: Setting;
	selectedOption: Option;

	color = 'primary';
	checked = false;
	disabled = false;
	feeType = FeeType;
	tripFeeType = TripFeeType;

	settingForm: FormGroup;
	optionForm: FormGroup;
	companyForm: FormGroup;
	formWasSubmitted = false;

	public SETTINGS_DATA: Setting[] = [];
	public OPTIONS_DATA: Option[] = [];
	public company: Company;

	public minDate = Moment();

	currentEmail: string;
	locale = {};

	settingsValid = false;
	optionsValid = false;

	constructor(
		public dialog: MatDialog,
		public companyService: CompanyService,
		private authStore: AuthStore,
		public settingService: SettingService,
		public optionService: OptionService,
		private readonly toastrService: ToastrService,
		private readonly translateService: TranslateService,
		private readonly dialogService: DialogService,
		private readonly cd: ChangeDetectorRef,
		private readonly router: Router,
		private settingFormBuilder: FormBuilder,
		private optionFormBuilder: FormBuilder,
		private companyFormBuilder: FormBuilder,
		private readonly route: ActivatedRoute,
		private readonly authService: AuthService,
		@Inject(PLATFORM_ID) private readonly platformId: object
	) {}

	ngOnInit() {
		this.currentEmail = this.route.snapshot.paramMap.get('email');
		this.initPeriodRangePicker();
		this.companyService.findCompanyByEmail(this.currentEmail).subscribe(res => {
			this.scrollTop();
			this.company = res;
			this.resetSettingForm();
			this.resetOptionForm();
			this.resetCompanyForm();
			this.initCompanyForm();
		});
	}

	private updateCurrentStep() {
		const currentEmail = this.route.snapshot.paramMap.get('email');
		this.companyService.findCompanyByEmail(currentEmail).subscribe(company => {
			company.currentStep = 'company-billing';
			this.companyService.updateCurrentStep(company.id, currentEmail, company).subscribe(res => {});
		});
	}

	scrollTop() {
		const scrollToTop = window.setInterval(() => {
			const pos = window.pageYOffset;
			if (pos > 0) {
				window.scrollTo(0, pos - 60); // how far to scroll on each step
			} else {
				window.clearInterval(scrollToTop);
			}
		}, 16);
	}

	initCompanyForm() {
		this.companyService.findCompanyByEmail(this.currentEmail).subscribe(res => {
			this.company = res;
			this.companyForm.patchValue(this.company);
			console.log({ company: this.company });
			this.OPTIONS_DATA = this.company.options;
			if (this.OPTIONS_DATA?.length > 0) {
				this.optionsValid = true;
			}
			// @ts-ignore
			this.SETTINGS_DATA = this.company.settings.sort((a, b) => a.periodEndDate > b.periodEndDate);
			if (this.SETTINGS_DATA?.length > 0) {
				this.settingsValid = true;
				this.minDate = Moment(this.SETTINGS_DATA[this.SETTINGS_DATA.length - 1].periodEndDate).add(1, 'days');
			}
			this.initCompanyControls();
			this.cd.detectChanges();
		});
	}

	initCompanyControls() {
		if (!this.company.periodeVariation) {
			this.settingForm.disable();
		}
		if (!this.company.optionsProposed) {
			this.optionForm.disable();
		}
		if (!this.company.tripExpences) {
			this.disableTripExpencesControl();
		}
		if (!this.company.suppHours) {
			this.disableSuppHoursControl();
		}
	}

	initPeriodRangePicker() {
		Moment.locale('fr');
		this.locale = {
			daysOfWeek: Moment.weekdaysMin(),
			monthNames: Moment.monthsShort(),
			firstDay: Moment.localeData().firstDayOfWeek(),
			separator: ' à ',
			cancelLabel: 'Annuler',
			applyLabel: 'Appliquer',
			clearLabel: 'Vider'
		};
	}

	changeDateFormat(date) {
		return Moment(new Date(date)).format('MMM Do YY');
	}
	changePeriodDate(event) {
		this.minDate = Moment(event.endDate).add(1, 'days');
		if (event.startDate && event.endDate) {
			this.settingForm.get('periodStartDate').setValue(event.startDate.toDate());
			this.settingForm.get('periodEndDate').setValue(event.endDate.toDate());
		}
	}

	onChangeOptionProposed(event) {
		this.companyForm.get('optionsProposed').setValue(!this.companyForm.get('optionsProposed').value);
		if (this.companyForm.get('optionsProposed').value) {
			this.optionForm.enable();
		} else {
			this.optionForm.disable();
		}
	}

	onChangePeriodVariation(event) {
		this.companyForm.get('periodeVariation').setValue(!this.companyForm.get('periodeVariation').value);
		if (this.companyForm.get('periodeVariation').value) {
			this.settingForm.enable();
		} else {
			this.settingForm.disable();
		}
	}

	onChangeTripExpences(event) {
		this.companyForm.get('tripExpences').setValue(!this.companyForm.get('tripExpences').value);
		if (!this.companyForm.get('tripExpences').value) {
			this.disableTripExpencesControl();
		} else {
			this.enableTripExpencesControl();
		}
	}

	onChangeSuppHours(event) {
		this.companyForm.get('suppHours').setValue(!this.companyForm.get('suppHours').value);
		if (!this.companyForm.get('suppHours').value) {
			this.disableSuppHoursControl();
		} else {
			this.enableSuppHoursControl();
		}
	}

	disableSuppHoursControl() {
		this.companyForm.get('suppHoursRate').setValue(0);
		this.companyForm.get('suppHoursRate').disable();
	}

	enableSuppHoursControl() {
		this.companyForm.get('suppHoursRate').enable();
	}

	disableTripExpencesControl() {
		this.companyForm.get('tripExpencesRateType').setValue(null);
		this.companyForm.get('tripExpencesTypePrice').setValue(0);
		this.companyForm.get('tripExpencesDistance').setValue(0);
		this.companyForm.get('tripExpencesDistance').disable();
		this.companyForm.get('tripExpencesRateType').disable();
		this.companyForm.get('tripExpencesTypePrice').disable();
	}

	enableTripExpencesControl() {
		this.companyForm.get('tripExpencesRateType').enable();
		this.companyForm.get('tripExpencesTypePrice').enable();
		this.companyForm.get('tripExpencesDistance').enable();
	}

	clickOnSettingRow(setting: Setting) {
		this.selectedSetting = setting;
		this.settingForm.patchValue(setting);
	}

	clickOnOptionRow(option: Option) {
		const data = { ...option };
		data.categories = option.categories
			.map(categoy => {
				const value = !!this.company.categories.find(res => res === categoy);
				return { [categoy]: value };
			})
			.reduce((acc, val) => {
				return { ...acc, ...val };
			}, {});
		// @ts-ignore
		this.selectedOption = data;
		this.optionForm.patchValue(this.selectedOption);
	}

	onDeleteSetting(setting: Setting) {
		if (confirm(this.translateService.instant('are you sure ?'))) {
			this.settingService.deleteSetting(this.company.id, setting.id, this.currentEmail).subscribe(res => {
				this.selectedSetting = null;
				this.companyService.findCompanyByEmail(this.currentEmail).subscribe(ress => {
					this.company = ress;
					if (this.company.settings) {
						this.SETTINGS_DATA = this.company.settings;
						this.company.settings.length > 0 ? (this.settingsValid = true) : (this.settingsValid = false);
					} else {
						this.SETTINGS_DATA = [];
						this.companyForm.value.periodeVariation
							? (this.settingsValid = false)
							: (this.settingsValid = true);
					}
					this.resetSettingForm();
				});
			});
		}
	}

	onDeleteOption(option: Option) {
		if (confirm(this.translateService.instant('are you sure ?'))) {
			this.optionService.deleteOption(this.company.id, option.id, this.currentEmail).subscribe(res => {
				this.selectedOption = null;
				this.companyService.findCompanyByEmail(this.currentEmail).subscribe(ress => {
					this.company = ress;
					if (this.company.options) {
						this.OPTIONS_DATA = this.company.options;
						this.company.options.length > 0 ? (this.optionsValid = true) : (this.optionsValid = false);
					} else {
						this.OPTIONS_DATA = [];
						this.companyForm.value.optionsProposed
							? (this.optionsValid = false)
							: (this.optionsValid = true);
					}
					this.resetOptionForm();
				});
			});
		}
	}

	onIncrementValue(event: Event, valueOfChange: string) {
		event.preventDefault();
		switch (valueOfChange) {
			case 'weekendVariationPercentage':
				this.companyForm
					.get('weekendVariationPercentage')
					.setValue(this.companyForm.get('weekendVariationPercentage').value + 1);
				break;
			case 'increaseWeek':
				this.settingForm.get('increaseWeek').setValue(this.settingForm.get('increaseWeek').value + 1);
				break;
			case 'increaseWeekend':
				this.settingForm.get('increaseWeekend').setValue(this.settingForm.get('increaseWeekend').value + 1);
				break;
			case 'optionRate':
				this.optionForm.get('optionRate').setValue(this.optionForm.get('optionRate').value + 1);
				break;
			case 'tripExpencesDistance':
				this.companyForm
					.get('tripExpencesDistance')
					.setValue(this.companyForm.get('tripExpencesDistance').value + 1);
				break;
			case 'tripExpencesTypePrice':
				this.companyForm
					.get('tripExpencesTypePrice')
					.setValue(this.companyForm.get('tripExpencesTypePrice').value + 1);
				break;
			case 'suppHoursRate':
				this.companyForm.get('suppHoursRate').setValue(this.companyForm.get('suppHoursRate').value + 1);
				break;
			default:
				break;
		}
	}

	onDecrementValue(event: Event, valueOfChange: string) {
		event.preventDefault();
		switch (valueOfChange) {
			case 'weekendVariationPercentage':
				if (parseInt(this.companyForm.get('weekendVariationPercentage').value, 10) > 0) {
					this.companyForm
						.get('weekendVariationPercentage')
						.setValue(this.companyForm.get('weekendVariationPercentage').value - 1);
				}
				break;
			case 'tripExpencesDistance':
				if (parseInt(this.companyForm.get('tripExpencesDistance').value, 10) > 0) {
					this.companyForm
						.get('tripExpencesDistance')
						.setValue(this.companyForm.get('tripExpencesDistance').value - 1);
				}
				break;
			case 'tripExpencesTypePrice':
				if (parseInt(this.companyForm.get('tripExpencesTypePrice').value, 10) > 0) {
					this.companyForm
						.get('tripExpencesTypePrice')
						.setValue(this.companyForm.get('tripExpencesTypePrice').value - 1);
				}
				break;
			case 'suppHoursRate':
				if (parseInt(this.companyForm.get('suppHoursRate').value, 10) > 0) {
					this.companyForm.get('suppHoursRate').setValue(this.companyForm.get('suppHoursRate').value - 1);
				}
				break;
			case 'increaseWeek':
				if (parseInt(this.settingForm.get('increaseWeek').value, 10) > 0) {
					this.settingForm.get('increaseWeek').setValue(this.settingForm.get('increaseWeek').value - 1);
				}
				break;
			case 'increaseWeekend':
				if (parseInt(this.settingForm.get('increaseWeekend').value, 10) > 0) {
					this.settingForm.get('increaseWeekend').setValue(this.settingForm.get('increaseWeekend').value - 1);
				}
				break;
			case 'optionRate':
				if (parseInt(this.optionForm.get('optionRate').value, 10) > 0) {
					this.optionForm.get('optionRate').setValue(this.optionForm.get('optionRate').value - 1);
				}
				break;
			default:
				break;
		}
	}

	OnSaveSetting(event: Event) {
		this.settingForm.markAsUntouched();
		event.preventDefault();
		console.log({ selectedSetting: this.selectedSetting });
		if (this.selectedSetting) {
			Object.assign(this.selectedSetting, this.settingForm.getRawValue());
			console.log({ selectedSetting2: this.selectedSetting });
			this.settingService
				.putSetting(this.company.id, this.selectedSetting.id, this.currentEmail, this.selectedSetting)
				.subscribe(res => {
					if (res) {
						this.companyService.findCompanyByEmail(this.currentEmail).subscribe(ress => {
							this.company = ress;
							this.SETTINGS_DATA = this.company.settings;
							this.selectedSetting = null;
							this.resetSettingForm();
						});
					}
				});
		} else {
			const settingData = this.settingForm.getRawValue();
			console.log(settingData);
			this.settingService.postSetting(this.company.id, this.currentEmail, settingData).subscribe(res => {
				if (res) {
					this.companyService.findCompanyByEmail(this.currentEmail).subscribe(ress => {
						this.company = ress;
						this.SETTINGS_DATA = this.company.settings;
						this.resetSettingForm();
					});
					this.settingsValid = true;
				}
			});
		}
	}

	OnSaveOption(event: Event) {
		event.preventDefault();
		const optionData = this.optionForm.getRawValue();
		optionData.categories = Object.entries(optionData.categories)
			.map(([key, value]) => {
				if (!!value) {
					return key;
				}
			})
			.filter(res => !!res);
		if (this.selectedOption) {
			Object.assign(this.selectedOption, optionData);
			this.optionService
				.putOption(this.company.id, this.selectedOption.id, this.currentEmail, this.selectedOption)
				.subscribe(res => {
					if (res) {
						this.companyService.findCompanyByEmail(this.currentEmail).subscribe(ress => {
							this.company = ress;
							this.OPTIONS_DATA = this.company.options;
							this.resetOptionForm();
							this.selectedOption = null;
						});
					}
				});
		} else {
			this.optionService.postOption(this.company.id, this.currentEmail, optionData).subscribe(res => {
				if (res) {
					this.companyService.findCompanyByEmail(this.currentEmail).subscribe(ress => {
						this.company = ress;
						this.OPTIONS_DATA = this.company.options;
						this.resetOptionForm();
					});
					this.optionsValid = true;
				}
			});
		}
	}

	resetOptionForm() {
		const categoryFormControl = this.optionFormBuilder.group({}, { validator: categoryValidator });
		this.company.categories.map(category => {
			categoryFormControl.addControl(category, this.optionFormBuilder.control(false));
		});
		this.optionForm = this.optionFormBuilder.group({
			name: ['', [Validators.required]],
			description: ['', [Validators.required]],
			feeType: ['', [Validators.required]],
			optionRate: [0, [Validators.required, Validators.min(0)]],
			categories: categoryFormControl
		});
	}

	resetSettingForm() {
		this.settingForm = this.settingFormBuilder.group(
			{
				periodStartDate: [null, [Validators.required]],
				periodEndDate: [null, [Validators.required]],
				increaseWeek: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
				increaseWeekend: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
				autoApplication: [false]
			},
			{ validator: RangeValidator }
		);
	}

	resetCompanyForm() {
		this.companyForm = this.companyFormBuilder.group({
			weekendVariation: [false, [Validators.required]],
			weekendVariationPercentage: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
			periodeVariation: [false, [Validators.required]],
			optionsProposed: [false, [Validators.required]],
			tripExpences: [false, [Validators.required]],
			suppHours: [false, [Validators.required, Validators.min(1)]],
			suppHoursRate: [0, [Validators.required, Validators.min(1)]],
			tripExpencesDistance: [0, [Validators.required, Validators.min(1)]],
			tripExpencesTypePrice: [0, [Validators.required, Validators.min(1)]],
			tripExpencesRateType: [null, [Validators.required]]
		});
		this.companyFormInitValidations();
	}

	private companyFormInitValidations() {
		this.companyForm.get('weekendVariation').valueChanges.subscribe(value => {
			if (value) {
				this.companyForm.get('weekendVariationPercentage').enable();
			} else {
				this.companyForm.get('weekendVariationPercentage').disable();
			}
		});
		this.companyForm.get('periodeVariation').valueChanges.subscribe(value => {
			if (value) {
				this.SETTINGS_DATA.length > 0 ? (this.settingsValid = true) : (this.settingsValid = false);
			} else {
				this.settingsValid = true;
			}
		});
		this.companyForm.get('optionsProposed').valueChanges.subscribe(value => {
			if (value) {
				this.OPTIONS_DATA.length > 0 ? (this.optionsValid = true) : (this.optionsValid = false);
			} else {
				this.optionsValid = true;
			}
		});
		this.companyForm.get('suppHours').valueChanges.subscribe(value => {
			if (value) {
				this.companyForm.get('suppHoursRate').enable();
			} else {
				this.companyForm.get('suppHoursRate').disable();
			}
		});
		this.companyForm.get('tripExpencesRateType').valueChanges.subscribe(value => {
			if (value === this.tripFeeType.FEE_PER_KM) {
				this.companyForm.get('tripExpencesDistance').enable();
			} else {
				this.companyForm.get('tripExpencesDistance').disable();
			}
		});
		this.companyForm.get('tripExpences').valueChanges.subscribe(value => {
			if (value) {
				this.companyForm.get('tripExpencesTypePrice').enable();
				this.companyForm.get('tripExpencesRateType').enable();
				this.companyForm.get('tripExpencesDistance').enable();
			} else {
				this.companyForm.get('tripExpencesTypePrice').disable();
				this.companyForm.get('tripExpencesRateType').disable();
				this.companyForm.get('tripExpencesDistance').disable();
			}
		});
	}

	private patchCompany() {
		const formData = new FormData();
		/*Object.assign(this.company, this.companyForm.getRawValue());*/
		const values = this.companyForm.value;
		this.company = { ...this.company, ...values };
		Object.entries(this.company).map(([key, value]) => {
			if (key === 'dynamiqueQts') {
				formData.append(key, JSON.stringify(value));
			} else if (Array.isArray(value)) {
				value.map(data => {
					formData.append(key, data);
				});
			} else if (key === 'questions') {
				formData.append(key, JSON.stringify(value));
			} else if (key === 'location') {
				formData.append(key, JSON.stringify(value));
			} else {
				formData.append(key, value as string);
			}
		});
		this.companyService.putCompany(this.company.id, this.currentEmail, formData).subscribe(res => {
			const msg = this.translateService.instant('request succeeded');
			this.toastrService.success(msg);
			this.cd.detectChanges();
			if (this.authStore.getUser().role === 'provider') {
				this.router.navigate([`/user/${this.currentEmail}/edit/company-billing`]);
			}
			if (this.authStore.getUser().role === 'admin') {
				this.router.navigate([
					`/administration/${this.authStore.getUser().email}/company-admin/${
						this.currentEmail
					}/edit/company-billing`
				]);
			}
		});
	}

	formSubmitted() {
		const formIsValid: boolean = this.companyForm.valid;
		if (formIsValid) {
			this.formWasSubmitted = true;
			this.patchCompany();
			this.updateCurrentStep();
		} else {
			this.dialogService.openErrorDialog('form is not valid');
		}
	}

	@HostListener('window:beforeunload', ['$event'])
	public beforeUnloadHander(event) {
		return this.formWasSubmitted;
	}

	/*  	@HostListener('window:unload', ['$event'])
  	public unloadHander(event) {
    	if (!this.formWasSubmitted) {
      	this.authService.logout();
    	}
  	}*/
}
