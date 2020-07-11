import { Coach, CoachCriteres } from './coach.model';
import { FieldTypeEnum } from '../field-type.enum';

export class ChoregrapheMariage implements Coach {

	criteres: ChoregrapheMariageCriteres = {
    tarif_horaire: 80,
    dureeMin: 2,
    lieu: [],
    elevesSimultane: 1,
    typesDeDances: [],
    AgrementServiceALaPersonne: false,

    servicesAssocies: {
		type: FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST,
		options: [
			{
				field: 'creation_choregraphie',
				search: '',
				value: false,
				name: `choreography creation`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'creation_bande_musical',
				search: '',
				value: false,
				name: `musical band creation`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'corrections_distance',
				search: '',
				value: false,
				name: `remote correction`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'conseils_sur_les_tenues_adaptees',
				search: '',
				value: false,
				name: `advice on suitable outfits`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
		],
	},

    conseilsPersonnalises: false,
    conseilsPersonnalisesTarif: 10,

    essais: false,
    essaisTarif: 10,
	};
	label = 'choregrapheMariage';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };
}

export interface ChoregrapheMariageCriteres extends CoachCriteres {

	tarif_horaire: number;
	dureeMin: number;
	lieu: string[];
	elevesSimultane: number;
	typesDeDances: string[];
    AgrementServiceALaPersonne: boolean;

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

	conseilsPersonnalises: boolean;
	conseilsPersonnalisesTarif: number;

	essais: boolean;
	essaisTarif: number;

}
