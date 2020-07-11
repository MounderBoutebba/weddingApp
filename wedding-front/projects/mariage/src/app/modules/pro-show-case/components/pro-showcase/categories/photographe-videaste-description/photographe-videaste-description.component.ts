import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { CategoryLabelEnum } from 'projects/mariage/src/app/modules/user/components/company/company-details/category-label.enum';
import { PhotographeVideasteBookingInterface, bookingObj } from './photographe-videaste.booking.interface';
import { BookingStore } from 'projects/mariage/src/app/modules/store/booking';
import { FeeType } from 'projects/mariage/src/app/modules/user/models/option.model';

@Component({
	selector: 'app-photographe-videaste-description',
	templateUrl: './photographe-videaste-description.component.html',
	styleUrls: ['./photographe-videaste-description.component.scss']
})
export class PhotographeVideasteDescriptionComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() searchedCategory: string;
	isPhotographe: boolean;
	isVidealiste: boolean;
	photoIsChecked: boolean;
	videoIsChecked: boolean;
	showmoreTirageFormats: boolean;
	showmoreCreationAlbumFormats: boolean;
	showmoreCreationAlbumModels: boolean;
	bookingObject: PhotographeVideasteBookingInterface = bookingObj;
	feeType = FeeType;
	tiragePapiers: any;
	creationAlbums: any;
	optionDivers: any;
	constructor(private readonly bookingStore: BookingStore) {}

	ngOnInit(): void {
		console.log('options divers',this.companyDescriptionInfo.company.options);
		this.showmoreTirageFormats = false;
		this.showmoreCreationAlbumFormats = false;
		this.showmoreCreationAlbumModels = false;
		this.isPhotographe = this.setIsPhotographe(this.companyDescriptionInfo.company.categories);
		this.isVidealiste = this.setIsVidealiste(this.companyDescriptionInfo.company.categories);
		this.initBookingObject(
			this.searchedCategory === CategoryLabelEnum.PHOTOGRAPHE,
			this.searchedCategory === CategoryLabelEnum.VIDEALISTE
		);
	}
	setIsPhotographe(categories: string[]): boolean {
		return !!categories.filter(category => category === CategoryLabelEnum.PHOTOGRAPHE).length;
	}
	setIsVidealiste(categories: string[]): boolean {
		return !!categories.filter(category => category === CategoryLabelEnum.VIDEALISTE).length;
	}
	numberInputChangeValue(prefix: string, action: string, key: string, step: number, decLimit?: number) {
		if (key === 'dureeMissionVideo' && !this.videoIsChecked) this.initBookingObject(this.photoIsChecked, true);
		if (key === 'dureeMissionPhoto' && !this.photoIsChecked) this.initBookingObject(true, this.videoIsChecked);
		if (key === 'donneesDvdExamplairesPhoto')
			this.bookingObject.photographe.donneesDvdExamplairesPhotoIsChecked = true;
		if (key === 'donneesUsbExamplairesPhoto')
			this.bookingObject.photographe.donneesUsbExamplairesPhotoIsChecked = true;
		if (key === 'donneesDvdExamplairesVideo')
			this.bookingObject.videaliste.donneesDvdExamplairesVideoIsChecked = true;
		if (key === 'donneesUsbExamplairesVideo')
			this.bookingObject.videaliste.donneesUsbExamplairesVideoIsChecked = true;
		if (action === 'increment') {
			this.bookingObject[prefix][key] += step;
		} else if (action === 'decrement') {
			this.bookingObject[prefix][key] -= step;
			this.bookingObject[prefix][key] =
				this.bookingObject[prefix][key] < decLimit ? decLimit : this.bookingObject[prefix][key];
		}
		this.bookingObjectChanged();
	}
	numberInputChangeValueObjectComplex(
		prefix: string,
		action: string,
		key: string,
		step: number,
		item: any,
		decLimit?: number
	) {
		if (!!prefix) {
			// creation album and tirage photos
			if (action === 'increment') {
				if (key === 'tiragePapier') {
					this.tiragePapiers[item].examplaire += step;
				}
			} else if (action === 'decrement') {
				if (key === 'tiragePapier') {
					this.tiragePapiers[item].examplaire -= step;
					// tslint:disable-next-line:max-line-length
					this.tiragePapiers[item].examplaire =
						this.tiragePapiers[item].examplaire < decLimit ? decLimit : this.tiragePapiers[item].examplaire;
				}
			}
		}

		this.bookingObjectChanged();
	}
	numberInputChangeOptionDivers(action: string, step: number, item: any, decLimit?: number) {
		const index = this.optionDivers.findIndex(opt => opt.id === item.id);
		if (action === 'increment') {
			this.optionDivers[index].examplaire += step;
		} else if (action === 'decrement') {
			this.optionDivers[index].examplaire -= step;
			this.optionDivers[index].examplaire =
				this.optionDivers[index].examplaire < decLimit ? decLimit : this.optionDivers[index].examplaire;
		}
		this.bookingObjectChanged();
	}
	numberInputChangeValueCreationAlbum(action: string, itemIndex: any, modelIndex: any) {
		if (action === 'increment') {
			this.creationAlbums[itemIndex].modeles[modelIndex].examplaire += 1;
		} else if (action === 'decrement') {
			this.creationAlbums[itemIndex].modeles[modelIndex].examplaire -= 1;
			// tslint:disable-next-line:max-line-length
			this.creationAlbums[itemIndex].modeles[modelIndex].examplaire =
				this.creationAlbums[itemIndex].modeles[modelIndex].examplaire < 1
					? 1
					: this.creationAlbums[itemIndex].modeles[modelIndex].examplaire;
		}
		this.bookingObjectChanged();
	}
	optionContainCategory(optId: string, category: string): boolean {
		return this.optionDivers.find( opt => opt.id === optId).categories.includes(category);
	}
	initBookingObject(photoIsChecked: boolean, videoIsChecked: boolean) {
		this.photoIsChecked = photoIsChecked;
		this.videoIsChecked = videoIsChecked;

		if (this.isPhotographe && this.photoIsChecked) {
			this.bookingObject.photographe.selected = true;
			if (this.companyDescriptionInfo?.criteres?.photographe_remise) {
				this.bookingObject.photographe.donneesDvdExamplairesPhoto = 1;
				this.bookingObject.photographe.donneesUsbExamplairesPhoto = 1;
			}
			if (this.companyDescriptionInfo?.criteres?.photographe_tiragePapier) {
				this.bookingObject.photographe.tiragePapier = [];
				// formats
				this.companyDescriptionInfo?.criteres?.photographe_tiragePapier.formats.forEach(format => {
					if (format.value) {
						this.bookingObject.photographe.tiragePapier.push({
							name: format.name,
							checked: false,
							examplaire: 1
						});
					}
				});
				this.tiragePapiers = this.bookingObject.photographe.tiragePapier;
			}
			if (this.companyDescriptionInfo?.criteres?.photographe_creationAlbum) {
				this.bookingObject.photographe.creationAlbum = [];
				// formats
				this.companyDescriptionInfo?.criteres?.photographe_creationAlbum.formats.forEach(format => {
					if (format.value) {
						const mod = format.modeles
							.map(element => {
								if (element.checked) {
									return {
										name: element.name,
										checked: false,
										examplaire: 1
									};
								}
							})
							.filter(element => {
								if (!!element) {
									return element;
								}
							});
						this.bookingObject.photographe.creationAlbum.push({
							name: format.name,
							checked: false,
							modeles: mod
						});
					}
				});
				this.creationAlbums = this.bookingObject.photographe.creationAlbum;
			}
			if (this.companyDescriptionInfo?.criteres?.photographe_retouchesPhoto) {
				this.bookingObject.photographe.retouchesPhotoExamplaires = 1;
			}
		} else {
			this.bookingObject.photographe = {selected: false};
		}
		if (this.isPhotographe) {
			this.bookingObject.photographe.dureeMissionPhoto = this.companyDescriptionInfo?.criteres?.photographe_dureeDeReservationMinimum;
		}

		if (this.isVidealiste && this.videoIsChecked) {
			this.bookingObject.videaliste.selected = true;
			if (this.companyDescriptionInfo?.criteres?.videaliste_remise) {
				this.bookingObject.videaliste.donneesDvdExamplairesVideo = 1;
				this.bookingObject.videaliste.donneesUsbExamplairesVideo = 1;
			}
		} else {
			this.bookingObject.videaliste = {selected: false};
		}
		if (this.isVidealiste) {
			this.bookingObject.videaliste.dureeMissionVideo = this.companyDescriptionInfo?.criteres?.videaliste_dureeDeReservationMinimum;
		}
		if (this.companyDescriptionInfo?.company?.options?.length) {
			this.optionDivers = [];
			this.companyDescriptionInfo?.company?.options.forEach(opt => {
				const index = this.optionDivers?.findIndex(option => option.name === opt.name);
				if (index === -1) {
					if (opt.feeType === FeeType.UNIT_FEE) {
						this.optionDivers.push({
							id: opt.id,
							name: opt.name,
							description: opt.description,
							optionRate: opt.optionRate,
							feeType: opt.feeType,
							checked: false,
							examplaire: 1,
							categories: opt.categories,
						});
					} else {
						this.optionDivers.push({
							id: opt.id,
							name: opt.name,
							description: opt.description,
							optionRate: opt.optionRate,
							feeType: opt.feeType,
							checked: false,
							categories: opt.categories,
						});
					}
				}
			});
		}
		// call bookingObjectChanged()
		this.bookingObjectChanged();
	}
	toggleChange(prefix: string, key: string, value: boolean, subKey?: string) {
		if (!!subKey) {
			if (value) {
				this.bookingObject[prefix][key][subKey] = value;
			} else {
				delete this.bookingObject[prefix][key][subKey];
			}
		} else {
			if (value) {
				this.bookingObject[prefix][key] = value;
				if (key === 'seanceEngagementIsChecked') {
					// tslint:disable-next-line:max-line-length
					this.bookingObject[
						prefix
					].dureeMissionSeanceEngagement = this.companyDescriptionInfo?.criteres?.photographe_seanceEngagementDureeMinimum;
				}
				if (key === 'seanceBrunchOuDejeunerIsChecked') {
					// tslint:disable-next-line:max-line-length
					this.bookingObject[
						prefix
					].dureeMissionSeanceBrunchOuDejeuner = this.companyDescriptionInfo?.criteres?.photographe_seanceEngagementDureeMinimum;
				}
				if (key === 'seanceApresMariageIsChecked') {
					// tslint:disable-next-line:max-line-length
					this.bookingObject[
						prefix
					].dureeMissionSeanceApresMariage = this.companyDescriptionInfo?.criteres?.photographe_seanceEngagementDureeMinimum;
				}
				if (key === 'retouchesPhoto') {
					// tslint:disable-next-line:max-line-length
					this.bookingObject[prefix].retouchesPhotoExamplaires = 1;
				}
			} else {
				delete this.bookingObject[prefix][key];
				if (key === 'seanceEngagementIsChecked') {
					delete this.bookingObject[prefix].dureeMissionSeanceEngagement;
				}
				if (key === 'seanceBrunchOuDejeunerIsChecked') {
					delete this.bookingObject[prefix].dureeMissionSeanceBrunchOuDejeuner;
				}
				if (key === 'seanceApresMariageIsChecked') {
					delete this.bookingObject[prefix].dureeMissionSeanceApresMariage;
				}
				if (key === 'retouchesPhoto') {
					delete this.bookingObject[prefix].retouchesPhotoExamplaires;
				}
			}
		}
		this.bookingObjectChanged();
	}
	toggleChangeTiragePapier(value: boolean, itemIndex: any) {
		this.tiragePapiers[itemIndex].checked = value;
		this.bookingObjectChanged();
	}
	toggleChangeCreationAlbum(value: boolean, itemIndex: any) {
		this.creationAlbums[itemIndex].checked = value;
		this.bookingObjectChanged();
	}
	toggleChangeOptionDivers(value: boolean, item: any) {
		const index = this.optionDivers.findIndex(opt => opt.id === item.id);
		this.optionDivers[index].checked = value;
		this.bookingObjectChanged();
	}
	checkBoxChange(prefix: string, key: string, value: boolean, subKey?: string) {
		if (!!subKey) {
			if (value) {
				this.bookingObject[prefix][key][subKey] = value;
			} else {
				delete this.bookingObject[prefix][key][subKey];
			}
		} else {
			if (value) {
				this.bookingObject[prefix][key] = value;
				if (key === 'donneesDvdExamplairesPhotoIsChecked') {
					this.bookingObject[prefix].donneesDvdExamplairesPhoto = this.bookingObject[prefix]
						.donneesDvdExamplairesPhoto
						? this.bookingObject[prefix].donneesDvdExamplairesPhoto
						: 1;
				}
				if (key === 'donneesUsbExamplairesPhotoIsChecked') {
					this.bookingObject[prefix].donneesUsbExamplairesPhoto = this.bookingObject[prefix]
						.donneesUsbExamplairesPhoto
						? this.bookingObject[prefix].donneesUsbExamplairesPhoto
						: 1;
				}
				if (key === 'donneesDvdExamplairesVideoIsChecked') {
					this.bookingObject[prefix].donneesDvdExamplairesVideo = this.bookingObject[prefix]
						.donneesDvdExamplairesVideo
						? this.bookingObject[prefix].donneesDvdExamplairesVideo
						: 1;
				}
				if (key === 'donneesUsbExamplairesVideoIsChecked') {
					this.bookingObject[prefix].donneesUsbExamplairesVideo = this.bookingObject[prefix]
						.donneesUsbExamplairesVideo
						? this.bookingObject[prefix].donneesUsbExamplairesVideo
						: 1;
				}
			} else {
				console.log('key:', key);
				delete this.bookingObject[prefix][key];
				if (key === 'donneesDvdExamplairesPhotoIsChecked') {
					delete this.bookingObject[prefix].donneesDvdExamplairesPhoto;
				}
				if (key === 'donneesUsbExamplairesPhotoIsChecked') {
					delete this.bookingObject[prefix][key];
				}
				if (key === 'donneesDvdExamplairesVideoIsChecked') {
					delete this.bookingObject[prefix].donneesDvdExamplairesVideo;
				}
				if (key === 'donneesUsbExamplairesVideoIsChecked') {
					delete this.bookingObject[prefix].donneesUsbExamplairesVideo;
				}
			}
		}
		this.bookingObjectChanged();
	}
	checkBoxChangeModeleCreationAlbum(value: boolean, itemIndex: any, modelIndex: any) {
		this.bookingObject.photographe.creationAlbum[itemIndex].modeles[modelIndex].checked = value;
		this.bookingObjectChanged();
	}
	stripUnnecessaryFalseValues() {
		if (this.photoIsChecked) {
			// photo remise
			if (!this.bookingObject.photographe.donneesDvdExamplairesPhotoIsChecked) {
				delete this.bookingObject.photographe.donneesDvdExamplairesPhoto;
			}
			if (!this.bookingObject.photographe.donneesUsbExamplairesPhotoIsChecked) {
				delete this.bookingObject.photographe.donneesUsbExamplairesPhoto;
			}
			// retouches photos
			if (!this.bookingObject.photographe.retouchesPhoto) {
				delete this.bookingObject.photographe.retouchesPhotoExamplaires;
			}
			// tirage photos
			this.bookingObject.photographe.tiragePapier = this.tiragePapiers.filter(format => format.checked);
			if (!this.bookingObject.photographe.tiragePapier.length) {
				delete this.bookingObject.photographe.tiragePapier;
			}
			// crèation albums
			this.bookingObject.photographe.creationAlbum = this.creationAlbums.filter(format => format.checked);
			if (!this.bookingObject.photographe.creationAlbum.length) {
				delete this.bookingObject.photographe.creationAlbum;
			}
		} else {
			delete this.bookingObject.photographe.dureeMissionPhoto;
		}
		if (this.videoIsChecked) {
			// video remise
			if (!this.bookingObject.videaliste.donneesDvdExamplairesVideoIsChecked) {
				delete this.bookingObject.videaliste.donneesDvdExamplairesVideo;
			}
			if (!this.bookingObject.videaliste.donneesUsbExamplairesVideoIsChecked) {
				delete this.bookingObject.videaliste.donneesUsbExamplairesVideo;
			}
		} else {
			delete this.bookingObject.videaliste.dureeMissionVideo;
		}
		// tirage photos
		this.bookingObject.optionDivers = this.optionDivers?.filter(opt => opt.checked);
	}
	bookingObjectChanged() {
		this.stripUnnecessaryFalseValues();
		// trigger store's action
		this.bookingStore.setBookingObj(this.bookingObject);
	}
}
