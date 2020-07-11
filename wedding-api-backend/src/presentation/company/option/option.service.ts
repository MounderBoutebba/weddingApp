import { Injectable } from '@nestjs/common';
import { OptionServices } from '../../../infrastructure/databases/company/option/option.service';
import { CompanyEntity, OptionEntity } from '../../../infrastructure/databases/entities';

@Injectable()
export class OptionService {
	constructor(private readonly optionServices: OptionServices) {}

	public async createOption(option: OptionEntity, email:string) {
		const createdOption = await this.optionServices.createOption(option,email);
		return createdOption;
	}

	async deleteOption(id: any, company: CompanyEntity) {
		return await this.optionServices.deleteOption(id, company);
	}

	async getOption(id: string) {
		return this.optionServices.getOption(id);
	}

	async patchOption(id: any, option: Partial<OptionEntity>, company: CompanyEntity) {
		return await this.optionServices.patchOption(id, option, company);
	}
}
