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
const user_favorites_service_1 = require("../../infrastructure/databases/user-favorites/user-favorites.service");
const company_service_1 = require("../company/company.service");
const users_service_1 = require("../users/users.service");
const entities_1 = require("../../infrastructure/databases/entities");
const elasticsearch_service_1 = require("../../infrastructure/databases/elasticsearch/elasticsearch.service");
let UserFavoritesService = class UserFavoritesService {
    constructor(userFavoritesServices, companyService, elasticsearchService, usersService) {
        this.userFavoritesServices = userFavoritesServices;
        this.companyService = companyService;
        this.elasticsearchService = elasticsearchService;
        this.usersService = usersService;
    }
    async addFavorite(email, data, user) {
        const favorite = new entities_1.UserFavoriteEntity();
        favorite.user = user;
        const company = await this.companyService.findCompany(data.companyId, data.companyEmail);
        favorite.company = company;
        return await this.userFavoritesServices.save(favorite);
    }
    async deleteFavorite(userId, companyId) {
        const favorite = await this.userFavoritesServices.find({ user: { id: userId }, company: { id: companyId } });
        return await this.userFavoritesServices.deleteByUserEmailAndCompanyId(favorite);
    }
    async findAll(page, data) {
        const res = await this.userFavoritesServices.findAll(page, data);
        res.items = await Promise.all(res.items.map(async (result) => {
            const temp = await this.elasticsearchService.findById('categories', '_doc', result.company.user.id);
            result.criteres = temp._source.criteres;
            return result;
        }));
        return res;
    }
    async find(data) {
        return this.userFavoritesServices.find(data);
    }
    async getAllFavorites(page, user) {
        return this.findAll(page, { userId: user.id });
    }
};
UserFavoritesService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_favorites_service_1.UserFavoritesServices,
        company_service_1.CompanyService,
        elasticsearch_service_1.ElasticsearchService,
        users_service_1.UsersService])
], UserFavoritesService);
exports.UserFavoritesService = UserFavoritesService;
//# sourceMappingURL=user-favorites.service.js.map