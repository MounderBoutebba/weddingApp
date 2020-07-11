import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { FeuArtificesCriteres, newFeuArtificesCriteres } from '../../company-details/feu-artifices/feu-artifices.interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';


@Injectable({providedIn: 'root'})
export class FeuArtificesPricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(feuArtificesCriteres: FeuArtificesCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        const unit = '€';
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty1', displayName: `pricing`, value: true, label: `indicate your min fee per minute`}, false,
        [
            {
                value: feuArtificesCriteres.tarif_horaire,
                name: 'tarif_horaire',
                step: 10,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty2', displayName: `reservation duration`, value: true, label: `indicate your min reservation duration`}, false,
        [
            {
                value: feuArtificesCriteres.dureeMin,
                name: 'dureeMin',
                step: 1,
                unit: 'min',
            },
        ]));
        newFormObject.push(this.formMapperService.initToggleNumberRadioList(
            {name: `effets`, type: feuArtificesCriteres.effets.type},
            `Effets`,
            {label: `do you include the effect price in the overall price ?`, unit, step: 10},
            feuArtificesCriteres.effets.options,
        ));
        newFormObject.push(this.formMapperService.initToggleNumberRadioList(
            {name: `programmes`, type: feuArtificesCriteres.programmes.type},
            `Programmes`,
            {label: `do you include the program price in the overall price ?`, unit, step: 10},
            feuArtificesCriteres.programmes.options,
        ));

        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.FEU_ARTIFICES),
                categories: [
                    CategoryLabelEnum.FEU_ARTIFICES
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.FEU_ARTIFICES;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newFeuArtificesCriteres, category),
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
