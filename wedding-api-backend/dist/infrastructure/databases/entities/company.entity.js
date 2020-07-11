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
const companyImage_entity_1 = require("./companyImage.entity");
const user_entity_1 = require("./user.entity");
const reservation_entity_1 = require("./reservation.entity");
const setting_entity_1 = require("./setting.entity");
const option_entity_1 = require("./option.entity");
const companyBilling_entity_1 = require("./companyBilling.entity");
const disponibility_entity_1 = require("./disponibility.entity");
const comments_entity_1 = require("./comments.entity");
const user_favorite_entity_1 = require("./user-favorite.entity");
var TripFeeType;
(function (TripFeeType) {
    TripFeeType["SINGLE_FEE"] = "Frais unique";
    TripFeeType["FEE_PER_KM"] = "Frais par kilom\u00E8tre";
})(TripFeeType = exports.TripFeeType || (exports.TripFeeType = {}));
let CompanyEntity = class CompanyEntity {
    constructor() {
        this.categories = [];
        this.links = [];
        this.location = { address: null, lat: null, lng: null };
        this.dynamiqueQts = [];
        this.networks = [];
        this.countVotes = 0;
        this.totalNotes = 0;
        this.qualiteService = 0;
        this.countQualiteService = 0;
        this.professionnalisme = 0;
        this.countProfessionnalisme = 0;
        this.flexibilite = 0;
        this.countFlexibilite = 0;
        this.rapportQualitePrix = 0;
        this.countRapportQualitePrix = 0;
        this.securePayment = false;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], CompanyEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CompanyEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CompanyEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({
        type: Boolean,
        default: false,
        nullable: true
    }),
    __metadata("design:type", Boolean)
], CompanyEntity.prototype, "weekendVariation", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "weekendVariationPercentage", void 0);
__decorate([
    typeorm_1.Column({
        type: Boolean,
        default: false,
        nullable: true
    }),
    __metadata("design:type", Boolean)
], CompanyEntity.prototype, "periodeVariation", void 0);
__decorate([
    typeorm_1.Column({
        type: Boolean,
        default: false,
        nullable: true
    }),
    __metadata("design:type", Boolean)
], CompanyEntity.prototype, "optionsProposed", void 0);
__decorate([
    typeorm_1.Column({
        type: Boolean,
        default: false,
        nullable: true
    }),
    __metadata("design:type", Boolean)
], CompanyEntity.prototype, "suppHours", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "suppHoursRate", void 0);
__decorate([
    typeorm_1.Column({
        type: Boolean,
        default: false,
        nullable: true
    }),
    __metadata("design:type", Boolean)
], CompanyEntity.prototype, "tripExpences", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "tripExpencesDistance", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "tripExpencesRateType", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "tripExpencesTypePrice", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], CompanyEntity.prototype, "currentStep", void 0);
__decorate([
    typeorm_1.Column('simple-array'),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "categories", void 0);
__decorate([
    typeorm_1.Column('simple-array'),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "links", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], CompanyEntity.prototype, "questions", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], CompanyEntity.prototype, "location", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "dynamiqueQts", void 0);
__decorate([
    typeorm_1.OneToMany(type => companyImage_entity_1.CompanyImageEntity, object => object.company, {
        eager: true,
        cascade: ['insert', 'update', 'remove'],
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "images", void 0);
__decorate([
    typeorm_1.OneToMany(type => setting_entity_1.SettingEntity, object => object.company, {
        eager: true,
        cascade: ['insert', 'update', 'remove'],
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "settings", void 0);
__decorate([
    typeorm_1.OneToMany(type => option_entity_1.OptionEntity, object => object.company, {
        eager: true,
        cascade: ['insert', 'update', 'remove'],
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "options", void 0);
__decorate([
    typeorm_1.OneToOne(type => companyBilling_entity_1.CompanyBillingEntity, object => object.company, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: ['remove', 'update', 'insert'],
        eager: true
    }),
    __metadata("design:type", companyBilling_entity_1.CompanyBillingEntity)
], CompanyEntity.prototype, "billing", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], CompanyEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], CompanyEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.OneToOne(type => user_entity_1.ProviderEntity, object => object.company, {
        eager: true,
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE'
    }),
    typeorm_1.JoinColumn({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.ProviderEntity)
], CompanyEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(type => reservation_entity_1.ReservationEntity, reservations => reservations.company, { eager: false, lazy: true }),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "reservations", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "networks", void 0);
__decorate([
    typeorm_1.OneToMany(type => comments_entity_1.CommentsEntity, comments => comments.company, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "comments", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "countVotes", void 0);
__decorate([
    typeorm_1.Column({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "totalNotes", void 0);
__decorate([
    typeorm_1.Column({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "qualiteService", void 0);
__decorate([
    typeorm_1.Column({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "countQualiteService", void 0);
__decorate([
    typeorm_1.Column({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "professionnalisme", void 0);
__decorate([
    typeorm_1.Column({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "countProfessionnalisme", void 0);
__decorate([
    typeorm_1.Column({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "flexibilite", void 0);
__decorate([
    typeorm_1.Column({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "countFlexibilite", void 0);
__decorate([
    typeorm_1.Column({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "rapportQualitePrix", void 0);
__decorate([
    typeorm_1.Column({ default: 0, type: 'float' }),
    __metadata("design:type", Number)
], CompanyEntity.prototype, "countRapportQualitePrix", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], CompanyEntity.prototype, "securePayment", void 0);
__decorate([
    typeorm_1.OneToMany(type => disponibility_entity_1.DisponibilityEntity, object => object.company, {
        lazy: false,
        eager: false,
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Promise)
], CompanyEntity.prototype, "disponibility", void 0);
__decorate([
    typeorm_1.OneToMany(type => user_favorite_entity_1.UserFavoriteEntity, object => object.user, {
        eager: false,
        lazy: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: true
    }),
    __metadata("design:type", Array)
], CompanyEntity.prototype, "favorites", void 0);
CompanyEntity = __decorate([
    typeorm_1.Entity('companies')
], CompanyEntity);
exports.CompanyEntity = CompanyEntity;
//# sourceMappingURL=company.entity.js.map