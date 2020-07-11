import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/auth.service';
import { UserService } from '../../services/user.service';
import { WeddingService } from '../../services/wedding.service';
import { AuthStore } from '../../../store/auth';
import { map } from 'rxjs/operators';
import { Wedding } from '../../models/wedding.model';
import { CustomValidators } from 'ngx-custom-validators';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-wedding-info',
	templateUrl: './wedding-info.component.html',
	styleUrls: ['./wedding-info.component.scss']
})
export class WeddingInfoComponent implements OnInit, OnDestroy {
	public weddingForm: FormGroup;
	public wedding: Wedding;
	public minDate: Date = new Date();
	public isHandset$: Observable<boolean> = this.breakpointObserver
		.observe([Breakpoints.Handset, Breakpoints.Small])
		.pipe(map(result => result.matches));

	ngOnInit() {
		this.route.data.pipe(map(data => data.wedding)).subscribe(data => {
			this.wedding = data;
		});
		this.initForm();
	}

	constructor(
		private readonly fb: FormBuilder,
		private readonly route: ActivatedRoute,
		private readonly toastrService: ToastrService,
		private readonly authService: AuthService,
		private readonly authStore: AuthStore,
		private readonly userService: UserService,
		private readonly weddingService: WeddingService,
		private readonly translateService: TranslateService,
		private breakpointObserver: BreakpointObserver,
		@Inject(PLATFORM_ID) private readonly platformId: object
	) {
		this.minDate.setDate(this.minDate.getDate() + 1);
	}

	public onSubmit() {
		const date = new Date(this.weddingForm.value.date);
		date.setHours(12);
		this.weddingForm.get('date').setValue(date.toJSON());
		console.log(this.weddingForm.getRawValue());
		if (this.weddingForm.valid) {
			const email = this.route.snapshot.paramMap.get('email');
			if (!this.wedding.id) {
				this.weddingService.createWedding(email, this.weddingForm.getRawValue()).subscribe(res => {
					this.wedding = res;
					this.weddingForm.get('phoneToken').reset();
					this.toastrService.success(this.translateService.instant('successfully completed'));
				});
			} else {
				this.weddingService
					.patchWedding(this.wedding.id, email, this.weddingForm.getRawValue())
					.subscribe(res => {
						this.wedding = res;
						this.weddingForm.get('phoneToken').reset();
						this.toastrService.success(this.translateService.instant('successfully completed'));
					});
			}
		}
	}

	ngOnDestroy(): void {}

	private initForm() {
		this.weddingForm = this.fb.group({
			phoneToken: [null, Validators.compose([CustomValidators.number])],
			date: [this.wedding.date, Validators.compose([Validators.required, CustomValidators.date])],
			budget: [
				this.wedding.budget,
				Validators.compose([Validators.required, Validators.min(100), CustomValidators.number])
			],
			guestsNumber: [
				this.wedding.guestsNumber,
				Validators.compose([Validators.required, CustomValidators.number])
			],
			conjointFirstname: [
				this.wedding.conjointFirstname,
				Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(127)])
			],
			conjointLastname: [
				this.wedding.conjointLastname,
				Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(127)])
			],
			conjointEmail: [
				this.wedding.conjointEmail,
				Validators.compose([Validators.required, CustomValidators.email])
			],
			conjointPhone: this.fb.group({
				country: [
					{
						value: this.wedding.conjointPhone.country,
						disabled: !!this.wedding.phoneToken || this.wedding.phoneVerified
					},
					Validators.compose([Validators.required])
				],
				phoneNumber: [
					{
						value: this.wedding.conjointPhone.phoneNumber,
						disabled: !!this.wedding.phoneToken || this.wedding.phoneVerified
					},
					Validators.compose([Validators.required, CustomValidators.number])
				]
			}),
			location: this.fb.group({
				address: [
					this.wedding.location && this.wedding.location.address ? this.wedding.location.address : '',
					Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(127)])
				],
				lng: [
					this.wedding.location && this.wedding.location.lng ? this.wedding.location.lng : null,
					Validators.compose([Validators.required])
				],
				lat: [
					this.wedding.location && this.wedding.location.lat ? this.wedding.location.lat : null,
					Validators.compose([Validators.required])
				]
			})
		});
	}

	get location() {
		return this.weddingForm.get('location') as FormGroup;
	}

	onAutocompleteSelected(result: any) {
		this.location.setValue({
			address: result.formatted_address,
			lat: result.geometry.location.lat(),
			lng: result.geometry.location.lng()
		});
	}

	public async clearLocation() {
		this.location.reset();
	}
}
