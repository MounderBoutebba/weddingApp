"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coach_model_1 = require("./coach.model");
const field_type_enum_1 = require("../field-type.enum");
class OfficiantCeremonie extends coach_model_1.Coach {
    constructor() {
        super(...arguments);
        this.criteres = {
            tarif_horaire: 80,
            dureeMin: 2,
            lieu: [],
            conseilsPersonnalises: false,
            conseilsPersonnalisesTarif: 10,
            servicesAssocies: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST,
                options: [
                    {
                        field: 'officier_la_ceremonie_laique_avec_rituel',
                        search: '',
                        value: false,
                        name: `officer the lay ceremony with ritual`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'orchestrer_la_duree_et_le_timing',
                        search: '',
                        value: false,
                        name: `orchestrate duration and timing`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'creation_du_texte_des_maries',
                        search: '',
                        value: false,
                        name: `creation of the bride\'s text`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'creation_des_textes_des_intervenants',
                        search: '',
                        value: false,
                        name: `creation of the interveners' texts`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'organisation_des_entrees_et_sorties_de_la_ceremonie',
                        search: '',
                        value: false,
                        name: `organization of the entrances and exits of the ceremony`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'edition_la_playlist_musicale',
                        search: '',
                        value: false,
                        name: `music playlist edition`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                ],
            },
        };
        this.label = 'officiantCeremonie';
        this.userid = '';
        this.location = { address: '', lat: 0, lng: 0 };
    }
}
exports.OfficiantCeremonie = OfficiantCeremonie;
//# sourceMappingURL=officiantCeremonie.model.js.map