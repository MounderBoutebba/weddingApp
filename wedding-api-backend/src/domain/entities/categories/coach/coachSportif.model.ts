import { Coach, CoachCriteres } from './coach.model';
import { FieldTypeEnum } from '../field-type.enum';

export class CoachSportif extends Coach {
	criteres: CoachSportifCriteres = {

    tarif_horaire: 80,
    dureeMin: 2,
    lieu: [],
    elevesSimultane: 1,
    typesDeSport: [],
    AgrementServiceALaPersonne: false,

    conseilsPersonnalises: false,
    conseilsPersonnalisesTarif: 10,

    essais: false,
    essaisTarif: 10,

    servicesAssocies: {
		type: FieldTypeEnum.TOGGLE_NUMBER_RADIO_LIST,
		options: [
			{
				field: 'reequilibrage_alimentaire',
				search: '',
				value: false,
				name: `food rebalancing`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'remise_en_forme',
				search: '',
				value: false,
				name: `physical transformation`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'perte_de_masse_graisseuse',
				search: '',
				value: false,
				name: `fat loss`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
			{
				field: 'prise_de_muscle',
				search: '',
				value: false,
				name: `muscle gain`,
				label: `do you propose this service ?`,
				inclusDansPrix: false,
				tarif: 40,

			},
		],
	},

	};
	label = 'coachSportif';
	userid = '';
	location = { address: '', lat: 0, lng: 0 };

}

export interface CoachSportifCriteres extends CoachCriteres {

	tarif_horaire: number;
	dureeMin: number;
	lieu: string[];
	elevesSimultane: number;
	typesDeSport: string[];
	AgrementServiceALaPersonne: boolean;

	conseilsPersonnalises: boolean;
	conseilsPersonnalisesTarif: number;

	essais: boolean;
    essaisTarif: number;

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
