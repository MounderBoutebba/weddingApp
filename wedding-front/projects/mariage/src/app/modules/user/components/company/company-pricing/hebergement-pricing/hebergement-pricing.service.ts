import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { HebergementCriteres, newHebergementCriteres } from '../../company-details/hebergement/hebergement.interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { CompanyService } from '../../../../services/company.service';
import { Observable } from 'rxjs';



@Injectable({providedIn: 'root'})
export class HebergementPricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(hebergementCriteres: HebergementCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        const unit = '€';
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty1', displayName: `number of rooms`, value: true, label: `indicate the number of rooms available for rent`}, false,
        [
            {
                value: hebergementCriteres.nombreDeChambre,
                name: 'nombreDeChambre',
                step: 1,
                unit: '',
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initRadioNumber({name: 'typeDeTarification', displayName: `pricing type`, label: `Indiquez si vous appliquez un tarif fixe pour la chambre ou bien variable selon le nombre de personne`}, hebergementCriteres.typeDeTarification.type,
        [
            {
                key: 'variable',
                label: 'Variable',
                value: false,
            },
            {
                key: 'fixe',
                label: 'Fixe',
                value: false,
            },
        ], hebergementCriteres.typeDeTarification.tarifs));
        newFormObject.push(this.formMapperService.initToggleNumberRadioList(
            {name: `services`, type: hebergementCriteres.services.type},
            `Services`,
            {label: `do you include the service price in the overall price ?`, unit, step: 10},
            hebergementCriteres.services.options,
        ));
        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.HEBERGEMENT),
                categories: [
                    CategoryLabelEnum.HEBERGEMENT
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.HEBERGEMENT;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newHebergementCriteres, category),
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
