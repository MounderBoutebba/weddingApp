import { Repository } from 'typeorm';
import { UserEntity } from '../entities';
export declare class UsersRepository extends Repository<UserEntity> {
    constructor();
    findWithCompanyId(): Promise<UserEntity[]>;
}
