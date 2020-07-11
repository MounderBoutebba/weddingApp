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
const elasticsearch = require("elasticsearch");
const config_service_1 = require("../../../presentation/config/config-service");
const configService = new config_service_1.ConfigService();
let ElasticsearchService = class ElasticsearchService {
    constructor() {
        this.esclient = new elasticsearch.Client({
            host: configService.get(`ELASTIC_HOST`)
        });
        this.esclient.indices
            .create({ index: 'categories' })
            .then(res => res)
            .catch(e => e);
        this.esclient.indices
            .create({ index: 'reservations' })
            .then(res => res)
            .catch(e => e);
        this.esclient.indices
            .putMapping({
            index: 'categories',
            type: '_doc',
            includeTypeName: true,
            body: {
                properties: {
                    totalNotes: {
                        type: 'float'
                    },
                    location: {
                        properties: {
                            geo: {
                                type: 'geo_point'
                            }
                        }
                    }
                }
            }
        })
            .then(res => {
            this.esclient.indices
                .putSettings({
                index: 'categories',
                body: {
                    'index.mapping.total_fields.limit': 2000
                }
            })
                .then();
        });
        this.esclient.indices
            .putMapping({
            index: 'reservations',
            type: '_doc',
            includeTypeName: true,
            body: {
                properties: {
                    location: {
                        properties: {
                            geo: {
                                type: 'geo_point'
                            }
                        }
                    }
                }
            }
        })
            .then(res => res);
    }
    async bulkInsert(index, type, dataToStore) {
        return await this.esclient.index({
            id: dataToStore.userid,
            index,
            type: '_doc',
            body: dataToStore
        });
    }
    async searchIndex(indexP, typeP, qP) {
        const bodyC = {
            query: {
                match_all: {}
            }
        };
        return await this.esclient
            .search({ index: indexP, type: '_doc', body: bodyC })
            .then(res => {
            return res.hits.hits;
        })
            .catch(err => {
            throw new common_1.HttpException(err, 500);
        });
    }
    async searchIndexByFileds(indexP, typeP, qP, fieldsP) {
        const bodyC = {
            query: {
                multi_match: {
                    query: qP,
                    fields: fieldsP
                }
            }
        };
        return await this.esclient
            .search({ index: indexP, type: '_doc', body: bodyC })
            .then(res => {
            return res.hits.hits;
        })
            .catch(err => {
            throw new common_1.HttpException(err, 500);
        });
    }
    async deleteIndexById(indexP, typeP, idP) {
        return await this.esclient
            .delete({ index: indexP, type: '_doc', id: idP })
            .then(res => {
            return res;
        })
            .catch(err => {
            throw new common_1.HttpException(err, 500);
        });
    }
    async updateIndexById(indexP, typeP, idP, dataToUpdate) {
        try {
            return await this.esclient.update({
                index: indexP,
                type: '_doc',
                id: idP,
                body: { doc: dataToUpdate },
                refresh: 'true',
                retryOnConflict: 10
            });
        }
        catch (err) {
            throw new common_1.HttpException(err, 400);
        }
    }
    async findById(indexP, typeP, idP) {
        try {
            return await this.esclient.get({
                index: indexP,
                type: '_doc',
                id: idP
            });
        }
        catch (err) {
            throw new common_1.HttpException(err, 400);
        }
    }
    async searchByQuery(type, query, page = 0) {
        try {
            let ranges = [];
            const filterLocation = [];
            const filtert = query
                .map(([key, value]) => {
                if (key === 'ranges') {
                    ranges = value;
                    return null;
                }
                else if (key === 'rangeMust') {
                    return { range: value };
                }
                else if (key === 'locationFilter') {
                    filterLocation.push(value);
                    return null;
                }
                else if (key === 'topRatedProviders') {
                    return value;
                }
                else if (key === 'verifiedProvider') {
                    return value;
                }
                else if (key === 'securePayment') {
                    return value;
                }
                else if (key === 'terms') {
                    return { [key]: value };
                }
                else {
                    return { match: { [key]: value } };
                }
            })
                .filter(value => !!value);
            const size = 10;
            const bodyC = {
                size,
                from: page * size,
                query: {
                    bool: {
                        must: filtert,
                        should: ranges,
                        filter: filterLocation
                    }
                }
            };
            return await this.esclient.search({
                index: 'categories',
                body: bodyC
            });
        }
        catch (err) {
            throw new common_1.HttpException(err, 400);
        }
    }
    async normaleearch(index, query, page = 0, sort = []) {
        try {
            const size = 10;
            return await this.esclient.search({
                index,
                type: '_doc',
                body: {
                    from: page * size,
                    size,
                    sort,
                    query
                }
            });
        }
        catch (err) {
            throw new common_1.HttpException(err, 400);
        }
    }
    async insert(index, dataToStore, id) {
        return await this.esclient.index({
            id,
            index,
            type: '_doc',
            body: dataToStore
        });
    }
};
ElasticsearchService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ElasticsearchService);
exports.ElasticsearchService = ElasticsearchService;
//# sourceMappingURL=elasticsearch.service.js.map