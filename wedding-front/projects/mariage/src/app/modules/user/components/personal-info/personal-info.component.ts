import {
	AfterViewInit,
	Component,
	ElementRef,
	HostListener,
	Inject,
	OnDestroy,
	OnInit,
	PLATFORM_ID,
	ViewChild,
	ViewChildren,
	ViewEncapsulation
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, map, startWith } from 'rxjs/operators';
import { Observable, of, Subscription, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/auth.service';
import { UserService } from '../../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { CustomValidators } from 'ngx-custom-validators';
import { AuthStore } from '../../../store/auth';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../../services/dialog.service';

declare var imageCompression: any;
declare var google: any;

export interface Country {
	flag: string;
	name: string;
	phoneCode: string;
}

@Component({
	selector: 'app-personal-info',
	templateUrl: './personal-info.component.html',
	styleUrls: ['./personal-info.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class PersonalInfoComponent implements OnInit, OnDestroy, AfterViewInit {
	@ViewChild('autocompleteaddr') autocompleteAddr: ElementRef<HTMLElement>;
	public userForm: FormGroup;

	public userSubscription: Subscription;
	public user: User;
	public previewImage = this.authStore.getPhoto();
	public showConfirmButton = false;
	public showValidateButton = false;
	public countries: any[];
	public currentCountryFlag: string;
	public dataLoaded = false;

	filteredCountries: Observable<any[]>;

	constructor(
		private readonly fb: FormBuilder,
		private readonly route: ActivatedRoute,
		private readonly toastrService: ToastrService,
		private readonly authService: AuthService,
		private readonly authStore: AuthStore,
		private readonly dialogService: DialogService,
		private readonly userService: UserService,
		private readonly translateService: TranslateService,
		private readonly router: Router,
		@Inject(PLATFORM_ID) private readonly platformId: object
	) {}

	ngOnInit() {
		this.userSubscription = this.route.data.pipe(map(data => data.user)).subscribe(user => {
			this.user = user;
			this.initForm();
			this.initCountriesList();
			this.dataLoaded = true;
		});
	}

	initForm() {
		this.userForm = this.fb.group({
			firstname: [
				this.user.firstname,
				Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(127)])
			],
			lastname: [
				this.user.lastname,
				Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(127)])
			],
			email: [{ value: this.user.email, disabled: true }, Validators.compose([Validators.required])],
			phoneToken: [null, Validators.compose([CustomValidators.number])],
			phone: this.fb.group({
				country: [
					{
						value: this.user.phone && this.user.phone.country ? this.user.phone.country : '+33',
						disabled: !!this.user.phone && !!this.user.phone.country
					},
					Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(4)])
				],
				phoneNumber: [
					{
						value: this.user.phone && this.user.phone.phoneNumber ? this.user.phone.phoneNumber : null,
						disabled: !!this.user.phone && !!this.user.phone.phoneNumber
					},
					Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])
				]
			}),
			languages: this.fb.array([]),
			location: this.fb.group({
				address: [
					this.user.location && this.user.location.address ? this.user.location.address : '',
					Validators.compose([Validators.minLength(2), Validators.maxLength(127)])
				],
				lng: [
					this.user.location && this.user.location.lng ? this.user.location.lng : null,
					Validators.compose([Validators.minLength(2), Validators.maxLength(127)])
				],
				lat: [
					this.user.location && this.user.location.lat ? this.user.location.lat : null,
					Validators.compose([Validators.minLength(2), Validators.maxLength(127)])
				]
			})
		});

		if (this.user.languages && this.user.languages.length > 0) {
			this.user.languages.map(res => {
				this.languages.push(
					this.fb.control(res, Validators.compose([Validators.minLength(3), Validators.maxLength(255)]))
				);
			});
		} else if (this.user.role === 'provider') {
			this.addLanguage();
		}
	}

	public onSubmit() {
		if (this.userForm.valid) {
			this.showConfirmButton = false;
			this.userForm
				.get('phone')
				.get('phoneNumber')
				.disable();
			this.userForm
				.get('phone')
				.get('country')
				.disable();
			this.patchCompany();
			// tslint:disable-next-line:max-line-length
			const url = !!this.authStore.getCategory()
				? `/user/${this.authStore.getUser().email}/edit/company-details/${this.authStore.getCategory()}`
				: `/user/${this.authStore.getUser().email}/edit/company`;
			//  this.router.navigateByUrl(url);
		}
	}

	private patchCompany(): void {
		const user = this.userForm.getRawValue();
		user.firstname = user.firstname.charAt(0).toUpperCase() + user.firstname.substr(1).toLowerCase();
		user.lastname = user.lastname.charAt(0).toUpperCase() + user.lastname.substr(1).toLowerCase();
		this.userService
			.patchUser(this.user.email, user)
			.pipe(
				catchError(err => {
					if (err instanceof HttpErrorResponse) {
						if (err.status === 400) {
							this.toastrService.error(
								this.translateService.instant(
									`can't send verification code, try again or try with a different number`
								)
							);
						}
					}
					return throwError(err);
				})
			)
			.subscribe(res => {
				this.user = res;
				this.userService.emit(this.user);
				this.userForm.get('phoneToken').reset();
				this.toastrService.success(this.translateService.instant('successfully completed'));
			});
	}

	public canDeactivate(): Observable<boolean> | boolean {
		if (isPlatformBrowser(this.platformId)) {
			if (
				!(
					this.user.firstname &&
					this.user.lastname &&
					this.user.phoneVerified &&
					this.user.location &&
					this.user.location.address
				)
			) {
				return this.dialogService.openConfirmDialog();
			}
		}
		return of(true);
	}

	@HostListener('window:beforeunload', ['$event'])
	public beforeUnloadHander(event) {
		return (
			this.user.firstname &&
			this.user.lastname &&
			this.user.phoneVerified &&
			this.user.location &&
			this.user.location.address
		);
	}

	/*  @HostListener('window:unload', ['$event'])
    public unloadHander(event) {
      if (
        !(this.user.firstname &&
          this.user.lastname &&
          this.user.phoneVerified &&
          (this.user.location && this.user.location.address))
      ) {
        // this.authService.logout();
      }
    }*/

	ngOnDestroy(): void {
		this.userSubscription.unsubscribe();
	}

	get location() {
		return this.userForm.get('location') as FormGroup;
	}

	onAutocompleteSelected(result: any) {
		this.location.setValue({
			address: result.formatted_address,
			lat: result.geometry.location.lat(),
			lng: result.geometry.location.lng()
		});
	}

	public getPlaceAutocomplete() {}

	ngAfterViewInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			const autocomplete = new google.maps.places.Autocomplete(this.autocompleteAddr.nativeElement, {
				types: ['address']
			});
			google.maps.event.addListener(autocomplete, 'place_changed', () => {
				const place = autocomplete.getPlace();
				this.onAutocompleteSelected(place);
			});
		}
	}

	get languages() {
		return this.userForm.get('languages') as FormArray;
	}

	public addLanguage() {
		this.languages.push(
			this.fb.control('', Validators.compose([Validators.minLength(3), Validators.maxLength(255)]))
		);
	}

	public removeLanguage(i: number) {
		if (this.languages.length > 1) {
			this.languages.removeAt(i);
		}
	}

	public onFileChange(event) {
		if (event.target.files && event.target.files.length) {
			const file = event.target.files[0];
			const options = {
				maxSizeMB: 0.3,
				maxWidthOrHeight: 1024,
				useWebWorker: true,
				maxIteration: 12
			};
			const formData = new FormData();
			imageCompression(file, options).then(res => {
				const f = new File([res], res.name);
				formData.append('photo', f);
				this.userService
					.changeProfilePhoto(this.user.email, formData)
					.pipe(
						catchError(err => {
							if (err instanceof HttpErrorResponse) {
								if (err.status === 413) {
									this.toastrService.warning(
										this.translateService.instant('the maximum size of the profile picture is 2 MB')
									);
								}
							}
							return throwError(err);
						})
					)
					.subscribe(res => {
						this.user = res;
						this.authStore.setPhoto('/api/' + res.photo);
						this.toastrService.success(this.translateService.instant('successfully completed'));
					});
			});
		}
	}

	public resend() {
		if (this.userForm.get('phoneToken').valid && this.userForm.get('phone').pristine) {
			this.userService
				.patchUser(this.user.email, {
					phone: this.userForm.get('phone').value
				})
				.subscribe(res => {
					this.user = res;
					this.userForm.get('phoneToken').reset();
					if (res.phoneTokenRequestCount >= 6) {
						this.toastrService.warning(this.translateService.instant('you have requested too much codes'));
					}
					this.toastrService.success(this.translateService.instant('successfully completed'));
				});
		} else {
			this.toastrService.warning(this.translateService.instant('save your phone number first'));
		}
	}

	public modifyNum() {
		this.userForm
			.get('phone')
			.get('phoneNumber')
			.enable();
		this.userForm
			.get('phone')
			.get('country')
			.enable();
		this.showConfirmButton = true;
	}

	public validateNumber() {
		if (this.userForm.get('phoneToken').value === this.user.phoneToken) {
			this.onSubmit();
		} else {
			this.toastrService.error(this.translateService.instant('invalid code'));
		}
	}

	async initCountriesList() {
		const res = await fetch('/assets/files/countries.json');
		this.countries = await res.json();
		await this.initCurrentCountrySourceFlag(this.user.phone.country);
		this.filteredCountries = await this.userForm
			.get('phone')
			.get('country')
			.valueChanges.pipe(
				startWith(''),
				map(country => (country ? this._filterCountries(country) : this.countries.slice()))
			);
	}

	private _filterCountries(value: string): Country[] {
		const filterValue = value.toLowerCase();
		// tslint:disable-next-line: max-line-length
		return this.countries.filter(
			country =>
				country.name.toLowerCase().indexOf(filterValue) === 0 || country.phoneCode.indexOf(filterValue) === 0
		);
	}

	initCurrentCountrySourceFlag(code: string) {
		if (this.countries) {
			let currentCountry = this.countries.filter(x => x.phoneCode === code);
			if (currentCountry) {
				if (currentCountry.length > 0) {
					this.currentCountryFlag = currentCountry[0].flag;
					return currentCountry[0].flag;
				}
			} else if (this.user.phone.country) {
				currentCountry = this.countries.filter(x => x.phoneCode === this.user.phone.country);
				return currentCountry[0].flag;
			}
		}
		return null;
	}

	public cancel(): void {
		if (!!this.user.phone && !!this.user.phone.phoneNumber) {
			const tel = this.user.phone && this.user.phone.phoneNumber;
			this.userForm.patchValue({ phone: { phoneNumber: tel } });
			this.userForm
				.get('phone')
				.get('phoneNumber')
				.disable();
		}
		if (!!this.user.phone && !!this.user.phone.country) {
			const code = this.user.phone && this.user.phone.country;
			this.userForm.patchValue({ phone: { country: code } });
			this.userForm
				.get('phone')
				.get('country')
				.disable();
		}
		this.showConfirmButton = false;
	}

	deleteAccount() {
		if (confirm(this.translateService.instant('are you sure ?'))) {
			this.userService.deleteUser(this.user.email).subscribe(res => {
				this.authService.logout();
			});
		}
	}
}
