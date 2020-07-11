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
const entities_1 = require("../../infrastructure/databases/entities");
const weddings_service_1 = require("./weddings.service");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../global/guards/roles.guard");
const roles_decorator_1 = require("../../global/decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
let WeddingsController = class WeddingsController {
    constructor(weddingService) {
        this.weddingService = weddingService;
    }
    async patchWedding(email, id, wedding, res, req) {
        if (req.user.email !== email) {
            throw new common_1.ForbiddenException();
        }
        else {
            try {
                const userCreated = await this.weddingService.patchWedding(id, email, wedding);
                return res.status(common_1.HttpStatus.CREATED).json(userCreated);
            }
            catch (err) {
                if (err.status === 404) {
                    throw new common_1.NotFoundException();
                }
                else {
                    throw new common_1.BadRequestException(err.message);
                }
            }
        }
    }
    async getWedding(email, id, res, req) {
        if (req.user.email !== email) {
            throw new common_1.ForbiddenException();
        }
        else {
            try {
                const created = await this.weddingService.findWedding(id, email);
                return res.status(common_1.HttpStatus.CREATED).json(created);
            }
            catch (e) {
                throw new common_1.NotFoundException();
            }
        }
    }
    async getWeddingByEmail(email, res, req) {
        if (req.user.email !== email) {
            throw new common_1.ForbiddenException();
        }
        else {
            try {
                const created = await this.weddingService.findWeddingByEmail(email);
                return res.status(common_1.HttpStatus.CREATED).json(created);
            }
            catch (e) {
                throw new common_1.NotFoundException();
            }
        }
    }
    async createWedding(email, wedding, res, req) {
        if (req.user.email !== email) {
            throw new common_1.ForbiddenException();
        }
        else {
            try {
                const userCreated = await this.weddingService.createWedding(email, wedding);
                return res.status(common_1.HttpStatus.CREATED).json(userCreated);
            }
            catch (err) {
                if (err.status === 400) {
                    throw new common_1.BadRequestException(err.message);
                }
                else {
                    throw new common_1.ConflictException();
                }
            }
        }
    }
};
__decorate([
    common_1.Patch(':id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client'),
    __param(0, common_1.Param('email')),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Body()),
    __param(3, common_1.Response()),
    __param(4, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], WeddingsController.prototype, "patchWedding", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client'),
    __param(0, common_1.Param('email')), __param(1, common_1.Param('id')), __param(2, common_1.Response()), __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], WeddingsController.prototype, "getWedding", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client'),
    __param(0, common_1.Param('email')), __param(1, common_1.Response()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], WeddingsController.prototype, "getWeddingByEmail", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client'),
    __param(0, common_1.Param('email')), __param(1, common_1.Body()), __param(2, common_1.Response()), __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, entities_1.WeddingEntity, Object, Object]),
    __metadata("design:returntype", Promise)
], WeddingsController.prototype, "createWedding", null);
WeddingsController = __decorate([
    swagger_1.ApiTags('wedding'),
    common_1.Controller('users/:email/wedding'),
    __metadata("design:paramtypes", [weddings_service_1.WeddingsService])
], WeddingsController);
exports.WeddingsController = WeddingsController;
//# sourceMappingURL=weddings.controller.js.map