import { OptionRepository } from './option.repository';
import { CompanyEntity, OptionEntity } from '../../entities';
import { ElasticsearchService } from '../../elasticsearch/elasticsearch.service';
export declare class OptionServices {
    private readonly optionRepository;
    private elasticsearchService;
    constructor(optionRepository: OptionRepository, elasticsearchService: ElasticsearchService);
    createOption(option: OptionEntity, email: string): Promise<OptionEntity>;
    deleteOption(id: any, company: CompanyEntity): Promise<OptionEntity>;
    getOption(id: any): Promise<OptionEntity>;
    patchOption(id: any, option: Partial<OptionEntity>, company: CompanyEntity): Promise<OptionEntity>;
}
