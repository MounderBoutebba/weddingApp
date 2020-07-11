import { CompanyImageEntity } from './companyImage.entity';
import { ProviderEntity } from './user.entity';
import { ReservationEntity } from './reservation.entity';
import { SettingEntity } from './setting.entity';
import { OptionEntity } from './option.entity';
import { CompanyBillingEntity } from './companyBilling.entity';
import { DisponibilityEntity } from './disponibility.entity';
import { CommentsEntity } from './comments.entity';
import { UserFavoriteEntity } from './user-favorite.entity';
export declare enum TripFeeType {
    SINGLE_FEE = "Frais unique",
    FEE_PER_KM = "Frais par kilom\u00E8tre"
}
export declare class CompanyEntity {
    id: string;
    name: string;
    description: string;
    weekendVariation: boolean;
    weekendVariationPercentage: number;
    periodeVariation: boolean;
    optionsProposed: boolean;
    suppHours: boolean;
    suppHoursRate: number;
    tripExpences: boolean;
    tripExpencesDistance: number;
    tripExpencesRateType: TripFeeType;
    tripExpencesTypePrice: number;
    currentStep: string;
    categories: string[];
    links: string[];
    questions: object;
    location: {
        address: string;
        lat: number;
        lng: number;
    };
    dynamiqueQts: {
        label: string;
        response: string;
    }[];
    images: CompanyImageEntity[];
    settings: SettingEntity[];
    options: OptionEntity[];
    billing: CompanyBillingEntity;
    updatedAt: Date;
    createdAt: Date;
    user: ProviderEntity;
    reservations: ReservationEntity[];
    networks?: string[];
    comments: CommentsEntity[];
    countVotes: number;
    totalNotes: number;
    qualiteService: number;
    countQualiteService: number;
    professionnalisme: number;
    countProfessionnalisme: number;
    flexibilite: number;
    countFlexibilite: number;
    rapportQualitePrix: number;
    countRapportQualitePrix: number;
    securePayment: boolean;
    disponibility: Promise<DisponibilityEntity>;
    favorites: UserFavoriteEntity[];
}
