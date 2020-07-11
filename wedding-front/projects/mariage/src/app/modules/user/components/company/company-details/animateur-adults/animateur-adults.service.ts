import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { AnimateurAdultesCriteres, newAdultesCriteres } from './animateur-adult.interface';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../category-label.enum';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';

@Injectable({providedIn: 'root'})
export class AnimateurAdultsService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(animateurAdultesCriteria: AnimateurAdultesCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        newFormObject.push(this.formMapperService.initRadioStringField('typeDeService', `service type`,
        `indicate the service type that you propose`, animateurAdultesCriteria.typeDeService, false, [
            { key: 'magicien', label: 'magician', value: 'magicien'},
            { key: 'mentaliste', label: 'mentalist', value: 'mentaliste'},
            { key: 'sosie', label: 'doppleganger', value: 'sosie'},
            { key: 'danseurs', label: 'dancers', value: 'danseurs'},
            { key: 'dessinateur', label: 'designer', value: 'dessinateur'},
        ]));
        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.ANIMATEUR_ADULTS),
                categories: [
                    CategoryLabelEnum.ANIMATEUR_ADULTS
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.ANIMATEUR_ADULTS;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newAdultesCriteres, category),
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
