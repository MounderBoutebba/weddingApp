import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { SoinCriteres, newSoinCriteres } from '../../company-details/soin/soin.interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';
@Injectable({providedIn: 'root'})
export class SoinPricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(soinCriteres: SoinCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        const unit = '€';
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'conseilsPersonnalises', displayName: `personalize advice`, value: soinCriteres.conseilsPersonnalises, label: `indicate if you do propose private consulting for personalize advice`}, false,
        [
            {
                value: soinCriteres.conseilsPersonnalisesTarif,
                name: 'conseilsPersonnalisesTarif',
                step: 10,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'essais', displayName: `essays`, value: soinCriteres.essais, label: `indicate if you do propose essays`}, false,
        [
            {
                value: soinCriteres.essaisTarif,
                name: 'essaisTarif',
                step: 10,
                unit,
            },
        ]));
        newFormObject.push(this.formMapperService.initTogglePrestations(
            // tslint:disable-next-line:max-line-length
            {name: 'soins', displayName: `care`, type: soinCriteres.soins.type, label: `do you propose care services`, capacite: soinCriteres.soins.capacite,
            value: soinCriteres.soins.value, secondaryLabel: `Capacité maximum d'interventions`}, 1, unit, 'Tarif',
            soinCriteres.soins.prestations,
        ));
        newFormObject.push(this.formMapperService.initTogglePrestations(
            // tslint:disable-next-line:max-line-length
            {name: 'massage', displayName: `Massage`, type: soinCriteres.massage.type, label: `do you propose massage services`, capacite: soinCriteres.massage.capacite,
            value: soinCriteres.massage.value, secondaryLabel: `Capacité maximum d'interventions`}, 1, unit, 'Tarif par 10 mn',
            soinCriteres.massage.prestations,
        ));

        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.SOIN),
                categories: [
                    CategoryLabelEnum.SOIN
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.SOIN;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newSoinCriteres, category),
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
