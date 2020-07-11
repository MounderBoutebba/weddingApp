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
var FeeType;
(function (FeeType) {
    FeeType["SINGLE_FEE"] = "Frais unique";
    FeeType["UNIT_FEE"] = "Frais par unit\u00E9";
    FeeType["GUEST_FEE"] = "Frais par invit\u00E9";
})(FeeType = exports.FeeType || (exports.FeeType = {}));
let OptionEntity = class OptionEntity {
    constructor() {
        this.categories = [];
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], OptionEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], OptionEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], OptionEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], OptionEntity.prototype, "optionRate", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-array', default: '' }),
    __metadata("design:type", Array)
], OptionEntity.prototype, "categories", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], OptionEntity.prototype, "feeType", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], OptionEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], OptionEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_entity_1.CompanyEntity, object => object.options, { onDelete: 'CASCADE' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], OptionEntity.prototype, "company", void 0);
OptionEntity = __decorate([
    typeorm_1.Entity('options')
], OptionEntity);
exports.OptionEntity = OptionEntity;
//# sourceMappingURL=option.entity.js.map