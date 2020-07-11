import { FeeType } from '../../../../../user/models/option.model';

export interface VoyageDeNoceBookingInterface {
	voyage: {
		nombreDeChambre?: number;
		nombreDePersonnes?: number;
		services?: Service[];
		activities?: Acitivity[];
	};
	optionDivers: Option[];
}

interface Service {
	name: string;
	checked: boolean;
}

interface Acitivity {
	name: string;
	checked: boolean;
	quantity: number;
}

interface Option {
	name: string;
	description: string;
	optionRate: number;
	examplaire?: number;
	feeType: FeeType;
	checked: boolean;
}

export const bookingObj: VoyageDeNoceBookingInterface = {
	voyage: {},
	optionDivers: []
};
