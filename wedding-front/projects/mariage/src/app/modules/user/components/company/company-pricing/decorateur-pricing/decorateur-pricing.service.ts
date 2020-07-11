import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { DecorateurCriteres, newDecorateurCriteres } from '../../company-details/decorateur/decorateur.interface';
import { CompanyService } from '../../../../services/company.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DecorateurPricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithDecorateurCriteria(decorateurCritere: DecorateurCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        const unit = '€';
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty1', displayName: `pricing`, value: true, label: `indicate your min fee for decorating the reception hall`}, false,
        [
            {
                value: decorateurCritere.tarif_horaire,
                name: 'tarif_horaire',
                step: 10,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'conseilPersonalises', displayName: `personalize advice`, value: decorateurCritere.conseilPersonalises, label: `indicate if you do propose private consulting for personalize advice`}, false,
        [
            {
                value: decorateurCritere.conseilPersonalisesTarif,
                name: 'conseilPersonalisesTarif',
                step: 10,
                unit,
            },
        ]));
        newFormObject.push(this.formMapperService.initToggleNumberRadioList(
            {name: `decorationAssociees`, type: decorateurCritere.decorationAssociees.type},
            `Décoration associées`,
            {label: `do you include the service price in the overall price ?`, unit, step: 10},
            decorateurCritere.decorationAssociees.options,
        ));
        //#region
        newFormObject.push(this.formMapperService.initToggleNumberRadioField(
            false,
            // tslint:disable-next-line:max-line-length
            {name: 'livraisonDuMateriel', displayName: 'equipments delivery', value: decorateurCritere.livraisonDuMateriel, label: `do you propose this service ?`,
                    numberOptions: []
            },
            // tslint:disable-next-line:max-line-length
            {name: 'livraisonDuMaterielInclusDansPrix', label: `do you include the service price in the overall price ?`, value: decorateurCritere.livraisonDuMaterielInclusDansPrix,
            options: [
                {key: 'yes', label: 'yes', value: 'true'},
                {key: 'no', label: 'as an option', value: 'false'},
            ],
            numberOptions: [
                {
                    value: decorateurCritere.livraisonDuMaterielTarif,
                    label: 'livraisonDuMaterielTarif',
                    step: 1,
                    unit,
                },
            ]
        }
        ));
        //#endregion
        //#region initToggleNumberRadioField
        newFormObject.push(this.formMapperService.initToggleNumberRadioField(
            false,
            // tslint:disable-next-line:max-line-length
            {name: 'montageDemontage', displayName: 'disassembly assembly', value: decorateurCritere.montageDemontage, label: `do you propose this service ?`,
                    numberOptions: []
            },
            // tslint:disable-next-line:max-line-length
            {name: 'montageDemontageInclusDansPrix', label: `do you include the service price in the overall price ?`, value: decorateurCritere.montageDemontageInclusDansPrix,
            options: [
                {key: 'yes', label: 'yes', value: 'true'},
                {key: 'no', label: 'as an option', value: 'false'},
            ],
            numberOptions: [
                {
                    value: decorateurCritere.montageDemontageTarif,
                    label: 'montageDemontageTarif',
                    step: 1,
                    unit,
                },
            ]
        }
        ));
        //#endregion
        return newFormObject;

    }
    public mapFormValueToDecorateurCriteria(formValue: any, decorateurCritere: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, decorateurCritere), CategoryLabelEnum.DECORATUER),
                categories: [
                    CategoryLabelEnum.DECORATUER
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.DECORATUER;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newDecorateurCriteres, category),
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
