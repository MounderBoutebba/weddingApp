import { Transport, TransportCriteres } from './transport.model';
import { FieldTypeEnum } from '../field-type.enum';

export class Bus implements Transport {
	criteres: BusCriteres = {
	tarif_horaire: 80,

	bus: {
		type: FieldTypeEnum.TOGGLE_VOITURE_LIST,
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
		type: FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST,
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
	label = 'bus';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };

}

export interface BusCriteres extends TransportCriteres {
	tarif_horaire: number;

	bus: {
		type: string,
		fields: Array<{
			field?: string,
			search?: string,
			value: boolean,
            name: string,
			label: string,
			categorie: string,
			nbrPlace: number,
            options: Array<{
                name: string,
				value: number,
				step: number,
				unit: string,
            }>
		}>,
	};

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
