import { Component, Input, OnInit } from '@angular/core';
import { DynamicFormFieldInterface } from '../../models/dynamic-form-field-interface';
import { FormGroup } from '@angular/forms';
import { FieldTypeEnum } from '../../models/field-type.enum';


@Component({
    selector: 'app-number',
    templateUrl: './number.component.html',
    styleUrls: ['./number.component.scss'],
})
export class NumberComponent implements OnInit {
  fieldTypeEnum = FieldTypeEnum;
  @Input() numberOption: {value: number, label: string, unit: string, step: number};
  @Input() disableOptions: boolean;
  @Input() field: DynamicFormFieldInterface;
  @Input() format: any;
  @Input() modele: any;
  @Input() subField: any;
  @Input() product: any;
  @Input() prestationName: any;
  @Input() optionName: any;
  @Input() option: any;
  @Input() majName: any;
  @Input() form: FormGroup;
  @Input() calledFromRadio = false;
  @Input() calledFromCheckBox = false;
  @Input() livraison = false;
  @Input() nbrOpt = false;
  @Input() quantity = false;
  @Input() capacite = false;
  @Input() convivesMin = false;
  @Input() dinerCapacite = false;
  @Input() longLabel = false;
  @Input() optKey = '';
  @Input()  numberCheckBoxOptionsNumber = '';
  @Input()  isForNbrPlaces = '';
  @Input()  indexOption = 0;
  @Input()  optionsLength = 0;
  @Input()  addVehicle = false;
  baseValue: number;
  label = `option's fees`;
  fxLayoutGap = '0rem';
  fxLayoutGapVehicle = '7rem';
  marginRight = '0rem';
  marginLeft = '0rem';
  width = '100%';
  fxLayoutAlign = 'space-between center';
  labelTop = '0rem';
  setFxLayoutGap() {
      if (this.field) {
        console.log('field type', this.field.type);
        switch (this.field.type) {
            case this.fieldTypeEnum.TOGGLE_NUMBER:
                this.fxLayoutAlign = 'flex-end';
                if (this.indexOption % 2 === 0 && this.optionsLength > 1) {
                  this.fxLayoutAlign = 'flex-start';
                }
                if (this.field.numberOptions.length <= 1) {
                    if (this.numberOption.label === 'nombreIntervenants') {
                      this.fxLayoutGap = '1rem';
                    } else if (this.numberOption.label === 'limiteHoraireDuree' || this.numberOption.label === 'salleDeReceptionSurface'
                    || this.numberOption.label === 'pisteDeDenseSurface') {
                      this.marginRight = '-0.3rem';
                    } else {
                      this.fxLayoutGap = '';
                    }
                } else {
                    if (this.numberOption.label === 'seanceEngagementDureeMinimum' ||
                        this.numberOption.label === 'seanceBrunchOuDejeunerDureeMinimum' ||
                        this.numberOption.label === 'seanceApresMariageDureeMinimum'
                        ) {
                      this.fxLayoutGap = '1rem';
                    } else if (this.numberOption.label === 'weddingCakeTarifParPart'
                    || this.numberOption.label === 'nakedCakeTarifParPart'
                    || this.numberOption.label === 'vintageChicTarifParPart'
                    ) {
                      this.fxLayoutGap = '5.68rem';
                    } else if (this.numberOption.label === 'weddingCakeNbrPartMin'
                    || this.numberOption.label === 'nakedCakeNbrPartMin'
                    || this.numberOption.label === 'vintageChicNbrPartMin'
                    ) {
                      this.fxLayoutGap = '3.4rem';
                      this.marginLeft = '0.15rem';
                    } else if (this.numberOption.label === 'weddingCakeNbrEtagesMax'
                    || this.numberOption.label === 'nakedCakeNbrEtagesMax'
                    || this.numberOption.label === 'vintageChicNbrEtagesMax'
                    ) {
                      this.fxLayoutGap = '';
                      this.marginLeft = '0.15rem';
                    }  else if (this.numberOption.label === 'hebergementInvitesTarif') {
                      this.fxLayoutGap = '';
                      this.marginLeft = '0rem';
                    } else {
                      this.fxLayoutGap = '';
                    }
                }
  
                break;
              case this.fieldTypeEnum.TOGGLE_NUMBER_RADIO:
                this.fxLayoutAlign = 'flex-end';
                this.width = '100%';
                break;
              case this.fieldTypeEnum.TOGGLE_NUMBER_LIST:
                this.marginRight = '1rem';
                break;
            default:
              console.log('default');
              this.fxLayoutGap = '0.3125rem';
              this.fxLayoutAlign = 'space-between center';
              break;
        }
      } else {
        if (this.addVehicle) {
            switch (this.numberOption.label) {
                case `Distance location max`:
                    this.fxLayoutGapVehicle = '3.1rem';
                    break;
                case `Kilométrage inclus`:
                    this.fxLayoutGapVehicle = '6rem';
                    break;
                case `Tarif / Kilomètre sup`:
                    this.fxLayoutGapVehicle = '5.61rem';
                    break;
            
                default:
                    break;
            }
        }
      }
  }
  setMarginRight() {
      if (this.field.type === FieldTypeEnum.TOGGLE_NUMBER_LIST) {
        if (this.field.name === 'animations' || this.field.name === 'materiels') {
            this.marginRight = '1rem';
        }
      }
  }
  setNumberLabel() {
    switch (this.field.name) {
      case `effets`:
        this.label = `option's fees`;
        break;
      default:
        this.label = `option's fees`;
        break;
    }
  }
    constructor() {
    }
    incrementValue() {
        this.numberOption.value += this.numberOption.step;
        this.numberOption.value = +parseFloat(String(this.numberOption.value)).toPrecision(12);
        if (this.field) {
            if (this.field.type === FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER) {
                if (this.nbrOpt) {
                    this.form.get(this.field.name).get(this.numberOption.label).setValue(this.numberOption.value);
                } else {
                    // tslint:disable-next-line:max-line-length
                    this.form.get(this.field.name).get(this.field[this.numberCheckBoxOptionsNumber].name).get(this.numberOption.label).setValue(this.numberOption.value);
                }
            } else if (this.field.type === FieldTypeEnum.TOGGLE_NUMBER_RADIO) {
                if (this.calledFromRadio) {
                    // tslint:disable-next-line:max-line-length
                    this.form.get(this.field.name).get(this.field.radioCriteriaName).get(this.numberOption.label).setValue(this.numberOption.value);
                } else {
                    this.form.get(this.field.name).get(this.field.name).get(this.numberOption.label).setValue(this.numberOption.value);
                }
            } else if (this.field.type === FieldTypeEnum.CHECK_BOX_NUMBER && this.calledFromCheckBox) {
                this.form.get(this.field.name).get(this.field.name).get(`${this.optKey}Tarif`).setValue(this.numberOption.value);
            } else if (this.field.type === FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST) {
                const fieldName: string = this.subField.name;
                const index = this.field.optionsToggleNumberRadioList.findIndex( opt => opt.name === fieldName);
                // tslint:disable-next-line:max-line-length
                this.form.get(this.field.name).get(this.field.optionsToggleNumberRadioList[index].name).get(`tarif`).setValue(this.numberOption.value);
            } else if (this.field.type === FieldTypeEnum.TOGGLE_NUMBER_LIST_OPTIONS) {
                if (this.livraison) {
                    this.form.get(this.field.name).get('livraison')
                    .setValue({tarif: this.numberOption.value, value: this.field.livraison.value});
                } else {
                    const fieldName: string = this.subField.name;
                    const index = this.field.optionsToggleNumberListOptions.findIndex( opt => opt.name === fieldName);
                    // tslint:disable-next-line:max-line-length
                    this.form.get(this.field.name).get(this.field.optionsToggleNumberListOptions[index].name).get(`opts`).get(this.numberOption.label).setValue({step: this.numberOption.step, value: this.numberOption.value, unit: this.numberOption.unit});
                }
            } else if (this.field.type === FieldTypeEnum.TOGGLE_NUMBER_LIST) {
                const fieldName: string = this.subField.name;
                const index = this.field.optionsToggleNumberList.findIndex( opt => opt.name === fieldName);
                // tslint:disable-next-line:max-line-length
                this.form.get(this.field.name).get(this.field.optionsToggleNumberList[index].name).get(`tarif`).setValue(this.numberOption.value);
            } else if (this.field.type === FieldTypeEnum.CHECKBOX_NUMBER_LIST) {
                if (this.field.name === 'creationAlbum') {
                    const formatIndex = this.field.formats.findIndex( f => f.name === this.format.name );
                    const modeleIndex = this.field.formats[formatIndex].modeles.findIndex( m => m.name ===  this.modele.name);
                    const checked = this.field.formats[formatIndex].modeles[modeleIndex].checked;
                    this.form.get(this.field.name).get('formats').get(this.format.name).get(this.modele.name)
                    .setValue({tarif: this.numberOption.value, checked});
                } else {
                    this.form.get(this.field.name).get('formats').get(this.format.name).get(this.modele.name)
                    .setValue({tarif: this.numberOption.value});
                }
            } else if (this.field.type === FieldTypeEnum.TOGGLE_FORMATS_LIST) {
                this.form.get(this.field.name).get(this.format.name).get('options').get(this.modele.name).setValue(this.numberOption.value);
            } else if (this.field.type === FieldTypeEnum.TOGGLE_VOITURE_LIST) {
                if (this.isForNbrPlaces) {
                    // TODO when Nombre de places
                    this.form.get(this.field.name).get(this.format.name).get('nbrPlace').setValue(this.numberOption.value);
                } else {
                    // tslint:disable-next-line:max-line-length
                    this.form.get(this.field.name).get(this.format.name).get('options').get(this.modele.name).setValue(this.numberOption.value);
                }
            } else if (this.field.type === FieldTypeEnum.RADIO_NUMBER) {
                this.form.get(this.field.name).get('tarifs').get(this.numberOption.label).setValue(this.numberOption.value);
            } else if (this.field.type === FieldTypeEnum.TOGGLE_VIN_HONNEUR_COCKTAIL_BUFFET) {
                if (this.quantity) {
                    this.form.get(this.field.name).get('quantity').setValue(this.numberOption.value);
                    this.field.quantity = this.numberOption.value;
                } else {
                    this.form.get(this.field.name).get('products')
                            .get(this.product.name).get(this.option.name).get('tarif').setValue(this.numberOption.value);
                    // tslint:disable-next-line:no-unused-expression
                    this.field.products.find( product => product.name === this.product.name )
                                        .options.find( opt => opt.name === this.option.name).tarif = this.numberOption.value;
                }
            } else if (this.field.type === FieldTypeEnum.TOGGLE_DINNER) {
                if (this.convivesMin) {
                    this.form.get(this.field.name).get('convivesMin').setValue(this.numberOption.value);
                    this.field.convivesMin = this.numberOption.value;
                } else if (this.dinerCapacite) {
                    this.form.get(this.field.name).get('dinerCapacite').setValue(this.numberOption.value);
                    this.field.dinerCapacite = this.numberOption.value;
                } else {
                    this.form.get(this.field.name).get('products')
                            .get(this.product.name).get(this.option.name).get('tarif').setValue(this.numberOption.value);
                    // tslint:disable-next-line:no-unused-expression
                    this.field.products.find( product => product.name === this.product.name )
                                        .options.find( opt => opt.name === this.option.name).tarif = this.numberOption.value;
                }
            } else if (this.field.type === FieldTypeEnum.TOGGLE_MAJORATION) {
                this.form.get(this.field.name).get('options').get(this.majName).setValue(this.numberOption.value);
                this.field.majOptions.find( opt => opt.name === this.majName ).majoration = this.numberOption.value;
            } else if (this.field.type === FieldTypeEnum.TOGGLE_PRODUITS_ACCESSOIRES) {
                this.form.get(this.field.name).get('options').get(this.optKey).get('tarif').setValue(this.numberOption.value);
                this.field.produitsOptions.find( opt => opt.name === this.optKey ).tarif = this.numberOption.value;
            } else if (this.field.type === FieldTypeEnum.TOGGLE_PRESTATIONS) {
                if (this.capacite) {
                    this.form.get(this.field.name).get('capacite').setValue(this.numberOption.value);
                } else {
                    // prestations
                    this.form.get(this.field.name).get('prestations').get(this.prestationName).get('options').get(this.optionName)
                                                    .get('tarif').setValue(this.numberOption.value);
                    this.field.prestations.find( p => p.name === this.prestationName).options.find( opt => opt.name === this.optionName)
                                                    .tarif = this.numberOption.value;
                }
            } else {
                if (!!this.field.name) {
                    this.form.get(this.field.name).get(this.numberOption.label).setValue(this.numberOption.value);
                } else {
                    console.log('form', this.form);
                }
            }
        } else {
            if (this.addVehicle) {
                switch (this.numberOption.label) {
                    case `Tarif par jour`:
                        this.form.get('tarifParJour').setValue(this.numberOption.value);
                        break;
                    case `Distance location max`:
                        this.form.get('distance').setValue(this.numberOption.value);
                        break;
                    case `Kilométrage inclus`:
                        this.form.get('kilometrageInclus').setValue(this.numberOption.value);
                        break;
                    case `Tarif / Kilomètre sup`:
                        this.form.get('tarifParKilometre').setValue(this.numberOption.value);
                        break;
                    default:
                        break;
                }
            } else {
                this.form.get('value').setValue(this.numberOption.value);
            }
        }

    }
    decrementValue() {
        this.numberOption.value -= this.numberOption.step;
        if (this.field) {
            this.numberOption.value = this.numberOption.value < this.baseValue ? this.baseValue : this.numberOption.value;
            this.numberOption.value = +parseFloat(String(this.numberOption.value)).toPrecision(12);
            if (this.field.type === FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER) {
                if (this.nbrOpt) {
                    this.form.get(this.field.name).get(this.numberOption.label).setValue(this.numberOption.value);
                } else {
                    // tslint:disable-next-line:max-line-length
                    this.form.get(this.field.name).get(this.field[this.numberCheckBoxOptionsNumber].name).get(this.numberOption.label).setValue(this.numberOption.value);
                }
            } else if (this.field.type === FieldTypeEnum.TOGGLE_NUMBER_RADIO) {
                if (this.calledFromRadio) {
                    // tslint:disable-next-line:max-line-length
                    this.form.get(this.field.name).get(this.field.radioCriteriaName).get(this.numberOption.label).setValue(this.numberOption.value);
                } else {
                    this.form.get(this.field.name).get(this.field.name).get(this.numberOption.label).setValue(this.numberOption.value);
                }
            }  else if (this.field.type === FieldTypeEnum.CHECK_BOX_NUMBER && this.calledFromCheckBox) {
                this.form.get(this.field.name).get(this.field.name).get(`${this.optKey}Tarif`).setValue(this.numberOption.value);
            }  else if (this.field.type === FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST) {
                const fieldName: string = this.subField.name;
                const index = this.field.optionsToggleNumberRadioList.findIndex( opt => opt.name === fieldName);
                // tslint:disable-next-line:max-line-length
                this.form.get(this.field.name).get(this.field.optionsToggleNumberRadioList[index].name).get(`tarif`).setValue(this.numberOption.value);
            }   else if (this.field.type === FieldTypeEnum.TOGGLE_NUMBER_LIST_OPTIONS) {
                if (this.livraison) {
                    this.form.get(this.field.name).get('livraison')
                    .setValue({tarif: this.numberOption.value, value: this.field.livraison.value});
                } else {
                    const fieldName: string = this.subField.name;
                    const index = this.field.optionsToggleNumberListOptions.findIndex( opt => opt.name === fieldName);
                    // tslint:disable-next-line:max-line-length
                    this.form.get(this.field.name).get(this.field.optionsToggleNumberListOptions[index].name).get(`opts`).get(this.numberOption.label).setValue({step: this.numberOption.step, value: this.numberOption.value, unit: this.numberOption.unit});
                }
            } else if (this.field.type === FieldTypeEnum.TOGGLE_NUMBER_LIST) {
                const fieldName: string = this.subField.name;
                const index = this.field.optionsToggleNumberList.findIndex( opt => opt.name === fieldName);
                // tslint:disable-next-line:max-line-length
                this.form.get(this.field.name).get(this.field.optionsToggleNumberList[index].name).get(`tarif`).setValue(this.numberOption.value);
            } else if (this.field.type === FieldTypeEnum.CHECKBOX_NUMBER_LIST) {
                if (this.field.name === 'creationAlbum') {
                    const formatIndex = this.field.formats.findIndex( f => f.name === this.format.name );
                    const modeleIndex = this.field.formats[formatIndex].modeles.findIndex( m => m.name ===  this.modele.name);
                    const checked = this.field.formats[formatIndex].modeles[modeleIndex].checked;
                    this.form.get(this.field.name).get('formats').get(this.format.name).get(this.modele.name)
                    .setValue({tarif: this.numberOption.value, checked});
                } else {
                    this.form.get(this.field.name).get('formats').get(this.format.name).get(this.modele.name)
                    .setValue({tarif: this.numberOption.value});                }
            }  else if (this.field.type === FieldTypeEnum.TOGGLE_FORMATS_LIST) {
                this.form.get(this.field.name).get(this.format.name).get('options').get(this.modele.name).setValue(this.numberOption.value);
            } else if (this.field.type === FieldTypeEnum.TOGGLE_VOITURE_LIST) {
                if (this.isForNbrPlaces) {
                    this.form.get(this.field.name).get(this.format.name).get('nbrPlace').setValue(this.numberOption.value);
                } else {
                    this.form.get(this.field.name).get(this.format.name).get('options').get(this.modele.name).setValue(this.numberOption.value);
                }
            }  else if (this.field.type === FieldTypeEnum.RADIO_NUMBER) {
                this.form.get(this.field.name).get('tarifs').get(this.numberOption.label).setValue(this.numberOption.value);
            } else if (this.field.type === FieldTypeEnum.TOGGLE_VIN_HONNEUR_COCKTAIL_BUFFET) {
                if (this.quantity) {
                    this.form.get(this.field.name).get('quantity').setValue(this.numberOption.value);
                    this.field.quantity = this.numberOption.value;
                } else {
                    this.form.get(this.field.name).get('products')
                            .get(this.product.name).get(this.option.name).get('tarif').setValue(this.numberOption.value);
                    // tslint:disable-next-line:no-unused-expression
                    this.field.products.find( product => product.name === this.product.name )
                                        .options.find( opt => opt.name === this.option.name).tarif = this.numberOption.value;
                }
            }  else if (this.field.type === FieldTypeEnum.TOGGLE_DINNER) {
                if (this.convivesMin) {
                    this.form.get(this.field.name).get('convivesMin').setValue(this.numberOption.value);
                    this.field.convivesMin = this.numberOption.value;
                } else if (this.dinerCapacite) {
                    this.form.get(this.field.name).get('dinerCapacite').setValue(this.numberOption.value);
                    this.field.dinerCapacite = this.numberOption.value;
                } else {
                    this.form.get(this.field.name).get('products')
                            .get(this.product.name).get(this.option.name).get('tarif').setValue(this.numberOption.value);
                    // tslint:disable-next-line:no-unused-expression
                    this.field.products.find( product => product.name === this.product.name )
                                        .options.find( opt => opt.name === this.option.name).tarif = this.numberOption.value;
                }
            } else if (this.field.type === FieldTypeEnum.TOGGLE_MAJORATION) {
                this.form.get(this.field.name).get('options').get(this.majName).setValue(this.numberOption.value);
                this.field.majOptions.find( opt => opt.name === this.majName ).majoration = this.numberOption.value;
            } else if (this.field.type === FieldTypeEnum.TOGGLE_PRODUITS_ACCESSOIRES) {
                this.form.get(this.field.name).get('options').get(this.optKey).get('tarif').setValue(this.numberOption.value);
                this.field.produitsOptions.find( opt => opt.name === this.optKey ).tarif = this.numberOption.value;
            }  else if (this.field.type === FieldTypeEnum.TOGGLE_PRESTATIONS) {
                if (this.capacite) {
                    this.form.get(this.field.name).get('capacite').setValue(this.numberOption.value);
                } else {
                    // prestations
                    this.form.get(this.field.name).get('prestations').get(this.prestationName).get('options').get(this.optionName)
                                                    .get('tarif').setValue(this.numberOption.value);
                    this.field.prestations.find( p => p.name === this.prestationName).options.find( opt => opt.name === this.optionName)
                                                    .tarif = this.numberOption.value;
                }
            } else {
                this.form.get(this.field.name).get(this.numberOption.label).setValue(this.numberOption.value);
            }
        } else {
            this.numberOption.value = this.numberOption.value < 1 ? 1 : this.numberOption.value;
            if (this.addVehicle) {
                switch (this.numberOption.label) {
                    case `Tarif par jour`:
                        this.form.get('tarifParJour').setValue(this.numberOption.value);
                        break;
                    case `Distance location max`:
                        this.form.get('distance').setValue(this.numberOption.value);
                        break;
                    case `Kilométrage inclus`:
                        this.form.get('kilometrageInclus').setValue(this.numberOption.value);
                        break;
                    case `Tarif / Kilomètre sup`:
                        this.form.get('tarifParKilometre').setValue(this.numberOption.value);
                        break;
                    default:
                        break;
                }
            } else {
                this.form.get('value').setValue(this.numberOption.value);
            }
        }
    }
    valueWasEdited(value: any) {
        this.numberOption.value = value;
        if (this.field) {
            this.numberOption.value = this.numberOption.value < this.baseValue ? this.baseValue : this.numberOption.value;
            if (this.field.type === FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER) {
                if (this.nbrOpt) {
                    this.form.get(this.field.name).get(this.numberOption.label).setValue(this.numberOption.value);
                } else {
                    // tslint:disable-next-line:max-line-length
                    this.form.get(this.field.name).get(this.field[this.numberCheckBoxOptionsNumber].name).get(this.numberOption.label).setValue(this.numberOption.value);
                }
            } else if (this.field.type === FieldTypeEnum.TOGGLE_NUMBER_RADIO) {
                if (this.calledFromRadio) {
                    // tslint:disable-next-line:max-line-length
                    this.form.get(this.field.name).get(this.field.radioCriteriaName).get(this.numberOption.label).setValue(this.numberOption.value);
                } else {
                    this.form.get(this.field.name).get(this.field.name).get(this.numberOption.label).setValue(this.numberOption.value);
                }
            }  else if (this.field.type === FieldTypeEnum.CHECK_BOX_NUMBER && this.calledFromCheckBox) {
                this.form.get(this.field.name).get(this.field.name).get(`${this.optKey}Tarif`).setValue(this.numberOption.value);
            } else if (this.field.type === FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST) {
                const fieldName: string = this.subField.name;
                const index = this.field.optionsToggleNumberRadioList.findIndex( opt => opt.name === fieldName);
                // tslint:disable-next-line:max-line-length
                this.form.get(this.field.name).get(this.field.optionsToggleNumberRadioList[index].name).get(`tarif`).setValue(this.numberOption.value);
            }  else if (this.field.type === FieldTypeEnum.TOGGLE_NUMBER_LIST_OPTIONS) {
                if (this.livraison) {
                    this.form.get(this.field.name).get('livraison')
                    .setValue({tarif: this.numberOption.value, value: this.field.livraison.value});
                } else {
                    const fieldName: string = this.subField.name;
                    const index = this.field.optionsToggleNumberListOptions.findIndex( opt => opt.name === fieldName);
                    // tslint:disable-next-line:max-line-length
                    this.form.get(this.field.name).get(this.field.optionsToggleNumberListOptions[index].name).get(`opts`).get(this.numberOption.label).setValue({step: this.numberOption.step, value: this.numberOption.value, unit: this.numberOption.unit});
                }
            } else if (this.field.type === FieldTypeEnum.TOGGLE_NUMBER_LIST) {
                const fieldName: string = this.subField.name;
                const index = this.field.optionsToggleNumberList.findIndex( opt => opt.name === fieldName);
                // tslint:disable-next-line:max-line-length
                this.form.get(this.field.name).get(this.field.optionsToggleNumberList[index].name).get(`tarif`).setValue(this.numberOption.value);
            } else if (this.field.type === FieldTypeEnum.CHECKBOX_NUMBER_LIST) {
                if (this.field.name === 'creationAlbum') {
                    const formatIndex = this.field.formats.findIndex( f => f.name === this.format.name );
                    const modeleIndex = this.field.formats[formatIndex].modeles.findIndex( m => m.name ===  this.modele.name);
                    const checked = this.field.formats[formatIndex].modeles[modeleIndex].checked;
                    this.form.get(this.field.name).get('formats').get(this.format.name).get(this.modele.name)
                    .setValue({tarif: this.numberOption.value, checked});
                } else {
                    this.form.get(this.field.name).get('formats').get(this.format.name).get(this.modele.name)
                    .setValue({tarif: this.numberOption.value});                }
            } else if (this.field.type === FieldTypeEnum.TOGGLE_FORMATS_LIST) {
                this.form.get(this.field.name).get(this.format.name).get('options').get(this.modele.name).setValue(this.numberOption.value);
            } else if (this.field.type === FieldTypeEnum.TOGGLE_VOITURE_LIST) {
                if (this.isForNbrPlaces) {
                    this.form.get(this.field.name).get(this.format.name).get('nbrPlace').setValue(this.numberOption.value);
                } else {
                    this.form.get(this.field.name).get(this.format.name).get('options').get(this.modele.name).setValue(this.numberOption.value);
                }
            }  else if (this.field.type === FieldTypeEnum.RADIO_NUMBER) {
                this.form.get(this.field.name).get('tarifs').get(this.numberOption.label).setValue(this.numberOption.value);
            } else if (this.field.type === FieldTypeEnum.TOGGLE_VIN_HONNEUR_COCKTAIL_BUFFET) {
                if (this.quantity) {
                    this.form.get(this.field.name).get('quantity').setValue(this.numberOption.value);
                    this.field.quantity = this.numberOption.value;
                } else {
                    this.form.get(this.field.name).get('products')
                            .get(this.product.name).get(this.option.name).get('tarif').setValue(this.numberOption.value);
                    // tslint:disable-next-line:no-unused-expression
                    this.field.products.find( product => product.name === this.product.name )
                                        .options.find( opt => opt.name === this.option.name).tarif = this.numberOption.value;
                }
            } else if (this.field.type === FieldTypeEnum.TOGGLE_DINNER) {
                if (this.convivesMin) {
                    this.form.get(this.field.name).get('convivesMin').setValue(this.numberOption.value);
                    this.field.convivesMin = this.numberOption.value;
                } else if (this.dinerCapacite) {
                    this.form.get(this.field.name).get('dinerCapacite').setValue(this.numberOption.value);
                    this.field.dinerCapacite = this.numberOption.value;
                } else {
                    this.form.get(this.field.name).get('products')
                            .get(this.product.name).get(this.option.name).get('tarif').setValue(this.numberOption.value);
                    // tslint:disable-next-line:no-unused-expression
                    this.field.products.find( product => product.name === this.product.name )
                                        .options.find( opt => opt.name === this.option.name).tarif = this.numberOption.value;
                }
            }  else if (this.field.type === FieldTypeEnum.TOGGLE_MAJORATION) {
                this.form.get(this.field.name).get('options').get(this.majName).setValue(this.numberOption.value);
                this.field.majOptions.find( opt => opt.name === this.majName ).majoration = this.numberOption.value;
            }  else if (this.field.type === FieldTypeEnum.TOGGLE_PRODUITS_ACCESSOIRES) {
                this.form.get(this.field.name).get('options').get(this.optKey).get('tarif').setValue(this.numberOption.value);
                this.field.produitsOptions.find( opt => opt.name === this.optKey ).tarif = this.numberOption.value;
            } else if (this.field.type === FieldTypeEnum.TOGGLE_PRESTATIONS) {
                if (this.capacite) {
                    this.form.get(this.field.name).get('capacite').setValue(this.numberOption.value);
                } else {
                    // prestations
                    this.form.get(this.field.name).get('prestations').get(this.prestationName).get('options').get(this.optionName)
                                                    .get('tarif').setValue(this.numberOption.value);
                    this.field.prestations.find( p => p.name === this.prestationName).options.find( opt => opt.name === this.optionName)
                                                    .tarif = this.numberOption.value;
                }
            } else {
                this.form.get(this.field.name).get(this.numberOption.label).setValue(this.numberOption.value);
            }
        } else {
            this.numberOption.value = this.numberOption.value < 1 ? 1 : this.numberOption.value;
            if (this.addVehicle) {
                switch (this.numberOption.label) {
                    case `Tarif par jour`:
                        this.form.get('tarifParJour').setValue(this.numberOption.value);
                        break;
                    case `Distance location max`:
                        this.form.get('distance').setValue(this.numberOption.value);
                        break;
                    case `Kilométrage inclus`:
                        this.form.get('kilometrageInclus').setValue(this.numberOption.value);
                        break;
                    case `Tarif / Kilomètre sup`:
                        this.form.get('tarifParKilometre').setValue(this.numberOption.value);
                        break;
                    default:
                        break;
                }
            } else {
                this.form.get('value').setValue(this.numberOption.value);
            }
        }
    }
    ngOnInit() {
        this.setFxLayoutGap();
        if (this.field) {
            this.baseValue = this.field.name === 'tiragePapier' ? 0.05 : 1;
            this.setMarginRight();
            this.setNumberLabel();
            if (this.field.name === 'services' || this.field.name === 'activites' || this.field.name === 'dorures'
            || this.field.name === 'servicesAssocies' || this.field.name === 'decorationAssociees'
            || this.field.name === 'effets' || this.field.name === 'programmes' || this.field.name === 'complements') {
                this.label = `option's fees`;
            } else if (this.field.name === 'produitsSales' || this.field.name === 'produitsSucres' || this.field.name === 'entrees'
            || this.field.name === 'entrees' || this.field.name === 'plats' || this.field.name === 'accompagnements'
            || this.field.name === 'accompagnements' || this.field.name === 'fromages' || this.field.name === 'desserts'
            || this.field.name === 'boissonsAlcoolises' || this.field.name === 'boissonsNonAlcoolises') {
                this.label = `unit price`;
            } else if (this.field.name === 'animations' || this.field.name === 'materiels') {
                this.label = `fees`;
            } else if (this.field.name === 'lachers') {
                this.label = `fees per unity`;
            }
        }

    }
}
