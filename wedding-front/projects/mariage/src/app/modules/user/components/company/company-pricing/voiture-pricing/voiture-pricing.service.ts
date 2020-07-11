import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { VoitureCriteres, newVoitureCriteres } from '../../company-details/voiture/voiture.interface';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { CompanyService } from '../../../../services/company.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class VoiturePricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithVoiturePricingCriteria(voitureCriteres: VoitureCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        const unit = '€';

        // Voitures
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleVoitureList({name: `voitures`, type: voitureCriteres.voitures.type, displayName: `Voitures`},
                                                                        voitureCriteres.voitures.fields));
        // services
        newFormObject.push(this.formMapperService.initToggleNumberRadioList(
            {name: `services`, type: voitureCriteres.services.type},
            `Services`,
            {label: `do you include the service price in the overall price ?`, unit, step: 10},
            voitureCriteres.services.options,
        ));
        return newFormObject;
    }
    public mapFormValueToVoitureCriteria(formValue: any, voitureCriteres: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, voitureCriteres), CategoryLabelEnum.VOITURE),
                categories: [
                    CategoryLabelEnum.VOITURE
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.VOITURE;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newVoitureCriteres, category),
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
