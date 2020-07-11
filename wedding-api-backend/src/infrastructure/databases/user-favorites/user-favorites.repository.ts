import { EntityRepository, Repository } from 'typeorm';
import { UserFavoriteEntity } from '../entities';

@EntityRepository(UserFavoriteEntity)
export class UserFavoritesRepository extends Repository<UserFavoriteEntity> {

	constructor() {
		super();
	}


}
