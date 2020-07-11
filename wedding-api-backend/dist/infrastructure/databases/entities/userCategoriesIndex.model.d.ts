import { OptionEntity } from './option.entity';
import { SettingEntity } from './setting.entity';
import { TripFeeType } from './company.entity';
export declare abstract class UserCategoriesIndexModel {
    criteres: any;
    label: string;
    userid: string;
    location: {
        address: string;
        geo: {
            lat: number;
            lon: number;
        };
    };
    options: OptionEntity[];
    variationPeriode: SettingEntity[];
    tripExpences?: {
        rateType: TripFeeType;
        distance: number;
        typePrice: number;
    };
    weekendVariationPercentage: number;
    securePayment: boolean;
    verifiedProvider: boolean;
}
