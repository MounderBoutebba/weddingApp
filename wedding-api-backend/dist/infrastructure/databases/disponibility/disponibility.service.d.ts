import { DisponibilityRepository } from './disponibility.repository';
import { CompanyRepository } from '../company/company.repository';
import { DisponibilityEntity } from '../entities/disponibility.entity';
export declare class DisponibilityServiceDB {
    private readonly companyRepository;
    private readonly disponibilityRepository;
    constructor(companyRepository: CompanyRepository, disponibilityRepository: DisponibilityRepository);
    save(disponibility: DisponibilityEntity): Promise<DisponibilityEntity>;
    deleteDisponibility(id: string, companyId: string): Promise<void>;
    private findOne;
    getIndisponibilities(companyId: string): Promise<DisponibilityEntity[]>;
}
