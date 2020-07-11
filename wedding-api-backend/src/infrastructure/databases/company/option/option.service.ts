import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionRepository } from './option.repository';
import { CompanyEntity, OptionEntity } from '../../entities';
import { ElasticsearchService } from '../../elasticsearch/elasticsearch.service';

@Injectable()
export class OptionServices {

	constructor(
		@InjectRepository(OptionRepository) private readonly optionRepository: OptionRepository,
		private elasticsearchService: ElasticsearchService) {
	}

	async createOption(option: OptionEntity, email: string): Promise<OptionEntity> {
		option = await this.optionRepository.save(option);
		const userId = option.company.user.id;
		const res = await this.elasticsearchService.findById('categories', '_doc', userId);
		const op = { ...option };
		delete op['company'];
		// @ts-ignore
		if (!res._source?.options) {
			// @ts-ignore
			res._source.options = [];
		}
		// @ts-ignore
		const ops = [...res._source.options, op];
		await this.elasticsearchService.updateIndexById('categories', '_doc', userId, { options: ops });
		return this.optionRepository.findOneOrFail(option.id);
	}

	async deleteOption(id: any,company:CompanyEntity) {
		const option = await this.optionRepository.findOneOrFail(id);
		const userId = company.user.id;
		const res = await this.elasticsearchService.findById('categories', '_doc', userId);
		// @ts-ignore
		const ops = res._source.options.filter((elm) => elm.id !== id);
		await this.elasticsearchService.updateIndexById('categories', '_doc', userId, { options: ops });
		return await this.optionRepository.remove(option);
	}

	async getOption(id: any) {
		return await this.optionRepository.findOneOrFail(id);
	}

	async patchOption(id: any, option: Partial<OptionEntity>, company: CompanyEntity) {
		const optionDB = await this.optionRepository.findOneOrFail(id);
		optionDB.name = option.name;
		optionDB.description = option.description;
		optionDB.optionRate = option.optionRate;
		optionDB.feeType = option.feeType;
		optionDB.categories = option.categories;
		const savedDb = await this.optionRepository.save(optionDB);
		const userId = company.user.id;
		const res = await this.elasticsearchService.findById('categories', '_doc', userId);
		// @ts-ignore
		const ops = res._source.options.map((elm) => {
			if (elm.id === savedDb.id) {
				const opt = { ...savedDb };
				delete opt['company'];
				return opt;
			} else {
				return elm;
			}
		});
		await this.elasticsearchService.updateIndexById('categories', '_doc', userId, { options: ops });

		return savedDb;
	}
}
