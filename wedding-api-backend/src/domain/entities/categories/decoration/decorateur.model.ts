import { Decoration, DecorationCriteres } from './decoration.model';
import { FieldTypeEnum } from '../field-type.enum';

export class Decorateur implements Decoration {
	criteres: DecorateurCriteres = {

	tarif_horaire: 80,

	decorationAssociees: {
		type: FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST,
		options: [
			{
				field: 'decorationDeLaSalle',
				search: '',
				value: false,
				name: `room decoration`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'centreDeTable',
				search: '',
				value: false,
				name: `table's center`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,
			},
			{
				field: 'lesBuffets',
				search: '',
				value: false,
				name: `buffets`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,
			},
			{
				field: 'espaceLounges',
				search: '',
				value: false,
				name: `espace lounge`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,
			},
			{
				field: 'espace_jeux_enfants',
				search: '',
				value: false,
				name: `Espace jeux d’enfants`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,
			},
			{
				field: 'les_fleurs_compositions_florales',
				search: '',
				value: false,
				name: `les fleurs & compositions florales`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,
			},
			{
				field: 'arches',
				search: '',
				value: false,
				name: `Arches`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,
			},
			{
				field: 'tonelle',
				search: '',
				value: false,
				name: `Tonelle`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,
			},
			{
				field: 'drapes',
				search: '',
				value: false,
				name: `drapés`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,
			},
			{
				field: 'espace_photo',
				search: '',
				value: false,
				name: `Espace Photo (photobooth, kissbooth)`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,
			},
			{
				field: 'chapiteau',
				search: '',
				value: false,
				name: `Chapiteau`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,
			},
			{
				field: 'la_table_de_signature',
				search: '',
				value: false,
				name: `La table de signature/livre d’or/urne`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,
			},
			{
				field: 'la_signaletique',
				search: '',
				value: false,
				name: `La signalétique`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,
			},
			{
				field: 'plan_de_table',
				search: '',
				value: false,
				name: `Plan de table`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,
			},
		],
	},

	conseilPersonalises: false,
	conseilPersonalisesTarif: 80,

	livraisonDuMateriel: false,
	livraisonDuMaterielInclusDansPrix: false,
	livraisonDuMaterielTarif: 40,

	montageDemontage: false,
	montageDemontageInclusDansPrix: false,
	montageDemontageTarif: 40,
	};
	label = 'decorateur';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };

}

export interface DecorateurCriteres extends DecorationCriteres {

	tarif_horaire: number;

	conseilPersonalises: boolean;
	conseilPersonalisesTarif: number;
	decorationAssociees: {
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
	// services
	livraisonDuMateriel: boolean;
	livraisonDuMaterielInclusDansPrix: boolean;
	livraisonDuMaterielTarif: number;

	montageDemontage: boolean;
	montageDemontageInclusDansPrix: boolean;
	montageDemontageTarif: number;

}
