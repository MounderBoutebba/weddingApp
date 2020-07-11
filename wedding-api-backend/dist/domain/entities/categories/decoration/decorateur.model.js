"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_type_enum_1 = require("../field-type.enum");
class Decorateur {
    constructor() {
        this.criteres = {
            tarif_horaire: 80,
            decorationAssociees: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST,
                options: [
                    {
                        field: 'decorationDeLaSalle',
                        search: '',
                        value: false,
                        name: `room decoration`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'centreDeTable',
                        search: '',
                        value: false,
                        name: `table's center`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'lesBuffets',
                        search: '',
                        value: false,
                        name: `buffets`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'espaceLounges',
                        search: '',
                        value: false,
                        name: `espace lounge`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'espace_jeux_enfants',
                        search: '',
                        value: false,
                        name: `Espace jeux d’enfants`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'les_fleurs_compositions_florales',
                        search: '',
                        value: false,
                        name: `les fleurs & compositions florales`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'arches',
                        search: '',
                        value: false,
                        name: `Arches`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'tonelle',
                        search: '',
                        value: false,
                        name: `Tonelle`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'drapes',
                        search: '',
                        value: false,
                        name: `drapés`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'espace_photo',
                        search: '',
                        value: false,
                        name: `Espace Photo (photobooth, kissbooth)`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'chapiteau',
                        search: '',
                        value: false,
                        name: `Chapiteau`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'la_table_de_signature',
                        search: '',
                        value: false,
                        name: `La table de signature/livre d’or/urne`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'la_signaletique',
                        search: '',
                        value: false,
                        name: `La signalétique`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'plan_de_table',
                        search: '',
                        value: false,
                        name: `Plan de table`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                ],
            },
            conseilPersonalises: false,
            conseilPersonalisesTarif: 80,
            livraisonDuMateriel: false,
            livraisonDuMaterielInclusDansPrix: false,
            livraisonDuMaterielTarif: 40,
            montageDemontage: false,
            montageDemontageInclusDansPrix: false,
            montageDemontageTarif: 40,
        };
        this.label = 'decorateur';
        this.userid = '';
        this.location = { address: '', lat: 0, lng: 0 };
    }
}
exports.Decorateur = Decorateur;
//# sourceMappingURL=decorateur.model.js.map