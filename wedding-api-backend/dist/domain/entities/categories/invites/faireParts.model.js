"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_type_enum_1 = require("../field-type.enum");
class FaireParts {
    constructor() {
        this.criteres = {
            tarif_horaire: 80,
            delaisDeRealisation: 7,
            commandeMin: 5,
            finitionsProposes: {
                value: true,
                type: field_type_enum_1.FieldTypeEnum.CHECKBOX_NUMBER_LIST,
                finitions: [],
                formats: [
                    {
                        field: 'carre_plie',
                        search: '',
                        value: false,
                        name: `Carré (14,1 x 14,1 cm) - Plié`,
                        modeles: [
                            {
                                name: '1 à 9 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '10 à 19 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '20 à 49 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '50 à 99 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '100 à 199 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '200 à 499 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '500 à 999 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '1000 tirages et plus',
                                tarif: 0.05,
                            },
                        ],
                    },
                    {
                        value: false,
                        field: 'grand_a5_plie',
                        search: '',
                        name: `Grand / A5 (14,8 x 21,0 cm) - Plié`,
                        modeles: [
                            {
                                name: '1 à 9 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '10 à 19 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '20 à 49 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '50 à 99 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '100 à 199 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '200 à 499 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '500 à 999 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '1000 tirages et plus',
                                tarif: 0.05,
                            },
                        ],
                    },
                    {
                        value: false,
                        field: 'petit_a6_plie',
                        search: '',
                        name: `Petit / A6 (10,5 x 14,8 cm) - Plié`,
                        modeles: [
                            {
                                name: '1 à 9 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '10 à 19 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '20 à 49 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '50 à 99 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '100 à 199 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '200 à 499 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '500 à 999 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '1000 tirages et plus',
                                tarif: 0.05,
                            },
                        ],
                    },
                    {
                        field: 'grand_a5_plat',
                        search: '',
                        value: false,
                        name: `Grand / A5 (14,8 x 21,0 cm) - Plat`,
                        modeles: [
                            {
                                name: '1 à 9 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '10 à 19 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '20 à 49 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '50 à 99 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '100 à 199 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '200 à 499 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '500 à 999 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '1000 tirages et plus',
                                tarif: 0.05,
                            },
                        ],
                    },
                    {
                        field: 'petit_a6_plat',
                        search: '',
                        value: false,
                        name: `Petit / A6 (10,5 x 14,8 cm) - Plat`,
                        modeles: [
                            {
                                name: '1 à 9 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '10 à 19 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '20 à 49 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '50 à 99 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '100 à 199 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '200 à 499 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '500 à 999 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '1000 tirages et plus',
                                tarif: 0.05,
                            },
                        ],
                    },
                    {
                        field: 'carre_plat',
                        search: '',
                        value: false,
                        name: `Carré (14,1 x 14,1 cm) - Plat`,
                        modeles: [
                            {
                                name: '1 à 9 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '10 à 19 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '20 à 49 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '50 à 99 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '100 à 199 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '200 à 499 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '500 à 999 tirages',
                                tarif: 0.05,
                            },
                            {
                                name: '1000 tirages et plus',
                                tarif: 0.05,
                            },
                        ],
                    },
                ],
            },
            colories: [],
            dorures: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_NUMBER_LIST,
                options: [
                    {
                        field: 'golden',
                        search: '',
                        value: false,
                        name: `golden`,
                        label: `do you propose this gilding`,
                        tarif: 20,
                    },
                    {
                        field: 'silver',
                        search: '',
                        value: false,
                        name: `silver`,
                        label: `do you propose this gilding`,
                        tarif: 20,
                    },
                    {
                        field: 'rouge',
                        search: '',
                        value: false,
                        name: `copper`,
                        label: `do you propose this gilding`,
                        tarif: 20,
                    },
                ],
            },
            livraison: false,
            livraisonInclusDansPrix: false,
            livraisonTarif: 40,
        };
        this.label = 'faireparts';
        this.userid = '';
        this.location = { address: '', lat: 0, lng: 0 };
    }
}
exports.FaireParts = FaireParts;
//# sourceMappingURL=faireParts.model.js.map