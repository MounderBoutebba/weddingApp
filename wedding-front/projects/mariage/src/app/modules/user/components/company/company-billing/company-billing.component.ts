import { Component, OnInit, ChangeDetectorRef, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { BillingService } from '../../../services/billing.service';
import { CompanyBilling, CondRefundDepositType, CondRefundDepositCause } from '../../../models/companyBilling.model';
import { Company } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStore } from '../../../../store/auth';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from 'projects/mariage/src/app/core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from '../../../services/dialog.service';
import { filter } from 'rxjs/operators';
@Component({
	selector: 'app-company-billing',
	templateUrl: './company-billing.component.html',
	styleUrls: ['./company-billing.component.scss']
})
export class CompanyBillingComponent implements OnInit {
	public billing: CompanyBilling;

	condRefundDepositType = CondRefundDepositType;
	condRefundDepositCause = CondRefundDepositCause;

	currentCompany: Company;
	currentUserEmail: string;
	selected = '';
	color = 'primary';
	checked = false;
	disabled = false;
	generalForm: FormGroup;
	display = false;
	subscription: Subscription;
	formWasSubmitted = false;
	percentCriterai1 = false;
	percentCriterai2 = false;
	percentCriterai3 = false;
	iban: string;

	constructor(
		private billingService: BillingService,
		private companyService: CompanyService,
		private billingFormBuilder: FormBuilder,
		private readonly route: ActivatedRoute,
		private changeDetector: ChangeDetectorRef,
		private authStore: AuthStore,
		private readonly authService: AuthService,
		private readonly toastrService: ToastrService,
		private readonly dialogService: DialogService,
		private readonly translateService: TranslateService,
		@Inject(PLATFORM_ID) private readonly platformId: object,
		private readonly router: Router
	) {}

	ngOnInit() {
		this.currentUserEmail = this.route.snapshot.paramMap.get('email');
		this.constructGeneralForm();
		this.companyService.findCompanyByEmail(this.currentUserEmail).subscribe(res => {
			this.currentCompany = res;
			try {
				this.subscription = this.billingService
					.findCompanyBilling(this.currentCompany.id, this.currentUserEmail)
					.subscribe(billing => {
						if (billing) {
							this.initGeneralForm(billing);
							this.display = true;
						}
						this.display = true;
					});
			} catch (error) {
				this.display = false;
				this.subscription.unsubscribe();
			}
		});
		this.getAccount(this.currentUserEmail);
	}
	public getAccount(email: string) {
		this.companyService.getBankInfo(email).subscribe(bankInfo => {
			this.iban = bankInfo.last4;
		});
	}
	formatInternationalPhoneNumber(countryCode: string, phone: string): string {
		return `${countryCode}${phone[0] === '0' ? phone.substring(1) : phone}`;
	}
	openPaymentInfoDialog() {
		console.log('company', this.currentCompany);
		if (this.currentCompany.user.phoneVerified) {
			this.dialogService
				.openPaymentInfoDialog(
					this.currentCompany.location,
					{
						firstname: this.currentCompany.user.firstname,
						lastname: this.currentCompany.user.lastname,
						email: this.currentCompany.user.email,
						phone: this.formatInternationalPhoneNumber(
							this.currentCompany.user.phone.country,
							this.currentCompany.user.phone.phoneNumber
						)
					},
					this.currentCompany.name
				)
				.pipe(filter(result => !!result.save && !!result.data))
				.subscribe(res => {
					console.log('data', res.data);
				});
		} else {
			console.log('stp verifié votre numéro téléphone');
		}
	}
	private updateCurrentStep() {
		const currentEmail = this.route.snapshot.paramMap.get('email');
		this.companyService.findCompanyByEmail(currentEmail).subscribe(company => {
			company.currentStep = 'company-billing';
			this.companyService.updateCurrentStep(company.id, currentEmail, company).subscribe(res => {});
		});
	}

	constructGeneralForm() {
		this.generalForm = this.billingFormBuilder.group({
			paymentSecure: [null, [Validators.required]],
			depositPayment: [null, [Validators.required]],
			depositPercentage: [null, [Validators.required]],
			condRefundDepositClient: [null, [Validators.required]],
			condRefundDepositClientCause: [null, [Validators.required]],
			percentageRefundDepositClient: [null, [Validators.required]],
			condRefundDepositCompany: [null, [Validators.required]],
			condRefundDepositCompanyCause: [null, [Validators.required]],
			percentageRefundDepositCompany: [null, [Validators.required]]
		});
	}

