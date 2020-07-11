import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { VideasteCriteresInterface, newVideasteCriteres } from '../../company-details/videaste/videaste.interface';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';

@Injectable({
    providedIn: 'root'
})
export class VideastePricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) {}
    public initFormValuesWithVideastePricingCriteria(videasteCriteria: VideasteCriteresInterface): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        const unit = '€';
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty1', displayName: `videography pricing`, value: true, label: `indicate your hourly rate regarding videography`}, false,
        [
            {
                value: videasteCriteria.tarif_horaire,
                name: 'tarif_horaire',
                step: 10,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty2', displayName: `reservation's duration`, value: true, label: `indicate your min reservation duration`}, false,
        [
            {
                value: videasteCriteria.dureeDeReservationMinimum,
                name: 'dureeDeReservationMinimum',
                step: 10,
                unit: 'h',
            },
        ]));
        newFormObject.push(this.formMapperService.initToggleNumberField(
            {name: 'duoVideo',
            value: videasteCriteria.duoVideo,
            displayName: `Duo Videographer`,
            label: `indicate if you propose to cover the event with a second videographer`
        }, false,
        [{
            value: videasteCriteria.duoVideoTarif,
            name: 'duoVideoTarif',
            step: 10,
            unit
        }]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initRadioNumberField('delaisDeLivraisonJours', `delivery time days`,
        `indicate your delivery time for videos`, videasteCriteria.delaisDeLivraisonJours, true, [
            { key: '20', label: 'days', value: 20},
            { key: '30', label: 'days', value: 30},
            { key: '60', label: 'days', value: 60},
            { key: '90', label: 'days', value: 90},
            { key: '120', label: 'days', value: 120},
            { key: '180', label: 'days', value: 180},
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField(
            // tslint:disable-next-line:max-line-length
            {name: 'livraisonExpress', displayName: `express delivery`, value: videasteCriteria.livraisonExpress, label: `indicate if you offer express delivery of photos over 7 to 15 days`}, false,
        [{
            value: videasteCriteria.livraisonExpressTarif,
            name: 'livraisonExpressTarif',
            step: 10,
            unit
        }]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'bandeAnnonce', displayName: `trailer`, value: videasteCriteria.bandeAnnonce, label: `indicate whether you are proposing a movie trailer 1 to 2 minutes`}, false,
        [
            {
                value: videasteCriteria.bandeAnnonceTarif,
                name: 'bandeAnnonceTarif',
                step: 100,
                unit
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'filmCourt', displayName: `short film`, value: videasteCriteria.filmCourt, label: `Indicate if you propose the realization of a short film of 10 to 15 minutes`}, false,
        [
            {
                value: videasteCriteria.filmCourtTarif,
                name: 'filmCourtTarif',
                step: 100,
                unit
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'filmLong', displayName: `Long film`, value: videasteCriteria.filmLong, label: `indicate if you propose the realization of a long film of 50 to 60 minutes`}, false,
        [
            {
                value: videasteCriteria.filmLongTarif,
                name: 'filmLongTarif',
                step: 100,
                unit
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'courtMetrage', displayName: `short clip`, value: videasteCriteria.courtMetrage, label: `indicate if you propose the making of a short fiction film in which the bride and groom plays a role`}, false,
        [
            {
                value: videasteCriteria.courtMetrageTarif,
                name: 'courtMetrageTarif',
                step: 100,
                unit
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'videoAerienne', displayName: `aerial video`, value: videasteCriteria.videoAerienne, label: `indicate if you propose the shooting of video in drone`}, false,
        [
            {
                value: videasteCriteria.videoAerienneTarif,
                name: 'videoAerienneTarif',
                step: 100,
                unit
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'etalonnageVideo', displayName: `video calibration`, value: videasteCriteria.etalonnageVideo, label: `indicate if you offer video calibration`}, false,
        [
            {
                value: videasteCriteria.etalonnageVideoTarif,
                name: 'etalonnageVideoTarif',
                step: 100,
                unit
            },
        ]));

        newFormObject.push(this.formMapperService.initToggleCheckBoxNumberField(
            {name: 'remise',
            displayName: 'Remises des données sous DVD ou clé USB',
            value: videasteCriteria.remise, label: `Indiquez si vous proposez la remise des videos sous DVD et/ou clé USB`},
            false, 1, unit,
            {
            name: 'remiseFormats',
            displayName: '',
            label: '',
            options: videasteCriteria.remiseFormats
            },
            [], {
                options: [],
                name: '',
                displayName: ``,
                label: ``,
            },
            {
                name: '',
                displayName: '',
                label: '',
                options: []
            },
            {
                name: '',
                displayName: '',
                label: '',
                options: []
            },
            {
                name: '',
                displayName: '',
                label: '',
                options: []
            }
        ));

        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'livraisonOriginauxHauteResolution', displayName: `Livraison des originaux en trés haute résolution?`, value: videasteCriteria.livraisonOriginauxHauteResolution, label: `Indiquez si vous proposez la livraison des originaux brut en trés haute résolution`}, false,
        [
            {
                value: videasteCriteria.livraisonOriginauxHauteResolutionTarif,
                name: 'livraisonOriginauxHauteResolutionTarif',
                step: 100,
                unit
            },
        ]));
        return newFormObject;
    }
    public mapFormValueToVideasteCriteria(formValue: any, videasteCriteria: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, videasteCriteria), CategoryLabelEnum.VIDEALISTE),
                categories: [
                    CategoryLabelEnum.VIDEALISTE
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.VIDEALISTE;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newVideasteCriteres, category),
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
