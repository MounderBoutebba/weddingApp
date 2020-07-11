import { CompanyEntity } from './company.entity';
export declare class SettingEntity {
    id: string;
    periodStartDate: Date;
    periodEndDate: Date;
    increaseWeek: number;
    increaseWeekend: number;
    autoApplication: boolean;
    updatedAt: Date;
    createdAt: Date;
    company: CompanyEntity;
}
