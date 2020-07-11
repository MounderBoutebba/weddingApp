"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_module_1 = require("../config/config.module");
const infrastructure_module_1 = require("../../infrastructure/infrastructure.module");
const company_module_1 = require("../company/company.module");
const disponibility_controller_1 = require("./disponibility.controller");
const disponibility_service_1 = require("./disponibility.service");
let DisponibilityModule = class DisponibilityModule {
};
DisponibilityModule = __decorate([
    common_1.Module({
        controllers: [disponibility_controller_1.DisponibilityController],
        providers: [disponibility_service_1.DisponibilityService],
        exports: [disponibility_service_1.DisponibilityService],
        imports: [config_module_1.ConfigModule, infrastructure_module_1.InfrastructureModule, common_1.forwardRef(() => company_module_1.CompanyModule)]
    })
], DisponibilityModule);
exports.DisponibilityModule = DisponibilityModule;
//# sourceMappingURL=disponibility.module.js.map