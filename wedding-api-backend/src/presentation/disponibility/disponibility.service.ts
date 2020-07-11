import { Injectable } from '@nestjs/common';
import { DisponibilityServiceDB } from '../../infrastructure/databases/disponibility/disponibility.service';
import { CreateDisponibilityDto } from './dto/disponibility.dto';
import { CompanyEntity } from '../../infrastructure/databases/entities';
import { DisponibilityEntity } from '../../infrastructure/databases/entities/disponibility.entity';

@Injectable( )
export class DisponibilityService {


    constructor(private disponibilityServiceDB: DisponibilityServiceDB) {
    }


    public async createIndisponibility(disponibilityDto: CreateDisponibilityDto, company: CompanyEntity) {
        const disponibility = new DisponibilityEntity();
        disponibility.type = disponibilityDto.type;
        disponibility.end = disponibilityDto.end;
        disponibility.start = disponibilityDto.start;
        // @ts-ignore
		disponibility.company = company;
        return this.disponibilityServiceDB.save(disponibility);
    }

	public async deleteDisponibility(id: string, companyId: string) {
		 return this.disponibilityServiceDB.deleteDisponibility(id,companyId)
	}

	async getDisponibilities(companyId: string) {
		return this.disponibilityServiceDB.getIndisponibilities(companyId);
	}
}
