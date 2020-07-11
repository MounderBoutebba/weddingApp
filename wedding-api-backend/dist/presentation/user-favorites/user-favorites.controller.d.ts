import { UserFavoritesService } from './user-favorites.service';
export declare class UserFavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: UserFavoritesService);
    createFavorite(email: string, data: unknown, res: any, req: any): Promise<any>;
    getFavorites(email: string, page: number, number: any, res: any, req: any): Promise<any>;
    deleteFavorite(email: string, companyId: any, res: any, req: any): Promise<any>;
}
