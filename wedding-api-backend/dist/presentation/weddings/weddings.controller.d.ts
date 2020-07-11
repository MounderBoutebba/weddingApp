import { WeddingEntity } from '../../infrastructure/databases/entities';
import { WeddingsService } from './weddings.service';
export declare class WeddingsController {
    private readonly weddingService;
    constructor(weddingService: WeddingsService);
    patchWedding(email: any, id: any, wedding: Partial<WeddingEntity>, res: any, req: any): Promise<any>;
    getWedding(email: any, id: any, res: any, req: any): Promise<any>;
    getWeddingByEmail(email: any, res: any, req: any): Promise<any>;
    createWedding(email: any, wedding: WeddingEntity, res: any, req: any): Promise<any>;
}
