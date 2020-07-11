import { BillingServices } from '../../../infrastructure/databases/company/billing/billing.service';
import { CompanyBillingEntity } from '../../../infrastructure/databases/entities';
export declare class BillingService {
    private readonly billingServices;
    constructor(billingServices: BillingServices);
    createBilling(billing: CompanyBillingEntity): Promise<CompanyBillingEntity>;
    getBilling(companyId: string): Promise<any>;
    patchBilling(id: any, billing: Partial<CompanyBillingEntity>): Promise<CompanyBillingEntity>;
}
