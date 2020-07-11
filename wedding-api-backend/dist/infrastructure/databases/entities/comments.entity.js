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
const user_entity_1 = require("./user.entity");
const commentsResponse_entity_1 = require("./commentsResponse.entity");
const reservation_entity_1 = require("./reservation.entity");
let CommentsEntity = class CommentsEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], CommentsEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], CommentsEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], CommentsEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ type: 'float' }),
    __metadata("design:type", Number)
], CommentsEntity.prototype, "totalNotes", void 0);
__decorate([
    typeorm_1.Column({ type: 'float' }),
    __metadata("design:type", Number)
], CommentsEntity.prototype, "qualiteService", void 0);
__decorate([
    typeorm_1.Column({ type: 'float' }),
    __metadata("design:type", Number)
], CommentsEntity.prototype, "professionnalisme", void 0);
__decorate([
    typeorm_1.Column({ type: 'float' }),
    __metadata("design:type", Number)
], CommentsEntity.prototype, "flexibilite", void 0);
__decorate([
    typeorm_1.Column({ type: 'float' }),
    __metadata("design:type", Number)
], CommentsEntity.prototype, "rapportQualitePrix", void 0);
__decorate([
    typeorm_1.Column({ type: 'text' }),
    __metadata("design:type", String)
], CommentsEntity.prototype, "content", void 0);
__decorate([
    typeorm_1.OneToOne(type => commentsResponse_entity_1.CommentsResponseEntity, object => object.comment, {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: true
    }),
    __metadata("design:type", commentsResponse_entity_1.CommentsResponseEntity)
], CommentsEntity.prototype, "response", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_entity_1.CompanyEntity, company => company.comments, {
        eager: false,
        lazy: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: true
    }),
    typeorm_1.JoinColumn({ name: 'company_id', referencedColumnName: 'id' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], CommentsEntity.prototype, "company", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.ClientEntity, {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: ['insert', 'update']
    }),
    typeorm_1.JoinColumn({ name: 'client_id', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.ClientEntity)
], CommentsEntity.prototype, "client", void 0);
__decorate([
    typeorm_1.OneToOne(type => reservation_entity_1.ReservationEntity, object => object.comment, {
        eager: false,
        lazy: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: ['insert', 'update']
    }),
    typeorm_1.JoinColumn({ name: 'reservation_id', referencedColumnName: 'id' }),
    __metadata("design:type", reservation_entity_1.ReservationEntity)
], CommentsEntity.prototype, "reservation", void 0);
CommentsEntity = __decorate([
    typeorm_1.Entity('comments')
], CommentsEntity);
exports.CommentsEntity = CommentsEntity;
//# sourceMappingURL=comments.entity.js.map