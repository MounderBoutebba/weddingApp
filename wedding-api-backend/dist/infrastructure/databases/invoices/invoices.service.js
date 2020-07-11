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
const invoices_repository_1 = require("./invoices.repository");
let InvoicesService = class InvoicesService {
    constructor(invoicesRepository) {
        this.invoicesRepository = invoicesRepository;
    }
    async createInvoice(invoice) {
        return await this.invoicesRepository.save(invoice);
    }
    async updateInvoice(id, invoice) {
        return await this.invoicesRepository.update(id, Object.assign({}, invoice));
    }
    async findInvoice(id) {
        try {
            return await this.invoicesRepository.findOneOrFail(id);
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async getAllInvoiceNotExecutedByToday() {
        return await this.invoicesRepository
            .createQueryBuilder('invoices')
            .where('invoices.stripePaymentIntentId != null')
            .andWhere('invoices.status != null')
            .andWhere('invoices.dateExecution = :dateExecution', { dateExecution: new Date() })
            .getMany();
    }
};
InvoicesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(invoices_repository_1.InvoicesRepository)),
    __metadata("design:paramtypes", [invoices_repository_1.InvoicesRepository])
], InvoicesService);
exports.InvoicesService = InvoicesService;
//# sourceMappingURL=invoices.service.js.map