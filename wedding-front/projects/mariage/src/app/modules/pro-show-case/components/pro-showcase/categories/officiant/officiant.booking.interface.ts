import { FeeType } from 'projects/mariage/src/app/modules/user/models/option.model';

export interface OfficiantBookingInterface {
	officiant: {
		durreDeLaMission?: number;
		conseilsPersonnalises?: boolean;
		services?: Service[];
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

export const bookingObj: OfficiantBookingInterface = {
	officiant: {},
	optionDivers: []
};
