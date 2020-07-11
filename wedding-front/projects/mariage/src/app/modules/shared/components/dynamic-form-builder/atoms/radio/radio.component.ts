import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormFieldInterface } from '../../models/dynamic-form-field-interface';
import { FieldTypeEnum } from '../../models/field-type.enum';

@Component({
	selector: 'app-radio',
	templateUrl: './radio.component.html',
	styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {
	@Input() field: DynamicFormFieldInterface;
	@Input() subField: any;
	@Input() form: FormGroup;
	@Input() disableOptions: boolean;
	@Output() addOption: EventEmitter<any>;
	displayItemsLimit = 4;
	showMoreOptions = false;
	fieldTypeEnum = FieldTypeEnum;
	disableNumberOptions;
	elementWidth = '50%';
	marginRight = '0rem';
	wrapperWidth = '';
	addLabel: string;
	constructor() {
		this.addOption = new EventEmitter<any>();
		this.disableOptions = true;
	}
	setElementWidth() {
		if (this.field.type === FieldTypeEnum.RADIO_STRING) {
			if (this.field.name === 'typePublic' || this.field.name === 'adaptabiliteLieu') {
				this.elementWidth = '16rem';
				// this.marginRight = '4rem';
			} else if (
				this.field.name === 'typeDeLieu' ||
				this.field.name === 'situationGeographique' ||
				this.field.name === 'niveauElaboration' ||
				this.field.name === 'specificiteReligieuses'
			) {
				this.elementWidth = '16rem';
			} else if (this.field.name === 'utilisationDuLieu' || this.field.name === 'configurationDeLaReception') {
				this.elementWidth = '13rem';
			} else if (this.field.name === 'adaptabiliteMobiliteReduite') {
				this.elementWidth = '17rem';
			}
		} else if (this.field.type === FieldTypeEnum.TOGGLE_RADIO) {
			if (
				this.field.name === 'serviceTraiteur' ||
				this.field.name === 'serviceGateau' ||
				this.field.name === 'servicePhotographeVideaste' ||
				this.field.name === 'serviceMusic' ||
				this.field.name === 'serviceDecoration' ||
				this.field.name === 'adaptabiliteMobiliteReduite'
			) {
				this.elementWidth = '17rem';
			}
		} else if (this.field.type === FieldTypeEnum.RADIO) {
			if (this.field.name === 'capaciteInvites') {
				this.elementWidth = '18rem';
			}
		}
	}
	ngOnInit() {
		this.addLabel = this.field.name === 'elevesSimultane' ? 'Autres' : this.field.name === 'situationGeo' ? 'Ajouter une situation' : 'Add';
		this.setElementWidth();
		if (this.field.type === this.fieldTypeEnum.TOGGLE_NUMBER_RADIO) {
			// tslint:disable-next-line:max-line-length
			this.disableNumberOptions = this.form
				.get(this.field.name)
				.get(this.field.radioCriteriaName)
				.get(this.field.radioCriteriaName).value;
			this.disableNumberOptions = this.disableNumberOptions === 'true' ? true : false;
			console.log('disableNumberOptions in radio', typeof this.disableNumberOptions);
		}
		if (this.field.type === this.fieldTypeEnum.TOGGLE_CHECKBOX_NUMBER) {
			// tslint:disable-next-line:max-line-length
			this.disableNumberOptions = this.form.get(this.field.name).get(this.field.radioCriteriaName).value;
			this.disableNumberOptions = this.disableNumberOptions === 'true' ? true : false;
			console.log('disableNumberOptions in radio', typeof this.disableNumberOptions);
		}
		if (this.field.type === this.fieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST) {
			const fieldName: string = this.subField.name;
			const index = this.field.optionsToggleNumberRadioList.findIndex(opt => opt.name === fieldName);
			// tslint:disable-next-line:max-line-length
			this.disableNumberOptions = this.form
				.get(this.field.name)
				.get(this.field.optionsToggleNumberRadioList[index].name).value;
			this.disableNumberOptions = this.disableNumberOptions === 'true' ? true : false;
		}
	}
	radioChange(event: any) {
		if (this.field.type === this.fieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST) {
			this.disableNumberOptions = event.value;
		} else {
			const value: boolean = event.value === 'true' ? true : false;
			this.disableNumberOptions = value;
		}
	}
}
