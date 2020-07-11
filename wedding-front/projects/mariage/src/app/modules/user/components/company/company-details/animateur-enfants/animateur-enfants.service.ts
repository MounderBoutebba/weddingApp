import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { AnimateurEnfantsCriteres, newEnfantsCriteres } from './animateur-enfants.interface';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../category-label.enum';
import { CompanyService } from '../../../../services/company.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AnimateurEnfantsService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(animateurEnfantCriteria: AnimateurEnfantsCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        newFormObject.push(this.formMapperService.initCheckBoxField('tranchesAge', 'age groups',
        'indicate which age group your service is addressed', false, animateurEnfantCriteria.tranchesAge, [
            { key: '0_a_3_ans', label: '0 to 3 y/old', value: false},
            { key: '3_a_6_ans', label: '3 to 6 y/old', value: false},
            { key: '6_a_10_ans', label: '6 to 10 y/old', value: false},
            { key: '10_a_13_ans', label: '10 to 13 y/old', value: false},
        ]));
        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.ANIMATEUR_ENFANTS),
                categories: [
                    CategoryLabelEnum.ANIMATEUR_ENFANTS
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.ANIMATEUR_ENFANTS;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newEnfantsCriteres, category),
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
