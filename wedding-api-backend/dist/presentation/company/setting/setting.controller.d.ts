import { SettingServices } from '../../../infrastructure/databases/company/setting/setting.service';
import { CompanyServices } from '../../../infrastructure/databases/company/company.service';
import { SettingEntity } from '../../../infrastructure/databases/entities';
export declare class SettingController {
    private readonly settingService;
    private readonly companyServices;
    constructor(settingService: SettingServices, companyServices: CompanyServices);
    createSetting(companyId: any, email: any, setting: any, res: any, req: any): Promise<any>;
    deleteSetting(id: any, res: any, req: any, companyId: any, email: any): Promise<any>;
    findSetting(id: any, res: any, req: any): Promise<any>;
    patchSetting(id: any, res: any, setting: Partial<SettingEntity>, companyId: any, email: any): Promise<any>;
}
