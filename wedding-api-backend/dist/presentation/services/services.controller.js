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
const services_service_1 = require("./services.service");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../global/guards/roles.guard");
const roles_decorator_1 = require("../../global/decorators/roles.decorator");
let ServicesController = class ServicesController {
    constructor(servicesService) {
        this.servicesService = servicesService;
    }
    async createService(service) {
        return await this.servicesService.createService(service);
    }
    async findByCategorieType(categorielabel, q, res) {
        const results = await this.servicesService.searchServices('categories', categorielabel, q);
        return res.status(common_1.HttpStatus.OK).json({ data: results });
    }
    async getAll(q, res) {
        const results = await this.servicesService.searchServices('categories', null, q);
        return res.status(common_1.HttpStatus.OK).json({ data: results });
    }
    async findByUserId(categorielabel, email, res) {
        const results = await this.servicesService.searchServicesByFields('categories', categorielabel, email, [
            'userid'
        ]);
        return res.status(common_1.HttpStatus.OK).json(results[0]);
    }
    async findByUserIdForReservation(categorielabel, email, res) {
        console.log('search ', categorielabel, email, new Date());
        const results = await this.servicesService.searchServicesByFields('categories', categorielabel, email, [
            'userid'
        ]);
        console.log('result', new Date(), results);
        return res.status(common_1.HttpStatus.OK).json(results[0]);
    }
    async deleteService(categorielabel, email, res, req) {
        if (req.user.email !== email) {
            throw new common_1.ForbiddenException();
        }
        else {
            const categoriesDeleted = await this.servicesService.deleteServices('categories', categorielabel, email);
            return res.status(common_1.HttpStatus.NO_CONTENT).json(categoriesDeleted);
        }
    }
    async updateService(categorielabel, email, categorie, res, req) {
        if (req.user.role !== 'admin' && req.user.email !== email) {
            throw new common_1.ForbiddenException();
        }
        else {
            const results = await this.servicesService.updateServiceByUserId('categories', categorielabel, email, categorie);
            return res.status(common_1.HttpStatus.ACCEPTED).json(results[0]);
        }
    }
    async searchCategorieType(searchQuery, page = 0, res, req) {
        if (page < 0) {
            page = 0;
        }
        const results = await this.servicesService.searchCategory(null, searchQuery, page, req.headers['email']);
        return res.status(common_1.HttpStatus.OK).json(results);
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider', 'admin'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "createService", null);
__decorate([
    common_1.Get(':categorielabel'),
    __param(0, common_1.Param('categorielabel')),
    __param(1, common_1.Query('q')),
    __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findByCategorieType", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('q')), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getAll", null);
__decorate([
    common_1.Get(':categorielabel/:email'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider', 'admin', 'client'),
    __param(0, common_1.Param('categorielabel')),
    __param(1, common_1.Param('email')),
    __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findByUserId", null);
__decorate([
    common_1.Get('reservation/:categorielabel/:email'),
    __param(0, common_1.Param('categorielabel')),
    __param(1, common_1.Param('email')),
    __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findByUserIdForReservation", null);
__decorate([
    common_1.Delete(':categorielabel/:email'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider', 'admin'),
    __param(0, common_1.Param('categorielabel')),
    __param(1, common_1.Param('email')),
    __param(2, common_1.Response()),
    __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "deleteService", null);
__decorate([
    common_1.Patch(':categorielabel/:email'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider', 'admin'),
    __param(0, common_1.Param('categorielabel')),
    __param(1, common_1.Param('email')),
    __param(2, common_1.Body()),
    __param(3, common_1.Response()),
    __param(4, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "updateService", null);
__decorate([
    common_1.Post('_search'),
    __param(0, common_1.Body()),
    __param(1, common_1.Query('page')),
    __param(2, common_1.Response()),
    __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "searchCategorieType", null);
ServicesController = __decorate([
    common_1.Controller('services'),
    __metadata("design:paramtypes", [services_service_1.ServicesService])
], ServicesController);
exports.ServicesController = ServicesController;
//# sourceMappingURL=services.controller.js.map