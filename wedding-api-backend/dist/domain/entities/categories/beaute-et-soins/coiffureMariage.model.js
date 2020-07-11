"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_type_enum_1 = require("../field-type.enum");
class CoiffureMariage {
    constructor() {
        this.criteres = {
            tarif_horaire: 80,
            coiffureNombre: 0,
            conseilsPersonnalises: false,
            conseilsPersonnalisesDuree: 0,
            conseilsPersonnalisesTarif: 80,
            essais: false,
            essaisNombre: 0,
            essaisTarif: 80,
            majorationTypeCheveux: {
                value: false,
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_MAJORATION,
                options: [
                    { name: `cheveux long`, majoration: 10, label: `Majoration en %` },
                    { name: `cheveux bouclés`, majoration: 10, label: `Majoration en %` },
                    { name: `cheveux crépus`, majoration: 10, label: `Majoration en %` },
                    { name: `cheveux frisés`, majoration: 10, label: `Majoration en %` },
                ],
            },
            produitsEtAccessoires: {
                value: false,
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_PRODUITS_ACCESSOIRES,
                options: [
                    {
                        name: `Attaches cheveux`,
                        tarif: 15,
                        label: `Tarif par unité`,
                        checked: false,
                        field: 'attaches_cheveux',
                        search: 'attaches_cheveux',
                    },
                    {
                        name: `Soin cheveux`,
                        tarif: 30,
                        label: `Tarif par unité`,
                        checked: false,
                        field: 'soin_cheveux',
                        search: 'soin_cheveux',
                    },
                    {
                        name: `Alliage Peignes`,
                        tarif: 30,
                        label: `Tarif par unité`,
                        checked: false,
                        field: 'alliage_peignes',
                        search: 'alliage_peignes',
                    },
                    {
                        name: `Épigles à cheveux`,
                        tarif: 30,
                        label: `Tarif par unité`,
                        checked: false,
                        field: 'epingle_a_cheveux',
                        search: 'epingle_a_cheveux',
                    },
                    {
                        name: `Couronne de fleurs`,
                        tarif: 30,
                        label: `Tarif par unité`,
                        checked: false,
                        field: 'couronne_de_fleurs',
                        search: 'couronne_de_fleurs',
                    },
                ],
            },
            prestationInvitesProches: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_PRESTATIONS,
                value: false,
                capacite: 3,
                prestations: [
                    {
                        name: `Coiffure`,
                        search: `coiffure`,
                        field: `coiffure`,
                        options: [
                            {
                                name: `Brushing simple`,
                                tarif: 25
                            },
                            {
                                name: `Brushing élaboré`,
                                tarif: 25
                            },
                            {
                                name: `Brushing (courts et mi-longs)`,
                                tarif: 25
                            },
                            {
                                name: `Lissage brésilien`,
                                tarif: 25
                            },
                            {
                                name: `Coiffure de soirée`,
                                tarif: 25
                            },
                            {
                                name: `Coupe classique`,
                                tarif: 25
                            },
                            {
                                name: `Coupe création`,
                                tarif: 25
                            },
                        ],
                    },
                    {
                        name: `Technique`,
                        search: `technique`,
                        field: `technique`,
                        options: [
                            {
                                name: `Couleur (racines)`,
                                tarif: 25
                            },
                            {
                                name: `Couleur complète`,
                                tarif: 25
                            },
                            {
                                name: `Ombré hair`,
                                tarif: 25
                            },
                            {
                                name: `Mèches`,
                                tarif: 25
                            },
                            {
                                name: `Balayage`,
                                tarif: 25
                            },
                            {
                                name: `Patiné`,
                                tarif: 25
                            },
                        ],
                    },
                ],
            },
            lieuRealisation: []
        };
        this.label = 'coiffure';
        this.userid = '';
        this.location = { address: '', lat: 0, lng: 0 };
    }
}
exports.CoiffureMariage = CoiffureMariage;
//# sourceMappingURL=coiffureMariage.model.js.map