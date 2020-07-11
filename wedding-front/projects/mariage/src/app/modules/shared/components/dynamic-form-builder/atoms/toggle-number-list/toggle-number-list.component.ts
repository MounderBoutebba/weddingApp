import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DynamicFormFieldInterface } from '../../models/dynamic-form-field-interface';
import { FormGroup } from '@angular/forms';
import { FieldTypeEnum } from '../../models/field-type.enum';

@Component({
  selector: 'app-toggle-number-list',
  templateUrl: './toggle-number-list.component.html',
  styleUrls: ['./toggle-number-list.component.scss']
})
export class ToggleNumberListComponent implements OnInit {
  @Input() field: DynamicFormFieldInterface;
  @Input() form: FormGroup;
  @Output() addOption: EventEmitter<any>;
  fieldTypeEnum = FieldTypeEnum;
  displayItemsLimit = 4;
  displayItemsLimitModeles = 4;
  showMoreOptions = false;
  showMoreOptionsModeles = false;
  color = 'primary';
  addBtnLabel = '';
  showMoreLabel = '';
  hideToggleFdb = false;
  numberLabel = `Tarif de l'option`;
  constructor() {
    this.addOption = new EventEmitter<any>();
  }
  // using it later
  setHideToggleFdb() {
    if (this.field.name === 'animations') {
      console.log('here');
      this.hideToggleFdb = true;
    }
  }
  ngOnInit() {
    this.setHideToggleFdb();
    if (this.field.name === 'produitsSales' || this.field.name === 'produitsSucres' || this.field.name === 'entrees'
    || this.field.name === 'plats' || this.field.name === 'accompagnements' || this.field.name === 'fromages'
    || this.field.name === 'desserts' || this.field.name === 'boissonsAlcoolises' || this.field.name === 'boissonsNonAlcoolises') {
      this.addBtnLabel = 'add a product';
      this.showMoreLabel = 'show more products';
      this.displayItemsLimit = 2;
    } else if (this.field.name === 'animations') {
      this.addBtnLabel = 'add an animation';
      this.showMoreLabel = 'show more animations';
      this.displayItemsLimit = 2;
    } else if (this.field.name === 'lachers') {
      this.addBtnLabel = 'add a release';
      this.showMoreLabel = 'show more releases';
      this.displayItemsLimit = 2;
    } else if (this.field.name === 'materiels') {
      this.addBtnLabel = 'add an equipment';
      this.showMoreLabel = 'show more equipments';
      this.displayItemsLimit = 2;
    } else if (this.field.name === 'dorures') {
      this.addBtnLabel = '';
      this.showMoreLabel = 'show more gildings';
      this.displayItemsLimit = 3;
    } else if (this.field.name === 'equipements') {
      this.addBtnLabel = 'Ajouter un équipement';
      this.showMoreLabel = 'show more criteria';
      this.displayItemsLimit = 8;
    } else if (this.field.name === 'formats') {
      this.addBtnLabel = 'add a format';
      this.showMoreLabel = 'show more criteria';
      this.displayItemsLimit = 1;
    } else if (this.field.name === 'gateaux') {
      this.addBtnLabel = 'add a product';
      this.showMoreLabel = 'show more criteria';
      this.displayItemsLimit = 2;
    }
  }
  toggle(checked: boolean, optionName: string) {
    if (this.field.type === this.fieldTypeEnum.TOGGLE_NUMBER_LIST) {
      const index = this.field.optionsToggleNumberList.findIndex( opt => opt.name === optionName);
      this.field.optionsToggleNumberList[index].value = checked;
    } else if (this.field.type === this.fieldTypeEnum.TOGGLE_LIST) {
      const index = this.field.optionsToggleList.findIndex( opt => opt.name === optionName);
      this.field.optionsToggleList[index].value = checked;
    } else if (this.field.type === this.fieldTypeEnum.TOGGLE_FORMATS_LIST) {
      const index = this.field.optionsToggleFormatsList.findIndex( opt => opt.name === optionName);
      this.field.optionsToggleFormatsList[index].value = checked;
    } else if (this.field.type === this.fieldTypeEnum.TOGGLE_NUMBER_LIST_OPTIONS) {
      const index = this.field.optionsToggleNumberListOptions.findIndex( opt => opt.name === optionName);
      this.field.optionsToggleNumberListOptions[index].value = checked;
    }
  }
  toggleValue(checked: boolean) {
    this.field.value = checked;
  }
  toggleLivraison(checked: boolean) {
    this.field.livraison.value = checked;
  }
  showErrMsg(field: any): boolean {
    return !!field.optionsToggleNumberListOptions.filter( o => o.value ).length;
  }
}
