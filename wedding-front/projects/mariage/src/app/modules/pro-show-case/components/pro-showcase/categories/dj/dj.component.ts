import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { CategoryLabelEnum } from 'projects/mariage/src/app/modules/user/components/company/company-details/category-label.enum';
import { DjBookingInterface, bookingObj } from './dj.booking.interface';
import { FeeType } from 'projects/mariage/src/app/modules/user/models/option.model';
import { BookingStore } from 'projects/mariage/src/app/modules/store/booking';

@Component({
	selector: 'app-dj',
	templateUrl: './dj.component.html',
	styleUrls: ['./dj.component.scss']
})
export class DjComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() searchedCategory: string;
	isDj: boolean;
	djIsChecked: boolean;
	bookingObject: DjBookingInterface = bookingObj;
	showmoreServices: boolean;
	showmoreMateriels: boolean;
	optionDivers: any;
	feeType = FeeType;
	constructor(private readonly bookingStore: BookingStore) {}

	ngOnInit(): void {
		this.initBookingObject();
		this.showmoreMateriels = false;
		this.showmoreServices = false;
		console.log(this.companyDescriptionInfo);
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
	initBookingObject() {
		this.bookingObject.dj.dureeMissionDj = this.companyDescriptionInfo?.criteres?.dj_dureeReservationMin;

		this.bookingObject.dj.services = this.companyDescriptionInfo.criteres.dj_animations.options.map(element => {
			return { name: element.name, checked: false };
		});

		this.bookingObject.dj.matriels = this.companyDescriptionInfo.criteres.dj_materiels.options.map(element => {
			return { name: element.name, checked: false };
		});

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
		// call bookingObjectChanged()
		this.bookingObjectChanged();
	}
	toggleChange(prefix: string, key: string, value: boolean, subKey?: string) {
		if (!!subKey) {
			this.bookingObject[prefix][key][subKey] = value;
		} else {
			this.bookingObject[prefix][key] = value;
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
	toggleChangeOptionDivers(value: boolean, item: any) {
		const index = this.optionDivers.findIndex(opt => opt.id === item.id);
		this.optionDivers[index].checked = value;
		this.bookingObjectChanged();
	}
	toggleChangeService(value: boolean, index: number) {
		this.bookingObject.dj.services[index].checked = value;
		this.bookingObjectChanged();
	}

	toggleChangeMateriel(value: boolean, index: number) {
		this.bookingObject.dj.matriels[index].checked = value;
		this.bookingObjectChanged();
	}

	bookingObjectChanged() {
		this.bookingObject.optionDivers = this.optionDivers?.filter(opt => opt.checked);
		// TODO trigger store's action
		this.bookingStore.setBookingObj(this.bookingObject);
		console.log('bookingObject', this.bookingObject);
	}
}
