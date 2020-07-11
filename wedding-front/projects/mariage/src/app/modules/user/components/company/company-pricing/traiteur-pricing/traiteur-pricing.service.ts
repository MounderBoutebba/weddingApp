import { Injectable } from '@angular/core';
import { FormMapperService } from '../../../../services/form-mapper.service';
import { DynamicFormFieldInterface } from '../../../../../shared/components/dynamic-form-builder/models/dynamic-form-field-interface';
import { TraiteurCriteres, newTraiteurCriteres } from '../../company-details/traiteur/traiteur.interface';
import { CategoryLabelEnum } from '../../company-details/category-label.enum';
import { Observable } from 'rxjs';
import { CompanyService } from '../../../../services/company.service';
@Injectable({providedIn: 'root'})
export class TraiteurPricingService {

    constructor(private readonly formMapperService: FormMapperService,
                private readonly companyService: CompanyService) { }
    public initFormValuesWithTraiteurCriteria(traiteurCriteres: TraiteurCriteres): DynamicFormFieldInterface[] {
        const newFormObject: DynamicFormFieldInterface[] = [];
        const unit = '€';
        newFormObject.push(this.formMapperService.initToggleVinHonneur(
            // tslint:disable-next-line:max-line-length
            {name: 'vinHonneurCocktailBuffet', displayName: `wine of honor / cocktail / buffet`, type: traiteurCriteres.vinHonneurCocktailBuffet.type,
            // tslint:disable-next-line:max-line-length
            label: `indicate if your propose wine of honor / cocktail / buffet`, quantity: traiteurCriteres.vinHonneurCocktailBuffet.quantity,
            value: traiteurCriteres.vinHonneurCocktailBuffet.value, secondaryDisplayName: `Quantité de commande total minimum`,
            secondaryLabel: `Indiquez la quantité totale miminum (tout petits fours confondus) pour réaliser la prestation vin d'honneur`},
            1,unit, traiteurCriteres.vinHonneurCocktailBuffet.products
        ));
        newFormObject.push(this.formMapperService.initToggleDinner(
            // tslint:disable-next-line:max-line-length
            {name: 'Dinner', displayName: `Dinner`, type: traiteurCriteres.Dinner.type,
            // tslint:disable-next-line:max-line-length
            label: `do you propose complete meals preparation starters, plats, desserts, cheese ?`, dinerCapacite: traiteurCriteres.Dinner.dinerCapacite, convivesMin: traiteurCriteres.Dinner.convivesMin,
            value: traiteurCriteres.Dinner.value, secondaryDisplayName: `Convives et capacité`,
            // tslint:disable-next-line:max-line-length
            secondaryLabel: `Indiquez le nombre minimum d'invités pour réaliser la prestation dîner et votre capacité de service maximum ?`},
            1,unit, traiteurCriteres.Dinner.products
        ));
        /*
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'diner', displayName: `dinner`, value: traiteurCriteres.diner, label: `do you propose complete meals preparation starters, plats, desserts, cheese ?`}, false,
        [
            {
                value: traiteurCriteres.convivesMin,
                name: 'convivesMin',
                step: 1,
                unit: '',
            },
            {
                value: traiteurCriteres.dinerCapacite,
                name: 'dinerCapacite',
                step: 10,
                unit: '',
            },
        ]));
        // entrées
        newFormObject.push(this.formMapperService.initToggleNumberList(
            {name: `entrees`, type: traiteurCriteres.entrees.type},
            `Entrées`,
            {label: ``, unit, step: 1},
            traiteurCriteres.entrees.options,
        ));
        // plats
        newFormObject.push(this.formMapperService.initToggleNumberList(
            {name: `plats`, type: traiteurCriteres.plats.type},
            `Plats`,
            {label: ``, unit, step: 1},
            traiteurCriteres.plats.options,
        ));
        // accompagnements
        newFormObject.push(this.formMapperService.initToggleNumberList(
            {name: `accompagnements`, type: traiteurCriteres.accompagnements.type},
            `Accompagnements`,
            {label: ``, unit, step: 1},
            traiteurCriteres.accompagnements.options,
        ));
        // fromages
        newFormObject.push(this.formMapperService.initToggleNumberList(
            {name: `fromages`, type: traiteurCriteres.fromages.type},
            `Fromages`,
            {label: ``, unit, step: 1},
            traiteurCriteres.fromages.options,
        ));
        // désserts
        newFormObject.push(this.formMapperService.initToggleNumberList(
            {name: `desserts`, type: traiteurCriteres.desserts.type},
            `Désserts`,
            {label: ``, unit, step: 1},
            traiteurCriteres.desserts.options,
        ));*/

        // boissons
        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'droitDeBouchon', displayName: `corkage`, value: traiteurCriteres.droitDeBouchon, label: `do you provide a corkage for your drinks`}, false,
        [
            {
                value: traiteurCriteres.droitDeBouchonTarif,
                name: 'droitDeBouchonTarif',
                step: 1,
                unit,
            },
        ]));
        // boissons Alcoolisés
        newFormObject.push(this.formMapperService.initToggleNumberList(
            {name: `boissonsAlcoolises`, type: traiteurCriteres.boissonsAlcoolises.type},
            `Boissons Alcoolisés`,
            {label: ``, unit, step: 1},
            traiteurCriteres.boissonsAlcoolises.options,
        ));
        // boissons non-Alcoolisés
        newFormObject.push(this.formMapperService.initToggleNumberList(
            {name: `boissonsNonAlcoolises`, type: traiteurCriteres.boissonsNonAlcoolises.type},
            `Boissons non-Alcoolisés`,
            {label: ``, unit, step: 1},
            traiteurCriteres.boissonsNonAlcoolises.options,
        ));

        // tslint:disable-next-line:max-line-length
        newFormObject.push(this.formMapperService.initToggleNumberField({name: 'serviceEnSalle', displayName: `room service`, value: traiteurCriteres.serviceEnSalle, label: `do you propose room service ?`}, false,
        [
            {
                value: traiteurCriteres.serviceEnSalleTarif,
                name: 'serviceEnSalleTarif',
                step: 1,
                unit,
            },
        ]));

        return newFormObject;
    }
    public mapFormValueToTraiteurCriteria(formValue: any, traiteurCriteres: any) {
        return {
                criteres: this.formMapperService
                .addPrefix(this.formMapperService.mapFormValueToCriteria(formValue, traiteurCriteres), CategoryLabelEnum.TRAITEUR),
                categories: [
                    CategoryLabelEnum.TRAITEUR
                ]
            };

    }
    public resetCriteria(providerEmail: string): Observable<any> {
        const category = CategoryLabelEnum.TRAITEUR;
        const data = {
            criteres: this.formMapperService
            .addPrefix(newTraiteurCriteres, category),
            categories: [category]
        };
        return this.companyService.putServiceByEmailAndService(category, providerEmail, data);
    }
    // tslint:disable-next-line:max-line-length
    public async addOption(fields: DynamicFormFieldInterface[], field: DynamicFormFieldInterface, productName?: string): Promise<DynamicFormFieldInterface[]> {
        return this.formMapperService.addOption(fields, field, productName);
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
