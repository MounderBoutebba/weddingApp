"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paiement_exception_1 = require("../../../domain/exceptions/paiement.exception");
const common_1 = require("@nestjs/common");
class CreatePaiementsAccount {
    constructor(paiementsServices, userServices) {
        this.paiementsServices = paiementsServices;
        this.userServices = userServices;
    }
    async createPaiementAccount(user) {
        const createPaiementAccount = await this.paiementsServices.createPaiementAccount(user);
        return createPaiementAccount;
    }
    async createProviderPaiementAccount(user, bankAccount) {
        const createPaiementAccount = await this.paiementsServices.createProviderPaiementAccount(user, bankAccount);
        return createPaiementAccount;
    }
    async getAllCardsPaiementAccount(email) {
        const paiementsInfo = await this.paiementsServices.getPaiementAccount(email);
        if (!paiementsInfo) {
            throw new paiement_exception_1.PaiementsException('User dont have paiement account');
        }
        else {
            const listCardsInfo = await this.paiementsServices.getAllCardsPaiementAccount(paiementsInfo.customerId);
            return listCardsInfo;
        }
    }
    async savePaiementAccount(email) {
        const user = await this.userServices.findUserByEmail(email);
        const paiement = await this.paiementsServices.getPaiementAccount(user.email);
        if (paiement && paiement.customerId && paiement.customerId !== '') {
            throw new paiement_exception_1.PaiementsException('User already have paiement account');
        }
        else {
            const customer = await this.createPaiementAccount(user);
            const saveCustomer = await this.paiementsServices.savePaiementAccount(customer, user);
            return saveCustomer;
        }
    }
    async saveProviderPaiementAccount(email, bankAccount) {
        const user = await this.userServices.findUserByEmail(email);
        const paiement = await this.paiementsServices.getPaiementAccount(user.email);
        if (paiement && paiement.accountId && paiement.accountId !== '') {
            throw new paiement_exception_1.PaiementsException('User already have paiement account');
        }
        else {
            const customer = await this.createProviderPaiementAccount(user, bankAccount);
            const saveCustomer = await this.paiementsServices.savePaiementAccount(customer, user);
            return saveCustomer;
        }
    }
    async getProviderPaiementAccount(email) {
        const user = await this.userServices.findUserByEmail(email);
        const paiement = await this.paiementsServices.getPaiementAccount(user.email);
        if (!paiement || !paiement.accountId || paiement.accountId === '') {
            throw new paiement_exception_1.PaiementsException("User don't have paiement account");
        }
        else {
            console.log(paiement);
            const getProviderBankAccount = await this.paiementsServices.getProviderPaiementBankAccount(paiement.accountId, paiement.bankAccountId);
            return getProviderBankAccount;
        }
    }
    async identityVerification(email, identityPrincipale, identitySecondary) {
        const paiement = await this.paiementsServices.getPaiementAccount(email);
        if (!paiement || !paiement.accountId) {
            throw new paiement_exception_1.PaiementsException('Provider not have have paiement account');
        }
        else {
            const identityVerification = this.paiementsServices.identityVerification(paiement.accountId, identityPrincipale, identitySecondary);
            return identityVerification;
        }
    }
    async getPaiementAccount(email) {
        const getPaiementAccount = await this.paiementsServices.getPaiementAccount(email);
        return getPaiementAccount;
    }
    async addCardPaiement(email, card) {
        const user = await this.userServices.findUserByEmail(email);
        const paiement = await this.paiementsServices.getPaiementAccount(user.email);
        if (!paiement || !paiement.customerId || paiement.customerId === '') {
            const createCostumerAccount = await this.paiementsServices.createPaiementAccount(user);
            const saveNewCostumerInApp = await this.paiementsServices.savePaiementAccount(createCostumerAccount, user);
            if (saveNewCostumerInApp) {
                return this.addCardPaiement(email, card);
            }
        }
        else {
            let checkToken = [];
            const generatedTokenSource = await this.paiementsServices.generateTokenFromCard(card);
            const tokenAlreadyExist = await this.paiementsServices.tokenExist(generatedTokenSource);
            const allTokens = await this.paiementsServices.findCustomer(paiement.customerId);
            if (allTokens.hasOwnProperty('sources')) {
                checkToken = allTokens.sources.data.filter(item => item.fingerprint === tokenAlreadyExist.card.fingerprint);
            }
            if (checkToken.length === 0) {
                return await this.paiementsServices.addCardPaiement(email, generatedTokenSource);
            }
            else {
                throw new paiement_exception_1.PaiementsException('This card already exist !! ');
            }
        }
    }
    async generateTokenFromCard(card) {
        return await this.paiementsServices.generateTokenFromCard(card);
    }
    async addIban(email, iban) {
        const paiementsInfo = await this.paiementsServices.getPaiementAccount(email);
        if (!paiementsInfo) {
            throw new paiement_exception_1.PaiementsException('User dont have paiement account');
        }
        else {
            const createNewIbanToken = await this.paiementsServices.addIban(iban);
            return createNewIbanToken;
        }
    }
    async getSetupIntent(email) {
        const paiementsInfo = await this.paiementsServices.getPaiementAccount(email);
        if (!paiementsInfo) {
            throw new paiement_exception_1.PaiementsException('User dont have paiement account');
        }
        else {
            const setupIntentGenerated = await this.paiementsServices.getSetepIntent(paiementsInfo.customerId);
            return setupIntentGenerated;
        }
    }
    async getClientCards(user) {
        const clientPaymentAccount = await this.paiementsServices.getPaiementAccount(user.email);
        if (clientPaymentAccount) {
            const coustomer = await this.paiementsServices.findCustomer(clientPaymentAccount.customerId);
            return coustomer;
        }
        else {
            throw new common_1.NotFoundException(" This Client don't have any card !! ");
        }
    }
    async updateDefualtCard(user, fingerPrint) {
        const costumer = await this.getClientCards(user);
        const isFingerPrint = costumer.sources.data.filter((item) => item.fingerprint === fingerPrint);
        if (isFingerPrint.length) {
            const cartId = isFingerPrint[0].id;
            const sourceUpdate = { default_source: cartId };
            return await this.paiementsServices.updateCard(costumer.id, sourceUpdate);
        }
    }
    async deleteCardFromCostumer(email, cardId) {
        const paiementsInfo = await this.paiementsServices.getPaiementAccount(email);
        if (paiementsInfo) {
            const cartId = cardId;
            return await this.paiementsServices.deleteCard(paiementsInfo.customerId, cartId);
        }
        else {
            throw new common_1.NotFoundException(' This card not exist !!  ');
        }
    }
}
exports.CreatePaiementsAccount = CreatePaiementsAccount;
//# sourceMappingURL=create-paiments-account.usecase.js.map