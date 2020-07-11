import { FeeType } from 'projects/mariage/src/app/modules/user/models/option.model';

export interface DecorateurFleuristBookingInterface {
	decorateur: {
		selected: boolean;
		dureeMissionDecorateur?: number;
		conseilsPersonnalises?: boolean;
		decorationsAssociees?: Decoration[];
		livraisonDuMateriel?: boolean;
		montageDemontage?: boolean;
	};
	fleurist: {
		selected: boolean;
		dureeMissionFleurist?: number;

		fleurs?: ComplexeObj[];
		feuillages?: ComplexeObj[];
		decorations?: ComplexeObj[];

		livraison?: boolean;
	};
	optionDivers: Option[];
}

interface Decoration {
	name: string;
	checked: boolean;
	label: string;
}

interface ComplexeObj {
	name: string;
	checked: boolean;
	quantity: number;
}

interface Option {
	name: string;
	id: string;
	description: string;
	optionRate: number;
	examplaire?: number;
	feeType: FeeType;
	checked: boolean;
	categories: string[];
}

export const bookingObj: DecorateurFleuristBookingInterface = {
	decorateur: { selected: false },
	fleurist: { selected: false },
	optionDivers: []
};
