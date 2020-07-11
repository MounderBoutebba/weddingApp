import { WeddingEntity } from '../../infrastructure/databases/entities';
import { WeddingsServices } from '../../infrastructure/databases/weddings/weddings.service';
import { ConfigService } from '../config/config-service';
export declare class WeddingsService {
    private readonly weddingsService;
    private readonly configService;
    private readonly twilio;
    constructor(weddingsService: WeddingsServices, configService: ConfigService);
    patchWedding(id: string, email: string, wedding: Partial<WeddingEntity>): Promise<WeddingEntity>;
    createWedding(email: any, wedding: WeddingEntity): Promise<WeddingEntity>;
    findWedding(id: string, email: string): Promise<WeddingEntity>;
    findWeddingByEmail(email: any): Promise<WeddingEntity>;
}
