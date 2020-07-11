import { OptionServices } from '../../../infrastructure/databases/company/option/option.service';
import { CompanyEntity, OptionEntity } from '../../../infrastructure/databases/entities';
export declare class OptionService {
    private readonly optionServices;
    constructor(optionServices: OptionServices);
    createOption(option: OptionEntity, email: string): Promise<OptionEntity>;
    deleteOption(id: any, company: CompanyEntity): Promise<OptionEntity>;
    getOption(id: string): Promise<OptionEntity>;
    patchOption(id: any, option: Partial<OptionEntity>, company: CompanyEntity): Promise<OptionEntity>;
}
