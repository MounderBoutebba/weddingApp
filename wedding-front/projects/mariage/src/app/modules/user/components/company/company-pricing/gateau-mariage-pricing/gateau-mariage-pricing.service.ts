import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { GateauMariageCriteres, newGateauMariageCriteres } from '../../company-details/gateau-mariage/gateau-mariage.interface';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';

@Injectable({providedIn: 'root'})
export class GateauMariagePricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithGateauMariageCriteria(gateauMariageCriteres: GateauMariageCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        const unit = '€';

        newFormObject.push(this.formMapperService.initToggleNumberListOptions(
            {name: `gateaux`, displayName: `Les gâteaux`, type: gateauMariageCriteres.gateaux.type,
            value: gateauMariageCriteres.gateaux.value,
            secondaryDisplayName: `Gâteau de mariage`, secondaryLabel: 'do you propose wedding cake creation ?'},
            {value: gateauMariageCriteres.gateaux.livraison.value,
            tarif: gateauMariageCriteres.gateaux.livraison.tarif,
            displayName: `delivery`,
            label: `do you propose delivery for your products ?`,
        },
            gateauMariageCriteres.gateaux.options));
        // tslint:disable-next-line:max-line-length
        /*
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'livraison', displayName: `delivery`, value: gateauMariageCriteres.livraison, label: `do you propose delivery for your products ?`}, false,
        [
            {
                value: gateauMariageCriteres.livraisonTarif,
                name: 'livraisonTarif',
                step: 10,
                unit,
            },
        ]));*/
        return newFormObject;
    }
    public mapFormValueToGateauMariageCriteria(formValue: any, gateauMariageCriteres: any) {
        return {
                criteres: this.formMapperService
                // tslint:disable-next-line:max-line-length
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, gateauMariageCriteres), CategoryLabelEnum.GATEAU_MARIAGE),
                categories: [
                    CategoryLabelEnum.GATEAU_MARIAGE
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.GATEAU_MARIAGE;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newGateauMariageCriteres, category),
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
