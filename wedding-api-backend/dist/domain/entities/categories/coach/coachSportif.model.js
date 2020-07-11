"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coach_model_1 = require("./coach.model");
const field_type_enum_1 = require("../field-type.enum");
class CoachSportif extends coach_model_1.Coach {
    constructor() {
        super(...arguments);
        this.criteres = {
            tarif_horaire: 80,
            dureeMin: 2,
            lieu: [],
            elevesSimultane: 1,
            typesDeSport: [],
            AgrementServiceALaPersonne: false,
            conseilsPersonnalises: false,
            conseilsPersonnalisesTarif: 10,
            essais: false,
            essaisTarif: 10,
            servicesAssocies: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST,
                options: [
                    {
                        field: 'reequilibrage_alimentaire',
                        search: '',
                        value: false,
                        name: `food rebalancing`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'remise_en_forme',
                        search: '',
                        value: false,
                        name: `physical transformation`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'perte_de_masse_graisseuse',
                        search: '',
                        value: false,
                        name: `fat loss`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'prise_de_muscle',
                        search: '',
                        value: false,
                        name: `muscle gain`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                ],
            },
        };
        this.label = 'coachSportif';
        this.userid = '';
        this.location = { address: '', lat: 0, lng: 0 };
    }
}
exports.CoachSportif = CoachSportif;
//# sourceMappingURL=coachSportif.model.js.map