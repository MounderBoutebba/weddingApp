"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const services_controller_1 = require("./services.controller");
const services_service_1 = require("./services.service");
const config_module_1 = require("../config/config.module");
const infrastructure_module_1 = require("../../infrastructure/infrastructure.module");
const company_module_1 = require("../company/company.module");
const user_favorites_module_1 = require("../user-favorites/user-favorites.module");
let ServicesModule = class ServicesModule {
};
ServicesModule = __decorate([
    common_1.Module({
        controllers: [services_controller_1.ServicesController],
        providers: [services_service_1.ServicesService],
        exports: [services_service_1.ServicesService],
        imports: [config_module_1.ConfigModule, user_favorites_module_1.UserFavoritesModule, infrastructure_module_1.InfrastructureModule, common_1.forwardRef(() => company_module_1.CompanyModule)]
    })
], ServicesModule);
exports.ServicesModule = ServicesModule;
//# sourceMappingURL=services.module.js.map