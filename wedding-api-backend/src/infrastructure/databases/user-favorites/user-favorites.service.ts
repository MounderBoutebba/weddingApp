import { Injectable } from '@nestjs/common';
import { UserFavoritesRepository } from './user-favorites.repository';
import { UserFavoriteEntity } from '../entities';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserFavoritesServices {

	constructor(private readonly userFavoritesRepository:UserFavoritesRepository){

	}


	public async save(data:any){
		return await this.userFavoritesRepository.save(data);
	}

	public async find(data){
		return this.userFavoritesRepository.findOneOrFail(data);
	}

	public async deleteByUserEmailAndCompanyId(favorite: UserFavoriteEntity) {
		return this.userFavoritesRepository.remove(favorite);
	}

	public async findAll(page:number, data){
		return await paginate<UserFavoriteEntity>(
			this.userFavoritesRepository,
			{limit:10, page},
			{where:data}
			);
	}


}
