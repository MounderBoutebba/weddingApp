import { EntityRepository, Repository } from 'typeorm';
import { ReservationEntity } from '../entities/reservation.entity';

@EntityRepository(ReservationEntity)
export class ReservationRepository extends Repository<ReservationEntity> {
	constructor() {
		super();
	}
}
