"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("./guards/roles.guard");
const gcp_file_service_1 = require("./services/gcp-file/gcp-file.service");
const config_service_1 = require("../presentation/config/config-service");
const email_service_1 = require("./services/mail/email.service");
const configService = new config_service_1.ConfigService();
let GlobalModule = class GlobalModule {
};
GlobalModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' })
        ],
        providers: [roles_guard_1.RolesGuard, gcp_file_service_1.GcpFileService, email_service_1.EmailService],
        exports: [email_service_1.EmailService, passport_1.PassportModule, roles_guard_1.RolesGuard, gcp_file_service_1.GcpFileService]
    })
], GlobalModule);
exports.GlobalModule = GlobalModule;
//# sourceMappingURL=global.module.js.map