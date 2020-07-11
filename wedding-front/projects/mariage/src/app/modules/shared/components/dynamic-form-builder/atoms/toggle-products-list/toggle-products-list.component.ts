import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DynamicFormFieldInterface } from '../../models/dynamic-form-field-interface';
import { FormGroup } from '@angular/forms';
import { FieldTypeEnum } from '../../models/field-type.enum';

@Component({
  selector: 'app-toggle-products-list',
  templateUrl: './toggle-products-list.component.html',
  styleUrls: ['./toggle-products-list.component.scss']
})
export class ToggleProductsListComponent implements OnInit {
  @Input() field: DynamicFormFieldInterface;
  @Input() form: FormGroup;
  @Output() addOption: EventEmitter<any>;
  fieldTypeEnum = FieldTypeEnum;
  displayItemsLimit = 2;
  showMoreOptions = false;
  color = 'primary';
  addBtnLabel = 'Ajouter un produit';
  showMoreLabel = 'Afficher plus de produits';
  constructor() {
    this.addOption = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }
  toggle(checked: boolean) {
    // this.disableOptions = checked;
    this.field.value = checked;
  }
  toggleOption(checked: boolean, productName: string, optionName: string) {
    const productIndex = this.field.products.findIndex( product => product.name === productName);
    const optionIndex = this.field.products[productIndex].options.findIndex( opt => opt.name === optionName);
    this.field.products[productIndex].options[optionIndex].value = checked;
  }
  showErrMsg(product: any): boolean {
    return !!product.options.filter( o => o.value ).length;
  }

}
