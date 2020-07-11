import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { AnimateurEnfantsCriteres, newEnfantsCriteres } from '../../company-details/animateur-enfants/animateur-enfants.interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';

@Injectable({providedIn: 'root'})
export class AnimateurEnfantsPricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(animateurEnfantCriteria: AnimateurEnfantsCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        const unit = '€';
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty1', displayName: `pricing`, value: true, label: `indicate your min hourly fee`}, false,
        [
            {
                value: animateurEnfantCriteria.tarif_horaire,
                name: 'tarif_horaire',
                step: 10,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty2', displayName: `reservation duration`, value: true, label: `indicate your min reservation duration`}, false,
        [
            {
                value: animateurEnfantCriteria.dureeDeReservation,
                name: 'dureeDeReservation',
                step: 1,
                unit: 'h',
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty3', displayName: `number of kids / speaker`, value: true, label: `indicate the maximum number of children per speaker`}, false,
        [
            {
                value: animateurEnfantCriteria.nombreEnfantsParIntervenant,
                name: 'nombreEnfantsParIntervenant',
                step: 1,
                unit: '',
            },
        ]));
        // Animations
        newFormObject.push(this.formMapperService.initToggleNumberList(
            {name: `animations`, type: animateurEnfantCriteria.animations.type},
            `Animations`,
            {label: ``, unit, step: 10},
            animateurEnfantCriteria.animations.options,
        ));
        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.ANIMATEUR_ENFANTS),
                categories: [
                    CategoryLabelEnum.ANIMATEUR_ENFANTS
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.ANIMATEUR_ENFANTS;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newEnfantsCriteres, category),
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
