"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_type_enum_1 = require("../field-type.enum");
class Photographe {
    constructor() {
        this.criteres = {
            styleDePhoto: [],
            techniqueUtilisees: [],
            appareils: [],
            objectifs: [],
            accessoires: [],
            tarif_horaire: 80,
            dureeDeReservationMinimum: 2,
            duoPhoto: false,
            duoPhotoTarif: 1,
            delaisDeLivraisonJours: 20,
            livraisonExpress: false,
            livraisonExpressTarif: 1,
            seanceEngagement: false,
            seanceEngagementDureeMinimum: 1,
            seanceEngagementDureeMinimumTarifHoraire: 1,
            seanceBrunchOuDejeuner: false,
            seanceBrunchOuDejeunerDureeMinimum: 1,
            seanceBrunchOuDejeunerDureeMinimumTarifHoraire: 1,
            seanceApresMariage: false,
            seanceApresMariageDureeMinimum: 1,
            seanceApresMariageDureeMinimumTarifHoraire: 1,
            photomaton: false,
            photomatonTarifUnique: 1,
            photocall: false,
            photocallTraifUnique: 1,
            creationAlbum: {
                value: false,
                type: field_type_enum_1.FieldTypeEnum.CHECKBOX_NUMBER_LIST,
                finitions: [],
                formats: [
                    {
                        field: 'a4_paysage29x21',
                        search: '',
                        name: `A4 paysage 29,7 x 21 cm`,
                        value: false,
                        modeles: [
                            {
                                name: '20 Pages',
                                tarif: 70,
                                checked: false,
                            },
                            {
                                name: '50 Pages',
                                tarif: 70,
                                checked: false,
                            },
                            {
                                name: '100 Pages',
                                tarif: 70,
                                checked: false,
                            },
                            {
                                name: '150 Pages',
                                tarif: 70,
                                checked: false,
                            },
                        ],
                    },
                    {
                        field: 'a4_portrait29x21',
                        search: '',
                        name: `A4 portrait 29,7 x 21 cm`,
                        value: false,
                        modeles: [
                            {
                                name: '20 Pages',
                                tarif: 70,
                                checked: false,
                            },
                            {
                                name: '50 Pages',
                                tarif: 70,
                                checked: false,
                            },
                            {
                                name: '100 Pages',
                                tarif: 70,
                                checked: false,
                            },
                            {
                                name: '150 Pages',
                                tarif: 70,
                                checked: false,
                            },
                        ],
                    },
                    {
                        field: 'grand_carre29x29',
                        search: '',
                        name: `Grand carré 29,7 x 29,7 cm`,
                        value: false,
                        modeles: [
                            {
                                name: '20 Pages',
                                tarif: 70,
                                checked: false,
                            },
                            {
                                name: '50 Pages',
                                tarif: 70,
                                checked: false,
                            },
                            {
                                name: '100 Pages',
                                tarif: 70,
                                checked: false,
                            },
                            {
                                name: '150 Pages',
                                tarif: 70,
                                checked: false,
                            },
                        ],
                    },
                    {
                        field: 'grand_format37x26',
                        search: '',
                        name: `Grand format 37 x 26,2 cm`,
                        value: false,
                        modeles: [
                            {
                                name: '20 Pages',
                                tarif: 70,
                                checked: false,
                            },
                            {
                                name: '50 Pages',
                                tarif: 70,
                                checked: false,
                            },
                            {
                                name: '100 Pages',
                                tarif: 70,
                                checked: false,
                            },
                            {
                                name: '150 Pages',
                                tarif: 70,
                                checked: false,
                            },
                        ],
                    },
                ],
            },
            tiragePapier: {
                value: false,
                type: field_type_enum_1.FieldTypeEnum.CHECKBOX_NUMBER_LIST,
                finitions: [],
                formats: [
                    {
                        field: '10x13',
                        search: '',
                        name: `10 x 13`,
                        value: false,
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
                        field: '15x20',
                        search: '',
                        name: `15 x 20`,
                        value: false,
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
                        field: '20x30',
                        search: '',
                        name: `20 x 30`,
                        value: false,
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
                        field: '15x38',
                        search: '',
                        name: `15 x 38`,
                        value: false,
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
            galeriePrive: false,
            galeriePriveTarif: 1,
            retouchesPhoto: false,
            retouchesPhotoFormats: [
                { name: '1_à_9', tarifUnitaire: 1 },
                { name: '10_à_19', tarifUnitaire: 1 },
                { name: '20_à_49', tarifUnitaire: 1 },
                { name: '50_à_99', tarifUnitaire: 1 },
                { name: '100_à_199', tarifUnitaire: 1 },
                { name: '200_à_499', tarifUnitaire: 1 },
                { name: '500_à_999', tarifUnitaire: 1 },
                { name: '1000_et_plus', tarifUnitaire: 1 },
            ],
            remise: false,
            remiseFormats: [
                { name: 'DVD', tarifUnitaire: 1 },
                { name: 'Clé_USB', tarifUnitaire: 1 },
            ],
            livraisonHauteResolution: false,
            livraisonHauteResolutionTarif: 1,
        };
        this.label = 'photographe';
        this.userid = '';
        this.location = { address: '', lat: 0, lng: 0 };
    }
}
exports.Photographe = Photographe;
//# sourceMappingURL=photographe.model.js.map