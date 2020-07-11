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
const common_1 = require("@nestjs/common");
const user_favorites_repository_1 = require("./user-favorites.repository");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let UserFavoritesServices = class UserFavoritesServices {
    constructor(userFavoritesRepository) {
        this.userFavoritesRepository = userFavoritesRepository;
    }
    async save(data) {
        return await this.userFavoritesRepository.save(data);
    }
    async find(data) {
        return this.userFavoritesRepository.findOneOrFail(data);
    }
    async deleteByUserEmailAndCompanyId(favorite) {
        return this.userFavoritesRepository.remove(favorite);
    }
    async findAll(page, data) {
        return await nestjs_typeorm_paginate_1.paginate(this.userFavoritesRepository, { limit: 10, page }, { where: data });
    }
};
UserFavoritesServices = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_favorites_repository_1.UserFavoritesRepository])
], UserFavoritesServices);
exports.UserFavoritesServices = UserFavoritesServices;
//# sourceMappingURL=user-favorites.service.js.map