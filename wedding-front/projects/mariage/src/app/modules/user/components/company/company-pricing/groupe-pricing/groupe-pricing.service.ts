import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { GroupeCriteres, newGroupeCriteres } from '../../company-details/groupe/groupe.interface';
import { CompanyService } from '../../../../services/company.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GroupePricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(groupeCriteria: GroupeCriteres): DynamicFormFieldInterface[] {
        const unit = '€';
        const newFormObject: DynamicFormFieldInterface[] = [];
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty1', displayName: `pricing`, value: true, label: `indicate the hourly rate for your services`}, false,
        [
            {
                value: groupeCriteria.tarif_horaire,
                name: 'tarif_horaire',
                step: 1,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty2', displayName: `the reservation duration`, value: true, label: `indicate the minimal reservation's duration`}, false,
        [
            {
                value: groupeCriteria.dureeReservationMin,
                name: 'dureeReservationMin',
                step: 1,
                unit: 'h',
            },
        ]));
        // Animations
        newFormObject.push(this.formMapperService.initToggleNumberList(
            {name: `animations`, type: groupeCriteria.animations.type},
            `Animations`,
            {label: ``, unit, step: 10},
            groupeCriteria.animations.options,
        ));
        // matériels
        newFormObject.push(this.formMapperService.initToggleNumberList(
            {name: `materiels`, type: groupeCriteria.materiels.type},
            `Matériels`,
            {label: ``, unit, step: 10},
            groupeCriteria.materiels.options,
        ));
        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.GROUPE),
                categories: [
                    CategoryLabelEnum.GROUPE
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.GROUPE;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newGroupeCriteres, category),
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
