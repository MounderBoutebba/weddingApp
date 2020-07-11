"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nest-modules/mailer");
const path = require("path");
const config_service_1 = require("../../../presentation/config/config-service");
const configService = new config_service_1.ConfigService();
let MailModule = class MailModule {
};
MailModule = __decorate([
    common_1.Module({
        imports: [
            mailer_1.MailerModule.forRoot({
                transport: 'smtp://d48bd36dbb7d45:54107a3f4b8341@smtp.mailtrap.io',
                defaults: {
                    from: '"nest-modules" <modules@nestjs.com>',
                },
                template: {
                    dir: path.resolve() + '/templates',
                    adapter: new mailer_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        ],
    })
], MailModule);
exports.MailModule = MailModule;
//# sourceMappingURL=mail.module.js.map