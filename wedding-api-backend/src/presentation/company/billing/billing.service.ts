import { Injectable } from '@nestjs/common';
import { BillingServices } from '../../../infrastructure/databases/company/billing/billing.service';
import { CompanyBillingEntity } from '../../../infrastructure/databases/entities';

@Injectable()
export class BillingService {
	constructor(private readonly billingServices: BillingServices) {}

	public async createBilling(billing: CompanyBillingEntity) {
		const createdBilling = await this.billingServices.createBilling(billing);
		return createdBilling;
	}

	async getBilling(companyId: string) {
		return this.billingServices.getBilling(companyId);
	}

	async patchBilling(id: any, billing: Partial<CompanyBillingEntity>) {
		return await this.billingServices.patchBilling(id, billing);
	}
}
