"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_exception_1 = require("../../exceptions/users.exception");
const logging_1 = require("../../../config/logging");
class CreateUser {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(user) {
        const isUserExist = await this.userService.isUserExist(user.email);
        if (isUserExist) {
            throw new users_exception_1.UserException('User already exist');
        }
        else {
            return this.userService.createUser(user);
        }
    }
    async createClient(client) {
        const isUserExist = await this.userService.isUserExist(client.email);
        if (isUserExist) {
            throw new users_exception_1.UserException('Client already exist');
        }
        else {
            return await this.userService.createClient(client);
        }
    }
    async createProvider(provider) {
        const isUserExist = await this.userService.isUserExist(provider.email);
        if (isUserExist) {
            throw new Error('provider alerady exist');
        }
        else {
            const providerCreated = await this.userService.createUser(provider);
            logging_1.customLogger('Create User', {
                action: 'providerCreated',
                provider: providerCreated
            });
            return await this.userService.createProvider(provider);
        }
    }
    getUserInfo() {
        return null;
    }
}
exports.CreateUser = CreateUser;
//# sourceMappingURL=create-user.usecase.js.map