import { Injectable } from '@nestjs/common';
import { IFindServices } from '../../../domain/usecases/services/find-services.usecase';
import { Provider } from '../../../domain/entities/user.model';
import { Categorie } from '../../../domain/entities/categories/categorie.model';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { ICreateServices } from '../../../domain/usecases/services/create-services.usecase';

@Injectable()
export class ServicesRepository implements IFindServices, ICreateServices {
	constructor(private elasticsearchService: ElasticsearchService) {}
	/**
	 * TO DO :
	 * CALL DATABASE
	 */

	findServices(): Provider[] {
		const providers = [];

		return providers;
	}

	findServicesByCategorie(categorie: string): Provider[] {
		const providers = [];

		return providers;
	}

	findServicesByCategorieAndPrice(categorie: string, minPrice: number, maxPrice: number): Provider[] {
		const providers = [];
		return providers;
	}

	async createService(categorie: Categorie): Promise<any> {
		const elasticInsertion = {
			index: 'categories',
			type: 'users',
			dataToStore: categorie
		};

		const elasticCreated = await this.elasticsearchService.bulkInsert(
			elasticInsertion.index,
			elasticInsertion.type,
			elasticInsertion.dataToStore
		);

		return elasticCreated;
	}

	async searchServices(index: string, type: string, query: string): Promise<any> {
		return await this.elasticsearchService.searchIndex(index, type, query);
	}

	async searchServicesByFileds(index: string, type: string, query: string, fileds: string[]): Promise<any> {
		return await this.elasticsearchService.searchIndexByFileds(index, type, query, fileds);
	}
	async deleteServicesByIndexId(index: string, type: string, id: string): Promise<any> {
		return await this.elasticsearchService.deleteIndexById(index, type, id);
	}

	async updateServiceByIndexId(index: string, type: string, id: string, categorie: Categorie): Promise<any> {
		return await this.elasticsearchService.updateIndexById(index, type, id, categorie);
	}

	async searchByQuery(type: string, query: any, page: number = 0) {
		return await this.elasticsearchService.searchByQuery(type, query, page);
	}
}
