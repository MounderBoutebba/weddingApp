import { EntityRepository, Repository } from 'typeorm';
import { NotificationsEntity } from '../entities/notifications.entity';

@EntityRepository(NotificationsEntity)
export class NotificationsRepository extends Repository<NotificationsEntity> {
	constructor() {
		super();
	}
}
