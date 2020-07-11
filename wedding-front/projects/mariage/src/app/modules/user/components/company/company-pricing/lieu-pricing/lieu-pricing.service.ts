import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { LieuCriteres, newLieuCriteres } from '../../company-details/lieu/lieu.interface';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';
@Injectable({providedIn: 'root'})
export class LieuPricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithLieuCriteria(lieuCriteres: LieuCriteres): DynamicFormFieldInterface[] {
        const unit = '€';
        const newFormObject: DynamicFormFieldInterface[] = [];
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty1', displayName: `pricing`, value: true, label: `indicate your min pricing (not including weekends and high season)`}, false,
        [
            {
                value: lieuCriteres.tarifHoraireLocation,
                name: 'tarifHoraireLocation',
                step: 10,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberTimeField({name: 'empty2', displayName: `location timing`, label: `indicate the min hour to start the location`}, false,
        [
            {
                hourValue: lieuCriteres.debutLocation.heures,
                minValue: lieuCriteres.debutLocation.min,
                name: 'debutLocation',
                step: 15,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberTimeField({name: 'limiteHoraire', displayName: `time limit`, label: `is there a time limit to respect for the the event's end`}, false,
        [
            {
                hourValue: lieuCriteres.limiteHoraire.heures,
                minValue: lieuCriteres.limiteHoraire.min,
                value: lieuCriteres.limiteHoraire.value,
                name: 'limiteHoraire',
                step: 15,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'salleDeReception', displayName: `reception hall`, value: lieuCriteres.salleDeReception, label: `does your place has a reception hall ?`}, false,
        [
            {
                value: lieuCriteres.salleDeReceptionSurface,
                name: 'salleDeReceptionSurface',
                step: 1,
                unit: 'm²',
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'pisteDeDense', displayName: `dance floor`, value: lieuCriteres.pisteDeDense, label: `does your place has a dance floor ?`}, false,
        [
            {
                value: lieuCriteres.pisteDeDenseSurface,
                name: 'pisteDeDenseSurface',
                step: 1,
                unit: 'm²',
            },
        ]));
        //#region initToggleNumberRadioField
        newFormObject.push(this.formMapperService.initToggleNumberRadioField(
            false,
            // tslint:disable-next-line:max-line-length
            {name: 'chambrePourLesMariee', displayName: 'room for newlyweds', value: lieuCriteres.chambrePourLesMariee, label: `does your place dispose a room for newlyweds ?`,
                    numberOptions: [
                        {
                            value: lieuCriteres.chambrePourLesMarieeSurface,
                            label: 'chambrePourLesMarieeSurface',
                            step: 10,
                            unit: 'm²',
                        },
                    ]
            },
            // tslint:disable-next-line:max-line-length
            {name: 'chambrePourLesMarieeInclusDansPrix', label: `does the room for newlyweds price is include in the overall price ?`, value: lieuCriteres.chambrePourLesMarieeInclusDansPrix,
            options: [
                {key: 'yes', label: 'yes', value: 'true'},
                {key: 'no', label: 'as an option', value: 'false'},
            ],
            numberOptions: [
                {
                    value: lieuCriteres.chambrePourLesMarieeTarif,
                    label: 'chambrePourLesMarieeTarif',
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
            {name: 'cuisinePourLeTraiteur', displayName: 'cuisine for the caterers', value: lieuCriteres.cuisinePourLeTraiteur, label: `does your place dispose a cuisine for the caterers ?`,
                    numberOptions: [
                        {
                            value: lieuCriteres.cuisinePourLeTraiteurSurface,
                            label: 'cuisinePourLeTraiteurSurface',
                            step: 10,
                            unit: 'm²',
                        },
                    ]
            },
            // tslint:disable-next-line:max-line-length
            {name: 'cuisinePourLeTraiteurInclusDansPrix', label: `does the room for newlyweds price is include in the overall price ?`, value: lieuCriteres.cuisinePourLeTraiteurInclusDansPrix,
            options: [
                {key: 'yes', label: 'yes', value: 'true'},
                {key: 'no', label: 'as an option', value: 'false'},
            ],
            numberOptions: [
                {
                    value: lieuCriteres.cuisinePourLeTraiteurTarif,
                    label: 'cuisinePourLeTraiteurTarif',
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
            {name: 'terrasse', displayName: 'terrace', value: lieuCriteres.terrasse, label: `does your place dispose a terrace ?`,
                    numberOptions: [
                        {
                            value: lieuCriteres.terrasseSurface,
                            label: 'terrasseSurface',
                            step: 10,
                            unit: 'm²',
                        },
                    ]
            },
            // tslint:disable-next-line:max-line-length
            {name: 'terrasseInclusDansPrix', label: `does the terrace price is include in the overall price ?`, value: lieuCriteres.terrasseInclusDansPrix,
            options: [
                {key: 'yes', label: 'yes', value: 'true'},
                {key: 'no', label: 'as an option', value: 'false'},
            ],
            numberOptions: [
                {
                    value: lieuCriteres.terrasseTarif,
                    label: 'terrasseTarif',
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
            {name: 'jardin', displayName: 'garden', value: lieuCriteres.jardin, label: `does your place dispose a garden ?`,
                    numberOptions: [
                        {
                            value: lieuCriteres.jardinSurface,
                            label: 'jardinSurface',
                            step: 10,
                            unit: 'm²',
                        },
                    ]
            },
            // tslint:disable-next-line:max-line-length
            {name: 'jardinInclusDansPrix', label: `does the garden price is include in the overall price ?`, value: lieuCriteres.jardinInclusDansPrix,
            options: [
                {key: 'yes', label: 'yes', value: 'true'},
                {key: 'no', label: 'as an option', value: 'false'},
            ],
            numberOptions: [
                {
                    value: lieuCriteres.jardinTarif,
                    label: 'jardinTarif',
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
            {name: 'chapiteau', displayName: 'marquee', value: lieuCriteres.chapiteau, label: `does your place dispose a marquee ?`,
                    numberOptions: [
                        {
                            value: lieuCriteres.chapiteauSurface,
                            label: 'chapiteauSurface',
                            step: 10,
                            unit: 'm²',
                        },
                    ]
            },
            // tslint:disable-next-line:max-line-length
            {name: 'chapiteauInclusDansPrix', label: `does the marquee price is include in the overall price ?`, value: lieuCriteres.chapiteauInclusDansPrix,
            options: [
                {key: 'yes', label: 'yes', value: 'true'},
                {key: 'no', label: 'as an option', value: 'false'},
            ],
            numberOptions: [
                {
                    value: lieuCriteres.chapiteauTarif,
                    label: 'chapiteauTarif',
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
            {name: 'parking', displayName: 'parking lot', value: lieuCriteres.parking, label: `does your place dispose a parking lot ?`,
                    numberOptions: [
                        {
                            value: lieuCriteres.parkingSurface,
                            label: 'parkingSurface',
                            step: 10,
                            unit: 'm²',
                        },
                    ]
            },
            // tslint:disable-next-line:max-line-length
            {name: 'parkingInclusDansPrix', label: `does the parking lot price is include in the overall price ?`, value: lieuCriteres.parkingInclusDansPrix,
            options: [
                {key: 'yes', label: 'yes', value: 'true'},
                {key: 'no', label: 'as an option', value: 'false'},
            ],
            numberOptions: [
                {
                    value: lieuCriteres.parkingTarif,
                    label: 'parkingTarif',
                    step: 1,
                    unit,
                },
            ]
        }
        ));
        //#endregion
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'hebergementInvites', displayName: `guests' accommodation`, value: lieuCriteres.hebergementInvites, label: `do you propose accommodation for guests ?`}, false,
        [
            {
                value: lieuCriteres.hebergementInvitesCapacite,
                name: 'hebergementInvitesCapacite',
                step: 5,
                unit: 'pers.',
            },
            {
                value: lieuCriteres.hebergementInvitesTarif,
                name: 'hebergementInvitesTarif',
                step: 10,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'decoration', displayName: `decoration`, value: lieuCriteres.decoration, label: `do you propose a decoration service for the reception hall ?`}, false,
        [
            {
                name: 'decorationTarif',
                value: lieuCriteres.decorationTarif,
                step: 1,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'laviselleEtCouvert', displayName: `laviselle and covered`, value: lieuCriteres.laviselleEtCouvert, label: `do you propose the laviselle and covered renting service ?`}, false,
        [
            {
                value: lieuCriteres.laviselleEtCouvertTarif,
                name: 'laviselleEtCouvertTarif',
                step: 1,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'drapeDeTable', displayName: `table covers`, value: lieuCriteres.drapeDeTable, label: `do you propose the table covers renting service ?`}, false,
        [
            {
                value: lieuCriteres.drapeDeTableTarif,
                name: 'drapeDeTableTarif',
                step: 1,
                unit,
            },
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
