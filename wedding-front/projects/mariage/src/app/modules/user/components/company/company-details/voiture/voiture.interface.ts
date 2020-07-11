import { FieldTypeEnum } from '../../../../../shared/components/dynamic-form-builder/models/field-type.enum';

export interface VoitureCriteres {
	tarif_horaire: number;

	voitures: {
		type: string,
		fields: Array<{
			field?: string,
			search?: string,
			value: boolean,
            name: string,
			label: string,
			categorie: string,
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
export const newVoitureCriteres: VoitureCriteres = {
	tarif_horaire: 80,

	voitures: {
		type: FieldTypeEnum.TOGGLE_VOITURE_LIST,
		fields: [
			{
				field: '',
				search: '',
				name: `Hummer H2`,
				value: false,
				label: `do you propose this vehicle ?`,
				categorie: `Haute de gamme`,
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
				name: `Ferrari 458 Italia`,
				value: false,
				label: `do you propose this vehicle ?`,
				categorie: `Haute de gamme`,
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
				name: `Mercedes-Benz Classe G63 AMG`,
				value: false,
				label: `do you propose this vehicle ?`,
				categorie: `Haute de gamme`,
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
				name: `Bentley S1 cabriolet [1957]`,
				value: false,
				label: `do you propose this vehicle ?`,
				categorie: `Haute de gamme`,
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
				name: `Porsche Cayenne S`,
				value: false,
				label: `do you propose this vehicle ?`,
				categorie: `Haute de gamme`,
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
				name: `Cadillac Eldorado cabriolet [1967]`,
				value: false,
				label: `do you propose this vehicle ?`,
				categorie: `Haute de gamme`,
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
