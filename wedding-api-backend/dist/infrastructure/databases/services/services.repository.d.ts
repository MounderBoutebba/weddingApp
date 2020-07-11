import { IFindServices } from '../../../domain/usecases/services/find-services.usecase';
import { Provider } from '../../../domain/entities/user.model';
import { Categorie } from '../../../domain/entities/categories/categorie.model';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { ICreateServices } from '../../../domain/usecases/services/create-services.usecase';
export declare class ServicesRepository implements IFindServices, ICreateServices {
    private elasticsearchService;
    constructor(elasticsearchService: ElasticsearchService);
    findServices(): Provider[];
    findServicesByCategorie(categorie: string): Provider[];
    findServicesByCategorieAndPrice(categorie: string, minPrice: number, maxPrice: number): Provider[];
    createService(categorie: Categorie): Promise<any>;
    searchServices(index: string, type: string, query: string): Promise<any>;
    searchServicesByFileds(index: string, type: string, query: string, fileds: string[]): Promise<any>;
    deleteServicesByIndexId(index: string, type: string, id: string): Promise<any>;
    updateServiceByIndexId(index: string, type: string, id: string, categorie: Categorie): Promise<any>;
    searchByQuery(type: string, query: any, page?: number): Promise<import("elasticsearch").SearchResponse<unknown>>;
}
