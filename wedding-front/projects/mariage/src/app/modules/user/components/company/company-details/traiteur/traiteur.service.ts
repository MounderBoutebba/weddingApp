import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { TraiteurCriteres, newTraiteurCriteres } from './traiteur.interface';
import { CategoryLabelEnum } from '../category-label.enum';
import { CompanyService } from '../../../../services/company.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TraiteurService {
    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithTraiteurCriteria(traiteurCriteres: TraiteurCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        newFormObject.push(this.formMapperService.initCheckBoxField('specialiteCuisine', 'cuisine specialties',
        'indicate the specialties of your cuisine', true, traiteurCriteres.specialiteCuisine, [
            { key: 'francaise', label: 'française', value: false},
            { key: 'mediterraneenne', label: 'méditérranéenne', value: false},
            { key: 'italienne', label: 'italienne', value: false},
            { key: 'americaine', label: 'américaine', value: false},
            { key: 'asiatique', label: 'Asiatique', value: false},
            { key: 'indienne', label: 'Indienne', value: false},
            { key: 'barbecue', label: 'Barbecue', value: false},
            { key: 'healthy_saine', label: 'Healthy/Saine', value: false},
            { key: 'mexicaine_latine', label: 'Mexicaine/Latine', value: false},
        ]));
        newFormObject.push(this.formMapperService.initRadioStringField('niveauElaboration', `elaboration level`,
        `indicate the elaboration level of your cuisine`, traiteurCriteres.niveauElaboration, false, [
            { key: 'cuisine_brut', label: 'cuisine brut', value: 'cuisine_brut'},
            { key: 'cuisine_simple', label: 'cuisine simple', value: 'cuisine_simple'},
            { key: 'cuisine_semi_gastronomique', label: 'cuisine semi-gastronomique', value: 'cuisine_semi_gastronomique'},
            { key: 'cuisine_gastronomique', label: 'cuisine gastronomique', value: 'cuisine_gastronomique'},
        ]));
        newFormObject.push(this.formMapperService.initRadioStringField('specificiteReligieuses', `religious specifications`,
        `indicate if you adapt to the client's religious specifications or not`, traiteurCriteres.specificiteReligieuses, false, [
            { key: 'adapte_au_client', label: 's\'adapte au client', value: 'adapte_au_client'},
            { key: 'casher', label: 'casher', value: 'casher'},
            { key: 'halal', label: 'halal', value: 'halal'},
            { key: 'vegetarienne', label: 'végétarienne', value: 'vegetarienne'},
            { key: 'vegetalienne', label: 'Végétalienne', value: 'vegetalienne'},
        ]));
        return newFormObject;
    }
    public mapFormValueToTraiteurCriteria(formValue: any, traiteurCriteres: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, traiteurCriteres), CategoryLabelEnum.TRAITEUR),
                categories: [
                    CategoryLabelEnum.TRAITEUR
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.TRAITEUR;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newTraiteurCriteres, category),
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
