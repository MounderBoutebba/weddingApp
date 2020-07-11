import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreatePaiementsAccount } from '../../domain/usecases/services/create-paiments-account.usecase';
import { PaiementsRepositoryService } from '../../infrastructure/databases/paiements/paiements-repository.service';
import { UsersServices } from '../../infrastructure/databases/users/users.service';
import { Customer } from '../../domain/entities/paiements/customer.model';
import { CardDto } from './dto/card.dto';
import { Iban } from '../../domain/entities/paiements/iban.model';
import { IbanDto } from './dto/IbanDto.dto';
import { CardInfo } from '../../domain/entities/paiements/card-info.model';
import { BankAccount } from 'src/domain/entities/paiements/bank-account.model';

@Injectable()
export class PaiementsService {
	private readonly createPaiementsUsecase: CreatePaiementsAccount<PaiementsRepositoryService>;
	constructor(
		private readonly paiementsRepositoryService: PaiementsRepositoryService,
		private readonly usersServices: UsersServices
	) {
		this.createPaiementsUsecase = new CreatePaiementsAccount(this.paiementsRepositoryService, this.usersServices);
	}

	async addPaiementAccount(email: string): Promise<Customer> {
		try {
			return await this.createPaiementsUsecase.savePaiementAccount(email);
		} catch (err) {
			throw new ConflictException(err.message);
		}
	}
	async addProviderPaiementAccount(email: string, bankAccount: BankAccount) {
		try {
			return await this.createPaiementsUsecase.saveProviderPaiementAccount(email, bankAccount);
		} catch (err) {
			throw new ConflictException(err.message);
		}
	}

	async getProviderPaiementAccount(email: string) {
		try {
			return await this.createPaiementsUsecase.getProviderPaiementAccount(email);
		} catch (err) {
			throw new ConflictException(err.message);
		}
	}

	async identityVerificationPaiementAccount(email: string, identityPrincipale, identitySecondary) {
		try {
			return await this.createPaiementsUsecase.identityVerification(email, identityPrincipale, identitySecondary);
		} catch (err) {
			throw new ConflictException(err.message);
		}
	}

	async getPaiementAccount(email: string): Promise<Customer> {
		try {
			return await this.createPaiementsUsecase.getPaiementAccount(email);
		} catch (err) {
			throw new ConflictException(err.message);
		}
	}

	async addCardToPaiementAccount(email: string, card: CardDto): Promise<Customer> {
		try {
			return await this.createPaiementsUsecase.addCardPaiement(email, card);
		} catch (err) {
			throw new ConflictException(err.message);
		}
	}
	async getAllCardsPaiement(email: string): Promise<CardInfo[]> {
		try {
			return await this.createPaiementsUsecase.getAllCardsPaiementAccount(email);
		} catch (err) {
			throw new NotFoundException(err.message);
		}
	}

	async addIban(email: string, iban: IbanDto): Promise<any> {
		try {
			const ibanJson: Iban = {
				currency: iban.currency,
				type: iban.type,
				sepa_debit: { iban: iban.iban },
				owner: {
					name: iban.name
				}
			};
			return await this.createPaiementsUsecase.addIban(email, ibanJson);
		} catch (err) {
			throw new ConflictException(err.message);
		}
	}

	async getSetupIntent(email: string) {
		return this.createPaiementsUsecase.getSetupIntent(email);
	}

	async getClientCards(user) {
		return await this.createPaiementsUsecase.getClientCards(user);
	}

	async updateCostumer(user, fingerPrint) {
		return await this.createPaiementsUsecase.updateDefualtCard(user, fingerPrint);
	}
	async deleteCard(email: string, cardId: string) {
		return await this.createPaiementsUsecase.deleteCardFromCostumer(email, cardId);
	}
}
