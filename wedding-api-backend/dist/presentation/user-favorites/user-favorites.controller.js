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
const user_favorites_service_1 = require("./user-favorites.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../global/guards/roles.guard");
const roles_decorator_1 = require("../../global/decorators/roles.decorator");
let UserFavoritesController = class UserFavoritesController {
    constructor(favoritesService) {
        this.favoritesService = favoritesService;
    }
    async createFavorite(email, data, res, req) {
        if (req.user.email !== email) {
            throw new common_1.ForbiddenException();
        }
        else {
            try {
                const result = await this.favoritesService.addFavorite(email, data, req.user);
                return res.status(common_1.HttpStatus.CREATED).json(result);
            }
            catch (e) {
                throw new common_1.ConflictException('Favorite already exist !');
            }
        }
    }
    async getFavorites(email, page = 1, number, res, req) {
        if (req.user.email !== email) {
            throw new common_1.ForbiddenException();
        }
        else {
            try {
                if (page < 1) {
                    page = 1;
                }
                const result = await this.favoritesService.getAllFavorites(page, req.user);
                return res.status(common_1.HttpStatus.CREATED).json(result);
            }
            catch (e) {
                throw e;
                throw new common_1.ConflictException('Favorite already exist !');
            }
        }
    }
    async deleteFavorite(email, companyId, res, req) {
        if (req.user.email !== email) {
            throw new common_1.ForbiddenException();
        }
        else {
            try {
                const result = await this.favoritesService.deleteFavorite(req.user.id, companyId);
                return res.status(common_1.HttpStatus.NO_CONTENT).json(result);
            }
            catch (e) {
                throw new common_1.NotFoundException(`Favorite Doesn't exist !`);
            }
        }
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client'),
    __param(0, common_1.Param('email')), __param(1, common_1.Body()), __param(2, common_1.Response()), __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserFavoritesController.prototype, "createFavorite", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client'),
    __param(0, common_1.Param('email')), __param(1, common_1.Query('page')), __param(3, common_1.Response()), __param(4, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserFavoritesController.prototype, "getFavorites", null);
__decorate([
    common_1.Delete(':companyId'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client'),
    __param(0, common_1.Param('email')),
    __param(1, common_1.Param('companyId')),
    __param(2, common_1.Response()), __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserFavoritesController.prototype, "deleteFavorite", null);
UserFavoritesController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('user-favorites'),
    common_1.Controller('/users/:email/user-favorites'),
    __metadata("design:paramtypes", [user_favorites_service_1.UserFavoritesService])
], UserFavoritesController);
exports.UserFavoritesController = UserFavoritesController;
//# sourceMappingURL=user-favorites.controller.js.map