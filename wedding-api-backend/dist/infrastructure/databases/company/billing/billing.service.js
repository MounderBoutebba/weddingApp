"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const billing_repository_1 = require("./billing.repository");
const company_repository_1 = require("../company.repository");
const elasticsearch_service_1 = require("../../elasticsearch/elasticsearch.service");
let BillingServices = class BillingServices {
    constructor(billingRepository, companyRepository, elasticsearchService) {
        this.billingRepository = billingRepository;
        this.companyRepository = companyRepository;
        this.elasticsearchService = elasticsearchService;
    }
    async deleteBilling(id) {
        const billing = await this.billingRepository.findOneOrFail(id);
        return await this.billingRepository.remove(billing);
    }
    async createBilling(billing) {
        const res = await this.billingRepository.save(billing);
        let company = await res.company;
        company = await this.companyRepository.findOne(company.id);
        company.billing = res;
        await this.companyRepository.save(company);
        await this.companyRepository.update(company.id, {
            securePayment: res.paymentSecure
        });
        await this.elasticsearchService.updateIndexById('categories', '_doc', company.user.id, { securePayment: res.paymentSecure });
        delete res['__company__'];
        delete res['__has_company__'];
        return res;
    }
    async getBilling(companyId) {
        return await this.billingRepository.findOneOrFail({ company: { id: companyId } });
    }
    async patchBilling(id, billing) {
        await this.billingRepository.update(id, billing);
        const res = await this.billingRepository.findOneOrFail(id);
        let company = await res.company;
        company = await this.companyRepository.findOne(company.id);
        await this.companyRepository.update(company.id, {
            securePayment: res.paymentSecure
        });
        await this.elasticsearchService.updateIndexById('categories', '_doc', company.user.id, { securePayment: res.paymentSecure });
        delete res['__company__'];
        delete res['__has_company__'];
        return res;
    }
};
BillingServices = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(billing_repository_1.BillingRepository)),
    __param(1, typeorm_1.InjectRepository(company_repository_1.CompanyRepository)),
    __metadata("design:paramtypes", [billing_repository_1.BillingRepository,
        company_repository_1.CompanyRepository,
        elasticsearch_service_1.ElasticsearchService])
], BillingServices);
exports.BillingServices = BillingServices;
//# sourceMappingURL=billing.service.js.map