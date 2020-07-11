import { Injectable } from '@nestjs/common';
import { UserFavoritesServices } from '../../infrastructure/databases/user-favorites/user-favorites.service';
import { CompanyService } from '../company/company.service';
import { UsersService } from '../users/users.service';
import { ClientEntity, UserEntity, UserFavoriteEntity } from '../../infrastructure/databases/entities';
import { ElasticsearchService } from '../../infrastructure/databases/elasticsearch/elasticsearch.service';

@Injectable()
export class UserFavoritesService {


	constructor(private readonly userFavoritesServices:UserFavoritesServices,
				private readonly companyService: CompanyService,
				private readonly elasticsearchService:ElasticsearchService,
				private readonly usersService: UsersService) {}

	public async addFavorite(email: string, data: any, user: ClientEntity) {
		const favorite = new UserFavoriteEntity();
		favorite.user = user;
		const company = await this.companyService.findCompany(data.companyId, data.companyEmail);
		favorite.company = company;

		return await this.userFavoritesServices.save(favorite);
	}

	public async deleteFavorite(userId: string, companyId: string) {
		const favorite = await this.userFavoritesServices.find({ user:{id:userId}, company:{id:companyId} });
		return await this.userFavoritesServices.deleteByUserEmailAndCompanyId(favorite);
	}

	public async findAll(page:number, data: any) {
		const res= await this.userFavoritesServices.findAll(page,data);
		// @ts-ignore
		res.items=await Promise.all(res.items.map(async (result)=>{
			const temp= await this.elasticsearchService.findById('categories','_doc',result.company.user.id);
			// @ts-ignore
			result.criteres=temp._source.criteres;
			return result;
		}));
		return res;
	}

	public async find(data) {
		return this.userFavoritesServices.find(data);
	}

	public async getAllFavorites(page: number, user: UserEntity) {
		return this.findAll(page,{ userId: user.id });

	}

}
