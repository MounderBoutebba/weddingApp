import { User } from '../../entities/user.model';
import { Customer } from '../../../domain/entities/paiements/customer.model';
import { UsersServices } from '../../../infrastructure/databases/users/users.service';
import { PaiementsException } from '../../../domain/exceptions/paiement.exception';
import { Card } from '../../../domain/entities/paiements/card.model';
import { Iban } from '../../../domain/entities/paiements/iban.model';
import { NotFoundException } from '@nestjs/common';
import Stripe = require('stripe');
import { CardInfo } from '../../../domain/entities/paiements/card-info.model';
import { BankAccount } from '../../../domain/entities/paiements/bank-account.model';

export interface ICreatePaiementsAccount {
	createPaiementAccount(user: User): Promise<Customer>;
	createProviderPaiementAccount(user: User, bankAccount: BankAccount): Promise<Customer>;
	savePaiementAccount(customer: Customer, user: User): Promise<Customer>;
	getPaiementAccount(email: string): Promise<Customer>;
	addCardPaiement(email: string, cardToken: string): Promise<Customer>;
	generateTokenFromCard(card: Card): Promise<string>;
	tokenExist(token: any);
	findCustomer(id: string);
	addIban(iban: Iban);
	getSetepIntent(customerId: string);
	updateCard(cusID: string, metadata: object, deleteCard?: boolean);
	deleteCard(customerId: string, cardId: string);
	getAllCardsPaiementAccount(customerId: string): Promise<CardInfo[]>;
	identityVerification(accountId: string, identityPrincipale, identitySecondary);
	getProviderPaiementBankAccount(accountId: string, bankAccountId: string);
}

export class CreatePaiementsAccount<T extends ICreatePaiementsAccount> {
	constructor(private readonly paiementsServices: T, private readonly userServices: UsersServices) {}
	async createPaiementAccount(user: User): Promise<Customer> {
		const createPaiementAccount = await this.paiementsServices.createPaiementAccount(user);
		return createPaiementAccount;
	}

	async createProviderPaiementAccount(user: User, bankAccount: BankAccount): Promise<Customer> {
		const createPaiementAccount = await this.paiementsServices.createProviderPaiementAccount(user, bankAccount);
		return createPaiementAccount;
	}

	async getAllCardsPaiementAccount(email: string): Promise<CardInfo[]> {
		const paiementsInfo = await this.paiementsServices.getPaiementAccount(email);
		if (!paiementsInfo) {
			throw new PaiementsException('User dont have paiement account');
		} else {
			const listCardsInfo = await this.paiementsServices.getAllCardsPaiementAccount(paiementsInfo.customerId);
			return listCardsInfo;
		}
	}

	async savePaiementAccount(email: string): Promise<Customer> {
		const user = await this.userServices.findUserByEmail(email);
		const paiement = await this.paiementsServices.getPaiementAccount(user.email);
		if (paiement && paiement.customerId && paiement.customerId !== '') {
			// to do exception alerady have account
			throw new PaiementsException('User already have paiement account');
		} else {
			const customer: Customer = await this.createPaiementAccount(user);
			const saveCustomer: Customer = await this.paiementsServices.savePaiementAccount(customer, user);
			return saveCustomer;
		}
	}

	async saveProviderPaiementAccount(email: string, bankAccount: BankAccount): Promise<Customer> {
		const user = await this.userServices.findUserByEmail(email);
		const paiement = await this.paiementsServices.getPaiementAccount(user.email);
		if (paiement && paiement.accountId && paiement.accountId !== '') {
			// to do exception alerady have account
			throw new PaiementsException('User already have paiement account');
		} else {
			const customer: Customer = await this.createProviderPaiementAccount(user, bankAccount);
			const saveCustomer: Customer = await this.paiementsServices.savePaiementAccount(customer, user);
			return saveCustomer;
		}
	}

	async getProviderPaiementAccount(email: string) {
		const user = await this.userServices.findUserByEmail(email);
		const paiement = await this.paiementsServices.getPaiementAccount(user.email);

		if (!paiement || !paiement.accountId || paiement.accountId === '') {
			// to do exception alerady have account
			throw new PaiementsException("User don't have paiement account");
		} else {
			//
			console.log(paiement);
			const getProviderBankAccount = await this.paiementsServices.getProviderPaiementBankAccount(
				paiement.accountId,
				paiement.bankAccountId
			);
			return getProviderBankAccount;
		}
	}
	async identityVerification(email: string, identityPrincipale, identitySecondary) {
		const paiement = await this.paiementsServices.getPaiementAccount(email);
		if (!paiement || !paiement.accountId) {
			// to do exception alerady have account
			throw new PaiementsException('Provider not have have paiement account');
		} else {
			const identityVerification = this.paiementsServices.identityVerification(
				paiement.accountId,
				identityPrincipale,
				identitySecondary
			);
			return identityVerification;
		}
	}

