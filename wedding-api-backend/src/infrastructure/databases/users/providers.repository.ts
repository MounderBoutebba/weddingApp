import { EntityRepository, Repository } from 'typeorm';
import { ProviderEntity } from '../entities';

@EntityRepository(ProviderEntity)
export class ProvidersRepository extends Repository<ProviderEntity> {
	constructor() {
		super();
	}
}
