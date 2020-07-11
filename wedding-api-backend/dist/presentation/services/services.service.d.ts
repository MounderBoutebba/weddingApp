import { Provider } from '../../domain/entities/user.model';
import { ElasticsearchService } from '../../infrastructure/databases/elasticsearch/elasticsearch.service';
import { Categorie } from '../../domain/entities/categories/categorie.model';
import { UsersServices } from '../../infrastructure/databases/users/users.service';
import { CompanyService } from '../company/company.service';
import { UserFavoritesService } from '../user-favorites/user-favorites.service';
export declare class ServicesService {
    private elasticsearchService;
    private readonly usersService;
    private readonly favoritesService;
    private readonly companyService;
    private readonly findServicesUsecase;
    private readonly createServicesUsecase;
    constructor(elasticsearchService: ElasticsearchService, usersService: UsersServices, favoritesService: UserFavoritesService, companyService: CompanyService);
    findAll(): Provider[];
    findByCategorie(categorie: string): Provider[];
    createService(categorie: Categorie): Promise<any>;
    searchServices(index: string, type: string, query: string): Promise<[unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown]>;
    searchServicesByFields(index: string, type: string, query: string, fields: string[]): Promise<[unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown]>;
    deleteServices(index: string, type: string, email: string): Promise<any>;
    updateServiceByUserId(index: string, type: string, email: string, categorie: any): Promise<[unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown]>;
    searchCategory(type: string, query: any, page: number, header: string): Promise<{
        data: [unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown];
        total: any;
    }>;
    private isJson;
}
