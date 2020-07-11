import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../category-label.enum';
import { CoachCriteres, newCoachCriteres } from './coach.interface';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';

@Injectable({providedIn: 'root'})
export class CoachService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(coachCriteria: CoachCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        newFormObject.push(this.formMapperService.initCheckBoxField('lieu', 'courses\' place',
        'indicate the place or places where you propose to give your courses', false, coachCriteria.lieu, [
            { key: 'a_domicile', label: 'at home', value: false},
            { key: 'en_salle', label: 'indoors', value: false},
        ]));
        newFormObject.push(this.formMapperService.initRadioNumberField('elevensSimultane', `students at the same course`,
        `indicate the maximum number of students that you can have for one course`, coachCriteria.elevesSimultane, true, [
            { key: '1', label: '', value: 1},
            { key: '2', label: '', value: 2},
            { key: '3', label: '', value: 3},
            { key: '4', label: '', value: 4},
            { key: '5', label: '', value: 5},
            { key: '6', label: '', value: 6},
        ]));
        newFormObject.push(this.formMapperService.initCheckBoxField('typesDeSport', 'Sports maîtrisés',
        'indicate the sports which you have mastered', true, coachCriteria.typesDeSport, [
            { key: 'musclulation', label: 'bodybuilding', value: false},
            { key: 'cardio_boxing', label: 'cardio boxing', value: false},
            { key: 'pilates', label: 'pilates', value: false},
            { key: 'lesmills', label: 'LesMills', value: false},
            { key: 'cycling', label: 'cycling', value: false},
            { key: 'jump_fit', label: 'jump fit', value: false},
        ]));
        newFormObject.push(this.formMapperService.initRadioStringField('AgrementServiceALaPersonne', `service to person agreement`,
        // tslint:disable-next-line:max-line-length
        `Disposez-vous de l'agrément SAP qui permet à vos clients de bénéficier de réduction d'impot sur le montant de vos cours ?`, String(coachCriteria.AgrementServiceALaPersonne), false, [
            {key: 'yes', label: 'yes', value: 'true'},
            {key: 'no', label: 'no', value: 'false'},
        ]));
        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.COACH),
                categories: [
                    CategoryLabelEnum.COACH
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.COACH;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newCoachCriteres, category),
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
