import { PaiementEntity } from '../entities/paiement.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PaiementEntity)
export class PaiementsRepository extends Repository<PaiementEntity> {
	constructor() {
		super();
	}
}
