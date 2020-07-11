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
const users_service_1 = require("./users.service");
const entities_1 = require("../../infrastructure/databases/entities");
const platform_express_1 = require("@nestjs/platform-express");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../global/guards/roles.guard");
const roles_decorator_1 = require("../../global/decorators/roles.decorator");
const path_1 = require("path");
const gcp_file_service_1 = require("../../global/services/gcp-file/gcp-file.service");
const swagger_1 = require("@nestjs/swagger");
const verified_dto_1 = require("./dto/verified.dto");
const MulterGoogleCloudStorage = require('multer-google-storage').default;
let UsersController = class UsersController {
    constructor(usersService, gcpFileService) {
        this.usersService = usersService;
        this.gcpFileService = gcpFileService;
    }
    async findUserByEmail(email, res) {
        try {
            const user = await this.usersService.getUserByEmail(email);
            return res.status(common_1.HttpStatus.OK).json(user);
        }
        catch (e) {
            throw new common_1.NotFoundException('User Not Found');
        }
    }
    async getUsers(res) {
        try {
            const users = await this.usersService.getUsers();
            return res.status(common_1.HttpStatus.OK).json(users);
        }
        catch (e) {
            throw new common_1.NotFoundException('Users Not Found');
        }
    }
    async changePhoto(photo, email, res, req) {
        if (req.user.email !== email) {
            throw new common_1.ForbiddenException();
        }
        else {
            const url = await this.gcpFileService.getUrlFile(photo[0].filename);
            const user = await this.usersService.changePhoto(email, url);
            return res.status(common_1.HttpStatus.CREATED).json(user);
        }
    }
    async patchUser(email, user, res, req) {
        const userCreated = await this.usersService.patchUser(email, user);
        return res.status(common_1.HttpStatus.CREATED).json(userCreated);
    }
    async marqueUserAsVerified(email, user, req) {
        const userCreated = await this.usersService.markUserAsVerified(email, user);
        return userCreated;
    }
    async patchUserLastConnexion(email, user, res, req) {
        const userCreated = await this.usersService.patchUserLastConnexion(email, user);
        return res.status(common_1.HttpStatus.CREATED).json(userCreated);
    }
    async createUser(user, res) {
        const userCreated = await this.usersService.createUser(user);
        return res.status(common_1.HttpStatus.CREATED).json(userCreated);
    }
    async createClient(client, res) {
        const clientCreated = await this.usersService.createClient(client);
        return res.status(common_1.HttpStatus.CREATED).json(clientCreated);
    }
    async createProvider(provider, res) {
        const providerCreated = await this.usersService.createProvider(provider);
        return res.status(common_1.HttpStatus.CREATED).json(providerCreated);
    }
    async delete(email, res, req) {
        if (req.user.email === email || req.user.role === 'admin') {
            const userDeleted = await this.usersService.deleteUser(email);
            return res.status(common_1.HttpStatus.NO_CONTENT).json(userDeleted);
        }
        else {
            throw new common_1.ForbiddenException();
        }
    }
};
__decorate([
    common_1.Get(':email'),
    __param(0, common_1.Param('email')), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUserByEmail", null);
__decorate([
    common_1.Get(''),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    common_1.Patch(':email/photo'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('photo', 1, {
        fileFilter: users_service_1.UsersService.fileFilter,
        limits: { fileSize: 2097152 },
        storage: new MulterGoogleCloudStorage({
            filename: users_service_1.UsersService.filename,
            autoRetry: true,
            maxRetries: 5,
            bucket: 'mariage-serein',
            projectId: 'mariage-serein-2019',
            keyFilename: path_1.resolve('gcp-secret.json')
        })
    })),
    __param(0, common_1.UploadedFiles()), __param(1, common_1.Param('email')), __param(2, common_1.Response()), __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePhoto", null);
__decorate([
    common_1.Patch(':email'),
    __param(0, common_1.Param('email')), __param(1, common_1.Body()), __param(2, common_1.Response()), __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "patchUser", null);
__decorate([
    common_1.Patch(':email/verified'),
    common_1.UsePipes(new common_1.ValidationPipe({
        forbidUnknownValues: true,
        forbidNonWhitelisted: true
    })),
    common_1.HttpCode(common_1.HttpStatus.CREATED),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Param('email')), __param(1, common_1.Body()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, verified_dto_1.VerifiedDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "marqueUserAsVerified", null);
__decorate([
    common_1.Patch(':email/last-connexion'),
    __param(0, common_1.Param('email')),
    __param(1, common_1.Body()),
    __param(2, common_1.Response()),
    __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "patchUserLastConnexion", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.UserEntity, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    common_1.Post('/client'),
    __param(0, common_1.Body()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createClient", null);
__decorate([
    common_1.Post('/provider'),
    __param(0, common_1.Body()), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createProvider", null);
__decorate([
    common_1.Delete(':email'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Param('email')), __param(1, common_1.Response()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
UsersController = __decorate([
    swagger_1.ApiTags('users'),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService, gcp_file_service_1.GcpFileService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map