"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const beauteEtSoins_model_1 = require("./beauteEtSoins.model");
const field_type_enum_1 = require("../field-type.enum");
class Soins extends beauteEtSoins_model_1.BeauteEtSoins {
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
            soins: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_PRESTATIONS,
                value: false,
                capacite: 3,
                prestations: [
                    {
                        name: `visage`,
                        search: `visage`,
                        field: `visage`,
                        options: [
                            {
                                name: `Soin coup d'éclat`,
                                tarif: 25
                            },
                            {
                                name: `Soin contour des yeux`,
                                tarif: 25
                            },
                            {
                                name: `Soin Hydratant`,
                                tarif: 25
                            },
                            {
                                name: `Soin Anti-âge`,
                                tarif: 25
                            },
                            {
                                name: `Soin purifiant`,
                                tarif: 25
                            },
                            {
                                name: `Décoloration des poils`,
                                tarif: 25
                            },
                        ],
                    },
                    {
                        name: `corps`,
                        search: `corps`,
                        field: `corps`,
                        options: [
                            {
                                name: `Soin du corps`,
                                tarif: 25
                            },
                            {
                                name: `Soin du dos`,
                                tarif: 25
                            },
                            {
                                name: `Gommage du corps`,
                                tarif: 25
                            },
                            {
                                name: `Décoloration des poils`,
                                tarif: 25
                            },
                            {
                                name: `Enveloppement du corps`,
                                tarif: 25
                            },
                            {
                                name: `Cryothérapie : Anti-cellulite et sculptant`,
                                tarif: 25
                            },
                        ],
                    },
                    {
                        name: `jambes`,
                        search: `jambes`,
                        field: `jambes`,
                        options: [
                            {
                                name: `Pressothérapie : Jambes lourdes`,
                                tarif: 25
                            },
                            {
                                name: `Cryothérapie Hydrojet : Jambes légères`,
                                tarif: 25
                            },
                        ],
                    },
                ],
            },
            massage: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_PRESTATIONS,
                value: false,
                capacite: 3,
                prestations: [
                    {
                        name: `Type de massage`,
                        search: `type_de_massage`,
                        field: `type_de_massage`,
                        options: [
                            {
                                name: `Crâne`,
                                tarif: 25
                            },
                            {
                                name: `Visage`,
                                tarif: 25
                            },
                            {
                                name: `Corps`,
                                tarif: 25
                            },
                            {
                                name: `Mains`,
                                tarif: 25
                            },
                            {
                                name: `Pieds`,
                                tarif: 25
                            },
                        ],
                    },
                ],
            },
            lieuRealisation: [],
            sexPraticien: [],
        };
        this.label = 'soins';
        this.userid = '';
        this.location = { address: '', lat: 0, lng: 0 };
    }
}
exports.Soins = Soins;
//# sourceMappingURL=soins.model.js.map