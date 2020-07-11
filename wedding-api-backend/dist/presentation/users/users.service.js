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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const create_user_usecase_1 = require("../../domain/usecases/services/create-user.usecase");
const users_service_1 = require("../../infrastructure/databases/users/users.service");
const twilio_1 = require("twilio");
const config_service_1 = require("../config/config-service");
const path_1 = require("path");
const uuid_1 = require("uuid");
const gcp_file_service_1 = require("../../global/services/gcp-file/gcp-file.service");
let UsersService = class UsersService {
    constructor(usersServices, gcpFileService, configService) {
        this.usersServices = usersServices;
        this.gcpFileService = gcpFileService;
        this.configService = configService;
        this.createUsersUsecase = new create_user_usecase_1.CreateUser(this.usersServices);
        this.twilio = new twilio_1.Twilio(configService.get('ACCOUNT_SID'), configService.get('AUTH_TOKEN'));
    }
    getUserInfo() {
        return this.createUsersUsecase.getUserInfo();
    }
    getUsers() {
        return this.usersServices.getUsers();
    }
    async getUserByEmail(email) {
        return this.usersServices.findUserByEmail(email);
    }
    async findUser(id) {
        return this.usersServices.findUserById(id);
    }
    async createUser(user) {
        try {
            return await this.createUsersUsecase.createUser(user);
        }
        catch (err) {
            throw new common_1.ConflictException(err.message);
        }
    }
    async createClient(user) {
        try {
            return await this.usersServices.createClient(user);
        }
        catch (err) {
            throw new common_1.ConflictException(err.message);
        }
    }
    async createProvider(user) {
        try {
            return await this.usersServices.createProvider(user);
        }
        catch (err) {
            throw new common_1.ConflictException(err.message);
        }
    }
    async patchUserLastConnexion(email, user) {
        try {
            const createdUser = await this.usersServices.updateUser(email, user);
            return createdUser;
        }
        catch (err) {
            throw err;
        }
    }
    async patchUser(email, user) {
        try {
            const currentUser = await this.usersServices.findUserByEmail(email);
            let createdUser = Object.assign({}, currentUser);
            if (currentUser.phoneVerified &&
                currentUser.phone.toString() ===
                    (!!user.phone ? user.phone.country + user.phone.phoneNumber.slice(1) : '')) {
                createdUser = await this.usersServices.updateUser(email, user);
            }
            else if (!!user.phoneToken && currentUser.phoneToken === user.phoneToken) {
                user.phoneVerified = true;
                createdUser = await this.usersServices.updateUser(email, user);
            }
            else if (!!user.phone && !!user.phone.phoneNumber && !!user.phone.country) {
                if (currentUser.phone.toString() !== user.phone.country + user.phone.phoneNumber.slice(1)) {
                    currentUser.phoneTokenRequestCount = 0;
                }
                if (!(currentUser.phone.toString() === user.phone.country + user.phone.phoneNumber.slice(1) &&
                    currentUser.phoneTokenRequestCount > 5)) {
                    user.phoneToken = `${Math.floor(Math.random() * 1000000)}`;
                    user.phoneVerified = false;
                    createdUser = await this.usersServices.updateUser(email, user);
                    try {
                        const res = await this.twilio.messages.create({
                            body: 'Bienvenue chez Winwez, voici le code à saisir afin de valider votre compte ' +
                                user.phoneToken,
                            from: this.configService.get('PHONE_NUMBER'),
                            to: user.phone.country + user.phone.phoneNumber.slice(1)
                        });
                        user.phoneTokenRequestCount = currentUser.phoneTokenRequestCount + 1;
                        console.log(res);
                    }
                    catch (e) {
                        throw new common_1.BadRequestException(e.message);
                    }
                }
            }
            else {
                throw new common_1.BadRequestException('impossible de mettre a jour le utilisateur');
            }
            return createdUser;
        }
        catch (err) {
            throw err;
            if (err.status === 404) {
                throw new common_1.NotFoundException(err.message);
            }
            else {
                throw new common_1.BadRequestException(err.message);
            }
        }
    }
    async confirmUser(email, user) {
        try {
            const usser = await this.usersServices.findUserByEmail(email);
            if (usser.phoneToken === user.phoneToken) {
                user.phoneVerified = true;
            }
            else {
                throw new common_1.NotFoundException();
            }
            return await this.usersServices.updateUser(email, user);
        }
        catch (err) {
            throw new common_1.NotFoundException(err.message);
        }
    }
    static filename(req, file, cb) {
        return cb(null, `${uuid_1.v4()}${path_1.extname(file.originalname)}`);
    }
    static fileFilter(req1, file, callback) {
        if (['.jpg', '.jpeg', '.png', '.webp', '.bmp'].includes(path_1.extname(file.originalname).toLocaleLowerCase())) {
            return callback(null, true);
        }
        else {
            return callback(new common_1.BadRequestException('File format is not valid , accept only images'), false);
        }
    }
    async changePhoto(email, filename) {
        const currentUser = await this.usersServices.findUserByEmail(email);
        const oldPhoto = currentUser.photo;
        if (!!oldPhoto) {
            await this.gcpFileService.removeFile(currentUser.photo);
        }
        currentUser.photo = `${filename}`;
        return await this.usersServices.updateUser(email, currentUser);
    }
    async deleteUser(email) {
        const user = await this.usersServices.findUserByEmail(email);
        return await this.usersServices.delete(user);
    }
    async markUserAsVerified(email, data) {
        const currentUser = await this.usersServices.findProviderByEmail(email);
        return await this.usersServices.markProviderAsVerified(currentUser, data);
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersServices,
        gcp_file_service_1.GcpFileService,
        config_service_1.ConfigService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map