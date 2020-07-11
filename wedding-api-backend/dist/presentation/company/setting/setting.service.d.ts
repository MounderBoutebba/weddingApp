import { SettingServices } from "../../../infrastructure/databases/company/setting/setting.service";
import { CompanyEntity, SettingEntity } from "../../../infrastructure/databases/entities";
export declare class SettingService {
    private readonly settingServices;
    constructor(settingServices: SettingServices);
    createSetting(setting: SettingEntity): Promise<SettingEntity>;
    deleteSetting(id: any, company: CompanyEntity): Promise<SettingEntity>;
    getSetting(id: string): Promise<SettingEntity>;
    patchSetting(id: any, setting: Partial<SettingEntity>, company: CompanyEntity): Promise<SettingEntity>;
}
