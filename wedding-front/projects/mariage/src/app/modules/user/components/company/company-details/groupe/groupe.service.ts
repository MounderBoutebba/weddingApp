import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { GroupeCriteres, newGroupeCriteres } from './groupe.interface';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../category-label.enum';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';

@Injectable({providedIn: 'root'})
export class GroupeService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(groupeCriteria: GroupeCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        newFormObject.push(this.formMapperService.initCheckBoxField('specialite', 'specialties',
        'indicate your specialties', true, groupeCriteria.specialite, [
            { key: 'generaliste', label: 'general practitioner', value: false},
            { key: 'musique_actuelles', label: 'modern music', value: false},
            { key: 'oriental', label: 'oriental', value: false},
            { key: 'africain', label: 'african', value: false},
            { key: 'indien', label: 'indian', value: false},
            { key: 'latino', label: 'latino', value: false},
            { key: 'antillais', label: 'west indians', value: false},
            { key: 'pop', label: 'pop', value: false},
            { key: 'hip_hop_rap_rnb', label: 'Hip-Hop/Rap/RnB', value: false},
            { key: 'electronic_dance_House', label: 'Electronic/Dance/House', value: false},
            { key: 'annees_80_disco', label: '80s / disco', value: false},
        ]));
        newFormObject.push(this.formMapperService.initCheckBoxField('instruments', 'instruments',
        'indicate the instruments which you dispose', true, groupeCriteria.instruments, [
            { key: 'table_de_mixage', label: 'mix table', value: false},
            { key: 'piano', label: 'piano', value: false},
            { key: 'batterie', label: 'batterie', value: false},
            { key: 'guitare', label: 'guitare', value: false},
            { key: 'saxophone', label: 'Saxophone', value: false},
            { key: 'violon', label: 'violin', value: false},
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty1', displayName: `speakers`, value: true, label: `indicate the number of speakers in the weeding day`}, false,
        [
            {
                value: groupeCriteria.nombreIntervenants,
                name: 'nombreIntervenants',
                step: 1,
                unit: '',
            },
        ]));
        newFormObject.push(this.formMapperService.initRadioStringField('typePublic', `audience type`,
        `indicate your audience type`, groupeCriteria.typePublic, false, [
            { key: 'adultes_et_enfants', label: 'adults and kids', value: 'adultes_et_enfants'},
            { key: 'adultes_seulement', label: 'just for adults', value: 'adultes_seulement'},
        ]));
        newFormObject.push(this.formMapperService.initRadioStringField('adaptabiliteLieu', `place adaptability`,
        `indicate the type of place where you can install and perform`, groupeCriteria.adaptabiliteLieu, false, [
            { key: 'interieur_et_exterieur', label: 'inside and outside', value: 'interieur_et_exterieur'},
            { key: 'interieur_seul', label: 'interior only', value: 'interieur_seul'},
        ]));
        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.GROUPE),
                categories: [
                    CategoryLabelEnum.GROUPE
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.GROUPE;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newGroupeCriteres, category),
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
