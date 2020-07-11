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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_service_1 = require("../../../presentation/config/config-service");
const configService = new config_service_1.ConfigService();
let EmailService = class EmailService {
    constructor() { }
    sendMmail(content, email) {
        const mailjet = require('node-mailjet').connect(configService.get(`MAIL_USER`), configService.get(`MAIL_PASSWORD`));
        const request = mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: 'rebouh.n@transfonum.com',
                        Name: 'WINWEZ SUPPORT'
                    },
                    To: [
                        {
                            Email: `${email}`
                        }
                    ],
                    Subject: 'Winwez support',
                    TextPart: content,
                    HTMLPart: `
             <div style="text-align: center;">
                <h4> ${content}</h4>
             </div>
            `
                }
            ]
        });
        request
            .then(result => {
            console.log(result.body);
        })
            .catch(err => {
            console.log(err.statusCode);
        });
    }
};
EmailService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map