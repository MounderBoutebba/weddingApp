import { ServicesService } from './services.service';
import { Provider } from '../../domain/entities/user.model';
import { Categorie } from 'src/domain/entities/categories/categorie.model';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    createService(service: any): Promise<any>;
    findByCategorieType(categorielabel: any, q: string, res: any): Promise<Provider[]>;
    getAll(q: string, res: any): Promise<Provider[]>;
    findByUserId(categorielabel: any, email: any, res: any): Promise<Provider[]>;
    findByUserIdForReservation(categorielabel: any, email: any, res: any): Promise<Provider[]>;
    deleteService(categorielabel: any, email: any, res: any, req: any): Promise<any>;
    updateService(categorielabel: any, email: any, categorie: Categorie, res: any, req: any): Promise<any>;
    searchCategorieType(searchQuery: any, page: number, res: any, req: any): Promise<Provider[]>;
}
