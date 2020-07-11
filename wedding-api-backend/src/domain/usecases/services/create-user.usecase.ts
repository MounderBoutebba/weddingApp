import { User, Client, Provider } from '../../entities/user.model';
import { UserException } from '../../exceptions/users.exception';
import { customLogger } from '../../../config/logging';

export interface ICreateUser {
	createUser(user: User): Promise<User>;
	createClient(client: Client): Promise<Client>;
	createProvider(provider: Provider): Promise<Provider>;
	isUserExist(email: string): Promise<boolean>;
	isUserExistById(userid: string): Promise<boolean>;
}

export class CreateUser<T extends ICreateUser> {
	constructor(private readonly userService: T) {}
	async createUser(user: User): Promise<User> {
		const isUserExist = await this.userService.isUserExist(user.email);
		if (isUserExist) {
			throw new UserException('User already exist');
		} else {
			return this.userService.createUser(user);
		}
	}

	async createClient(client: Client): Promise<Client> {
		const isUserExist = await this.userService.isUserExist(client.email);
		if (isUserExist) {
			throw new UserException('Client already exist');
		} else {
			return await this.userService.createClient(client);
		}
	}

	async createProvider(provider: Provider): Promise<Provider | User> {
		const isUserExist = await this.userService.isUserExist(provider.email);
		if (isUserExist) {
			throw new Error('provider alerady exist');
		} else {
			const providerCreated = await this.userService.createUser(provider);
			customLogger('Create User', {
				action: 'providerCreated',
				provider: providerCreated
			});
			return await this.userService.createProvider(provider);
		}
	}

	getUserInfo(): User {
		return null;
	}
}
