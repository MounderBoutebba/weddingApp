import { FeeType } from '../../../../../user/models/option.model';

export interface HebergementBookingInterface {
	hebergement: {
		nombreDeChambre?: number;
		nombreDePersonnes?: number;
		services?: Service[];
	};
	optionDivers: Option[];
}

interface Service {
	name: string;
	checked: boolean;
}
interface Option {
	name: string;
	description: string;
	optionRate: number;
	examplaire?: number;
	feeType: FeeType;
	checked: boolean;
}

export const bookingObj: HebergementBookingInterface = {
	hebergement: {},
	optionDivers: []
};
