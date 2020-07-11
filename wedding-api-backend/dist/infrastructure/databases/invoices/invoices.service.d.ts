import { InvoicesRepository } from './invoices.repository';
import { InvoiceEntity } from '../entities/invoice.entity';
export declare class InvoicesService {
    private readonly invoicesRepository;
    constructor(invoicesRepository: InvoicesRepository);
    createInvoice(invoice: InvoiceEntity): Promise<InvoiceEntity>;
    updateInvoice(id: string, invoice: InvoiceEntity): Promise<import("typeorm").UpdateResult>;
    findInvoice(id: string): Promise<InvoiceEntity>;
    getAllInvoiceNotExecutedByToday(): Promise<InvoiceEntity[]>;
}
