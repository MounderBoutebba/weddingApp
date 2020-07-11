import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../category-label.enum';
import { VoyageNocesCriteres, newVoyageNocesCriteres } from './voyage-noces.interface';
import { CompanyService } from '../../../../services/company.service';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class VoyageNocesService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithCriteria(voyageNocesCriteres: VoyageNocesCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        newFormObject.push(this.formMapperService.initRadioStringField('zoneGeo', `geographical area`,
        `Situez la zone géographique de votre établissement pour les clients français`, voyageNocesCriteres.zoneGeo, false, [
            { key: 'france_metropolitaine', label: 'Metropolitan France', value: 'france_metropolitaine'},
            { key: 'europe', label: 'Europe', value: 'europe'},
            { key: 'bassin_mediterraneen', label: 'Mediterranean Basin', value: 'bassin_mediterraneen'},
            { key: 'destination_lointaine', label: 'distant destination', value: 'destination_lointaine'},
        ]));
        newFormObject.push(this.formMapperService.initRadioStringField('situationGeo', `geographical location`,
        `indicate the location of your establishment according to its location`, voyageNocesCriteres.situationGeo, true, [
            { key: 'pres_de_la_mere', label: 'by the sea', value: 'pres_de_la_mere'},
            { key: 'a_la_montagne', label: 'in the mountain', value: 'a_la_montagne'},
            { key: 'en_ville', label: 'in the city', value: 'en_ville'},
            { key: 'a_la_sortie_de_la_ville', label: 'outside the city', value: 'a_la_sortie_de_la_ville'},
            { key: 'a_la_campagne', label: 'in the countryside', value: 'a_la_campagne'},
        ]));
        newFormObject.push(this.formMapperService.initRadioNumberField('classificationHoteliere', `Hotel classification`,
        `indicate the number of stars your establishment records`, voyageNocesCriteres.classificationHoteliere, false, [
            { key: '5', label: 'stars', value: 5},
            { key: '4', label: 'stars', value: 4},
            { key: '3', label: 'stars', value: 3},
            { key: '2', label: 'stars', value: 2},
            { key: '1', label: 'star', value: 1},

        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initSimpleToggleField('enfants', `Enfants`, 'do you accept children in your place ?', voyageNocesCriteres.enfants, false));

        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initSimpleToggleField('animaux', `Animaux`, 'Les animaux domestiques sont-ils autorisés dans votre établissement ?', voyageNocesCriteres.animaux, false));

        // Équipements
        newFormObject.push(this.formMapperService.initToggleList(
            {name: `equipements`, type: voyageNocesCriteres.equipements.type},
            `Équipements`,
            voyageNocesCriteres.equipements.options,
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
