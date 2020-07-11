"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_type_enum_1 = require("../field-type.enum");
class AnimateurEnfants {
    constructor() {
        this.criteres = {
            tranchesAge: [],
            tarif_horaire: 80,
            dureeDeReservation: 3,
            nombreEnfantsParIntervenant: 10,
            animations: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_NUMBER_LIST,
                options: [
                    {
                        field: 'magie',
                        search: '',
                        value: false,
                        name: `magic`,
                        label: `indicate if you propose a magic show`,
                        tarif: 80,
                    },
                    {
                        field: 'clown',
                        search: '',
                        value: false,
                        name: `clown`,
                        label: `indicate if you propose a clown show`,
                        tarif: 80,
                    },
                    {
                        field: 'dessin',
                        search: '',
                        value: false,
                        name: `drawing`,
                        label: `indicate if you propose a drawing show`,
                        tarif: 80,
                    },
                    {
                        field: 'danse',
                        search: '',
                        value: false,
                        name: `dance`,
                        label: `indicate if you propose a dance show`,
                        tarif: 80,
                    },
                    {
                        field: 'marionnettiste',
                        search: '',
                        value: false,
                        name: `puppeteer`,
                        label: `indicate if you propose a puppeteer show`,
                        tarif: 80,
                    },
                    {
                        field: 'atelier_artistique',
                        search: '',
                        value: false,
                        name: `artistic workshop`,
                        label: `indicate if you propose a artistic workshop show`,
                        tarif: 80,
                    },
                    {
                        field: 'slupteur_de_ballons',
                        search: '',
                        value: false,
                        name: `balloon slipper`,
                        label: `indicate if you propose a balloon slipper show`,
                        tarif: 80,
                    },
                    {
                        field: 'maquillage',
                        search: '',
                        value: false,
                        name: `make-up`,
                        label: `indicate if you propose a make-up show`,
                        tarif: 80,
                    },
                    {
                        field: 'structure_gonflable',
                        search: '',
                        value: false,
                        name: `inflatable`,
                        label: `indicate if you propose a inflatable show`,
                        tarif: 80,
                    },
                    {
                        field: 'pere_noel',
                        search: '',
                        value: false,
                        name: `santa claus`,
                        label: `indicate if you propose a santa claus show`,
                        tarif: 80,
                    },
                    {
                        field: 'compteur',
                        search: '',
                        value: false,
                        name: `counter`,
                        label: `indicate if you propose a counter show`,
                        tarif: 80,
                    },
                    {
                        field: 'spectacle_complet_avec_decor',
                        search: '',
                        value: false,
                        name: `full spectacle with decoration`,
                        label: `indicate if you propose a full spectacle with decoration`,
                        tarif: 80,
                    },
                ],
            },
        };
        this.label = 'animateurEnfants';
        this.userid = '';
        this.location = { address: '', lat: 0, lng: 0 };
    }
}
exports.AnimateurEnfants = AnimateurEnfants;
//# sourceMappingURL=animateurEnfants.model.js.map