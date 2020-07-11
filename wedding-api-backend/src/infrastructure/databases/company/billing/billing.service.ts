import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillingRepository } from './billing.repository';
import { CompanyBillingEntity } from '../../entities';
import { CompanyRepository } from '../company.repository';
import { ElasticsearchService } from '../../elasticsearch/elasticsearch.service';

@Injectable()
export class BillingServices {

	constructor(
		@InjectRepository(BillingRepository) private readonly billingRepository: BillingRepository,
		@InjectRepository(CompanyRepository) private readonly companyRepository: CompanyRepository,
		private elasticsearchService: ElasticsearchService
	) {
	}

	async deleteBilling(id: any) {
		const billing = await this.billingRepository.findOneOrFail(id);
		return await this.billingRepository.remove(billing);
	}

	async createBilling(billing: CompanyBillingEntity): Promise<CompanyBillingEntity> {
		const res = await this.billingRepository.save(billing);
		let company = await res.company;
		company = await this.companyRepository.findOne(company.id);
		company.billing = res;
		await this.companyRepository.save(company);
		await this.companyRepository.update(company.id, {
			securePayment: res.paymentSecure
		});
		await this.elasticsearchService.updateIndexById('categories', '_doc', company.user.id,
			{ securePayment: res.paymentSecure }
		);
		delete res['__company__'];
		delete res['__has_company__'];
		return res;
	}

	async getBilling(companyId: string) {
		// @ts-ignore
		return await this.billingRepository.findOneOrFail({company: {id: companyId}});
	}

	async patchBilling(id: any, billing: Partial<CompanyBillingEntity>) {
        await this.billingRepository.update(id, billing);
		const res = await this.billingRepository.findOneOrFail(id);
		let company = await res.company;
		company = await this.companyRepository.findOne(company.id);
		await this.companyRepository.update(company.id, {
			securePayment: res.paymentSecure
		});
		await this.elasticsearchService.updateIndexById('categories', '_doc', company.user.id,
			{ securePayment: res.paymentSecure }
		);
		delete res['__company__'];
		delete res['__has_company__'];
		return res;
	}
}
