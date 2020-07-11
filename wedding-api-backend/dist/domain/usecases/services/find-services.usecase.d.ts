import { Provider } from '../../../domain/entities/user.model';
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
export declare class FindServices<T extends IFindServices> {
    private readonly providerService;
    constructor(providerService: T);
    findServices(): Provider[];
    findServicesByCategorie(categorie: string): Provider[];
    searchServices(index: string, type: string, queryService: string): Promise<any>;
    searchServicesByFileds(index: string, type: string, queryService: string, fileds: string[]): Promise<any>;
    deleteServicesByUserId(index: string, type: string, id: string): Promise<any>;
    updateServicesByUserId(index: string, type: string, id: string, categorie: Categorie): Promise<any>;
    searchQuery(type: string, query: any, page?: number): Promise<any>;
}
