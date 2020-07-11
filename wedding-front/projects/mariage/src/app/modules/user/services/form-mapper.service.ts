import { Injectable } from '@angular/core';
import { FieldTypeEnum } from '../../shared/components/dynamic-form-builder/models/field-type.enum';
import { DynamicFormFieldInterface } from '../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { DialogService } from './dialog.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FormMapperService {
	fieldWithAddedCheckBoxOpt: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	fieldWithAddedToggleProduit: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	fieldWithAddedCheckBoxNumberListOpt: BehaviorSubject<any> = new BehaviorSubject<any>(null); // album photos et tirage papiers
    constructor(private readonly dialogService: DialogService,
                private readonly toastrService: ToastrService,
                private readonly translateService: TranslateService) { }

    // tslint:disable-next-line:max-line-length
    public initToggleNumberRadioList(criteria: {name: string, type: string}, displayName: string, numberOpt: {label: string, unit: string, step: number}, options: {value: boolean, name: string, label: string, inclusDansPrix: boolean, tarif: number}[]) {
        // tslint:disable-next-line:max-line-length
        const optionsToggleNumberRadioList: {value: boolean, name: string, label: string, inclusDansPrix: boolean, tarif: number, numberOption: {value: number, label: string, unit: string, step: number}}[]
                                        = [];
        options.forEach(opt => {
            optionsToggleNumberRadioList.push(
                {
                    value: opt.value,
                    name: opt.name,
                    label: opt.label,
                    inclusDansPrix: opt.inclusDansPrix,
                    tarif: opt.tarif,
                    numberOption: {
                        value: opt.tarif,
                        label: numberOpt.label,
                        step: numberOpt.step,
                        unit: numberOpt.unit,

                    },
                },
            );
        });
        const object: DynamicFormFieldInterface = {
            name: criteria.name,
            type: criteria.type,
            displayName,
            label: '',
            required: true,
            optionsToggleNumberRadioList,
        };
        return object;
    }
    // tslint:disable-next-line:max-line-length
    public initToggleNumberList(criteria: {name: string, type: string}, displayName: string, numberOpt: {label: string, unit: string, step: number}, options: {value: boolean, name: string, label: string, tarif: number}[]) {
        // tslint:disable-next-line:max-line-length
        const optionsToggleNumberList: {value: boolean, name: string, label: string, tarif: number, numberOption: {value: number, label: string, unit: string, step: number}}[]
                                        = [];
        options.forEach(opt => {
            optionsToggleNumberList.push(
                {
                    value: opt.value,
                    name: opt.name,
                    label: opt.label,
                    tarif: opt.tarif,
                    numberOption: {
                        value: opt.tarif,
                        label: numberOpt.label,
                        step: numberOpt.step,
                        unit: numberOpt.unit,

                    },
                },
            );
        });
        const object: DynamicFormFieldInterface = {
            name: criteria.name,
            type: criteria.type,
            displayName,
            label: '',
            required: true,
            optionsToggleNumberList,
        };
        console.log('object', object);
        return object;
    }
    // tslint:disable-next-line:max-line-length
    public initToggleNumberListOptions(criteria: {name: string, displayName: string, type: string,
                                       value: boolean, secondaryDisplayName: string, secondaryLabel: string},
                                       livraison: {value: boolean, tarif: number, displayName: string, label: string},
                                       options: {value: boolean, name: string, label: string,
                                                opts: {name: string, value: number, step: number, unit: string}[]}[]) {
        const object: DynamicFormFieldInterface = {
            name: criteria.name,
            type: criteria.type,
            value: criteria.value,
            displayName: criteria.displayName,
            secondaryDisplayName: criteria.secondaryDisplayName,
            secondaryLabel: criteria.secondaryLabel,
            label: '',
            required: true,
            optionsToggleNumberListOptions: options,
            livraison,
        };
        console.log('object', object);
        return object;
    }
    // tslint:disable-next-line:max-line-length
    public initToggleVinHonneur(criteria: {name: string, displayName: string, type: string, label: string, quantity: number
                                       value: boolean, secondaryDisplayName: string, secondaryLabel: string},
                                       step: number, unit: string,
                                       products: {name: string, options: {field?: string,
                                                                          search?: string,
                                                                          value: boolean,
                                                                          name: string,
                                                                          label: string,
                                                                          tarif: number,
                                                                          step?: number,
                                                                          unit?: string}[]}[]) {
        products.forEach( product => {
            product.options.map( opt => { opt.step = step; opt.unit = unit; } );
        } );
        const object: DynamicFormFieldInterface = {
            name: criteria.name,
            type: criteria.type,
            value: criteria.value,
            displayName: criteria.displayName,
            secondaryDisplayName: criteria.secondaryDisplayName,
            secondaryLabel: criteria.secondaryLabel,
            label: criteria.label,
            required: true,
            products,
            quantity: criteria.quantity,
        };
        console.log('object', object);
        return object;
    }
    // tslint:disable-next-line:max-line-length
    public initToggleDinner(criteria: {name: string, displayName: string, type: string, label: string, dinerCapacite: number, convivesMin: number,
                                       value: boolean, secondaryDisplayName: string, secondaryLabel: string},
                                       step: number, unit: string,
                                       products: {name: string, options: {field?: string,
                                                                          search?: string,
                                                                          value: boolean,
                                                                          name: string,
                                                                          label: string,
                                                                          tarif: number,
                                                                          step?: number,
                                                                          unit?: string}[]}[]) {
        products.forEach( product => {
            product.options.map( opt => { opt.step = step; opt.unit = unit; } );
        } );
        const object: DynamicFormFieldInterface = {
            name: criteria.name,
            type: criteria.type,
            value: criteria.value,
            displayName: criteria.displayName,
            secondaryDisplayName: criteria.secondaryDisplayName,
            secondaryLabel: criteria.secondaryLabel,
            label: criteria.label,
            required: true,
            products,
            dinerCapacite: criteria.dinerCapacite,
            convivesMin: criteria.convivesMin,
        };
        console.log('object', object);
        return object;
    }
    // tslint:disable-next-line:max-line-length
    public initTogglePrestations(criteria: {name: string, displayName: string, type: string, label: string, capacite: number,
                                       value: boolean, secondaryLabel: string},
                                       step: number, unit: string, label: string,
                                       prestations: {name: string, field?: string, search?: string,
                                                    options: {
                                                                          name: string,
                                                                          label?: string,
                                                                          tarif: number,
                                                                          step?: number,
                                                                          unit?: string}[]}[]) {
        prestations.forEach( prestation => {
            prestation.options.map( opt => { opt.step = step; opt.unit = unit; opt.label = label;} );
        } );
        const object: DynamicFormFieldInterface = {
            name: criteria.name,
            type: criteria.type,
            value: criteria.value,
            displayName: criteria.displayName,
            secondaryLabel: criteria.secondaryLabel,
            label: criteria.label,
            required: true,
            prestations,
            capacite: criteria.capacite,
        };
        console.log('object', object);
        return object;
    }
    // tslint:disable-next-line:max-line-length
    public initToggleFormatsList(criteria: {name: string, type: string}, displayName: string,
                                 numberOpt: {label: string, unit: string, step: number},
                                 formats: {value: boolean, name: string, label: string, options: {name: string, tarif: number}[]}[]) {
        // tslint:disable-next-line:max-line-length
        const optionsToggleFormatsList: {value: boolean, name: string, label: string,
            numberOption: {name: string, value: number, label: string, unit: string, step: number}[]}[]
                                        = [];
        formats.forEach(opt => {
            const numberOptions: {name: string, value: number, label: string, unit: string, step: number}[] = [];
            opt.options.forEach(nbrOpt => {
                numberOptions.push({
                    label: numberOpt.label,
                    unit: numberOpt.unit,
                    step: numberOpt.step,
                    name: nbrOpt.name,
                    value: nbrOpt.tarif,
                });
            });
            optionsToggleFormatsList.push(
                {
                    value: opt.value,
                    name: opt.name,
                    label: opt.label,
                    numberOption: numberOptions,
                },
            );
        });
        const object: DynamicFormFieldInterface = {
            name: criteria.name,
            type: criteria.type,
            displayName,
            label: '',
            required: true,
            optionsToggleFormatsList,
        };
        console.log('object formats', object);
        return object;
    }
    // tslint:disable-next-line:max-line-length
    public initToggleVoitureList(criteria: {name: string, type: string, displayName: string},
                                 // tslint:disable-next-line:max-line-length
                                 voitures: {value: boolean, name: string, label: string, categorie: string, options: {name: string, value: number, unit: string, step: number}[], nbrPlace?: number}[]) {
        const object: DynamicFormFieldInterface = {
            name: criteria.name,
            type: criteria.type,
            displayName: criteria.displayName,
            label: '',
            required: true,
            voitures,
        };
        console.log('object voitures', object);
        return object;
    }
    // tslint:disable-next-line:max-line-length
    public initToggleList(criteria: {name: string, type: string}, displayName: string, options: {value: boolean, name: string, label: string}[]) {
        const object: DynamicFormFieldInterface = {
            name: criteria.name,
            type: criteria.type,
            displayName,
            label: '',
            required: true,
            optionsToggleList: options,
        };
        console.log('object', object);
        return object;
    }
    // tslint:disable-next-line:max-line-length
    public initCheckBoxNumberList(criteria: {value: boolean, name: string, type: string, displayName: string, label: string},
                                  checkboxOpt: {name: string, label: string, value: string[], default: string[]},
                                  // tslint:disable-next-line:max-line-length
                                  formatsValue: {name: string, modeles: {name: string, tarif: number, checked?: boolean}[], value?: boolean}[],
                                  numberOptions: {label: string, unit: string, step: number},
                                  formatLabel: string) {
        const finitions: {key: string, value: boolean}[] = [];
        // tslint:disable-next-line:max-line-length
        const formats: {name: string, label: string, modeles: {name: string, tarif: number, label: string, unit: string, step: number, checked?: boolean}[], value?: boolean}[] = [];
        formatsValue.forEach(element => {
            const modeles = [];
            element.modeles.forEach(modele => {
                if (criteria.name === 'creationAlbum') {
                // tslint:disable-next-line:max-line-length
                modeles.push({name: modele.name, tarif: modele.tarif, label: numberOptions.label, unit: numberOptions.unit, step: numberOptions.step, checked: modele.checked});
                } else {
                // tslint:disable-next-line:max-line-length
                modeles.push({name: modele.name, tarif: modele.tarif, label: numberOptions.label, unit: numberOptions.unit, step: numberOptions.step});
                }
            });
            if (criteria.name === 'creationAlbum') {
                formats.push({
                    name: element.name,
                    label: formatLabel,
                    value: element.value,
                    modeles,
                });
            } else {
                formats.push({
                    name: element.name,
                    value: element.value,
                    label: formatLabel,
                    modeles,
                });
            }
        });
        checkboxOpt.default.forEach(defaultVal => {
            let tmpVal = false;
            checkboxOpt.value.forEach(val => {
                if (defaultVal.toLowerCase() === val.toLowerCase()) { tmpVal = true; }
            });
            finitions.push({key: defaultVal, value: tmpVal});
        });

        const object: DynamicFormFieldInterface = {
            name: criteria.name,
            type: criteria.type,
            value: criteria.value,
            displayName: criteria.displayName,
            label: criteria.label,
            required: true,
            finitions,
            formats,
            checkbox: {name: checkboxOpt.name, label: checkboxOpt.label}
        };
        console.log('object', object);
        return object;
    }
        // tslint:disable-next-line:max-line-length
    public initCheckBoxField(criteriaName: string, displayName: string, label: string, showAddFieldBtn: boolean, criteria: string[], options: {key: string, label: string, value?: any}[]): DynamicFormFieldInterface {
        criteria.forEach(criteriaElement => {
            let criteriaExist = false;
            options.forEach(opt => {
                if (criteriaElement === opt.key) {
                    opt.value = true;
                    criteriaExist = true;
                }
            });
            if (!criteriaExist) {
                options.unshift({key: criteriaElement, label: criteriaElement, value: true});
            }
        });
        const checkBoxField: DynamicFormFieldInterface = {
            name: criteriaName,
            label,
            type: FieldTypeEnum.CHECK_BOX,
            required: true,
            options,
            showAddFieldBtn,
            displayName
        };
        return checkBoxField;
    }
        // tslint:disable-next-line:max-line-length
    public initCheckBoxNumberField(criteriaName: string, displayName: string, label: string, showAddFieldBtn: boolean, criteria: {name: string, value: number, tarif?: number}[], options: {key: string, label: string, value?: any, tarif: number, numberOpt: {value?: number, label: string, unit: string, step: number}}[]): DynamicFormFieldInterface {
        criteria.forEach(criteriaElement => {
            let criteriaExist = false;
            options.forEach(opt => {
                if (criteriaElement.name === opt.key) {
                    opt.value = true;
                    criteriaElement.tarif = criteriaElement.value;
                    opt.numberOpt.value = criteriaElement.value;
                    criteriaExist = true;
                }
            });
            if (!criteriaExist) {
                options.unshift({key: criteriaElement.name, label: criteriaElement.name, value: true, tarif: criteriaElement.value,
                    // tslint:disable-next-line:max-line-length
                    numberOpt: {value: options[0].numberOpt.value, label: options[0].numberOpt.label, unit: options[0].numberOpt.unit, step: options[0].numberOpt.step}});
            }
        });
        const checkBoxField: DynamicFormFieldInterface = {
            name: criteriaName,
            label,
            type: FieldTypeEnum.CHECK_BOX_NUMBER,
            required: true,
            checkboxNumberOptions: options,
            showAddFieldBtn,
            displayName
        };
        console.log('checkBoxField', checkBoxField);
        return checkBoxField;
    }
    // tslint:disable-next-line:max-line-length
    public initRadioNumberField(criteriaName: string, displayName: string, label: string, criteria: number, showAddFieldBtn: boolean, options: {key: string, label: string, value?: any}[]): DynamicFormFieldInterface {
        const criteriaExistByDefault: boolean = !!options.filter( opt => opt.value === criteria).length;
        if (!criteriaExistByDefault) {
            options.unshift({key: String(criteria), label: options[0].label || '', value: criteria});
        }
        const object: DynamicFormFieldInterface = {
            name: criteriaName,
            label,
            value: criteria,
            type: FieldTypeEnum.RADIO,
            required: true,
            options,
            showAddFieldBtn,
            displayName
        };
        return object;
    }
    // tslint:disable-next-line:max-line-length
    public initRadioNumber(criteria: {name: string, displayName: string, label: string}, type: string, radioOpts: {key: string, label: string, value: boolean}[], tarifs: {label: string, step: number, value: number, unit: string}[]): DynamicFormFieldInterface {
        const options: {key: string, label: string, value: boolean}[] = [];
        radioOpts.forEach(opt => {
            if (opt.key === type) {
                options.unshift({key: type, label: opt.label, value: true});
            } else {
                options.push({key: opt.key, label: opt.label, value: opt.value});
            }
        });

        const object: DynamicFormFieldInterface = {
            name: criteria.name,
            label: criteria.label,
            displayName: criteria.displayName,
            type: FieldTypeEnum.RADIO_NUMBER,
            required: true,
            options,
            tarifs,
        };
        console.log('obj mmm', object);
        return object;
    }
    // tslint:disable-next-line:max-line-length
    public initRadioStringField(criteriaName: string, displayName: string, label: string, criteria: string, showAddFieldBtn: boolean, options: {key: string, label: string, value?: any}[]): DynamicFormFieldInterface {
        const criteriaExistByDefault: boolean = !!options.filter( opt => opt.value === criteria).length;
        if (!criteriaExistByDefault) {
            options.unshift({key: criteria, label: criteria.replace(/_/g, ' '), value: criteria});
        }
        const delaisDeLivraisonJoursCheckBoxField: DynamicFormFieldInterface = {
            name: criteriaName,
            label,
            value: criteria,
            type: FieldTypeEnum.RADIO_STRING,
            required: true,
            options,
            showAddFieldBtn,
            displayName
        };
        return delaisDeLivraisonJoursCheckBoxField;
    }
    // tslint:disable-next-line:max-line-length
    public initNumberField(criteriaName: string, displayName: string, label: string, criteriaValue: number, showAddFieldBtn: boolean): DynamicFormFieldInterface {
        return {
            name: criteriaName,
            label,
            type: FieldTypeEnum.NUMBER,
            required: true,
            value: String(criteriaValue),
            showAddFieldBtn,
            displayName
        };
    }
    // tslint:disable-next-line:max-line-length
    public initToggleNumberField(criteria: {name: string, displayName: string, value: boolean, label: string}, showAddFieldBtn: boolean, criteriaOptions: {name: string, value: number, step: number, unit: string}[]): DynamicFormFieldInterface {
                const seanceApresMariageOptions: {step: number, label: string, value: number, unit: string}[] = [];
                criteriaOptions.forEach(element => {
                    seanceApresMariageOptions.push({
                        value: element.value,
                        label: element.name,
                        step: element.step,
                        unit: element.unit
                    });
                });
                return {
                    name: criteria.name,
                    label: criteria.label,
                    type: FieldTypeEnum.TOGGLE_NUMBER,
                    required: true,
                    value: criteria.value,
                    numberOptions: seanceApresMariageOptions,
                    showAddFieldBtn,
                    displayName: criteria.displayName
                };
    }
    // tslint:disable-next-line:max-line-length
    public initToggleNumberTimeField(criteria: {name: string, displayName: string, label: string}, showAddFieldBtn: boolean, criteriaOptions: {name: string, hourValue: number, minValue: number, step: number, value?: boolean}[]): DynamicFormFieldInterface {
                const options: {label: string, hourValue: number, minValue: number, step: number, value?: boolean}[] = [];
                criteriaOptions.forEach(element => {
                    options.push({
                        hourValue: element.hourValue,
                        minValue: element.minValue,
                        label: element.name,
                        step: element.step,
                        value: element.value,
                    });
                });
                const obj = {
                    name: criteria.name,
                    label: criteria.label,
                    type: FieldTypeEnum.TOGGLE_NUMBER_TIME,
                    required: true,
                    numberOptionsTime: options,
                    showAddFieldBtn,
                    displayName: criteria.displayName
                };
                console.log('obj', obj);
                return obj;
    }
    // tslint:disable-next-line:max-line-length
    public initToggleMajCheveux(criteria: {name: string, displayName: string, label: string, type: string, value: boolean},
                                            majOptions: {name: string; majoration: number, label: string, step?: number, unit?: string}[],
                                            optionsNumber: { step: number, unit: string}): DynamicFormFieldInterface {
                majOptions.map( opt => { opt.step = optionsNumber.step; opt.unit = optionsNumber.unit; } );
                const obj = {
                    name: criteria.name,
                    label: criteria.label,
                    type: criteria.type,
                    value: criteria.value,
                    required: true,
                    majOptions,
                    displayName: criteria.displayName
                };
                console.log('obj', obj);
                return obj;
    }
    // tslint:disable-next-line:max-line-length
    public initToggleProduitsAccessoires(criteria: {name: string, displayName: string, label: string, type: string, value: boolean},
                                            // tslint:disable-next-line:max-line-length
                                            produitsOptions: {name: string; tarif: number, label: string, field: string, search: string, checked: boolean, step?: number, unit?: string}[],
                                            optionsNumber: { step: number, unit: string}): DynamicFormFieldInterface {
                produitsOptions.map( opt => { opt.step = optionsNumber.step; opt.unit = optionsNumber.unit; } );
                const obj = {
                    name: criteria.name,
                    label: criteria.label,
                    type: criteria.type,
                    value: criteria.value,
                    required: true,
                    produitsOptions,
                    displayName: criteria.displayName
                };
                console.log('obj', obj);
                return obj;
    }
    // tslint:disable-next-line:max-line-length
    public initToggleCheckBoxNumberField(criteria: {name: string, displayName: string, value: boolean, label: string}, showAddFieldBtn: boolean, step: number, unit: string, criteriaNumberOptions: {name: string, displayName: string, label: string, options: {name: string, tarifUnitaire: number}[]}, criteriaCheckBoxOptions: string[], checkboxDefaultOption: {name: string, displayName: string, label: string, options: {key: string, label: string, value?: any}[]}, criteriaNumberOptions2: {name: string, displayName: string, label: string, options: {name: string, tarifUnitaire: number}[]}, criteriaNumberOptions3: {name: string, displayName: string, label: string, options: {name: string, tarifUnitaire: number}[]}, criteriaNumberOptions4: {name: string, displayName: string, label: string, options: {name: string, tarifUnitaire: number}[]}, nbrOpt?: {step: number, label: string, value: number, unit: string}, radioValue?: string, options?: {key: string, label: string, value?: any}[], radioName?: string, radioCriteriaLabel?: string): DynamicFormFieldInterface {
                // tslint:disable-next-line:max-line-length
                const numberOptions: {name: string, displayName: string, label: string, options: {step: number, label: string, value: number, unit: string}[]} = {name: criteriaNumberOptions.name, displayName: criteriaNumberOptions.displayName, label: criteriaNumberOptions.label,  options: []};
                // tslint:disable-next-line:max-line-length
                const numberOptions2: {name: string, displayName: string, label: string, options: {step: number, label: string, value: number, unit: string}[]} = {name: criteriaNumberOptions2.name, displayName: criteriaNumberOptions2.displayName, label: criteriaNumberOptions2.label,  options: []};
                if (criteriaNumberOptions2) {
                    criteriaNumberOptions2.options.forEach(element => {
                        numberOptions2.options.push({
                            value: element.tarifUnitaire,
                            label: element.name,
                            step,
                            unit,
                        });
                    });
                }
                // tslint:disable-next-line:max-line-length
                const numberOptions3: {name: string, displayName: string, label: string, options: {step: number, label: string, value: number, unit: string}[]} = {name: criteriaNumberOptions3.name, displayName: criteriaNumberOptions3.displayName, label: criteriaNumberOptions3.label,  options: []};
                if (criteriaNumberOptions3) {
                    criteriaNumberOptions3.options.forEach(element => {
                        numberOptions3.options.push({
                            value: element.tarifUnitaire,
                            label: element.name,
                            step,
                            unit,
                        });
                    });
                }
                // tslint:disable-next-line:max-line-length
                const numberOptions4: {name: string, displayName: string, label: string, options: {step: number, label: string, value: number, unit: string}[]} = {name: criteriaNumberOptions4.name, displayName: criteriaNumberOptions4.displayName, label: criteriaNumberOptions4.label,  options: []};
                if (criteriaNumberOptions4) {
                    criteriaNumberOptions4.options.forEach(element => {
                        numberOptions4.options.push({
                            value: element.tarifUnitaire,
                            label: element.name,
                            step,
                            unit,
                        });
                    });
                }
                criteriaNumberOptions.options.forEach(element => {
                    numberOptions.options.push({
                        value: element.tarifUnitaire,
                        label: element.name,
                        step,
                        unit,
                    });
                });
                criteriaCheckBoxOptions.forEach(criteriaElement => {
                    let criteriaExist = false;
                    checkboxDefaultOption.options.forEach(opt => {
                        if (criteriaElement === opt.key) {
                            opt.value = true;
                            criteriaExist = true;
                        }
                    });
                    if (!criteriaExist) {
                        checkboxDefaultOption.options.unshift({key: criteriaElement, label: criteriaElement, value: true});
                    }
                });
                if (options) {
                    const criteriaExistByDefault: boolean = !!options.filter( opt => opt.value === radioValue).length;
                    if (!criteriaExistByDefault) {
                        options.unshift({key: String(criteria), label: options[0].label || '', value: criteria});
                    }
                }
                const opts = options || [];
                const obj = {
                    name: criteria.name,
                    label: criteria.label,
                    type: FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER,
                    required: true,
                    value: criteria.value,
                    numberCheckBoxOptionsNumber: numberOptions,
                    numberCheckBoxOptionsNumber2: numberOptions2,
                    numberCheckBoxOptionsNumber3: numberOptions3,
                    numberCheckBoxOptionsNumber4: numberOptions4,
                    nbrOpt,
                    numberCheckBoxOptions: checkboxDefaultOption,
                    showAddFieldBtn,
                    displayName: criteria.displayName,
                    options: opts,
                    radioValue,
                    radioCriteriaName: radioName,
                    radioCriteriaLabel,
                };
                console.log('objecct', obj);
                return obj;
    }
    // tslint:disable-next-line:max-line-length
    public initToggleCheckBoxField(criteria: {name: string, displayName: string, value: boolean, label: string}, showAddFieldBtn: boolean, criteriaOptions: string[], options: {key: string, label: string, value?: any}[]): DynamicFormFieldInterface {
        criteriaOptions.forEach(criteriaElement => {
            let criteriaExist = false;
            options.forEach(opt => {
                if (criteriaElement === opt.key) {
                    opt.value = true;
                    criteriaExist = true;
                }
            });
            if (!criteriaExist) {
                options.push({key: criteriaElement, label: criteriaElement, value: true});
            }
        });
        const ToggleCheckBoxField: DynamicFormFieldInterface = {
            name: criteria.name,
            value: criteria.value,
            label: criteria.label,
            type: FieldTypeEnum.TOGGLE_CHECKBOX,
            required: true,
            options,
            showAddFieldBtn,
            displayName: criteria.displayName
        };
        return ToggleCheckBoxField;

    }
    // tslint:disable-next-line:max-line-length
    public initToggleRadioField(criteria: {name: string, displayName: string, value: boolean, label: string}, radioCriteriaName: string, radioCriteriaLabel: string, criteriaInputValue: any, showAddFieldBtn: boolean, options: {key: string, label: string, value?: any}[]): DynamicFormFieldInterface {
        if (typeof criteriaInputValue !== 'string') {
            criteriaInputValue = criteriaInputValue.toString();
        }
        const criteriaExistByDefault: boolean = !!options.filter( opt => opt.value === criteriaInputValue).length;
        if (!criteriaExistByDefault) {
            options.unshift({key: String(criteriaInputValue), label: criteriaInputValue.replace(/_/g, ' '), value: criteriaInputValue});
        }

        const ToggleRadioField: DynamicFormFieldInterface = {
            name: criteria.name,
            value: criteria.value,
            label: criteria.label,
            radioCriteriaName,
            radioCriteriaLabel,
            radioCriteria: criteriaInputValue,
            type: FieldTypeEnum.TOGGLE_RADIO,
            required: true,
            options,
            showAddFieldBtn,
            displayName: criteria.displayName
        };
        return ToggleRadioField;

    }
    // tslint:disable-next-line:max-line-length
    public initToggleNumberRadioField(showAddFieldBtn: boolean,
        // tslint:disable-next-line:max-line-length
                                      toggle: {name: string, displayName: string, value: boolean, label: string,
                                               numberOptions: {step: number, label: string, value: number, unit: string}[]},
        // tslint:disable-next-line:max-line-length
                                      radio: {name: string, label: string, value: any,
                                            options: {key: string, label: string, value?: any}[],
                                            // tslint:disable-next-line:max-line-length
                                            numberOptions: {step: number, label: string, value: number, unit: string}[]}): DynamicFormFieldInterface {
        if (typeof radio.value !== 'string') {
            radio.value = radio.value.toString();
        }
        const criteriaExistByDefault: boolean = !!radio.options.filter( opt => opt.value === radio.value).length;
        if (!criteriaExistByDefault) {
            radio.options.unshift({key: String(radio.value), label: String(radio.value).replace(/_/g, ' '), value: radio.value});
        }

        const ToggleNumberRadioField: DynamicFormFieldInterface = {
            name: toggle.name,
            value: toggle.value,
            label: toggle.label,
            radioCriteriaName: radio.name,
            radioCriteriaLabel: radio.label,
            radioCriteria: radio.value,
            type: FieldTypeEnum.TOGGLE_NUMBER_RADIO,
            numberOptions: toggle.numberOptions,
            radioNumberOptions: radio.numberOptions,
            required: true,
            options: radio.options,
            showAddFieldBtn,
            displayName: toggle.displayName
        };
        // console.log('ToggleNumberRadioField', ToggleNumberRadioField);
        return ToggleNumberRadioField;

    }
    // tslint:disable-next-line:max-line-length
    public initSimpleToggleField(criteriaName: string, displayName: string, label: string, criteriaValue: boolean, showAddFieldBtn: boolean): DynamicFormFieldInterface {
        return {
            name: criteriaName,
            label,
            type: FieldTypeEnum.TOGGLE_SIMPLE,
            required: false,
            value: criteriaValue,
            showAddFieldBtn,
            displayName,
        };
    }
    // tslint:disable-next-line:max-line-length
    public initTextField(criteriaName: string, displayName: string, label: string, criteriaValue: string, showAddFieldBtn: boolean): DynamicFormFieldInterface {
        return {
            name: criteriaName,
            label,
            type: FieldTypeEnum.TEXT,
            required: true,
            value: criteriaValue,
            showAddFieldBtn,
            displayName
        };
    }
    private isCheckBoxField(form: any, keysList: any[]): boolean {
        let isCheckBoxField = true;
        keysList.forEach(element => {
            if (typeof form[element] === 'boolean') {
                let exist = false;
                keysList.forEach(nestedElement => {
                    if (typeof form[nestedElement] === 'number' && nestedElement === `${element}Tarif`) {
                        exist = true;
                    }
                });
                isCheckBoxField = isCheckBoxField && exist;
            }
        });
        return isCheckBoxField;
    }
    public mapFormValueToCriteria(formValue: any, criteres: any): any {
        // tslint:disable-next-line:prefer-const
        console.log('formValue', formValue);
        const formKeys = Object.keys(formValue);
        formKeys.forEach(key => {
            if (criteres.hasOwnProperty(key)) {
                if (criteres[key].type) {
                    if (criteres[key].type === FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST) {
                        const formFieldKeys = Object.keys(formValue[key]);
                        formFieldKeys.forEach(formFieldKey => {
                            const index = criteres[key].options.findIndex( opt => opt.name === formFieldKey);
                            if (index !== -1) {
                                criteres[key].options[index].tarif = formValue[key][formFieldKey].tarif;
                                criteres[key].options[index].inclusDansPrix = formValue[key][formFieldKey].inclusDansPrix;
                                criteres[key].options[index].value = formValue[key][formFieldKey].value;
                                criteres[key].options[index].value = formValue[key][formFieldKey].value;

                                // search
                                criteres[key].options[index].search = formValue[key][formFieldKey].value ?
                                                                     criteres[key].options[index].field : '';
                            } else {
                                criteres[key].options.push({
                                    value: formValue[key][formFieldKey].value,
                                    inclusDansPrix: formValue[key][formFieldKey].inclusDansPrix,
                                    tarif: formValue[key][formFieldKey].tarif,
                                    name: formFieldKey,
                                    label: criteres[key].options[0].label
                                });
                            }
                        });
                    } else if (criteres[key].type === FieldTypeEnum.TOGGLE_NUMBER_LIST) {
                        console.log('TOGGLE_NUMBER_LIST', formValue[key]);
                        const formFieldKeys = Object.keys(formValue[key]);
                        formFieldKeys.forEach(formFieldKey => {
                            const index = criteres[key].options.findIndex( opt => opt.name === formFieldKey);
                            if (index !== -1) {
                                criteres[key].options[index].tarif = formValue[key][formFieldKey].tarif;
                                criteres[key].options[index].value = formValue[key][formFieldKey].value;
                                // search
                                criteres[key].options[index].search = formValue[key][formFieldKey].value ?
                                                                      criteres[key].options[index].field : '';
                            } else {
                                criteres[key].options.push({
                                    value: formValue[key][formFieldKey].value,
                                    tarif: formValue[key][formFieldKey].tarif,
                                    name: formFieldKey,
                                    label: formValue[key][formFieldKey].label
                                });
                            }
                        });
                    } else if (criteres[key].type === FieldTypeEnum.TOGGLE_VIN_HONNEUR_COCKTAIL_BUFFET ||
                                criteres[key].type === FieldTypeEnum.TOGGLE_DINNER) {
                        console.log('TOGGLE_VIN_HONNEUR_COCKTAIL_BUFFET', formValue[key]);
                        const productsKeys = Object.keys(formValue[key].products);
                        criteres[key].value = formValue[key].value;
                        productsKeys.forEach(productKey => {
                            console.log('productKey', productKey);
                            const productOptKeys = Object.keys(formValue[key].products[productKey]);
                            productOptKeys.forEach(optKey => {
                                const option = criteres[key].products.find( product => product.name === productKey)
                                                            .options.find( o => o.name ===  optKey);
                                if (!!option) {
                                    criteres[key].products.find( product => product.name === productKey)
                                    .options.find( o => o.name ===  optKey).tarif = formValue[key].products[productKey][optKey].tarif;

                                    criteres[key].products.find( product => product.name === productKey)
                                    .options.find( o => o.name ===  optKey).value = formValue[key].products[productKey][optKey].value;

                                    criteres[key].products.find( product => product.name === productKey)
                                    .options.find( o => o.name ===  optKey).search =
                                    // tslint:disable-next-line:max-line-length
                                    criteres[key].products.find( product => product.name === productKey).options.find( o => o.name ===  optKey).field;
                                } else {
                                    criteres[key].products[productKey].options.unshift({
                                        field: optKey.toLocaleLowerCase().replace(' ', '_'),
                                        search: optKey.toLocaleLowerCase().replace(' ', '_'),
                                        value: formValue[key].products[productKey][optKey].value,
                                        name: optKey,
                                        label: formValue[key].products[productKey][optKey].label,
                                        tarif: formValue[key].products[productKey][optKey].tarif
                                    });
                                }
                            });
                            // const index = criteres[key].options.findIndex( opt => opt.name === formFieldKey);
                            /*if (index !== -1) {
                                criteres[key].options[index].tarif = formValue[key][formFieldKey].tarif;
                                criteres[key].options[index].value = formValue[key][formFieldKey].value;
                                // search
                                criteres[key].options[index].search = formValue[key][formFieldKey].value ?
                                                                      criteres[key].options[index].field : '';
                            } else {
                                criteres[key].options.push({
                                    value: formValue[key][formFieldKey].value,
                                    tarif: formValue[key][formFieldKey].tarif,
                                    name: formFieldKey,
                                    label: formValue[key][formFieldKey].label
                                });
                            }*/
                        });
                        if (criteres[key].type === FieldTypeEnum.TOGGLE_VIN_HONNEUR_COCKTAIL_BUFFET) {
                            criteres[key].quantity = formValue[key].quantity;
                        } else if (criteres[key].type === FieldTypeEnum.TOGGLE_DINNER){
                            criteres[key].convivesMin = formValue[key].convivesMin;
                            criteres[key].dinerCapacite = formValue[key].dinerCapacite;
                        }
                    } else if (criteres[key].type === FieldTypeEnum.TOGGLE_NUMBER_LIST_OPTIONS) {
                        console.log('TOGGLE_NUMBER_LIST_OPTIONS', formValue[key]);
                        const formFieldKeys = Object.keys(formValue[key]);
                        formFieldKeys.forEach(formFieldKey => {
                            if (formFieldKey !== 'livraison' && formFieldKey !== 'value') {
                                const index = criteres[key].options.findIndex( opt => opt.name === formFieldKey);
                                if (index !== -1) {
                                    criteres[key].options[index].value = formValue[key][formFieldKey].value;
                                    // search
                                    criteres[key].options[index].search = formValue[key][formFieldKey].value ?
                                    criteres[key].options[index].field : '';
                                    const opts: {name: string, value: number, step: string, unit: string}[] = [];
                                    const formValueOptsKeys = Object.keys(formValue[key][formFieldKey].opts);
                                    formValueOptsKeys.forEach(formOpt => {
                                        opts.push({
                                            name: formOpt,
                                            value: formValue[key][formFieldKey].opts[formOpt].value,
                                            step: formValue[key][formFieldKey].opts[formOpt].step,
                                            unit: formValue[key][formFieldKey].opts[formOpt].unit,
                                        });
                                    });
                                    criteres[key].options[index].opts = opts;

                                } else {
                                    const opts: {name: string, value: number, step: string, unit: string}[] = [];
                                    const formValueOptsKeys = Object.keys(formValue[key][formFieldKey].opts);
                                    formValueOptsKeys.forEach(formOpt => {
                                        opts.push({
                                            name: formOpt,
                                            value: formValue[key][formFieldKey].opts[formOpt].value,
                                            step: formValue[key][formFieldKey].opts[formOpt].step,
                                            unit: formValue[key][formFieldKey].opts[formOpt].unit,
                                        });
                                    });
                                    criteres[key].options.push({
                                        value: formValue[key][formFieldKey].value,
                                        name: formFieldKey,
                                        label: formValue[key][formFieldKey].label,
                                        opts,
                                    });
                                }
                            } else {
                                criteres[key].value = formValue[key].value;
                                criteres[key].livraison = formValue[key].livraison;
                            }

                        });
                    } else if (criteres[key].type === FieldTypeEnum.TOGGLE_MAJORATION) {
                        console.log('TOGGLE_MAJORATION');
                        criteres[key].value = formValue[key].value;
                        const optKeys = Object.keys(formValue[key].options);
                        optKeys.forEach(optKey => {
                            criteres[key].options.find( opt => opt.name === optKey).majoration
                                                                        = formValue[key].options[optKey];
                        });
                    } else if (criteres[key].type === FieldTypeEnum.TOGGLE_PRODUITS_ACCESSOIRES) {
                        console.log('TOGGLE_PRODUITS_ACCESSOIRES');
                        criteres[key].value = formValue[key].value;
                        const optKeys = Object.keys(formValue[key].options);
                        optKeys.forEach(optKey => {
                            if (!!criteres[key].options.find( opt => opt.name === optKey)) {
                                criteres[key].options.find( opt => opt.name === optKey).tarif
                                                            = formValue[key].options[optKey].tarif;
                                criteres[key].options.find( opt => opt.name === optKey).checked
                                                            = formValue[key].options[optKey].checked;
                            } else {
                                criteres[key].options.unshift(
                                    {
                                        name: optKey,
                                        tarif: formValue[key].options[optKey].tarif,
                                        label: `Tarif par unité`,
                                        checked: formValue[key].options[optKey].checked,
                                        field: String(optKey).toLocaleLowerCase().replace(' ', '_'),
                                        search: String(optKey).toLocaleLowerCase().replace(' ', '_'),
                                    }
                                );
                            }

                        });
                    } else if (criteres[key].type === FieldTypeEnum.TOGGLE_PRESTATIONS) {
                        console.log('TOGGLE_PRESTATIONS');
                        criteres[key].value = formValue[key].value;
                        criteres[key].capacite = formValue[key].capacite;
                        const prestationsKeys = Object.keys(formValue[key].prestations);
                        prestationsKeys.forEach(prestationsKey => {
                            const optKeys = Object.keys(formValue[key].prestations[prestationsKey].options);
                            optKeys.forEach(optKey => {
                                // tslint:disable-next-line:max-line-length
                                if (!!criteres[key].prestations.find(p => p.name === prestationsKey)
                                    .options.find( opt => opt.name === optKey)) {
                                    criteres[key].prestations.find(p => p.name === prestationsKey)
                                    .options.find( opt => opt.name === optKey).tarif
                                    = formValue[key].prestations[prestationsKey].options[optKey].tarif;
                                } else {
                                    criteres[key].prestations.find(p => p.name === prestationsKey).options.unshift(
                                        {
                                            name: optKey,
                                            tarif: formValue[key].prestations[prestationsKey].options[optKey].tarif,
                                        }
                                    );
                                }
                            });
                        });

                    } else if (criteres[key].type === FieldTypeEnum.TOGGLE_LIST) {
                        console.log('TOGGLE_LIST');
                        const formFieldKeys = Object.keys(formValue[key]);
                        formFieldKeys.forEach(formFieldKey => {
                            const index = criteres[key].options.findIndex( opt => opt.name === formFieldKey);
                            if (index !== -1) {
                                criteres[key].options[index].value = formValue[key][formFieldKey].value;
                                // search
                                criteres[key].options[index].search = formValue[key][formFieldKey].value ?
                                                                     criteres[key].options[index].field : '';
                            } else {
                                criteres[key].options.push({
                                    value: formValue[key][formFieldKey].value,
                                    name: formFieldKey,
                                    label: `do you propose this ?`
                                });
                            }
                        });
                    } else if (criteres[key].type === FieldTypeEnum.CHECKBOX_NUMBER_LIST) {
                        console.log('CHECKBOX_NUMBER_LIST');
                        if (key === 'creationAlbum') {
                        // value
                        criteres[key].value = formValue[key].value;

                        // finitions
                        Object.keys(formValue[key].finitions).forEach(finitonKey => {
                            const index = criteres[key].finitions.findIndex( opt => opt.toLowerCase() === finitonKey.toLowerCase());
                            if (formValue[key].finitions[finitonKey]) {
                                if (index === -1) {
                                    criteres[key].finitions.push(finitonKey);
                                }
                            } else {
                                if (index !== -1) {
                                    criteres[key].finitions.splice(index, 1);
                                }
                            }
                        });
                        // formats
                        Object.keys(formValue[key].formats).forEach(formatKey => {
                            const formatIndex = criteres[key].formats.findIndex( opt => opt.name === formatKey);
                            if (formatIndex !== -1) {
                                const modeles: {name: string, tarif: number, checked: boolean}[] = [];
                                Object.keys(formValue[key].formats[formatKey]).forEach(modeleKey => {
                                    // tslint:disable-next-line:max-line-length
                                    const modeleIndex = criteres[key].formats[formatIndex].modeles.findIndex( opt => opt.name === modeleKey);
                                    if (formatIndex !== -1) { criteres[key].formats[formatIndex].modeles.splice(modeleIndex, 1); }
                                    modeles.push({name: modeleKey,
                                                  tarif: formValue[key].formats[formatKey][modeleKey].tarif,
                                                  checked: formValue[key].formats[formatKey][modeleKey].checked});
                                });
                                criteres[key].formats[formatIndex].modeles = modeles;
                                criteres[key].formats[formatIndex].value = formValue[key].formats[formatKey].value;
                                // search
                                criteres[key].formats[formatIndex].search = formValue[key].formats[formatKey].value ?
                                criteres[key].formats[formatIndex].field : '';
                            } else {
                                const modeles: {name: string, tarif: number, checked: boolean}[] = [];
                                Object.keys(formValue[key].formats[formatKey]).forEach(modeleKey => {
                                    modeles.push({name: modeleKey,
                                                 tarif: formValue[key].formats[formatKey][modeleKey].tarif,
                                                 checked: formValue[key].formats[formatKey][modeleKey].checked,
                                                });
                                });
                                criteres[key].formats.push({name: formatKey, value: formValue[key].formats[formatKey].value, modeles});
                            }

                        });
                        } else {
                        // value
                        criteres[key].value = formValue[key].value;

                        // finitions
                        Object.keys(formValue[key].finitions).forEach(finitonKey => {
                            const index = criteres[key].finitions.findIndex( opt => opt.toLowerCase() === finitonKey.toLowerCase());
                            if (formValue[key].finitions[finitonKey]) {
                                if (index === -1) {
                                    criteres[key].finitions.push(finitonKey);
                                }
                            } else {
                                if (index !== -1) {
                                    criteres[key].finitions.splice(index, 1);
                                }
                            }
                        });
                        // formats
                        Object.keys(formValue[key].formats).forEach(formatKey => {
                            const formatIndex = criteres[key].formats.findIndex( opt => opt.name === formatKey);
                            if (formatIndex !== -1) {
                                const modeles: {name: string, tarif: number}[] = [];
                                Object.keys(formValue[key].formats[formatKey]).forEach(modeleKey => {
                                    // tslint:disable-next-line:max-line-length
                                    const modeleIndex = criteres[key].formats[formatIndex].modeles.findIndex( opt => opt.name === modeleKey);
                                    if (formatIndex !== -1) { criteres[key].formats[formatIndex].modeles.splice(modeleIndex, 1); }
                                    modeles.push({name: modeleKey,
                                                  tarif: formValue[key].formats[formatKey][modeleKey].tarif});
                                });
                                criteres[key].formats[formatIndex].modeles = modeles;
                                criteres[key].formats[formatIndex].value = formValue[key].formats[formatKey].value;
                                // search
                                criteres[key].formats[formatIndex].search = formValue[key].formats[formatKey].value ?
                                criteres[key].formats[formatIndex].field : '';
                            } else {
                                const modeles: {name: string, tarif: number}[] = [];
                                Object.keys(formValue[key].formats[formatKey]).forEach(modeleKey => {
                                    modeles.push({name: modeleKey,
                                                 tarif: formValue[key].formats[formatKey][modeleKey].tarif});
                                });
                                criteres[key].formats.push({name: formatKey, value: formValue[key].formats[formatKey].value, modeles});
                            }

                        });
                        }
                    } else if (criteres[key].type === FieldTypeEnum.TOGGLE_FORMATS_LIST) {
                        console.log('TOGGLE_FORMATS_LIST');
                        const formFieldKeys = Object.keys(formValue[key]);
                        formFieldKeys.forEach(formFieldKey => {
                            const index = criteres[key].fields.findIndex( opt => opt.name === formFieldKey);
                            if (index !== -1) {
                                // value
                                criteres[key].fields[index].value = formValue[key][formFieldKey].value;

                                // search
                                criteres[key].fields[index].search = formValue[key][formFieldKey].value ?
                                                                      criteres[key].fields[index].field : '';

                                // options
                                criteres[key].fields[index].options.length = 0;
                                Object.keys(formValue[key][formFieldKey].options).forEach(option => {
                                    criteres[key].fields[index].options
                                    .push({name: option, tarif: formValue[key][formFieldKey].options[option]});
                                });

                            } else {
                                const options: {name: string, tarif: number}[] = [];
                                Object.keys(formValue[key][formFieldKey].options).forEach(option => {
                                    options.push({name: option, tarif: formValue[key][formFieldKey].options[option]});
                                });
                                criteres[key].fields.push({
                                    value: formValue[key][formFieldKey].value,
                                    name: formFieldKey,
                                    label: `do you propose this format ?`,
                                    options,
                                });
                            }
                        });
                    } else if (criteres[key].type === FieldTypeEnum.TOGGLE_NUMBER_TIME) {
                        console.log('heree');
                        console.log('key', key);
                        console.log('form value', formValue[key]);
                        criteres[key].heures = formValue[key].hourValue;
                        criteres[key].min = formValue[key].minValue;
                        if (key === 'limiteHoraire') {
                            criteres[key].value = formValue[key].value;
                        }
                    } else if (criteres[key].type === FieldTypeEnum.TOGGLE_VOITURE_LIST) {
                        console.log('TOGGLE_VOITURE_LIST');
                        const formFieldKeys = Object.keys(formValue[key]);
                        formFieldKeys.forEach(formFieldKey => {
                            const index = criteres[key].fields.findIndex( opt => opt.name === formFieldKey);
                            if (index !== -1) {
                                // value
                                criteres[key].fields[index].value = formValue[key][formFieldKey].value;
                                // search
                                switch (String(formValue[key][formFieldKey].categorie)) {
                                    case `Haute de gamme`:
                                        criteres[key].fields[index].search = 'voitureHautDeGamme';
                                        break;
                                    case `Voiture de collection`:
                                        criteres[key].fields[index].search = 'voitureDeCollection';
                                        break;
                                    case `Limousine`:
                                        criteres[key].fields[index].search = 'limousine';
                                        break;
                                    case `Sportive`:
                                        criteres[key].fields[index].search = 'voitureSportive';
                                        break;
                                    case `Calèche`:
                                        criteres[key].fields[index].search = 'voitureCaleche';
                                        break;
                                    case `Van`:
                                        criteres[key].fields[index].search = 'van';
                                        break;
                                    case `Microbus`:
                                        criteres[key].fields[index].search = 'microbus';
                                        break;
                                    case `Minimus`:
                                        criteres[key].fields[index].search = 'minimus';
                                        break;
                                    case `Midimus`:
                                        criteres[key].fields[index].search = 'midibus';
                                        break;
                                    default:
                                        break;
                                }
                                // categorie
                                criteres[key].fields[index].categorie = formValue[key][formFieldKey].categorie;

                                // nbrPlaces
                                if (formValue[key][formFieldKey].nbrPlace) {
                                    criteres[key].fields[index].nbrPlace = formValue[key][formFieldKey].nbrPlace;
                                }

                                // options
                                Object.keys(formValue[key][formFieldKey].options).forEach(option => {
                                    const optIndex = criteres[key].fields[index].options.findIndex( element => element.name === option );
                                    const unit = criteres[key].fields[index].options[optIndex].unit;
                                    const step = criteres[key].fields[index].options[optIndex].step;
                                    criteres[key].fields[index].options = criteres[key].fields[index].options
                                    .filter( elem => elem.name !== option);
                                    criteres[key].fields[index].options
                                    .push({name: option, value: formValue[key][formFieldKey].options[option], step, unit});
                                });

                            } else {
                                const options: {name: string, value: number, step: number, unit: string}[] = [];
                                Object.keys(formValue[key][formFieldKey].options).forEach(option => {
                                    let unit = '';
                                    let step = 1;
                                    switch (option) {
                                        case `Distance location max`:
                                        case `Kilométrage inclus`:
                                            unit = `KM`;
                                            step = 100;
                                            break;
                                        case `Tarif par jour`:
                                            unit = `€`;
                                            step = 10;
                                            break;
                                        case `Tarif / Kilomètre sup`:
                                            unit = `€`;
                                            step = 1;
                                            break;
                                        default:
                                            break;
                                    }
                                    options.push({name: option, value: formValue[key][formFieldKey].options[option], step, unit});
                                });
                                if (formValue[key][formFieldKey].nbrPlace) {
                                    criteres[key].fields.push({
                                        value: formValue[key][formFieldKey].value,
                                        name: formFieldKey,
                                        categorie: formValue[key][formFieldKey].categorie,
                                        nbrPlace: formValue[key][formFieldKey].nbrPlace,
                                        label: `do you propose this vehicle ?`,
                                        options,
                                    });
                                } else {
                                    criteres[key].fields.push({
                                        value: formValue[key][formFieldKey].value,
                                        name: formFieldKey,
                                        categorie: formValue[key][formFieldKey].categorie,
                                        label: `do you propose this vehicle ?`,
                                        options,
                                    });
                                }
                            }
                        });
                    } else {
                        const tarifKeys = Object.keys(formValue[key].tarifs);
                        criteres[key].type = formValue[key].type;
                        tarifKeys.forEach(tarifName => {
                            const index = criteres[key].tarifs.findIndex( tarif => tarif.label ===  tarifName);
                            criteres[key].tarifs[index].value = formValue[key].tarifs[tarifName];

                        });

                    }
                } else {
                    if (typeof formValue[key] !== 'object' && formValue[key] !== null) {
                        if (typeof formValue[key] === 'boolean') {
                            // simple toogle
                            criteres[key] = formValue[key];
                        } else if (typeof formValue[key] === 'string') {
                            if (!formValue[key]) {
                                criteres[key] = false;
                            } else {
                                if (formValue[key] === 'true' || formValue[key] === 'false') {
                                    const value = formValue[key] === 'true' ? true : false;
                                    criteres[key] = value;
                                } else if (!isNaN(+formValue[key])) {
                                    criteres[key] = +formValue[key];
                                } else {
                                    criteres[key] = formValue[key];
                                }
                            }
                        } else if (typeof formValue[key] === 'number') {
                            criteres[key] = formValue[key];
                        }
                    } else {
                        const keyValueKeys = Object.keys(formValue[key]);
                        keyValueKeys.forEach(keyValueKey => {
                            if (typeof formValue[key][keyValueKey] === 'object' && formValue[key][keyValueKey] !== null) {
                                let isCheckBoxField = false;
                                if (key === keyValueKey) {
                                    // tslint:disable-next-line:max-line-length
                                    isCheckBoxField = this.isCheckBoxField(formValue[key][keyValueKey], Object.keys(formValue[key][keyValueKey]));
                                }
                                Object.keys(formValue[key][keyValueKey]).forEach(element => {
                                    if (isCheckBoxField) {
                                        // checkbox number field
                                        if (typeof formValue[key][keyValueKey][element] === 'boolean') {
    
                                            Object.keys(formValue[key][keyValueKey]).forEach(nestedElement => {
                                                if (typeof formValue[key][keyValueKey][nestedElement] === 'number'
                                                && nestedElement === `${element}Tarif`) {
                                                    // check if already exist
                                                    const exist = criteres[key].find( critere => critere.name === element );
                                                    if (exist) {
                                                        const index = criteres[key].findIndex( critere => critere.name === element );
                                                        if (formValue[key][keyValueKey][element]) {
                                                            criteres[key][index].value = formValue[key][keyValueKey][nestedElement];
                                                        } else {
                                                            criteres[key] = criteres[key].filter(critere => critere.name !== element);
                                                        }
                                                    } else if (formValue[key][keyValueKey][element]) {
                                                        console.log('here else');
                                                        criteres[key].push({name: element, value: formValue[key][keyValueKey][nestedElement]});
                                                    }
                                                }
                                            });
                                        }
                                    } else {
                                        if (typeof formValue[key][keyValueKey][element] === 'string'
                                        // tslint:disable-next-line:max-line-length
                                        && formValue[key][keyValueKey][element] === 'true' || formValue[key][keyValueKey][element] === 'false') {
                                            // toggle radio true/false input
                                            if (criteres.hasOwnProperty(element)) {
                                                const value = formValue[key][keyValueKey][element] === 'true' ? true : false;
                                                criteres[element] = value;
                                            }
                                        } else if (typeof formValue[key][keyValueKey][element] === 'boolean') {
                                                if (key === keyValueKey && keyValueKey === element) {
                                                    criteres[element] = formValue[key][keyValueKey][element];
                                                } else {
                                                    // check if already exist
                                                    const exist = criteres[keyValueKey].includes(element);
                                                    if (!exist) {
                                                        if (formValue[key][keyValueKey][element]) {
                                                            criteres[keyValueKey].push(element);
                                                        }
                                                    } else if (!formValue[key][keyValueKey][element]) {
                                                        criteres[keyValueKey] = criteres[keyValueKey].filter( critere => critere !== element );
                                                    }
                                                }
    
    
                                        } else if (typeof formValue[key][keyValueKey][element] === 'number') {
                                            try {
                                                                                                // check if already exist
                                                    const exist = criteres[keyValueKey].find( critere => critere.name === element );
                                                    if (exist) {
                                                        const index = criteres[keyValueKey].findIndex( critere => critere.name === element );
                                                        criteres[keyValueKey][index].tarifUnitaire = formValue[key][keyValueKey][element];
                                                    } else if (formValue[key][keyValueKey][element]) {
                                                        console.log('here else');
                                                        // tslint:disable-next-line:max-line-length
                                                        criteres[keyValueKey].push({name: element, tarifUnitaire: formValue[key][keyValueKey][element]});
                                                    }
                                            } catch (error) {
                                                criteres[element] = formValue[key][keyValueKey][element];
                                            }
    
    
    
                                        } else {
                                            criteres[element] = formValue[key][keyValueKey][element];
                                        }
                                    }
                                });
                            } else {
                            // boolean 'flag'
                            if (keyValueKey === key) {
                                criteres[keyValueKey] = formValue[key][keyValueKey];
                            } else if (typeof formValue[key][keyValueKey] === 'boolean') {
                                // checkbox option 'map to string'
                                if (formValue[key][keyValueKey] === true) {
                                // check if option value already exist
                                const exist = criteres[key].find( element =>  element === keyValueKey);
                                if (!exist) { criteres[key].push(keyValueKey); }
                                } else {
                                    // filter options with false value
                                    criteres[key] = criteres[key].filter( element => element !== keyValueKey );
                                }
                            } else if (typeof formValue[key][keyValueKey] === 'number') {
                                // toggle number option 'map to number'
                                criteres[keyValueKey] = formValue[key][keyValueKey];
                            } else if (typeof formValue[key][keyValueKey] === 'string') {
                                if (formValue[key][keyValueKey] === 'true' || formValue[key][keyValueKey] === 'false') {
                                    // toggle radio true/false input
                                    if (criteres.hasOwnProperty(keyValueKey)) {
                                        const value = formValue[key][keyValueKey] === 'true' ? true : false;
                                        criteres[keyValueKey] = value;
                                    }
                                } else {
                                    criteres[keyValueKey] = formValue[key][keyValueKey];
                                }
                            } else if (typeof formValue[key][keyValueKey] === 'object') {
                                // toggle checkBox Number
                                // get the object's keys
                                const TOGGLE_CHECKBOX_NUMBER_KEYS = Object.keys(formValue[key][keyValueKey]);
                                const TOGGLE_CHECKBOX_NUMBER_VALUE = formValue[key][keyValueKey];
                                if (TOGGLE_CHECKBOX_NUMBER_VALUE.hasOwnProperty(TOGGLE_CHECKBOX_NUMBER_KEYS[0])) {
                                    if (typeof TOGGLE_CHECKBOX_NUMBER_VALUE[TOGGLE_CHECKBOX_NUMBER_KEYS[0]] === 'boolean') {
                                        // checkbox
                                        TOGGLE_CHECKBOX_NUMBER_KEYS.forEach(checkBoxKey => {
                                            if (TOGGLE_CHECKBOX_NUMBER_VALUE[checkBoxKey] === true) {
                                                // check if option value already exist
                                                const exist = criteres[keyValueKey].find( element =>  element === checkBoxKey);
                                                if (!exist) { criteres[keyValueKey].push(checkBoxKey); }
                                            }
                                        });
                                    } else if (typeof TOGGLE_CHECKBOX_NUMBER_VALUE[TOGGLE_CHECKBOX_NUMBER_KEYS[0]] === 'number') {
                                        // Toggle
                                        TOGGLE_CHECKBOX_NUMBER_KEYS.forEach(toggleKey => {
                                            // check if option value already exist
                                            const exist = criteres[keyValueKey].find( element =>  element.name === toggleKey);
                                            if (exist) {
                                                const index = criteres[keyValueKey].findIndex( element =>  element.name === toggleKey);
                                                // update element
                                                criteres[keyValueKey][index].tarifUnitaire = TOGGLE_CHECKBOX_NUMBER_VALUE[toggleKey];
                                            } else {
                                                criteres[keyValueKey]
                                                .push({name: toggleKey, tarifUnitaire: TOGGLE_CHECKBOX_NUMBER_VALUE[toggleKey]});
                                            }
                                        });
                                    }
                                }
                            }
                            }
                        });
                    }
                }
            } else if (!criteres[key]) {
                console.log('doesnt has this att:', key);
                if (key.includes('empty')) {
                    const objectKeys = Object.keys(formValue[key]);
                    objectKeys.forEach(element => {
                        if (criteres.hasOwnProperty(element)) {
                            criteres[element] = formValue[key][element];
                        }
                    });
                } else if (key.includes('complex')) {
                    const objectKeys = Object.keys(formValue[key]);
                    objectKeys.forEach(element => {
                        if (criteres.hasOwnProperty(element)) {
                            console.log('here');
                            Object.keys(formValue[key][element]).forEach(nestedElement => {
                                if (typeof formValue[key][element][nestedElement] === 'string' ) {
                                    if (formValue[key][element][nestedElement] === 'true'
                                    || formValue[key][element][nestedElement] === 'false') {
                                        const value = formValue[key][element][nestedElement] === 'true' ? true : false;
                                        criteres[nestedElement] = value;
                                    }
                                } else if (typeof formValue[key][element][nestedElement] === 'number') {
                                    criteres[nestedElement] = formValue[key][element][nestedElement];
                                }
                            });
                        }
                    });
                }


            }

        });
        return criteres;
    }
    getAddOptionDescription(fieldName: string, purpose?: string): string {
        switch (fieldName) {
            case `styleDePhoto`:
                return `Style de photographie`;
            case `techniqueUtilisees`:
                return `Techniques utilisés`;
            case `appareils`:
                return `Appareils`;
            case `objectifs`:
                return `Objectifs`;
            case `accessoires`:
                return `Accessoires`;
            case `styleDeVideo`:
                return `Style de vidéographie`;
            case `delaisDeLivraisonJours`:
                return `Délais de livraison photo`;
            case `animations`:
                return `Animations`;
            case `materiels`:
                return `Matériels`;
            case `specialite`:
                return `Spécialités`;
            case `instruments`:
                return `Instruments`;
            case `retouchesPhoto`:
                return `Retouches Photo`;
            case `majorationTypeCheveux`:
                return `Majoration type de cheveaux`;
            case `produitsEtAccessoires`:
                return `Produits et accessoires`;
            case `produits`:
                return `Produits et accessoires`;
            case `fleurs`:
                return `Fleurs`;
            case `feuillages`:
                return `Feuillages`;
            case `decoration`:
                return `Décorations`;
            case `prestationInvitesProches`:
                return `Prestations coiffure et/ou technique pour les invités`;
            case `manucurePedicure`:
                return `Esthétique`;
            case `epilation`:
                return `Épilation`;
            case `soins`:
                return `Soins`;
            case `typeDeLieu`:
                return `Type de lieu`;
            case `situationGeographique`:
                return `Situation géographique`;
            case `activites`:
                return `Activités`;
            case `situationGeo`:
                return `Situation géographique`;
            case `capaciteInvites`:
                return `capacité d'invités`;
            case `typeReception`:
                return `Types de réceptions`;
            case `typesDeSport`:
                return `Sports maîtrisés`;
            case `servicesAssocies`:
                return `Services associés`;
            case `specialiteCuisine`:
                return `cuisine specialties`;
            case `gateaux`:
                return `Gâteaux`;
            case `effets`:
                return `Effets`;
            case `programmes`:
                return `Programmes`;
            case `lachers`:
                return `Lâchers`;
            case `produitsSales`:
                return `Produits Salés`;
            case `produitsSucres`:
                return `Produits Sucrés`;
            case `entrees`:
                return `Entrées`;
            case `plats`:
                return `Plats`;
            case `accompagnements`:
                return `Accompagnements`;
            case `fromages`:
                return `Fromages`;
            case `desserts`:
                return `Désserts`;
            case `boissonsAlcoolises`:
                return `Boissons Alcoolisés`;
            case `boissonsNonAlcoolises`:
                return `Boissons non-Alcoolisés`;
            case `complements`:
                return `Compléments`;
            case `creationAlbum`:
                return purpose === `modele` ? `Modèle de pages` : `Nouveau format d'album`;
            case `tiragePapier`:
                return purpose === `modele` ? `Modèle de pages` : `Nouveau format d'album`;
            case `equipements`:
                return `Équipements`;
            case `services`:
                return `Services`;
            case `voitures`:
                return `Voitures`;
            case `bus`:
                return `Bus`;
            case `decorationAssociees`:
                return `Décorations associées`;
            case `typesDeDances`:
                return `Danses maîtrisées`;
            case `elevensSimultane`:
                return `Élèves simultanés`;
            case `elevesSimultane`:
                return `Élèves simultanés`;
            case `finitionsProposes`:
                return `Formats`;
            default:
                return `Add a New Option`;
        }
    }
    // tslint:disable-next-line:max-line-length
    public async addOption(fields: DynamicFormFieldInterface[], field: DynamicFormFieldInterface, list?: string): Promise<DynamicFormFieldInterface[]> {
        let fieldIndex: number;
        let option: any;
        switch (field.type) {
            case FieldTypeEnum.CHECK_BOX:
                fieldIndex = fields.findIndex( element => element.name === field.name );
                option = await this.dialogService.openAddCheckBoxOptionDialog(this.getAddOptionDescription(field.name));
                if (option.save && option.option) {
                    fields = this.addCheckBoxOption(fields, fieldIndex, option.option);
                }
                break;
            case FieldTypeEnum.RADIO:
                fieldIndex = fields.findIndex( element => element.name === field.name );
                option = await this.dialogService.openAddRadioOptionDialog(FieldTypeEnum.RADIO, this.getAddOptionDescription(field.name));
                if (option.save && option.option) {
                    fields = this.addRadioOption(fields, fieldIndex, option.option);
                }
                break;
            case FieldTypeEnum.RADIO_STRING:
                fieldIndex = fields.findIndex( element => element.name === field.name );
                // tslint:disable-next-line:max-line-length
                option = await this.dialogService.openAddRadioOptionDialog(FieldTypeEnum.RADIO_STRING, this.getAddOptionDescription(field.name));
                if (option.save && option.option) {
                    fields = this.addRadioStringOption(fields, fieldIndex, option.option);
                }
                break;
            case FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER:
                fieldIndex = fields.findIndex( element => element.name === field.name );
                // tslint:disable-next-line:max-line-length
                option = await this.dialogService.openAddToggleOptionDialog(FieldTypeEnum.TOGGLE_CHECKBOX_NUMBER, this.getAddOptionDescription(field.name));
                if (option.save && option.option) {
                    fields = this.addToggleOption(fields, fieldIndex, option.option, list);
                }
                break;
            case FieldTypeEnum.TOGGLE_PRODUITS_ACCESSOIRES:
                fieldIndex = fields.findIndex( element => element.name === field.name );
                // tslint:disable-next-line:max-line-length
                option = await this.dialogService.openAddToggleOptionDialog(FieldTypeEnum.TOGGLE_PRODUITS_ACCESSOIRES, this.getAddOptionDescription(field.name));
                if (option.save && option.option) {
                    fields = this.addToggleProduitsOption(fields, fieldIndex, option.option);
                }
                break;
            case FieldTypeEnum.CHECK_BOX_NUMBER:
                fieldIndex = fields.findIndex( element => element.name === field.name );
                // tslint:disable-next-line:max-line-length
                option = await this.dialogService.openAddToggleOptionDialog(FieldTypeEnum.CHECK_BOX_NUMBER, this.getAddOptionDescription(field.name));
                if (option.save && option.option) {
                    fields = this.addToggleCheckBoxOption(fields, fieldIndex, option.option);
                }
                break;
            case FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST:
                fieldIndex = fields.findIndex( element => element.name === field.name );
                // tslint:disable-next-line:max-line-length
                option = await this.dialogService.openAddToggleOptionDialog(FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST, this.getAddOptionDescription(field.name));
                if (option.save && option.option) {
                    fields = this.addToggleNumberRadioList(fields, fieldIndex, option.option);
                }
                break;
            case FieldTypeEnum.TOGGLE_NUMBER_LIST:
                fieldIndex = fields.findIndex( element => element.name === field.name );
                // tslint:disable-next-line:max-line-length
                option = await this.dialogService.openAddToggleOptionDialog(FieldTypeEnum.TOGGLE_NUMBER_LIST, this.getAddOptionDescription(field.name));
                if (option.save && option.option) {
                    fields = this.addToggleNumberList(fields, fieldIndex, option.option);
                }
                break;
            case FieldTypeEnum.TOGGLE_NUMBER_LIST_OPTIONS:
                fieldIndex = fields.findIndex( element => element.name === field.name );
                // tslint:disable-next-line:max-line-length
                option = await this.dialogService.openAddToggleOptionDialog(FieldTypeEnum.TOGGLE_NUMBER_LIST_OPTIONS, this.getAddOptionDescription(field.name));
                if (option.save && option.option) {
                    fields = this.addToggleNumberListOptions(fields, fieldIndex, option.option);
                }
                break;
            case FieldTypeEnum.TOGGLE_LIST:
                fieldIndex = fields.findIndex( element => element.name === field.name );
                // tslint:disable-next-line:max-line-length
                option = await this.dialogService.openAddToggleOptionDialog(FieldTypeEnum.TOGGLE_LIST, this.getAddOptionDescription(field.name));
                if (option.save && option.option) {
                    fields = this.addToggleList(fields, fieldIndex, option.option);
                }
                break;
            case FieldTypeEnum.TOGGLE_FORMATS_LIST:
                    fieldIndex = fields.findIndex( element => element.name === field.name );
                    // tslint:disable-next-line:max-line-length
                    option = await this.dialogService.openAddToggleOptionDialog(FieldTypeEnum.TOGGLE_FORMATS_LIST, this.getAddOptionDescription(field.name));
                    if (option.save && option.option) {
                        fields = this.addToggleFormatsList(fields, fieldIndex, option.option);
                    }
                    break;
            case FieldTypeEnum.TOGGLE_VOITURE_LIST:
                    fieldIndex = fields.findIndex( element => element.name === field.name );
                    // tslint:disable-next-line:max-line-length
                    option = await this.dialogService.openAddToggleOptionDialog(FieldTypeEnum.TOGGLE_VOITURE_LIST, this.getAddOptionDescription(field.name));
                    if (option.save && option.option) {
                        fields = this.addToggleVoituresList(fields, fieldIndex, option.option);
                    }
                    break;
            case FieldTypeEnum.TOGGLE_VIN_HONNEUR_COCKTAIL_BUFFET:
                    fieldIndex = fields.findIndex( element => element.name === field.name );
                    // tslint:disable-next-line:max-line-length
                    option = await this.dialogService.openAddToggleOptionDialog(FieldTypeEnum.TOGGLE_VIN_HONNEUR_COCKTAIL_BUFFET, list);
                    if (option.save && option.option) {
                        fields = this.addToggleProductsList(fields, fieldIndex, option.option, list);
                    }
                    break;
            case FieldTypeEnum.TOGGLE_DINNER:
                    fieldIndex = fields.findIndex( element => element.name === field.name );
                    // tslint:disable-next-line:max-line-length
                    option = await this.dialogService.openAddToggleOptionDialog(FieldTypeEnum.TOGGLE_DINNER, list);
                    if (option.save && option.option) {
                        fields = this.addToggleProductsList(fields, fieldIndex, option.option, list);
                    }
                    break;
            case FieldTypeEnum.TOGGLE_PRESTATIONS:
                    fieldIndex = fields.findIndex( element => element.name === field.name );
                    // tslint:disable-next-line:max-line-length
                    option = await this.dialogService.openAddToggleOptionDialog(FieldTypeEnum.TOGGLE_PRESTATIONS, list);
                    if (option.save && option.option) {
                        fields = this.addTogglePrestationsOption(fields, fieldIndex, option.option, list);
                    }
                    break;
            case FieldTypeEnum.CHECKBOX_NUMBER_LIST:
                fieldIndex = fields.findIndex( element => element.name === field.name );
                if (list) {
                        // tslint:disable-next-line:max-line-length
                        option = await this.dialogService.openAddToggleOptionDialog(FieldTypeEnum.CHECKBOX_NUMBER_LIST, this.getAddOptionDescription(field.name, 'modele'));
                } else {
                        // tslint:disable-next-line:max-line-length
                        option = await this.dialogService.openAddToggleOptionDialog(FieldTypeEnum.CHECKBOX_NUMBER_LIST, this.getAddOptionDescription(field.name, 'format'));
                }
                if (option.save && option.option) {
                    if (list) {
                        fields = this.addCheckBoxNumberModeleList(fields, fieldIndex, option.option, list);
                    } else {
                        fields = this.addCheckBoxNumberFormatList(fields, fieldIndex, option.option);
                    }
                }
                break;
            default:
                break;
        }
        return fields;
    }
    // tslint:disable-next-line:max-line-length
    private addCheckBoxOption(fields: DynamicFormFieldInterface[], fieldIndex: number, option: {key: string, label: string, value: boolean}): DynamicFormFieldInterface[] {
        const optionExist = !!fields[fieldIndex].options.filter( opt => opt.key === option.key ).length;
        if (!optionExist) {
            fields[fieldIndex].options.unshift(option);
            this.fieldWithAddedCheckBoxOpt.next(fields[fieldIndex]);
        } else {
            this.toastrService.error(this.translateService.instant('option already exist'));
        }
        return fields;
    }
    // tslint:disable-next-line:max-line-length
    private addToggleProduitsOption(fields: DynamicFormFieldInterface[], fieldIndex: number, option: {name: string, tarif: number}): DynamicFormFieldInterface[] {
        const optionExist = !!fields[fieldIndex].produitsOptions.filter( opt => opt.name === option.name ).length;
        if (!optionExist) {
            fields[fieldIndex].produitsOptions.unshift({
                name: option.name,
                tarif: option.tarif,
                label: `Tarif par unité`,
                checked: true,
                field: option.name.toLocaleLowerCase().replace(' ', '_'),
                search: option.name.toLocaleLowerCase().replace(' ', '_'),
                unit: '€'
            });
            this.fieldWithAddedToggleProduit.next(fields[fieldIndex]);
        } else {
            this.toastrService.error(this.translateService.instant('option already exist'));
        }
        return fields;
    }
    // tslint:disable-next-line:max-line-length
    private addTogglePrestationsOption(fields: DynamicFormFieldInterface[], fieldIndex: number, option: {name: string, tarif: number}, prestationName: string): DynamicFormFieldInterface[] {
        const optionExist = !!fields[fieldIndex].prestations
                            .find(p => p.name === prestationName).options.filter( opt => opt.name === option.name ).length;
        if (!optionExist) {
            fields[fieldIndex].prestations.find(p => p.name === prestationName).options.unshift({
                name: option.name,
                tarif: option.tarif,
                label: `Tarif`,
                step: fields[fieldIndex].prestations.find(p => p.name === prestationName).options[0].step,
                unit: fields[fieldIndex].prestations.find(p => p.name === prestationName).options[0].unit,
            });
        } else {
            this.toastrService.error(this.translateService.instant('option already exist'));
        }
        return fields;
    }
    // tslint:disable-next-line:max-line-length
    private addRadioOption(fields: DynamicFormFieldInterface[], fieldIndex: number, option: {key: string, label: string, value: boolean}): DynamicFormFieldInterface[] {
        const optionExist = !!fields[fieldIndex].options.filter( opt => opt.key === option.key ).length;
        const label = fields[fieldIndex].options[0].label || '';
        if (!optionExist) {
            option.label = label;
            fields[fieldIndex].options.unshift(option);
            fields[fieldIndex].value = option.value;
        } else {
            this.toastrService.error(this.translateService.instant('option already exist'));
        }
        return fields;
    }
    // tslint:disable-next-line:max-line-length
    private addRadioStringOption(fields: DynamicFormFieldInterface[], fieldIndex: number, option: {key: string, label: string, value: boolean}): DynamicFormFieldInterface[] {
        const optionExist = !!fields[fieldIndex].options.filter( opt => opt.key === option.key ).length;
        if (!optionExist) {
            fields[fieldIndex].options.unshift(option);
            fields[fieldIndex].value = option.value;
        } else {
            this.toastrService.error(this.translateService.instant('option already exist'));
        }
        return fields;
    }
    // tslint:disable-next-line:max-line-length
    private addToggleCheckBoxOption(fields: DynamicFormFieldInterface[], fieldIndex: number, option: {key: string, label: string, tarif: number}): DynamicFormFieldInterface[] {
        const optionExist = !!fields[fieldIndex].checkboxNumberOptions.filter( opt => opt.key === option.key ).length;
        if (!optionExist) {
            fields[fieldIndex].checkboxNumberOptions.unshift({
                key: option.key,
                label: option.label,
                value: true,
                tarif: option.tarif,
                numberOpt: {
                    label: fields[fieldIndex].checkboxNumberOptions[0].numberOpt.label,
                    unit: fields[fieldIndex].checkboxNumberOptions[0].numberOpt.unit,
                    step: fields[fieldIndex].checkboxNumberOptions[0].numberOpt.step,
                    value: option.tarif,
                },
            });
        } else {
            this.toastrService.error(this.translateService.instant('option already exist'));
        }
        return fields;
    }
    // tslint:disable-next-line:max-line-length
    private addToggleNumberRadioList(fields: DynamicFormFieldInterface[], fieldIndex: number, option: {name: string, value: number, inclusDansPrix: boolean}): DynamicFormFieldInterface[] {
        const optionExist = !!fields[fieldIndex].optionsToggleNumberRadioList.filter( opt => opt.name === option.name ).length;
        if (!optionExist) {
            fields[fieldIndex].optionsToggleNumberRadioList.unshift({
                value: true,
                name: option.name,
                inclusDansPrix: option.inclusDansPrix,
                tarif: option.value,
                label: fields[fieldIndex].optionsToggleNumberRadioList[0].label,
                numberOption: {
                    value: option.value,
                    label: fields[fieldIndex].optionsToggleNumberRadioList[0].numberOption.label,
                    step: fields[fieldIndex].optionsToggleNumberRadioList[0].numberOption.step,
                    unit: fields[fieldIndex].optionsToggleNumberRadioList[0].numberOption.unit,
                },
            });
        } else {
            this.toastrService.error(this.translateService.instant('option already exist'));
        }
        return fields;
    }
    // tslint:disable-next-line:max-line-length
    private addToggleNumberList(fields: DynamicFormFieldInterface[], fieldIndex: number, option: {name: string, tarif: number, description: string}): DynamicFormFieldInterface[] {
        const optionExist = !!fields[fieldIndex].optionsToggleNumberList.filter( opt => opt.name === option.name ).length;
        if (!optionExist) {
            fields[fieldIndex].optionsToggleNumberList.unshift({
                value: true,
                name: option.name,
                tarif: option.tarif,
                label: option.description,
                numberOption: {
                    value: option.tarif,
                    label: fields[fieldIndex].optionsToggleNumberList[0].numberOption.label,
                    step: fields[fieldIndex].optionsToggleNumberList[0].numberOption.step,
                    unit: fields[fieldIndex].optionsToggleNumberList[0].numberOption.unit,
                },
            });
        } else {
            this.toastrService.error(this.translateService.instant('option already exist'));
        }
        return fields;
    }
    // tslint:disable-next-line:max-line-length
    private addToggleProductsList(fields: DynamicFormFieldInterface[], fieldIndex: number, option: {name: string, tarif: number, description: string}, productName: string): DynamicFormFieldInterface[] {
        // const optionExist = !!fields[fieldIndex].optionsToggleNumberList.filter( opt => opt.name === option.name ).length;
        const opt = fields[fieldIndex].products.find( product => product.name === productName)
                                      .options.find(o => o.name === option.name);
        if (!!!opt) {
            fields[fieldIndex].products.find( product => product.name === productName)
            .options.unshift({
                field: option.name.toLocaleLowerCase().replace(' ', '_'),
                search: option.name.toLocaleLowerCase().replace(' ', '_'),
                value: true,
                name: option.name,
                label: option.description,
                tarif: option.tarif
            });
        } else {
            this.toastrService.error(this.translateService.instant('option already exist'));
        }
        console.log('field', fields[fieldIndex]);
        
        return fields;
    }
    // tslint:disable-next-line:max-line-length
    private addToggleNumberListOptions(fields: DynamicFormFieldInterface[], fieldIndex: number, option: {name: string, tarif: number, description: string}): DynamicFormFieldInterface[] {
        const optionExist = !!fields[fieldIndex].optionsToggleNumberListOptions.filter( opt => opt.name === option.name ).length;
        if (!optionExist) {
            fields[fieldIndex].optionsToggleNumberListOptions.unshift({
                value: true,
                name: option.name,
                label: option.description,
				opts: [
					{
						name: `Tarif par part`,
						value: 20,
						step: 1,
						unit: `€`
					},
					{
						name: `Nbre de parts min`,
						value: 36,
						step: 1,
						unit: ``
					},
					{
						name: `Nbre de parts max`,
						value: 60,
						step: 1,
						unit: ``
					},
					{
						name: `Nbre d'étages max`,
						value: 4,
						step: 1,
						unit: ``
					},
				],
            });
        } else {
            this.toastrService.error(this.translateService.instant('option already exist'));
        }
        return fields;
    }
    // tslint:disable-next-line:max-line-length
    private addToggleList(fields: DynamicFormFieldInterface[], fieldIndex: number, option: {name: string}): DynamicFormFieldInterface[] {
        const optionExist = !!fields[fieldIndex].optionsToggleList.filter( opt => opt.name === option.name ).length;
        if (!optionExist) {
            fields[fieldIndex].optionsToggleList.unshift({
                value: true,
                name: option.name,
                label: fields[fieldIndex].optionsToggleList[0].label,
            });
        } else {
            this.toastrService.error(this.translateService.instant('option already exist'));
        }
        return fields;
    }
    // tslint:disable-next-line:max-line-length
    private addToggleFormatsList(fields: DynamicFormFieldInterface[], fieldIndex: number, option: {name: string}): DynamicFormFieldInterface[] {
        const optionExist = !!fields[fieldIndex].optionsToggleFormatsList.filter( opt => opt.name === option.name ).length;
        if (!optionExist) {
            fields[fieldIndex].optionsToggleFormatsList.unshift({
                value: true,
                name: option.name,
                label: `do you propose this format ?`,
                numberOption: fields[fieldIndex].optionsToggleFormatsList[0].numberOption,
            });
        } else {
            this.toastrService.error(this.translateService.instant('option already exist'));
        }
        return fields;
    }
    // tslint:disable-next-line:max-line-length
    private addToggleVoituresList(fields: DynamicFormFieldInterface[], fieldIndex: number, option: {name: string, description: string, numberOptions: {tarifParJour: number, kilometrageInclus: number, distance: number, tarifParKilometre: number}, categorie: string}): DynamicFormFieldInterface[] {
        const optionExist = !!fields[fieldIndex].voitures.filter( opt => opt.name === option.name ).length;
        if (!optionExist) {
            if (fields[fieldIndex].voitures[0].nbrPlace) {
                fields[fieldIndex].voitures.unshift({
                    value: true,
                    name: option.name,
                    label: option.description,
                    categorie: option.categorie,
                    nbrPlace: 9,
                    options: [
                        {
                            name: `Tarif par jour`,
                            value: option.numberOptions.tarifParJour,
                            step: 10,
                            unit: `€`,
                        },
                        {
                            name: `Kilométrage inclus`,
                            value: option.numberOptions.kilometrageInclus,
                            step: 100,
                            unit: `KM`,
                        },
                        {
                            name: `Distance location max`,
                            value: option.numberOptions.distance,
                            step: 100,
                            unit: `KM`,
                        },
                        {
                            name: `Tarif / Kilomètre sup`,
                            value: option.numberOptions.tarifParKilometre,
                            step: 1,
                            unit: `€`,
                        },
                    ],
                });
            } else {
                fields[fieldIndex].voitures.unshift({
                    value: true,
                    name: option.name,
                    label: option.description,
                    categorie: option.categorie,
                    options: [
                        {
                            name: `Tarif par jour`,
                            value: option.numberOptions.tarifParJour,
                            step: 10,
                            unit: `€`,
                        },
                        {
                            name: `Kilométrage inclus`,
                            value: option.numberOptions.kilometrageInclus,
                            step: 100,
                            unit: `KM`,
                        },
                        {
                            name: `Distance location max`,
                            value: option.numberOptions.distance,
                            step: 100,
                            unit: `KM`,
                        },
                        {
                            name: `Tarif / Kilomètre sup`,
                            value: option.numberOptions.tarifParKilometre,
                            step: 1,
                            unit: `€`,
                        },
                    ],
                });
            }
        } else {
            this.toastrService.error(this.translateService.instant('option already exist'));
        }
        return fields;
    }
        // tslint:disable-next-line:max-line-length
    private addCheckBoxNumberFormatList(fields: DynamicFormFieldInterface[], fieldIndex: number, option: {name: string}): DynamicFormFieldInterface[] {
        const optionExist = !!fields[fieldIndex].formats.filter( opt => opt.name === option.name ).length;
        if (!optionExist) {
            if (fields[fieldIndex].name === 'creationAlbum') {
                const modeles = [];
                fields[fieldIndex].formats[0].modeles.forEach(modele => {
                    modeles.push({
                        name: modele.name,
                        label: modele.label,
                        unit: modele.unit,
                        step: modele.step,
                        checked: false,
                        tarif: 70,
                    });
                });
                fields[fieldIndex].formats.unshift({
                    name: option.name,
                    label: `Indiquez si vous porposez ce format`,
                    value: true,
                    modeles,
                });
            } else {
                const modeles = [];
                fields[fieldIndex].formats[0].modeles.forEach(modele => {
                    modeles.push({
                        name: modele.name,
                        label: modele.label,
                        unit: modele.unit,
                        step: modele.step,
                        tarif: 0.05,
                    });
                });
                fields[fieldIndex].formats.unshift({
                    name: option.name,
                    value: true,
                    label: `Indiquez si vous porposez ce format`,
                    modeles,
                });
            }
            this.fieldWithAddedCheckBoxNumberListOpt.next(fields[fieldIndex]);
        } else {
            this.toastrService.error(this.translateService.instant('option already exist'));
        }
        return fields;
    }
        // tslint:disable-next-line:max-line-length
    private addCheckBoxNumberModeleList(fields: DynamicFormFieldInterface[], fieldIndex: number, option: {name: string}, formatName: string): DynamicFormFieldInterface[] {
        // const optionExist = !!fields[fieldIndex].formats.filter( opt => opt.name === option.name ).length;
        console.log('here');
        const formatIndex = fields[fieldIndex].formats.findIndex( opt => opt.name === formatName );
        const modeleExist = !!fields[fieldIndex].formats[formatIndex].modeles.filter( opt => opt.name === option.name ).length;
        if (!modeleExist) {
            if (fields[fieldIndex].name === 'creationAlbum') {
                fields[fieldIndex].formats[formatIndex].modeles.unshift({
                    name: option.name,
                    tarif: fields[fieldIndex].formats[formatIndex].modeles[0].tarif,
                    label: fields[fieldIndex].formats[formatIndex].modeles[0].label,
                    unit: fields[fieldIndex].formats[formatIndex].modeles[0].unit,
                    step: fields[fieldIndex].formats[formatIndex].modeles[0].step,
                    checked: fields[fieldIndex].formats[formatIndex].modeles[0].checked,
                });
            } else {
                fields[fieldIndex].formats[formatIndex].modeles.unshift({
                    name: option.name,
                    tarif: fields[fieldIndex].formats[formatIndex].modeles[0].tarif,
                    label: fields[fieldIndex].formats[formatIndex].modeles[0].label,
                    unit: fields[fieldIndex].formats[formatIndex].modeles[0].unit,
                    step: fields[fieldIndex].formats[formatIndex].modeles[0].step,
                });
            }

        } else {
            this.toastrService.error(this.translateService.instant('option already exist'));
        }
        return fields;
    }
    // tslint:disable-next-line:max-line-length
    private addToggleOption(fields: DynamicFormFieldInterface[], fieldIndex: number, option: {name: string, tarifUnitaire: number}, list: string): DynamicFormFieldInterface[] {
        const optionExist = !!fields[fieldIndex][list].options.filter( opt => opt.label === option.name ).length;
        if (!optionExist) {
            // tslint:disable-next-line:max-line-length
            fields[fieldIndex][list].options.unshift({step: fields[fieldIndex][list].options[0].step,
                                                                            label: option.name,
                                                                             value: option.tarifUnitaire,
                                                                            // tslint:disable-next-line:max-line-length
                                                                            unit: fields[fieldIndex][list].options[0].unit});
        } else {
            this.toastrService.error(this.translateService.instant('option already exist'));
        }
        return fields;
    }
    public addPrefix(object: any, prefix: string) {
        return Object.entries(object)
        .map(([k, v]) => ({ [prefix + '_' + k]: v }))
        .reduce((acc, val) => ({ ...acc, ...val }), {});
    }
    public removePrefix(object: any, prefix: string) {
        return Object.entries(object)
        .map(([k, v]) => ({ [k.replace(`${prefix}_`, '')]: v }))
        .reduce((acc, val) => ({ ...acc, ...val }), {});
    }
    public selectCriteres(object: any, prefix: string) {
        const newObj = {};
        Object.keys(object).forEach( k => {
            if (k.includes(prefix + '_')) {
                newObj[k] = object[k];
            }
        } );
        return newObj;
    }
}
