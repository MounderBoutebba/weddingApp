import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DjCriteres, newDjCriteres } from '../../company-details/dj/dj.interface';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';

@Injectable({providedIn: 'root'})
export class DjPricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(djCriteria: DjCriteres): DynamicFormFieldInterface[] {
        const unit = '€';
        const newFormObject: DynamicFormFieldInterface[] = [];
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty1', displayName: `pricing`, value: true, label: `indicate the hourly rate for your services`}, false,
        [
            {
                value: djCriteria.tarif_horaire,
                name: 'tarif_horaire',
                step: 1,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty2', displayName: `the reservation duration`, value: true, label: `indicate the minimal reservation's duration`}, false,
        [
            {
                value: djCriteria.dureeReservationMin,
                name: 'dureeReservationMin',
                step: 1,
                unit: 'h',
            },
        ]));
        // Animations
        newFormObject.push(this.formMapperService.initToggleNumberList(
            {name: `animations`, type: djCriteria.animations.type},
            `Animations`,
            {label: ``, unit, step: 10},
            djCriteria.animations.options,
        ));
        // matériels
        newFormObject.push(this.formMapperService.initToggleNumberList(
            {name: `materiels`, type: djCriteria.materiels.type},
            `Matériels`,
            {label: ``, unit, step: 10},
            djCriteria.materiels.options,
        ));
        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.DJ),
                categories: [
                    CategoryLabelEnum.DJ
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.DJ;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newDjCriteres, category),
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
