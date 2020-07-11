import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { VoitureBusBookingInterface, bookingObj } from './voiture-bus.booking.interface';
import { FeeType } from 'projects/mariage/src/app/modules/user/models/option.model';
import { CategoryLabelEnum } from 'projects/mariage/src/app/modules/user/components/company/company-details/category-label.enum';

@Component({
	selector: 'app-voiture-bus',
	templateUrl: './voiture-bus.component.html',
	styleUrls: ['./voiture-bus.component.scss']
})
export class VoitureBusComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() searchedCategory: string;
	feeType = FeeType;
	bookingObject: VoitureBusBookingInterface = bookingObj;
	isVoiture: boolean;
	isBus: boolean;
	voitureIsChecked: boolean;
	busIsChecked: boolean;
	showmoreVoitureModels: boolean;
	showmoreBusModels: boolean;
	showmoreBusServices: boolean;
	showmoreVoitureServices: boolean;
	constructor() {}

	ngOnInit(): void {
		console.log(this.companyDescriptionInfo.criteres);
		this.showmoreVoitureModels = false;
		this.showmoreVoitureServices = false;
		this.isVoiture = this.setIsVoiture(this.companyDescriptionInfo.company.categories);
		this.isBus = this.setIsBus(this.companyDescriptionInfo.company.categories);
		this.initBookingObject(
			this.searchedCategory === CategoryLabelEnum.VOITURE,
			this.searchedCategory === CategoryLabelEnum.BUS
		);
	}
	setIsVoiture(categories: string[]): boolean {
		return !!categories.filter(category => category === CategoryLabelEnum.VOITURE).length;
	}
	setIsBus(categories: string[]): boolean {
		return !!categories.filter(category => category === CategoryLabelEnum.BUS).length;
	}
	initBookingObject(voitureIsChecked: boolean, busIsChecked: boolean) {
		this.voitureIsChecked = voitureIsChecked;
		this.busIsChecked = busIsChecked;

		if (this.voitureIsChecked && this.isVoiture) {
			this.bookingObject.voiture.models = [];
			this.companyDescriptionInfo?.criteres?.voiture_voitures.fields.forEach(opt => {
				if (opt.value) {
					this.bookingObject.voiture.models.push({
						name: opt.name,
						value: false,
						label: opt.categorie,
						dureeLocation: 1,
						kilometrage: 1
					});
				}
			});
			this.bookingObject.voiture.services = [];
			this.companyDescriptionInfo?.criteres?.voiture_services.options.forEach(opt => {
				if (opt.value) {
					this.bookingObject.voiture.services.push({
						name: opt.name,
						checked: false
					});
				}
			});
		} else {
			this.bookingObject.voiture = {};
		}
		if (this.busIsChecked && this.isBus) {
			this.bookingObject.bus.models = [];
			this.companyDescriptionInfo?.criteres?.bus_bus.fields.forEach(opt => {
				if (opt.value) {
					this.bookingObject.bus.models.push({
						name: opt.name,
						value: false,
						label: opt.categorie,
						dureeLocation: 1,
						kilometrage: 1
					});
				}
			});
			this.bookingObject.bus.services = [];
			this.companyDescriptionInfo?.criteres?.bus_services.options.forEach(opt => {
				if (opt.value) {
					this.bookingObject.bus.services.push({
						name: opt.name,
						checked: false
					});
				}
			});
		} else {
			this.bookingObject.bus = {};
		}
		this.bookingObjectChanged();
	}

	toggleChangeModel(prefix: string, key: string, value: boolean, index: number) {
		this.bookingObject[prefix][key][index].value = value;
		this.bookingObjectChanged();
	}
	numberInputChangeValueModele(
		prefix: string,
		action: string,
		key: string,
		step: number,
		index: number,
		subKey: string,
		decLimit?: number
	) {
		if (action === 'increment') {
			this.bookingObject[prefix][key][index][subKey] += step;
		} else if (action === 'decrement') {
			this.bookingObject[prefix][key][index][subKey] -= step;
			// tslint:disable-next-line:max-line-length
			this.bookingObject[prefix][key][index][subKey] =
				this.bookingObject[prefix][key][index][subKey] < decLimit
					? decLimit
					: this.bookingObject[prefix][key][index][subKey];
		}
		this.bookingObjectChanged();
	}
	toggleChangeService(prefix: string, value: boolean, index: number) {
		this.bookingObject[prefix].services[index].checked = value;
		this.bookingObjectChanged();
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
	bookingObjectChanged() {
		// TODO trigger store's action
		console.log('bookingObject', this.bookingObject);
	}
}
