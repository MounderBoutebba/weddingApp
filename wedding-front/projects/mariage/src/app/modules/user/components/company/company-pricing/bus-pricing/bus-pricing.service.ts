import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { BusCriteres, newBusCriteres } from '../../company-details/bus/bus.interface';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { CompanyService } from '../../../../services/company.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BusPricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithBusCriteria(busCriteres: BusCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        const unit = '€';
        // Voitures
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleVoitureList({name: `bus`, type: busCriteres.bus.type, displayName: `Bus`},
                                                                        busCriteres.bus.fields));
        // services
        newFormObject.push(this.formMapperService.initToggleNumberRadioList(
            {name: `services`, type: busCriteres.services.type},
            `Services`,
            {label: `do you include the service price in the overall price ?`, unit, step: 10},
            busCriteres.services.options,
        ));
        return newFormObject;
    }
    public mapFormValueToVoitureCriteria(formValue: any, busCriteres: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, busCriteres), CategoryLabelEnum.BUS),
                categories: [
                    CategoryLabelEnum.BUS
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.BUS;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newBusCriteres, category),
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
