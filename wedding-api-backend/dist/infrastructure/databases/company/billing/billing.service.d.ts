import { BillingRepository } from './billing.repository';
import { CompanyBillingEntity } from '../../entities';
import { CompanyRepository } from '../company.repository';
import { ElasticsearchService } from '../../elasticsearch/elasticsearch.service';
export declare class BillingServices {
    private readonly billingRepository;
    private readonly companyRepository;
    private elasticsearchService;
    constructor(billingRepository: BillingRepository, companyRepository: CompanyRepository, elasticsearchService: ElasticsearchService);
    deleteBilling(id: any): Promise<CompanyBillingEntity>;
    createBilling(billing: CompanyBillingEntity): Promise<CompanyBillingEntity>;
    getBilling(companyId: string): Promise<any>;
    patchBilling(id: any, billing: Partial<CompanyBillingEntity>): Promise<CompanyBillingEntity>;
}
