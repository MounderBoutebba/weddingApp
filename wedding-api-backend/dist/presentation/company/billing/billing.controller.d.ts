import { BillingServices } from '../../../infrastructure/databases/company/billing/billing.service';
import { CompanyServices } from '../../../infrastructure/databases/company/company.service';
import { CompanyBillingEntity } from '../../../infrastructure/databases/entities';
export declare class BillingController {
    private readonly billingService;
    private readonly companyServices;
    constructor(billingService: BillingServices, companyServices: CompanyServices);
    createBilling(companyId: any, email: any, billing: any, res: any, req: any): Promise<any>;
    findBilling(companyId: any, res: any, req: any): Promise<any>;
    patchBilling(id: any, res: any, billing: Partial<CompanyBillingEntity>): Promise<any>;
    deleteBilling(id: any, res: any, req: any): Promise<any>;
}
