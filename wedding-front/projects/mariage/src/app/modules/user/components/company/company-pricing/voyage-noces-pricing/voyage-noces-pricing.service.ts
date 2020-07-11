import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { VoyageNocesCriteres, newVoyageNocesCriteres } from '../../company-details/voyage-noces/voyage-noces.interface';
import { CompanyService } from '../../../../services/company.service';
import { Observable } from 'rxjs';
@Injectable({providedIn: 'root'})
export class VoyageNocesPricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(voyageNocesCriteres: VoyageNocesCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        const unit = '€';
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty1', displayName: `number of rooms`, value: true, label: `Indiquez la quantité de chambres disponible à la location dans votre établissement`}, false,
        [
            {
                value: voyageNocesCriteres.nombreDeChambre,
                name: 'nombreDeChambre',
                step: 1,
                unit: '',
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initRadioNumber({name: 'typeDeTarification', displayName: `pricing type`, label: `Indiquez si vous appliquez un tarif fix pour la chambre ou variable selon le nombre de personne`}, voyageNocesCriteres.typeDeTarification.type,
        [
            {
                key: 'variable',
                label: 'Variable',
                value: false,
            },
            {
                key: 'fixe',
                label: 'Fixe',
                value: false,
            },
        ], voyageNocesCriteres.typeDeTarification.tarifs));
        // services
        newFormObject.push(this.formMapperService.initToggleNumberRadioList(
            {name: `services`, type: voyageNocesCriteres.services.type},
            `Services`,
            {label: `do you include the service price in the overall price ?`, unit, step: 10},
            voyageNocesCriteres.services.options,
        ));

        // activités
        newFormObject.push(this.formMapperService.initToggleNumberRadioList(
            {name: `activites`, type: voyageNocesCriteres.activites.type},
            `Activités`,
            {label: `do you include the activity price in the overall price ?`, unit, step: 10},
            voyageNocesCriteres.activites.options,
        ));
        return newFormObject;
    }
    public mapFormValueToCriteria(formValue: any, criteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, criteria), CategoryLabelEnum.VOYAGE_DE_NOCES),
                categories: [
                    CategoryLabelEnum.VOYAGE_DE_NOCES
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.VOYAGE_DE_NOCES;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newVoyageNocesCriteres, category),
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
