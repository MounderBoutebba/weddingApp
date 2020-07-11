"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const disponibility_repository_1 = require("./disponibility.repository");
const typeorm_1 = require("@nestjs/typeorm");
const company_repository_1 = require("../company/company.repository");
const typeorm_2 = require("typeorm");
let DisponibilityServiceDB = class DisponibilityServiceDB {
    constructor(companyRepository, disponibilityRepository) {
        this.companyRepository = companyRepository;
        this.disponibilityRepository = disponibilityRepository;
    }
    async save(disponibility) {
        try {
            const res = await this.disponibilityRepository.save(disponibility);
            delete res['__company__'];
            delete res['__has_company__'];
            return res;
        }
        catch (e) {
            throw new common_1.ConflictException();
        }
    }
    async deleteDisponibility(id, companyId) {
        const disponibility = await this.findOne(id);
        const company = await disponibility.company;
        if (company.id !== companyId) {
            throw new common_1.UnauthorizedException();
        }
        await this.disponibilityRepository.delete(id);
    }
    async findOne(id) {
        try {
            return await this.disponibilityRepository.findOneOrFail(id);
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
    async getIndisponibilities(companyId) {
        try {
            return await this.disponibilityRepository.find({
                where: {
                    company: { id: companyId },
                    end: typeorm_2.MoreThan(new Date())
                },
                order: { start: 'ASC' }
            });
        }
        catch (e) {
            throw new common_1.NotFoundException();
        }
    }
};
DisponibilityServiceDB = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(company_repository_1.CompanyRepository)),
    __param(1, typeorm_1.InjectRepository(disponibility_repository_1.DisponibilityRepository)),
    __metadata("design:paramtypes", [company_repository_1.CompanyRepository,
        disponibility_repository_1.DisponibilityRepository])
], DisponibilityServiceDB);
exports.DisponibilityServiceDB = DisponibilityServiceDB;
//# sourceMappingURL=disponibility.service.js.map