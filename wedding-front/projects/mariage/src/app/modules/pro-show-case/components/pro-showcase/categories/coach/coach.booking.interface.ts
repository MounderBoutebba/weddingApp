import { FeeType } from 'projects/mariage/src/app/modules/user/models/option.model';

export interface CoachBookingInterface {
    coach: {
        selected: boolean,
        durreDeLaMission?: number,
        lieu: string[],
        typesDeSport: string[],
        servicesAssocies: {
            name: string,
            label: string,
            value: boolean,
        }[],
        conseilsPersonnalises?: boolean,
        essais?: boolean,
    }
    optionDivers: Option[],
}
interface Option {
	id: string,
	name: string;
	description: string;
	optionRate: number;
	examplaire?: number;
	feeType: FeeType;
	checked: boolean;
	categories: string[],
}
export const bookingObj: CoachBookingInterface = {
	coach: {
        selected: true,
        servicesAssocies: [],
        lieu: [],
        typesDeSport: [],
    },
	optionDivers: []
};