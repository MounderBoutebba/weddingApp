import { Injectable } from '@nestjs/common';
import * as Stripe from 'stripe';
import { ConfigService } from '../../../presentation/config/config-service';
import { Card } from '../../../domain/entities/paiements/card.model';
import { Iban } from '../../../domain/entities/paiements/iban.model';
import { Charge } from '../../../domain/entities/paiements/charge.model';
import { Transfert } from '../../../domain/entities/paiements/transfert.model';
import { User } from '../../../domain/entities/user.model';
import { BankAccount } from '../../../domain/entities/paiements/bank-account.model';

const configService = new ConfigService();

export const stripe = new Stripe(configService.get(`STRIPE_API_KEY`));
@Injectable()
export class StripeService {
	private readonly stripe: Stripe = stripe;
	async findAllCustomers(): Promise<Stripe.IList<Stripe.customers.ICustomer>> {
		const customers = await this.stripe.customers.list();
		return customers;
	}
	async tokenExist(token) {
		return await this.stripe.tokens.retrieve(token);
	}
	async findCustomer(id: string): Promise<Stripe.customers.ICustomer> {
		const customer = await this.stripe.customers.retrieve(id);
		return customer;
	}

	async createCustomer(customerInfo: Stripe.customers.ICustomerCreationOptions): Promise<Stripe.customers.ICustomer> {
		const customer = await this.stripe.customers.create(customerInfo);
		return customer;
	}
	async createAccount(
		accountInfo: Stripe.accounts.IAccountCreationOptions,
		user: User,
		bankAccount: BankAccount
	): Promise<{ accoundId: string; bankId: string }> {
		const accountCreated: { accoundId: string; bankId: string } = {
			accoundId: '',
			bankId: ''
		};
		const stripe = require('stripe')(configService.get(`STRIPE_API_KEY`));
		console.log(typeof bankAccount.dateOfBirth);
		const dateOfBirth = new Date(bankAccount.dateOfBirth);
		const createdToken = await stripe.tokens.create({
			account: {
				business_type: 'individual',
				individual: {
					first_name: bankAccount.firstname,
					last_name: bankAccount.lastname,
					address: {
						line1: bankAccount.address,
						postal_code: bankAccount.postalCode,
						city: bankAccount.city
					},
					phone: user.phone.country + (user.phone.phoneNumber + '').substring(1),
					email: accountInfo.email,
					dob: {
						day: dateOfBirth.getDay(),
						month: dateOfBirth.getMonth(),
						year: dateOfBirth.getFullYear()
					}
				},
				tos_shown_and_accepted: true
			}
		});
		accountInfo.account_token = createdToken.id;
		const accountStripeCreated = await this.stripe.accounts.create(accountInfo);
		console.log('accountStripeCreated stripe', accountStripeCreated);

		const tokenBankAccount = await stripe.tokens.create({
			bank_account: {
				object: 'bank_account',
				country: bankAccount.country,
				currency: bankAccount.currency,
				account_holder_name: bankAccount.account_holder_name,
				account_holder_type: bankAccount.account_holder_type,
				account_number: bankAccount.account_number
			}
		});

		const createExternalAccount = await stripe.accounts.createExternalAccount(accountStripeCreated.id, {
			external_account: tokenBankAccount.id
		});

		accountCreated.accoundId = accountStripeCreated.id;
		accountCreated.bankId = createExternalAccount.id;
		console.log('accountCreated stripe', accountCreated);

		// identity verification
		// 1. upload file
		// 2. attach file
		return accountCreated;
	}

	async getAccount(accountId: string, bankAccountId: string) {
		const getExternalAccount = await this.stripe.accounts.retrieveExternalAccount(accountId, bankAccountId);
		return getExternalAccount;
	}

