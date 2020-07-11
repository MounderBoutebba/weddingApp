import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../category-label.enum';
import { LachersCriteres, newLachersCriteres } from './lachers.interface';
import { CompanyService } from '../../../../services/company.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LachersService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(lachersCriteres: LachersCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
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
