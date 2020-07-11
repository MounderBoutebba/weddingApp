import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoicesRepository } from './invoices.repository';
import { InvoiceEntity } from '../entities/invoice.entity';

@Injectable()
export class InvoicesService {
	constructor(@InjectRepository(InvoicesRepository) private readonly invoicesRepository: InvoicesRepository) {}

	public async createInvoice(invoice: InvoiceEntity) {
		return await this.invoicesRepository.save(invoice);
	}

	public async updateInvoice(id: string, invoice: InvoiceEntity) {
		return await this.invoicesRepository.update(id, ({
			...invoice
		} as unknown) as Partial<InvoiceEntity>);
	}

	public async findInvoice(id: string) {
		try {
			return await this.invoicesRepository.findOneOrFail(id);
		} catch (e) {
			throw new NotFoundException();
		}
	}
	public async getAllInvoiceNotExecutedByToday(): Promise<InvoiceEntity[]> {
		return await this.invoicesRepository
			.createQueryBuilder('invoices')
			.where('invoices.stripePaymentIntentId != null')
			.andWhere('invoices.status != null')
			.andWhere('invoices.dateExecution = :dateExecution', { dateExecution: new Date() })
			.getMany();
	}
}
