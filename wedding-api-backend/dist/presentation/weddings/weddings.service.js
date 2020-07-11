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
const weddings_service_1 = require("../../infrastructure/databases/weddings/weddings.service");
const twilio_1 = require("twilio");
const config_service_1 = require("../config/config-service");
let WeddingsService = class WeddingsService {
    constructor(weddingsService, configService) {
        this.weddingsService = weddingsService;
        this.configService = configService;
        this.twilio = new twilio_1.Twilio(configService.get('ACCOUNT_SID'), configService.get('AUTH_TOKEN'));
    }
    async patchWedding(id, email, wedding) {
        let dbWedding = await this.weddingsService.findWedding(id, email);
        if (dbWedding.phoneVerified &&
            dbWedding.conjointPhone.toString() ===
                wedding.conjointPhone.country + wedding.conjointPhone.phoneNumber.slice(1)) {
            dbWedding = await this.weddingsService.patchWedding(id, email, wedding);
        }
        else if (!!wedding.phoneToken && dbWedding.phoneToken === wedding.phoneToken) {
            wedding.phoneVerified = true;
            dbWedding = await this.weddingsService.patchWedding(id, email, wedding);
        }
        else {
            wedding.phoneToken = `${Math.floor(Math.random() * 1000000)}`;
            wedding.phoneVerified = false;
            dbWedding = await this.weddingsService.patchWedding(id, email, wedding);
            try {
                const res = await this.twilio.messages.create({
                    body: 'Bienvenue chez Winwez, voici le code à saisir afin de valider votre compte ' +
                        wedding.phoneToken,
                    from: this.configService.get('PHONE_NUMBER'),
                    to: wedding.conjointPhone.country + wedding.conjointPhone.phoneNumber.slice(1)
                });
                console.log(res);
            }
            catch (e) {
                throw new common_1.BadRequestException(e.message);
            }
        }
        return dbWedding;
    }
    async createWedding(email, wedding) {
        wedding.phoneToken = `${Math.floor(Math.random() * 1000000)}`;
        const createdWedding = await this.weddingsService.createWedding(email, wedding);
        try {
            const res = await this.twilio.messages.create({
                body: 'Bienvenue chez Winwez, voici le code à saisir afin de valider votre compte ' + wedding.phoneToken,
                from: this.configService.get('PHONE_NUMBER'),
                to: wedding.conjointPhone.country + wedding.conjointPhone.phoneNumber.slice(1)
            });
            console.log(res);
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
        return createdWedding;
    }
    async findWedding(id, email) {
        return await this.weddingsService.findWedding(id, email);
    }
    async findWeddingByEmail(email) {
        return await this.weddingsService.findWeddingByEmail(email);
    }
};
WeddingsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [weddings_service_1.WeddingsServices, config_service_1.ConfigService])
], WeddingsService);
exports.WeddingsService = WeddingsService;
//# sourceMappingURL=weddings.service.js.map