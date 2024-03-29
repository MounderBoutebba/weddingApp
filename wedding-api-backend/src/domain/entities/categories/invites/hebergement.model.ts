import { Invites, InvitesCriteres } from './invites.model';
import { FieldTypeEnum } from '../field-type.enum';

export class Hebergement implements Invites {
	criteres: HebergementCriteres = {
	tarif_horaire: 80,
	typeHebergement: 'hotel',

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
	equipements: {
		type: FieldTypeEnum.TOGGLE_LIST,
		options: [
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
				field: 'piscine',
				search: '',
				value: false,
				name: `Piscine`,
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
				field: 'salle_de_sport',
				search: '',
				value: false,
				name: `Salle de sport`,
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
				field: 'spa',
				search: '',
				value: false,
				name: `Spa`,
				label: `do you propose this equipment ?`,
			},

		],
	},

    parking: false,

    nombreDeChambre: 5,

    services: {
		type: FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST,
		options: [
			{
				field: 'breakfast',
				search: '',
				value: false,
				name: `breakfast`,
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
				tarif: 40,

			},
			{
				field: 'wifi',
				search: '',
				value: false,
				name: `wifi`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'bus_service',
				search: '',
				value: false,
				name: `bus service`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'room_service',
				search: '',
				value: false,
				name: `room service`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
		],
	},
	};
	label = 'hebergement';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };

}

export interface HebergementCriteres extends InvitesCriteres {
	tarif_horaire: number;
	typeHebergement: string;
	typeDeTarification: {
		type: string,
		tarifs: Array<{
			label: string,
			step: number,
			value: number,
			unit: string,
		}>,

	};
	equipements: {
		type: string,
		options: Array<
			{
			field?: string,
			search?: string,
			value: boolean,
			name: string,
			label: string,
			}>
		,
	};
	parking: boolean;

    nombreDeChambre: number;

    services: {
		type: string,
		options: Array<
			{
			field?: string,
			search?: string,
			value: boolean,
			name: string,
			label: string,
			inclusDansPrix: boolean,
			tarif: number,
			}>
		,
	};
}
