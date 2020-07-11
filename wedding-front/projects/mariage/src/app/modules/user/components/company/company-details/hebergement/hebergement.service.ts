import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { HebergementCriteres, newHebergementCriteres } from './hebergement.interface';
import { CategoryLabelEnum } from '../category-label.enum';
import { CompanyService } from '../../../../services/company.service';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class HebergementService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(hebergementCriteres: HebergementCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        newFormObject.push(this.formMapperService.initRadioStringField('typeHebergement', `accommodation's type`,
        `indicate the accommodation's category which you provide`, hebergementCriteres.typeHebergement, false, [
            { key: 'hotel', label: 'hotel', value: 'hotel'},
            { key: 'camping', label: 'camping', value: 'camping'},
            { key: 'chambre_de_hote', label: 'bed and breakfast', value: 'chambre_de_hote'},
            { key: 'appartement_maison', label: 'apartment / house', value: 'appartement_maison'},
        ]));
        // Équipements
        newFormObject.push(this.formMapperService.initToggleList(
            {name: `equipements`, type: hebergementCriteres.equipements.type},
            `Équipements`,
            hebergementCriteres.equipements.options,
        ));
        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.HEBERGEMENT),
                categories: [
                    CategoryLabelEnum.HEBERGEMENT
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.HEBERGEMENT;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newHebergementCriteres, category),
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
