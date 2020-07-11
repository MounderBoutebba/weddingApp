import { User, Client, Provider } from '../../entities/user.model';
export interface ICreateUser {
    createUser(user: User): Promise<User>;
    createClient(client: Client): Promise<Client>;
    createProvider(provider: Provider): Promise<Provider>;
    isUserExist(email: string): Promise<boolean>;
    isUserExistById(userid: string): Promise<boolean>;
}
export declare class CreateUser<T extends ICreateUser> {
    private readonly userService;
    constructor(userService: T);
    createUser(user: User): Promise<User>;
    createClient(client: Client): Promise<Client>;
    createProvider(provider: Provider): Promise<Provider | User>;
    getUserInfo(): User;
}
