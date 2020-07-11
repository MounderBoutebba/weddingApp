import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ElementRef,
	HostListener,
	Inject,
	OnDestroy,
	OnInit,
	PLATFORM_ID,
	ViewChild
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../../core/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { CompanyService } from '../../../services/company.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Company } from '../../../models/company.model';
import { CompanyImage } from '../../../models/companyImage.model';
import { Observable, of, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { CategoryLabelEnum } from '../company-details/category-label.enum';
import { AuthStore } from '../../../../store/auth';
import { CustomValidators } from 'ngx-custom-validators';
import { ServicesService } from '../../../../category/services/services.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { DialogService } from '../../../services/dialog.service';

declare var imageCompression: any;
declare var google: any;

@Component({
	selector: 'app-company-info',
	templateUrl: './company-info.component.html',
	styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit, OnDestroy, AfterViewInit {
	@ViewChild('autocompleteaddr') autocompleteAddr: ElementRef<HTMLElement>;
	public companyForm: FormGroup;
	public user: User;
	public companyInfo: Company;
	public previewImages: any[] = [];
	public categoryLabelEnum = CategoryLabelEnum;
	public hasCategories: boolean;
	public showMoreQts = false;

	public searchData = [
		//  Music
		{
			name: this.translateService.instant('Dj'),
			value: CategoryLabelEnum.DJ,
			group: this.translateService.instant('music')
		},
		{
			name: this.translateService.instant('musician'),
			value: CategoryLabelEnum.MUSICIEN,
			group: this.translateService.instant('music')
		},
		{
			name: this.translateService.instant('band'),
			value: CategoryLabelEnum.GROUPE,
			group: this.translateService.instant('music')
		},
		// Animator
		// tslint:disable-next-line:max-line-length
		{
			name: this.translateService.instant('adult animator'),
			value: CategoryLabelEnum.ANIMATEUR_ADULTS,
			group: this.translateService.instant('animator')
		},
		// tslint:disable-next-line:max-line-length
		{
			name: this.translateService.instant('kids animator'),
			value: CategoryLabelEnum.ANIMATEUR_ENFANTS,
			group: this.translateService.instant('animator')
		},
		//  Visual
		{
			name: this.translateService.instant('fireworks'),
			value: CategoryLabelEnum.FEU_ARTIFICES,
			group: this.translateService.instant('visual')
		},
		{
			name: this.translateService.instant('release'),
			value: CategoryLabelEnum.LACHERS,
			group: this.translateService.instant('visual')
		},
		//  Reception
		{
			name: this.translateService.instant('place'),
			value: CategoryLabelEnum.LIEU,
			group: this.translateService.instant('reception')
		},
		// tslint:disable-next-line:max-line-length
		{
			name: this.translateService.instant('caterer'),
			value: CategoryLabelEnum.TRAITEUR,
			group: this.translateService.instant('reception')
		},
		// tslint:disable-next-line:max-line-length
		{
			name: this.translateService.instant('cake'),
			value: CategoryLabelEnum.GATEAU_MARIAGE,
			group: this.translateService.instant('reception')
		},
		//  Memories
		{
			name: this.translateService.instant('photographer'),
			value: CategoryLabelEnum.PHOTOGRAPHE,
			group: this.translateService.instant('memories')
		},
		{
			name: this.translateService.instant('videographer'),
			value: CategoryLabelEnum.VIDEALISTE,
			group: this.translateService.instant('memories')
		},
		//  Beauty
		{
			name: this.translateService.instant('barber'),
			value: CategoryLabelEnum.COIFFURE,
			group: this.translateService.instant('beauty')
		},
		{
			name: this.translateService.instant('makeup'),
			value: CategoryLabelEnum.MAQUILLAGE,
			group: this.translateService.instant('beauty')
		},
		// tslint:disable-next-line:max-line-length
		{
			name: this.translateService.instant('aesthetic'),
			value: CategoryLabelEnum.ESTHETIQUE,
			group: this.translateService.instant('beauty')
		},
		{
			name: this.translateService.instant('care'),
			value: CategoryLabelEnum.SOIN,
			group: this.translateService.instant('beauty')
		},
		//  Coach
		{
			name: this.translateService.instant('choreography'),
			value: CategoryLabelEnum.CHOREGRAPHE,
			group: this.translateService.instant('coach')
		},
		{
			name: this.translateService.instant('sports coach'),
			value: CategoryLabelEnum.COACH,
			group: this.translateService.instant('coach')
		},
		{
			name: this.translateService.instant('ceremonial officer'),
			value: CategoryLabelEnum.OFFICIANT,
			group: this.translateService.instant('coach')
		},
		//  Decoration
		{
			name: this.translateService.instant('decorator'),
			value: CategoryLabelEnum.DECORATUER,
			group: this.translateService.instant('decoration')
		},
		// tslint:disable-next-line:max-line-length
		{
			name: this.translateService.instant('florist'),
			value: CategoryLabelEnum.FLEURISTE,
			group: this.translateService.instant('decoration')
		},
		//  Guests
		{
			name: this.translateService.instant('accommodation'),
			value: CategoryLabelEnum.HEBERGEMENT,
			group: this.translateService.instant('guests')
		},
		// tslint:disable-next-line:max-line-length
		{
			name: this.translateService.instant('invitations'),
			value: CategoryLabelEnum.FAIRE_PART,
			group: this.translateService.instant('guests')
		},
		//  Transport
		{
			name: this.translateService.instant('car'),
			value: CategoryLabelEnum.VOITURE,
			group: this.translateService.instant('transport')
		},
		{
			name: this.translateService.instant('bus'),
			value: CategoryLabelEnum.BUS,
			group: this.translateService.instant('transport')
		},
		// Honeymoon
		{
			name: this.translateService.instant('honeymoons'),
			value: CategoryLabelEnum.VOYAGE_DE_NOCES,
			group: this.translateService.instant('honeymoon')
		}
	];

	constructor(
		private readonly fb: FormBuilder,
		private readonly route: ActivatedRoute,
		private readonly toastrService: ToastrService,
		private readonly authService: AuthService,
		private readonly authStore: AuthStore,
		private readonly companyService: CompanyService,
		private readonly servicesService: ServicesService,
		private readonly router: Router,
		private readonly dialogService: DialogService,
		private readonly http: HttpClient,
		private readonly sanitizer: DomSanitizer,
		private readonly translateService: TranslateService,
		private matIconRegistry: MatIconRegistry,
		@Inject(PLATFORM_ID) private readonly platformId: object,
		private readonly cd: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.route.data.pipe(map(data => data.company)).subscribe(data => {
			this.companyInfo = data;
			this.companyInfo.images = this.companyInfo.images.map(file => {
				// @ts-ignore
				file.path = this.sanitizer.bypassSecurityTrustResourceUrl(file.path);
				return file;
			});
		});
		this.initForm();
		this.initDynamiqueQts();

		this.updateCurrentStep('company-infos');
		//#region
		this.matIconRegistry.addSvgIcon(
			'custom-delete',
			this.sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/delete.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'picture',
			this.sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/picture.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'star-empty',
			this.sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/star.svg')
		);
		this.matIconRegistry.addSvgIcon(
			'star-full',
			this.sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/svg/star-full.svg')
		);
		//#endregion
		this.hasCategories = this.checkIfHasCategory();
		this.categoryValueChanges();
	}

	checkIfHasCategory(): boolean {
		if (this.companyForm.get('categories').value.length > 1) {
			return true;
		} else {
			return !!this.companyForm.get('categories').value[0];
		}
	}
	categoryValueChanges() {
		this.companyForm.get('categories').valueChanges.subscribe(value => {
			this.hasCategories = this.checkIfHasCategory();
		});
	}
	updateCurrentStep(currentStep: string) {
		const currentEmail = this.route.snapshot.paramMap.get('email');
		return this.companyService.findCompanyByEmail(currentEmail).pipe(
			map(
				company => {
					company.currentStep = currentStep;
					return this.companyService.updateCurrentStep(company.id, currentEmail, company);
				},
				switchMap(() => of(true))
			)
		);
	}

	get files() {
		return this.companyForm.get('files') as FormArray;
	}

	public onSubmit() {
		if (this.companyForm.valid) {
			const formData = new FormData();
			const company = this.companyForm.getRawValue();
			const companyImages = this.companyInfo?.images?.length || 0;
			// @ts-ignore
			this.files.value = !!this.files.value ? this.files.value : [];
			if (Object.values(company.questions).filter(value => !!value).length < 3) {
				const msg = this.translateService.instant('at least answer 3 questions');
				this.toastrService.warning(msg);
			} else if ((this.files.value as []).length + companyImages < 3) {
				this.toastrService.error(this.translateService.instant(`upload at least 3 photos`));
			} else {
				Object.entries(company).map(([key, value]) => {
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
				const email = this.route.snapshot.paramMap.get('email');
				if (!this.companyInfo.id) {
					this.companyService
						.postCompany(email, formData)
						.pipe(
							catchError(err => {
								if (err instanceof HttpErrorResponse) {
									if (err.status === 413) {
										this.toastrService.warning(
											this.translateService.instant('max image size is 2MB')
										);
									}
								}
								return of(err);
							})
						)
						.subscribe(res => {
							this.companyInfo = res;
							const msg = this.translateService.instant('request succeeded');
							this.toastrService.success(msg);
							this.files.setValue([]);
							this.previewImages = [];
							this.updateCurrentStep('company-details')
								.pipe(
									map(currentStepUpdated => {
										if (this.authStore.getUser().role === 'provider') {
											this.authStore.setCategory(this.companyInfo.categories[0]);
											this.router.navigate([
												`/user/${email}/edit/company-details/${this.companyInfo.categories[0]}`
											]);
										}
										if (this.authStore.getUser().role === 'admin') {
											// tslint:disable-next-line: max-line-length
											this.router.navigate([
												`/administration/${
													this.authStore.getUser().email
												}/company-admin/${email}/edit/company-details/${
													this.companyInfo.categories[0]
												}`
											]);
										}
									})
								)
								.subscribe();
						});
				} else {
					this.companyService
						.putCompany(this.companyInfo.id, email, formData)
						.pipe(
							catchError(err => {
								if (err instanceof HttpErrorResponse) {
									if (err.status === 413) {
										this.toastrService.warning(
											this.translateService.instant('max image size is 2MB')
										);
									}
								}
								return throwError(err);
							})
						)
						.subscribe(res => {
							this.companyInfo = res;

							const msg = this.translateService.instant('request succeeded');
							this.toastrService.success(msg);
							this.files.setValue([]);
							this.previewImages = [];
							this.updateCurrentStep('company-details');
							this.cd.detectChanges();
							if (this.authStore.getUser().role === 'provider') {
								this.authStore.setCategory(this.companyInfo.categories[0]);
								this.router.navigate([
									`/user/${email}/edit/company-details/${this.companyInfo.categories[0]}`
								]);
							}
							if (this.authStore.getUser().role === 'admin') {
								this.redirectAccordingToCompanyJobs(email);
							}
						});
				}
			}
		} else {
			this.toastrService.error(this.translateService.instant('invalid form'));
		}
	}

	redirectAccordingToCompanyJobs(email: string) {
		this.servicesService.findByUserId(this.companyInfo.categories[0], email).subscribe(data => {
			if (data) {
				// tslint:disable-next-line: max-line-length
				this.router.navigate([
					`/administration/${this.authStore.getUser().email}/company-admin/${email}/edit/company-details/${
						this.companyInfo.categories[0]
					}`
				]);
			} else {
				this.companyService.postCompanyJobs(email, this.companyInfo).subscribe(data2 => {
					// tslint:disable-next-line: max-line-length
					this.router.navigate([
						`/administration/${
							this.authStore.getUser().email
						}/company-admin/${email}/edit/company-details/${this.companyInfo.categories[0]}`
					]);
				});
			}
		});
	}

	public canDeactivate(): Observable<boolean> | boolean {
		if (isPlatformBrowser(this.platformId)) {
			if (!this.companyInfo.id) {
				return this.dialogService.openConfirmDialog();
			}
		}
		return of(true);
	}

	@HostListener('window:beforeunload', ['$event'])
	public beforeUnloadHander(event) {
		return !!this.companyInfo.id;
	}

	/*	@HostListener('window:unload', ['$event'])
    public unloadHander(event) {
      if (!this.companyInfo.id) {
        //  this.authService.logout();
      }
    }*/

	ngOnDestroy(): void {}

	public addCategory() {
		this.categories.push(
			this.fb.control(
				null,
				Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(127)])
			)
		);
	}

	get categories() {
		return this.companyForm.get('categories') as FormArray;
	}

	public removeCategory(index: number) {
		if (confirm(this.translateService.instant('are you sure ?'))) {
			if (this.categories.length > 1) {
				this.categories.removeAt(index);
			}
		}
	}

	public addLink() {
		const control = this.fb.control(
			'',
			Validators.compose([
				Validators.pattern(
					// tslint:disable-next-line:max-line-length
					'^(?:https?:\\/\\/)?(?:m\\.|www\\.)?(?:youtu\\.be\\/|youtube\\.com\\/(?:embed\\/|v\\/|watch\\?v=|watch\\?.+&v=))((\\w|-){11})(?:\\S+)?$'
				),
				Validators.minLength(0),
				Validators.maxLength(127)
			])
		);
		if (this.links.length < 3) {
			this.links.push(control);
		}
	}

	get links() {
		return this.companyForm.get('links') as FormArray;
	}

	get location() {
		return this.companyForm.get('location') as FormGroup;
	}

	public removeLinks(index: number) {
		if (this.links.length > 1) {
			if (confirm(this.translateService.instant('are you sure ?'))) {
				this.links.removeAt(index);
			}
		}
	}

	public onFileChange(event) {
		if (event.target.files && event.target.files.length) {
			const file = event.target.files;
			const files = Array.from(file).map((res: File) => {
				const reader = new FileReader();
				// @ts-ignore
				reader.readAsDataURL(res);
				reader.onload = () => {
					this.previewImages.push({ src: reader.result });
				};
				const options = {
					maxSizeMB: 0.5,
					maxWidthOrHeight: 1920,
					useWebWorker: true,
					maxIteration: 12
				};
				return imageCompression(res, options).then(result => {
					return new File([result], result.name);
				});
			});
			Promise.all(files).then(images => {
				this.companyForm.patchValue({
					files: [...this.files.value, ...images]
				});
			});
		}
	}

	private initForm() {
		this.companyForm = this.fb.group({
			name: [
				this.companyInfo.name,
				Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(127)])
			],
			description: [
				this.companyInfo.description,
				Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1023)])
			],
			categories: this.fb.array([
				[
					{
						value: null,
						disabled: this.companyInfo?.categories?.length > 0 && this.authStore.getUser().role !== 'admin'
					},
					Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(127)])
				]
			]),
			networks: this.fb.array([]),
			links: this.fb.array([
				[
					'',
					Validators.compose([
						Validators.pattern(
							// tslint:disable-next-line:max-line-length
							'^(?:https?:\\/\\/)?(?:m\\.|www\\.)?(?:youtu\\.be\\/|youtube\\.com\\/(?:embed\\/|v\\/|watch\\?v=|watch\\?.+&v=))((\\w|-){11})(?:\\S+)?$|^$'
						),
						Validators.minLength(0),
						Validators.maxLength(127)
					])
				]
			]),
			location: this.fb.group({
				address: [
					this.companyInfo.location.address,
					Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(127)])
				],
				lng: [
					this.companyInfo.location.lng,
					Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(127)])
				],
				lat: [
					this.companyInfo.location.lat,
					Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(127)])
				]
			}),
			files: [[]],
			dynamiqueQts: this.fb.array([]),
			questions: this.fb.group({
				question1: [
					this.companyInfo.questions.question1,
					Validators.compose([Validators.required, Validators.minLength(3)])
				],
				question2: [this.companyInfo.questions.question2, Validators.compose([Validators.required])],
				question3: [
					this.companyInfo.questions.question3,
					Validators.compose([Validators.required, Validators.minLength(3)])
				]
			})
		});

		if (this.companyInfo.links.length > 0) {
			this.links.clear();
			this.companyInfo.links.map(value => {
				this.links.push(
					this.fb.control(
						value,
						Validators.compose([
							Validators.pattern(
								// tslint:disable-next-line:max-line-length
								'^(?:https?:\\/\\/)?(?:m\\.|www\\.)?(?:youtu\\.be\\/|youtube\\.com\\/(?:embed\\/|v\\/|watch\\?v=|watch\\?.+&v=))((\\w|-){11})(?:\\S+)?$|^$'
							),
							Validators.minLength(0),
							Validators.maxLength(127)
						])
					)
				);
			});
		}

		if (this.companyInfo.categories.length > 0) {
			this.categories.clear();
			this.companyInfo.categories.map(value => {
				this.categories.push(
					this.fb.control(
						{
							value,
							disabled:
								this.companyInfo?.categories?.length > 0 && this.authStore.getUser().role !== 'admin'
						},
						Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(127)])
					)
				);
			});
		}

		if (this.companyInfo.networks && this.companyInfo.networks.length > 0) {
			this.networks.clear();
			this.companyInfo.networks.map(res => {
				this.networks.push(
					this.fb.control(
						res,
						Validators.compose([CustomValidators.url, Validators.minLength(0), Validators.maxLength(255)])
					)
				);
			});
		} else {
			this.addSocial();
		}
	}

	public deleteImage(img: CompanyImage, index: number) {
		if (this.companyInfo.images.length <= 3) {
			this.toastrService.error(this.translateService.instant(`you must have at least 3 pictures`));
		} else {
			if (confirm(this.translateService.instant('are you sure ?'))) {
				const email = this.route.snapshot.paramMap.get('email');
				this.companyService.deleteImage(this.companyInfo.id, email, img.id).subscribe(res => {
					const msg = this.translateService.instant('successfully deleted');
					this.toastrService.success(msg);
					this.companyInfo.images = this.companyInfo.images.filter(imgres => img.id !== imgres.id);
				});
			}
		}
	}

	deleteImageBeforeUpload(i: number) {
		if (confirm(this.translateService.instant('are you sure ?'))) {
			this.previewImages = this.previewImages.filter(value => this.previewImages.indexOf(value) !== i);
			const elements = this.files.value as any[];
			const elms = elements.filter((elm: File) => {
				return elements.indexOf(elm) !== i;
			});
			this.files.setValue(elms);
		}
	}

	public getPlaceAutocomplete() {}

	ngAfterViewInit(): void {
		if (isPlatformBrowser(this.platformId)) {
			const autocomplete = new google.maps.places.Autocomplete(this.autocompleteAddr.nativeElement, {
				types: ['address'] // 'establishment' / 'address' / 'geocode'
			});
			google.maps.event.addListener(autocomplete, 'place_changed', () => {
				const place = autocomplete.getPlace();
				console.log('set location', place);

				this.location.setValue({
					address: place.formatted_address,
					lat: place.geometry.location.lat(),
					lng: place.geometry.location.lng()
				});
			});
		}
	}

	get networks() {
		return this.companyForm.get('networks') as FormArray;
	}

	public addSocial() {
		const control = this.fb.control(
			'',
			Validators.compose([CustomValidators.url, Validators.minLength(0), Validators.maxLength(255)])
		);
		this.networks.push(control);
	}

	public removeSocial(i: number) {
		if (this.networks.length > 1) {
			if (confirm(this.translateService.instant('are you sure ?'))) {
				this.networks.removeAt(i);
			}
		}
	}

	public changeFavorite(image: CompanyImage) {
		const email = this.route.snapshot.paramMap.get('email');
		this.companyService.changeFavoriteImages(email, this.companyInfo.id, image.id, image).subscribe((res: any) => {
			this.companyInfo.images = this.companyInfo.images.map(img => {
				img.favorite = img.id === image.id;
				return img;
			});
		});
	}

	public get dynamiqueQts() {
		return this.companyForm.get('dynamiqueQts') as FormArray;
	}

	public resetdynamiqueQts() {
		this.dynamiqueQts.clear();
	}

	public setQuestion(label: string, value: string = null) {
		return this.fb.group({
			label: [label],
			response: [value, Validators.compose([Validators.minLength(1), Validators.maxLength(500)])]
		});
	}

	private initDynamiqueQts() {
		const dynamiqueQts = !!this.companyInfo.dynamiqueQts
			? this.companyInfo.dynamiqueQts.map(dynQts => {
					this.dynamiqueQts.push(this.setQuestion(dynQts.label, dynQts.response));
					return dynQts;
			  })
			: [];
	}

	public selectCategorie(category: string): void {
		this.resetdynamiqueQts();
		if (['dj', 'groupe', 'musicien'].includes(category)) {
			this.initMusicQts();
		}
		if (['animateurAdultes', 'animateurEnfants'].includes(category)) {
			this.initAnimateurs();
		}
		if (['photographe', 'videaliste'].includes(category)) {
			this.initSouvenirs();
		}
		if (['soins', 'esthetique', 'maquillage', 'coiffure'].includes(category)) {
			this.initBeaute();
		}
		if (['feuArtifices'].includes(category)) {
			this.initFeuArtifices();
		}
		if (['lacher'].includes(category)) {
			this.initLachers();
		}
		if (['voyagenoces'].includes(category)) {
			this.initNoces();
		}
		if (['bus', 'voiture'].includes(category)) {
			this.initTransport();
		}
		if (['faireparts'].includes(category)) {
			this.initFairePart();
		}
		if (['decorateur'].includes(category)) {
			this.initDecorateur();
		}
		if (['fleuriste'].includes(category)) {
			this.initFleuriste();
		}
		if (['officiantCeremonie'].includes(category)) {
			this.initOfficiantCeremonie();
		}
		if (['coachSportif', 'choregrapheMariage'].includes(category)) {
			this.initCoach();
		}
		if (['traiteur', 'gateaumariage'].includes(category)) {
			this.initReception();
		}
		if (['lieu'].includes(category)) {
			this.initLieu();
		}
	}

	private initMusicQts() {
		this.dynamiqueQts.push(this.setQuestion(`do you define an animation schedule ?`));
		this.dynamiqueQts.push(this.setQuestion(`do you accept the client's playlist ?`));
		this.dynamiqueQts.push(this.setQuestion(`what kinds of music do you offer ?`));
	}

	private initAnimateurs() {
		this.dynamiqueQts.push(this.setQuestion(`what age groups are your animations proposed ?`));
		this.dynamiqueQts.push(this.setQuestion(`do you define an animation schedule ?`));
	}

	private initSouvenirs() {
		this.dynamiqueQts.push(this.setQuestion(`do you have a replacement if you are unable to attend ?`));
		this.dynamiqueQts.push(
			this.setQuestion(`do you reserve the right to publish the photographs and / or video of the wedding ?`)
		);
		this.dynamiqueQts.push(this.setQuestion(`do you offer duo benefits ?`));
	}

	private initBeaute() {
		this.dynamiqueQts.push(this.setQuestion(`what age groups are the services intended for ?`));
		this.dynamiqueQts.push(this.setQuestion(`do you work from home ?`));
		this.dynamiqueQts.push(this.setQuestion(`do you accept that clients are accompanied ?`));
		this.dynamiqueQts.push(this.setQuestion(`do you offer care products ?`));
		this.dynamiqueQts.push(this.setQuestion(`do you use organic care products ?`));
	}

	private initFeuArtifices() {
		this.dynamiqueQts.push(this.setQuestion(`what services and / or materials are included ?`));
		this.dynamiqueQts.push(this.setQuestion(`what are the specificities of your service ?`));
	}

	private initLachers() {
		this.dynamiqueQts.push(this.setQuestion(`can we choose the shapes and colors of lanterns and balloons ?`));
		this.dynamiqueQts.push(this.setQuestion(`are the materials biodegradable ?`));
	}

	private initNoces() {
		this.dynamiqueQts.push(
			this.setQuestion(`is your institution accessible and adapted to people with reduced mobility ?`)
		);
		this.dynamiqueQts.push(this.setQuestion(`do you have outdoor spaces (garden, terrace, etc.) ?`));
	}

	private initTransport() {
		this.dynamiqueQts.push(this.setQuestion(`what is the internal / external condition of the vehicles ?`));
		this.dynamiqueQts.push(this.setQuestion(`do you impose a driver for all your rental ?`));
	}

	private initFairePart() {
		this.dynamiqueQts.push(this.setQuestion(`do you offer tailor-made creations ?`));
		this.dynamiqueQts.push(this.setQuestion(`do you offer BAT ?`));
	}

	private initHebergement() {
		this.dynamiqueQts.push(
			this.setQuestion(`is your institution accessible and adapted to people with reduced mobility ?`)
		);
		this.dynamiqueQts.push(this.setQuestion(`do you have outdoor spaces (garden, terrace, etc.) ?`));
	}
	private initDecorateur() {
		this.dynamiqueQts.push(
			this.setQuestion(`do you take care of the return of the material at the end of the event ?`)
		);
		this.dynamiqueQts.push(
			this.setQuestion(
				`do you impose the delivery of a deposit check for the rented equipment? If yes, specify the amount`
			)
		);
	}

	private initFleuriste() {
		this.dynamiqueQts.push(
			this.setQuestion(`can you adapt your creations according to customers model or photo ?`)
		);
		this.dynamiqueQts.push(this.setQuestion(`do you realize the floral decoration of cars ?`));
	}

	private initOfficiantCeremonie() {
		this.dynamiqueQts.push(this.setQuestion(`do you accept the client's playlist ?`));
	}

	private initCoach() {
		this.dynamiqueQts.push(this.setQuestion(`do you define a course schedule ?`));
		this.dynamiqueQts.push(this.setQuestion(`do you accept the client's playlist ?`));
		this.dynamiqueQts.push(this.setQuestion(`do you have a personal service license ?`));
	}

	private initReception() {
		this.dynamiqueQts.push(this.setQuestion(`celebrate more than one event a day ?`));
		this.dynamiqueQts.push(this.setQuestion(`what facilities should the reception venue have ?`));
		this.dynamiqueQts.push(this.setQuestion(`what materials do you have ?`));
		this.dynamiqueQts.push(
			this.setQuestion(`what material is available to customers (tables, chairs, buffets, etc.) ?`)
		);
		this.dynamiqueQts.push(this.setQuestion(`do you set up tents in the garden during the reception ?`));
		this.dynamiqueQts.push(this.setQuestion(`when should you go to the reception area ?`));
		this.dynamiqueQts.push(this.setQuestion(`are your products organic ?`));
	}

	private initLieu() {
		this.dynamiqueQts.push(this.setQuestion(`celebrate more than one event a day ?`));
		this.dynamiqueQts.push(this.setQuestion(`do you have a private kitchen for the caterer ?`));
		this.dynamiqueQts.push(this.setQuestion(`is there a time limit for the event ?`));
		this.dynamiqueQts.push(this.setQuestion(`do you impose the catering service ?`));
		this.dynamiqueQts.push(this.setQuestion(`do you impose the wedding cake service ?`));
		this.dynamiqueQts.push(this.setQuestion(`do you impose the service of photographer and / or videographer ?`));
		this.dynamiqueQts.push(this.setQuestion(`do you impose the music provider (Dj, Group, etc.) ?`));
		this.dynamiqueQts.push(this.setQuestion(`do you impose the decoration service of the place ?`));
		this.dynamiqueQts.push(this.setQuestion(`do you accept pets (Dogs, cats, ...) ?`));
		this.dynamiqueQts.push(
			this.setQuestion(`do you accept the installation of tents in the garden during the reception ?`)
		);
		this.dynamiqueQts.push(this.setQuestion(`what material is available (tables, chairs, buffets, etc.) ?`));
		this.dynamiqueQts.push(this.setQuestion(`can we fix things on the wall or ceiling ?`));
		this.dynamiqueQts.push(this.setQuestion(`are lantern releases authorized by you and your municipality ?`));
		this.dynamiqueQts.push(this.setQuestion(`is the place available the day before for the caterer ?`));
		this.dynamiqueQts.push(this.setQuestion(`what facilities does your place have ?`));
		this.dynamiqueQts.push(this.setQuestion(`what are your opening hours ?`));
		this.dynamiqueQts.push(
			this.setQuestion(
				`is the electrical amperage of the place enough to support at the same time the equipment of the caterer, that of the DJ and the spots ?`
			)
		);
		this.dynamiqueQts.push(this.setQuestion(`do you have rooms for children ?`));
		this.dynamiqueQts.push(this.setQuestion(`how many sanitary facilities does your place have ?`));
		this.dynamiqueQts.push(
			this.setQuestion(`is there any work planned (cleaning up, scaffolding)? If yes, what is the end date ?`)
		);
	}
}