	async getPaiementAccount(email: string): Promise<Customer> {
		const getPaiementAccount: Customer = await this.paiementsServices.getPaiementAccount(email);
		return getPaiementAccount;
	}

	async addCardPaiement(email: string, card: Card): Promise<Customer> {
		const user = await this.userServices.findUserByEmail(email);
		const paiement = await this.paiementsServices.getPaiementAccount(user.email);
		if (!paiement || !paiement.customerId || paiement.customerId === '') {
			// to do exception alerady have account
			// throw new PaiementsException('User dont have paiement account');
			const createCostumerAccount = await this.paiementsServices.createPaiementAccount(user);
			const saveNewCostumerInApp = await this.paiementsServices.savePaiementAccount(createCostumerAccount, user);
			if (saveNewCostumerInApp) {
				return this.addCardPaiement(email, card);
			}
		} else {
			// before we add card
			// we will check if this card duplicate or no by finger print
			let checkToken = [];
			const generatedTokenSource = await this.paiementsServices.generateTokenFromCard(card);
			const tokenAlreadyExist = await this.paiementsServices.tokenExist(generatedTokenSource);
			const allTokens = await this.paiementsServices.findCustomer(paiement.customerId);

			if (allTokens.hasOwnProperty('sources')) {
				checkToken = allTokens.sources.data.filter(
					item => item.fingerprint === tokenAlreadyExist.card.fingerprint
				);
			}
			if (checkToken.length === 0) {
				return await this.paiementsServices.addCardPaiement(email, generatedTokenSource);
			} else {
				throw new PaiementsException('This card already exist !! ');
			}
		}
	}

	async generateTokenFromCard(card: Card): Promise<string> {
		return await this.paiementsServices.generateTokenFromCard(card);
	}

	async addIban(email: string, iban: Iban) {
		const paiementsInfo = await this.paiementsServices.getPaiementAccount(email);
		if (!paiementsInfo) {
			throw new PaiementsException('User dont have paiement account');
		} else {
			const createNewIbanToken = await this.paiementsServices.addIban(iban);
			return createNewIbanToken;
		}
	}

	async getSetupIntent(email: string) {
		const paiementsInfo = await this.paiementsServices.getPaiementAccount(email);
		if (!paiementsInfo) {
			throw new PaiementsException('User dont have paiement account');
		} else {
			const setupIntentGenerated = await this.paiementsServices.getSetepIntent(paiementsInfo.customerId);
			return setupIntentGenerated;
		}
	}
	async getClientCards(user: User): Promise<Stripe.customers.ICustomer> {
		const clientPaymentAccount: Customer = await this.paiementsServices.getPaiementAccount(user.email);

		if (clientPaymentAccount) {
			const coustomer = await this.paiementsServices.findCustomer(clientPaymentAccount.customerId);

			return coustomer;
		} else {
			throw new NotFoundException(" This Client don't have any card !! ");
		}
	}
	async updateDefualtCard(user: User, fingerPrint: string) {
		const costumer: Stripe.customers.ICustomer = await this.getClientCards(user);
		const isFingerPrint = costumer.sources.data.filter((item: Stripe.ICard) => item.fingerprint === fingerPrint);

		if (isFingerPrint.length) {
			const cartId: string = isFingerPrint[0].id;
			const sourceUpdate = { default_source: cartId };
			return await this.paiementsServices.updateCard(costumer.id, sourceUpdate);
		}
	}
	async deleteCardFromCostumer(email: string, cardId: string) {
		const paiementsInfo = await this.paiementsServices.getPaiementAccount(email);
		if (paiementsInfo) {
			const cartId: string = cardId;
			return await this.paiementsServices.deleteCard(paiementsInfo.customerId, cartId);
		} else {
			throw new NotFoundException(' This card not exist !!  ');
		}
	}
	// client can add cart or multiple ,
	// client can set default card
	// client can delete card ,
	// client can get all cards
}
