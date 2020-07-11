import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicFormFieldInterface } from '../models/dynamic-form-field-interface';
import { FieldTypeEnum } from '../models/field-type.enum';
import { FieldBuilderComponent } from '../field-builder/field-builder.component';

@Component({
  selector: 'app-dynamic-form-builder',
  templateUrl: './dynamic-form-builder.component.html',
  styleUrls: ['./dynamic-form-builder.component.scss']
})
export class DynamicFormBuilderComponent implements OnInit {

  @Input() fields: DynamicFormFieldInterface[] = [];
  @Output() addOption: EventEmitter<any>;
  @Output() checkBoxChange: EventEmitter<any>;
  @ViewChild('appFieldBuilder') appFieldBuilderComponent: FieldBuilderComponent;
  form: FormGroup;
  constructor() {
    this.addOption = new EventEmitter<any>();
    this.checkBoxChange = new EventEmitter<any>();
  }
  ngOnInit() {
    const fieldsCtrls = {};
    for (const f of this.fields) {
      if (f.type === FieldTypeEnum.CHECK_BOX
          || f.type === FieldTypeEnum.TOGGLE_CHECKBOX
          || f.type === FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER
          || f.type === FieldTypeEnum.TOGGLE_RADIO
          || f.type === FieldTypeEnum.CHECK_BOX_NUMBER
          || f.type === FieldTypeEnum.TOGGLE_NUMBER_RADIO
          || f.type === FieldTypeEnum.TOGGLE_NUMBER) {
        const opts = {};
        if (f.type !== FieldTypeEnum.TOGGLE_RADIO
          && f.type === FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER
          && f.type !== FieldTypeEnum.TOGGLE_NUMBER_RADIO) {
          const numberCheckBoxOpt = {};
          const numberCheckBoxOpt2 = {};
          const numberCheckBoxOpt3 = {};
          const numberCheckBoxOpt4 = {};
          const checkBoxOpt = {};
          if (f.numberCheckBoxOptionsNumber.options) {
            for (const opt of f.numberCheckBoxOptionsNumber.options) {
              numberCheckBoxOpt[opt.label] = new FormControl(opt.value);
            }
          }
          if (f.numberCheckBoxOptionsNumber2.options.length) {
            for (const opt of f.numberCheckBoxOptionsNumber2.options) {
              numberCheckBoxOpt2[opt.label] = new FormControl(opt.value);
            }
          }
          if (f.numberCheckBoxOptionsNumber3.options.length) {
            for (const opt of f.numberCheckBoxOptionsNumber3.options) {
              numberCheckBoxOpt3[opt.label] = new FormControl(opt.value);
            }
          }
          if (f.numberCheckBoxOptionsNumber4.options.length) {
            for (const opt of f.numberCheckBoxOptionsNumber4.options) {
              numberCheckBoxOpt4[opt.label] = new FormControl(opt.value);
            }
          }
          if (f.numberCheckBoxOptions.options) {
            for (const opt of f.numberCheckBoxOptions.options) {
              checkBoxOpt[opt.key] = new FormControl(opt.value);
            }
          }
          if (f.nbrOpt) {
            opts[f.nbrOpt.label] = new FormControl(f.nbrOpt.value);
          }
          if (f.options.length && f.radioCriteriaName && f.radioValue) {
            opts[f.radioCriteriaName] = new FormControl(f.radioValue);
          }
          // number fromGroup
          opts[f.numberCheckBoxOptionsNumber.name] = new FormGroup(numberCheckBoxOpt);
          opts[f.numberCheckBoxOptionsNumber2.name] = new FormGroup(numberCheckBoxOpt2);
          opts[f.numberCheckBoxOptionsNumber3.name] = new FormGroup(numberCheckBoxOpt3);
          opts[f.numberCheckBoxOptionsNumber4.name] = new FormGroup(numberCheckBoxOpt4);
          // checkbox fromGroup
          opts[f.numberCheckBoxOptions.name] = new FormGroup(checkBoxOpt);
          opts[f.name] = new FormControl(f.value || false, Validators.required);
        }


        if (f.type !== FieldTypeEnum.TOGGLE_RADIO && f.type !== FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER
          && f.type === FieldTypeEnum.TOGGLE_NUMBER_RADIO && f.options && f.numberOptions && f.radioNumberOptions) {
          const toggleOpt = {};
          const radioOpt = {};
          for (const opt of f.numberOptions) {
            toggleOpt[opt.label] = new FormControl(opt.value);
          }
          for (const opt of f.radioNumberOptions) {
            radioOpt[opt.label] = new FormControl(opt.value);
          }
          // number fromGroup
          toggleOpt[f.name] = new FormControl(f.value);
          opts[f.name] = new FormGroup(toggleOpt);
          // radio fromGroup
          radioOpt[f.radioCriteriaName] = new FormControl(f.radioCriteria);
          opts[f.radioCriteriaName] = new FormGroup(radioOpt);
          // opts[f.name] = new FormControl(f.value || false, Validators.required);
        }
        if (f.type !== FieldTypeEnum.TOGGLE_RADIO && f.type !== FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER
          && f.type === FieldTypeEnum.CHECK_BOX_NUMBER && f.checkboxNumberOptions) {
          const checkboxNumberOpt = {};
          for (const opt of f.checkboxNumberOptions) {
            checkboxNumberOpt[opt.key] = new FormControl(opt.value);
            checkboxNumberOpt[`${opt.key}Tarif`] = new FormControl(opt.tarif);
          }
          // checkboxNumber fromGroup
          // checkboxNumberOpt[f.name] = new FormControl(f.value);
          opts[f.name] = new FormGroup(checkboxNumberOpt);
          // opts[f.name] = new FormControl(f.value || false, Validators.required);
        }


        if (f.type !== FieldTypeEnum.TOGGLE_RADIO && f.type !== FieldTypeEnum.TOGGLE_NUMBER_RADIO
          && f.type !== FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER
          && f.type === FieldTypeEnum.TOGGLE_NUMBER && f.numberOptions) {
          for (const opt of f.numberOptions) {
            opts[opt.label] = new FormControl(opt.value);
          }
          opts[f.name] = new FormControl(f.value || false, Validators.required);
        } else if (f.options && f.type !== FieldTypeEnum.TOGGLE_NUMBER_RADIO && f.type !== FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER) {
          for (const opt of f.options) {
            opts[opt.key] = new FormControl(opt.value);
          }
          if (f.type === FieldTypeEnum.TOGGLE_CHECKBOX) { opts[f.name] = new FormControl(f.value || false, Validators.required); }
        }
        if (f.type === FieldTypeEnum.TOGGLE_RADIO && f.type !== FieldTypeEnum.TOGGLE_NUMBER_RADIO &&
          f.type !== FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER && f.options) {
          for (const opt of f.options) {
            opts[opt.key] = new FormControl(opt.value);
          }
          opts[f.name] = new FormControl(f.value || false, Validators.required);
          opts[f.radioCriteriaName] = new FormControl(f.radioCriteria || false, Validators.required);
        }
        fieldsCtrls[f.name] = new FormGroup(opts);
      } else {
        if (f.type === FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST) {
          const opts = {};
          f.optionsToggleNumberRadioList.forEach(option => {
            const fieldsOpts = {};
            fieldsOpts['value'] = new FormControl(option.value);
            fieldsOpts['inclusDansPrix'] = new FormControl(option.inclusDansPrix);
            fieldsOpts['tarif'] = new FormControl(option.tarif);
            opts[option.name] = new FormGroup(fieldsOpts);
          });
          fieldsCtrls[f.name] = new FormGroup(opts);
        } else if (f.type === FieldTypeEnum.TOGGLE_NUMBER_LIST) {
          const opts = {};
          f.optionsToggleNumberList.forEach(option => {
            const fieldsOpts = {};
            fieldsOpts['value'] = new FormControl(option.value);
            fieldsOpts['tarif'] = new FormControl(option.tarif);
            fieldsOpts['label'] = new FormControl(option.label);
            opts[option.name] = new FormGroup(fieldsOpts);
          });
          fieldsCtrls[f.name] = new FormGroup(opts);
        } else if (f.type === FieldTypeEnum.TOGGLE_LIST) {
          const opts = {};
          f.optionsToggleList.forEach(option => {
            const fieldsOpts = {};
            fieldsOpts['value'] = new FormControl(option.value);
            opts[option.name] = new FormGroup(fieldsOpts);
          });
          fieldsCtrls[f.name] = new FormGroup(opts);
        }  else if (f.type === FieldTypeEnum.TOGGLE_NUMBER_LIST_OPTIONS) {
          const opts = {};
          f.optionsToggleNumberListOptions.forEach(option => {
            const fieldsOpts = {};
            fieldsOpts['value'] = new FormControl(option.value);
            fieldsOpts['name'] = new FormControl(option.name);
            fieldsOpts['label'] = new FormControl(option.label);
            const optionOpts = {};
            option.opts.forEach(opt => {
              const optss = {};
              optss['step'] = new FormControl(opt.step);
              optss['value'] = new FormControl(opt.value);
              optss['unit'] = new FormControl(opt.unit);
              optionOpts[opt.name] = new FormGroup(optss);
            });
            fieldsOpts['opts'] = new FormGroup(optionOpts);
            opts[option.name] = new FormGroup(fieldsOpts);
          });
          const livraison = {};
          livraison['value'] = new FormControl(f.livraison.value);
          livraison['tarif'] = new FormControl(f.livraison.tarif);
          opts['livraison'] = new FormGroup(livraison);

          opts['value'] = new FormControl(f.value);

          fieldsCtrls[f.name] = new FormGroup(opts);
        }  else if (f.type === FieldTypeEnum.CHECKBOX_NUMBER_LIST) {
          if (f.name === 'creationAlbum') {
            const opts = {};
            const finitionsOpts = {};
            f.finitions.forEach(finition => {
              finitionsOpts[finition.key] = new FormControl(finition.value);
              opts['finitions'] = new FormGroup(finitionsOpts);
            });
            const formatsOpts = {};
            f.formats.forEach(format => {
              const modelesOpts = {};
              format.modeles.forEach(modele => {
                const modOpts = {};
                modOpts['tarif'] = new FormControl(modele.tarif);
                modOpts['checked'] = new FormControl(modele.checked);
                modelesOpts[modele.name] = new FormGroup(modOpts);
              });
              modelesOpts[`value`] = new FormControl(format.value);
              formatsOpts[format.name] = new FormGroup(modelesOpts);
              opts['formats'] = new FormGroup(formatsOpts);
            });
            opts['value'] = new FormControl(f.value);
            fieldsCtrls[f.name] = new FormGroup(opts);
          } else {
            const opts = {};
            const finitionsOpts = {};
            f.finitions.forEach(finition => {
              finitionsOpts[finition.key] = new FormControl(finition.value);
              opts['finitions'] = new FormGroup(finitionsOpts);
            });
            const formatsOpts = {};
            f.formats.forEach(format => {
              const modelesOpts = {};
              format.modeles.forEach(modele => {
                const modOpts = {};
                modOpts['tarif'] = new FormControl(modele.tarif);
                modelesOpts[modele.name] = new FormGroup(modOpts);
              });
              modelesOpts[`value`] = new FormControl(format.value);
              formatsOpts[format.name] = new FormGroup(modelesOpts);
              opts['formats'] = new FormGroup(formatsOpts);
            });
            opts['value'] = new FormControl(f.value);
            fieldsCtrls[f.name] = new FormGroup(opts);
          }
        }  else if (f.type === FieldTypeEnum.TOGGLE_FORMATS_LIST) {
          const opts = {};
          f.optionsToggleFormatsList.forEach(option => {
            const fieldsOpts = {};
            const options = {};
            option.numberOption.forEach(nbrOpt => {
              options[nbrOpt.name] = new FormControl(nbrOpt.value);
            });
            fieldsOpts['value'] = new FormControl(option.value);
            fieldsOpts['options'] = new FormGroup(options);
            opts[option.name] = new FormGroup(fieldsOpts);
          });
          fieldsCtrls[f.name] = new FormGroup(opts);
        }  else if (f.type === FieldTypeEnum.TOGGLE_VOITURE_LIST) {
          const opts = {};
          f.voitures.forEach(option => {
            const fieldsOpts = {};
            const options = {};
            option.options.forEach(nbrOpt => {
              options[nbrOpt.name] = new FormControl(nbrOpt.value);
            });
            fieldsOpts['value'] = new FormControl(option.value);
            fieldsOpts['categorie'] = new FormControl(option.categorie);
            if (option.nbrPlace) { fieldsOpts['nbrPlace'] = new FormControl(option.nbrPlace); }
            fieldsOpts['options'] = new FormGroup(options);
            opts[option.name] = new FormGroup(fieldsOpts);
          });
          fieldsCtrls[f.name] = new FormGroup(opts);
        }  else if (f.type === FieldTypeEnum.TOGGLE_NUMBER_TIME) {
          const opts = {};
          f.numberOptionsTime.forEach(opt => {
            console.log('opt', opt);
            opts['hourValue'] = new FormControl(opt.hourValue);
            opts['minValue'] = new FormControl(opt.minValue);
            if (opt.label === 'limiteHoraire') {
              opts['value'] = new FormControl(opt.value);
            }
            fieldsCtrls[opt.label] = new FormGroup(opts);
          });
        } else if (f.type === FieldTypeEnum.RADIO_NUMBER) {
          const opts = {};
          const tarifs = {};
          let type = '';
          f.options.forEach(radioOpt => {
            if (radioOpt.value) {
              type = radioOpt.key;
            }
          });
          f.tarifs.forEach(tarif => {
            tarifs[tarif.label] = new FormControl(tarif.value);
          });
          opts['type'] = new FormControl(type);
          opts['tarifs'] = new FormGroup(tarifs);
          fieldsCtrls[f.name] = new FormGroup(opts);
        } else if (f.type === FieldTypeEnum.TOGGLE_VIN_HONNEUR_COCKTAIL_BUFFET || f.type === FieldTypeEnum.TOGGLE_DINNER) {
          const opts = {};
          const products = {};
          f.products.forEach(product => {
            const options = {};
            product.options.forEach( (opt) => {
              const fieldsOpts = {};
              fieldsOpts['value'] = new FormControl(opt.value);
              fieldsOpts['tarif'] = new FormControl(opt.tarif);
              fieldsOpts['label'] = new FormControl(opt.label);
              options[opt.name] = new FormGroup(fieldsOpts);
            } );
            products[product.name] = new FormGroup(options);
          });
          opts['value'] = new FormControl(f.value);
          opts['products'] = new FormGroup(products);
          if (f.type === FieldTypeEnum.TOGGLE_VIN_HONNEUR_COCKTAIL_BUFFET) {
            opts['quantity'] = new FormControl(f.quantity);
          } else if (f.type === FieldTypeEnum.TOGGLE_DINNER){
            opts['dinerCapacite'] = new FormControl(f.dinerCapacite);
            opts['convivesMin'] = new FormControl(f.convivesMin);
          }
          fieldsCtrls[f.name] = new FormGroup(opts);
        } else if (f.type === FieldTypeEnum.TOGGLE_MAJORATION) {
          const opts = {};
          const majOptions = {};
          f.majOptions.forEach(opt => {
            majOptions[opt.name] = new FormControl(opt.majoration);
          });
          opts['options'] = new FormGroup(majOptions);
          opts['value'] = new FormControl(f.value);
          fieldsCtrls[f.name] = new FormGroup(opts);
        } else if (f.type === FieldTypeEnum.TOGGLE_PRODUITS_ACCESSOIRES) {
          const opts = {};
          const produitsOptions = {};
          f.produitsOptions.forEach(opt => {
            const optss = {};
            optss['checked'] = new FormControl(opt.checked);
            optss['tarif'] = new FormControl(opt.tarif);
            produitsOptions[opt.name] = new FormGroup(optss);
          });
          opts['options'] = new FormGroup(produitsOptions);
          opts['value'] = new FormControl(f.value);
          fieldsCtrls[f.name] = new FormGroup(opts);
        } else if (f.type === FieldTypeEnum.TOGGLE_PRESTATIONS) {
          const opts = {};
          const prestationsOptions = {};
          f.prestations.forEach(prestation => {
            const optss = {};
            const options = {};
            prestation.options.forEach(opt => {
              optss[opt.name] = new FormGroup({tarif: new FormControl(opt.tarif)});
            });
            options['options'] = new FormGroup(optss);
            prestationsOptions[prestation.name] = new FormGroup(options);
          });
          opts['prestations'] = new FormGroup(prestationsOptions);
          opts['capacite'] = new FormControl(f.capacite);
          opts['value'] = new FormControl(f.value);
          fieldsCtrls[f.name] = new FormGroup(opts);
        } else if (f.type === FieldTypeEnum.TOGGLE_SIMPLE) {
          fieldsCtrls[f.name] = new FormControl(f.value || false, Validators.required);
        } else {
          fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required);
        }
      }
    }
    this.form = new FormGroup(fieldsCtrls);
    console.log('form', this.form);
  }

}
