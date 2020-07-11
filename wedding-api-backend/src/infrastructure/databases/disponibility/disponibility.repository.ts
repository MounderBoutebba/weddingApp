import { EntityRepository, Repository } from 'typeorm';
import { DisponibilityEntity } from '../entities/disponibility.entity';

@EntityRepository(DisponibilityEntity)
export class DisponibilityRepository extends Repository<DisponibilityEntity> {
	constructor() {
		super();
	}
}
