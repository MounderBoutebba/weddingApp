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
const user_entity_2 = require("./user.entity");
let WeddingEntity = class WeddingEntity {
    constructor() {
        this.phoneVerified = false;
        this.emailVerified = true;
        this.location = { address: null, lat: null, lng: null };
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], WeddingEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], WeddingEntity.prototype, "conjointEmail", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], WeddingEntity.prototype, "conjointFirstname", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], WeddingEntity.prototype, "conjointLastname", void 0);
__decorate([
    typeorm_1.Column(type => user_entity_1.Phone),
    __metadata("design:type", user_entity_1.Phone)
], WeddingEntity.prototype, "conjointPhone", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], WeddingEntity.prototype, "date", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], WeddingEntity.prototype, "budget", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], WeddingEntity.prototype, "guestsNumber", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], WeddingEntity.prototype, "phoneToken", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], WeddingEntity.prototype, "phoneVerified", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], WeddingEntity.prototype, "emailVerified", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], WeddingEntity.prototype, "location", void 0);
__decorate([
    typeorm_1.OneToOne(type => user_entity_2.ClientEntity, client => client.wedding, {
        onDelete: 'CASCADE',
        eager: true,
        onUpdate: 'RESTRICT'
    }),
    typeorm_1.JoinColumn({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_2.ClientEntity)
], WeddingEntity.prototype, "client", void 0);
WeddingEntity = __decorate([
    typeorm_1.Entity('weddings')
], WeddingEntity);
exports.WeddingEntity = WeddingEntity;
//# sourceMappingURL=wedding.entity.js.map