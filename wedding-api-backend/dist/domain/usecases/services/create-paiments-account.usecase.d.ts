import { User } from '../../entities/user.model';
import { Customer } from '../../../domain/entities/paiements/customer.model';
import { UsersServices } from '../../../infrastructure/databases/users/users.service';
import { Card } from '../../../domain/entities/paiements/card.model';
import { Iban } from '../../../domain/entities/paiements/iban.model';
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
    tokenExist(token: any): any;
    findCustomer(id: string): any;
    addIban(iban: Iban): any;
    getSetepIntent(customerId: string): any;
    updateCard(cusID: string, metadata: object, deleteCard?: boolean): any;
    deleteCard(customerId: string, cardId: string): any;
    getAllCardsPaiementAccount(customerId: string): Promise<CardInfo[]>;
    identityVerification(accountId: string, identityPrincipale: any, identitySecondary: any): any;
    getProviderPaiementBankAccount(accountId: string, bankAccountId: string): any;
}
export declare class CreatePaiementsAccount<T extends ICreatePaiementsAccount> {
    private readonly paiementsServices;
    private readonly userServices;
    constructor(paiementsServices: T, userServices: UsersServices);
    createPaiementAccount(user: User): Promise<Customer>;
    createProviderPaiementAccount(user: User, bankAccount: BankAccount): Promise<Customer>;
    getAllCardsPaiementAccount(email: string): Promise<CardInfo[]>;
    savePaiementAccount(email: string): Promise<Customer>;
    saveProviderPaiementAccount(email: string, bankAccount: BankAccount): Promise<Customer>;
    getProviderPaiementAccount(email: string): Promise<any>;
    identityVerification(email: string, identityPrincipale: any, identitySecondary: any): Promise<any>;
    getPaiementAccount(email: string): Promise<Customer>;
    addCardPaiement(email: string, card: Card): Promise<Customer>;
    generateTokenFromCard(card: Card): Promise<string>;
    addIban(email: string, iban: Iban): Promise<any>;
    getSetupIntent(email: string): Promise<any>;
    getClientCards(user: User): Promise<Stripe.customers.ICustomer>;
    updateDefualtCard(user: User, fingerPrint: string): Promise<any>;
    deleteCardFromCostumer(email: string, cardId: string): Promise<any>;
}
