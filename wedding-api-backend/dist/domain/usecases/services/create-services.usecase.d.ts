import { Categorie } from '../../entities/categories/categorie.model';
export interface ICreateServices {
    createService(service: Categorie): any;
    searchServices(index: string, type: string, query: string): Promise<any>;
    searchServicesByFileds(index: string, type: string, query: string, fields: string[]): Promise<any>;
}
export declare class CreateServices<T extends ICreateServices> {
    private readonly servicesServices;
    constructor(servicesServices: any);
    createService(service: Categorie): Promise<any>;
}
