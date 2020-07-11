import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { PhotographeCriteres, newPhotographeCriteres } from '../../company-details/photographe/photographe.interface';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';

@Injectable({
    providedIn: 'root',
})
export class PhotographePricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithPhotographePricingCriteria(photographeCriteria: PhotographeCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        const unit = '€';
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty1', displayName: `Tarification photo`, value: true, label: `Indiquez votre tarif horaire pour la photographie`}, false,
        [
            {
                value: photographeCriteria.tarif_horaire,
                name: 'tarif_horaire',
                step: 10,
                unit,
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'empty2', displayName: `reservation's duration`, value: true, label: `indicate your min reservation duration`}, false,
        [
            {
                value: photographeCriteria.dureeDeReservationMinimum,
                name: 'dureeDeReservationMinimum',
                step: 10,
                unit: 'h',
            },
        ]));
        newFormObject.push(this.formMapperService.initToggleNumberField(
            {name: 'duoPhoto',
            value: photographeCriteria.duoPhoto,
            displayName: `Prestation photo duo`,
            label: `indicate if you propose to cover the event with a second photographer`
        }, false,
        [{
            value: photographeCriteria.duoPhotoTarif,
            name: 'duoPhotoTarif',
            step: 10,
            unit
        }]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initRadioNumberField('delaisDeLivraisonJours', `delivery time days`,
        `indicate your delivery time for photos`, photographeCriteria.delaisDeLivraisonJours, true, [
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
            {name: 'livraisonExpress', displayName: `express delivery`, value: photographeCriteria.livraisonExpress, label: `indicate if you offer express delivery of photos over 7 to 15 days`}, false,
        [{
            value: photographeCriteria.livraisonExpressTarif,
            name: 'livraisonExpressTarif',
            step: 10,
            unit
        }]));

        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'seanceEngagement', displayName: `engagement session`, value: photographeCriteria.seanceEngagement, label: `indicate if you propose the engagement session`}, false,
        [
            {
                value: photographeCriteria.seanceEngagementDureeMinimum,
                name: 'seanceEngagementDureeMinimum',
                step: 1,
                unit: 'h'
            },
            {
                value: photographeCriteria.seanceEngagementDureeMinimumTarifHoraire,
                name: 'seanceEngagementDureeMinimumTarifHoraire',
                step: 100,
                unit
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'seanceBrunchOuDejeuner', displayName: `brunch or lunch session`, value: photographeCriteria.seanceBrunchOuDejeuner, label: `indicate whether you are offering brunch or lunch the day after the wedding`}, false,
        [
            {
                value: photographeCriteria.seanceBrunchOuDejeunerDureeMinimum,
                name: 'seanceBrunchOuDejeunerDureeMinimum',
                step: 1,
                unit: 'h'
            },
            {
                value: photographeCriteria.seanceBrunchOuDejeunerDureeMinimumTarifHoraire,
                name: 'seanceBrunchOuDejeunerDureeMinimumTarifHoraire',
                step: 100,
                unit
            },
        ]));

        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'seanceApresMariage', displayName: `sitting after marriage`, value: photographeCriteria.seanceApresMariage, label: `indicate if you are proposing the session after the wedding`}, false,
        [
            {
                value: photographeCriteria.seanceApresMariageDureeMinimum,
                name: 'seanceApresMariageDureeMinimum',
                step: 1,
                unit: 'h'
            },
            {
                value: photographeCriteria.seanceApresMariageDureeMinimumTarifHoraire,
                name: 'seanceApresMariageDureeMinimumTarifHoraire',
                step: 100,
                unit
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'photomaton', displayName: `photobooth`, value: photographeCriteria.photomaton, label: `indicate if you offer the photo booth service`}, false,
        [
            {
                value: photographeCriteria.photomatonTarifUnique,
                name: 'photomatonTarifUnique',
                step: 100,
                unit
            },
        ]));
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'photocall', displayName: `PhotoCall`, value: photographeCriteria.photocall, label: `indicate if you offer the photocall service`}, false,
        [
            {
                value: photographeCriteria.photocallTraifUnique,
                name: 'photocallTraifUnique',
                step: 100,
                unit
            },
        ]));
        newFormObject.push(this.formMapperService.initCheckBoxNumberList(
            // tslint:disable-next-line:max-line-length
            {value: photographeCriteria.creationAlbum.value, name: 'creationAlbum', type: photographeCriteria.creationAlbum.type, displayName: `album creation`, label: `indicate if you offer album creation`},
            // tslint:disable-next-line:max-line-length
            {name: `proposed finishes`, label: `indicate the finishes you propose`, value: photographeCriteria.creationAlbum.finitions, default: ['Mate', 'Brillante']},
            photographeCriteria.creationAlbum.formats,
            {label: `fees per unity`, unit, step: 10},
            `Indiquez si vous porposez ce format`
        ));
        newFormObject.push(this.formMapperService.initCheckBoxNumberList(
            // tslint:disable-next-line:max-line-length
            {value: photographeCriteria.tiragePapier.value, name: 'tiragePapier', type: photographeCriteria.tiragePapier.type, displayName: `Tirage De Papiers`, label: `Indiquez si vous proposez un tirage de papier`},
            // tslint:disable-next-line:max-line-length
            {name: `proposed finishes`, label: `indicate the finishes you propose`, value: photographeCriteria.tiragePapier.finitions, default: ['Mate', 'Brillante']},
            photographeCriteria.tiragePapier.formats,
            {label: `fees per unity`, unit, step: 0.05},
            `Indiquez si vous porposez ce format`
        ));
        newFormObject.push(this.formMapperService.initToggleCheckBoxNumberField(
            {name: 'retouchesPhoto',
            displayName: 'photo retouching',
            value: photographeCriteria.retouchesPhoto, label: `indicate if you offer the photo retouching service`},
            false, 1, unit,
            {
            name: 'retouchesPhotoFormats',
            displayName: 'Retouches Photo Formats',
            label: 'Indicate the types of photo editing you offer',
            options: photographeCriteria.retouchesPhotoFormats
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
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'galeriePrive', displayName: `private gallery`, value: photographeCriteria.galeriePrive, label: `indicate if you offer the secure private gallery online`}, false,
        [
            {
                value: photographeCriteria.galeriePriveTarif,
                name: 'galeriePriveTarif',
                step: 100,
                unit
            },
        ]));
        newFormObject.push(this.formMapperService.initToggleCheckBoxNumberField(
            {name: 'remise',
            displayName: 'Remises des données sous DVD ou clé USB',
            value: photographeCriteria.remise, label: `Indiquez si vous proposez la remise des photos sous DVD et/ou clé USB`},
            false, 1, unit,
            {
            name: 'remiseFormats',
            displayName: '',
            label: '',
            options: photographeCriteria.remiseFormats
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
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'livraisonHauteResolution', displayName: `Livraison des originaux en trés haute résolution(Format RAW)`, value: photographeCriteria.livraisonHauteResolution, label: `Indiquez si vous proposez la livraison des originaux`}, false,
        [
            {
                value: photographeCriteria.livraisonHauteResolutionTarif,
                name: 'livraisonHauteResolutionTarif',
                step: 100,
                unit
            },
        ]));
        return newFormObject;
    }
    public mapFormValueToPhotographeCriteria(formValue: any, PhotographeCritere: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, PhotographeCritere), CategoryLabelEnum.PHOTOGRAPHE),
                categories: [
                    CategoryLabelEnum.PHOTOGRAPHE
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.PHOTOGRAPHE;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newPhotographeCriteres, category),
            categories: [category]
        };
        return this.companyService.putServiceByEmailAndService(category, providerEmail, data);
    }
    // tslint:disable-next-line:max-line-length
    public async addOption(fields: DynamicFormFieldInterface[], field: DynamicFormFieldInterface, formatName?: string): Promise<DynamicFormFieldInterface[]> {
        return this.formMapperService.addOption(fields, field, formatName);
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
