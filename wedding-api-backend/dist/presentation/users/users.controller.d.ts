import { Client, Provider } from '../../domain/entities/user.model';
import { UsersService } from './users.service';
import { UserEntity } from '../../infrastructure/databases/entities';
import { GcpFileService } from '../../global/services/gcp-file/gcp-file.service';
import { VerifiedDto } from './dto/verified.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly gcpFileService;
    constructor(usersService: UsersService, gcpFileService: GcpFileService);
    findUserByEmail(email: string, res: any): Promise<any>;
    getUsers(res: any): Promise<any>;
    changePhoto(photo: any, email: string, res: any, req: any): Promise<any>;
    patchUser(email: any, user: Partial<UserEntity>, res: any, req: any): Promise<any>;
    marqueUserAsVerified(email: any, user: VerifiedDto, req: any): Promise<import("../../infrastructure/databases/entities").ProviderEntity>;
    patchUserLastConnexion(email: any, user: Partial<UserEntity>, res: any, req: any): Promise<any>;
    createUser(user: UserEntity, res: any): Promise<any>;
    createClient(client: Client, res: any): Promise<any>;
    createProvider(provider: Provider, res: any): Promise<any>;
    delete(email: any, res: any, req: any): Promise<any>;
}
