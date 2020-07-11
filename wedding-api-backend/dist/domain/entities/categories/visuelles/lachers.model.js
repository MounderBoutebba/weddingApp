"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_type_enum_1 = require("../field-type.enum");
class Lachers {
    constructor() {
        this.criteres = {
            tarif_horaire: 1200,
            dureeMin: 5,
            lachers: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_NUMBER_LIST,
                options: [
                    {
                        field: 'ballons',
                        search: '',
                        value: false,
                        name: `balloons`,
                        label: `do you propose this release ?`,
                        tarif: 40,
                    },
                    {
                        field: 'lanternes',
                        search: '',
                        value: false,
                        name: `lanterns`,
                        label: `do you propose this release ?`,
                        tarif: 40,
                    },
                    {
                        field: 'colombes',
                        search: '',
                        value: false,
                        name: `doves`,
                        label: `do you propose this release ?`,
                        tarif: 40,
                    },
                    {
                        field: 'papillons',
                        search: '',
                        value: false,
                        name: `butterflies`,
                        label: `do you propose this release ?`,
                        tarif: 40,
                    },
                ],
            },
            complements: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST,
                options: [
                    {
                        field: 'machine_fumee_lourde',
                        search: '',
                        value: false,
                        name: `heavy smock machine`,
                        label: `do you propose this complement ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'assurance',
                        search: '',
                        value: false,
                        name: `insurance`,
                        label: `do you propose this complement ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'machine_bulles_geantes',
                        search: '',
                        value: false,
                        name: `Machine à bulles géantes`,
                        label: `do you propose this complement ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'sonorisation',
                        search: '',
                        value: false,
                        name: `Sonorisation`,
                        label: `do you propose this complement ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                ],
            },
            autorisation: false,
            autorisationRequired: false,
            lunettesOritectionEnfants: false,
            lunettesOritectionEnfantsNumber: 0,
        };
        this.label = 'lacher';
        this.location = { address: '', lat: 0, lng: 0 };
        this.userid = '';
    }
}
exports.Lachers = Lachers;
//# sourceMappingURL=lachers.model.js.map