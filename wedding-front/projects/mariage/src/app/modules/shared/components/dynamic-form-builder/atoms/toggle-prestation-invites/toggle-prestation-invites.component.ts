import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DynamicFormFieldInterface } from '../../models/dynamic-form-field-interface';
import { FormGroup } from '@angular/forms';
import { FieldTypeEnum } from '../../models/field-type.enum';

@Component({
  selector: 'app-toggle-prestation-invites',
  templateUrl: './toggle-prestation-invites.component.html',
  styleUrls: ['./toggle-prestation-invites.component.scss']
})
export class TogglePrestationInvitesComponent implements OnInit {
  @Input() field: DynamicFormFieldInterface;
  @Input() form: FormGroup;
  @Output() addOption: EventEmitter<any>;
  fieldTypeEnum = FieldTypeEnum;
  displayItemsLimit = 4;
  showMoreOptions = false;
  color = 'primary';
  addBtnLabel = 'Ajouter';
  showMoreLabel = 'Afficher plus de critères';
  constructor() {
    this.addOption = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }
  toggle(checked: boolean) {
    this.field.value = checked;
  }
}
