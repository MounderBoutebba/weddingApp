import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { LieuCriteres, newLieuCriteres } from './lieu.interface';
import { CategoryLabelEnum } from '../category-label.enum';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';

@Injectable({providedIn: 'root'})
export class LieuService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithLieuCriteria(lieuCriteres: LieuCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        newFormObject.push(this.formMapperService.initRadioStringField('typeDeLieu', `Type de lieu`,
        `indicate the type of your place`, lieuCriteres.typeDeLieu, true, [
            { key: 'auberge', label: 'auberge', value: 'auberge'},
            { key: 'domaine', label: 'domaine', value: 'domaine'},
            { key: 'chateau', label: 'chateau', value: 'chateau'},
            { key: 'salle_des_fetes', label: 'salle des fetes', value: 'salle_des_fetes'},
            { key: 'bateau', label: 'Bateau', value: 'bateau'},
            { key: 'hotel', label: 'Hôtel', value: 'hotel'},
            { key: 'peniche', label: 'Péniche', value: 'peniche'},
            { key: 'restaurant', label: 'Restaurant', value: 'restaurant'},
        ]));
        newFormObject.push(this.formMapperService.initToggleRadioField(
            // tslint:disable-next-line:max-line-length
            {name: 'serviceTraiteur', displayName: 'caterer service', value: lieuCriteres.serviceTraiteur, label: 'indicate if you provide a caterer service'},
            'lieuSansServiceTraiteur',
            `is it possible to rent the place without the caterer service ?`,
            lieuCriteres.lieuSansServiceTraiteur,
            false,
            [
                {key: 'yes', label: 'yes', value: 'true'},
                {key: 'no', label: 'no', value: 'false'},
            ],
        ));
        newFormObject.push(this.formMapperService.initToggleRadioField(
            // tslint:disable-next-line:max-line-length
            {name: 'serviceGateau', displayName: 'Service gâteau de mariage', value: lieuCriteres.serviceGateau, label: 'indicate if you provide a wedding cake service'},
            'lieuSansServiceGateau',
            `is it possible to rent the place without the wedding cake service ?`,
            lieuCriteres.lieuSansServiceGateau,
            false,
            [
                {key: 'yes', label: 'yes', value: 'true'},
                {key: 'no', label: 'no', value: 'false'},
            ],
        ));
        newFormObject.push(this.formMapperService.initToggleRadioField(
            // tslint:disable-next-line:max-line-length
            {name: 'servicePhotographeVideaste', displayName: 'photograph/videographer service', value: lieuCriteres.servicePhotographeVideaste, label: 'indicate if you provide a photograph/videographer service'},
            'lieuSansServicePhotographeVideaste',
            `is it possible to rent the place without the photograph/videographer service ?`,
            lieuCriteres.lieuSansServicePhotographeVideaste,
            false,
            [
                {key: 'yes', label: 'yes', value: 'true'},
                {key: 'no', label: 'no', value: 'false'},
            ],
        ));
        newFormObject.push(this.formMapperService.initToggleRadioField(
            // tslint:disable-next-line:max-line-length
            {name: 'serviceMusic', displayName: 'music service (dj, group, ect)', value: lieuCriteres.serviceMusic, label: 'indicate if you provide a music service (dj, group, ect)'},
            'lieuSansServiceMusic',
            `is it possible to rent the place without the music service (dj, group, ect) ?`,
            lieuCriteres.lieuSansServiceMusic,
            false,
            [
                {key: 'yes', label: 'yes', value: 'true'},
                {key: 'no', label: 'no', value: 'false'},
            ],
        ));
        newFormObject.push(this.formMapperService.initToggleRadioField(
            // tslint:disable-next-line:max-line-length
            {name: 'serviceDecoration', displayName: 'decoration service (flowers, deco, ect)', value: lieuCriteres.serviceDecoration, label: 'indicate if you provide a decoration service (flowers, deco, ect)'},
            'lieuSansServiceDecoration',
            `is it possible to rent the place without the decoration service (flowers, deco, ect) ?`,
            lieuCriteres.lieuSansServiceDecoration,
            false,
            [
                {key: 'yes', label: 'yes', value: 'true'},
                {key: 'no', label: 'no', value: 'false'},
            ],
        ));
        newFormObject.push(this.formMapperService.initRadioNumberField('capaciteInvites', `guests capacity`,
        `indicate the maximum capacity of your place`, lieuCriteres.capaciteInvites, true, [
            { key: '20', label: '', value: 20},
            { key: '50', label: '', value: 50},
            { key: '100', label: '', value: 100},
            { key: '250', label: '', value: 250},
            { key: '300', label: '', value: 300},
            { key: '400', label: '', value: 400},
            { key: '500', label: '', value: 500},
        ]));
        newFormObject.push(this.formMapperService.initCheckBoxField('typeReception', `Types de réceptions`,
        `Indiquez les réceptions possibles`, true, lieuCriteres.typeReception, [
            { key: 'vin_honneur', label: 'vin d\'honneur', value: false},
            { key: 'reception', label: 'réception', value: false},
            { key: 'cocktail', label: 'cocktail', value: false},
            { key: 'buffet', label: 'buffet', value: false},
            { key: 'diner', label: 'Dîner', value: false},
            { key: 'aperitif', label: 'Apéritif', value: false},
        ]));
        newFormObject.push(this.formMapperService.initRadioStringField('utilisationDuLieu', `place use`,
        `indicate if you give the possibility of space use`, lieuCriteres.utilisationDuLieu, false, [
            { key: 'interieur_et_exterieur', label: 'intérieur et extérieur', value: 'interieur_et_exterieur'},
            { key: 'interieur_seul', label: 'intérieur seul', value: 'interieur_seul'},
            { key: 'exterieur_seul', label: 'extérieur seul', value: 'exterieur_seul'},
        ]));
        newFormObject.push(this.formMapperService.initRadioStringField('configurationDeLaReception', `reception configuration`,
        `indicate the reception configuration's type`, lieuCriteres.configurationDeLaReception, false, [
            { key: 'assis_et_debout', label: 'assis et debout', value: 'assis_et_debout'},
            { key: 'assis_seul', label: 'assis', value: 'assis_seul'},
            { key: 'debout_seul', label: 'debout', value: 'debout_seul'},
        ]));
        newFormObject.push(this.formMapperService.initRadioStringField('situationGeographique', `geographical situation`,
        `indicate the geographical situation of your place`, lieuCriteres.situationGeographique, true, [
            { key: 'sur_la_plage', label: 'sur la plage', value: 'sur_la_plage'},
            { key: 'pres_de_la_mere', label: 'près de la mère', value: 'pres_de_la_mere'},
            { key: 'a_la_montagne', label: 'à la montagne', value: 'a_la_montagne'},
            { key: 'en_ville', label: 'en ville', value: 'en_ville'},
            { key: 'a_la_sortie_de_la_ville', label: 'À la sortie de la ville', value: 'a_la_sortie_de_la_ville'},
            { key: 'a_la_campagne', label: 'À la campagne', value: 'a_la_campagne'},
        ]));
        newFormObject.push(this.formMapperService.initRadioStringField('adaptabiliteMobiliteReduite', `adaptability to handicaps people`,
        `indicate if your place is adaptable to handicaps people`, String(lieuCriteres.adaptabiliteMobiliteReduite), false, [
            {key: 'yes', label: 'yes', value: 'true'},
            {key: 'no', label: 'no', value: 'false'},
        ]));
        return newFormObject;
    }
    public mapFormValueToLieuCriteria(formValue: any, lieuCriteres: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, lieuCriteres), CategoryLabelEnum.LIEU),
                categories: [
                    CategoryLabelEnum.LIEU
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.LIEU;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newLieuCriteres, category),
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
