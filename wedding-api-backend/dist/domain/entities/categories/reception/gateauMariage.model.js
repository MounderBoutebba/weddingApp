"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_type_enum_1 = require("../field-type.enum");
class GateauMariage {
    constructor() {
        this.criteres = {
            tarif_horaire: 80,
            typesDeCreation: [],
            gateaux: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_NUMBER_LIST_OPTIONS,
                value: false,
                livraison: {
                    value: false,
                    tarif: 0,
                },
                options: [
                    {
                        field: 'weddingCake',
                        search: '',
                        value: false,
                        name: `White wedding`,
                        label: `Crème blanche et génoise. Les deux parties du dessus mesurent environt 12 cm`,
                        opts: [
                            {
                                name: `Tarif par part`,
                                value: 20,
                                step: 1,
                                unit: `€`
                            },
                            {
                                name: `Nbre de parts min`,
                                value: 36,
                                step: 1,
                                unit: ``
                            },
                            {
                                name: `Nbre de parts max`,
                                value: 60,
                                step: 1,
                                unit: ``
                            },
                            {
                                name: `Nbre d'étages max`,
                                value: 4,
                                step: 1,
                                unit: ``
                            },
                        ],
                    },
                    {
                        field: 'nakedCake',
                        search: '',
                        value: false,
                        name: `Naked Cake`,
                        label: `Gâteau nu et n'est pas recouvert de pâte d'amande, couches de génoises`,
                        opts: [
                            {
                                name: `Tarif par part`,
                                value: 20,
                                step: 1,
                                unit: `€`
                            },
                            {
                                name: `Nbre de parts min`,
                                value: 36,
                                step: 1,
                                unit: ``
                            },
                            {
                                name: `Nbre de parts max`,
                                value: 60,
                                step: 1,
                                unit: ``
                            },
                            {
                                name: `Nbre d'étages max`,
                                value: 4,
                                step: 1,
                                unit: ``
                            },
                        ],
                    },
                    {
                        field: 'vintageChic',
                        search: '',
                        value: false,
                        name: `Vintage Chic`,
                        label: `Gâteau de mariage carré avec décorations et motifs fleuri vintage`,
                        opts: [
                            {
                                name: `Tarif par part`,
                                value: 20,
                                step: 1,
                                unit: `€`
                            },
                            {
                                name: `Nbre de parts min`,
                                value: 36,
                                step: 1,
                                unit: ``
                            },
                            {
                                name: `Nbre de parts max`,
                                value: 60,
                                step: 1,
                                unit: ``
                            },
                            {
                                name: `Nbre d'étages max`,
                                value: 4,
                                step: 1,
                                unit: ``
                            },
                        ],
                    },
                ],
            },
        };
        this.label = 'gateaumariage';
        this.userid = '';
        this.location = { address: '', lat: 0, lng: 0 };
    }
}
exports.GateauMariage = GateauMariage;
//# sourceMappingURL=gateauMariage.model.js.map