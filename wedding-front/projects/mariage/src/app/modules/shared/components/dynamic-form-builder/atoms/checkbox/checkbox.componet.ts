import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicFormFieldInterface } from '../../models/dynamic-form-field-interface';
import { FieldTypeEnum } from '../../models/field-type.enum';
import { FormMapperService } from 'projects/mariage/src/app/modules/user/services/form-mapper.service';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
})
export class CheckBoxComponent implements OnInit {
  @Input() field: DynamicFormFieldInterface;
  @Input() form: any;
  @Output() addOption: EventEmitter<any>;
  @Output() checkBoxChange: EventEmitter<any>;
  @Input() disableOptions: boolean;
  displayItemsLimit = 4;
  showMoreOptions = false;
  fieldTypeEnum = FieldTypeEnum;
  showErrMsg = false;
    constructor(private readonly formMapperService: FormMapperService) {
      this.addOption = new EventEmitter<any>();
      this.checkBoxChange = new EventEmitter<any>();
      this.disableOptions = true;
    }
    ngOnInit() {
      this.setErrMsg();
      this.formMapperService.fieldWithAddedCheckBoxOpt.subscribe(
        (field) => {
          if (field) {
            if (this.field.name === field.name) {
              console.log('this.field', this.field);
              console.log('field from service', field);
              console.log('form', this.form);
              this.field = field;
              this.setErrMsg();
            }

          }
        }
      );
    }
    checkBoxChanged(checked: boolean, optKey: string) {
      if (this.field.type === FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER) {
        const optionIndex = this.field.numberCheckBoxOptions.options.findIndex( opt => opt.key === optKey );
        this.field.numberCheckBoxOptions.options[optionIndex].value = checked;
      } else if (this.field.type === FieldTypeEnum.CHECK_BOX_NUMBER) {
        const optionIndex = this.field.checkboxNumberOptions.findIndex( opt => opt.key === optKey );
        this.field.checkboxNumberOptions[optionIndex].value = checked;
      } else {
        const optionIndex = this.field.options.findIndex( opt => opt.key === optKey );
        this.field.options[optionIndex].value = checked;
      }
      this.checkBoxChange.emit(this.field);
      this.setErrMsg();
    }
    setErrMsg() {
      this.showErrMsg = !!this.field.options.filter( o => o.value ).length;
      console.log('this.field', this.field);
      console.log('showErrMsg', this.showErrMsg);
      
    }
}
