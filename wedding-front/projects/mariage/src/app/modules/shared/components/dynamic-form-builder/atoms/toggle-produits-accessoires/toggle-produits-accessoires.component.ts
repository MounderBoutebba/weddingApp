import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DynamicFormFieldInterface } from '../../models/dynamic-form-field-interface';
import { FormGroup } from '@angular/forms';
import { FieldTypeEnum } from '../../models/field-type.enum';
import { FormMapperService } from 'projects/mariage/src/app/modules/user/services/form-mapper.service';

@Component({
  selector: 'app-toggle-produits-accessoires',
  templateUrl: './toggle-produits-accessoires.component.html',
  styleUrls: ['./toggle-produits-accessoires.component.scss']
})
export class ToggleProduitsAccessoiresComponent implements OnInit {
  @Input() field: DynamicFormFieldInterface;
  @Input() form: FormGroup;
  @Output() addOption: EventEmitter<any>;
  fieldTypeEnum = FieldTypeEnum;
  displayItemsLimit = 4;
  showMoreOptions = false;
  color = 'primary';
  addBtnLabel = 'Ajouter';
  showMoreLabel = 'Afficher plus de critères';
  showErrorMsg: boolean;
  constructor(private readonly formMapperService: FormMapperService) {
    this.addOption = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this.setErrorMsg();
    this.formMapperService.fieldWithAddedToggleProduit.subscribe(
      (field) => {
        if (field) {
          if (this.field.name === field.name) {
            this.field = field;
            this.setErrorMsg();
          }
        }
      }
    );
  }
  toggle(checked: boolean) {
    this.field.value = checked;
  }
  checkBoxChanged(checked: boolean, name: string){
    this.field.produitsOptions.find( opt => opt.name === name ).checked = checked;
    this.form.get(this.field.name).get('options').get(name).get('checked').setValue(checked);
    this.setErrorMsg();
  }
  setErrorMsg() {
    this.showErrorMsg = false;
    this.field.produitsOptions.forEach(opt => this.showErrorMsg = this.showErrorMsg || opt.checked);
  }
}
