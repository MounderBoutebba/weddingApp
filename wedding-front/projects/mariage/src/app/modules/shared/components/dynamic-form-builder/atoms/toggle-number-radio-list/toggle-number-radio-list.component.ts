import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DynamicFormFieldInterface } from '../../models/dynamic-form-field-interface';
import { FormGroup } from '@angular/forms';
import { FieldTypeEnum } from '../../models/field-type.enum';

@Component({
  selector: 'app-toggle-number-radio-list',
  templateUrl: './toggle-number-radio-list.component.html',
  styleUrls: ['./toggle-number-radio-list.component.scss']
})
export class ToggleNumberRadioListComponent implements OnInit {
  @Input() field: DynamicFormFieldInterface;
  @Input() form: FormGroup;
  @Output() addOption: EventEmitter<any>;
  fieldTypeEnum = FieldTypeEnum;
  displayItemsLimit = 2;
  showMoreOptions = false;
  color = 'primary';
  addBtnLabel = '';
  showMoreLabel = '';
  constructor() {
    this.addOption = new EventEmitter<any>();
  }

  ngOnInit() {
    if (this.field.name === 'decorationAssociees' || this.field.name === 'servicesAssocies' || this.field.name === 'services') {
      this.addBtnLabel = 'add a service';
      this.showMoreLabel = 'show more services';
    } else if (this.field.name === 'effets') {
      this.addBtnLabel = 'add an effect';
      this.showMoreLabel = 'show more effects';
    } else if (this.field.name === 'programmes') {
      this.addBtnLabel = 'add a program';
      this.showMoreLabel = 'show more programs';
    } else if (this.field.name === 'complements') {
      this.addBtnLabel = 'add a complement';
      this.showMoreLabel = 'show more complements';
    } else if (this.field.name === 'activites') {
      this.addBtnLabel = 'add an activity';
      this.showMoreLabel = 'show more activities';
    }
  }
  toggle(checked: boolean, optionName: string) {
    // this.disableOptions = checked;
    console.log('opt name', optionName);
    const index = this.field.optionsToggleNumberRadioList.findIndex( opt => opt.name === optionName);
    this.field.optionsToggleNumberRadioList[index].value = checked;
  }

}
