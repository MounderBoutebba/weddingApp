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
const company_service_1 = require("../../../infrastructure/databases/company/company.service");
const option_service_1 = require("../../../infrastructure/databases/company/option/option.service");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../../global/guards/roles.guard");
const roles_decorator_1 = require("../../../global/decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
let OptionController = class OptionController {
    constructor(optionService, companyServices) {
        this.optionService = optionService;
        this.companyServices = companyServices;
    }
    async createOption(companyId, email, option, res, req) {
        try {
            option.company = await this.companyServices.findCompany(companyId, email);
            const optionInstance = await this.optionService.createOption(option, email);
            return res.status(common_1.HttpStatus.CREATED).json(optionInstance);
        }
        catch (e) {
            throw e;
        }
    }
    async deleteOption(companyId, id, email, res, req) {
        try {
            const company = await this.companyServices.findCompany(companyId, email);
            await this.optionService.deleteOption(id, company);
            return res.status(common_1.HttpStatus.NO_CONTENT).json({});
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async findOption(id, res, req) {
        try {
            const option = await this.optionService.getOption(id);
            return res.status(common_1.HttpStatus.CREATED).json(option);
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async patchOption(id, companyId, email, res, option) {
        try {
            const company = await this.companyServices.findCompany(companyId, email);
            const optionData = await this.optionService.patchOption(id, option, company);
            return res.status(common_1.HttpStatus.ACCEPTED).json(optionData);
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider', 'admin'),
    __param(0, common_1.Param('companyId')),
    __param(1, common_1.Param('email')),
    __param(2, common_1.Body()),
    __param(3, common_1.Response()),
    __param(4, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OptionController.prototype, "createOption", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider', 'admin'),
    __param(0, common_1.Param('companyId')),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Param('email')),
    __param(3, common_1.Response()), __param(4, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OptionController.prototype, "deleteOption", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    __param(0, common_1.Param('id')), __param(1, common_1.Response()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OptionController.prototype, "findOption", null);
__decorate([
    common_1.Put(':id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider', 'admin'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Param('companyId')),
    __param(2, common_1.Param('email')),
    __param(3, common_1.Response()),
    __param(4, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], OptionController.prototype, "patchOption", null);
OptionController = __decorate([
    swagger_1.ApiTags('company option'),
    common_1.Controller('users/:email/company/:companyId/option'),
    __metadata("design:paramtypes", [option_service_1.OptionServices, company_service_1.CompanyServices])
], OptionController);
exports.OptionController = OptionController;
//# sourceMappingURL=option.controller.js.map