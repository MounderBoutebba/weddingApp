import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { EsthetiqueCriteres, newEsthetiqueCriteres } from '../../company-details/esthetique/esthetique.interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { CompanyService } from '../../../../services/company.service';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class EsthetiquePricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(esthetiqueCriteres: EsthetiqueCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        const unit = '€';
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'conseilsPersonnalises', displayName: `personalize advice`, value: esthetiqueCriteres.conseilsPersonnalises, label: `indicate if you do propose private consulting for personalize advice`}, false,
        [
            {
                value: esthetiqueCriteres.conseilsPersonnalisesTarif,
                name: 'conseilsPersonnalisesTarif',
                step: 10,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'essais', displayName: `essays`, value: esthetiqueCriteres.essais, label: `indicate if you do propose essays`}, false,
        [
            {
                value: esthetiqueCriteres.essaisTarif,
                name: 'essaisTarif',
                step: 10,
                unit,
            },
        ]));
        newFormObject.push(this.formMapperService.initTogglePrestations(
            // tslint:disable-next-line:max-line-length
            {name: 'manucureEtpedicure', displayName: `manicure pedicure`, type: esthetiqueCriteres.manucureEtpedicure.type, label: `do you propose manicure and pedicure services`, capacite: esthetiqueCriteres.manucureEtpedicure.capacite,
            value: esthetiqueCriteres.manucureEtpedicure.value, secondaryLabel: `Capacité maximum d'interventions`}, 1, unit, 'Tarif',
            esthetiqueCriteres.manucureEtpedicure.prestations,
        ));
        newFormObject.push(this.formMapperService.initTogglePrestations(
            // tslint:disable-next-line:max-line-length
            {name: 'epilation', displayName: `hair removal`, type: esthetiqueCriteres.epilation.type, label: `do you propose hair removal services`, capacite: esthetiqueCriteres.epilation.capacite,
            value: esthetiqueCriteres.epilation.value, secondaryLabel: `Capacité maximum d'interventions`}, 1, unit, 'Tarif',
            esthetiqueCriteres.epilation.prestations,
        ));

        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.ESTHETIQUE),
                categories: [
                    CategoryLabelEnum.ESTHETIQUE
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.ESTHETIQUE;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newEsthetiqueCriteres, category),
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
