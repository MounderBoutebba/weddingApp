"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const field_type_enum_1 = require("../field-type.enum");
class VoyageNoces {
    constructor() {
        this.criteres = {
            tarif_horaire: 80,
            zoneGeo: 'france_metropolitaine',
            situationGeo: 'pres_de_la_mere',
            classificationHoteliere: 2,
            enfants: false,
            animaux: false,
            equipements: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_LIST,
                options: [
                    {
                        field: 'piscine',
                        search: '',
                        value: false,
                        name: `Piscine`,
                        label: `do you propose this equipment ?`,
                    },
                    {
                        field: 'spa',
                        search: '',
                        value: false,
                        name: `Spa`,
                        label: `do you propose this equipment ?`,
                    },
                    {
                        field: 'salle_de_sport',
                        search: '',
                        value: false,
                        name: `Salle de sport`,
                        label: `do you propose this equipment ?`,
                    },
                    {
                        field: 'parking',
                        search: '',
                        value: false,
                        name: `Parking`,
                        label: `do you propose this equipment ?`,
                    },
                    {
                        field: 'sauna',
                        search: '',
                        value: false,
                        name: `Sauna`,
                        label: `do you propose this equipment ?`,
                    },
                    {
                        field: 'cuisine',
                        search: '',
                        value: false,
                        name: `Cuisine`,
                        label: `do you propose this equipment ?`,
                    },
                    {
                        field: 'salle_deau',
                        search: '',
                        value: false,
                        name: `Salle d'eau`,
                        label: `do you propose this equipment ?`,
                    },
                    {
                        field: 'wc',
                        search: '',
                        value: false,
                        name: `WC`,
                        label: `do you propose this equipment ?`,
                    },
                    {
                        field: 'climatisation',
                        search: '',
                        value: false,
                        name: `Climatisation`,
                        label: `do you propose this equipment ?`,
                    },
                    {
                        field: 'chauffage',
                        search: '',
                        value: false,
                        name: `Chauffage`,
                        label: `do you propose this equipment ?`,
                    },
                    {
                        field: 'television',
                        search: '',
                        value: false,
                        name: `télévision`,
                        label: `do you propose this equipment ?`,
                    },
                    {
                        field: 'fer_a_repasser',
                        search: '',
                        value: false,
                        name: `Fer à repasser`,
                        label: `do you propose this equipment ?`,
                    },
                    {
                        field: 'acces_handicapes',
                        search: '',
                        value: false,
                        name: `Accès Handicapés`,
                        label: `do you propose this equipment ?`,
                    },
                    {
                        field: 'bar_lounge',
                        search: '',
                        value: false,
                        name: `Bar/lounge`,
                        label: `do you propose this equipment ?`,
                    },
                    {
                        field: 'casino_et_jeux_dargent',
                        search: '',
                        value: false,
                        name: `Casino et jeux d'argent`,
                        label: `do you propose this equipment ?`,
                    },
                    {
                        field: 'kitchenette',
                        search: '',
                        value: false,
                        name: `Kitchenette`,
                        label: `do you propose this equipment ?`,
                    },
                    {
                        field: 'restaurant',
                        search: '',
                        value: false,
                        name: `Restaurant`,
                        label: `do you propose this equipment ?`,
                    },
                    {
                        field: 'seche_cheveux',
                        search: '',
                        value: false,
                        name: `Sèche-cheveux`,
                        label: `do you propose this equipment ?`,
                    },
                ],
            },
            parking: false,
            nombreDeChambre: 5,
            typeDeTarification: {
                type: 'variable',
                tarifs: [
                    {
                        label: 'Tarif / Chambre',
                        step: 10,
                        value: 40,
                        unit: '€'
                    },
                    {
                        label: 'Tarif / Personne',
                        step: 10,
                        value: 40,
                        unit: '€'
                    },
                ],
            },
            services: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST,
                options: [
                    {
                        field: 'petit_dejeuner',
                        search: '',
                        value: false,
                        name: `breakfast`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'service_en_chambre',
                        search: '',
                        value: false,
                        name: `room service`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'navette_aeroport',
                        search: '',
                        value: false,
                        name: `airport shuttle`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'coupe_de_champagne_bienvenu',
                        search: '',
                        value: false,
                        name: `cup of welcoming champagne`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'lunch',
                        search: '',
                        value: false,
                        name: `lunch`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'dinner',
                        search: '',
                        value: false,
                        name: `dinner`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'parking',
                        search: '',
                        value: false,
                        name: `parking lot`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40
                    },
                    {
                        field: 'wifi',
                        search: '',
                        value: false,
                        name: `wifi`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40
                    },
                    {
                        field: 'service_autobus',
                        search: '',
                        value: false,
                        name: `bus service`,
                        label: `do you propose this service ?`,
                        inclusDansPrix: false,
                        tarif: 40
                    }
                ]
            },
            activites: {
                type: field_type_enum_1.FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST,
                options: [
                    {
                        field: 'balade_a_cheval',
                        search: '',
                        value: false,
                        name: `horse ride`,
                        label: `do you propose this activity ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'croisiere_en_bateau',
                        search: '',
                        value: false,
                        name: `boat cruise`,
                        label: `do you propose this activity ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'plongee',
                        search: '',
                        value: false,
                        name: `diving`,
                        label: `do you propose this activity ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'massage',
                        search: '',
                        value: false,
                        name: `Massage`,
                        label: `do you propose this activity ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'balade_en_kayak',
                        search: '',
                        value: false,
                        name: `kayak ride`,
                        label: `do you propose this activity ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                    {
                        field: 'location_jet_ski',
                        search: '',
                        value: false,
                        name: `jet-ski rental`,
                        label: `do you propose this activity ?`,
                        inclusDansPrix: false,
                        tarif: 40,
                    },
                ],
            },
        };
        this.label = 'voyagenoces';
        this.userid = '';
        this.location = { address: '', lat: 0, lng: 0 };
    }
}
exports.VoyageNoces = VoyageNoces;
//# sourceMappingURL=voyageNoces.model.js.map