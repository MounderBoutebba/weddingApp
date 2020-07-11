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
const wedding_entity_1 = require("./wedding.entity");
const paiement_entity_1 = require("./paiement.entity");
const company_entity_1 = require("./company.entity");
const reservation_entity_1 = require("./reservation.entity");
const notifications_entity_1 = require("./notifications.entity");
const user_favorite_entity_1 = require("./user-favorite.entity");
var ConnectionType;
(function (ConnectionType) {
    ConnectionType["USER_PASSWORD"] = "USER_PASSWORD";
    ConnectionType["GOOGLE"] = "GOOGLE";
    ConnectionType["FACEBOOK"] = "FACEBOOK";
})(ConnectionType = exports.ConnectionType || (exports.ConnectionType = {}));
var Roles;
(function (Roles) {
    Roles["CLIENT"] = "client";
    Roles["PROVIDER"] = "provider";
    Roles["ADMIN"] = "admin";
})(Roles = exports.Roles || (exports.Roles = {}));
var Status;
(function (Status) {
    Status["PUBLISHED"] = "PUBLISHED";
    Status["UNPUBLISHED"] = "UNPUBLISHED";
    Status["ARCHIVED"] = "ARCHIVED";
})(Status = exports.Status || (exports.Status = {}));
var State;
(function (State) {
    State["COMPLETED"] = "COMPLETED";
    State["UNCOMPLETED"] = "UNCOMPLETED";
})(State = exports.State || (exports.State = {}));
class Phone {
    toString() {
        return this.country + (!!this.phoneNumber ? this.phoneNumber.slice(1) : '');
    }
}
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Phone.prototype, "country", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Phone.prototype, "phoneNumber", void 0);
exports.Phone = Phone;
let UserEntity = class UserEntity {
    constructor() {
        this.location = { address: null, lat: null, lng: null };
        this.emailVerified = false;
        this.phoneVerified = false;
        this.languages = [];
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToMany(type => notifications_entity_1.NotificationsEntity, object => object.user, {
        eager: false,
        lazy: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: true
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "notifications", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], UserEntity.prototype, "location", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.Index({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "emailVerified", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "phoneVerified", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "phoneToken", void 0);
__decorate([
    typeorm_1.Column({ default: 0, nullable: true }),
    __metadata("design:type", Number)
], UserEntity.prototype, "phoneTokenRequestCount", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "firstname", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: null }),
    __metadata("design:type", Date)
], UserEntity.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-array', nullable: true }),
    __metadata("design:type", Array)
], UserEntity.prototype, "languages", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "lastname", void 0);
__decorate([
    typeorm_1.Column(type => Phone),
    __metadata("design:type", Phone)
], UserEntity.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "state", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Date)
], UserEntity.prototype, "lastConnexionDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "connectionType", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "photo", void 0);
__decorate([
    typeorm_1.OneToOne(type => paiement_entity_1.PaiementEntity, paiementEntity => paiementEntity.user, {
        onDelete: 'CASCADE',
        cascade: ['remove'],
        lazy: true
    }),
    __metadata("design:type", paiement_entity_1.PaiementEntity)
], UserEntity.prototype, "paiement", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: true }),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
UserEntity = __decorate([
    typeorm_1.Entity('users'),
    typeorm_1.TableInheritance({ column: { type: 'varchar', name: 'type' } })
], UserEntity);
exports.UserEntity = UserEntity;
let ClientEntity = class ClientEntity extends UserEntity {
};
__decorate([
    typeorm_1.OneToMany(type => user_favorite_entity_1.UserFavoriteEntity, object => object.user, {
        eager: false,
        lazy: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: true
    }),
    __metadata("design:type", Array)
], ClientEntity.prototype, "favorites", void 0);
__decorate([
    typeorm_1.OneToOne(type => wedding_entity_1.WeddingEntity, wedding => wedding.client, {
        onDelete: 'CASCADE',
        cascade: ['remove'],
        lazy: true
    }),
    __metadata("design:type", Promise)
], ClientEntity.prototype, "wedding", void 0);
__decorate([
    typeorm_1.OneToMany(type => reservation_entity_1.ReservationEntity, object => object.client, {
        lazy: true
    }),
    __metadata("design:type", Array)
], ClientEntity.prototype, "reservations", void 0);
ClientEntity = __decorate([
    typeorm_1.ChildEntity('client')
], ClientEntity);
exports.ClientEntity = ClientEntity;
let ProviderEntity = class ProviderEntity extends UserEntity {
    constructor() {
        super(...arguments);
        this.verifiedProvider = false;
    }
};
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], ProviderEntity.prototype, "siret", void 0);
__decorate([
    typeorm_1.OneToOne(type => company_entity_1.CompanyEntity, object => object.user, {
        onDelete: 'CASCADE',
        cascade: ['remove', 'update', 'insert'],
        lazy: true
    }),
    __metadata("design:type", company_entity_1.CompanyEntity)
], ProviderEntity.prototype, "company", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], ProviderEntity.prototype, "verifiedProvider", void 0);
ProviderEntity = __decorate([
    typeorm_1.ChildEntity('providers')
], ProviderEntity);
exports.ProviderEntity = ProviderEntity;
//# sourceMappingURL=user.entity.js.map