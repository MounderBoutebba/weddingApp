import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { LachersCriteres, newLachersCriteres } from '../../company-details/lachers/lachers.interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';

@Injectable({providedIn: 'root'})
export class LachersPricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(lachersCriteres: LachersCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        const unit = '€';
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty1', displayName: `pricing`, value: true, label: `indicate your min fee per minute`}, false,
        [
            {
                value: lachersCriteres.tarif_horaire,
                name: 'tarif_horaire',
                step: 10,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty2', displayName: `reservation duration`, value: true, label: `indicate your min reservation duration`}, false,
        [
            {
                value: lachersCriteres.dureeMin,
                name: 'dureeMin',
                step: 1,
                unit: 'min',
            },
        ]));
        // lachers
        newFormObject.push(this.formMapperService.initToggleNumberList(
            {name: `lachers`, type: lachersCriteres.lachers.type},
            `Lâchers`,
            {label: ``, unit, step: 10},
            lachersCriteres.lachers.options,
        ));
        // Compléments
        newFormObject.push(this.formMapperService.initToggleNumberRadioList(
            {name: `complements`, type: lachersCriteres.complements.type},
            `Compléments`,
            {label: `do you include the complement price in the overall price ?`, unit, step: 10},
            lachersCriteres.complements.options,
        ));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initSimpleToggleField('autorisation', `authorization`, 'do you cover your services\' authorisation', lachersCriteres.autorisation, false));
        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.LACHERS),
                categories: [
                    CategoryLabelEnum.LACHERS
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.LACHERS;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newLachersCriteres, category),
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
