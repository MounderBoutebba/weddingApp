"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const typeorm_1 = require("@nestjs/typeorm");
const clients_repository_1 = require("./clients.repository");
const providers_repository_1 = require("./providers.repository");
const elasticsearch_service_1 = require("../elasticsearch/elasticsearch.service");
const logging_1 = require("../../../config/logging");
let UsersServices = class UsersServices {
    constructor(usersRepository, clientsRepository, providersRepository) {
        this.usersRepository = usersRepository;
        this.clientsRepository = clientsRepository;
        this.providersRepository = providersRepository;
        this.es = new elasticsearch_service_1.ElasticsearchService();
    }
    async createUser(user) {
        const newUser = await this.usersRepository.save(user);
        logging_1.customLogger('UsersServices', {
            action: 'createUser',
            userId: newUser.id
        });
        return newUser;
    }
    async createClient(client) {
        const newClient = await this.clientsRepository.save(client);
        logging_1.customLogger('UsersServices', {
            action: 'createClient',
            clientId: newClient.id
        });
        return newClient;
    }
    async createProvider(provider) {
        const newProvider = await this.providersRepository.save(provider);
        logging_1.customLogger('UsersServices', {
            action: 'createProvider',
            providerId: newProvider.id
        });
        return newProvider;
    }
    async isUserExist(emailExist) {
        const users = await this.usersRepository.find({
            where: [{ email: emailExist }]
        });
        logging_1.customLogger('UsersServices', {
            action: 'isUserExist',
            users
        });
        return users.length > 0;
    }
    async isUserExistById(userId) {
        const users = await this.usersRepository.find({
            where: [{ id: userId }]
        });
        return users.length > 0;
    }
    async findUserByEmail(email) {
        logging_1.customLogger('UsersServices', {
            action: 'findUserByEmail',
            userEmail: email
        });
        return await this.usersRepository.findOneOrFail({ email });
    }
    async getUsers() {
        const users = await this.usersRepository.findWithCompanyId();
        return users;
    }
    async delete(user) {
        try {
            await this.es.deleteIndexById('categories', '_doc', user.id);
        }
        catch (e) { }
        logging_1.customLogger('UsersServices', {
            action: 'delete',
            userId: user.id
        });
        return this.usersRepository.remove(user);
    }
    async findClientByEmail(email) {
        const client = await this.clientsRepository.findOneOrFail({ email });
        logging_1.customLogger('UsersServices', {
            action: 'findClientByEmail',
            clientEmail: email
        });
        return client;
    }
    async findProviderByEmail(email) {
        try {
            const provider = await this.providersRepository.findOneOrFail({ email });
            logging_1.customLogger('UsersServices', {
                action: 'findProviderByEmail',
                providerEmail: email
            });
            return provider;
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async findProvider(id) {
        try {
            const provider = await this.providersRepository.findOneOrFail({
                where: { id },
                relations: ['company']
            });
            logging_1.customLogger('UsersServices', {
                action: 'findProvider',
                providerId: id
            });
            return provider;
        }
        catch (e) {
            throw e;
            throw new common_1.NotFoundException();
        }
    }
    async findAllProviders(ids) {
        const providers = await this.providersRepository.findByIds(ids, {
            relations: ['company']
        });
        logging_1.customLogger('UsersServices', {
            action: 'findAllProviders',
            providers
        });
        return providers;
    }
    async findUserById(id) {
        const user = await this.usersRepository.findOneOrFail(id);
        logging_1.customLogger('UsersServices', {
            action: 'findUserById',
            userId: id
        });
        return user;
    }
    async updateUser(email, user) {
        if (!!user.firstname) {
            user.firstname = user.firstname.charAt(0).toUpperCase() + user.firstname.substr(1).toLowerCase();
        }
        if (!!user.lastname) {
            user.lastname = user.lastname.charAt(0).toUpperCase() + user.lastname.substr(1).toLowerCase();
        }
        await this.usersRepository.update({ email }, user);
        logging_1.customLogger('UsersServices', {
            action: 'updateUser',
            userEmail: email
        });
        return await this.findUserByEmail(email);
    }
    async updateClient(email, client) {
        await this.usersRepository.update({ email }, client);
        logging_1.customLogger('UsersServices', {
            action: 'updateClient',
            clientEmail: email
        });
        return this.findClientByEmail(email);
    }
    async markProviderAsVerified(provider, data) {
        provider.verifiedProvider = data.verifiedProvider;
        provider = await this.providersRepository.save(provider);
        await this.es.updateIndexById('categories', '_doc', provider.id, {
            verifiedProvider: provider.verifiedProvider
        });
        return provider;
    }
};
UsersServices = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(users_repository_1.UsersRepository)),
    __param(1, typeorm_1.InjectRepository(clients_repository_1.ClientsRepository)),
    __param(2, typeorm_1.InjectRepository(providers_repository_1.ProvidersRepository)),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        clients_repository_1.ClientsRepository,
        providers_repository_1.ProvidersRepository])
], UsersServices);
exports.UsersServices = UsersServices;
//# sourceMappingURL=users.service.js.map