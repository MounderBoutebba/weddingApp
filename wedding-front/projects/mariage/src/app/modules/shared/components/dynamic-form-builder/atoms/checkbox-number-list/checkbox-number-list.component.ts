import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DynamicFormFieldInterface } from '../../models/dynamic-form-field-interface';
import { FormGroup } from '@angular/forms';
import { FieldTypeEnum } from '../../models/field-type.enum';
import { FormMapperService } from 'projects/mariage/src/app/modules/user/services/form-mapper.service';

@Component({
  selector: 'app-checkbox-number-list',
  templateUrl: './checkbox-number-list.component.html',
  styleUrls: ['./checkbox-number-list.component.scss']
})
export class CheckboxNumberListComponent implements OnInit {
  @Input() field: DynamicFormFieldInterface;
  @Input() form: FormGroup;
  @Output() addOption: EventEmitter<any>;
  @Output() checkBoxChange: EventEmitter<any>;
  fieldTypeEnum = FieldTypeEnum;
  displayItemsLimit = 2;
  displayModelsLimit = 4;
  showMoreOptions = false;
  showMoreOptionsModele = false;
  color = 'primary';
  addBtnLabel = 'add a new format';
  addBtnLabelModele = 'Ajouter un modéle page à ce format';
  showMoreLabel = 'show more formats';
  showMoreModeleLabel = 'show more criteria';
  finitionsError = false;
  modeleError = false;
  thereIsAtleastFormatActive = false;
  constructor(private readonly formMapperService: FormMapperService) {
    this.addOption = new EventEmitter<any>();
    this.checkBoxChange = new EventEmitter<any>();
  }

  ngOnInit() {
    this.displayFinitionsError();
    this.displayFormatsError();
    this.formMapperService.fieldWithAddedCheckBoxNumberListOpt.subscribe(
      (field) => {
        if (field) {
          if (this.field.name === field.name) {
            this.field = field;
            this.displayFormatsError();
          }
         }
      }
    );
  }
  toggle(checked: boolean, subFieldName?: string) {
    if (checked) {
      this.displayFinitionsError();
    }
    if (this.field.type === this.fieldTypeEnum.CHECKBOX_NUMBER_LIST) {
      if (subFieldName) {
        const index = this.field.formats.findIndex( f => f.name === subFieldName );
        this.field.formats[index].value = checked;
      } else {
        this.field.value = checked;
      }
    }
    console.log('toggle');
    this.displayFormatsError();
  }
  displayFinitionsError() {
    console.log('finitions', this.field.finitions);
    this.finitionsError = false;
    this.field.finitions.forEach(finition => {
      this.finitionsError = this.finitionsError || finition.value;
    });
  }
  displayFormatsError() {
    console.log('this.field.formats', this.field.formats);
    this.thereIsAtleastFormatActive = false;
    this.field.formats.forEach(format => {
      this.thereIsAtleastFormatActive = this.thereIsAtleastFormatActive || format.value;
    });
    console.log('thereIsAtleastFormatActive', this.thereIsAtleastFormatActive);
  }
  checkBoxChanged(checked: boolean, optKey: string) {
    if (this.field.type === FieldTypeEnum.CHECKBOX_NUMBER_LIST) {
      const optionIndex = this.field.finitions.findIndex( opt => opt.key === optKey );
      this.field.finitions[optionIndex].value = checked;
    }
    this.displayFinitionsError();
    this.checkBoxChange.emit(this.field);
  }
  modelCheckBoxChanged(checked: boolean, formatName: string, modelName: string) {
    const formatIndex = this.field.formats.findIndex( f => f.name ===  formatName);
    const modeleIndex = this.field.formats[formatIndex].modeles.findIndex( m => m.name ===  modelName);
    this.field.formats[formatIndex].modeles[modeleIndex].checked = checked;
    const tarif = this.field.formats[formatIndex].modeles[modeleIndex].tarif;
    // tslint:disable-next-line:no-unused-expression
    this.form.get(this.field.name).get('formats').get(formatName).get(modelName).setValue({checked, tarif});
    this.showErrMsg(this.field.formats.find( format => format.name === formatName));
  }
  getModelCheckBoxChangedValue(formatName: string, modelName: string): boolean {
    const formatIndex = this.field.formats.findIndex( f => f.name ===  formatName);
    const modeleIndex = this.field.formats[formatIndex].modeles.findIndex( m => m.name ===  modelName);
    return this.field.formats[formatIndex].modeles[modeleIndex].checked;
  }
  showErrMsg(format: any): boolean {
    if (format.value) {
        let modelesFlag = false;
        format.modeles.forEach( m => modelesFlag = modelesFlag || m.checked);
        return modelesFlag;
    } else {
      return true;
    }
  }
}
