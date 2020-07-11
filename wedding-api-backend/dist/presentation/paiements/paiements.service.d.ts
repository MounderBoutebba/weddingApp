/// <reference types="stripe" />
import { PaiementsRepositoryService } from '../../infrastructure/databases/paiements/paiements-repository.service';
import { UsersServices } from '../../infrastructure/databases/users/users.service';
import { Customer } from '../../domain/entities/paiements/customer.model';
import { CardDto } from './dto/card.dto';
import { IbanDto } from './dto/IbanDto.dto';
import { CardInfo } from '../../domain/entities/paiements/card-info.model';
import { BankAccount } from 'src/domain/entities/paiements/bank-account.model';
export declare class PaiementsService {
    private readonly paiementsRepositoryService;
    private readonly usersServices;
    private readonly createPaiementsUsecase;
    constructor(paiementsRepositoryService: PaiementsRepositoryService, usersServices: UsersServices);
    addPaiementAccount(email: string): Promise<Customer>;
    addProviderPaiementAccount(email: string, bankAccount: BankAccount): Promise<Customer>;
    getProviderPaiementAccount(email: string): Promise<any>;
    identityVerificationPaiementAccount(email: string, identityPrincipale: any, identitySecondary: any): Promise<any>;
    getPaiementAccount(email: string): Promise<Customer>;
    addCardToPaiementAccount(email: string, card: CardDto): Promise<Customer>;
    getAllCardsPaiement(email: string): Promise<CardInfo[]>;
    addIban(email: string, iban: IbanDto): Promise<any>;
    getSetupIntent(email: string): Promise<any>;
    getClientCards(user: any): Promise<import("stripe").customers.ICustomer>;
    updateCostumer(user: any, fingerPrint: any): Promise<any>;
    deleteCard(email: string, cardId: string): Promise<any>;
}
