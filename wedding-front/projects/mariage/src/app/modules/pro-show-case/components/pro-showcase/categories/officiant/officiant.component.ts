import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { FeeType } from 'projects/mariage/src/app/modules/user/models/option.model';

import { OfficiantBookingInterface, bookingObj } from './officiant.booking.interface';
import { BookingStore } from 'projects/mariage/src/app/modules/store/booking';

@Component({
	selector: 'app-officiant',
	templateUrl: './officiant.component.html',
	styleUrls: ['./officiant.component.scss']
})
export class OfficiantComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() searchedCategory: string;
	bookingObject: OfficiantBookingInterface = bookingObj;
	showmoreServices: boolean;
	optionDivers: any;
	feeType = FeeType;
	services: { name: string; checked: boolean }[] = [];
	constructor(private readonly bookingStore: BookingStore) {}

	ngOnInit(): void {
		console.log(this.companyDescriptionInfo);
		this.showmoreServices = false;
		this.initBookingObject();
	}
	initBookingObject() {
		this.bookingObject.officiant.durreDeLaMission = 1;

		if (!!this.companyDescriptionInfo?.criteres?.officiantCeremonie_dureeMin) {
			this.bookingObject.officiant.durreDeLaMission = this.companyDescriptionInfo?.criteres?.officiantCeremonie_dureeMin;
		}

		if (!!this.companyDescriptionInfo?.criteres?.officiantCeremonie_servicesAssocies?.options.length)
			this.services = this.companyDescriptionInfo.criteres.officiantCeremonie_servicesAssocies.options.map(
				element => {
					return { name: element.name, checked: false };
				}
			);

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
							categories: opt.categories
						});
					} else {
						this.optionDivers.push({
							id: opt.id,
							name: opt.name,
							description: opt.description,
							optionRate: opt.optionRate,
							feeType: opt.feeType,
							checked: false,
							categories: opt.categories
						});
					}
				}
			});
		}
		this.bookingObjectChanged();
	}
	numberInputChangeValue(prefix: string, action: string, key: string, step: number, decLimit?: number) {
		if (action === 'increment') {
			this.bookingObject[prefix][key] += step;
		} else if (action === 'decrement') {
			this.bookingObject[prefix][key] -= step;
			this.bookingObject[prefix][key] =
				this.bookingObject[prefix][key] < decLimit ? decLimit : this.bookingObject[prefix][key];
		}
		this.bookingObjectChanged();
	}

	toggleChangeService(value: boolean, index: number) {
		this.services[index].checked = value;
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
	numberInputChangeValueObjectComplex(
		prefix: string,
		action: string,
		key: string,
		step: number,
		index: number,
		decLimit?: number
	) {
		if (!!prefix) {
			if (action === 'increment') {
				this.bookingObject[prefix][key][index].nbrPieces += step;
			} else if (action === 'decrement') {
				this.bookingObject[prefix][key][index].nbrPieces -= step;
				// tslint:disable-next-line:max-line-length
				this.bookingObject[prefix][key][index].nbrPieces =
					this.bookingObject[prefix][key][index].nbrPieces < decLimit
						? decLimit
						: this.bookingObject[prefix][key][index].nbrPieces;
			}
		} else {
			// option divers

			if (action === 'increment') {
				this.optionDivers[index].examplaire += step;
			} else if (action === 'decrement') {
				this.optionDivers[index].examplaire -= step;
				this.optionDivers[index].examplaire =
					this.optionDivers[index].examplaire < decLimit ? decLimit : this.optionDivers[index].examplaire;
			}
		}
		this.bookingObjectChanged();
	}
	toggleChangeOptionDivers(value: boolean, item: any) {
		const index = this.optionDivers.findIndex(opt => opt.id === item.id);
		this.optionDivers[index].checked = value;
		this.bookingObjectChanged();
	}
	stripUnnecessaryValues() {
		if (!!this.services.length) {
			this.bookingObject.officiant.services = this.services.filter(opt => opt.checked);
		}
		this.bookingObject.optionDivers = this.optionDivers?.filter(opt => opt.checked);
	}
	toggleChange(key: string, value) {
		if (value) {
			this.bookingObject.officiant[key] = value;
		} else {
			delete this.bookingObject.officiant[key];
		}
		this.bookingObjectChanged();
	}
	bookingObjectChanged() {
		this.stripUnnecessaryValues();
		this.bookingStore.setBookingObj(this.bookingObject);
		console.log('objbookingObjectChangedect', this.bookingObject);
	}
}
