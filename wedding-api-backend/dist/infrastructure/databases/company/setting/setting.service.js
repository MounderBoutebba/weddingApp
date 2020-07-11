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
const setting_repository_1 = require("./setting.repository");
const elasticsearch_service_1 = require("../../elasticsearch/elasticsearch.service");
let SettingServices = class SettingServices {
    constructor(settingRepository, elasticsearchService) {
        this.settingRepository = settingRepository;
        this.elasticsearchService = elasticsearchService;
    }
    async createSetting(setting) {
        var _a, _b;
        setting = await this.settingRepository.save(setting);
        const userId = setting.company.user.id;
        const res = await this.elasticsearchService.findById('categories', '_doc', userId);
        const op = Object.assign({}, setting);
        delete op['company'];
        if (!((_a = res._source) === null || _a === void 0 ? void 0 : _a.variationPeriode)) {
            res._source.variationPeriode = [];
        }
        const ops = [...(_b = res._source) === null || _b === void 0 ? void 0 : _b.variationPeriode, op];
        await this.elasticsearchService.updateIndexById('categories', '_doc', userId, { variationPeriode: ops });
        return this.settingRepository.findOneOrFail(setting.id);
    }
    async deleteSetting(id, company) {
        const setting = await this.settingRepository.findOneOrFail(id);
        const userId = company.user.id;
        const res = await this.elasticsearchService.findById('categories', '_doc', userId);
        const ops = res._source.variationPeriode.filter((elm) => elm.id !== id);
        await this.elasticsearchService.updateIndexById('categories', '_doc', userId, { variationPeriode: ops });
        return await this.settingRepository.remove(setting);
    }
    async getSetting(id) {
        return await this.settingRepository.findOneOrFail(id);
    }
    async patchSetting(id, setting, company) {
        const settingDB = await this.settingRepository.findOneOrFail(id);
        settingDB.periodStartDate = setting.periodStartDate;
        settingDB.periodEndDate = setting.periodEndDate;
        settingDB.increaseWeek = setting.increaseWeek;
        settingDB.increaseWeekend = setting.increaseWeekend;
        settingDB.autoApplication = setting.autoApplication;
        const savedDb = await this.settingRepository.save(settingDB);
        const userId = company.user.id;
        const res = await this.elasticsearchService.findById('categories', '_doc', userId);
        const ops = res._source.variationPeriode.map((elm) => {
            if (elm.id === savedDb.id) {
                const opt = Object.assign({}, savedDb);
                delete opt['company'];
                return opt;
            }
            else {
                return elm;
            }
        });
        await this.elasticsearchService.updateIndexById('categories', '_doc', userId, { variationPeriode: ops });
        return savedDb;
    }
};
SettingServices = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(setting_repository_1.SettingRepository)),
    __metadata("design:paramtypes", [setting_repository_1.SettingRepository,
        elasticsearch_service_1.ElasticsearchService])
], SettingServices);
exports.SettingServices = SettingServices;
//# sourceMappingURL=setting.service.js.map