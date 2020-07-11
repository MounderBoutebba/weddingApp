"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_type_enum_1 = require("../field-type.enum");
class Musicien {
    constructor() {
        this.criteres = {
            specialite: [],
            instruments: [],
            nombreIntervenants: 1,
            typePublic: 'adultes_et_enfants',
            adaptabiliteLieu: 'interieur_et_exterieur',
            tarif_horaire: 80,
            dureeReservationMin: 3,
            animations: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_NUMBER_LIST,
                options: [
                    {
                        field: 'animateur',
                        search: '',
                        value: false,
                        name: `animator`,
                        label: `indicate if you propose the possibility of having an animator`,
                        tarif: 80,
                    },
                    {
                        field: 'karaoke',
                        search: '',
                        value: false,
                        name: `karaoke`,
                        label: `indicate if you propose the karaoke service`,
                        tarif: 80,
                    },
                    {
                        field: 'derbouka',
                        search: '',
                        value: false,
                        name: `Derbouka`,
                        label: `indicate if you propose the derbouka service on the dance floor`,
                        tarif: 80,
                    },
                    {
                        field: 'danseurs',
                        search: '',
                        value: false,
                        name: `Dancers`,
                        label: `indicate if you propose dancers`,
                        tarif: 80,
                    },
                    {
                        field: 'chanteurs',
                        search: '',
                        value: false,
                        name: `Singers`,
                        label: `indicate if you propose the possibility of having singers`,
                        tarif: 80,
                    },
                    {
                        field: 'deguisements',
                        search: '',
                        value: false,
                        name: `Disguises`,
                        label: `indicate if you propose disguises for the guests`,
                        tarif: 80,
                    },
                    {
                        field: 'machineFummee',
                        search: '',
                        value: false,
                        name: `smoke machine`,
                        label: `indicate if you propose the possibility of having a smoke machine`,
                        tarif: 80,
                    },
                ],
            },
            materiels: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_NUMBER_LIST,
                options: [
                    {
                        field: 'machineFummee',
                        search: '',
                        value: false,
                        name: `smoke machine`,
                        label: `indicate if you propose the possibility of having a smoke machine`,
                        tarif: 80,
                    },
                    {
                        field: 'jeuxDeLumiere',
                        search: '',
                        value: false,
                        name: `light show`,
                        label: `indicate if you propose the possibility of having a light show`,
                        tarif: 80,
                    },
                    {
                        field: 'lasers',
                        search: '',
                        value: false,
                        name: `lasers`,
                        label: `indicate if you propose the possibility of having a lasers show`,
                        tarif: 80,
                    },
                    {
                        field: 'video_projecteur',
                        search: '',
                        value: false,
                        name: `video projectors`,
                        label: `indicate if you propose the possibility of having a video projectors`,
                        tarif: 80,
                    },
                ],
            },
        };
        this.label = 'musicien';
        this.userid = '';
        this.location = { address: '', lat: 0, lng: 0 };
    }
}
exports.Musicien = Musicien;
//# sourceMappingURL=musicien.model.js.map