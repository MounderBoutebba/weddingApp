import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CoiffureCriteres, newCoiffureCriteres } from '../../company-details/coiffure/coiffure.interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';

@Injectable({providedIn: 'root'})
export class CoiffurePricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(coiffureCriteres: CoiffureCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        const unit = '€';
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty1', displayName: `bridal hairstyle`, value: true, label: `indicate your basic pricing for the bridal hairstyle`}, false,
        [
            {
                value: coiffureCriteres.tarif_horaire,
                name: 'tarif_horaire',
                step: 10,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'conseilsPersonnalises', displayName: `personalize advice`, value: coiffureCriteres.conseilsPersonnalises, label: `indicate if you do propose private consulting for personalize advice`}, false,
        [
            {
                value: coiffureCriteres.conseilsPersonnalisesTarif,
                name: 'conseilsPersonnalisesTarif',
                step: 10,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'essais', displayName: `essays`, value: coiffureCriteres.essais, label: `indicate if you do propose essays`}, false,
        [
            {
                value: coiffureCriteres.essaisTarif,
                name: 'essaisTarif',
                step: 10,
                unit,
            },
        ]));
        newFormObject.push(this.formMapperService.initToggleMajCheveux(
            {name: 'majorationTypeCheveux', displayName: `Majoration type de cheveux`, label: `indicate if you apply a markup based on the hair's type`,
            value: coiffureCriteres.majorationTypeCheveux.value, type: coiffureCriteres.majorationTypeCheveux.type},
            coiffureCriteres.majorationTypeCheveux.options,
            {step: 1, unit: '%'}
        ));
        newFormObject.push(this.formMapperService.initToggleProduitsAccessoires(
            {name: 'produitsEtAccessoires', displayName: `Products and accessories`, label: `indicate if you do propose products and accessories`,
            value: coiffureCriteres.produitsEtAccessoires.value, type: coiffureCriteres.produitsEtAccessoires.type},
            coiffureCriteres.produitsEtAccessoires.options,
            {step: 1, unit}
        ));
        newFormObject.push(this.formMapperService.initTogglePrestations(
            // tslint:disable-next-line:max-line-length
            {name: 'prestationInvitesProches', displayName: `service for close friends`, type: coiffureCriteres.prestationInvitesProches.type, label: `do you propose haircuts and technics services for the guests ?`, capacite: coiffureCriteres.prestationInvitesProches.capacite,
            value: coiffureCriteres.prestationInvitesProches.value, secondaryLabel: `Capacité d'invités maximum`}, 1, unit, 'Tarif',
            coiffureCriteres.prestationInvitesProches.prestations,
        ));

        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.COIFFURE),
                categories: [
                    CategoryLabelEnum.COIFFURE
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.COIFFURE;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newCoiffureCriteres, category),
            categories: [category]
        };
        return this.companyService.putServiceByEmailAndService(category, providerEmail, data);
    }
    // tslint:disable-next-line:max-line-length
    public async addOption(fields: DynamicFormFieldInterface[], field: DynamicFormFieldInterface, list?: string): Promise<DynamicFormFieldInterface[]> {
        return this.formMapperService.addOption(fields, field, list);
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
