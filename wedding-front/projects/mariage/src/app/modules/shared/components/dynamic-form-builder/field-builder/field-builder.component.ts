import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DynamicFormFieldInterface } from '../models/dynamic-form-field-interface';
import { FieldTypeEnum } from '../models/field-type.enum';

@Component({
  selector: 'app-field-builder',
  templateUrl: './field-builder.component.html',
  styleUrls: ['./field-builder.component.scss']
})
export class FieldBuilderComponent implements OnInit {
  fieldTypeEnum = FieldTypeEnum;
  @Input() field: DynamicFormFieldInterface;
  @Input() form: any;
  checkBoxIsRequired = true;
  @Output() addOption: EventEmitter<any>;
  @Output() checkBoxChange: EventEmitter<any>;
  get isValid() { if (this.form.controls[this.field.name]) {return this.form.controls[this.field.name].valid; } }
  get isDirty() { if (this.form.controls[this.field.name]) {return this.form.controls[this.field.name].dirty; } }

  constructor() {
    this.addOption = new EventEmitter<any>();
    this.checkBoxChange = new EventEmitter<any>();
  }
  ngOnInit() {
    this.checkBoxChanged(this.field);
  }
  checkBoxChanged(field: any) {
    console.log('checkBoxChanged');
    if (field.type === FieldTypeEnum.CHECK_BOX) {
      this.checkBoxIsRequired = !!field.options.filter( opt => opt.value === true ).length;

    }
    if (field.type === FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER) {
      if (field.numberCheckBoxOptions.options.length) {
        this.checkBoxIsRequired = !!field.numberCheckBoxOptions.options.filter( opt => opt.value === true ).length;
      }

    }
    this.checkBoxChange.emit(this.field);
  }

}
