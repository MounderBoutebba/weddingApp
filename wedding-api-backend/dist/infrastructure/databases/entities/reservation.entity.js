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
const reservation_model_1 = require("../../../domain/entities/reservation.model");
const company_entity_1 = require("./company.entity");
const user_entity_1 = require("./user.entity");
const comments_entity_1 = require("./comments.entity");
const invoice_entity_1 = require("./invoice.entity");
let ReservationEntity = class ReservationEntity {
    constructor() {
        this.notifyClientCount = 0;
        this.reservationsStatus = reservation_model_1.ReservationStatus.RESERVATION_REQUEST;
        this.categories = [];
        this.additionalFees = [];
        this.discounts = [];
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], ReservationEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Generated('increment'),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ReservationEntity.prototype, "orderNumber", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], ReservationEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], ReservationEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], ReservationEntity.prototype, "providerConfirmationDate", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], ReservationEntity.prototype, "clientConfirmationDate", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], ReservationEntity.prototype, "notifyClientCount", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ReservationEntity.prototype, "reservationsStatus", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_entity_1.CompanyEntity, company => company.reservations, {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
    }),
    typeorm_1.JoinColumn({ name: 'company_id', referencedColumnName: 'id' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], ReservationEntity.prototype, "company", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.ClientEntity, client => client.reservations, {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
    }),
    typeorm_1.JoinColumn({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.ClientEntity)
], ReservationEntity.prototype, "client", void 0);
__decorate([
    typeorm_1.OneToOne(type => comments_entity_1.CommentsEntity, object => object.reservation, {
        eager: true,
        cascade: ['remove'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", comments_entity_1.CommentsEntity)
], ReservationEntity.prototype, "comment", void 0);
__decorate([
    typeorm_1.OneToMany(type => invoice_entity_1.InvoiceEntity, object => object.reservation, {
        eager: true,
        cascade: ['insert', 'update', 'remove'],
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], ReservationEntity.prototype, "invoices", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], ReservationEntity.prototype, "paymentType", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], ReservationEntity.prototype, "start", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], ReservationEntity.prototype, "end", void 0);
__decorate([
    typeorm_1.Column({ type: 'float' }),
    __metadata("design:type", Number)
], ReservationEntity.prototype, "totalPrice", void 0);
__decorate([
    typeorm_1.Column({ type: 'float' }),
    __metadata("design:type", Number)
], ReservationEntity.prototype, "finalPrice", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', default: 0 }),
    __metadata("design:type", Number)
], ReservationEntity.prototype, "allPrice", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ReservationEntity.prototype, "guestcount", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-array' }),
    __metadata("design:type", Array)
], ReservationEntity.prototype, "categories", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-json', nullable: false, default: [] }),
    __metadata("design:type", Array)
], ReservationEntity.prototype, "additionalFees", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-json', nullable: false, default: [] }),
    __metadata("design:type", Array)
], ReservationEntity.prototype, "discounts", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], ReservationEntity.prototype, "loyer", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], ReservationEntity.prototype, "nombreDeMois", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], ReservationEntity.prototype, "remunerationProvider", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-json' }),
    __metadata("design:type", Object)
], ReservationEntity.prototype, "location", void 0);
ReservationEntity = __decorate([
    typeorm_1.Entity('reservations'),
    typeorm_1.Unique(['company', 'client', 'start', 'end'])
], ReservationEntity);
exports.ReservationEntity = ReservationEntity;
//# sourceMappingURL=reservation.entity.js.map