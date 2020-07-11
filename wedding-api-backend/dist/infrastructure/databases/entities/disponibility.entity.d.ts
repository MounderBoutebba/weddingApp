import { CompanyEntity } from './company.entity';
export declare enum DiponibilityType {
    RESERVED = "reserved",
    ABSENT = "absent"
}
export declare class DisponibilityEntity {
    id: string;
    private updatedAt;
    private createdAt;
    type: DiponibilityType;
    start: Date;
    end: Date;
    company: Promise<CompanyEntity>;
}
