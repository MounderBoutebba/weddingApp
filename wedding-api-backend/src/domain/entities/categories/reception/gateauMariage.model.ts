import { Reception, ReceptionCriteres } from './reception.model';
import { FieldTypeEnum } from '../field-type.enum';

export class GateauMariage implements Reception {
	criteres: GateauMariageCriteres = {

	tarif_horaire: 80,

	typesDeCreation: [],

	gateaux: {
		type: FieldTypeEnum.TOGGLE_NUMBER_LIST_OPTIONS,
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
	label = 'gateaumariage';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };

}

export interface GateauMariageCriteres extends ReceptionCriteres {
	tarif_horaire: number;

	typesDeCreation: string[];

	gateaux: {
		type: string,
		value: boolean,
		livraison: {
			value: boolean,
			tarif: number,
		},
		options: Array<{
			field?: string,
			search?: string,
			value: boolean,
			name: string,
			label: string,
			opts: Array<{
				name: string,
				value: number,
				step: number,
				unit: string
			}>,
		}>,
	};
}
