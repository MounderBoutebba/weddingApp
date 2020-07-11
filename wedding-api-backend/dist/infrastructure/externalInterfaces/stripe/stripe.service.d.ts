import * as Stripe from 'stripe';
import { Card } from '../../../domain/entities/paiements/card.model';
import { Iban } from '../../../domain/entities/paiements/iban.model';
import { Charge } from '../../../domain/entities/paiements/charge.model';
import { Transfert } from '../../../domain/entities/paiements/transfert.model';
import { User } from '../../../domain/entities/user.model';
import { BankAccount } from '../../../domain/entities/paiements/bank-account.model';
export declare const stripe: Stripe;
export declare class StripeService {
    private readonly stripe;
    findAllCustomers(): Promise<Stripe.IList<Stripe.customers.ICustomer>>;
    tokenExist(token: any): Promise<Stripe.tokens.IToken>;
    findCustomer(id: string): Promise<Stripe.customers.ICustomer>;
    createCustomer(customerInfo: Stripe.customers.ICustomerCreationOptions): Promise<Stripe.customers.ICustomer>;
    createAccount(accountInfo: Stripe.accounts.IAccountCreationOptions, user: User, bankAccount: BankAccount): Promise<{
        accoundId: string;
        bankId: string;
    }>;
    getAccount(accountId: string, bankAccountId: string): Promise<Stripe.bankAccounts.IBankAccount>;
    identityVerification(accountId: string, identityPrincipale: any, identitySecondary: any): Promise<any>;
    updateCustomer(id: string, customerInfo: any): Promise<any>;
    createPaymentIntent(customerId: string, montant: number, invoiceId: string): Promise<Stripe.paymentIntents.IPaymentIntent>;
    updateCustomerSource(id: string, customerInfo: any): Promise<any>;
    deleteCustomer(id: string): Promise<Stripe.IDeleteConfirmation>;
    deleteCard(customerId: string, cardId: string): Promise<Stripe.IDeleteConfirmation>;
    createCardToken(cardBank: Card): Promise<Stripe.tokens.ICardToken>;
    getSetepIntent(customerId: string): Promise<string>;
    createSourcesIban(iban: Iban): Promise<Stripe.sources.ISource>;
    makeCharge(charge: Charge): Promise<Stripe.charges.ICharge>;
    makeRefund(charge: Charge): Promise<Stripe.refunds.IRefund>;
    createTransfer(transfertToCustomer: Transfert): Promise<Stripe.transfers.ITransfer>;
    listAllCards(customerId: string): Promise<Stripe.IList<Stripe.cards.ICard>>;
}
