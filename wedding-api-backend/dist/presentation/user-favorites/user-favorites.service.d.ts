import { UserFavoritesServices } from '../../infrastructure/databases/user-favorites/user-favorites.service';
import { CompanyService } from '../company/company.service';
import { UsersService } from '../users/users.service';
import { ClientEntity, UserEntity, UserFavoriteEntity } from '../../infrastructure/databases/entities';
import { ElasticsearchService } from '../../infrastructure/databases/elasticsearch/elasticsearch.service';
export declare class UserFavoritesService {
    private readonly userFavoritesServices;
    private readonly companyService;
    private readonly elasticsearchService;
    private readonly usersService;
    constructor(userFavoritesServices: UserFavoritesServices, companyService: CompanyService, elasticsearchService: ElasticsearchService, usersService: UsersService);
    addFavorite(email: string, data: any, user: ClientEntity): Promise<any>;
    deleteFavorite(userId: string, companyId: string): Promise<UserFavoriteEntity>;
    findAll(page: number, data: any): Promise<import("nestjs-typeorm-paginate").Pagination<UserFavoriteEntity>>;
    find(data: any): Promise<UserFavoriteEntity>;
    getAllFavorites(page: number, user: UserEntity): Promise<import("nestjs-typeorm-paginate").Pagination<UserFavoriteEntity>>;
}
