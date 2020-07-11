import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { MaquillageCriteres, newMaquillageCriteres } from '../../company-details/maquillage/maquillage.interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';

@Injectable({providedIn: 'root'})
export class MaquillagePricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(maquillageCriteres: MaquillageCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        const unit = '€';
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty1', displayName: `bridal makeup`, value: true, label: `indicate your basic pricing for the bridal makeup`}, false,
        [
            {
                value: maquillageCriteres.tarif_horaire,
                name: 'tarif_horaire',
                step: 10,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'conseilsPersonnalises', displayName: `personalize advice`, value: maquillageCriteres.conseilsPersonnalises, label: `indicate if you do propose private consulting for personalize advice`}, false,
        [
            {
                value: maquillageCriteres.conseilsPersonnalisesTarif,
                name: 'conseilsPersonnalisesTarif',
                step: 10,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'essais', displayName: `essays`, value: maquillageCriteres.essais, label: `indicate if you do propose essays`}, false,
        [
            {
                value: maquillageCriteres.essaisTarif,
                name: 'essaisTarif',
                step: 10,
                unit,
            },
        ]));
        newFormObject.push(this.formMapperService.initToggleMajCheveux(
            {name: 'majorationTypeDePeau', displayName: `Majoration type de peau`, label: `indicate if you apply a markup based on the skin's type`,
            value: maquillageCriteres.majorationTypeDePeau.value, type: maquillageCriteres.majorationTypeDePeau.type},
            maquillageCriteres.majorationTypeDePeau.options,
            {step: 1, unit: '%'}
        ));
        newFormObject.push(this.formMapperService.initToggleProduitsAccessoires(
            {name: 'produits', displayName: `Products and accessories`, label: `indicate if you do propose products and accessories`,
            value: maquillageCriteres.produits.value, type: maquillageCriteres.produits.type},
            maquillageCriteres.produits.options,
            {step: 1, unit}
        ));
        newFormObject.push(this.formMapperService.initTogglePrestations(
            // tslint:disable-next-line:max-line-length
            {name: 'prestationInvitesProches', displayName: `service for close friends`, type: maquillageCriteres.prestationInvitesProches.type, label: `do you propose makeup services for the guests ?`, capacite: maquillageCriteres.prestationInvitesProches.capacite,
            value: maquillageCriteres.prestationInvitesProches.value, secondaryLabel: `Capacité d'invités maximum`}, 1, unit, 'Tarif',
            maquillageCriteres.prestationInvitesProches.prestations,
        ));

        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.MAQUILLAGE),
                categories: [
                    CategoryLabelEnum.MAQUILLAGE
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.MAQUILLAGE;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newMaquillageCriteres, category),
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
