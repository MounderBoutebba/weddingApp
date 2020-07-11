import { InvoiceEntity } from '../entities/invoice.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(InvoiceEntity)
export class InvoicesRepository extends Repository<InvoiceEntity> {
	constructor() {
		super();
	}
}
