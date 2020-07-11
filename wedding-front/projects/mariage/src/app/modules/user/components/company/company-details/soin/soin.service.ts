import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../category-label.enum';
import { SoinCriteres, newSoinCriteres } from './soin.interface';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';

@Injectable({providedIn: 'root'})
export class SoinService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(soinCriteres: SoinCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        newFormObject.push(this.formMapperService.initCheckBoxField('lieuRealisation', 'place of realization',
        'indicate the place or places where you propose to give your services', false, soinCriteres.lieuRealisation, [
            { key: 'a_domicile', label: 'at home', value: false},
            { key: 'au_salon_institut', label: 'at salon / institution', value: false},
        ]));
        newFormObject.push(this.formMapperService.initCheckBoxField('sexPraticien', `the practitioner's sex`,
        `indicate the practitioner's sex`, false, soinCriteres.sexPraticien, [
            { key: 'feminin', label: 'female', value: false},
            { key: 'masculin', label: 'male', value: false},
        ]));
        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.SOIN),
                categories: [
                    CategoryLabelEnum.SOIN
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.SOIN;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newSoinCriteres, category),
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
