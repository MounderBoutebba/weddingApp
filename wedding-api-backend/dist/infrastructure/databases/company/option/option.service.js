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
const typeorm_1 = require("@nestjs/typeorm");
const option_repository_1 = require("./option.repository");
const elasticsearch_service_1 = require("../../elasticsearch/elasticsearch.service");
let OptionServices = class OptionServices {
    constructor(optionRepository, elasticsearchService) {
        this.optionRepository = optionRepository;
        this.elasticsearchService = elasticsearchService;
    }
    async createOption(option, email) {
        var _a;
        option = await this.optionRepository.save(option);
        const userId = option.company.user.id;
        const res = await this.elasticsearchService.findById('categories', '_doc', userId);
        const op = Object.assign({}, option);
        delete op['company'];
        if (!((_a = res._source) === null || _a === void 0 ? void 0 : _a.options)) {
            res._source.options = [];
        }
        const ops = [...res._source.options, op];
        await this.elasticsearchService.updateIndexById('categories', '_doc', userId, { options: ops });
        return this.optionRepository.findOneOrFail(option.id);
    }
    async deleteOption(id, company) {
        const option = await this.optionRepository.findOneOrFail(id);
        const userId = company.user.id;
        const res = await this.elasticsearchService.findById('categories', '_doc', userId);
        const ops = res._source.options.filter((elm) => elm.id !== id);
        await this.elasticsearchService.updateIndexById('categories', '_doc', userId, { options: ops });
        return await this.optionRepository.remove(option);
    }
    async getOption(id) {
        return await this.optionRepository.findOneOrFail(id);
    }
    async patchOption(id, option, company) {
        const optionDB = await this.optionRepository.findOneOrFail(id);
        optionDB.name = option.name;
        optionDB.description = option.description;
        optionDB.optionRate = option.optionRate;
        optionDB.feeType = option.feeType;
        optionDB.categories = option.categories;
        const savedDb = await this.optionRepository.save(optionDB);
        const userId = company.user.id;
        const res = await this.elasticsearchService.findById('categories', '_doc', userId);
        const ops = res._source.options.map((elm) => {
            if (elm.id === savedDb.id) {
                const opt = Object.assign({}, savedDb);
                delete opt['company'];
                return opt;
            }
            else {
                return elm;
            }
        });
        await this.elasticsearchService.updateIndexById('categories', '_doc', userId, { options: ops });
        return savedDb;
    }
};
OptionServices = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(option_repository_1.OptionRepository)),
    __metadata("design:paramtypes", [option_repository_1.OptionRepository,
        elasticsearch_service_1.ElasticsearchService])
], OptionServices);
exports.OptionServices = OptionServices;
//# sourceMappingURL=option.service.js.map