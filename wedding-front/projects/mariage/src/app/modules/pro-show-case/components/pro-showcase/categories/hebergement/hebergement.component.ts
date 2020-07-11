import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { FeeType } from 'projects/mariage/src/app/modules/user/models/option.model';
import { HebergementBookingInterface, bookingObj } from './hebergement.booking.interface';

@Component({
	selector: 'app-hebergement',
	templateUrl: './hebergement.component.html',
	styleUrls: ['./hebergement.component.scss']
})
export class HebergementComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() searchedCategory: string;
	feeType = FeeType;
	bookingObject: HebergementBookingInterface = bookingObj;
	showmoreServices: boolean;
	constructor() {}

	ngOnInit(): void {
		console.log(this.companyDescriptionInfo.criteres);
		this.initBookingObject();
		this.showmoreServices = false;
	}
	numberInputChangeValue(prefix: string, action: string, key: string, step: number, decLimit?: number) {
		if (action === 'increment') {
			this.bookingObject[prefix][key] += step;
			if (key === 'nombreDeChambre') {
				this.bookingObject[prefix][key] =
					this.bookingObject[prefix][key] > this.companyDescriptionInfo?.criteres.hebergement_nombreDeChambre
						? this.companyDescriptionInfo?.criteres.hebergement_nombreDeChambre
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
		this.bookingObject.hebergement.nombreDeChambre = 1;
		this.bookingObject.hebergement.nombreDePersonnes = 1;
		this.bookingObject.hebergement.services = this.companyDescriptionInfo.criteres.hebergement_services.options.map(
			element => {
				return { name: element.name, checked: false };
			}
		);
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
	toggleChangeOptionDivers(value: boolean, item: any) {
		const index = this.bookingObject.optionDivers.findIndex(opt => opt.name === item.name);
		this.bookingObject.optionDivers[index].checked = value;
		this.bookingObjectChanged();
	}
	toggleChangeService(value: boolean, index: number) {
		this.bookingObject.hebergement.services[index].checked = value;
		this.bookingObjectChanged();
	}
	bookingObjectChanged() {
		// TODO trigger store's action
		console.log('bookingObject', this.bookingObject);
	}
}
