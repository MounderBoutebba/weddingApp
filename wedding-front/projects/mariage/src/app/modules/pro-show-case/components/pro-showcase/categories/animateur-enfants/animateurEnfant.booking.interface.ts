import { FeeType } from '../../../../../user/models/option.model';

export interface AnimateurEnfantBookingInterface {
	animateur: {
		dureeMissionAnimateur?: number;
		NombreAnimateurs?: number;
		animations?: Animation[];
	};
	optionDivers: Option[];
}

interface Animation {
	name: string;
	checked: boolean;
}

interface Option {
	id: string;
	name: string;
	description: string;
	optionRate: number;
	examplaire?: number;
	feeType: FeeType;
	checked: boolean;
	categories: string[];
}

export const bookingObj: AnimateurEnfantBookingInterface = {
	animateur: {},
	optionDivers: []
};
