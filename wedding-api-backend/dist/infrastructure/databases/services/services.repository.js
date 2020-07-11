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
const elasticsearch_service_1 = require("../elasticsearch/elasticsearch.service");
let ServicesRepository = class ServicesRepository {
    constructor(elasticsearchService) {
        this.elasticsearchService = elasticsearchService;
    }
    findServices() {
        const providers = [];
        return providers;
    }
    findServicesByCategorie(categorie) {
        const providers = [];
        return providers;
    }
    findServicesByCategorieAndPrice(categorie, minPrice, maxPrice) {
        const providers = [];
        return providers;
    }
    async createService(categorie) {
        const elasticInsertion = {
            index: 'categories',
            type: 'users',
            dataToStore: categorie
        };
        const elasticCreated = await this.elasticsearchService.bulkInsert(elasticInsertion.index, elasticInsertion.type, elasticInsertion.dataToStore);
        return elasticCreated;
    }
    async searchServices(index, type, query) {
        return await this.elasticsearchService.searchIndex(index, type, query);
    }
    async searchServicesByFileds(index, type, query, fileds) {
        return await this.elasticsearchService.searchIndexByFileds(index, type, query, fileds);
    }
    async deleteServicesByIndexId(index, type, id) {
        return await this.elasticsearchService.deleteIndexById(index, type, id);
    }
    async updateServiceByIndexId(index, type, id, categorie) {
        return await this.elasticsearchService.updateIndexById(index, type, id, categorie);
    }
    async searchByQuery(type, query, page = 0) {
        return await this.elasticsearchService.searchByQuery(type, query, page);
    }
};
ServicesRepository = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [elasticsearch_service_1.ElasticsearchService])
], ServicesRepository);
exports.ServicesRepository = ServicesRepository;
//# sourceMappingURL=services.repository.js.map