import { CompanyServices } from '../../../infrastructure/databases/company/company.service';
import { OptionServices } from '../../../infrastructure/databases/company/option/option.service';
import { OptionEntity } from '../../../infrastructure/databases/entities';
export declare class OptionController {
    private readonly optionService;
    private readonly companyServices;
    constructor(optionService: OptionServices, companyServices: CompanyServices);
    createOption(companyId: any, email: any, option: any, res: any, req: any): Promise<any>;
    deleteOption(companyId: any, id: any, email: any, res: any, req: any): Promise<any>;
    findOption(id: any, res: any, req: any): Promise<any>;
    patchOption(id: any, companyId: any, email: any, res: any, option: Partial<OptionEntity>): Promise<any>;
}
