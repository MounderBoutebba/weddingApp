import { Coach, CoachCriteres } from './coach.model';
import { FieldTypeEnum } from '../field-type.enum';

export class OfficiantCeremonie extends Coach {
	criteres: OfficiantCeremonieCriteres = {

    tarif_horaire: 80,
    dureeMin: 2,
    lieu: [],

    conseilsPersonnalises: false,
    conseilsPersonnalisesTarif: 10,

    servicesAssocies: {
		type: FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST,
		options: [
			{
				field: 'officier_la_ceremonie_laique_avec_rituel',
				search: '',
				value: false,
				name: `officer the lay ceremony with ritual`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'orchestrer_la_duree_et_le_timing',
				search: '',
				value: false,
				name: `orchestrate duration and timing`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'creation_du_texte_des_maries',
				search: '',
				value: false,
				name: `creation of the bride\'s text`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'creation_des_textes_des_intervenants',
				search: '',
				value: false,
				name: `creation of the interveners' texts`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'organisation_des_entrees_et_sorties_de_la_ceremonie',
				search: '',
				value: false,
				name: `organization of the entrances and exits of the ceremony`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'edition_la_playlist_musicale',
				search: '',
				value: false,
				name: `music playlist edition`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
		],
	},

	};
	label = 'officiantCeremonie';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };

}

export interface OfficiantCeremonieCriteres extends CoachCriteres {

	tarif_horaire: number;
	dureeMin: number;
	lieu: string[];

	conseilsPersonnalises: boolean;
    conseilsPersonnalisesTarif: number;

    servicesAssocies: {
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
