import { PaiementsService } from './paiements.service';
import { CardDto } from './dto/card.dto';
import { BankAccountDto } from './dto/banck-account.dto';
export declare class PaiementsController {
    private readonly paiementsService;
    constructor(paiementsService: PaiementsService);
    createCustomer(email: string, res: any): Promise<any>;
    getCustomer(email: string, res: any): Promise<any>;
    addCardPaiement(email: string, cardDto: CardDto, res: any): Promise<any>;
    getAllCardsPaiement(email: string, res: any, req: any): Promise<any>;
    addAccountPaiementProvider(email: string, bankAccount: BankAccountDto, req: any, res: any): Promise<any>;
    getAccountPaiementProvider(email: string, req: any, res: any): Promise<any>;
    uploadFile(identityPrincipale: any, identitySecondary: any, modelData: any, res: any, req: any): Promise<any>;
    deleteClientCard(email: string, cardId: string, req: any, res: any): Promise<any>;
}
