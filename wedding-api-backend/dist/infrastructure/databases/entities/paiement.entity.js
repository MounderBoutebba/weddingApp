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
const user_entity_1 = require("./user.entity");
let PaiementEntity = class PaiementEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], PaiementEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true
    }),
    __metadata("design:type", String)
], PaiementEntity.prototype, "customerId", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true
    }),
    __metadata("design:type", String)
], PaiementEntity.prototype, "accountId", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true
    }),
    __metadata("design:type", String)
], PaiementEntity.prototype, "bankAccountId", void 0);
__decorate([
    typeorm_1.OneToOne(type => user_entity_1.UserEntity, userEntity => userEntity, {
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
    }),
    typeorm_1.JoinColumn({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], PaiementEntity.prototype, "user", void 0);
PaiementEntity = __decorate([
    typeorm_1.Entity('paiements')
], PaiementEntity);
exports.PaiementEntity = PaiementEntity;
//# sourceMappingURL=paiement.entity.js.map