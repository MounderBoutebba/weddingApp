import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { GateauMariageCriteres, newGateauMariageCriteres } from './gateau-mariage.interface';
import { CategoryLabelEnum } from '../category-label.enum';
import { CompanyService } from '../../../../services/company.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class GateauMariageService {
    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithGateauMariageCriteria(gateauMariageCriteres: GateauMariageCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        newFormObject.push(this.formMapperService.initCheckBoxField('typesDeCreation', 'creation types',
        'indicate the types of cakes that you propose', false, gateauMariageCriteres.typesDeCreation, [
            { key: 'gateaumariage_weddingCake', label: 'wedding cakes', value: false},
            { key: 'gateaumariage_nakedCake', label: 'pièce montée', value: false},
        ]));
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
