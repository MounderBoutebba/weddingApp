import { ClientEntity } from '../entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ClientEntity)
export class ClientsRepository extends Repository<ClientEntity> {
	constructor() {
		super();
	}
}
