import { EntityRepository, Repository } from 'typeorm';
import { OptionEntity } from '../../entities';

@EntityRepository(OptionEntity)
export class OptionRepository extends Repository<OptionEntity> {
	constructor() {
		super();
	}

}
