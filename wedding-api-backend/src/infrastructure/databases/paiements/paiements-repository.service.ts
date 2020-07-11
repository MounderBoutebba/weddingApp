import { Injectable } from '@nestjs/common';
import { ICreatePaiementsAccount } from '../../../domain/usecases/services/create-paiments-account.usecase';
import { User } from '../../../domain/entities/user.model';
import { StripeService } from '../../externalInterfaces/stripe/stripe.service';
import * as Stripe from 'stripe';
import { Customer } from '../../../domain/entities/paiements/customer.model';
import { UsersServices } from '../users/users.service';
import { PaiementsRepository } from './paiements.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from '../../../domain/entities/paiements/card.model';
import { Iban } from '../../../domain/entities/paiements/iban.model';
import { CardInfo } from '../../../domain/entities/paiements/card-info.model';
import { BankAccount } from '../../../domain/entities/paiements/bank-account.model';

@Injectable()
export class PaiementsRepositoryService implements ICreatePaiementsAccount {
	constructor(
		private readonly externalPaiementsService: StripeService,
		private readonly usersServices: UsersServices,
		@InjectRepository(PaiementsRepository)
		private readonly paiementsRepository: PaiementsRepository
	) {}
	async createPaiementAccount(user: User): Promise<Customer> {
		const customerCreationOptions: Stripe.customers.ICustomerCreationOptions = {
			description: 'Customer for ' + user.email,
			email: user.email
		};
		const createdCustomer: Stripe.customers.ICustomer = await this.externalPaiementsService.createCustomer(
			customerCreationOptions
		);
		const customer: Customer = {
			id: createdCustomer.id,
			customerId: createdCustomer.id
		};
		return customer;
	}
	async createProviderPaiementAccount(user: User, bankAccount: BankAccount): Promise<Customer> {
		const customerCreationOptions: Stripe.accounts.IAccountCreationOptions = {
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

		const createdAccount = await this.externalPaiementsService.createAccount(
			customerCreationOptions,
			user,
			bankAccount
		);
		const customer: Customer = {
			id: createdAccount.accoundId,
			accountId: createdAccount.accoundId,
			bankAccountId: createdAccount.bankId
		};
		return customer;
	}
	async identityVerification(accountId: string, identityPrincipale, identitySecondary) {
		const identityVerification = await this.externalPaiementsService.identityVerification(
			accountId,
			identityPrincipale,
			identitySecondary
		);
		return identityVerification;
	}
	async savePaiementAccount(customer: Customer, user: User): Promise<Customer> {
		const userEntity = await this.usersServices.findUserByEmail(user.email);
		const paiementEntity = {
			customerId: customer.customerId,
			accountId: customer.accountId,
			user: userEntity,
			bankAccountId: customer.bankAccountId
		};
		const paiementSave = await this.paiementsRepository.save(paiementEntity);
		const customerSaved: Customer = {
			id: paiementSave.id,
			customerId: paiementSave.customerId,
			accountId: customer.accountId
		};
		return customerSaved;
	}

	async getPaiementAccount(email: string) {
		const userEntity = await this.usersServices.findUserByEmail(email);
		return this.paiementsRepository.findOne({ user: userEntity });
	}

	async getProviderPaiementBankAccount(accountId: string, bankAccountId: string) {
		const stripeAccount = await this.externalPaiementsService.getAccount(accountId, bankAccountId);
		return stripeAccount;
	}

	async generateTokenFromCard(card: Card): Promise<string> {
		const token: Stripe.tokens.ICardToken = await this.externalPaiementsService.createCardToken(card);
		return token.id;
	}

	async addCardPaiement(email: string, cardToken: string): Promise<Customer> {
		const customer = await this.getPaiementAccount(email);
		const updateCustomerWithSource = await this.externalPaiementsService.updateCustomer(customer.customerId, {
			source: cardToken
		});
		return updateCustomerWithSource;
	}
	async tokenExist(token) {
		return await this.externalPaiementsService.tokenExist(token);
	}

	async findCustomer(id): Promise<Stripe.customers.ICustomer> {
		return await this.externalPaiementsService.findCustomer(id);
	}

	async addIban(iban: Iban) {
		return await this.externalPaiementsService.createSourcesIban(iban);
	}

	async updateCard(cusID: string, metadata: object) {
		return await this.externalPaiementsService.updateCustomerSource(cusID, metadata);
	}
	async deleteCard(customerId: string, cardId: string) {
		return await this.externalPaiementsService.deleteCard(customerId, cardId);
	}
	async getSetepIntent(customerId: string) {
		return await this.externalPaiementsService.getSetepIntent(customerId);
	}
	async getAllCardsPaiementAccount(customerId: string): Promise<CardInfo[]> {
		const listAllStripeCards = await this.externalPaiementsService.listAllCards(customerId);
		const cards = listAllStripeCards.data;
		const allCards: CardInfo[] = [];
		cards.forEach(card =>
			allCards.push({
				id: card.id,
				brand: card.brand,
				country: card.country,
				exp_month: card.exp_month,
				exp_year: card.exp_year,
				last4: card.last4
			})
		);
		return allCards;
	}
}
