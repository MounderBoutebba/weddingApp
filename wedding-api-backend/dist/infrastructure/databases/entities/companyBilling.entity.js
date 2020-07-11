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
var CondRefundDepositType;
(function (CondRefundDepositType) {
    CondRefundDepositType["SYSTEMATIC_REFUND"] = "remboursement systematique";
    CondRefundDepositType["CONDITIONAL_REFUND"] = "remboursement conditionnel";
})(CondRefundDepositType = exports.CondRefundDepositType || (exports.CondRefundDepositType = {}));
var CondRefundDepositCause;
(function (CondRefundDepositCause) {
    CondRefundDepositCause["GRIEVOUS_FAMILY_EVENT"] = "Ev\u00E9nement familial grave";
    CondRefundDepositCause["EVENT_PREVENTING_UNFOLDING"] = "Tout \u00E9venement empechant le d\u00E9roulement du mariage";
    CondRefundDepositCause["PERSONAL_JUDGMENT"] = "Selon mon jugement personnel de la situation";
})(CondRefundDepositCause = exports.CondRefundDepositCause || (exports.CondRefundDepositCause = {}));
let CompanyBillingEntity = class CompanyBillingEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], CompanyBillingEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: Boolean,
        default: false,
        nullable: true
    }),
    __metadata("design:type", Boolean)
], CompanyBillingEntity.prototype, "paymentSecure", void 0);
__decorate([
    typeorm_1.Column({
        type: Boolean,
        default: false,
        nullable: true
    }),
    __metadata("design:type", Boolean)
], CompanyBillingEntity.prototype, "depositPayment", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], CompanyBillingEntity.prototype, "depositPercentage", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], CompanyBillingEntity.prototype, "condRefundDepositClient", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], CompanyBillingEntity.prototype, "condRefundDepositClientCause", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], CompanyBillingEntity.prototype, "percentageRefundDepositClient", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], CompanyBillingEntity.prototype, "condRefundDepositCompany", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], CompanyBillingEntity.prototype, "condRefundDepositCompanyCause", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], CompanyBillingEntity.prototype, "percentageRefundDepositCompany", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], CompanyBillingEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], CompanyBillingEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.OneToOne(type => company_entity_1.CompanyEntity, object => object.billing, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: false,
        lazy: true
    }),
    typeorm_1.JoinColumn({ name: 'company_id', referencedColumnName: 'id' }),
    __metadata("design:type", Promise)
], CompanyBillingEntity.prototype, "company", void 0);
CompanyBillingEntity = __decorate([
    typeorm_1.Entity('companyBilling')
], CompanyBillingEntity);
exports.CompanyBillingEntity = CompanyBillingEntity;
//# sourceMappingURL=companyBilling.entity.js.map