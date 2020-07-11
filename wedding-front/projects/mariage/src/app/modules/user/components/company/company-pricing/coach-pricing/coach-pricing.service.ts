import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CoachCriteres, newCoachCriteres } from '../../company-details/coach/coach.interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';

@Injectable({providedIn: 'root'})
export class CoachPricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(coachCriteria: CoachCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        const unit = '€';
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty1', displayName: `pricing`, value: true, label: `indicate your min hourly rate for one sitting`}, false,
        [
            {
                value: coachCriteria.tarif_horaire,
                name: 'tarif_horaire',
                step: 10,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty2', displayName: `reservation duration`, value: true, label: `indicate your min reservation duration`}, false,
        [
            {
                value: coachCriteria.dureeMin,
                name: 'dureeMin',
                step: 1,
                unit: 'h',
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'conseilsPersonnalises', displayName: `personalize advice`, value: coachCriteria.conseilsPersonnalises, label: `indicate if you do propose private consulting for personalize advice`}, false,
        [
            {
                value: coachCriteria.conseilsPersonnalisesTarif,
                name: 'conseilsPersonnalisesTarif',
                step: 10,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'essais', displayName: `essays`, value: coachCriteria.essais, label: `indicate if you do propose essays`}, false,
        [
            {
                value: coachCriteria.essaisTarif,
                name: 'essaisTarif',
                step: 10,
                unit,
            },
        ]));
        newFormObject.push(this.formMapperService.initToggleNumberRadioList(
            {name: `servicesAssocies`, type: coachCriteria.servicesAssocies.type},
            `Services associés`,
            {label: `do you include the service price in the overall price ?`, unit, step: 10},
            coachCriteria.servicesAssocies.options,
        ));
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
