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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const find_services_usecase_1 = require("../../domain/usecases/services/find-services.usecase");
const services_repository_1 = require("../../infrastructure/databases/services/services.repository");
const elasticsearch_service_1 = require("../../infrastructure/databases/elasticsearch/elasticsearch.service");
const create_services_usecase_1 = require("../../domain/usecases/services/create-services.usecase");
const users_service_1 = require("../../infrastructure/databases/users/users.service");
const company_service_1 = require("../company/company.service");
const user_favorites_service_1 = require("../user-favorites/user-favorites.service");
let ServicesService = class ServicesService {
    constructor(elasticsearchService, usersService, favoritesService, companyService) {
        this.elasticsearchService = elasticsearchService;
        this.usersService = usersService;
        this.favoritesService = favoritesService;
        this.companyService = companyService;
        this.findServicesUsecase = new find_services_usecase_1.FindServices(new services_repository_1.ServicesRepository(this.elasticsearchService));
        this.createServicesUsecase = new create_services_usecase_1.CreateServices(new services_repository_1.ServicesRepository(this.elasticsearchService));
    }
    findAll() {
        return this.findServicesUsecase.findServices();
    }
    findByCategorie(categorie) {
        return this.findServicesUsecase.findServicesByCategorie(categorie);
    }
    async createService(categorie) {
        return await this.createServicesUsecase.createService(categorie);
    }
    async searchServices(index, type, query) {
        let searchedService;
        if (!type) {
            searchedService = await this.findServicesUsecase.searchServices(index, null, query);
        }
        else {
            searchedService = await this.findServicesUsecase.searchQuery(type, [['categories', type]]);
            searchedService = searchedService.hits.hits;
        }
        return await Promise.all(searchedService.map(async (res) => {
            const s = await this.usersService.findProvider(res._source.userid);
            const company = await s.company;
            delete s['__company__'];
            return Object.assign(Object.assign({}, s), { company, criteres: res._source.criteres, categories: res._source.categories });
        }));
    }
    async searchServicesByFields(index, type, query, fields) {
        const user = await this.usersService.findProviderByEmail(query);
        const searchedService = await this.findServicesUsecase.searchQuery(type, [
            ['userid', user.id],
            ['categories', type]
        ]);
        return await Promise.all(searchedService.hits.hits.map(async (res) => {
            const s = await this.usersService.findProvider(res._source.userid);
            const company = await this.companyService.findCompanyByUserId(s.id);
            delete s['__company__'];
            return Object.assign(Object.assign({}, s), { company, criteres: res._source.criteres, categories: res._source.categories });
        }));
    }
    async deleteServices(index, type, email) {
        try {
            const user = await this.usersService.findProviderByEmail(email);
            return await this.findServicesUsecase.deleteServicesByUserId(index, type, user.id);
        }
        catch (err) {
            throw new common_1.NotFoundException(err.message);
        }
    }
    async updateServiceByUserId(index, type, email, categorie) {
        try {
            const user = await this.usersService.findProviderByEmail(email);
            if (!!categorie.categories && categorie.categories.length > 0) {
                const comp = await user.company;
                const set = new Set(comp.categories);
                categorie.categories.map(elem => {
                    set.add(elem);
                });
                categorie.categories = [...set];
                const patchCategories = await this.companyService.patchCategories(comp.id, {
                    categories: categorie.categories
                });
            }
            const findServicesUsecase = await this.findServicesUsecase.updateServicesByUserId(index, type, user.id, categorie);
            const searchServicesByFields = await this.searchServicesByFields(index, type, email, ['userid']);
            return searchServicesByFields;
        }
        catch (err) {
            throw new common_1.NotFoundException(err.message);
        }
    }
    async searchCategory(type, query, page = 0, header) {
        const obj = Object.entries(query).map(([key, value]) => {
            if (key === 'address') {
                return ['locationFilter', { geo_bounding_box: { 'location.geo': value } }];
            }
            else if (key === 'topRatedProviders') {
                return ['topRatedProviders', { range: { totalNotes: { gte: 3 } } }];
            }
            else if (key === 'verifiedProvider') {
                return ['verifiedProvider', { match: { verifiedProvider: value } }];
            }
            else if (key === 'securePayment') {
                return ['securePayment', { match: { securePayment: value } }];
            }
            else if (key === 'terms') {
                return [key, value];
            }
            else if (Array.isArray(value)) {
                if (typeof value[0] === 'object') {
                    const re = value.map(v => {
                        return { range: { [`criteres.${key}`]: v } };
                    });
                    return ['ranges', re];
                }
                else if (key === 'categories') {
                    return [`${key}`, value.join(' ')];
                }
                else {
                    return [`criteres.${key}`, value.join(' ')];
                }
            }
            else if (this.isJson(value) && typeof value !== 'boolean') {
                return ['rangeMust', { [`criteres.${key}`]: JSON.parse(value) }];
            }
            else {
                return [`criteres.${key}`, value];
            }
        });
        const result = await this.findServicesUsecase.searchQuery(type, obj, page);
        let currentUser;
        if (!!header) {
            try {
                currentUser = await this.usersService.findUserByEmail(header);
            }
            catch (e) {
                currentUser = null;
            }
        }
        const data = await Promise.all(result.hits.hits.map(async (res) => {
            var _a;
            const userId = res._source.userid;
            const s = await this.usersService.findProvider(userId);
            const company = await this.companyService.findCompanyByUserId(userId);
            if (!!currentUser) {
                try {
                    const favorite = await this.favoritesService.find({
                        user: { id: (_a = currentUser) === null || _a === void 0 ? void 0 : _a.id },
                        company: { id: company.id }
                    });
                    s['favorite'] = !!favorite;
                }
                catch (e) {
                    s['favorite'] = false;
                }
            }
            delete s['__company__'];
            return Object.assign(Object.assign({}, s), { company, criteres: res._source.criteres, categories: res._source.categories });
        }));
        return { data, total: result.hits.total.value };
    }
    isJson(str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    }
};
ServicesService = __decorate([
    common_1.Injectable(),
    __param(3, common_1.Inject(common_1.forwardRef(() => company_service_1.CompanyService))),
    __metadata("design:paramtypes", [elasticsearch_service_1.ElasticsearchService,
        users_service_1.UsersServices,
        user_favorites_service_1.UserFavoritesService,
        company_service_1.CompanyService])
], ServicesService);
exports.ServicesService = ServicesService;
//# sourceMappingURL=services.service.js.map