import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormFieldInterface } from '../../models/dynamic-form-field-interface';
import { FieldTypeEnum } from '../../models/field-type.enum';

@Component({
	selector: 'app-toggle',
	templateUrl: './toggle.component.html',
	styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit, AfterViewInit {
	@Input() field: DynamicFormFieldInterface;
	@Input() form: FormGroup;
	@Output() addOption: EventEmitter<any>;
	@Output() checkBoxChange: EventEmitter<any>;
	displayItemsLimit = 4;
	showMoreOptions = false;
	showMoreOptionsToggleCheckBox = false;
	showMoreOptionsToggleCheckBox2 = false;
	showMoreOptionsToggleCheckBox3 = false;
	showMoreOptionsToggleCheckBox4 = false;
	fieldTypeEnum = FieldTypeEnum;
	disableOptions: boolean;
	disableOptionsTime: boolean;
	color = 'primary';
	showSimpleToggle = false;
	nameIncludEmpty = false;
	nameIncludComplex = false;
	fxLayoutAlignToggleNumber = 'flex-end';
	constructor(private cdr: ChangeDetectorRef) {
		this.addOption = new EventEmitter<any>();
		this.checkBoxChange = new EventEmitter<any>();
	}
	setFxLayoutGap() {
		switch (this.field.type) {
			case this.fieldTypeEnum.TOGGLE_NUMBER:
				if (this.field.numberOptions.length <= 1 && this.nameIncludEmpty) {
					this.fxLayoutAlignToggleNumber = 'flex-end';
				}
				break;
			default:
				this.fxLayoutAlignToggleNumber = 'flex-end';
				break;
		}
	}
	setDisableOptionsTime() {
		if (this.field.type === this.fieldTypeEnum.TOGGLE_NUMBER_TIME) {
			if (this.field.name === 'limiteHoraire') {
				const index = this.field.numberOptionsTime.findIndex(f => f.label === this.field.name);
				console.log('disable', this.field.numberOptionsTime[index].value);
				this.disableOptionsTime = this.field.numberOptionsTime[index].value;
			} else if (this.field.name === 'debutLocation') {
				this.disableOptionsTime = true;
			}
		}
	}
	ngOnInit() {
		this.nameIncludEmpty = this.field.name.includes('empty');
		this.nameIncludComplex = this.field.name.includes('complex');
		this.setFxLayoutGap();
		this.setDisableOptionsTime();
		if (
			this.field.type !== this.fieldTypeEnum.TOGGLE_SIMPLE &&
			this.field.type !== this.fieldTypeEnum.TOGGLE_CHECKBOX_NUMBER &&
			this.field.type !== this.fieldTypeEnum.TOGGLE_NUMBER_TIME
		) {
			this.disableOptions = this.form.get(this.field.name).get(this.field.name).value;
		}
		if (
			this.field.type === this.fieldTypeEnum.TOGGLE_CHECKBOX_NUMBER &&
			this.field.type !== this.fieldTypeEnum.TOGGLE_NUMBER_TIME
		) {
			this.disableOptions = this.form.get(this.field.name).get(this.field.name).value;
		}
		if (
			this.field.type === this.fieldTypeEnum.TOGGLE_NUMBER_RADIO &&
			this.field.type !== this.fieldTypeEnum.TOGGLE_NUMBER_TIME
		) {
			this.disableOptions = this.form
				.get(this.field.name)
				.get(this.field.name)
				.get(this.field.name).value;
			console.log('form', this.form);
		}
	}
	ngAfterViewInit() {
		if (this.field.type === this.fieldTypeEnum.TOGGLE_SIMPLE) {
			this.form.get(this.field.name).setValue(!!this.form.get(this.field.name).value);
			this.showSimpleToggle = true;
			this.cdr.detectChanges();
		}
	}
	toggle(checked: boolean) {
		if (this.field.type === this.fieldTypeEnum.TOGGLE_NUMBER_TIME) {
			this.disableOptionsTime = checked;
			const index = this.field.numberOptionsTime.findIndex(f => f.label === this.field.name);
			this.form
				.get(this.field.name)
				.get('value')
				.setValue(checked);
			this.field.numberOptionsTime[index].value = checked;
		} else {
			this.disableOptions = checked;
			this.field.value = checked;
		}
	}
}
