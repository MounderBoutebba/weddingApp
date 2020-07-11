import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DisponibilityRepository } from './disponibility.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from '../company/company.repository';
import { DisponibilityEntity } from '../entities/disponibility.entity';
import { MoreThan } from 'typeorm';

@Injectable()
export class DisponibilityServiceDB {

    constructor(
    @InjectRepository(CompanyRepository) private readonly companyRepository: CompanyRepository,
    @InjectRepository(DisponibilityRepository) private readonly disponibilityRepository: DisponibilityRepository
    ) {}

    public async save(disponibility: DisponibilityEntity) {
        try {
            const res = await this.disponibilityRepository.save(disponibility);
            delete res['__company__'];
            delete res['__has_company__'];
            return res;
        } catch (e) {
            throw new ConflictException();
        }
    }

    public async deleteDisponibility(id: string, companyId: string) {
        const disponibility = await this.findOne(id);
        const company = await disponibility.company;
        if (company.id !== companyId) {
            throw new UnauthorizedException();
        }
        await this.disponibilityRepository.delete(id);
    }

    private async findOne(id: string) {
        try {
            return await this.disponibilityRepository.findOneOrFail(id);
        } catch (e) {
            throw new NotFoundException();
        }
    }

    public async getIndisponibilities(companyId: string) {
        try {
            // @ts-ignore
            return await this.disponibilityRepository.find({
                where: {
                    company: { id: companyId },
                    end: MoreThan(new Date())
                },
                order: { start: 'ASC' }

            });
        } catch (e) {
            throw new NotFoundException();
        }
    }

}
