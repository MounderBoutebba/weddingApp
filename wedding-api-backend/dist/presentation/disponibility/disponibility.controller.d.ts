import { DisponibilityService } from './disponibility.service';
import { CreateDisponibilityDto } from './dto/disponibility.dto';
export declare class DisponibilityController {
    private readonly disponibilityService;
    constructor(disponibilityService: DisponibilityService);
    addAbsencePrivate(companyId: string, email: string, disponibilityDto: CreateDisponibilityDto, req: any): Promise<{
        data: import("../../infrastructure/databases/entities/disponibility.entity").DisponibilityEntity;
    }>;
    deletDisponibility(companyId: string, email: string, id: string, req: any): Promise<void>;
    getDisponibility(companyId: string, email: string, req: any): Promise<import("../../infrastructure/databases/entities/disponibility.entity").DisponibilityEntity[]>;
}
