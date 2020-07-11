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
const typeorm_1 = require("typeorm");
const company_entity_1 = require("./company.entity");
const gcp_file_service_1 = require("../../../global/services/gcp-file/gcp-file.service");
let CompanyImageEntity = class CompanyImageEntity {
    async removeImageFromDisk() {
        const gcpFileService = new gcp_file_service_1.GcpFileService();
        await gcpFileService.removeFile(this.name);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], CompanyImageEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CompanyImageEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CompanyImageEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], CompanyImageEntity.prototype, "path", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], CompanyImageEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], CompanyImageEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ default: false, nullable: false }),
    __metadata("design:type", Boolean)
], CompanyImageEntity.prototype, "favorite", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_entity_1.CompanyEntity, object => object.images, {
        lazy: true,
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'company_id', referencedColumnName: 'id' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], CompanyImageEntity.prototype, "company", void 0);
__decorate([
    typeorm_1.AfterRemove(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyImageEntity.prototype, "removeImageFromDisk", null);
CompanyImageEntity = __decorate([
    typeorm_1.Entity('images')
], CompanyImageEntity);
exports.CompanyImageEntity = CompanyImageEntity;
//# sourceMappingURL=companyImage.entity.js.map