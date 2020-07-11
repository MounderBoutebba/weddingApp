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
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../global/guards/roles.guard");
const disponibility_service_1 = require("./disponibility.service");
const disponibility_dto_1 = require("./dto/disponibility.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../global/decorators/roles.decorator");
let DisponibilityController = class DisponibilityController {
    constructor(disponibilityService) {
        this.disponibilityService = disponibilityService;
    }
    async addAbsencePrivate(companyId, email, disponibilityDto, req) {
        const provider = req.user;
        const company = await provider.company;
        if (company.id !== companyId || provider.email !== email) {
            throw new common_1.UnauthorizedException();
        }
        const data = await this.disponibilityService.createIndisponibility(disponibilityDto, company);
        return { data };
    }
    async deletDisponibility(companyId, email, id, req) {
        const provider = req.user;
        const company = await provider.company;
        if (company.id !== companyId || provider.email !== email) {
            throw new common_1.UnauthorizedException();
        }
        return await this.disponibilityService.deleteDisponibility(id, companyId);
    }
    async getDisponibility(companyId, email, req) {
        return await this.disponibilityService.getDisponibilities(companyId);
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider'),
    __param(0, common_1.Param('companyId')),
    __param(1, common_1.Param('email')),
    __param(2, common_1.Body()),
    __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, disponibility_dto_1.CreateDisponibilityDto, Object]),
    __metadata("design:returntype", Promise)
], DisponibilityController.prototype, "addAbsencePrivate", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider'),
    common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
    __param(0, common_1.Param('companyId')),
    __param(1, common_1.Param('email')),
    __param(2, common_1.Param('id')),
    __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], DisponibilityController.prototype, "deletDisponibility", null);
__decorate([
    common_1.Get(),
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
    __param(0, common_1.Param('companyId')),
    __param(1, common_1.Param('email')),
    __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], DisponibilityController.prototype, "getDisponibility", null);
DisponibilityController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('disponibility'),
    common_1.Controller('users/:email/company/:companyId/disponibility'),
    __metadata("design:paramtypes", [disponibility_service_1.DisponibilityService])
], DisponibilityController);
exports.DisponibilityController = DisponibilityController;
//# sourceMappingURL=disponibility.controller.js.map