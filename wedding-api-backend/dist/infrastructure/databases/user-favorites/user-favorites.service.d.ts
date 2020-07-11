import { UserFavoritesRepository } from './user-favorites.repository';
import { UserFavoriteEntity } from '../entities';
export declare class UserFavoritesServices {
    private readonly userFavoritesRepository;
    constructor(userFavoritesRepository: UserFavoritesRepository);
    save(data: any): Promise<any>;
    find(data: any): Promise<UserFavoriteEntity>;
    deleteByUserEmailAndCompanyId(favorite: UserFavoriteEntity): Promise<UserFavoriteEntity>;
    findAll(page: number, data: any): Promise<import("nestjs-typeorm-paginate").Pagination<UserFavoriteEntity>>;
}
