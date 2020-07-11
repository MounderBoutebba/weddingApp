import {EntityRepository, Repository} from 'typeorm';
import {UserEntity} from '../entities';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
	constructor() {
		super();
	}

	findWithCompanyId() {
		return this.createQueryBuilder('user').leftJoinAndSelect('user.company', 'company.id').getMany();
	}

}
