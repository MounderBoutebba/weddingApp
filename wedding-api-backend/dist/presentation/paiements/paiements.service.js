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
const create_paiments_account_usecase_1 = require("../../domain/usecases/services/create-paiments-account.usecase");
const paiements_repository_service_1 = require("../../infrastructure/databases/paiements/paiements-repository.service");
const users_service_1 = require("../../infrastructure/databases/users/users.service");
let PaiementsService = class PaiementsService {
    constructor(paiementsRepositoryService, usersServices) {
        this.paiementsRepositoryService = paiementsRepositoryService;
        this.usersServices = usersServices;
        this.createPaiementsUsecase = new create_paiments_account_usecase_1.CreatePaiementsAccount(this.paiementsRepositoryService, this.usersServices);
    }
    async addPaiementAccount(email) {
        try {
            return await this.createPaiementsUsecase.savePaiementAccount(email);
        }
        catch (err) {
            throw new common_1.ConflictException(err.message);
        }
    }
    async addProviderPaiementAccount(email, bankAccount) {
        try {
            return await this.createPaiementsUsecase.saveProviderPaiementAccount(email, bankAccount);
        }
        catch (err) {
            throw new common_1.ConflictException(err.message);
        }
    }
    async getProviderPaiementAccount(email) {
        try {
            return await this.createPaiementsUsecase.getProviderPaiementAccount(email);
        }
        catch (err) {
            throw new common_1.ConflictException(err.message);
        }
    }
    async identityVerificationPaiementAccount(email, identityPrincipale, identitySecondary) {
        try {
            return await this.createPaiementsUsecase.identityVerification(email, identityPrincipale, identitySecondary);
        }
        catch (err) {
            throw new common_1.ConflictException(err.message);
        }
    }
    async getPaiementAccount(email) {
        try {
            return await this.createPaiementsUsecase.getPaiementAccount(email);
        }
        catch (err) {
            throw new common_1.ConflictException(err.message);
        }
    }
    async addCardToPaiementAccount(email, card) {
        try {
            return await this.createPaiementsUsecase.addCardPaiement(email, card);
        }
        catch (err) {
            throw new common_1.ConflictException(err.message);
        }
    }
    async getAllCardsPaiement(email) {
        try {
            return await this.createPaiementsUsecase.getAllCardsPaiementAccount(email);
        }
        catch (err) {
            throw new common_1.NotFoundException(err.message);
        }
    }
    async addIban(email, iban) {
        try {
            const ibanJson = {
                currency: iban.currency,
                type: iban.type,
                sepa_debit: { iban: iban.iban },
                owner: {
                    name: iban.name
                }
            };
            return await this.createPaiementsUsecase.addIban(email, ibanJson);
        }
        catch (err) {
            throw new common_1.ConflictException(err.message);
        }
    }
    async getSetupIntent(email) {
        return this.createPaiementsUsecase.getSetupIntent(email);
    }
    async getClientCards(user) {
        return await this.createPaiementsUsecase.getClientCards(user);
    }
    async updateCostumer(user, fingerPrint) {
        return await this.createPaiementsUsecase.updateDefualtCard(user, fingerPrint);
    }
    async deleteCard(email, cardId) {
        return await this.createPaiementsUsecase.deleteCardFromCostumer(email, cardId);
    }
};
PaiementsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [paiements_repository_service_1.PaiementsRepositoryService,
        users_service_1.UsersServices])
], PaiementsService);
exports.PaiementsService = PaiementsService;
//# sourceMappingURL=paiements.service.js.map