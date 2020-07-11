import { EntityRepository, Repository } from 'typeorm';
import { CommentsResponseEntity } from '../entities/commentsResponse.entity';

@EntityRepository(CommentsResponseEntity)
export class CommentsResponseRepository extends Repository<CommentsResponseEntity> {
	constructor() {
		super();
	}
}
