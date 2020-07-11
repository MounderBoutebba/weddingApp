"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const company_controller_1 = require("./company.controller");
const company_service_1 = require("./company.service");
const platform_express_1 = require("@nestjs/platform-express");
const services_module_1 = require("../services/services.module");
let CompanyModule = class CompanyModule {
};
CompanyModule = __decorate([
    common_1.Module({
        imports: [
            platform_express_1.MulterModule,
            common_1.forwardRef(() => services_module_1.ServicesModule)
        ],
        controllers: [company_controller_1.CompanyController],
        providers: [company_service_1.CompanyService],
        exports: [company_service_1.CompanyService]
    })
], CompanyModule);
exports.CompanyModule = CompanyModule;
//# sourceMappingURL=company.module.js.map