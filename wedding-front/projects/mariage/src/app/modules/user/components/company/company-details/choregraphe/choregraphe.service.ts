import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { ChoregrapheMariageCriteres, newChoregrapheMariageCriteres } from './choregraphe.interface';
import { CategoryLabelEnum } from '../category-label.enum';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';

@Injectable({providedIn: 'root'})
export class ChoregrapheService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(choregrapheCriteria: ChoregrapheMariageCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        newFormObject.push(this.formMapperService.initCheckBoxField('lieu', 'courses\' place',
        'indicate the place or places where you propose to give your courses', false, choregrapheCriteria.lieu, [
            { key: 'a_domicile', label: 'at home', value: false},
            { key: 'en_salle', label: 'indoors', value: false},
        ]));
        newFormObject.push(this.formMapperService.initRadioNumberField('elevesSimultane', `students at the same course`,
        `indicate the maximum number of students that you can have for one course`, choregrapheCriteria.elevesSimultane, true, [
            { key: '1', label: '', value: 1},
            { key: '2', label: '', value: 2},
            { key: '3', label: '', value: 3},
            { key: '4', label: '', value: 4},
            { key: '5', label: '', value: 5},
            { key: '6', label: '', value: 6},
        ]));
        newFormObject.push(this.formMapperService.initCheckBoxField('typesDeDances', 'Danses maîtrisées',
        'indicate the dances which you have mastered', true, choregrapheCriteria.typesDeDances, [
            { key: 'classique', label: 'classic', value: false},
            { key: 'salsa', label: 'salsa', value: false},
            { key: 'ballet', label: 'ballet', value: false},
            { key: 'flamenco', label: 'flamenco', value: false},
            { key: 'traditionnelle', label: 'traditional', value: false},
            { key: 'danse_de_salon', label: 'ballroom dancing', value: false},
            { key: 'contemporain_moderne', label: 'Contemporary / modern', value: false},
            { key: 'hip_hop', label: 'Hip-hop', value: false},
            { key: 'latin_salsa', label: 'Latin / salsa', value: false},
            { key: 'jazz', label: 'Jazz', value: false},
            { key: 'claquettes', label: 'Sandals', value: false},
        ]));
        newFormObject.push(this.formMapperService.initRadioStringField('AgrementServiceALaPersonne', `service to person agreement`,
        // tslint:disable-next-line:max-line-length
        `Disposez-vous de l'agrément SAP qui permet à vos clients de bénéficier de réduction d'impot sur le montant de vos cours ?`, String(choregrapheCriteria.AgrementServiceALaPersonne), false, [
            {key: 'yes', label: 'yes', value: 'true'},
            {key: 'no', label: 'no', value: 'false'},
        ]));
        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.CHOREGRAPHE),
                categories: [
                    CategoryLabelEnum.CHOREGRAPHE
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.CHOREGRAPHE;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newChoregrapheMariageCriteres, category),
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
