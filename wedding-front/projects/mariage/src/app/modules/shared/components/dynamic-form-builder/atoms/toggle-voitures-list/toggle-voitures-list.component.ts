import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldTypeEnum } from '../../models/field-type.enum';
import { FormGroup } from '@angular/forms';
import { DynamicFormFieldInterface } from '../../models/dynamic-form-field-interface';

@Component({
  selector: 'app-toggle-voitures-list',
  templateUrl: './toggle-voitures-list.component.html',
  styleUrls: ['./toggle-voitures-list.component.scss']
})
export class ToggleVoituresListComponent implements OnInit {
  @Input() field: DynamicFormFieldInterface;
  @Input() form: FormGroup;
  @Output() addOption: EventEmitter<any>;
  fieldTypeEnum = FieldTypeEnum;
  displayItemsLimit = 4;
  displayItemsLimitCategories = 5;
  showMoreOptions = false;
  showMoreOptionsCategories = false;
  color = 'primary';
  addBtnLabel = 'add a car';
  showMoreLabel = 'show more cars';
  showMoreLabelCategories = 'show more categories';
  categories: string[] = [
    `Haute de gamme`,
    `Voiture de collection`,
    `Limousine`,
    `Sportive`,
    `Calèche`,
  ];
  constructor() {
    this.addOption = new EventEmitter<any>();
  }

  ngOnInit() {
    if (this.field.name === 'bus') {
      this.addBtnLabel = 'add an bus';
      this.showMoreLabel = 'show more bus';
      this.categories = [
        `Van`,
        `Microbus`,
        `Minimus`,
        `Midimus`,
      ];
    }
  }
  toggle(checked: boolean, optionName: string) {
    if (this.field.type === this.fieldTypeEnum.TOGGLE_VOITURE_LIST) {
      const index = this.field.voitures.findIndex( opt => opt.name === optionName);
      this.field.voitures[index].value = checked;
    }
  }

}
