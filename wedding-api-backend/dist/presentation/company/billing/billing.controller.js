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
const billing_service_1 = require("../../../infrastructure/databases/company/billing/billing.service");
const company_service_1 = require("../../../infrastructure/databases/company/company.service");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../../global/guards/roles.guard");
const roles_decorator_1 = require("../../../global/decorators/roles.decorator");
const swagger_1 = require("@nestjs/swagger");
let BillingController = class BillingController {
    constructor(billingService, companyServices) {
        this.billingService = billingService;
        this.companyServices = companyServices;
    }
    async createBilling(companyId, email, billing, res, req) {
        try {
            billing.company = await this.companyServices.findCompany(companyId, email);
            const billingInstance = await this.billingService.createBilling(billing);
            return res.status(common_1.HttpStatus.CREATED).json(billingInstance);
        }
        catch (e) {
            throw e;
        }
    }
    async findBilling(companyId, res, req) {
        try {
            const billing = await this.billingService.getBilling(companyId);
            return res.status(common_1.HttpStatus.CREATED).json(billing);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.CREATED).json(null);
        }
    }
    async patchBilling(id, res, billing) {
        try {
            const billingData = await this.billingService.patchBilling(id, billing);
            return res.status(common_1.HttpStatus.ACCEPTED).json(billingData);
        }
        catch (e) {
            throw e;
            throw new common_1.NotFoundException();
        }
    }
    async deleteBilling(id, res, req) {
        try {
            await this.billingService.deleteBilling(id);
            return res.status(common_1.HttpStatus.NO_CONTENT).json({});
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
], BillingController.prototype, "createBilling", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    __param(0, common_1.Param('companyId')), __param(1, common_1.Response()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "findBilling", null);
__decorate([
    common_1.Put(':id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider', 'admin'),
    __param(0, common_1.Param('id')), __param(1, common_1.Response()), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "patchBilling", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider', 'admin'),
    __param(0, common_1.Param('id')), __param(1, common_1.Response()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], BillingController.prototype, "deleteBilling", null);
BillingController = __decorate([
    swagger_1.ApiTags('company billing'),
    common_1.Controller('users/:email/company/:companyId/billing'),
    __metadata("design:paramtypes", [billing_service_1.BillingServices, company_service_1.CompanyServices])
], BillingController);
exports.BillingController = BillingController;
//# sourceMappingURL=billing.controller.js.map