	async identityVerification(accountId: string, identityPrincipale, identitySecondary) {
		const stripe = require('stripe')(configService.get(`STRIPE_API_KEY`));

		const docPrincipale = await stripe.files.create(
			{
				purpose: 'identity_document',
				file: {
					data: identityPrincipale.buffer,
					name: identityPrincipale.name,
					type: 'application/octet-stream'
				}
			},
			{
				stripe_account: accountId
			}
		);
		const docSecondary = await stripe.files.create(
			{
				purpose: 'identity_document',
				file: {
					data: identitySecondary.buffer,
					name: identitySecondary.name,
					type: 'application/octet-stream'
				}
			},
			{
				stripe_account: accountId
			}
		);
		const tokenUpdate = await stripe.tokens.create({
			account: {
				individual: {
					verification: {
						document: {
							front: docPrincipale.id
						},
						additional_document: {
							front: docSecondary.id
						}
					}
				}
			}
		});
		const accountUpdated = await stripe.accounts.update(accountId, {
			account_token: tokenUpdate.id
		});
		return accountUpdated;
	}

	async updateCustomer(
		id: string,
		customerInfo: any // Stripe.customers.ICustomerUpdateOptions
	): Promise<any> {
		// const customer = await this.stripe.customers.update(id, customerInfo);
		const customer = await this.stripe.customers.createSource(id, customerInfo);
		return customer;
	}

	async createPaymentIntent(customerId: string, montant: number, invoiceId: string) {
		const intent = await stripe.paymentIntents.create({
			payment_method: 'card',
			amount: montant,
			currency: 'eur',
			confirm: true,
			customer: customerId,
			metadata: {
				invoiceNumber: invoiceId
			}
		});
		return intent;
	}

	async updateCustomerSource(
		id: string,
		customerInfo: any // Stripe.customers.ICustomerUpdateOptions
	): Promise<any> {
		// const customer = await this.stripe.customers.update(id, customerInfo);
		const customer = await this.stripe.customers.update(id, customerInfo);
		return customer;
	}

	async deleteCustomer(id: string): Promise<Stripe.IDeleteConfirmation> {
		const deletetionConfirmation = await this.stripe.customers.del(id);
		return deletetionConfirmation;
	}
	async deleteCard(customerId: string, cardId: string) {
		const deleteCard = await this.stripe.customers.deleteSource(customerId, cardId);
		return deleteCard;
	}

	async createCardToken(cardBank: Card): Promise<Stripe.tokens.ICardToken> {
		const card: Stripe.cards.ICardSourceCreationOptions = {
			object: 'card',
			number: cardBank.number,
			exp_month: cardBank.exp_month,
			exp_year: cardBank.exp_year,
			cvc: cardBank.cvc
		};
		const token = await this.stripe.tokens.create({
			card
		});
		return token;
	}
	async getSetepIntent(customerId: string) {
		const setupIntent = await stripe.setupIntents.create({
			payment_method_types: ['sepa_debit'],
			customer: customerId
		});
		const clientSecret = setupIntent.client_secret;
		return clientSecret;
	}

	async createSourcesIban(iban: Iban): Promise<Stripe.sources.ISource> {
		const sepaDebit = await this.stripe.sources.create({
			type: 'sepa_debit',
			sepa_debit: {
				iban: 'DE89370400440532013000'
			},
			currency: 'eur',
			owner: {
				name: 'Jenny Rosen'
			}
		});
		return sepaDebit;
	}

	async makeCharge(charge: Charge): Promise<Stripe.charges.ICharge> {
		const chargeData: Stripe.charges.IChargeCreationOptions = {
			amount: charge.amount,
			currency: charge.currency,
			customer: charge.customer,
			source: charge.source
		};
		const createCharge = this.stripe.charges.create(chargeData);
		return createCharge;
	}

	async makeRefund(charge: Charge): Promise<Stripe.refunds.IRefund> {
		const refund = await stripe.charges.refund(charge.id, {
			amount: charge.amount
		});
		return refund;
	}

	async createTransfer(transfertToCustomer: Transfert): Promise<Stripe.transfers.ITransfer> {
		const transfert = this.stripe.transfers.create({
			amount: 400,
			currency: 'eur',
			destination: 'acct_1CsFhgI8JOPeyiTm'
		});
		return transfert;
	}

	async listAllCards(customerId: string): Promise<Stripe.IList<Stripe.cards.ICard>> {
		const listAllCards = this.stripe.customers.listSources(customerId, { object: 'card', limit: 10 });
		return listAllCards;
	}
}
