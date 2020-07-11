import { FeeType } from '../../../../../user/models/option.model';

export interface VoitureBusBookingInterface {
	voiture: {
		models?: Model[];
		services?: Service[];
	};
	bus: {
		models?: Model[];
		services?: Service[];
	};
	optionDivers: Option[];
}

interface Option {
	name: string;
	description: string;
	optionRate: number;
	examplaire?: number;
	feeType: FeeType;
	checked: boolean;
}
interface Service {
	name: string;
	checked: boolean;
}

interface Model {
	name: string;
	value: boolean;
	label: string;
	dureeLocation: number;
	kilometrage: number;
}

export const bookingObj: VoitureBusBookingInterface = {
	voiture: {},
	bus: {},
	optionDivers: []
};
