import { CompanyService } from './company.service';
import { CompanyEntity, CompanyImageEntity } from '../../infrastructure/databases/entities';
import { CreateCompanyDto } from './dto/CreateCompany.dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    createCompany(files: any[], email: string, company: CreateCompanyDto, res: any, req: any): Promise<any>;
    deleteImage(id: any, imageId: any, email: any, res: any, req: any): Promise<any>;
    changeFavorite(id: any, imageId: any, email: any, image: Partial<CompanyImageEntity>, res: any, req: any): Promise<any>;
    deleteCompany(id: any, email: any, res: any, req: any): Promise<any>;
    deleteCompanyJobs(id: any, res: any, req: any): Promise<any>;
    createCompanyJobs(email: any, company: Partial<CompanyEntity>, res: any, req: any): Promise<any>;
    findCompany(id: any, email: any, res: any, req: any): Promise<any>;
    getCompany(email: any, res: any, req: any): Promise<any>;
    updateCurrentStep(email: any, id: any, res: any, req: any, company: Partial<CompanyEntity>): Promise<any>;
    patchCompany(files: any[], email: any, id: any, res: any, req: any, company: Partial<CompanyEntity>): Promise<any>;
}
