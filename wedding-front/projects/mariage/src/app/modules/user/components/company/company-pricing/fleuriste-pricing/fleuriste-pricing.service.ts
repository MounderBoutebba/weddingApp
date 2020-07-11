import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { FleuristeCriteres, newFleuristeCriteres } from '../../company-details/fleuriste/fleuriste.interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';

@Injectable({
	providedIn: 'root'
})
export class FleuristePricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithFleuristeCriteria(fleuristeCriteria: FleuristeCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        const unit = '€';
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty1', displayName: `compositions`, value: true, label: `indicate the minimal command's total`}, false,
        [
            {
                value: fleuristeCriteria.quantiteCommande,
                name: 'quantiteCommande',
                step: 1,
                unit: '',
            },
        ]));
        newFormObject.push(this.formMapperService.initToggleProduitsAccessoires(
            {name: 'fleurs', displayName: `Fleurs`, label: `indiquez la liste et tarifs unitaire des fleurs que vous proposez`,
            value: fleuristeCriteria.fleurs.value, type: fleuristeCriteria.fleurs.type},
            fleuristeCriteria.fleurs.options,
            {step: 1, unit}
        ));
        newFormObject.push(this.formMapperService.initToggleProduitsAccessoires(
            {name: 'feuillages', displayName: `Feuillages`, label: `indiquez la liste et tarifs unitaire des feuillages que vous proposez`,
            value: fleuristeCriteria.feuillages.value, type: fleuristeCriteria.feuillages.type},
            fleuristeCriteria.feuillages.options,
            {step: 1, unit}
        ));
        newFormObject.push(this.formMapperService.initToggleProduitsAccessoires(
            {name: 'decoration', displayName: `Décorations`, label: `indiquez la liste et tarifs unitaire des décorationsque que vous proposez`,
            value: fleuristeCriteria.decoration.value, type: fleuristeCriteria.decoration.type},
            fleuristeCriteria.decoration.options,
            {step: 1, unit}
        ));

        //#region initToggleNumberRadioField
        newFormObject.push(this.formMapperService.initToggleNumberRadioField(
            false,
            // tslint:disable-next-line:max-line-length
            {name: 'livraison', displayName: 'delivery', value: fleuristeCriteria.livraison, label: `do you propose this service ?`,
                    numberOptions: []
            },
            // tslint:disable-next-line:max-line-length
            {name: 'livraisonInclusDansPrix', label: `do you include the service price in the overall price ?`, value: fleuristeCriteria.livraisonInclusDansPrix,
            options: [
                {key: 'yes', label: 'yes', value: 'true'},
                {key: 'no', label: 'as an option', value: 'false'},
            ],
            numberOptions: [
                {
                    value: fleuristeCriteria.livraisonTarif,
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
    public mapFormValueToFleuristeCriteria(formValue: any, fleuristeCritere: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, fleuristeCritere), CategoryLabelEnum.FLEURISTE),
                categories: [
                    CategoryLabelEnum.FLEURISTE
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.FLEURISTE;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newFleuristeCriteres, category),
            categories: [category]
        };
        return this.companyService.putServiceByEmailAndService(category, providerEmail, data);
    }
    public async addOption(fields: DynamicFormFieldInterface[], field: DynamicFormFieldInterface): Promise<DynamicFormFieldInterface[]> {
        return this.formMapperService.addOption(fields, field);
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
