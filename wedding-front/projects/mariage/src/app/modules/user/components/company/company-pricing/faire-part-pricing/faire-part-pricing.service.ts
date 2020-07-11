import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { FairePartCriteres, newFairePartCriteres } from '../../company-details/faire-part/faire-part.interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { CompanyService } from '../../../../services/company.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FairePartPricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(fairePartCriteres: FairePartCriteres): DynamicFormFieldInterface[] {
        const unit = '€';
        const newFormObject: DynamicFormFieldInterface[] = [];
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty1', displayName: `minimum order`, value: true, label: `indicate the minimum order quantity`}, false,
        [
            {
                value: fairePartCriteres.commandeMin,
                name: 'commandeMin',
                step: 1,
                unit: '',
            },
        ]));
        newFormObject.push(this.formMapperService.initCheckBoxNumberList(
        // tslint:disable-next-line:max-line-length
        {value: fairePartCriteres.finitionsProposes.value, name: 'finitionsProposes', type: fairePartCriteres.finitionsProposes.type, displayName: ``, label: ``},
        // tslint:disable-next-line:max-line-length
        {name: `proposed finishes`, label: `indicate the finishes you propose`, value: fairePartCriteres.finitionsProposes.finitions, default: ['Mate', 'Brillante']},
        fairePartCriteres.finitionsProposes.formats,
            {label: `fees per unity`, unit, step: 0.05},
            `proposez-vous ce format ?`
        ));
        newFormObject.push(this.formMapperService.initCheckBoxField('colories', 'proposed colors',
        'indicate the colors which you propose', true, fairePartCriteres.colories, [
            { key: 'blanc', label: 'white', value: false},
            { key: 'noir', label: 'black', value: false},
            { key: 'rouge', label: 'red', value: false},
            { key: 'rose', label: 'pink', value: false},
            { key: 'jaune', label: 'yellow', value: false},
            { key: 'vert', label: 'green', value: false},
            { key: 'gris', label: 'grey', value: false},
            { key: 'violet', label: 'purple', value: false},
        ]));
        // Dorures
        newFormObject.push(this.formMapperService.initToggleNumberList(
            {name: `dorures`, type: fairePartCriteres.dorures.type},
            `Dorures`,
            {label: ``, unit, step: 10},
            fairePartCriteres.dorures.options,
        ));
        //#region initToggleNumberRadioField
        newFormObject.push(this.formMapperService.initToggleNumberRadioField(
            false,
            // tslint:disable-next-line:max-line-length
            {name: 'livraison', displayName: 'delivery', value: fairePartCriteres.livraison, label: `do you propose the delivery service ?`,
                    numberOptions: []
            },
            // tslint:disable-next-line:max-line-length
            {name: 'livraisonInclusDansPrix', label: `this service's price is include in the overall price ?`, value: fairePartCriteres.livraisonInclusDansPrix,
            options: [
                {key: 'yes', label: 'yes', value: 'true'},
                {key: 'no', label: 'as an option', value: 'false'},
            ],
            numberOptions: [
                {
                    value: fairePartCriteres.livraisonTarif,
                    label: 'livraisonTarif',
                    step: 1,
                    unit,
                },
            ]
        }
        ));
        //#endregion
        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.FAIRE_PART),
                categories: [
                    CategoryLabelEnum.FAIRE_PART
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.FAIRE_PART;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newFairePartCriteres, category),
            categories: [category]
        };
        return this.companyService.putServiceByEmailAndService(category, providerEmail, data);
    }
    // tslint:disable-next-line:max-line-length
    public async addOption(fields: DynamicFormFieldInterface[], field: DynamicFormFieldInterface, formatName?: string): Promise<DynamicFormFieldInterface[]> {
        return this.formMapperService.addOption(fields, field, formatName);
    }
    public removePrefix(object: any, prefix: string) {
        return this.formMapperService.removePrefix(object, prefix);
    }
    public addPrefix(object: any, prefix: string) {
        return this.formMapperService.addPrefix(object, prefix);
    }
    public selectCriteres(object: any, prefix: string) {
        return this.formMapperService.selectCriteres(object, prefix);
    }
}
