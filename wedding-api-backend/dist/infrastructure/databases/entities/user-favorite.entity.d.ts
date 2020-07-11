import { UserEntity } from './user.entity';
import { CompanyEntity } from './company.entity';
export declare class UserFavoriteEntity {
    id: string;
    updatedAt: Date;
    createdAt: Date;
    company: CompanyEntity;
    user: UserEntity;
}
