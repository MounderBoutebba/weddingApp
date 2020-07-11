import { ICreateUser } from '../../../domain/usecases/services/create-user.usecase';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Client, Provider, User } from '../../../domain/entities/user.model';
import { ClientEntity, ProviderEntity, UserEntity } from '../entities';
import { ClientsRepository } from './clients.repository';
import { ProvidersRepository } from './providers.repository';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { customLogger } from '../../../config/logging';
import { VerifiedDto } from '../../../presentation/users/dto/verified.dto';

@Injectable()
export class UsersServices implements ICreateUser {
	public es = new ElasticsearchService();
	constructor(
		@InjectRepository(UsersRepository)
		private readonly usersRepository: UsersRepository,

		@InjectRepository(ClientsRepository)
		private readonly clientsRepository: ClientsRepository,

		@InjectRepository(ProvidersRepository)
		private readonly providersRepository: ProvidersRepository
	) {}
	async createUser(user: User): Promise<User> {
		const newUser = await this.usersRepository.save(user);
		customLogger('UsersServices', {
			action: 'createUser',
			userId: newUser.id
		});
		return newUser;
	}
	async createClient(client: Client): Promise<Client> {
		const newClient = await this.clientsRepository.save(client);
		customLogger('UsersServices', {
			action: 'createClient',
			clientId: newClient.id
		});
		return newClient;
	}
	async createProvider(provider: Provider): Promise<Provider> {
		const newProvider = await this.providersRepository.save(provider);
		customLogger('UsersServices', {
			action: 'createProvider',
			providerId: newProvider.id
		});
		return newProvider;
	}
	async isUserExist(emailExist: string): Promise<boolean> {
		const users = await this.usersRepository.find({
			where: [{ email: emailExist }]
		});
		customLogger('UsersServices', {
			action: 'isUserExist',
			users
		});
		return users.length > 0;
	}

	async isUserExistById(userId: string): Promise<boolean> {
		const users = await this.usersRepository.find({
			where: [{ id: userId }]
		});
		return users.length > 0;
	}

	public async findUserByEmail(email: string): Promise<UserEntity> {
		customLogger('UsersServices', {
			action: 'findUserByEmail',
			userEmail: email
		});
		return await this.usersRepository.findOneOrFail({ email });
	}

	public async getUsers(): Promise<UserEntity[]> {
		const users = await this.usersRepository.findWithCompanyId();
		return users;
	}

	public async delete(user: UserEntity) {
		try {
			await this.es.deleteIndexById('categories', '_doc', user.id);
			// tslint:disable-next-line: no-empty
		} catch (e) {}
		customLogger('UsersServices', {
			action: 'delete',
			userId: user.id
		});
		return this.usersRepository.remove(user);
	}

	public async findClientByEmail(email: string): Promise<ClientEntity> {
		const client = await this.clientsRepository.findOneOrFail({ email });
		customLogger('UsersServices', {
			action: 'findClientByEmail',
			clientEmail: email
		});
		return client;
	}

	public async findProviderByEmail(email: string): Promise<ProviderEntity> {
		try {
			const provider = await this.providersRepository.findOneOrFail({ email });
			customLogger('UsersServices', {
				action: 'findProviderByEmail',
				providerEmail: email
			});
			return provider;
		} catch (e) {
			throw new NotFoundException();
		}
	}

	public async findProvider(id: string): Promise<ProviderEntity> {
		try {
			const provider = await this.providersRepository.findOneOrFail({
				// @ts-ignore
				where: { id },
				relations: ['company']
			});
			customLogger('UsersServices', {
				action: 'findProvider',
				providerId: id
			});
			return provider;
		} catch (e) {
			throw e;
			throw new NotFoundException();
		}
	}

	public async findAllProviders(ids: string[]): Promise<ProviderEntity[]> {
		const providers = await this.providersRepository.findByIds(ids, {
			relations: ['company']
		});
		customLogger('UsersServices', {
			action: 'findAllProviders',
			providers
		});
		return providers;
	}

	public async findUserById(id: string): Promise<UserEntity> {
		const user = await this.usersRepository.findOneOrFail(id);
		customLogger('UsersServices', {
			action: 'findUserById',
			userId: id
		});
		return user;
	}

	async updateUser(email: string, user: Partial<UserEntity>): Promise<UserEntity> {
		if (!!user.firstname) {
			user.firstname = user.firstname.charAt(0).toUpperCase() + user.firstname.substr(1).toLowerCase();
		}

		if (!!user.lastname) {
			user.lastname = user.lastname.charAt(0).toUpperCase() + user.lastname.substr(1).toLowerCase();
		}
		await this.usersRepository.update({ email }, user);
		customLogger('UsersServices', {
			action: 'updateUser',
			userEmail: email
		});
		return await this.findUserByEmail(email);
	}

	async updateClient(email: string, client: Partial<ClientEntity>): Promise<ClientEntity> {
		await this.usersRepository.update({ email }, client);
		customLogger('UsersServices', {
			action: 'updateClient',
			clientEmail: email
		});
		return this.findClientByEmail(email);
	}

	public async markProviderAsVerified(provider: ProviderEntity, data: VerifiedDto) {
		provider.verifiedProvider = data.verifiedProvider;
		provider = await this.providersRepository.save(provider);
		await this.es.updateIndexById('categories', '_doc', provider.id, {
			verifiedProvider: provider.verifiedProvider
		});
		return provider;
	}
}
