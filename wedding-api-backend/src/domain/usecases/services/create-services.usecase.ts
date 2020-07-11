import { Categorie } from '../../entities/categories/categorie.model';
import { ServiceException } from '../../exceptions/service.exceptions';

export interface ICreateServices {
	createService(service: Categorie): any;
	searchServices(index: string, type: string, query: string): Promise<any>;
	searchServicesByFileds(index: string, type: string, query: string, fields: string[]): Promise<any>;
}

export class CreateServices<T extends ICreateServices> {
	constructor(private readonly servicesServices) {}
	async createService(service: Categorie): Promise<any> {
		const query = service.userid;
		let createService;
		try {
			const searchServiceLabelByUserId = await this.servicesServices.searchServicesByFileds(
				service.label,
				query,
				['userid']
			);
			if (searchServiceLabelByUserId.length > 0) {
				throw new ServiceException('service already exist for user');
			}
		} catch (err) {
			if (err instanceof ServiceException) {
				throw new ServiceException('service alerady exist for user');
			} else {
				createService = await this.servicesServices.createService(service);
			}
		}
		createService = await this.servicesServices.createService(service);
		return createService;
	}
}
