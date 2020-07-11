import { EntityRepository, Repository } from 'typeorm';
import { SettingEntity } from '../../entities';

@EntityRepository(SettingEntity)
export class SettingRepository extends Repository<SettingEntity> {
	constructor() {
		super();
	}

}
