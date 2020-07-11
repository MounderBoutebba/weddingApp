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
const stripe_service_1 = require("../../externalInterfaces/stripe/stripe.service");
const users_service_1 = require("../users/users.service");
const paiements_repository_1 = require("./paiements.repository");
const typeorm_1 = require("@nestjs/typeorm");
let PaiementsRepositoryService = class PaiementsRepositoryService {
    constructor(externalPaiementsService, usersServices, paiementsRepository) {
        this.externalPaiementsService = externalPaiementsService;
        this.usersServices = usersServices;
        this.paiementsRepository = paiementsRepository;
    }
    async createPaiementAccount(user) {
        const customerCreationOptions = {
            description: 'Customer for ' + user.email,
            email: user.email
        };
        const createdCustomer = await this.externalPaiementsService.createCustomer(customerCreationOptions);
        const customer = {
            id: createdCustomer.id,
            customerId: createdCustomer.id
        };
        return customer;
    }
    async createProviderPaiementAccount(user, bankAccount) {
        const customerCreationOptions = {
            type: 'custom',
            country: bankAccount.country,
            requested_capabilities: ['card_payments', 'transfers'],
            email: user.email,
            business_profile: {
                mcc: '5734',
                support_url: 'https://www.winwez.com/support',
                url: 'https://www.winwez.com'
            }
        };
        const createdAccount = await this.externalPaiementsService.createAccount(customerCreationOptions, user, bankAccount);
        const customer = {
            id: createdAccount.accoundId,
            accountId: createdAccount.accoundId,
            bankAccountId: createdAccount.bankId
        };
        return customer;
    }
    async identityVerification(accountId, identityPrincipale, identitySecondary) {
        const identityVerification = await this.externalPaiementsService.identityVerification(accountId, identityPrincipale, identitySecondary);
        return identityVerification;
    }
    async savePaiementAccount(customer, user) {
        const userEntity = await this.usersServices.findUserByEmail(user.email);
        const paiementEntity = {
            customerId: customer.customerId,
            accountId: customer.accountId,
            user: userEntity,
            bankAccountId: customer.bankAccountId
        };
        const paiementSave = await this.paiementsRepository.save(paiementEntity);
        const customerSaved = {
            id: paiementSave.id,
            customerId: paiementSave.customerId,
            accountId: customer.accountId
        };
        return customerSaved;
    }
    async getPaiementAccount(email) {
        const userEntity = await this.usersServices.findUserByEmail(email);
        return this.paiementsRepository.findOne({ user: userEntity });
    }
    async getProviderPaiementBankAccount(accountId, bankAccountId) {
        const stripeAccount = await this.externalPaiementsService.getAccount(accountId, bankAccountId);
        return stripeAccount;
    }
    async generateTokenFromCard(card) {
        const token = await this.externalPaiementsService.createCardToken(card);
        return token.id;
    }
    async addCardPaiement(email, cardToken) {
        const customer = await this.getPaiementAccount(email);
        const updateCustomerWithSource = await this.externalPaiementsService.updateCustomer(customer.customerId, {
            source: cardToken
        });
        return updateCustomerWithSource;
    }
    async tokenExist(token) {
        return await this.externalPaiementsService.tokenExist(token);
    }
    async findCustomer(id) {
        return await this.externalPaiementsService.findCustomer(id);
    }
    async addIban(iban) {
        return await this.externalPaiementsService.createSourcesIban(iban);
    }
    async updateCard(cusID, metadata) {
        return await this.externalPaiementsService.updateCustomerSource(cusID, metadata);
    }
    async deleteCard(customerId, cardId) {
        return await this.externalPaiementsService.deleteCard(customerId, cardId);
    }
    async getSetepIntent(customerId) {
        return await this.externalPaiementsService.getSetepIntent(customerId);
    }
    async getAllCardsPaiementAccount(customerId) {
        const listAllStripeCards = await this.externalPaiementsService.listAllCards(customerId);
        const cards = listAllStripeCards.data;
        const allCards = [];
        cards.forEach(card => allCards.push({
            id: card.id,
            brand: card.brand,
            country: card.country,
            exp_month: card.exp_month,
            exp_year: card.exp_year,
            last4: card.last4
        }));
        return allCards;
    }
};
PaiementsRepositoryService = __decorate([
    common_1.Injectable(),
    __param(2, typeorm_1.InjectRepository(paiements_repository_1.PaiementsRepository)),
    __metadata("design:paramtypes", [stripe_service_1.StripeService,
        users_service_1.UsersServices,
        paiements_repository_1.PaiementsRepository])
], PaiementsRepositoryService);
exports.PaiementsRepositoryService = PaiementsRepositoryService;
//# sourceMappingURL=paiements-repository.service.js.map