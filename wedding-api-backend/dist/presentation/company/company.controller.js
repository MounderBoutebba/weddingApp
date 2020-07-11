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
const platform_express_1 = require("@nestjs/platform-express");
const company_service_1 = require("./company.service");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../global/guards/roles.guard");
const roles_decorator_1 = require("../../global/decorators/roles.decorator");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
const CreateCompany_dto_1 = require("./dto/CreateCompany.dto");
const MulterGoogleCloudStorage = require('multer-google-storage').default;
let CompanyController = class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    async createCompany(files, email, company, res, req) {
        const body = req.body;
        if (req.user.role !== 'admin' && req.user.email !== email) {
            throw new common_1.ForbiddenException();
        }
        else {
            const companyInstance = await this.companyService.createCompany(email, { files, company: body });
            return res.status(common_1.HttpStatus.CREATED).json(companyInstance);
        }
    }
    async deleteImage(id, imageId, email, res, req) {
        if (req.user.email !== email) {
            throw new common_1.ForbiddenException();
        }
        else {
            try {
                await this.companyService.deleteImage(id, imageId);
                return res.status(common_1.HttpStatus.NO_CONTENT).json({});
            }
            catch (e) {
                throw new common_1.NotFoundException();
            }
        }
    }
    async changeFavorite(id, imageId, email, image, res, req) {
        if (req.user.email !== email) {
            throw new common_1.ForbiddenException();
        }
        else {
            try {
                const data = await this.companyService.changeFavorite(email, id, imageId, image);
                return res.status(common_1.HttpStatus.CREATED).json({ data });
            }
            catch (e) {
                throw new common_1.NotFoundException();
            }
        }
    }
    async deleteCompany(id, email, res, req) {
        if (req.user.email === email || req.user.role === 'admin') {
            try {
                await this.companyService.deleteCompany(id);
                return res.status(common_1.HttpStatus.NO_CONTENT).json({});
            }
            catch (e) {
                throw new common_1.NotFoundException();
            }
        }
        else {
            throw new common_1.ForbiddenException();
        }
    }
    async deleteCompanyJobs(id, res, req) {
        if (req.user.role === 'admin') {
            try {
                const deletedJob = await this.companyService.deleteJobs(id);
                console.log('deletedJob', deletedJob);
                return res.status(common_1.HttpStatus.NO_CONTENT).json({});
            }
            catch (e) {
                throw new common_1.NotFoundException();
            }
        }
        else {
            throw new common_1.ForbiddenException();
        }
    }
    async createCompanyJobs(email, company, res, req) {
        if (req.user.email === email || req.user.role === 'admin') {
            try {
                await this.companyService.createJobs(company, email);
                return res.status(common_1.HttpStatus.CREATED).json({});
            }
            catch (e) {
                throw new common_1.NotFoundException();
            }
        }
        else {
            throw new common_1.ForbiddenException();
        }
    }
    async findCompany(id, email, res, req) {
        try {
            const company = await this.companyService.findCompany(id, email);
            return res.status(common_1.HttpStatus.CREATED).json(company);
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async getCompany(email, res, req) {
        try {
            const company = await this.companyService.getCompany(email);
            return res.status(common_1.HttpStatus.CREATED).json(company);
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async updateCurrentStep(email, id, res, req, company) {
        try {
            const companyUpdated = await this.companyService.patchCurrentStep(id, { currentStep: company.currentStep });
            return res.status(common_1.HttpStatus.CREATED).json(companyUpdated);
        }
        catch (e) {
            return new common_1.NotFoundException();
        }
    }
    async patchCompany(files, email, id, res, req, company) {
        if (req.user.role !== 'admin' && req.user.email !== email) {
            throw new common_1.ForbiddenException();
        }
        else {
            try {
                const companyData = await this.companyService.patchCompany(id, email, company, files, req.user.id);
                return res.status(common_1.HttpStatus.ACCEPTED).json(companyData);
            }
            catch (e) {
                console.log('error', e);
                throw new common_1.NotFoundException();
            }
        }
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider', 'admin'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('files', 10, {
        fileFilter: company_service_1.CompanyService.fileFilter,
        limits: { fileSize: 10485760 },
        storage: new MulterGoogleCloudStorage({
            filename: company_service_1.CompanyService.filename,
            autoRetry: true,
            maxRetries: 5,
            bucket: 'mariage-serein',
            projectId: 'mariage-serein-2019',
            keyFilename: path_1.resolve('gcp-secret.json')
        })
    })),
    __param(0, common_1.UploadedFiles()),
    __param(1, common_1.Param('email')),
    __param(2, common_1.Body()),
    __param(3, common_1.Response()),
    __param(4, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String, CreateCompany_dto_1.CreateCompanyDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "createCompany", null);
__decorate([
    common_1.Delete(':id/images/:imageId'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Param('imageId')),
    __param(2, common_1.Param('email')),
    __param(3, common_1.Response()),
    __param(4, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "deleteImage", null);
__decorate([
    common_1.Patch(':id/images/:imageId'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Param('imageId')),
    __param(2, common_1.Param('email')),
    __param(3, common_1.Body()),
    __param(4, common_1.Response()),
    __param(5, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "changeFavorite", null);
__decorate([
    common_1.Delete(':id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider', 'admin'),
    __param(0, common_1.Param('id')), __param(1, common_1.Param('email')), __param(2, common_1.Response()), __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "deleteCompany", null);
__decorate([
    common_1.Delete(':id/jobs'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Param('id')), __param(1, common_1.Response()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "deleteCompanyJobs", null);
__decorate([
    common_1.Post(':id/jobs'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Param('email')),
    __param(1, common_1.Body()),
    __param(2, common_1.Response()),
    __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "createCompanyJobs", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Param('email')), __param(2, common_1.Response()), __param(3, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "findCompany", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Param('email')), __param(1, common_1.Response()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompany", null);
__decorate([
    common_1.Put(':id/current-step'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider', 'admin'),
    __param(0, common_1.Param('email')),
    __param(1, common_1.Param('id')),
    __param(2, common_1.Response()),
    __param(3, common_1.Request()),
    __param(4, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "updateCurrentStep", null);
__decorate([
    common_1.Put(':id'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider', 'admin'),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor('files', 10, {
        fileFilter: company_service_1.CompanyService.fileFilter,
        limits: { fileSize: 1048576 },
        storage: new MulterGoogleCloudStorage({
            filename: company_service_1.CompanyService.filename,
            autoRetry: true,
            maxRetries: 5,
            bucket: 'mariage-serein',
            projectId: 'mariage-serein-2019',
            keyFilename: path_1.resolve('gcp-secret.json')
        })
    })),
    __param(0, common_1.UploadedFiles()),
    __param(1, common_1.Param('email')),
    __param(2, common_1.Param('id')),
    __param(3, common_1.Response()),
    __param(4, common_1.Request()),
    __param(5, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "patchCompany", null);
CompanyController = __decorate([
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiTags('company'),
    common_1.Controller('users/:email/company'),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyController);
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map