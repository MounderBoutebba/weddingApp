import { CompanyEntity } from './company.entity';
export declare class CompanyImageEntity {
    id: string;
    name: string;
    description: string;
    path: string;
    updatedAt: Date;
    createdAt: Date;
    favorite: boolean;
    company: CompanyEntity;
    removeImageFromDisk(): Promise<void>;
}
