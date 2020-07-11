import { Injectable } from "@nestjs/common";
import { SettingServices } from "../../../infrastructure/databases/company/setting/setting.service";
import { CompanyEntity, SettingEntity } from "../../../infrastructure/databases/entities";

@Injectable()
export class SettingService {
	constructor(private readonly settingServices: SettingServices) {}

	public async createSetting(setting: SettingEntity) {
		const createdSetting = await this.settingServices.createSetting(setting);
		return createdSetting;
	}

	async deleteSetting(id: any, company: CompanyEntity) {
		return await this.settingServices.deleteSetting(id, company);
	}

	async getSetting(id: string) {
		return this.settingServices.getSetting(id);
	}

	async patchSetting(id: any, setting: Partial<SettingEntity>, company: CompanyEntity) {
		return await this.settingServices.patchSetting(id, setting, company);
	}
}
