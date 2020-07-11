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
const setting_service_1 = require("../../../infrastructure/databases/company/setting/setting.service");
const company_service_1 = require("../../../infrastructure/databases/company/company.service");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../../global/guards/roles.guard");
const roles_decorator_1 = require("../../../global/decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
let SettingController = class SettingController {
    constructor(settingService, companyServices) {
        this.settingService = settingService;
        this.companyServices = companyServices;
    }
    async createSetting(companyId, email, setting, res, req) {
        try {
            setting.company = await this.companyServices.findCompany(companyId, email);
            const settingInstance = await this.settingService.createSetting(setting);
            return res.status(common_1.HttpStatus.CREATED).json(settingInstance);
        }
        catch (e) {
            throw e;
        }
    }
    async deleteSetting(id, res, req, companyId, email) {
        try {
            const company = await this.companyServices.findCompany(companyId, email);
            await this.settingService.deleteSetting(id, company);
            return res.status(common_1.HttpStatus.NO_CONTENT).json({});
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async findSetting(id, res, req) {
        try {
            const setting = await this.settingService.getSetting(id);
            return res.status(common_1.HttpStatus.CREATED).json(setting);
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async patchSetting(id, res, setting, companyId, email) {
        try {
            const company = await this.companyServices.findCompany(companyId, email);
            const settingData = await this.settingService.patchSetting(id, setting, company);
            return res.status(common_1.HttpStatus.ACCEPTED).json(settingData);
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
], SettingController.prototype, "createSetting", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider', 'admin'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Response()),
    __param(2, common_1.Request()),
    __param(3, common_1.Param('companyId')),
    __param(4, common_1.Param('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "deleteSetting", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    __param(0, common_1.Param('id')), __param(1, common_1.Response()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "findSetting", null);
__decorate([
    common_1.Put(':id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider', 'admin'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Response()),
    __param(2, common_1.Body()),
    __param(3, common_1.Param('companyId')),
    __param(4, common_1.Param('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "patchSetting", null);
SettingController = __decorate([
    swagger_1.ApiTags('company setting'),
    common_1.Controller('users/:email/company/:companyId/setting'),
    __metadata("design:paramtypes", [setting_service_1.SettingServices, company_service_1.CompanyServices])
], SettingController);
exports.SettingController = SettingController;
//# sourceMappingURL=setting.controller.js.map