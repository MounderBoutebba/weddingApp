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
const paiements_service_1 = require("./paiements.service");
const card_dto_1 = require("./dto/card.dto");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../../global/guards/roles.guard");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../../global/decorators/roles.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const banck_account_dto_1 = require("./dto/banck-account.dto");
let PaiementsController = class PaiementsController {
    constructor(paiementsService) {
        this.paiementsService = paiementsService;
    }
    async createCustomer(email, res) {
        const customerCreated = await this.paiementsService.addPaiementAccount(email);
        return res.status(common_1.HttpStatus.CREATED).json(customerCreated);
    }
    async getCustomer(email, res) {
        const customerCreated = await this.paiementsService.getPaiementAccount(email);
        if (!customerCreated) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'User dont have paiements infos' });
        }
        return res.status(common_1.HttpStatus.CREATED).json(customerCreated);
    }
    async addCardPaiement(email, cardDto, res) {
        const cardAdded = await this.paiementsService.addCardToPaiementAccount(email, cardDto);
        return res.status(common_1.HttpStatus.CREATED).json(cardAdded);
    }
    async getAllCardsPaiement(email, res, req) {
        if (req.role !== 'admin' && req.user.email !== email) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json('UNAUTHORIZED');
        }
        else {
            const cards = await this.paiementsService.getAllCardsPaiement(email);
            return res.status(common_1.HttpStatus.OK).json(cards);
        }
    }
    async addAccountPaiementProvider(email, bankAccount, req, res) {
        if (req.role !== 'admin' && req.user.email !== email) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json('UNAUTHORIZED');
        }
        else {
            const accountCreated = await this.paiementsService.addProviderPaiementAccount(email, bankAccount);
            return res.status(common_1.HttpStatus.CREATED).json(accountCreated);
        }
    }
    async getAccountPaiementProvider(email, req, res) {
        if (req.role !== 'admin' && req.user.email !== email) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json('UNAUTHORIZED');
        }
        else {
            const accountCreated = await this.paiementsService.getProviderPaiementAccount(email);
            return res.status(common_1.HttpStatus.CREATED).json(accountCreated);
        }
    }
    async uploadFile(identityPrincipale, identitySecondary, modelData, res, req) {
        if (req.role !== 'admin' && req.user.email !== modelData.email) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED);
        }
        else {
            const identityverification = await this.paiementsService.identityVerificationPaiementAccount(req.user.email, identityPrincipale, identitySecondary);
            return res.status(common_1.HttpStatus.CREATED).json(identityverification);
        }
    }
    async deleteClientCard(email, cardId, req, res) {
        if (req.role !== 'admin' && req.user.email !== email) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED);
        }
        else {
            const cards = await this.paiementsService.deleteCard(email, cardId);
            return res.status(common_1.HttpStatus.OK).json(cards);
        }
    }
};
__decorate([
    common_1.Post('/customers/:email'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client', 'admin', 'provider'),
    __param(0, common_1.Param('email')), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaiementsController.prototype, "createCustomer", null);
__decorate([
    common_1.Get('/customers/:email'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    __param(0, common_1.Param('email')), __param(1, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaiementsController.prototype, "getCustomer", null);
__decorate([
    common_1.Post('/customers/:email/card'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client', 'admin'),
    __param(0, common_1.Param('email')), __param(1, common_1.Body()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, card_dto_1.CardDto, Object]),
    __metadata("design:returntype", Promise)
], PaiementsController.prototype, "addCardPaiement", null);
__decorate([
    common_1.Get('/customers/:email/cards'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client', 'admin'),
    __param(0, common_1.Param('email')), __param(1, common_1.Response()), __param(2, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PaiementsController.prototype, "getAllCardsPaiement", null);
__decorate([
    common_1.Post('/accounts/:email'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider', 'admin'),
    __param(0, common_1.Param('email')),
    __param(1, common_1.Body()),
    __param(2, common_1.Request()),
    __param(3, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, banck_account_dto_1.BankAccountDto, Object, Object]),
    __metadata("design:returntype", Promise)
], PaiementsController.prototype, "addAccountPaiementProvider", null);
__decorate([
    common_1.Get('/accounts/:email'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('provider', 'admin'),
    __param(0, common_1.Param('email')), __param(1, common_1.Request()), __param(2, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PaiementsController.prototype, "getAccountPaiementProvider", null);
__decorate([
    common_1.Post('/accounts/identityverification/:email'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    swagger_1.ApiConsumes('multipart/form-data'),
    roles_decorator_1.Roles('provider', 'admin'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    swagger_1.ApiBody({
        schema: {
            type: 'object',
            properties: {
                identityPrincipale: {
                    type: 'string',
                    format: 'binary'
                },
                identitySecondary: {
                    type: 'string',
                    format: 'binary'
                },
                email: {
                    type: 'string'
                }
            }
        }
    }),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.UploadedFile()),
    __param(2, common_1.Body()),
    __param(3, common_1.Response()),
    __param(4, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PaiementsController.prototype, "uploadFile", null);
__decorate([
    common_1.Delete('/customers/:email/card/:cardId'),
    common_1.UseGuards(passport_1.AuthGuard(), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('client', 'provider', 'admin'),
    __param(0, common_1.Param('email')),
    __param(1, common_1.Param('cardId')),
    __param(2, common_1.Request()),
    __param(3, common_1.Response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], PaiementsController.prototype, "deleteClientCard", null);
PaiementsController = __decorate([
    swagger_1.ApiTags('paiements'),
    swagger_1.ApiBearerAuth(),
    common_1.Controller('paiements'),
    __metadata("design:paramtypes", [paiements_service_1.PaiementsService])
], PaiementsController);
exports.PaiementsController = PaiementsController;
//# sourceMappingURL=paiements.controller.js.map