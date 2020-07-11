import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DynamicFormFieldInterface } from '../../models/dynamic-form-field-interface';
import { FormGroup } from '@angular/forms';
import { FieldTypeEnum } from '../../models/field-type.enum';

@Component({
  selector: 'app-toggle-majoration',
  templateUrl: './toggle-majoration.component.html',
  styleUrls: ['./toggle-majoration.component.scss']
})
export class ToggleMajorationComponent implements OnInit {
  @Input() field: DynamicFormFieldInterface;
  @Input() form: FormGroup;
  @Output() addOption: EventEmitter<any>;
  fieldTypeEnum = FieldTypeEnum;
  color = 'primary';
  constructor() {
    this.addOption = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }
  toggle(checked: boolean) {
    this.field.value = checked;
  }

}
