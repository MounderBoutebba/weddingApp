import { EntityRepository, Repository } from 'typeorm';
import { CompanyBillingEntity } from '../../entities';

@EntityRepository(CompanyBillingEntity)
export class BillingRepository extends Repository<CompanyBillingEntity> {
	constructor() {
		super();
	}

}
