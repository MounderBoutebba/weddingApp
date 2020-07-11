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
const invoice_model_1 = require("../../../domain/entities/invoice.model");
const reservation_entity_1 = require("./reservation.entity");
let InvoiceEntity = class InvoiceEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], InvoiceEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], InvoiceEntity.prototype, "montant", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], InvoiceEntity.prototype, "dateExecution", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], InvoiceEntity.prototype, "typeExecution", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], InvoiceEntity.prototype, "stripePaymentIntentId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], InvoiceEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.ManyToOne(type => reservation_entity_1.ReservationEntity, object => object.invoices),
    __metadata("design:type", reservation_entity_1.ReservationEntity)
], InvoiceEntity.prototype, "reservation", void 0);
InvoiceEntity = __decorate([
    typeorm_1.Entity('invoices')
], InvoiceEntity);
exports.InvoiceEntity = InvoiceEntity;
//# sourceMappingURL=invoice.entity.js.map