"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_type_enum_1 = require("../field-type.enum");
class ChoregrapheMariage {
    constructor() {
        this.criteres = {
            tarif_horaire: 80,
            dureeMin: 2,
            lieu: [],
            elevesSimultane: 1,
            typesDeDances: [],
            AgrementServiceALaPersonne: false,
            servicesAssocies: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST,
                options: [
                    {
                        field: 'creation_choregraphie',
                        search: '',
                        value: false,
                        name: `choreography creation`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'creation_bande_musical',
                        search: '',
                        value: false,
                        name: `musical band creation`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'corrections_distance',
                        search: '',
                        value: false,
                        name: `remote correction`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'conseils_sur_les_tenues_adaptees',
                        search: '',
                        value: false,
                        name: `advice on suitable outfits`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                ],
            },
            conseilsPersonnalises: false,
            conseilsPersonnalisesTarif: 10,
            essais: false,
            essaisTarif: 10,
        };
        this.label = 'choregrapheMariage';
        this.userid = '';
        this.location = { address: '', lat: 0, lng: 0 };
    }
}
exports.ChoregrapheMariage = ChoregrapheMariage;
//# sourceMappingURL=choregrapheMariage.model.js.map