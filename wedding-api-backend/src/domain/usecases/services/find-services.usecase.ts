import { Provider } from '../../../domain/entities/user.model';
import { ServiceException } from '../../../domain/exceptions/service.exceptions';
import { Categorie } from '../../../domain/entities/categories/categorie.model';

export interface IFindServices {
	findServices(): Provider[];
	findServicesByCategorie(categorie: string): Provider[];
	findServicesByCategorieAndPrice(categorie: string, minPrice: number, maxPrice: number): Provider[];
	searchServices(index: string, type: string, queryService: string): any;
	searchServicesByFileds(index: string, type: string, queryService: string, fileds: string[]): any;
	deleteServicesByIndexId(index: string, type: string, id: string): Promise<any>;
	updateServiceByIndexId(index: string, type: string, id: string, categorie: Categorie): Promise<any>;
	searchByQuery(type: string, query: any, page?: number): Promise<any>;
}

export class FindServices<T extends IFindServices> {
	constructor(private readonly providerService: T) {}

	findServices(): Provider[] {
		return this.providerService.findServices();
	}

	findServicesByCategorie(categorie: string): Provider[] {
		return this.providerService.findServicesByCategorie(categorie);
	}

	async searchServices(index: string, type: string, queryService: string) {
		return await this.providerService.searchServices(index, type, queryService);
	}

	async searchServicesByFileds(index: string, type: string, queryService: string, fileds: string[]) {
		return await this.providerService.searchServicesByFileds(index, type, queryService, fileds);
	}
	async deleteServicesByUserId(index: string, type: string, id: string) {
		try {
			return await this.providerService.deleteServicesByIndexId(index, type, id);
		} catch (err) {
			throw new ServiceException('service not found for user');
		}
	}

	async updateServicesByUserId(index: string, type: string, id: string, categorie: Categorie): Promise<any> {
		try {
			return await this.providerService.updateServiceByIndexId(index, type, id, categorie);
		} catch (e) {
			throw new ServiceException(e.message);
		}
	}

	async searchQuery(type: string, query: any, page: number = 0): Promise<any> {

		try {
			return await this.providerService.searchByQuery(type, query, page);
		} catch (e) {
			throw new ServiceException(e.message);
		}
	}
}
