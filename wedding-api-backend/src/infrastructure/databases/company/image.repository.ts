import { EntityRepository, Repository } from 'typeorm';
import { CompanyImageEntity } from '../entities';

@EntityRepository(CompanyImageEntity)
export class ImageRepository extends Repository<CompanyImageEntity> {
	constructor() {
		super();
	}
}
