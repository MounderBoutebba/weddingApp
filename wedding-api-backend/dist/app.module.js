"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const domain_module_1 = require("./domain/domain.module");
const infrastructure_module_1 = require("./infrastructure/infrastructure.module");
const presentation_module_1 = require("./presentation/presentation.module");
const databases_module_1 = require("./infrastructure/databases/databases.module");
const stripe_module_1 = require("./infrastructure/externalInterfaces/stripe/stripe.module");
const platform_express_1 = require("@nestjs/platform-express");
const auth_module_1 = require("./auth/auth.module");
const global_module_1 = require("./global/global.module");
const mail_module_1 = require("./infrastructure/externalInterfaces/mail/mail.module");
const nest_status_monitor_1 = require("nest-status-monitor");
const config = {
    pageTitle: 'Nest.js Monitoring Page',
    port: 3000,
    path: '/status',
    ignoreStartsWith: '/health/alive',
    spans: [
        {
            interval: 1,
            retention: 60,
        },
        {
            interval: 5,
            retention: 60,
        },
        {
            interval: 15,
            retention: 60,
        }
    ],
    chartVisibility: {
        cpu: true,
        mem: true,
        load: true,
        responseTime: true,
        rps: true,
        statusCodes: true,
    },
    healthChecks: [
        {
            protocol: 'http',
            host: 'localhost',
            path: '/api',
            port: 3000,
        }
    ]
};
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            nest_status_monitor_1.StatusMonitorModule.setUp(config),
            presentation_module_1.PresentationModule,
            domain_module_1.DomainModule,
            infrastructure_module_1.InfrastructureModule,
            databases_module_1.DatabasesModule,
            platform_express_1.MulterModule,
            stripe_module_1.StripeModule,
            auth_module_1.AuthModule,
            global_module_1.GlobalModule,
            mail_module_1.MailModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map