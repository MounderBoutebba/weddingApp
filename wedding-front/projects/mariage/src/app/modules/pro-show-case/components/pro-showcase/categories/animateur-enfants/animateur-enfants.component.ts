import { Component, OnInit, Input } from '@angular/core';
import { Company } from 'projects/mariage/src/app/modules/user/models/company.model';
import { AnimateurEnfantBookingInterface, bookingObj } from './animateurEnfant.booking.interface';
import { FeeType } from 'projects/mariage/src/app/modules/user/models/option.model';
import { BookingStore } from 'projects/mariage/src/app/modules/store/booking';

@Component({
	selector: 'app-animateur-enfants',
	templateUrl: './animateur-enfants.component.html',
	styleUrls: ['./animateur-enfants.component.scss']
})
export class AnimateurEnfantsComponent implements OnInit {
	@Input() companyDescriptionInfo: Company;
	@Input() searchedCategory: string;
	bookingObject: AnimateurEnfantBookingInterface = bookingObj;
	showmoreAnimations: boolean;
	optionDivers: any;
	feeType = FeeType;
	animations: { name: string; checked: boolean }[] = [];
	constructor(private readonly bookingStore: BookingStore) {}

	ngOnInit(): void {
		console.log(this.companyDescriptionInfo);
		this.showmoreAnimations = false;
		this.initBookingObject();
	}
	initBookingObject() {
		this.bookingObject.animateur.dureeMissionAnimateur = this.companyDescriptionInfo.criteres.animateurEnfants_dureeDeReservation;
		this.bookingObject.animateur.NombreAnimateurs = 1;

		this.animations = this.companyDescriptionInfo.criteres.animateurEnfants_animations.options.map(element => {
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

	toggleChangeAnimation(value: boolean, index: number) {
		this.animations[index].checked = value;
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
	stripUnnecessaryValues() {
		if (!!this.animations.length) {
			this.bookingObject.animateur.animations = this.animations.filter(opt => opt.checked);
		}
		this.bookingObject.optionDivers = this.optionDivers?.filter(opt => opt.checked);
	}
	bookingObjectChanged() {
		this.stripUnnecessaryValues();
		this.bookingStore.setBookingObj(this.bookingObject);
	}
}
