import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { FeeType } from 'projects/mariage/src/app/modules/user/models/option.model';
import { VoyageDeNoceBookingInterface, bookingObj } from './voyageDeNoce.booking.interface';

@Component({
	selector: 'app-voyage-de-noce',
	templateUrl: './voyage-de-noce.component.html',
	styleUrls: ['./voyage-de-noce.component.scss']
})
export class VoyageDeNoceComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() searchedCategory: string;
	feeType = FeeType;
	bookingObject: VoyageDeNoceBookingInterface = bookingObj;
	showmoreServices: boolean;
	showmoreActivities: boolean;
	constructor() {}

	ngOnInit(): void {
		console.log(this.companyDescriptionInfo.criteres);
		this.initBookingObject();
		this.showmoreServices = false;
		this.showmoreActivities = false;
	}

	numberInputChangeValue(prefix: string, action: string, key: string, step: number, decLimit?: number) {
		if (action === 'increment') {
			this.bookingObject[prefix][key] += step;
			if (key === 'nombreDeChambre') {
				this.bookingObject[prefix][key] =
					this.bookingObject[prefix][key] > this.companyDescriptionInfo?.criteres.voyagenoces_nombreDeChambre
						? this.companyDescriptionInfo?.criteres.voyagenoces_nombreDeChambre
						: this.bookingObject[prefix][key];
			}
		} else if (action === 'decrement') {
			this.bookingObject[prefix][key] -= step;
			this.bookingObject[prefix][key] =
				this.bookingObject[prefix][key] < decLimit ? decLimit : this.bookingObject[prefix][key];
		}
		this.bookingObjectChanged();
	}
	initBookingObject() {
		this.bookingObject.voyage.nombreDeChambre = 1;
		this.bookingObject.voyage.nombreDePersonnes = 1;
		this.bookingObject.voyage.services = [];
		this.companyDescriptionInfo?.criteres?.voyagenoces_services.options.forEach(opt => {
			if (opt.value) {
				this.bookingObject.voyage.services.push({
					name: opt.name,
					checked: false
				});
			}
		});

		this.bookingObject.voyage.activities = [];
		this.companyDescriptionInfo?.criteres?.voyagenoces_activites.options.forEach(opt => {
			if (opt.value) {
				this.bookingObject.voyage.activities.push({
					name: opt.name,
					checked: false,
					quantity: 1
				});
			}
		});

		if (this.companyDescriptionInfo?.company?.options?.length) {
			this.companyDescriptionInfo?.company?.options.forEach(opt => {
				const index = this.bookingObject.optionDivers.findIndex(option => option.name === opt.name);
				if (index === -1) {
					if (opt.feeType === FeeType.UNIT_FEE) {
						this.bookingObject.optionDivers.push({
							name: opt.name,
							description: opt.description,
							optionRate: opt.optionRate,
							feeType: opt.feeType,
							checked: false,
							examplaire: 1
						});
					} else {
						this.bookingObject.optionDivers.push({
							name: opt.name,
							description: opt.description,
							optionRate: opt.optionRate,
							feeType: opt.feeType,
							checked: false
						});
					}
				}
			});
		}
	}
	numberInputChangeValueOptionsDivers(action: string, step: number, index: number, decLimit?: number) {
		if (action === 'increment') {
			this.bookingObject.optionDivers[index].examplaire += step;
		} else if (action === 'decrement') {
			this.bookingObject.optionDivers[index].examplaire -= step;
			// tslint:disable-next-line:max-line-length
			this.bookingObject.optionDivers[index].examplaire =
				this.bookingObject.optionDivers[index].examplaire < decLimit
					? decLimit
					: this.bookingObject.optionDivers[index].examplaire;
		}
	}
	numberInputChangeValueActivity(action: string, step: number, index: number, decLimit?: number) {
		if (action === 'increment') {
			this.bookingObject.voyage.activities[index].quantity += step;
		} else if (action === 'decrement') {
			this.bookingObject.voyage.activities[index].quantity -= step;
			// tslint:disable-next-line:max-line-length
			this.bookingObject.voyage.activities[index].quantity =
				this.bookingObject.voyage.activities[index].quantity < decLimit
					? decLimit
					: this.bookingObject.voyage.activities[index].quantity;
		}
	}
	toggleChangeOptionDivers(value: boolean, item: any) {
		const index = this.bookingObject.optionDivers.findIndex(opt => opt.name === item.name);
		this.bookingObject.optionDivers[index].checked = value;
		this.bookingObjectChanged();
	}
	toggleChangeService(value: boolean, index: number) {
		this.bookingObject.voyage.services[index].checked = value;
		this.bookingObjectChanged();
	}
	toggleChangeActivity(value: boolean, index: number) {
		this.bookingObject.voyage.activities[index].checked = value;
		this.bookingObjectChanged();
	}
	bookingObjectChanged() {
		// TODO trigger store's action
		console.log('bookingObject', this.bookingObject);
	}
}
