import { EntityRepository, Repository } from 'typeorm';
import { CommentsEntity } from '../entities/comments.entity';

@EntityRepository(CommentsEntity)
export class CommentsRepository extends Repository<CommentsEntity> {
	constructor() {
		super();
	}
}
