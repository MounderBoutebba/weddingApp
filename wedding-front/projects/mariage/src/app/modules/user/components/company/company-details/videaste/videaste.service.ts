import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { VideasteCriteresInterface, newVideasteCriteres } from './videaste.interface';
import { CategoryLabelEnum } from '../category-label.enum';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class VideasteService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithVideasteCriteria(videasteCriteria: VideasteCriteresInterface): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        newFormObject.push(this.formMapperService.initCheckBoxField('styleDeVideo', 'videography style',
        'indicate which photography styles you do propose', true, videasteCriteria.styleDeVideo, [
            { key: 'traditionnel', label: 'traditional', value: false},
            { key: 'artistique', label: 'artistic', value: false},
            { key: 'videojournalisme', label: 'videojournalisme', value: false},
            { key: 'cinematographique', label: 'cinematographic', value: false}
        ]));
        newFormObject.push(this.formMapperService.initCheckBoxField('appareilsVideo', `appliances`,
        'indicate which photo and / or video boxes you have', true, videasteCriteria.appareilsVideo, [
            { key: 'canon1dxmark||', label: 'Canon 1DX Mark II', value: false},
            { key: 'canone0s5dmark||', label: 'Canon E0S 5D Mark II', value: false},
            { key: 'sonyalphaa7smark||', label: 'Sony Alpha A7S Mark II', value: false},
            { key: 'panasonics1r', label: 'Panasonic S1R', value: false},
            { key: 'canon_eOS_6d_dmark||', label: 'Canon EOS 6D Mark II', value: false},
            { key: 'nikon_d3', label: 'Nikon D3', value: false},
            { key: 'drone_dji_mavic_pro', label: 'Drone Dji Mavic Pro', value: false},
        ]));
        newFormObject.push(this.formMapperService.initCheckBoxField('objectifsVideo', `objectives`,
        `indicate the photo and video objectives you have`, true, videasteCriteria.objectifsVideo, [
            { key: 'canon_ef_70_300mm', label: 'Objectif Canon EF 70-300mm', value: false},
            { key: 'canon_rf_50mm', label: 'Objectif Canon RF 50mm', value: false},
            { key: 'canon_ef_24', label: 'Objectif Canon EF 24 -70 mm', value: false},
            { key: 'ef_24_105', label: 'Objectif EF 24-105 mm', value: false},
            { key: 'sony_fe_24', label: 'Objectif hybride Sony FE 24–105 mm', value: false},
            { key: 'hybride_leica_vario_elmar_t_18', label: 'Objectif hybride Leica Vario-Elmar-T 18-56 mm', value: false},
            { key: 'panasonic_lumix_dg_12', label: 'Panasonic Lumix Leica DG 12-60mm', value: false},
            { key: 'lumix_s_pro_70', label: 'Lumix S Pro 70-200 mm', value: false},
            { key: 'lumix_s_pro_24', label: 'Lumix S Pro 24-105 mm', value: false},
            { key: 'nikon_af_p_dx_nikkor_70', label: 'Nikon AF-P DX Nikkor 70-300 mm', value: false},
            { key: 'nikon_af_s_fx_vr_ed_28', label: 'Nikon AF-S FX VR ED 28 - 300 mm', value: false},
        ]));
        newFormObject.push(this.formMapperService.initCheckBoxField('accessoiresVideo', `accessories`,
        `indicate the photo and video accessories you have`, true, videasteCriteria.accessoiresVideo, [
            { key: 'trepieds', label: 'tripods', value: false},
            { key: 'torche', label: 'torch', value: false},
            { key: 'flash', label: 'flash', value: false},
            { key: 'filtres_nd', label: 'ND filters', value: false},
            { key: 'stabilisateur_3_axes', label: 'Stabilisateur 3 axes', value: false},
            { key: 'micro', label: 'Micro', value: false},
            { key: 'panneaux_lumière', label: 'Panneaux lumière', value: false},
            { key: 'travelling', label: 'Travelling', value: false},
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
