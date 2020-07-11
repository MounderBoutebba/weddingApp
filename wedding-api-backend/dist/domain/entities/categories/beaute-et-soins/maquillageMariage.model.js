"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const beauteEtSoins_model_1 = require("./beauteEtSoins.model");
const field_type_enum_1 = require("../field-type.enum");
class MaquillageMariage extends beauteEtSoins_model_1.BeauteEtSoins {
    constructor() {
        super(...arguments);
        this.criteres = {
            tarif_horaire: 80,
            conseilsPersonnalises: false,
            conseilsPersonnalisesDuree: 0,
            conseilsPersonnalisesTarif: 80,
            essais: false,
            essaisNombre: 0,
            essaisTarif: 80,
            majorationTypeDePeau: {
                value: false,
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_MAJORATION,
                options: [
                    { name: `Sèche`, majoration: 10, label: `Majoration en %` },
                    { name: `Grasse`, majoration: 10, label: `Majoration en %` },
                    { name: `Peau mixte`, majoration: 10, label: `Majoration en %` },
                    { name: `Sensible`, majoration: 10, label: `Majoration en %` },
                ],
            },
            produits: {
                value: false,
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_PRODUITS_ACCESSOIRES,
                options: [
                    {
                        name: `Produit de maintien`,
                        tarif: 15,
                        label: `Tarif par unité`,
                        checked: false,
                        field: 'produit_de_maintien',
                        search: 'produit_de_maintien',
                    },
                    {
                        name: `Soin visage`,
                        tarif: 15,
                        label: `Tarif par unité`,
                        checked: false,
                        field: 'soin_visage',
                        search: 'soin_visage',
                    },
                    {
                        name: `Crème hydratante`,
                        tarif: 15,
                        label: `Tarif par unité`,
                        checked: false,
                        field: 'creme_hydratante',
                        search: 'creme_hydratante',
                    },
                    {
                        name: `Pinceau kabuki`,
                        tarif: 15,
                        label: `Tarif par unité`,
                        checked: false,
                        field: 'pinceau_kabuki',
                        search: 'pinceau_kabuki',
                    },
                    {
                        name: `Gel sculptant`,
                        tarif: 15,
                        label: `Tarif par unité`,
                        checked: false,
                        field: 'gel_sculptant',
                        search: 'gel_sculptant',
                    },
                    {
                        name: `Faux-cils`,
                        tarif: 15,
                        label: `Tarif par unité`,
                        checked: false,
                        field: 'faux_cils',
                        search: 'faux_cils',
                    },
                    {
                        name: `Éponge à maquillage`,
                        tarif: 15,
                        label: `Tarif par unité`,
                        checked: false,
                        field: 'eponge_a_maquillage',
                        search: 'eponge_a_maquillage',
                    },
                    {
                        name: `Brosses maquillage ovales`,
                        tarif: 15,
                        label: `Tarif par unité`,
                        checked: false,
                        field: 'brosses_maquillage_ovales',
                        search: 'brosses_maquillage_ovales',
                    },
                ],
            },
            prestationInvitesProches: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_PRESTATIONS,
                value: false,
                capacite: 3,
                prestations: [
                    {
                        name: ``,
                        search: ``,
                        field: ``,
                        options: [
                            {
                                name: `Maquillage simple`,
                                tarif: 25
                            },
                            {
                                name: `Maquillage semi-élaboré`,
                                tarif: 25
                            },
                            {
                                name: `Maquillage élaboré`,
                                tarif: 25
                            },
                        ],
                    },
                ],
            },
            maquillageNombre: 0,
            lieuRealisation: []
        };
        this.label = 'maquillage';
        this.userid = '';
        this.location = { address: '', lat: 0, lng: 0 };
    }
}
exports.MaquillageMariage = MaquillageMariage;
//# sourceMappingURL=maquillageMariage.model.js.map