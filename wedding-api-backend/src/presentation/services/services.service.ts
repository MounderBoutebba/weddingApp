import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Provider } from '../../domain/entities/user.model';
import { FindServices } from '../../domain/usecases/services/find-services.usecase';
import { ServicesRepository } from '../../infrastructure/databases/services/services.repository';
import { ElasticsearchService } from '../../infrastructure/databases/elasticsearch/elasticsearch.service';
import { Categorie } from '../../domain/entities/categories/categorie.model';
import { CreateServices } from '../../domain/usecases/services/create-services.usecase';
import { UsersServices } from '../../infrastructure/databases/users/users.service';
import { CompanyService } from '../company/company.service';
import { UserFavoritesService } from '../user-favorites/user-favorites.service';

@Injectable()
export class ServicesService {
	private readonly findServicesUsecase: FindServices<ServicesRepository>;
	private readonly createServicesUsecase: CreateServices<ServicesRepository>;

	constructor(
		private elasticsearchService: ElasticsearchService,
		private readonly usersService: UsersServices,
		private readonly favoritesService: UserFavoritesService,
		@Inject(forwardRef(() => CompanyService)) private readonly companyService: CompanyService
	) {
		this.findServicesUsecase = new FindServices(new ServicesRepository(this.elasticsearchService));
		this.createServicesUsecase = new CreateServices(new ServicesRepository(this.elasticsearchService));
	}

	findAll(): Provider[] {
		return this.findServicesUsecase.findServices();
	}

	findByCategorie(categorie: string): Provider[] {
		return this.findServicesUsecase.findServicesByCategorie(categorie);
	}
	async createService(categorie: Categorie) {
		return await this.createServicesUsecase.createService(categorie);
	}

	public async searchServices(index: string, type: string, query: string) {
		let searchedService;
		if (!type) {
			searchedService = await this.findServicesUsecase.searchServices(index, null, query);
		} else {
			searchedService = await this.findServicesUsecase.searchQuery(type, [['categories', type]]);
			searchedService = searchedService.hits.hits;
		}
		return await Promise.all(
			searchedService.map(async res => {
				const s = await this.usersService.findProvider(res._source.userid);
				const company = await s.company;
				delete s['__company__'];
				return { ...s, company, criteres: res._source.criteres, categories: res._source.categories };
			})
		);
	}

	public async searchServicesByFields(index: string, type: string, query: string, fields: string[]) {
		const user = await this.usersService.findProviderByEmail(query);
		const searchedService = await this.findServicesUsecase.searchQuery(type, [
			['userid', user.id],
			['categories', type]
		]);
		return await Promise.all(
			searchedService.hits.hits.map(async res => {
				const s = await this.usersService.findProvider(res._source.userid);
				const company = await this.companyService.findCompanyByUserId(s.id);
				delete s['__company__'];
				return { ...s, company, criteres: res._source.criteres, categories: res._source.categories };
			})
		);
	}

	async deleteServices(index: string, type: string, email: string) {
		try {
			const user = await this.usersService.findProviderByEmail(email);
			return await this.findServicesUsecase.deleteServicesByUserId(index, type, user.id);
		} catch (err) {
			throw new NotFoundException(err.message);
		}
	}

	async updateServiceByUserId(index: string, type: string, email: string, categorie: any) {
		try {
			const user = await this.usersService.findProviderByEmail(email);
			// @ts-ignore
			if (!!categorie.categories && categorie.categories.length > 0) {
				const comp = await user.company;
				const set = new Set(comp.categories);
				categorie.categories.map(elem => {
					set.add(elem);
				});
				categorie.categories = [...set];
				// @ts-ignore
				const patchCategories = await this.companyService.patchCategories(comp.id, {
					categories: categorie.categories
				});
			}
			const findServicesUsecase = await this.findServicesUsecase.updateServicesByUserId(
				index,
				type,
				user.id,
				categorie
			);
			const searchServicesByFields = await this.searchServicesByFields(index, type, email, ['userid']);
			return searchServicesByFields;
		} catch (err) {
			throw new NotFoundException(err.message);
		}
	}

	public async searchCategory(type: string, query: any, page: number = 0, header: string) {
		const obj = Object.entries(query).map(([key, value]) => {
			if (key === 'address') {
				return ['locationFilter', { geo_bounding_box: { 'location.geo': value } }];
			} else if (key === 'topRatedProviders') {
				return ['topRatedProviders', { range: { totalNotes: { gte: 3 } } }];
			} else if (key === 'verifiedProvider') {
				return ['verifiedProvider', { match: { verifiedProvider: value } }];
			} else if (key === 'securePayment') {
				return ['securePayment', { match: { securePayment: value } }];
			} else if (key === 'terms') {
				return [key, value];
			} else if (Array.isArray(value)) {
				if (typeof value[0] === 'object') {
					const re = value.map(v => {
						return { range: { [`criteres.${key}`]: v } };
					});
					return ['ranges', re];
				} else if (key === 'categories') {
					return [`${key}`, value.join(' ')];
				} else {
					return [`criteres.${key}`, value.join(' ')];
				}
			} else if (this.isJson(value) && typeof value !== 'boolean') {
				return ['rangeMust', { [`criteres.${key}`]: JSON.parse(value as string) }];
			} else {
				return [`criteres.${key}`, value];
			}
		});
		const result = await this.findServicesUsecase.searchQuery(type, obj, page);
		let currentUser;

		if (!!header) {
			try {
				currentUser = await this.usersService.findUserByEmail(header);
			} catch (e) {
				currentUser = null;
			}
		}
		const data = await Promise.all(
			result.hits.hits.map(async res => {
				const userId = res._source.userid;
				const s = await this.usersService.findProvider(userId);
				const company = await this.companyService.findCompanyByUserId(userId);
				if (!!currentUser) {
					try {
						const favorite = await this.favoritesService.find({
							user:{id:currentUser?.id},
							company: {id:company.id}
						});
						s['favorite'] = !!favorite;
					} catch (e) {
						s['favorite'] = false;
					}
				}
				delete s['__company__'];
				return { ...s, company, criteres: res._source.criteres, categories: res._source.categories };
			})
		);
		return { data, total: result.hits.total.value };
	}

	private isJson(str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}
}
