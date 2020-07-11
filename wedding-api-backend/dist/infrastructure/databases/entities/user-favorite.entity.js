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
const company_entity_1 = require("./company.entity");
let UserFavoriteEntity = class UserFavoriteEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], UserFavoriteEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], UserFavoriteEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], UserFavoriteEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ManyToOne(type => company_entity_1.CompanyEntity, object => object.favorites, { eager: true }),
    typeorm_1.JoinColumn({ name: 'company_id', referencedColumnName: 'id' }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], UserFavoriteEntity.prototype, "company", void 0);
__decorate([
    typeorm_1.ManyToOne(type => user_entity_1.ClientEntity, object => object.favorites, { eager: true }),
    typeorm_1.JoinColumn({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], UserFavoriteEntity.prototype, "user", void 0);
UserFavoriteEntity = __decorate([
    typeorm_1.Unique('unique_company_user', ['company', 'user']),
    typeorm_1.Entity('user_favorites')
], UserFavoriteEntity);
exports.UserFavoriteEntity = UserFavoriteEntity;
//# sourceMappingURL=user-favorite.entity.js.map