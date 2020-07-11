import { UserEntity } from './user.entity';
export declare class PaiementEntity {
    id: string;
    customerId: string;
    accountId: string;
    bankAccountId: string;
    user: UserEntity;
}
