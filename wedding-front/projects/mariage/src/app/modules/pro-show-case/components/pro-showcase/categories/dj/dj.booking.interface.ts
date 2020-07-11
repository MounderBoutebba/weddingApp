import { FeeType } from 'projects/mariage/src/app/modules/user/models/option.model';

export interface DjBookingInterface {
	dj: {
		dureeMissionDj?: number;
		services?: Service[];
		matriels?: Service[];
	};
	optionDivers: Option[];
}

interface Service {
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

export const bookingObj: DjBookingInterface = {
	dj: {},
	optionDivers: []
};
