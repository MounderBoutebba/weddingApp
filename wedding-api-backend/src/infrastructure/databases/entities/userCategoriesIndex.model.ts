import { OptionEntity } from './option.entity';
import { SettingEntity } from './setting.entity';
import { TripFeeType } from './company.entity';

export abstract class UserCategoriesIndexModel{

	public criteres: any;
	public label: string;
	public userid: string;
	public location: {address:string,geo:{lat:number,lon:number}};
	public options: OptionEntity[];
	public variationPeriode: SettingEntity[];
	public tripExpences?: { rateType: TripFeeType, distance: number, typePrice: number };
	public weekendVariationPercentage: number;
	public securePayment: boolean;
	public verifiedProvider: boolean;

}
