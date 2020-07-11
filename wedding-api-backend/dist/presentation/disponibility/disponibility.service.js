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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const disponibility_service_1 = require("../../infrastructure/databases/disponibility/disponibility.service");
const disponibility_entity_1 = require("../../infrastructure/databases/entities/disponibility.entity");
let DisponibilityService = class DisponibilityService {
    constructor(disponibilityServiceDB) {
        this.disponibilityServiceDB = disponibilityServiceDB;
    }
    async createIndisponibility(disponibilityDto, company) {
        const disponibility = new disponibility_entity_1.DisponibilityEntity();
        disponibility.type = disponibilityDto.type;
        disponibility.end = disponibilityDto.end;
        disponibility.start = disponibilityDto.start;
        disponibility.company = company;
        return this.disponibilityServiceDB.save(disponibility);
    }
    async deleteDisponibility(id, companyId) {
        return this.disponibilityServiceDB.deleteDisponibility(id, companyId);
    }
    async getDisponibilities(companyId) {
        return this.disponibilityServiceDB.getIndisponibilities(companyId);
    }
};
DisponibilityService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [disponibility_service_1.DisponibilityServiceDB])
], DisponibilityService);
exports.DisponibilityService = DisponibilityService;
//# sourceMappingURL=disponibility.service.js.map