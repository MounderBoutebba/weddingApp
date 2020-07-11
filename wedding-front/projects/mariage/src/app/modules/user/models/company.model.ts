import { CompanyImage } from './companyImage.model';
import { Option } from './option.model';
import { Setting } from './setting.model';
import { CompanyBilling } from './companyBilling.model';

export enum TripFeeType {
	SINGLE_FEE = 'Frais unique',
	FEE_PER_KM = 'Frais par kilomètre'
}

export class Company {
	id: string;
	public name: string;
	public description: string;
	public weekendVariation?: boolean;
	public weekendVariationPercentage?: number;
	public periodeVariation?: boolean;
	public optionsProposed?: boolean;
	public verifiedProvider?: boolean;
	public languages?: string[];
	public suppHours?: boolean;
	public suppHoursRate?: number;
	public tripExpences?: boolean;
	public tripExpencesDistance?: number;
	public tripExpencesRateType?: TripFeeType;
	public tripExpencesTypePrice?: number;
	public currentStep?: string;
	public categories: string[] = [];
	public links: string[] = [];
	public questions: any = {};
	public criteres: any = {};
	public networks: string[] = [];
	user: {firstname: string, lastname: string, email: string, phoneVerified: boolean, phone: {country: string, phoneNumber: string}}
	= {firstname: '', lastname: '', email: '', phoneVerified: false, phone: {country: '', phoneNumber: ''}};
	public company: {
		id: string;
		categories: string[];
		name: string;
		description: string;
		location: { address: string };
		images: { path: string }[];
		options: Option[];
		settings: Setting[];
		weekendVariation: boolean;
		weekendVariationPercentage: number;
		totalNotes: number;
		qualiteService: number;
		professionnalisme: number;
		flexibilite: number;
		rapportQualitePrix: number;
		questions?: any[];
		dynamiqueQts?: any[];
		billing?: CompanyBilling;
		// tslint:disable-next-line:max-line-length
	} = {
		id: '',
		categories: [],
		name: '',
		description: '',
		location: { address: '' },
		images: [],
		options: [],
		settings: [],
		weekendVariationPercentage: 0,
		weekendVariation: false,
		totalNotes: 0,
		qualiteService: 0,
		professionnalisme: 0,
		flexibilite: 0,
		rapportQualitePrix: 0
	};
	// @ts-ignore
	public location: { address: string; lat: number; lng: number } = {};
	public dynamiqueQts: Array<{ label: string; response: string }> = [];
	images: CompanyImage[] = [];
	public options: Option[] = [];
	public settings: Setting[] = [];
	public billing: CompanyBilling;
	private updatedAt: Date;
	private createdAt: Date;
}
