import { SettingRepository } from './setting.repository';
import { CompanyEntity, SettingEntity } from '../../entities';
import { ElasticsearchService } from '../../elasticsearch/elasticsearch.service';
export declare class SettingServices {
    private readonly settingRepository;
    private readonly elasticsearchService;
    constructor(settingRepository: SettingRepository, elasticsearchService: ElasticsearchService);
    createSetting(setting: SettingEntity): Promise<SettingEntity>;
    deleteSetting(id: any, company: CompanyEntity): Promise<SettingEntity>;
    getSetting(id: any): Promise<SettingEntity>;
    patchSetting(id: any, setting: Partial<SettingEntity>, company: CompanyEntity): Promise<SettingEntity>;
}
