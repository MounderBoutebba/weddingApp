import { DisponibilityServiceDB } from '../../infrastructure/databases/disponibility/disponibility.service';
import { CreateDisponibilityDto } from './dto/disponibility.dto';
import { CompanyEntity } from '../../infrastructure/databases/entities';
import { DisponibilityEntity } from '../../infrastructure/databases/entities/disponibility.entity';
export declare class DisponibilityService {
    private disponibilityServiceDB;
    constructor(disponibilityServiceDB: DisponibilityServiceDB);
    createIndisponibility(disponibilityDto: CreateDisponibilityDto, company: CompanyEntity): Promise<DisponibilityEntity>;
    deleteDisponibility(id: string, companyId: string): Promise<void>;
    getDisponibilities(companyId: string): Promise<DisponibilityEntity[]>;
}