	initGeneralForm(billing) {
		if (billing.paymentSecure) {
			this.generalForm.reset();
			this.generalForm.get('paymentSecure').setValue(billing.paymentSecure);
			this.onTogglePaymentSecure({ checked: true });
		}
		if (billing.depositPayment) {
			this.onTogglePaymentSecure({ checked: false });
			this.generalForm.patchValue(billing);
			this.generalForm.value.condRefundDepositClient === this.condRefundDepositType.SYSTEMATIC_REFUND
				? this.generalForm.get('condRefundDepositClientCause').disable()
				: this.generalForm.get('condRefundDepositClientCause').setValue(billing.condRefundDepositClientCause);
			this.generalForm.value.condRefundDepositCompany === this.condRefundDepositType.SYSTEMATIC_REFUND
				? this.generalForm.get('condRefundDepositCompanyCause').disable()
				: this.generalForm.get('condRefundDepositCompanyCause').setValue(billing.condRefundDepositCompanyCause);
		}
	}

	ngAfterViewChecked() {
		this.changeDetector.detectChanges();
	}

	saveBilling() {
		this.billing = this.generalForm.getRawValue();
		if (this.currentCompany.billing) {
			this.billingService
				.putCompanyBilling(
					this.currentCompany.billing.id,
					this.currentCompany.id,
					this.currentUserEmail,
					this.billing
				)
				.subscribe(res => {
					this.redirectToAdminPanel();
				});
		} else {
			this.billingService
				.postCompanyBilling(this.currentCompany.id, this.currentUserEmail, this.billing)
				.subscribe(res => {
					this.redirectToAdminPanel();
				});
		}
	}

	redirectToAdminPanel() {
		if (this.authStore.getUser().role === 'admin') {
			this.router.navigate([`/administration/${this.authStore.getUser().email}/`]);
			return;
		}
		if (this.authStore.getUser().role === 'provider') {
			this.router.navigate([`/user/${this.authStore.getUser().email}/sucess-company-creation`]);
		}
		return;
	}

	onTogglePaymentSecure(event) {
		if (!event.checked) {
			this.generalForm.get('paymentSecure').setValue(false);
			this.generalForm.get('depositPayment').setValue(true);
			this.generalForm.controls.depositPercentage.enable();
			this.generalForm.controls.condRefundDepositClient.enable();
			this.generalForm.controls.condRefundDepositClientCause.enable();
			this.generalForm.controls.percentageRefundDepositClient.enable();
			this.generalForm.controls.condRefundDepositCompany.enable();
			this.generalForm.controls.condRefundDepositCompanyCause.enable();
			this.generalForm.controls.percentageRefundDepositCompany.enable();
		}
		if (event.checked) {
			this.generalForm.reset();
			this.generalForm.get('paymentSecure').setValue(true);
			this.generalForm.get('depositPayment').setValue(false);
			this.generalForm.controls.depositPercentage.disable();
			this.generalForm.controls.condRefundDepositClient.disable();
			this.generalForm.controls.condRefundDepositClientCause.disable();
			this.generalForm.controls.percentageRefundDepositClient.disable();
			this.generalForm.controls.condRefundDepositCompany.disable();
			this.generalForm.controls.condRefundDepositCompanyCause.disable();
			this.generalForm.controls.percentageRefundDepositCompany.disable();
		}
	}

	onChangeRepaymentMethod(event, value: string) {
		if (value === 'client') {
			if (event.value === CondRefundDepositType.CONDITIONAL_REFUND) {
				this.generalForm.controls.condRefundDepositClientCause.enable();
			} else {
				this.generalForm.controls.condRefundDepositClientCause.disable();
			}
		}
		if (value === 'pro') {
			if (event.value === CondRefundDepositType.CONDITIONAL_REFUND) {
				this.generalForm.controls.condRefundDepositCompanyCause.enable();
			} else {
				this.generalForm.controls.condRefundDepositCompanyCause.disable();
			}
		}
	}

	formSubmitted() {
		const formIsValid: boolean = this.generalForm.valid;
		if (formIsValid) {
			this.formWasSubmitted = true;
			this.saveBilling();
			this.updateCurrentStep();
		} else {
			this.dialogService.openErrorDialog('form is not valid');
		}
	}

	public canDeactivate(): Observable<boolean> | boolean {
		if (isPlatformBrowser(this.platformId)) {
			if (!this.formWasSubmitted) {
				return of(confirm(this.translateService.instant('are you sure !')));
			}
		}
		return of(true);
	}

	@HostListener('window:beforeunload', ['$event'])
	public beforeUnloadHander(event) {
		return this.formWasSubmitted;
	}

	openModalAddInfoBank() {
		// to do
	}

	/*  @HostListener('window:unload', ['$event'])
  public unloadHander(event) {
    if (!this.formWasSubmitted) {
      // this.authService.logout();
    }
  }*/
}
