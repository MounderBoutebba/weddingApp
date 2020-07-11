import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SettingRepository } from './setting.repository';
import { CompanyEntity, SettingEntity } from '../../entities';
import { ElasticsearchService } from '../../elasticsearch/elasticsearch.service';

@Injectable()
export class SettingServices {

	constructor(
		@InjectRepository(SettingRepository) private readonly settingRepository: SettingRepository,
		private readonly elasticsearchService: ElasticsearchService) {

	}

	async createSetting(setting: SettingEntity): Promise<SettingEntity> {
		setting = await this.settingRepository.save(setting);
		const userId = setting.company.user.id;
		const res = await this.elasticsearchService.findById('categories', '_doc', userId);
		const op = { ...setting };
		delete op['company'];
		// @ts-ignore
		if (!res._source?.variationPeriode) {
			// @ts-ignore
			res._source.variationPeriode = [];
		}
		// @ts-ignore
		const ops = [...res._source?.variationPeriode, op];
		await this.elasticsearchService.updateIndexById('categories', '_doc', userId, { variationPeriode: ops });
		return this.settingRepository.findOneOrFail(setting.id);

	}

	async deleteSetting(id: any, company: CompanyEntity) {
		const setting = await this.settingRepository.findOneOrFail(id);
		const userId = company.user.id;
		const res = await this.elasticsearchService.findById('categories', '_doc', userId);
		// @ts-ignore
		const ops = res._source.variationPeriode.filter((elm) => elm.id !== id);
		await this.elasticsearchService.updateIndexById('categories', '_doc', userId, { variationPeriode: ops });
		return await this.settingRepository.remove(setting);

	}

	async getSetting(id: any) {
		return await this.settingRepository.findOneOrFail(id);
	}

	async patchSetting(id: any, setting: Partial<SettingEntity>,company:CompanyEntity) {
		const settingDB = await this.settingRepository.findOneOrFail(id);
		settingDB.periodStartDate = setting.periodStartDate;
		settingDB.periodEndDate = setting.periodEndDate;
		settingDB.increaseWeek = setting.increaseWeek;
		settingDB.increaseWeekend = setting.increaseWeekend;
		settingDB.autoApplication = setting.autoApplication;
		const savedDb = await this.settingRepository.save(settingDB);
		const userId = company.user.id;
		const res = await this.elasticsearchService.findById('categories', '_doc', userId);
		// @ts-ignore
		const ops = res._source.variationPeriode.map((elm) => {
			if (elm.id === savedDb.id) {
				const opt = { ...savedDb };
				delete opt['company'];
				return opt;
			} else {
				return elm;
			}
		});
		await this.elasticsearchService.updateIndexById('categories', '_doc', userId, { variationPeriode: ops });

		return savedDb;

	}
}
