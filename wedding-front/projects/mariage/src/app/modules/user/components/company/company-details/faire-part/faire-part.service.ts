import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { FairePartCriteres, newFairePartCriteres } from './faire-part.interface';
import { CategoryLabelEnum } from '../category-label.enum';
import { CompanyService } from '../../../../services/company.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class FairePartService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(fairePartCriteres: FairePartCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        newFormObject.push(this.formMapperService.initRadioNumberField('delaisDeRealisation', `completion deadlines`,
        `indicate the maximum capacity of your place`, fairePartCriteres.delaisDeRealisation, true, [
            { key: '7', label: 'days', value: 7},
            { key: '15', label: 'days', value: 15},
            { key: '30', label: 'days', value: 30},
            { key: '60', label: 'days', value: 60},
            { key: '90', label: 'days', value: 90},
            { key: '120', label: 'days', value: 120},
        ]));
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
