import { WeddingsRepository } from './weddings.repository';
import { WeddingEntity } from '../entities/wedding.entity';
import { UsersServices } from '../users/users.service';
export declare class WeddingsServices {
    private readonly weddingsRepository;
    private readonly usersServices;
    constructor(weddingsRepository: WeddingsRepository, usersServices: UsersServices);
    createWedding(email: string, wedding: WeddingEntity): Promise<WeddingEntity>;
    findWedding(id: string, email: string): Promise<WeddingEntity>;
    findWeddingByEmail(email: string): Promise<WeddingEntity>;
    patchWedding(id: string, email: string, wedding: Partial<WeddingEntity>): Promise<WeddingEntity>;
}
