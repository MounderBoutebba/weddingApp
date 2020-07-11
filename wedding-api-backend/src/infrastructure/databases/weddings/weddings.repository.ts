import {EntityRepository, Repository} from 'typeorm';
import {WeddingEntity} from '../entities/wedding.entity';

@EntityRepository(WeddingEntity)
export class WeddingsRepository extends Repository<WeddingEntity> {
	constructor() {
		super();
	}

}
