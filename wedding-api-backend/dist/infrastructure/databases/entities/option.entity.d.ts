import { CompanyEntity } from './company.entity';
export declare enum FeeType {
    SINGLE_FEE = "Frais unique",
    UNIT_FEE = "Frais par unit\u00E9",
    GUEST_FEE = "Frais par invit\u00E9"
}
export declare class OptionEntity {
    id: string;
    name: string;
    description: string;
    optionRate: number;
    categories: string[];
    feeType: FeeType;
    updatedAt: Date;
    createdAt: Date;
    company: CompanyEntity;
}
