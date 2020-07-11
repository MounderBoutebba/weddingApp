import { FeeType } from '../../../../../user/models/option.model';

export interface coiffureMaquillageEsthetiqueSoinsBookingInterface {
	coiffure: {
		selected: boolean,
		coiffureNombre?: number;
		conseilsPersonnalises?: boolean;
		conseilsPersonnalisesDuree?: number;
		essais?: boolean;
		essaisNombre?: number;
		majorationTypeCheveux?: {name: string, checked: boolean}[];
		produitsEtAccessoires?: ComplexeObj[];
		prestationInvitesProches?: {
			name: string,
			checked: boolean,
			options: {name: string, value: number}[],
		}[];

	};
	maquillage: {
		selected: boolean,
		maquillageNombre?: number;
		conseilsPersonnalises?: boolean;
		conseilsPersonnalisesDuree?: number;
		essais?: boolean;
		essaisNombre?: number;
		majorationTypeDePeau?: {name: string, checked: boolean}[];
		produits?: ComplexeObj[];
		prestationInvitesProches?: {
			name: string,
			checked: boolean,
			options: {name: string, value: number}[],
		}[];
	};
	esthetique: {
		selected: boolean,
		conseilsPersonnalises?: boolean;
		conseilsPersonnalisesDuree?: number;
		essais?: boolean;
		essaisNombre?: number;
		manucureEtpedicure?: {
			name: string,
			checked: boolean,
			options: {name: string, value: number, checked: boolean}[],
		}[];
		epilation?: {
			name: string,
			checked: boolean,
			options: {name: string, value: number, checked: boolean}[],
		}[];
	};
	soins: {
		selected: boolean,
		conseilsPersonnalises?: boolean;
		conseilsPersonnalisesDuree?: number;
		essais?: boolean;
		essaisNombre?: number;
		soins?: {
			name: string,
			checked: boolean,
			options: {name: string, value: number, checked: boolean}[],
		}[];
		massage?: {
			name: string,
			checked: boolean,
			options: {name: string, value: number, checked: boolean}[],
		}[];
	};
	optionDivers: Option[],
}

interface ComplexeObj {
	name: string;
	checked: boolean;
	quantity: number;
}
interface Option {
	id: string,
	name: string,
	description: string,
	optionRate: number,
	examplaire?: number,
	feeType: FeeType,
	checked: boolean,
	categories: string[],
}
export const bookingObj: coiffureMaquillageEsthetiqueSoinsBookingInterface = {
	coiffure: {selected: false},
	maquillage: {selected: false},
	esthetique: {selected: false},
	soins: {selected: false},
	optionDivers: [],
};
