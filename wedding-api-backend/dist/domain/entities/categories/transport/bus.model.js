"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_type_enum_1 = require("../field-type.enum");
class Bus {
    constructor() {
        this.criteres = {
            tarif_horaire: 80,
            bus: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_VOITURE_LIST,
                fields: [
                    {
                        field: '',
                        search: '',
                        name: `Renault Trafic`,
                        value: false,
                        label: `do you propose this vehicle ?`,
                        categorie: `Van`,
                        nbrPlace: 9,
                        options: [
                            {
                                name: `Tarif par jour`,
                                value: 80,
                                step: 10,
                                unit: `€`,
                            },
                            {
                                name: `Kilométrage inclus`,
                                value: 100,
                                step: 100,
                                unit: `KM`,
                            },
                            {
                                name: `Distance location max`,
                                value: 900,
                                step: 100,
                                unit: `KM`,
                            },
                            {
                                name: `Tarif / Kilomètre sup`,
                                value: 3,
                                step: 1,
                                unit: `€`,
                            },
                        ],
                    },
                    {
                        field: '',
                        search: '',
                        name: `Mercedes Sprinter City`,
                        value: false,
                        label: `do you propose this vehicle ?`,
                        categorie: `Van`,
                        nbrPlace: 9,
                        options: [
                            {
                                name: `Tarif par jour`,
                                value: 80,
                                step: 10,
                                unit: `€`,
                            },
                            {
                                name: `Kilométrage inclus`,
                                value: 100,
                                step: 100,
                                unit: `KM`,
                            },
                            {
                                name: `Distance location max`,
                                value: 900,
                                step: 100,
                                unit: `KM`,
                            },
                            {
                                name: `Tarif / Kilomètre sup`,
                                value: 3,
                                step: 1,
                                unit: `€`,
                            },
                        ],
                    },
                    {
                        field: '',
                        search: '',
                        name: `Iveco Bus Urbanway 10`,
                        value: false,
                        label: `do you propose this vehicle ?`,
                        categorie: `Van`,
                        nbrPlace: 9,
                        options: [
                            {
                                name: `Tarif par jour`,
                                value: 80,
                                step: 10,
                                unit: `€`,
                            },
                            {
                                name: `Kilométrage inclus`,
                                value: 100,
                                step: 100,
                                unit: `KM`,
                            },
                            {
                                name: `Distance location max`,
                                value: 900,
                                step: 100,
                                unit: `KM`,
                            },
                            {
                                name: `Tarif / Kilomètre sup`,
                                value: 3,
                                step: 1,
                                unit: `€`,
                            },
                        ],
                    },
                    {
                        field: '',
                        search: '',
                        name: `Man Lion's City`,
                        value: false,
                        label: `do you propose this vehicle ?`,
                        categorie: `Van`,
                        nbrPlace: 9,
                        options: [
                            {
                                name: `Tarif par jour`,
                                value: 80,
                                step: 10,
                                unit: `€`,
                            },
                            {
                                name: `Kilométrage inclus`,
                                value: 100,
                                step: 100,
                                unit: `KM`,
                            },
                            {
                                name: `Distance location max`,
                                value: 900,
                                step: 100,
                                unit: `KM`,
                            },
                            {
                                name: `Tarif / Kilomètre sup`,
                                value: 3,
                                step: 1,
                                unit: `€`,
                            },
                        ],
                    },
                ],
            },
            services: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST,
                options: [
                    {
                        field: 'assurance_vehicule',
                        search: '',
                        value: false,
                        name: `vehicle's insurance`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'chaffeur',
                        search: '',
                        value: false,
                        name: `driver`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'carburant',
                        search: '',
                        value: false,
                        name: `fuel`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                ],
            },
        };
        this.label = 'bus';
        this.userid = '';
        this.location = { address: '', lat: 0, lng: 0 };
    }
}
exports.Bus = Bus;
//# sourceMappingURL=bus.model.js.map