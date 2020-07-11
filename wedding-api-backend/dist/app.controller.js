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
const roles_decorator_1 = require("./global/decorators/roles.decorator");
const roles_guard_1 = require("./global/guards/roles.guard");
const gcp_file_service_1 = require("./global/services/gcp-file/gcp-file.service");
const fetch = require("node-fetch");
const express = require("express");
let AppController = class AppController {
    constructor(gcpFileService) {
        this.gcpFileService = gcpFileService;
    }
    async getCompany(path, res) {
        try {
            const url = await this.gcpFileService.getUrlFile(path);
            const g = await fetch(url);
            const buf = await g.buffer();
            const buffer = Buffer.from(buf);
            return res.end(buffer, 'binary');
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async getProfile(path, res) {
        try {
            const url = await this.gcpFileService.getUrlFile(path);
            const g = await fetch(url);
            const buf = await g.buffer();
            const buffer = Buffer.from(buf);
            return res.end(buffer, 'binary');
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async getSupprtedMethods(response) {
        return response;
    }
    secretEndpoint(req) {
        return 'this endpoint should be protected';
    }
};
__decorate([
    common_1.Get('upload/company/:path'),
    __param(0, common_1.Param('path')), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getCompany", null);
__decorate([
    common_1.Get('upload/profile/:path'),
    __param(0, common_1.Param('path')), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getProfile", null);
__decorate([
    common_1.Options(),
    __param(0, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getSupprtedMethods", null);
__decorate([
    common_1.Get('secret'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "secretEndpoint", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [gcp_file_service_1.GcpFileService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map