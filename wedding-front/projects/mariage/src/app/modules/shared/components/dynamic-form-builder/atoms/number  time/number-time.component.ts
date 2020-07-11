import { Component, Input, OnInit } from '@angular/core';
import { DynamicFormFieldInterface } from '../../models/dynamic-form-field-interface';
import { FormGroup } from '@angular/forms';
import { FieldTypeEnum } from '../../models/field-type.enum';

@Component({
	selector: 'app-number-time',
	templateUrl: './number-time.component.html',
	styleUrls: ['./number-time.component.scss']
})
export class NumberTimeComponent implements OnInit {
	fieldTypeEnum = FieldTypeEnum;
	@Input() numberOption: { hourValue: number; minValue: number; label: string; step: number };
	@Input() disableOptions: boolean;
	@Input() field: DynamicFormFieldInterface;
	@Input() form: FormGroup;
	label = `option's fees`;
	fxLayoutGap = '0.3125rem';
	marginRight = '0rem';
	marginLeft = '0rem';
	width = '100%';
	fxLayoutAlign = 'flex-end';
	labelTop = '0rem';
	setFxLayoutGap() {
		console.log('field type', this.field.type);
		switch (this.field.type) {
			case this.fieldTypeEnum.TOGGLE_NUMBER:
				console.log('label', this.numberOption.label);
				this.fxLayoutAlign = 'flex-end';
				if (this.field.numberOptions.length <= 1) {
					if (this.numberOption.label === 'nombreIntervenants') {
						this.fxLayoutGap = '1rem';
					} else if (
						this.numberOption.label === 'limiteHoraireDuree' ||
						this.numberOption.label === 'salleDeReceptionSurface' ||
						this.numberOption.label === 'pisteDeDenseSurface'
					) {
						this.marginRight = '-0.3rem';
					} else {
						this.fxLayoutGap = '3rem';
					}
				} else {
					if (
						this.numberOption.label === 'seanceEngagementDureeMinimum' ||
						this.numberOption.label === 'seanceBrunchOuDejeunerDureeMinimum' ||
						this.numberOption.label === 'seanceApresMariageDureeMinimum'
					) {
						this.fxLayoutGap = '1rem';
					} else if (
						this.numberOption.label === 'weddingCakeTarifParPart' ||
						this.numberOption.label === 'nakedCakeTarifParPart' ||
						this.numberOption.label === 'vintageChicTarifParPart'
					) {
						this.fxLayoutGap = '5.68rem';
					} else if (
						this.numberOption.label === 'weddingCakeNbrPartMin' ||
						this.numberOption.label === 'nakedCakeNbrPartMin' ||
						this.numberOption.label === 'vintageChicNbrPartMin'
					) {
						this.fxLayoutGap = '3.4rem';
						this.marginLeft = '0.15rem';
					} else if (
						this.numberOption.label === 'weddingCakeNbrEtagesMax' ||
						this.numberOption.label === 'nakedCakeNbrEtagesMax' ||
						this.numberOption.label === 'vintageChicNbrEtagesMax'
					) {
						this.fxLayoutGap = '3rem';
						this.marginLeft = '0.15rem';
					} else if (this.numberOption.label === 'hebergementInvitesTarif') {
						this.fxLayoutGap = '3.7rem';
						this.marginLeft = '0rem';
					} else {
						this.fxLayoutGap = '3rem';
					}
				}
				break;
			case this.fieldTypeEnum.TOGGLE_NUMBER_RADIO:
				this.fxLayoutAlign = 'flex-start';
				this.width = '100%';
				break;
			case this.fieldTypeEnum.TOGGLE_NUMBER_LIST:
				this.marginRight = '1rem';
				break;
			default:
				console.log('default');
				this.fxLayoutGap = '0.3125rem';
				// this.fxLayoutAlign = 'space-between center';
				break;
		}
	}
	setMarginRight() {
		if (this.field.type === FieldTypeEnum.TOGGLE_NUMBER_LIST) {
			if (this.field.name === 'animations' || this.field.name === 'materiels') {
				this.marginRight = '1rem';
			}
		}
	}
	constructor() {}
	updateHours(min: number) {
		if (min >= 60) {
			this.numberOption.minValue = min - 60;
			this.numberOption.hourValue++;
			if (this.numberOption.hourValue > 23) {
				this.numberOption.hourValue = 0;
			}
		} else if (min < 0) {
			this.numberOption.minValue = 60 - -min;
			this.numberOption.hourValue--;
			if (this.numberOption.hourValue > 23) {
				this.numberOption.hourValue = 0;
			}
		}
	}
	incrementValue() {
		this.numberOption.minValue += this.numberOption.step;
		this.updateHours(this.numberOption.minValue);
		if (this.field.type === FieldTypeEnum.TOGGLE_NUMBER_TIME) {
			this.form
				.get(this.numberOption.label)
				.get('hourValue')
				.setValue(this.numberOption.hourValue);
			this.form
				.get(this.numberOption.label)
				.get('minValue')
				.setValue(this.numberOption.minValue);
		}
	}
	decrementValue() {
		this.numberOption.minValue -= this.numberOption.step;
		this.updateHours(this.numberOption.minValue);
		if (this.field.type === FieldTypeEnum.TOGGLE_NUMBER_TIME) {
			this.form
				.get(this.numberOption.label)
				.get('hourValue')
				.setValue(this.numberOption.hourValue);
			this.form
				.get(this.numberOption.label)
				.get('minValue')
				.setValue(this.numberOption.minValue);
		}
	}
	ngOnInit() {
		if (this.field) {
			this.setFxLayoutGap();
			this.setMarginRight();
			if (
				this.field.name === 'services' ||
				this.field.name === 'activites' ||
				this.field.name === 'dorures' ||
				this.field.name === 'servicesAssocies' ||
				this.field.name === 'decorationAssociees' ||
				this.field.name === 'effets' ||
				this.field.name === 'programmes' ||
				this.field.name === 'complements'
			) {
				this.label = `option's fees`;
			} else if (
				this.field.name === 'produitsSales' ||
				this.field.name === 'produitsSucres' ||
				this.field.name === 'entrees' ||
				this.field.name === 'entrees' ||
				this.field.name === 'plats' ||
				this.field.name === 'accompagnements' ||
				this.field.name === 'accompagnements' ||
				this.field.name === 'fromages' ||
				this.field.name === 'desserts' ||
				this.field.name === 'boissonsAlcoolises' ||
				this.field.name === 'boissonsNonAlcoolises'
			) {
				this.label = `unit price`;
			} else if (this.field.name === 'animations' || this.field.name === 'materiels') {
				this.label = `fees`;
			} else if (this.field.name === 'lachers') {
				this.label = `fees per unity`;
			}
		}
	}
}
